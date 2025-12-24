// -- resources/js/context/lister/types.ts

/* ============================================================================
 * Lister Spec v0.1 — FULL TYPES (Generics-first, mode-aware, multi-session)
 * - Extracted result MUST be an array; default selector is body.data
 * - Strong typing for: value, defaultValue, details.raw, filters, presets
 * - details.raw is TRaw | null in single mode, TRaw[] in multiple mode
 * - onChange is sync + preventDefault()
 * - Apply always for multiple; optional for single via confirm
 * - Filters: TreeSelect-native options (supports render by default)
 * - Provider supports MULTIPLE simultaneous popover sessions
 * ============================================================================ */

import { VariantKey, VariantPropsFor } from "@/schema/variant";

export type ListerId = string | number;

export type ListerMode = "single" | "multiple";
export type ListerSearchMode = "local" | "remote" | "hybrid";
export type ListerOpenReason =
    | "apply"
    | "cancel"
    | "close"
    | "denied"
    | "error";

export type ListerSessionId = string;

/** Extraction selector:
 * - string form is runtime-only (dot-path); not type-checked
 * - function form is typed and must return an array
 */
export type Selector<TRaw> = string | ((body: any) => TRaw[]);

/** Resolver:
 * - string form is runtime-only (dot-path relative to raw item)
 * - function form is fully typed
 */
export type Resolver<TOut, TRaw, TCtx = any> =
    | string
    | ((raw: TRaw, ctx: TCtx) => TOut);

export type OpenAnchor =
    | { x: number; y: number }
    | { clientX: number; clientY: number }
    | any;

export type ListerChangeEvent = {
    preventDefault(): void;
    defaultPrevented: boolean;
};

/* ─────────────────────────────────────────────
 * Logging + permissions (host-implemented)
 * ───────────────────────────────────────────── */

export type ListerLogLevel = "info" | "success" | "warning" | "error";

export type ListerLogCode =
    | "lister.access_denied"
    | "lister.fetch_failed"
    | "lister.extract_not_array"
    | "lister.mapping_failed"
    | "lister.unknown_error";

export type ListerLogEntry = {
    level: ListerLogLevel;
    code: ListerLogCode;
    message: string;
    details?: Record<string, unknown>;
    ui?: {
        mode?: "toast" | "banner" | "dialog";
        group?: string;
        autoCloseMs?: number | null;
    };
};

export type ListerPermissionCtx = {
    kind?: string;
    endpoint?: string;
    filters?: any;
    sessionId?: ListerSessionId;
};

export interface ListerProviderHost {
    /** Host decides permission logic. Mandatory permissions end with '!' */
    can: (permissions: string[], ctx: ListerPermissionCtx) => boolean;

    /** Host decides notification/diagnostic surface */
    log: (entry: ListerLogEntry) => void;
}

/* ─────────────────────────────────────────────
 * Option + mapping (typed)
 * ───────────────────────────────────────────── */

export type ListerOption<TRaw, TValue extends ListerId, TMeta = unknown> = {
    value: TValue;
    label: any; // string | ReactNode (UI layer)
    icon?: any;
    description?: any;
    disabled?: boolean;
    group?: string;
    meta?: TMeta;

    /** optional raw passthrough (implementation choice) */
    raw?: TRaw;
};

export type ListerMapping<
    TRaw,
    TValue extends ListerId,
    TMeta = unknown,
    TCtx = any,
> = {
    optionValue: Resolver<TValue, TRaw, TCtx>; // required

    /** default: raw.label ?? String(value) */
    optionLabel?: Resolver<any, TRaw, TCtx>;

    optionIcon?: Resolver<any, TRaw, TCtx>;
    optionDescription?: Resolver<any, TRaw, TCtx>;
    optionDisabled?: Resolver<boolean, TRaw, TCtx>;
    optionGroup?: Resolver<string, TRaw, TCtx>;
    optionMeta?: Resolver<TMeta, TRaw, TCtx>;
};

/* ─────────────────────────────────────────────
 * Source + definition (typed)
 * ───────────────────────────────────────────── */

export type ListerSource<TFilters = unknown> = {
    endpoint: string;
    method?: "GET" | "POST";

    /** Optional custom mapping of filters/query/cursor into request params/body/headers */
    buildRequest?: (args: {
        filters?: TFilters;
        query?: string;
        cursor?: string | null;
    }) => { params?: any; body?: any; headers?: any };
};

