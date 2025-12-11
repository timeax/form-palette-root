// src/presets/shadcn-variants/radio.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";

// Adjust path if your radio group lives elsewhere
import {
   RadioGroup,
   RadioGroupItem,
} from "@/presets/ui/radio-group";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

/**
 * Visual size of the radio UI.
 */
export type RadioSize = "sm" | "md" | "lg";

/**
 * Vertical density of each radio row.
 *
 * Names aligned with your FieldDensity, but local to this variant.
 */
export type RadioDensity = "compact" | "comfortable" | "loose";

/**
 * Layout mode for the group.
 *
 * - "list" → stacked rows
 * - "grid" → CSS grid with `columns`
 */
export type RadioLayoutMode = "list" | "grid";

/**
 * Base radio item shape.
 */
export interface RadioItem<TValue> {
   value: TValue;
   label: React.ReactNode;
   description?: React.ReactNode;
   disabled?: boolean;
   key?: React.Key;
}

/**
 * Mapping functions used when TItem is not `RadioItem<TValue>`.
 */
export interface RadioMappers<TItem, TValue> {
   getValue: (item: TItem, index: number) => TValue;
   getLabel: (item: TItem, index: number) => React.ReactNode;
   getDescription?: (item: TItem, index: number) => React.ReactNode;
   isDisabled?: (item: TItem, index: number) => boolean;
   getKey?: (item: TItem, index: number) => React.Key;
}

/**
 * Context passed to a custom renderOption callback.
 */
export interface RadioRenderOptionContext<TValue> {
   item: RadioItem<TValue>;
   index: number;
   selected: boolean;
   disabled: boolean;
   size: RadioSize;
   density: RadioDensity;
   /**
    * DOM id of this option (tied to the underlying RadioGroupItem).
    */
   optionId?: string;

   /**
    * Prebuilt radio control for convenience.
    * You can ignore this and render your own if you want.
    */
   radio: React.ReactNode;
}

/**
 * UI-specific radio props (independent of VariantBaseProps).
 */
export interface ShadcnRadioUiProps<TItem, TValue> {
   /**
    * Items to render as choices.
    *
    * Can be:
    * - `RadioItem<TValue>[]`, or
    * - any custom TItem[] when used with mapping functions
    *   or optionValue/optionLabel keys.
    * - primitive arrays such as `string[]` or `number[]` (fallback).
    */
   items: readonly TItem[];

   /**
    * Mapping functions for TItem → value/label/etc.
    *
    * Takes precedence over optionValue/optionLabel if provided.
    */
   mappers?: RadioMappers<TItem, TValue>;

   /**
    * Property name on TItem that holds the **value**.
    *
    * Example:
    *   items = [{ id: "free", title: "Free" }]
    *   optionValue = "id"
    */
   optionValue?: keyof TItem;

   /**
    * Property name on TItem that holds the **label**.
    *
    * Example:
    *   items = [{ id: "free", title: "Free" }]
    *   optionLabel = "title"
    */
   optionLabel?: keyof TItem;

   /**
    * Optional custom renderer for each option.
    *
    * If provided, the default label/description layout is skipped and
    * this function is responsible for rendering the row.
    */
   renderOption?: (
      ctx: RadioRenderOptionContext<TValue>
   ) => React.ReactNode;

   /**
    * Layout mode for the group.
    * Default: "list".
    */
   layout?: RadioLayoutMode;

   /**
    * Number of columns in grid mode.
    * Default: 2.
    */
   columns?: number;

   /**
    * Gap between items (list rows or grid cells) in px.
    * If omitted, Tailwind gaps/classes can handle spacing.
    */
   itemGapPx?: number;

   /**
    * Visual size of the radios.
    * Default: "md".
    */
   size?: RadioSize;

   /**
    * Vertical density (padding) of each row.
    * Default: "comfortable".
    */
   density?: RadioDensity;

   /**
    * When true, capitalizes the **first letter** of the label
    * (only applied when the label is a string).
    */
   autoCap?: boolean;

   /**
    * ARIA overrides for the group.
    */
   "aria-label"?: string;
   "aria-labelledby"?: string;

   /**
    * Wrapper class for the whole radio group.
    */
   groupClassName?: string;

   /**
    * Extra classes for each radio option row.
    */
   optionClassName?: string;

