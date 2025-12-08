// src/variants/core/radio.ts

import type { VariantModuleFor } from "@/schema/variant";
import { ShadcnRadioVariant } from "@/presets/shadcn-variants/radio";

/**
 * Built-in "radio" variant module.
 *
 * Uses the Shadcn-based implementation in presets/shadcn-variants/radio.tsx
 */
export const radioVariantModule: VariantModuleFor<"radio"> = {
   variant: "radio",
   // Note: registry-level typing uses unknown, but the component itself is generic.
   Variant: ShadcnRadioVariant as any,
   defaults: {
      layout: {
         // Standard stacked field layout; the smart renderer still
         // handles ordering/relative roots for helpers.
         labelPlacement: "top",
         sublabelPlacement: "right",
         descriptionPlacement: "below",
         helpTextPlacement: "below",
         errorTextPlacement: "below",
         inline: false,
         fullWidth: true,

         // Explicit layout hints
         defaultSize: "md",
         defaultDensity: "comfortable", // ← uses your FieldDensity union
      },
   },
   meta: {
      label: "Radio group",
      description:
         "Choose one option from a list of mutually exclusive choices.",
      tags: ["choice", "select", "exclusive", "radio"],
   },
};