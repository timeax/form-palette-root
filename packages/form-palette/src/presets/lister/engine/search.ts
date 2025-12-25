// resources/js/context/lister/engine/search.ts

import type { ListerId, ListerOption, ListerSearchPayload } from "../types";

type AnyObj = Record<string, any>;

function optionText<TRaw, TValue extends ListerId, TMeta>(
    o: ListerOption<TRaw, TValue, TMeta>,
): string {
    const l = o.label;
    if (typeof l === "string") return l;
    if (typeof l === "number") return String(l);

    const rl = (o.raw as any)?.label;
    if (typeof rl === "string") return rl;

    return String(o.value);
}

function getPath(obj: any, path: string): any {
    if (!obj || !path) return undefined;
    if (!path.includes(".")) return (obj as any)[path];

    let cur = obj;
    for (const part of path.split(".")) {
        if (cur == null) return undefined;
        cur = cur[part];
    }
    return cur;
}

function toText(v: any): string {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    return "";
}

function collectAllText(
    obj: any,
    out: string[],
    depth = 2,
    budget = { n: 80 },
) {
    if (obj == null || budget.n <= 0) return;

    const t = typeof obj;

    if (t === "string" || t === "number" || t === "boolean") {
        out.push(String(obj));
        budget.n -= 1;
        return;
    }

    if (depth <= 0) return;

    if (Array.isArray(obj)) {
        for (const x of obj) collectAllText(x, out, depth - 1, budget);
        return;
    }

    if (t === "object") {
        for (const k of Object.keys(obj)) {
            collectAllText(obj[k], out, depth - 1, budget);
            if (budget.n <= 0) break;
        }
    }
}

function matchQueryInText(q: string, text: string): boolean {
    if (!q) return true;
    return text.toLowerCase().includes(q);
}

// inside resources/js/context/lister/engine/search.ts

function buildSearchTextForKeys(
    raw: any,
    keys: Array<string | number>,
): string {
    const parts: string[] = [];

    for (const k of keys) {
        const key = String(k); // ✅ supports number ids
        const v = getPath(raw, key);
        if (v == null) continue;

        if (Array.isArray(v)) {
            for (const x of v) {
                const s = toText(x);
                if (s) parts.push(s);
            }
            continue;
        }

        const s = toText(v);
        if (s) parts.push(s);
    }

    return parts.join(" ");
}

function matchesSearch(
    raw: any,
    q: string,
    search?: ListerSearchPayload,
): boolean {
    if (!q) return true;

    if (search?.searchAll) {
        return matchQueryInText(q, buildSearchTextAll(raw));
    }

    if (Array.isArray(search?.searchOnly) && search.searchOnly.length) {
        return matchQueryInText(
            q,
            buildSearchTextForKeys(raw, search.searchOnly),
        );
    }

    if (typeof search?.subject === "string" && search.subject) {
        return matchQueryInText(
            q,
            buildSearchTextForKeys(raw, [search.subject]),
        );
    }

    return matchQueryInText(q, buildSearchTextAll(raw));
}

function buildSearchTextAll(raw: any): string {
    const parts: string[] = [];
    collectAllText(raw, parts, 2);
    return parts.join(" ");
}

function isEmptyFilterValue(v: any): boolean {
    if (v === undefined || v === null) return true;
    if (typeof v === "string" && v.trim() === "") return true;
    return Array.isArray(v) && v.length === 0;
}

function matchesFilters(raw: AnyObj, filters?: AnyObj): boolean {
    if (!filters) return true;

    for (const key of Object.keys(filters)) {
        // ignore reserved-ish keys if they appear
        if (
            key === "search" ||
            key === "subject" ||
            key === "searchAll" ||
            key === "searchOnly"
        ) {
            continue;
        }

        const fv = filters[key];
        if (isEmptyFilterValue(fv)) continue;

        const rv = getPath(raw, key);

        // array filter => "any-of"
        if (Array.isArray(fv)) {
            if (Array.isArray(rv)) {
                const ok = rv.some((x) => fv.includes(x));
                if (!ok) return false;
            } else {
                if (!fv.includes(rv)) return false;
            }
            continue;
        }

        // scalar filter
        if (Array.isArray(rv)) {
            if (!rv.includes(fv)) return false;
            continue;
        }

        // basic equality (stringified)
        if (String(rv) !== String(fv)) return false;
    }

    return true;
}

/**
 * Local equivalent of remote filtering:
 * - filters (effective filters)
 * - + search payload (subject/all/only)
 *
 * You can override everything by providing:
 * - (filtersSpec as any).local(rawList, ctx) => rawList
 * - (searchSpec as any).local(rawList, ctx) => rawList
 */
export function filterRawListLocal<TRaw>(
    rawList: TRaw[],
    query: string,
    search?: ListerSearchPayload,
    filters?: any,
    opts?: { searchSpec?: any; filtersSpec?: any },
): TRaw[] {
    let list = Array.isArray(rawList) ? rawList : [];

    const ctx = { query, search, filters };

    const filtersLocal = opts?.filtersSpec && (opts.filtersSpec as any).local;
    if (typeof filtersLocal === "function") {
        const out = filtersLocal(list, ctx);
        if (Array.isArray(out)) list = out;
    } else {
        list = list.filter((r: any) =>
            matchesFilters(r as any, filters as any),
        );
    }

    const q = (query ?? "").trim().toLowerCase();
    if (!q) return list;

    const searchLocal = opts?.searchSpec && (opts.searchSpec as any).local;
    if (typeof searchLocal === "function") {
        const out = searchLocal(list, ctx);
        if (Array.isArray(out)) return out;
    }

    return list.filter((r: any) => matchesSearch(r, q, search));
}

/**
 * Backwards-compatible (kept), still useful for quick “label contains”
 * in places where you DON'T have rawList + payload.
 */
export function filterOptionsLocal<TRaw, TValue extends ListerId, TMeta>(
    options: Array<ListerOption<TRaw, TValue, TMeta>>,
    query: string,
): Array<ListerOption<TRaw, TValue, TMeta>> {
    const q = (query ?? "").trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => optionText(o).toLowerCase().includes(q));
}
