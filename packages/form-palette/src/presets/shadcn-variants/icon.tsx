// src/presets/shadcn-variants/icon.tsx
// noinspection DuplicatedCode

import * as React from "react";
import type { VariantBaseProps } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { Badge } from "@/presets/ui/badge";
import {
    AlertCircle,
    ChevronDown,
    LayoutGrid,
    Loader2,
    Plus,
    Search,
    X,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { getPaletteUtil } from "@/lib/register-global";
import { VirtuosoGrid } from "react-virtuoso";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/presets/ui/select"; // ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type IconGroup = {
    id: string; // stable key for selection/filtering
    label: string;
    prefixes: string[]; // iconify prefixes to load
};

/**
 * Iconify /collection response (we only need these keys)
 * https://iconify.design/docs/api/collection.html
 */
type IconifyCollectionResponse = {
    prefix?: string;
    uncategorized?: string[];
    categories?: Record<string, string[]>;
    hidden?: string[];
};

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────

export const DEFAULT_ICONIFY_URL = "https://api.iconify.design";

export const DEFAULT_GROUPS: IconGroup[] = [
    { id: "material", label: "Material Design Icons", prefixes: ["mdi"] },
    {
        id: "material-outline",
        label: "Material Icons (Google)",
        prefixes: ["ic"],
    },
    { id: "lucide", label: "Lucide", prefixes: ["lucide"] },
    { id: "tabler", label: "Tabler", prefixes: ["tabler"] },
    { id: "phosphor", label: "Phosphor", prefixes: ["ph"] },
    { id: "remix", label: "Remix Icon", prefixes: ["ri"] },
    { id: "bootstrap", label: "Bootstrap Icons", prefixes: ["bi"] },
    {
        id: "heroicons",
        label: "Heroicons",
        prefixes: ["heroicons-outline", "heroicons-solid"],
    },
    { id: "carbon", label: "Carbon", prefixes: ["carbon"] },
    {
        id: "fa",
        label: "Font Awesome",
        prefixes: ["fa-solid", "fa-regular", "fa-brands"],
    },
    { id: "ionicons", label: "Ionicons", prefixes: ["ion"] },
    { id: "simple-icons", label: "Simple Icons", prefixes: ["simple-icons"] },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function uniq<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}

/** ✅ Exact trigger height contract (same as file variant spec) */
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

/** Keep chips safely within the trigger height */
function chipHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "h-5";
        case "lg":
            return "h-7";
        default:
            return "h-6";
    }
}

/** Picker button sizing that fits inside each trigger height */
function pickerBtnSize(size?: Size) {
    switch (size) {
        case "sm":
            return "h-6 w-6";
        case "lg":
            return "h-8 w-8";
        default:
            return "h-7 w-7";
    }
}

function densityTokens(density?: Density) {
    switch (density) {
        case "compact":
            return {
                triggerPadX: "px-2",
                triggerGap: "gap-1.5",
                headerPad: "px-3 py-1.5",
                bodyPad: "p-2",
                listPad: "p-1",
                footerPad: "p-1",
                chipPad: "px-1",
                chipGap: "gap-1",
            };
        case "loose":
            return {
                triggerPadX: "px-4",
                triggerGap: "gap-3",
                headerPad: "px-4 py-2.5",
                bodyPad: "p-3",
                listPad: "p-2",
                footerPad: "p-2",
                chipPad: "px-2",
                chipGap: "gap-2",
            };
        default:
            return {
                triggerPadX: "px-3",
                triggerGap: "gap-2",
                headerPad: "px-3 py-2",
                bodyPad: "p-2.5",
                listPad: "p-1",
                footerPad: "p-1",
                chipPad: "px-1.5",
                chipGap: "gap-1.5",
            };
    }
}

function mergeHandlers<E>(
    a: ((e: E) => void) | undefined,
    b: ((e: E) => void) | undefined,
) {
    if (!a) return b;
    if (!b) return a;
    return (e: E) => {
        a(e);
        b(e);
    };
}

// ─────────────────────────────────────────────
// Cache (prefix list)
// ─────────────────────────────────────────────

