// noinspection RedundantConditionalExpressionJS,PointlessBooleanExpressionJS,SuspiciousTypeOfGuard,GrazieInspection,GrazieStyle

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/presets/ui/checkbox";
import { globalNormalizeCheckBasedOptions } from "@/lib/normalise-options";
import { buildGroupLayoutClasses } from "@/lib/group-layout";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxDensity = "compact" | "comfortable" | "loose";
export type CheckboxLayoutMode = "list" | "grid";

/**
 * Internal state we store in the value list.
 * "none" never goes into the external value.
 */
export type CheckboxTriStateValue = true | false;

/**
 * Internal state we pass to the Shadcn checkbox.
 * "none" is used to represent "no stance yet".
 */
export type CheckboxInternalState = true | false | "none";

export interface CheckboxGroupEntry<TValue> {
    value: TValue;
    state: CheckboxTriStateValue; // true or false only
}

export type CheckboxGroupValue<TValue> =
    | readonly CheckboxGroupEntry<TValue>[]
    | undefined;

/**
 * Single checkbox value.
 * undefined → "none"
 */
export type CheckboxSingleValue = boolean | undefined;

/**
 * Public union type for the variant's value.
 *
 * - In single mode: we expect CheckboxSingleValue
 * - In group mode: we expect CheckboxGroupValue<TValue>
 *
 * At the type level this is a union; at runtime we branch using `single`.
 */
export type CheckboxVariantValue<TValue> =
    | CheckboxSingleValue
    | CheckboxGroupValue<TValue>;

export interface CheckboxItem<TValue> {
    value: TValue;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    key?: React.Key;

    /**
     * Option-level renderer (provided by the normaliser).
     * If present, it should override the variant-level `renderOption` for this item.
     */
    render?: (ctx: CheckboxRenderOptionContext<TValue>) => React.ReactNode;

    /**
     * Override tri-state behaviour for this item.
     * If undefined, variant-level `tristate` is used.
     */
    tristate?: boolean;
}

export interface CheckboxMappers<TItem, TValue> {
    getValue: (item: TItem, index: number) => TValue;
    getLabel: (item: TItem, index: number) => React.ReactNode;
    getDescription?: (item: TItem, index: number) => React.ReactNode;
    isDisabled?: (item: TItem, index: number) => boolean;
    getKey?: (item: TItem, index: number) => React.Key;
    getTristate?: (item: TItem, index: number) => boolean | undefined;
}

export interface CheckboxRenderOptionContext<TValue> {
    item: CheckboxItem<TValue>;
    index: number;
    state: CheckboxInternalState;
    effectiveTristate: boolean;
    disabled: boolean;
    size: CheckboxSize;
    density: CheckboxDensity;
    checkboxId?: string;
    click(): void;
    /**
     * Prebuilt Shadcn checkbox node.
     */
    checkbox: React.ReactNode;
}

/**
 * UI props for both single and group modes.
 */
export interface ShadcnCheckboxUiProps<TItem, TValue> {
    /**
     * Group mode:
     *  - Required when `single` is not true.
     *
     * Single mode:
     *  - Optional; if provided, `items[0]` can supply label/description.
     */
    items?: readonly TItem[];

    /**
     * Mapping functions for arbitrary item shapes.
     * Takes precedence over optionValue/optionLabel.
     */
    mappers?: CheckboxMappers<TItem, TValue>;

    /**
     * Property name that holds the value on each item.
     *
     * Example:
     *   items = [{ id: "read", label: "Read" }]
     *   optionValue = "id"
     */
    optionValue?: keyof TItem;

    /**
     * Property name that holds the label on each item.
     *
     * Example:
     *   items = [{ id: "read", title: "Read" }]
     *   optionLabel = "title"
     */
    optionLabel?: keyof TItem;

    /**
     * Custom renderer for each option row.
     */
    renderOption?: (
        ctx: CheckboxRenderOptionContext<TValue>
    ) => React.ReactNode;

    /**
     * If true, treat this variant as a single checkbox instead of a group.
     *
     * Value is then CheckboxSingleValue (boolean | undefined).
     */
    single?: boolean;

    /**
     * Variant-level default tri-state behaviour.
     *
     * - In single mode: directly controls tri-state for the single checkbox.
     * - In group mode: default for all items, unless item.tristate overrides.
     */
    tristate?: boolean;

