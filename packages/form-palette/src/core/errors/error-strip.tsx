// src/core/errors/error-strip.tsx

import * as React from "react";
import { X, AlertCircle } from "lucide-react";

import { useCore } from "@/core/hooks/use-core";
import type { CoreContext, Dict } from "@/schema/core";
import { cn } from "@/lib/utils";

export interface ErrorStripProps extends React.HTMLAttributes<HTMLElement> {
    form?: CoreContext<Dict>;
    messages?: readonly string[];
    renderMessage?: (message: string, index: number) => React.ReactNode;
    as?: React.ElementType;
    listProps?: React.HTMLAttributes<HTMLUListElement>;
    dismissible?: boolean;
    onDismiss?: () => void;
    title?: string;
}

export function ErrorStrip(props: ErrorStripProps) {
    const {
        form: formProp,
        messages: messagesProp,
        renderMessage,
        as: As = "div",
        listProps,
        dismissible = true,
        onDismiss,
        title,
        className,
        ...wrapperProps
    } = props;

    const ctxFromHook = useCore<Dict>();
    const form = formProp ?? ctxFromHook;
    const [isVisible, setIsVisible] = React.useState(true);

    const messages = messagesProp
        ? messagesProp
        : ((form?.hasUncaughtErrors ? form?.getUncaught?.() : []) ?? []);

    React.useEffect(() => {
        if (messages.length > 0) {
            setIsVisible(true);
        }
    }, [messages, messages.length]);

    const handleDismiss = () => {
        setIsVisible(false);
        onDismiss?.();
    };

    if (!isVisible || messages.length === 0) {
        return null;
    }

    return (
        <As
            role="alert"
            // Changed: px-3 py-2 (tighter padding) and text-xs (smaller font)
            className={cn(
                "relative w-full rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs text-destructive dark:border-destructive/40 dark:text-red-400",
                className,
            )}
            {...wrapperProps}
        >
            <div className="flex items-start gap-2.5">
                {/* Icon scaled down to h-3.5 */}
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />

                <div className="flex-1 grow">
                    {title && (
                        <h5 className="mb-1 font-semibold leading-none tracking-tight">
                            {title}
                        </h5>
                    )}

                    <ul
                        {...listProps}
                        className={cn(
                            "list-none space-y-1",
                            listProps?.className,
                        )}
                    >
                        {messages.map((msg, index) => (
                            <li
                                key={index}
                                className="opacity-90 leading-tight"
                            >
                                {renderMessage
                                    ? renderMessage(msg, index)
                                    : msg}
                            </li>
                        ))}
                    </ul>
                </div>

                {dismissible && (
                    <button
                        type="button"
                        onClick={handleDismiss}
                        // Button styles adjusted for smaller footprint
                        className={cn(
                            "absolute right-1.5 top-1.5 rounded-sm p-0.5 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
                            "hover:bg-destructive/15 text-destructive",
                        )}
                        aria-label="Dismiss errors"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                )}
            </div>
        </As>
    );
}
