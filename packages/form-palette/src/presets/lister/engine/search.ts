// resources/js/context/lister/engine/search.ts

import type { ListerId, ListerOption } from '../types';

function optionText<TRaw, TValue extends ListerId, TMeta>(o: ListerOption<TRaw, TValue, TMeta>): string {
    const l = o.label;
    if (typeof l === 'string') return l;
    if (typeof l === 'number') return String(l);

    // fallback: raw.label or value
    const rl = (o.raw as any)?.label;
    if (typeof rl === 'string') return rl;

    return String(o.value);
}

export function filterOptionsLocal<TRaw, TValue extends ListerId, TMeta>(
    options: Array<ListerOption<TRaw, TValue, TMeta>>,
    query: string,
): Array<ListerOption<TRaw, TValue, TMeta>> {
    const q = (query ?? '').trim().toLowerCase();
    if (!q) return options;

    return options.filter((o) => optionText(o).toLowerCase().includes(q));
}
