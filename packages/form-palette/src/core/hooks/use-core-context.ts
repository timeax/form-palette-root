// src/core/hooks/use-core-context.ts
import { useContext } from "react";
import { CoreContextReact } from "@/core/context";
import type { CoreContext, Dict } from "@/schema/core";

/**
 * Typed hook to access the current core/form context.
 *
 * Must be used inside a <CoreProvider>. If no provider is found,
 * this will throw to make misuse obvious.
 */
export function useCoreContext<V extends Dict = Dict>(): CoreContext<V> {
    const ctx = useContext(CoreContextReact);

    if (!ctx) {
        throw new Error("useCoreContext must be used within a <CoreProvider>.");
    }

    return ctx as CoreContext<V>;
}
