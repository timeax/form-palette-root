// src/presets/shadcn-variants/multi-select.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Input } from "@/presets/ui/input";
import { Checkbox } from "@/presets/ui/checkbox";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/presets/ui/popover";
import { ChevronDown, Search, X } from "lucide-react";
import { removeSelectValue, SelectionSummary } from "@/variants/helpers/selection-summary";

type SelectPrimitive = string | number;

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type MultiSelectOption =
   | SelectPrimitive
   | {
      label?: React.ReactNode;
      value?: SelectPrimitive;
      description?: React.ReactNode;
      disabled?: boolean;
      icon?: React.ReactNode;
      [key: string]: any;
   };

type NormalizedMultiItem = {
   key: string;
   value: SelectPrimitive;
   labelNode: React.ReactNode;
   labelText: string;
   description?: React.ReactNode;
   disabled?: boolean;
   icon?: React.ReactNode;
   raw: MultiSelectOption;
};

export interface ShadcnMultiSelectVariantProps
   extends Pick<
      VariantBaseProps<SelectPrimitive[] | undefined>,
      | "value"
      | "onValue"
      | "error"
      | "disabled"
      | "readOnly"
      | "size"
      | "density"
   > {
   /**
    * Options for the multi-select.
    *
    * You can pass:
    * - primitives: ["ng", "gh", "ke"]
    * - objects:    [{ label, value, ...extra }]
    */
   options?: MultiSelectOption[];

   /**
    * Automatically capitalise the first letter of the label
    * (when the resolved label is a string).
    */
   autoCap?: boolean;

   /**
    * How to read the label from each option.
    *
    * - string → key on the option object
    * - function → custom mapper
    * - omitted → tries `label`, else String(value)
    */
   optionLabel?: string | ((item: MultiSelectOption) => React.ReactNode);

   /**
    * How to read the value from each option.
    *
    * - string → key on the option object
    * - function → custom mapper
    * - omitted → uses `value`, or `id`, or `key`, or index
    */
   optionValue?: string | ((item: MultiSelectOption) => SelectPrimitive);

   /**
    * Optional description line under the label.
    */
   optionDescription?: string | ((item: MultiSelectOption) => React.ReactNode);

   /**
    * How to determine if an option is disabled.
    */
   optionDisabled?: string | ((item: MultiSelectOption) => boolean);

   /**
    * How to extract an icon for each option.
    *
    * - string → key on the option object (default "icon")
    * - function → custom mapper
    */
   optionIcon?: string | ((item: MultiSelectOption) => React.ReactNode);

   /**
    * How to compute the React key for each option.
    */
   optionKey?: string | ((item: MultiSelectOption, index: number) => React.Key);

   /**
    * Enable inline search inside the dropdown.
    */
   searchable?: boolean;

   /**
    * Placeholder for the search input.
    */
   searchPlaceholder?: string;

   /**
    * Text to show when search yields no results.
    */
   emptySearchText?: React.ReactNode;

   /**
    * Placeholder when nothing is selected.
    */
   placeholder?: React.ReactNode;

   /**
    * Show a small clear button in the trigger when any value is selected.
    */
   clearable?: boolean;

   /**
    * Whether to show a "Select all" row.
    */
   showSelectAll?: boolean;

   /**
    * Label for the "Select all" row.
    * Default: "Select all".
    */
   selectAllLabel?: React.ReactNode;

   /**
    * Where to place the "Select all" row.
    * Default: "top".
    */
   selectAllPosition?: "top" | "bottom";

   /**
    * Custom renderer for each option row (checkbox + label).
    */
   renderOption?: (ctx: {
      item: NormalizedMultiItem;
      selected: boolean;
      index: number;
      option: React.ReactNode; // prebuilt row you can wrap
   }) => React.ReactNode;

   /**
    * Custom renderer for the trigger summary.
    */
   renderValue?: (ctx: {
      selectedItems: NormalizedMultiItem[];
      placeholder?: React.ReactNode;
   }) => React.ReactNode;

   /**
    * Custom renderer for the checkbox.
    *
    * - item: the option item (or null for "select all")
    * - selected: whether this row is currently fully selected
    * - indeterminate: partially selected (used for "select all")
    * - isSelectAll: true for the "select all" row
    */
   renderCheckbox?: (ctx: {
      item: NormalizedMultiItem | null;
      selected: boolean;
      indeterminate: boolean;
      isSelectAll: boolean;
   }) => React.ReactNode;

   /**
    * Max height (in px) for the dropdown list before scrolling.
    * Default: 260.
    */
   maxListHeight?: number;

   /**
    * Wrapper class for the whole variant.
    */
   className?: string;

   /**
    * Extra classes for the trigger button.
    */
   triggerClassName?: string;

   /**
    * Extra classes for the popover content.
    */
   contentClassName?: string;

   // ─────────────────────────────────────────────
   // Icons & controls (parity with single select)
   // ─────────────────────────────────────────────

   /**
    * One or more icons displayed inside the trigger, on the left.
    *
    * If not provided and `icon` is set, that single icon
    * is treated as `leadingIcons[0]`.
    */
   leadingIcons?: React.ReactNode[];

   /**
    * Icons displayed on the right side of the trigger,
    * near the clear button / chevron area.
    */
   trailingIcons?: React.ReactNode[];

   /**
    * Convenience single-icon prop for the left side.
    */
   icon?: React.ReactNode;

   /**
    * Base gap between icons and text.
    * Defaults to 4px-ish via `gap-1`.
    */
   iconGap?: number;

   /**
    * Extra spacing to apply between leading icons and the text.
    */
   leadingIconSpacing?: number;

   /**
    * Extra spacing to apply between trailing icons and the clear button.
    */
   trailingIconSpacing?: number;

   /**
    * Arbitrary React node rendered before the select (e.g. a button).
    */
   leadingControl?: React.ReactNode;

   /**
    * Arbitrary React node rendered after the select (e.g. a button).
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
    * If true and there are controls, the select trigger + controls share
    * a single visual box (borders, radius, focus states).
    */
   joinControls?: boolean;

   /**
    * When joinControls is true, whether the box styling extends over controls
    * (true) or controls are visually separate (false).
    */
   extendBoxToControls?: boolean;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function capitalizeFirst(label: string): string {
   if (!label) return label;
   return label.charAt(0).toUpperCase() + label.slice(1);
}

function normalizeOptions(
   opts: readonly MultiSelectOption[] | undefined,
   config: Pick<
      ShadcnMultiSelectVariantProps,
      | "autoCap"
      | "optionLabel"
      | "optionValue"
      | "optionDescription"
      | "optionDisabled"
      | "optionKey"
      | "optionIcon"
   >
): NormalizedMultiItem[] {
   if (!opts || !opts.length) return [];

   return opts.map((raw, index) => {
      const asObj: any =
         typeof raw === "string" || typeof raw === "number"
            ? { label: String(raw), value: raw }
            : raw;

      const value: SelectPrimitive =
         typeof config.optionValue === "function"
            ? config.optionValue(raw)
            : typeof config.optionValue === "string"
               ? (asObj[config.optionValue] as SelectPrimitive)
               : (asObj.value ??
                  asObj.id ??
                  asObj.key ??
                  String(index));

      let labelNode: React.ReactNode =
         typeof config.optionLabel === "function"
            ? config.optionLabel(raw)
            : typeof config.optionLabel === "string"
               ? asObj[config.optionLabel] ?? asObj.label ?? String(value)
               : asObj.label ?? String(value);

      if (config.autoCap && typeof labelNode === "string") {
         labelNode = capitalizeFirst(labelNode);
      }

      const labelText =
         typeof labelNode === "string"
            ? labelNode
            : typeof labelNode === "number"
               ? String(labelNode)
               : asObj.labelText ?? String(value);

      const description: React.ReactNode =
         typeof config.optionDescription === "function"
            ? config.optionDescription(raw)
            : typeof config.optionDescription === "string"
               ? asObj[config.optionDescription]
               : asObj.description;

      const disabled: boolean =
         typeof config.optionDisabled === "function"
            ? config.optionDisabled(raw)
            : typeof config.optionDisabled === "string"
               ? !!asObj[config.optionDisabled]
               : !!asObj.disabled;

      const icon: React.ReactNode =
         typeof config.optionIcon === "function"
            ? config.optionIcon(raw)
            : typeof config.optionIcon === "string"
               ? asObj[config.optionIcon]
               : asObj.icon;

      const key: React.Key =
         typeof config.optionKey === "function"
            ? config.optionKey(raw, index)
            : typeof config.optionKey === "string"
               ? asObj[config.optionKey] ?? value ?? index
               : asObj.key ?? value ?? index;

      return {
         key: String(key),
         value,
         labelNode,
         labelText,
         description,
         disabled,
         icon,
         raw,
      };
   });
}

function triggerHeight(size?: Size) {
   switch (size) {
      case "sm":
         return "h-8 text-xs";
      case "lg":
         return "h-11 text-base";
      default:
         return "h-9 text-sm";
   }
}

function triggerPadding(density?: Density) {
   switch (density) {
      case "compact":
         return "py-1";
      case "loose":
         return "py-2";
      case "comfortable":
      default:
         return "py-1.5";
   }
}

function summarizeSelection(
   selectedItems: NormalizedMultiItem[],
   placeholder?: React.ReactNode
): React.ReactNode {
   if (!selectedItems.length) {
      return (
         <span className="truncate text-muted-foreground">
            {placeholder ?? "Select options…"}
         </span>
      );
   }

   if (selectedItems.length === 1) {
      return (
         <span className="truncate">
            {selectedItems[0].labelNode}
         </span>
      );
   }

   if (selectedItems.length === 2) {
      return (
         <span className="truncate">
            {selectedItems[0].labelNode}
            {", "}
            {selectedItems[1].labelNode}
         </span>
      );
   }

   const first = selectedItems[0];
   const restCount = selectedItems.length - 1;

   return (
      <span className="truncate">
         {first.labelNode}
         {", "}
         <span className="text-muted-foreground">
            +{restCount} more
         </span>
      </span>
   );
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnMultiSelectVariant = React.forwardRef<
   HTMLButtonElement,
   ShadcnMultiSelectVariantProps
>(function ShadcnMultiSelectVariant(props, _ref) {
   const {
      value,
      onValue,
      error,
      disabled,
      readOnly,
      size,
      density,

      options,

      autoCap,
      optionLabel,
      optionValue,
      optionDescription,
      optionDisabled,
      optionIcon,
      optionKey,

      searchable,
      searchPlaceholder,
      emptySearchText,

      placeholder,
      clearable,

      showSelectAll,
      selectAllLabel,
      selectAllPosition = "top",

      renderOption,
      renderValue,
      renderCheckbox,

      maxListHeight = 260,

      className,
      triggerClassName,
      contentClassName,

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
   } = props;

   const [open, setOpen] = React.useState(false);
   const [query, setQuery] = React.useState("");

   const items = React.useMemo(
      () =>
         normalizeOptions(options ?? [], {
            autoCap,
            optionLabel,
            optionValue,
            optionDescription,
            optionDisabled,
            optionKey,
            optionIcon,
         }),
      [
         options,
         autoCap,
         optionLabel,
         optionValue,
         optionDescription,
         optionDisabled,
         optionKey,
         optionIcon,
      ]
   );

   const selectedValues = React.useMemo(
      () => new Set<SelectPrimitive>((value ?? []) as SelectPrimitive[]),
      [value]
   );

   const selectedItems = React.useMemo(
      () => items.filter((it) => selectedValues.has(it.value)),
      [items, selectedValues]
   );

   const filteredItems = React.useMemo(() => {
      if (!query) return items;
      const q = query.toLowerCase();
      return items.filter((it) =>
         it.labelText.toLowerCase().includes(q)
      );
   }, [items, query]);

   const selectableItems = React.useMemo(
      () => items.filter((it) => !it.disabled),
      [items]
   );

   const allSelectableValues = React.useMemo(
      () => new Set<SelectPrimitive>(selectableItems.map((it) => it.value)),
      [selectableItems]
   );

   const allSelected =
      selectableItems.length > 0 &&
      selectableItems.every((it) => selectedValues.has(it.value));

   const someSelected =
      selectableItems.length > 0 &&
      !allSelected &&
      selectableItems.some((it) => selectedValues.has(it.value));

   const heightCls = triggerHeight(size as Size | undefined);
   const padCls = triggerPadding(density as Density | undefined);

   const showClear = clearable && (value?.length ?? 0) > 0;

   const disabledTrigger = disabled || readOnly;

   const handleToggleValue = React.useCallback(
      (primitive: SelectPrimitive) => {
         if (!onValue || disabled || readOnly) return;

         const current = (value ?? []) as SelectPrimitive[];
         const isSelected = current.some((v) => v === primitive);

         let next: SelectPrimitive[];
         if (isSelected) {
            next = current.filter((v) => v !== primitive);
         } else {
            next = [...current, primitive];
         }

         const final = next.length ? next : undefined;

         const detail: ChangeDetail = {
            source: "variant",
            raw: {
               type: "toggle",
               value: primitive,
               next: final,
            },
            nativeEvent: undefined,
            meta: undefined,
         };

         onValue(final as any, detail);
      },
      [onValue, value, disabled, readOnly]
   );

   const handleSelectAll = React.useCallback(() => {
      if (!onValue || disabled || readOnly) return;

      const current = (value ?? []) as SelectPrimitive[];

      const allSelectableArr = Array.from(allSelectableValues);

      const currentlyAllSelected =
         allSelectableArr.length > 0 &&
         allSelectableArr.every((v) => selectedValues.has(v));

      let next: SelectPrimitive[];

      if (currentlyAllSelected) {
         // unselect all selectable ones, keep others (if any)
         next = current.filter((v) => !allSelectableValues.has(v));
      } else {
         // union of existing + all selectable
         const merged = new Set<SelectPrimitive>(current);
         for (const v of allSelectableArr) merged.add(v);
         next = Array.from(merged);
      }

      const final = next.length ? next : undefined;

      const detail: ChangeDetail = {
         source: "variant",
         raw: {
            type: "select-all",
            next: final,
         },
         nativeEvent: undefined,
         meta: {
            allSelected: !currentlyAllSelected,
         },
      };

      onValue(final as any, detail);
   }, [
      onValue,
      value,
      disabled,
      readOnly,
      allSelectableValues,
      selectedValues,
   ]);

   const handleClearAll = React.useCallback(() => {
      if (!onValue || disabled || readOnly) return;

      const detail: ChangeDetail = {
         source: "variant",
         raw: {
            type: "clear",
         },
         nativeEvent: undefined,
         meta: undefined,
      };

      onValue(undefined as any, detail);
   }, [onValue, disabled, readOnly]);

   const triggerSummary = renderValue
      ? renderValue({ selectedItems, placeholder })
      : (
         <SelectionSummary
            selectedItems={selectedItems}
            placeholder={placeholder}
            onRemoveValue={(item) => {
               // whatever you already do to unselect a single value
               // e.g. toggleValue(value) if it adds/removes from the set
               // toggleValue(value);


               const updated = removeSelectValue(
                  selectedValues as unknown as SelectPrimitive[],
                  item.value
               );

               const detail: ChangeDetail = {
                  source: "variant",
                  raw: item,
                  nativeEvent: undefined,
                  meta: { action: "remove", removed: value },
               };

               onValue?.(updated, detail);
            }}
         />
      );

   // ─────────────────────────────────────────────
   // Icons setup (same semantics as select variant)
   // ─────────────────────────────────────────────

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

   const hasLeadingControl = !!leadingControl;
   const hasTrailingControl = !!trailingControl;
   const hasControls = hasLeadingControl || hasTrailingControl;

   const makeCheckboxNode = React.useCallback(
      (opts: {
         item: NormalizedMultiItem | null;
         selected: boolean;
         indeterminate: boolean;
         isSelectAll: boolean;
      }) => {
         if (renderCheckbox) {
            return renderCheckbox(opts);
         }

         return (
            <Checkbox
               className="mr-2 mt-0.5"
               checked={
                  opts.indeterminate
                     ? "none"
                     : opts.selected
               }
               aria-hidden="true"
               // purely visual; click handled on row button
               onCheckedChange={() => { }}
            />
         );
      },
      [renderCheckbox]
   );

   const baseBoxClasses = cn(
      "border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs",
      "transition-[color,box-shadow] outline-none",
      "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
   );

   // Trigger button body (icons + summary + clear + trailing icons + chevron)
   const triggerButton = (
      <button
         ref={_ref}
         type="button"
         disabled={disabledTrigger}
         className={cn(
            "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 text-left shadow-xs",
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            heightCls,
            padCls,
            hasControls &&
            joinControls &&
            extendBoxToControls &&
            "border-none shadow-none focus-visible:ring-0 focus-visible:outline-none",
            triggerClassName
         )}
      >
         <div className="flex w-full items-center justify-between gap-2">
            {/* Left side: leading icons + summary */}
            <div className="flex min-w-0 items-center grow gap-2">
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

               <div className="min-w-0 flex-1">
                  {triggerSummary}
               </div>
            </div>

            {/* Right side: clear + trailing icons + chevron */}
            <div className="flex items-center gap-1 shrink-0">
               {showClear && (
                  <button
                     type="button"
                     aria-label="Clear selection"
                     onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleClearAll();
                     }}
                     className="flex h-4 w-4 items-center justify-center rounded hover:bg-muted"
                     data-slot="clear"
                  >
                     <X className="h-3 w-3 pointer-events-none" />
                  </button>
               )}

               {hasTrailingIcons && (
                  <span
                     className="flex items-center gap-1"
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

               <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
         </div>
      </button>
   );

   // Core multi-select element (Popover + list)
   const MultiSelectCore = (
      <Popover
         open={open && !disabledTrigger}
         onOpenChange={(next) => {
            if (disabledTrigger) return;
            setOpen(next);
            if (!next) setQuery("");
         }}
      >
         <PopoverTrigger asChild>
            {triggerButton}
         </PopoverTrigger>

         <PopoverContent
            className={cn(
               "w-(--radix-popover-trigger-width) p-0",
               contentClassName
            )}
            align="start"
         >
            {/* Search bar */}
            {searchable && (
               <div className="p-2 border-b border-border">
                  <Input
                     autoFocus
                     icon={<Search className="size-4" />}
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     placeholder={
                        searchPlaceholder ?? "Search options…"
                     }
                     size={size}
                     density={density}
                  />
               </div>
            )}

            <div
               className="py-1 overflow-auto"
               style={{ maxHeight: maxListHeight }}
            >
               {/* Optional "Select all" at top */}
               {showSelectAll &&
                  selectAllPosition === "top" && (
                     <button
                        type="button"
                        className={cn(
                           "flex w-full items-center px-2 py-1.5 text-sm",
                           "hover:bg-muted/70",
                           "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        onClick={handleSelectAll}
                     >
                        {makeCheckboxNode({
                           item: null,
                           selected: allSelected,
                           indeterminate: someSelected,
                           isSelectAll: true,
                        })}
                        <span className="truncate">
                           {selectAllLabel ?? "Select all"}
                        </span>
                     </button>
                  )}

               {/* Options */}
               {filteredItems.length === 0 ? (
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                     {emptySearchText ?? "No results found"}
                  </div>
               ) : (
                  filteredItems.map((item, index) => {
                     const selected = selectedValues.has(
                        item.value
                     );

                     const row = (
                        <button
                           key={item.key}
                           type="button"
                           className={cn(
                              "flex w-full items-start gap-2 px-2 py-1.5 text-sm",
                              "hover:bg-muted/70",
                              item.disabled &&
                              "opacity-50 cursor-not-allowed"
                           )}
                           onClick={() => {
                              if (item.disabled) return;
                              handleToggleValue(item.value);
                           }}
                        >
                           {makeCheckboxNode({
                              item,
                              selected,
                              indeterminate: false,
                              isSelectAll: false,
                           })}

                           <div className="flex flex-1 items-start gap-2">
                              {item.icon && (
                                 <span className="mt-0.5 shrink-0">
                                    {item.icon}
                                 </span>
                              )}
                              <div className="flex flex-col">
                                 <span>{item.labelNode}</span>
                                 {item.description && (
                                    <span className="text-xs text-muted-foreground">
                                       {item.description}
                                    </span>
                                 )}
                              </div>
                           </div>
                        </button>
                     );

                     if (!renderOption) return row;

                     return renderOption({
                        item,
                        selected,
                        index,
                        option: row,
                     });
                  })
               )}

               {/* Optional "Select all" at bottom */}
               {showSelectAll &&
                  selectAllPosition === "bottom" && (
                     <button
                        type="button"
                        className={cn(
                           "mt-1 flex w-full items-center px-2 py-1.5 text-sm border-t border-border",
                           "hover:bg-muted/70",
                           "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                        onClick={handleSelectAll}
                     >
                        {makeCheckboxNode({
                           item: null,
                           selected: allSelected,
                           indeterminate: someSelected,
                           isSelectAll: true,
                        })}
                        <span className="truncate">
                           {selectAllLabel ?? "Select all"}
                        </span>
                     </button>
                  )}
            </div>
         </PopoverContent>
      </Popover>
   );

   // ─────────────────────────────────────────────
   // Layout modes (mirroring select variant)
   // ─────────────────────────────────────────────

   // CASE 1: no controls → just the multi-select
   if (!hasControls) {
      return (
         <div
            data-slot="select-field"
            data-multi="true"
            className={cn(
               "w-full",
               disabled && "opacity-50 cursor-not-allowed",
               className
            )}
            aria-disabled={disabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            {MultiSelectCore}
         </div>
      );
   }

   // CASE 2: controls + joinControls → shared single box
   if (joinControls) {
      const groupClassName = cn(
         "flex items-stretch w-full",
         extendBoxToControls &&
         cn(
            "relative",
            baseBoxClasses // ring via :focus-within
         ),
         !extendBoxToControls &&
         "relative border-none shadow-none bg-transparent",
         className
      );

      return (
         <div
            data-slot="select-field"
            data-multi="true"
            className="w-full"
            aria-disabled={disabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            <div
               className={groupClassName}
               data-slot="select-group"
               data-disabled={disabled ? "true" : "false"}
            >
               {hasLeadingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        leadingControlClassName
                     )}
                     data-slot="leading-control"
                  >
                     {leadingControl}
                  </div>
               )}

               <div
                  className={cn(
                     "flex-1 min-w-0 flex items-stretch"
                  )}
                  data-slot="select-region"
               >
                  {MultiSelectCore}
               </div>

               {hasTrailingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        trailingControlClassName
                     )}
                     data-slot="trailing-control"
                  >
                     {trailingControl}
                  </div>
               )}
            </div>
         </div>
      );
   }

   // CASE 3: controls present, but separate (no joined box)
   return (
      <div
         data-slot="select-field"
         data-multi="true"
         className={cn(
            "flex items-stretch w-full",
            disabled && "opacity-50 cursor-not-allowed",
            className
         )}
         aria-disabled={disabled || undefined}
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
               {leadingControl}
            </div>
         )}

         <div className="flex-1 min-w-0" data-slot="select-region">
            {MultiSelectCore}
         </div>

         {hasTrailingControl && (
            <div
               className={cn(
                  "flex items-center ml-1",
                  trailingControlClassName
               )}
               data-slot="trailing-control"
            >
               {trailingControl}
            </div>
         )}
      </div>
   );
});

ShadcnMultiSelectVariant.displayName = "ShadcnMultiSelectVariant";

export default ShadcnMultiSelectVariant;