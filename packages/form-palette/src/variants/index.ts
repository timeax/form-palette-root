// src/variants/index.ts

import {
    registerVariant as _register,
    getVariant as _get,
    listVariants as _list,
} from "@/variants/registry";
import type {
    VariantKey,
    VariantModule,
    VariantValueFor,
    VariantPropsFor,
} from "@/schema/variant";
import { textVariant } from "@/variants/core/text";
import { numberVariant } from "./core/number";
import { PhoneVariantModule } from "./core/phone";
import { ColorVariantModule } from "./core/color";
import passwordVariant from "./core/password";
import { dateVariant } from "./core/date";
import { chipVariant } from "./core/chips";
import { textareaVariant } from "./core/textarea";
import ToggleVariantModule from "./core/toggle";
import { radioVariantModule } from "./core/radio";
import { checkboxModule } from "./core/checkbox";
import { selectModule } from "./core/select";
import multiSelectVariantModule from "./core/multiselect";
import sliderModule from './core/slider'
import { keyValueModule } from "./core/keyvalue";
import customVariant from "./core/custom";
import treeselectModule from "./core/treeselect";
import { fileManagerModule } from "./core/file";
import { toggleGroupModule } from "./core/toggle-group";
import { shadcnEditorVariant } from "@/variants/core/editor";
import { jsonEditorVariant } from "./core/json-editor";

export type { VariantKey, VariantModule, VariantValueFor, VariantPropsFor };
export {
    _register as registerVariant,
    _get as getVariant,
    _list as listVariants,
};
export { textVariant };


const variants = [
    textVariant,
    numberVariant,
    PhoneVariantModule,
    ColorVariantModule,
    passwordVariant,
    dateVariant,
    chipVariant,
    textareaVariant,
    ToggleVariantModule,
    radioVariantModule,
    checkboxModule,
    selectModule,
    multiSelectVariantModule,
    sliderModule,
    keyValueModule,
    customVariant,
    treeselectModule,
    fileManagerModule,
    toggleGroupModule,
    shadcnEditorVariant,
    jsonEditorVariant
]

/**
 * Register all core/built-in variants.
 *
 * Hosts can call this once at bootstrap:
 *
 *   import { registerCoreVariants } from "@timeax/form-palette/variants";
 *   registerCoreVariants();
 */
export function registerCoreVariants(): void {
    variants.forEach(item => _register(item as any))
}

registerCoreVariants();
