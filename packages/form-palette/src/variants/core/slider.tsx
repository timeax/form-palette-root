// src/variants/core/slider.ts

import type { ValidateResult } from "@/schema/input-field";
import type { ShadcnSliderVariantProps } from "@/presets/shadcn-variants/slider";
import { ShadcnSliderVariant } from "@/presets/shadcn-variants/slider";
import { VariantModule } from "@/schema/variant";

/**
 * Slider value type:
 * - `number | undefined` for now (single-value slider).
 *   If/when you add range support, this can be widened to [number, number].
 */
export type SliderValue = number | undefined;


/**
 * Basic validation:
 * - if required → must have a numeric value
 * - otherwise always OK
 */
function validateSlider(
   value: SliderValue,
   ctx: { required?: boolean }
): ValidateResult {
   if (ctx.required) {
      if (value === undefined || value === null) {
         return "Required.";
      }
      if (typeof value !== "number" || Number.isNaN(value)) {
         return "Invalid number.";
      }
   }

   // You could optionally enforce min/max here using ctx.props
   return true;
}

/**
 * Register the slider variant with the global registry.
 *
 * No layout defaults are provided here:
 * - layout (inline vs stacked, label placement, etc.) is controlled by
 *   the host via FieldLayoutConfig / InputField overrides instead.
 */
export default {
   variant: "slider",
   Variant: ShadcnSliderVariant,
   validate(value, ctx): ValidateResult {
      return validateSlider(value as SliderValue, {
         required: ctx.required,
      });
   },
} as VariantModule<'slider'>;

export type SliderVariantProps = ShadcnSliderVariantProps;