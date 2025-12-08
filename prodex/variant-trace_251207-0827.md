# Index 

Included Source Files (1)
- [packages/form-palette/src/schema/variant.ts](#1)

---
---
#### 1


` File: packages/form-palette/src/schema/variant.ts`  [↑ Back to top](#index)

```ts
// src/schema/variant.ts

import type { ComponentType } from "react";

import type { Dict, CoreContext } from "@/schema/core";
import type { Field } from "@/schema/field";
import type {
    FieldLayoutConfig,
    LayoutResolver,
    ValidateResult,
} from "@/schema/input-field";
import type { VariantBaseProps } from "@/variants/shared";
import { TextVariantProps } from "@/variants/core/text";
import { ShadcnNumberVariantProps } from "@/presets/shadcn-variants/number";
import { ShadcnPhoneVariantProps } from "@/presets/shadcn-variants/phone";
import { ShadcnColorVariantProps } from "@/presets/shadcn-variants/color";
import { ShadcnPasswordVariantProps } from "@/presets/shadcn-variants/password";
import {
    DateVariantProps,
    ShadcnDateVariantProps,
} from "@/presets/shadcn-variants/date";
import { ShadcnChipsVariantProps } from "@/presets/shadcn-variants/chips";
import { ShadcnTextareaVariantProps } from "@/presets/shadcn-variants/textarea";
import { ShadcnToggleVariantProps } from "@/presets/shadcn-variants/toggle";
import { RadioItem, ShadcnRadioVariantProps } from "@/presets/shadcn-variants/radio";
import { CheckboxVariantPublicValue, ShadcnCheckboxUiProps, ShadcnCheckboxVariantProps, ShadcnCheckboxVariantPublicProps } from "@/presets/shadcn-variants/checkbox";
import { ShadcnSelectVariantProps } from "@/presets/shadcn-variants/select";
import { ShadcnMultiSelectVariantProps } from "@/presets/shadcn-variants/multiselect";
import { SliderValue } from "@/variants/core/slider";
import { ShadcnSliderVariantProps } from "@/presets/shadcn-variants/slider";
import { KeyValueMap, ShadcnKeyValueVariantProps } from "@/presets/shadcn-variants/keyvalue";
import { ShadcnCustomVariantProps } from "@/presets/shadcn-variants/custom";
import { ShadcnTreeSelectVariantProps } from "@/presets/shadcn-variants/treeselect";
import { FileLike, ShadcnFileVariantProps } from "@/presets/shadcn-variants/file";
import { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { SelectVariantProps } from "@/variants/core/select";

/**
 * Helper type for a single variant registry entry.
 *
 * Keeps the shape consistent and easy to extend via declaration merging.
 */
export interface VariantEntry<TValue, TProps> {
    value: TValue;
    props: TProps;
}

/**
 * Base type-level variant registry.
 *
 * This is the **canonical mapping** used by:
 * - InputFieldProps<K>
 * - VariantModule<K>
 *
 * Hosts & presets extend it via declaration merging:
 *
 *   declare module "@/schema/variant" {
 *     interface Variants {
 *       select: VariantEntry<SelectValuePublic, SelectPropsPublic>;
 *     }
 *   }
 */
export interface Variants<H = unknown> {
    /**
     * Built-in "text" variant.
     *
     * Shadcn-based implementation lives in presets/shadcn-variants/text.tsx
     */
    text: VariantEntry<string | undefined, ShadcnTextVariantProps>;

    /**
     * Example scalar variant.
     *
     * You can repurpose this for "custom" or drop it later.
     */
    number: VariantEntry<number | undefined, ShadcnNumberVariantProps>;

    phone: VariantEntry<string | number | undefined, ShadcnPhoneVariantProps>;
    color: VariantEntry<string | undefined, ShadcnColorVariantProps>;
    password: VariantEntry<string | undefined, ShadcnPasswordVariantProps>;

    // Date is modeled as string for now (ISO/whatever your preset uses)
    date: VariantEntry<string | undefined, ShadcnDateVariantProps>;

    chips: VariantEntry<string[] | undefined, ShadcnChipsVariantProps>;
    textarea: VariantEntry<string | undefined, ShadcnTextareaVariantProps>;
    toggle: VariantEntry<boolean | undefined, ShadcnToggleVariantProps>;

    radio: VariantEntry<unknown | undefined, ShadcnRadioVariantProps<unknown, RadioItem<unknown>>>
    checkbox: VariantEntry<CheckboxVariantPublicValue, ShadcnCheckboxVariantPublicProps>
    select: VariantEntry<string | number | undefined, SelectVariantProps>
    'multi-select': VariantEntry<Array<string | number> | undefined, ShadcnMultiSelectVariantProps>,
    slider: VariantEntry<SliderValue, ShadcnSliderVariantProps>
    keyvalue: VariantEntry<KeyValueMap | undefined, ShadcnKeyValueVariantProps>
    custom: VariantEntry<unknown | undefined, ShadcnCustomVariantProps>,
    treeselect: VariantEntry<string | number | undefined, ShadcnTreeSelectVariantProps>,
    file: VariantEntry<FileLike, ShadcnFileVariantProps>
}



/**
 * Union of all variant keys.
 */
export type VariantKey = keyof Variants;

/**
 * Value type for a given variant key.
 *
 * Strongly drives autocomplete:
 * - InputFieldProps<"text"> → TValue = string | undefined
 */
export type VariantValueFor<K extends VariantKey, H = unknown> = Variants<H>[K]["value"];

/**
 * Props type for a given variant key.
 *
 * Strongly drives autocomplete:
 * - InputFieldProps<"text"> → props = TextVariantProps
 */
export type VariantPropsFor<K extends VariantKey, H = unknown> = Variants<H>[K]["props"];

/**
 * Signature for variant-level validation functions.
 */
export type VariantValidateFn<TValue, TProps> = (
    value: TValue | undefined,
    ctx: {
        required?: boolean;
        props: TProps;
        field: Field;
        form: CoreContext<Dict>;
    }
) => ValidateResult;

/**
 * Layout defaults for a variant.
 *
 * This extends FieldLayoutConfig, so it automatically includes:
 * - placement props (labelPlacement, descriptionPlacement, etc.)
 * - layout hints (inline, fullWidth, defaultSize/density)
 * - layout graph (relativeRoots, ordering)
 */
export interface VariantLayoutDefaults extends FieldLayoutConfig { }

/**
 * Runtime module definition for a variant.
 *
 * IMPORTANT:
 * - This is **tied directly** to the registry:
 *     TValue = VariantValueFor<K>
 *     TProps = VariantPropsFor<K>
 *
 *   So if you change the entry in `Variants`, both:
 *     - <InputField variant="..." /> props
 *     - The Variant component in the module
 *   will see the updated types and IntelliSense matches everywhere.
 *
 * - For complex variants (select/multiselect):
 *   you model the relationship via unions in `Variants["select"]`.
 */
export interface VariantModule<K extends VariantKey = VariantKey> {
    /**
     * Unique key for this variant, e.g. "text", "number", "select".
     */
    variant: K;

    /**
     * React component that renders the control.
     *
     * It receives:
     * - VariantBaseProps<VariantValueFor<K>>
     * - VariantPropsFor<K>
     */
    Variant: ComponentType<
        VariantBaseProps<VariantValueFor<K>> & VariantPropsFor<K>
    >;

    /**
     * Optional validation logic specific to this variant.
     */
    validate?: VariantValidateFn<
        VariantValueFor<K>,
        VariantPropsFor<K>
    >;

    /**
     * Optional default layout hints for this variant.
     */
    defaults?: {
        layout?: VariantLayoutDefaults;
    };

    /**
     * Optional smart layout resolver.
     *
     * Must respect host overrides.
     */
    resolveLayout?: LayoutResolver<VariantPropsFor<K>>;

    /**
     * Optional metadata, useful for docs/inspectors.
     */
    meta?: {
        label?: string;
        description?: string;
        tags?: string[];
    };
}

/**
 * Convenience alias when you want to be explicit:
 *
 *   const textModule: VariantModuleFor<"text"> = { ... }
 */
export type VariantModuleFor<K extends VariantKey> = VariantModule<K>;
```


---
*Generated with [Prodex](https://github.com/emxhive/prodex) — Codebase decoded.*
<!-- PRODEx v1.4.5 | 2025-12-07T07:27:19.669Z -->