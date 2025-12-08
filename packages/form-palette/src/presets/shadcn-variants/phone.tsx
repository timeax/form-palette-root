// src/presets/shadcn-variants/phone.tsx

import * as React from "react";

import type { VariantModule } from "@/schema/variant";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import {
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem,
} from "@/presets/ui/select";
import { cn } from "@/lib/utils";
import { getGlobalCountryList } from "@/lib/get-global-countries";

type BaseProps = VariantBaseProps<string | undefined>;

/**
 * Single-country phone config.
 *
 * - code: ISO 3166-1 alpha-2 ("NG", "US", "GB", ...)
 * - dial: dial code without "+" ("234", "1", "44", ...)
 * - mask: NATIONAL portion mask only (no dial), e.g. "999 999 9999"
 */
export interface PhoneCountry {
   code: string;
   label: string;
   dial: string;
   mask: string;
   flag?: React.ReactNode;
}

/**
 * How the variant emits the form value.
 *
 * - "masked"  → "+234 801 234 5678"
 * - "e164"    → "2348012345678"   (dial + national digits, no "+")
 * - "national"→ "8012345678"
 */
export type PhoneValueMode = "masked" | "e164" | "national";

export interface PhoneSpecificProps {
   countries?: PhoneCountry[];
   defaultCountry?: string;
   onCountryChange?: (country: PhoneCountry) => void;

   showCountry?: boolean;
   countryPlaceholder?: string;
   showFlag?: boolean;
   showSelectedLabel?: boolean;
   showSelectedDial?: boolean;
   showDialInList?: boolean;

   /**
    * Controls how the emitted value is shaped.
    *
    * Default mirrors legacy autoUnmask=true + emitE164=true → "e164".
    */
   valueMode?: PhoneValueMode;

   /**
    * When true, the national mask keeps placeholder characters
    * for not-yet-filled positions. When false, trailing mask
    * fragments are omitted.
    */
   keepCharPositions?: boolean;

   /**
    * Style hooks for the internal country selector.
    */
   countrySelectClassName?: string;
   countryTriggerClassName?: string;
   countryValueClassName?: string;
   countryContentClassName?: string;
   countryItemClassName?: string;
}

// We still *type* against ShadcnTextVariantProps so the phone variant exposes
// the same visual/text props (size, density, icon props, etc.), but we don't
// use the component itself anymore.
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   // We control these for phone behaviour
   "type" | "inputMode" | "leadingControl" | "value" | "onValue"
>;

/**
 * Full props for the phone variant as seen by the form runtime.
 *
 * - Keeps the same `value`/`onValue` contract as other variants.
 * - Inherits visual/behavioural text props (size, density, className, etc.).
 * - Adds phone-specific configuration (countries, valueMode, etc.).
 */
export type ShadcnPhoneVariantProps = TextUiProps &
   PhoneSpecificProps &
   Pick<BaseProps, "value" | "onValue">;

// ———————————————————————————————
// Defaults
// ———————————————————————————————



// ———————————————————————————————
// Mask helpers (lightweight legacy port)
// ———————————————————————————————

const TOKEN_CHARS = new Set(["9", "a", "*"] as const);

interface CompiledMask {
   pattern: string;
   placeholderChar: string;
}

/**
 * Phone only ever really uses digit masks, so we keep this compact.
 */
function compileMask(pattern: string, placeholderChar = "_"): CompiledMask {
   return { pattern, placeholderChar };
}

/**
 * Apply a simple token-based mask:
 * - '9' → digit
 * - 'a' → letter
 * - '*' → alphanumeric
 *
 * `keepCharPositions` keeps literal chars/placeholders even when not filled.
 */
