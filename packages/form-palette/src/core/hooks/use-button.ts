// src/core/hooks/use-button.ts
// noinspection JSUnusedGlobalSymbols

import * as React from "react";

import { useCoreContext } from "@/core/hooks/use-core-context";
import type { CoreContext, Dict } from "@/schema/core";
import type { ButtonRef } from "@/schema/field";

export interface UseButtonOptions {
    /**
     * Logical name of the button.
     *
     * Used by the core to:
     * - mark this as the "active" button before submit
     * - toggle loading/disabled specifically for this button
     */
    name: string;

    /**
     * If true, clicking this button should trigger a submit:
     *
     * - form.setActiveButton(name)
     * - form.go()
     */
    submit?: boolean;

    /**
     * Initial disabled state.
     */
    disabled?: boolean;

    /**
     * Optional click handler.
     *
     * This runs *in addition to* the submit behavior (if `submit` is true).
     * You can call `event.preventDefault()` to prevent the auto-submit.
     */
    onClick?(
        event: React.MouseEvent<HTMLButtonElement>,
        form: CoreContext<Dict>
    ): void | Promise<void>;
}

export interface UseButtonReturn {
    /**
     * Current loading state, controlled by the core (via adapters) and
     * optionally by the host via setLoading.
     */
    loading: boolean;
    setLoading(loading: boolean): void;

    /**
     * Current disabled state.
     */
    disabled: boolean;
    setDisabled(disabled: boolean): void;

    /**
     * Ref for the underlying <button>.
     */
    ref: React.RefObject<HTMLButtonElement>;

    /**
     * Click handler wired to the core.
     */
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;

    /**
     * Convenience bundle for spreading onto a <button>.
     *
     * Example:
     *   const btn = useButton({ name: "save", submit: true });
     *   return <button {...btn.buttonProps}>Save</button>;
     */
    buttonProps: {
        ref: React.RefObject<HTMLButtonElement>;
        disabled: boolean;
        "data-loading"?: "true" | "false";
        onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    };
}

/**
 * useButton
 *
 * - Registers a ButtonRef with the core.
 * - Cooperates with setActiveButton + adapter-based submit.
 * - Handles loading/disabled toggling via the core's callbacks.
 */
export function useButton(options: UseButtonOptions): UseButtonReturn {
    const form = useCoreContext<Dict>();

    const { name, submit, disabled: disabledProp = false, onClick } = options;

    const [loading, setLoadingState] = React.useState<boolean>(false);
    const [disabled, setDisabledState] = React.useState<boolean>(
        Boolean(disabledProp)
    );

    const ref = React.useRef<HTMLButtonElement>(null);

    // Keep latest options for callbacks
    const optsRef = React.useRef<UseButtonOptions>(options);
    React.useEffect(() => {
        optsRef.current = options;
    }, [options]);

    // Build the ButtonRef once
    const buttonRef = React.useRef<ButtonRef | (ButtonRef & any) | null>(null);

    if (!buttonRef.current) {
        // @ts-ignore
        const btn: ButtonRef & {
            loading: boolean;
            disabled: boolean;
            setLoading?(v: boolean): void;
            setDisabled?(v: boolean): void;
            ref?: React.RefObject<HTMLButtonElement>;
        } = {
            name,
            // Accessor for "loading" as required by ButtonRef
            set loading(v: boolean) {
                setLoadingState(v);
            },
            // Accessor for "disable" (note: interface uses `disable`, not `disabled`)
            //@ts-ignore
            set disable(v: boolean) {
                setDisabledState(v);
            },
            // Extra properties used by CoreProvider via any-casts
            get loading() {
                return loading;
            },
            setDisabled(v: boolean) {
                setDisabledState(v);
            },
            get disabled() {
                return disabled;
            },
            ref,
        };

        // Also expose setLoading for CoreProvider's convenience
        (btn as any).setLoading = (v: boolean) => {
            setLoadingState(v);
        };

        buttonRef.current = btn;
    }

    // Keep mutable button properties in sync when name changes
    React.useEffect(() => {
        if (!buttonRef.current) return;
        buttonRef.current.name = name;
    }, [name]);

    // Register this button with the core
    React.useEffect(() => {
        if (!buttonRef.current) return;

        // Expose to the core runtime so submitWithAdapter can toggle loading.
        (form as any).button = buttonRef.current;

        return () => {
            // On unmount, if the core still points to this button,
            // we simply clear it.
            const anyForm = form as any;
            if (anyForm.button === buttonRef.current) {
                anyForm.button = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const currentOpts = optsRef.current;
        const shouldSubmit = !!currentOpts.submit;

        // Host-level handler first
        if (currentOpts.onClick) {
            currentOpts.onClick(event, form);
        }

        if (event.defaultPrevented) {
            return;
        }

        if (shouldSubmit) {
            // Mark this as the active button for the submit cycle.
            form.setActiveButton(currentOpts.name);

            // Kick off the standard submit pipeline.
            form.go();
        }
    };

    const setLoading = (v: boolean) => {
        setLoadingState(v);
    };

    const setDisabled = (v: boolean) => {
        setDisabledState(v);
    };

    return {
        loading,
        setLoading,
        disabled,
        setDisabled,
        ref,
        onClick: handleClick,
        buttonProps: {
            ref,
            disabled: disabled || loading,
            "data-loading": loading ? "true" : "false",
            onClick: handleClick,
        },
    };
}
