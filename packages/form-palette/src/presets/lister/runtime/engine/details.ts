// packages/form-palette/src/presets/lister/runtime/engine/details.ts

import type {
    ListerDetails,
    ListerId,
    ListerMode,
    ListerOption,
    ListerRawForMode,
    ListerValueForMode,
} from "../../types";

function toArray<T>(v: T | T[] | null | undefined): T[] {
    if (v == null) return [];
    return Array.isArray(v) ? v : [v];
}

/**
 * Recommended ordering: preserve selection order (draftValue order).
 */
export function buildDetails<
    TRaw,
    TValue extends ListerId,
    TMeta,
    TMode extends ListerMode,
>(args: {
    mode: TMode;
    draftValue: ListerValueForMode<TValue, TMode>;
    optionsList: Array<ListerOption<TRaw, TValue, TMeta>>;
    action: ListerDetails<TRaw, TValue, TMeta, TMode>["action"];
}): ListerDetails<TRaw, TValue, TMeta, TMode> {
    const { mode, draftValue, optionsList, action } = args;

    const byValue = new Map<TValue, ListerOption<TRaw, TValue, TMeta>>();
    for (const opt of optionsList) byValue.set(opt.value, opt);

    if (mode === "multiple") {
        const values = toArray(draftValue as TValue[]);
        const options = values
            .map((v) => byValue.get(v))
            .filter(Boolean) as Array<ListerOption<TRaw, TValue, TMeta>>;
        const raw = options.map((o) => o.raw).filter(Boolean) as TRaw[];

        return {
            action,
            options: options as any,
            raw: raw as ListerRawForMode<TRaw, TMode>,
        } as any;
    }

    // single
    const v = draftValue as TValue | null;
    const opt = v == null ? null : (byValue.get(v) ?? null);
    const raw = opt?.raw ?? null;

    return {
        action,
        options: opt as any,
        raw: raw as any,
    } as any;
}
