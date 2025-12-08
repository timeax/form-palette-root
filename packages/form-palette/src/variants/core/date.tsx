import ShadcnDateVariant from "@/presets/shadcn-variants/date";
import { VariantModuleFor } from "@/schema/variant";


export const dateVariant: VariantModuleFor<"date"> = {
   variant: "date",
   Variant: ShadcnDateVariant as any,

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
      label: "Date",
      description:
         "Date input with calendar picker.",
      tags: ["date", "calendar", "picker"],
   },
}