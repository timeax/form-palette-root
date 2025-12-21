// noinspection SuspiciousTypeOfGuard

import { SelectPrimitive } from "@/variants/helpers/selection-summary";
import React from "react";
import { ShadcnTreeSelectVariantProps } from "@/presets/shadcn-variants/treeselect";
import {
    NormalizedTreeItem,
    TreeKey,
    TreeSelectOption,
} from "@/presets/shadcn-variants/tree-select-types";

/* ──────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────── */

export type OptionRenderFn = (...args: any[]) => React.ReactNode;

export type OptionAccessor<TItem, TValue> =
    | ((item: TItem, index: number) => TValue)
    | keyof TItem
    | string
    | null
    | undefined;

export type OptionAccessorNoIndex<TItem, TValue> =
    | ((item: TItem) => TValue)
    | keyof TItem
    | string
    | null
    | undefined;

export type OptionKeyAccessor<TItem> =
    | ((item: TItem, index: number) => React.Key)
    | keyof TItem
    | string
    | null
    | undefined;

export interface GlobalNormalizeConfig<TItem, TValue = SelectPrimitive> {
    autoCap?: boolean;

    optionLabel?: OptionAccessorNoIndex<TItem, React.ReactNode>;
    optionValue?: OptionAccessorNoIndex<TItem, TValue>;
    optionDescription?: OptionAccessorNoIndex<TItem, React.ReactNode>;
    optionDisabled?: OptionAccessorNoIndex<TItem, boolean>;
    optionIcon?: OptionAccessorNoIndex<TItem, React.ReactNode>;
    optionKey?: OptionKeyAccessor<TItem>;
}

export interface GlobalNormalizedOption<TItem, TValue = SelectPrimitive> {
    key: string;
    value: TValue;
    labelNode: React.ReactNode;
    labelText: string;
    description?: React.ReactNode;
    disabled: boolean;
    icon?: React.ReactNode;

    /** Option-level renderer (falls back to global renderOption in the variant) */
    render?: OptionRenderFn;

    raw: TItem;
}

/* ──────────────────────────────────────────────────────────────
 * Shared core normalizer (used by list + tree)
 * ────────────────────────────────────────────────────────────── */

function isPrimitiveOption(raw: unknown): raw is string | number {
    return typeof raw === "string" || typeof raw === "number";
}

function asObject(raw: any): any {
    return isPrimitiveOption(raw) ? { label: String(raw), value: raw } : raw;
}

/**
 * Support option-level renderers without introducing a new prop name.
 * First function found wins.
 */
const RENDER_KEYS = [
    "render",
    "renderOption",
    "renderItem",
    "renderLabel",
    "renderer",
] as const;

function resolveRender(obj: any): OptionRenderFn | undefined {
    if (!obj) return undefined;

    for (const k of RENDER_KEYS) {
        const maybe = obj[k];
        if (typeof maybe === "function") return maybe as OptionRenderFn;
    }

    return undefined;
}

function resolveValue<TItem, TValue>(
    raw: TItem,
    obj: any,
    index: number,
    optionValue: GlobalNormalizeConfig<TItem, TValue>["optionValue"]
): TValue {
    // EXACT behaviour preserved:
    // - if fn: call with *raw*
    // - if string: read obj[key]
    // - else: fallback chain obj.value ?? obj.id ?? obj.key ?? String(index)
    return typeof optionValue === "function"
        ? optionValue(raw)
        : typeof optionValue === "string"
          ? (obj[optionValue] as TValue)
          : ((obj.value ?? obj.id ?? obj.key ?? String(index)) as TValue);
}

function resolveLabelNode<TItem, TValue>(
    raw: TItem,
    obj: any,
    value: TValue,
    optionLabel: GlobalNormalizeConfig<TItem, TValue>["optionLabel"]
): React.ReactNode {
    // EXACT behaviour preserved:
    // - if fn: call with raw
    // - if string: obj[key] ?? obj.label ?? String(value)
    // - else: obj.label ?? String(value)
    return typeof optionLabel === "function"
        ? optionLabel(raw)
        : typeof optionLabel === "string"
          ? (obj[optionLabel] ?? obj.label ?? String(value))
          : (obj.label ?? String(value));
}

function resolveDescription<TItem, TValue>(
    raw: TItem,
    obj: any,
    optionDescription: GlobalNormalizeConfig<TItem, TValue>["optionDescription"]
): React.ReactNode {
    // EXACT behaviour preserved:
    return typeof optionDescription === "function"
        ? optionDescription(raw)
        : typeof optionDescription === "string"
          ? obj[optionDescription]
          : obj.description;
}

function resolveDisabled<TItem, TValue>(
    raw: TItem,
    obj: any,
    optionDisabled: GlobalNormalizeConfig<TItem, TValue>["optionDisabled"]
): boolean {
    // EXACT behaviour preserved:
    return typeof optionDisabled === "function"
        ? optionDisabled(raw)
        : typeof optionDisabled === "string"
          ? !!obj[optionDisabled]
          : !!obj.disabled;
}

function resolveIcon<TItem, TValue>(
    raw: TItem,
    obj: any,
    optionIcon: GlobalNormalizeConfig<TItem, TValue>["optionIcon"]
): React.ReactNode {
    // EXACT behaviour preserved:
    return typeof optionIcon === "function"
        ? optionIcon(raw)
        : typeof optionIcon === "string"
          ? obj[optionIcon]
          : obj.icon;
}

