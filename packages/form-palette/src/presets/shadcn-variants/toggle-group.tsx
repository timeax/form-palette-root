// src/presets/shadcn-variants/toggle.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/presets/ui/toggle-group";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/presets/ui/tooltip";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ToggleOption {
    label: React.ReactNode;
    value: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    tooltip?: React.ReactNode;
    meta?: any;
}

/**
 * Allow primitive options as shorthand:
 * - "free" → { value: "free", label: "free" }
 */
export type ToggleOptionInput = ToggleOption | string | number | boolean;

export interface ShadcnToggleVariantProps
    extends Pick<
        VariantBaseProps<string | string[]>,
        | "value"
        | "onValue"
        | "error"
        | "disabled"
        | "readOnly"
        | "size"
        | "density"
    > {
    /**
     * Options for the toggle group.
     *
     * Can be:
     * - ToggleOption objects
     * - Primitive strings/numbers/booleans (shorthand)
     * - Objects using option* keys (optionValue, optionLabel, etc.)
     */
    options: ToggleOptionInput[];

    multiple?: boolean;
    variant?: "default" | "outline";
    layout?: "horizontal" | "vertical" | "grid";
    gridCols?: number;
    fillWidth?: boolean;

    /**
     * Property name to read the option value from, when using
     * custom option objects.
     *
     * If omitted, falls back to:
     *   - obj.value
     *   - or the primitive itself (for primitive options)
     */
    optionValue?: string;

    /**
     * Property name to read the option label from, when using
     * custom option objects.
     *
     * If omitted, falls back to:
     *   - obj.label
     *   - or String(value)
     */
    optionLabel?: string;

    /**
     * Property name to read an icon node from, when using
     * custom option objects.
     *
     * If omitted, falls back to obj.icon.
     */
    optionIcon?: string;

    /**
     * Property name to read disabled flag from, when using
     * custom option objects.
     *
     * If omitted, falls back to obj.disabled.
     */
    optionDisabled?: string;

    /**
     * Property name to read tooltip content from, when using
     * custom option objects.
     *
     * If omitted, falls back to obj.tooltip.
     */
    optionTooltip?: string;

    /**
     * Property name to read meta from, when using custom option objects.
     *
     * If omitted, falls back to obj.meta.
     */
    optionMeta?: string;

    /**
     * Optional custom renderer for each option.
     * Receives the normalized ToggleOption and selected state.
     */
    renderOption?: (
        option: ToggleOption,
        isSelected: boolean
    ) => React.ReactNode;

    className?: string;

    /** Base class for all items */
    itemClassName?: string;

    /** Class applied ONLY to selected items (overrides/merges with default active styles) */
    activeClassName?: string;

    /**
     * When true, capitalizes the first letter of the label
     * (only applied when the label is a string).
     */
    autoCap?: boolean;

    /**
     * Gap between buttons in pixels.
     *
     * - Applies to both flex (horizontal/vertical) and grid layouts.
     * - If omitted, falls back to Tailwind gap classes.
     */
    gap?: number;
}

