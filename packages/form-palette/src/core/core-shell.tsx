// src/core/core-shell.tsx

import * as React from "react";

import { CoreProvider } from "@/core/core-provider";
import { CoreRoot, type CoreRootProps } from "@/core/core-root";

import type { z } from "zod";
import type { AdapterKey } from "@/schema/adapter";
import type { CoreProps, Dict } from "@/schema/core";

/**
 * Combined provider + form-root wrapper.
 *
 * Usage:
 *   <CoreShell adapter="local" schema={schema} formProps={{ className: "space-y-4" }}>
 *     {...fields + buttons...}
 *   </CoreShell>
 */
export interface CoreShellProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> extends CoreProps<V, S, K> {
    /**
     * Props passed directly to the underlying <form> element via CoreRoot.
     */
    formProps?: CoreRootProps;
    children?: React.ReactNode;
}

export function CoreShell<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
>(props: CoreShellProps<V, S, K>) {
    const { formProps, children, ...coreProps } = props;

    return (
        <CoreProvider<V, S, K> {...(coreProps as CoreProps<V, S, K>)}>
            <CoreRoot {...(formProps ?? {})}>{children}</CoreRoot>
        </CoreProvider>
    );
}
