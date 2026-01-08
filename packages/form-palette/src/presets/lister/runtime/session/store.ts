// packages/form-palette/src/presets/lister/runtime/session/store.ts

import type { ListerSessionId, ListerStoreState } from "../../types";

type Listener = () => void;

export function createSessionStore(initial?: Partial<ListerStoreState>) {
    let state: ListerStoreState = {
        order: [],
        activeId: undefined,
        sessions: {},
        ...(initial ?? {}),
    };

    const listeners = new Set<Listener>();

    function notify() {
        for (const fn of listeners) fn();
    }

    function getState() {
        return state;
    }

    function setState(next: ListerStoreState) {
        state = next;
        notify();
    }

    function patch(mutator: (prev: ListerStoreState) => ListerStoreState) {
        setState(mutator(state));
    }

    function subscribe(fn: Listener) {
        listeners.add(fn);
        return () => listeners.delete(fn);
    }

    function has(sessionId: ListerSessionId) {
        return Boolean(state.sessions[sessionId]);
    }

    function getSession(sessionId: ListerSessionId) {
        return state.sessions[sessionId] as any;
    }

    function setSession(
        sessionId: ListerSessionId,
        mutator: (prev: any) => any,
    ) {
        const prev = state.sessions[sessionId];
        if (!prev) return;

        patch((s) => ({
            ...s,
            sessions: {
                ...s.sessions,
                [sessionId]: mutator(prev),
            },
        }));
    }

    function upsertSession(sessionId: ListerSessionId, session: any) {
        patch((s) => ({
            ...s,
            activeId: sessionId,
            order: s.order.includes(sessionId)
                ? s.order
                : [...s.order, sessionId],
            sessions: { ...s.sessions, [sessionId]: session },
        }));
    }

    function focus(sessionId: ListerSessionId) {
        if (!state.sessions[sessionId]) return;
        patch((s) => ({ ...s, activeId: sessionId }));
    }

    function remove(sessionId: ListerSessionId) {
        patch((s) => {
            const { [sessionId]: _, ...rest } = s.sessions;

            const nextOrder = s.order.filter((id) => id !== sessionId);
            const nextActive =
                s.activeId === sessionId ? nextOrder.at(-1) : s.activeId;

            return {
                ...s,
                order: nextOrder,
                activeId: nextActive,
                sessions: rest,
            };
        });
    }

    return {
        getState,
        setState,
        patch,
        subscribe,

        has,
        getSession,
        setSession,
        upsertSession,
        focus,
        remove,
    };
}
