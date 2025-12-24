import { VariantModule } from "@/schema/variant";
import ShadcnListerVariant from "@/presets/shadcn-variants/lister";

const module: VariantModule<"lister"> = {
    variant: "lister",
    Variant: ShadcnListerVariant,

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
        label: "Lister",
        description:
            "Select/multi-select powered by the Lister runtime (popover body only).",
        tags: ["select", "multiselect", "popover", "lister"],
    },
};

export default module;
