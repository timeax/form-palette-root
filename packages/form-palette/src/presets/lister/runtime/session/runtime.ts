// packages/form-palette/src/presets/lister/runtime/session/runtime.ts

import type {
    ListerApi,
    ListerChangeEvent,
    ListerDefinition,
    ListerDetails,
    ListerId,
    ListerMode,
    ListerOpenOptions,
    ListerOpenReason,
    ListerOpenResult,
    ListerPermissionCtx,
    ListerProviderHost,
    ListerRuntimeState,
    ListerSearchMode,
    ListerSearchTarget,
    ListerSessionId,
    ListerStoreState,
    PresetMap,
} from "../../types";

import { createSessionStore } from "./store";
import { createInFlight } from "./inflight";
import { computeEffectiveFilters } from "./filters";
import { canOpenLister } from "./permissions";

import {
    createListerEngine,
    createRequestId,
    type ListerEngine,
} from "../engine/engine";
import { buildDetails as buildDetailsPayload } from "../engine/details";
import {
    buildSearchPayloadFromTarget,
    filterOptionsLocal,
} from "../engine/search";

export type CreateListerRuntimeOptions<P extends PresetMap> = {
    host: ListerProviderHost;

    /** Provide your own engine (for tests / custom http). */
    engine?: ListerEngine;

    /** Initial preset map (kind => definition). */
    presets?: P;

    /** Debounce used when searchMode is remote/hybrid and query changes. */
    remoteDebounceMs?: number;

    now?: () => number;
    makeSessionId?: () => string;
};

export type ListerRuntime<P extends PresetMap> = {
    engine: ListerEngine;
    api: ListerApi<P>;

    getState(): ListerStoreState;
    subscribe(fn: () => void): () => void;

    actions: {
        focus(sessionId: ListerSessionId): void;

        close(sessionId: ListerSessionId): void;
        cancel(sessionId: ListerSessionId): void;
        apply(sessionId: ListerSessionId): void;

        clear(sessionId: ListerSessionId): void;
        toggle(sessionId: ListerSessionId, value: any): void;
        select(sessionId: ListerSessionId, value: any): void;
        deselect(sessionId: ListerSessionId, value: any): void;

        setQuery(sessionId: ListerSessionId, query: string): void;
        setSearchTarget(
            sessionId: ListerSessionId,
            target?: ListerSearchTarget,
        ): void;

        setFiltersPatch(sessionId: ListerSessionId, patch: any): void;
        mergeFiltersPatch(sessionId: ListerSessionId, patch: any): void;

        refresh(sessionId: ListerSessionId): void;
    };

    selectors: {
        effectiveFilters(sessionId: ListerSessionId): any;
        visibleOptions(sessionId: ListerSessionId): any[];
        detailsPayload(
            sessionId: ListerSessionId,
            action: ListerDetails<any, any, any, any>["action"],
        ): any;
    };
};

function isMultiple(mode: ListerMode) {
    return mode === "multiple";
}

function normalizeDraftForMode(mode: ListerMode, value: any) {
    return isMultiple(mode)
        ? Array.isArray(value)
            ? value
            : []
        : (value ?? null);
}

function makeChangeEvent(): ListerChangeEvent {
    let prevented = false;
    return {
        get defaultPrevented() {
            return prevented;
        },
        preventDefault() {
            prevented = true;
        },
    };
}