const collectionCache = new Map<string, string[]>(); // key: `${url}::${prefix}` -> ["home", "account", ...]
const inflightCache = new Map<string, Promise<string[]>>();

async function fetchCollectionIcons(opts: {
    url: string;
    prefix: string;
    signal?: AbortSignal;
}): Promise<string[]> {
    const key = `${opts.url}::${opts.prefix}`;

    const cached = collectionCache.get(key);
    if (cached) return cached;

    const inflight = inflightCache.get(key);
    if (inflight) return inflight;

    const run = (async () => {
        const res = await fetch(
            `${opts.url.replace(/\/+$/, "")}/collection?prefix=${encodeURIComponent(opts.prefix)}`,
            { signal: opts.signal },
        );

        if (!res.ok) {
            throw new Error(
                `Failed to load "${opts.prefix}" (HTTP ${res.status})`,
            );
        }

        const json = (await res.json()) as IconifyCollectionResponse;

        const names = new Set<string>();
        (json.uncategorized ?? []).forEach((n) => names.add(n));
        Object.values(json.categories ?? {}).forEach((arr) =>
            arr.forEach((n) => names.add(n)),
        );

        // exclude hidden icons
        (json.hidden ?? []).forEach((n) => names.delete(n));

        const out = Array.from(names);
        collectionCache.set(key, out);
        return out;
    })();

    inflightCache.set(key, run);

    try {
        return await run;
    } finally {
        inflightCache.delete(key);
    }
}

// ─────────────────────────────────────────────
// IconPickerPanel (exported; usable by composed variants)
// ─────────────────────────────────────────────

export type IconPickerPanelProps = {
    url: string;
    groups: IconGroup[];
    allowedGroupIds?: string[];

    multiple: boolean;
    value: string[];
    onValue: (next: string[]) => void;

    density?: Density;

    /** Close popover on pick (usually in single mode) */
    onPicked?: () => void;

    /** max items rendered (safety; prevents DOM meltdown on huge sets) */
    maxRender?: number;
};

