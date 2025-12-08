// src/presets/shadcn-variants/slider.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Slider } from "@/presets/ui/slider";

type SliderValue = number | undefined;

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export interface ShadcnSliderVariantProps
   extends Pick<
      VariantBaseProps<SliderValue>,
      | "value"
      | "onValue"
      | "error"
      | "disabled"
      | "readOnly"
      | "size"
      | "density"
   > {
   /**
    * Minimum value for the slider.
    * Default: 0
    */
   min?: number;

   /**
    * Maximum value for the slider.
    * Default: 100
    */
   max?: number;

   /**
    * Step between values.
    * Default: 1
    */
   step?: number;

   /**
    * Show the current value as text next to the slider.
    * Default: true
    */
   showValue?: boolean;

   /**
    * Where to place the value label, relative to the slider.
    * - "end"   → right of the slider (horizontal)
    * - "start" → left of the slider
    *
    * Default: "end"
    */
   valuePlacement?: "start" | "end";

   /**
    * Custom formatter for the numeric value.
    * If omitted, uses the raw number.
    */
   formatValue?: (value: SliderValue) => React.ReactNode;

   /**
    * Wrapper class for the entire slider field.
    */
   className?: string;

   /**
    * Extra classes for the Slider root.
    */
   sliderClassName?: string;

   /**
    * Extra classes for the value label.
    */
   valueClassName?: string;

   // ─────────────────────────────────────────────
   // Icons & controls (mirror text / select variants)
   // ─────────────────────────────────────────────

   /**
    * One or more icons displayed inside the slider region, on the left.
    *
    * If not provided and `icon` is set, that single icon
    * is treated as `leadingIcons[0]`.
    */
   leadingIcons?: React.ReactNode[];

   /**
    * Icons displayed on the right side of the slider region
    * (before/after the value label depending on placement).
    */
   trailingIcons?: React.ReactNode[];

   /**
    * Convenience single-icon prop for the left side.
    */
   icon?: React.ReactNode;

   /**
    * Base gap between icons and slider/value.
    * Defaults to 4px-ish via `gap-1`.
    */
   iconGap?: number;

   /**
    * Extra spacing to apply between leading icons and the slider track.
    */
   leadingIconSpacing?: number;

   /**
    * Extra spacing to apply between trailing icons and the value label.
    */
   trailingIconSpacing?: number;

   /**
    * Arbitrary React node rendered before the slider (e.g. a button).
    */
   leadingControl?: React.ReactNode;

   /**
    * Arbitrary React node rendered after the slider (e.g. a button).
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
    * If true and there are controls, the slider + controls share
    * a single visual box (borders, radius, focus states).
    * Default: true (to match text/select behaviour).
    */
   joinControls?: boolean;

   /**
    * When joinControls is true, whether the box styling extends over controls
    * (true) or controls are visually separate (false).
    * Default: true.
    */
   extendBoxToControls?: boolean;

   // ─────────────────────────────────────────────
   // Built-in +/- control variants
   // ─────────────────────────────────────────────

   /**
    * Built-in +/- controls around the slider.
    *
    * - "none"  → no built-in step buttons (default)
    * - "boxed" → +/- inside the same frame as the slider
    * - "edge"  → loose layout: "- [ slider ] +"
    */
   controlVariant?: "none" | "boxed" | "edge";

   /**
    * Step used when clicking the +/- controls.
    * Defaults to `step`.
    */
   controlStep?: number;

   /**
    * Custom node for the decrement control. Default: "−".
    */
   controlDecrementIcon?: React.ReactNode;

   /**
    * Custom node for the increment control. Default: "+".
    */
   controlIncrementIcon?: React.ReactNode;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function sliderHeight(size?: Size): string {
   switch (size) {
      case "sm":
         return "h-7 text-xs";
      case "lg":
         return "h-10 text-base";
      case "md":
      default:
         return "h-9 text-sm";
   }
}

function sliderPadding(density?: Density): string {
   switch (density) {
      case "compact":
         return "py-1";
      case "loose":
         return "py-3";
      case "comfortable":
      default:
         return "py-2";
   }
}

function defaultFormatValue(value: SliderValue): React.ReactNode {
   if (value == null) return "—";
   return value;
}

function clampToRange(v: number, min: number, max: number): number {
   if (v < min) return min;
   if (v > max) return max;
   return v;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnSliderVariant = React.forwardRef<
   HTMLDivElement,
   ShadcnSliderVariantProps
>(function ShadcnSliderVariant(props, _ref) {
   const {
      value,
      onValue,
      error,
      disabled,
      readOnly,
      size,
      density,

      min = 0,
      max = 100,
      step = 1,

      showValue = true,
      valuePlacement = "end",
      formatValue,

      className,
      sliderClassName,
      valueClassName,

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

      // Built-in +/- controls
      controlVariant = "none",
      controlStep,
      controlDecrementIcon,
      controlIncrementIcon,
   } = props;

   const numericValue: number =
      typeof value === "number" ? value : min;

   const isDisabled = !!(disabled || readOnly);

   const handleChange = React.useCallback(
      (vals: number[]) => {
         if (!onValue) return;
         const next = clampToRange(vals[0], min, max);

         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta: undefined,
         };

         onValue(next, detail);
      },
      [onValue, min, max]
   );

   const stepAmount = controlStep ?? step;

   const applyStep = React.useCallback(
      (direction: -1 | 1) => {
         if (!onValue || isDisabled) return;

         const current =
            typeof value === "number" ? value : min;
         const candidate = current + direction * stepAmount;
         const next = clampToRange(candidate, min, max);

         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta: {
               action: direction > 0 ? "increment" : "decrement",
            },
         };

         onValue(next, detail);
      },
      [onValue, value, isDisabled, min, max, stepAmount]
   );

   const heightCls = sliderHeight(size as Size | undefined);
   const paddingCls = sliderPadding(density as Density | undefined);

   const displayValue =
      (formatValue ?? defaultFormatValue)(value ?? numericValue);

   // Icons resolution (same idea as text/select)
   const resolvedLeadingIcons: React.ReactNode[] = (() => {
      if (leadingIcons && leadingIcons.length) return leadingIcons;
      if (icon) return [icon];
      return [];
   })();

   const resolvedTrailingIcons: React.ReactNode[] = trailingIcons ?? [];

   const baseIconGap = iconGap ?? 4;
   const leadingGap = leadingIconSpacing ?? baseIconGap;
   const trailingGap = trailingIconSpacing ?? baseIconGap;

   const hasLeadingIcons = resolvedLeadingIcons.length > 0;
   const hasTrailingIcons = resolvedTrailingIcons.length > 0;

   // Value label
   const valueNode =
      showValue ? (
         <div
            className={cn(
               "text-xs text-muted-foreground whitespace-nowrap",
               valueClassName
            )}
            data-slot="slider-value"
         >
            {displayValue}
         </div>
      ) : null;

   const baseBoxClasses = cn(
      "border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs",
      "transition-[color,box-shadow] outline-none",
      "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
   );

   // ─────────────────────────────────────────────
   // Built-in +/- controls → map to leading/trailingControl
   // ─────────────────────────────────────────────

   let effectiveLeadingControl = leadingControl;
   let effectiveTrailingControl = trailingControl;
   let effectiveJoinControls = joinControls;

   if (controlVariant === "boxed" || controlVariant === "edge") {
      const decLabel =
         controlDecrementIcon ?? <span className="text-base">−</span>;
      const incLabel =
         controlIncrementIcon ?? <span className="text-base">+</span>;

      const decButton = (
         <button
            type="button"
            onClick={() => applyStep(-1)}
            disabled={isDisabled}
            className={cn(
               "inline-flex items-center justify-center px-2 text-sm",
               "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
         >
            {decLabel}
         </button>
      );

      const incButton = (
         <button
            type="button"
            onClick={() => applyStep(1)}
            disabled={isDisabled}
            className={cn(
               "inline-flex items-center justify-center px-2 text-sm",
               "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
         >
            {incLabel}
         </button>
      );

      // Only auto-wire if caller didn't override them.
      if (!effectiveLeadingControl) {
         effectiveLeadingControl = decButton;
      }
      if (!effectiveTrailingControl) {
         effectiveTrailingControl = incButton;
      }

      // Edge variant → loose layout: "- [ slider ] +"
      if (controlVariant === "edge") {
         effectiveJoinControls = false;
      }
   }

   const hasLeadingControl = !!effectiveLeadingControl;
   const hasTrailingControl = !!effectiveTrailingControl;
   const hasControls = hasLeadingControl || hasTrailingControl;

   // Inner slider+icons+value layout (no outer controls)
   const SliderRegion = (
      <div
         className={cn(
            "flex w-full items-center gap-2",
            heightCls,
            paddingCls
         )}
         data-slot="slider-region"
      >
         {/* value before slider */}
         {valuePlacement === "start" && valueNode && (
            <div className="shrink-0 mr-1">{valueNode}</div>
         )}

         {/* leading icons */}
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

         {/* slider track */}
         <div className="flex-1 min-w-0" data-slot="slider-track">
            <Slider
               value={[numericValue]}
               onValueChange={handleChange}
               min={min}
               max={max}
               step={step}
               disabled={isDisabled}
               className={cn("w-full", sliderClassName)}
            />
         </div>

         {/* trailing icons */}
         {hasTrailingIcons && (
            <span
               className="flex items-center gap-1 shrink-0"
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

         {/* value after slider */}
         {valuePlacement === "end" && valueNode && (
            <div className="shrink-0 ml-1">{valueNode}</div>
         )}
      </div>
   );

   // ─────────────────────────────────────────────
   // Layout cases
   // ─────────────────────────────────────────────

   // CASE 1: no controls → just slider region
   if (!hasControls) {
      return (
         <div
            data-slot="slider-field"
            className={cn(
               "w-full flex items-center",
               isDisabled && "opacity-50 cursor-not-allowed",
               className
            )}
            aria-disabled={isDisabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            {SliderRegion}
         </div>
      );
   }

   // CASE 2: controls + joinControls → single shared box (sketch #1: boxed)
   if (effectiveJoinControls) {
      const groupClassName = cn(
         "flex items-stretch w-full",
         extendBoxToControls &&
         cn(
            "relative",
            baseBoxClasses // focus ring via :focus-within
         ),
         !extendBoxToControls &&
         "relative border-none shadow-none bg-transparent",
         className
      );

      return (
         <div
            data-slot="slider-field"
            className="w-full"
            aria-disabled={isDisabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            <div
               className={groupClassName}
               data-slot="slider-group"
               data-disabled={isDisabled ? "true" : "false"}
            >
               {hasLeadingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        leadingControlClassName
                     )}
                     data-slot="leading-control"
                  >
                     {effectiveLeadingControl}
                  </div>
               )}

               <div
                  className="flex-1 min-w-0 flex items-stretch"
                  data-slot="slider-region-wrapper"
               >
                  {SliderRegion}
               </div>

               {hasTrailingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        trailingControlClassName
                     )}
                     data-slot="trailing-control"
                  >
                     {effectiveTrailingControl}
                  </div>
               )}
            </div>
         </div>
      );
   }

   // CASE 3: controls present but separate boxes (sketch #2: edge)
   return (
      <div
         data-slot="slider-field"
         className={cn(
            "flex items-stretch w-full",
            isDisabled && "opacity-50 cursor-not-allowed",
            className
         )}
         aria-disabled={isDisabled || undefined}
         aria-invalid={error ? "true" : undefined}
      >
         {hasLeadingControl && (
            <div
               className={cn(
                  "flex items-center mr-1",
                  leadingControlClassName
               )}
               data-slot="leading-control"
            >
               {effectiveLeadingControl}
            </div>
         )}

         <div
            className="flex-1 min-w-0"
            data-slot="slider-region-outer"
         >
            {SliderRegion}
         </div>

         {hasTrailingControl && (
            <div
               className={cn(
                  "flex items-center ml-1",
                  trailingControlClassName
               )}
               data-slot="trailing-control"
            >
               {effectiveTrailingControl}
            </div>
         )}
      </div>
   );
});

ShadcnSliderVariant.displayName = "ShadcnSliderVariant";

export default ShadcnSliderVariant;