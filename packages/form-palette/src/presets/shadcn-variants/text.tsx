// src/presets/ui/shadcn-variants/text.tsx
// noinspection GrazieInspection

import * as React from "react";

import { Input } from "@/presets/ui/input";
import type {
    ChangeDetail,
    ExtraFieldProps,
    VariantBaseProps,
} from "@/variants/shared";
import type { InputMaskChangeEvent } from "../ui/input-mask";

type MaskMode = "raw" | "masked";

/**
 * Mask-related props for the Shadcn text variant.
 *
 * These are forwarded to the underlying <Input>, which in turn wires
 * them into the InputMask implementation.
 */
export interface ShadcnTextMaskProps {
    /**
     * Mask pattern – Primereact style.
     * Example: "99/99/9999", "(999) 999-9999"
     */
    mask?: string;

    /**
     * Per-symbol definitions for slots.
     * Kept for future custom engine; not used by the current
     * react-input-mask implementation.
     */
    maskDefinitions?: Record<string, RegExp>;

    /**
     * Character used to visually represent an empty slot.
     * Default: "_".
     */
    slotChar?: string;

    /**
     * If true, when the value is effectively "empty" (no unmasked chars),
     * we emit an empty string "" instead of a fully-masked placeholder.
     *
     * NOTE: This behaviour is implemented in the variant, not Input,
     * so we preserve your existing semantics.
     */
    autoClear?: boolean;

    /**
     * Whether the *model* value is raw or masked.
     *
     * - "raw" or true   → onValue receives unmasked value
     * - "masked" or false/undefined → onValue receives full masked string
     *
     * NOTE: detail.raw is **always** the masked string.
     */
    unmask?: MaskMode | boolean;

    /**
     * Placeholder for future caret-mode logic when we go back
     * to a custom engine. Currently unused, kept for API compatibility.
     */
    maskInsertMode?: "stream" | "caret";
}

/**
 * Extra UI props for the Shadcn text input (pure HTML-level).
 *
 * These are forwarded straight to the underlying <Input />.
 */
export type ShadcnTextUiProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size"
> & {
    /**
     * Extra classes applied only to the *inner* input element
     * (the actual <input>, not the wrapper box).
     */
    inputClassName?: string;

    /**
     * Fixed prefix rendered as part of the input value, NOT as an icon.
     * E.g. "₦", "ID: ".
     *
     * The underlying <Input> will:
     *  - take the model value (without prefix),
     *  - render prefix + value,
     *  - expose the full visible string in event.target.value.
     */
    prefix?: string;

    /**
     * Fixed suffix rendered as part of the input value, NOT as an icon.
     * E.g. "%", "kg".
     */
    suffix?: string;

    /**
     * If true (default), we strip the prefix from the value
     * before emitting it via `onValue`.
     */
    stripPrefix?: boolean;

    /**
     * If true (default), we strip the suffix from the value
     * before emitting it via `onValue`.
     */
    stripSuffix?: boolean;
} & ShadcnTextMaskProps;

/**
 * Props for the Shadcn-based text variant.
 *
 * This is a *form* wrapper around the base <Input />:
 *  - Handles value ↔ ChangeDetail mapping.
 *  - Delegates all visual concerns (masking, affixes, icons, controls,
 *    size, density) to the Input component.
 */
export type ShadcnTextVariantProps = ExtraFieldProps<
    VariantBaseProps<string | undefined>
> & {
    /**
     * If true and there are controls, the input + controls share one box
     * (borders, radius, focus states).
     *
     * Delegated to the underlying <Input />.
     */
    joinControls?: boolean;

    /**
     * When joinControls is true, whether the box styling extends over controls
     * (true) or controls are visually separate (false).
     */
    extendBoxToControls?: boolean;
} & ShadcnTextUiProps;

export const ShadcnTextVariant = React.forwardRef<
    HTMLInputElement,
    ShadcnTextVariantProps & ShadcnTextUiProps