export function IconPickerPanel(props: IconPickerPanelProps) {
    const {
        url,
        groups: groupsProp,
        allowedGroupIds,
        multiple,
        value,
        onValue,
        density = "comfortable",
        onPicked,
        maxRender = 2500,
    } = props;

    const den = densityTokens(density);

    const groups = React.useMemo(() => {
        const base = groupsProp ?? [];
        if (!allowedGroupIds?.length) return base;
        const allowed = base.filter((g) => allowedGroupIds.includes(g.id));
        return allowed.length ? allowed : base;
    }, [allowedGroupIds, groupsProp]);

    const prefixes = React.useMemo(() => {
        return uniq(groups.flatMap((g) => g.prefixes).filter(Boolean));
    }, [groups]);

    const [selectedGroupId, setSelectedGroupId] = React.useState<
        string | undefined
    >(() => groups[0]?.id);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [allIcons, setAllIcons] = React.useState<string[]>([]);

    // keep group valid when groups list changes
    React.useEffect(() => {
        setSelectedGroupId((prev) => {
            if (!prev) return groups[0]?.id;
            const exists = groups.some((g) => g.id === prev);
            return exists ? prev : groups[0]?.id;
        });
    }, [groups]);

    React.useEffect(() => {
        const controller = new AbortController();
        let mounted = true;

        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const missing = prefixes.filter(
                    (p) => !collectionCache.has(`${url}::${p}`),
                );

                await Promise.all(
                    missing.map((prefix) =>
                        fetchCollectionIcons({
                            url,
                            prefix,
                            signal: controller.signal,
                        }),
                    ),
                );

                const full: string[] = [];
                for (const prefix of prefixes) {
                    const names =
                        collectionCache.get(`${url}::${prefix}`) ?? [];
                    for (const n of names) full.push(`${prefix}:${n}`);
                }

                if (mounted) setAllIcons(full);
            } catch (e: any) {
                if (e?.name === "AbortError") return;
                if (!mounted) return;
                setError(e?.message ?? "Failed to load icons");
                setAllIcons([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };

        if (prefixes.length) load();
        else setAllIcons([]);

        return () => {
            mounted = false;
            controller.abort();
        };
    }, [prefixes, url]);

    const selectedGroup = React.useMemo(
        () => groups.find((g) => g.id === selectedGroupId),
        [groups, selectedGroupId],
    );

    const selectedGroupPrefixes = React.useMemo(() => {
        if (!selectedGroup) return undefined; // means "no group filter"
        return new Set(selectedGroup.prefixes);
    }, [selectedGroup]);

    const filteredIcons = React.useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        let list = allIcons;

        if (selectedGroupPrefixes) {
            list = list.filter((i) =>
                selectedGroupPrefixes.has(i.split(":")[0] ?? ""),
            );
        }

        if (q) {
            list = list.filter((i) => i.toLowerCase().includes(q));
        }

        return list;
    }, [allIcons, searchQuery, selectedGroupPrefixes]);

    const limitedIcons = React.useMemo(() => {
        if (filteredIcons.length <= maxRender) return filteredIcons;
        return filteredIcons.slice(0, maxRender);
    }, [filteredIcons, maxRender]);

    const toggle = (iconName: string) => {
        if (!multiple) {
            onValue([iconName]);
            onPicked?.();
            return;
        }

        onValue(
            value.includes(iconName)
                ? value.filter((x) => x !== iconName)
                : [...value, iconName],
        );
    };

    // VirtuosoGrid scaffolding
    const GridComponents = React.useMemo(
        () => ({
            List: (p: any) => (
                <div
                    {...p}
                    className={cn("grid grid-cols-3 gap-2 p-1", p.className)}
                />
            ),
            Item: (p: any) => (
                <div {...p} className={cn("flex", p.className)} />
            ),
        }),
        [],
    );

    const gridHeightStyle = React.useMemo<React.CSSProperties>(
        () => ({ height: "50vh" }),
        [],
    );

    return (
        <div className="flex flex-col">
            {/* Controls */}
            <div className={cn("flex items-center gap-2", den.bodyPad)}>
                <div className="relative flex-1 min-w-0">
                    <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search icons..."
                        className={cn(
                            "h-9 w-full rounded-md border border-input bg-surfaces-input pl-8 pr-3 text-sm outline-none ring-offset-background",
                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        )}
                    />
                </div>

                <Select
                    value={selectedGroupId ?? ""}
                    onValueChange={setSelectedGroupId}
                >
                    <SelectTrigger>
                        <SelectValue placeholder={"Select group..."} />
                    </SelectTrigger>
                    <SelectContent>
                        {groups.map((g) => (
                            <SelectItem key={g.id} value={g.id}>
                                {g.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Status */}
            {error && (
                <div className="px-3 pb-2 text-xs text-destructive flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span className="truncate">{error}</span>
                </div>
            )}

            {/* Grid (virtualized) */}
            <div className={cn("w-full", den.listPad)}>
                {loading ? (
                    <div
                        style={gridHeightStyle}
                        className="flex items-center justify-center text-xs text-muted-foreground gap-2"
                    >
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading icons…
                    </div>
                ) : limitedIcons.length ? (
                    <div>
                        {filteredIcons.length > limitedIcons.length && (
                            <div className="px-2 pb-2 text-[11px] text-muted-foreground">
                                Showing first{" "}
                                {limitedIcons.length.toLocaleString()} of{" "}
                                {filteredIcons.length.toLocaleString()} results
                                (refine search to narrow).
                            </div>
                        )}

                        <VirtuosoGrid
                            style={gridHeightStyle}
                            data={limitedIcons}
                            components={GridComponents as any}
                            overscan={800}
                            itemContent={(_, iconName) => {
                                const isSelected = value.includes(iconName);

                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        onClick={() => toggle(iconName)}
                                        className={cn(
                                            "group flex min-h-16 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-sm border bg-card p-2 text-left transition-colors hover:bg-accent",
                                            isSelected &&
                                                "border-primary bg-primary/10",
                                        )}
                                    >
                                        <Icon
                                            icon={iconName}
                                            className="size-8"
                                        />
                                        <span className="line-clamp-2 text-center text-[11px] text-muted-foreground group-hover:text-foreground">
                                            {iconName.split(":")[1] ?? iconName}
                                        </span>
                                    </button>
                                );
                            }}
                        />
                    </div>
                ) : (
                    <div
                        style={gridHeightStyle}
                        className="flex items-center justify-center text-xs text-muted-foreground"
                    >
                        No icons found
                    </div>
                )}
            </div>

            {/* Footer */}
            <div
                className={cn(
                    "border-t flex items-center justify-between",
                    den.footerPad,
                )}
            >
                <span className="text-xs text-muted-foreground">
                    {multiple
                        ? `${value.length} selected`
                        : value[0]
                          ? "Selected"
                          : "No selection"}
                </span>

                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => onValue([])}
                    disabled={!value.length}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
}
// ─────────────────────────────────────────────
// Props (with mode discriminator)
// ─────────────────────────────────────────────

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

type IconValue = string | string[] | null | undefined;

type IconVariantBaseProps = Pick<
    VariantBaseProps<IconValue>,
    "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> & {
    /** When true, form value becomes string[]; else string */
    multiple?: boolean;

    /** Iconify API base url. Defaults to registry.iconPicker.url then Iconify default */
    url?: string;

    /** Groups available. Defaults to registry.iconPicker.groups then built-in defaults */
    groups?: IconGroup[];

    /** Restrict selectable groups by group id */
    allowedGroupIds?: string[];

    /** Search/group panel grid limit */
    maxRender?: number;

    placeholder?: string;

    className?: string;
    triggerClassName?: string;
    popoverClassName?: string;

    // drag/drop not meaningful here, but we keep file-variant parity for button triggers.
    // (No-op, but event merging is used to enhance custom triggers.)
};

