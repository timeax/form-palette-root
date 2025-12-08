// src/core/errors/error-strip.tsx

import * as React from "react";

import { useCore } from "@/core/hooks/use-core";
import type { CoreContext, Dict } from "@/schema/core";

export interface ErrorStripProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Optional explicit form context. If omitted, the strip will use
     * the nearest CoreProvider via useCore().
     */
    form?: CoreContext<Dict>;

    /**
     * Optional explicit messages. If provided, these are used instead of
     * form.getUncaught().
     */
    messages?: readonly string[];

    /**
     * Custom renderer for each message.
     */
    renderMessage?: (message: string, index: number) => React.ReactNode;

    /**
     * Wrapper element type. Defaults to "div".
     */
    as?: React.ElementType;

    /**
     * Props forwarded to the inner <ul> element.
     */
    listProps?: React.HTMLAttributes<HTMLUListElement>;
}

/**
 * Simple global/uncaught error renderer.
 *
 * Reads messages from `form.getUncaught()` (unless `messages` is provided)
 * and renders them as a list.
 */
export function ErrorStrip(props: ErrorStripProps) {
    const {
        form: formProp,
        messages: messagesProp,
        renderMessage,
        as: As = "div",
        listProps,
        ...wrapperProps
    } = props;

    const ctxFromHook = useCore<Dict>();
    const form = formProp ?? ctxFromHook;

    const messages = messagesProp ?? form?.getUncaught?.() ?? [];

    if (!messages.length) return null;

    return (
        <As {...wrapperProps}>
            <ul {...listProps}>
                {messages.map((msg, index) => (
                    <li key={index}>
                        {renderMessage ? renderMessage(msg, index) : msg}
                    </li>
                ))}
            </ul>
        </As>
    );
}
