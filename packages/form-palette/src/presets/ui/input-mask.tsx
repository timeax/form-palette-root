import * as React from "react";
import { Input } from "@/presets/ui/input";

export interface InputMaskChangeEvent {
   originalEvent: React.SyntheticEvent<HTMLInputElement> | Event | undefined;
   value: string;
   stopPropagation(): void;
   preventDefault(): void;
   target: {
      name?: string;
      id?: string;
      value: string;
   };
}

export interface InputMaskCompleteEvent {
   originalEvent: React.SyntheticEvent<HTMLInputElement> | Event;
   value: string;
}

export interface InputMaskRef {
   focus(): void;
   getElement(): HTMLInputElement | null;
}

export interface InputMaskProps
   extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "onChange" | "value" | "defaultValue"
   > {
   mask: string | null;
   autoClear?: boolean;
   autoFocus?: boolean;
   invalid?: boolean;
   unmask?: boolean;
   slotChar?: string;
   'data-slot'?: string;
   value?: string | null;
   onChange?: (e: InputMaskChangeEvent) => void;
   onComplete?: (e: InputMaskCompleteEvent) => void;
}

const isEmpty = (val: unknown): boolean =>
   val === null || val === undefined || val === "";

const isAndroid = (): boolean =>
   typeof navigator !== "undefined" &&
   /android/i.test(navigator.userAgent || "");

const isIOS = (): boolean =>
   typeof navigator !== "undefined" &&
   /(iphone|ipad|ipod)/i.test(navigator.userAgent || "");

const isChrome = (): boolean =>
   typeof navigator !== "undefined" &&
   /chrome/i.test(navigator.userAgent || "");

const focusEl = (el: HTMLInputElement | null) => {
   if (el && typeof el.focus === "function") {
      el.focus();
   }
};

