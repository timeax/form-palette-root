import * as React from "react";
import { ShadcnTextVariantProps } from "../variants/text";
import { FieldSize } from "@/variants/shared";
import { Input } from "./input";

type InputRef = HTMLInputElement;

export interface InputNumberValueChangeEvent {
    originalEvent: React.SyntheticEvent<any> | null;
    value: number | null;
    stopPropagation(): void;
    preventDefault(): void;
    target: {
        name?: string | null;
        id?: string | null;
        value: number | null;
    };
}

export interface InputNumberProps
    extends
        Omit<ShadcnTextVariantProps, "min" | "max" | "value">,
        Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            | "value"
            | "defaultValue"
            | "onChange"
            | "onInput"
            | "onKeyDown"
            | "onKeyUp"
            | "size"
            | "max"
            | "min"
        > {
    onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): unknown;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): unknown;

    value?: number | null;

    /** Emitted when the numeric value changes (Prime-style). */
    onValueChange?: (e: InputNumberValueChangeEvent) => void;

    /** Optional simple change handler (numeric value). */
    onChange?: (e: {
        originalEvent: React.SyntheticEvent<any>;
        value: number | null;
    }) => void;

    locale?: string;
    localeMatcher?: Intl.NumberFormatOptions["localeMatcher"];

    mode?: "decimal" | "currency";
    currency?: string;
    currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"];

    useGrouping?: boolean;

    minFractionDigits?: number;
    maxFractionDigits?: number;

    roundingMode?: Intl.NumberFormatOptions["roundingMode"];

    min?: number | null;
    max?: number | null;

    step?: number;

    allowEmpty?: boolean;

    /** If false: show raw (no Intl formatting) even when blurred */
    format?: boolean;

    inputId?: string;
    inputClassName?: string;
    inputStyle?: React.CSSProperties;
    inputRef?: React.Ref<InputRef> | null;

    prefix?: string;
    suffix?: string;

    size?: FieldSize;

    invalid?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function clampToLimits(
    n: number,
    min: number | null | undefined,
    max: number | null | undefined,
): number {
    let out = n;
    if (min != null && out < min) out = min;
    if (max != null && out > max) out = max;
    return out;
}

function isFiniteNumber(n: unknown): n is number {
    return typeof n === "number" && Number.isFinite(n);
}

function sanitizeNumberish(value: number | null | undefined): number | null {
    return isFiniteNumber(value) ? value : null;
}

function resolveLocale(explicit?: string) {
    if (explicit) return explicit;
    if (typeof navigator !== "undefined" && navigator.language)
        return navigator.language;
    return "en-US";
}

function getDecimalSeparator(locale: string) {
    const s = new Intl.NumberFormat(locale, { useGrouping: false }).format(1.1);
    // "1.1" -> "."
    const m = s.match(/1(.?)1/);
    return m?.[1] || ".";
}

function stripAffixes(text: string, prefix?: string, suffix?: string) {
    let t = text ?? "";
    if (prefix && t.startsWith(prefix)) t = t.slice(prefix.length);
    if (suffix && t.endsWith(suffix)) t = t.slice(0, -suffix.length);
    return t;
}

function stripGrouping(text: string, locale: string) {
    const group = new Intl.NumberFormat(locale, { useGrouping: true })
        .format(1000000)
        .replace(/[0-9]/g, "")
        .trim()
        .charAt(0);

    if (!group) return text;
    // Escape special regex chars
    const re = new RegExp(`\\${group}`, "g");
    return text.replace(re, "");
}

/**
 * Convert an "editable string" to a number:
 * - accepts "-", "", "12.", "12.0"
 * - uses locale decimal separator
 */
function parseEditable(
    editable: string,
    locale: string,
    decimalSep: string,
): number | null {
    const t = editable.trim();
    if (!t || t === "-" || t === decimalSep) return null;

    // remove grouping if any sneaks in
    const noGroup = stripGrouping(t, locale);

    // normalize decimal sep to "."
    const normalized =
        decimalSep === "." ? noGroup : noGroup.replace(decimalSep, ".");

    // allow trailing dot: "12." -> 12
    const cleaned = normalized.endsWith(".")
        ? normalized.slice(0, -1)
        : normalized;

    if (!cleaned || cleaned === "-") return null;

    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
}

