import ShadcnSelectVariant, { ShadcnSelectVariantProps } from "@/presets/shadcn-variants/select";
import { VariantModuleFor } from "@/schema/variant";

export type SelectVariantProps = ShadcnSelectVariantProps;

export const selectModule: VariantModuleFor<"select"> = {
   variant: "select",
   Variant: ShadcnSelectVariant,

   meta: {
      label: "Select",
      description: "Single-value dropdown based on Shadcn Select.",
      tags: ["select", "dropdown", "single-value"],
   },
};