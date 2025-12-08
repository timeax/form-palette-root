// src/variants/core/custom.tsx

import type { VariantModule } from "@/schema/variant";
import { ShadcnCustomVariant } from "@/presets/shadcn-variants/custom";

/**
 * Core "custom" variant module.
 *
 * - Delegates all UI to ShadcnCustomVariant.
 * - No layout defaults, no built-in validation.
 * - Consumers can override layout via InputField props if needed.
 */
export const customVariant: VariantModule<"custom"> = {
   variant: "custom",
   Variant: ShadcnCustomVariant,
};

export default customVariant;