function formatDisplayNumber(
    n: number,
    locale: string,
    opts: Intl.NumberFormatOptions,
    prefix?: string,
    suffix?: string,
) {
    if (!isFiniteNumber(n)) return "";
    const f = new Intl.NumberFormat(locale, opts).format(n);
    return `${prefix ?? ""}${f}${suffix ?? ""}`;
}

/**
 * Enforce maxFractionDigits with a "replace when full" policy.
 * If caret is inside fraction and fraction is already full, replace instead of pushing.
 */
function applyFractionLimitReplace(
    next: string,
    prev: string,
    locale: string,
    decimalSep: string,
    maxFractionDigits: number | undefined,
    inputEl: HTMLInputElement,
) {
    if (maxFractionDigits == null)
        return { text: next, caret: inputEl.selectionStart ?? next.length };

    const selStart = inputEl.selectionStart ?? 0;
    const selEnd = inputEl.selectionEnd ?? selStart;

    // Identify decimal position in next
    const decIndex = next.indexOf(decimalSep);
    if (decIndex === -1) return { text: next, caret: selStart };

    const frac = next.slice(decIndex + 1);
    if (frac.length <= maxFractionDigits)
        return { text: next, caret: selStart };

    // We exceeded limit. If selection replaces text, just trim.
    if (selEnd > selStart) {
        const trimmed = next.slice(0, decIndex + 1 + maxFractionDigits);
        const caret = Math.min(selStart, trimmed.length);
        return { text: trimmed, caret };
    }

    // No selection: replace behavior.
    // If caret is in fraction region, replace the digit at caret-1 (the newly inserted char position) if possible.
    const caret = selStart;
    const fracStart = decIndex + 1;
    const fracEnd = fracStart + maxFractionDigits;

    // Keep only allowed fraction length, but try to preserve the "typed digit"
    // Strategy: trim to max, but if caret is beyond allowed, clamp caret.
    const trimmed = next.slice(0, fracEnd);

    const clampedCaret = Math.min(caret, trimmed.length);

    return { text: trimmed, caret: clampedCaret };
}

function normalizeEditable(
    raw: string,
    locale: string,
    decimalSep: string,
    allowMinus: boolean,
) {
    let t = raw;

    // strip grouping always in edit mode
    t = stripGrouping(t, locale);

    // allow only digits, decimalSep, and "-"
    const allowed = new RegExp(`[^0-9\\${decimalSep}\\-]`, "g");
    t = t.replace(allowed, "");

    // handle multiple minus signs
    const minusCount = (t.match(/\-/g) || []).length;
    if (minusCount) {
        t = t.replace(/\-/g, "");
        if (allowMinus) t = "-" + t;
    }

    // allow only one decimal separator
    const firstDec = t.indexOf(decimalSep);
    if (firstDec !== -1) {
        const before = t.slice(0, firstDec + 1);
        const after = t
            .slice(firstDec + 1)
            .replace(new RegExp(`\\${decimalSep}`, "g"), "");
        t = before + after;
    }

    // avoid "-." -> "-0."
    if (t === "-" + decimalSep) t = "-0" + decimalSep;
    if (t === decimalSep) t = "0" + decimalSep;

    return t;
}

