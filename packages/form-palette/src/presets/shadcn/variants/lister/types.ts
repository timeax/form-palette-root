// resources/js/presets/shadcn-variants/lister/types.ts
import type * as React from "react";

import type {
    ListerDefinition,
    ListerFilterSpec,
    ListerId,
    ListerMode,
    ListerOpenOptions,
    ListerProviderHost,
    ListerSearchTarget,
    ListerSource,
    ListerValueForMode,
    PresetMap,
    Selector,
} from "@/presets/lister/types";

/* ─────────────────────────────────────────────────────────────
 * Base props
 * ───────────────────────────────────────────────────────────── */

export type ListerFieldBaseProps<TValue> = {
    value?: TValue;
    onValue?: (next: TValue, detail?: any) => void;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
};

/**
 * Key or function mapping.
 * IMPORTANT: ctx-aware because your engine mapping functions receive (raw, ctx).
 */
export type KeyOrFn<TRaw, TOut, TCtx = any> =
    | (keyof TRaw & string)
    | ((raw: TRaw, ctx: TCtx) => TOut);

export type ListerInlineSource<TFilters = any> = Pick<
    ListerSource<TFilters>,
    "endpoint" | "method" | "buildRequest"
>;

/* ─────────────────────────────────────────────────────────────
 * Trigger customization (mirrors inner.tsx)
 * ───────────────────────────────────────────────────────────── */

export type ListerSize = "sm" | "md" | "lg";
export type ListerDensity = "compact" | "comfortable" | "loose";

export type ListerTriggerRenderCtx<
    TRaw extends Record<string, any>,
    TValue extends ListerId,
    TMeta,
    TMode extends ListerMode,
> = {
    mode: TMode;
    value: any;
    selectedOptions: any[] | null;
    placeholder: string;
    maxDisplayItems: number;
    display: React.ReactNode;

    disabled?: boolean;
    readOnly?: boolean;
    isOpen: boolean;

    /** convenience */
    disabledTrigger: boolean;
    hasValue: boolean;

    /** convenience actions */
    clear(): void;
    open(): void;
};

/* ─────────────────────────────────────────────────────────────
 * Variant props
 * ───────────────────────────────────────────────────────────── */
export type ListerVariantProps<
    TMode extends ListerMode,
    P extends PresetMap = PresetMap,
    TRaw extends Record<string, any> = any,
    TValue extends ListerId = any,
    TFilters extends Record<string, any> = Record<string, any>,
    TMeta = any,
    TCtx = any,
    TSearchColumn extends string = string,
> = ListerFieldBaseProps<ListerValueForMode<TValue, TMode>> & {
    host?: ListerProviderHost;
    presets?: P;
    remoteDebounceMs?: number;

    /** Final/base definition */
    def?: ListerDefinition<TRaw, TValue, TFilters, TMeta, TCtx, TSearchColumn>;

    /** Inline overrides (any one can exist => inline exists) */
    endpoint?: string;
    method?: "GET" | "POST";
    buildRequest?: ListerSource<TFilters>["buildRequest"];
    selector?: Selector<TRaw>;

    /** ✅ Search spec override (feeds session.searchSpec) */
    search?: ListerDefinition<
        TRaw,
        TValue,
        TFilters,
        TMeta,
        TCtx,
        TSearchColumn
    >["search"];

    /**
     * ✅ Initial/seed search target (feeds session.searchTarget)
     * If omitted, provider will derive it from `search.default` (if present) or fallback.
     */
    searchTarget?: ListerSearchTarget;

    /** Inline mapping overrides (ctx-aware) */
    optionValue?: KeyOrFn<TRaw, TValue, TCtx>;
    optionLabel?: KeyOrFn<TRaw, string, TCtx>;
    optionIcon?: KeyOrFn<TRaw, any, TCtx>;
    optionDescription?: KeyOrFn<TRaw, string, TCtx>;
    optionDisabled?: KeyOrFn<TRaw, boolean, TCtx>;
    optionGroup?: KeyOrFn<TRaw, string, TCtx>;
    optionMeta?: KeyOrFn<TRaw, TMeta, TCtx>;

    filters?: TFilters;

    mode?: TMode;
    confirm?: TMode extends "single" ? boolean : never;
    permissions?: string[];

    // ─────────────────────────────────────────────
    // Open options (passed through to inner/open)
    // ─────────────────────────────────────────────

    title?: string;
    searchMode?: ListerOpenOptions<
        TRaw,
        TValue,
        TFilters,
        TMeta,
        TMode
    >["searchMode"];
    initialQuery?: string;
    showRefresh?: boolean;
    refreshMode?: ListerOpenOptions<
        TRaw,
        TValue,
        TFilters,
        TMeta,
        TMode
    >["refreshMode"];

    /** Filters */
    filtersSpec?: ListerFilterSpec<TFilters>;

    renderOption?: ListerOpenOptions<
        TRaw,
        TValue,
        TFilters,
        TMeta,
        TMode
    >["renderOption"];

    // ─────────────────────────────────────────────
    // Trigger display
    // ─────────────────────────────────────────────

    maxDisplayItems?: number;

    renderTrigger?: (
        ctx: ListerTriggerRenderCtx<TRaw, TValue, TMeta, TMode>,
    ) => React.ReactElement;

    // ─────────────────────────────────────────────
    // Styling + controls (mirrors multi-select semantics)
    // ─────────────────────────────────────────────

    size?: ListerSize;
    density?: ListerDensity;

    clearable?: boolean;

    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;

    iconGap?: number;
    leadingIconSpacing?: number;
    trailingIconSpacing?: number;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;

    joinControls?: boolean;
    extendBoxToControls?: boolean;

    // ─────────────────────────────────────────────
    // Panel / content wrappers
    // ─────────────────────────────────────────────

    panelClassName?: string;
    contentClassName?: string;
};
