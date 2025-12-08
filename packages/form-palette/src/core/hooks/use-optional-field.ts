// src/core/hooks/use-optional-field.ts
// noinspection GrazieInspection
import * as React from "react";
import {
    useField,
    type UseFieldOptions,
    type UseFieldReturn,
} from "@/core/hooks/use-field";
import type { CoreContext, Dict } from "@/schema/core";

/**
 * Optional variant of `useField`.
 *
 * - If there is a CoreProvider, behaves like `useField`.
 * - If not, it becomes a self-managed field (value/error/loading/etc).
 */
export function useOptionalField<T = unknown>(
    options: UseFieldOptions<T>
): UseFieldReturn<T> {
    // Try strict core-bound field first.
    try {
        return useField<T>(options);
    } catch {
        // Fall through to self-managed mode.
    }

    // --- Self-managed fallback (no CoreProvider) ---

    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
            "[FormPalette] useOptionalField: No CoreProvider found. " +
            "Running in self-managed mode."
        );
    }

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
        defaultValue,
        disabled: disabledProp = false,
        readOnly: readOnlyProp = false,
        validate,
        getOriginalValue,
        onValueChange,
    } = options;

    const ref = React.useRef<HTMLElement>(null);

    const [value, setValueState] = React.useState<T | undefined>(defaultValue);
    const [error, setErrorState] = React.useState<string>("");
    const [loading, setLoadingState] = React.useState<boolean>(false);
    const [required, setRequired] = React.useState<boolean>(!!requiredProp);
    const [disabled, setDisabled] = React.useState<boolean>(!!disabledProp);
    const [readOnly, setReadOnly] = React.useState<boolean>(!!readOnlyProp);

    const originalRef = React.useRef<unknown>(
        getOriginalValue
            ? getOriginalValue(defaultValue as T | undefined)
            : defaultValue
    );

    const id = React.useId();

    const keyRef = React.useRef<string>("");
    if (!keyRef.current) {
        if (rawName && rawName.trim()) {
            keyRef.current = `${rawName.trim()}-${id}`;
        } else if (rawBindId && rawBindId.trim()) {
            keyRef.current = `${rawBindId.trim()}-${id}`;
        } else {
            keyRef.current = `field-${Math.random()
                .toString(36)
                .slice(2)}-${id}`;
        }
    }

    const bindIdRef = React.useRef<string>("");
    if (!bindIdRef.current) {
        bindIdRef.current = (rawBindId && rawBindId.trim()) || keyRef.current;
    }

    // Keep prop-driven flags in sync
    React.useEffect(() => {
        setRequired(!!requiredProp);
    }, [requiredProp]);

    React.useEffect(() => {
        setDisabled(!!disabledProp);
    }, [disabledProp]);

    React.useEffect(() => {
        setReadOnly(!!readOnlyProp);
    }, [readOnlyProp]);

    function setValue(next: T | undefined, variant: string = "direct") {
        const prev = value;
        if (Object.is(prev, next)) return;

        setValueState(next);

        if (onValueChange) {
            onValueChange(next as T, prev as T, variant);
        }
    }

    function setError(message: string) {
        setErrorState(message);
    }

    function setLoading(next: boolean) {
        setLoadingState(next);
    }

    function runValidate(report?: boolean): boolean {
        const current = value as T;
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
            const result = validate(current, !!report);
            if (typeof result === "string") {
                ok = false;
                message = result;
            } else if (result === false) {
                ok = false;
            }
        }

        if (report) {
            setErrorState(ok ? "" : message);
        }

        return ok;
    }

    // Minimal stub so callers can safely access `field.form`
    const dummyForm = {} as CoreContext<Dict>;

    return {
        ref,
        get key() {
            return keyRef.current;
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
        name: rawName?.trim() ?? "",
        bindId: bindIdRef.current,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        get defaultValue() {
            return originalRef.current as T | undefined;
        },
        get originalValue() {
            return originalRef.current;
        },
        form: dummyForm,
        validate(report?: boolean) {
            return runValidate(report);
        },
    };
}