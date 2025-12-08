import ShadcnTextareaVariant from "@/presets/shadcn-variants/textarea";
import { VariantModuleFor } from "@/schema/variant";


export const textareaVariant: VariantModuleFor<"textarea"> = {
   variant: "textarea",
   Variant: ShadcnTextareaVariant as any,
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
      label: "Textarea",
      description: "Multi-line text input area.",
      tags: ["text", "multiline", "comments", "notes"],
   },
}