export type ListerSearchSpec<TColumn extends string = string> = {
    /**
     * Columns the UI can offer as "Subject" (search in one column).
     * Example: ["name", "email", "status"]
     */
    subjects?: readonly TColumn[];

    /**
     * Columns the UI can offer as "Search only" (search across multiple columns).
     * Example: ["name", "email"]
     */
    only?: readonly TColumn[];

    /**
     * Allow user to type a column name that isn't in `subjects`.
     * (Your backend still decides whether to accept/reject it.)
     */
    allowCustomSubject?: boolean;

    /**
     * Allow user to add custom column names to the multi-field "only" list.
     * Useful if you want advanced users to target niche columns.
     */
    allowCustomOnly?: boolean;

    /**
     * Whether the UI can show a "Search all" option.
     * (Semantics depend on your backend: usually "all text columns".)
     */
    allowAll?: boolean;

    /**
     * Optional UI hints (totally optional, but nice for button labels/placeholders).
     */
    ui?: {
        placeholder?: string; // e.g. "Search…"
        subjectLabel?: string; // e.g. "In"
        allLabel?: string; // e.g. "All columns"
        onlyLabel?: string; // e.g. "Only"
        customSubjectLabel?: string; // e.g. "Custom column"
    };

    default?: string;
};

export type ListerDefinition<
    TRaw,
    TValue extends ListerId,
    TFilters = unknown,
    TMeta = unknown,
    TCtx = any,
    TSearchColumn extends string = string,
> = {
    /** optional stable id used by presets */
    id?: string;

    source: ListerSource<TFilters>;

    /** If missing: default extraction uses body.data (runtime). Must produce an array. */
    selector?: Selector<TRaw>;

    /** How raw item maps into selectable option */
    mapping: ListerMapping<TRaw, TValue, TMeta, TCtx>;

    /**
     * Search configuration:
     * - defines which columns are searchable (subject + multi-field)
     * - optionally allows custom column names (advanced mode)
     */
    search?: ListerSearchSpec<TSearchColumn>;
};

/* ─────────────────────────────────────────────
 * Filters (TreeSelect-native; render supported by option item)
 * ───────────────────────────────────────────── */

export type ListerFilterApplyMode = "replace" | "merge" | "unset";

export type ListerFilterApply<TFilters, K extends keyof TFilters & string> = {
    key: K;
    mode?: ListerFilterApplyMode; // default "replace"
    value?: TFilters[K];
    toggleable?: boolean;

    /** optional: clicking cycles through these states */
    cycle?: Array<
        | { mode: "unset" }
        | { mode: "replace"; value: TFilters[K] }
        | { mode: "merge"; value: Partial<TFilters> } // optional if you ever want it
    >;
};

export type ListerFilterCtx<TFilters> = {
    /** base filters passed to open() */
    base: TFilters | undefined;

    /** only what filter controls changed */
    patch: Partial<TFilters>;

    /** base + patch (merged) */
    effective: TFilters | undefined;

    set<K extends keyof TFilters & string>(key: K, value: TFilters[K]): void;
    merge(patch: Partial<TFilters>): void;
    unset<K extends keyof TFilters & string>(key: K): void;
    clear(): void;

    /** triggers refetch using current effective filters */
    refresh(): void;

    /** reads from effective (base overridden by patch) */
    get<K extends keyof TFilters & string>(key: K): TFilters[K] | undefined;
};

export type ListerFilterBindKey<TFilters> = keyof TFilters & string;

/**
 * OPTIONAL inline input filter config
 * (value comes from the input; not from option.value)
 */
export type ListerFilterInput<TFilters> = {
    /** If omitted, falls back to option.bindKey (or parent bindKey). */
    bindKey?: ListerFilterBindKey<TFilters>;

    variant: VariantKey;
    props?: VariantPropsFor<any>;

    mode?: "replace" | "merge"; // default "replace"
    unsetOnEmpty?: boolean;
};

