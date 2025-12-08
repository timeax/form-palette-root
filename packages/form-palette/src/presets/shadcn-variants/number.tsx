import React from "react";
import { InputNumber, InputNumberProps, InputNumberValueChangeEvent } from "../ui/number";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";

// Wrapper-level props for the variant
export type ShadcnNumberVariantProps =
   // All the usual number stuff (mode, locale, prefix, suffix, etc.)
   Omit<InputNumberProps,
      | "onValueChange"
      | "onChange"
      | "leadingControl"
      | "trailingControl"
   >
   & {
      /**
       * Show +/- buttons around the numeric field.
       * Defaults to false.
       */
      showButtons?: boolean;

      /**
       * How the step buttons are laid out when showButtons is true.
       *
       * - 'inline': "-" on the left, "+" on the right
       * - 'stacked': vertical +/- stack on the right
       */
      buttonLayout?: "inline" | "stacked";
   };


export const ShadcnNumberVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnNumberVariantProps
>(function ShadcnNumberVariant(props, forwardedRef) {
   const {
      showButtons,
      buttonLayout = "stacked",
      disabled, // Extract disabled to style buttons
      ...rest
   } = props;

   // we still want access to these for stepping logic
   const {
      step = 1,
      min,
      value,
      max,
      onValue: onValueChange,
      name,
      id,
      inputId,
   } = rest as ShadcnNumberVariantProps;

   const handleChange = React.useCallback(
      (e: InputNumberValueChangeEvent) => {
         if (onValueChange) {
            onValueChange(e.value as any, {
               source: "user",
               nativeEvent: e.originalEvent as any,
               raw: e.value,
            });
         }
      },
      [onValueChange]
   );

   const handleStep = React.useCallback(
      (direction: 1 | -1, originalEvent: React.SyntheticEvent<any>) => {
         if (disabled) return;

         const current = value ?? 0;
         let next = current + direction * step;

         if (typeof min === "number") next = Math.max(next, min);
         if (typeof max === "number") next = Math.min(next, max);

         // Prime-style event
         const e: InputNumberValueChangeEvent = {
            originalEvent,
            value: next,
            stopPropagation: () => originalEvent.stopPropagation(),
            preventDefault: () => originalEvent.preventDefault(),
            target: {
               name,
               id: id ?? inputId ?? null,
               value: next,
            },
         };

         handleChange(e)
      },
      [value, step, min, max, onValueChange, name, id, inputId, disabled, handleChange]
   );

   // --- Styles ---
   // Common styles for the interactive buttons
   const btnBase = "flex h-full items-center justify-center bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed";

   // Build controls based on layout
   let leadingControl: React.ReactNode | undefined;
   let trailingControl: React.ReactNode | undefined;

   if (showButtons) {
      if (buttonLayout === "inline") {
         // INLINE: "-" on the left, "+" on the right
         leadingControl = (
            <button
               type="button"
               tabIndex={-1} // Prevent tabbing to buttons
               disabled={disabled}
               onClick={(e) => handleStep(-1, e)}
               className={cn(btnBase, "border-r border-input px-3")}
               aria-label="Decrease value"
            >
               <Minus className="h-4 w-4" />
            </button>
         );

         trailingControl = (
            <button
               type="button"
               tabIndex={-1}
               disabled={disabled}
               onClick={(e) => handleStep(1, e)}
               className={cn(btnBase, "border-l border-input px-3")}
               aria-label="Increase value"
            >
               <Plus className="h-4 w-4" />
            </button>
         );
      } else {
         // STACKED: vertical +/- on the right
         trailingControl = (
            <div className="flex h-full flex-col border-l border-input">
               <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  onClick={(e) => handleStep(1, e)}
                  className={cn(btnBase, "h-1/2 px-2 border-b border-input")}
                  aria-label="Increase value"
               >
                  <ChevronUp className="h-3 w-3" />
               </button>
               <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  onClick={(e) => handleStep(-1, e)}
                  className={cn(btnBase, "h-1/2 px-2")}
                  aria-label="Decrease value"
               >
                  <ChevronDown className="h-3 w-3" />
               </button>
            </div>
         );
      }
   }

   return (
      <InputNumber
         ref={forwardedRef}
         value={value}
         disabled={disabled}
         {...rest}
         onValueChange={handleChange}
         leadingControl={leadingControl}
         trailingControl={trailingControl}
         extendBoxToControls
         // Ensure the controls sit flush inside the container
         leadingControlClassName={cn("flex h-full", rest.leadingControlClassName)}
         trailingControlClassName={cn("flex h-full", rest.trailingControlClassName)}
      />
   );
});
