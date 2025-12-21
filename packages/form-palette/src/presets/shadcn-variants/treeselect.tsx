import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/presets/ui/checkbox";
import { Badge } from "@/presets/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/presets/ui/popover";
import {
    ChevronDown,
    ChevronRight,
    Search,
    X,
    Folder,
    FolderOpen,
    File,
    Check,
} from "lucide-react";
import { normalizeTree, type NormalizedTreeItemWithRender } from "@/lib/normalise-options";
import {
    NormalizedTreeItem,
    TreeKey,
    TreeSelectOption,
    TreeValue,
} from "@/presets/shadcn-variants/tree-select-types";

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function flattenTree(
    nodes: NormalizedTreeItemWithRender[]
): NormalizedTreeItemWithRender[] {
    const result: NormalizedTreeItemWithRender[] = [];
    function recurse(list: NormalizedTreeItemWithRender[]) {
        for (const node of list) {
            result.push(node);
            if (node.children.length) recurse(node.children);
        }
    }
    recurse(nodes);
    return result;
}

function toggleInArray(
    arr: TreeKey[] | undefined,
    key: TreeKey
): TreeKey[] | undefined {
    const list = arr ?? [];
    const idx = list.findIndex((v) => v === key);
    if (idx === -1) return [...list, key];
    const next = [...list];
    next.splice(idx, 1);
    return next.length ? next : undefined;
}

function densityClasses(density?: Density) {
    switch (density) {
        case "compact":
            return {
                triggerPy: "py-1",
                searchPy: "py-2",
                rowPy: "py-1",
                rowGap: "gap-1.5",
            };
        case "loose":
            return {
                triggerPy: "py-2.5",
                searchPy: "py-3",
                rowPy: "py-2",
                rowGap: "gap-2.5",
            };
        default:
            return {
                triggerPy: "py-2",
                searchPy: "py-2.5",
                rowPy: "py-1.5",
                rowGap: "gap-2",
            };
    }
}

function triggerHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "min-h-8 text-xs";
        case "lg":
            return "min-h-11 text-base";
        default:
            return "min-h-9 text-sm";
    }
}

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type TreeSelectBaseProps = Pick<
    VariantBaseProps<TreeValue>,
    "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> & {
    options?: TreeSelectOption[];

    /**
     * If true, allows multiple selection (checkboxes).
     * If false, allows single selection (no checkboxes, closes on select).
     * Default: true
     */
    multiple?: boolean;

    autoCap?: boolean;
    optionLabel?: string | ((item: TreeSelectOption) => React.ReactNode);
    optionValue?: string | ((item: TreeSelectOption) => TreeKey);
    optionDescription?: string | ((item: TreeSelectOption) => React.ReactNode);
    optionDisabled?: string | ((item: TreeSelectOption) => boolean);
    optionIcon?: string | ((item: TreeSelectOption) => React.ReactNode);
    optionKey?: string | ((item: TreeSelectOption, index: number) => React.Key);

    searchable?: boolean;
    searchPlaceholder?: string;
    emptyLabel?: React.ReactNode;
    emptySearchText?: React.ReactNode;
    clearable?: boolean;
    placeholder?: React.ReactNode;

    className?: string;
    triggerClassName?: string;
    contentClassName?: string;

    renderOption?: (ctx: {
        item: NormalizedTreeItem;
        selected: boolean;
        index: number;
        option: React.ReactNode;
        click(): void;
    }) => React.ReactNode;

    renderValue?: (ctx: {
        selectedItems: NormalizedTreeItem[];
        placeholder?: React.ReactNode;
    }) => React.ReactNode;

    expandAll?: boolean;
    defaultExpandedValues?: TreeKey[];
    leafOnly?: boolean;
};

type TreeSelectDefaultModeProps = {
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
    selectedBadge?: never;
    selectedBadgeHiddenWhenZero?: never;
    selectedBadgeVariant?: never;
    selectedBadgeClassName?: never;
    selectedBadgePlacement?: never;
};

type TreeSelectButtonModeButton =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          selectedItems: NormalizedTreeItem[];
          selectedCount: number;
      }) => React.ReactNode);

