import { VariantModule } from "@/schema/variant";
import { ShadcnEditorVariant } from "@/presets/shadcn-variants/editor";

export const shadcnEditorVariant: VariantModule<"editor"> = {
    variant: "editor",
    Variant: ShadcnEditorVariant,
    meta: {
        label: "Editor",
        description: "Toast UI Editor (vanilla @toast-ui/editor).",
        tags: ["editor", "rich-text", "markdown", "toast-ui"],
    },
};
