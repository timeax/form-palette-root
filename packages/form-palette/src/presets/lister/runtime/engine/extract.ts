// packages/form-palette/src/presets/lister/runtime/engine/extract.ts

import type { Selector } from "../../types";
import { getPath } from "../../utils/path";

type ExtractMeta = {
    selector?: unknown;
    valueType?: string;
};

function makeExtractError(meta: ExtractMeta) {
    const err = new Error("EXTRACT_NOT_ARRAY");
    (err as any).meta = meta;
    return err;
}

/**
 * Extracts an array from an HTTP response body.
 *
 * Rules:
 * - selector fn: selector(body)
 * - selector string: getPath(body, selector)
 * - selector missing: prefers body.data, else body
 * - MUST return array, else throws Error("EXTRACT_NOT_ARRAY")
 */
export function extractArray<T>(body: any, selector?: Selector<T>): T[] {
    let out: any;

    if (typeof selector === "function") {
        out = selector(body);
    } else if (typeof selector === "string" && selector.trim() !== "") {
        out = getPath(body, selector);
    } else {
        // default selector: body.data if present, else body
        out = body?.data ?? body;
    }

    if (!Array.isArray(out)) {
        throw makeExtractError({
            selector,
            valueType: out === null ? "null" : typeof out,
        });
    }

    return out as T[];
}