>(function ShadcnTextVariant(props, forwardedRef) {
    const {
        // form-level props
        value,
        onValue,
        disabled,
        readOnly,
        required,
        error,
        size,
        density,

        // extras from VariantBaseProps / ExtraFieldProps
        leadingIcons,
        trailingIcons,
        icon,
        iconGap,
        leadingIconSpacing,
        trailingIconSpacing,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        px,
        py,
        ps,
        pe,
        pb,

        joinControls = true,
        extendBoxToControls = true,

        // masking
        mask,
        maskDefinitions,
        slotChar,
        autoClear,
        unmask,
        maskInsertMode,

        // affixes
        prefix,
        suffix,
        stripPrefix = true,
        stripSuffix = true,

        // visual props
        inputClassName,
        className,
        style,
        ...rest
    } = props;

    const isMasked = Boolean(mask);

    // ─────────────────────────────────────────────
    // Plain change handler (unmasked <Input />)
    // ─────────────────────────────────────────────

    const handlePlainChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const displayed = e.target.value ?? "";

            let modelValue = displayed;

            // strip prefix if configured
            if (prefix && stripPrefix && modelValue.startsWith(prefix)) {
                modelValue = modelValue.slice(prefix.length);
            }

            // strip suffix if configured
            if (suffix && stripSuffix && modelValue.endsWith(suffix)) {
                modelValue = modelValue.slice(
                    0,
                    modelValue.length - suffix.length
                );
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: displayed, // actual visible value (with affixes)
                nativeEvent: e,
                meta: {
                    prefix,
                    suffix,
                    stripPrefix,
                    stripSuffix,
                    model: modelValue,
                },
            };

            onValue?.(modelValue, detail);
        },
        [onValue, prefix, suffix, stripPrefix, stripSuffix]
    );

    // ─────────────────────────────────────────────
    // Masked change handler (InputMask under <Input />)
    // ─────────────────────────────────────────────

    const handleMaskedChange = React.useCallback(
        (e: InputMaskChangeEvent) => {
            const maskedValue = e.value ?? "";

            // Same heuristic as your original variant:
            // "Unmasked" = characters that would normally be accepted by masks.
            const unmaskedInner =
                maskedValue.match(/[0-9A-Za-z]/g)?.join("") ?? "";

            const mode: MaskMode =
                unmask === true || unmask === "raw" ? "raw" : "masked";

            // IMPORTANT: detail.raw is ALWAYS the masked value.
            const detail: ChangeDetail = {
                source: "variant",
                raw: maskedValue,
                nativeEvent: e.originalEvent as any,
                meta: {
                    masked: maskedValue,
                    unmasked: unmaskedInner,
                    mode,
                    prefix,
                    suffix,
                },
            };

            let emitValue = mode === "raw" ? unmaskedInner : maskedValue;

            // autoClear: if nothing "real" was typed, treat as empty.
            if (autoClear && unmaskedInner.length === 0) {
                emitValue = "";
            }

            onValue?.(emitValue, detail);
        },
        [onValue, unmask, autoClear, prefix, suffix]
    );

    // Variant-level "model" is always the raw value you store.
    // The underlying <Input> is responsible for visually applying prefix/suffix
    // or mask literals on top of this model.
    const modelValue = value ?? "";

    return (
        <Input
            ref={forwardedRef}
            // visual & sizing
            className={className}
            style={style}
            size={size as any}
            density={density as any}
            inputClassName={inputClassName}
            // flags
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={error ? "true" : undefined}
            // masking
            mask={mask}
            maskDefinitions={maskDefinitions}
            slotChar={slotChar}
            autoClear={autoClear}
            unmask={unmask}
            maskInsertMode={maskInsertMode}
            // affixes (value-level, not icons)
            prefix={prefix}
            suffix={suffix}
            stripPrefix={stripPrefix}
            stripSuffix={stripSuffix}
            // icons & controls
            leadingIcons={leadingIcons}
            trailingIcons={trailingIcons}
            icon={icon}
            iconGap={iconGap}
            leadingIconSpacing={leadingIconSpacing}
            trailingIconSpacing={trailingIconSpacing}
            leadingControl={leadingControl}
            trailingControl={trailingControl}
            leadingControlClassName={leadingControlClassName}
            trailingControlClassName={trailingControlClassName}
            joinControls={joinControls}
            extendBoxToControls={extendBoxToControls}
            px={px}
            py={py}
            ps={ps}
            pe={pe}
            pb={pb}
            // value & event mapping
            value={modelValue}
            onChange={
                isMasked
                    ? (handleMaskedChange as any)
                    : (handlePlainChange as any)
            }
            {...rest}
        />
    );
});

ShadcnTextVariant.displayName = "ShadcnTextVariant";

export default ShadcnTextVariant;