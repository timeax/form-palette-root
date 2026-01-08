// packages/form-palette/src/presets/lister/engine/fetcher.ts

import type {
    ListerId,
    ListerOption,
    ListerSearchPayload,
} from "../types";

import { extractArray } from "./extract";
import { defaultHttpClient, type ListerHttpClient } from "./http";
import { mapOptions } from "./map";
import { AnyDef } from "@/presets/lister";

export type ListerFetchOpts = {
    query?: string;
    search?: ListerSearchPayload;
};

export type ListerFetchResult<TRaw, TValue extends ListerId, TMeta> = {
    rawList: TRaw[];
    optionsList: Array<ListerOption<TRaw, TValue, TMeta>>;

    // public api compatibility
    raw: TRaw[];
    options: Array<ListerOption<TRaw, TValue, TMeta>>;
};

export class ListerFetcher {
    public http: ListerHttpClient;

    constructor(http: ListerHttpClient = defaultHttpClient()) {
        this.http = http;
    }

    async fetch<TRaw, TValue extends ListerId, TMeta>(
        def: AnyDef,
        filters?: any,
        opts?: ListerFetchOpts,
    ): Promise<ListerFetchResult<TRaw, TValue, TMeta>> {
        const query = opts?.query ?? "";
        const search = opts?.search;

        const src = def.source;
        const method = (src.method ?? "GET") as "GET" | "POST";

        const built = src.buildRequest?.({ filters, query, cursor: null });

        const baseParams = built?.params ?? {
            ...(filters ?? {}),
            search: query,
        };

        const params = search ? { ...baseParams, ...search } : baseParams;

        const body = built?.body ?? {};
        const headers = built?.headers;

        const responseBody = await this.http({
            endpoint: src.endpoint,
            method,
            params,
            body,
            headers,
        });

        const rawList = extractArray<TRaw>(responseBody, def.selector);
        const ctx = { query, filters };

        const optionsList = mapOptions<TRaw, TValue, TMeta, any>(
            rawList,
            def.mapping as any,
            ctx,
        );

        return {
            rawList,
            optionsList,
            raw: rawList,
            options: optionsList,
        };
    }
}
