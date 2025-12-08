// src/presets/ui/input.tsx
// @ts-nocheck

import * as React from "react";
import { cn } from "@/lib/utils";
import { InputMask } from "../ui/input-mask";

type MaskMode = "raw" | "masked";

// Mask-related props (UI-level only; value semantics are up to callers)
export interface InputMaskProps {
    mask?: string;
    maskDefinitions?: Record<string, RegExp>; // reserved for future engine
    slotChar?: string;
    autoClear?: boolean;
    unmask?: MaskMode | boolean;
    maskInsertMode?: "stream" | "caret";
}

// Prefix / suffix (value-level, NOT icons)
export interface InputAffixProps {
    prefix?: string;
    suffix?: string;

    /**
     * If true (default), we assume the model value does NOT contain the prefix
     * and we only add it visually at render time.
     */
    stripPrefix?: boolean;

    /**
     * If true (default), we assume the model value does NOT contain the suffix
     * and we only add it visually at render time.
     */
    stripSuffix?: boolean;
}

// Icons & controls (pure overlays, like in ShadcnTextVariant)
export interface InputIconControlProps {
    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;

    iconGap?: number;
    leadingIconSpacing?: number;
    trailingIconSpacing?: number;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;

    joinControls?: boolean;
    extendBoxToControls?: boolean;

    px?: number;
    py?: number;
    ps?: number;
    pe?: number;
    pb?: number;

    inputClassName?: string;
}

export interface InputSizeProps {
    size?: "sm" | "md" | "lg" | (string & {});
    density?: "compact" | "normal" | "relaxed" | "dense" | "loose" | (string & {});
}

// ─────────────────────────────────────────────
// KeyFilter support (PrimeReact-style)
// ─────────────────────────────────────────────

export type InputKeyFilter =
    | string
    | RegExp
    | ((
        nextValue: string,
        ctx: {
            event: any;
            currentValue: string;
            input: HTMLInputElement;
        }
    ) => boolean);

export interface InputKeyFilterProps {
    /**
     * Filter that constrains what can be typed / pasted.
     *
     * - string preset: "int" | "num" | "money" | "hex" | "alpha" | "alphanum" | "email"
     * - string pattern: converted to new RegExp(pattern)
     * - RegExp: used directly
     * - function: custom validator
     */
    keyFilter?: InputKeyFilter;

    /**
     * Which keyboard event to hook for filtering:
     * - "keydown"
     * - "keypress" (closest to PrimeReact default)
     * - "beforeinput"
     *
     * Default: "keypress"
     */
    keyFilterOn?: "keydown" | "keypress" | "beforeinput";

    /**
     * Whether to apply keyFilter to paste events.
     * Default: true
     */
    keyFilterOnPaste?: boolean;
}

function cx(...parts: any[]) {
    return cn(...parts);
}

function resolveKeyFilterPattern(filter: string | RegExp | undefined): RegExp | null {
    if (!filter) return null;

    if (filter instanceof RegExp) {
        // remove stateful flags for safety
        const flags = filter.flags.replace("g", "").replace("y", "");
        return new RegExp(filter.source, flags);
    }

    const presets: Record<string, RegExp> = {
        int: /^[+-]?\d*$/,
        num: /^-?\d*(\.\d*)?$/,
        money: /^-?\d*(\.\d{0,2})?$/,
        hex: /^[0-9a-f]*$/i,
        alpha: /^[A-Za-z]*$/,
        alphanum: /^[A-Za-z0-9]*$/,
        email: /^[^\s@]*@?[^\s@]*$/, // lenient while typing
    };

    const preset = presets[filter];
    if (preset) return preset;

    try {
        return new RegExp(filter);
    } catch {
        return null;
    }
}

function runKeyFilter(
    filter: InputKeyFilter | undefined,
    nextValue: string,
    input: HTMLInputElement,
    event: any
): boolean {
    if (!filter) return true;
    // Always allow empty so users can clear the field
    if (nextValue === "") return true;

    if (typeof filter === "function") {
        return filter(nextValue, {
            event,
            currentValue: input.value,
            input,
        });
    }

    const pattern = resolveKeyFilterPattern(filter as any);
    if (!pattern) return true;
    return pattern.test(nextValue);
}

