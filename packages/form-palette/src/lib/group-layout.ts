// src/lib/group-layout.ts
import type * as React from "react";
import { cn } from "@/lib/utils";

export type GroupLayoutMode = "list" | "grid";

export interface BuildGroupLayoutOptions {
    layout: GroupLayoutMode;
    columns: number;
    itemGapPx?: number;

    // outer classes
    groupClassName?: string;
    className?: string; // alias fallback used by some variants

    // option row classes
    optionClassName?: string;

    // text classes
    labelClassName?: string;
    descriptionClassName?: string;

    // precomputed style tokens that differ per variant
    densityPaddingClass: string;
    labelTextSizeClass: string;
    descriptionTextSizeClass: string;
}

export interface BuildGroupLayoutResult {
    groupStyle: React.CSSProperties | undefined;
    groupClasses: string;
    baseOptionClass: string;
    labelClassesBase: string;
    descriptionClassesBase: string;
}

/**
 * Shared helper to compute group layout style + classes for list/grid option groups.
 * Variants provide their own density and text-size class tokens.
 */
export function buildGroupLayoutClasses(
    opts: BuildGroupLayoutOptions
): BuildGroupLayoutResult {
    const {
        layout,
        columns,
        itemGapPx,
        groupClassName,
        className,
        optionClassName,
        labelClassName,
        descriptionClassName,
        densityPaddingClass,
        labelTextSizeClass,
        descriptionTextSizeClass,
    } = opts;

    let groupStyle: React.CSSProperties | undefined;
    if (!itemGapPx) {
        if (layout === "grid") {
            groupStyle = {
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            } as React.CSSProperties;
        }
    } else if (layout === "list") {
        groupStyle = { rowGap: itemGapPx } as React.CSSProperties;
    } else {
        groupStyle = {
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: itemGapPx,
        } as React.CSSProperties;
    }

    const groupClasses = cn(
        layout === "grid" ? "grid" : "flex flex-col",
        groupClassName ?? className
    );

    const baseOptionClass = cn(
        "relative flex items-start",
        "data-[disabled=true]:opacity-60 data-[disabled=true]:cursor-not-allowed",
        densityPaddingClass,
        optionClassName
    );

    const labelClassesBase = cn(
        "font-medium text-foreground",
        labelTextSizeClass,
        labelClassName
    );

    const descriptionClassesBase = cn(
        "mt-0.5 text-muted-foreground",
        descriptionTextSizeClass,
        descriptionClassName
    );

    return {
        groupStyle,
        groupClasses,
        baseOptionClass,
        labelClassesBase,
        descriptionClassesBase,
    };
}
