// resources/js/context/lister/lister-context.tsx
// noinspection GrazieInspection,SpellCheckingInspection

import * as React from "react";

import type {
    ListerDefinition,
    ListerFilterCtx,
    ListerFilterOption,
    ListerFilterSpec,
    ListerId,
    ListerLogCode,
    ListerMode,
    ListerOpenResult,
    ListerProviderHost,
    ListerRuntimeState,
    ListerSearchMode,
    ListerSearchPayload,
    ListerSearchTarget,
    ListerSessionId,
    ListerStoreState,
    PresetMap,
} from "./types";

import { buildDetails } from "./engine/details";
import { extractArray } from "./engine/extract";
import { defaultHttpClient, type ListerHttpClient } from "./engine/http";
import { mapOptions } from "./engine/map";
import { filterRawListLocal } from "./engine/search";
import { computeNextDraft, makeChangeEvent } from "./engine/selection";
import { evaluatePermissions } from "./utils/permissions";

export type AnyDef = ListerDefinition<any, any, any, any>;

/**
 * IMPORTANT:
 * Your types file may not yet include these runtime-only fields (searchSpec/searchTarget).
 * Without widening here, TS2353 will fire when we create session objects containing them.
 *
 * This keeps compilation green while you finish syncing the types.
 */
// add this extra field
export type AnyState = ListerRuntimeState<any, any, any, any, any> & {
    searchSpec?: any;
    searchTarget?: any;
    searchPayload?: any; // ✅ NEW (payload override)
    ownerKey?: string;
};

export type InternalContextValue = {
    host: ListerProviderHost;
    http: ListerHttpClient;

    // mutable preset registry
    presetsRef: React.RefObject<PresetMap>;

    store: ListerStoreState;

    // fetch
    apiFetchAny: (
        kindOrDef: string | AnyDef,
        filters?: any,
        opts?: any,
    ) => Promise<any>;

    // open
    apiOpenAny: (
        kindOrDef: string | AnyDef,
        filters?: any,
        opts?: any,
    ) => Promise<any>;

    // session lifecycle
    focus(id: ListerSessionId): void;
    dispose(id: ListerSessionId): void;

    // finalize (per session)
    apply(id: ListerSessionId): void;
    cancel(id: ListerSessionId): void;
    close(id: ListerSessionId): void;

    // selection (per session)
    toggle(id: ListerSessionId, value: ListerId): void;
    select(id: ListerSessionId, value: ListerId): void;
    deselect(id: ListerSessionId, value: ListerId): void;
    clear(id: ListerSessionId): void;

    // search (per session)
    setQuery(id: ListerSessionId, q: string): void;
    setSearchMode(id: ListerSessionId, mode: ListerSearchMode): void;

    /**
     * Persist the user's current search target (subject/all/only)
     * so all searches (local/remote/hybrid) can include it.
     */
    setSearchTarget(id: ListerSessionId, target: ListerSearchTarget): void;

    /**
     * Backwards compatible signatures:
     * - existing calls still work: searchRemote(id, q)
     * - new calls can optionally override payload: searchRemote(id, q, payload)
     *
     * If payload is omitted, implementation should read from session.searchTarget.
     */
    searchLocal: {
        (id: ListerSessionId, q: string): void;
        (id: ListerSessionId, q: string, payload?: ListerSearchPayload): void;
    };

    searchRemote: {
        (id: ListerSessionId, q: string): void;
        (id: ListerSessionId, q: string, payload?: ListerSearchPayload): void;
    };

    refresh(id: ListerSessionId): void;
    setPosition(
        id: ListerSessionId,
        pos: { x: number; y: number } | null,
    ): void;

    /** Filters (non-UI logic; per session) */
    getFilterCtx<TFilters>(id: ListerSessionId): ListerFilterCtx<TFilters>;

    /**
     * NEW semantics:
     * - `optionId` is the UI identifier of the filter option (NOT the db value)
     * - `selectedFilterValues` tracks selected option ids (for UI checkmarks/badge)
     */
    applyFilterOption(id: ListerSessionId, optionId: string | number): void;

    registerPreset(kind: string, def: AnyDef): void;
    getPreset(kind: string): AnyDef | undefined;

    /** Derived list for UI later (local/hybrid filtering) */
    getVisibleOptions(id: ListerSessionId): any[];
};

export const Ctx = React.createContext<InternalContextValue | null>(null);

function anchorToPos(anchor: any): { x: number; y: number } | null {
    if (!anchor) return null;
    if (typeof anchor === "object") {
        if (typeof anchor.x === "number" && typeof anchor.y === "number")
            return { x: anchor.x, y: anchor.y };
        if (
            typeof anchor.clientX === "number" &&
            typeof anchor.clientY === "number"
        )
            return { x: anchor.clientX, y: anchor.clientY };
    }
    return null;
}

