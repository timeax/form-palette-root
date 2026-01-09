// resources/js/presets/shadcn-variants/lister/inner.tsx
// noinspection DuplicatedCode

import * as React from "react";
import { cn } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { ChevronDown, X } from "lucide-react";

import { useLister } from "@/presets/lister";
import type {
    ListerApi,
    ListerDefinition,
    ListerId,
    ListerMode,
    ListerOpenOptions,
    ListerOpenResult,
    ListerSessionId,
    PresetMap,
} from "@/presets/lister/types";

import { ListerPopoverPanel } from "./popover";
import { buildLabelsFromOptions, isSameValue } from "./utils";
import { createRuntimeKey } from "@/presets/lister/runtime/session/key";

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

function triggerHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}

function triggerPadding(density?: Density) {
    switch (density) {
        case "compact":
            return "py-1";
        case "loose":
            return "py-2";
        case "comfortable":
        default:
            return "py-1.5";
    }
}

export type ListerTriggerRenderCtx<
    _TRaw extends Record<string, any>,
    _TValue extends ListerId,
    _TMeta,
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

export type ListerInnerProps<
    _P extends PresetMap = PresetMap,
    TRaw extends Record<string, any> = any,
    TValue extends ListerId = any,
    TFilters = any,
    TMeta = any,
    TMode extends ListerMode = "single",
> = {
    /** FINAL resolved definition (already merged/ready). Required. */
    def: ListerDefinition<TRaw, TValue, TFilters, TMeta>;

    value: any;
    onValue: (next: any, detail?: any) => void;

    filters?: TFilters;

    mode?: TMode;
    confirm?: TMode extends "single" ? boolean : never;
    permissions?: string[];

    disabled?: boolean;
    readOnly?: boolean;

    openOptions?: Omit<
        ListerOpenOptions<TRaw, TValue, TFilters, TMeta, TMode>,
        "mode" | "confirm" | "defaultValue" | "permissions"
    >;

    renderTrigger?: (
        ctx: ListerTriggerRenderCtx<TRaw, TValue, TMeta, TMode>,
    ) => React.ReactElement;

    placeholder?: string;
    maxDisplayItems?: number;

    size?: Size;
    density?: Density;

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

    className?: string;

    contentClassName?: string;
    panelClassName?: string;
};

function findSessionByOwner(store: any, ownerKey: string): any | null {
    const sessions = store?.sessions;
    if (!sessions) return null;

    // prefer active session if it matches
    const activeId = store?.activeId;
    if (activeId != null) {
        const s = sessions[activeId];
        if (s?.ownerKey === ownerKey && s?.isOpen) return s;
    }

    // otherwise scan order (stable stacking)
    const order: any[] = Array.isArray(store?.order) ? store.order : [];
    for (const id of order) {
        const s = sessions[id];
        if (s?.ownerKey === ownerKey && s?.isOpen) return s;
    }

    // fallback scan (just in case)
    for (const k of Object.keys(sessions)) {
        const s = sessions[k];
        if (s?.ownerKey === ownerKey && s?.isOpen) return s;
    }

    return null;
}

export function ListerInner<
    P extends PresetMap = PresetMap,
    TRaw extends Record<string, any> = any,
    TValue extends ListerId = any,
    TFilters = any,
    TMeta = any,
    TMode extends ListerMode = "single",
