import ShadcnChipsVariant from "@/presets/shadcn-variants/chips";
import { VariantModuleFor } from "@/schema/variant";


export const chipVariant: VariantModuleFor<"chips"> = {
   variant: "chips",
   Variant: ShadcnChipsVariant as any,
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
      label: "Chips",
      description: "Chips input allowing multiple selections.",
      tags: ["chips", "multi-select", "tags"],
   },
}