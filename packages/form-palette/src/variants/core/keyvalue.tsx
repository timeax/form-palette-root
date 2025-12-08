import ShadcnKeyValueVariant from "@/presets/shadcn-variants/keyvalue";
import { VariantModule } from "@/schema/variant";


export const keyValueModule: VariantModule<'keyvalue'> = {
   variant: 'keyvalue',
   Variant: ShadcnKeyValueVariant,

   meta: {
      label: ''
   }
} 