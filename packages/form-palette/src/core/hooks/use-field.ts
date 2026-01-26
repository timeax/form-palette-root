// src/core/hooks/use-field.ts
// noinspection JSUnusedGlobalSymbols,GrazieInspection

import * as React from "react";

import { useCoreContext } from "@/core/hooks/use-core-context";
import type { CoreContext, Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import { VariantKey } from "@/schema/variant";

export type UseFieldValidate<T> = (
    value: T,
    field?: Field,
    form?: CoreContext<any>,
    report?: boolean,
) => boolean | string;

export interface UseFieldOptions<T = unknown> {
    /**
     * Primary field name.
     *
     * This is the key that will show up in the values snapshot and
     * error bags (unless mapped via `shared` or `alias`).
     */
    name?: string;

    variant: VariantKey

    /**
     * Optional internal binding identifier.
     *
     * Used by the bound helpers (observeBoundField, waitForBoundField)
     * and the binder registry.
     */
    bindId?: string;

    /**
     * Optional external binding key – a semantic identifier for this
     * field’s binding group.
     *
     * Example:
     *   bind="shipping"
     */
    bind?: string;

    /**
     * Shared key for nested grouping, e.g:
     *
     *   shared="profile", name="first_name"
     *   → values.profile.first_name
     */
    shared?: string;

    /**
     * Optional grouping identifier used to group related controls
     * (e.g. radio groups, segmented inputs).
     */
    groupId?: string;

    /**
     * Optional alias for error / mapping purposes.
     *
     * Example:
     *   alias="email" but name="contact.email"
     */
    alias?: string;

    /**
     * Marks this field as the "main" one in a group.
     */
    main?: boolean;

    /**
     * If true, this field is ignored by snapshot / some validation
     * flows, but may still exist in the registry.
     */
    ignore?: boolean;

    /**
     * Whether the field is required.
     */
    required?: boolean;

    /**
     * Controlled value prop.
     */
    value?: T;

    /**
     * Initial/default value for this field.
     */
    defaultValue?: T;

    /**
     * Initial disabled flag.
     */
    disabled?: boolean;

    /**
     * Initial readOnly flag.
     */
    readOnly?: boolean;

    /**
     * Custom validation hook.
     *
     * Return:
     * - `true`       → valid
     * - `false`      → invalid (no message)
     * - `"message"`  → invalid with explicit message
     */
    validate?: UseFieldValidate<T>;

    /**
     * Optional projector to derive an "original" value from the
     * initial default.
     */
    getOriginalValue?(value: T | undefined): unknown;

    /**
     * Local change hook for the field.
     *
     * This is in addition to the form-level `onChange`.
     */
    onValueChange?(next: T, prev: T, variant: string): void;

    onSubmit?(e: any): any;
}

export interface UseFieldReturn<T = unknown> {
    /** Ref to the underlying DOM element */
    ref: React.RefObject<HTMLElement>;
    key: string;
    /** Current value */
    value: T | undefined;
    setValue(next: T | undefined, variant?: string): void;

    /** Current error message */
    error: string;
    setError(message: string): void;

    /** Async-loading flag (e.g. remote validation) */
    loading: boolean;
    setLoading(loading: boolean): void;

    /** Required flag */
    required: boolean;
    setRequired(required: boolean): void;

    /** Disabled flag */
    disabled: boolean;
    setDisabled(disabled: boolean): void;

    /** Readonly flag */
    readOnly: boolean;
    setReadOnly(readOnly: boolean): void;

    /** Metadata / wiring */
    name: string;
    bindId: string;
    bind?: string;
    shared?: string;
    groupId?: string;
    alias?: string;
    main?: boolean;
    ignore?: boolean;

    /** Snapshots */
    readonly defaultValue: T | undefined;
    readonly originalValue: unknown;

    /** Owning core context */
    form: CoreContext<Dict>;

    /** Run validation (optionally reporting errors) */
    validate(report?: boolean): boolean | undefined;
}

/**
 * Strict field hook.
 *
 * - Registers the field with the core provider / registry.
 * - Exposes value/error/loading and lifecycle helpers.
 * - Wires into:
 *   - core-level `onChange`
 *   - `controlButton()` dirty logic
 */
export function useField<T = unknown>(
    options: UseFieldOptions<T>,
): UseFieldReturn<T> {
    const form = useCoreContext<Dict>();

    const {
        name: rawName,
        bindId: rawBindId,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        required: requiredProp = false,
        value: valueProp,
        defaultValue,
        disabled: disabledProp = false,
        readOnly: readOnlyProp = false,
        validate,
        getOriginalValue,
        onValueChange,
        onSubmit,
    } = options;

    const ref = React.useRef<HTMLElement>(null);

    // Core state (value, error, loading, original) lives in a ref
    const stateRef = React.useRef<{
        value: T | undefined;
        error: string;
        loading: boolean;
        original: unknown;
    }>({
        value: defaultValue,
        error: "",
        loading: false,
        original: getOriginalValue
            ? getOriginalValue(defaultValue)
            : defaultValue,
    });

    // React state mirrors (used for rerenders)
    const [valueState, setValueState] = React.useState<T | undefined>(
        stateRef.current.value,
    );

    const isControlled = valueProp !== undefined;
    const value = isControlled ? valueProp : valueState;

    React.useEffect(() => {
        if (isControlled && valueProp !== stateRef.current.value) {
            stateRef.current.value = valueProp;
            setValueState(valueProp);
        }
    }, [isControlled, valueProp]);
    const [error, setErrorState] = React.useState<string>(
        stateRef.current.error,
    );
    const [loading, setLoadingState] = React.useState<boolean>(
        stateRef.current.loading,
    );
    const [required, setRequired] = React.useState<boolean>(
        Boolean(requiredProp),
    );
    const [disabled, setDisabled] = React.useState<boolean>(
        Boolean(disabledProp),
    );
    const [readOnly, setReadOnly] = React.useState<boolean>(
        Boolean(readOnlyProp),
    );

    const id = React.useId();
    // Stable wiring keys
    // @ts-ignore
    const keyRef = React.useRef<string>(
        (() => {
            if (rawName && rawName.trim()) return `${rawName.trim()}-${id}`;
            if (rawBindId && rawBindId.trim())
                return `${rawBindId.trim()}-${id}`;
            return `field-${Math.random().toString(36).slice(2)}-${id}`;
        })(),
    ) as React.RefObject<string>;

    const bindIdRef = React.useRef<string>(
        (rawBindId && rawBindId.trim()) || keyRef.current,
    );

    const fieldRef = React.useRef<Field | null>(null);

    // Build the Field object once
    if (!fieldRef.current) {
        const key = keyRef.current;
        const bindId = bindIdRef.current;
        const trimmedName = rawName?.trim() ?? "";

        const validateFn = (report?: boolean): boolean => {
            const formDisabled = false; // core-level disable could be added later
            const curDisabled = formDisabled || disabled || readOnly;

            if (curDisabled && !report) {
                return true;
            }

            const current = stateRef.current.value as T;
            let ok = true;
            let message = "";

            if (
                required &&
                (current === undefined ||
                    current === null ||
                    (typeof current === "string" && current.trim() === "") ||
                    (Array.isArray(current) && current.length === 0))
            ) {
                ok = false;
                message = "This field is required.";
            } else if (validate) {
                const result = validate(
                    current,
                    fieldRef.current!,
                    form,
                    !!report,
                );
                if (typeof result === "string") {
                    ok = false;
                    message = result;
                } else if (!result) {
                    ok = false;
                }
            }

            if (!report) {
                return ok;
            }

            // Report mode → set/clear error
            stateRef.current.error = ok ? "" : message;
            setErrorState(ok ? "" : message);
            return ok;
        };

        const f: Field = {
            key,
            bindId,
            bind,
            name: trimmedName,
            shared,
            groupId,
            alias,
            main,
            ignore,
            required,
            onSubmit,
            ref: ref as React.RefObject<HTMLElement>,
            get defaultValue() {
                return stateRef.current.original;
            },
            get value() {
                return stateRef.current.value;
            },
            set value(v: unknown) {
                stateRef.current.value = v as T | undefined;
                setValueState(v as T | undefined);
            },
            get originalValue() {
                return stateRef.current.original;
            },
            get error() {
                return stateRef.current.error;
            },
            set error(msg: string) {
                stateRef.current.error = msg;
                setErrorState(msg);
            },
            get loading() {
                return stateRef.current.loading;
            },
            set loading(v: boolean) {
                stateRef.current.loading = v;
                setLoadingState(v);
            },
            validate: validateFn,
            onChange(value: unknown, old: unknown, variant: string) {
                if (onValueChange) {
                    onValueChange(value as T, old as T, variant);
                }
            },
            variant: options.variant
            // Flags not directly on the Field interface but used via `as any`
            // in core-provider (getValue/setValue/reset).
        } as Field & {
            getValue(): T | undefined;
            setValue(next: T | undefined): void;
            reset(): void;
        };

        // Imperative helpers used by the core
        (f as any).getValue = () => stateRef.current.value;
        (f as any).setValue = (next: T | undefined) => {
            stateRef.current.value = next;
            setValueState(next);
        };
        (f as any).reset = () => {
            stateRef.current.value = defaultValue;
            stateRef.current.error = "";
            stateRef.current.loading = false;

            setValueState(defaultValue);
            setErrorState("");
            setLoadingState(false);
        };

        fieldRef.current = f;
    }

    const field = fieldRef.current;

    // Sync prop-driven flags when they change
    React.useEffect(() => {
        setRequired(requiredProp);
        if (field) {
            field.required = requiredProp;
        }
    }, [requiredProp, field]);

    React.useEffect(() => {
        setDisabled(disabledProp);
    }, [disabledProp]);

    React.useEffect(() => {
        setReadOnly(readOnlyProp);
    }, [readOnlyProp]);

    // Register field with the core
    React.useEffect(() => {
        if (!field) return;

        form.addField(field);

        return () => {
            // Remove from registry directly
            const registry = form.inputs as any;
            if (registry && typeof registry.remove === "function") {
                registry.remove(field.key);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, field]);

    // Value setter that wires into form-level change + button control
    function setValue(next: T | undefined, variant: string = "direct") {
        const prev = stateRef.current.value as T | undefined;
        if (Object.is(prev, next)) return;

        const runFormOnChange = () => {
            const props: any = form.props ?? {};
            const fn = props.onChange as
                | ((
                      form: CoreContext<Dict>,
                      current: Field,
                      options: Dict,
                  ) => void)
                | undefined;

            if (!fn) return;

            fn(form as any, field, {
                variant,
                value: next,
                previous: prev,
            });
        };

        const props: any = form.props ?? {};
        const changeBefore = !!props.changeBefore;

        if (changeBefore) {
            runFormOnChange();
        }

        stateRef.current.value = next;
        setValueState(next);

        // Local field-level onChange
        if (field.onChange) {
            field.onChange(next, prev, variant);
        }

        if (!changeBefore) {
            runFormOnChange();
        }

        // Let the core adjust the active button’s disabled state
        form.controlButton();
    }

    function setError(message: string) {
        stateRef.current.error = message;
        setErrorState(message);
    }

    function setLoading(loading: boolean) {
        stateRef.current.loading = loading;
        setLoadingState(loading);
    }

    return {
        ref: ref as React.RefObject<HTMLElement>,
        get key() {
            return keyRef.current!;
        },
        value,
        setValue,
        error,
        setError,
        loading,
        setLoading,
        required,
        setRequired,
        disabled,
        setDisabled,
        readOnly,
        setReadOnly,
        name: field.name!,
        bindId: field.bindId!,
        bind: field.bind,
        shared: field.shared,
        groupId: field.groupId,
        alias: field.alias,
        main: field.main,
        ignore: field.ignore,
        get defaultValue() {
            return stateRef.current.original as T | undefined;
        },
        get originalValue() {
            return stateRef.current.original;
        },
        form,
        validate(report?: boolean) {
            return field.validate?.(report);
        },
    };
}