type IconDefaultModeProps = {
    mode?: "default";

    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;
    joinControls?: boolean;
    extendBoxToControls?: boolean;

    // not supported in default mode
    button?: never;
    children?: never;

    selectedBadge?: never;
    selectedBadgeHiddenWhenZero?: never;
    selectedBadgeVariant?: never;
    selectedBadgeClassName?: never;
    selectedBadgePlacement?: never;
};

type IconButtonTrigger =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          items: string[];
          selectedCount: number;
          disabled: boolean;
      }) => React.ReactNode);

type IconButtonModeProps = {
    mode: "button";

    /** Used when mode="button". If provided, this is the trigger. If not, `children` is used. */
    button?: IconButtonTrigger;
    children?: IconButtonTrigger;

    /** Selected-count badge (mode="button" only) */
    selectedBadge?: boolean;
    selectedBadgeHiddenWhenZero?: boolean;
    selectedBadgeVariant?: BadgeVariant;
    selectedBadgeClassName?: string;
    selectedBadgePlacement?: "end" | "corner";

    // icons & controls NOT supported in button mode
    leadingIcons?: never;
    trailingIcons?: never;
    icon?: never;

    leadingControl?: never;
    trailingControl?: never;
    leadingControlClassName?: never;
    trailingControlClassName?: never;
    joinControls?: never;
    extendBoxToControls?: never;
};

export type ShadcnIconVariantProps = IconVariantBaseProps &
    (IconDefaultModeProps | IconButtonModeProps);

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export const ShadcnIconVariant = React.forwardRef<
    HTMLDivElement,
    ShadcnIconVariantProps