export const InputNumber = React.memo(
    React.forwardRef<InputRef, InputNumberProps>((inProps, ref) => {
        const props: InputNumberProps = {
            allowEmpty: true,
            autoFocus: false,
            format: true,
            locale: undefined,
            localeMatcher: undefined,
            mode: "decimal",
            useGrouping: true,
            step: 1,
            roundingMode: undefined,
            type: "text",
            ...inProps,
        };

        const locale = React.useMemo(
            () => resolveLocale(props.locale),
            [props.locale],
        );
        const decimalSep = React.useMemo(
            () => getDecimalSeparator(locale),
            [locale],
        );

        const allowMinus = React.useMemo(
            () => props.min == null || props.min < 0,
            [props.min],
        );

        const fmtOptions = React.useMemo<Intl.NumberFormatOptions>(() => {
            return {
                localeMatcher: props.localeMatcher,
                style: props.mode,
                currency: props.currency,
                currencyDisplay: props.currencyDisplay,
                useGrouping: props.useGrouping,
                minimumFractionDigits:
                    props.minFractionDigits !== undefined
                        ? props.minFractionDigits
                        : undefined,
                maximumFractionDigits:
                    props.maxFractionDigits !== undefined
                        ? props.maxFractionDigits
                        : undefined,
                roundingMode: props.roundingMode,
            };
        }, [
            props.localeMatcher,
            props.mode,
            props.currency,
            props.currencyDisplay,
            props.useGrouping,
            props.minFractionDigits,
            props.maxFractionDigits,
            props.roundingMode,
        ]);

        const inputRef = React.useRef<InputRef | null>(null);
        React.useImperativeHandle(ref, () => inputRef.current as InputRef);

        // display string is the single source of truth for what the user sees
        const [display, setDisplay] = React.useState<string>("");

        // track focus to choose between edit-mode display and formatted display
        const [focused, setFocused] = React.useState(false);

        // When focused we keep an "editable" view (no grouping, no prefix/suffix)
        const toEditableFromNumber = React.useCallback(
            (n: number) => {
                // keep decimal separator for locale in edit mode
                // we DO NOT pad here; padding happens on blur formatting
                const s = String(n);
                return decimalSep === "." ? s : s.replace(".", decimalSep);
            },
            [decimalSep],
        );

        const clampModel = React.useCallback(
            (n: number) => clampToLimits(n, props.min, props.max),
            [props.min, props.max],
        );

        const emit = React.useCallback(
            (event: React.SyntheticEvent<any> | null, value: number | null) => {
                const safeValue = sanitizeNumberish(value);

                props.onValueChange?.({
                    originalEvent: event,
                    value: safeValue,
                    stopPropagation() {
                        event?.stopPropagation();
                    },
                    preventDefault() {
                        event?.preventDefault();
                    },
                    target: {
                        name: props.name ?? null,
                        id: props.id ?? null,
                        value: safeValue,
                    },
                });

                if (props.onChange && event) {
                    props.onChange({ originalEvent: event, value: safeValue });
                }
            },
            [props],
        );

        const setCaret = (pos: number) => {
            const el = inputRef.current;
            if (!el) return;
            // next tick to ensure value applied
            queueMicrotask(() => {
                try {
                    el.setSelectionRange(pos, pos);
                } catch {}
            });
        };

        const formatFromModel = React.useCallback(
            (n: number | null) => {
                const safeNumber = sanitizeNumberish(n);
                if (safeNumber == null) return "";
                if (!props.format) return toEditableFromNumber(safeNumber);

                const formatted = formatDisplayNumber(
                    safeNumber,
                    locale,
                    fmtOptions,
                    props.prefix,
                    props.suffix,
                );
                return formatted;
            },
            [
                props.format,
                props.prefix,
                props.suffix,
                locale,
                fmtOptions,
                toEditableFromNumber,
            ],
        );

        const getModelFromDisplay = React.useCallback(
            (text: string) => {
                const stripped = stripAffixes(text, props.prefix, props.suffix);
                const withoutGroup = stripGrouping(stripped, locale);
                // Accept both "." and locale decimal while parsing (people may type ".")
                const candidate =
                    decimalSep !== "."
                        ? withoutGroup.replace(".", decimalSep)
                        : withoutGroup;

                const n = parseEditable(candidate, locale, decimalSep);
                if (n == null) return null;

                const clamped = clampModel(n);
                return clamped;
            },
            [props.prefix, props.suffix, locale, decimalSep, clampModel],
        );

        const syncFromPropsValue = React.useCallback(
            (v: number | null | undefined) => {
                const safeValue = sanitizeNumberish(v);
                if (safeValue == null) {
                    setDisplay("");
                    return;
                }
                const clamped = clampModel(safeValue);
                setDisplay(
                    focused
                        ? toEditableFromNumber(clamped)
                        : formatFromModel(clamped),
                );
            },
            [clampModel, focused, toEditableFromNumber, formatFromModel],
        );

        // initial
        React.useEffect(() => {
            syncFromPropsValue(props.value ?? null);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        // controlled updates
        React.useEffect(() => {
            // if parent updates while focused, we DO NOT stomp the user's raw typing
            if (focused) return;
            syncFromPropsValue(props.value ?? null);
        }, [props.value, focused, syncFromPropsValue]);

        const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setFocused(true);
            props.onFocus?.(e);

            const model = isFiniteNumber(props.value)
                ? clampModel(props.value)
                : getModelFromDisplay(display);

            const editable =
                model == null
                    ? stripAffixes(display, props.prefix, props.suffix)
                    : toEditableFromNumber(model);
            const normalized = normalizeEditable(
                editable,
                locale,
                decimalSep,
                allowMinus,
            );

            setDisplay(normalized);

            // Prime-like: put caret at end in edit mode
            queueMicrotask(() => {
                setCaret((inputRef.current?.value ?? "").length);
            });
        };

        const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setFocused(false);

            const el = e.currentTarget;
            const raw = stripAffixes(el.value, props.prefix, props.suffix);
            const normalized = normalizeEditable(
                raw,
                locale,
                decimalSep,
                allowMinus,
            );

            const parsed = parseEditable(normalized, locale, decimalSep);
            let model: number | null =
                parsed == null ? null : clampModel(parsed);

            if (model == null && props.allowEmpty === false) {
                const fallback = props.min ?? 0;
                model = clampModel(fallback);
            }

            // format display on blur and KEEP it
            setDisplay(formatFromModel(model));

            // emit (Prime does emit on blur if value changed — you can rely on this)
            emit(e, model);

            props.onBlur?.(e);
        };

        const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (props.disabled || props.readOnly) return;

            const el = e.currentTarget;

            // caret before normalization
            const caretBefore = el.selectionStart ?? el.value.length;

            // strip prefix/suffix if user somehow includes them
            const stripped = stripAffixes(el.value, props.prefix, props.suffix);

            // normalize into editable form
            let next = normalizeEditable(
                stripped,
                locale,
                decimalSep,
                allowMinus,
            );

            // Enforce fraction limit with "replace when full" behavior
            const fracLimit = props.maxFractionDigits;
            if (fracLimit != null) {
                const applied = applyFractionLimitReplace(
                    next,
                    display,
                    locale,
                    decimalSep,
                    fracLimit,
                    el,
                );
                next = applied.text;
                // after setDisplay we restore caret
                setDisplay(next);
                setCaret(applied.caret);
            } else {
                setDisplay(next);
                setCaret(caretBefore);
            }

            // emit numeric model (clamped)
            const parsed = parseEditable(next, locale, decimalSep);
            const model = parsed == null ? null : clampModel(parsed);

            // enforce allowEmpty
            const finalModel =
                model == null && props.allowEmpty === false
                    ? clampModel(props.min ?? 0)
                    : model;

            emit(e, finalModel);
        };

        // Better inputMode defaults
        const inputMode =
            props.inputMode ||
            (props.mode === "decimal" &&
            props.maxFractionDigits == null &&
            props.minFractionDigits == null
                ? "numeric"
                : "decimal");

        const inputClassName = [
            props.inputClassName,
            props.invalid ? "p-invalid" : undefined,
        ]
            .filter(Boolean)
            .join(" ");

        const {
            inputId,
            inputStyle,
            leadingControl,
            trailingControl,
            leadingControlClassName,
            trailingControlClassName,
            value,
            icon,
            iconGap,
            // Destructure to prevent leakage:
            locale: _locale,
            localeMatcher,
            mode,
            currency,
            currencyDisplay,
            useGrouping,
            minFractionDigits,
            maxFractionDigits,
            roundingMode,
            min,
            max,
            step,
            allowEmpty,
            format,
            invalid,
            onValueChange,
            onChange,
            onValue,
            ...passThroughProps
        } = props;

        return (
            //@ts-ignore
            <Input
                ref={(node) => {
                    inputRef.current = node;
                    if (typeof props.inputRef === "function")
                        props.inputRef(node);
                    else if (
                        props.inputRef &&
                        typeof props.inputRef === "object"
                    ) {
                        (
                            props.inputRef as React.MutableRefObject<InputRef | null>
                        ).current = node;
                    }
                }}
                {...passThroughProps}
                id={inputId ?? props.id}
                style={inputStyle ?? props.style}
                role="spinbutton"
                className={inputClassName || props.className}
                type={props.type ?? "text"}
                inputMode={inputMode}
                value={display}
                onFocus={onFocus}
                onBlur={onBlur}
                onChange={onChangeText}
                leadingControl={leadingControl}
                trailingControl={trailingControl}
                leadingControlClassName={leadingControlClassName}
                trailingControlClassName={trailingControlClassName}
                icon={icon}
                iconGap={iconGap}
            />
        );
    }),
);

InputNumber.displayName = "InputNumber";