// Internal normalized shape, tracking original item
interface NormalizedToggle<T = ToggleOptionInput> {
    ui: ToggleOption;
    raw: T;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function mapSizeToToggleSize(size?: "sm" | "md" | "lg") {
    switch (size) {
        case "sm":
            return "sm";
        case "lg":
            return "lg";
        case "md":
        default:
            return "default";
    }
}

function normalizeValue(
    val: string | string[] | undefined | null,
    multiple: boolean
): string | string[] {
    if (multiple) {
        if (Array.isArray(val)) return val;
        if (typeof val === "string") return [val];
        return [];
    }
    // Single mode
    if (Array.isArray(val)) return val[0] || "";
    return val || "";
}

function capitalizeFirst(label: string): string {
    if (!label) return label;
    return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Normalize a ToggleOptionInput into a full ToggleOption,
 * using option* keys when present.
 *
 * autoCap is only applied to string labels for display.
 */
function normalizeOption(
    input: ToggleOptionInput,
    {
        optionValue,
        optionLabel,
        optionIcon,
        optionDisabled,
        optionTooltip,
        optionMeta,
    }: {
        optionValue?: string;
        optionLabel?: string;
        optionIcon?: string;
        optionDisabled?: string;
        optionTooltip?: string;
        optionMeta?: string;
    },
    autoCap: boolean
): NormalizedToggle {
    const anyInput = input as any;

    // 1) Custom object with option* keys
    if (
        optionValue ||
        optionLabel ||
        optionIcon ||
        optionDisabled ||
        optionTooltip ||
        optionMeta
    ) {
        const rawValue =
            optionValue != null
                ? anyInput[optionValue]
                : (anyInput.value ?? input);
        const value = String(rawValue);

        let label: React.ReactNode;
        if (optionLabel != null) {
            label = anyInput[optionLabel];
        } else if (anyInput.label != null) {
            label = anyInput.label;
        } else {
            label = String(rawValue ?? value);
        }

        if (autoCap && typeof label === "string") {
            label = capitalizeFirst(label);
        }

        const icon =
            optionIcon != null
                ? anyInput[optionIcon]
                : (anyInput.icon ?? undefined);
        const disabled =
            optionDisabled != null
                ? !!anyInput[optionDisabled]
                : !!anyInput.disabled;
        const tooltip =
            optionTooltip != null
                ? anyInput[optionTooltip]
                : (anyInput.tooltip ?? undefined);
        const meta =
            optionMeta != null
                ? anyInput[optionMeta]
                : (anyInput.meta ?? undefined);

        return {
            ui: {
                value,
                label,
                icon,
                disabled,
                tooltip,
                meta,
            },
            raw: input,
        };
    }

    // 2) Primitive shorthand
    if (
        typeof input === "string" ||
        typeof input === "number" ||
        typeof input === "boolean"
    ) {
        const value = String(input);
        let label: React.ReactNode = value;
        if (autoCap && typeof label === "string") {
            label = capitalizeFirst(label);
        }

        return {
            ui: {
                value,
                label,
            },
            raw: input,
        };
    }

    // 3) Already a ToggleOption-like object
    const baseValue = anyInput.value ?? String(anyInput.label ?? "");
    const value = String(baseValue);

    let label: React.ReactNode =
        anyInput.label != null ? anyInput.label : String(value);
    if (autoCap && typeof label === "string") {
        label = capitalizeFirst(label);
    }

    return {
        ui: {
            value,
            label,
            icon: anyInput.icon,
            disabled: !!anyInput.disabled,
            tooltip: anyInput.tooltip,
            meta: anyInput.meta,
        },
        raw: input,
    };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnToggleVariant = React.forwardRef<
    HTMLDivElement,
    ShadcnToggleVariantProps
>(function ShadcnToggleVariant(props, ref) {
    const {
        value,
        onValue,
        disabled,
        readOnly,
        error,
        size = "md",

        options = [],
        multiple = false,
        variant = "default",
        layout = "horizontal",
        gridCols = 2,
        fillWidth: fullWidth = false,

        optionValue,
        optionLabel,
        optionIcon,
        optionDisabled,
        optionTooltip,
        optionMeta,

        renderOption,
        className,
        itemClassName,
        activeClassName,
        autoCap = false,
        gap: itemGapPx,
    } = props;

    const isDisabled = Boolean(disabled || readOnly);
    const toggleSize = mapSizeToToggleSize(size as any);
    const currentValue = normalizeValue(value, multiple);

    const normalizedOptions = React.useMemo(
        () =>
            options.map((opt) =>
                normalizeOption(
                    opt,
                    {
                        optionValue,
                        optionLabel,
                        optionIcon,
                        optionDisabled,
                        optionTooltip,
                        optionMeta,
                    },
                    autoCap
                )
            ),
        [
            options,
            optionValue,
            optionLabel,
            optionIcon,
            optionDisabled,
            optionTooltip,
            optionMeta,
            autoCap,
        ]
    );

    // ─────────────────────────────────────────────
    // Handlers
    // ─────────────────────────────────────────────

    const handleChange = React.useCallback(
        (val: string | string[]) => {
            if (readOnly) return;
            if (!onValue) return;

            let rawSelection:
                | ToggleOptionInput
                | ToggleOptionInput[]
                | undefined;

            if (Array.isArray(val)) {
                const selected = normalizedOptions.filter((entry) =>
                    val.includes(entry.ui.value)
                );
                rawSelection = selected.map((entry) => entry.raw);
            } else {
                const found = normalizedOptions.find(
                    (entry) => entry.ui.value === val
                );
                rawSelection = found?.raw;
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: rawSelection, // original item(s)
                nativeEvent: undefined,
                meta: { action: "toggle" },
            };

            onValue(val, detail);
        },
        [onValue, readOnly, normalizedOptions]
    );

    // ─────────────────────────────────────────────
    // Layout Logic
    // ─────────────────────────────────────────────

    const layoutClasses = cn(
        layout === "horizontal" && "flex flex-wrap",
        layout === "vertical" && "flex flex-col items-stretch",
        layout === "grid" && "grid",
        fullWidth && "w-full",
        fullWidth && layout === "horizontal" && "[&>*]:flex-1",
        fullWidth && layout === "vertical" && "[&>*]:w-full",
        className
    );

    console.log(layoutClasses, fullWidth, autoCap);
    const groupStyle: React.CSSProperties | undefined = React.useMemo(() => {
        const style: React.CSSProperties = {};

        if (layout === "grid") {
            style.gridTemplateColumns = `repeat(${gridCols}, minmax(0, 1fr))`;
        }

        if (typeof itemGapPx === "number") {
            style.gap = itemGapPx;
        }

        return Object.keys(style).length ? style : undefined;
    }, [layout, gridCols, itemGapPx]);

    // ─────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────

    return (
        <ToggleGroup
            ref={ref}
            type={multiple ? "multiple" : "single"}
            value={currentValue as any}
            onValueChange={handleChange}
            disabled={isDisabled}
            variant={variant}
            size={toggleSize}
            className={layoutClasses}
            style={groupStyle}
            aria-invalid={!!error}
        >
            {normalizedOptions.map(({ ui: opt }) => {
                const isSelected = multiple
                    ? (currentValue as string[]).includes(opt.value)
                    : currentValue === opt.value;

                const contentNode = renderOption ? (
                    renderOption(opt, isSelected)
                ) : (
                    <div className="flex items-center gap-2 truncate">
                        {opt.icon && (
                            <span className="shrink-0">{opt.icon}</span>
                        )}
                        <span className="truncate">{opt.label}</span>
                    </div>
                );

                const itemNode = (
                    <ToggleGroupItem
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                        aria-label={
                            typeof opt.label === "string"
                                ? opt.label
                                : opt.value
                        }
                        className={cn(
                            // Base Transitions
                            "transition-all",

                            // Default Active State (Shadcn defaults)
                            "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",

                            // Error State
                            error &&
                                "border-destructive/50 hover:bg-destructive/10 data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground",

                            // Variant: Outline specific tweaks
                            variant === "outline" &&
                                layout === "horizontal" &&
                                !fullWidth &&
                                "first:rounded-l-md last:rounded-r-md rounded-none border-l-0 first:border-l",

                            // Layout tweaks
                            fullWidth && "justify-center",

                            // Custom Item Class
                            itemClassName,

                            // Active Class Name (Applied only when selected)
                            isSelected && activeClassName
                        )}
                    >
                        {contentNode}
                    </ToggleGroupItem>
                );

                if (opt.tooltip && !isDisabled) {
                    return (
                        <TooltipProvider key={opt.value} delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    {itemNode}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{opt.tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                }

                return itemNode;
            })}
        </ToggleGroup>
    );
});

ShadcnToggleVariant.displayName = "ShadcnToggleVariant";
export default ShadcnToggleVariant;
