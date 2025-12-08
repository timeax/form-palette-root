import { PhoneCountry } from "@/presets/shadcn-variants/phone";

// e.g. src/lib/get-global-countries.ts
let cachedCountries: PhoneCountry[] | null = null;

const DEFAULT_COUNTRIES: PhoneCountry[] = [
   {
      code: "NG",
      label: "Nigeria",
      dial: "234",
      mask: "999 999 9999",
      flag: "🇳🇬",
   },
   {
      code: "US",
      label: "United States",
      dial: "1",
      mask: "(999) 999-9999",
      flag: "🇺🇸",
   },
   {
      code: "GB",
      label: "United Kingdom",
      dial: "44",
      mask: "9999 999 999",
      flag: "🇬🇧",
   },
];

cachedCountries = DEFAULT_COUNTRIES;
let validatedOnce = false;

function isPhoneCountry(value: unknown): value is PhoneCountry {
   if (!value || typeof value !== "object") return false;

   const v = value as Record<string, unknown>;

   return (
      typeof v.code === "string" &&
      typeof v.label === "string" &&
      typeof v.dial === "string" &&
      typeof v.mask === "string"
      // flag is optional & can be anything React can render, so we don't
      // validate it beyond existence.
   );
}

export function getGlobalCountryList(): PhoneCountry[] {
   // If we've already validated & cached, just return it.
   if (cachedCountries) return cachedCountries;

   if (typeof window === "undefined") {
      cachedCountries = [];
      return cachedCountries;
   }

   const raw = window["form-palette"]?.countries;

   if (!Array.isArray(raw)) {
      if (!validatedOnce && process.env.NODE_ENV !== "production") {
         console.warn(
            "['form-palette'] window.'form-palette'.countries is not an array:",
            raw,
         );
      }
      validatedOnce = true;
      cachedCountries = [];
      return cachedCountries;
   }

   const result: PhoneCountry[] = [];

   for (const item of raw) {
      if (isPhoneCountry(item)) {
         result.push(item);
      } else if (process.env.NODE_ENV !== "production") {
         console.warn(
            "['form-palette'] Ignoring invalid PhoneCountry entry:",
            item,
         );
      }
   }

   validatedOnce = true;
   cachedCountries = result;
   return result;
}