    /**
     * Layout mode in group mode: vertical list or CSS grid.
     */
    layout?: CheckboxLayoutMode;

    /**
     * Number of columns in grid mode.
     * Default: 2.
     */
    columns?: number;

    /**
     * Gap between items in px.
     */
    itemGapPx?: number;

    /**
     * Visual size of the checkbox / text.
     * Default: "md".
     */
    size?: CheckboxSize;

    /**
     * Vertical density of each row.
     * Default: "comfortable".
     */
    density?: CheckboxDensity;

    /**
     * When true, capitalizes the first letter of the label
     * (only applied when the label is a string).
     */
    autoCap?: boolean;

    /**
     * ARIA attributes for the group wrapper.
     */
    "aria-label"?: string;
    "aria-labelledby"?: string;

    /**
     * Wrapper class for the entire group (or single field).
     */
    groupClassName?: string;

    /**
     * Extra classes for each option row (group mode).
     */
    optionClassName?: string;

    /**
     * Extra classes for the option label text.
     */
    labelClassName?: string;

    /**
     * Extra classes for the option label text in group mode only.
     * This allows styling group item labels without affecting single mode labels.
     */
    optionLabelClassName?: string;

    /**
     * Extra classes for the option description text.
     */
    descriptionClassName?: string;

    /**
     * Single-mode inline label (if you want variant-level text).
     * Usually you'll rely on InputField's label instead.
     */
    singleLabel?: React.ReactNode;

    /**
     * Single-mode description text under the label.
     */
    singleDescription?: React.ReactNode;
}

/**
 * Full props for the Shadcn-based checkbox variant.
 *
 * TValue: primitive or object key
 * TItem: item shape used to build checkbox items
 */
export type ShadcnCheckboxVariantProps<
    TValue,
    TItem = CheckboxItem<TValue>,
> = ShadcnCheckboxUiProps<TItem, TValue> &
    Pick<
        VariantBaseProps<CheckboxVariantValue<TValue>>,
        "value" | "onValue" | "error" | "disabled" | "required"
    > & {
        id?: string;
        className?: string; // alias for groupClassName
        name?: string; // optional: name for native form post in group mode
        "aria-describedby"?: string;
    };

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function paddingForDensity(density: CheckboxDensity): string {
    switch (density) {
        case "compact":
        // return "py-1.5";
        case "loose":
            return "py-2";
        case "comfortable":
        default:
            return "py-0";
    }
}

function labelTextSize(size: CheckboxSize): string {
    switch (size) {
        case "sm":
            return "text-xs";
        case "lg":
            return "text-base";
        case "md":
        default:
            return "text-sm";
    }
}

function descriptionTextSize(size: CheckboxSize): string {
    switch (size) {
        case "sm":
            return "text-[0.7rem]";
        case "lg":
            return "text-sm";
        case "md":
        default:
            return "text-xs";
    }
}

function capitalizeFirst(label: string): string {
    if (!label) return label;
    return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Normalize arbitrary items to CheckboxItem<TValue>[] using:
 * 1) mappers,
 * 2) optionValue/optionLabel,
 * 3) native CheckboxItem fields,
 * 4) primitive arrays (string[] / number[] / boolean[]).
 */
function normalizeItems<TItem, TValue>(
    items: readonly TItem[] | undefined,
    mappers?: CheckboxMappers<TItem, TValue>,
    optionValueKey?: keyof TItem,
    optionLabelKey?: keyof TItem
): CheckboxItem<TValue>[] {
    if (!items || !items.length) return [];

    // 1) Explicit mappers win
    if (mappers) {
        return items.map((item, index) => ({
            value: mappers.getValue(item, index),
            label: mappers.getLabel(item, index),
            description: mappers.getDescription
                ? mappers.getDescription(item, index)
                : undefined,
            disabled: mappers.isDisabled
                ? mappers.isDisabled(item, index)
                : false,
            key: mappers.getKey ? mappers.getKey(item, index) : index,
            tristate: mappers.getTristate
                ? mappers.getTristate(item, index)
                : undefined,
        }));
    }

    // 2) optionValue / optionLabel
    if (optionValueKey || optionLabelKey) {
        return items.map((item, index) => {
            const anyItem = item as any;
            const normalised = globalNormalizeCheckBasedOptions(
                item as any,
                index,
                optionLabelKey,
                optionValueKey
            );
            const tristate = anyItem.tristate as boolean | undefined;

            return {
                ...normalised,
                tristate,
            };
        });
    }

    // 3 & 4) Fallbacks:
    //    - primitive arrays (string[] / number[] / boolean[])
    //    - already-shaped CheckboxItem<TValue>[]
    return items.map((item, index) => {
        if (
            typeof item === "string" ||
            typeof item === "number" ||
            typeof item === "boolean"
        ) {
            const v = item as unknown as TValue;
            return {
                value: v,
                label: String(item),
                description: undefined,
                disabled: false,
                key: index,
                tristate: undefined,
            } satisfies CheckboxItem<TValue>;
        }

        return item as unknown as CheckboxItem<TValue>;
    });
}

