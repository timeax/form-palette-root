// src/variants/core/toggle.ts

import type { VariantModuleFor } from "@/schema/variant";
import type { FieldLayoutConfig } from "@/schema/input-field";
import ShadcnToggleVariant from "@/presets/shadcn-variants/toggle";

export const toggleLayoutDefaults: FieldLayoutConfig = {
   // Render label + control in a single row
   inline: true,

   // Semantically: label is to the "right" of the control for this variant.
   // (Your InputField can use this to decide macro-level positioning.)
   labelPlacement: "right",

   // Attach all helpers to the label root by default.
   // Sublabel will still use its own placement (default: "right"),
   // but it's logically anchored to the label block.
   relativeRoots: {
      sublabel: "label",
      description: "label",
      helpText: "label",
      errorText: "label",
   },

   fullWidth: false,

   // Within the label root, show error first, then description, then help,
   // then sublabel (all still respecting their individual placements).
   ordering: {
      label: ["errorText", "description", "helpText", "sublabel"],
      // For this variant we don't really use input-root helpers,
      // but we keep the key for completeness.
      input: [],
   },
};

export const ToggleVariantModule: VariantModuleFor<"toggle"> = {
   variant: "toggle",
   Variant: ShadcnToggleVariant as any,
   defaults: {
      layout: toggleLayoutDefaults,
   },
   meta: {
      label: "Toggle",
      description: "Boolean on/off switch",
      tags: ["boolean", "toggle", "switch"],
   },
};

export default ToggleVariantModule;