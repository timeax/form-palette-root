// src/core/core-provider.tsx
// noinspection JSConstantReassignment,JSUnusedGlobalSymbols,GrazieInspection

import * as React from "react";

import { CoreContextReact } from "@/core/context";
import { mapZodError } from "@/core/errors/map-zod";
import { mapErrorBag } from "@/core/errors/map-error-bag";
import { getAdapter, localAdapter } from "@/core/adapter-registry";
import { FieldRegistry } from "@/core/registry/field-registry";

import type { z } from "zod";
import type {
    AdapterKey,
    AdapterProps,
    AdapterResult,
    Method,
} from "@/schema/adapter";
import type {
    CoreContext,
    CoreProps,
    Dict,
    InferFromSchema,
    SubmitEvent,
    ValuesResult,
} from "@/schema/core";
import type { ButtonRef, Field } from "@/schema/field";
import { getPaletteUtil } from "@/lib/register-global";
import { toArray } from "@/lib/utils";
import type { FileItem } from "@/presets/shadcn-variants/file";

type Props<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey,
> = CoreProps<V, S, K> & {
    children?: React.ReactNode;
};

// Core-level props that are NOT part of AdapterProps<K>
const CORE_PROP_KEYS = new Set<string>([
    "adapter",
    "schema",
    "exceptions",
    "persist",
    "name",
    "activateButtonOnChange",
    "onChange",
    "onUpdate",
    "changeBefore",
    "formRef",
    "valueBag",
    "valueFeed",
    "onFinish",
    "init",
    "onSubmit",
    "onSubmitted",
    "children",
]);

// ─────────────────────────────────────────────────────────────
// Internal helpers (generic utils)
// ─────────────────────────────────────────────────────────────
function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;

    // NaN === NaN
    if (typeof a === "number" && typeof b === "number") {
        if (Number.isNaN(a) && Number.isNaN(b)) return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    if (isPlainObject(a) && isPlainObject(b)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        for (const key of aKeys) {
            if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
            if (!deepEqual((a as any)[key], (b as any)[key])) return false;
        }
        return true;
    }

    return false;
}
// ─────────────────────────────────────────────────────────────
// CoreProvider
// ─────────────────────────────────────────────────────────────

/**
 * CoreProvider: owns the form/core runtime state and implements CoreContext.
 *
 * - Tracks all inputs in a single store (inputsRef)
 * - Supports:
 *   - named inputs via `name`
 *   - bound inputs via `bindId`
 *   - grouped inputs via `groupId`
 * - Manages errors and uncaught messages
 * - Builds values snapshots (including bucket values)
 * - Orchestrates submission via the adapter registry
 */
