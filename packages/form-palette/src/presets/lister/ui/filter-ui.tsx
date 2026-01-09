// packages/form-palette/src/presets/lister/ui/filter-ui.tsx

import * as React from "react";
import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { InputField } from "@/input/input-field";

import { Check, ChevronRight, Filter, X } from "lucide-react";

import type {
    ListerFilterCtx,
    ListerFilterOption,
    ListerSessionId,
    ListerStoreState,
} from "@/presets/lister/types";

import { useLister } from "@/presets/lister";
import type { VariantKey, VariantPropsFor } from "@/schema/variant";

type AnyPresetMap = any;

type FilterValue = string | number;

function asArray<T>(v: any): T[] {
    if (v == null) return [];
    return Array.isArray(v) ? (v as T[]) : ([v] as T[]);
}

function isEmptyValue(v: any) {
    if (v == null) return true;
    if (typeof v === "string") return v.trim() === "";
    if (Array.isArray(v)) return v.length === 0;
    return false;
}

function extractValueFromInputFieldEvent(e: any) {
    if (e && typeof e === "object" && "value" in e) return (e as any).value;
    return e;
}

/**
 * Option id used by runtime applyFilterOption:
 * prefer explicit opt.id; fallback for legacy shapes.
 */
function getOptionId(opt: any): FilterValue {
    if (opt?.id != null) return opt.id as FilterValue;
    if (opt?.value != null) return opt.value as FilterValue;
    return String(opt?.label ?? "node");
}

