import * as React from "react";
import { Calendar as CalendarIcon, X as XIcon } from "lucide-react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/presets/ui/popover";
import { Calendar } from "@/presets/ui/calendar";
import { TimeDropdowns } from "../ui/time-dropdowns";

type DateMode = "single" | "range";

export interface DateRange {
   from?: Date;
   to?: Date;
}

type DateValue = Date | DateRange | undefined;

type BaseProps = VariantBaseProps<DateValue>;

// Calendar disabled type from your calendar wrapper
type DisabledDays = React.ComponentProps<typeof Calendar>["disabled"];

/**
 * Logical temporal "kind" for the field.
 *
 * This controls the default mask + formatting/parsing.
 *
 * - "date"      → yyyy-MM-dd (default)
 * - "datetime"  → yyyy-MM-dd HH:mm
 * - "time"      → HH:mm
 * - "hour"      → HH
 * - "monthYear" → MM/yyyy
 * - "year"      → yyyy
 */
export type DateKind =
   | "date"
   | "datetime"
   | "time"
   | "hour"
   | "monthYear"
   | "year"
   | (string & {});

/**
 * Public props for the date variant (legacy + mask extensions).
 */
export interface DateVariantProps {
   mode?: DateMode;
   placeholder?: React.ReactNode;

   clearable?: boolean;

   minDate?: Date;
   maxDate?: Date;
   disabledDays?: DisabledDays;

   /**
    * Pattern for single dates.
    *
    * Tokens:
    * - yyyy → full year
    * - MM   → month (01–12)
    * - dd   → day (01–31)
    * - HH   → hours (00–23)
    * - mm   → minutes (00–59)
    *
    * Default depends on `kind`:
    * - date      → "yyyy-MM-dd"
    * - datetime  → "yyyy-MM-dd HH:mm"
    * - time      → "HH:mm"
    * - hour      → "HH"
    * - monthYear → "MM/yyyy"
    * - year      → "yyyy"
    */
   formatSingle?: string;

   /**
    * String pattern or custom formatter for ranges.
    *
    * - string → same token rules as formatSingle, applied to both ends
    * - function → full control over display text
    */
   formatRange?:
   | string
   | ((range: DateRange | undefined) => string);

   /**
    * Separator when formatRange is a string pattern.
    * Default: " – "
    */
   rangeSeparator?: string;

   /**
    * When true, keep the calendar open after a selection.
    *
    * For range mode, the picker also stays open until both
    * `from` and `to` are chosen.
    */
   stayOpenOnSelect?: boolean;

   /**
    * Controlled open state for the popover.
    */
   open?: boolean;
   onOpenChange?(o: boolean): void;

   /**
    * Temporal kind (controls default mask + formatting/parsing).
    *
    * Default: "date".
    */
   kind?: DateKind;

   /**
    * Optional explicit input mask pattern for the text input.
    *
    * If omitted, a sensible default based on `kind` is used.
    *
    * Mask tokens follow the same rules as the underlying Input mask:
    *   9 = digit, a = letter, * = alphanumeric.
    */
   inputMask?: string;

   /**
    * Whether to render the calendar popover.
    *
    * Defaults:
    * - true  for `kind` = "date" | "datetime"
    * - false for time-only kinds ("time", "hour", "monthYear", "year")
    */
   showCalendar?: boolean;
}

/**
 * We still reuse the Shadcn text UI props (size, density, icons, etc.),
 * but we take over type/value/onValue and the controls.
 */
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   | "type"
   | "inputMode"
   | "leadingControl"
   | "trailingControl"
   | "value"
   | "onValue"
>;

/**
 * Full props for the Shadcn-based date variant.
 */
export type ShadcnDateVariantProps = TextUiProps &
   DateVariantProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function isRange(value: DateValue): value is DateRange {
   return !!value && !(value instanceof Date);
}

function normalizeValueForMode(
   value: DateValue,
   mode: DateMode,
): { single: Date | undefined; range: DateRange | undefined } {
   if (mode === "single") {
      if (value instanceof Date) {
         return { single: value, range: undefined };
      }
      if (isRange(value)) {
         // prefer "from" when coming from a range
         return { single: value.from ?? value.to, range: undefined };
      }
      return { single: undefined, range: undefined };
   }

   // range mode
   if (isRange(value)) {
      return { single: undefined, range: value };
   }
   if (value instanceof Date) {
      return { single: undefined, range: { from: value } };
   }
   return { single: undefined, range: undefined };
}

function hasSelection(value: DateValue): boolean {
   if (!value) return false;
   if (value instanceof Date) return true;
   return !!value.from || !!value.to;
}

function isRangeComplete(range: DateRange | undefined): boolean {
   return !!(range && range.from && range.to);
}