>(props: ListerInnerProps<P, TRaw, TValue, TFilters, TMeta, TMode>) {
    const {
        def,
        value,
        onValue,
        filters,
        mode: modeProp,
        confirm: confirmProp,
        permissions,
        disabled,
        readOnly,
        openOptions,
        renderTrigger,
        placeholder = "Select…",
        maxDisplayItems = 2,

        size,
        density,
        clearable = true,

        leadingIcons,
        trailingIcons,
        icon,
        iconGap,
        leadingIconSpacing,
        trailingIconSpacing,

        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        joinControls = true,
        extendBoxToControls = true,

        className,
        contentClassName,
        panelClassName,
    } = props;

    const { api, actions, store } = useLister<P>() as any;

    // ✅ stable owner key per input mount
    const ownerKeyRef = React.useRef<string>(
        (openOptions as any)?.ownerKey ?? createRuntimeKey('lister_owner'),
    );
    React.useEffect(() => {
        const next = (openOptions as any)?.ownerKey as string | undefined;
        if (next) ownerKeyRef.current = next;
    }, [openOptions]);

    // derive current session from global store by ownerKey
    const session = findSessionByOwner(store, ownerKeyRef.current);
    const sessionId = session?.sessionId as ListerSessionId | undefined;
    const isOpen = !!session?.isOpen;

    // Used ONLY for trigger display when closed.
    const [selectedOptions, setSelectedOptions] = React.useState<any[] | null>(
        null,
    );

    const openingRef = React.useRef(false);

    const mode = (modeProp ?? "single") as TMode;
    const confirm = (mode === "multiple" ? true : !!confirmProp) as any;

    const disabledTrigger = !!(disabled || readOnly);

    const hasValue =
        mode === "multiple"
            ? Array.isArray(value) && value.length > 0
            : value != null && value !== "";

    // Resolve selected options for trigger display (when value changes, or def/filters changes)
    React.useEffect(() => {
        if (!hasValue) {
            setSelectedOptions(null);
            return;
        }

        let alive = true;

        (async () => {
            const res = await (api as ListerApi<P>).fetch(
                def as any,
                filters as any,
                { query: "" } as any,
            );

            if (!alive) return;

            const optionsList = (res?.options ?? []) as any[];

            const byValue = new Map<any, any>();
            for (const o of optionsList) {
                if (!o || o.value == null) continue;
                byValue.set(o.value, o);
            }

            const nextSelected =
                mode === "multiple"
                    ? (Array.isArray(value) ? value : [])
                          .map((v: any) => byValue.get(v))
                          .filter(Boolean)
                    : value != null && value !== ""
                      ? [byValue.get(value)].filter(Boolean)
                      : [];

            setSelectedOptions((prev) => {
                const p = prev ?? [];
                const n = nextSelected ?? [];
                const pv = p.map((o) => o?.value);
                const nv = n.map((o) => o?.value);
                return isSameValue(pv, nv) ? prev : nextSelected;
            });
        })().catch(() => {
            // ignore; trigger can still fall back to showing raw value
        });

        return () => {
            alive = false;
        };
    }, [api, def, filters, mode, value, hasValue]);

    const openSession = React.useCallback(async () => {
        console.log(openingRef.current);
        if (disabledTrigger) return;
        if (openingRef.current) return;

        openingRef.current = true;

        try {
            const opts: ListerOpenOptions<
                TRaw,
                TValue,
                TFilters,
                TMeta,
                TMode
            > = {
                ...(openOptions as any),

                // ✅ stable owner key so runtime can reuse session
                ownerKey: ownerKeyRef.current as any,

                mode,
                confirm,
                defaultValue: value as any,
                permissions,
            } as any;

            const res = (await (api as ListerApi<P>).open(
                def as any,
                filters as any,
                opts as any,
            )) as unknown as ListerOpenResult<TRaw, TValue, TMeta, TMode>;

            if (res?.reason === "apply") {
                const snap = (res.details?.options as any[]) ?? null;
                setSelectedOptions(snap);
                onValue(res.value as any, res.details);
            }
        } finally {
            openingRef.current = false;
        }
    }, [
        api,
        confirm,
        def,
        disabledTrigger,
        filters,
        mode,
        onValue,
        openOptions,
        permissions,
        value,
    ]);

    const clear = React.useCallback(() => {
        if (disabledTrigger) return;

        onValue(undefined as any, {
            action: "clear",
            source: "variant",
        });

        setSelectedOptions(null);
    }, [disabledTrigger, onValue]);

    const display = React.useMemo(() => {
        return buildLabelsFromOptions({
            mode,
            value,
            selectedOptions,
            placeholder,
            maxItems: maxDisplayItems,
        });
    }, [maxDisplayItems, mode, placeholder, selectedOptions, value]);

    const triggerCtx: ListerTriggerRenderCtx<TRaw, TValue, TMeta, TMode> =
        React.useMemo(
            () => ({
                mode,
                value,
                selectedOptions,
                placeholder,
                maxDisplayItems,
                display,
                disabled,
                readOnly,
                isOpen,
                disabledTrigger,
                hasValue,
                clear,
                open: () => void openSession(),
            }),
            [
                mode,
                value,
                selectedOptions,
                placeholder,
                maxDisplayItems,
                display,
                disabled,
                readOnly,
                isOpen,
                disabledTrigger,
                hasValue,
                clear,
                openSession,
            ],
        );

    // ─────────────────────────────────────────────
    // Trigger visuals (mirrors multi-select default trigger)
    // ─────────────────────────────────────────────

    const heightCls = triggerHeight(size);
    const padCls = triggerPadding(density);

    const resolvedLeadingIcons: React.ReactNode[] = (() => {
        if (leadingIcons && leadingIcons.length) return leadingIcons;
        if (icon) return [icon];
        return [];
    })();

    const resolvedTrailingIcons: React.ReactNode[] = trailingIcons ?? [];

    const baseIconGap = iconGap ?? 4;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const hasLeadingIcons = resolvedLeadingIcons.length > 0;
    const hasTrailingIcons = resolvedTrailingIcons.length > 0;

    const hasLeadingControl = !!leadingControl;
    const hasTrailingControl = !!trailingControl;
    const hasControls = hasLeadingControl || hasTrailingControl;

    const showClear = clearable && hasValue;

    const baseBoxClasses = cn(
        "border-input w-full min-w-0 rounded-md border bg-surfaces-input shadow-xs",
        "transition-[color,box-shadow] outline-none",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    );

    const DefaultTriggerButton = (
        <button
            type="button"
            disabled={disabledTrigger}
            className={cn(
                "flex w-full items-center justify-between rounded-md border border-input bg-surfaces-input px-3 text-left shadow-xs",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                heightCls,
                padCls,
                hasControls &&
                    joinControls &&
                    extendBoxToControls &&
                    "border-none shadow-none focus-visible:ring-0 focus-visible:outline-none",
                !hasControls ? className : undefined,
            )}
        >
            <div className="flex w-full items-center justify-between gap-2">
                <div className="flex min-w-0 items-center grow gap-2">
                    {hasLeadingIcons && (
                        <span
                            className="flex items-center gap-1 shrink-0"
                            style={{ columnGap: leadingGap }}
                            data-slot="leading-icons"
                        >
                            {resolvedLeadingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </span>
                    )}

                    <div className="min-w-0 flex-1 truncate">{display}</div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    {showClear && (
                        <span
                            aria-label="Clear selection"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                clear();
                            }}
                            className="flex h-4 w-4 items-center justify-center rounded hover:bg-muted"
                            data-slot="clear"
                        >
                            <X className="h-3 w-3 pointer-events-none" />
                        </span>
                    )}

                    {hasTrailingIcons && (
                        <span
                            className="flex items-center gap-1"
                            style={{ columnGap: trailingGap }}
                            data-slot="trailing-icons"
                        >
                            {resolvedTrailingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </span>
                    )}

                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>
        </button>
    );

    const userTriggerEl = renderTrigger ? renderTrigger(triggerCtx) : null;

    const TriggerNode =
        renderTrigger && React.isValidElement(userTriggerEl)
            ? React.cloneElement(userTriggerEl as any, {
                  className: cn(
                      (userTriggerEl as any).props?.className,
                      className,
                  ),
              })
            : DefaultTriggerButton;

    const PopoverCore = (
        <Popover
            open={isOpen && !disabledTrigger}
            onOpenChange={(next) => {
                if (disabledTrigger) return;
                if (next) void openSession();
                else if (sessionId) actions.close(sessionId);
            }}
        >
            <PopoverTrigger asChild>{TriggerNode}</PopoverTrigger>

            <PopoverContent
                align="start"
                side="bottom"
                sideOffset={8}
                className={cn(
                    "p-0",
                    "w-(--radix-popover-trigger-width)",
                    "max-h-(--radix-popover-content-available-height)",
                    "max-w-(--radix-popover-content-available-width)",
                    "min-h-[calc(var(--radix-popover-trigger-height)*8)]",
                    contentClassName,
                )}
            >
                {sessionId ? (
                    <ListerPopoverPanel
                        id={sessionId}
                        mode={mode as any}
                        confirm={!!confirm}
                        className={cn("h-full w-full", panelClassName)}
                    />
                ) : null}
            </PopoverContent>
        </Popover>
    );

    if (renderTrigger) {
        return (
            <div
                data-slot="lister-field"
                className={cn("w-full", className)}
                aria-disabled={disabled ? "true" : undefined}
            >
                {PopoverCore}
            </div>
        );
    }

    if (!hasControls) {
        return (
            <div
                data-slot="lister-field"
                className={cn(
                    "w-full",
                    disabledTrigger && "opacity-50 cursor-not-allowed",
                )}
                aria-disabled={disabledTrigger ? "true" : undefined}
            >
                {PopoverCore}
            </div>
        );
    }

    if (joinControls) {
        const groupClassName = cn(
            "flex items-stretch w-full",
            extendBoxToControls
                ? cn("relative", baseBoxClasses)
                : "relative border-none shadow-none bg-transparent",
            className,
        );

        return (
            <div
                data-slot="lister-field"
                className="w-full"
                aria-disabled={disabledTrigger ? "true" : undefined}
            >
                <div
                    className={groupClassName}
                    data-slot="lister-group"
                    data-disabled={disabledTrigger ? "true" : "false"}
                >
                    {hasLeadingControl && (
                        <div
                            className={cn(
                                "flex items-center px-2",
                                leadingControlClassName,
                            )}
                            data-slot="leading-control"
                        >
                            {leadingControl}
                        </div>
                    )}

                    <div
                        className="flex-1 min-w-0 flex items-stretch"
                        data-slot="lister-region"
                    >
                        {PopoverCore}
                    </div>

                    {hasTrailingControl && (
                        <div
                            className={cn(
                                "flex items-center px-2",
                                trailingControlClassName,
                            )}
                            data-slot="trailing-control"
                        >
                            {trailingControl}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            data-slot="lister-field"
            className={cn(
                "flex items-stretch w-full",
                disabledTrigger && "opacity-50 cursor-not-allowed",
                className,
            )}
            aria-disabled={disabledTrigger ? "true" : undefined}
        >
            {hasLeadingControl && (
                <div
                    className={cn(
                        "flex items-center mr-1",
                        leadingControlClassName,
                    )}
                    data-slot="leading-control"
                >
                    {leadingControl}
                </div>
            )}

            <div className="flex-1 min-w-0" data-slot="lister-region">
                {PopoverCore}
            </div>

            {hasTrailingControl && (
                <div
                    className={cn(
                        "flex items-center ml-1",
                        trailingControlClassName,
                    )}
                    data-slot="trailing-control"
                >
                    {trailingControl}
                </div>
            )}
        </div>
    );
}

export default ListerInner;
