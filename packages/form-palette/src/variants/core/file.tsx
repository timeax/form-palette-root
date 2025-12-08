import ShadcnFileVariant from "@/presets/shadcn-variants/file";
import { VariantModule } from "@/schema/variant";



export const fileManagerModule: VariantModule<'file'> = {
   Variant: ShadcnFileVariant as any,
   variant: 'file'
}