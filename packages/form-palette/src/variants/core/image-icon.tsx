// src/variants/core/image-icon.ts

import ShadcnImageIconVariant from "@/presets/shadcn-variants/image-icon";
import type { VariantModuleFor } from "@/schema/variant";

export const imageIconVariant: VariantModuleFor<"image-icon"> = {
    variant: "image-icon",
    Variant: ShadcnImageIconVariant as any,
    defaults: {
        layout: {
            fullWidth: true,
        },
    },
    meta: {
        label: "Image / Icon",
        description: "Select an uploaded image/file OR an Iconify icon.",
        tags: ["image", "icon", "file", "picker", "shadcn"],
    },
};