function computeNextFromInsertion(
    input: HTMLInputElement,
    inserted: string
): string {
    const value = input.value ?? "";
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? start;
    return value.slice(0, start) + inserted + value.slice(end);
}

// Same logic as in ShadcnTextVariant
function resolveBasePadding(size: unknown, density: unknown) {
    let px = 12;
    let py = 4;

    const s = (size as string | undefined) ?? "md";
    const d = (density as string | undefined) ?? "normal";

    if (s === "sm") {
        px = 10;
        py = 3;
    } else if (s === "lg") {
        px = 14;
        py = 5;
    }

    if (d === "dense" || d === "compact") {
        py = Math.max(2, py - 1);
    } else if (d === "relaxed" || d === "loose") {
        py = py + 1;
    }

    return { px, py };
}

// Same logic as in ShadcnTextVariant
function resolveSizeDensityClasses(size: unknown, density: unknown) {
    const s = (size as string | undefined) ?? "md";
    const d = (density as string | undefined) ?? "normal";

    let heightCls = "h-9";
    let textCls = "text-base md:text-sm";

    if (s === "sm") {
        heightCls = "h-8";
        textCls = "text-sm";
    } else if (s === "lg") {
        heightCls = "h-10";
        textCls = "text-base";
    }

    let densityCls = "";
    if (d === "dense" || d === "compact") {
        densityCls = "leading-tight";
    } else if (d === "relaxed" || d === "loose") {
        densityCls = "leading-relaxed";
    }

    return { heightCls, textCls, densityCls };
}

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputMaskProps,
    InputAffixProps,
    InputIconControlProps,
    InputSizeProps,
    InputKeyFilterProps { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    function Input(rawProps, forwardedRef) {
        const {
            // base
            className,
            style,
            type,
            disabled,
            readOnly,
            required,

            // size / density
            size = "md",
            density = "normal",

            // mask
            mask,
            maskDefinitions, // reserved
            slotChar,
            autoClear,
            unmask,
            maskInsertMode,

            // affixes (value-level)
            prefix,
            suffix,
            stripPrefix = true,
            stripSuffix = true,

            // icons / controls
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
            joinControls = true,
            extendBoxToControls = true,
            px,
            py,
            ps,
            pe,
            pb,
            inputClassName,

            // key filter
            keyFilter,
            keyFilterOn = "keypress",
            keyFilterOnPaste = true,

            // events
            onChange,
            onFocus,
            onBlur,
            onKeyDown,
            onKeyPress,
            onBeforeInput,
            onPaste,

            // rest of native props (value, defaultValue, placeholder, etc.)
            ...rest
        } = rawProps as InputProps;

        const sizeKey = (size as string | undefined) ?? "md";
        const densityKey = (density as string | undefined) ?? "normal";
        const isMasked = Boolean(mask);

        const innerRef = React.useRef<HTMLInputElement | null>(null);
        React.useImperativeHandle(
            forwardedRef,
            () => innerRef.current as any,
            []
        );

        // Icons ONLY (prefix/suffix are NOT treated as icons)
        const resolvedLeadingIcons: React.ReactNode[] = (() => {
            if (leadingIcons && leadingIcons.length) return leadingIcons;
            if (icon) return [icon];
            return [];
        })();

        const resolvedTrailingIcons: React.ReactNode[] = trailingIcons ?? [];

        const hasLeadingIcons = resolvedLeadingIcons.length > 0;
        const hasTrailingIcons = resolvedTrailingIcons.length > 0;

        const hasLeadingControl = !!leadingControl;
        const hasTrailingControl = !!trailingControl;
        const hasControls = hasLeadingControl || hasTrailingControl;
        const hasIcons = hasLeadingIcons || hasTrailingIcons;
        const hasExtras = hasControls || hasIcons;

        const baseIconGap = iconGap ?? 4;
        const leadingGap = leadingIconSpacing ?? baseIconGap;
        const trailingGap = trailingIconSpacing ?? baseIconGap;

        // Measure icon widths (for padding vars)
        const leadingIconsRef = React.useRef<HTMLDivElement | null>(null);
        const trailingIconsRef = React.useRef<HTMLDivElement | null>(null);

        const [leadingIconsWidth, setLeadingIconsWidth] =
            React.useState<number>(0);
        const [trailingIconsWidth, setTrailingIconsWidth] =
            React.useState<number>(0);

        React.useLayoutEffect(() => {
            if (typeof window === "undefined") return;
            if (typeof ResizeObserver === "undefined") return;

            const leadingEl = leadingIconsRef.current;
            const trailingEl = trailingIconsRef.current;
            if (!leadingEl && !trailingEl) return;

            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const width = entry.contentRect.width;
                    if (entry.target === leadingIconsRef.current) {
                        setLeadingIconsWidth(width);
                    } else if (entry.target === trailingIconsRef.current) {
                        setTrailingIconsWidth(width);
                    }
                }
            });

            if (leadingEl) observer.observe(leadingEl);
            if (trailingEl) observer.observe(trailingEl);

            return () => observer.disconnect();
        }, [hasLeadingIcons, hasTrailingIcons]);

        // Padding vars (same idea as ShadcnTextVariant, feeding into Tailwind
        // utilities on the actual “box” via CSS variables)
        const { px: pxDefault, py: pyDefault } = resolveBasePadding(
            size,
            density
        );

        const extraPx = typeof px === "number" ? px : 0;
        const extraPy = typeof py === "number" ? py : 0;
        const extraPs = typeof ps === "number" ? ps : 0;
        const extraPe = typeof pe === "number" ? pe : 0;
        const extraPb = typeof pb === "number" ? pb : 0;

        let paddingStart = pxDefault + extraPx + extraPs;
        let paddingEnd = pxDefault + extraPx + extraPe;
        const paddingTop = pyDefault + extraPy;
        const paddingBottom = pyDefault + extraPy + extraPb;

        const textGap = baseIconGap;

        if (hasLeadingIcons && leadingIconsWidth > 0) {
            paddingStart += leadingIconsWidth + textGap;
        }
        if (hasTrailingIcons && trailingIconsWidth > 0) {
            paddingEnd += trailingIconsWidth + textGap;
        }

        const varsStyle: React.CSSProperties = {
            ...(style ?? {}),
            "--fp-pl": `${paddingStart}px`,
            "--fp-pr": `${paddingEnd}px`,
            "--fp-pt": `${paddingTop}px`,
            "--fp-pb": `${paddingBottom}px`,
        } as React.CSSProperties;

        const { heightCls, textCls, densityCls } = resolveSizeDensityClasses(
            size,
            density
        );

        // Core “box” classes (border, radius, focus, size/density),
        // WITHOUT padding – padding is applied only on the actual box element.
        const baseBoxClasses = cx(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
            "border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs",
            "transition-[color,box-shadow] outline-none",
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            heightCls,
            textCls,
            densityCls
        );

        // Padding classes driven by CSS vars
        const boxPaddingClasses = cx(
            "px-(--fp-pl,--spacing(3)) pr-(--fp-pr,--spacing(3))",
            "pt-(--fp-pt,--spacing(1)) pb-(--fp-pb,--spacing(1))"
        );

        // Inner neutral input (used when the *wrapper* carries the box)
        const innerInputNeutral = cx(
            "w-full min-w-0 bg-transparent border-none shadow-none outline-none",
            "px-0 py-0",
            "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent",
            "placeholder:text-muted-foreground",
            inputClassName
        );

        const maskMode: MaskMode =
            unmask === true || unmask === "raw" ? "raw" : "masked";

        // Focus handler with prefix/suffix selection logic
        const handleFocus = React.useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                onFocus?.(event);

                if (!prefix && !suffix) return;

                const inputEl = event.currentTarget;
                const inputValue = inputEl.value;
                const prefixLength = (prefix || "").length;
                const suffixLength = (suffix || "").length;
                const end =
                    inputValue.length === 0
                        ? 0
                        : inputValue.length - suffixLength;

                try {
                    inputEl.setSelectionRange(prefixLength, end);
                } catch {
                    // ignore if unsupported
                }
            },
            [onFocus, prefix, suffix]
        );

        const focusInput = () => {
            if (innerRef.current) {
                innerRef.current.focus();
            }
        };

        const handleIconMouseDown = (e: React.MouseEvent) => {
            e.preventDefault();
            focusInput();
        };

        const placeholder =
            typeof mask === "string" && mask
                ? mask
                : (rest as any).placeholder;

        const hasCustomPadding =
            typeof px === "number" ||
            typeof py === "number" ||
            typeof ps === "number" ||
            typeof pe === "number" ||
            typeof pb === "number";

        const hasKeyFilter = !!keyFilter;

        // Key filter wrappers
        const handleKeyDownWrapped = React.useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (
                    hasKeyFilter &&
                    keyFilterOn === "keydown" &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !event.altKey &&
                    event.key &&
                    event.key.length === 1
                ) {
                    const inputEl = event.currentTarget;
                    const nextValue = computeNextFromInsertion(
                        inputEl,
                        event.key
                    );
                    if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                        event.preventDefault();
                        return;
                    }
                }

                onKeyDown?.(event);
            },
            [hasKeyFilter, keyFilterOn, keyFilter, onKeyDown]
        );

        const handleKeyPressWrapped = React.useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (
                    hasKeyFilter &&
                    keyFilterOn === "keypress" &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !event.altKey &&
                    event.key &&
                    event.key.length === 1
                ) {
                    const inputEl = event.currentTarget;
                    const nextValue = computeNextFromInsertion(
                        inputEl,
                        event.key
                    );
                    if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                        event.preventDefault();
                        return;
                    }
                }

                onKeyPress?.(event);
            },
            [hasKeyFilter, keyFilterOn, keyFilter, onKeyPress]
        );

        const handleBeforeInputWrapped = React.useCallback(
            (event: any) => {
                if (
                    hasKeyFilter &&
                    keyFilterOn === "beforeinput" &&
                    event?.nativeEvent
                ) {
                    const inputEl = event.currentTarget as HTMLInputElement;
                    const data = event.nativeEvent.data as string | null;
                    const inputType = event.nativeEvent.inputType as string | null;

                    // We only care about text insertions; deletions/etc. pass through.
                    if (data && inputType && inputType.startsWith("insert")) {
                        const nextValue = computeNextFromInsertion(
                            inputEl,
                            data
                        );
                        if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                            event.preventDefault();
                            return;
                        }
                    }
                }

                onBeforeInput?.(event);
            },
            [hasKeyFilter, keyFilterOn, keyFilter, onBeforeInput]
        );

        const handlePasteWrapped = React.useCallback(
            (event: React.ClipboardEvent<HTMLInputElement>) => {
                if (hasKeyFilter && keyFilterOnPaste) {
                    const pasted =
                        event.clipboardData?.getData("text") ?? "";
                    if (pasted) {
                        const inputEl = event.currentTarget;
                        const nextValue = computeNextFromInsertion(
                            inputEl,
                            pasted
                        );
                        if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                            event.preventDefault();
                            return;
                        }
                    }
                }

                onPaste?.(event);
            },
            [hasKeyFilter, keyFilterOnPaste, keyFilter, onPaste]
        );

        // Core renderer (mask vs plain)
        const renderBaseInput = (extra: {
            className?: string;
            style?: React.CSSProperties;
            inner?: boolean; // false → input is the box; true/undefined → input is inner neutral
        }) => {
            const useInnerNeutral = extra.inner !== false;

            // MASKED: we delegate value semantics to caller.
            if (isMasked && mask) {
                let maskWithAffixes = mask;
                if (prefix) {
                    maskWithAffixes = `${prefix}${maskWithAffixes}`;
                }
                if (suffix) {
                    maskWithAffixes = `${maskWithAffixes}${suffix}`;
                }

                return (
                    //@ts-ignore
                    <InputMask
                        ref={innerRef as any}
                        mask={maskWithAffixes}
                        slotChar={slotChar ?? "_"}
                        unmask={maskMode === "raw"}
                        disabled={disabled}
                        readOnly={readOnly}
                        onChange={onChange as any}
                        onBlur={onBlur as any}
                        onFocus={handleFocus as any}
                        onKeyDown={handleKeyDownWrapped as any}
                        onKeyPress={handleKeyPressWrapped as any}
                        onBeforeInput={handleBeforeInputWrapped as any}
                        onPaste={handlePasteWrapped as any}
                        aria-required={required ? "true" : undefined}
                        data-size={sizeKey}
                        data-density={densityKey}
                        placeholder={placeholder}
                        className={cx(
                            useInnerNeutral ? innerInputNeutral : "",
                            extra.className
                        )}
                        style={extra.style}
                        data-slot="input"
                        {...rest}
                    />
                );
            }

            // PLAIN: value-level prefix/suffix
            const modelValue = (rest.value ??
                rest.defaultValue ??
                "") as string | number | readonly string[];

            let displayValue =
                typeof modelValue === "string"
                    ? modelValue
                    : Array.isArray(modelValue)
                        ? modelValue.join(",")
                        : String(modelValue ?? "");

            if (prefix) {
                const hasPrefix = displayValue.startsWith(prefix);

                if (stripPrefix) {
                    const withoutPrefix = hasPrefix
                        ? displayValue.slice(prefix.length)
                        : displayValue;
                    displayValue = prefix + withoutPrefix;
                } else {
                    displayValue = hasPrefix
                        ? displayValue
                        : prefix + displayValue;
                }
            }

            if (suffix) {
                const hasSuffix = displayValue.endsWith(suffix);

                if (stripSuffix) {
                    const withoutSuffix = hasSuffix
                        ? displayValue.slice(
                            0,
                            displayValue.length - suffix.length
                        )
                        : displayValue;
                    displayValue = withoutSuffix + suffix;
                } else {
                    displayValue = hasSuffix
                        ? displayValue
                        : displayValue + suffix;
                }
            }

            return (
                //@ts-ignore
                <input
                    ref={innerRef}
                    type={type}
                    data-slot="input"
                    className={cx(
                        useInnerNeutral ? innerInputNeutral : "",
                        extra.className
                    )}
                    style={extra.style}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-required={required ? "true" : undefined}
                    data-size={sizeKey}
                    data-density={densityKey}
                    placeholder={placeholder}
                    value={displayValue}
                    onChange={onChange as any}
                    onBlur={onBlur as any}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDownWrapped as any}
                    onKeyPress={handleKeyPressWrapped as any}
                    onBeforeInput={handleBeforeInputWrapped as any}
                    onPaste={handlePasteWrapped as any}
                    {...rest}
                />
            );
        };

        // RENDER MODES
        // 1. No controls, no icons → simple input (input is the box)
        if (!hasControls && !hasIcons && !hasCustomPadding) {
            return renderBaseInput({
                inner: false,
                className: cx(baseBoxClasses, boxPaddingClasses, className),
                style: varsStyle,
            });
        }

        // 2. No controls, but icons and/or custom padding → wrapper + box input
        if (!hasControls) {
            return (
                <div
                    className={cx("relative w-full")}
                    style={style}
                    data-slot="input-wrapper"
                    data-has-icons={hasIcons ? "true" : "false"}
                >
                    {renderBaseInput({
                        inner: false,
                        className: cx(baseBoxClasses, boxPaddingClasses, className),
                        style: varsStyle,
                    })}

                    {hasLeadingIcons && (
                        <div
                            ref={leadingIconsRef}
                            className="pointer-events-auto absolute inset-y-0 left-0 flex items-center cursor-pointer"
                            style={{
                                gap: leadingGap,
                                paddingLeft: `${pxDefault}px`,
                            }}
                            data-slot="leading-icons"
                            onMouseDown={handleIconMouseDown}
                        >
                            {resolvedLeadingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </div>
                    )}

                    {hasTrailingIcons && (
                        <div
                            ref={trailingIconsRef}
                            className="pointer-events-auto absolute inset-y-0 right-0 flex items-center cursor-pointer"
                            style={{
                                gap: trailingGap,
                                paddingRight: `${pxDefault}px`,
                            }}
                            data-slot="trailing-icons"
                            onMouseDown={handleIconMouseDown}
                        >
                            {resolvedTrailingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // From here: we have controls → we take over the box.
        // data-slot="input-group" NEVER carries padding; padding is on input-region / input-box.

        const innerInputClassJoined = innerInputNeutral;

        // 3. Joined mode: controls + input share one visual box
        if (hasControls && joinControls) {
            const groupClassName = cx(
                "flex items-stretch w-full overflow-hidden",
                extendBoxToControls && cx("relative", baseBoxClasses), // box is the group
                !extendBoxToControls &&
                "relative border-none shadow-none bg-transparent",
                className
            );

            const inputRegionClassName = cx(
                "relative flex-1 flex items-center min-w-0",
                // When the group isn't the box, the region becomes the box.
                !extendBoxToControls && baseBoxClasses,
                "pl-[var(--fp-pl)] pr-[var(--fp-pr)] pt-[var(--fp-pt)] pb-[var(--fp-pb)]"
            );

            return (
                <div
                    className={groupClassName}
                    style={varsStyle}
                    data-slot="input-group"
                    data-has-extras={hasExtras ? "true" : "false"}
                    data-disabled={disabled ? "true" : "false"}
                    data-size={sizeKey}
                    data-density={densityKey}
                >
                    {hasLeadingControl && (
                        <div
                            className={cx(
                                "flex items-center",
                                leadingControlClassName
                            )}
                            data-slot="leading-control"
                        >
                            {leadingControl}
                        </div>
                    )}

                    <div
                        className={inputRegionClassName}
                        data-slot="input-region"
                    >
                        {renderBaseInput({
                            inner: true,
                            className: innerInputClassJoined,
                            style: undefined,
                        })}

                        {hasLeadingIcons && (
                            <div
                                ref={leadingIconsRef}
                                className="absolute inset-y-0 left-0 flex items-center cursor-pointer"
                                style={{
                                    gap: leadingGap,
                                    paddingLeft: `${pxDefault}px`,
                                }}
                                data-slot="leading-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedLeadingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}

                        {hasTrailingIcons && (
                            <div
                                ref={trailingIconsRef}
                                className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                                style={{
                                    gap: trailingGap,
                                    paddingRight: `${pxDefault}px`,
                                }}
                                data-slot="trailing-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedTrailingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {hasTrailingControl && (
                        <div
                            className={cx(
                                "flex items-center",
                                trailingControlClassName
                            )}
                            data-slot="trailing-control"
                        >
                            {trailingControl}
                        </div>
                    )}
                </div>
            );
        }

        // 4. Separate mode: input box + separate neighbour controls
        const standaloneBoxClassName = cx(
            "relative",
            baseBoxClasses,
            "pl-[var(--fp-pl)] pr-[var(--fp-pr)] pt-[var(--fp-pt)] pb-[var(--fp-pb)]",
            className
        );

        return (
            <div className="flex items-stretch gap-1 w-full">
                {hasLeadingControl && (
                    <div
                        className={cx(
                            "flex items-center",
                            leadingControlClassName
                        )}
                        data-slot="leading-control"
                    >
                        {leadingControl}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div
                        className={standaloneBoxClassName}
                        style={varsStyle}
                        data-slot="input-box"
                        data-has-extras={hasExtras ? "true" : "false"}
                        data-disabled={disabled ? "true" : "false"}
                        data-size={sizeKey}
                        data-density={densityKey}
                    >
                        {renderBaseInput({
                            inner: true,
                            className: innerInputNeutral,
                            style: undefined,
                        })}

                        {hasLeadingIcons && (
                            <div
                                ref={leadingIconsRef}
                                className="absolute inset-y-0 left-0 flex items-center cursor-pointer"
                                style={{
                                    gap: leadingGap,
                                    paddingLeft: `${pxDefault}px`,
                                }}
                                data-slot="leading-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedLeadingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}

                        {hasTrailingIcons && (
                            <div
                                ref={trailingIconsRef}
                                className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                                style={{
                                    gap: trailingGap,
                                    paddingRight: `${pxDefault}px`,
                                }}
                                data-slot="trailing-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedTrailingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {hasTrailingControl && (
                    <div
                        className={cx(
                            "flex items-center",
                            trailingControlClassName
                        )}
                        data-slot="trailing-control"
                    >
                        {trailingControl}
                    </div>
                )}
            </div>
        );
    }
);