function applyMask(
   mask: CompiledMask,
   raw: string,
   keepCharPositions: boolean,
): string {
   const { pattern, placeholderChar } = mask;
   let result = "";
   let rawIndex = 0;
   const len = pattern.length;

   const hasTokenAhead = (pos: number): boolean => {
      for (let j = pos + 1; j < len; j++) {
         if (TOKEN_CHARS.has(pattern[j] as any)) return true;
      }
      return false;
   };

   for (let i = 0; i < len; i++) {
      const ch = pattern[i];
      const isToken = TOKEN_CHARS.has(ch as any);

      if (isToken) {
         if (rawIndex >= raw.length) {
            if (keepCharPositions) {
               result += placeholderChar;
               continue;
            }
            break;
         }
         const next = raw[rawIndex++];
         result += next;
         continue;
      }

      // Literal character in the mask.
      const rawRemaining = rawIndex < raw.length;
      const tokenAhead = hasTokenAhead(i);

      // No tokens ahead → trailing literal.
      if (!tokenAhead) {
         if (keepCharPositions) {
            result += ch;
            continue;
         }
         break;
      }

      if (rawRemaining) {
         // We still have digits to place → include the literal.
         result += ch;
      } else if (keepCharPositions) {
         // No digits left, but want full skeleton.
         result += ch;
      } else {
         // No digits left, and we don't keep skeleton → stop.
         break;
      }
   }

   return result;
}

/**
 * Strip everything except digits.
 */
function digitsOnly(input: string | undefined | null): string {
   return (input ?? "").replace(/\D+/g, "");
}

// ———————————————————————————————
// Value ↔ display helpers
// ———————————————————————————————

function dialPrefixFor(country: PhoneCountry): string {
   return `+${country.dial} `;
}

/**
 * From any stored value (masked, e164, or national) extract
 * the NATIONAL digits for a given country.
 *
 * Strategy: remove all non-digits, then strip leading dial code
 * if present.
 */
function valueToNationalDigits(
   value: string | undefined,
   country: PhoneCountry,
): string {
   const digits = digitsOnly(value);
   if (!digits) return "";
   if (digits.startsWith(country.dial)) {
      return digits.slice(country.dial.length);
   }
   return digits;
}

/**
 * Build the display string shown in the input for a given value.
 *
 * Always renders "+<dial> " plus an optionally masked national part.
 */
function computeDisplayFromValue(
   value: string | undefined,
   country: PhoneCountry,
   keepCharPositions: boolean,
): string {
   const prefix = dialPrefixFor(country);

   const national = valueToNationalDigits(value, country);
   if (!national) {
      return prefix;
   }

   const mask = compileMask(country.mask);
   const maskedNational = applyMask(mask, national, keepCharPositions);
   if (!maskedNational) {
      return prefix;
   }

   return prefix + maskedNational;
}

/**
 * Given raw user input in the field, compute:
 * - display string (what we show in the input)
 * - next form value (according to valueMode)
 * - nationalDigits (for metadata)
 */
function computeNextFromInput(
   rawInput: string,
   country: PhoneCountry,
   mode: PhoneValueMode,
   keepCharPositions: boolean,
): {
   display: string;
   nextValue: string | undefined;
   nationalDigits: string;
} {
   const prefix = dialPrefixFor(country);
   const allDigits = digitsOnly(rawInput);

   let national = allDigits;
   if (national.startsWith(country.dial)) {
      national = national.slice(country.dial.length);
   }

   const mask = compileMask(country.mask);
   const maskedNational = applyMask(mask, national, keepCharPositions);

   const display =
      national.length === 0 ? prefix : (prefix + maskedNational || prefix);

   let nextValue: string | undefined;
   if (!national.length) {
      nextValue = undefined;
   } else if (mode === "masked") {
      nextValue = display;
   } else if (mode === "e164") {
      nextValue = country.dial + national;
   } else {
      // "national"
      nextValue = national;
   }

   return { display, nextValue, nationalDigits: national };
}

/**
 * When the country changes, re-interpret the existing value's
 * digits into the new country's mask/dial.
 */
