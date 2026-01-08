// packages/form-palette/src/presets/lister/hooks/use-data.ts

import * as React from "react";

import type {
    ListerSearchMode,
    ListerSearchPayload,
    ListerSearchTarget,
} from "@/presets/lister/types";

import { extractArray } from "@/presets/lister/runtime/engine/extract";
import {
    defaultHttpClient,
    type ListerHttpClient,
} from "@/presets/lister/runtime/engine/http";
import { createRequestId } from "@/presets/lister/runtime/engine/engine";
import { buildSearchPayloadFromTarget } from "@/presets/lister/runtime/engine/search";

/**
 * Minimal selector contract (matches extractArray contract used by lister)
 * - function: (body) => array
 * - string: path selector
 */
export type DataSelector<T> = ((body: any) => T[]) | string;

export type DataSearchConfig = {
    default?: string;
};

export type DataBuildRequestCtx<TFilters> = {
    filters?: TFilters;
    query: string;
    cursor: any;
};

export type DataBuildRequestResult = {
    params?: any;
    body?: any;
    headers?: any;
};

export type DataKey = string | number;

export type DataSelectionMode = "none" | "single" | "multiple";

export type DataSelectionKey<TItem> =
    | keyof TItem
    | string
    | ((item: TItem) => DataKey | null | undefined);

export type DataSelectionConfig<TItem> = {
    mode?: Exclude<DataSelectionMode, "none">;
    /**
     * How to resolve the ID for an item.
     * - string/ keyof: item[key]
     * - function: (item) => id
     * Defaults to: item.id ?? item.value
     */
    key?: DataSelectionKey<TItem>;
    /**
     * If "missing", selection IDs that don't exist in the *latest fetched list* are removed.
     * Default: "never" (recommended; avoids wiping selection on remote searches).
     */
    prune?: "never" | "missing";
};

export type UseDataOptions<TItem = any, TFilters = Record<string, any>> = {
    id?: string;

    endpoint: string;
    method?: "GET" | "POST";

    selector?: DataSelector<TItem>;

    /**
     * Passed through into request builder (same signature shape as legacy provider)
     */
    buildRequest?: (
        ctx: DataBuildRequestCtx<TFilters>,
    ) => DataBuildRequestResult;

    /**
     * Minimal search config (default subject column).
     */
    search?: DataSearchConfig;

    /**
     * Raw filters object
     */
    filters?: TFilters;

    initial?: TItem[];

    enabled?: boolean;
    fetchOnMount?: boolean;

    searchMode?: ListerSearchMode;
    debounceMs?: number;

    autoFetchOnFilterChange?: boolean;

    /**
     * Optional selection support (by stable item key)
     */
    selection?: DataSelectionConfig<TItem>;

    /**
     * Optional override: custom http client (otherwise uses global axios / axios import)
     */
    http?: ListerHttpClient;
};

export type UseDataResult<TItem = any, TFilters = Record<string, any>> = {
    id?: string;

    data: TItem[];
    visible: TItem[];

    loading: boolean;
    error: any;

    query: string;
    setQuery: (q: string) => void;

    searchMode: ListerSearchMode;
    setSearchMode: (m: ListerSearchMode) => void;

    searchTarget?: ListerSearchTarget;
    setSearchTarget: (t: ListerSearchTarget) => void;

    filters?: TFilters;
    setFilters: (next: TFilters | undefined) => void;
    patchFilters: (patch: Partial<TFilters>) => void;
    clearFilters: () => void;

    // selection
    selectionMode: DataSelectionMode;
    selectedIds: DataKey | DataKey[] | null;
    selected: TItem | TItem[] | null;

    select: (id: DataKey | DataKey[]) => void;
    deselect: (id: DataKey | DataKey[]) => void;
    toggle: (id: DataKey) => void;
    clearSelection: () => void;
    isSelected: (id: DataKey) => boolean;
    getSelection: () => TItem | TItem[] | null;

    refresh: () => void;

    fetch: (override?: {
        query?: string;
        filters?: TFilters;
        searchTarget?: ListerSearchTarget;
        search?: ListerSearchPayload;
    }) => Promise<TItem[]>;
};

function defaultSearchTarget(
    search?: DataSearchConfig,
): ListerSearchTarget | undefined {
    const def = search?.default;
    return def ? { mode: "subject", subject: def, only: null } : undefined;
}

function isKey(x: any): x is DataKey {
    return typeof x === "string" || typeof x === "number";
}

function isAbortError(e: any): boolean {
    const name = String(e?.name ?? "");
    const msg = String(e?.message ?? "");
    return (
        name === "AbortError" ||
        name === "CanceledError" ||
        name === "CancelError" ||
        /aborted|canceled|cancelled/i.test(msg)
    );
}