export function CoreProvider<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
>(props: Props<V, S, K>) {
    type Values = InferFromSchema<S, V>;

    // Single input store: FieldRegistry
    const registryRef = React.useRef<FieldRegistry>(new FieldRegistry());
    ``;
    // bucket, errors, button
    const bucketRef = React.useRef<Dict>({});
    const uncaughtRef = React.useRef<string[]>([]);
    const errorsRef = React.useRef<Dict<string> | null>(null);
    const buttonRef = React.useRef<ButtonRef | null>(null);
    const activeButtonNameRef = React.useRef<string | null>(null);

    const [hasUncaughtErrors, setHasUncaughtErrors] = React.useState(0);
    /**
     * Original snapshot used for "dirty" checks.
     * Lazily captured on first dirty-check.
     */
    const originalRef = React.useRef<Values | null>(null);

    // latest props
    const propsRef = React.useRef(props);
    React.useEffect(() => {
        propsRef.current = props;
    }, [props]);

    const adapterKey = (props.adapter ?? "local") as AdapterKey;
    const schema = props.schema;
    const errorBagId = props.name ?? undefined;
    let context!: CoreContext<Values>;

    // ─────────────────────────────────────────────────────────
    // Common helpers
    // ─────────────────────────────────────────────────────────

    function fetchAllNamedFields(): Field[] {
        return registryRef.current.getAllNamed();
    }

    function clearFieldErrors() {
        for (const field of fetchAllNamedFields()) {
            const anyField = field as any;
            if (typeof anyField.setError === "function") {
                anyField.setError(undefined);
            } else if ("error" in anyField) {
                anyField.error = undefined;
            }
        }
    }

    function findFieldForErrorKey(key: string): Field | undefined {
        if (!key) return undefined;
        return fetchAllNamedFields().find((f) => {
            const raw = f.name;
            if (!raw) return false;
            const trimmed = raw.trim();
            if (!trimmed) return false;

            const base = trimmed.replace(/\[]$/, "");
            if (key === base || key === trimmed) return true;

            const sharedKey = (f as any).shared as string | undefined;
            if (!sharedKey) return false;

            const sharedBase = `${sharedKey}.${base}`;
            const sharedRaw = `${sharedKey}.${trimmed}`;
            return key === sharedBase || key === sharedRaw;
        });
    }

    function setFieldError(name: string, message: string) {
        const field = findFieldForErrorKey(name);

        if (field) {
            const anyField = field as any;
            if (typeof anyField.setError === "function") {
                anyField.setError(message);
            } else {
                anyField.error = message;
            }
        } else {
            uncaughtRef.current.push(message);
        }
    }

    /**
     * Collect values from inputs into a Values object.
     *
     * Semantics:
     * - `name="tags[]"` ⇒ `values.tags: unknown[]`
     * - `shared="profile", name="first_name"` ⇒ `values.profile.first_name`
     * - bucketRef.current is merged in and overridden by live field values.
     * - `exceptions` can hide keys (e.g. ["password", "profile.ssn"])
     */
    function collectValues(): Values {
        const exceptions = propsRef.current.exceptions ?? [];
        const list: Dict = {};
        const shared: Dict<Dict> = {};
        const formatFileValue = getPaletteUtil('formatFileValue')

        for (const item of fetchAllNamedFields()) {
            const rawName = item.name;
            if (!rawName) continue;

            const trimmed = rawName.trim();
            if (!trimmed) continue;

            const isArray = trimmed.endsWith("[]");
            const base = trimmed.replace(/\[]$/, "");
            const sharedKey = (item as any).shared as string | undefined;

            const target = sharedKey
                ? (shared[sharedKey] ?? (shared[sharedKey] = {}))
                : list;

            const fullPath = sharedKey ? `${sharedKey}.${base}` : base;
            if (
                exceptions.includes(trimmed) ||
                exceptions.includes(base) ||
                exceptions.includes(fullPath)
            ) {
                continue;
            }

            const anyField = item as any;
            const val =
                typeof anyField.getValue === "function"
                    ? (anyField.getValue() as unknown)
                    : (anyField.value as unknown);

            const onFormat = (value: any) => {
                if (anyField.onSubmit) {
                    return anyField.onSubmit(value);
                }

                if(formatFileValue && item.variant == 'file') {
                    return toArray(value as FileItem | FileItem[]).map(formatFileValue);
                }

                return value;
            };

            if (isArray) {
                const existing = target[base];
                if (Array.isArray(existing)) {
                    target[base] = onFormat([...existing, val]);
                } else if (typeof existing === "undefined") {
                    target[base] = onFormat([val]);
                } else {
                    target[base] = onFormat([existing, val]);
                }
            } else {
                target[base] = onFormat(val);
            }
        }

        const fromFields: Dict = { ...list, ...shared };
        const merged: Dict = {
            ...bucketRef.current,
            ...fromFields,
        };

        return merged as Values;
    }

    function validateInternal(report: boolean = false): boolean {
        let valid = true;

        if (report) {
            uncaughtRef.current = [];
            clearFieldErrors();
        }

        // field-level
        for (const field of fetchAllNamedFields()) {
            const anyField = field as any;
            if (typeof anyField.validate === "function") {
                const ok = anyField.validate(report);
                if (!ok) valid = false;
            }
        }

        // schema-level
        if (schema) {
            try {
                schema.parse(collectValues());
            } catch (err: unknown) {
                valid = false;

                if (report && err && typeof err === "object") {
                    const anyErr = err as any;
                    if (anyErr.issues) {
                        const { fieldErrors, uncaught } = mapZodError(anyErr);
                        for (const [name, message] of Object.entries(
                            fieldErrors,
                        )) {
                            setFieldError(name, message);
                        }
                        if (uncaught.length) {
                            uncaughtRef.current.push(...uncaught);
                        }
                    }
                }
            }
        }

        return valid;
    }

    function getAdapterPropsFrom(current: Props<V, S, K>): AdapterProps<K> {
        const result: any = {};
        for (const key in current) {
            if (!CORE_PROP_KEYS.has(key)) {
                result[key] = (current as any)[key];
            }
        }
        return result as AdapterProps<K>;
    }

    // ─────────────────────────────────────────────────────────
    // Submission
    // ─────────────────────────────────────────────────────────

    async function submitWithAdapter(
        adapterOverride?: Partial<AdapterProps<K>>,
        extra?: Partial<Values>,
        ignoreForm?: boolean,
        autoErr: boolean = true,
        autoRun: boolean = true,
    ): Promise<AdapterResult<any> | undefined> {
        const currentProps = propsRef.current as Props<V, S, K>;

        // active button + loading
        const btn = buttonRef.current as any;
        const activeName = activeButtonNameRef.current;
        const isActiveButton =
            !!btn && typeof btn === "object" && btn.name === activeName;

        const setButtonLoading = (loading: boolean) => {
            if (!isActiveButton) return;
            if (typeof btn.setLoading === "function") {
                btn.setLoading(loading);
            } else if ("loading" in btn) {
                btn.loading = loading;
            }
        };

        setButtonLoading(true);

        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            if (uncaughtRef.current.length)
                setHasUncaughtErrors(hasUncaughtErrors + 1);
            setButtonLoading(false);
        };

        if (!ignoreForm) {
            const ok = validateInternal(true);
            if (!ok) {
                finish();
                return undefined;
            }
        }

        let submissionValues: Values = {
            ...collectValues(),
            ...(extra ?? {}),
        };

        // Base adapter config from props + override from caller
        let adapterConfig: AdapterProps<K> = {
            ...(getAdapterPropsFrom(currentProps) as any),
            ...(adapterOverride as Partial<AdapterProps<K>> | undefined),
        };

        const event: SubmitEvent<Values, K> = {
            preventDefault() {
                this.continue = false;
            },
            editData(cb) {
                const result = cb(submissionValues);
                if (result) {
                    submissionValues = result;
                }
            },
            setConfig(arg1: any, arg2?: any) {
                if (typeof arg1 === "string") {
                    // key, value
                    (adapterConfig as any)[arg1] = arg2;
                } else if (arg1 && typeof arg1 === "object") {
                    // partial props
                    adapterConfig = {
                        ...(adapterConfig as any),
                        ...arg1,
                    };
                }
            },

            button: buttonRef.current ?? undefined,
            get formData() {
                return submissionValues;
            },

            form: context,
            continue: true,
        };

        if (currentProps.onSubmit) {
            try {
                await currentProps.onSubmit(event as any);
            } catch (err) {
                // host blew up: end this submit cycle
                finish();
                throw err;
            }
        }

        if (!event.continue) {
            finish();
            return undefined;
        }

        const factory =
            getAdapter(adapterKey) ??
            (localAdapter as unknown as (cfg: any) => AdapterResult<any>);

        const adapter = factory({
            // adapter-specific config (url, method, config, etc.)
            ...(adapterConfig as any),

            // core config
            data: submissionValues,
            errorBag: errorBagId,
            callbacks: {
                onSuccess(ok: unknown) {
                    const maybe = propsRef.current.onSubmitted;
                    if (maybe) {
                        void maybe(context, ok as any, () => {
                            finish();
                        });
                    }
                },
                onError(err: unknown, updateRef) {
                    if (!autoErr || !err || typeof err !== "object") {
                        return;
                    }

                    const anyErr = err as any;
                    if (anyErr.errors && typeof anyErr.errors === "object") {
                        const { fieldErrors, uncaught } = mapErrorBag(
                            anyErr.errors ?? {},
                        );

                        if (updateRef) {
                            errorsRef.current = fieldErrors;
                        } else
                            for (const [name, message] of Object.entries(
                                fieldErrors,
                            )) {
                                setFieldError(name, message);
                            }
                        if (uncaught.length) {
                            uncaughtRef.current.push(...uncaught);
                        }
                    }
                },
                onFinish() {
                    const maybe = propsRef.current.onFinish;
                    if (maybe) {
                        maybe(context);
                    }
                    finish();
                },
            },
        });
        if (autoRun) {
            try {
                await adapter.send();
            } catch (e) {
                console.log("Adapter failed to send.", e);
                // errors flow via callbacks; adapter may still call onFinish
            }
        }

        return adapter;
    }

    // No separate inputs view: expose registry directly via context.inputs

    // ─────────────────────────────────────────────────────────
    // CoreContext implementation
    // ─────────────────────────────────────────────────────────

    context = {
        values(): Values {
            return collectValues();
        },

        submit(): ValuesResult<Values> {
            const valid = validateInternal(true);
            const vals = collectValues();
            return { values: vals, valid };
        },

        getBind(id: string): Field | undefined {
            return registryRef.current.getByBind(id);
        },

        validate(report?: boolean): boolean {
            return validateInternal(report);
        },

        addField(field: Field): void {
            // Normalise name
            const rawName = field.name ?? "";
            (field as any).name = rawName.trim();

            // hydrate from valueBag before registering
            const { valueBag, valueFeed } = propsRef.current;
            const trimmed = (field.name ?? "").trim();
            const hasName = !!trimmed;
            const isArray = hasName && trimmed.endsWith("[]");
            const base = hasName ? trimmed.replace(/\[]$/, "") : "";
            const sharedKey = (field as any).shared as string | undefined;

            if (valueBag && !(field as any).ignore && hasName) {
                const sourceRoot: any =
                    sharedKey && (valueBag as any)[sharedKey]
                        ? (valueBag as any)[sharedKey]
                        : valueBag;

                let value: unknown = undefined;

                if (sourceRoot && typeof sourceRoot === "object") {
                    if (isArray && Array.isArray(sourceRoot[base])) {
                        const siblings = fetchAllNamedFields().filter((f) => {
                            const rn = (f.name ?? "").trim();
                            return (
                                rn === trimmed &&
                                ((f as any).shared as string | undefined) ===
                                    sharedKey
                            );
                        });
                        const idx = siblings.length;
                        value = (sourceRoot[base] as unknown[])[idx];
                    } else {
                        value = sourceRoot[base];
                    }
                }

                let hydrated: unknown = value;
                if (valueFeed) {
                    const maybe = valueFeed(
                        base as keyof Values,
                        value as any,
                        context as any,
                    );
                    if (typeof maybe !== "undefined") {
                        hydrated = maybe;
                    }
                }

                if (typeof hydrated !== "undefined") {
                    const anyField = field as any;
                    if (typeof anyField.setValue === "function") {
                        anyField.setValue(hydrated);
                    } else {
                        anyField.value = hydrated;
                    }
                }
            }

            // finally register into the single store (name/bindId/groupId)
            registryRef.current.add(field);
        },

        // Expose registry view as inputs (delegates to FieldRegistry instance)
        inputs: registryRef.current,

        // Also expose raw list of fields for compatibility is defined later as a getter

        bucket: bucketRef.current,

        error(
            nameOrBag: string | Record<string, string>,
            maybeMsg?: string,
        ): void {
            if (typeof nameOrBag === "string") {
                if (!maybeMsg) return;
                setFieldError(nameOrBag, maybeMsg);
                return;
            }

            const { fieldErrors, uncaught } = mapErrorBag(nameOrBag);
            for (const [name, message] of Object.entries(fieldErrors)) {
                setFieldError(name, message);
            }
            if (uncaught.length) {
                uncaughtRef.current.push(...uncaught);
            }
        },

        controlButton(): void {
            const { activateButtonOnChange } = propsRef.current;
            if (!activateButtonOnChange) return;

            const btn = buttonRef.current as any;
            const activeName = activeButtonNameRef.current;

            // If there is no active button or it doesn't match, nothing to control.
            if (!btn || btn.name !== activeName) {
                return;
            }

            // Capture original snapshot lazily.
            if (!originalRef.current) {
                originalRef.current = collectValues();
            }

            const current = collectValues();
            const original = originalRef.current!;

            const dirty = !deepEqual(original, current);

            const setDisabled = (disabled: boolean) => {
                if (typeof btn.setDisabled === "function") {
                    btn.setDisabled(disabled);
                } else if ("disabled" in btn) {
                    btn.disabled = disabled;
                }
            };

            // Dirty ⇒ enable button, clean ⇒ disable button
            setDisabled(!dirty);
        },

        isDirty() {
            if (!originalRef.current) {
                originalRef.current = collectValues();
            }

            const current = collectValues();
            const original = originalRef.current!;

            return !deepEqual(original, current);
        },

        async prepare(
            type: Method,
            route: string,
            extra?: Partial<Values>,
            ignoreForm?: boolean,
            autoErr?: boolean,
        ): Promise<AdapterResult<any> | undefined> {
            // Bridge old (method, route) API into adapter config overrides.
            const override: any = {
                method: type,
                url: route,
            };
            return submitWithAdapter(
                override as Partial<AdapterProps<K>>,
                extra,
                ignoreForm,
                autoErr,
                false,
            );
        },

        persist(
            data: Partial<Values>,
            feed?: (name: string, value: unknown, original: unknown) => unknown,
        ): void {
            const seen: Record<string, number> = {};
            const root = data as any;

            const useFeed =
                feed ||
                (propsRef.current.valueFeed
                    ? (
                          name: string,
                          value: unknown,
                          original: unknown,
                      ): unknown => {
                          const vf = propsRef.current.valueFeed!;
                          const maybe = vf(
                              name as keyof Values,
                              value as any,
                              context as any,
                          );
                          return typeof maybe === "undefined"
                              ? original
                              : maybe;
                      }
                    : undefined);

            for (const field of fetchAllNamedFields()) {
                const rawName = field.name;
                if (!rawName) continue;
                if ((field as any).ignore) continue;

                const trimmed = rawName.trim();
                if (!trimmed) continue;

                const isArray = trimmed.endsWith("[]");
                const base = trimmed.replace(/\[]$/, "");
                const sharedKey = (field as any).shared as string | undefined;
                const key = sharedKey ? `${sharedKey}.${base}` : base;

                let value: unknown = undefined;

                if (sharedKey) {
                    const group = root[sharedKey];
                    if (group && typeof group === "object") {
                        if (isArray && Array.isArray(group[base])) {
                            const idx = seen[key] ?? 0;
                            value = (group[base] as unknown[])[idx];
                            seen[key] = idx + 1;
                        } else {
                            value = group[base];
                        }
                    }
                } else {
                    if (isArray && Array.isArray(root[base])) {
                        const idx = seen[key] ?? 0;
                        value = (root[base] as unknown[])[idx];
                        seen[key] = idx + 1;
                    } else {
                        value = root[base];
                    }
                }

                const anyField = field as any;
                const original =
                    typeof anyField.getValue === "function"
                        ? anyField.getValue()
                        : anyField.value;

                let next = value;
                if (useFeed) {
                    const maybe = useFeed(base, value, original);
                    if (typeof maybe === "undefined") {
                        continue;
                    }
                    next = maybe;
                }

                if (typeof anyField.setValue === "function") {
                    anyField.setValue(next);
                } else {
                    anyField.value = next;
                }
            }

            if (propsRef.current.onUpdate) {
                propsRef.current.onUpdate(collectValues());
            }
        },

        setValue(name: string, value: unknown): void {
            if (!name) return;

            let sharedKey: string | undefined;
            let base = name;

            if (name.includes(".")) {
                const [group, field] = name.split(".", 2);
                sharedKey = group;
                base = field;
            }

            const targetField = fetchAllNamedFields().find((f) => {
                const raw = (f.name ?? "").trim();
                if (!raw) return false;

                const isArray = raw.endsWith("[]");
                const rawBase = raw.replace(/\[]$/, "");
                const fShared = (f as any).shared as string | undefined;

                const sameGroup = fShared === sharedKey;
                const sameName =
                    raw === name ||
                    rawBase === base ||
                    `${fShared}.${rawBase}` === name;

                return (!sharedKey || sameGroup) && sameName && !isArray;
            });

            if (targetField) {
                const anyField = targetField as any;
                if (typeof anyField.setValue === "function") {
                    anyField.setValue(value);
                } else {
                    anyField.value = value;
                }
            } else {
                bucketRef.current[name] = value;
            }

            if (propsRef.current.onUpdate) {
                propsRef.current.onUpdate(collectValues());
            }
        },

        go(data?: Partial<Values>, ignoreForm?: boolean): void {
            void submitWithAdapter(undefined, data, ignoreForm, true, true);
        },

        reset(inputs: string[]): void {
            if (!inputs.length) return;

            for (const field of fetchAllNamedFields()) {
                const raw = field.name;
                if (!raw) continue;
                if (!inputs.includes(raw)) continue;

                const anyField = field as any;
                if (typeof anyField.reset === "function") {
                    anyField.reset();
                } else if (typeof anyField.setValue === "function") {
                    anyField.setValue(undefined);
                } else {
                    anyField.value = undefined;
                }
            }
        },

        set button(btn: ButtonRef) {
            buttonRef.current = btn;
        },

        async forceSubmit(): Promise<void> {
            await submitWithAdapter(undefined, undefined, false, true, true);
        },

        get fields(): Field[] {
            return fetchAllNamedFields();
        },

        get props() {
            const { formRef, valueBag, ...rest } = propsRef.current;
            return rest as any;
        },

        setActiveButton(name: string): void {
            activeButtonNameRef.current = name;
        },

        hasUncaughtErrors,

        getUncaught(): readonly string[] {
            return uncaughtRef.current;
        },
    } as CoreContext<Values>;

    // formRef exposure
    React.useEffect(() => {
        if (!props.formRef) return;

        props.formRef.current = context;
        return () => {
            if (props.formRef) {
                props.formRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    // init hook once
    React.useEffect(() => {
        if (props.init) {
            props.init(context);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CoreContextReact.Provider value={context as any}>
            {props.children}
        </CoreContextReact.Provider>
    );
}