function pad2(n: number): string {
   return n.toString().padStart(2, "0");
}

interface KindConfig {
   mask: string;
   singlePattern: string;
}

function resolveKindConfig(kind: DateKind | undefined): KindConfig {
   const k = (kind ?? "date") as DateKind;

   switch (k) {
      case "datetime":
         return {
            mask: "9999-99-99 99:99",
            singlePattern: "yyyy-MM-dd HH:mm",
         };
      case "time":
         return {
            mask: "99:99",
            singlePattern: "HH:mm",
         };
      case "hour":
         return {
            mask: "99",
            singlePattern: "HH",
         };
      case "monthYear":
         return {
            mask: "99/9999",
            singlePattern: "MM/yyyy",
         };
      case "year":
         return {
            mask: "9999",
            singlePattern: "yyyy",
         };
      case "date":
      default:
         return {
            mask: "9999-99-99",
            singlePattern: "yyyy-MM-dd",
         };
   }
}

function formatDateWithPattern(
   date: Date,
   pattern: string | undefined,
): string {
   const p = pattern ?? "yyyy-MM-dd";

   const yyyy = date.getFullYear().toString();
   const MM = pad2(date.getMonth() + 1);
   const dd = pad2(date.getDate());
   const HH = pad2(date.getHours());
   const mm = pad2(date.getMinutes());

   return p
      .replace(/yyyy/g, yyyy)
      .replace(/MM/g, MM)
      .replace(/dd/g, dd)
      .replace(/HH/g, HH)
      .replace(/mm/g, mm);
}

function formatDisplaySingle(
   date: Date | undefined,
   pattern?: string,
): string {
   if (!date) return "";
   return formatDateWithPattern(date, pattern);
}

function formatDisplayRange(
   range: DateRange | undefined,
   formatRange: DateVariantProps["formatRange"],
   singlePattern?: string,
   separator?: string,
): string {
   if (!range || (!range.from && !range.to)) return "";

   if (typeof formatRange === "function") {
      return formatRange(range);
   }

   const pattern = formatRange ?? singlePattern ?? "yyyy-MM-dd";
   const sep = separator ?? " – ";

   const fromStr = range.from
      ? formatDateWithPattern(range.from, pattern)
      : "";
   const toStr = range.to
      ? formatDateWithPattern(range.to, pattern)
      : "";

   if (!fromStr && !toStr) return "";
   if (!fromStr) return toStr;
   if (!toStr) return fromStr;

   return `${fromStr}${sep}${toStr}`;
}

/**
 * Parse a raw digit string (unmasked) into a Date based on `kind`.
 *
 * Returns null when the input is incomplete or invalid.
 */
function parseRawToDate(rawDigits: string, kind: DateKind): Date | null {
   const len = rawDigits.length;

   switch (kind) {
      case "datetime": {
         if (len < 12) return null;
         const year = Number(rawDigits.slice(0, 4));
         const month = Number(rawDigits.slice(4, 6));
         const day = Number(rawDigits.slice(6, 8));
         const hour = Number(rawDigits.slice(8, 10));
         const minute = Number(rawDigits.slice(10, 12));
         if (!year || month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
         }
         if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return null;
         }
         return new Date(year, month - 1, day, hour, minute, 0, 0);
      }

      case "time": {
         if (len < 4) return null;
         const hour = Number(rawDigits.slice(0, 2));
         const minute = Number(rawDigits.slice(2, 4));
         if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return null;
         }
         const d = new Date();
         d.setSeconds(0, 0);
         d.setHours(hour, minute);
         return d;
      }

      case "hour": {
         if (len < 2) return null;
         const hour = Number(rawDigits.slice(0, 2));
         if (hour < 0 || hour > 23) return null;
         const d = new Date();
         d.setSeconds(0, 0);
         d.setHours(hour, 0);
         return d;
      }

      case "monthYear": {
         if (len < 6) return null;
         const month = Number(rawDigits.slice(0, 2));
         const year = Number(rawDigits.slice(2, 6));
         if (!year || month < 1 || month > 12) {
            return null;
         }
         return new Date(year, month - 1, 1, 0, 0, 0, 0);
      }

      case "year": {
         if (len < 4) return null;
         const year = Number(rawDigits.slice(0, 4));
         if (!year) return null;
         return new Date(year, 0, 1, 0, 0, 0, 0);
      }

      case "date":
      default: {
         if (len < 8) return null;
         const year = Number(rawDigits.slice(0, 4));
         const month = Number(rawDigits.slice(4, 6));
         const day = Number(rawDigits.slice(6, 8));
         if (!year || month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
         }
         return new Date(year, month - 1, day, 0, 0, 0, 0);
      }
   }
}