function remapToCountry(
   value: string | undefined,
   from: PhoneCountry,
   to: PhoneCountry,
   mode: PhoneValueMode,
   keepCharPositions: boolean,
): { display: string; nextValue: string | undefined } {
   if (!value) {
      const prefix = dialPrefixFor(to);
      return { display: prefix, nextValue: undefined };
   }

   const digitsAll = digitsOnly(value);

   let national = digitsAll;
   if (digitsAll.startsWith(from.dial)) {
      national = digitsAll.slice(from.dial.length);
   }

   const prefix = dialPrefixFor(to);
   const mask = compileMask(to.mask);
   const masked = applyMask(mask, national, keepCharPositions);

   const display =
      national.length === 0 ? prefix : (prefix + masked || prefix);

   let nextValue: string | undefined;
   if (!national.length) {
      nextValue = undefined;
   } else if (mode === "masked") {
      nextValue = display;
   } else if (mode === "e164") {
      nextValue = to.dial + national;
   } else {
      nextValue = national;
   }

   return { display, nextValue };
}

/**
 * If no placeholder is passed, we show the dial prefix plus an
 * underscore-skeleton version of the national mask.
 */
function buildPlaceholder(country: PhoneCountry): string {
   const prefix = dialPrefixFor(country);
   const skeleton = country.mask.replace(/[9a\*]/g, "_");
   return prefix + skeleton;
}

// ———————————————————————————————
// Country select (Shadcn Select)
// ———————————————————————————————

interface CountrySelectProps {
   countries: PhoneCountry[];
   value: string;
   onChange: (code: string) => void;
   showFlag: boolean;
   showSelectedLabel: boolean;
   showSelectedDial: boolean;
   showDialInList: boolean;

   countrySelectClassName?: string;
   countryTriggerClassName?: string;
   countryValueClassName?: string;
   countryContentClassName?: string;
   countryItemClassName?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
   countries,
   value,
   onChange,
   showFlag,
   showSelectedLabel,
   showSelectedDial,
   showDialInList,
   countrySelectClassName,
   countryTriggerClassName,
   countryValueClassName,
   countryContentClassName,
   countryItemClassName,
}) => {
   const selected =
      countries.find((c) => c.code === value) ?? countries[0] ?? null;

   const triggerLabel = selected
      ? [
         showFlag && selected.flag ? selected.flag : null,
         showSelectedDial ? `+${selected.dial}` : null,
         showSelectedLabel ? selected.label : null,
      ]
         .filter(Boolean)
         .join(" ")
      : "";

   return (
      <div className={countrySelectClassName}>
         <Select value={selected?.code ?? ""} onValueChange={onChange}>
            <SelectTrigger
               className={cn(
                  "h-full min-w-18 px-2 focus-visible:ring-0 py-0 shadow-none rounded-none border-l-0 border-t-0 border-b-0 border-r text-xs whitespace-nowrap",
                  countryTriggerClassName,
               )}
            >
               <SelectValue
                  placeholder="Code"
                  className={countryValueClassName}
               >
                  {triggerLabel || selected?.code || "—"}
               </SelectValue>
            </SelectTrigger>
            <SelectContent className={countryContentClassName}>
               {countries.map((c) => {
                  const parts: string[] = [];

                  if (showFlag && c.flag) {
                     parts.push(String(c.flag));
                  }

                  if (showDialInList) {
                     parts.push(`+${c.dial}`);
                  }

                  parts.push(c.label);

                  return (
                     <SelectItem
                        key={c.code}
                        value={c.code}
                        className={countryItemClassName}
                     >
                        {parts.join(" ")}
                     </SelectItem>
                  );
               })}
            </SelectContent>
         </Select>
      </div>
   );
};




// ———————————————————————————————
// Main variant component
// ———————————————————————————————

