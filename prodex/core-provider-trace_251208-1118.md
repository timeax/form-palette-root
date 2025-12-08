# Index 

Included Source Files (13)
- [packages/form-palette/src/core/adapter-registry.ts](#1)
- [packages/form-palette/src/core/bound/bind-host.ts](#2)
- [packages/form-palette/src/core/bound/observe-bound-field.ts](#3)
- [packages/form-palette/src/core/bound/wait-for-bound-field.ts](#4)
- [packages/form-palette/src/core/context.ts](#5)
- [packages/form-palette/src/core/core-provider.tsx](#6)
- [packages/form-palette/src/core/errors/map-error-bag.ts](#7)
- [packages/form-palette/src/core/errors/map-zod.ts](#8)
- [packages/form-palette/src/core/registry/binder-registry.ts](#9)
- [packages/form-palette/src/core/registry/field-registry.ts](#10)
- [packages/form-palette/src/schema/adapter.ts](#11)
- [packages/form-palette/src/schema/core.ts](#12)
- [packages/form-palette/src/schema/field.ts](#13)

---
---
#### 1


` File: packages/form-palette/src/core/adapter-registry.ts`  [↑ Back to top](#index)

```ts
// src/core/adapter-registry.ts

import { AdapterKey, AdapterOk, NamedAdapterFactory } from "@/schema/adapter";

/**
 * Internal registry of adapter factories.
 *
 * We keep it simple: a plain JS object keyed by AdapterKey.
 */
const registry: Partial<
    Record<AdapterKey, NamedAdapterFactory<AdapterKey, any>>
> = {};

/**
 * Built-in 'local' adapter.
 *
 * Semantics:
 * - send(options?) resolves to `{ data: Body }`
 * - submit/run do nothing by default (no side effects)
 *
 * The core will typically call onSubmitted with the result of send().
 */
export const localAdapter: NamedAdapterFactory<"local", any> = (config) => {
    return {
        submit() {
            // no-op; core is responsible for calling onSubmitted
            // using send() if it chooses to.
        },
        async send() {
            const result: AdapterOk<"local"> = { data: config.data };

            if (config.callbacks?.onSuccess) {
                config.callbacks.onSuccess(result);
            }

            if (config.callbacks?.onFinish) {
                config.callbacks.onFinish();
            }

            return result;
        },
        run() {
            // By default, run behaves like submit (no-op),
            // but hosts can choose to always call send() instead.
            this.submit();
        },
    };
};

/**
 * Initialise registry with the built-in 'local' adapter.
 */
registry.local = localAdapter as NamedAdapterFactory<AdapterKey, any>;

/**
 * Register or override an adapter factory for a given key.
 *
 * Hosts can call this at bootstrap time, e.g.:
 *
 *   registerAdapter<'axios'>('axios', axiosAdapter);
 */
export function registerAdapter<K extends AdapterKey, Body = any>(
    key: K,
    factory: NamedAdapterFactory<K, Body>
): void {
    registry[key] = factory as NamedAdapterFactory<AdapterKey, any>;
}

/**
 * Lookup an adapter factory by key.
 *
 * If no adapter is found for the given key, this returns undefined.
 */
export function getAdapter<K extends AdapterKey>(
    key: K
): NamedAdapterFactory<K, any> | undefined {
    const factory = registry[key];

    return factory as NamedAdapterFactory<K, any> | undefined;
}

/**
 * Check whether an adapter is registered for the given key.
 */
export function hasAdapter(key: AdapterKey): boolean {
    return typeof registry[key] === "function";
}
```

---
#### 2


` File: packages/form-palette/src/core/bound/bind-host.ts`  [↑ Back to top](#index)

```ts
// src/core/bound/bind-host.ts (or inline in binder-registry.ts)
import type { Dict, CoreContext } from "@/schema/core";
import type { Field } from "@/schema/field";

/**
 * Minimal surface needed for bound helpers.
 *
 * CoreContext already satisfies this, and FieldRegistry can be made to
 * satisfy it as well (via getBind).
 */
export interface BindHost<V extends Dict = Dict> {
    getBind(id: string): Field | undefined;
    controlButton?(): void;
}
```

---
#### 3


` File: packages/form-palette/src/core/bound/observe-bound-field.ts`  [↑ Back to top](#index)

```ts
// src/core/bound/observe-bound-field.ts

import type { Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { BindHost } from "@/core/bound/bind-host";

/** Get the live bound field (if mounted and present). */
export function getBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string
): Field | undefined {
    return host.getBind(bindId);
}

export function hasBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string
): boolean {
    return !!getBoundField(host, bindId);
}

export function readBoundValue<T = unknown, V extends Dict = Dict>(
    host: BindHost<V>,
    bindId: string
): T | undefined {
    return getBoundField(host, bindId)?.value as T | undefined;
}

export function setBoundValue<T = unknown, V extends Dict = Dict>(
    host: BindHost<V>,
    bindId: string,
    value: T,
    variant: string = "util"
): boolean {
    const f = getBoundField(host, bindId);
    if (!f) return false;

    (f as any).value = value as unknown;

    // optional: dirty/enable logic if host supports it
    try {
        host.controlButton?.();
    } catch {
        // ignore
    }

    (f as any).onChange?.(value, undefined, variant);
    return true;
}

export function setBoundError<V extends Dict>(
    _host: BindHost<V>, // host not strictly needed here
    bindId: string,
    msg: string
): boolean {
    const f = _host.getBind(bindId);
    if (!f) return false;
    (f as any).error = msg ?? "";
    return true;
}

export function validateBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string,
    report = true
): boolean {
    const f = getBoundField(host, bindId);
    if (!f) return false;
    return !!(f as any).validate?.(report);
}

/**
 * Observe a bound field for value/error + liveness.
 */
export function observeBoundField<T = unknown, V extends Dict = Dict>(
    host: BindHost<V>,
    bindId: string,
    handler: (evt: {
        exists: boolean;
        field?: Field;
        value?: T;
        error?: string;
    }) => void,
    pollMs = 300
): () => void {
    let current: Field | undefined = getBoundField(host, bindId);
    let restoreOnChange: Field["onChange"] | undefined;

    const fire = () => {
        if (!current) {
            handler({ exists: false });
            return;
        }

        handler({
            exists: true,
            field: current,
            value: (current as any).value as T,
            error: (current as any).error,
        });
    };

    const wire = () => {
        const f = getBoundField(host, bindId);

        if (f === current) return;

        if (current && restoreOnChange) {
            (current as any).onChange = restoreOnChange;
            restoreOnChange = undefined;
        }

        current = f;

        if (current) {
            restoreOnChange = (current as any).onChange;
            (current as any).onChange = (
                next: unknown,
                prev: unknown,
                variant: string
            ) => {
                restoreOnChange?.(next, prev, variant);
                handler({
                    exists: true,
                    field: current,
                    value: next as T,
                    error: (current as any).error,
                });
            };
        }

        fire();
    };

    // initial
    wire();

    let intervalId: number | undefined;
    if (typeof window !== "undefined") {
        intervalId = window.setInterval(wire, pollMs);
    }

    let mo: MutationObserver | undefined;
    if (
        typeof MutationObserver !== "undefined" &&
        typeof document !== "undefined"
    ) {
        try {
            mo = new MutationObserver(wire);
            mo.observe(document.body, {
                childList: true,
                subtree: true,
            });
        } catch {
            // ignore
        }
    }

    return () => {
        if (typeof window !== "undefined" && typeof intervalId === "number") {
            window.clearInterval(intervalId);
        }
        if (mo) {
            mo.disconnect();
            mo = undefined;
        }
        if (current && restoreOnChange) {
            (current as any).onChange = restoreOnChange;
            restoreOnChange = undefined;
        }
    };
}
```

---
#### 4


` File: packages/form-palette/src/core/bound/wait-for-bound-field.ts`  [↑ Back to top](#index)

```ts
// src/core/bound/wait-for-bound-field.ts

import type { Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { BindHost } from "@/core/bound/bind-host";
import {
    getBoundField,
    observeBoundField,
} from "@/core/bound/observe-bound-field";

export function waitForBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string,
    timeoutMs = 5000
): Promise<Field> {
    const existing = getBoundField(host, bindId);
    if (existing) return Promise.resolve(existing);

    return new Promise<Field>((resolve, reject) => {
        let settled = false;

        const settleResolve = (field: Field) => {
            if (settled) return;
            settled = true;
            stop();
            clearTimeout(to);
            resolve(field);
        };

        const settleReject = (error: Error) => {
            if (settled) return;
            settled = true;
            stop();
            clearTimeout(to);
            reject(error);
        };

        const stop = observeBoundField(
            host,
            bindId,
            (e) => {
                if (e.exists && e.field) {
                    settleResolve(e.field);
                }
            },
            150
        );

        const to = setTimeout(() => {
            settleReject(
                new Error(
                    `waitForBoundField('${bindId}') timed out after ${timeoutMs}ms`
                )
            );
        }, timeoutMs);
    });
}
```

---
#### 5


` File: packages/form-palette/src/core/context.ts`  [↑ Back to top](#index)

```ts
// src/core/context.ts
import React from "react";
import type { CoreContext, Dict } from "@/schema/core";

/**
 * Non-generic alias for the core context type used at runtime.
 *
 * We store CoreContext<Dict> in React context and let
 * caller-side hooks (useCore, useCoreContext, etc.) cast
 * to a more specific generic shape when needed.
 */
export type AnyCoreContext = CoreContext<Dict>;

/**
 * React context carrying the current form/core instance.
 *
 * - Provider is set up in core-provider.tsx.
 * - Consumers should generally use the typed hook in
 *   hooks/use-core-context.ts instead of reading this directly.
 */
export const CoreContextReact = React.createContext<AnyCoreContext | null>(
    null
);
```

---
#### 6


` File: packages/form-palette/src/core/core-provider.tsx`  [↑ Back to top](#index)

```tsx
// src/core/core-provider.tsx
// noinspection JSConstantReassignment,JSUnusedGlobalSymbols,GrazieInspection

import * as React from "react";

import { CoreContextReact } from "@/core/context";
import { mapZodError } from "@/core/errors/map-zod";
import { mapErrorBag } from "@/core/errors/map-error-bag";
import { getAdapter, localAdapter } from "@/core/adapter-registry";
import { FieldRegistry } from "@/core/registry/field-registry";

import type { z } from "zod";
import type { AdapterKey, AdapterResult, Method } from "@/schema/adapter";
import type {
    CoreContext,
    CoreProps,
    Dict,
    InferFromSchema,
    SubmitEvent,
    ValuesResult,
} from "@/schema/core";
import type { ButtonRef, Field } from "@/schema/field";

type Props<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey,
> = CoreProps<V, S, K> & {
    children?: React.ReactNode;
};

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
 * - Manages errors + uncaught messages
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

    // bucket, errors, button
    const bucketRef = React.useRef<Dict>({});
    const uncaughtRef = React.useRef<string[]>([]);
    const buttonRef = React.useRef<ButtonRef | null>(null);
    const activeButtonNameRef = React.useRef<string | null>(null);

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

            if (isArray) {
                const existing = target[base];
                if (Array.isArray(existing)) {
                    target[base] = [...existing, val];
                } else if (typeof existing === "undefined") {
                    target[base] = [val];
                } else {
                    target[base] = [existing, val];
                }
            } else {
                target[base] = val;
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
                            fieldErrors
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

    // ─────────────────────────────────────────────────────────
    // Submission
    // ─────────────────────────────────────────────────────────

    async function submitWithAdapter(
        method: Method,
        route: string,
        extra?: Partial<Values>,
        ignoreForm?: boolean,
        autoErr: boolean = true,
        autoRun: boolean = true
    ): Promise<AdapterResult<any> | undefined> {
        const currentProps = propsRef.current;

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

        const event: SubmitEvent<Values> = {
            preventDefault() {
                this.continue = false;
            },
            editData(cb) {
                const result = cb(submissionValues);
                if (result) {
                    submissionValues = result;
                }
            },
            setRoute(newRoute: string) {
                route = newRoute;
            },
            setMethod(newMethod: Method) {
                method = newMethod;
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
            method,
            url: route,
            data: submissionValues,
            callbacks: {
                onSuccess(ok: unknown) {
                    const maybe = propsRef.current.onSubmitted;
                    if (maybe) {
                        void maybe(context, ok as any, () => {
                            finish();
                        });
                    }
                },
                onError(err: unknown) {
                    if (!autoErr || !err || typeof err !== "object") {
                        return;
                    }

                    const anyErr = err as any;
                    if (anyErr.errors && typeof anyErr.errors === "object") {
                        const { fieldErrors, uncaught } = mapErrorBag(
                            anyErr.errors
                        );
                        for (const [name, message] of Object.entries(
                            fieldErrors
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
            } catch {
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
                        context as any
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
            maybeMsg?: string
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
            autoErr?: boolean
        ): Promise<AdapterResult<any> | undefined> {
            return submitWithAdapter(
                type,
                route,
                extra,
                ignoreForm,
                autoErr,
                false
            );
        },

        persist(
            data: Partial<Values>,
            feed?: (name: string, value: unknown, original: unknown) => unknown
        ): void {
            const seen: Record<string, number> = {};
            const root = data as any;

            const useFeed =
                feed ||
                (propsRef.current.valueFeed
                    ? (
                        name: string,
                        value: unknown,
                        original: unknown
                    ): unknown => {
                        const vf = propsRef.current.valueFeed!;
                        const maybe = vf(
                            name as keyof Values,
                            value as any,
                            context as any
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
            void submitWithAdapter("post", "", data, ignoreForm, true, true);
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
            await submitWithAdapter("post", "", undefined, false, true, true);
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
```

---
#### 7


` File: packages/form-palette/src/core/errors/map-error-bag.ts`  [↑ Back to top](#index)

```ts
// src/core/errors/map-error-bag.ts

export type ErrorBag = Record<string, string | string[] | undefined | null>;

export type ErrorBagMapResult = {
    /** Field-specific errors keyed by field name. */
    fieldErrors: Record<string, string>;
    /** Errors that could not be mapped to a specific field. */
    uncaught: string[];
};

/**
 * Map a generic "error bag" object into field errors + uncaught messages.
 *
 * Typical input:
 *   {
 *     name: "Name is required",
 *     email: ["Email is invalid"],
 *     message: "Something went wrong" // global
 *   }
 *
 * Heuristics:
 * - Keys like "message", "error", "_", "global" → treated as global/uncaught.
 * - Everything else → treated as a field error.
 * - Array values are joined with "\n".
 */
export function mapErrorBag(bag: ErrorBag): ErrorBagMapResult {
    const fieldErrors: Record<string, string> = {};
    const uncaught: string[] = [];

    const GLOBAL_KEYS = new Set(["message", "error", "errors", "_", "global"]);

    for (const [key, raw] of Object.entries(bag)) {
        if (raw == null) continue;

        const value = Array.isArray(raw)
            ? raw.filter(Boolean).join("\n")
            : String(raw);

        if (!value) continue;

        if (GLOBAL_KEYS.has(key)) {
            uncaught.push(value);
        } else {
            const existing = fieldErrors[key];
            fieldErrors[key] = existing ? `${existing}\n${value}` : value;
        }
    }

    return { fieldErrors, uncaught };
}
```

---
#### 8


` File: packages/form-palette/src/core/errors/map-zod.ts`  [↑ Back to top](#index)

```ts
// src/core/errors/map-zod.ts
import type { $ZodIssue, $ZodError } from "zod/v4/core";

export type ZodErrorMapResult = {
    /** Field-specific errors keyed by field name. */
    fieldErrors: Record<string, string>;
    /** Errors that could not be mapped to a specific field. */
    uncaught: string[];
};

/**
 * Map a ZodError into field-specific errors + uncaught messages.
 *
 * Heuristics:
 * - If issue.path[0] is a string → treated as a field name.
 * - Otherwise → message is pushed into `uncaught`.
 *
 * If a field has multiple issues, messages are joined with `\n`.
 */
export function mapZodError(error: $ZodError): ZodErrorMapResult {
    const fieldErrors: Record<string, string> = {};
    const uncaught: string[] = [];

    for (const issue of error.issues as $ZodIssue[]) {
        const path = issue.path;
        const message = issue.message || "Validation error";

        const first = path[0];

        if (typeof first === "string" && first.length > 0) {
            const existing = fieldErrors[first];
            fieldErrors[first] = existing ? `${existing}\n${message}` : message;
        } else {
            uncaught.push(message);
        }
    }

    return { fieldErrors, uncaught };
}
```

---
#### 9


` File: packages/form-palette/src/core/registry/binder-registry.ts`  [↑ Back to top](#index)

```ts
// src/core/registry/binder-registry.ts
// noinspection JSUnusedGlobalSymbols

import type { Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { BindHost } from "@/core/bound/bind-host";
import {
    getBoundField,
    hasBoundField,
    readBoundValue,
    setBoundValue,
    setBoundError,
    validateBoundField,
    observeBoundField,
} from "@/core/bound/observe-bound-field";
import { waitForBoundField } from "@/core/bound/wait-for-bound-field";

/**
 * BinderRegistry: bound-field utilities for a given host (CoreContext or FieldRegistry).
 *
 * - Hosts must satisfy BindHost (getBind + optional controlButton).
 * - FieldRegistry already does (via getBind() we added).
 * - CoreContext also does.
 *
 * You typically access this via:
 *   form.inputs.binding  // where inputs is a FieldRegistry
 */
export class BinderRegistry<V extends Dict = Dict> {
    constructor(private readonly host: BindHost<V>) {}

    /** Raw field access. */
    get(bindId: string): Field | undefined {
        return getBoundField(this.host, bindId);
    }

    has(bindId: string): boolean {
        return hasBoundField(this.host, bindId);
    }

    /** Read current value. */
    value<T = unknown>(bindId: string): T | undefined {
        return readBoundValue<T, V>(this.host, bindId);
    }

    /** Set value (and trigger controlButton / onChange). */
    set<T = unknown>(
        bindId: string,
        value: T,
        variant: string = "util"
    ): boolean {
        return setBoundValue<T, V>(this.host, bindId, value, variant);
    }

    /** Set error message on the bound field. */
    error(bindId: string, msg: string): boolean {
        return setBoundError<V>(this.host, bindId, msg);
    }

    /** Run the field’s own validate(). */
    validate(bindId: string, report = true): boolean {
        return validateBoundField<V>(this.host, bindId, report);
    }

    /** Observe a bound field’s value/error and liveness. */
    observe<T = unknown>(
        bindId: string,
        handler: (evt: {
            exists: boolean;
            field?: Field;
            value?: T;
            error?: string;
        }) => void,
        pollMs = 300
    ): () => void {
        return observeBoundField<T, V>(this.host, bindId, handler, pollMs);
    }

    /** Wait for a bound field to appear. */
    wait(bindId: string, timeoutMs = 5000): Promise<Field> {
        return waitForBoundField<V>(this.host, bindId, timeoutMs);
    }
}
```

---
#### 10


` File: packages/form-palette/src/core/registry/field-registry.ts`  [↑ Back to top](#index)

```ts
// src/core/registry/field-registry.ts

import type { Field } from "@/schema/field";
import { BinderRegistry } from "@/core/registry/binder-registry";

/**
 * Runtime helper: check if a DOM node is currently attached.
 *
 * Guards against SSR or test environments where document may not exist.
 */
export function isInDom(node: Element | null | undefined): boolean {
    if (!node) return false;
    if (typeof document === "undefined") return false;
    return document.body.contains(node);
}

/**
 * Central store for all fields registered with the core runtime.
 *
 * Responsibilities:
 * - Keep a stable list of Field instances (no duplicates).
 * - Only track fields that have at least one identifier:
 *   - name (non-empty, trimmed)
 *   - bindId
 *   - groupId
 * - Provide convenient lookup methods:
 *   - all / getAllNamed / getAllBound / getAllGrouped
 *   - getByName / getAllByName
 *   - getByGroupId / getAllByGroupId
 *   - getByBind / getAllByBind (binder semantics, prefer mounted)
 */
export class FieldRegistry {
    private list: Field[] = [];
    #binding: BinderRegistry | undefined;

    /**
     * Whether this field should be tracked at all.
     *
     * We require at least one of: name, bindId, groupId.
     */
    hasIdentifier(field: Field): boolean {
        const anyField = field as any;
        const name = (field.name ?? "").trim();
        return !!(name || anyField.bindId || anyField.groupId);
    }

    /**
     * Add a field to the registry if it has an identifier.
     * Duplicate instances are ignored.
     */
    add(field: Field): void {
        if (!this.hasIdentifier(field)) return;
        if (this.list.includes(field)) return;
        this.list.push(field);
    }

    /**
     * Remove a field from the registry.
     */
    remove(field: Field): void {
        const idx = this.list.indexOf(field);
        if (idx === -1) return;
        this.list.splice(idx, 1);
    }

    /**
     * Clear all tracked fields.
     */
    clear(): void {
        this.list = [];
    }

    /**
     * All fields tracked by this registry.
     */
    all(): Field[] {
        return this.list;
    }

    // ─────────────────────────────────────────────────────────
    // “views” over the list
    // ─────────────────────────────────────────────────────────

    /** All fields that have a non-empty name. */
    getAllNamed(): Field[] {
        return this.list.filter((f) => !!(f.name && f.name.trim().length > 0));
    }

    /** All fields that have a bindId. */
    getAllBound(): Field[] {
        return this.list.filter((f) => (f as any).bindId);
    }

    /** All fields that have a groupId. */
    getAllGrouped(): Field[] {
        return this.list.filter((f) => (f as any).groupId);
    }

    // ─────────────────────────────────────────────────────────
    // name-based lookups
    // ─────────────────────────────────────────────────────────

    /**
     * First field with a given name (exact, trimmed match).
     *
     * Note: expects the raw name used by the field, e.g.:
     *   "email"  or  "tags[]"
     */
    getByName(name: string): Field | undefined {
        if (!name) return undefined;
        const target = name.trim();
        if (!target) return undefined;

        return this.list.find((f) => (f.name ?? "").trim() === target);
    }

    /**
     * All fields with a given name (exact, trimmed match).
     */
    getAllByName(name: string): Field[] {
        if (!name) return [];
        const target = name.trim();
        if (!target) return [];

        return this.list.filter((f) => (f.name ?? "").trim() === target);
    }

    // ─────────────────────────────────────────────────────────
    // groupId-based lookups
    // ─────────────────────────────────────────────────────────

    /** First field with the given groupId. */
    getByGroupId(id: string): Field | undefined {
        if (!id) return undefined;
        return this.list.find((f) => (f as any).groupId === id);
    }

    /** All fields with the given groupId. */
    getAllByGroupId(id: string): Field[] {
        if (!id) return [];
        return this.list.filter((f) => (f as any).groupId === id);
    }

    // ─────────────────────────────────────────────────────────
    // bindId-based lookups (binder semantics)
    // ─────────────────────────────────────────────────────────

    /**
     * All fields that share the given bindId.
     */
    getAllByBind(id: string): Field[] {
        if (!id) return [];
        return this.list.filter((f) => (f as any).bindId === id);
    }

    /**
     * First field with the given bindId.
     *
     * Behaviour:
     * - Prefer a field whose ref is currently in the DOM.
     * - If none are mounted, fall back to the first matching field.
     */
    getByBind(id: string): Field | undefined {
        if (!id) return undefined;

        const candidates = this.getAllByBind(id);
        if (!candidates.length) return undefined;

        const mounted = candidates.find((f) => {
            const anyField = f as any;
            const el = anyField.ref?.current as Element | null | undefined;
            return isInDom(el ?? null);
        });

        return mounted ?? candidates[0];
    }

    getBind(id: string): Field | undefined {
        return this.getByBind(id);
    }

    get binding(): BinderRegistry {
        if (!(this.#binding instanceof BinderRegistry))
            this.#binding = new BinderRegistry(this);
        return this.#binding;
    }
}
```

---
#### 11


` File: packages/form-palette/src/schema/adapter.ts`  [↑ Back to top](#index)

```ts
// src/schema/adapter.ts

/**
 * HTTP methods supported by the core adapter layer.
 *
 * This matches the legacy Method union from the old types.ts.
 */
export type Method = 'post' | 'get' | 'delete' | 'put' | 'patch';

/**
 * Lifecycle callbacks used by adapters to report events back to the core.
 *
 * @template Ok  Type of the "successful" response payload (e.g. AxiosResponse).
 * @template Err Type of the "error" payload (e.g. AxiosError, unknown).
 */
export interface AdapterCallbacks<Ok = unknown, Err = unknown> {
    /**
     * Called when the underlying request completes successfully.
     * The adapter decides what "success" means (HTTP 2xx, no exception, etc.).
     */
    onSuccess?(response: Ok): void;

    /**
     * Called when the underlying request fails.
     * Adapters should pass the most informative error shape they have.
     */
    onError?(error: Err): void;

    /**
     * Called at the end of the adapter lifecycle, whether success or error.
     * Useful for clearing loading states, unlocking buttons, etc.
     */
    onFinish?(): void;
}

/**
 * Result interface returned by an adapter.
 *
 * Generic evolution of the legacy AdapterResult:
 *
 *   type AdapterResult = {
 *     submit(options?: unknown): void;
 *     send<T = unknown>(): Promise<AxiosResponse<T>>;
 *     run(options?: unknown): void;
 *   };
 *
 * Differences:
 * - The success payload is generic (Ok) instead of hard-coded to AxiosResponse.
 * - send() always returns Promise<Ok>.
 * - run() may return either void or Promise<Ok>, depending on adapter.
 *
 * @template Ok Type of the "successful" response payload.
 */
export interface AdapterResult<Ok = unknown> {
    /**
     * Fire-and-forget trigger.
     *
     * Intended for flows where the caller does not care about the response
     * object itself (e.g. SPA navigation).
     *
     * @param options Optional adapter-specific options.
     */
    submit(options?: unknown): void;

    /**
     * Promise-based trigger.
     *
     * Intended for flows where the caller wants to await the response object.
     * Adapters should reject the promise when an error occurs.
     *
     * @param options Optional adapter-specific options.
     */
    send(options?: unknown): Promise<Ok>;

    /**
     * Convenience trigger.
     *
     * Adapters are free to implement this as:
     * - submit(options) (returning void), or
     * - send(options) (returning Promise<Ok>).
     *
     * Callers that need strict typing can prefer send();
     * callers that just need "do the thing" can use run().
     *
     * @param options Optional adapter-specific options.
     */
    run(options?: unknown): void | Promise<Ok>;
}

/**
 * Configuration passed from the core runtime to a concrete adapter factory.
 *
 * @template Body Type of the outbound payload (form values + extra data).
 * @template Ok   Type of the "successful" response payload.
 * @template Err  Type of the "error" payload.
 */
export interface AdapterConfig<Body = unknown, Ok = unknown, Err = unknown> {
    /**
     * HTTP method / intent used by the adapter.
     */
    method: Method;

    /**
     * Fully-resolved URL or route string.
     *
     * The core is responsible for resolving named routes, base URLs, etc.,
     * before handing control to the adapter.
     */
    url: string;

    /**
     * Request body payload built by the core.
     *
     * Typically something like:
     *
     *   { ...formValues, ...extra }
     */
    data: Body;

    /**
     * Lifecycle callbacks provided by the core.
     *
     * The adapter should invoke these at the appropriate times; it must not
     * swallow errors without calling onError (when provided).
     */
    callbacks?: AdapterCallbacks<Ok, Err>;
}

/**
 * Factory function type for creating an adapter instance.
 *
 * Concrete implementations (Axios, Inertia, fetch, custom) can conform
 * to this signature. The core runtime only knows about this type and does
 * not depend on any adapter-specific details.
 *
 * @template Body Type of the outbound payload (form values + extra data).
 * @template Ok   Type of the "successful" response payload.
 * @template Err  Type of the "error" payload.
 */
export type AdapterFactory<
    Body = unknown,
    Ok = unknown,
    Err = unknown,
> = (config: AdapterConfig<Body, Ok, Err>) => AdapterResult<Ok>;

/**
 * Registry of adapter flavours.
 *
 * The library hard-codes a single built-in adapter flavour:
 *
 *   - 'local' → host-handled, no transport semantics.
 *               .send() resolves to `{ data: Body }`.
 *
 * Hosts can extend this interface via module augmentation to add
 * their own adapter flavours (e.g. 'axios', 'inertia', ...).
 */
export interface Adapters {
    local: {
        /**
         * Type of the value produced by adapter.send() for this adapter flavour.
         */
        ok: { data: unknown };

        /**
         * Type of the error value passed into callbacks.onError for this adapter.
         */
        err: unknown;
    };
}

/**
 * Union of all adapter keys known to the core.
 *
 * Hosts can extend this union by augmenting the Adapters interface.
 */
export type AdapterKey = keyof Adapters;

/**
 * Helper: given an adapter key K, get its "ok" payload type.
 */
export type AdapterOk<K extends AdapterKey> = Adapters[K]['ok'];

/**
 * Helper: given an adapter key K, get its "error" payload type.
 */
export type AdapterError<K extends AdapterKey> = Adapters[K]['err'];

/**
 * Helper: what CoreProps.onSubmitted receives for adapter K.
 *
 * For now, this is the same as AdapterOk<K>. If a host wants a different
 * shape, they can wrap/transform in their own components.
 */
export type AdapterSubmit<K extends AdapterKey> = AdapterOk<K>;

/**
 * AdapterConfig specialised for a named adapter key K, using the
 * registry's ok/err types for that key.
 *
 * @template K    Adapter key.
 * @template Body Outbound payload type.
 */
export type NamedAdapterConfig<
    K extends AdapterKey,
    Body = unknown,
> = AdapterConfig<Body, AdapterOk<K>, AdapterError<K>>;

/**
 * AdapterFactory specialised for a named adapter key K.
 *
 * @template K    Adapter key.
 * @template Body Outbound payload type.
 */
export type NamedAdapterFactory<
    K extends AdapterKey,
    Body = unknown,
> = (config: NamedAdapterConfig<K, Body>) => AdapterResult<AdapterOk<K>>;
```

---
#### 12


` File: packages/form-palette/src/schema/core.ts`  [↑ Back to top](#index)

```ts
// src/schema/core.ts
// noinspection JSUnusedGlobalSymbols,GrazieInspection

import type React from "react";
import type { z } from "zod";

import type {
    Method,
    AdapterResult,
    AdapterKey,
    AdapterSubmit,
} from "./adapter";
import type { ButtonRef, Field } from "./field";
import { FieldRegistry } from "@/core/registry/field-registry";

/**
 * Generic dictionary type used throughout the core.
 *
 * This matches the legacy Dict<T> from the old types.ts.
 */
export type Dict<T = unknown> = Record<string, T>;

/**
 * If a Zod schema is present, infer the values from that schema;
 * otherwise use the fallback V type. Ensured to be a Dict so it
 * can safely be used as CoreContext's generic argument.
 */
export type InferFromSchema<S, V extends Dict> = S extends z.ZodType
    ? z.infer<S> & Dict
    : V;

/**
 * Event object passed to onSubmit, matching the legacy SubmitEvent
 * but kept transport-agnostic. The host decides how route/method/xhr
 * are interpreted and which adapter is used.
 *
 * @template TValues Shape of the outbound data for this submit event.
 */
export type SubmitEvent<TValues extends Dict> = {
    /**
     * Prevent the default submit behavior.
     *
     * In practice this prevents the core from continuing with its
     * normal submit/prepare flow.
     */
    preventDefault(): void;

    /**
     * Mutate the outbound data just before it is used.
     *
     * The callback may return a new data object or mutate in-place.
     */
    editData(cb: (data: TValues) => TValues | void): void;

    /**
     * Override the route/URL for this submission only.
     *
     * The core itself does not enforce any semantics here; the host
     * is expected to interpret this when wiring submissions.
     */
    setRoute(route: string): void;

    /**
     * Override the HTTP method for this submission only.
     */
    setMethod(method: Method): void;

    /**
     * The button that triggered this submit, if any.
     */
    button?: ButtonRef;

    /**
     * The current outbound data snapshot (after any internal merges).
     */
    readonly formData: TValues;

    /**
     * The core context associated with this submit event.
     */
    form: CoreContext<TValues>;

    /**
     * If set to false, the core will abort the submit flow after
     * this handler returns.
     */
    continue: boolean;
};

/**
 * Shared base props for the core runtime, matching the spirit of
 * the legacy BaseProps, but transport-agnostic.
 *
 * @template V Shape of the underlying value map (pre-schema).
 * @template S Optional Zod schema type.
 */
export type BaseProps<V extends Dict, S extends z.ZodType | undefined> = {
    /**
     * Field names that should be ignored when building diffs or snapshots.
     * Useful for excluding secrets like passwords from logs.
     */
    exceptions?: string[];

    /**
     * Whether the core should persist values to the provided valueBag.
     */
    persist?: boolean;

    /**
     * Optional logical name for the core instance.
     */
    name?: string;

    /**
     * If true, a button may be automatically marked as "active" when
     * certain changes occur.
     */
    activateButtonOnChange?: boolean;

    /**
     * Called whenever a field changes.
     *
     * current is the field that changed; options carries any
     * variant-specific metadata.
     */
    onChange?(
        form: CoreContext<InferFromSchema<S, V>>,
        current: Field,
        options: Dict
    ): void;

    /**
     * Called when the overall values snapshot is considered "updated".
     */
    onUpdate?(values: InferFromSchema<S, V>): void;

    /**
     * If true, onChange may run before certain internal updates.
     */
    changeBefore?: boolean;

    /**
     * Optional ref to the core context instance, for imperative access.
     */
    formRef?: React.MutableRefObject<CoreContext<InferFromSchema<S, V>> | null>;

    /**
     * Initial value bag for hydration / persistence.
     */
    valueBag?: InferFromSchema<S, V>;

    /**
     * Optional hook used to transform a single value as it is being
     * persisted or fed into the core.
     */
    valueFeed?: <K extends keyof InferFromSchema<S, V>>(
        name: K,
        value: InferFromSchema<S, V>[K],
        form: CoreContext<InferFromSchema<S, V>>
    ) => InferFromSchema<S, V>[K] | undefined;

    /**
     * Called at the end of certain flows (legacy "finish" hook).
     *
     * Receives the core context so you can read values, errors, etc.
     */
    onFinish?(form: CoreContext<InferFromSchema<S, V>>): void;

    /**
     * Called after the core initializes.
     */
    init?(form: CoreContext<InferFromSchema<S, V>>): void;

    /**
     * Intercepts the submit event before the core proceeds.
     *
     * You can:
     * - mutate data,
     * - change route/method/xhr flags,
     * - abort by setting e.continue = false.
     */
    onSubmit?<T extends Dict = InferFromSchema<S, V>>(
        e: SubmitEvent<T>
    ): Promise<void> | void;

    /**
     * Optional Zod schema used for validation and value inference.
     */
    schema?: S;
};

/**
 * Public core props, adapter-centric.
 *
 * - The library defines a built-in 'local' adapter flavour.
 *   AdapterSubmit<'local'> is `{ data: unknown }`.
 * - Hosts can extend the Adapters interface (schema/adapter.ts) to add
 *   their own adapter flavours (axios, inertia, etc.) and then use
 *   those keys here.
 *
 * @template V Shape of the underlying value map (pre-schema).
 * @template S Optional Zod schema type.
 * @template K Adapter key; defaults to 'local'.
 */
export interface CoreProps<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
> extends BaseProps<V, S> {
    /**
     * Which adapter flavour this core instance should use.
     *
     * - 'local' (default) → library-defined local submission (no URL/method semantics).
     * - extended keys      → host-defined adapters via Adapters augmentation.
     */
    adapter?: K;

    /**
     * Called after a submission completes. The payload type is derived from
     * the selected adapter key via the adapter registry:
     *
     *   AdapterSubmit<'local'> → { data: unknown }
     *   AdapterSubmit<'axios'> → host-defined type, etc.
     */
    onSubmitted?(
        form: CoreContext<InferFromSchema<S, V>>,
        payload: AdapterSubmit<K>,
        resolve?: () => void
    ): void | Promise<void>;
}

/**
 * Backwards-compatible alias for legacy naming, if you want it.
 */
export type FormProps<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreProps<V, S, K>;

/**
 * Result of a submit operation: values + validity flag.
 */
export type ValuesResult<V extends Dict> = { values: V; valid: boolean };

/**
 * Query API for fields, similar to DOM helpers but scoped
 * to the current form instance.
 *
 * "id" here refers to the field's groupId.
 */
export interface InputStore {
    /** All registered inputs (with at least one identifier). */
    all(): Field[];

    /** All inputs that have a non-empty name. */
    getAllNamed(): Field[];

    /** All inputs that have a bindId. */
    getAllBound(): Field[];

    /** All inputs that have a groupId. */
    getAllGrouped(): Field[];

    /** First field matching an exact name. */
    getByName(name: string): Field | undefined;

    /** All fields matching an exact name. */
    getAllByName(name: string): Field[];

    /** First field with this groupId. */
    getById(id: string): Field | undefined;

    /** All fields with this groupId. */
    getAllById(id: string): Field[];

    /** First bound field with this bindId (prefers mounted fields). */
    getByBind(id: string): Field | undefined;

    /** All fields that share this bindId. */
    getAllByBind(id: string): Field[];
}

/**
 * Core runtime context, renamed from the legacy FormContext.
 *
 * @template V Shape of the values object produced by this core instance.
 */
export interface CoreContext<V extends Dict> {
    /**
     * Compute the current values snapshot from registered fields.
     */
    values(): V;

    /**
     * Run validation and return the values + validity flag.
     */
    submit(): ValuesResult<V>;

    /**
     * Lookup a field by its binding id.
     */
    getBind(id: string): Field | undefined;

    /**
     * Run validation across fields.
     *
     * @param report If true, fields should update their own error states.
     * @returns true if all fields are valid, false otherwise.
     */
    validate(report?: boolean): boolean;

    /**
     * Register a new field with the core.
     */
    addField(field: Field): void;

    /**
     * Generic internal bucket for arbitrary metadata.
     */
    bucket: Dict;

    /**
     * Set a single field error or map an error bag.
     */
    error(name: string, msg: string): void;
    error(bag: Record<string, string>): void;

    /**
     * Re-run button control logic (which button is active/disabled etc.).
     */
    controlButton(): void;

    /**
     * Prepare an adapter-backed request.
     *
     * This mirrors the legacy prepare method:
     * - Builds a payload from values + extra.
     * - May run validation / beforeSubmit hooks.
     * - Returns an adapter result or undefined if aborted.
     *
     * The concrete adapter wiring is the host's responsibility.
     */
    prepare(
        type: Method,
        route: string,
        extra?: Partial<V>,
        ignoreForm?: boolean,
        autoErr?: boolean
    ): Promise<AdapterResult<any> | undefined>;

    /**
     * Persist values to a provided data object, optionally transforming
     * values via the feed function.
     */
    persist(
        data: Partial<V>,
        feed?: (name: string, value: unknown, original: unknown) => unknown
    ): void;

    /**
     * Imperatively set a single value by field name.
     */
    setValue(name: string, value: unknown): void;

    /**
     * Kick off a submit flow using optional extra data.
     */
    go(data?: Partial<V>, ignoreForm?: boolean): void;

    /**
     * Reset specific inputs by name.
     */
    reset(inputs: string[]): void;

    /**
     * Register the current active button.
     */
    set button(v: ButtonRef);

    /**
     * Force a submit regardless of validation state.
     */
    forceSubmit(): Promise<void>;

    /**
     * All registered fields.
     */
    readonly fields: Field[];

    /**
     * Effective core props at runtime, excluding internal-only fields.
     *
     * Note: the adapter key parameter is erased here (set to any) because
     * the runtime does not need the specific key for structural typing;
     * hosts can still use more precise generics at the component level.
     */
    readonly props: Omit<
        CoreProps<V, z.ZodType | undefined, any>,
        "formRef" | "valueBag"
    >;

    /**
     * Mark a button as active by name.
     */
    setActiveButton(name: string): void;

    /**
     * Return uncaught messages (errors that could not be mapped to a field).
     *
     * Typically used by an error strip component.
     */

    getUncaught(): readonly string[];
    /**
     * Field-query "DOM" for this form.
     *
     * Example:
     *   const email = form.inputs.getByName("email");
     *   const phoneFields = form.inputs.getAllById("phone-group");
     *   const bound = form.inputs.getByBind("shipping");
     */
    inputs: Omit<FieldRegistry, "add" | "remove">;

    /**
     * Checks if the form values have changed
     */
    isDirty(): boolean
}
```

---
#### 13


` File: packages/form-palette/src/schema/field.ts`  [↑ Back to top](#index)

```ts
// src/schema/field.ts
// noinspection GrazieInspection

import type { RefObject } from "react";

/**
 * Imperative handle for a submit button registered with the core.
 *
 * This mirrors the legacy `ButtonRef` interface, but is aligned with the
 * current CoreProvider implementation:
 *
 * - The core will try `setLoading(v)` / `setDisabled(v)` if available.
 * - Otherwise, it will fall back to setting `loading` / `disabled` props.
 */
export interface ButtonRef {
    /**
     * Logical name of the button.
     *
     * Used by the core runtime to track the "active" button
     * and to map behaviours to a specific action.
     */
    name: string;

    /**
     * Loading flag. The core may read or assign this directly if
     * no setter is provided.
     */
    loading?: boolean;

    /**
     * Disabled flag. The core may read or assign this directly if
     * no setter is provided.
     */
    disabled?: boolean;

    /**
     * Optional setter used by the core to toggle loading.
     */
    setLoading?(v: boolean): void;

    /**
     * Optional setter used by the core to toggle disabled state.
     */
    setDisabled?(v: boolean): void;
}

/**
 * Runtime representation of a single field registered with the core.
 *
 * This is a direct, type-safe evolution of the legacy `Field` interface
 * from the old `types.ts`, updated to match the new core + binder flow.
 */
export interface Field {
    /**
     * Primary field name, used in values, error bags, and schema mapping.
     *
     * May be omitted for purely bound/virtual fields that participate in
     * binder flows but are not directly part of the value bag.
     */
    name?: string;

    /**
     * Internal binding identifier.
     *
     * Used by "bound" helpers (observe-bound-field, wait-for-bound-field)
     * to locate shared/aliased fields without going through the name.
     */
    bindId?: string;

    /**
     * Optional explicit binding identifier.
     * Use to bind to a specific field in a nested object that has bindId
     */
    bind?: string;

    /**
     * Ref to the underlying DOM element used for focus/scroll operations.
     *
     * Implementations typically point this at the outer wrapper of the field.
     */
    ref?: RefObject<HTMLElement> | null;

    /**
     * Whether this field is required.
     *
     * Variant-level and schema-level validation may use this.
     */
    required?: boolean;

    /**
     * Current error message for the field.
     *
     * Undefined or empty string means "no error".
     */
    error?: string;

    /**
     * Current value of the field, as seen by the core runtime.
     *
     * For formatted inputs, this may be the formatted representation.
     */
    value?: unknown;

    /**
     * Initial/default value for the field.
     *
     * This is typically the "un-touched" value coming from props or
     * from a persisted value bag.
     */
    defaultValue?: unknown;

    /**
     * Original, unformatted value as first seen by the core.
     *
     * This allows callers to compare "what changed" relative to the
     * original snapshot, independent of any display formatting.
     */
    originalValue?: unknown;

    /**
     * Whether this field is currently performing an async operation
     * (e.g. remote validation).
     */
    loading?: boolean;

    /**
     * Optional group identifier used to group related fields together
     * (e.g. radio groups, segmented inputs).
     */
    groupId?: string;

    /**
     * Optional alias for this field.
     *
     * Aliases allow mapping server error bags or schema keys that do
     * not strictly match the `name` property.
     */
    alias?: string;

    /**
     * Marks this field as the "main" one in a group.
     *
     * Used by some variants/layouts to determine which field drives
     * overall group state.
     */
    main?: boolean;

    /**
     * If true, this field will be ignored when building values or
     * running certain validation flows.
     */
    ignore?: boolean;

    /**
     * Stable unique key (distinct from `name` and `bindId`).
     *
     * Used internally by registries and React lists.
     */
    key?: string;

    /**
     * Shared key for fields that share their value (e.g. custom views
     * over the same underlying data).
     *
     * This is used by the core when building nested objects, e.g.:
     *   shared = "profile", name = "first_name"
     *   ⇒ values.profile.first_name
     */
    shared?: string;

    // ─────────────────────────────────────────────────────────
    // Behaviour hooks (implemented by InputField / variants)
    // ─────────────────────────────────────────────────────────

    /**
     * Run validation for this field.
     *
     * @param report If true, the field should update its own error state;
     *               if false, it may simply return whether it is valid.
     * @returns `true` if the field is currently valid, `false` otherwise.
     */
    validate?(report?: boolean): boolean;

    /**
     * Optional hook used by the core or higher-level utilities to retrieve
     * the current value of the field.
     *
     * If omitted, the core will fall back to the `value` property.
     */
    getValue?(): unknown;

    /**
     * Optional hook used by the core or higher-level utilities to update
     * the current value of the field.
     *
     * If omitted, the core will fall back to mutating the `value` property.
     */
    setValue?(value: unknown): void;

    /**
     * Optional hook used by the core to reset the field back to its
     * default/original value.
     */
    reset?(): void;

    /**
     * Optional hook used by the core to set or clear the field error.
     *
     * If omitted, the core will fall back to assigning the `error` property.
     */
    setError?(message?: string): void;

    /**
     * Optional hook called whenever the field value changes.
     *
     * Used by binder utilities to propagate changes across bound fields.
     *
     * @param value   New value.
     * @param old     Previous value.
     * @param source  Source tag responsible for the change
     *                (e.g. "variant", "util", "paste", "programmatic").
     */
    onChange?(value: unknown, old: unknown, source: string): void;
}
```


---
*Generated with [Prodex](https://github.com/emxhive/prodex) — Codebase decoded.*
<!-- PRODEx v1.4.5 | 2025-12-08T10:18:07.854Z -->