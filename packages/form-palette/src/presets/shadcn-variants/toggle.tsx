// src/presets/shadcn-variants/toggle.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Switch } from "@/presets/ui/switch"; // adjust path if your Switch lives elsewhere

type ToggleValue = boolean | undefined;
type BaseProps = VariantBaseProps<ToggleValue>;

type Size = "sm" | "md" | "lg";
type Density = "default" | "dense";

/**
 * UI props specific to the Shadcn-based toggle.
 *
 * This uses Switch as the underlying control, but we keep
 * the API surface small and focused.
 */
export interface ShadcnToggleUiProps
   extends Omit<
      React.ComponentProps<typeof Switch>,
      "checked" | "onCheckedChange" | "className" | 'defaultValue' | 'onChange'
   > {
   /**
    * Visual size of the switch / text.
    * Default: "md".
    */
   size?: Size;

   /**
    * Row density (vertical padding & gap).
    * Default: "default".
    */
   density?: Density;

   /**
    * Place the switch on the left or right of the state text.
    * Default: "left".
    */
   controlPlacement?: "left" | "right";

   /**
    * Optional state text shown next to the control when ON.
    */
   onText?: React.ReactNode;

   /**
    * Optional state text shown next to the control when OFF.
    */
   offText?: React.ReactNode;

   /**
    * Wrapper class for the whole toggle row.
    */
   className?: string;

   /**
    * Extra classes for the Switch root.
    */
   switchClassName?: string;

   /**
    * Extra classes for the Switch thumb.
    * (Your patched Switch should support thumbClassName.)
    */
   switchThumbClassName?: string;
}

/**
 * Full props for the Shadcn-based toggle variant.
 *
 * We only pick value/onValue/error from the variant base props;
 * everything else (id, disabled, aria-*) flows via Switch props.
 */
export type ShadcnToggleVariantProps = ShadcnToggleUiProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function rowGap(density: Density) {
   return density === "dense" ? "gap-2" : "gap-3";
}

function rowPadding(density: Density) {
   return density === "dense" ? "py-0.5" : "py-1";
}

function textSize(size: Size) {
   if (size === "sm") return "text-sm";
   if (size === "lg") return "text-base";
   return "text-sm";
}

// Map size → Switch track + thumb sizing
function switchRootSize(size: Size) {
   if (size === "sm") return "h-5 w-9";
   if (size === "lg") return "h-7 w-12";
   // default shadcn-ish base
   return "h-[1.15rem] w-8";
}

function switchThumbSize(size: Size) {
   if (size === "sm") return "size-3.5";
   if (size === "lg") return "size-5";
   return "size-4";
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnToggleVariant = React.forwardRef<
   HTMLButtonElement,
   ShadcnToggleVariantProps
>(function ShadcnToggleVariant(props, _ref) {
   const {
      // variant bits
      value,
      onValue,
      error,

      // UI config
      size = "md",
      density = "default",
      controlPlacement = "left",
      onText,
      offText,
      className,
      switchClassName,
      switchThumbClassName,

      // Switch passthroughs
      disabled,
      id,
      "aria-describedby": describedBy,
      ...restSwitchProps
   } = props;

   const checked = !!value;

   const handleToggle = React.useCallback(
      (next: boolean) => {
         const nextVal = !!next;
         const detail: ChangeDetail = {
            source: "variant",
            raw: nextVal,
            nativeEvent: undefined,
            meta: undefined,
         };
         onValue?.(nextVal, detail);
      },
      [onValue],
   );

   const rowCls = cn(
      "flex w-fit items-center",
      rowGap(density),
      rowPadding(density),
   );

   const stateText =
      onText != null || offText != null ? (
         <span
            className={cn("select-none text-muted-foreground", textSize(size))}
         >
            {checked ? onText : offText}
         </span>
      ) : null;

   const switchEl = (
      <Switch
         id={id}
         checked={checked}
         onCheckedChange={handleToggle}
         disabled={disabled}
         aria-describedby={describedBy}
         aria-checked={checked}
         className={cn(switchRootSize(size), switchClassName)}
         thumbClassName={cn(switchThumbSize(size), switchThumbClassName)}
         {...restSwitchProps}
      />
   );

   return (
      <div
         data-slot="toggle-field"
         className={cn(
            "w-fit",
            disabled && "opacity-50 cursor-not-allowed",
            className,
         )}
         aria-disabled={disabled || undefined}
         aria-invalid={error ? "true" : undefined}
      >
         <div className={rowCls}>
            {controlPlacement === "left" ? (
               <>
                  {switchEl}
                  {stateText}
               </>
            ) : (
               <>
                  {stateText}
                  {switchEl}
               </>
            )}
         </div>
      </div>
   );
});

ShadcnToggleVariant.displayName = "ShadcnToggleVariant";

export default ShadcnToggleVariant;