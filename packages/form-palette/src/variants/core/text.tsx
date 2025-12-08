// src/variants/core/text.tsx

import * as React from "react";

import type { Dict } from "@/schema/core";
import type { VariantModule } from "@/schema/variant";
import type { ValidateResult } from "@/schema/input-field";
import { ShadcnTextVariant } from "@/presets/shadcn-variants/text";
import type { ShadcnTextUiProps, ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";

/**
 * Text variant props (core layer).
 *
 * - Extends Dict so it can cleanly participate in the Variants registry.
 * - Extends the Shadcn UI props so the core variant can pass everything
 *   straight through to the underlying visual component.
 *
 * This is where we hang *semantic* flags that drive validation.
 */
export interface TextVariantProps extends Dict, ShadcnTextUiProps {
    /**
     * If true, the value will be trimmed before validation.
     * (Visual value is still whatever the user types; this is just for
     * validation semantics.)
     */
    trim?: boolean;

    /**
     * Minimum allowed string length (after optional trimming).
     */
    minLength?: number;

    /**
     * Maximum allowed string length (after optional trimming).
     */
    maxLength?: number;
}

/**
 * Simple validation helper for the text variant.
 */
function validateText(
    value: string | undefined,
    ctx: {
        required?: boolean;
        props: ShadcnTextVariantProps & TextVariantProps;
    }
): ValidateResult {
    const { required, props } = ctx;
    const { trim, minLength, maxLength } = props;

    const raw = value ?? "";
    const v = trim ? raw.trim() : raw;

    // required
    if (required && v.length === 0) {
        return "This field is required.";
    }

    // minLength
    if (typeof minLength === "number" && v.length > 0 && v.length < minLength) {
        return `Please enter at least ${minLength} characters.`;
    }

    // maxLength
    if (typeof maxLength === "number" && v.length > maxLength) {
        return `Please enter no more than ${maxLength} characters.`;
    }

    return true;
}

/**
 * Core text variant module.
 *
 * - Uses ShadcnTextVariant as the visual component.
 * - Adds simple length-based validation.
 * - Provides layout defaults for InputField to use.
 */
export const textVariant: VariantModule<"text"> = {
    variant: "text",

    // Visual component: Shadcn-based text input
    Variant: ShadcnTextVariant,

    // Validation logic (runs before/alongside per-field onValidate)
    validate(value, { required, props, field, form }) {
        //@ts-ignore field + form are available if you need them later.
        return validateText(value, { required, props });
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
        label: "Text",
        description: "Single-line text input",
        tags: ["text", "input", "string"],
    },
};

export default textVariant;