function makeSessionId(): string {
    const anyCrypto = (globalThis as any)?.crypto;
    if (anyCrypto?.randomUUID) return anyCrypto.randomUUID();
    return `lister_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function shallowMerge<T extends object>(
    base: T | undefined,
    patch: Partial<T>,
): T {
    return { ...(base ?? ({} as T)), ...(patch ?? {}) } as T;
}

/* ─────────────────────────────────────────────
 * Filter option resolution helpers
 * ───────────────────────────────────────────── */

export type ResolvedFilterNode<TFilters> = {
    option: ListerFilterOption<TFilters>;
    id: string; // UI id (PATH id, e.g. "email_domain.email_gmail")
    kind?: string; // "group" | "value" | "input" (host-defined)
    disabled?: boolean;
    bindKey?: string; // resolved (inherited or explicit)
    dbValue?: any; // value to push into ctx under bindKey
    apply?: {
        key?: string;
        mode?: "replace" | "merge" | "unset";
        toggleable?: boolean;
        value?: any;
    };
};

function getOptId<TFilters>(
    opt: ListerFilterOption<TFilters>,
): string | number {
    const anyOpt = opt as any;
    // preferred: explicit id
    if (anyOpt?.id != null) return anyOpt.id;
    // fallback: legacy `value` used as id
    return anyOpt?.value;
}

function getOptKind<TFilters>(
    opt: ListerFilterOption<TFilters>,
): string | undefined {
    return (opt as any)?.kind;
}

function getOptDisabled<TFilters>(opt: ListerFilterOption<TFilters>): boolean {
    return !!(opt as any)?.disabled;
}
function getOptApply<TFilters>(
    opt: ListerFilterOption<TFilters>,
): ResolvedFilterNode<TFilters>["apply"] | undefined {
    const anyOpt = opt as any;
    if (!anyOpt?.apply) return undefined;
    return {
        key: anyOpt.apply.key,
        mode: anyOpt.apply.mode,
        toggleable: anyOpt.apply.toggleable,
        value: anyOpt.apply.value,
    };
}

function getOptDbValue<TFilters>(opt: ListerFilterOption<TFilters>): any {
    const anyOpt = opt as any;
    // In the new model, "value" nodes can store their DB value separately;
    // we support a few shapes without forcing you to lock one down here.
    if (anyOpt?.dbValue !== undefined) return anyOpt.dbValue;
    if (anyOpt?.apply?.value !== undefined) return anyOpt.apply.value;
    // if you kept `value` as the db value on "value" nodes, use it
    return anyOpt?.value;
}
function hasExplicitId<TFilters>(opt: ListerFilterOption<TFilters>): boolean {
    return (opt as any)?.id != null;
}

/**
 * Node id resolution:
 * - If opt.id exists => use it AS-IS (canonical, not prefixed).
 * - Else => build a path id from the fallback (value) and prefix with parent path.
 *
 * This avoids breaking options that provide explicit ids while still supporting
 * stable path ids for options that don't.
 */
function getNodeId<TFilters>(
    opt: ListerFilterOption<TFilters>,
    parentNodeId?: string,
): string {
    // explicit id is canonical (do not prefix)
    if (hasExplicitId(opt)) return String((opt as any).id);

    // fallback id (legacy): value (or whatever getOptId returns)
    const base = String(getOptId(opt));
    return parentNodeId ? `${parentNodeId}.${base}` : base;
}

/**
 * Build an index for quick lookups by option id, while also resolving inherited bindKey.
 * - group nodes can set bindKey, inherited by children
 * - value nodes inherit bindKey unless they override it
 */
function indexFilterOptions<TFilters>(
    options: Array<ListerFilterOption<TFilters>>,
): Record<string, ResolvedFilterNode<TFilters>> {
    const out: Record<string, ResolvedFilterNode<TFilters>> = {};

    const walk = (
        list: Array<ListerFilterOption<TFilters>>,
        inheritedBindKey?: string,
        parentNodeId?: string,
    ) => {
        for (const opt of list) {
            const nodeId = getNodeId(opt, parentNodeId);
            const kind = getOptKind(opt);
            const disabled = getOptDisabled(opt);

            // resolve bindKey:
            // explicit bindKey on node wins, else inherit from parent
            const localBindKey = (opt as any)?.bindKey as string | undefined;
            const resolvedBindKey = localBindKey ?? inheritedBindKey;

            const apply = getOptApply(opt);

            // for "value" nodes, this is the payload value we will set under bindKey
            const dbValue = getOptDbValue(opt);

            out[nodeId] = {
                option: opt,
                id: nodeId,
                kind,
                disabled,
                bindKey: resolvedBindKey ?? apply?.key,
                dbValue,
                apply,
            };

            const children = (opt as any)?.children as
                | Array<ListerFilterOption<TFilters>>
                | undefined;

            if (Array.isArray(children) && children.length) {
                // Only pass parentNodeId forward if THIS node was not explicitly-id'd.
                // Because explicit ids are canonical + global; children without ids
                // should still get stable path ids when parent has no explicit id.
                const nextParentId = hasExplicitId(opt) ? parentNodeId : nodeId;
                walk(children, resolvedBindKey, nextParentId);
            }
        }
    };

    walk(options, undefined, undefined);
    return out;
}
function initialStoreState(): ListerStoreState {
    return { order: [], activeId: undefined, sessions: {} };
}

function initialSessionState(sessionId: ListerSessionId): AnyState {
    return {
        sessionId,
        createdAt: Date.now(),

        isOpen: false,
        mode: "single",
        confirm: false as any,

        draggable: true,
        position: null,
        hasMoved: false,

        searchMode: "remote",
        query: "",

        // runtime-only (widened in AnyState)
        searchSpec: undefined,
        searchTarget: undefined,
        ownerKey: undefined,

        loading: false,
        refreshing: false,

        rawList: [],
        optionsList: [],

        draftValue: null,
        initialDraftValue: null,

        refreshMode: "preserve-selection",

        // filters
        filtersSpec: undefined,
        filtersPatch: {},
        effectiveFilters: undefined,

        // IMPORTANT: these are now OPTION IDS (not db values)
        selectedFilterValues: [],
        searchPayload: undefined,
    };
}

export function buildSearchPayloadFromTarget(
    target?: ListerSearchTarget | null,
): ListerSearchPayload | undefined {
    if (!target) return undefined;

    if (target.mode === "all") return { searchAll: true };

    if (target.mode === "subject") {
        const subject = target.subject ?? undefined;
        return subject ? { subject } : undefined;
    }

    if (target.mode === "only") {
        const only = Array.isArray(target.only)
            ? target.only.filter((v) => v !== null && v !== undefined) // ✅ keep 0
            : undefined;

        return only && only.length ? { searchOnly: only } : undefined;
    }

    return undefined;
}

export function ListerProvider(props: {
    host: ListerProviderHost;
    presets?: PresetMap;
    http?: ListerHttpClient;
    /** provider-side debounce for remote search (default 300ms) */
    remoteDebounceMs?: number;
    children: React.ReactNode;
}) {
    const http = props.http ?? defaultHttpClient();

    // allow runtime registration + initial presets
    const presetsRef = React.useRef<PresetMap>({ ...(props.presets ?? {}) });

    const [store, _setStore] = React.useState<ListerStoreState>(() =>
        initialStoreState(),
    );
    const storeRef = React.useRef<ListerStoreState>(store);

    const setStore = React.useCallback(
        (updater: (prev: ListerStoreState) => ListerStoreState) => {
            _setStore((prev) => {
                const next = updater(prev);
                storeRef.current = next;
                return next;
            });
        },
        [],
    );

    // per-session latest-request-wins
    const reqIdBySessionRef = React.useRef<Record<string, number>>({});

    // per-session remote-search debounce timers
    const timerBySessionRef = React.useRef<Record<string, any>>({});

    /**
     * Find an existing session for this input instance (ownerKey),
     * so we can REUSE it across popover open/close and keep filters persistent.
     */
    const findSessionIdByOwnerKey = React.useCallback((ownerKey?: string) => {
        if (!ownerKey) return undefined;
        const sessions = storeRef.current.sessions as Record<string, AnyState>;
        for (const id of Object.keys(sessions)) {
            const s = sessions[id];
            if (s && (s as any).ownerKey === ownerKey) return id as any;
        }
        return undefined;
    }, []);

    const debounceMs = props.remoteDebounceMs ?? 300;

    const getSession = React.useCallback(
        (id: ListerSessionId): AnyState | undefined => {
            return storeRef.current.sessions[id] as AnyState | undefined;
        },
        [],
    );

    const patchSession = React.useCallback(
        (id: ListerSessionId, patch: Partial<AnyState>) => {
            setStore((s) => {
                const prev = s.sessions[id] as AnyState | undefined;
                if (!prev) return s;
                return {
                    ...s,
                    sessions: {
                        ...s.sessions,
                        [id]: { ...prev, ...patch } as AnyState,
                    },
                };
            });
        },
        [setStore],
    );

    const updateSession = React.useCallback(
        (id: ListerSessionId, fn: (prev: AnyState) => AnyState) => {
            setStore((s) => {
                const prev = s.sessions[id] as AnyState | undefined;
                if (!prev) return s;
                return {
                    ...s,
                    sessions: {
                        ...s.sessions,
                        [id]: fn(prev),
                    },
                };
            });
        },
        [setStore],
    );

    const clearSessionRefs = React.useCallback((id: ListerSessionId) => {
        if (timerBySessionRef.current[id]) {
            clearTimeout(timerBySessionRef.current[id]);
            delete timerBySessionRef.current[id];
        }
        delete reqIdBySessionRef.current[id];
    }, []);

    const focus = React.useCallback(
        (id: ListerSessionId) => {
            setStore((s) => {
                if (!s.sessions[id]) return s;
                const nextOrder = s.order.filter((x) => x !== id);
                nextOrder.push(id);
                return { ...s, order: nextOrder, activeId: id };
            });
        },
        [setStore],
    );

    const dispose = React.useCallback(
        (id: ListerSessionId) => {
            clearSessionRefs(id);
            setStore((s) => {
                if (!s.sessions[id]) return s;
                const nextSessions = { ...s.sessions };
                delete nextSessions[id];
                const nextOrder = s.order.filter((x) => x !== id);
                const nextActive =
                    s.activeId === id
                        ? nextOrder[nextOrder.length - 1]
                        : s.activeId;
                return {
                    ...s,
                    sessions: nextSessions,
                    order: nextOrder,
                    activeId: nextActive,
                };
            });
        },
        [clearSessionRefs, setStore],
    );

    const resolveAndDispose = React.useCallback(
        (id: ListerSessionId, result: any) => {
            const resolve = (
                storeRef.current.sessions[id] as AnyState | undefined
            )?._resolve;
            const s = storeRef.current.sessions[id] as AnyState | undefined;

            // Always clear timers/req tracking when a "dialog" completes.
            clearSessionRefs(id);

            // ✅ PERSISTENT sessions (ownerKey) must NOT be disposed.
            // They should simply close and keep filtersPatch/selectedFilterValues.
            if (s?.ownerKey) {
                patchSession(id, {
                    isOpen: false,
                    loading: false,
                    refreshing: false,
                    errorCode: undefined,
                    _resolve: undefined as any,
                });
                resolve?.(result);
                return;
            }

            // Default: ephemeral session lifecycle
            dispose(id);
            resolve?.(result);
        },
        [clearSessionRefs, dispose, patchSession],
    );

    const computeEffectiveFilters = React.useCallback(
        <TFilters,>(
            base: TFilters | undefined,
            patch: Partial<TFilters>,
            spec?: ListerFilterSpec<TFilters>,
        ): TFilters => {
            const merger =
                spec?.merge ?? ((b: any, p: any) => shallowMerge(b, p));
            return merger(base, patch);
        },
        [],
    );

    const reconcileDraftAfterFetch = React.useCallback(
        (id: ListerSessionId, nextOptions: any[]) => {
            updateSession(id, (s) => {
                let draft = s.draftValue;

                if (s.refreshMode === "clear-all") {
                    draft = s.mode === "multiple" ? [] : null;
                } else if (s.refreshMode === "clear-missing") {
                    const values = new Set(nextOptions.map((o) => o.value));
                    if (s.mode === "multiple") {
                        const arr = Array.isArray(draft) ? draft : [];
                        draft = arr.filter((v: any) => values.has(v));
                    } else {
                        if (draft != null && !values.has(draft as any))
                            draft = null;
                    }
                }

                return { ...s, draftValue: draft } as AnyState;
            });
        },
        [updateSession],
    );

    const registerPreset = React.useCallback((kind: string, def: AnyDef) => {
        presetsRef.current = { ...presetsRef.current, [kind]: def };
    }, []);

    const getPreset = React.useCallback((kind: string) => {
        return presetsRef.current?.[kind];
    }, []);

    const performFetch = React.useCallback(
        async (
            def: AnyDef,
            filters?: any,
            opts?: { query?: string; search?: ListerSearchPayload },
        ) => {
            const query = opts?.query ?? "";
            const search = opts?.search;

            const src = def.source;
            const method = (src.method ?? "GET") as "GET" | "POST";

            const built = src.buildRequest?.({
                filters,
                query,
                cursor: null,
            });

            const baseParams = built?.params ?? {
                ...(filters ?? {}),
                search: query,
            };
            const params = search ? { ...baseParams, ...search } : baseParams;

            const body = built?.body ?? {};
            const headers = built?.headers;

            const responseBody = await http({
                endpoint: src.endpoint,
                method,
                params,
                body,
                headers,
            });

            const rawList = extractArray<any>(responseBody, def.selector);
            const ctx = { query, filters };
            const optionsList = mapOptions<any, any, any, any>(
                rawList,
                def.mapping as any,
                ctx,
            );

            return {
                rawList,
                optionsList,
            };
        },
        [http],
    );

    const checkPermissions = React.useCallback(
        (
            kindOrDef: string | AnyDef,
            def: AnyDef,
            filters: any,
            permissions?: string[],
        ) => {
            const pctx = {
                kind: typeof kindOrDef === "string" ? kindOrDef : def.id,
                endpoint: def.source.endpoint,
                filters,
            };

            if (!evaluatePermissions(props.host, permissions, pctx)) {
                props.host.log({
                    level: "warning",
                    code: "lister.access_denied",
                    message: "Access denied.",
                    details: { permissions, pctx },
                });
                throw new Error("lister.access_denied");
            }
        },
        [props.host],
    );

    const apiFetchAny = React.useCallback(
        async (kindOrDef: string | AnyDef, filters?: any, opts?: any) => {
            const def: AnyDef | undefined =
                typeof kindOrDef === "string"
                    ? getPreset(kindOrDef)
                    : kindOrDef;

            if (!def) {
                props.host.log({
                    level: "error",
                    code: "lister.unknown_error",
                    message: "Lister definition not found.",
                    details: { kindOrDef },
                });
                throw new Error("lister.unknown_error");
            }

            checkPermissions(kindOrDef, def, filters, opts?.permissions);

            const { rawList, optionsList } = await performFetch(
                def,
                filters,
                opts,
            );

            return {
                rawList,
                optionsList,
                // for public api compatibility
                raw: rawList,
                options: optionsList,
            };
        },
        [checkPermissions, getPreset, performFetch, props.host],
    );

    const fetchAndHydrate = React.useCallback(
        async (
            id: ListerSessionId,
            reason: "open" | "search" | "refresh" | "filters",
            override?: {
                filters?: any;
                query?: string;
                search?: ListerSearchPayload;
            },
        ) => {
            const s0 = getSession(id);
            if (!s0?.definition) return;

            const myReq = (reqIdBySessionRef.current[id] ?? 0) + 1;
            reqIdBySessionRef.current[id] = myReq;

            const query = override?.query ?? s0.query;
            const filters =
                override?.filters ?? s0.effectiveFilters ?? s0.filters;

            // ✅ search resolution order:
            // 1) explicit override passed to fetchAndHydrate
            // 2) session-level payload override (from searchLocal/searchRemote)
            // 3) derived from current searchTarget
            const hasSearchOverride =
                !!override &&
                Object.prototype.hasOwnProperty.call(override, "search");

            const search: ListerSearchPayload | undefined = hasSearchOverride
                ? override!.search
                : ((s0 as any).searchPayload ??
                    buildSearchPayloadFromTarget((s0 as any).searchTarget));

            patchSession(id, {
                errorCode: undefined,
                loading: reason !== "refresh",
                refreshing: reason === "refresh",
            });

            try {
                const s = getSession(id);
                if (!s?.definition) return;

                const { rawList, optionsList } = await performFetch(
                    s.definition,
                    filters,
                    { query, search },
                );

                // stale response ignored
                if (reqIdBySessionRef.current[id] !== myReq) return;
                if (!getSession(id)) return;

                patchSession(id, {
                    rawList,
                    optionsList,
                    loading: false,
                    refreshing: false,
                });

                reconcileDraftAfterFetch(id, optionsList);
            } catch (err: any) {
                const code: ListerLogCode =
                    err?.message === "EXTRACT_NOT_ARRAY"
                        ? "lister.extract_not_array"
                        : "lister.fetch_failed";

                const s = getSession(id);

                props.host.log({
                    level: "error",
                    code,
                    message:
                        code === "lister.extract_not_array"
                            ? "Lister selector did not return an array."
                            : "Lister request failed.",
                    details: {
                        sessionId: id,
                        kind: s?.kind,
                        endpoint: s?.definition?.source?.endpoint,
                        query,
                        filters,
                        search,
                    },
                });

                patchSession(id, {
                    loading: false,
                    refreshing: false,
                    errorCode: code,
                });
            }
        },
        [
            getSession,
            patchSession,
            performFetch,
            props.host,
            reconcileDraftAfterFetch,
        ],
    );
    const getFilterCtx = React.useCallback(
        <TFilters,>(id: ListerSessionId): ListerFilterCtx<TFilters> => {
            const refresh = () => {
                const s = getSession(id);
                if (!s) return;
                fetchAndHydrate(id, "filters", {
                    filters: s.effectiveFilters ?? s.filters,
                    query: s.query,
                });
            };

            const get = (key: any) => {
                const s = getSession(id) as any;
                const cur = (s?.effectiveFilters ?? s?.filters) as any;
                return cur?.[key];
            };

            const commitPatch = (
                updater: (prev: Partial<TFilters>) => Partial<TFilters>,
            ) => {
                let nextEffective: any;
                let shouldFetch = true;

                updateSession(id, (s: any) => {
                    const spec: ListerFilterSpec<TFilters> | undefined =
                        s.filtersSpec;
                    const base: TFilters | undefined = s.filters;

                    const nextPatch = updater(
                        (s.filtersPatch ?? {}) as Partial<TFilters>,
                    );
                    nextEffective = computeEffectiveFilters<TFilters>(
                        base,
                        nextPatch,
                        spec,
                    );

                    // ✅ local mode = don’t fetch (unless you want to override this behavior)
                    shouldFetch =
                        spec?.autoFetch !== false && s.searchMode !== "local";

                    return {
                        ...s,
                        filtersPatch: nextPatch,
                        effectiveFilters: nextEffective,
                    };
                });

                if (shouldFetch)
                    queueMicrotask(() =>
                        fetchAndHydrate(id, "filters", {
                            filters: nextEffective,
                        }),
                    );
            };

            const s = getSession(id);

            return {
                base: s?.filters as any as TFilters | undefined,
                patch: ((s?.filtersPatch as any) ?? {}) as Partial<TFilters>,
                effective: (s?.effectiveFilters ?? s?.filters) as any as
                    | TFilters
                    | undefined,

                set(key: any, value: any) {
                    commitPatch((p) => ({ ...(p as any), [key]: value }));
                },

                merge(patch: any) {
                    commitPatch((p) => ({ ...(p as any), ...(patch as any) }));
                },

                unset(key: any) {
                    commitPatch((p) => {
                        const next = { ...(p as any) };
                        delete next[key];
                        return next;
                    });
                },

                clear() {
                    commitPatch(() => ({}) as any);
                },

                refresh,

                get: get as any,
            };
        },
        [computeEffectiveFilters, fetchAndHydrate, getSession, updateSession],
    );

    /**
     * NEW apply logic:
     * - expects `optionId` (UI id) — not db value
     * - resolves bindKey (inherit from group parent if needed)
     * - keeps UI selection tracker as option ids
     * - recomputes ctx value for the bindKey from all selected ids for that key
     */
    const applyFilterOption = React.useCallback(
        (id: ListerSessionId, optionId: string | number) => {
            const s = getSession(id);
            const spec: ListerFilterSpec<any> | undefined = s?.filtersSpec;

            if (!s || !spec?.options?.length) return;

            const index = indexFilterOptions<any>(
                spec.options as Array<ListerFilterOption<any>>,
            );

            const node = index[String(optionId)];
            // console.log(index, node, optionId);

            if (!node || node.disabled) return;

            // Only "value" nodes (or nodes with apply) are clickable.
            // (Inputs mutate ctx directly via ctx.set/merge/unset.)
            const isValueKind = node.kind === "value";
            const hasApply = !!node.apply;

            if (!isValueKind && !hasApply) return;

            const ctx = getFilterCtx<any>(id);

            const key = (node.bindKey ?? node.apply?.key) as string | undefined;
            if (!key) return;

            const mode = (node.apply?.mode ?? "replace") as
                | "replace"
                | "merge"
                | "unset";

            const toggleable = node.apply?.toggleable ?? true;

            const prevSelected: Array<string | number> = Array.isArray(
                s.selectedFilterValues,
            )
                ? [...(s.selectedFilterValues as any)]
                : [];

            // ✅ IMPORTANT: selection is tracked by optionId (the UI id)
            const isSelected = prevSelected.includes(optionId);

            // remove from selection?
            const shouldRemove = mode === "unset" || (toggleable && isSelected);

            const nextSelected = shouldRemove
                ? prevSelected.filter((x) => x !== optionId)
                : isSelected
                    ? prevSelected
                    : [...prevSelected, optionId];

            // ✅ store UI selection ids
            patchSession(id, { selectedFilterValues: nextSelected });

            // recompute effective value(s) for THIS key based on all selected ids
            const valuesForKey: any[] = [];
            for (const sid of nextSelected) {
                const n = index[String(sid)];
                if (!n || n.disabled) continue;

                const nKey = (n.bindKey ?? n.apply?.key) as string | undefined;
                if (!nKey || nKey !== key) continue;

                // db value: apply.value overrides, else node.dbValue
                const v =
                    n.apply && n.apply.value !== undefined
                        ? n.apply.value
                        : n.dbValue;

                // ignore undefined values
                if (v === undefined) continue;

                valuesForKey.push(v);
            }

            // no more values for this key => unset
            if (!valuesForKey.length) {
                ctx.unset(key as any);
                return;
            }

            // normalize:
            // - 1 value => scalar
            // - 2+ values => array
            const nextVal =
                valuesForKey.length === 1 ? valuesForKey[0] : valuesForKey;

            if (mode === "merge") ctx.merge({ [key]: nextVal } as any);
            else ctx.set(key as any, nextVal);
        },
        [getFilterCtx, getSession, patchSession],
    );

    const apiOpenAny = React.useCallback(
        async (kindOrDef: string | AnyDef, filters?: any, opts?: any) => {
            const mode: ListerMode = opts?.mode ?? "single";

            try {
                const def: AnyDef | undefined =
                    typeof kindOrDef === "string"
                        ? getPreset(kindOrDef)
                        : (kindOrDef as AnyDef);

                if (!def) {
                    props.host.log({
                        level: "error",
                        code: "lister.unknown_error",
                        message: "Lister definition not found.",
                        details: { kindOrDef },
                    });
                    return;
                }

                const confirm =
                    mode === "multiple" ? true : (opts?.confirm ?? false);

                checkPermissions(kindOrDef, def, filters, opts?.permissions);

                const ownerKey = opts?.ownerKey as string | undefined;

                // ✅ Reuse an existing session for this ownerKey (popover reopen)
                const reusedId = findSessionIdByOwnerKey(ownerKey);
                const sessionId = reusedId ?? makeSessionId();
                const prev = reusedId
                    ? (getSession(sessionId) as AnyState)
                    : undefined;

                const initialDraft =
                    opts?.defaultValue ?? (mode === "multiple" ? [] : null);
                const pos = anchorToPos(opts?.anchor);

                // filters: persist patch + selection if session is reused
                const filtersSpec =
                    (opts?.filtersSpec as ListerFilterSpec<any> | undefined) ??
                    (prev?.filtersSpec as any);

                const filtersPatch = (prev?.filtersPatch as any) ?? {};
                const resolvedSearchMode: ListerSearchMode =
                    (opts?.searchMode as ListerSearchMode | undefined) ??
                    (prev?.searchMode as ListerSearchMode | undefined) ??
                    "remote";

                const selectedFilterValues =
                    (prev?.selectedFilterValues as any[]) ?? [];

                const effectiveFilters = computeEffectiveFilters(
                    filters,
                    filtersPatch,
                    filtersSpec,
                );

                // derive search config from definition
                const searchSpec = def?.search;

                // searchTarget: persist if reused, else default from searchSpec.default
                const defaultCol = (searchSpec as any)?.default as
                    | string
                    | undefined;
                const defaultSearchTarget: ListerSearchTarget | undefined =
                    defaultCol
                        ? { mode: "subject", subject: defaultCol, only: null }
                        : undefined;
                const searchTarget =
                    (prev?.searchTarget as any) ?? defaultSearchTarget;

                // query: persist if reused unless caller forces initialQuery
                const initialQuery =
                    (opts?.initialQuery as string | undefined) ??
                    (prev?.query as any) ??
                    "";

                // Fetch using *effectiveFilters* and *searchTarget*
                const searchPayload: ListerSearchPayload | undefined =
                    (prev as any)?.searchPayload ??
                    buildSearchPayloadFromTarget(searchTarget);
                const { rawList, optionsList } = await performFetch(
                    def,
                    effectiveFilters,
                    { query: initialQuery, search: searchPayload },
                );

                return await new Promise<ListerOpenResult<any, any, any, any>>(
                    (resolve) => {
                        const base = initialSessionState(sessionId);

                        const nextSession: AnyState = {
                            ...(prev ? { ...(prev as any) } : base),
                            isOpen: true,

                            kind:
                                typeof kindOrDef === "string"
                                    ? kindOrDef
                                    : undefined,
                            definition: def,
                            filters,
                            permissions: opts?.permissions,

                            ownerKey,

                            mode: mode as any,
                            confirm: confirm as any,
                            title: opts?.title,

                            draggable: opts?.draggable ?? true,
                            position: pos,
                            hasMoved: false,

                            searchMode: resolvedSearchMode,
                            query: initialQuery,

                            searchSpec,
                            searchTarget,

                            showRefresh: opts?.showRefresh ?? false,
                            refreshMode:
                                opts?.refreshMode ?? "preserve-selection",

                            // filters
                            filtersSpec,
                            filtersPatch,
                            effectiveFilters,
                            selectedFilterValues,

                            // store callbacks for later UI + logic
                            onChange: opts?.onChange,
                            renderOption: opts?.renderOption,

                            loading: false,
                            refreshing: false,
                            errorCode: undefined,

                            rawList,
                            optionsList,

                            draftValue: initialDraft,
                            initialDraftValue: initialDraft,

                            _resolve: resolve as any,
                        };

                        setStore((s) => ({
                            ...s,
                            sessions: {
                                ...s.sessions,
                                [sessionId]: nextSession,
                            },
                            order: [
                                ...s.order.filter((x) => x !== sessionId),
                                sessionId,
                            ],
                            activeId: sessionId,
                        }));

                        queueMicrotask(() =>
                            reconcileDraftAfterFetch(sessionId, optionsList),
                        );
                    },
                );
            } catch (err: any) {
                return {
                    reason:
                        err?.message === "lister.access_denied"
                            ? "denied"
                            : "error",
                    value: mode === "multiple" ? [] : null,
                    details: {
                        options: mode === "multiple" ? [] : null,
                        raw: mode === "multiple" ? [] : null,
                        action:
                            err?.message === "lister.access_denied"
                                ? "denied"
                                : "error",
                        errorCode: err?.message,
                    },
                };
            }
        },
        [
            computeEffectiveFilters,
            getPreset,
            findSessionIdByOwnerKey,
            getSession,
            performFetch,
            checkPermissions,
            reconcileDraftAfterFetch,
            setStore,
        ],
    );

    const apply = React.useCallback(
        (id: ListerSessionId) => {
            const s = getSession(id);
            if (!s?.isOpen) return;

            const details = buildDetails({
                mode: s.mode as any,
                draftValue: s.draftValue as any,
                optionsList: s.optionsList as any,
                action: "init",
            });

            resolveAndDispose(id, {
                reason: "apply",
                value: s.draftValue,
                details: {
                    options: (details as any).options,
                    raw: (details as any).raw,
                    action: "apply",
                    sessionId: id,
                },
            });
        },
        [getSession, resolveAndDispose],
    );

    const cancel = React.useCallback(
        (id: ListerSessionId) => {
            const s = getSession(id);
            if (!s?.isOpen) return;

            const details = buildDetails({
                mode: s.mode as any,
                draftValue: s.initialDraftValue as any,
                optionsList: s.optionsList as any,
                action: "init",
            });

            resolveAndDispose(id, {
                reason: "cancel",
                value: s.initialDraftValue,
                details: {
                    options: (details as any).options,
                    raw: (details as any).raw,
                    action: "cancel",
                    sessionId: id,
                },
            });
        },
        [getSession, resolveAndDispose],
    );

    const close = React.useCallback(
        (id: ListerSessionId) => {
            const s = getSession(id);
            if (!s?.isOpen) return;

            const details = buildDetails({
                mode: s.mode as any,
                draftValue: s.initialDraftValue as any,
                optionsList: s.optionsList as any,
                action: "init",
            });

            resolveAndDispose(id, {
                reason: "close",
                value: s.initialDraftValue,
                details: {
                    options: (details as any).options,
                    raw: (details as any).raw,
                    action: "close",
                    sessionId: id,
                },
            });
        },
        [getSession, resolveAndDispose],
    );

    const commitDraft = React.useCallback(
        (
            id: ListerSessionId,
            nextDraft: any,
            action: "select" | "deselect" | "clear" | "init",
        ) => {
            const s = getSession(id);
            if (!s) return;

            const e = makeChangeEvent();

            const details = buildDetails({
                mode: s.mode as any,
                draftValue: nextDraft,
                optionsList: s.optionsList as any,
                action,
            });

            s.onChange?.(nextDraft, details as any, e as any);
            if (e.defaultPrevented) return;

            patchSession(id, { draftValue: nextDraft });
        },
        [getSession, patchSession],
    );

    const select = React.useCallback(
        (id: ListerSessionId, value: ListerId) => {
            const s = getSession(id);
            if (!s?.isOpen) return;

            if (s.mode === "multiple") {
                const arr = Array.isArray(s.draftValue) ? s.draftValue : [];
                if (arr.includes(value)) return;
                commitDraft(id, [...arr, value], "select");
                return;
            }

            if (s.draftValue === value) return;
            commitDraft(id, value, "select");

            if (s.mode === "single" && !s.confirm)
                queueMicrotask(() => apply(id));
        },
        [apply, commitDraft, getSession],
    );

    const deselect = React.useCallback(
        (id: ListerSessionId, value: ListerId) => {
            const s = getSession(id);
            if (!s?.isOpen) return;

            if (s.mode === "multiple") {
                const arr = Array.isArray(s.draftValue) ? s.draftValue : [];
                if (!arr.includes(value)) return;
                commitDraft(
                    id,
                    arr.filter((v: any) => v !== value),
                    "deselect",
                );
                return;
            }

            if (s.draftValue !== value) return;
            commitDraft(id, null, "deselect");

            if (s.mode === "single" && !s.confirm)
                queueMicrotask(() => apply(id));
        },
        [apply, commitDraft, getSession],
    );

    const toggle = React.useCallback(
        (id: ListerSessionId, value: ListerId) => {
            const s = getSession(id);
            if (!s?.isOpen) return;

            const { nextDraft, action } = computeNextDraft(
                s.mode as any,
                s.draftValue as any,
                value as any,
            );
            commitDraft(id, nextDraft, action);

            if (s.mode === "single" && !s.confirm)
                queueMicrotask(() => apply(id));
        },
        [apply, commitDraft, getSession],
    );

    const clear = React.useCallback(
        (id: ListerSessionId) => {
            const s = getSession(id);
            if (!s?.isOpen) return;

            const nextDraft = s.mode === "multiple" ? [] : null;
            commitDraft(id, nextDraft, "clear");

            if (s.mode === "single" && !s.confirm)
                queueMicrotask(() => apply(id));
        },
        [apply, commitDraft, getSession],
    );

    const setQuery = React.useCallback(
        (id: ListerSessionId, q: string) => {
            patchSession(id, { query: q });
        },
        [patchSession],
    );

    const setSearchMode = React.useCallback(
        (id: ListerSessionId, mode: ListerSearchMode) => {
            const s = getSession(id);
            if (!s) return;

            const prevMode = s.searchMode;
            patchSession(id, { searchMode: mode });

            if (prevMode === mode) return;

            // ✅ when entering local: fetch a base dataset (no query + no search payload)
            // then local UI applies current query/payload/filters via getVisibleOptions()
            if (mode === "local") {
                fetchAndHydrate(id, "refresh", {
                    filters: s.effectiveFilters ?? s.filters,
                    query: "", // base fetch (unsearched)
                    search: undefined, // force NO search payload
                });
            }
        },
        [fetchAndHydrate, getSession, patchSession],
    );

    const scheduleRemoteFetch = React.useCallback(
        (
            id: ListerSessionId,
            q: string,
            payloadOverride?: ListerSearchPayload,
        ) => {
            if (timerBySessionRef.current[id])
                clearTimeout(timerBySessionRef.current[id]);

            timerBySessionRef.current[id] = setTimeout(() => {
                const s = getSession(id);

                // ✅ same precedence everywhere:
                // payloadOverride > session.searchPayload > derived from searchTarget
                const search: ListerSearchPayload | undefined =
                    payloadOverride ??
                    (s as any)?.searchPayload ??
                    buildSearchPayloadFromTarget((s as any)?.searchTarget);

                fetchAndHydrate(id, "search", { query: q, search });
            }, debounceMs);
        },
        [debounceMs, fetchAndHydrate, getSession],
    );

    const setSearchTarget = React.useCallback(
        (id: ListerSessionId, target: ListerSearchTarget) => {
            patchSession(id, {
                searchTarget: target,
                searchPayload: undefined,
            }); // ✅ clear override

            const s = getSession(id);
            const mode = s?.searchMode ?? "remote";
            const q = s?.query ?? "";
            const payload = buildSearchPayloadFromTarget(target);

            if (mode === "remote" || mode === "hybrid")
                scheduleRemoteFetch(id, q, payload);
        },
        [getSession, patchSession, scheduleRemoteFetch],
    );

    const searchLocalImpl = React.useCallback(
        (id: ListerSessionId, q: string, payload?: ListerSearchPayload) => {
            // ✅ store payload override so local UI respects it
            patchSession(id, { query: q, searchPayload: payload });

            const s = getSession(id);
            if (!s) return;

            if (s.searchMode === "hybrid") {
                scheduleRemoteFetch(id, q, payload);
            }
        },
        [getSession, patchSession, scheduleRemoteFetch],
    );

    const searchRemoteImpl = React.useCallback(
        (id: ListerSessionId, q: string, payload?: ListerSearchPayload) => {
            // ✅ keep payload override in session too
            patchSession(id, { query: q, searchPayload: payload });
            scheduleRemoteFetch(id, q, payload);
        },
        [patchSession, scheduleRemoteFetch],
    );

    const searchLocal = searchLocalImpl as InternalContextValue["searchLocal"];
    const searchRemote =
        searchRemoteImpl as InternalContextValue["searchRemote"];

    const refresh = React.useCallback(
        (id: ListerSessionId) => {
            fetchAndHydrate(id, "refresh");
        },
        [fetchAndHydrate],
    );

    const setPosition = React.useCallback(
        (id: ListerSessionId, pos: { x: number; y: number } | null) => {
            updateSession(
                id,
                (s) =>
                    ({
                        ...s,
                        position: pos,
                        hasMoved: pos ? true : s.hasMoved,
                    }) as AnyState,
            );
        },
        [updateSession],
    );

    const getVisibleOptions = React.useCallback(
        (id: ListerSessionId) => {
            const s = getSession(id);
            if (!s) return [];

            // remote mode: show fetched options as-is
            if (s.searchMode === "remote") return s.optionsList;

            const def = s.definition as AnyDef | undefined;
            if (!def) return [];

            const filters = s.effectiveFilters ?? s.filters;

            // ✅ payload: explicit override wins, else derive from searchTarget
            const payload: ListerSearchPayload | undefined =
                (s as any).searchPayload ??
                buildSearchPayloadFromTarget((s as any)?.searchTarget);

            // ✅ local “equivalent” filtering: filters + payload + query
            const visibleRaw = filterRawListLocal(
                (s.rawList ?? []) as any[],
                s.query,
                payload,
                filters,
                {
                    searchSpec: (s as any).searchSpec ?? def.search,
                    filtersSpec: (s as any).filtersSpec,
                },
            );

            // ✅ IMPORTANT: remap with CURRENT ctx (mirrors remote)
            const mapCtx = { query: s.query, filters };
            return mapOptions<any, any, any, any>(
                visibleRaw,
                def.mapping as any,
                mapCtx,
            );
        },
        [getSession],
    );

    const value: InternalContextValue = React.useMemo(
        () => ({
            host: props.host,
            http,
            presetsRef,

            store,

            apiFetchAny,
            apiOpenAny,

            focus,
            dispose,

            apply,
            cancel,
            close,

            toggle,
            select,
            deselect,
            clear,

            setQuery,
            setSearchMode,
            setSearchTarget,

            searchLocal,
            searchRemote,

            refresh,
            setPosition,

            getFilterCtx,
            applyFilterOption,

            registerPreset,
            getPreset,

            getVisibleOptions,
        }),
        [
            apiFetchAny,
            apiOpenAny,
            apply,
            applyFilterOption,
            cancel,
            clear,
            close,
            deselect,
            dispose,
            focus,
            getFilterCtx,
            getPreset,
            getVisibleOptions,
            http,
            props.host,
            refresh,
            registerPreset,
            searchLocal,
            searchRemote,
            select,
            setPosition,
            setQuery,
            setSearchMode,
            setSearchTarget,
            store,
            toggle,
        ],
    );

    return <Ctx.Provider value={value}>{props.children}</Ctx.Provider>;
}