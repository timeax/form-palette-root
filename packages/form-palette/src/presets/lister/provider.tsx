import * as React from "react";

import type { PresetMap } from "@/presets/lister/types";
import {
    createListerRuntime,
    type CreateListerRuntimeOptions,
    type ListerRuntime,
} from "@/presets/lister/runtime/session/runtime";

/**
 * Context for Lister runtime bridge.
 */
export const ListerContext = React.createContext<ListerRuntime<any> | null>(
    null,
);

export type ListerProviderProps<P extends PresetMap> = React.PropsWithChildren<
    CreateListerRuntimeOptions<P>
>;

/**
 * ListerProvider — creates a singleton runtime and exposes it via React context.
 *
 * Responsibilities:
 * - instantiate `createListerRuntime` once per provider
 * - subscribe to runtime store (if needed by descendants)
 * - expose `api`, `actions`, `selectors`, and `state`
 */
export function ListerProvider<P extends PresetMap>({
    children,
    ...opts
}: ListerProviderProps<P>) {
    const runtimeRef = React.useRef<ListerRuntime<P> | null>(null);
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

    if (!runtimeRef.current) {
        runtimeRef.current = createListerRuntime<P>(opts);
    }

    React.useEffect(() => {
        const runtime = runtimeRef.current;
        if (!runtime) return;

        // React bridge: re-render context consumers when store changes
        const unsub = runtime.subscribe(() => {
            forceUpdate();
        });

        return () => unsub();
    }, []);

    return (
        <ListerContext.Provider value={runtimeRef.current}>
            {children}
        </ListerContext.Provider>
    );
}

/**
 * Helper: get current runtime or throw
 */
export function useListerRuntime<P extends PresetMap>(): ListerRuntime<P> {
    const ctx = React.useContext(ListerContext);
    if (!ctx)
        throw new Error(
            "useListerRuntime must be used within <ListerProvider>",
        );
    return ctx as ListerRuntime<P>;
}
