// src/core/hooks/use-core.ts
import type { CoreContext, Dict } from "@/schema/core";
import { useCoreContext } from "./use-core-context";

/**
 * Convenience alias for useCoreContext.
 *
 * This mirrors the legacy useForm hook: you get the full CoreContext,
 * and can call core.values(), core.submit(), core.go(), etc.
 */
export function useCore<V extends Dict = Dict>(): CoreContext<V> {
    return useCoreContext<V>();
}