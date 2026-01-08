// packages/form-palette/src/presets/lister/runtime/engine/map.ts

import type {
    ListerId,
    ListerMapping,
    ListerOption,
    Resolver,
} from "../../types";

export function resolveWith<TRaw, T, TCtx>(
    raw: TRaw,
    resolver: Resolver<TRaw, T, TCtx>,
    ctx: TCtx,
): T {
    if (typeof resolver === "function") return (resolver as any)(raw, ctx);
    return (raw as any)?.[resolver as any] as T;
}

/**
 * Maps raw list to options list using mapping rules.
 *
 * Fallbacks:
 * - label: raw.label ?? String(value)
 * - disabled: false
 */
export function mapOptions<TRaw, TValue extends ListerId, TMeta, TCtx>(
    rawList: TRaw[],
    mapping: ListerMapping<TRaw, TValue, TMeta, TCtx>,
    ctx: TCtx,
): Array<ListerOption<TRaw, TValue, TMeta>> {
    const out: Array<ListerOption<TRaw, TValue, TMeta>> = [];

    for (const raw of rawList ?? []) {
        let value: any = resolveWith(raw, mapping.optionValue as any, ctx);

        // tolerate odd values (legacy didn’t throw). Prefer stable IDs.
        if (value === undefined || value === null) continue;
        if (typeof value !== "string" && typeof value !== "number") {
            value = String(value);
        }

        const label =
            mapping.optionLabel != null
                ? resolveWith(raw, mapping.optionLabel as any, ctx)
                : ((raw as any)?.label ?? String(value));

        const meta = mapping.optionMeta
            ? resolveWith(raw, mapping.optionMeta as any, ctx)
            : undefined;

        const disabled = mapping.optionDisabled
            ? !!resolveWith(raw, mapping.optionDisabled as any, ctx)
            : false;
        const icon = mapping.optionIcon
            ? resolveWith(raw, mapping.optionIcon as any, ctx)
            : null;

        out.push({
            value,
            label: label as any,
            raw,
            meta: meta as any,
            disabled,
            icon,
        });
    }

    return out;
}
