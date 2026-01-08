// packages/form-palette/src/presets/lister/runtime/engine/fetch.ts

import type {
    ListerDefinition,
    ListerId,
    ListerOption,
    ListerSearchPayload,
} from "../../types";

import { extractArray } from "./extract";
import { mapOptions } from "./map";
import type { HttpReq, ListerHttpClient } from "./http";

export type ListerFetchOpts<TCtx = any> = {
    query?: string;
    search?: ListerSearchPayload;
    cursor?: string | null;

    /** request control */
    signal?: AbortSignal;
    requestId?: string;

    /** mapping context override */
    ctx?: TCtx;
};

export async function fetchListerList<
    TRaw,
    TValue extends ListerId,
    TFilters,
    TMeta,
    TCtx,
>(args: {
    def: ListerDefinition<TRaw, TValue, TFilters, TMeta, TCtx>;
    http: ListerHttpClient;
    filters?: TFilters;
    opts?: ListerFetchOpts<TCtx>;
}): Promise<{
    rawList: TRaw[];
    optionsList: Array<ListerOption<TRaw, TValue, TMeta>>;
    responseBody: any;
    requestId?: string;
}> {
    const { def, http, filters } = args;
    const opts = args.opts ?? {};

    const query = opts.query ?? "";
    const search = opts.search;

    const src = def.source;
    const method = (src.method ?? "GET") as "GET" | "POST";

    const built = src.buildRequest?.({
        filters,
        query,
        cursor: opts.cursor ?? null,
    });

    // ⚠️ Compatibility: default query param key is `search`
    const baseParams = built?.params ?? {
        ...(filters ?? ({} as any)),
        search: query,
    };

    const params = search ? { ...baseParams, ...search } : baseParams;

    const req: HttpReq = {
        endpoint: src.endpoint,
        method,
        params,
        body: built?.body ?? {},
        headers: built?.headers,
        signal: opts.signal,
        requestId: opts.requestId,
    };

    const responseBody = await http(req);

    const rawList = extractArray<TRaw>(responseBody, def.selector);

    const ctx = (opts.ctx ?? ({ query, filters } as any)) as TCtx;

    const optionsList = mapOptions<TRaw, TValue, TMeta, TCtx>(
        rawList,
        def.mapping,
        ctx,
    );

    return { rawList, optionsList, responseBody, requestId: opts.requestId };
}
