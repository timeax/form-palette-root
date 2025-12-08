// src/core/core-root.tsx

import * as React from "react";

import { useCore } from "@/core/hooks/use-core";
import { ErrorStrip } from "@/core/errors/error-strip";
import type { CoreContext, Dict } from "@/schema/core";

export interface CoreRootProps
    extends React.FormHTMLAttributes<HTMLFormElement> {
    /**
     * If true, the global ErrorStrip will not be rendered automatically.
     */
    noErrorStrip?: boolean;

    /**
     * Optional hook invoked after CoreRoot orchestrates the submit.
     *
     * - The native event is already `preventDefault()`-ed.
     * - The adapter flow is triggered via `form.go(...)`.
     * - Use this to tap into submit without breaking the core.
     */
    onSubmitForm?(
        event: React.FormEvent<HTMLFormElement>,
        form: CoreContext<Dict>
    ): void | Promise<void>;
}

/**
 * CoreRoot: actual <form> element wired to the core runtime.
 *
 * Responsibilities:
 * - Own the native submit event and prevent full-page navigation.
 * - Delegate submit orchestration to form.go().
 * - Optionally render the global ErrorStrip at the top.
 */
export function CoreRoot(props: CoreRootProps) {
    const { noErrorStrip, onSubmitForm, children, ...rest } = props;

    const form = useCore<Dict>();

    const handleSubmit = React.useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (form.props.activateButtonOnChange && !form.isDirty()) return;
            // Core submit orchestration (adapter-specific behaviour lives inside).
            form.go();

            // Optional host-level hook.
            if (onSubmitForm) {
                void onSubmitForm(event, form);
            }

            // If the host provided a native onSubmit prop, call it too.
            if (typeof rest.onSubmit === "function") {
                rest.onSubmit(event);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [form, onSubmitForm, rest.onSubmit]
    );

    // We intentionally override onSubmit so the core owns submit routing.
    const { onSubmit: _ignored, ...passThrough } = rest;

    return (
        <form onSubmit={handleSubmit} {...passThrough}>
            {!noErrorStrip && <ErrorStrip form={form} />}
            {children}
        </form>
    );
}