type TreeSelectButtonModeProps = {
    mode: "button";

    /**
     * Used when mode="button". If provided, this is the trigger.
     * If not provided, `children` is used.
     */
    button?: TreeSelectButtonModeButton;

    children?: TreeSelectButtonModeButton;

    /**
     * Selected-count badge (mode="button" only)
     */
    selectedBadge?: boolean;
    selectedBadgeHiddenWhenZero?: boolean;
    selectedBadgeVariant?: BadgeVariant;
    selectedBadgeClassName?: string;
    selectedBadgePlacement?: "end" | "corner";

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

export type ShadcnTreeSelectVariantProps = TreeSelectBaseProps &
    (TreeSelectDefaultModeProps | TreeSelectButtonModeProps);

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnTreeSelectVariant = React.forwardRef<
    HTMLButtonElement,
    ShadcnTreeSelectVariantProps
>(function ShadcnTreeSelectVariant(props, ref) {
    const {
        value,
        onValue,
        disabled,
        readOnly,
        size,
        density,

        options,
        multiple = true,

        autoCap,
        optionLabel,
        optionValue,
        optionDescription,
        optionDisabled,
        optionIcon,
        optionKey,

        searchable = true,
        searchPlaceholder,

        emptyLabel,
        emptySearchText,

        clearable = true,
        placeholder,

        className,
        triggerClassName,
        contentClassName,

        renderOption,
        renderValue,

        expandAll = false,
        defaultExpandedValues,
        leafOnly = false,

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

        mode = "default",
        button,
        children,

        selectedBadge = true,
        selectedBadgeHiddenWhenZero = true,
        selectedBadgeVariant = "secondary",
        selectedBadgeClassName,
        selectedBadgePlacement = "corner",
    } = props;

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");

    const isDisabled = disabled || readOnly;
    const d = React.useMemo(
        () => densityClasses(density as Density),
        [density]
    );

    // Normalize tree
    const tree = React.useMemo(
        () =>
            normalizeTree(options ?? [], {
                autoCap,
                optionLabel,
                optionValue,
                optionDescription,
                optionDisabled,
                optionIcon,
                optionKey,
            }),
        [
            options,
            autoCap,
            optionLabel,
            optionValue,
            optionDescription,
            optionDisabled,
            optionIcon,
            optionKey,
        ]
    );

    const allNodesFlat = React.useMemo(() => flattenTree(tree), [tree]);

    // Expanded tracking (derive)
    const computedInitialExpanded = React.useMemo(() => {
        if (expandAll) {
            return new Set<TreeKey>(
                allNodesFlat.filter((n) => n.hasChildren).map((n) => n.value)
            );
        }
        if (defaultExpandedValues?.length) {
            return new Set<TreeKey>(defaultExpandedValues);
        }
        return new Set<TreeKey>();
    }, [expandAll, defaultExpandedValues, allNodesFlat]);

    const [expanded, setExpanded] = React.useState<Set<TreeKey>>(
        computedInitialExpanded
    );

    // Re-sync expanded when inputs/options change
    React.useEffect(() => {
        setExpanded(computedInitialExpanded);
    }, [computedInitialExpanded]);

    const toggleExpanded = React.useCallback((key: TreeKey) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    }, []);

    const displayedNodes = React.useMemo(() => {
        if (query) {
            const q = query.toLowerCase();
            const matchSet = new Set<TreeKey>();

            const checkMatch = (node: NormalizedTreeItem): boolean => {
                const selfMatch = node.labelText.toLowerCase().includes(q);
                const childMatch = node.children.some(checkMatch);
                if (selfMatch || childMatch) {
                    matchSet.add(node.value);
                    node.path.forEach((p) => matchSet.add(p));
                    return true;
                }
                return false;
            };

            tree.forEach(checkMatch);
            return allNodesFlat.filter((n) => matchSet.has(n.value));
        }

        return allNodesFlat.filter((node) => {
            if (node.level === 0) return true;
            for (const ancestorKey of node.path) {
                if (!expanded.has(ancestorKey)) return false;
            }
            return true;
        });
    }, [allNodesFlat, query, tree, expanded]);

    // Selection normalization
    const selectedValues = React.useMemo<TreeKey[]>(() => {
        if (value === undefined || value === null) return [];
        if (Array.isArray(value)) {
            return multiple ? value : value.length ? [value[0] as TreeKey] : [];
        }
        return [value];
    }, [value, multiple]);

    const selectedItems = React.useMemo(
        () =>
            allNodesFlat.filter((node) => selectedValues.includes(node.value)),
        [allNodesFlat, selectedValues]
    );

    const selectedCount = selectedItems.length;

    const handleToggleValue = React.useCallback(
        (item: NormalizedTreeItem) => {
            if (isDisabled) return;

            // In leafOnly mode, parents toggle expansion instead of selection
            if (leafOnly && item.hasChildren) {
                if (!item.disabled) toggleExpanded(item.value);
                return;
            }

            let nextValue: TreeValue;

            if (multiple) {
                nextValue = toggleInArray(selectedValues, item.value);
            } else {
                nextValue = item.value;
                setOpen(false);
            }

            const nextSelectedValues = Array.isArray(nextValue)
                ? nextValue
                : nextValue !== undefined && nextValue !== null
                  ? [nextValue]
                  : [];

            const detail: ChangeDetail = {
                source: "variant",
                raw: item.raw,
                nativeEvent: undefined,
                meta: {
                    toggled: item.value,
                    selectedValues: nextSelectedValues,
                },
            };

            onValue?.(nextValue, detail);
        },
        [
            isDisabled,
            leafOnly,
            multiple,
            selectedValues,
            onValue,
            toggleExpanded,
        ]
    );

    const handleClear = React.useCallback(() => {
        if (!onValue) return;
        const detail: ChangeDetail = {
            source: "variant",
            raw: undefined,
            nativeEvent: undefined,
            meta: { action: "clear" },
        };
        onValue(undefined, detail);
    }, [onValue]);

    const resolvedLeadingIcons =
        leadingIcons && leadingIcons.length ? leadingIcons : icon ? [icon] : [];
    const resolvedTrailingIcons = trailingIcons ?? [];
    const baseIconGap = iconGap ?? 4;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const hasLeadingControl = !!leadingControl;
    const hasTrailingControl = !!trailingControl;
    const hasControls = hasLeadingControl || hasTrailingControl;

    const showClear =
        mode === "default" &&
        clearable &&
        !isDisabled &&
        selectedValues.length > 0;

    // ─────────────────────────────────────────────
    // Trigger rendering
    // ─────────────────────────────────────────────

    const renderDefaultTriggerContent = () => {
        if (!selectedItems.length) {
            return (
                <span className="text-muted-foreground">
                    {placeholder ?? "Select..."}
                </span>
            );
        }

        if (!multiple && selectedItems.length === 1) {
            return (
                <span className="text-foreground">
                    {selectedItems[0].labelNode}
                </span>
            );
        }

        if (selectedItems.length <= 3) {
            return (
                <div className="flex flex-wrap gap-1">
                    {selectedItems.map((item) => (
                        <Badge
                            key={item.key}
                            variant="secondary"
                            className="px-1.5 h-5 text-[10px] font-medium border-border/50 bg-secondary/50"
                        >
                            {item.labelNode}
                        </Badge>
                    ))}
                </div>
            );
        }

        return (
            <div className="flex items-center gap-1">
                <Badge
                    variant="secondary"
                    className="px-1.5 h-5 text-[10px] bg-secondary/50"
                >
                    {selectedItems.length} selected
                </Badge>
            </div>
        );
    };

    const triggerContent = renderValue
        ? renderValue({ selectedItems, placeholder })
        : renderDefaultTriggerContent();

    const baseBoxClasses = cn(
        "flex items-center justify-between border-input w-full min-w-0 rounded-md border bg-background text-sm shadow-xs ring-offset-background",
        "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        d.triggerPy
    );

    const DefaultTriggerButton = (
        <button
            ref={ref}
            type="button"
            disabled={isDisabled}
            className={cn(
                triggerHeight(size as Size),
                hasControls && extendBoxToControls
                    ? "border-none shadow-none focus:outline-none bg-transparent w-full text-left"
                    : baseBoxClasses,
                triggerClassName
            )}
        >
            <div className="flex w-full items-center justify-between gap-2 overflow-hidden">
                <div className="flex flex-1 items-center gap-2 overflow-hidden">
                    {resolvedLeadingIcons.length > 0 && (
                        <span
                            className="flex items-center shrink-0"
                            style={{ columnGap: leadingGap }}
                        >
                            {resolvedLeadingIcons.map((node, idx) => (
                                <span key={idx}>{node}</span>
                            ))}
                        </span>
                    )}
                    <div className="truncate w-full text-left">
                        {triggerContent}
                    </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    {showClear && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear();
                            }}
                            className="text-muted-foreground hover:text-foreground p-0.5 rounded-sm hover:bg-muted transition-colors"
                            aria-label="Clear selection"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}

                    {resolvedTrailingIcons.length > 0 && (
                        <span
                            className="flex items-center"
                            style={{ columnGap: trailingGap }}
                        >
                            {resolvedTrailingIcons.map((node, idx) => (
                                <span key={idx}>{node}</span>
                            ))}
                        </span>
                    )}

                    <ChevronDown className="h-4 w-4 opacity-50" />
                </div>
            </div>
        </button>
    );

    const ButtonModeTrigger = React.useMemo(() => {
        if (mode !== "button") return null;

        const ctx = { open, selectedItems, selectedCount };
        const triggerNode =
            typeof button === "function"
                ? button(ctx)
                : (button ??
                  (typeof children === "function" ? children(ctx) : children));

        const shouldShowBadge =
            Boolean(selectedBadge) &&
            (!selectedBadgeHiddenWhenZero || selectedCount > 0);

        const badgeEl = shouldShowBadge ? (
            <Badge
                variant={selectedBadgeVariant as any}
                className={cn(
                    "text-[10px] h-5 px-1.5 leading-none",
                    selectedBadgePlacement === "corner" &&
                        "absolute -top-2 -right-2",
                    selectedBadgeClassName
                )}
            >
                {selectedCount}
            </Badge>
        ) : null;

        const wrapWithBadge = (inner: React.ReactNode) => {
            if (!badgeEl) return inner;
            if (selectedBadgePlacement === "end") {
                return (
                    <span className="inline-flex items-center gap-2">
                        <span className="min-w-0">{inner}</span>
                        {badgeEl}
                    </span>
                );
            }
            return (
                <span className="relative inline-flex">
                    {inner}
                    {badgeEl}
                </span>
            );
        };

        // If user gave us a real element, use it directly (PopoverTrigger will clone props)
        if (React.isValidElement(triggerNode)) {
            return wrapWithBadge(triggerNode);
        }

        // Fallback: wrap text/anything in a plain button
        return wrapWithBadge(
            <button
                type="button"
                disabled={isDisabled}
                className={cn(triggerClassName)}
            >
                {triggerNode ?? <span>Select…</span>}
            </button>
        );
    }, [
        mode,
        open,
        button,
        children,
        selectedItems,
        selectedCount,
        selectedBadge,
        selectedBadgeHiddenWhenZero,
        selectedBadgeVariant,
        selectedBadgeClassName,
        selectedBadgePlacement,
        isDisabled,
        triggerClassName,
    ]);

    const TriggerNode =
        mode === "button" ? ButtonModeTrigger : DefaultTriggerButton;

    // ─────────────────────────────────────────────
    // Tree Body
    // ─────────────────────────────────────────────

    const TreeBody = (
        <div className="max-h-80 w-full overflow-y-auto overflow-x-hidden py-1">
            {emptyLabel && tree.length === 0 && !query && (
                <div className="px-4 py-3 text-sm text-center text-muted-foreground">
                    {emptyLabel}
                </div>
            )}

            {tree.length > 0 && displayedNodes.length === 0 && (
                <div className="px-4 py-3 text-sm text-center text-muted-foreground">
                    {emptySearchText ?? "No results found"}
                </div>
            )}

            {displayedNodes.map((item, index) => {
                const selected = selectedValues.includes(item.value);
                const isExpanded = expanded.has(item.value);
                const parentInLeafOnly = leafOnly && item.hasChildren;

                const optionNode = (
                    <div
                        className={cn(
                            "relative flex items-center px-2 text-sm outline-none select-none",
                            d.rowGap,
                            d.rowPy,
                            item.disabled
                                ? "opacity-50"
                                : "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                            selected && !multiple && "bg-accent",
                            selected && multiple && "bg-accent/50"
                        )}
                        style={{ paddingLeft: 12 + item.level * 20 }}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!item.disabled) handleToggleValue(item);
                        }}
                    >
                        {/* Guidelines */}
                        {item.level > 0 &&
                            Array.from({ length: item.level }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute border-l border-border/40 h-full top-0"
                                    style={{ left: 19 + i * 20 }}
                                />
                            ))}

                        {/* Expander */}
                        <button
                            type="button"
                            disabled={!!item.disabled || !item.hasChildren}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (item.disabled) return;
                                toggleExpanded(item.value);
                            }}
                            className={cn(
                                "z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                                !item.hasChildren &&
                                    "opacity-0 pointer-events-none"
                            )}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-3.5 w-3.5" />
                            ) : (
                                <ChevronRight className="h-3.5 w-3.5" />
                            )}
                        </button>

                        {/* Checkbox (Multi Only, hide for parent nodes in leafOnly mode) */}
                        {multiple && !parentInLeafOnly && (
                            <Checkbox
                                checked={selected}
                                className="shrink-0 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                style={{ pointerEvents: "none" }}
                            />
                        )}

                        {/* Icon */}
                        {item.icon ? (
                            <span className="text-muted-foreground">
                                {item.icon}
                            </span>
                        ) : item.hasChildren ? (
                            isExpanded ? (
                                <FolderOpen className="h-4 w-4 text-blue-400/80 fill-blue-400/20" />
                            ) : (
                                <Folder className="h-4 w-4 text-blue-400/80 fill-blue-400/20" />
                            )
                        ) : (
                            <File className="h-4 w-4 text-muted-foreground/60" />
                        )}

                        {/* Label */}
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="truncate font-medium leading-none">
                                {item.labelNode}
                            </span>
                            {item.description && (
                                <span className="text-xs text-muted-foreground truncate mt-0.5">
                                    {item.description}
                                </span>
                            )}
                        </div>

                        {/* Checkmark (Single Only) */}
                        {!multiple && selected && (
                            <Check className="h-4 w-4 text-primary ml-auto" />
                        )}
                    </div>
                );

                // Prefer per-option renderer (normalized) if present; fall back to global renderOption
                const renderer = (item as any).render ?? renderOption;

                if (!renderer) {
                    return (
                        <React.Fragment key={item.key}>
                            {optionNode}
                        </React.Fragment>
                    );
                }

                const rendered = renderer({
                    item,
                    selected,
                    index,
                    option: optionNode,
                    click() {
                        if (!item.disabled) handleToggleValue(item);
                    },
                });

                return (
                    <React.Fragment key={item.key}>{rendered}</React.Fragment>
                );
            })}
        </div>
    );

    const SelectBody = (
        <Popover
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (!next) setQuery("");
            }}
            modal={true}
        >
            <PopoverTrigger asChild>{TriggerNode as any}</PopoverTrigger>

            <PopoverContent
                className={cn(
                    "p-0 w-(--radix-popover-trigger-width) min-w-75",
                    contentClassName
                )}
                align="start"
            >
                {searchable && (
                    <div
                        className={cn(
                            "flex items-center border-b px-3",
                            d.searchPy
                        )}
                    >
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            autoFocus
                            className="flex h-4 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder ?? "Search..."}
                        />
                    </div>
                )}
                {TreeBody}
            </PopoverContent>
        </Popover>
    );

    if (!hasControls) {
        return (
            <div
                data-slot="tree-select-field"
                className={cn("w-full", className)}
            >
                {SelectBody}
            </div>
        );
    }

    if (joinControls) {
        return (
            <div
                data-slot="tree-select-field"
                className={cn("w-full", className)}
            >
                <div
                    className={cn(
                        "flex items-center w-full rounded-md border border-input bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background",
                        isDisabled && "opacity-50 cursor-not-allowed bg-muted"
                    )}
                >
                    {hasLeadingControl && (
                        <div
                            className={cn(
                                "pl-3 pr-1 text-muted-foreground",
                                leadingControlClassName
                            )}
                        >
                            {leadingControl}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">{SelectBody}</div>
                    {hasTrailingControl && (
                        <div
                            className={cn(
                                "pr-3 pl-1 text-muted-foreground",
                                trailingControlClassName
                            )}
                        >
                            {trailingControl}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center gap-2 w-full", className)}>
            {hasLeadingControl && leadingControl}
            <div className="flex-1 min-w-0">{SelectBody}</div>
            {hasTrailingControl && trailingControl}
        </div>
    );
});

ShadcnTreeSelectVariant.displayName = "ShadcnTreeSelectVariant";

export default ShadcnTreeSelectVariant;
