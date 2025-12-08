import ShadcnTreeSelectVariant from "@/presets/shadcn-variants/treeselect";
import { VariantModule } from "@/schema/variant";



const treeselectModule: VariantModule<'treeselect'> = {
   variant: 'treeselect',
   Variant: ShadcnTreeSelectVariant as any
}

export default treeselectModule