export const ShadcnPhoneVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnPhoneVariantProps
>(function ShadcnPhoneVariant(props, ref) {
   const {
      countries: countriesProp,
      defaultCountry,
      onCountryChange,
      showCountry = true,
      showFlag = true,
      showSelectedLabel = false,
      showSelectedDial = false,
      showDialInList = true,
      valueMode = "e164",
      keepCharPositions = false,
      value,
      onValue,
      countryPlaceholder: placeholder,
      error,

      countrySelectClassName,
      countryTriggerClassName,
      countryValueClassName,
      countryContentClassName,
      countryItemClassName,

      ...restTextProps
   } = props;

   let DEFAULT_COUNTRIES = getGlobalCountryList();
   const countries =
      countriesProp && countriesProp.length > 0
         ? countriesProp
         : DEFAULT_COUNTRIES;

   const [country, setCountry] = React.useState<PhoneCountry>(() => {
      if (defaultCountry) {
         const found = countries.find((c) => c.code === defaultCountry);
         if (found) return found;
      }
      return countries[0] ?? DEFAULT_COUNTRIES[0];
   });

   // Keep active country in sync if list/default changes.
   React.useEffect(() => {
      setCountry((prev) => {
         if (defaultCountry) {
            const found = countries.find((c) => c.code === defaultCountry);
            if (found) return found;
         }
         const stillThere = countries.find((c) => c.code === prev.code);
         return stillThere ?? countries[0] ?? prev;
      });
   }, [countries, defaultCountry]);

   const [local, setLocal] = React.useState<string>(() =>
      computeDisplayFromValue(value, country, keepCharPositions),
   );

   // Sync local display when external value or country changes.
   React.useEffect(() => {
      setLocal(computeDisplayFromValue(value, country, keepCharPositions));
   }, [value, country, keepCharPositions]);

   const handleInputChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const rawInput = event.target.value ?? "";
         const { display, nextValue, nationalDigits } = computeNextFromInput(
            rawInput,
            country,
            valueMode,
            keepCharPositions,
         );

         setLocal(display);

         if (onValue) {
            const detail: ChangeDetail<{
               country: PhoneCountry;
               nationalDigits: string;
            }> = {
               source: "variant",
               raw: rawInput,
               nativeEvent: event,
               meta: {
                  country,
                  nationalDigits,
               },
            };
            onValue(nextValue, detail);
         }
      },
      [country, valueMode, keepCharPositions, onValue],
   );

   const handleCountryChange = React.useCallback(
      (nextCode: string) => {
         const nextCountry =
            countries.find((c) => c.code === nextCode) ?? countries[0];

         if (!nextCountry) return;

         setCountry(nextCountry);
         onCountryChange?.(nextCountry);

         const { display, nextValue } = remapToCountry(
            value,
            country,
            nextCountry,
            valueMode,
            keepCharPositions,
         );

         setLocal(display);

         if (onValue) {
            const detail: ChangeDetail<{
               from: PhoneCountry;
               to: PhoneCountry;
            }> = {
               source: "variant",
               raw: undefined,
               meta: {
                  from: country,
                  to: nextCountry,
               },
            };
            onValue(nextValue, detail);
         }
      },
      [
         countries,
         country,
         keepCharPositions,
         onCountryChange,
         onValue,
         value,
         valueMode,
      ],
   );

   const effectivePlaceholder =
      placeholder ?? buildPlaceholder(country);

   const leadingControl = showCountry ? (
      <CountrySelect
         countries={countries}
         value={country.code}
         onChange={handleCountryChange}
         showFlag={showFlag}
         showSelectedLabel={showSelectedLabel}
         showSelectedDial={showSelectedDial}
         showDialInList={showDialInList}
         countrySelectClassName={countrySelectClassName}
         countryTriggerClassName={countryTriggerClassName}
         countryValueClassName={countryValueClassName}
         countryContentClassName={countryContentClassName}
         countryItemClassName={countryItemClassName}
      />
   ) : undefined;

   return (
      <Input
         ref={ref}
         {...restTextProps}
         type="tel"
         inputMode="tel"
         value={local}
         onChange={handleInputChange}
         leadingControl={leadingControl}
         placeholder={effectivePlaceholder}
         aria-invalid={error ? "true" : undefined}
      />
   );
});