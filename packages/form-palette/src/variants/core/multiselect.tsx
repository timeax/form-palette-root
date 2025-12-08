

// src/variants/multi-select.ts

import type { VariantModule } from "@/schema/variant";
import {
   ShadcnMultiSelectVariant,
   type ShadcnMultiSelectVariantProps,
} from "@/presets/shadcn-variants/multiselect";

export type MultiSelectValue = (string | number)[] | undefined;


/**
 * Variant module for "multi-select".
 *
 * No defaults / layout overrides here — layout is driven by InputField +
 * host overrides, same as your other variants.
 */
export const multiSelectVariantModule: VariantModule<"multi-select"> = {
   variant: "multi-select",
   Variant: ShadcnMultiSelectVariant,
   meta: {
      
   }
};

export default multiSelectVariantModule;