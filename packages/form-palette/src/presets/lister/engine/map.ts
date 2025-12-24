// resources/js/context/lister/engine/map.ts

import type { ListerId, ListerMapping, ListerOption, Resolver } from '../types';
import { getPath } from '../utils/path';

export function resolveWith<TOut, TRaw, TCtx>(resolver: Resolver<TOut, TRaw, TCtx>, raw: TRaw, ctx: TCtx): TOut {
    if (typeof resolver === 'function') return resolver(raw, ctx);
    return getPath(raw, resolver) as TOut;
}

export function mapOptions<TRaw, TValue extends ListerId, TMeta, TCtx>(
    rawList: TRaw[],
    mapping: ListerMapping<TRaw, TValue, TMeta, TCtx>,
    ctx: TCtx,
): Array<ListerOption<TRaw, TValue, TMeta>> {
    const opts: Array<ListerOption<TRaw, TValue, TMeta>> = [];

    for (const raw of rawList) {
        const value = resolveWith(mapping.optionValue, raw, ctx);

        const label =
            mapping.optionLabel != null
                ? resolveWith(mapping.optionLabel, raw, ctx)
                : // default label: raw.label ?? String(value)
                  ((raw as any)?.label ?? String(value));

        const option: ListerOption<TRaw, TValue, TMeta> = {
            value,
            label,
            raw, // ✅ v0.1: always attach raw by default
        };

        if (mapping.optionIcon) option.icon = resolveWith(mapping.optionIcon, raw, ctx);
        if (mapping.optionDescription) option.description = resolveWith(mapping.optionDescription, raw, ctx);
        if (mapping.optionDisabled) option.disabled = Boolean(resolveWith(mapping.optionDisabled, raw, ctx));
        if (mapping.optionGroup) option.group = resolveWith(mapping.optionGroup, raw, ctx);
        if (mapping.optionMeta) option.meta = resolveWith(mapping.optionMeta, raw, ctx);

        opts.push(option);
    }

    return opts;
}
