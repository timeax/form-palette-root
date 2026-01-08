import * as React from "react";

import type {
    ListerDefinition,
    ListerProviderHost,
    ListerSearchPayload,
    ListerPermissionCtx,
} from "@/presets/lister/types";
import type { ListerHttpClient } from "@/presets/lister/engine/http";

import { extractArray } from "@/presets/lister/engine/extract";
import { mapOptions } from "@/presets/lister/engine/map";
import { evaluatePermissions } from "@/presets/lister/utils/permissions";

export type AnyDef = ListerDefinition<any, any, any, any, any>;

export type FetchStartMode = "eager" | "on-exec";

export type FetchRunOpts<T> = {
    key: string;
    signature: string;
    debounceMs?: number;
    force?: boolean;

    /** Default: "eager" (matches old useData behavior). */
    startMode?: FetchStartMode;

    task: () => Promise<T>;

    onStart?: () => void;
    onSuccess?: (res: T) => void;
    onError?: (err: any) => void;
};

export type FetchDefOpts = {
    query?: string;
    cursor?: any;
    search?: ListerSearchPayload;
    permissions?: string[];
    sessionId?: string;
};

export interface ListerFetcher {
    signature(input: unknown): string;

    run<T>(opts: FetchRunOpts<T>): Promise<T | undefined>;
    cancel(key: string): void;
    reset(key: string): void;

    fetchDef(
        def: AnyDef,
        filters?: any,
        opts?: FetchDefOpts,
    ): Promise<{
        rawList: any[];
        optionsList: any[];
    }>;

    checkPermissions(
        kindOrDef: string | AnyDef,
        def: AnyDef,
        filters: any,
        permissions?: string[],
        sessionId?: string,
    ): void;

    apiFetchAny(
        kindOrDef: string | AnyDef,
        filters?: any,
        opts?: FetchDefOpts,
    ): Promise<{ rawList: any[]; optionsList: any[] }>;
}

type FetcherState = {
    reqId: number;
    signature: string;

    timer: any | null;
    pendingResolve: ((v: any) => void) | null;

    inFlight: Promise<any> | null;
    lastValue: any;
};

function stableStringify(value: any): string {
    const seen = new WeakSet<object>();

    const normalize = (v: any): any => {
        if (v == null) return v;

        const t = typeof v;

        if (t === "bigint") return v.toString();
        if (t === "function") return "[Function]";
        if (t === "undefined") return "[Undefined]";
        if (t !== "object") return v;

        if (v instanceof Date) return v.toISOString();
        if (Array.isArray(v)) return v.map(normalize);

        if (seen.has(v)) return "[Circular]";
        seen.add(v);

        const out: Record<string, any> = {};
        for (const k of Object.keys(v).sort()) out[k] = normalize(v[k]);
        return out;
    };

    try {
        return JSON.stringify(normalize(value));
    } catch {
        try {
            return String(value);
        } catch {
            return "[Unstringifiable]";
        }
    }
}

function getMethod(def: AnyDef): "GET" | "POST" {
    return (def.source.method ?? "GET") as "GET" | "POST";
}

