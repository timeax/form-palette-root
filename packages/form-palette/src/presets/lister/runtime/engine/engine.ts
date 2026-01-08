// packages/form-palette/src/presets/lister/runtime/engine/engine.ts

import type {
    ListerDefinition,
    ListerId,
    ListerSearchPayload,
} from "../../types";
import { defaultHttpClient, type ListerHttpClient } from "./http";
import { fetchListerList, type ListerFetchOpts } from "./fetch";

export type ListerEngine = {
    http: ListerHttpClient;

    fetch: <TRaw, TValue extends ListerId, TFilters, TMeta, TCtx>(args: {
        def: ListerDefinition<TRaw, TValue, TFilters, TMeta, TCtx>;
        filters?: TFilters;
        opts?: ListerFetchOpts<TCtx> & { search?: ListerSearchPayload };
    }) => ReturnType<
        typeof fetchListerList<TRaw, TValue, TFilters, TMeta, TCtx>
    >;
};

function fallbackId(): string {
    return `lister_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function createRequestId(): string {
    const c = (globalThis as any)?.crypto;
    if (c?.randomUUID) return `lister_${c.randomUUID()}`;
    return fallbackId();
}

export function createListerEngine(config?: {
    http?: ListerHttpClient;
}): ListerEngine {
    const http = config?.http ?? defaultHttpClient;

    return {
        http,
        fetch: async ({ def, filters, opts }) => {
            const requestId = opts?.requestId ?? createRequestId();
            return fetchListerList({
                def,
                http,
                filters,
                opts: { ...(opts ?? {}), requestId },
            });
        },
    };
}
