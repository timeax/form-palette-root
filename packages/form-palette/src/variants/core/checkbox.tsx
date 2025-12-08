// src/variants/core/checkbox.ts

import type { VariantModuleFor } from "@/schema/variant";
import { ShadcnCheckboxVariant } from "@/presets/shadcn-variants/checkbox";
import type {
   ShadcnCheckboxVariantPublicProps,
   CheckboxVariantPublicValue,
} from "@/presets/shadcn-variants/checkbox";
import type { VariantBaseProps } from "@/variants/shared";
import { toggleLayoutDefaults } from "./toggle";

/**
 * Public props type you can import elsewhere:
 *
 *   import type { CheckboxVariantProps } from "@/variants/core/checkbox";
 */
export type CheckboxVariantProps = ShadcnCheckboxVariantPublicProps;

/**
 * Concrete Variant component type, if you need it:
 *
 *   VariantBaseProps<CheckboxVariantPublicValue> & CheckboxVariantProps
 */
type CheckboxVariantComponentProps =
   VariantBaseProps<CheckboxVariantPublicValue> & CheckboxVariantProps;

/**
 * Runtime module for the "checkbox" variant.
 *
 * This wires the Shadcn preset into the core registry with sensible defaults.
 */
export const checkboxModule: VariantModuleFor<"checkbox"> = {
   variant: "checkbox",

   // ShadcnCheckboxVariant is generic; we fix it to the public aliases
   // via this cast. At call sites you'll still get strong typing because
   // the registry types know the concrete value/props.
   Variant: ShadcnCheckboxVariant as unknown as React.ComponentType<CheckboxVariantComponentProps>,

   resolveLayout({ props }) {
      if (props.single) {
         return toggleLayoutDefaults
      }

      return {};
   },

   meta: {
      label: "Checkbox",
      description:
         "Single or group checkboxes with optional per-item tri-state support.",
      tags: ["checkbox", "group", "boolean", "tri-state"],
   },
};