function stringifyForSearch(v: any): string {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (
        typeof v === "number" ||
        typeof v === "boolean" ||
        typeof v === "bigint"
    ) {
        return String(v);
    }
    if (v instanceof Date) {
        return Number.isNaN(v.getTime()) ? "" : v.toISOString();
    }
    if (Array.isArray(v)) {
        return v.map(stringifyForSearch).join(" ");
    }
    if (typeof v === "object") {
        try {
            return JSON.stringify(v);
        } catch {
            return String(v);
        }
    }
    return String(v);
}

export function useData<TItem = any, TFilters = Record<string, any>>(
    opts: UseDataOptions<TItem, TFilters>,
): UseDataResult<TItem, TFilters> {
    const enabled = opts.enabled ?? true;
    const debounceMs = opts.debounceMs ?? 300;

    const http = opts.http ?? defaultHttpClient;

    const [data, setData] = React.useState<TItem[]>(() => opts.initial ?? []);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<any>(undefined);

    const dataRef = React.useRef<TItem[]>(data);
    React.useEffect(() => {
        dataRef.current = data;
    }, [data]);

    const [query, _setQuery] = React.useState("");
    const [searchMode, _setSearchMode] = React.useState<ListerSearchMode>(
        opts.searchMode ?? "remote",
    );

    const [searchTarget, _setSearchTarget] = React.useState<
        ListerSearchTarget | undefined
    >(() => defaultSearchTarget(opts.search));

    const [filters, _setFilters] = React.useState<TFilters | undefined>(
        opts.filters,
    );

    // selection config
    const selectionMode: DataSelectionMode = opts.selection?.mode ?? "none";
    const selectionPrune = opts.selection?.prune ?? "never";

    const getItemKey = React.useMemo(() => {
        const key = opts.selection?.key;

        // default: item.id ?? item.value
        if (!key) {
            return (item: any): DataKey | null => {
                const v = item?.id ?? item?.value;
                return isKey(v) ? v : null;
            };
        }

        if (typeof key === "function") {
            return (item: TItem): DataKey | null => {
                const v = key(item);
                return isKey(v) ? v : null;
            };
        }

        // string/ keyof
        return (item: any): DataKey | null => {
            const v = item?.[key as any];
            return isKey(v) ? v : null;
        };
    }, [opts.selection?.key]);

    /**
     * IMPORTANT:
     * Keep internal selection state as an array ALWAYS.
     */
    const [selectedIdsArr, setSelectedIdsArr] = React.useState<DataKey[]>([]);

    // cache id -> latest known item
    const selectedCacheRef = React.useRef<Map<DataKey, TItem>>(new Map());

    // last-request-wins
    const reqIdRef = React.useRef(0);

    // abort in-flight request
    const abortRef = React.useRef<AbortController | null>(null);

    // debounce timer (remote/hybrid typing)
    const timerRef = React.useRef<any>(null);

    // avoid effect double-fetch
    const didMountRef = React.useRef(false);

    // prevent mode switch immediate-fetch from also triggering debounce fetch
    const skipNextModeEffectRef = React.useRef(false);

    React.useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (abortRef.current) {
                try {
                    abortRef.current.abort();
                } catch {
                    // ignore
                }
            }
        };
    }, []);

    const dataById = React.useMemo(() => {
        const map = new Map<DataKey, TItem>();
        if (selectionMode === "none") return map;

        for (const item of data) {
            const k = getItemKey(item);
            if (k == null) continue;
            map.set(k, item);
        }
        return map;
    }, [data, getItemKey, selectionMode]);

    const normalizeIds = React.useCallback((v: DataKey | DataKey[]) => {
        return Array.isArray(v) ? v : [v];
    }, []);

    const commitSelectedCache = React.useCallback(
        (list: TItem[]) => {
            if (selectionMode === "none") return;

            for (const item of list) {
                const k = getItemKey(item);
                if (k == null) continue;
                selectedCacheRef.current.set(k, item);
            }
        },
        [getItemKey, selectionMode],
    );

    const fetchImpl = React.useCallback(
        async (override?: {
            query?: string;
            filters?: TFilters;
            searchTarget?: ListerSearchTarget;
            search?: ListerSearchPayload;
        }): Promise<TItem[]> => {
            if (!enabled) return dataRef.current;

            const q = override?.query ?? query;
            const f = override?.filters ?? filters;
            const t = override?.searchTarget ?? searchTarget;

            const myReq = ++reqIdRef.current;

            if (abortRef.current) {
                try {
                    abortRef.current.abort();
                } catch {
                    // ignore
                }
            }
            const controller =
                typeof AbortController !== "undefined"
                    ? new AbortController()
                    : null;
            abortRef.current = controller;

            setLoading(true);
            setError(undefined);

            try {
                const payload: ListerSearchPayload | undefined =
                    override?.search ?? buildSearchPayloadFromTarget(t);

                const built =
                    opts.buildRequest?.({
                        filters: f,
                        query: q,
                        cursor: null,
                    }) ?? {};

                // Compatibility: default query key is "search"
                const baseParams = built.params ?? {
                    ...(f ?? ({} as any)),
                    search: q,
                };

                const params = payload
                    ? { ...baseParams, ...payload }
                    : baseParams;

                const body = built.body ?? {};
                const headers = built.headers;

                const resBody = await http({
                    endpoint: opts.endpoint,
                    method: (opts.method ?? "GET") as any,
                    params,
                    body,
                    headers,
                    signal: controller?.signal,
                    requestId: createRequestId(),
                });

                const list = extractArray<TItem>(resBody, opts.selector as any);

                // last-request-wins
                if (reqIdRef.current !== myReq) return list;

                commitSelectedCache(list);

                if (selectionMode !== "none" && selectionPrune === "missing") {
                    const nextIds = new Set<DataKey>();
                    for (const item of list) {
                        const k = getItemKey(item);
                        if (k != null) nextIds.add(k);
                    }
                    setSelectedIdsArr((prev) =>
                        prev.filter((x) => nextIds.has(x)),
                    );
                }

                setData(list);
                setLoading(false);
                return list;
            } catch (e: any) {
                if (reqIdRef.current !== myReq) return dataRef.current;

                if (isAbortError(e)) {
                    // keep prior data; clear loading
                    setLoading(false);
                    return dataRef.current;
                }

                setError(e);
                setLoading(false);
                return dataRef.current;
            }
        },
        [
            enabled,
            query,
            filters,
            searchTarget,
            http,
            opts.endpoint,
            opts.method,
            opts.selector,
            opts.buildRequest,
            commitSelectedCache,
            selectionMode,
            selectionPrune,
            getItemKey,
        ],
    );

    const refresh = React.useCallback(() => {
        void fetchImpl();
    }, [fetchImpl]);

    const setQuery = React.useCallback((q: string) => _setQuery(q), []);

    /**
     * Mode switch semantics:
     * - switching to local: fetch a "base list" once (query "", no search payload)
     * - switching to remote/hybrid: immediate fetch (skip next debounced effect fetch)
     */
    const setSearchMode = React.useCallback(
        (m: ListerSearchMode) => {
            if (timerRef.current) clearTimeout(timerRef.current);

            if (m === "remote" || m === "hybrid") {
                skipNextModeEffectRef.current = true;
                _setSearchMode(m);
                void fetchImpl();
                return;
            }

            _setSearchMode(m);

            if (m === "local") {
                void fetchImpl({
                    query: "",
                    search: undefined,
                });
            }
        },
        [fetchImpl],
    );

    const setSearchTarget = React.useCallback((t: ListerSearchTarget) => {
        _setSearchTarget(t);
        // debounced fetch handled by effect
    }, []);

    const setFilters = React.useCallback(
        (next: TFilters | undefined) => _setFilters(next),
        [],
    );

    const patchFilters = React.useCallback((patch: Partial<TFilters>) => {
        _setFilters((prev) => ({
            ...(prev ?? ({} as any)),
            ...(patch as any),
        }));
    }, []);

    const clearFilters = React.useCallback(() => _setFilters(undefined), []);

    const fetchOnMount = opts.fetchOnMount ?? !opts.initial;

    React.useEffect(() => {
        if (!enabled) return;
        if (!fetchOnMount) return;
        void fetchImpl();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Debounced fetch on query/searchTarget changes (remote/hybrid only)
     */
    React.useEffect(() => {
        if (!enabled) return;

        if (!didMountRef.current) {
            didMountRef.current = true;
            return;
        }

        if (searchMode !== "remote" && searchMode !== "hybrid") return;

        if (skipNextModeEffectRef.current) {
            skipNextModeEffectRef.current = false;
            return;
        }

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            void fetchImpl();
        }, debounceMs);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [debounceMs, enabled, fetchImpl, query, searchMode, searchTarget]);

    /**
     * Filter changes:
     * - auto fetch in remote/hybrid
     * - local mode doesn't need fetch; filtering is client-side over base dataset
     */
    React.useEffect(() => {
        if (!enabled) return;
        if (opts.autoFetchOnFilterChange === false) return;
        if (!didMountRef.current) return;

        if (searchMode !== "remote" && searchMode !== "hybrid") return;

        void fetchImpl();
    }, [enabled, fetchImpl, filters, opts.autoFetchOnFilterChange, searchMode]);

    /**
     * Visible list (local/hybrid):
     * - subject => search only that field
     * - searchAll => search stringify
     * - searchOnly => restrict to IDs
     */
    const visible = React.useMemo(() => {
        if (searchMode !== "local" && searchMode !== "hybrid") return data;

        const payload = buildSearchPayloadFromTarget(searchTarget);
        let list = data;

        if (payload?.searchOnly && payload.searchOnly.length) {
            const allow = new Set(payload.searchOnly as any[]);
            list = list.filter((item) => {
                const k = getItemKey(item);
                return k != null && allow.has(k as any);
            });
        }

        const q = query.trim();
        if (!q) return list;

        const ql = q.toLowerCase();

        if (payload?.subject) {
            const key = payload.subject;
            return list.filter((item: any) =>
                String(item?.[key] ?? "")
                    .toLowerCase()
                    .includes(ql),
            );
        }

        return list.filter((item: any) =>
            stringifyForSearch(item).toLowerCase().includes(ql),
        );
    }, [data, getItemKey, query, searchMode, searchTarget]);

    // ─────────────────────────────────────────────
    // Selection API
    // ─────────────────────────────────────────────

    const selectedIds: DataKey | DataKey[] | null = React.useMemo(() => {
        if (selectionMode === "none") return null;
        if (selectionMode === "single") return selectedIdsArr[0] ?? null;
        return selectedIdsArr;
    }, [selectionMode, selectedIdsArr]);

    const isSelected = React.useCallback(
        (id: DataKey) => {
            if (selectionMode === "none") return false;
            return selectedIdsArr.includes(id);
        },
        [selectedIdsArr, selectionMode],
    );

    const clearSelection = React.useCallback(() => {
        if (selectionMode === "none") return;
        setSelectedIdsArr([]);
    }, [selectionMode]);

    const select = React.useCallback(
        (idOrIds: DataKey | DataKey[]) => {
            if (selectionMode === "none") return;

            const ids = normalizeIds(idOrIds).filter(isKey);
            if (!ids.length) return;

            for (const id of ids) {
                const hit = dataById.get(id);
                if (hit) selectedCacheRef.current.set(id, hit);
            }

            if (selectionMode === "single") {
                setSelectedIdsArr([ids[0]]);
                return;
            }

            setSelectedIdsArr((prev) => {
                const set = new Set<DataKey>(prev);
                for (const id of ids) set.add(id);
                return Array.from(set);
            });
        },
        [dataById, normalizeIds, selectionMode],
    );

    const deselect = React.useCallback(
        (idOrIds: DataKey | DataKey[]) => {
            if (selectionMode === "none") return;

            const ids = new Set(normalizeIds(idOrIds).filter(isKey));
            if (!ids.size) return;

            setSelectedIdsArr((prev) => {
                const next = prev.filter((x) => !ids.has(x));
                if (selectionMode === "single") return next.slice(0, 1);
                return next;
            });
        },
        [normalizeIds, selectionMode],
    );

    const toggle = React.useCallback(
        (id: DataKey) => {
            if (selectionMode === "none") return;

            const hit = dataById.get(id);
            if (hit) selectedCacheRef.current.set(id, hit);

            if (selectionMode === "single") {
                setSelectedIdsArr((prev) => (prev[0] === id ? [] : [id]));
                return;
            }

            setSelectedIdsArr((prev) => {
                const set = new Set<DataKey>(prev);
                if (set.has(id)) set.delete(id);
                else set.add(id);
                return Array.from(set);
            });
        },
        [dataById, selectionMode],
    );

    const selected = React.useMemo((): TItem | TItem[] | null => {
        if (selectionMode === "none") return null;

        if (selectionMode === "single") {
            const id = selectedIdsArr[0];
            if (id == null) return null;
            return dataById.get(id) ?? selectedCacheRef.current.get(id) ?? null;
        }

        const out: TItem[] = [];
        for (const id of selectedIdsArr) {
            const item =
                dataById.get(id) ?? selectedCacheRef.current.get(id) ?? null;
            if (item) out.push(item);
        }
        return out;
    }, [dataById, selectedIdsArr, selectionMode]);

    const getSelection = React.useCallback(() => selected, [selected]);

    React.useEffect(() => {
        if (selectionMode === "none") {
            setSelectedIdsArr([]);
            return;
        }
        if (selectionMode === "single") {
            setSelectedIdsArr((prev) => (prev.length ? [prev[0]] : []));
        }
    }, [selectionMode]);

    return {
        id: opts.id,

        data,
        visible,

        loading,
        error,

        query,
        setQuery,

        searchMode,
        setSearchMode,

        searchTarget,
        setSearchTarget,

        filters,
        setFilters,
        patchFilters,
        clearFilters,

        selectionMode,
        selectedIds,
        selected,

        select,
        deselect,
        toggle,
        clearSelection,
        isSelected,
        getSelection,

        refresh,
        fetch: fetchImpl,
    };
}
