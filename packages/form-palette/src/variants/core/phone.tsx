// ———————————————————————————————
// VariantModule wiring

import { ShadcnPhoneVariant } from "@/presets/shadcn-variants/phone";
import { VariantModule } from "@/schema/variant";

// ———————————————————————————————
export const PhoneVariantModule: VariantModule<"phone"> = {
   variant: "phone",
   Variant: ShadcnPhoneVariant,
   meta: {
      label: "Phone",
      description: "Phone number input with country code and masking.",
      tags: ["phone", "tel", "contact"],
   },
};