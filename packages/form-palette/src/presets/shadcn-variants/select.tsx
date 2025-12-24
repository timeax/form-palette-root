// noinspection DuplicatedCode

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/presets/ui/select";
import { Input } from "@/presets/ui/input";
import { Search, X } from "lucide-react";
import { globalNormalizeOptions } from "@/lib/normalise-options";

type SelectPrimitive = string | number;

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type SelectOption =
    | SelectPrimitive
    | {
          label?: React.ReactNode;
          value?: SelectPrimitive;
          description?: React.ReactNode;
          disabled?: boolean;
          [key: string]: any;
      };

type NormalizedSelectItem = {
    key: string;
    value: SelectPrimitive;
    labelNode: React.ReactNode;
    labelText: string;
    description?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    /** Option-level renderer (falls back to global renderOption) */
    render?: (...args: any[]) => React.ReactNode;
    raw: SelectOption;
};

/**
 * Shadcn-based Select variant.
 */
export interface SelectBaseProps extends Pick<
    VariantBaseProps<SelectPrimitive | undefined>,
    "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> {
    /**
     * Options for the select.
     *
     * You can pass:
     * - primitives: ["ng", "gh", "ke"]
     * - objects:    [{ label, value, ...extra }]
     */
    options?: SelectOption[];

    /**
     * Automatically capitalise the first letter of the label
     * (when the resolved label is a string).
     */
    autoCap?: boolean;

    /**
     * How to read the label from each option.
     *
     * - string → key on the option object
     * - function → custom mapper
     * - omitted → tries `label`, else String(value)
     */
    optionLabel?: string | ((item: SelectOption) => React.ReactNode);

    /**
     * How to read the value from each option.
     *
     * - string → key on the option object
     * - function → custom mapper
     * - omitted → uses `value`, or `id`, or `key`, or index
     */
    optionValue?: string | ((item: SelectOption) => SelectPrimitive);

    /**
     * Optional description line under the label.
     */
    optionDescription?: string | ((item: SelectOption) => React.ReactNode);

    /**
     * How to determine if an option is disabled.
     */
    optionDisabled?: string | ((item: SelectOption) => boolean);

    /**
     * How to extract an icon for each option.
     *
     * - string → key on the option object (default "icon")
     * - function → custom mapper
     */
    optionIcon?: string | ((item: SelectOption) => React.ReactNode);

    /**
     * How to compute the React key for each option.
     */
    optionKey?: string | ((item: SelectOption, index: number) => React.Key);

    /**
     * Enable inline search inside the dropdown.
     */
    searchable?: boolean;

    /**
     * Placeholder for the search input.
     */
    searchPlaceholder?: string;

    /**
     * Label shown when there are no options available at all.
     *
     * If omitted, falls back to `emptySearchText` or a default message.
     */
    emptyLabel?: React.ReactNode;

    /**
     * Text to show when search yields no results
     * (but there *are* options in general).
     */
    emptySearchText?: React.ReactNode;

    /**
     * Show a small clear button in the trigger when a value is selected.
     */
    clearable?: boolean;

    /**
     * Placeholder when nothing is selected.
     */
    placeholder?: React.ReactNode;

    /**
     * Wrapper class for the whole variant.
     */
    className?: string;

    /**
     * Extra classes for the SelectTrigger.
     */
    triggerClassName?: string;

    /**
     * Extra classes for the SelectContent popover.
     */
    contentClassName?: string;

    /**
     * Custom renderer for each option row.
     */
    renderOption?: (ctx: {
        item: NormalizedSelectItem;
        selected: boolean;
        index: number;
        option: React.ReactNode; // prebuilt <SelectItem> you can wrap
        click(): void;
    }) => React.ReactNode;

    /**
     * Custom renderer for the trigger value.
     */
    renderValue?: (ctx: {
        selectedItem: NormalizedSelectItem | null;
        placeholder?: React.ReactNode;
    }) => React.ReactNode;

    // ─────────────────────────────────────────────
    // Icons & controls (mirror text variant concepts)
    // ─────────────────────────────────────────────

    // (moved to default-mode props)

    /**
     * Icons displayed on the right side of the trigger,
     * near the clear button / chevron area.
     */
    trailingIcons?: React.ReactNode[];

    /**
     * Convenience single-icon prop for the left side.
     */
    icon?: React.ReactNode;

    /**
     * Base gap between icons and text.
     * Defaults to 4px-ish via `gap-1`.
     */
    iconGap?: number;

    /**
     * Extra spacing to apply between leading icons and the text.
     */
    leadingIconSpacing?: number;

    /**
     * Extra spacing to apply between trailing icons and the clear button.
     */
    trailingIconSpacing?: number;

    /**
     * Arbitrary React node rendered before the select (e.g. a button).
     */
    leadingControl?: React.ReactNode;

    /**
     * Arbitrary React node rendered after the select (e.g. a button).
     */
    trailingControl?: React.ReactNode;

    /**
     * Extra classes for the leading control wrapper.
     */
    leadingControlClassName?: string;

    /**
     * Extra classes for the trailing control wrapper.
     */
    trailingControlClassName?: string;

    /**
     * If true and there are controls, the select trigger + controls share
     * a single visual box (borders, radius, focus states).
     */
    joinControls?: boolean;

    /**
     * When joinControls is true, whether the box styling extends over controls
     * (true) or controls are visually separate (false).
     */
    extendBoxToControls?: boolean;

    // ─────────────────────────────────────────────
    // Virtual-scroll-ish incremental rendering
    // ─────────────────────────────────────────────

    /**
     * Enable incremental rendering for large option lists.
     *
     * When true, only a page of options is rendered initially,
     * and more are revealed as the user scrolls down.
     */
    virtualScroll?: boolean;

    /**
     * Number of options to render per "page" when virtualScroll is enabled.
     * Default: 50.
     */
    virtualScrollPageSize?: number;

    /**
     * Distance from the bottom (in px) at which the next page loads.
     * Default: 48px.
     */
    virtualScrollThreshold?: number;
}

