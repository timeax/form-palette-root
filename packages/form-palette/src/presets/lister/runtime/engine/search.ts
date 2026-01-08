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
 * Backwards-compatible “label contains” helper.
 */
export function filterOptionsLocal<TRaw, TValue extends ListerId, TMeta>(
    options: Array<ListerOption<TRaw, TValue, TMeta>>,
    query: string,
): Array<ListerOption<TRaw, TValue, TMeta>> {
    const q = (query ?? "").trim().toLowerCase();
    if (!q) return options;

    return options.filter((o) => {
        const l = o.label;
        const txt =
            typeof l === "string"
                ? l
                : typeof l === "number"
                  ? String(l)
                  : typeof (o.raw as any)?.label === "string"
                    ? (o.raw as any).label
                    : String(o.value);

        return txt.toLowerCase().includes(q);
    });
}
