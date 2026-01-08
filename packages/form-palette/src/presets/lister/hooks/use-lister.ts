import * as React from "react";
import type { ListerSessionId, PresetMap } from "@/presets/lister/types";
import { useListerRuntime } from "@/presets/lister/provider";

/**
 * useLister — stable hook returning { api, store/state, actions, selectors }.
 *
 * It directly mirrors the current runtime, with stable reference equality
 * for top-level properties (api/actions/selectors), while `state` updates on
 * store changes.
 */
export function useLister<P extends PresetMap>() {
    const runtime = useListerRuntime<P>();
    const [state, setState] = React.useState(runtime.getState());

    React.useEffect(() => {
        return runtime.subscribe(() => {
            setState(runtime.getState());
        });
    }, [runtime]);

    // Flatten runtime shape for easy destructuring
    return React.useMemo(
        () => ({
            api: runtime.api,
            actions: runtime.actions,
            selectors: runtime.selectors,
            state,
            store: state, // alias for backward compatibility
        }),
        [runtime, state],
    );
}

/**
 * useListerSession — convenience hook for one active session.
 * Example: UI overlays or modals can call this to get the current session.
 */
export function useListerSession<P extends PresetMap>(
    sessionId?: ListerSessionId,
) {
    const { state } = useLister<P>();

    const sid = sessionId ?? state.activeId;
    const session = sid ? state.sessions[sid] : undefined;

    return { session, activeId: sid };
}
