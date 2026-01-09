// packages/form-palette/src/presets/lister/runtime/engine/search.ts

import type {
    ListerId,
    ListerOption,
    ListerSearchPayload,
    ListerSearchTarget,
} from "../../types";

export function buildSearchPayloadFromTarget(
    target?: ListerSearchTarget | null,
): ListerSearchPayload | undefined {
    if (!target) return undefined;

    if (target.mode === "all") return { searchAll: true };

    if (target.mode === "subject") {
        const subject = (target.subject ?? "").trim();
        return subject ? { subject } : undefined;
    }

    if (target.mode === "only") {
        const only = Array.isArray(target.only)
            ? target.only.filter((x) => x != null)
            : [];
        return only.length ? { searchOnly: only } : undefined;
    }

    return undefined;
}

/**
 * Backwards-compatible local filtering helper.
 *
 * - If `search` is omitted: behaves exactly like before (label contains).
 * - If `search.subject`: matches query against raw[subject].
 * - If `search.searchOnly`: matches query against any raw[key] in that list.
 * - If `search.searchAll`: matches query against any primitive-ish raw field.
 */
export function filterOptionsLocal<TRaw, TValue extends ListerId, TMeta>(
    options: Array<ListerOption<TRaw, TValue, TMeta>>,
    query: string,
    search?: ListerSearchPayload,
): Array<ListerOption<TRaw, TValue, TMeta>> {
    const q = (query ?? "").trim().toLowerCase();
    if (!q) return options;

    const toText = (v: any): string => {
        if (v == null) return "";
        if (typeof v === "string") return v;
        if (typeof v === "number") return String(v);
        if (typeof v === "boolean") return v ? "true" : "false";
        if (Array.isArray(v)) return v.map(toText).filter(Boolean).join(" ");
        return "";
    };

    const labelText = (o: ListerOption<TRaw, TValue, TMeta>): string => {
        const l = o.label;
        if (typeof l === "string") return l;
        if (typeof l === "number") return String(l);
        if (typeof (o.raw as any)?.label === "string") return (o.raw as any).label;
        return String(o.value);
    };

    const rawFieldText = (o: ListerOption<TRaw, TValue, TMeta>, key: string|number): string => {
        const raw = o.raw as any;
        if (!raw || typeof raw !== "object") return "";
        return toText(raw[key]);
    };

    const rawAllText = (o: ListerOption<TRaw, TValue, TMeta>): string => {
        const raw = o.raw as any;
        if (!raw || typeof raw !== "object") return "";
        const out: string[] = [];
        for (const k of Object.keys(raw)) {
            const t = toText(raw[k]);
            if (t) out.push(t);
        }
        return out.join(" ");
    };

    return options.filter((o) => {
        // default legacy behavior
        if (!search || (!search.subject && !search.searchOnly && !search.searchAll)) {
            return labelText(o).toLowerCase().includes(q);
        }

        if (search.subject) {
            const txt = rawFieldText(o, search.subject);
            return txt.toLowerCase().includes(q);
        }

        if (Array.isArray(search.searchOnly) && search.searchOnly.length) {
            for (const key of search.searchOnly) {
                const txt = rawFieldText(o, key);
                if (txt && txt.toLowerCase().includes(q)) return true;
            }
            return false;
        }

        // searchAll = scan raw primitives, fallback to label too
        if (search.searchAll) {
            const txt = rawAllText(o);
            if (txt && txt.toLowerCase().includes(q)) return true;
            return labelText(o).toLowerCase().includes(q);
        }

        return labelText(o).toLowerCase().includes(q);
    });
}