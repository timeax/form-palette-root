// src/input/input-props.ts
// noinspection DuplicatedCode

import * as React from "react";

import type { CoreContext, Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { FieldSize, FieldDensity, ChangeDetail } from "@/variants/shared";
import type {
    VariantKey,
    VariantValueFor,
    VariantPropsFor,
} from "@/schema/variant";
import type {
    LabelPlacement,
    SublabelPlacement,
    DescriptionPlacement,
    HelpTextPlacement,
    ErrorTextPlacement,
    ValidateResult,
    SlotPlacement,
} from "@/schema/input-field";

/**
 * Core, variant-agnostic props for InputField.
 *
 * @template TValue Logical value type for this field. Will be refined by
 *                  variant typing (VariantValueFor<K>).
 */
export interface InputFieldBaseProps<TValue = unknown> {
    // ─────────────────────────────────────────────
    // Identity / wiring into the core runtime
    // ─────────────────────────────────────────────

    name?: string;
    bind?: string;
    groupId?: string;
    shared?: string;
    ignore?: boolean;
    alias?: string;
    main?: boolean;
    tags?: FieldTag[];
    contain?: boolean;
    autoOff?: boolean;

    /**
     * Controlled value prop.
     */
    value?: TValue;

    /**
     * Handles the submission logic for a given form or process.
     *
     * @param {TValue} e - The value associated with the submission action.
     * @return {any} Value to be submitted.
     */
    onSubmit?(e: TValue): any;
    onReset?(e: React.FormEvent<HTMLFormElement>): void;
    // ─────────────────────────────────────────────
    // Chrome / description
    // ─────────────────────────────────────────────

    label?: React.ReactNode;
    sublabel?: React.ReactNode;
    description?: React.ReactNode;
    helpText?: React.ReactNode;

    /**
     * Optional explicit error text to display.
     *
     * This is *visual* error copy. The actual validation state still
     * lives in field.error / schema / onValidate.
     */
    errorText?: React.ReactNode;

    /**
     * Placement hints for label / sublabel / description / helpText / errorText.
     *
     * These are purely layout hints; actual behaviour is implemented
     * by the preset / host component.
     */
    labelPlacement?: LabelPlacement;
    sublabelPlacement?: SublabelPlacement;
    descriptionPlacement?: DescriptionPlacement;
    helpTextPlacement?: HelpTextPlacement;
    errorTextPlacement?: ErrorTextPlacement;
    tagPlacement?: SlotPlacement;

    // ─────────────────────────────────────────────
    // State flags
    // ─────────────────────────────────────────────

    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;

    size?: FieldSize;
    density?: FieldDensity;

    // ─────────────────────────────────────────────
    // Layout hooks
    // ─────────────────────────────────────────────

    inline?: boolean;
    fullWidth?: boolean;

    // ─────────────────────────────────────────────
    // Validation hooks
    // ─────────────────────────────────────────────

    onValidate?(
        value: TValue | undefined,
        field: Field,
        form: CoreContext<Dict>,
    ): ValidateResult;

    /**
     * Per-field change hook at the InputField level.
     *
     * - `value` is what the variant is trying to set.
     * - `detail` comes from the variant (`ChangeDetail`).
     * - If you return `undefined`, the original value is used.
     * - If you return *anything else*, that is what will be stored
     *   in the core (and emitted to the form).
     */
    onChange?(e: {
        value: TValue | undefined;
        preventDefault(): void;
        event?: React.SyntheticEvent;
        readonly isDefaultPrevented?: boolean;
        readonly detail: ChangeDetail;
    }): void;
}

export type Events<TRaw, TValue, TMeta> = {
    onValidate?(
        value: TValue | undefined,
        field: Field,
        form: CoreContext<Dict>,
    ): ValidateResult;

    /**
     * Per-field change hook at the InputField level.
     *
     * - `value` is what the variant is trying to set.
     * - `detail` comes from the variant (`ChangeDetail`).
     * - If you return `undefined`, the original value is used.
     * - If you return *anything else*, that is what will be stored
     *   in the core (and emitted to the form).
     */
    onChange?(e: {
        value: TValue | undefined;
        preventDefault(): void;
        event?: React.SyntheticEvent;
        readonly isDefaultPrevented?: boolean;
        readonly detail: ChangeDetail<TMeta, TRaw>;
    }): void;
};

/**
 * Public props for <InputField />.
 *
 * - `variant` selects the variant module.
 * - All variant-specific props are merged directly into the field props
 *   via `VariantPropsFor<K>`.
 *
 * NOTE: this is a type alias (not an interface) so we can safely intersect
 * unions coming from VariantPropsFor<K> / VariantValueFor<K>.
 */
export type InputFieldProps<
    K extends VariantKey = VariantKey,
    H = unknown,
> = InputFieldBaseProps<VariantValueFor<K, H>> &
    VariantPropsFor<K, H> &
    InputFieldClassNameProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> & {
        variant: K;

        /**
         * @deprecated Use the specific *ClassName props instead
         * (className, labelClassName, errorClassName, etc.).
         */
        classes?: Partial<InputFieldClassNames>;
        defaultValue?: any;
    };

export interface InputFieldClassNameProps {
    /** Root comes from `className` on HTMLDivElement */
    labelRowClassName?: string;
    inlineRowClassName?: string;
    labelClassName?: string;
    sublabelClassName?: string;
    descriptionClassName?: string;
    helpTextClassName?: string;
    errorClassName?: string;
    groupClassName?: string;
    contentClassName?: string;
    variantClassName?: string;
    inlineInputColumnClassName?: string;
    inlineLabelColumnClassName?: string;
    requiredClassName?: string;
    tagClassName?: string;
}

export interface InputFieldClassNames {
    root?: string;
    labelRow?: string;
    inlineRow?: string;
    label?: string;
    sublabel?: string;
    description?: string;
    helpText?: string;
    error?: string;
    group?: string;
    content?: string;
    variant?: string;
    inlineInputColumn?: string;
    inlineLabelColumn?: string;
    required?: string;
    tag?: string;
}

export interface FieldTag {
    label: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    color?: string; // text color
    bgColor?: string; // background color
    onClick?: React.MouseEventHandler<HTMLSpanElement>;
}
