import type { CustomFileLoader, FileItem } from "@/presets/shadcn-variants/file";
import { PasswordDefinitionMap } from "@/presets/shadcn-variants/password";
import { PhoneCountry } from "@/presets/shadcn-variants/phone";

type IconGroup = {
    id: string; // stable key for selection/filtering
    label: string;
    prefixes: string[]; // iconify prefixes to load
};
// 1. Define the shape of your global palette store
export interface PaletteRegistry {
   countries: PhoneCountry[];
   ruleDefinition: PasswordDefinitionMap;
   customLoader: CustomFileLoader;
   getCountries: () => Promise<PhoneCountry[]>;
   formatFileValue: (file: FileItem) => string | undefined;
   iconPicker: {
       groups?: IconGroup[],
       url?: string
   }
   // You can add more keys here later, e.g.:
   // theme?: 'light' | 'dark';
   // locale?: string;
}

// 2. Extend the global Window interface to include your custom key
declare global {
   interface Window {
      "form-palette"?: Partial<PaletteRegistry>;
   }
}

/**
 * Registers a value to the global window['form-palette'] object.
 * Safe to call in SSR environments (it will just no-op).
 */
export function registerPaletteUtil<K extends keyof PaletteRegistry>(
   key: K,
   value: PaletteRegistry[K]
) {
   // SSR Safety check
   if (typeof window === "undefined") return;

   // Initialize the namespace if it doesn't exist
   if (!window["form-palette"]) {
      window["form-palette"] = {};
   }

   // Assign the value
   window["form-palette"][key] = value;
}

/**
 * Retrieves a value from the global window['form-palette'] object.
 * Returns the value if found, otherwise returns the optional defaultValue or undefined.
 */
export function getPaletteUtil<K extends keyof PaletteRegistry>(
   key: K,
   defaultValue?: PaletteRegistry[K]
): PaletteRegistry[K] | undefined {
   // SSR Safety check
   if (typeof window === "undefined") {
      return defaultValue;
   }

   const registry = window["form-palette"];

   // Return the specific key if it exists
   if (registry && key in registry) {
      return registry[key];
   }

   return defaultValue;
}