>(function ShadcnIconVariant(props, ref) {
    const {
        value,
        onValue,
        disabled,
        readOnly,
        error,
        size = "md",
        density = "comfortable",

        multiple = false,
        url: urlProp,
        groups: groupsProp,
        allowedGroupIds,
        maxRender,

        placeholder = "Select icon…",
        className,
        triggerClassName,
        popoverClassName,

        // default-mode only
        leadingIcons,
        trailingIcons,
        icon,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        joinControls: joinControlsProp,
        extendBoxToControls: extendBoxToControlsProp,

        // button-mode only
        mode = "default",
        button,
        children,
        selectedBadge = true,
        selectedBadgeHiddenWhenZero = true,
        selectedBadgeVariant = "secondary",
        selectedBadgeClassName,
        selectedBadgePlacement = "corner",
    } = props as ShadcnIconVariantProps & Record<string, any>;

    const joinControls =
        mode === "default" ? (joinControlsProp ?? true) : false;
    const extendBoxToControls =
        mode === "default" ? (extendBoxToControlsProp ?? true) : false;

    const isDisabled = Boolean(disabled || readOnly);

    // registry config fallback
    const reg = getPaletteUtil("iconPicker");
    const url = urlProp ?? reg?.url ?? DEFAULT_ICONIFY_URL;
    const groups = groupsProp ?? reg?.groups ?? DEFAULT_GROUPS;

    const den = densityTokens(density as Density);
    const heightCls = triggerHeight(size as Size);
    const chipHeightCls = chipHeight(size as Size);
    const pickerBtnCls = pickerBtnSize(size as Size);

    const resolvedLeadingIcons = (
        leadingIcons?.length ? leadingIcons : icon ? [icon] : []
    ) as React.ReactNode[];
    const resolvedTrailingIcons = (
        trailingIcons?.length ? trailingIcons : []
    ) as React.ReactNode[];
    const hasExternalControls = !!leadingControl || !!trailingControl;

    const [popoverOpen, setPopoverOpen] = React.useState(false);

    const selected = React.useMemo<string[]>(() => {
        if (multiple) return Array.isArray(value) ? value.filter(Boolean) : [];
        return typeof value === "string" && value ? [value] : [];
    }, [multiple, value]);

    const emit = React.useCallback(
        (nextArr: string[], meta: any) => {
            if (!onValue) return;

            if (multiple) {
                onValue(nextArr, {
                    source: "variant",
                    raw: nextArr,
                    nativeEvent: undefined,
                    meta,
                });
            } else {
                onValue(nextArr[0] ?? undefined, {
                    source: "variant",
                    raw: nextArr[0] ?? undefined,
                    nativeEvent: undefined,
                    meta,
                });
            }
        },
        [multiple, onValue],
    );

    // ─────────────────────────────────────────────
    // UI Pieces: Chip (mini)
    // ─────────────────────────────────────────────

    const Chip = React.useCallback(
        ({ iconName }: { iconName: string }) => {
            const short = iconName.split(":")[1] ?? iconName;

            return (
                <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                        "flex items-center overflow-hidden rounded-sm border bg-muted/60 text-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none cursor-pointer",
                        chipHeightCls,
                        den.chipPad,
                        den.chipGap,
                        "max-w-50",
                    )}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        // in trigger we don't open anything per-chip; popover is global
                        setPopoverOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            setPopoverOpen(true);
                        }
                    }}
                >
                    <Icon
                        icon={iconName}
                        className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                    />
                    <span className="truncate font-medium">{short}</span>

                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            emit(
                                selected.filter((x) => x !== iconName),
                                {
                                    action: "remove",
                                    icon: iconName,
                                },
                            );
                        }}
                        className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 hover:bg-destructive/20 hover:text-destructive focus:outline-none"
                        aria-label="Remove icon"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            );
        },
        [chipHeightCls, den.chipGap, den.chipPad, emit, selected],
    );

    // ─────────────────────────────────────────────
    // Button-mode trigger (with badge)
    // ─────────────────────────────────────────────

    const selectedCount = selected.length;

    const resolveButtonTriggerElement =
        React.useCallback((): React.ReactElement => {
            const ctx = {
                open: popoverOpen,
                items: selected,
                selectedCount,
                disabled: isDisabled,
            };

            const rawNode =
                typeof button === "function"
                    ? button(ctx)
                    : (button ??
                      (typeof children === "function"
                          ? children(ctx)
                          : children));

            const shouldShowBadge =
                Boolean(selectedBadge) &&
                (!selectedBadgeHiddenWhenZero || selectedCount > 0);

            const badgeEl = shouldShowBadge ? (
                <Badge
                    variant={selectedBadgeVariant}
                    className={cn(
                        "text-[10px] h-5 px-1.5 leading-none",
                        selectedBadgePlacement === "corner" &&
                            "absolute -top-2 -right-2",
                        selectedBadgeClassName,
                    )}
                >
                    {selectedCount}
                </Badge>
            ) : null;

            const injectBadgeIntoElement = (el: React.ReactElement<any>) => {
                if (!badgeEl) return el;

                const existingClass = (el.props as any).className as
                    | string
                    | undefined;
                const nextClass = cn(
                    existingClass,
                    selectedBadgePlacement === "corner" && "relative",
                );

                const child = (el.props as any).children;

                if (selectedBadgePlacement === "end") {
                    return React.cloneElement(el, {
                        className: nextClass,
                        children: (
                            <span className="inline-flex items-center gap-2">
                                <span className="min-w-0">{child}</span>
                                {badgeEl}
                            </span>
                        ),
                    } as any);
                }

                return React.cloneElement(el, {
                    className: nextClass,
                    children: (
                        <>
                            {child}
                            {badgeEl}
                        </>
                    ),
                } as any);
            };

            const withNoopDnD = (el: React.ReactElement<any>) =>
                React.cloneElement(el, {
                    // keep event-merging parity with file variant (no-op, but safe)
                    onDragOver: mergeHandlers(
                        (el.props as any).onDragOver,
                        (e: any) => e?.preventDefault?.(),
                    ),
                    onDrop: mergeHandlers((el.props as any).onDrop, (e: any) =>
                        e?.preventDefault?.(),
                    ),
                } as any);

            if (React.isValidElement(rawNode))
                return withNoopDnD(injectBadgeIntoElement(rawNode));

            const fallback = (
                <button
                    type="button"
                    disabled={isDisabled}
                    className={cn(
                        triggerClassName,
                        selectedBadgePlacement === "corner" && "relative",
                    )}
                >
                    {rawNode ?? <span>{placeholder}</span>}
                    {badgeEl}
                </button>
            );

            if (badgeEl && selectedBadgePlacement === "end") {
                return (
                    <button
                        type="button"
                        disabled={isDisabled}
                        className={cn(triggerClassName)}
                    >
                        <span className="inline-flex items-center gap-2">
                            <span className="min-w-0">
                                {rawNode ?? <span>{placeholder}</span>}
                            </span>
                            {badgeEl}
                        </span>
                    </button>
                );
            }

            return fallback;
        }, [
            button,
            children,
            isDisabled,
            placeholder,
            popoverOpen,
            selected,
            selectedBadge,
            selectedBadgeClassName,
            selectedBadgeHiddenWhenZero,
            selectedBadgePlacement,
            selectedBadgeVariant,
            selectedCount,
            triggerClassName,
        ]);

    // ─────────────────────────────────────────────
    // Trigger Region
    // ─────────────────────────────────────────────

    const COLLAPSE_LIMIT = 2;

    const TriggerRegion = React.useMemo(() => {
        const hasItems = selected.length > 0;
        const visibleItems = selected.slice(0, COLLAPSE_LIMIT);
        const hiddenCount = selected.length - COLLAPSE_LIMIT;
        const isOverflowing = hiddenCount > 0;

        const TriggerEl =
            mode === "button" ? (
                resolveButtonTriggerElement()
            ) : (
                <div
                    className={cn(
                        "relative flex w-full cursor-pointer items-center py-0 transition-all",
                        heightCls,
                        den.triggerPadX,
                        den.triggerGap,
                        (!joinControls || !hasExternalControls) &&
                            "rounded-md border border-input bg-surfaces-input ring-offset-background hover:bg-accent/5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        isDisabled && "cursor-not-allowed opacity-50",
                        error &&
                            (!joinControls || !hasExternalControls) &&
                            "border-destructive text-destructive",
                        triggerClassName,
                    )}
                    onClick={() => !isDisabled && setPopoverOpen(true)}
                >
                    {/* Leading Icons */}
                    {resolvedLeadingIcons.map((ico, i) => (
                        <span
                            key={i}
                            className="flex shrink-0 items-center justify-center text-muted-foreground"
                        >
                            {ico}
                        </span>
                    ))}

                    {/* Content: Chips or Placeholder */}
                    <div
                        className={cn(
                            "flex flex-1 items-center overflow-hidden",
                            den.triggerGap,
                        )}
                    >
                        {hasItems ? (
                            <>
                                {visibleItems.map((iconName) => (
                                    <Chip key={iconName} iconName={iconName} />
                                ))}
                                {isOverflowing && (
                                    <span className="flex h-5 items-center justify-center rounded-sm bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                                        +{hiddenCount}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="truncate text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </div>

                    {/* Trailing Icons */}
                    {resolvedTrailingIcons.map((ico, i) => (
                        <span
                            key={i}
                            className="flex shrink-0 items-center justify-center text-muted-foreground"
                        >
                            {ico}
                        </span>
                    ))}

                    {/* Dedicated Picker Button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "shrink-0 text-muted-foreground hover:text-foreground",
                            pickerBtnCls,
                        )}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            setPopoverOpen(true);
                        }}
                    >
                        <LayoutGrid className="h-4 w-4" />
                    </Button>

                    {/* Chevron (for Popover) */}
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground opacity-50 transition-transform duration-200",
                            popoverOpen && "rotate-180",
                        )}
                    />
                </div>
            );

        return (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>{TriggerEl}</PopoverTrigger>

                <PopoverContent
                    className={cn(
                        "w-(--radix-popover-trigger-width) p-0",
                        popoverClassName,
                    )}
                    align="start"
                >
                    <div className="flex flex-col">
                        {/* Header */}
                        <div
                            className={cn(
                                "flex items-center justify-between border-b text-xs font-medium text-muted-foreground",
                                den.headerPad,
                            )}
                        >
                            <span>
                                {multiple
                                    ? `${selected.length} selected`
                                    : selected[0]
                                      ? "1 selected"
                                      : "No selection"}
                            </span>

                            {selected.length > 0 ? (
                                <button
                                    type="button"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={() =>
                                        emit([], { action: "clear" })
                                    }
                                >
                                    Clear
                                </button>
                            ) : null}
                        </div>

                        <IconPickerPanel
                            url={url}
                            groups={groups}
                            allowedGroupIds={allowedGroupIds}
                            multiple={multiple}
                            density={density as Density}
                            value={selected}
                            maxRender={maxRender}
                            onPicked={() => setPopoverOpen(false)}
                            onValue={(next) => emit(next, { action: "set" })}
                        />

                        {/* Footer add hint (parity with file variant) */}
                        <div className={cn("border-t", den.footerPad)}>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => {
                                    // focus search by opening; panel is already open
                                }}
                            >
                                <Plus className="mr-2 h-3 w-3" />
                                {multiple ? "Pick icons..." : "Pick an icon"}
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }, [
        Chip,
        COLLAPSE_LIMIT,
        allowedGroupIds,
        den.footerPad,
        den.headerPad,
        den.triggerGap,
        den.triggerPadX,
        density,
        emit,
        error,
        groups,
        hasExternalControls,
        heightCls,
        isDisabled,
        joinControls,
        maxRender,
        mode,
        multiple,
        pickerBtnCls,
        placeholder,
        popoverClassName,
        popoverOpen,
        resolveButtonTriggerElement,
        resolvedLeadingIcons,
        resolvedTrailingIcons,
        selected,
        setPopoverOpen,
        triggerClassName,
        url,
    ]);

    // ─────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────

    const joinedBox = mode === "default" && joinControls && extendBoxToControls;

    return (
        <div
            ref={ref}
            className={cn("w-full", className)}
            aria-disabled={isDisabled}
            aria-invalid={!!error}
        >
            <div
                className={cn(
                    "flex w-full",
                    joinedBox
                        ? "items-stretch rounded-md border border-input bg-surfaces-input shadow-xs ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        : "items-start",
                    joinedBox && error && "border-destructive",
                )}
            >
                {mode === "default" && leadingControl && (
                    <div
                        className={cn(
                            "flex items-center",
                            joinControls && "border-r bg-muted/50 px-3",
                            leadingControlClassName,
                        )}
                    >
                        {leadingControl}
                    </div>
                )}

                <div className="flex-1 min-w-0">{TriggerRegion}</div>

                {mode === "default" && trailingControl && (
                    <div
                        className={cn(
                            "flex items-center",
                            joinControls && "border-l bg-muted/50 px-3",
                            trailingControlClassName,
                        )}
                    >
                        {trailingControl}
                    </div>
                )}
            </div>
        </div>
    );
});

ShadcnIconVariant.displayName = "ShadcnIconVariant";
export default ShadcnIconVariant;