export function useFetcher(args: {
    host?: ListerProviderHost;
    http: ListerHttpClient;
    getPreset?: (kind: string) => AnyDef | undefined;
}): ListerFetcher {
    const { host, http, getPreset } = args;

    const stateRef = React.useRef<Record<string, FetcherState>>({});

    const signature = React.useCallback((input: unknown) => {
        return stableStringify(input);
    }, []);

    const cancel = React.useCallback((key: string) => {
        const s = stateRef.current[key];
        if (!s) return;

        if (s.timer) {
            clearTimeout(s.timer);
            s.timer = null;
        }

        // resolve any pending debounced promise so callers don't hang
        if (s.pendingResolve) {
            s.pendingResolve(undefined);
            s.pendingResolve = null;
        }

        // drop inFlight + cached value for this key (request is effectively cancelled)
        s.inFlight = null;

        // bump reqId so any in-flight response becomes stale
        s.reqId++;
    }, []);

    const reset = React.useCallback(
        (key: string) => {
            cancel(key);
            delete stateRef.current[key];
        },
        [cancel],
    );

    // cleanup: ensure no pending timers/promises survive unmount
    React.useEffect(() => {
        return () => {
            for (const key of Object.keys(stateRef.current)) cancel(key);
        };
    }, [cancel]);

    const run = React.useCallback(
        async <T>(opts: FetchRunOpts<T>): Promise<T | undefined> => {
            const {
                key,
                signature: sig,
                debounceMs = 0,
                force = false,
                startMode = "eager",
                task,
                onStart,
                onSuccess,
                onError,
            } = opts;

            const s = (stateRef.current[key] ??= {
                reqId: 0,
                signature: "",
                timer: null,
                pendingResolve: null,
                inFlight: null,
                lastValue: undefined,
            });

            // If signature is unchanged and not forced:
            // - return in-flight promise (dedupe)
            // - otherwise return last cached value
            if (!force && s.signature === sig) {
                if (s.inFlight) return await s.inFlight;
                return s.lastValue as T | undefined;
            }

            // signature changed (or forced) => cancel any pending debounce
            if (s.timer) {
                clearTimeout(s.timer);
                s.timer = null;
                if (s.pendingResolve) {
                    s.pendingResolve(undefined);
                    s.pendingResolve = null;
                }
            }

            s.signature = sig;
            const myReq = ++s.reqId;

            const exec = async (): Promise<T | undefined> => {
                try {
                    if (startMode === "on-exec") onStart?.();

                    const p = task();
                    s.inFlight = p;

                    const res = await p;

                    // stale response check
                    if (stateRef.current[key]?.reqId !== myReq)
                        return undefined;

                    s.lastValue = res;
                    onSuccess?.(res);
                    return res;
                } catch (err) {
                    if (stateRef.current[key]?.reqId !== myReq)
                        return undefined;
                    onError?.(err);
                    return undefined;
                } finally {
                    // only clear inFlight if we’re still the active request
                    if (stateRef.current[key]?.reqId === myReq) {
                        s.inFlight = null;
                    }
                }
            };

            if (debounceMs > 0) {
                if (startMode === "eager") onStart?.();

                const p = new Promise<T | undefined>((resolve) => {
                    s.pendingResolve = resolve;
                    s.timer = setTimeout(() => {
                        s.timer = null;
                        s.pendingResolve = null;
                        exec().then(resolve);
                    }, debounceMs);
                });

                s.inFlight = p;
                return await p;
            }

            if (startMode === "eager") onStart?.();
            return await exec();
        },
        [],
    );

    const checkPermissions = React.useCallback(
        (
            kindOrDef: string | AnyDef,
            def: AnyDef,
            filters: any,
            permissions?: string[],
            sessionId?: string,
        ) => {
            if (!host) return;

            const pctx: ListerPermissionCtx = {
                kind: typeof kindOrDef === "string" ? kindOrDef : def.id,
                endpoint: def.source.endpoint,
                filters,
                sessionId,
            };

            if (!evaluatePermissions(host, permissions, pctx)) {
                host.log({
                    level: "warning",
                    code: "lister.access_denied",
                    message: "Access denied.",
                    details: { permissions, pctx },
                });

                throw new Error("lister.access_denied");
            }
        },
        [host],
    );

    const fetchDef = React.useCallback(
        async (def: AnyDef, filters?: any, opts?: FetchDefOpts) => {
            // mirrors your provider.performFetch shape 5
            checkPermissions(
                def.id ?? def.source.endpoint,
                def,
                filters,
                opts?.permissions,
                opts?.sessionId,
            );

            const query = opts?.query ?? "";
            const search = opts?.search;

            const src = def.source;

            const built = src.buildRequest?.({
                filters,
                query,
                cursor: opts?.cursor ?? null,
            });

            const baseParams = built?.params ?? {
                ...(filters ?? {}),
                search: query,
                cursor: opts?.cursor ?? null,
            };

            const params = search ? { ...baseParams, ...search } : baseParams;

            const req = {
                method: getMethod(def),
                endpoint: src.endpoint,
                params,
                body: built?.body ?? {},
                headers: built?.headers,
            };

            let responseBody: any;
            try {
                responseBody = await http(req);
            } catch (err: any) {
                host?.log?.({
                    level: "error",
                    code: "lister.fetch_failed",
                    message: "Lister fetch failed.",
                    details: { endpoint: src.endpoint },
                });
                throw err;
            }

            let rawList: any[];
            try {
                rawList = extractArray<any>(responseBody, def.selector);
            } catch (err: any) {
                // extractArray throws Error("EXTRACT_NOT_ARRAY") 6
                host?.log?.({
                    level: "error",
                    code: "lister.extract_not_array",
                    message: "Lister selector did not resolve to an array.",
                    details: {
                        endpoint: src.endpoint,
                        selector: def.selector ?? "body.data",
                        extractDetails: err?.details,
                    },
                });
                throw err;
            }

            try {
                const ctx = { query, filters };
                const optionsList = mapOptions<any, any, any, any>(
                    rawList,
                    def.mapping as any,
                    ctx,
                );

                return { rawList, optionsList };
            } catch (err: any) {
                host?.log?.({
                    level: "error",
                    code: "lister.mapping_failed",
                    message: "Lister mapping failed.",
                    details: { endpoint: src.endpoint },
                });
                throw err;
            }
        },
        [http, host, checkPermissions],
    );

    const apiFetchAny = React.useCallback(
        async (
            kindOrDef: string | AnyDef,
            filters?: any,
            opts?: FetchDefOpts,
        ) => {
            const def =
                typeof kindOrDef === "string"
                    ? getPreset?.(kindOrDef)
                    : kindOrDef;

            if (!def) {
                host?.log?.({
                    level: "error",
                    code: "lister.unknown_error",
                    message: "Unknown lister preset.",
                    details: { kind: kindOrDef },
                });

                throw new Error(`Unknown lister preset: ${kindOrDef}`);
            }

            return await fetchDef(def, filters, opts);
        },
        [fetchDef, getPreset, host],
    );

    return React.useMemo(
        () => ({
            signature,
            run,
            cancel,
            reset,
            fetchDef,
            checkPermissions,
            apiFetchAny,
        }),
        [
            signature,
            run,
            cancel,
            reset,
            fetchDef,
            checkPermissions,
            apiFetchAny,
        ],
    );
}
