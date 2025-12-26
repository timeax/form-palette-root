// src/input/input-field.tsx
// noinspection JSUnusedLocalSymbols,SpellCheckingInspection,DuplicatedCode

import * as React from "react";

import type {
    InputFieldClassNameProps,
    InputFieldClassNames,
    InputFieldProps,
} from "@/input/input-props";
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
import { buildLayoutGraph, type HelperSlot } from "@/input/input-layout-graph";
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
    variantResolve?: (ctx: LayoutResolveContext) => FieldLayoutConfig,
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
    classes: any,
): React.ReactNode {
    const placement: SlotPlacement = slot.placement;

    switch (slot.id) {
        case "sublabel":
            return (
                <FieldDescription
                    key={`sublabel-${placement}-${root}`}
                    className={cn(
                        "text-xs text-muted-foreground",
                        classes?.sublabel,
                    )}
                    data-slot={`sublabel-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "description":
            return (
                <FieldDescription
                    key={`description-${placement}-${root}`}
                    className={cn(
                        "text-xs text-muted-foreground",
                        classes?.description,
                    )}
                    data-slot={`description-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "helpText":
            return (
                <FieldDescription
                    key={`helpText-${placement}-${root}`}
                    className={cn(
                        "text-xs text-muted-foreground",
                        classes?.helpText,
                    )}
                    data-slot={`helptext-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "errorText":
            return (
                <FieldError
                    key={`error-${placement}-${root}`}
                    className={cn("text-xs text-destructive", classes?.error)}
                    data-slot={`error-${placement}`}
                >
                    {slot.content}
                </FieldError>
            );

        case "tags":
            return (
                <div
                    key={`tags-${placement}-${root}`}
                    className={cn("flex items-center gap-1", classes?.tags)}
                    data-slot={`tags-${placement}`}
                >
                    {slot.content}
                </div>
            );

        default:
            return null;
    }
}

export function getClasses(
    props: InputFieldClassNameProps & {
        className?: string;
        classes?: Partial<InputFieldClassNames>;
    },
): InputFieldClassNames {
    const legacy = props.classes ?? {};

    return {
        root: cn(legacy.root, props.className) || undefined,

        labelRow: cn(legacy.labelRow, props.labelRowClassName) || undefined,
        inlineRow: cn(legacy.inlineRow, props.inlineRowClassName) || undefined,

        label: cn(legacy.label, props.labelClassName) || undefined,
        sublabel: cn(legacy.sublabel, props.sublabelClassName) || undefined,
        description:
            cn(legacy.description, props.descriptionClassName) || undefined,
        helpText: cn(legacy.helpText, props.helpTextClassName) || undefined,
        error: cn(legacy.error, props.errorClassName) || undefined,

        group: cn(legacy.group, props.groupClassName) || undefined,
        content: cn(legacy.content, props.contentClassName) || undefined,
        variant: cn(legacy.variant, props.variantClassName) || undefined,

        inlineInputColumn:
            cn(legacy.inlineInputColumn, props.inlineInputColumnClassName) ||
            undefined,
        inlineLabelColumn:
            cn(legacy.inlineLabelColumn, props.inlineLabelColumnClassName) ||
            undefined,

        required: cn(legacy.required, props.requiredClassName) || undefined,
        tag: cn(legacy.tag, props.tagClassName) || undefined,
    };
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
    props: InputFieldProps<K>,
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
        autoOff,

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
        classes: _depreciated,

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
                    variant,
                )}" is not registered.`,
            );
        }
        return null;
    }

    const classes = getClasses(props);

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
            module.resolveLayout as any,
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
        (
            value: TValue | undefined,
            field: any,
            form: any,
            _report: boolean,
        ): boolean | string => {
            const messages: string[] = [];

            if (module.validate) {
                const res = module.validate(value, {
                    required: !!required,
                    props: props as any,
                    field: field as any,
                    form: form as any,
                });
                messages.push(...normalizeValidateResult(res));
            }

            if (onValidate) {
                const res = onValidate(value as any, field as any, form as any);
                messages.push(...normalizeValidateResult(res));
            }

            if (!messages.length) return true;
            return messages[0] ?? "Invalid value.";
        },
        [module, required, onValidate, props],
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
                    event: detail?.nativeEvent as
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
        [onChange, setValue, variant],
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

    const rootClassName = cn(
        "gap-1",
        contain && !inline && "rounded-xl border border-border bg-background",
        classes?.root,
        className,
    );

    // Variant-level className merge (host + classes.variant)
    const hostVariantClass = (rest as any).className as string | undefined;

    const mergedVariantClass =
        cn(
            // In compact inline mode, force the control to size to its content
            isCompactInline && "inline-flex w-auto",
            hostVariantClass,
            classes?.variant,
        ) || undefined;

    // Build tags content cluster (individual pills)
    const tagsContent = React.useMemo(() => {
        const items = (tags ?? []) as any[];

        if (!items.length) return null;

        return (
            <>
                {items.map((tag, index) => (
                    <span
                        key={index}
                        className={cn(
                            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                            tag.className,
                            classes?.tag,
                        )}
                        style={{
                            color: tag.color,
                            backgroundColor: tag.bgColor,
                        }}
                    >
                        {tag.icon && (
                            <span className="shrink-0">{tag.icon}</span>
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
        [layout, sublabel, description, helpText, visualError, tagsContent],
    );

    // Detect whether there are any label-root slots so we don't render empty rows/spacing
    const hasLabelSlotsAt = (placement: SlotPlacement): boolean => {
        let found = false;

        graph.getSlotsFor("label", placement).render((slots: HelperSlot[]) => {
            if (slots.length > 0) {
                found = true;
            }
            return null;
        });

        return found;
    };

    const hasLabelLeftSlots = hasLabelSlotsAt("left");
    const hasLabelRightSlots = hasLabelSlotsAt("right");
    const hasLabelAboveSlots = hasLabelSlotsAt("above");
    const hasLabelBelowSlots = hasLabelSlotsAt("below");

    // Any content that belongs to the label *block* at all
    const hasAnyLabelBlockContent =
        !!label ||
        hasLabelLeftSlots ||
        hasLabelRightSlots ||
        hasLabelAboveSlots ||
        hasLabelBelowSlots;

    // Content that specifically lives inside the label "row"
    const hasLabelRowContent =
        !!label || hasLabelLeftSlots || hasLabelRightSlots;

    // ─────────────────────────────────────────────────────
    // INLINE LAYOUT
    // ─────────────────────────────────────────────────────

    // In inline mode, label can effectively be left / right / hidden.
    const inlineLabelSide: "left" | "right" | "hidden" =
        lp === "right" ? "right" : lp === "hidden" ? "hidden" : "left";

    // Width semantics for inline:
    // - compact inline (fullWidth === false) → input column is content-sized
    // - normal inline                     → input grows, label minimal
    const inlineInputColClass = cn(
        "flex flex-col",
        isCompactInline ? "flex-none" : "flex-1 min-w-0",
        classes?.inlineInputColumn,
    );

    const inlineLabelColClass = cn(
        isCompactInline ? "flex-1 min-w-0" : "min-w-0",
        classes?.inlineLabelColumn,
    );

    const inlineFieldGroupClass = isCompactInline
        ? cn(
              // compact, content-sized group
              "inline-flex w-auto",
              // kill the Shadcn container on this group in compact-inline mode
              "[container-type:normal]",
              "[container-name:none]",
              classes?.group,
          )
        : (classes?.group ?? undefined);

    const inlineFieldContentClass = isCompactInline
        ? cn("flex-none w-auto", classes?.content)
        : cn("w-full", classes?.content);

    const inlineInputColumn = (
        <div className={inlineInputColClass}>
            {/* Above input (input root) */}
            {graph
                .getSlotsFor("input", "above")
                .render((slots) =>
                    slots.map((slot) =>
                        renderHelperSlot("input", slot, classes),
                    ),
                )}

            <FieldGroup className={inlineFieldGroupClass}>
                <FieldContent className={inlineFieldContentClass}>
                    <Variant
                        {...(rest as any)}
                        name={autoOff ? undefined : name}
                        id={key}
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
                        renderHelperSlot("input", slot, classes),
                    ),
                )}
        </div>
    );

    const inlineLabelColumn =
        inlineLabelSide === "hidden" || !hasAnyLabelBlockContent ? null : (
            <div className={cn("flex flex-col gap-0", inlineLabelColClass)}>
                {/* Above label (label root) */}
                {graph
                    .getSlotsFor("label", "above")
                    .render((slots) =>
                        slots.map((slot) =>
                            renderHelperSlot("label", slot, classes),
                        ),
                    )}

                {hasLabelRowContent && (
                    <div
                        className={cn(
                            "flex items-baseline justify-between gap-1",
                            classes?.labelRow,
                        )}
                        data-slot="label-row"
                    >
                        {/* Left-of-label helpers (label root) */}
                        {graph.getSlotsFor("label", "left").render((slots) => (
                            <div className="flex items-baseline gap-1">
                                {slots.map((slot) =>
                                    renderHelperSlot("label", slot, classes),
                                )}
                            </div>
                        ))}

                        {label && (
                            <FieldLabel
                                htmlFor={key}
                                className={cn(
                                    "text-sm font-medium text-foreground",
                                    classes?.label,
                                )}
                            >
                                <FieldTitle>
                                    {label}{" "}
                                    {required ? (
                                        <span
                                            className={cn(
                                                "text-destructive",
                                                classes?.required,
                                            )}
                                        >
                                            *
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </FieldTitle>
                            </FieldLabel>
                        )}

                        {/* Right-of-label helpers (label root) */}
                        {graph.getSlotsFor("label", "right").render((slots) => (
                            <div className="flex items-baseline gap-1">
                                {slots.map((slot) =>
                                    renderHelperSlot("label", slot, classes),
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Below label (label root) */}
                {graph
                    .getSlotsFor("label", "below")
                    .render((slots) =>
                        slots.map((slot) =>
                            renderHelperSlot("label", slot, classes),
                        ),
                    )}
            </div>
        );

    const inlineRowClassName = cn(
        "flex gap-2",
        hasLabelAboveSlots || hasLabelBelowSlots
            ? "items-start"
            : "items-center",
        classes?.inlineRow,
    );

    // ─────────────────────────────────────────────────────
    // STACKED LAYOUT
    // ─────────────────────────────────────────────────────

    const hasStackedLabelBlock = lp !== "hidden" && hasAnyLabelBlockContent;

    const stackedGroupClassName = cn(
        hasStackedLabelBlock && hasLabelRowContent && "mt-0.5",
        classes?.group,
    );

    const Element = contain ? "div" : React.Fragment;
    const attrs = (a: "l" | "i" = "l") =>
        contain
            ? a === "l"
                ? { className: "p-4 border-b border-input" }
                : { className: "px-4 pt-2 pb-4" }
            : {};

    return (
        <UiField
            className={rootClassName}
            ref={ref as any}
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
                <div className={inlineRowClassName} data-slot="inline-row">
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
                    {hasStackedLabelBlock && (
                        <Element {...attrs()}>
                            {/* Above label (label root) */}
                            {graph
                                .getSlotsFor("label", "above")
                                .render((slots) =>
                                    slots.map((slot) =>
                                        renderHelperSlot(
                                            "label",
                                            slot,
                                            classes,
                                        ),
                                    ),
                                )}

                            {hasLabelRowContent && (
                                <div
                                    className={cn(
                                        "flex items-baseline justify-between gap-1",
                                        classes?.labelRow,
                                    )}
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
                                                        classes,
                                                    ),
                                                )}
                                            </div>
                                        ))}

                                    {label && (
                                        <FieldLabel
                                            htmlFor={key}
                                            className={cn(
                                                "text-sm font-medium text-foreground",
                                                classes?.label,
                                            )}
                                        >
                                            <FieldTitle>
                                                {label}{" "}
                                                {required ? (
                                                    <span
                                                        className={cn(
                                                            "text-destructive",
                                                            classes?.required,
                                                        )}
                                                    >
                                                        *
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </FieldTitle>
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
                                                        classes,
                                                    ),
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Below label (label root) */}
                            {graph
                                .getSlotsFor("label", "below")
                                .render((slots) =>
                                    slots.map((slot) =>
                                        renderHelperSlot(
                                            "label",
                                            slot,
                                            classes,
                                        ),
                                    ),
                                )}
                        </Element>
                    )}

                    <Element {...attrs("i")}>
                        {/* Above input (input root) */}
                        {graph
                            .getSlotsFor("input", "above")
                            .render((slots) =>
                                slots.map((slot) =>
                                    renderHelperSlot("input", slot, classes),
                                ),
                            )}

                        <FieldGroup className={stackedGroupClassName}>
                            <FieldContent
                                className={cn("w-full", classes?.content)}
                            >
                                <Variant
                                    {...(rest as any)}
                                    name={autoOff ? undefined : name}
                                    id={key}
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
                                    renderHelperSlot("input", slot, classes),
                                ),
                            )}
                    </Element>
                </>
            )}
        </UiField>
    );
}