   /**
    * Extra classes for the option label node.
    */
   labelClassName?: string;

   /**
    * Extra classes for the description text under the label.
    */
   descriptionClassName?: string;
}

/**
 * Full props for the Shadcn-based radio variant.
 */
export type ShadcnRadioVariantProps<
   TValue,
   TItem = RadioItem<TValue>
> = ShadcnRadioUiProps<TItem, TValue> &
   Pick<
      VariantBaseProps<TValue | undefined>,
      "value" | "onValue" | "error" | "disabled" | "required"
   > &
   Pick<
      React.ComponentProps<typeof RadioGroup>,
      // we want to allow name + data-* etc through
      "name"
   > & {
      id?: string;
      className?: string; // alias for groupClassName
      "aria-describedby"?: string;
   };

/**
 * Convenience type for the concrete React component.
 */
export interface ShadcnRadioVariantComponent<
   TValue,
   TItem = RadioItem<TValue>
> extends React.ForwardRefExoticComponent<
   ShadcnRadioVariantProps<TValue, TItem> &
   React.RefAttributes<HTMLDivElement>
> { }

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function paddingForDensity(density: RadioDensity): string {
   switch (density) {
      case "compact":
         return "py-1.5";
      case "loose":
         return "py-3";
      case "comfortable":
      default:
         return "py-1";
   }
}

function labelTextSize(size: RadioSize): string {
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

function descriptionTextSize(size: RadioSize): string {
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
 * Normalise TItem[] into RadioItem<TValue>[] using one of:
 * - explicit mappers
 * - optionValue/optionLabel keys
 * - native RadioItem fields
 * - primitive arrays (string[] / number[] / boolean[])
 */
function normalizeItems<TItem, TValue>(
   items: readonly TItem[],
   mappers?: RadioMappers<TItem, TValue>,
   optionValueKey?: keyof TItem,
   optionLabelKey?: keyof TItem
): RadioItem<TValue>[] {
   // 1) Full mappers win – most explicit
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
      }));
   }

   // 2) optionValue / optionLabel keys
   if (optionValueKey || optionLabelKey) {
      return items.map((item, index) => {
         const anyItem = item as any;

         const rawValue =
            optionValueKey != null
               ? anyItem[optionValueKey as string]
               : anyItem.value;

         const value = rawValue as TValue;

         const rawLabel =
            optionLabelKey != null
               ? anyItem[optionLabelKey as string]
               : anyItem.label ?? String(rawValue ?? index);

         const description = anyItem.description;
         const disabled = !!anyItem.disabled;
         const key: React.Key = anyItem.key ?? index;

         return {
            value,
            label: rawLabel,
            description,
            disabled,
            key,
         };
      });
   }

   // 3) Fallbacks:
   //    - primitive arrays (string[] / number[] / boolean[])
   //    - already-shaped RadioItem<TValue>[]
   return items.map((item, index) => {
      // Primitive → use as both value and label
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
         } satisfies RadioItem<TValue>;
      }

      // Assume it's already a RadioItem<TValue>-like object
      return item as unknown as RadioItem<TValue>;
   });
}

/**
 * Shallow-ish equality for values.
 */
