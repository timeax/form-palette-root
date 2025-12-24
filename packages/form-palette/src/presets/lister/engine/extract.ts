// resources/js/context/lister/engine/extract.ts

import type { Selector } from "../types";
import { getPath } from "../utils/path";

function typeOf(v: any): string {
    if (v === null) return "null";
    if (Array.isArray(v)) return "array";
    return typeof v;
}

function safeKeys(v: any, limit = 25): string[] {
    if (!v || typeof v !== "object" || Array.isArray(v)) return [];
    try {
        return Object.keys(v).slice(0, limit);
    } catch {
        return [];
    }
}

function preview(v: any): any {
    const t = typeOf(v);

    if (t === "array") {
        const arr = v as any[];
        return {
            type: "array",
            length: arr.length,
            firstType: arr.length ? typeOf(arr[0]) : "empty",
        };
    }

    if (t === "object") {
        return {
            type: "object",
            keys: safeKeys(v, 15),
        };
    }

    if (t === "string") {
        const s = String(v);
        return { type: "string", length: s.length, sample: s.slice(0, 80) };
    }

    return { type: t, value: v };
}

function makeExtractError(details: Record<string, any>): Error {
    const err = new Error("EXTRACT_NOT_ARRAY");
    // keep message stable for your existing errorCode mapping,
    // but attach rich diagnostics for host logging
    (err as any).details = details;
    return err;
}

export function extractArray<TRaw>(
    body: any,
    selector?: Selector<TRaw>,
): TRaw[] {
    // ─────────────────────────────────────────────
    // Selector path (contract: MUST return array)
    // ─────────────────────────────────────────────
    if (selector) {
        const extracted =
            typeof selector === "function"
                ? selector(body)
                : getPath(body, selector);

        if (!Array.isArray(extracted)) {
            throw makeExtractError({
                stage: "selector",
                selectorType: typeof selector,
                selector: typeof selector === "string" ? selector : "[fn]",
                body: preview(body),
                extracted: preview(extracted),
                bodyKeys: safeKeys(body),
                bodyData: preview(body?.data),
                bodyDataKeys: safeKeys(body?.data),
            });
        }

        return extracted as TRaw[];
    }

    // ─────────────────────────────────────────────
    // Default extraction (robust)
    // Supports:
    // - body is already an array
    // - Axios response: body.data
    // - Payload: body.data
    // - Axios + Payload: body.data.data
    // ─────────────────────────────────────────────

    if (Array.isArray(body)) return body as TRaw[];

    if (Array.isArray(body?.data)) return body.data as TRaw[];

    if (Array.isArray(body?.data?.data)) return body.data.data as TRaw[];

    // Optional extras (uncomment if you want):
    // if (Array.isArray(body?.results)) return body.results as TRaw[];
    // if (Array.isArray(body?.data?.results)) return body.data.results as TRaw[];

    throw makeExtractError({
        stage: "default",
        tried: ["body", "body.data", "body.data.data"],
        body: preview(body),
        bodyKeys: safeKeys(body),
        bodyData: preview(body?.data),
        bodyDataKeys: safeKeys(body?.data),
        bodyDataData: preview(body?.data?.data),
        bodyDataDataKeys: safeKeys(body?.data?.data),
    });
}
