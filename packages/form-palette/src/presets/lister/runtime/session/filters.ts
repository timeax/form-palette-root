// packages/form-palette/src/presets/lister/runtime/session/filters.ts

import type { ListerFilterSpec } from "../../types";

/**
 * Effective filters for fetching:
 * - if spec.merge exists => spec.merge(base, patch)
 * - else => shallow merge
 */
export function computeEffectiveFilters<TFilters>(
    base: TFilters | undefined,
    patch: Partial<TFilters> | undefined,
    spec: ListerFilterSpec<TFilters> | undefined,
): TFilters | undefined {
    const p = (patch ?? {}) as any;

    if (spec?.merge) return spec.merge(base, p);

    if (base == null) return p as TFilters;

    if (typeof base === "object" && base) {
        return { ...(base as any), ...(p as any) } as TFilters;
    }

    return p as TFilters;
}
