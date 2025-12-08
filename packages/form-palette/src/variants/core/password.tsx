// src/variants/core/password.tsx

import type { VariantModuleFor } from "@/schema/variant";
import { ShadcnPasswordVariant } from "@/presets/shadcn-variants/password";

/**
 * Core module for the "password" variant.
 *
 * - Uses the ShadcnPasswordVariant UI (Input + reveal toggle + strength meter).
 * - Value type is string | undefined (from Variants["password"].value).
 * - Props are ShadcnPasswordVariantProps (from Variants["password"].props).
 */
export const passwordVariant: VariantModuleFor<"password"> = {
   variant: "password",
   Variant: ShadcnPasswordVariant,

   // Optional layout defaults – tweak as you like
   defaults: {
      layout: {
         fullWidth: true,
         // You can set defaultSize/defaultDensity here if you want:
         // defaultSize: "md",
         // defaultDensity: "normal",
      },
   },

   meta: {
      label: "Password",
      description:
         "Password input with reveal toggle and optional strength meter.",
      tags: ["auth", "security", "password"],
   },
};

export default passwordVariant;