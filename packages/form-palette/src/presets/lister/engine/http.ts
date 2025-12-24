// resources/js/context/lister/engine/http.ts

type HttpReq = {
    endpoint: string;
    method: "GET" | "POST";
    params?: any;
    body?: any;
    headers?: any;
};

export type ListerHttpClient = (req: HttpReq) => Promise<any>;

export function defaultHttpClient(): ListerHttpClient {
    // Prefer window.axios (your app convention), but fall back to importing axios if available.
    // This avoids throwing just because window.axios isn't wired yet.
    const w = window as any;

    // Cache the resolved client so we don't re-check on every request.
    let client: any = w?.axios ?? null;

    async function resolveAxios(): Promise<any> {
        if (client) return client;

        // 1) If window.axios appears later (e.g. after bootstrap), pick it up.
        if (w?.axios) {
            client = w.axios;
            return client;
        }

        // 2) Try to lazy-load axios (works in ESM/Vite/webpack environments where axios is installed)
        try {
            const mod: any = await import("axios");
            client = mod?.default ?? mod;
            return client;
        } catch {
            // ignore — we’ll throw below with a clear message
        }

        throw new Error(
            "Axios client not found. Ensure axios is installed and either (1) expose it as window.axios or (2) allow ESM import('axios') in this build.",
        );
    }

    return async (req) => {
        const ax = await resolveAxios();
        const method = (req.method ?? "GET").toUpperCase();

        if (method === "GET") {
            const res = await ax.get(req.endpoint, {
                params: req.params,
                headers: req.headers,
            });
            return res?.data;
        }

        const res = await ax.post(req.endpoint, req.body ?? {}, {
            params: req.params,
            headers: req.headers,
        });
        return res?.data;
    };
}