function isEqualValue(a: unknown, b: unknown): boolean {
    return Object.is(a, b);
}

/**
 * Extract group value from the union.
 */
function asGroupValue<TValue>(
    value: CheckboxVariantValue<TValue>
): CheckboxGroupValue<TValue> {
    if (!value) return undefined;
    if (Array.isArray(value)) return value;
    return undefined;
}

/**
 * Extract single value from the union.
 */
function asSingleValue(
    value: CheckboxVariantValue<unknown>
): CheckboxSingleValue {
    if (Array.isArray(value)) return undefined;
    if (typeof value === "boolean" || value === undefined) return value;
    return undefined;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const InnerShadcnCheckboxVariant = <TValue, TItem = CheckboxItem<TValue>>(
    props: ShadcnCheckboxVariantProps<TValue, TItem>,
    ref: React.Ref<HTMLDivElement>
) => {
    const {
        // variant base
        value,
        onValue,
        error,
        disabled,
        required,

        // UI / behaviour
        items,
        mappers,
        optionValue,
        optionLabel,
        renderOption,
        single,
        tristate: tristateDefault,
        layout = "list",
        columns = 2,
        itemGapPx,
        size = "md",
        density = "comfortable",
        autoCap = false,

        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        name,

        groupClassName,
        optionClassName,
        labelClassName,
        optionLabelClassName,
        descriptionClassName,

        className, // alias for groupClassName

        singleLabel,
        singleDescription,

        id,
        ...restProps
    } = props;

    const hasError = !!error;
    const isSingle = !!single;

    // ─────────────────────────────────────────
    // Single mode
    // ─────────────────────────────────────────
    if (isSingle) {
        const singleVal = asSingleValue(value);
        const effectiveTristate = !!tristateDefault;

        const internalState: CheckboxInternalState = effectiveTristate
            ? (singleVal ?? "none")
            : !!singleVal;

        const handleSingleChange = (next: CheckboxInternalState) => {
            if (!onValue || disabled) return;

            let nextPublic: CheckboxSingleValue;

            if (effectiveTristate) {
                // tri-state single:
                // "none" → undefined
                // true/false → same
                nextPublic = next === "none" ? undefined : !!next;
            } else {
                // non-tristate: behave like normal checkbox
                nextPublic = next === true;
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: nextPublic,
                nativeEvent: undefined,
                meta: undefined,
            };

            onValue(nextPublic, detail);
        };

        let labelText = singleLabel ?? undefined;
        if (autoCap && typeof labelText === "string") {
            labelText = capitalizeFirst(labelText);
        }

        const descriptionText = singleDescription ?? undefined;

        const labelCls = cn(
            "text-foreground",
            labelTextSize(size),
            labelClassName
        );

        const descriptionCls = cn(
            "mt-0.5 text-muted-foreground",
            descriptionTextSize(size),
            descriptionClassName
        );

        return (
            <div
                ref={ref}
                role="group"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                aria-invalid={hasError || undefined}
                aria-required={required || undefined}
                data-slot="checkbox-single"
                className={cn(
                    "flex items-start gap-3",
                    paddingForDensity(density),
                    groupClassName ?? className
                )}
                {...restProps}
            >
                <Checkbox
                    id={id}
                    checked={internalState}
                    tristate={effectiveTristate}
                    disabled={disabled}
                    onCheckedChange={handleSingleChange}
                    className="mt-0.5"
                />

                {(labelText || descriptionText) && (
                    <div className="flex min-w-0 flex-col">
                        {labelText && (
                            <span className={labelCls}>{labelText}</span>
                        )}
                        {descriptionText && (
                            <span className={descriptionCls}>
                                {descriptionText}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // ─────────────────────────────────────────
    // Group mode
    // ─────────────────────────────────────────

    const groupValue = asGroupValue<TValue>(value);
    const normalized = React.useMemo(
        () =>
            normalizeItems<TItem, TValue>(
                items,
                mappers,
                optionValue,
                optionLabel
            ),
        [items, mappers, optionValue, optionLabel]
    );

    const {
        groupStyle,
        groupClasses,
        baseOptionClass,
        labelClassesBase,
        descriptionClassesBase,
    } = buildGroupLayoutClasses({
        layout,
        columns,
        itemGapPx,
        groupClassName,
        className,
        optionClassName,
        labelClassName,
        descriptionClassName,
        densityPaddingClass: paddingForDensity(density),
        labelTextSizeClass: labelTextSize(size),
        descriptionTextSizeClass: descriptionTextSize(size),
    });

    const findEntryIndex = React.useCallback(
        (val: TValue): number => {
            if (!groupValue) return -1;
            return groupValue.findIndex((e) => isEqualValue(e.value, val));
        },
        [groupValue]
    );

    const getEntryState = React.useCallback(
        (val: TValue): CheckboxTriStateValue | "none" => {
            const idx = findEntryIndex(val);
            if (!groupValue || idx === -1) return "none";
            return groupValue[idx].state;
        },
        [groupValue, findEntryIndex]
    );

    const updateGroupValue = React.useCallback(
        (
            itemValue: TValue,
            nextInternal: CheckboxInternalState,
            effectiveTristate: boolean
        ) => {
            if (!onValue || disabled) return;

            const currentList = groupValue ? [...groupValue] : [];
            const idx = currentList.findIndex((e) =>
                isEqualValue(e.value, itemValue)
            );

            let nextList: CheckboxGroupEntry<TValue>[] = currentList;

            if (effectiveTristate) {
                // Tri-state:
                // "none" → remove
                // true/false → ensure entry is present with state
                if (nextInternal === "none") {
                    if (idx !== -1) {
                        nextList = [
                            ...currentList.slice(0, idx),
                            ...currentList.slice(idx + 1),
                        ];
                    }
                } else {
                    const nextState: CheckboxTriStateValue =
                        nextInternal === true;
                    if (idx === -1) {
                        nextList = [
                            ...currentList,
                            { value: itemValue, state: nextState },
                        ];
                    } else {
                        nextList = [...currentList];
                        nextList[idx] = {
                            ...nextList[idx],
                            state: nextState,
                        };
                    }
                }
            } else {
                // Non tri-state:
                // true → ensure present
                // false/"none" → remove entry (false acts as none)
                if (nextInternal === true) {
                    if (idx === -1) {
                        nextList = [
                            ...currentList,
                            { value: itemValue, state: true },
                        ];
                    } else {
                        nextList = [...currentList];
                        nextList[idx] = {
                            ...nextList[idx],
                            state: true,
                        };
                    }
                } else {
                    // false / "none": remove
                    if (idx !== -1) {
                        nextList = [
                            ...currentList.slice(0, idx),
                            ...currentList.slice(idx + 1),
                        ];
                    }
                }
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: nextList,
                nativeEvent: undefined,
                meta: undefined,
            };

            onValue(nextList, detail);
        },
        [onValue, disabled, groupValue]
    );

    return (
        <div
            ref={ref}
            id={id}
            role="group"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            data-slot="checkbox-group"
            className={groupClasses}
            style={groupStyle}
            {...restProps}
        >
            {normalized.map((item, index) => {
                const effectiveTristate =
                    item.tristate ?? tristateDefault ?? false;

                const currentState = getEntryState(item.value);
                const internalState: CheckboxInternalState = effectiveTristate
                    ? currentState // "none" | true | false
                    : currentState === "none"
                      ? false
                      : currentState;

                const optionDisabled = !!disabled || !!item.disabled;
                const optionKey = item.key ?? index;
                const checkboxId = id ? `${id}-option-${optionKey}` : undefined;

                // Apply autoCap to string labels for display
                let displayItem: CheckboxItem<TValue> = item;
                if (autoCap && typeof item.label === "string") {
                    displayItem = {
                        ...item,
                        label: capitalizeFirst(item.label),
                    };
                }

                const checkboxNode = (
                    <Checkbox
                        id={checkboxId}
                        checked={internalState}
                        disabled={optionDisabled}
                        tristate={effectiveTristate}
                        onCheckedChange={(next) =>
                            updateGroupValue(
                                item.value,
                                next as CheckboxInternalState,
                                effectiveTristate
                            )
                        }
                        className="mt-1"
                    />
                );

                const hiddenInput =
                    name != null ? (
                        <input
                            type="hidden"
                            name={name}
                            value={String(item.value)}
                            // Only send if in list; tri-state false still "has standing"
                            // in code, but native form post is simple and you can
                            // derive negative states server-side if you want.
                            disabled={getEntryState(item.value) === "none"}
                        />
                    ) : null;

                
                const renderer = (item as CheckboxItem<TValue>).render ?? renderOption;

                if (renderer) {
                    return (
                        <div
                            key={optionKey}
                            data-slot="checkbox-option"
                            data-disabled={optionDisabled ? "true" : "false"}
                            className={baseOptionClass}
                        >
                            {renderer({
                                item: displayItem,
                                index,
                                state: internalState,
                                effectiveTristate,
                                disabled: optionDisabled,
                                size,
                                density,
                                checkboxId,
                                click() {
                                    if (optionDisabled) return;

                                    const nextInternal: CheckboxInternalState =
                                        effectiveTristate
                                            ? internalState === "none"
                                                ? true
                                                : internalState === true
                                                  ? false
                                                  : "none"
                                            : internalState === true
                                              ? false
                                              : true;

                                    updateGroupValue(
                                        item.value,
                                        nextInternal,
                                        effectiveTristate
                                    );
                                },
                                checkbox: checkboxNode,
                            })}
                            {hiddenInput}
                        </div>
                    );
                }

                // Default row layout: checkbox + label + description
                return (
                    <div
                        key={optionKey}
                        data-slot="checkbox-option"
                        data-disabled={optionDisabled ? "true" : "false"}
                        className={baseOptionClass}
                    >
                        <label
                            htmlFor={checkboxId}
                            className="flex w-full cursor-pointer items-start gap-3 select-none"
                        >
                            {checkboxNode}

                            <div className="flex min-w-0 flex-col">
                                <span
                                    className={cn(
                                        labelClassesBase,
                                        optionLabelClassName
                                    )}
                                >
                                    {displayItem.label}
                                </span>
                                {displayItem.description != null && (
                                    <span className={descriptionClassesBase}>
                                        {displayItem.description}
                                    </span>
                                )}
                            </div>
                        </label>

                        {hiddenInput}
                    </div>
                );
            })}
        </div>
    );
};

export const ShadcnCheckboxVariant = React.forwardRef(
    InnerShadcnCheckboxVariant
) as unknown as <TValue, TItem = CheckboxItem<TValue>>(
    props: ShadcnCheckboxVariantProps<TValue, TItem> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => React.ReactElement | null;

// ShadcnCheckboxVariant.displayName = "ShadcnCheckboxVariant";

export default ShadcnCheckboxVariant;

// ─────────────────────────────────────────────
// Public aliases for the registry
// ─────────────────────────────────────────────

/**
 * Default item value type for the checkbox variant.
 *
 * You can still use the generic ShadcnCheckboxVariantProps<TValue, TItem>
 * directly if you need a different TValue; the registry uses this alias.
 */
export type DefaultCheckboxItemValue = string | number;

/**
 * Public "value" type for the checkbox variant used by the registry:
 *
 * - Single mode: boolean | undefined
 * - Group mode: CheckboxGroupEntry<DefaultCheckboxItemValue>[] | undefined
 *
 * In tri-state group mode, both `true` and `false` entries are present;
 * `"none"` never appears in this type.
 */
export type CheckboxVariantPublicValue =
    CheckboxVariantValue<DefaultCheckboxItemValue>;

/**
 * Public props type for the checkbox variant used by the registry.
 *
 * This is ShadcnCheckboxVariantProps with TValue fixed to DefaultCheckboxItemValue.
 */
export type ShadcnCheckboxVariantPublicProps =
    ShadcnCheckboxVariantProps<DefaultCheckboxItemValue>;