type FilterNodeBase<TFilters> = {
    /**
     * UI identity (must be unique in the tree)
     * Example: "status", "status.active", "pricing.minMax"
     */
    id: string | number;

    label?: any;
    icon?: any;
    description?: any;
    disabled?: boolean;

    /**
     * Column/reference key (DB filter key).
     * Example: "status"
     *
     * Typically set on a group node and inherited by children.
     */
    bindKey?: ListerFilterBindKey<TFilters>;

    /**
     * Optional custom render (advanced).
     * (Still works, but now you can also use kind="input" for most cases.)
     */
    render?: (args: {
        option: ListerFilterOption<TFilters>;
        ctx: ListerFilterCtx<TFilters>;
        state: { open: boolean; selected: boolean };
        actions: { close(): void };
    }) => any;
};

export type ListerFilterGroupOption<TFilters> = FilterNodeBase<TFilters> & {
    kind: "group";
    children: Array<ListerFilterOption<TFilters>>;
    apply?: never;
    input?: never;
    value?: never;
};

export type ListerFilterValueOption<
    TFilters,
    TValue = string | number,
> = FilterNodeBase<TFilters> & {
    kind: "value";

    /**
     * Actual DB value. Example: "active"
     * (NOT "status.active")
     */
    value: TValue;

    /**
     * Optional: clicking this item applies/unapplies it.
     * If apply.value is omitted => defaults to option.value
     */
    apply?: ListerFilterApply<TFilters, any>;

    children?: never;
    input?: never;
};

export type ListerFilterInputOption<TFilters> = FilterNodeBase<TFilters> & {
    kind: "input";

    /**
     * Value comes from the input; binds to bindKey (option.bindKey or input.bindKey).
     */
    input: ListerFilterInput<TFilters>;

    children?: never;
    apply?: never;
    value?: never;
};

export type ListerFilterOption<TFilters> =
    | ListerFilterGroupOption<TFilters>
    | ListerFilterValueOption<TFilters>
    | ListerFilterInputOption<TFilters>;

export type ListerFilterSpec<TFilters> = {
    /** TreeSelect options */
    options: Array<ListerFilterOption<TFilters>>;

    /** Merge base + patch into effective */
    merge?: (base: TFilters | undefined, patch: Partial<TFilters>) => TFilters;

    /** Default: true. If true, any ctx.set/merge/unset triggers a fetch */
    autoFetch?: boolean;
};

/* ─────────────────────────────────────────────
 * Mode-dependent helpers (typed)
 * ───────────────────────────────────────────── */

export type ListerValueForMode<
    TValue extends ListerId,
    TMode extends ListerMode,
> = TMode extends "multiple" ? TValue[] : TValue | null;

export type ListerRawForMode<
    TRaw,
    TMode extends ListerMode,
> = TMode extends "multiple" ? TRaw[] : TRaw | null;

export type ListerOptionsForMode<
    TRaw,
    TValue extends ListerId,
    TMeta,
    TMode extends ListerMode,
> = TMode extends "multiple"
    ? Array<ListerOption<TRaw, TValue, TMeta>>
    : ListerOption<TRaw, TValue, TMeta> | null;

/* ─────────────────────────────────────────────
 * Details (typed; raw is mode-dependent)
 * ───────────────────────────────────────────── */

export type ListerDetails<
    TRaw,
    TValue extends ListerId,
    TMeta,
    TMode extends ListerMode,
> = {
    /** Selected mapped options (array in multiple, single option/null in single) */
    options: ListerOptionsForMode<TRaw, TValue, TMeta, TMode>;

    /** Selected raw backend item(s) (array only in multiple mode) */
    raw: ListerRawForMode<TRaw, TMode>;

    /** Live change semantic while open */
    action: "select" | "deselect" | "clear" | "init";
};

/* ─────────────────────────────────────────────
 * Open options + result (typed)
 * ───────────────────────────────────────────── */

export type ListerOpenOptions<
    TRaw,
    TValue extends ListerId,
    TFilters,
    TMeta,
    TMode extends ListerMode = "single",
