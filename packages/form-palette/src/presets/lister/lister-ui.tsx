// resources/js/context/lister/lister-ui.tsx

import * as React from "react";

import type {
    ListerId,
    ListerMode,
    ListerOption,
    ListerSessionId,
    ListerStoreState,
} from "./types";
import { useLister } from ".";

import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { ScrollArea } from "@/presets/ui/scroll-area";
import { Separator } from "@/presets/ui/separator";
import { Button } from "@/presets/ui/button";
import { cn } from "@/lib/utils";

import {
    Check,
    GripVertical,
    RefreshCw,
    X,

} from "lucide-react";
import { SearchBar } from "./ui/search";

type AnyPresetMap = any;

export function ListerUI() {
    const { store } = useLister<AnyPresetMap>();
    if (!store.order.length) return null;

    return (
        <>
            {store.order.map((id) => (
                <ListerSessionPopover key={String(id)} id={id} store={store} />
            ))}
        </>
    );
}

function ListerSessionPopover(props: {
    id: ListerSessionId;
    store: ListerStoreState;
}) {
    const { id, store } = props;
    const { actions } = useLister<AnyPresetMap>();

    const session = store.sessions[id] as any;
    if (!session?.isOpen) return null;

    const isActive = store.activeId === id;
    const title = session.title ?? session.kind ?? "Select";
    const showRefresh = !!session.showRefresh;

    const fixed = session.position
        ? {
              position: "fixed" as const,
              left: session.position.x,
              top: session.position.y,
              zIndex: 1000 + store.order.indexOf(id),
          }
        : {
              position: "fixed" as const,
              right: 24,
              bottom: 24 + store.order.indexOf(id) * 12,
              zIndex: 1000 + store.order.indexOf(id),
          };

    const onOpenChange = (open: boolean) => {
        if (open) {
            actions.focus(id);
            return;
        }
        actions.close(id);
    };

    return (
        <div style={fixed}>
            <Popover open={true} onOpenChange={onOpenChange}>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        onMouseDown={() => actions.focus(id)}
                        aria-hidden
                        className="hidden"
                    />
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    side="bottom"
                    className={cn(
                        "w-105 overflow-hidden rounded-lg border bg-background p-0 shadow-lg",
                        isActive && "ring-2 ring-primary/30",
                    )}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onPointerDownOutside={() => actions.focus(id)}
                    onFocusOutside={() => actions.focus(id)}
                >
                    <HeaderBar
                        id={id}
                        title={title}
                        loading={!!session.loading}
                        refreshing={!!session.refreshing}
                        showRefresh={showRefresh}
                        draggable={!!session.draggable}
                        onRefresh={() => actions.refresh(id)}
                        onClose={() => actions.close(id)}
                    />

                    <Separator />

                    <SearchBar id={id} store={store} />

                    <Separator />

                    <OptionList id={id} />

                    <Separator />

                    <FooterBar
                        id={id}
                        mode={session.mode as ListerMode}
                        confirm={!!session.confirm}
                        onClear={() => actions.clear(id)}
                        onCancel={() => actions.cancel(id)}
                        onApply={() => actions.apply(id)}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export function HeaderBar(props: {
    id: ListerSessionId;
    title: string;
    loading: boolean;
    refreshing: boolean;
    showRefresh: boolean;
    draggable: boolean;
    onRefresh(): void;
    onClose(): void;
}) {
    const { actions } = useLister<AnyPresetMap>();

    return (
        <div
            className="flex items-center justify-between gap-2 px-3 py-2"
            onMouseDown={() => actions.focus(props.id)}
        >
            <div className="flex min-w-0 items-center gap-2">
                {props.draggable && (
                    <GripVertical className="h-4 w-4 shrink-0 opacity-60" />
                )}
                <div className="min-w-0">
                    <div className="truncate text-sm font-medium">
                        {props.title}
                    </div>
                    <div className="text-xs opacity-60">
                        {props.loading
                            ? "Loading…"
                            : props.refreshing
                              ? "Refreshing…"
                              : " "}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                {props.showRefresh && (
                    <Button
                        type="button"
                        size="sm"
                        variant={"ghost"}
                        onClick={props.onRefresh}
                        disabled={props.loading || props.refreshing}
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                )}

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={props.onClose}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

/**
 * Search bar + trailing controls:
 * - Search mode toggle (remote/local/hybrid)
 * - Filters treeselect (button mode)
 *
 * Notes:
 * - We bind search mode to session.searchMode and update via actions.setSearchMode(id, mode)
 * - Filters use session.filtersSpec?.options and session.selectedFilterValues
 * - On change, we diff and call actions.applyFilterOption(id, value) for both add/remove
 */
export { SearchBar } from "./ui/search";

export function OptionList(props: { id: ListerSessionId; className?: string }) {
    const { store, actions } = useLister<AnyPresetMap>();
    const s = store.sessions[props.id] as any;

    const options: Array<ListerOption<any, any, any>> =
        actions.getVisibleOptions(props.id) as any[];

    const draft = s?.draftValue;
    const isMulti = s?.mode === "multiple";

    const isSelected = (value: ListerId) => {
        if (isMulti) return Array.isArray(draft) && draft.includes(value);
        return draft === value;
    };

    return (
        <ScrollArea className={cn("max-h-85", props.className)}>
            <div className="p-1 space-y-1">
                {s?.errorCode ? (
                    <div className="px-3 py-4 text-sm opacity-70">
                        Error: {String(s.errorCode)}
                    </div>
                ) : s?.loading && !s?.optionsList?.length ? (
                    <div className="px-3 py-4 text-sm opacity-70">Loading…</div>
                ) : options.length === 0 ? (
                    <div className="px-3 py-4 text-sm opacity-70">
                        No results
                    </div>
                ) : (
                    options.map((opt) => {
                        const selected = isSelected(opt.value as any);
                        const disabled = !!opt.disabled;

                        const onClick = () => {
                            if (disabled) return;
                            actions.toggle(props.id, opt.value as any);
                        };

                        if (typeof s?.renderOption === "function") {
                            return (
                                <div
                                    key={String(opt.value)}
                                    className="px-1 py-1"
                                >
                                    {s.renderOption({
                                        option: opt,
                                        state: {
                                            selected,
                                            active: store.activeId === props.id,
                                            mode: s.mode,
                                        },
                                        actions: {
                                            toggle: () =>
                                                actions.toggle(
                                                    props.id,
                                                    opt.value,
                                                ),
                                            select: () =>
                                                actions.select(
                                                    props.id,
                                                    opt.value,
                                                ),
                                            deselect: () =>
                                                actions.deselect(
                                                    props.id,
                                                    opt.value,
                                                ),
                                        },
                                        ctx: {
                                            query: s.query,
                                            filters:
                                                s.effectiveFilters ?? s.filters,
                                        },
                                    })}
                                </div>
                            );
                        }

                        return (
                            <button
                                key={String(opt.value)}
                                type="button"
                                onMouseDown={() => actions.focus(props.id)}
                                onClick={onClick}
                                disabled={disabled}
                                className={cn(
                                    "flex w-full items-start gap-2 rounded-sm px-3 py-2 text-left",
                                    "transition hover:bg-muted/60",
                                    selected && "bg-muted",
                                    disabled && "cursor-not-allowed opacity-50",
                                )}
                            >
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                                    {selected ? (
                                        <Check className="h-4 w-4" />
                                    ) : (
                                        <span className="h-4 w-4" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-medium">
                                        {opt.label ?? String(opt.value)}
                                    </div>
                                    {opt.description ? (
                                        <div className="line-clamp-2 text-xs opacity-70">
                                            {opt.description}
                                        </div>
                                    ) : null}
                                </div>

                                {opt.group ? (
                                    <div className="shrink-0 text-xs opacity-50">
                                        {opt.group}
                                    </div>
                                ) : null}
                            </button>
                        );
                    })
                )}
            </div>
        </ScrollArea>
    );
}

export function FooterBar(props: {
    id: ListerSessionId;
    mode: ListerMode;
    confirm: boolean;
    onClear(): void;
    onCancel(): void;
    onApply(): void;
}) {
    const { actions } = useLister<AnyPresetMap>();

    const showConfirm = props.mode === "multiple" ? true : props.confirm;

    return (
        <div
            className="flex items-center justify-between gap-2 px-3 py-2"
            onMouseDown={() => actions.focus(props.id)}
        >
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={props.onClear}
            >
                Clear
            </Button>

            {showConfirm ? (
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button type="button" size="sm" onClick={props.onApply}>
                        Apply
                    </Button>
                </div>
            ) : (
                <div className="text-xs opacity-60">Click an item to apply</div>
            )}
        </div>
    );
}