function isEqualValue(a: unknown, b: unknown): boolean {
   return Object.is(a, b);
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const InnerShadcnRadioVariant = <
   TValue,
   TItem = RadioItem<TValue>
>(
   props: ShadcnRadioVariantProps<TValue, TItem>,
   ref: React.Ref<HTMLDivElement>
) => {
   const {
      // variant base
      value,
      onValue,
      error,
      disabled,
      required,

      // radio UI
      items,
      mappers,
      optionValue,
      optionLabel,
      renderOption,
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
      descriptionClassName,

      className, // alias for groupClassName
      id,

      // passthrough to RadioGroup
      ...restGroupProps
   } = props;

   const hasError = !!error;

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

   // Map TValue → string for RadioGroup
   const selectedString = React.useMemo(() => {
      if (value === undefined) return undefined;
      const found = normalized.find((item) =>
         isEqualValue(item.value, value)
      );
      return found ? String(found.value) : undefined;
   }, [normalized, value]);

   const handleSelect = React.useCallback(
      (next: TValue) => {
         if (!onValue || disabled) return;

         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta: undefined,
         };

         onValue(next, detail);
      },
      [onValue, disabled]
   );

   const handleRadioChange = React.useCallback(
      (raw: string) => {
         const found = normalized.find(
            (item) => String(item.value) === raw
         );
         if (!found) return;
         handleSelect(found.value);
      },
      [normalized, handleSelect]
   );

   const groupStyle: React.CSSProperties | undefined = React.useMemo(() => {
      if (!itemGapPx) {
         if (layout === "grid") {
            return {
               gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            };
         }
         return undefined;
      }

      if (layout === "list") {
         return { rowGap: itemGapPx };
      }

      return {
         gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
         gap: itemGapPx,
      };
   }, [layout, columns, itemGapPx]);

   const groupClasses = cn(
      layout === "grid" ? "grid" : "flex flex-col",
      groupClassName ?? className
   );

   const baseOptionClass = cn(
      // layout container for each option row
      "relative flex items-start",
      // keep disabled styles
      "data-[disabled=true]:opacity-60 data-[disabled=true]:cursor-not-allowed",
      // vertical padding from density
      paddingForDensity(density),
      optionClassName
   );

   const labelClassesBase = cn(
      "font-medium text-foreground",
      labelTextSize(size),
      labelClassName
   );

   const descriptionClassesBase = cn(
      "mt-0.5 text-muted-foreground",
      descriptionTextSize(size),
      descriptionClassName
   );

   return (
      <RadioGroup
         ref={ref}
         id={id}
         name={name}
         value={selectedString}
         onValueChange={handleRadioChange}
         disabled={disabled}
         aria-label={ariaLabel}
         aria-labelledby={ariaLabelledBy}
         aria-describedby={ariaDescribedBy}
         aria-invalid={hasError || undefined}
         aria-required={required || undefined}
         className={groupClasses}
         style={groupStyle}
         data-slot="radio-group"
         {...restGroupProps}
      >
         {normalized.map((item, index) => {
            const itemString = String(item.value);
            const selected = selectedString === itemString;
            const optionDisabled = !!disabled || !!item.disabled;
            const optionKey = item.key ?? index;
            const optionId = id ? `${id}-option-${optionKey}` : undefined;

            // Apply autoCap to string labels for display
            let displayItem: RadioItem<TValue> = item;
            if (autoCap && typeof item.label === "string") {
               displayItem = {
                  ...item,
                  label: capitalizeFirst(item.label),
               };
            }

            const radioNode = (
               <RadioGroupItem
                  id={optionId}
                  value={itemString}
                  disabled={optionDisabled}
                  className="mt-1"
               />
            );

            // Custom renderer path
            if (renderOption) {
               return (
                  <div
                     key={optionKey}
                     data-slot="radio-option"
                     data-checked={selected ? "true" : "false"}
                     data-disabled={optionDisabled ? "true" : "false"}
                     className={baseOptionClass}
                  >
                     {renderOption({
                        item: displayItem,
                        index,
                        selected,
                        disabled: optionDisabled,
                        size,
                        density,
                        optionId,
                        radio: radioNode,
                     })}
                  </div>
               );
            }

            // Default rendering
            return (
               <div
                  key={optionKey}
                  data-slot="radio-option"
                  data-checked={selected ? "true" : "false"}
                  data-disabled={optionDisabled ? "true" : "false"}
                  className={baseOptionClass}
               >
                  <label
                     htmlFor={optionId}
                     className="flex cursor-pointer items-start gap-3 w-full"
                  >
                     {radioNode}

                     <div className="flex flex-col min-w-0">
                        <span className={labelClassesBase}>
                           {displayItem.label}
                        </span>
                        {displayItem.description != null && (
                           <span className={descriptionClassesBase}>
                              {displayItem.description}
                           </span>
                        )}
                     </div>
                  </label>
               </div>
            );
         })}
      </RadioGroup>
   );
};

/**
 * Concrete Shadcn radio variant component.
 *
 * Cast to a generic-friendly type so TS can still infer TValue/TItem.
 */
export const ShadcnRadioVariant =
   React.forwardRef(InnerShadcnRadioVariant) as unknown as <
      TValue,
      TItem = RadioItem<TValue>
   >(
      props: ShadcnRadioVariantProps<TValue, TItem> & {
         ref?: React.Ref<HTMLDivElement>;
      }
   ) => React.ReactElement | null;

export default ShadcnRadioVariant;