function useUpdateEffect(effect: React.EffectCallback, deps: React.DependencyList) {
   const mounted = React.useRef(false);

   React.useEffect(() => {
      if (mounted.current) {
         return effect();
      }
      mounted.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, deps);
}

export const InputMask = React.memo(
   React.forwardRef<InputMaskRef, InputMaskProps>((inProps, ref) => {
      // merge defaults with incoming props
      const props = React.useMemo(
         () => ({
            autoClear: true,
            autoFocus: false,
            disabled: false,
            invalid: false,
            readOnly: false,
            required: false,
            slotChar: "_",
            type: "text",
            unmask: false,
            ...inProps,
         }),
         [inProps]
      );

      const elementRef = React.useRef<HTMLInputElement | null>(null);
      const firstNonMaskPos = React.useRef<number | null>(null);
      const lastRequiredNonMaskPos = React.useRef(0);
      const tests = React.useRef<(RegExp | null)[]>([]);
      const buffer = React.useRef<string[]>([]);
      const len = React.useRef(0);
      const oldVal = React.useRef<string | null>(null);
      const focus = React.useRef(false);
      const focusText = React.useRef<string | null>(null);
      const isValueChecked = React.useRef<boolean | null>(null);
      const partialPosition = React.useRef<number | null>(null);
      const defaultBuffer = React.useRef<string | null>(null);
      const caretTimeoutId = React.useRef<number | null>(null);
      const androidChrome = React.useRef(false);

      const caret = (first?: number, last?: number) => {
         let range: any;
         let begin: number | null = null;
         let end: number | null = null;
         const inputEl = elementRef.current;

         if (!inputEl || !inputEl.offsetParent || inputEl !== document.activeElement) {
            return null;
         }

         if (typeof first === "number") {
            begin = first;
            end = typeof last === "number" ? last : begin;

            if (inputEl.setSelectionRange) {
               inputEl.setSelectionRange(begin, end);
            } else if ((inputEl as any).createTextRange) {
               range = (inputEl as any).createTextRange();
               range.collapse(true);
               range.moveEnd("character", end);
               range.moveStart("character", begin);
               range.select();
            }
            //@ts-ignore
         } else if (inputEl.setSelectionRange) {
            begin = inputEl.selectionStart ?? 0;
            end = inputEl.selectionEnd ?? begin;
         } else if ((document as any).selection && (document as any).selection.createRange) {
            range = (document as any).selection.createRange();
            begin = 0 - range.duplicate().moveStart("character", -100000);
            end = begin + range.text.length;
         }

         if (begin === null || end === null) {
            return null;
         }

         return { begin, end };
      };

      const getPlaceholder = React.useCallback(
         (i: number): string => {
            const slotChar = props.slotChar ?? "_";

            if (i < slotChar.length) {
               return slotChar.charAt(i);
            }

            return slotChar.charAt(0);
         },
         [props.slotChar]
      );

      const isCompleted = () => {
         const first = firstNonMaskPos.current ?? 0;

         for (let i = first; i <= lastRequiredNonMaskPos.current; i++) {
            if (tests.current[i] && buffer.current[i] === getPlaceholder(i)) {
               return false;
            }
         }

         return true;
      };

      const getValue = () =>
         props.unmask ? getUnmaskedValue() : elementRef.current?.value ?? "";

      const seekNext = (pos: number) => {
         while (++pos < len.current && !tests.current[pos]) {
            /* loop */
         }
         return pos;
      };

      const seekPrev = (pos: number) => {
         while (--pos >= 0 && !tests.current[pos]) {
            /* loop */
         }
         return pos;
      };

      const shiftL = (begin: number, end: number) => {
         if (begin < 0) {
            return;
         }

         let i: number;
         let j: number;

         for (i = begin, j = seekNext(end); i < len.current; i++) {
            if (tests.current[i]) {
               if (j < len.current && tests.current[i]!.test(buffer.current[j]!)) {
                  buffer.current[i] = buffer.current[j]!;
                  buffer.current[j] = getPlaceholder(j);
               } else {
                  break;
               }

               j = seekNext(j);
            }
         }

         writeBuffer();
         caret(Math.max(firstNonMaskPos.current ?? 0, begin));
      };

      const shiftR = (pos: number) => {
         let i: number;
         let c: string;
         let j: number;
         let t: string;

         for (i = pos, c = getPlaceholder(pos); i < len.current; i++) {
            if (tests.current[i]) {
               j = seekNext(i);
               t = buffer.current[i]!;
               buffer.current[i] = c;
               if (j < len.current && tests.current[j]!.test(t)) {
                  c = t;
               } else {
                  break;
               }
            }
         }
      };

      const clearBuffer = (start: number, end: number) => {
         for (let i = start; i < end && i < len.current; i++) {
            if (tests.current[i]) {
               buffer.current[i] = getPlaceholder(i);
            }
         }
      };

      const writeBuffer = () => {
         if (elementRef.current) {
            elementRef.current.value = buffer.current.join("");
         }
      };

      const checkVal = (allow?: boolean): number => {
         isValueChecked.current = true;

         const test = elementRef.current?.value ?? "";
         let lastMatch = -1;
         let i: number;
         let c: string;
         let pos: number;

         for (i = 0, pos = 0; i < len.current; i++) {
            if (tests.current[i]) {
               buffer.current[i] = getPlaceholder(i);

               while (pos++ < test.length) {
                  c = test.charAt(pos - 1);
                  if (tests.current[i]!.test(c)) {
                     buffer.current[i] = c;
                     lastMatch = i;
                     break;
                  }
               }

               if (pos > test.length) {
                  clearBuffer(i + 1, len.current);
                  break;
               }
            } else {
               if (buffer.current[i] === test.charAt(pos)) {
                  pos++;
               }
               if (i < (partialPosition.current ?? 0)) {
                  lastMatch = i;
               }
            }
         }

         if (allow) {
            writeBuffer();
         } else if (lastMatch + 1 < (partialPosition.current ?? 0)) {
            if (props.autoClear || buffer.current.join("") === defaultBuffer.current) {
               if (elementRef.current && elementRef.current.value) {
                  elementRef.current.value = "";
               }
               clearBuffer(0, len.current);
            } else {
               writeBuffer();
            }
         } else {
            writeBuffer();
            if (elementRef.current) {
               elementRef.current.value = elementRef.current.value.substring(0, lastMatch + 1);
            }
         }

         return partialPosition.current ? i : (firstNonMaskPos.current ?? 0);
      };

      const handleAndroidInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
         const inputEl = elementRef.current;
         if (!inputEl) return;

         const curVal = inputEl.value;
         const pos = caret();
         if (!pos) return;

         if (oldVal.current && oldVal.current.length > curVal.length) {
            // deletion/backspace
            checkVal(true);
            while (pos.begin > 0 && !tests.current[pos.begin - 1]) {
               pos.begin--;
            }
            if (pos.begin === 0) {
               while (
                  pos.begin < (firstNonMaskPos.current ?? 0) &&
                  !tests.current[pos.begin]
               ) {
                  pos.begin++;
               }
            }
            caret(pos.begin, pos.begin);
         } else {
            checkVal(true);
            while (pos.begin < len.current && !tests.current[pos.begin]) {
               pos.begin++;
            }
            caret(pos.begin, pos.begin);
         }

         if (props.onComplete && isCompleted()) {
            props.onComplete({
               originalEvent: e,
               value: getValue(),
            });
         }

         updateModel(e);
      };

      const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
         console.log("InputMask onBlur");
         focus.current = false;
         checkVal();
         updateModel(e);

         if (props.onBlur) {
            props.onBlur(e);
         }

         if (elementRef.current && elementRef.current.value !== focusText.current) {
            const event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, false);
            elementRef.current.dispatchEvent(event);
         }
      };

      const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (props.readOnly) {
            return;
         }

         const k = e.which || e.keyCode;
         let pos: { begin: number; end: number } | null;
         let begin: number;
         let end: number;

         oldVal.current = elementRef.current?.value ?? null;

         // backspace, delete, escape
         if (k === 8 || k === 46 || (isIOS() && k === 127)) {
            pos = caret();
            if (!pos) {
               return;
            }
            begin = pos.begin;
            end = pos.end;

            if (end - begin === 0) {
               begin = k !== 46 ? seekPrev(begin) : (end = seekNext(begin - 1));
               end = k === 46 ? seekNext(end) : end;
            }

            clearBuffer(begin, end);
            shiftL(begin, end - 1);
            updateModel(e as any);
            e.preventDefault();
         } else if (k === 13) {
            // enter
            onBlur(e as any);
            updateModel(e as any);
         } else if (k === 27) {
            // escape
            if (elementRef.current) {
               elementRef.current.value = focusText.current ?? "";
            }
            caret(0, checkVal());
            updateModel(e as any);
            e.preventDefault();
         }
      };

      const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (props.readOnly) {
            return;
         }

         const pos = caret();
         if (!pos) {
            return;
         }

         const k = e.which || e.keyCode;
         let p: number;
         let c: string;
         let next: number;
         let completed = false;

         if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
            return;
         } else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
               clearBuffer(pos.begin, pos.end);
               shiftL(pos.begin, pos.end - 1);
            }

            p = seekNext(pos.begin - 1);
            if (p < len.current) {
               c = String.fromCharCode(k);
               if (tests.current[p] && tests.current[p]!.test(c)) {
                  shiftR(p);
                  buffer.current[p] = c;
                  writeBuffer();

                  next = seekNext(p);
                  if (isAndroid()) {
                     const proxy = () => caret(next);
                     setTimeout(proxy, 0);
                  } else {
                     caret(next);
                  }

                  if (pos.begin <= lastRequiredNonMaskPos.current) {
                     completed = isCompleted();
                  }
               }
            }

            e.preventDefault();
         }

         updateModel(e as any);

         if (props.onComplete && completed) {
            props.onComplete({
               originalEvent: e,
               value: getValue(),
            });
         }
      };

      const getUnmaskedValue = React.useCallback((): string => {
         const unmaskedBuffer: string[] = [];

         for (let i = 0; i < buffer.current.length; i++) {
            const c = buffer.current[i]!;
            if (tests.current[i] && c !== getPlaceholder(i)) {
               unmaskedBuffer.push(c);
            }
         }

         return unmaskedBuffer.join("");
      }, [getPlaceholder]);

      const updateModel = (e?: React.SyntheticEvent<HTMLInputElement>) => {
         if (!props.onChange) return;

         const val = props.unmask ? getUnmaskedValue() : e && (e.target as HTMLInputElement)?.value;

         const normalized = defaultBuffer.current !== val ? (val ?? "") : "";
         console.log("InputMask updateModel:", { val, normalized });
         const payload: InputMaskChangeEvent = {
            originalEvent: e,
            value: normalized,
            stopPropagation: () => {
               (e as any)?.stopPropagation?.();
            },
            preventDefault: () => {
               (e as any)?.preventDefault?.();
            },
            target: {
               name: props.name,
               id: props.id,
               value: normalized,
            },
         };

         props.onChange(payload);
      };

      const updateValue = (allow?: boolean): number | undefined => {
         let pos: number | undefined;

         if (elementRef.current) {
            if (isEmpty(props.value)) {
               elementRef.current.value = "";
            } else {
               elementRef.current.value = props.value ?? "";
               pos = checkVal(allow);
               setTimeout(() => {
                  if (elementRef.current) {
                     writeBuffer();
                     return checkVal(allow);
                  }
               }, 10);
            }

            focusText.current = elementRef.current.value;
         }

         return pos;
      };

      const isValueUpdated = React.useCallback(() => {
         const elVal = elementRef.current?.value ?? "";
         return props.unmask
            ? (props.value ?? "") !== getUnmaskedValue()
            : defaultBuffer.current !== elVal && elVal !== (props.value ?? "");
      }, [props.unmask, props.value, getUnmaskedValue]);

      const init = () => {
         const mask = props.mask;
         if (!mask) return;

         tests.current = [];
         partialPosition.current = mask.length;
         len.current = mask.length;
         firstNonMaskPos.current = null;

         const defs: Record<string, string> = {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]",
         };

         androidChrome.current = isChrome() && isAndroid();
         const maskTokens = mask.split("");

         for (let i = 0; i < maskTokens.length; i++) {
            const c = maskTokens[i]!;

            if (c === "?") {
               len.current--;
               partialPosition.current = i;
            } else if (defs[c]) {
               tests.current.push(new RegExp(defs[c]!));
               if (firstNonMaskPos.current === null) {
                  firstNonMaskPos.current = tests.current.length - 1;
               }
               if (i < (partialPosition.current ?? 0)) {
                  lastRequiredNonMaskPos.current = tests.current.length - 1;
               }
            } else {
               tests.current.push(null);
            }
         }

         buffer.current = [];

         for (let i = 0; i < maskTokens.length; i++) {
            const c = maskTokens[i]!;
            if (c !== "?") {
               if (defs[c]) {
                  buffer.current.push(getPlaceholder(i));
               } else {
                  buffer.current.push(c);
               }
            }
         }

         defaultBuffer.current = buffer.current.join("");
      };

      const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
         console.log("InputMask onFocus");
         if (props.readOnly) {
            return;
         }

         focus.current = true;
         if (caretTimeoutId.current) {
            window.clearTimeout(caretTimeoutId.current);
         }

         let pos: number;

         if (elementRef.current) {
            focusText.current = elementRef.current.value;
         } else {
            focusText.current = "";
         }

         pos = checkVal() || 0;

         caretTimeoutId.current = window.setTimeout(() => {
            if (elementRef.current !== document.activeElement) {
               return;
            }

            writeBuffer();

            if (props.mask && pos === props.mask.replace("?", "").length) {
               caret(0, pos);
            } else {
               caret(pos);
            }
         }, 100);

         if (props.onFocus) {
            props.onFocus(e);
         }
      };

      const handleInputChange = (
         e: React.FormEvent<HTMLInputElement>,
         isOnPaste = false
      ) => {
         if (props.readOnly) {
            return;
         }

         if (!isOnPaste) {
            const pos = checkVal(true);
            caret(pos);
         }

         updateModel(e as any);

         if (props.onComplete && isCompleted()) {
            props.onComplete({
               originalEvent: e,
               value: getValue(),
            });
         }
      };

      const onInput = (event: React.FormEvent<HTMLInputElement>) => {
         androidChrome.current
            ? handleAndroidInput(event as any)
            : handleInputChange(event);
      };

      React.useImperativeHandle(
         ref,
         () => ({
            focus: () => focusEl(elementRef.current),
            getElement: () => elementRef.current,
         }),
         []
      );

      React.useEffect(() => {
         if (!elementRef.current) return;
      }, []);

      React.useEffect(() => {
         init();
         updateValue();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useUpdateEffect(() => {
         init();
         const pos = updateValue(true);
         if (typeof pos === "number") {
            caret(pos);
         }
         if (props.unmask) {
            updateModel();
         }
      }, [props.mask, props.unmask]);

      useUpdateEffect(() => {
         if (isValueUpdated()) {
            updateValue();
         }
      }, [isValueUpdated]);

      const {
         mask,
         autoClear,
         unmask,
         slotChar,
         onChange,
         onComplete,
         value,
         autoFocus,
         onFocus: i,
         onBlur: j,
         onKeyDown: k,
         onKeyPress: l,
         onInput: m,
         className,
         ...restInputProps
      } = props;

      return (
         <input
            ref={elementRef}
            autoFocus={autoFocus}
            id={props.id}
            name={props.name}
            style={props.style}
            className={className}
            placeholder={props.placeholder}
            size={props.size}
            maxLength={props.maxLength}
            tabIndex={props.tabIndex}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onInput={onInput}
            onPaste={(e) => handleInputChange(e, true)}
            {...restInputProps}
         />
      );
   })
);

InputMask.displayName = "InputMask";