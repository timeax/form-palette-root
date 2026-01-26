// src/variants/core/icon.ts

import ShadcnIconVariant from "@/presets/shadcn-variants/icon";
import type { VariantModuleFor } from "@/schema/variant";

export const iconVariant: VariantModuleFor<"icon"> = {
    variant: "icon",
    Variant: ShadcnIconVariant as any,
    defaults: {
        layout: {
            fullWidth: true,
        },
    },
    meta: {
        label: "Icon",
        description:
            "Iconify icon picker (single/multiple, supports button mode).",
        tags: ["icon", "iconify", "picker", "shadcn"],
    },
};
