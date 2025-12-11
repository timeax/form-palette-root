// src/core/core-shell.tsx

import * as React from "react";

import { CoreProvider } from "@/core/core-provider";
import { CoreRoot, type CoreRootProps } from "@/core/core-root";

import type { z } from "zod";
import type { AdapterKey } from "@/schema/adapter";
import type { CoreProps, Dict } from "@/schema/core";
import { cn } from "@/lib/utils";

/**
 * Shared base props for CoreShell, independent of wrapping behaviour.
 */
type CoreShellBaseProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreProps<V, S, K> & {
    /**
     * Props passed directly to the underlying <form> element via CoreRoot.
     */
    formProps?: CoreRootProps;
    children?: React.ReactNode;
};

/**
 * When `wrapped` is true, you can provide gap/contentClassName.
 */
export type CoreShellWrappedProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreShellBaseProps<V, S, K> & {
    wrapped: true;
    /**
     * Gap for the inner wrapper. You can still control layout
     * (flex/grid/etc.) via `contentClassName`.
     */
    gap?: React.CSSProperties["gap"];
    /**
     * Class applied to the wrapper around children.
     */
    contentClassName?: string;
};

/**
 * When `wrapped` is not true (false/undefined), gap/contentClassName
 * are not allowed.
 */
export type CoreShellUnwrappedProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreShellBaseProps<V, S, K> & {
    wrapped?: false | undefined;
};

export type CoreShellProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreShellWrappedProps<V, S, K> | CoreShellUnwrappedProps<V, S, K>;

/**
 * Combined provider + form-root wrapper.
 *
 * Usage:
 *   <CoreShell adapter="local" schema={schema} formProps={{ className: "space-y-4" }}>
 *     {...fields + buttons...}
 *   </CoreShell>
 *
 *   <CoreShell
 *     adapter="local"
 *     schema={schema}
 *     wrapped
 *     gap="1rem"
 *     contentClassName="flex flex-col"
 *   >
 *     {...fields + buttons...}
 *   </CoreShell>
 */
export function CoreShell<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
>(props: CoreShellProps<V, S, K>) {
    if (props.wrapped) {
        const {
            formProps,
            children,
            wrapped, // eslint-disable-line @typescript-eslint/no-unused-vars
            gap,
            contentClassName,
            ...coreProps
        } = props;

        const content = (
            <div
                className={cn('flex flex-col', contentClassName)}
                style={gap !== undefined ? { gap } : undefined}
            >
                {children}
            </div>
        );

        return (
            <CoreProvider<V, S, K> {...coreProps as any}>
                <CoreRoot {...(formProps ?? {})}>{content}</CoreRoot>
            </CoreProvider>
        );
    }

    const { formProps, children, ...coreProps } = props;

    return (
        <CoreProvider<V, S, K> {...coreProps as any}>
            <CoreRoot {...(formProps ?? {})}>{children}</CoreRoot>
        </CoreProvider>
    );
}