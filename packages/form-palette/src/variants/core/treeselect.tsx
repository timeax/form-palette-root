import ShadcnTreeSelectVariant from "@/presets/shadcn/variants/treeselect";
import { VariantModule } from "@/schema/variant";

const treeselectModule: VariantModule<'treeselect'> = {
   variant: 'treeselect',
   Variant: ShadcnTreeSelectVariant as any,

   // Layout defaults for this variant
   defaults: {
       layout: {
           labelPlacement: "top",
           sublabelPlacement: "right",
           descriptionPlacement: "below",
           helpTextPlacement: "below",
           errorTextPlacement: "below",
           inline: false,
           fullWidth: true,
           defaultSize: "md",
           defaultDensity: "comfortable",
       },
   },

   meta: {
       label: "TreeSelect",
       description: "Hierarchical tree selection dropdown with collapsible folders and node tags.",
       tags: ["tree", "select", "hierarchical", "dropdown", "multiselect"],
   },
}

export default treeselectModule