// src/variants/shared.ts

import React from "react";

/**
 * Size hint for field variants.
 *
 * Presets can interpret these however they like (font size, padding, etc.).
 */
export type FieldSize = "sm" | "md" | "lg";

/**
 * Density hint for field variants.
 *
 * - "compact"     → tight vertical spacing
 * - "comfortable" → default spacing
 * - "loose"       → extra breathing room
 */
export type FieldDensity = "compact" | "comfortable" | "loose";

/**
 * Logical source of a change event.
 *
 * Variants and utilities can tag changes to help the host reason
 * about where a value came from.
 */
export type ChangeSource =
    | "variant"
    | "paste"
    | "programmatic"
    | "util"
    | (string & {}); // allow custom tags

/**
 * Additional context passed along with value changes.
 */
export interface ChangeDetail<TMeta = unknown, TRaw = unknown> {
    /**
     * Logical source for this change.
     */
    source: ChangeSource;

    /**
     * Optional raw input that produced this value.
     *
     * Example: original keyboard input or pasted string.
     */
    raw?: TRaw;

    nativeEvent?: React.SyntheticEvent;
    /**
     * Variant-specific metadata (e.g. cursor position).
     */
    meta?: TMeta;
}

/**
 * Base props shared by all variant components.
 *
 * Each variant module will extend this with its own props type.
 */
export interface VariantBaseProps<TValue> {
    /**
     * Current logical value for this field.
     */
    value?: TValue | undefined;

    /**
     * Called whenever the variant wants to update the value.
     *
     * The detail payload describes where the change came from.
     */
    onValue?(value: TValue | undefined, detail?: ChangeDetail): void;

    /**
     * State flags.
     */
    disabled?: boolean;
    defaultValue?: TValue;
    readOnly?: boolean;
    required?: boolean;

    alias?: string;
    main?: boolean;
    /**
     * Current error message for this field, if any.
     */
    error?: string;

    /**
     * Size & density hints.
     *
     * Variants are free to ignore these, but presets (e.g. Shadcn)
     * will typically honour them.
     */
    size?: FieldSize;
    density?: FieldDensity;
}

export interface Extras {
    trailingIcons?: React.ReactNode[];
    leadingIcons?: React.ReactNode[];
    icon?: React.ReactNode;
    iconGap?: number;
    trailingIconSpacing?: number;
    leadingIconSpacing?: number;
    trailingControl?: React.ReactNode;
    leadingControl?: React.ReactNode;
    /**
     * Optional className applied to the container that wraps the leading control.
     * This does not affect the control node itself, only the wrapper div.
     */
    leadingControlClassName?: string;
    /**
     * Optional className applied to the container that wraps the trailing control.
     * This does not affect the control node itself, only the wrapper div.
     */
    trailingControlClassName?: string;
    px?: number;
    py?: number
    pb?: number;
    pe?: number;
    ps?: number;
}

export type ExtraFieldProps<Props> = Extras & Props;