type SelectDefaultModeProps = {
    mode?: "default";

    // Icons & controls (default mode only)
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

    // Not supported in default mode
    button?: never;
    children?: never;
};

type SelectButtonModeButton =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          selectedItem: NormalizedSelectItem | null;
          selectedValue: SelectPrimitive | undefined;
          placeholder?: React.ReactNode;
      }) => React.ReactNode);

type SelectButtonModeProps = {
    mode: "button";

    /**
     * Used when mode="button". If provided, this is the trigger.
     * If not provided, `children` is used.
     */
    button?: SelectButtonModeButton;
    children?: SelectButtonModeButton;

    // Icons & controls NOT supported in button mode
    leadingIcons?: never;
    trailingIcons?: never;
    icon?: never;
    iconGap?: never;
    leadingIconSpacing?: never;
    trailingIconSpacing?: never;

    leadingControl?: never;
    trailingControl?: never;
    leadingControlClassName?: never;
    trailingControlClassName?: never;

    joinControls?: never;
    extendBoxToControls?: never;
};

export type ShadcnSelectVariantProps = SelectBaseProps &
    (SelectDefaultModeProps | SelectButtonModeProps);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function normalizeOptions(
    opts: readonly SelectOption[] | undefined,
    config: Pick<
        SelectBaseProps,
        | "autoCap"
        | "optionLabel"
        | "optionValue"
        | "optionDescription"
        | "optionDisabled"
        | "optionKey"
        | "optionIcon"
    >,
): NormalizedSelectItem[] {
    return globalNormalizeOptions(opts, config);
}

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

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnSelectVariant = React.forwardRef<
    HTMLButtonElement,
    ShadcnSelectVariantProps
