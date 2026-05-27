import * as React from "react";
import type { ChangeDetail, VariantBaseProps } from "@/variants/shared";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Input } from "@/presets/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/presets/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/presets/ui/popover";
import { ScrollArea } from "@/presets/ui/scroll-area";

import { ChevronDown, Info, PenLine, Plus, Tag, X } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type KeyValueMap = Record<string, string>;

export interface KV {
    key: string;
    value: string;
}

export interface ShadcnKeyValueVariantProps
    extends Pick<
        VariantBaseProps<KeyValueMap | undefined>,
        "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
    > {
    min?: number;
    max?: number;

    /**
     * Legacy props (kept for compatibility; no longer drive visibility).
     */
    minVisible?: number;
    maxVisible?: number;

    /**
     * If false/undefined, inline chips show keys only.
     * If true, inline chips show "key : value".
     *
     * In the dropdown: key-only + an info button reveals the value.
     */
    showValue?: boolean;

    placeholder?: React.ReactNode;
    dialogTitle?: React.ReactNode;
    keyLabel?: React.ReactNode;
    valueLabel?: React.ReactNode;
    submitLabel?: React.ReactNode;

    /**
     * Overflow indicator label (e.g. "2+").
     * This is now purely informational; dropdown control is always available.
     */
    moreLabel?: (count: number) => React.ReactNode;

    emptyLabel?: React.ReactNode;

    className?: string;
    chipsClassName?: string;
    chipClassName?: string;

    renderChip?: (ctx: {
        pair: KV;
        index: number;
        onEdit: () => void;
        onRemove: () => void;
        defaultChip: React.ReactNode;
    }) => React.ReactNode;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function mapToItems(map: KeyValueMap | undefined): KV[] {
    if (!map) return [];
    return Object.entries(map).map(([key, value]) => ({
        key,
        value: value ?? "",
    }));
}

function itemsToMap(items: KV[]): KeyValueMap {
    const out: KeyValueMap = {};
    for (const { key, value } of items) {
        if (!key) continue;
        out[key] = value;
    }
    return out;
}

function sizeClasses(size?: Size) {
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}
function densityPadding(density?: Density) {
    switch (density) {
        case "compact":
            return "py-1 px-2";
        case "loose":
            return "py-3 px-3";
        case "comfortable":
        default:
            return "py-1 px-2";
    }
}

function defaultMoreLabel(count: number): React.ReactNode {
    return `${count}+`;
}

function parsePx(v: string | null | undefined): number {
    const n = Number.parseFloat((v ?? "").toString());
    return Number.isFinite(n) ? n : 0;
}

function getGapPx(el: HTMLElement | null): number {
    if (!el) return 0;
    const cs = window.getComputedStyle(el);
    const g = cs.columnGap && cs.columnGap !== "normal" ? cs.columnGap : cs.gap;
    return parsePx(g);
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnKeyValueVariant = React.forwardRef<
    HTMLDivElement,
    ShadcnKeyValueVariantProps
>(function ShadcnKeyValueVariant(props, _ref) {
    const {
        value,
        onValue,
        error,
        disabled,
        readOnly,
        size,
        density,

        min = 0,
        max = Infinity,

        showValue,

        placeholder,
        dialogTitle = "Edit Item",
        keyLabel = "Key",
        valueLabel = "Value",
        submitLabel = "Save Changes",
        moreLabel = defaultMoreLabel,
        emptyLabel = "No items added",

        className,
        chipsClassName,
        chipClassName,
        renderChip,
    } = props;

    const isDisabled = disabled || readOnly;

    const items: KV[] = React.useMemo(() => mapToItems(value), [value]);

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [draft, setDraft] = React.useState<KV>({ key: "", value: "" });

    const canAdd = items.length < max;
    const canDelete = items.length > min;

    const hasItems = items.length > 0;

    // ────────────────────────────────
    // Change Logic
    // ────────────────────────────────

    const commitItems = React.useCallback(
        (next: KV[], meta: ChangeDetail["meta"]) => {
            if (!onValue) return;

            const nextMap = itemsToMap(next);
            const detail: ChangeDetail = {
                source: "variant",
                raw: next,
                nativeEvent: undefined,
                meta,
            };
            onValue(nextMap, detail);
        },
        [onValue],
    );

    const openForNew = React.useCallback(() => {
        if (isDisabled || !canAdd) return;
        setEditingIndex(null);
        setDraft({ key: "", value: "" });
        setDialogOpen(true);
    }, [isDisabled, canAdd]);

    const openForEdit = React.useCallback(
        (index: number) => {
            if (isDisabled) return;
            const item = items[index];
            if (!item) return;
            setEditingIndex(index);
            setDraft(item);
            setDialogOpen(true);
        },
        [isDisabled, items],
    );

    const handleDelete = React.useCallback(() => {
        if (editingIndex == null) return;
        if (!canDelete) return;

        const next = items.slice();
        next.splice(editingIndex, 1);

        setDialogOpen(false);
        commitItems(next, {
            action: "delete",
            index: editingIndex,
        });
    }, [editingIndex, items, canDelete, commitItems]);

    const handleSubmit = React.useCallback(() => {
        const trimmedKey = draft.key.trim();
        const trimmedValue = draft.value;

        if (!trimmedKey) return;

        let next = items.slice();

        if (editingIndex != null) {
            next[editingIndex] = { key: trimmedKey, value: trimmedValue };
        } else {
            const existingIndex = next.findIndex((kv) => kv.key === trimmedKey);
            if (existingIndex !== -1) {
                next[existingIndex] = { key: trimmedKey, value: trimmedValue };
            } else {
                if (!canAdd) return;
                next.push({ key: trimmedKey, value: trimmedValue });
            }
        }

        setDialogOpen(false);
        commitItems(next, {
            action: editingIndex != null ? "edit" : "add",
            index: editingIndex ?? next.length - 1,
        });
    }, [draft, items, editingIndex, canAdd, commitItems]);

    const handleQuickRemove = React.useCallback(
        (index: number) => {
            if (isDisabled || !canDelete) return;
            const next = items.slice();
            next.splice(index, 1);
            commitItems(next, { action: "delete", index });
        },
        [isDisabled, canDelete, items, commitItems],
    );

    // ────────────────────────────────
    // Dropdown state (shows EVERYTHING)
    // ────────────────────────────────

    const [listOpen, setListOpen] = React.useState(false);

    const openList = React.useCallback(() => {
        if (isDisabled) return;
        setListOpen(true);
    }, [isDisabled]);

    // ────────────────────────────────
    // Layout-driven overflow (space only)
    // ────────────────────────────────

    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const leftRef = React.useRef<HTMLDivElement | null>(null);

    const moreMeasureRef = React.useRef<HTMLButtonElement | null>(null);

    const chipRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    chipRefs.current = items.map((_, i) => chipRefs.current[i] ?? null);

    const [visibleCount, setVisibleCount] = React.useState<number>(() => items.length);

    const recomputeVisible = React.useCallback(() => {
        const leftEl = leftRef.current;
        if (!leftEl) {
            setVisibleCount(items.length);
            return;
        }

        const avail = leftEl.clientWidth;
        if (avail <= 0) {
            setVisibleCount(items.length);
            return;
        }

        const gap = getGapPx(leftEl);

        const chipWs = chipRefs.current.map((el) => el?.offsetWidth ?? 0);
        const moreW = moreMeasureRef.current?.offsetWidth ?? 0;

        const totalFor = (n: number) => {
            const overflow = items.length - n;

            let total = 0;
            let parts = 0;

            // chips (visible)
            for (let i = 0; i < n; i++) {
                const w = chipWs[i] ?? 0;
                if (w <= 0) continue;
                total += w;
                parts++;
            }

            // overflow indicator if needed
            if (overflow > 0 && moreW > 0) {
                total += moreW;
                parts++;
            }

            if (parts > 1 && gap > 0) {
                total += gap * (parts - 1);
            }

            return total;
        };

        if (totalFor(items.length) <= avail) {
            setVisibleCount(items.length);
            return;
        }

        let best = 0;
        for (let n = 0; n <= items.length; n++) {
            if (totalFor(n) <= avail) best = n;
            else break;
        }
        setVisibleCount(best);
    }, [items.length]);

    React.useLayoutEffect(() => {
        recomputeVisible();
    }, [recomputeVisible, items, size, density, showValue]);

    React.useEffect(() => {
        const el = leftRef.current;
        if (!el) return;

        const ro = new ResizeObserver(() => recomputeVisible());
        ro.observe(el);
        if (wrapRef.current) ro.observe(wrapRef.current);

        return () => ro.disconnect();
    }, [recomputeVisible]);

    const overflowCount = Math.max(0, items.length - visibleCount);
    const visibleItems = items.slice(0, visibleCount);

    // ────────────────────────────────
    // Visuals
    // ────────────────────────────────

    const sizeCls = sizeClasses(size as Size | undefined);
    const densityCls = densityPadding(density as Density | undefined);

    const inlineShowsValue = showValue === true;

    const renderChipNode = (pair: KV, index: number) => {
        const baseChip = (
            <button
                type="button"
                key={index}
                ref={(el) => {
                    chipRefs.current[index] = el;
                }}
                className={cn(
                    "group inline-flex items-center gap-1.5 rounded-md",
                    "bg-secondary/50 border border-transparent",
                    "px-2 py-1 text-xs transition-all duration-200",
                    "hover:bg-secondary hover:border-border/50 hover:shadow-sm",
                    "animate-in fade-in zoom-in-95 fill-mode-both",
                    "max-w-full",
                    isDisabled && "opacity-50 cursor-not-allowed",
                    chipClassName,
                )}
                onClick={() => openForEdit(index)}
                disabled={isDisabled}
            >
                <span className="font-semibold text-foreground truncate max-w-48">
                    {pair.key}
                </span>

                {inlineShowsValue && (
                    <>
                        <span className="text-muted-foreground/40">:</span>
                        <span className="text-muted-foreground truncate max-w-64">
                            {pair.value}
                        </span>
                    </>
                )}

                {canDelete && !isDisabled && (
                    <div
                        role="button"
                        tabIndex={0}
                        className={cn(
                            "ml-1 flex h-4 w-4 items-center justify-center rounded-full",
                            "text-muted-foreground/60 opacity-0 transition-all",
                            "hover:bg-destructive hover:text-destructive-foreground",
                            "group-hover:opacity-100",
                            "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleQuickRemove(index);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                handleQuickRemove(index);
                            }
                        }}
                        aria-label={`Remove ${pair.key}`}
                    >
                        <X className="h-3 w-3" />
                    </div>
                )}
            </button>
        );

        if (!renderChip) return baseChip;

        return renderChip({
            pair,
            index,
            onEdit: () => openForEdit(index),
            onRemove: () => handleQuickRemove(index),
            defaultChip: baseChip,
        });
    };

    // ────────────────────────────────
    // Dialog
    // ────────────────────────────────

    const ManageDialog = (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <PenLine className="h-4 w-4 text-muted-foreground" />
                        {dialogTitle}
                    </DialogTitle>
                    <DialogDescription>
                        {editingIndex !== null
                            ? "Modify the existing key-value pair."
                            : "Add a new key-value pair to the list."}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium text-muted-foreground">
                            {keyLabel}
                        </label>
                        <Input
                            value={draft.key}
                            onChange={(e) =>
                                setDraft((prev) => ({
                                    ...prev,
                                    key: e.target.value,
                                }))
                            }
                            className="col-span-3"
                            autoFocus
                            disabled={isDisabled}
                            placeholder="e.g. Color"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label className="text-right text-sm font-medium text-muted-foreground">
                            {valueLabel}
                        </label>
                        <Input
                            value={draft.value}
                            onChange={(e) =>
                                setDraft((prev) => ({
                                    ...prev,
                                    value: e.target.value,
                                }))
                            }
                            className="col-span-3"
                            disabled={isDisabled}
                            placeholder="e.g. Blue"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSubmit();
                            }}
                        />
                    </div>
                </div>

                <DialogFooter className="flex sm:justify-between flex-row items-center">
                    <div>
                        {editingIndex != null && canDelete && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={handleDelete}
                                disabled={isDisabled}
                            >
                                Delete
                            </Button>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            onClick={handleSubmit}
                            disabled={isDisabled}
                        >
                            {submitLabel}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    // ────────────────────────────────
    // Dropdown content: shows ALL items
    // ────────────────────────────────

    const ListPopover = (
        <Popover open={listOpen} onOpenChange={setListOpen}>
            {/* trigger is the right-side control; overflow indicator just calls openList() */}
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={cn(
                        "flex h-8 w-fit items-center justify-center rounded-sm",
                        "text-muted-foreground cursor-pointer",
                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                        isDisabled && "opacity-50 pointer-events-none",
                    )}
                    aria-label="Open list"
                    disabled={isDisabled}
                >
                    <ChevronDown className="h-4 w-4" />
                </button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                side="bottom"
                className="w-[min(360px,calc(100vw-2rem))] p-2"
            >
                <div className="flex items-center justify-between gap-2 pb-2">
                    <div className="text-xs font-medium text-muted-foreground">
                        Items ({items.length})
                    </div>

                    {!isDisabled && (
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                setListOpen(false);
                                openForNew();
                            }}
                            disabled={!canAdd}
                        >
                            <Plus className="h-3.5 w-3.5 mr-1" />
                            Add
                        </Button>
                    )}
                </div>

                {items.length === 0 ? (
                    <div className="rounded-md border border-border/50 px-3 py-6 text-center text-sm text-muted-foreground">
                        {emptyLabel}
                    </div>
                ) : (
                    <ScrollArea className="max-h-64 rounded-md border border-border/50">
                        <div className="divide-y divide-border/50">
                            {items.map((pair, index) => (
                                <div
                                    key={`${pair.key}-${index}`}
                                    className="flex items-center justify-between gap-2 px-2 py-1.5"
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            "min-w-0 flex-1 text-left",
                                            "text-sm font-medium text-foreground",
                                            "hover:underline underline-offset-2",
                                        )}
                                        onClick={() => {
                                            setListOpen(false);
                                            openForEdit(index);
                                        }}
                                        disabled={isDisabled}
                                    >
                                        <span className="truncate block">{pair.key}</span>
                                    </button>

                                    <div className="flex items-center gap-1">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button
                                                    type="button"
                                                    className={cn(
                                                        "flex h-7 w-7 items-center justify-center rounded-md",
                                                        "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                                                    )}
                                                    title={pair.value || ""}
                                                    aria-label={`Show value for ${pair.key}`}
                                                >
                                                    <Info className="h-4 w-4" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                align="end"
                                                className="w-[min(320px,calc(100vw-2rem))] p-2"
                                            >
                                                <div className="text-xs font-medium text-muted-foreground mb-1">
                                                    {pair.key}
                                                </div>
                                                <div className="text-sm wrap-break-word">
                                                    {pair.value || (
                                                        <span className="text-muted-foreground">
                                                            (empty)
                                                        </span>
                                                    )}
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                        {!isDisabled && canDelete && (
                                            <button
                                                type="button"
                                                className={cn(
                                                    "flex h-7 w-7 items-center justify-center rounded-md",
                                                    "text-muted-foreground hover:bg-destructive hover:text-destructive-foreground",
                                                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                                                )}
                                                onClick={() => handleQuickRemove(index)}
                                                aria-label={`Remove ${pair.key}`}
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </PopoverContent>
        </Popover>
    );

    // ────────────────────────────────
    // Render
    // ────────────────────────────────

    return (
        <div
            ref={wrapRef}
            className={cn(
                "group/container w-full",
                isDisabled && "opacity-60 cursor-not-allowed",
                className,
            )}
            aria-disabled={isDisabled}
            aria-invalid={error ? "true" : undefined}
        >
            {/* Container mimicking an Input */}
            <div
                className={cn(
                    "relative flex w-full items-center rounded-md border border-input bg-background transition-all",
                    !isDisabled &&
                    "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
                    densityCls,
                    sizeCls,
                    chipsClassName,
                )}
            >
                {/* Left area: chips/placeholder + overflow indicator (single line, no wrap) */}
                <div
                    ref={leftRef}
                    className={cn(
                        "flex min-w-0 flex-1 items-center gap-2 overflow-hidden",
                        "flex-nowrap",
                    )}
                >
                    {hasItems ? (
                        <>
                            {visibleItems.map((pair, index) =>
                                renderChipNode(pair, index),
                            )}

                            {/* Overflow indicator (informational). Clicking opens the same dropdown. */}
                            {overflowCount > 0 && (
                                <button
                                    type="button"
                                    className={cn(
                                        "inline-flex h-6 items-center gap-1 rounded-full shrink-0",
                                        "bg-muted px-2 text-[11px] font-medium text-muted-foreground",
                                        "hover:bg-muted/80 hover:text-foreground transition-colors",
                                        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                                    )}
                                    onClick={openList}
                                    disabled={isDisabled}
                                    aria-label={`Show list (${overflowCount} hidden)`}
                                >
                                    {moreLabel(overflowCount)}
                                </button>
                            )}
                        </>
                    ) : (
                        <div className="flex min-w-0 items-center gap-2 text-muted-foreground/60 select-none">
                            <Tag className="h-3.5 w-3.5 shrink-0" />
                            <span className="text-sm truncate">
                                {placeholder ?? emptyLabel}
                            </span>
                        </div>
                    )}

                    {/* Hidden measurement nodes */}
                    <div className="absolute -left-2499.75 -top-2499.75 pointer-events-none opacity-0">
                        <button
                            type="button"
                            ref={moreMeasureRef}
                            className={cn(
                                "inline-flex h-6 items-center gap-1 rounded-full",
                                "bg-muted px-2 text-[11px] font-medium text-muted-foreground",
                            )}
                        >
                            {`${items.length}+`}
                        </button>
                    </div>
                </div>

                {/* Right controls: (1) add control, (2) dropdown control — always (when not disabled) */}
                {!isDisabled && (
                    <div className="pl-1 pr-1 shrink-0 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={openForNew}
                            className={cn(
                                "flex h-8 w-fit items-center justify-center rounded-sm",
                                "text-muted-foreground cursor-pointer",
                                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                                !canAdd && "opacity-50 pointer-events-none",
                            )}
                            aria-label="Add item"
                            disabled={!canAdd}
                        >
                            <Plus className="h-4 w-4" />
                        </button>

                        {ListPopover}
                    </div>
                )}
            </div>

            {/* Error */}
            {error && (
                <p className="mt-1.5 text-xs font-medium text-destructive">
                    {error}
                </p>
            )}

            {ManageDialog}
        </div>
    );
});

ShadcnKeyValueVariant.displayName = "ShadcnKeyValueVariant";

export default ShadcnKeyValueVariant;
