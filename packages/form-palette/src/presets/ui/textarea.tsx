import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaIconControlProps {
  // lower icons (overlaid in textarea-field)
  leadingIcons?: React.ReactNode[];
  trailingIcons?: React.ReactNode[];
  icon?: React.ReactNode;

  iconGap?: number;
  leadingIconSpacing?: number;
  trailingIconSpacing?: number;

  // lower side controls (outside the text area by default)
  leadingControl?: React.ReactNode;
  trailingControl?: React.ReactNode;
  leadingControlClassName?: string;
  trailingControlClassName?: string;

  /**
   * If true, move the visual box (border, bg, radius, focus) from
   * `textarea-field` to `textarea-inner` so the side controls are
   * inside the same frame.
   *
   * Default: false (controls sit outside the border).
   */
  extendBoxToControls?: boolean;

  /**
   * If true, move the visual box all the way up to `textarea-box`,
   * so the upper toolbox and the inner row share a single frame.
   *
   * When this is true, it overrides `extendBoxToControls`.
   *
   * Default: false.
   */
  extendBoxToToolbox?: boolean;

  /**
   * Extra padding knobs (same semantics as Input).
   *
   * px → symmetric horizontal padding
   * py → symmetric vertical padding
   * ps/pe → logical start/end padding adjustments
   * pb → extra bottom padding (stacked with py)
   */
  px?: number;
  py?: number;
  ps?: number;
  pe?: number;
  pb?: number;

  /**
   * Extra classes merged into the raw <textarea>.
   * (The box padding/border live on the wrappers.)
   */
  inputClassName?: string;
}

export interface TextareaSizeProps {
  size?: "sm" | "md" | "lg" | (string & {});
  density?:
  | "compact"
  | "normal"
  | "relaxed"
  | "dense"
  | "loose"
  | (string & {});
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
  TextareaIconControlProps,
  TextareaSizeProps {
  /**
   * Auto-resize based on content.
   * Default: true.
   */
  autoResize?: boolean;

  /**
   * Minimum number of visual rows.
   * Default: 1.
   */
  rows?: number;

  /**
   * Maximum number of visual rows.
   * Undefined → unlimited.
   */
  maxRows?: number;

  /**
   * Optional upper toolbox area.
   */
  upperControl?: React.ReactNode;
  upperControlClassName?: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function resolveSizeDensityClasses(size: unknown, density: unknown) {
  const s = (size as string | undefined) ?? "md";
  const d = (density as string | undefined) ?? "normal";

  let textCls = "text-base md:text-sm";

  if (s === "sm") {
    textCls = "text-sm";
  } else if (s === "lg") {
    textCls = "text-base";
  }

  let densityCls = "";
  if (d === "dense" || d === "compact") {
    densityCls = "leading-tight";
  } else if (d === "relaxed" || d === "loose") {
    densityCls = "leading-relaxed";
  }

  return { textCls, densityCls };
}

function resolveBasePadding(size: unknown, density: unknown) {
  // mirror Input baseline
  let px = 12;
  let py = 8;

  const s = (size as string | undefined) ?? "md";
  const d = (density as string | undefined) ?? "normal";

  if (s === "sm") {
    px = 10;
    py = 6;
  } else if (s === "lg") {
    px = 14;
    py = 10;
  }

  if (d === "dense" || d === "compact") {
    py = Math.max(2, py - 1);
  } else if (d === "relaxed" || d === "loose") {
    py = py + 1;
  }

  return { px, py };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(rawProps, forwardedRef) {
    const {
      // layout wrapper
      className,
      style,

      // native textarea bits
      disabled,
      readOnly,
      required,
      onChange,
      onFocus,
      onBlur,
      placeholder,

      // size / density
      size = "md",
      density = "normal",

      // auto-resize
      autoResize = true,
      rows: minRowsProp,
      maxRows,

      // controls / icons
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
      extendBoxToControls = false,
      extendBoxToToolbox = false,
      px,
      py,
      ps,
      pe,
      pb,
      inputClassName,

      // upper toolbox
      upperControl,
      upperControlClassName,

      // rest of <textarea> props
      ...rest
    } = rawProps;

    const sizeKey = (size as string | undefined) ?? "md";
    const densityKey = (density as string | undefined) ?? "normal";

    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLTextAreaElement,
      []
    );

    // icons
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

    const hasIcons = hasLeadingIcons || hasTrailingIcons;
    const hasControls = hasLeadingControl || hasTrailingControl;
    const hasExtras = hasIcons || hasControls;

    const baseIconGap = iconGap ?? 1;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const leadingIconsRef = React.useRef<HTMLDivElement | null>(null);
    const trailingIconsRef = React.useRef<HTMLDivElement | null>(null);
    const [leadingIconsWidth, setLeadingIconsWidth] = React.useState(0);
    const [trailingIconsWidth, setTrailingIconsWidth] = React.useState(0);

    const measureIconWidths = React.useCallback(() => {
      if (typeof window === "undefined") return;

      const lead = leadingIconsRef.current;
      const trail = trailingIconsRef.current;

      if (lead) {
        const rect = lead.getBoundingClientRect();
        setLeadingIconsWidth(rect.width);
      } else {
        setLeadingIconsWidth(0);
      }

      if (trail) {
        const rect = trail.getBoundingClientRect();
        setTrailingIconsWidth(rect.width);
      } else {
        setTrailingIconsWidth(0);
      }
    }, []);

    // MutationObserver → recompute icon widths when content changes
    React.useLayoutEffect(() => {
      if (
        typeof window === "undefined" ||
        typeof MutationObserver === "undefined"
      ) {
        measureIconWidths();
        return;
      }

      const observers: MutationObserver[] = [];
      const lead = leadingIconsRef.current;
      const trail = trailingIconsRef.current;

      if (lead) {
        const obs = new MutationObserver(() => measureIconWidths());
        obs.observe(lead, {
          childList: true,
          subtree: true,
          attributes: true,
        });
        observers.push(obs);
      }

      if (trail) {
        const obs = new MutationObserver(() => measureIconWidths());
        obs.observe(trail, {
          childList: true,
          subtree: true,
          attributes: true,
        });
        observers.push(obs);
      }

      measureIconWidths();

      return () => observers.forEach((o) => o.disconnect());
    }, [measureIconWidths, hasLeadingIcons, hasTrailingIcons]);

    // row height / rows
    const [rowHeight, setRowHeight] = React.useState<number | null>(null);
    const baseMinRows = Math.max(minRowsProp ?? 1, 1);
    const [rows, setRows] = React.useState<number>(baseMinRows);

    // measure a single-row height from the textarea itself
    React.useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const el = innerRef.current;
      if (!el) return;

      const prevValue = el.value;
      const prevHeight = el.style.height;

      el.value = "X";
      el.style.height = "0px";
      const singleRowHeight = el.scrollHeight;

      el.value = prevValue;
      el.style.height = prevHeight;

      if (singleRowHeight > 0 && Number.isFinite(singleRowHeight)) {
        setRowHeight(singleRowHeight);
        setRows(baseMinRows);
      }
    }, [sizeKey, densityKey, baseMinRows]);