> = {
    /** Mode defaults to "single" */
    mode?: TMode;

    /** Single-mode only: if true => Apply/Cancel UI, draft selection until Apply */
    confirm?: TMode extends "single" ? boolean : never;

    /** Initial selection when opened (draft seed) */
    defaultValue?: ListerValueForMode<TValue, TMode>;

    /** Permission entries; mandatory end with '!' */
    permissions?: string[];

    /** Search behaviour */
    searchMode?: ListerSearchMode;
    initialQuery?: string;

    /** UI */
    title?: string;
    draggable?: boolean;
    anchor?: OpenAnchor;

    /** Refresh */
    showRefresh?: boolean;
    refreshMode?: "preserve-selection" | "clear-missing" | "clear-all";

    /** Filters control (TreeSelect-native options; render supported) */
    filtersSpec?: ListerFilterSpec<TFilters>;

    /** Custom row renderer */
    renderOption?: (args: {
        option: ListerOption<TRaw, TValue, TMeta>;
        state: { selected: boolean; active: boolean; mode: TMode };
        actions: { toggle(): void; select(): void; deselect(): void };
        ctx: { query?: string; filters?: TFilters };
    }) => any;

    /** Live change hook (sync + veto) */
    onChange?: (
        value: ListerValueForMode<TValue, TMode>,
        details: ListerDetails<TRaw, TValue, TMeta, TMode>,
        e: ListerChangeEvent,
    ) => void;
};

export type ListerOpenResult<
    TRaw,
    TValue extends ListerId,
    TMeta,
    TMode extends ListerMode,
> = {
    reason: ListerOpenReason;
    value: ListerValueForMode<TValue, TMode>;
    details: {
        options: ListerOptionsForMode<TRaw, TValue, TMeta, TMode>;
        raw: ListerRawForMode<TRaw, TMode>;
        action: "apply" | "cancel" | "close" | "denied" | "error";
        errorCode?: string;
        /** Useful in multi-session UI: which popover resolved */
        sessionId?: ListerSessionId;
    };
};

/* ─────────────────────────────────────────────
 * Presets typing (autocomplete for open("orders"...))
 * ───────────────────────────────────────────── */

export type PresetMap = Record<
    string,
    ListerDefinition<any, any, any, any, any>
>;

export type PresetRaw<P extends PresetMap, K extends keyof P> =
    P[K] extends ListerDefinition<infer R, any, any, any, any> ? R : never;

export type PresetValue<P extends PresetMap, K extends keyof P> =
    P[K] extends ListerDefinition<any, infer V, any, any, any> ? V : never;

export type PresetFilters<P extends PresetMap, K extends keyof P> =
    P[K] extends ListerDefinition<any, any, infer F, any, any> ? F : never;

export type PresetMeta<P extends PresetMap, K extends keyof P> =
    P[K] extends ListerDefinition<any, any, any, infer M, any> ? M : never;

/* ─────────────────────────────────────────────
 * Public API (typed overloads)
 * ───────────────────────────────────────────── */

export interface ListerApi<P extends PresetMap> {
    /** Fetch data without opening session */
    fetch<K extends keyof P>(
        kind: K,
        filters?: PresetFilters<P, K>,
        opts?: { query?: string },
    ): Promise<{
        raw: PresetRaw<P, K>[];
        options: Array<
            ListerOption<PresetRaw<P, K>, PresetValue<P, K>, PresetMeta<P, K>>
        >;
    }>;

    /** Fetch data without opening session (custom definition) */
    fetch<TRaw, TValue extends ListerId, TFilters = unknown, TMeta = unknown>(
        def: ListerDefinition<TRaw, TValue, TFilters, TMeta>,
        filters?: TFilters,
        opts?: { query?: string },
    ): Promise<{
        raw: TRaw[];
        options: Array<ListerOption<TRaw, TValue, TMeta>>;
    }>;

    /** Open via preset kind */
    open<K extends keyof P, TMode extends ListerMode = "single">(
        kind: K,
        filters?: PresetFilters<P, K>,
        opts?: ListerOpenOptions<
            PresetRaw<P, K>,
            PresetValue<P, K>,
            PresetFilters<P, K>,
            PresetMeta<P, K>,
            TMode
        > & { mode?: TMode },
    ): Promise<
        ListerOpenResult<
            PresetRaw<P, K>,
            PresetValue<P, K>,
            PresetMeta<P, K>,
            TMode
        >
    >;

    /** Open via custom definition */
    open<
        TRaw,
        TValue extends ListerId,
        TFilters = unknown,
        TMeta = unknown,
        TMode extends ListerMode = "single",
    >(
        def: ListerDefinition<TRaw, TValue, TFilters, TMeta>,
        filters?: TFilters,
        opts?: ListerOpenOptions<TRaw, TValue, TFilters, TMeta, TMode> & {
            mode?: TMode;
        },
    ): Promise<ListerOpenResult<TRaw, TValue, TMeta, TMode>>;

