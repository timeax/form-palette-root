// ———————————————————————————————
// VariantModule wiring

import { ShadcnToggleVariant } from "@/presets/shadcn-variants/toggle-group";
import { VariantModule } from "@/schema/variant";

// ———————————————————————————————
export const toggleGroupModule: VariantModule<"toggle-group"> = {
   variant: "toggle-group",
   Variant: ShadcnToggleVariant,
   meta: {
      label: "Toggle group",
      description: "Toggle group component buttons.",
      tags: ["buttons", "toggle"],
   },
};