function resolveKey<TItem, TValue>(
    raw: TItem,
    obj: any,
    index: number,
    value: TValue,
    optionKey: GlobalNormalizeConfig<TItem, TValue>["optionKey"]
): React.Key {
    // EXACT behaviour preserved:
    return typeof optionKey === "function"
        ? optionKey(raw, index)
        : typeof optionKey === "string"
          ? (obj[optionKey] ?? (value as any) ?? index)
          : (obj.key ?? (value as any) ?? index);
}

function resolveLabelText<TValue>(
    labelNode: React.ReactNode,
    obj: any,
    value: TValue
): string {
    // EXACT behaviour preserved:
    return typeof labelNode === "string"
        ? labelNode
        : typeof labelNode === "number"
          ? String(labelNode)
          : (obj.labelText ?? String(value));
}

function normalizeOne<TItem, TValue>(
    raw: TItem,
    index: number,
    config: GlobalNormalizeConfig<TItem, TValue>
): GlobalNormalizedOption<TItem, TValue> {
    const obj = asObject(raw);

    const value = resolveValue(raw, obj, index, config.optionValue);

    let labelNode = resolveLabelNode(raw, obj, value, config.optionLabel);

    if (config.autoCap && typeof labelNode === "string") {
        labelNode = capitalizeFirst(labelNode);
    }

    const labelText = resolveLabelText(labelNode, obj, value);

    const description = resolveDescription(raw, obj, config.optionDescription);
    const disabled = resolveDisabled(raw, obj, config.optionDisabled);
    const icon = resolveIcon(raw, obj, config.optionIcon);
    const key = resolveKey(raw, obj, index, value, config.optionKey);

    const render = resolveRender(obj);

    return {
        key: String(key),
        value,
        labelNode,
        labelText,
        description,
        disabled,
        icon,
        render,
        raw,
    };
}

/* ──────────────────────────────────────────────────────────────
 * Public exports
 * ────────────────────────────────────────────────────────────── */

// Overload kept to avoid breaking call-sites that were using <T> as a cast.
export function globalNormalizeOptions<T>(opts: any, config: any): T[];
export function globalNormalizeOptions<TItem, TValue = SelectPrimitive>(
    opts: readonly TItem[] | undefined | null,
    config: GlobalNormalizeConfig<TItem, TValue>
): GlobalNormalizedOption<TItem, TValue>[];
export function globalNormalizeOptions(opts: any, config: any) {
    if (!opts || !opts.length) return [];
    return opts.map((raw: any, index: number) =>
        normalizeOne(raw, index, config)
    );
}

export function globalNormalizeCheckBasedOptions<
    TItem extends Record<string, any>,
    TLabelKey extends keyof TItem | null | undefined,
    TValueKey extends keyof TItem | null | undefined,
>(
    item: TItem,
    index: number,
    optionLabelKey: TLabelKey,
    optionValueKey: TValueKey
) {
    const anyItem = item as any;

    const rawValue =
        optionValueKey != null
            ? anyItem[optionValueKey as string]
            : anyItem.value;

    const value = rawValue as any;

    const rawLabel =
        optionLabelKey != null
            ? anyItem[optionLabelKey as string]
            : (anyItem.label ?? String(rawValue ?? index));

    const description = anyItem.description;
    const disabled = !!anyItem.disabled;
    const key: React.Key = anyItem.key ?? index;

    const render = resolveRender(anyItem);

    return {
        key: String(key),
        value,
        label: rawLabel,
        description,
        disabled,
        render,
        raw: item,
    };
}

export type NormalizedTreeItemWithRender = NormalizedTreeItem & {
    render?: OptionRenderFn;
};

export function normalizeTree(
    opts: readonly TreeSelectOption[] | undefined,
    config: Pick<
        ShadcnTreeSelectVariantProps,
        | "autoCap"
        | "optionLabel"
        | "optionValue"
        | "optionDescription"
        | "optionDisabled"
        | "optionIcon"
        | "optionKey"
    >,
    level = 0,
    parentValue?: TreeKey,
    path: TreeKey[] = []
): NormalizedTreeItemWithRender[] {
    if (!opts || !opts.length) return [];

    return opts.map((raw, index) => {
        // We keep the same “primitive -> {label,value}” coercion
        const obj = asObject(raw);

        // Reuse the same normalization core, but with TreeKey value typing
        const base = normalizeOne<TreeSelectOption, TreeKey>(
            raw,
            index,
            config as any // (config shape matches; this avoids duplicating the resolver types)
        );

        const childrenRaw: TreeSelectOption[] | undefined = obj.children;

        const nextPath = [...path, base.value];

        const children = normalizeTree(
            childrenRaw ?? [],
            config,
            level + 1,
            base.value,
            nextPath
        );

        return {
            ...base,
            level,
            parentValue,
            path, // ancestors only (EXACT behaviour preserved)
            hasChildren: !!children.length,
            children,
        };
    });
}

export function capitalizeFirst(label: string): string {
    if (!label) return label;
    return label.charAt(0).toUpperCase() + label.slice(1);
}
