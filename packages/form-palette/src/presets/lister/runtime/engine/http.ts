// packages/form-palette/src/presets/lister/runtime/engine/http.ts

export type HttpMethod = "GET" | "POST";

export type HttpReq = {
    endpoint: string;
    method?: HttpMethod;
    params?: any;
    body?: any;
    headers?: Record<string, string>;
    signal?: AbortSignal;
    requestId?: string;
};

export type ListerHttpClient = (req: HttpReq) => Promise<any>;

function getAxios(): any {
    const w = globalThis as any;
    return w?.axios ?? w?.window?.axios ?? null;
}

/**
 * Default client:
 * - prefers global `axios` (host apps commonly provide it)
 * - falls back to dynamic import if not present
 */
export const defaultHttpClient: ListerHttpClient = async (req) => {
    const axios0 = getAxios();
    const axios =
        axios0 ??
        (await import("axios")
            .then((m) => (m as any).default ?? m)
            .catch(() => null));

    if (!axios) {
        throw new Error("HTTP_CLIENT_MISSING");
    }

    const method = (req.method ?? "GET") as HttpMethod;

    const headers: Record<string, string> = {
        ...(req.headers ?? {}),
    };

    if (req.requestId) headers["X-Lister-Request-Id"] = req.requestId;

    const res = await axios.request({
        url: req.endpoint,
        method,
        params: req.params,
        data: req.body,
        headers,
        // axios (modern) supports AbortSignal
        signal: req.signal,
    });

    return res?.data ?? res;
};
