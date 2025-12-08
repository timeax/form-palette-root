// src/presets/shadcn-variants/color.tsx

import * as React from "react";

import type { VariantModule } from "@/schema/variant";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

type BaseProps = VariantBaseProps<string | undefined>;

/**
 * Extra options specific to the color variant.
 */
export interface ColorSpecificProps {
   /**
    * If false, we hide the colour preview box.
    * Default: true
    */
   showPreview?: boolean;

   /**
    * If false, we hide the picker toggle control/icon.
    * Default: true
    */
   showPickerToggle?: boolean;

   /**
    * Size of the colour swatch in pixels.
    * Default: 18
    */
   previewSize?: number;

   /**
    * Optional className for the outer wrapper that hosts
    * the Input + hidden color input.
    */
   wrapperClassName?: string;

   /**
    * Optional className for the preview button itself (around the swatch).
    */
   previewButtonClassName?: string;

   /**
    * Optional className for the swatch box inside the preview button.
    */
   previewSwatchClassName?: string;

   /**
    * Optional className for the hidden `<input type="color">`.
    *
    * By default this input is visually hidden and only used
    * to invoke the browser/OS colour picker, but you can override
    * this class to make it visible and style it.
    */
   pickerInputClassName?: string;

   /**
    * Custom icon shown in the trailing control as the picker toggle.
    * If omitted, a tiny ▾ triangle is used.
    */
   pickerToggleIcon?: React.ReactNode;

   className?: string;
}

/**
 * We inherit the *visual/behavioural* props from ShadcnTextVariant,
 * but control value / onValue / type / inputMode / leadingControl / trailingControl ourselves.
 */
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   "type" | "inputMode" | "leadingControl" | "trailingControl" | "value" | "onValue"
>;

/**
 * Full props for the color variant as seen by the form runtime.
 */
export type ShadcnColorVariantProps = TextUiProps &
   ColorSpecificProps &
   Pick<BaseProps, "value" | "onValue">;

function normalizeColorForPicker(value: string | undefined): string {
   // Very light sanity: accept #rgb or #rrggbb; otherwise fall back.
   if (typeof value === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
      return value;
   }
   return "#000000";
}

export const ShadcnColorVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnColorVariantProps
>(function ShadcnColorVariant(props, ref) {
   const {
      // variant contract
      value,
      onValue,

      // colour-specific
      showPreview = true,
      showPickerToggle = true,
      previewSize = 18,
      wrapperClassName,
      previewButtonClassName,
      previewSwatchClassName,
      pickerInputClassName,
      pickerToggleIcon,

      // from text variant UI
      error,
      joinControls = true,
      extendBoxToControls = true,

      // everything else → Input (size, density, className, icons, etc.)
      ...restTextProps
   } = props;

   const [local, setLocal] = React.useState<string>(value ?? "");
   const [pickerOpen, setPickerOpen] = React.useState(false);

   React.useEffect(() => {
      setLocal(value ?? "");
   }, [value]);

   const pickerRef = React.useRef<HTMLInputElement | null>(null);

   const effectiveColor = normalizeColorForPicker(local || value);
   const showError = Boolean(error);

   const openSystemPicker = React.useCallback(() => {
      setPickerOpen(true);
      // Small timeout so state flushes before click; not strictly required but safe.
      window.setTimeout(() => {
         pickerRef.current?.click();
      }, 0);
   }, []);

   const handleTextChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const next = event.target.value ?? "";
         setLocal(next);

         if (onValue) {
            const detail: ChangeDetail<{ source: "input" }> = {
               source: "variant",
               raw: next,
               nativeEvent: event,
               meta: { source: "input" },
            };
            onValue(next || undefined, detail);
         }
      },
      [onValue]
   );

   const handlePickerChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const next = event.target.value ?? "";
         setLocal(next);

         if (onValue) {
            const detail: ChangeDetail<{ source: "picker" }> = {
               source: "variant",
               raw: next,
               nativeEvent: event,
               meta: { source: "picker" },
            };
            onValue(next || undefined, detail);
         }

         // Once the user picks a colour, the OS picker closes.
         setPickerOpen(false);
      },
      [onValue]
   );

   const handlePickerBlur = React.useCallback(() => {
      // If the user cancels the picker, blur fires and we can clear state.
      setPickerOpen(false);
   }, []);

   // ———————————————————————————————
   // Leading control: colour preview
   // ———————————————————————————————

   const leadingControl = showPreview ? (
      <button
         type="button"
         onClick={openSystemPicker}
         className={cn(
            "flex h-full items-center px-3 border-r border-border/50",
            "hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:bg-muted/50",
            previewButtonClassName
         )}
         tabIndex={-1}
         aria-label="Open colour picker"
      >
         <span
            className={cn(
               "inline-flex rounded-sm shadow-sm ring-1 ring-inset ring-foreground/10",
               previewSwatchClassName
            )}
            style={{
               width: previewSize,
               height: previewSize,
               backgroundColor: effectiveColor,
            }}
         />
      </button>
   ) : undefined;

   // ———————————————————————————————
   // Trailing control: picker toggle icon
   // ———————————————————————————————

   const toggleNode =
      pickerToggleIcon !== undefined ? (
         pickerToggleIcon
      ) : (
         // Swapped the text caret for a Lucide Palette icon
         <Palette className="h-4 w-4 opacity-50" />
      );

   const trailingControl = showPickerToggle ? (
      <button
         type="button"
         onClick={openSystemPicker}
         className="flex h-full items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
         tabIndex={-1}
         aria-label={pickerOpen ? "Close colour picker" : "Open colour picker"}
         data-open={pickerOpen ? "true" : "false"}
      >
         {toggleNode}
      </button>
   ) : undefined;

   // ———————————————————————————————
   // Render
   // ———————————————————————————————

   return (
      <div className={cn("relative group/color", wrapperClassName)}>
         <Input
            ref={ref}
            {...restTextProps}
            type="text"
            value={local}
            onChange={handleTextChange}
            leadingControl={leadingControl}
            trailingControl={trailingControl}
            joinControls={joinControls}
            extendBoxToControls={extendBoxToControls}
            aria-invalid={showError ? "true" : undefined}
            // Added mono font and uppercase for cleaner hex code display
            className={cn("font-mono uppercase", restTextProps.className)}
            maxLength={9}
         />

         {/* Native color input – used to show the real browser/OS picker.
                By default it's visually hidden; override pickerInputClassName
                if you ever want to show/style it directly. */}
         <input
            ref={pickerRef}
            type="color"
            // hidden
            className={cn(
               "absolute h-0 w-0 opacity-0 pointer-events-none",
               pickerInputClassName
            )}
            value={effectiveColor}
            onChange={handlePickerChange}
            onBlur={handlePickerBlur}
            tabIndex={-1}
            aria-hidden="true"
         />
      </div>
   );
});

ShadcnColorVariant.displayName = "ShadcnColorVariant";
