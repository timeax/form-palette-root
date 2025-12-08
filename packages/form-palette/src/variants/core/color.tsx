// ———————————————————————————————
// VariantModule wiring

import { ShadcnColorVariant } from "@/presets/shadcn-variants/color";
import { VariantModule } from "@/schema/variant";

// ———————————————————————————————
export const ColorVariantModule: VariantModule<"color"> = {
   variant: "color",
   Variant: ShadcnColorVariant,
   meta: {
      label: "Phone",
      description: "Phone number input with country code and masking.",
      tags: ["phone", "tel", "contact"],
   },
};