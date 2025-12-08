import * as React from "react";
import { ShadcnTextVariantProps } from "../shadcn-variants/text";
import { FieldSize } from "@/variants/shared";
import { Input } from "./input";
// Adjust this import to your actual text variant path:
//// import { ShadcnTextVariant } from "@/presets/shadcn-variants/text";

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
   extends Omit<ShadcnTextVariantProps, 'min' | 'max' | 'value'>, Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      | "value"
      | "defaultValue"
      | "onChange"
      | "onInput"
      | "onKeyDown"
      | "onKeyUp"
      | "size"
      | 'max'
      | 'min'
   > {
   onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): unknown;
   onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): unknown;
   // Prime-style props we actually use

   value?: number | null;

   /**
    * Emitted when the numeric value changes (Prime-style).
    */
   onValueChange?: (e: InputNumberValueChangeEvent) => void;

   /**
    * Optional simple change handler (numeric value).
    */
   onChange?: (e: { originalEvent: React.SyntheticEvent<any>; value: number | null }) => void;

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

   format?: boolean;

   inputId?: string;
   inputClassName?: string;
   inputStyle?: React.CSSProperties;
   inputRef?: React.Ref<InputRef> | null;

   /**
    * String prefix/suffix (like Prime). They are part of formatting logic.
    * You can ALSO forward them to your text variant as visual adornments.
    */
   prefix?: string;
   suffix?: string;

   // We keep size as number | undefined to mirror InputText
   size?: FieldSize;

   invalid?: boolean;
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

      const [focusedState, setFocusedState] = React.useState(false);

      const elementRef = React.useRef<HTMLSpanElement | null>(null);
      const inputRef = React.useRef<InputRef | null>(null);
      const timer = React.useRef<number | undefined>(undefined);
      const lastValue = React.useRef<string>("");

      const numberFormat = React.useRef<Intl.NumberFormat | null>(null);
      const groupChar = React.useRef<string>("");
      const prefixChar = React.useRef<string>("");
      const suffixChar = React.useRef<string>("");

      const _numeral = React.useRef<RegExp | null>(null);
      const _group = React.useRef<RegExp | null>(null);
      const _minusSign = React.useRef<RegExp | null>(null);
      const _currency = React.useRef<RegExp | null>(null);
      const _decimal = React.useRef<RegExp | null>(null);
      const _decimalSeparator = React.useRef<string>(".");
      const _suffix = React.useRef<RegExp | null>(null);
      const _prefix = React.useRef<RegExp | null>(null);
      const _index = React.useRef<(d: string) => number | undefined>(() => 0);

      const isFocusedByClick = React.useRef(false);

      const resolveLocale = React.useCallback((): string => {
         if (props.locale) return props.locale;
         if (typeof navigator !== "undefined" && navigator.language) {
            return navigator.language;
         }
         return "en-US";
      }, [props.locale]);

      const _locale = resolveLocale();

      const inputMode =
         props.inputMode ||
         (props.mode === "decimal" && !props.minFractionDigits && !props.maxFractionDigits
            ? "numeric"
            : "decimal");

      const getOptions = React.useCallback((): Intl.NumberFormatOptions => {
         return {
            localeMatcher: props.localeMatcher,
            style: props.mode,
            currency: props.currency,
            currencyDisplay: props.currencyDisplay,
            useGrouping: props.useGrouping,
            minimumFractionDigits:
               props.minFractionDigits !== undefined ? props.minFractionDigits : undefined,
            maximumFractionDigits:
               props.maxFractionDigits !== undefined ? props.maxFractionDigits : undefined,
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

      const escapeRegExp = (text: string): string =>
         text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

      const constructParser = React.useCallback(() => {
         const loc = _locale;
         numberFormat.current = new Intl.NumberFormat(loc, getOptions());

         // numerals
         const numerals = [
            ...new Intl.NumberFormat(loc, { useGrouping: false }).format(9876543210),
         ].reverse();
         const index = new Map<string, number>(numerals.map((d, i) => [d, i]));
         _numeral.current = new RegExp("[" + numerals.join("") + "]", "g");
         _index.current = (d: string) => index.get(d) ?? 0;

         // grouping
         const formatterGroup = new Intl.NumberFormat(loc, { useGrouping: true });
         groupChar.current = formatterGroup
            .format(1000000)
            .trim()
            .replace(_numeral.current, "")
            .charAt(0);
         _group.current = new RegExp("[" + groupChar.current + "]", "g");

         // minus
         const formatterMinus = new Intl.NumberFormat(loc, { useGrouping: false });
         const minusString = formatterMinus
            .format(-1)
            .trim()
            .replace(_numeral.current, "");
         _minusSign.current = new RegExp("[" + minusString + "]", "g");

         // currency
         if (props.currency) {
            const formatterCurrency = new Intl.NumberFormat(loc, {
               style: "currency",
               currency: props.currency,
               currencyDisplay: props.currencyDisplay,
               minimumFractionDigits: 0,
               maximumFractionDigits: 0,
               roundingMode: props.roundingMode,
            });
            _currency.current = new RegExp(
               "[" +
               formatterCurrency
                  .format(1)
                  .replace(/\s/g, "")
                  .replace(_numeral.current, "")
                  .replace(_group.current, "") +
               "]",
               "g"
            );
         } else {
            _currency.current = new RegExp("[]", "g");
         }

         // decimal separator + expression
         const formatterDecimal = new Intl.NumberFormat(loc, {
            useGrouping: false,
         });
         const decSample = formatterDecimal.format(1.1).trim().replace(_numeral.current, "");
         _decimalSeparator.current = decSample || ".";
         const formatterDecOptions = new Intl.NumberFormat(loc, {
            ...getOptions(),
            useGrouping: false,
         });
         _decimal.current = new RegExp(
            "[" +
            formatterDecOptions
               .format(1.1)
               .replace(_currency.current, "")
               .trim()
               .replace(_numeral.current, "") +
            "]",
            "g"
         );

         // prefix
         if (props.prefix) {
            prefixChar.current = props.prefix;
         } else {
            const formatterPrefix = new Intl.NumberFormat(loc, {
               style: props.mode,
               currency: props.currency,
               currencyDisplay: props.currencyDisplay,
            });
            prefixChar.current = formatterPrefix.format(1).split("1")[0];
         }
         _prefix.current = new RegExp(escapeRegExp(prefixChar.current || ""), "g");

         // suffix
         if (props.suffix) {
            suffixChar.current = props.suffix;
         } else {
            const formatterSuffix = new Intl.NumberFormat(loc, {
               style: props.mode,
               currency: props.currency,
               currencyDisplay: props.currencyDisplay,
               minimumFractionDigits: 0,
               maximumFractionDigits: 0,
               roundingMode: props.roundingMode,
            });
            suffixChar.current = formatterSuffix.format(1).split("1")[1];
         }
         _suffix.current = new RegExp(escapeRegExp(suffixChar.current || ""), "g");
      }, [
         _locale,
         getOptions,
         props.currency,
         props.currencyDisplay,
         props.mode,
         props.prefix,
         props.roundingMode,
         props.suffix,
      ]);

      const formatValue = React.useCallback(
         (value: number | string | null | undefined): string => {
            if (value == null) return "";
            if (value === "-") return "-";

            const numeric =
               typeof value === "number"
                  ? value
                  : typeof value === "string"
                     ? Number(value)
                     : Number.NaN;

            if (Number.isNaN(numeric)) return "";

            if (props.format) {
               const formatter =
                  numberFormat.current || new Intl.NumberFormat(_locale, getOptions());
               let formatted = formatter.format(numeric);

               if (props.prefix) {
                  formatted = props.prefix + formatted;
               }

               if (props.suffix) {
                  formatted = formatted + props.suffix;
               }

               return formatted;
            }

            return numeric.toString();
         },
         [getOptions, _locale, props.format, props.prefix, props.suffix]
      );

      const parseValue = React.useCallback(
         (text: string): number | string | null => {
            if (!text) return null;

            let filteredText = text;

            if (_suffix.current) {
               filteredText = filteredText.replace(_suffix.current, "");
            }
            if (_prefix.current) {
               filteredText = filteredText.replace(_prefix.current, "");
            }

            filteredText = filteredText
               .trim()
               .replace(/\s/g, "")
               .replace(_currency.current!, "")
               .replace(_group.current!, "")
               .replace(_minusSign.current!, "-")
               .replace(_decimal.current!, ".")
               .replace(_numeral.current!, (d: string) =>
                  String(_index.current(d) ?? "")
               );

            if (!filteredText) return null;

            if (filteredText === "-") {
               return "-";
            }

            const parsedValue = +filteredText;

            return Number.isNaN(parsedValue) ? null : parsedValue;
         },
         []
      );

      const addWithPrecision = (base: number, increment: number, precision = 10) =>
         Math.round((base + increment) * precision) / precision;

      const clearTimer = () => {
         if (timer.current != null) {
            window.clearInterval(timer.current);
            timer.current = undefined;
         }
      };

      const allowMinusSign = () =>
         props.min == null || props.min < 0;

      const isMinusSign = (ch: string) => {
         if ((_minusSign.current && _minusSign.current.test(ch)) || ch === "-") {
            _minusSign.current && (_minusSign.current.lastIndex = 0);
            return true;
         }
         return false;
      };

      const isDecimalMode = () => props.mode === "decimal";

      const isFloat = (val: number) => {
         const formatter = new Intl.NumberFormat(_locale, getOptions());
         const parsed = parseValue(formatter.format(val));
         if (parsed === null || typeof parsed !== "number") {
            return false;
         }
         return parsed % 1 !== 0;
      };

      const replaceDecimalSeparator = (val: number | string): string | number => {
         if (typeof val === "number" && isFloat(val)) {
            return val.toString().replace(/\.(?=[^.]*$)/, _decimalSeparator.current);
         }
         return val;
      };

      const isDecimalSign = (ch: string) => {
         if (_decimal.current && (_decimal.current.test(ch) || isFloat(Number(ch)))) {
            _decimal.current.lastIndex = 0;
            return true;
         }
         return false;
      };

      const getDecimalCharIndexes = (val: string) => {
         let decimalCharIndex = -1;
         let decimalCharIndexWithoutPrefix = -1;

         if (_decimal.current) {
            decimalCharIndex = val.search(_decimal.current);
            _decimal.current.lastIndex = 0;

            let filteredVal = val;
            if (_prefix.current) {
               filteredVal = filteredVal.replace(_prefix.current, "");
            }
            filteredVal = filteredVal.trim().replace(/\s/g, "").replace(_currency.current!, "");

            decimalCharIndexWithoutPrefix = filteredVal.search(_decimal.current);
            _decimal.current.lastIndex = 0;
         }

         return { decimalCharIndex, decimalCharIndexWithoutPrefix };
      };

      const getCharIndexes = (val: string) => {
         let decimalCharIndex = -1;
         let minusCharIndex = -1;
         let suffixCharIndex = -1;
         let currencyCharIndex = -1;

         if (_decimal.current) {
            decimalCharIndex = val.search(_decimal.current);
            _decimal.current.lastIndex = 0;
         }

         if (_minusSign.current) {
            minusCharIndex = val.search(_minusSign.current);
            _minusSign.current.lastIndex = 0;
         }

         if (_suffix.current) {
            suffixCharIndex = val.search(_suffix.current);
            _suffix.current.lastIndex = 0;
         }

         if (_currency.current) {
            currencyCharIndex = val.search(_currency.current);
            if (currencyCharIndex === 0 && prefixChar.current && prefixChar.current.length > 1) {
               currencyCharIndex = prefixChar.current.trim().length;
            }
            _currency.current.lastIndex = 0;
         }

         return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
      };

      const resetRegex = () => {
         if (_numeral.current) _numeral.current.lastIndex = 0;
         if (_decimal.current) _decimal.current.lastIndex = 0;
         if (_group.current) _group.current.lastIndex = 0;
         if (_minusSign.current) _minusSign.current.lastIndex = 0;
      };

      const isNumeralChar = (ch: string) => {
         if (
            ch.length === 1 &&
            ((_numeral.current && _numeral.current.test(ch)) ||
               (_decimal.current && _decimal.current.test(ch)) ||
               (_group.current && _group.current.test(ch)) ||
               (_minusSign.current && _minusSign.current.test(ch)))
         ) {
            resetRegex();
            return true;
         }
         return false;
      };

      const evaluateEmpty = (newValue: number | null | string | undefined) => {
         if ((newValue == null || newValue === "") && !props.allowEmpty) {
            return props.min ?? 0;
         }
         return newValue;
      };

      const validateValueByLimit = (value: number | null | string): number | null => {
         if (value === "-" || value === null || value === "") {
            return null;
         }
         let num = typeof value === "number" ? value : Number(value);
         if (Number.isNaN(num)) {
            return null;
         }
         if (props.min != null && num < props.min) num = props.min;
         if (props.max != null && num > props.max) num = props.max;
         return num;
      };

      const validateValue = (value: number | null | string): number | null => {
         if (value === "-") return null;
         return validateValueByLimit(value);
      };

      const formattedValue = (val: number | null | string | undefined): string => {
         const newVal = evaluateEmpty(val);
         return formatValue(newVal as any);
      };

      const updateModel = (
         event: React.SyntheticEvent<any> | null,
         value: number | null
      ) => {
         const finalValue = value;

         if (props.onValueChange) {
            props.onValueChange({
               originalEvent: event,
               value: finalValue,
               stopPropagation() {
                  event?.stopPropagation();
               },
               preventDefault() {
                  event?.preventDefault();
               },
               target: {
                  name: props.name ?? null,
                  id: props.id ?? null,
                  value: finalValue,
               },
            });
         }

         if (props.onChange && event) {
            props.onChange({ originalEvent: event, value: finalValue });
         }
      };

      const handleOnChange = (
         event: React.SyntheticEvent<any>,
         currentValue: string,
         newValue: number | null
      ) => {
         if (!props.onChange) return;
         const parsedCurrent =
            typeof currentValue === "string" ? (parseValue(currentValue) as number | null) : null;
         const changed = newValue !== parsedCurrent;
         if (changed) {
            props.onChange({ originalEvent: event, value: newValue });
         }
      };

      const concatValues = (val1: string, val2: string): string => {
         if (val1 && val2) {
            const decimalCharIndex = val2.search(_decimal.current!);
            _decimal.current!.lastIndex = 0;

            const newVal1 = replaceDecimalSeparator(val1) as string;
            const base = newVal1.split(_decimal.current!)[0].replace(_suffix.current!, "").trim();

            return decimalCharIndex !== -1 ? base + val2.slice(decimalCharIndex) : val1;
         }
         return val1;
      };

      const getDecimalLength = (value: string): number => {
         if (value) {
            const valueSplit = value.split(_decimal.current!);
            if (valueSplit.length === 2) {
               return valueSplit[1].replace(_suffix.current!, "").length;
            }
         }
         return 0;
      };

      const deleteRange = (value: string, start: number, end: number): string => {
         if (end - start === value.length) {
            return "";
         } else if (start === 0) {
            return value.slice(end);
         } else if (end === value.length) {
            return value.slice(0, start);
         }
         return value.slice(0, start) + value.slice(end);
      };

      const replaceSuffix = (value: string) =>
         value
            ? value
               .replace(_suffix.current!, "")
               .trim()
               .replace(/\s/g, "")
               .replace(_currency.current!, "")
            : value;

      const insertText = (value: string, text: string, start: number, end: number): string => {
         const textSplit = isDecimalSign(text) ? text : text.split(_decimal.current!);

         if (textSplit.length === 2) {
            const local = value.slice(start, end);
            const decimalCharIndex = local.search(_decimal.current!);
            _decimal.current!.lastIndex = 0;

            return decimalCharIndex > 0
               ? value.slice(0, start) + formatValue(text as any) + replaceSuffix(value).slice(end)
               : value || formatValue(text as any);
         }

         if (isDecimalSign(text) && value.length === 0) {
            return formatValue("0." as any);
         }

         if (end - start === value.length) {
            return formatValue(text as any);
         }

         if (start === 0) {
            const suffix = /[A-Za-z]$/.test(value[end]) ? end - 1 : end;
            return text + value.slice(suffix);
         }

         if (end === value.length) {
            return value.slice(0, start) + text;
         }

         const selectionValue = value.slice(start, end);
         const space = /\s$/.test(selectionValue) ? " " : "";
         return value.slice(0, start) + text + space + value.slice(end);
      };

      const evaluateEmptyForUpdate = (
         newValue: number | null | string | undefined
      ): number | null | string | undefined => evaluateEmpty(newValue);

      const updateInput = (
         value: number | null,
         insertedValueStr: string | null,
         operation: string,
         valueStr?: string | null
      ) => {
         insertedValueStr = insertedValueStr || "";

         const inputEl = inputRef.current;
         if (!inputEl) return;

         const inputValue = inputEl.value;
         let newValue = formatValue(value);

         const currentLength = inputValue.length;

         if (newValue !== valueStr && valueStr != null) {
            newValue = concatValues(newValue, valueStr);
         }

         if (currentLength === 0) {
            inputEl.value = newValue;
            inputEl.setSelectionRange(0, 0);

            const index = initCursor();
            const selectionEnd = index + insertedValueStr.length + (isDecimalSign(insertedValueStr) ? 1 : 0);
            inputEl.setSelectionRange(selectionEnd, selectionEnd);
         } else {
            let selectionStart = inputEl.selectionStart ?? 0;
            let selectionEnd = inputEl.selectionEnd ?? 0;

            if (props.maxLength && props.maxLength < newValue.length) {
               return;
            }

            inputEl.value = newValue;
            const newLength = newValue.length;

            if (operation === "range-insert") {
               const startValue = parseValue((inputValue || "").slice(0, selectionStart));
               const startValueStr = startValue != null ? String(startValue) : "";
               const startExpr = startValueStr.split("").join("(" + groupChar.current + ")?");
               const sRegex = new RegExp(startExpr, "g");
               sRegex.test(newValue);

               const tExpr = insertedValueStr.split("").join("(" + groupChar.current + ")?");
               const tRegex = new RegExp(tExpr, "g");
               tRegex.test(newValue.slice(sRegex.lastIndex));

               selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
               inputEl.setSelectionRange(selectionEnd, selectionEnd);
            } else if (newLength === currentLength) {
               if (operation === "insert" || operation === "delete-back-single") {
                  let newSelectionEnd = selectionEnd;
                  if (insertedValueStr === "0") {
                     newSelectionEnd = selectionEnd + 1;
                  } else {
                     newSelectionEnd =
                        newSelectionEnd + Number(isDecimalSign(value as any) || isDecimalSign(insertedValueStr));
                  }
                  inputEl.setSelectionRange(newSelectionEnd, newSelectionEnd);
               } else if (operation === "delete-single") {
                  inputEl.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
               } else if (operation === "delete-range" || operation === "spin") {
                  inputEl.setSelectionRange(selectionEnd, selectionEnd);
               }
            } else if (operation === "delete-back-single") {
               const prevChar = inputValue.charAt(selectionEnd - 1);
               const nextChar = inputValue.charAt(selectionEnd);
               const diff = currentLength - newLength;
               const isGroupChar = _group.current!.test(nextChar);
               if (isGroupChar && diff === 1) {
                  selectionEnd = selectionEnd + 1;
               } else if (!isGroupChar && isNumeralChar(prevChar)) {
                  selectionEnd = selectionEnd + (-1 * diff + 1);
               }
               _group.current!.lastIndex = 0;
               inputEl.setSelectionRange(selectionEnd, selectionEnd);
            } else if (inputValue === "-" && operation === "insert") {
               inputEl.setSelectionRange(0, 0);
               const idx = initCursor();
               const end = idx + insertedValueStr.length + 1;
               inputEl.setSelectionRange(end, end);
            } else {
               selectionEnd = selectionEnd + (newLength - currentLength);
               inputEl.setSelectionRange(selectionEnd, selectionEnd);
            }
         }

         inputEl.setAttribute("aria-valuenow", value == null ? "" : String(value));
      };

      const updateInputValue = (newValue: number | null) => {
         const evaluated = evaluateEmptyForUpdate(newValue) as number | null;
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const current = inputEl.value;
         const formatted = formattedValue(evaluated);

         if (current !== formatted) {
            inputEl.value = formatted;
            inputEl.setAttribute("aria-valuenow", evaluated == null ? "" : String(evaluated));
         }
      };

      const isValueChanged = (currentValue: string, newValue: number | null) => {
         if (newValue == null && currentValue != null) return true;
         if (newValue != null) {
            const parsedCurrent =
               typeof currentValue === "string" ? (parseValue(currentValue) as number | null) : null;
            return newValue !== parsedCurrent;
         }
         return false;
      };

      const updateValue = (
         event: React.SyntheticEvent<any>,
         valueStr: string | null,
         insertedValueStr: string | null,
         operation: string
      ) => {
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const currentValue = inputEl.value;

         if (valueStr != null) {
            const parsed = parseValue(valueStr);
            const newValue = evaluateEmpty(parsed) as number | null;
            const limited = validateValueByLimit(parsed as any);

            updateInput(limited, insertedValueStr, operation, valueStr);
            if (
               event &&
               typeof currentValue === "string" &&
               typeof limited === "number" &&
               isValueChanged(currentValue, limited)
            ) {
               handleOnChange(event, currentValue, limited);
            }

            // update model immediately for spin/insert/delete etc
            updateModel(event, limited);
         }
      };

      const spin = (event: React.SyntheticEvent<any>, dir: 1 | -1) => {
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const step = (props.step ?? 1) * dir;
         const currentValue = (parseValue(inputEl.value) as number | null) ?? 0;
         const newValue = validateValue(addWithPrecision(currentValue, step));
         if (newValue == null) return;

         if (props.maxLength && props.maxLength < formatValue(newValue).length) {
            return;
         }

         // onChange before onValueChange, like Prime
         handleOnChange(event as any, inputEl.value, newValue);
         updateInput(newValue, null, "spin");
         updateModel(event as any, newValue);
      };

      const _repeat = (
         event: React.SyntheticEvent<any>,
         interval: number | null,
         dir: 1 | -1
      ) => {
         const i = interval ?? 500;
         clearTimer();
         timer.current = window.setTimeout(() => {
            _repeat(event, 40, dir);
         }, i) as any;
         spin(event, dir);
      };

      const insert = (
         event: React.KeyboardEvent<HTMLInputElement> | React.SyntheticEvent<any>,
         text: string,
         sign: { isDecimalSign: boolean; isMinusSign: boolean } = {
            isDecimalSign: false,
            isMinusSign: false,
         }
      ) => {
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const minusCharIndexOnText = text.search(_minusSign.current!);
         _minusSign.current!.lastIndex = 0;

         if (!allowMinusSign() && minusCharIndexOnText !== -1) {
            return;
         }

         let selectionStart = inputEl.selectionStart ?? 0;
         let selectionEnd = inputEl.selectionEnd ?? 0;
         const inputValue = inputEl.value.trim();
         const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } =
            getCharIndexes(inputValue);
         const maxFractionDigits = numberFormat.current?.resolvedOptions().maximumFractionDigits ?? 0;
         const hasBoundOrAffix = !!(props.min || props.max || props.suffix || props.prefix);
         let newValueStr: string | null = null;

         if (sign.isMinusSign) {
            const isNewMinusSign = minusCharIndex === -1;
            if (selectionStart === 0 || selectionStart === currencyCharIndex + 1) {
               newValueStr = inputValue;
               if (isNewMinusSign || selectionEnd !== 0) {
                  newValueStr = insertText(inputValue, text, 0, selectionEnd);
               }
               updateValue(event as any, newValueStr, text, "insert");
            }
         } else if (sign.isDecimalSign) {
            if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
               updateValue(event as any, inputValue, text, "insert");
            } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
               newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
               updateValue(event as any, newValueStr, text, "insert");
            } else if (decimalCharIndex === -1 && (maxFractionDigits || props.maxFractionDigits)) {
               const allowedDecimal =
                  inputMode !== "numeric" || (inputMode === "numeric" && hasBoundOrAffix);
               if (allowedDecimal) {
                  newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
                  updateValue(event as any, newValueStr, text, "insert");
               }
            }
         } else {
            const operation = selectionStart !== selectionEnd ? "range-insert" : "insert";
            if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
               if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
                  const charIndex =
                     currencyCharIndex >= selectionStart
                        ? currencyCharIndex - 1
                        : suffixCharIndex >= selectionStart
                           ? suffixCharIndex
                           : inputValue.length;
                  newValueStr =
                     inputValue.slice(0, selectionStart) +
                     text +
                     inputValue.slice(selectionStart + text.length, charIndex) +
                     inputValue.slice(charIndex);
                  updateValue(event as any, newValueStr, text, operation);
               }
            } else {
               newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
               updateValue(event as any, newValueStr, text, operation);
            }
         }
      };

      const initCursor = () => {
         const inputEl = inputRef.current;
         if (!inputEl) return 0;

         let selectionStart = inputEl.selectionStart ?? 0;
         let inputValue = inputEl.value;
         const valueLength = inputValue.length;
         let index: number | null = null;

         const prefixLength = (prefixChar.current || "").length;
         inputValue = inputValue.replace(_prefix.current!, "");
         selectionStart = selectionStart - prefixLength;

         let ch = inputValue.charAt(selectionStart);
         if (isNumeralChar(ch)) {
            return selectionStart + prefixLength;
         }

         // search left
         let i = selectionStart - 1;
         while (i >= 0) {
            ch = inputValue.charAt(i);
            if (isNumeralChar(ch)) {
               index = i + prefixLength;
               break;
            }
            i--;
         }

         if (index != null) {
            inputEl.setSelectionRange(index + 1, index + 1);
         } else {
            i = selectionStart;
            while (i < valueLength) {
               ch = inputValue.charAt(i);
               if (isNumeralChar(ch)) {
                  index = i + prefixLength;
                  break;
               }
               i++;
            }
            if (index != null) {
               inputEl.setSelectionRange(index, index);
            }
         }

         return index ?? 0;
      };

      const onInputPointerDown = () => {
         isFocusedByClick.current = true;
      };

      const onInputClick = () => {
         initCursor();
      };

      const onInput = (event: React.FormEvent<HTMLInputElement>) => {
         if (props.disabled || props.readOnly) return;

         if (utilsIsSpecialChar.current) {
            event.currentTarget.value = lastValue.current;
            utilsIsSpecialChar.current = false;
         }

         // Chrome accent-dead fix is in nativeEvent.data; we can skip deep check here
      };

      // track special char for alt/ctrl/meta + keys
      const utilsIsSpecialChar = React.useRef(false);

      const onInputAndroidKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
         const isAndroid = /Android/i.test(navigator.userAgent);
         if (!isAndroid || props.disabled || props.readOnly) return;

         props.onKeyUp?.(event);

         if (event.defaultPrevented) return;

         const code = event.which || event.keyCode;
         if (code !== 13) {
            event.preventDefault();
         }

         const ch = String.fromCharCode(code);
         const decimal = isDecimalSign(ch);
         const minus = isMinusSign(ch);

         if ((code >= 48 && code <= 57) || minus || decimal) {
            insert(event, ch, { isDecimalSign: decimal, isMinusSign: minus });
         } else {
            const inputVal = (event.target as HTMLInputElement).value;
            updateValue(event, inputVal, null, "delete-single");
         }
      };

      const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
         if (props.disabled || props.readOnly) return;

         if (event.altKey || event.ctrlKey || event.metaKey) {
            // cut is treated as normal char
            if (event.key.toLowerCase() === "x" && (event.ctrlKey || event.metaKey)) {
               utilsIsSpecialChar.current = false;
            } else {
               utilsIsSpecialChar.current = true;
            }
            return;
         }

         props.onKeyDown?.(event);

         if (event.defaultPrevented) return;

         const inputEl = event.currentTarget;
         lastValue.current = inputEl.value;

         const isAndroid = /Android/i.test(navigator.userAgent);
         if (isAndroid) return;

         let selectionStart = inputEl.selectionStart ?? 0;
         let selectionEnd = inputEl.selectionEnd ?? 0;
         const inputValue = inputEl.value;
         let newValueStr: string | null = null;

         switch (event.code) {
            case "ArrowUp":
               spin(event, 1);
               event.preventDefault();
               break;
            case "ArrowDown":
               spin(event, -1);
               event.preventDefault();
               break;
            case "ArrowLeft": {
               const charPrev = inputValue.charAt(selectionStart - 1);
               if (!isNumeralChar(charPrev)) {
                  event.preventDefault();
               }
               break;
            }
            case "ArrowRight": {
               const charNext = inputValue.charAt(selectionStart);
               if (!isNumeralChar(charNext)) {
                  event.preventDefault();
               }
               break;
            }
            case "Tab":
            case "Enter":
            case "NumpadEnter": {
               const parsedVal = validateValue(parseValue(inputValue) as any);
               inputRef.current!.value = formatValue(parsedVal as any);
               inputRef.current!.setAttribute("aria-valuenow", parsedVal == null ? "" : String(parsedVal));
               updateModel(event, parsedVal);
               break;
            }
            case "Backspace": {
               event.preventDefault();
               if (selectionStart === selectionEnd) {
                  const deleteChar = inputValue.charAt(selectionStart - 1);
                  if (isNumeralChar(deleteChar)) {
                     const {
                        decimalCharIndex,
                        decimalCharIndexWithoutPrefix,
                     } = getDecimalCharIndexes(inputValue);
                     const decimalLength = getDecimalLength(inputValue);
                     if (_group.current!.test(deleteChar)) {
                        _group.current!.lastIndex = 0;
                        newValueStr =
                           inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                     } else if (_decimal.current!.test(deleteChar)) {
                        _decimal.current!.lastIndex = 0;
                        if (decimalLength) {
                           inputRef.current!.setSelectionRange(selectionStart - 1, selectionStart - 1);
                        } else {
                           newValueStr =
                              inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                     } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                        const insertedText =
                           isDecimalMode() && (props.minFractionDigits || 0) < decimalLength ? "" : "0";
                        newValueStr =
                           inputValue.slice(0, selectionStart - 1) +
                           insertedText +
                           inputValue.slice(selectionStart);
                     } else if (decimalCharIndexWithoutPrefix === 1) {
                        newValueStr =
                           inputValue.slice(0, selectionStart - 1) +
                           "0" +
                           inputValue.slice(selectionStart);
                        newValueStr = (parseValue(newValueStr) as number) > 0 ? newValueStr : "";
                     } else {
                        newValueStr =
                           inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                     }
                  } else if (_currency.current!.test(deleteChar)) {
                     const {
                        minusCharIndex,
                        currencyCharIndex,
                     } = getCharIndexes(inputValue);
                     if (minusCharIndex === currencyCharIndex - 1) {
                        newValueStr =
                           inputValue.slice(0, minusCharIndex) + inputValue.slice(selectionStart);
                     }
                  }
                  updateValue(event, newValueStr, null, "delete-single");
               } else {
                  newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
                  updateValue(event, newValueStr, null, "delete-range");
               }
               break;
            }
            case "Delete": {
               event.preventDefault();
               if (selectionStart === selectionEnd) {
                  const deleteChar = inputValue.charAt(selectionStart);
                  const {
                     decimalCharIndex,
                     decimalCharIndexWithoutPrefix,
                  } = getDecimalCharIndexes(inputValue);
                  if (isNumeralChar(deleteChar)) {
                     const decimalLength = getDecimalLength(inputValue);
                     if (_group.current!.test(deleteChar)) {
                        _group.current!.lastIndex = 0;
                        newValueStr =
                           inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                     } else if (_decimal.current!.test(deleteChar)) {
                        _decimal.current!.lastIndex = 0;
                        if (decimalLength) {
                           inputRef.current!.setSelectionRange(selectionStart + 1, selectionStart + 1);
                        } else {
                           newValueStr =
                              inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                        }
                     } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                        const insertedText =
                           isDecimalMode() && (props.minFractionDigits || 0) < decimalLength ? "" : "0";
                        newValueStr =
                           inputValue.slice(0, selectionStart) +
                           insertedText +
                           inputValue.slice(selectionStart + 1);
                     } else if (decimalCharIndexWithoutPrefix === 1) {
                        newValueStr =
                           inputValue.slice(0, selectionStart) +
                           "0" +
                           inputValue.slice(selectionStart + 1);
                        newValueStr = (parseValue(newValueStr) as number) > 0 ? newValueStr : "";
                     } else {
                        newValueStr =
                           inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                     }
                  }
                  updateValue(event, newValueStr, null, "delete-back-single");
               } else {
                  newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
                  updateValue(event, newValueStr, null, "delete-range");
               }
               break;
            }
            case "End":
               event.preventDefault();
               if (props.max != null) {
                  updateModel(event, props.max);
                  updateInputValue(props.max);
               }
               break;
            case "Home":
               event.preventDefault();
               if (props.min != null) {
                  updateModel(event, props.min);
                  updateInputValue(props.min);
               }
               break;
            default: {
               event.preventDefault();
               let ch = event.key;
               if (!ch) break;

               if (ch === ".") {
                  ch = _decimalSeparator.current;
               }

               const decimal = isDecimalSign(ch);
               const minus = isMinusSign(ch);
               if ((ch >= "0" && ch <= "9") || minus || decimal) {
                  insert(event, ch, { isDecimalSign: decimal, isMinusSign: minus });
               }
               break;
            }
         }
      };

      const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
         event.preventDefault();
         if (props.disabled || props.readOnly) return;

         const data = (event.clipboardData || (window as any).clipboardData).getData("Text");
         if (!data) return;

         const filteredData = parseValue(data);
         if (filteredData != null) {
            if (typeof filteredData === "number" && isFloat(filteredData)) {
               const formatted = formatValue(filteredData);
               if (inputRef.current) {
                  inputRef.current.value = formatted;
               }
               updateModel(event, filteredData);
            } else {
               insert(event, String(filteredData));
            }
         }
      };

      const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
         setFocusedState(true);
         props.onFocus?.(event);

         if ((props.suffix || props.currency || props.prefix) && inputRef.current && !isFocusedByClick.current) {
            const inputValue = inputRef.current.value;
            const prefixLength = (prefixChar.current || "").length;
            const suffixLength = (suffixChar.current || "").length;
            const end = inputValue.length === 0 ? 0 : inputValue.length - suffixLength;
            inputRef.current.setSelectionRange(prefixLength, end);
         }
      };

      const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
         setFocusedState(false);
         isFocusedByClick.current = false;

         if (inputRef.current) {
            const currentValue = inputRef.current.value;
            if (isValueChanged(currentValue, props.value ?? null)) {
               const newValue = validateValue(parseValue(currentValue) as any);
               updateInputValue(newValue);
               updateModel(event, newValue);
            }
         }

         props.onBlur?.(event);
      };

      const changeValue = () => {
         const val = validateValueByLimit(props.value as any);
         updateInputValue(props.format ? (val as any) : (replaceDecimalSeparator(val as any) as any));
         const newValue = validateValue(props.value as any);
         if (props.value != null && props.value !== newValue) {
            updateModel(null, newValue);
         }
      };

      React.useImperativeHandle(ref, () => inputRef.current as InputRef);

      // attach provided inputRef
      React.useEffect(() => {
         if (props.inputRef) {
            if (typeof props.inputRef === "function") {
               props.inputRef(inputRef.current);
            } else {
               (props.inputRef as React.MutableRefObject<InputRef | null>).current =
                  inputRef.current;
            }
         }
      }, [props.inputRef]);

      // unmount cleanup
      React.useEffect(
         () => () => {
            clearTimer();
         },
         []
      );

      // mount init
      React.useEffect(() => {
         constructParser();
         const newValue = validateValue(props.value as any);
         if (props.value != null && props.value !== newValue) {
            updateModel(null, newValue);
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      // update on locale/options changes
      React.useEffect(() => {
         constructParser();
         changeValue();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [
         _locale,
         props.locale,
         props.localeMatcher,
         props.mode,
         props.currency,
         props.currencyDisplay,
         props.useGrouping,
         props.minFractionDigits,
         props.maxFractionDigits,
         props.suffix,
         props.prefix,
      ]);

      // update on value changes
      React.useEffect(() => {
         changeValue();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.value]);

      // disable timer if disabled
      React.useEffect(() => {
         if (props.disabled) clearTimer();
      }, [props.disabled]);

      // ---- render ----

      const inputClassName = [
         props.inputClassName,
         props.invalid ? "p-invalid" : undefined,
      ]
         .filter(Boolean)
         .join(" ");

      const valueToRender = formattedValue(props.value ?? null);

      // Destructure once near the top of your render/component:
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

         // anything you *don’t* want to pass down can be pulled out here too
         // e.g. internal-only props

         ...passThroughProps // everything else goes straight to ShadcnTextVariant
      } = props;

      return (
         //@ts-ignore
         <Input
            value={value as any}
            ref={inputRef}
            // 1. forward all “normal” input props, aria props, etc.
            {...passThroughProps}

            // 2. override / shape the ones we control
            id={inputId ?? props.id}
            style={inputStyle ?? props.style}
            role="spinbutton"
            className={inputClassName || props.className}
            defaultValue={valueToRender}
            type={props.type ?? "text"}
            inputMode={inputMode}

            // 3. internal event handlers (your logic wins over anything from props)
            onKeyDown={onInputKeyDown}
            onKeyPress={onInputAndroidKey}
            onInput={onInput}
            onClick={onInputClick}
            onPointerDown={onInputPointerDown}
            onBlur={onInputBlur}
            onFocus={onInputFocus}
            onPaste={onPaste}

            // 4. controls / adornments
            leadingControl={leadingControl}
            trailingControl={trailingControl}
            leadingControlClassName={leadingControlClassName}
            trailingControlClassName={trailingControlClassName}
            icon={icon}
            iconGap={iconGap}
         />
      );
   })
);

InputNumber.displayName = "InputNumber";