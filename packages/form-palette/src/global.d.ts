import { PasswordDefinitionMap } from './presets/shadcn-variants/password';
// src/global.d.ts
import { PhoneCountry } from "./presets/shadcn-variants/phone";

declare global {
   interface Window {
      'form-palette'?: {
         countries: PhoneCountry[];
         ruleDefinition: PasswordDefinitionMap;
      };
   }
}

export { };