export function createListerRuntime<P extends PresetMap>(
    opts: CreateListerRuntimeOptions<P>,
): ListerRuntime<P> {
    const now = opts.now ?? (() => Date.now());
    const makeSessionId =
        opts.makeSessionId ??
        (() => `l_${Math.random().toString(36).slice(2)}_${now()}`);

    const store = createSessionStore();
    const inflight = createInFlight(Math.max(0, opts.remoteDebounceMs ?? 250));

    // headless engine (http + fetch pipeline)
    const engine = opts.engine ?? createListerEngine();

    // preset registry (kind -> def)
    const presetMap: Record<
        string,
        ListerDefinition<any, any, any, any, any>
    > = {
        ...(opts.presets ?? ({} as any)),
    };

    function getDef(defOrKind: any) {
        if (typeof defOrKind === "string") return presetMap[defOrKind];
        return defOrKind as ListerDefinition<any, any, any, any, any>;
    }

    function getSession(sessionId: ListerSessionId) {
        return store.getSession(sessionId) as
            | ListerRuntimeState<any, any, any, any, any>
            | undefined;
    }

    async function refreshSession(sessionId: ListerSessionId) {
        const s = getSession(sessionId);
        if (!s?.definition) return;

        const requestId = createRequestId();
        const { signal } = inflight.begin(sessionId, requestId);

        // flags
        store.setSession(sessionId, (prev) => ({
            ...prev,
            errorCode: undefined,
            loading: prev.rawList.length === 0,
            refreshing: prev.rawList.length > 0,
        }));

        const next = getSession(sessionId);
        if (!next?.definition) return;

        const effective = computeEffectiveFilters(
            next.filters,
            next.filtersPatch,
            next.filtersSpec as any,
        );

        store.setSession(sessionId, (p) => ({
            ...p,
            effectiveFilters: effective as any,
        }));

        const searchPayload = buildSearchPayloadFromTarget(next.searchTarget);

        try {
            const res = await engine.fetch({
                def: next.definition as any,
                filters: effective as any,
                opts: {
                    query: next.query,
                    search: searchPayload as any,
                    signal,
                    requestId,
                },
            });

            if (!inflight.isLatest(sessionId, requestId)) return;

            // preserve selection (no fancy reconciliation yet; we can add refreshMode later)
            store.setSession(sessionId, (p) => ({
                ...p,
                loading: false,
                refreshing: false,
                rawList: res.rawList as any,
                optionsList: res.optionsList as any,
            }));
        } catch (e: any) {
            if (!inflight.isLatest(sessionId, requestId)) return;

            const msg = String(e?.message ?? e);
            const aborted =
                e?.name === "AbortError" ||
                msg.toLowerCase().includes("aborted") ||
                msg.toLowerCase().includes("canceled") ||
                msg.toLowerCase().includes("cancelled");

            store.setSession(sessionId, (p) => ({
                ...p,
                loading: false,
                refreshing: false,
                errorCode: aborted
                    ? p.errorCode
                    : ("lister.fetch_failed" as any),
            }));
        }
    }

    function resolveAndDispose(
        sessionId: ListerSessionId,
        reason: ListerOpenReason,
        errorCode?: string,
    ) {
        const s = getSession(sessionId);
        if (!s) return;

        const finalValue =
            reason === "cancel" || (reason === "close" && s.confirm)
                ? s.initialDraftValue
                : s.draftValue;

        const details = buildDetailsPayload({
            mode: s.mode as any,
            draftValue: finalValue as any,
            optionsList: s.optionsList as any,
            action: reason as any,
        });

        const res: ListerOpenResult<any, any, any, any> = {
            reason,
            value: finalValue as any,
            details: {
                ...(details as any),
                errorCode,
                sessionId,
            } as any,
        };

        try {
            s._resolve?.(res as any);
        } finally {
            inflight.clear(sessionId);
            store.remove(sessionId);
        }
    }

    function commitDraft(
        sessionId: ListerSessionId,
        nextValue: any,
        action: "select" | "deselect" | "clear" | "init",
    ) {
        const s = getSession(sessionId);
        if (!s) return;

        const next = normalizeDraftForMode(s.mode as any, nextValue);

        const details = buildDetailsPayload({
            mode: s.mode as any,
            draftValue: next as any,
            optionsList: s.optionsList as any,
            action,
        });

        const ev = makeChangeEvent();

        if (s.onChange) {
            try {
                s.onChange(next as any, details as any, ev);
            } catch {
                // swallow; host may log at a higher level
            }
        }

        if (ev.defaultPrevented) return;

        store.setSession(sessionId, (p) => ({ ...p, draftValue: next as any }));

        // single + confirm=false => auto-apply on select/clear
        const after = getSession(sessionId);
        if (!after) return;

        if (!isMultiple(after.mode as any) && !after.confirm) {
            if (action === "select" || action === "clear") {
                resolveAndDispose(sessionId, "apply");
            }
        }
    }

    function scheduleRemoteRefresh(sessionId: ListerSessionId) {
        const requestId = createRequestId();
        inflight.schedule(
            sessionId,
            requestId,
            () => void refreshSession(sessionId),
        );
    }

    const api: ListerApi<P> = {
        async fetch(a: any, b?: any, c?: any): Promise<any> {
            const def = getDef(a);
            if (!def) return { raw: [], options: [] };

            const filters = typeof a === "string" ? b : b;
            const query = (c as any)?.query ?? "";

            const res = await engine.fetch({
                def: def as any,
                filters: filters as any,
                opts: { query },
            });

            return { raw: res.rawList, options: res.optionsList };
        },

        async open(a: any, b?: any, c?: any): Promise<any> {
            const kind = typeof a === "string" ? a : undefined;
            const def = getDef(a);

            if (!def) {
                return {
                    reason: "error",
                    value: null,
                    details: {
                        action: "error",
                        errorCode: "preset_not_found",
                        options: null,
                        raw: null,
                    },
                };
            }

            const filters = (b as any) ?? undefined;
            const openOpts = c as any as
                | ListerOpenOptions<any, any, any, any, any>
                | undefined;

            const mode: ListerMode = (openOpts?.mode ?? "single") as any;
            const confirm =
                mode === "multiple"
                    ? true
                    : Boolean(openOpts?.confirm ?? false);

            const sessionId = makeSessionId();

            const permCtx: ListerPermissionCtx = {
                kind,
                endpoint: def.source?.endpoint,
                filters,
                sessionId,
            };

            if (!canOpenLister(opts.host, openOpts?.permissions, permCtx)) {
                return {
                    reason: "denied",
                    value:
                        openOpts?.defaultValue ??
                        (mode === "multiple" ? [] : null),
                    details: {
                        action: "denied",
                        errorCode: "access_denied",
                        options: null,
                        raw: null,
                        sessionId,
                    },
                };
            }

            const seed =
                openOpts?.defaultValue ??
                (mode === "multiple" ? ([] as any[]) : null);

            const session: ListerRuntimeState<any, any, any, any, any> = {
                sessionId,
                createdAt: now(),

                // identity
                isOpen: true,
                kind,
                definition: def as any,

                // config
                mode: mode as any,
                confirm: confirm as any,
                title: openOpts?.title,

                // search
                searchMode: (openOpts?.searchMode ??
                    "remote") as ListerSearchMode,
                query: String(openOpts?.initialQuery ?? ""),

                searchTarget: undefined,
                searchSpec: (def as any).search,

                // filters
                filters,
                filtersSpec: openOpts?.filtersSpec,
                filtersPatch: {},
                effectiveFilters: undefined,

                // data
                loading: false,
                refreshing: false,
                errorCode: undefined,
                rawList: [],
                optionsList: [],

                // selection
                draftValue: normalizeDraftForMode(mode, seed) as any,
                initialDraftValue: normalizeDraftForMode(mode, seed) as any,

                // callbacks
                onChange: openOpts?.onChange,

                // internal resolver
                _resolve: undefined,
            } as any;

            return await new Promise((resolve) => {
                (session as any)._resolve = resolve;

                store.upsertSession(sessionId, session);
                void refreshSession(sessionId);
            });
        },

        registerPreset(kind: string, def: any) {
            presetMap[kind] = def;
        },

        getPreset(kind: string) {
            return presetMap[kind] as any;
        },
    } as any;

    const actions: ListerRuntime<P>["actions"] = {
        focus(sessionId) {
            store.focus(sessionId);
        },

        close(sessionId) {
            resolveAndDispose(sessionId, "close");
        },
        cancel(sessionId) {
            resolveAndDispose(sessionId, "cancel");
        },
        apply(sessionId) {
            resolveAndDispose(sessionId, "apply");
        },

        clear(sessionId) {
            const s = getSession(sessionId);
            if (!s) return;
            commitDraft(sessionId, s.mode === "multiple" ? [] : null, "clear");
        },

        toggle(sessionId, value) {
            const s = getSession(sessionId);
            if (!s) return;

            if (!isMultiple(s.mode as any)) {
                const cur = s.draftValue ?? null;
                const next = cur === value ? null : value;
                commitDraft(sessionId, next, next == null ? "clear" : "select");
                return;
            }

            const cur = Array.isArray(s.draftValue) ? s.draftValue : [];
            const has = cur.includes(value);
            const next = has ? cur.filter((v) => v !== value) : [...cur, value];
            commitDraft(sessionId, next, has ? "deselect" : "select");
        },

        select(sessionId, value) {
            const s = getSession(sessionId);
            if (!s) return;

            if (!isMultiple(s.mode as any)) {
                commitDraft(sessionId, value, "select");
                return;
            }

            const cur = Array.isArray(s.draftValue) ? s.draftValue : [];
            if (cur.includes(value)) return;
            commitDraft(sessionId, [...cur, value], "select");
        },

        deselect(sessionId, value) {
            const s = getSession(sessionId);
            if (!s) return;

            if (!isMultiple(s.mode as any)) {
                if (s.draftValue === value)
                    commitDraft(sessionId, null, "clear");
                return;
            }

            const cur = Array.isArray(s.draftValue) ? s.draftValue : [];
            if (!cur.includes(value)) return;
            commitDraft(
                sessionId,
                cur.filter((v) => v !== value),
                "deselect",
            );
        },

        setQuery(sessionId, query) {
            const s = getSession(sessionId);
            if (!s) return;

            store.setSession(sessionId, (p) => ({
                ...p,
                query: String(query ?? ""),
            }));

            const next = getSession(sessionId);
            if (!next) return;

            if (next.searchMode === "remote" || next.searchMode === "hybrid") {
                scheduleRemoteRefresh(sessionId);
            } else {
                // local mode doesn't need fetch
                store.setSession(sessionId, (p) => ({ ...p }));
            }
        },

        setSearchTarget(sessionId, target) {
            const s = getSession(sessionId);
            if (!s) return;

            store.setSession(sessionId, (p) => ({
                ...p,
                searchTarget: target ?? undefined,
            }));

            const next = getSession(sessionId);
            if (!next) return;

            if (next.searchMode === "remote" || next.searchMode === "hybrid") {
                scheduleRemoteRefresh(sessionId);
            }
        },

        setFiltersPatch(sessionId, patch) {
            const s = getSession(sessionId);
            if (!s) return;

            store.setSession(sessionId, (p) => ({
                ...p,
                filtersPatch: patch ?? {},
            }));

            // default: auto-fetch unless spec says otherwise
            const next = getSession(sessionId);
            const autoFetch = (next?.filtersSpec as any)?.autoFetch;
            if (autoFetch !== false) void refreshSession(sessionId);
        },

        mergeFiltersPatch(sessionId, patch) {
            const s = getSession(sessionId);
            if (!s) return;

            store.setSession(sessionId, (p) => ({
                ...p,
                filtersPatch: { ...(p.filtersPatch ?? {}), ...(patch ?? {}) },
            }));

            const next = getSession(sessionId);
            const autoFetch = (next?.filtersSpec as any)?.autoFetch;
            if (autoFetch !== false) void refreshSession(sessionId);
        },

        refresh(sessionId) {
            void refreshSession(sessionId);
        },
    };

    const selectors: ListerRuntime<P>["selectors"] = {
        effectiveFilters(sessionId) {
            const s = getSession(sessionId);
            if (!s) return undefined;

            return (
                s.effectiveFilters ??
                computeEffectiveFilters(
                    s.filters,
                    s.filtersPatch,
                    s.filtersSpec,
                )
            );
        },

        visibleOptions(sessionId) {
            const s = getSession(sessionId);
            if (!s) return [];

            const list = s.optionsList ?? [];

            if (s.searchMode === "local" || s.searchMode === "hybrid") {
                return filterOptionsLocal(list as any, s.query);
            }

            return list as any;
        },

        detailsPayload(sessionId, action) {
            const s = getSession(sessionId);
            if (!s) return undefined;

            return buildDetailsPayload({
                mode: s.mode as any,
                draftValue: s.draftValue as any,
                optionsList: s.optionsList as any,
                action: action as any,
            });
        },
    };

    return {
        engine,
        api,
        getState: store.getState,
        subscribe: store.subscribe,
        actions,
        selectors,
    };
}
