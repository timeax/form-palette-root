// src/presets/shadcn-variants/lister/inline-def.ts

/* ─────────────────────────────────────────────────────────────
 * Inline def builders
 * ───────────────────────────────────────────────────────────── */

import type {
    ListerDefinition,
    ListerId,
    ListerMapping,
    ListerSource,
    Selector,
} from "@/presets/lister/types";
import type { KeyOrFn } from "@/presets/shadcn-variants/lister/types";
import { pick } from "@/presets/shadcn-variants/lister/utils";

/**
 * Full inline def (standalone).
 * NOTE: mapping keys MUST match what mapOptions() reads.
 */
export function makeInlineDef<
    TRaw extends Record<string, any>,
    TValue extends ListerId,
    TFilters,
    TMeta,
    TCtx = any,
>(args: {
    endpoint: string;
    method?: "GET" | "POST";
    buildRequest?: ListerSource<TFilters>["buildRequest"];
    selector?: Selector<TRaw>;

    optionValue: KeyOrFn<TRaw, TValue, TCtx>;
    optionLabel?: KeyOrFn<TRaw, any, TCtx>;
    optionIcon?: KeyOrFn<TRaw, any, TCtx>;
    optionDescription?: KeyOrFn<TRaw, any, TCtx>;
    optionDisabled?: KeyOrFn<TRaw, boolean, TCtx>;
    optionGroup?: KeyOrFn<TRaw, string, TCtx>;
    optionMeta?: KeyOrFn<TRaw, TMeta, TCtx>;
}): ListerDefinition<TRaw, TValue, TFilters, TMeta, TCtx> {
    const mapping = {
        optionValue: (raw: TRaw, ctx: TCtx) =>
            pick(raw as any, args.optionValue as any, ctx)!,

        optionLabel: args.optionLabel
            ? (raw: TRaw, ctx: TCtx) =>
                  pick(raw as any, args.optionLabel as any, ctx)
            : undefined,

        optionIcon: args.optionIcon
            ? (raw: TRaw, ctx: TCtx) =>
                  pick(raw as any, args.optionIcon as any, ctx)
            : undefined,

        optionDescription: args.optionDescription
            ? (raw: TRaw, ctx: TCtx) =>
                  pick(raw as any, args.optionDescription as any, ctx)
            : undefined,

        optionDisabled: args.optionDisabled
            ? (raw: TRaw, ctx: TCtx) =>
                  !!pick(raw as any, args.optionDisabled as any, ctx)
            : undefined,

        optionGroup: (args.optionGroup
            ? (raw: TRaw, ctx: TCtx) =>
                  pick(raw as any, args.optionGroup as any, ctx)
            : undefined) as any,

        optionMeta: args.optionMeta
            ? (raw: TRaw, ctx: TCtx) =>
                  pick(raw as any, args.optionMeta as any, ctx)
            : undefined,
    } satisfies ListerMapping<any, any, any, any>;

    return {
        id: args.endpoint,
        source: {
            endpoint: args.endpoint,
            // IMPORTANT: do not invent defaults here (method is optional upstream)
            method: args.method,
            buildRequest: args.buildRequest,
        },
        selector: args.selector,
        mapping,
    } as any;
}

/**
 * Inline override "patch" to merge into an existing def.
 *
 * IMPORTANT (your rule):
 * - this can be created even if some fields are undefined
 * - merge logic will ignore undefined keys at the leaf level
 * - mapping is always present (even empty) so it can merge
 *
 * NOTE:
 * - No invented defaults (method stays undefined unless provided).
 * - endpoint is optional, so you can patch JUST mapping/selector.
 */
export function makeInlinePatch<
    TRaw extends Record<string, any>,
    TValue extends ListerId,
    TFilters,
    TMeta,
    TCtx = any,
