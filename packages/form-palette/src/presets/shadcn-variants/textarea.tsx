// src/presets/shadcn-variants/textarea.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { Textarea } from "@/presets/ui/textarea";
import type { TextareaProps as UiTextareaProps } from "@/presets/ui/textarea";

type TextareaValue = string | undefined;
type BaseProps = VariantBaseProps<TextareaValue>;

/**
 * Full props for the Shadcn-based textarea variant.
 *
 * - Reuses all UI-level behaviour from `Textarea` (autoResize, upperControl,
 *   leading/trailing controls, icons, size/density, padding knobs, etc.).
 * - Takes over `value` / `onChange` so it can emit through `onValue` with
 *   a `ChangeDetail`.
 */
export interface ShadcnTextareaVariantProps
   extends Omit<UiTextareaProps, "value" | "defaultValue" | "onChange">,
   Pick<BaseProps, "value" | "onValue" | "error"> { }

export const ShadcnTextareaVariant = React.forwardRef<
   HTMLTextAreaElement,
   ShadcnTextareaVariantProps
>(function ShadcnTextareaVariant(props, ref) {
   const {
      value,
      onValue,
      error,
      // everything else goes straight to the UI Textarea
      ...rest
   } = props;

   const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
         const next = event.target.value ?? "";

         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: event,
            meta: undefined,
         };

         // empty string → undefined, same convention as text/chips
         onValue?.(next.length ? next : undefined, detail);
      },
      [onValue],
   );

   return (
      <Textarea
         ref={ref}
         {...rest}
         value={value ?? ""}
         onChange={handleChange}
         aria-invalid={error ? "true" : undefined}
      />
   );
});

ShadcnTextareaVariant.displayName = "ShadcnTextareaVariant";

export default ShadcnTextareaVariant;