export function ListerFiltersButton<TFilters>(props: {
    id: ListerSessionId;

    /** kept for compatibility, but we use live state from useLister() */
    store: ListerStoreState;

    icon?: React.ReactNode;
    buttonProps?: Partial<React.ComponentProps<typeof Button>>;
}) {
    const { id } = props;

    const { actions, state } = useLister<AnyPresetMap>();

    const session = (state.sessions as any)[id] as any;

    const spec = session?.filtersSpec as
        | undefined
        | { options: Array<ListerFilterOption<TFilters>> };

    const options = (spec?.options ?? []) as Array<
        ListerFilterOption<TFilters>
    >;
    const hasFilters = options.length > 0;

    if (!hasFilters) return null;

    const ctx = actions.getFilterCtx<TFilters>(id);

    const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
        {},
    );

    const toggleGroup = (key: string) => {
        setOpenGroups((m) => ({ ...m, [key]: !m[key] }));
    };

    const selectedIds = asArray<FilterValue>(session?.selectedFilterValues);

    const appliedCount = React.useMemo(() => {
        const patch = (session?.filtersPatch ?? {}) as Record<string, any>;
        return Object.keys(patch).length;
    }, [session?.filtersPatch]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="link"
                    title="Filters"
                    className="relative px-1! pr-2! cursor-pointer"
                    {...(props.buttonProps as any)}
                >
                    {props.icon ?? <Filter className="size-3" />}

                    {appliedCount > 0 ? (
                        <span
                            className={[
                                "absolute right-1 top-1",
                                "min-w-3 h-3 px-1",
                                "rounded-full",
                                "bg-primary text-primary-foreground",
                                "text-[9px] leading-4",
                                "flex items-center justify-center",
                            ].join(" ")}
                            aria-label={`${appliedCount} filters applied`}
                        >
                            {appliedCount}
                        </span>
                    ) : null}
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-90 p-3">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Filters</div>
                    <div className="text-xs opacity-60">
                        Tap outside to close
                    </div>
                </div>

                <div className="mt-3 space-y-1">
                    {options.map((opt) => {
                        const nodeId = getOptionId(opt as any);
                        return (
                            <FilterNode
                                key={String(nodeId)}
                                nodeId={nodeId}
                                option={opt}
                                ctx={ctx}
                                selectedIds={selectedIds}
                                openGroups={openGroups}
                                onToggleGroup={toggleGroup}
                                onApply={(optionId) =>
                                    actions.applyFilterOption(id, optionId)
                                }
                            />
                        );
                    })}
                </div>

                <div className="mt-3 flex items-center justify-end gap-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => ctx.clear()}
                        title="Clear filter values"
                    >
                        <X className="h-4 w-4" />
                        <span className="ml-1">Clear</span>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

function FilterNode<TFilters>(props: {
    nodeId: FilterValue;

    option: ListerFilterOption<TFilters>;
    ctx: ListerFilterCtx<TFilters>;

    selectedIds: Array<FilterValue>;

    openGroups: Record<string, boolean>;
    onToggleGroup: (key: string) => void;

    onApply: (optionId: FilterValue) => void;

    depth?: number;
}) {
    const { option, ctx, selectedIds, onApply, nodeId } = props;
    const depth = props.depth ?? 0;

    const optAny = option as any;

    // custom render wins
    if (option.render) {
        return (
            <div className={depth ? "pl-3" : ""}>
                {option.render({
                    option,
                    ctx,
                    state: {
                        open: true,
                        selected: selectedIds.includes(nodeId),
                    },
                    actions: { close() {} },
                })}
            </div>
        );
    }

    const hasChildren = !!option.children?.length;

    const groupKey = `group:${String(nodeId)}`;
    const groupOpen = Boolean(props.openGroups[groupKey]);

    // value nodes are clickable (also allow apply presence)
    const isValueKind = optAny?.kind === "value";
    const hasApply = !!optAny?.apply;
    const isClickableToggle = isValueKind || hasApply;

    const isInput = !!optAny.input;
    const isSelected = selectedIds.includes(nodeId);

    const resolvedInputBindKey = (optAny.input?.bindKey ?? optAny.bindKey) as
        | (keyof TFilters & string)
        | undefined;

    const renderRow = () => {
        return (
            <div
                className={[
                    "flex items-center gap-2 rounded-md px-2 py-1.5",
                    "hover:bg-muted/50",
                    option.disabled ? "opacity-50 pointer-events-none" : "",
                ].join(" ")}
            >
                {hasChildren ? (
                    <button
                        type="button"
                        className="flex size-5 items-center justify-center rounded-md hover:bg-muted"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            props.onToggleGroup(groupKey);
                        }}
                        aria-label="Toggle group"
                    >
                        <ChevronRight
                            className={[
                                "h-4 w-4 transition-transform",
                                groupOpen ? "rotate-90" : "",
                            ].join(" ")}
                        />
                    </button>
                ) : (
                    <span className="size-5" />
                )}

                {isClickableToggle ? (
                    <button
                        type="button"
                        className="flex flex-1 items-center justify-between gap-3 text-left"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onApply(nodeId);
                        }}
                    >
                        <div className="min-w-0">
                            <div className="truncate text-sm">
                                {option.label ?? String((option as any).value)}
                            </div>
                            {option.description ? (
                                <div className="truncate text-xs opacity-70">
                                    {option.description}
                                </div>
                            ) : null}
                        </div>

                        <span className="flex items-center">
                            {isSelected ? (
                                <Check className="h-4 w-4" />
                            ) : (
                                <span className="h-4 w-4" />
                            )}
                        </span>
                    </button>
                ) : (
                    <div className="flex-1 min-w-0">
                        <div className="truncate text-sm">
                            {option.label ?? String((option as any).value)}
                        </div>
                        {option.description ? (
                            <div className="truncate text-xs opacity-70">
                                {option.description}
                            </div>
                        ) : null}
                    </div>
                )}
            </div>
        );
    };

    const renderInput = () => {
        if (!optAny.input) return null;
        if (!resolvedInputBindKey) return null;

        const currentValue = ctx.get(resolvedInputBindKey as any);
        const variant = optAny.input.variant as VariantKey;
        const extraProps = (optAny.input.props ?? {}) as VariantPropsFor<any>;

        return (
            <div className="pl-9 pr-2 pb-2">
                <InputField
                    variant={variant}
                    {...(extraProps as any)}
                    value={currentValue as any}
                    onChange={(e: any) => {
                        const v = extractValueFromInputFieldEvent(e);

                        if (optAny.input?.unsetOnEmpty && isEmptyValue(v)) {
                            ctx.unset(resolvedInputBindKey as any);
                            return;
                        }

                        const mode = optAny.input?.mode ?? "replace";
                        if (mode === "merge") {
                            ctx.merge({ [resolvedInputBindKey]: v } as any);
                        } else {
                            ctx.set(resolvedInputBindKey as any, v);
                        }
                    }}
                />
            </div>
        );
    };

    return (
        <div className={depth ? "pl-2" : ""}>
            {renderRow()}

            {isInput ? renderInput() : null}

            {hasChildren && groupOpen ? (
                <div className="mt-1 space-y-1">
                    {option.children!.map((child) => {
                        const childId = getOptionId(child as any);
                        return (
                            <FilterNode
                                key={String(childId)}
                                nodeId={childId}
                                option={child}
                                ctx={ctx}
                                selectedIds={selectedIds}
                                openGroups={props.openGroups}
                                onToggleGroup={props.onToggleGroup}
                                onApply={onApply}
                                depth={depth + 1}
                            />
                        );
                    })}
                </div>
            ) : null}
        </div>
    );
}