>(args: {
    endpoint?: string;
    method?: "GET" | "POST";
    buildRequest?: ListerSource<TFilters>["buildRequest"];
    selector?: Selector<TRaw>;

    optionValue?: KeyOrFn<TRaw, TValue, TCtx>;
    optionLabel?: KeyOrFn<TRaw, any, TCtx>;
    optionIcon?: KeyOrFn<TRaw, any, TCtx>;
    optionDescription?: KeyOrFn<TRaw, any, TCtx>;
    optionDisabled?: KeyOrFn<TRaw, boolean, TCtx>;
    optionGroup?: KeyOrFn<TRaw, string, TCtx>;
    optionMeta?: KeyOrFn<TRaw, TMeta, TCtx>;
}): any {
    const mapping: any = {};

    if (args.optionValue)
        mapping.optionValue = (raw: TRaw, ctx: TCtx) =>
            pick(raw as any, args.optionValue as any, ctx)!;

    if (args.optionLabel)
        mapping.optionLabel = (raw: TRaw, ctx: TCtx) =>
            pick(raw as any, args.optionLabel as any, ctx);

    if (args.optionIcon)
        mapping.optionIcon = (raw: TRaw, ctx: TCtx) =>
            pick(raw as any, args.optionIcon as any, ctx);

    if (args.optionDescription)
        mapping.optionDescription = (raw: TRaw, ctx: TCtx) =>
            pick(raw as any, args.optionDescription as any, ctx);

    if (args.optionDisabled)
        mapping.optionDisabled = (raw: TRaw, ctx: TCtx) =>
            !!pick(raw as any, args.optionDisabled as any, ctx);

    if (args.optionGroup)
        mapping.optionGroup = (raw: TRaw, ctx: TCtx) =>
            pick(raw as any, args.optionGroup as any, ctx);

    if (args.optionMeta)
        mapping.optionMeta = (raw: TRaw, ctx: TCtx) =>
            pick(raw as any, args.optionMeta as any, ctx);

    return {
        id: args.endpoint,
        source: args.endpoint
            ? {
                  endpoint: args.endpoint,
                  // IMPORTANT: do not invent defaults
                  method: args.method,
                  buildRequest: args.buildRequest,
              }
            : undefined,
        selector: args.selector,
        // keep present even if empty (so deep merge can merge into base.mapping)
        mapping,
    };
}

/* ─────────────────────────────────────────────────────────────
 * Deep merge (def + inline)
 * ───────────────────────────────────────────────────────────── */

type AnyObj = Record<string, any>;

function isPlainObject(x: any): x is AnyObj {
    if (x == null || typeof x !== "object") return false;
    const proto = Object.getPrototypeOf(x);
    return proto === Object.prototype || proto === null;
}

/**
 * Deep merge:
 * - merges plain objects
 * - arrays are replaced
 * - undefined does not override
 */
function deepMergeDefined<T>(base: T, patch: any): T {
    if (patch === undefined) return base;

    if (!isPlainObject(base) || !isPlainObject(patch)) {
        if (Array.isArray(patch)) return patch as any;
        return patch as any;
    }

    const out: AnyObj = { ...(base as any) };

    for (const key of Object.keys(patch)) {
        const pv = patch[key];
        if (pv === undefined) continue;

        const bv = (base as any)[key];

        if (Array.isArray(pv)) {
            out[key] = pv;
            continue;
        }

        if (isPlainObject(bv) && isPlainObject(pv)) {
            out[key] = deepMergeDefined(bv, pv);
            continue;
        }

        out[key] = pv;
    }

    return out as T;
}

/**
 * Merge rule:
 * - if both are non-null/undefined, merge
 * - empty object still counts as "exists" and will merge
 */
export function mergeListerDef<
    TRaw,
    TValue extends ListerId,
    TFilters,
    TMeta,
    TCtx = any,
>(
    baseDef: ListerDefinition<TRaw, TValue, TFilters, TMeta, TCtx> | undefined,
    inlineDef: any | undefined,
): ListerDefinition<TRaw, TValue, TFilters, TMeta, TCtx> | undefined {
    if (baseDef == null) return inlineDef as any;
    if (inlineDef == null) return baseDef;
    return deepMergeDefined(baseDef, inlineDef);
}
