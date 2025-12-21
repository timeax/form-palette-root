// src/variants/core/json-editor.tsx

import type { VariantModule } from "@/schema/variant";
import ShadcnJsonEditorVariant from "@/presets/shadcn-variants/json-editor";
import type { ShadcnJsonEditorProps } from "@/presets/shadcn-variants/json-editor/types";
import Ajv from "ajv";

const ajv = new Ajv({
    allErrors: true,
    strict: false,
});

/**
 * Core JSON Editor variant module.
 */
export const jsonEditorVariant: VariantModule<"json-editor"> = {
    variant: "json-editor",

    // Visual component: Shadcn-based JSON editor
    Variant: ShadcnJsonEditorVariant as any,

    // Validation logic
    validate(value, { props }) {
        const { schema } = props;
        let resolvedSchema = schema;

        // If schema is a string, try to parse it as JSON
        if (typeof schema === "string") {
            try {
                resolvedSchema = JSON.parse(schema);
            } catch (e) {
                // If it's not valid JSON, we can't use it for validation
                // It might be a schema ID/name, so we skip AJV validation here
                resolvedSchema = null;
            }
        }

        // Only try a validation if the schema property is provided (as an object)
        if (resolvedSchema && typeof resolvedSchema === "object") {
            try {
                const validate = ajv.compile(resolvedSchema);
                const valid = validate(value);

                if (!valid) {
                    // Return the first error message or a generic one
                    const error = validate.errors?.[0];
                    return error ? `${error.instancePath} ${error.message}`.trim() : "Invalid JSON structure";
                }
            } catch (e) {
                // Compilation error (e.g. invalid schema format)
                return `Schema Error: ${e instanceof Error ? e.message : String(e)}`;
            }
        }

        return true;
    },

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
        label: "JSON Editor",
        description: "Advanced JSON editor with visual and raw modes",
        tags: ["json", "editor", "object", "array"],
    },
};

export default jsonEditorVariant;