    // auto-resize helper
    const recomputeHeight = React.useCallback(() => {
      if (!autoResize) return;
      if (!innerRef.current) return;
      if (!rowHeight) return;

      const el = innerRef.current;

      el.style.height = "0px";
      const scrollH = el.scrollHeight;

      // if empty, keep exactly minRows
      if (!el.value || el.value.length === 0) {
        const h = baseMinRows * rowHeight;
        el.style.height = `${h}px`;
        setRows(baseMinRows);
        return;
      }

      const rawRows = scrollH / rowHeight;
      let nextRows = Math.max(baseMinRows, Math.ceil(rawRows));
      if (typeof maxRows === "number" && maxRows > 0) {
        nextRows = Math.min(nextRows, maxRows);
      }

      const nextHeight = nextRows * rowHeight;
      el.style.height = `${nextHeight}px`;
      setRows(nextRows);
    }, [autoResize, rowHeight, baseMinRows, maxRows]);

    // run when controlled value changes or initial mount
    React.useLayoutEffect(() => {
      recomputeHeight();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recomputeHeight, rest.value, rest.defaultValue]);

    // padding (frame-level)
    const { px: pxDefault, py: pyDefault } = resolveBasePadding(size, density);

    const extraPx = typeof px === "number" ? px : 0;
    const extraPy = typeof py === "number" ? py : 0;
    const extraPs = typeof ps === "number" ? ps : 0;
    const extraPe = typeof pe === "number" ? pe : 0;
    const extraPb = typeof pb === "number" ? pb : 0;

    const basePaddingStart = pxDefault + extraPx + extraPs;
    const basePaddingEnd = pxDefault + extraPx + extraPe;
    const paddingTop = pyDefault + extraPy;
    const paddingBottom = pyDefault + extraPy + extraPb;

    // extra space text needs because of icons
    const iconsLeftExtra =
      hasLeadingIcons && leadingIconsWidth > 0
        ? leadingIconsWidth + baseIconGap
        : 0;

    const iconsRightExtra =
      hasTrailingIcons && trailingIconsWidth > 0
        ? trailingIconsWidth + baseIconGap
        : 0;

    const { textCls, densityCls } = resolveSizeDensityClasses(size, density);

    // vars for the frame: both base + adjusted
    const vars: React.CSSProperties = {
      "--fp-pl-base": `${basePaddingStart}px`,
      "--fp-pr-base": `${basePaddingEnd}px`,
      "--fp-pl": `${basePaddingStart + iconsLeftExtra}px`,
      "--fp-pr": `${basePaddingEnd + iconsRightExtra}px`,
      "--fp-pt": `${paddingTop}px`,
      "--fp-pb": `${paddingBottom}px`,
      "--fp-row-height": rowHeight ? `${rowHeight}px` : undefined,
      "--fp-rows": rows,
    } as React.CSSProperties;