>(function ShadcnSelectVariant(props, _ref) {
    const {
        value,
        onValue,
        error,
        disabled,
        readOnly,
        size,
        density,

        options,

        autoCap,
        optionLabel,
        optionValue,
        optionDescription,
        optionDisabled,
        optionIcon,
        optionKey,

        searchable,
        searchPlaceholder,

        emptyLabel,
        emptySearchText,

        clearable,

        placeholder,

        className,
        triggerClassName,
        contentClassName,

        renderOption,
        renderValue,

        // Mode
        mode = "default",

        // Icons & controls
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

        // Button mode only
        button,
        children,

        // Virtual scroll / incremental render
        virtualScroll = false,
        virtualScrollPageSize = 50,
        virtualScrollThreshold = 48,
    } = props;

    const isButtonMode = mode === "button";

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");

    const items = React.useMemo(
        () =>
            normalizeOptions(options ?? [], {
                autoCap,
                optionLabel,
                optionValue,
                optionDescription,
                optionDisabled,
                optionKey,
                optionIcon,
            }),
        [
            options,
            autoCap,
            optionLabel,
            optionValue,
            optionDescription,
            optionDisabled,
            optionKey,
            optionIcon,
        ],
    );

    const valueMap = React.useMemo(() => {
        const map = new Map<string, SelectPrimitive>();
        for (const item of items) {
            map.set(String(item.value), item.value);
        }
        return map;
    }, [items]);

    const selectedItem =
        value == null ? null : (items.find((it) => it.value === value) ?? null);

    const filteredItems = React.useMemo(() => {
        if (!query) return items;
        const q = query.toLowerCase();
        return items.filter((it) => it.labelText.toLowerCase().includes(q));
    }, [items, query]);

    // ─────────────────────────────────────────────
    // Incremental render state
    // ─────────────────────────────────────────────

    const [visibleCount, setVisibleCount] = React.useState(() =>
        virtualScroll
            ? Math.min(virtualScrollPageSize, filteredItems.length)
            : filteredItems.length,
    );

    const listRef = React.useRef<HTMLDivElement | null>(null);

    // Reset visibleCount when list / filter / toggle changes
    React.useEffect(() => {
        if (!virtualScroll) {
            setVisibleCount(filteredItems.length);
            return;
        }

        setVisibleCount(Math.min(virtualScrollPageSize, filteredItems.length));
    }, [virtualScroll, filteredItems.length, virtualScrollPageSize]);

    const handleListScroll = React.useCallback(() => {
        if (!virtualScroll) return;
        const el = listRef.current;
        if (!el) return;

        const { scrollTop, scrollHeight, clientHeight } = el;
        const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

        if (distanceFromBottom <= virtualScrollThreshold) {
            setVisibleCount((prev) => {
                if (prev >= filteredItems.length) return prev;
                const next = prev + virtualScrollPageSize;
                return Math.min(next, filteredItems.length);
            });
        }
    }, [
        virtualScroll,
        filteredItems.length,
        virtualScrollPageSize,
        virtualScrollThreshold,
    ]);

    const renderedItems = React.useMemo(
        () =>
            virtualScroll
                ? filteredItems.slice(0, visibleCount)
                : filteredItems,
        [filteredItems, visibleCount, virtualScroll],
    );

    const handleChange = React.useCallback(
        (rawKey: string) => {
            if (!onValue) return;

            const primitive =
                valueMap.get(rawKey) ?? (rawKey as unknown as SelectPrimitive);

            const item =
                items.find((it) => String(it.value) === String(primitive)) ??
                null;

            const detail: ChangeDetail = {
                source: "variant",
                raw: item?.raw ?? primitive,
                nativeEvent: undefined,
                meta: undefined,
            };

            onValue(primitive, detail);
        },
        [onValue, valueMap, items],
    );

    const currentKey = selectedItem != null ? String(selectedItem.value) : "";

    const heightCls = triggerHeight(size as Size | undefined);
    const padCls = triggerPadding(density as Density | undefined);

    const showClear = clearable && value != null;

    // ─────────────────────────────────────────────
    // Icons setup (similar to text variant)
    // ─────────────────────────────────────────────

    const resolvedLeadingIcons: React.ReactNode[] = (() => {
        if (isButtonMode) return [];
        if (leadingIcons && leadingIcons.length) return leadingIcons;
        if (icon) return [icon];
        return [];
    })();

    const resolvedTrailingIcons: React.ReactNode[] = isButtonMode
        ? []
        : (trailingIcons ?? []);

    const baseIconGap = iconGap ?? 4;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const hasLeadingIcons = resolvedLeadingIcons.length > 0;
    const hasTrailingIcons = resolvedTrailingIcons.length > 0;

    const hasLeadingControl = !isButtonMode && !!leadingControl;
    const hasTrailingControl = !isButtonMode && !!trailingControl;
    const hasControls = hasLeadingControl || hasTrailingControl;

    const triggerInner = renderValue ? (
        renderValue({
            selectedItem,
            placeholder,
        })
    ) : selectedItem ? (
        <span className="truncate flex items-center gap-2">
            {selectedItem.icon && (
                <span className="shrink-0">{selectedItem.icon}</span>
            )}
            <span className="truncate">{selectedItem.labelNode}</span>
        </span>
    ) : (
        <span className="truncate text-muted-foreground">
            {placeholder ?? "Select..."}
        </span>
    );

    const baseBoxClasses = cn(
        "border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs",
        "transition-[color,box-shadow] outline-none",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    );

    const ButtonModeTrigger = React.useMemo(() => {
        if (!isButtonMode) return null;

        const selectedValue = value as SelectPrimitive | undefined;
        const renderable = button ?? children;

        const content: React.ReactNode = (() => {
            if (typeof renderable === "function") {
                return renderable({
                    open,
                    selectedItem,
                    selectedValue,
                    placeholder,
                });
            }

            if (renderable != null) return renderable;

            // Default fallback:
            // - if options have icons, show selected icon (or first icon)
            // - else show simple label
            const iconNode =
                selectedItem?.icon ?? items.find((it) => it.icon)?.icon ?? null;

            if (iconNode) {
                return (
                    <span className="inline-flex items-center justify-center">
                        {iconNode}
                    </span>
                );
            }

            return (
                <span className="truncate">
                    {selectedItem?.labelNode ?? placeholder ?? "Select..."}
                </span>
            );
        })();

        // Important: SelectTrigger wants a single element child when asChild.
        // Use a button by default to keep it accessible.
        return (
            <button
                ref={_ref}
                type="button"
                disabled={disabled || readOnly}
                className={cn(
                    "inline-flex items-center justify-center",
                    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                    triggerClassName,
                )}
                aria-label={
                    selectedItem?.labelText
                        ? `Selected: ${selectedItem.labelText}`
                        : "Select"
                }
            >
                {content}
            </button>
        );
    }, [
        isButtonMode,
        button,
        children,
        open,
        selectedItem,
        value,
        placeholder,
        items,
        disabled,
        readOnly,
        triggerClassName,
        _ref,
    ]);
    // Trigger content (inner layout: icons + label + clear + trailing icons)
    const TriggerBody = isButtonMode ? (
        <SelectTrigger asChild>{ButtonModeTrigger}</SelectTrigger>
    ) : (
        <SelectTrigger
            onPointerDown={(e) => {
                if (e.target instanceof HTMLButtonElement) {
                    if (e.target.getAttribute("data-slot") == "clear") {
                        e.preventDefault();
                        e.stopPropagation();
                        if (!onValue) return;
                        const detail: ChangeDetail = {
                            source: "variant",
                            raw: undefined,
                            nativeEvent: undefined,
                            meta: { action: "clear" },
                        };
                        onValue(undefined, detail);
                    }
                }
            }}
            className={cn(
                "w-full justify-between",
                heightCls,
                padCls,
                hasControls && joinControls && extendBoxToControls
                    ? "border-none shadow-none focus:ring-0 focus:outline-none"
                    : "",
                triggerClassName,
            )}
        >
            <div className="flex w-full items-center justify-between gap-2">
                {/* Left side: leading icons + label */}
                <div className="flex min-w-0 items-center gap-2">
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
                    <div className="min-w-0 flex-1">{triggerInner}</div>
                </div>

                {/* Right side: clear button + trailing icons */}
                <div className="flex items-center gap-1 shrink-0">
                    {showClear && (
                        <button
                            data-slot={"clear"}
                            type="button"
                            aria-label="Clear selection"
                            className="flex h-4 w-4 items-center justify-center rounded hover:bg-muted"
                        >
                            <X className="h-3 w-3 pointer-events-none" />
                        </button>
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
                </div>
            </div>
        </SelectTrigger>
    );

    const SelectWithTrigger = (
        <Select
            value={currentKey}
            onValueChange={handleChange}
            disabled={disabled || readOnly}
            open={open}
            onOpenChange={(nextOpen) => {
                setOpen(nextOpen);
                if (!nextOpen) setQuery("");
            }}
        >
            {TriggerBody}

            <SelectContent className={cn("min-w-32", contentClassName)}>
                {searchable && (
                    <div className="p-1">
                        <Input
                            autoFocus
                            icon={<Search className="size-4" />}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder ?? "Search..."}
                            size={size}
                            density={density}
                        />
                    </div>
                )}

                {/* CASE 1: no options at all */}
                {items.length === 0 ? (
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                        {emptyLabel ??
                            emptySearchText ??
                            "No options available"}
                    </div>
                ) : /* CASE 2: have options, but search filters everything out */ filteredItems.length ===
                  0 ? (
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">
                        {emptySearchText ?? "No results found"}
                    </div>
                ) : (
                    // CASE 3: normal list, possibly virtually paged
                    <div
                        ref={listRef}
                        className="max-h-60 overflow-auto"
                        onScroll={handleListScroll}
                    >
                        {renderedItems.map((item, index) => {
                            const optionNode = (
                                <SelectItem
                                    key={item.key}
                                    value={String(item.value)}
                                    disabled={item.disabled}
                                >
                                    <div className="flex items-start gap-2">
                                        {item.icon && (
                                            <span className="mt-0.5 shrink-0">
                                                {item.icon}
                                            </span>
                                        )}
                                        <div className="flex flex-col">
                                            <span>{item.labelNode}</span>
                                            {item.description && (
                                                <span className="text-xs text-muted-foreground">
                                                    {item.description}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </SelectItem>
                            );

                            // Prefer per-option renderer (normalized) if present; fall back to global renderOption
                            const renderer =
                                (item as any).render ?? renderOption;

                            if (!renderer) return optionNode;

                            return renderer({
                                item,
                                selected:
                                    selectedItem != null &&
                                    String(selectedItem.value) ===
                                        String(item.value),
                                index,
                                option: optionNode,
                                click() {
                                    if (disabled || readOnly || item.disabled)
                                        return;
                                    handleChange(String(item.value));
                                    setOpen(false);
                                    setQuery("");
                                },
                            });
                        })}

                        {virtualScroll &&
                            renderedItems.length < filteredItems.length && (
                                <div className="px-2 py-1 text-[10px] text-muted-foreground text-center">
                                    Scroll to load more…
                                </div>
                            )}
                    </div>
                )}
            </SelectContent>
        </Select>
    );

    // ─────────────────────────────────────────────
    // Layout modes:
    // - no controls
    // - controls + joinControls
    // - controls, separate boxes
    // ─────────────────────────────────────────────

    // CASE 1: button mode OR no controls → just the select
    if (isButtonMode || !hasControls) {
        return (
            <div
                data-slot="select-field"
                className={cn(
                    "w-full",
                    disabled && "opacity-50 cursor-not-allowed",
                    className,
                )}
                aria-disabled={disabled || undefined}
                aria-invalid={error ? "true" : undefined}
            >
                {SelectWithTrigger}
            </div>
        );
    }

    // CASE 2: controls + joinControls → share single box like text variant
    if (joinControls) {
        const groupClassName = cn(
            "flex items-stretch w-full",
            extendBoxToControls &&
                cn(
                    "relative",
                    baseBoxClasses, // ring via :focus-within
                ),
            !extendBoxToControls &&
                "relative border-none shadow-none bg-transparent",
            className,
        );

        return (
            <div
                data-slot="select-field"
                className="w-full"
                aria-disabled={disabled || undefined}
                aria-invalid={error ? "true" : undefined}
            >
                <div
                    className={groupClassName}
                    data-slot="select-group"
                    data-disabled={disabled ? "true" : "false"}
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
                        className={cn("flex-1 min-w-0 flex items-stretch")}
                        data-slot="select-region"
                    >
                        {SelectWithTrigger}
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

    // CASE 3: controls present, but separate (no joined box)
    return (
        <div
            data-slot="select-field"
            className={cn(
                "flex items-stretch w-full",
                disabled && "opacity-50 cursor-not-allowed",
                className,
            )}
            aria-disabled={disabled || undefined}
            aria-invalid={error ? "true" : undefined}
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

            <div className="flex-1 min-w-0">{SelectWithTrigger}</div>

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
});

ShadcnSelectVariant.displayName = "ShadcnSelectVariant";

export default ShadcnSelectVariant;
