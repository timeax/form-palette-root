// src/core/context.ts
import React from "react";
import type { CoreContext, Dict } from "@/schema/core";

/**
 * Non-generic alias for the core context type used at runtime.
 *
 * We store CoreContext<Dict> in React context and let
 * caller-side hooks (useCore, useCoreContext, etc.) cast
 * to a more specific generic shape when needed.
 */
export type AnyCoreContext = CoreContext<Dict>;

/**
 * React context carrying the current form/core instance.
 *
 * - Provider is set up in core-provider.tsx.
 * - Consumers should generally use the typed hook in
 *   hooks/use-core-context.ts instead of reading this directly.
 */
export const CoreContextReact = React.createContext<AnyCoreContext | null>(
    null
);