    const mergedWrapperStyle: React.CSSProperties = {
      ...(style ?? {}),
      ...vars,
    };

    // visual frame (border/background/focus)
    const frameClasses = cn(
      "border-input placeholder:text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      "dark:bg-input/30 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50"
    );

    // padding utility using adjusted vars (--fp-pl / --fp-pr)
    const framePaddingClasses = cn(
      "px-(--fp-pl,--spacing(3)) pr-(--fp-pr,--spacing(3))",
      "pt-(--fp-pt,--spacing(1)) pb-(--fp-pb,--spacing(1))"
    );

    // which element owns the frame?
    const boxOnToolbox = extendBoxToToolbox;
    const boxOnInner = !boxOnToolbox && extendBoxToControls;
    const boxOnField = !boxOnToolbox && !boxOnInner;

    const wrapperClasses = cn("w-full", className);

    const boxClasses = cn(
      "flex flex-col gap-1",
      boxOnToolbox && frameClasses,
      boxOnToolbox && framePaddingClasses
    );

    const innerRowClasses = cn(
      "flex items-stretch gap-1",
      boxOnInner && frameClasses,
      boxOnInner && framePaddingClasses
    );

    const fieldWrapperClasses = cn(
      "relative flex-1 min-w-0",
      boxOnField && frameClasses,
      boxOnField && framePaddingClasses
    );

    const textareaClasses = cn(
      "block w-full min-h-[1px] resize-none bg-transparent border-none outline-none shadow-none",
      "px-0 py-0",
      "placeholder:text-muted-foreground",
      textCls,
      densityCls,
      inputClassName
    );

    const focusTextarea = () => {
      if (innerRef.current) innerRef.current.focus();
    };

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLTextAreaElement>) => {
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLTextAreaElement>) => {
        onBlur?.(event);
      },
      [onBlur]
    );

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event);
        // for uncontrolled usage, recompute on each keystroke
        recomputeHeight();
      },
      [onChange, recomputeHeight]
    );

    const handleIconMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      focusTextarea();
    };

    const controlCellStyle: React.CSSProperties | undefined =
      rowHeight != null ? { height: `${rowHeight}px` } : undefined;

    const lowerControlAlignStyle: React.CSSProperties = {
      marginTop: "auto",
      ...controlCellStyle,
    };

    const leadingArea = hasLeadingControl ? (
      <div
        data-slot="textarea-leading-area"
        className={cn("flex flex-col h-full", leadingControlClassName)}
      >
        <div
          data-slot="textarea-leading-control"
          className="flex items-center mt-auto"
          style={lowerControlAlignStyle}
          onMouseDown={(e) => {
            e.preventDefault();
            focusTextarea();
          }}
        >
          {leadingControl}
        </div>
      </div>
    ) : null;

    const trailingArea = hasTrailingControl ? (
      <div
        data-slot="textarea-trailing-area"
        className={cn("flex flex-col h-full mt-auto", trailingControlClassName)}
      >
        <div
          data-slot="textarea-trailing-control"
          className="flex items-center"
          style={lowerControlAlignStyle}
          onMouseDown={(e) => {
            e.preventDefault();
            focusTextarea();
          }}
        >
          {trailingControl}
        </div>
      </div>
    ) : null;

    return (
      <div
        data-slot="textarea-wrapper"
        className={wrapperClasses}
        style={mergedWrapperStyle}
        data-size={sizeKey}
        data-density={densityKey}
      >
        <div
          data-slot="textarea-box"
          className={boxClasses}
          data-has-extras={hasExtras ? "true" : "false"}
        >
          {upperControl && (
            <div
              data-slot="textarea-upper"
              className={cn("flex items-center", upperControlClassName)}
            >
              {upperControl}
            </div>
          )}

          <div data-slot="textarea-inner" className={innerRowClasses}>
            {leadingArea}

            <div data-slot="textarea-field" className={fieldWrapperClasses}>
              <textarea
                ref={innerRef}
                data-slot="textarea"
                className={textareaClasses}
                disabled={disabled}
                readOnly={readOnly}
                aria-required={required ? "true" : undefined}
                rows={autoResize ? undefined : baseMinRows}
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...rest}
              />

              {hasLeadingIcons && (
                <div
                  ref={leadingIconsRef}
                  data-slot="textarea-leading-icons"
                  className="pointer-events-auto absolute left-0 flex items-end"
                  style={{
                    gap: leadingGap,
                    // anchor from base padding, NOT icon-adjusted padding
                    paddingLeft: "var(--fp-pl-base)",
                    bottom: "calc(var(--fp-pb, 0px) + 2px)",
                  }}
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
                  data-slot="textarea-trailing-icons"
                  className="pointer-events-auto absolute right-0 flex items-end"
                  style={{
                    gap: trailingGap,
                    paddingRight: "var(--fp-pr-base)",
                    bottom: "calc(var(--fp-pb, 0px) + 2px)",
                  }}
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

            {trailingArea}
          </div>
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";