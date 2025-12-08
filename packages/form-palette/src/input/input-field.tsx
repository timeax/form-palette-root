// src/input/input-field.tsx
// noinspection JSUnusedLocalSymbols,SpellCheckingInspection,DuplicatedCode

import * as React from "react";

import type { InputFieldProps } from "@/input/input-props";
import type {
    FieldLayoutConfig,
    LayoutResolveContext,
    SlotPlacement,
    ValidateResult,
} from "@/schema/input-field";
import type { VariantKey, VariantValueFor } from "@/schema/variant";
import { getVariant } from "@/variants";

import {
    Field as UiField,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/presets/ui/field";
import { ChangeDetail } from "@/variants/shared";
import {
    buildLayoutGraph,
    type HelperSlot,
} from "@/input/input-layout-graph";
import { cn } from "@/lib/utils";
import { useOptionalField } from "@/core";

/**
 * Normalise a ValidateResult into an array of error messages.
 */
function normalizeValidateResult(result: ValidateResult): string[] {
    if (result === undefined || result === null || result === true) return [];
    if (result === false) return ["Invalid value."];
    if (typeof result === "string") return result ? [result] : [];
    if (Array.isArray(result)) return result.filter(Boolean);
    return [];
}

/**
 * Build the layout for this field using:
 * - variant defaults
 * - host overrides
 * - optional variant-level resolveLayout()
 */
function resolveLayoutForField(
    defaults: FieldLayoutConfig | undefined,
    overrides: Partial<FieldLayoutConfig>,
    props: unknown,
    variantResolve?: (ctx: LayoutResolveContext) => FieldLayoutConfig
): FieldLayoutConfig {
    const base: FieldLayoutConfig = defaults ? { ...defaults } : {};

    if (variantResolve) {
        return variantResolve({
            defaults: base,
            overrides,
            props,
        });
    }

    // Fallback: shallow merge defaults + overrides
    return {
        ...base,
        ...overrides,
    };
}

/**
 * Render a single helper slot using the Shadcn field primitives.
 */
function renderHelperSlot(
    root: "label" | "input",
    slot: HelperSlot,
    classes: any
): React.ReactNode {
    const placement: SlotPlacement = slot.placement;

    switch (slot.id) {
        case "sublabel":
            return (
                <FieldDescription
                    key={`sublabel-${placement}-${root}`}
                    className={[
                        "text-xs text-muted-foreground",
                        classes?.sublabel,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    data-slot={`sublabel-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "description":
            return (
                <FieldDescription
                    key={`description-${placement}-${root}`}
                    className={[
                        "text-xs text-muted-foreground",
                        classes?.description,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    data-slot={`description-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "helpText":
            return (
                <FieldDescription
                    key={`helpText-${placement}-${root}`}
                    className={[
                        "text-xs text-muted-foreground",
                        classes?.helpText,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    data-slot={`helptext-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "errorText":
            return (
                <FieldError
                    key={`error-${placement}-${root}`}
                    className={[
                        "text-xs text-destructive",
                        classes?.error,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    data-slot={`error-${placement}`}
                >
                    {slot.content}
                </FieldError>
            );

        case "tags":
            return (
                <div
                    key={`tags-${placement}-${root}`}
                    className={[
                        "flex items-center gap-1",
                        classes?.tags,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    data-slot={`tags-${placement}`}
                >
                    {slot.content}
                </div>
            );

        default:
            return null;
    }
}

/**
 * Public InputField component.
 *
 * - Uses `useField` to register a Field and manage value/error/loading.
 * - Delegates rendering to the chosen variant's `Variant` component.
 * - Uses Shadcn's Field primitives for structure.
 * - Lets variants influence layout via defaults + optional resolveLayout().
 * - Uses a layout graph (buildLayoutGraph) + getSlotsFor().render(...) to
 *   position helpers (sublabel, description, helpText, error, tags) relative to
 *   "label" vs "input" roots without empty wrapper divs.
 */
export function InputField<K extends VariantKey = VariantKey>(
    props: InputFieldProps<K>
) {
    const {
        variant,

        // Field identity / wiring
        name,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        required,
        defaultValue,

        // Chrome
        label,
        sublabel,
        description,
        helpText,
        errorText,

        // Container + tags
        contain,
        tags,
        tagPlacement,

        // Layout overrides
        labelPlacement,
        sublabelPlacement,
        descriptionPlacement,
        helpTextPlacement,
        errorTextPlacement,
        inline,
        fullWidth,
        size,
        density,

        // Validation hook
        onValidate,
        onChange,

        // Field wrapper props
        className,
        style,
        classes,

        // Everything else → forwarded to variant
        ...rest
    } = props as InputFieldProps & {
        className?: string;
        style?: React.CSSProperties;
    };

    const module = getVariant(variant);

    if (!module) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(
                `[form-palette] InputField: variant "${String(
                    variant
                )}" is not registered.`
            );
        }
        return null;
    }

    type TValue = VariantValueFor<K>;

    // Compute layout: defaults + host overrides + optional variant resolver
    const layout = React.useMemo(() => {
        const defaultsLayout = module.defaults?.layout;
        const overrides: Partial<FieldLayoutConfig> = {};

        if (labelPlacement !== undefined) {
            overrides.labelPlacement = labelPlacement;
        }
        if (sublabelPlacement !== undefined) {
            overrides.sublabelPlacement = sublabelPlacement;
        }
        if (descriptionPlacement !== undefined) {
            overrides.descriptionPlacement = descriptionPlacement;
        }
        if (helpTextPlacement !== undefined) {
            overrides.helpTextPlacement = helpTextPlacement;
        }
        if (errorTextPlacement !== undefined) {
            overrides.errorTextPlacement = errorTextPlacement;
        }
        if (tagPlacement !== undefined) {
            overrides.tagPlacement = tagPlacement;
        }
        if (inline !== undefined) {
            overrides.inline = inline;
        }
        if (fullWidth !== undefined) {
            overrides.fullWidth = fullWidth;
        }

        return resolveLayoutForField(
            defaultsLayout,
            overrides,
            props,
            module.resolveLayout as any
        );
    }, [
        module,
        labelPlacement,
        sublabelPlacement,
        descriptionPlacement,
        helpTextPlacement,
        errorTextPlacement,
        tagPlacement,
        inline,
        fullWidth,
        props,
    ]);

    const effectiveSize =
        size ?? module.defaults?.layout?.defaultSize ?? undefined;
    const effectiveDensity =
        density ?? module.defaults?.layout?.defaultDensity ?? undefined;

    /**
     * Validation callback used by the field hook.
     *
     * It combines:
     * - variant-level validation (module.validate)
     * - per-field validation (props.onValidate)
     */
    const validate = React.useCallback(
        (value: TValue | undefined, _report: boolean): boolean | string => {
            const messages: string[] = [];

            if (module.validate) {
                const res = module.validate(value, {
                    required: !!required,
                    props: props as any,
                    field: undefined as any,
                    form: undefined as any,
                });
                messages.push(...normalizeValidateResult(res));
            }

            if (onValidate) {
                const res = onValidate(
                    value as any,
                    undefined as any,
                    undefined as any
                );
                messages.push(...normalizeValidateResult(res));
            }

            if (!messages.length) return true;
            return messages[0] ?? "Invalid value.";
        },
        [module, required, onValidate, props]
    );

    // Hook into the core: register field, track value/error/loading
    const field = useOptionalField<TValue>({
        name,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        required,
        defaultValue: defaultValue as TValue | undefined,
        validate,
    } as any);

    const { value, setValue, error, ref, key } = field;

    const Variant = module.Variant as React.ComponentType<any>;
    const visualError = (errorText ?? error) || "";

    /**
     * Central change handler for this field.
     *
     * Flow:
     *   Variant.onValue(next, detail) →
     *   InputField.handleValueChange →
     *   props.onChange?.({ value, detail, event, preventDefault }) →
     *   (if not prevented) setValue(final)
     */
    const handleValueChange = React.useCallback(
        (next: TValue | undefined, detail?: ChangeDetail) => {
            let finalValue = next;
            let defaultPrevented = false;

            if (onChange) {
                const e = {
                    value: next,
                    preventDefault() {
                        defaultPrevented = true;
                    },
                    get isDefaultPrevented() {
                        return defaultPrevented;
                    },
                    event:
                        detail?.nativeEvent as
                        | React.SyntheticEvent
                        | undefined,
                    detail: detail as ChangeDetail,
                };

                onChange(e);

                // If the handler returns a value, use it instead of `next`.
                finalValue = e.value;
                if (defaultPrevented) {
                    // Host took control and blocked the core update.
                    return;
                }
            }

            // NOTE: Second argument is an optional "source" tag.
            // If your setValue only accepts one arg, drop `String(variant)`.
            (setValue as any)(finalValue, String(variant));
        },
        [onChange, setValue, variant]
    );

    const disabledProp = (rest as any).disabled;
    const readOnlyProp = (rest as any).readOnly;

    // Convenience shorthands for layout
    const lp = layout.labelPlacement;
    const sp = layout.sublabelPlacement;
    const dp = layout.descriptionPlacement;
    const hp = layout.helpTextPlacement;
    const ep = layout.errorTextPlacement;
    const tp = layout.tagPlacement;

    const isInline = !!layout.inline;
    const isCompactInline = isInline && layout.fullWidth === false;

    const rootClassName = [
        "gap-1",
        contain && !inline
            ? "rounded-xl border border-border bg-background"
            : null,
        classes?.root,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    // Variant-level className merge (host + classes.variant)
    const hostVariantClass =
        (rest as any).className as string | undefined;

    const mergedVariantClass =
        ([
            // In compact inline mode, force the control to size to its content
            isCompactInline ? "inline-flex w-auto" : null,
            hostVariantClass,
            classes?.variant,
        ]
            .filter(Boolean)
            .join(" ")) || undefined;

    // Build tags content cluster (individual pills)
    const tagsContent = React.useMemo(() => {
        const items = (tags ?? []) as any[];

        if (!items.length) return null;

        return (
            <>
                {items.map((tag, index) => (
                    <span
                        key={index}
                        className={[
                            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                            tag.className,
                            classes?.tag,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        style={{
                            color: tag.color,
                            backgroundColor: tag.bgColor,
                        }}
                    >
                        {tag.icon && (
                            <span className="shrink-0">
                                {tag.icon}
                            </span>
                        )}
                        <span>{tag.label}</span>
                    </span>
                ))}
            </>
        );
    }, [tags, classes?.tag]);

    // Build helper layout graph for this field
    const graph = React.useMemo(
        () =>
            buildLayoutGraph({
                layout,
                sublabel,
                description,
                helpText,
                errorText: visualError || undefined,
                tags: tagsContent || undefined,
            }),
        [layout, sublabel, description, helpText, visualError, tagsContent]
    );

    // ─────────────────────────────────────────────────────
    // INLINE LAYOUT
    // ─────────────────────────────────────────────────────

    // In inline mode, label can effectively be left / right / hidden.
    const inlineLabelSide: "left" | "right" | "hidden" =
        lp === "right" ? "right" : lp === "hidden" ? "hidden" : "left";

    // Width semantics for inline:
    // - compact inline (fullWidth === false) → input column is content-sized
    // - normal inline                     → input grows, label minimal
    const inlineInputColClass = [
        isCompactInline ? "flex-none" : "flex-1 min-w-0",
        classes?.inlineInputColumn,
    ]
        .filter(Boolean)
        .join(" ");

    const inlineLabelColClass = [
        isCompactInline ? "flex-1 min-w-0" : "min-w-0",
        classes?.inlineLabelColumn,
    ]
        .filter(Boolean)
        .join(" ");

    const inlineFieldGroupClass = isCompactInline
        ? [
            // compact, content-sized group
            "inline-flex w-auto",
            // kill the Shadcn container on this group in compact-inline mode
            "[container-type:normal]",
            "[container-name:none]",
            classes?.group,
        ]
            .filter(Boolean)
            .join(" ")
        : classes?.group ?? undefined;

    const inlineFieldContentClass = isCompactInline
        ? ["flex-none w-auto", classes?.content]
            .filter(Boolean)
            .join(" ")
        : ["w-full", classes?.content].filter(Boolean).join(" ");

    const inlineInputColumn = (
        <div className={inlineInputColClass}>
            {/* Above input (input root) */}
            {graph
                .getSlotsFor("input", "above")
                .render((slots) =>
                    slots.map((slot) =>
                        renderHelperSlot("input", slot, classes)
                    )
                )}

            <FieldGroup className={inlineFieldGroupClass}>
                <FieldContent className={inlineFieldContentClass}>
                    <Variant
                        {...(rest as any)}
                        id={key}
                        ref={ref as any}
                        value={value}
                        onValue={handleValueChange}
                        error={error}
                        required={required}
                        disabled={disabledProp}
                        readOnly={readOnlyProp}
                        size={effectiveSize}
                        density={effectiveDensity}
                        className={mergedVariantClass}
                    />
                </FieldContent>
            </FieldGroup>

            {/* Below input (input root) */}
            {graph
                .getSlotsFor("input", "below")
                .render((slots) =>
                    slots.map((slot) =>
                        renderHelperSlot("input", slot, classes)
                    )
                )}
        </div>
    );

    const inlineLabelColumn =
        inlineLabelSide === "hidden" ? null : (
            <div
                className={["flex flex-col gap-0", inlineLabelColClass]
                    .filter(Boolean)
                    .join(" ")}
            >
                {/* Above label (label root) */}
                {graph
                    .getSlotsFor("label", "above")
                    .render((slots) =>
                        slots.map((slot) =>
                            renderHelperSlot("label", slot, classes)
                        )
                    )}

                <div
                    className={[
                        "flex items-baseline justify-between gap-1",
                        classes?.labelRow,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    data-slot="label-row"
                >
                    {/* Left-of-label helpers (label root) */}
                    {graph
                        .getSlotsFor("label", "left")
                        .render((slots) => (
                            <div className="flex items-baseline gap-1">
                                {slots.map((slot) =>
                                    renderHelperSlot(
                                        "label",
                                        slot,
                                        classes
                                    )
                                )}
                            </div>
                        ))}

                    {label && (
                        <FieldLabel
                            htmlFor={key}
                            className={[
                                "text-sm font-medium text-foreground",
                                classes?.label,
                            ]
                                .filter(Boolean)
                                .join(" ")}
                        >
                            <FieldTitle>{label} {required ? <span className={cn("text-destructive", classes?.required)}>*</span> : ''}</FieldTitle>
                        </FieldLabel>
                    )}

                    {/* Right-of-label helpers (label root) */}
                    {graph
                        .getSlotsFor("label", "right")
                        .render((slots) => (
                            <div className="flex items-baseline gap-1">
                                {slots.map((slot) =>
                                    renderHelperSlot(
                                        "label",
                                        slot,
                                        classes
                                    )
                                )}
                            </div>
                        ))}
                </div>

                {/* Below label (label root) */}
                {graph
                    .getSlotsFor("label", "below")
                    .render((slots) =>
                        slots.map((slot) =>
                            renderHelperSlot("label", slot, classes)
                        )
                    )}
            </div>
        );

    const inlineRowClassName = [
        "flex items-start gap-2",
        classes?.inlineRow,
    ]
        .filter(Boolean)
        .join(" ");

    // ─────────────────────────────────────────────────────
    // STACKED LAYOUT
    // ─────────────────────────────────────────────────────

    const stackedGroupClassName = ["mt-1", classes?.group]
        .filter(Boolean)
        .join(" ");

    const Element = contain ? 'div' : React.Fragment;
    const attrs = (a: 'l' | 'i' = 'l') =>
        contain
            ? a === 'l'
                ? { className: "p-4 border-b border-input" }
                : { className: "px-4 pt-2 pb-4" }
            : {};
    return (
        <UiField
            className={rootClassName}
            style={style}
            data-variant={String(variant)}
            data-label-placement={lp ?? undefined}
            data-sublabel-placement={sp ?? undefined}
            data-description-placement={dp ?? undefined}
            data-helptext-placement={hp ?? undefined}
            data-errortext-placement={ep ?? undefined}
            data-tag-placement={tp ?? undefined}
            data-inline={isInline ? "true" : "false"}
            data-fullwidth={layout.fullWidth ? "true" : "false"}
        >
            {isInline ? (
                // INLINE MODE: label + control on the same row
                <div
                    className={inlineRowClassName}
                    data-slot="inline-row"
                >
                    {inlineLabelSide === "right" ? (
                        <>
                            {inlineInputColumn}
                            {inlineLabelColumn}
                        </>
                    ) : inlineLabelSide === "hidden" ? (
                        <>{inlineInputColumn}</>
                    ) : (
                        <>
                            {inlineLabelColumn}
                            {inlineInputColumn}
                        </>
                    )}
                </div>
            ) : (
                // STACKED MODE
                <>
                    {lp !== "hidden" && (
                        <Element {...attrs()}>
                            {/* Above label (label root) */}
                            {graph
                                .getSlotsFor("label", "above")
                                .render((slots) =>
                                    slots.map((slot) =>
                                        renderHelperSlot(
                                            "label",
                                            slot,
                                            classes
                                        )
                                    )
                                )}

                            <div
                                className={[
                                    "flex items-baseline justify-between gap-1",
                                    classes?.labelRow,
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                                data-slot="label-row"
                            >
                                {/* Left-of-label helpers (label root) */}
                                {graph
                                    .getSlotsFor("label", "left")
                                    .render((slots) => (
                                        <div className="flex items-baseline gap-1">
                                            {slots.map((slot) =>
                                                renderHelperSlot(
                                                    "label",
                                                    slot,
                                                    classes
                                                )
                                            )}
                                        </div>
                                    ))}

                                {label && (
                                    <FieldLabel
                                        htmlFor={key}
                                        className={[
                                            "text-sm font-medium text-foreground",
                                            classes?.label,
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        <FieldTitle>{label} {required ? <span className={cn("text-destructive", classes?.required)}>*</span> : ''}</FieldTitle>
                                    </FieldLabel>
                                )}

                                {/* Right-of-label helpers (label root) */}
                                {graph
                                    .getSlotsFor("label", "right")
                                    .render((slots) => (
                                        <div className="flex items-baseline gap-1">
                                            {slots.map((slot) =>
                                                renderHelperSlot(
                                                    "label",
                                                    slot,
                                                    classes
                                                )
                                            )}
                                        </div>
                                    ))}
                            </div>

                            {/* Below label (label root) */}
                            {graph
                                .getSlotsFor("label", "below")
                                .render((slots) =>
                                    slots.map((slot) =>
                                        renderHelperSlot(
                                            "label",
                                            slot,
                                            classes
                                        )
                                    )
                                )}
                        </Element>
                    )}

                    <Element {...attrs('i')}>
                        {/* Above input (input root) */}
                        {graph
                            .getSlotsFor("input", "above")
                            .render((slots) =>
                                slots.map((slot) =>
                                    renderHelperSlot(
                                        "input",
                                        slot,
                                        classes
                                    )
                                )
                            )}

                        <FieldGroup className={stackedGroupClassName}>
                            <FieldContent
                                className={["w-full", classes?.content]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <Variant
                                    {...(rest as any)}
                                    ref={ref as any}
                                    value={value}
                                    onValue={handleValueChange}
                                    error={error}
                                    required={required}
                                    disabled={disabledProp}
                                    readOnly={readOnlyProp}
                                    size={effectiveSize}
                                    density={effectiveDensity}
                                    className={mergedVariantClass}
                                />
                            </FieldContent>
                        </FieldGroup>

                        {/* Below input (input root) */}
                        {graph
                            .getSlotsFor("input", "below")
                            .render((slots) =>
                                slots.map((slot) =>
                                    renderHelperSlot("input", slot, classes)
                                )
                            )}
                    </Element>
                </>
            )}
        </UiField>
    );
}