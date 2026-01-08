// packages/form-palette/src/presets/lister/runtime/session/inflight.ts

import type { ListerSessionId } from "../../types";

export type InFlight = {
    requestId: string;
    controller?: AbortController;
    debounceTimer?: any;
};

export function createInFlight(remoteDebounceMs: number) {
    const map = new Map<ListerSessionId, InFlight>();

    function abort(sessionId: ListerSessionId) {
        const f = map.get(sessionId);
        if (!f) return;

        if (f.debounceTimer) {
            clearTimeout(f.debounceTimer);
            f.debounceTimer = undefined;
        }

        if (f.controller) {
            try {
                f.controller.abort();
            } catch {
                // ignore
            }
            f.controller = undefined;
        }
    }

    function begin(sessionId: ListerSessionId, requestId: string) {
        abort(sessionId);

        const controller =
            typeof AbortController !== "undefined"
                ? new AbortController()
                : undefined;

        map.set(sessionId, { requestId, controller });

        return {
            requestId,
            signal: controller?.signal,
        };
    }

    function isLatest(sessionId: ListerSessionId, requestId: string) {
        const f = map.get(sessionId);
        return Boolean(f && f.requestId === requestId);
    }

    function schedule(
        sessionId: ListerSessionId,
        requestId: string,
        fn: () => void,
    ) {
        abort(sessionId);

        const controller =
            typeof AbortController !== "undefined"
                ? new AbortController()
                : undefined;

        const entry: InFlight = { requestId, controller };
        entry.debounceTimer = setTimeout(fn, remoteDebounceMs);

        map.set(sessionId, entry);
    }

    function clear(sessionId: ListerSessionId) {
        abort(sessionId);
        map.delete(sessionId);
    }

    return { abort, begin, isLatest, schedule, clear };
}