    /** Optional preset registry helpers */
    registerPreset?: (
        kind: string,
        def: ListerDefinition<any, any, any, any, any>,
    ) => void;
    getPreset?: (
        kind: string,
    ) => ListerDefinition<any, any, any, any, any> | undefined;
}

/* ─────────────────────────────────────────────
 * Session/Runtime state (multi-session)
 * ───────────────────────────────────────────── */

export type ListerSessionState<
    TRaw,
    TValue extends ListerId,
    TFilters,
    TMeta,
    TMode extends ListerMode,
> = {
    // identity
    sessionId: ListerSessionId;
    createdAt: number;

    // session identity
    isOpen: boolean;
    kind?: string;
    definition?: ListerDefinition<TRaw, TValue, TFilters, TMeta>;
    filters?: TFilters; // base filters passed to open()

    // permissions (for diagnostics)
    permissions?: string[];

    // ui config
    mode: TMode;
    confirm: TMode extends "single" ? boolean : true; // multiple always behaves as confirm=true
    title?: string;

    // positioning
    draggable: boolean;
    position: { x: number; y: number } | null; // null = "use default placement"
    hasMoved: boolean; // becomes true after dragging

    // search
    searchMode: ListerSearchMode; // default "remote"
    query: string;

    // loading/error
    loading: boolean;
    refreshing: boolean;
    errorCode?: ListerLogCode | string;

    // data (latest fetched/mapped)
    rawList: TRaw[]; // the extracted array
    optionsList: Array<ListerOption<TRaw, TValue, TMeta>>;

    // selection (draft)
    draftValue: ListerValueForMode<TValue, TMode>;

    // refresh reconciliation
    refreshMode: "preserve-selection" | "clear-missing" | "clear-all";

    // finalization promise handlers (internal)
    _resolve?: (result: ListerOpenResult<TRaw, TValue, TMeta, TMode>) => void;
};

export type ListerRuntimeState<
    TRaw,
    TValue extends ListerId,
    TFilters,
    TMeta,
    TMode extends ListerMode,
> = ListerSessionState<TRaw, TValue, TFilters, TMeta, TMode> & {
    /** Used to revert on cancel/close (recommended behaviour) */
    initialDraftValue: ListerValueForMode<TValue, TMode>;

    /** Stored from open() opts for later UI + provider logic */
    onChange?: (
        value: ListerValueForMode<TValue, TMode>,
        details: ListerDetails<TRaw, TValue, TMeta, TMode>,
        e: ListerChangeEvent,
    ) => void;

    /** UI hook for later */
    renderOption?: ListerOpenOptions<
        TRaw,
        TValue,
        TFilters,
        TMeta,
        TMode
    >["renderOption"];

    /** UI flag for later */
    showRefresh?: boolean;

    /** Filters config + runtime patch/effective (provider-owned) */
    filtersSpec?: ListerFilterSpec<TFilters>;
    filtersPatch?: Partial<TFilters>;
    effectiveFilters?: TFilters;

    /** Optional UI convenience */
    selectedFilterValues?: Array<string | number>;

    /* ─────────────────────────────────────────────
     * Search (provider-owned)
     * ───────────────────────────────────────────── */

    /** Derived from def.search (used for UI to render subjects/only/all rules) */
    searchSpec?: ListerSearchSpec<string>;

    /** Persisted user selection (subject/all/only) */
    searchTarget?: ListerSearchTarget;
};

export type ListerStoreState = {
    /** rendering order (last = topmost) */
    order: ListerSessionId[];

    /** active/focused session */
    activeId?: ListerSessionId;

    /** sessions registry */
    sessions: Record<
        ListerSessionId,
        ListerRuntimeState<any, any, any, any, any>
    >;
};

export type ListerSearchTarget = {
    /**
     * "all"    => backend receives `searchAll=true`
     * "subject"=> backend receives `subject=<col>`
     * "only"   => backend receives `searchOnly=[...]`
     */
    mode: "all" | "subject" | "only";

    subject?: string | null; // for mode="subject"
    only?: Array<string | number> | null; // for mode="only"
};

export type ListerSearchPayload = {
    subject?: string;
    searchAll?: boolean;
    searchOnly?: Array<string | number>;
};
