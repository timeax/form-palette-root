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
   // 1. If we have a cache, return it.
   if (cachedCountries) return cachedCountries;

   // 2. SSR check: return defaults if on server
   if (typeof window === "undefined") {
      return DEFAULT_COUNTRIES;
   }

   // 3. Check window registry
   const raw = window["form-palette"]?.countries;

   // 4. If window has valid data, use it
   if (Array.isArray(raw) && raw.length > 0) {
      const result: PhoneCountry[] = [];
      for (const item of raw) {
         if (isPhoneCountry(item)) {
            result.push(item);
         }
      }

      // If we found valid items, cache and return them
      if (result.length > 0) {
         cachedCountries = result;
         return result;
      }
   }

   // 5. Fallback to defaults if window was empty or invalid
   cachedCountries = DEFAULT_COUNTRIES;
   return cachedCountries;
}