function meterSafeDigits(masked: string): string {
   return masked.replace(/\D+/g, "");
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnDateVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnDateVariantProps
>(function ShadcnDateVariant(props, ref) {
   const {
      // variant base bits
      value,
      onValue,
      error,

      // date props
      mode: modeProp = "single",
      placeholder,
      clearable = true,
      minDate,
      maxDate,
      disabledDays,
      formatSingle: formatSingleProp,
      formatRange,
      rangeSeparator,
      stayOpenOnSelect,
      open,
      onOpenChange,

      kind: kindProp = "date",
      inputMask,
      showCalendar: showCalendarProp,

      //@ts-ignore text UI bits (size, density, className, icons, etc.)
      className,
      ...restTextProps
   } = props;

   const mode: DateMode = modeProp ?? "single";
   const kind: DateKind = kindProp ?? "date";

   const kindConfig = resolveKindConfig(kind);
   const singlePattern = formatSingleProp ?? kindConfig.singlePattern;
   const resolvedMask = inputMask ?? kindConfig.mask;

   const defaultShowCalendar =
      kind === "date" || kind === "datetime";
   const showCalendar =
      typeof showCalendarProp === "boolean"
         ? showCalendarProp
         : defaultShowCalendar;

   const [internalOpen, setInternalOpen] = React.useState(false);
   const isControlledOpen = open !== undefined;
   const currentOpen = isControlledOpen ? !!open : internalOpen;

   const handleOpenChange = React.useCallback(
      (next: boolean) => {
         if (!isControlledOpen) {
            setInternalOpen(next);
         }
         onOpenChange?.(next);
      },
      [isControlledOpen, onOpenChange],
   );

   const { single, range } = normalizeValueForMode(value, mode);

   const displayValue = React.useMemo(() => {
      if (mode === "single") {
         return formatDisplaySingle(single, singlePattern);
      }
      return formatDisplayRange(
         range,
         formatRange,
         singlePattern,
         rangeSeparator,
      );
   }, [mode, single, range, singlePattern, formatRange, rangeSeparator]);

   const [localText, setLocalText] = React.useState<string>(displayValue);

   // Sync local text with external value / formatting
   React.useEffect(() => {
      setLocalText(displayValue);
   }, [displayValue]);

   // Time dropdown visibility:
   // - Only for mode="single"
   // - For datetime/time/hour kinds
   const showTimeDropdowns =
      mode === "single" &&
      (kind === "datetime" || kind === "time" || kind === "hour");

   const handleSelect = React.useCallback(
      (next: Date | DateRange | undefined) => {
         let nextValue: DateValue;
         let nextRange: DateRange | undefined;

         if (mode === "single") {
            if (next instanceof Date) {
               let selected = next;

               // For datetime, preserve previously chosen time (if any)
               if (kind === "datetime" && single) {
                  selected = new Date(
                     selected.getFullYear(),
                     selected.getMonth(),
                     selected.getDate(),
                     single.getHours(),
                     single.getMinutes(),
                     single.getSeconds(),
                     0,
                  );
               }

               nextValue = selected;
            } else {
               nextValue = undefined;
            }
            nextRange = undefined;
         } else {
            if (next && next instanceof Date) {
               nextRange = { from: next };
            } else {
               nextRange = (next as DateRange | undefined) ?? undefined;
            }
            nextValue = nextRange;
         }

         const rangeComplete =
            mode === "range" ? isRangeComplete(nextRange) : !!nextValue;

         const detail: ChangeDetail<{
            mode: DateMode;
            from: "calendar";
            rangeComplete: boolean;
         }> = {
            source: "variant",
            raw: nextValue,
            nativeEvent: undefined,
            meta: {
               mode,
               from: "calendar",
               rangeComplete,
            },
         };

         onValue?.(nextValue, detail);

         const shouldStayOpen =
            stayOpenOnSelect ||
            (mode === "range" && !rangeComplete);

         if (!shouldStayOpen) {
            handleOpenChange(false);
         }
      },
      [mode, stayOpenOnSelect, onValue, handleOpenChange, kind, single],
   );

   const handleTimeChange = React.useCallback(
      (next: Date | undefined) => {
         if (!next) {
            const detail: ChangeDetail<{
               mode: DateMode;
               kind: DateKind;
               from: "time";
               cleared: boolean;
            }> = {
               source: "variant",
               raw: undefined,
               nativeEvent: undefined,
               meta: {
                  mode,
                  kind,
                  from: "time",
                  cleared: true,
               },
            };
            onValue?.(undefined, detail);
            return;
         }

         const detail: ChangeDetail<{
            mode: DateMode;
            kind: DateKind;
            from: "time";
         }> = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta: {
               mode,
               kind,
               from: "time",
            },
         };

         onValue?.(next, detail);
      },
      [mode, kind, onValue],
   );

   const handleClear = React.useCallback(
      (ev: React.MouseEvent) => {
         ev.preventDefault();
         ev.stopPropagation();

         const detail: ChangeDetail<{
            mode: DateMode;
            cleared: boolean;
         }> = {
            source: "variant",
            raw: undefined,
            nativeEvent: ev as any,
            meta: {
               mode,
               cleared: true,
            },
         };
         onValue?.(undefined, detail);
      },
      [mode, onValue],
   );

   const hasValue = hasSelection(value);
   const placeholderText =
      typeof placeholder === "string"
         ? placeholder
         : mode === "range"
            ? "Select date range"
            : "Select date";

   /**
    * Manual text input (mask-driven) — only for `mode = "single"`.
    * Range editing via text gets very hairy, so we keep range as
    * a calendar-driven control for now.
    */
   const handleInputChange = React.useCallback(
      (event: any) => {
         if (mode !== "single") return;

         const masked = (event?.value ??
            event?.target?.value ??
            "") as string;

         setLocalText(masked);

         const digits = meterSafeDigits(masked);

         if (!digits.length) {
            const detail: ChangeDetail<{
               mode: DateMode;
               kind: DateKind;
               from: "text";
               cleared: boolean;
            }> = {
               source: "variant",
               raw: undefined,
               nativeEvent: event,
               meta: {
                  mode,
                  kind,
                  from: "text",
                  cleared: true,
               },
            };
            onValue?.(undefined, detail);
            return;
         }

         const parsed = parseRawToDate(digits, kind);
         if (!parsed) {
            // Incomplete or invalid — keep local text but don't
            // push a Date value yet.
            return;
         }

         // If min/max are set, enforce them here.
         if (minDate && parsed < minDate) return;
         if (maxDate && parsed > maxDate) return;

         const detail: ChangeDetail<{
            mode: DateMode;
            kind: DateKind;
            from: "text";
         }> = {
            source: "variant",
            raw: parsed,
            nativeEvent: event,
            meta: {
               mode,
               kind,
               from: "text",
            },
         };

         onValue?.(parsed, detail);
      },
      [mode, kind, minDate, maxDate, onValue],
   );

   const trailingControl = (
      <div
         className="flex h-full items-center gap-1 pr-1"
         data-slot="date-controls"
      >
         {clearable && hasValue && (
            <button
               type="button"
               onClick={handleClear}
               className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
               aria-label="Clear date"
               data-slot="date-clear"
            >
               <XIcon className="h-3 w-3" />
            </button>
         )}

         {showCalendar && (
            <button
               type="button"
               onClick={() => handleOpenChange(!currentOpen)}
               className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
               aria-label="Open calendar"
               data-slot="date-toggle"
            >
               <CalendarIcon className="h-4 w-4" />
            </button>
         )}
      </div>
   );

   const inputNode = (
      <Input
         ref={ref}
         {...restTextProps}
         type="text"
         value={localText}
         onChange={mode === "single" ? (handleInputChange as any) : undefined}
         readOnly={mode !== "single" && showCalendar}
         placeholder={placeholderText}
         trailingControl={trailingControl}
         aria-invalid={error ? "true" : undefined}
         // Mask only makes sense when we allow typing.
         mask={mode === "single" ? resolvedMask : undefined}
      />
   );

   // If calendar is disabled completely, just render the masked input.
   if (!showCalendar) {
      return (
         <div className={className} data-slot="date-field">
            {inputNode}
         </div>
      );
   }

   const showCalendarBody = kind !== "time" && kind !== "hour";

   // Calendar / time popover.
   return (
      <Popover open={currentOpen} onOpenChange={handleOpenChange}>
         <PopoverTrigger asChild>
            <div className={className} data-slot="date-field">
               {inputNode}
            </div>
         </PopoverTrigger>
         <PopoverContent
            align="start"
            className="w-auto p-0"
            data-slot="date-popover"
         >
            <div className="flex flex-col gap-2 p-2">
               {showCalendarBody && (
                  <Calendar
                     mode={mode}
                     //@ts-ignore date UI bits
                     selected={mode === "single" ? single : range}
                     onSelect={handleSelect as any}
                     disabled={disabledDays}
                     fromDate={minDate}
                     toDate={maxDate}
                     initialFocus
                  />
               )}

               {showTimeDropdowns && (
                  <TimeDropdowns
                     value={single ?? undefined}
                     onChange={handleTimeChange}
                     label={
                        kind === "datetime"
                           ? "Time"
                           : undefined
                     }
                     minuteStep={5}
                     showSeconds={false}
                     density="compact"
                  />
               )}
            </div>
         </PopoverContent>
      </Popover>
   );
});

ShadcnDateVariant.displayName = "ShadcnDateVariant";

export default ShadcnDateVariant;