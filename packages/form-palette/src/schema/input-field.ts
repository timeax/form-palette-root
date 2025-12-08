// src/schema/input-field.ts

import type { FieldSize, FieldDensity } from "@/variants/shared";

/**
 * Result type for validation hooks.
 *
 * Used by:
 * - variant modules (`validate`)
 * - per-field `onValidate` (InputField)
 */
export type ValidateResult =
    | boolean // false = invalid, true = OK
    | string // one error message
    | string[] // multiple messages (first is used for display)
    | null
    | void; // null/void treated as "OK"

/**
 * Placement of the main label relative to the field control.
 *
 * This is a macro layout decision: where the label block lives
 * compared to the input/control block.
 */
export type LabelPlacement = "top" | "left" | "right" | "hidden";

/**
 * Shared placement for helper slots relative to their *root*.
 *
 * Example:
 *  - "above" → above the label root or input root
 *  - "below" → below the label root or input root
 *  - "left"  → left of the label root or input root
 *  - "right" → right of the label root or input root
 *  - "hidden" → not rendered
 */
export type SlotPlacement = "left" | "right" | "above" | "below" | "hidden";

/**
 * Placement of the sublabel relative to its root block.
 */
export type SublabelPlacement = SlotPlacement;

/**
 * Placement for the longer description block.
 */
export type DescriptionPlacement = SlotPlacement;

/**
 * Placement for helper text (typically small, subtle text).
 */
export type HelpTextPlacement = SlotPlacement;

/**
 * Placement for explicit error text (visual error copy).
 */
export type ErrorTextPlacement = SlotPlacement;

/**
 * Registry of all logical "slots" a field can render.
 *
 * Hosts can extend this via declaration merging, e.g.:
 *
 *   declare module "@/schema/input-field" {
 *     interface FieldSlots {
 *       charCounter: true;
 *     }
 *   }
 */
export interface FieldSlots {
    /** The main label text. */
    label: true;
    /** Optional smaller label text. */
    sublabel: true;
    /** Longer, usually multi-line description. */
    description: true;
    /** Small helper text, usually subtle. */
    helpText: true;
    /** Error text (validation message) when present. */
    errorText: true;
    /** The actual control/input element. */
    input: true;
    /**tags */
    tags: true;
}

/**
 * Registry of logical "roots" / anchor blocks.
 *
 * Other slots are positioned relative to one of these.
 */
export interface FieldRoots {
    /** Label root block. */
    label: true;
    /** Input/control root block. */
    input: true;
}

export type FieldSlotId = keyof FieldSlots;
export type FieldRootId = keyof FieldRoots;

/**
 * Map of which root each *non-root* slot belongs to.
 *
 * Example:
 *   relativeRoots: {
 *     sublabel: "label",
 *     description: "input",
 *     helpText: "input",
 *     errorText: "input",
 *   }
 */
export type RelativeRootsMap = Partial<
    Record<
        Exclude<FieldSlotId, FieldRootId>, // non-root slots only
        FieldRootId
    >
>;

/**
 * Relative ordering of *non-root* slots per root.
 *
 * This is *not* about placement; it only decides "who comes first"
 * when multiple slots share the same:
 *   - root (label/input), and
 *   - placement (above/below/left/right)
 *
 * Example:
 *   ordering: {
 *     input: ["errorText", "description", "helpText"],
 *   }
 *
 * If description and helpText are both "below" the input, then the
 * above config means:
 *   - errorText (below input) first,
 *   - then description (below input),
 *   - then helpText (below input).
 */
export type FieldOrdering = Partial<
    Record<FieldRootId, Exclude<FieldSlotId, FieldRootId>[]>
>;

/**
 * Layout defaults for a field/variant.
 *
 * Variants can provide these as defaults; InputField merges them
 * with per-field overrides.
 *
 * The high-level placement props remain the main public API.
 * `relativeRoots` and `ordering` provide a lower-level layout graph
 * that InputField can use to render slots relative to "label" or
 * "input" in a predictable order.
 */
export interface FieldLayoutConfig {
    /**
     * Where to render the main label relative to the control.
     */
    labelPlacement?: LabelPlacement;

    /**
     * Where to render the sublabel relative to its root.
     */
    sublabelPlacement?: SublabelPlacement;

    /**
     * Where to render the description block relative to its root.
     */
    descriptionPlacement?: DescriptionPlacement;

    /**
     * Where to render helper text relative to its root.
     */
    helpTextPlacement?: HelpTextPlacement;

    /**
     * Where to render error text (if any) relative to its root.
     */
    errorTextPlacement?: ErrorTextPlacement;

    /**Where to render the tags (if any) relative to ites root */
    tagPlacement?: SlotPlacement;
    /**
     * Hint that the field should render inline with other controls.
     */
    inline?: boolean;

    /**
     * Hint that the field should stretch to the full available width.
     */
    fullWidth?: boolean;

    /**
     * Optional default size/density hints.
     *
     * These are advisory; variants/presets may override them.
     */
    defaultSize?: FieldSize;
    defaultDensity?: FieldDensity;

    /**
     * Which root each non-root slot is attached to.
     *
     * If omitted, InputField can infer reasonable defaults, e.g.:
     * - sublabel     → "label"
     * - description  → "input"
     * - helpText     → "input"
     * - errorText    → "input"
     */
    relativeRoots?: RelativeRootsMap;

    /**
     * Relative ordering of non-root slots per root.
     *
     * Used only when multiple slots share the same
     * root + placement combination.
     */
    ordering?: FieldOrdering;
}

/**
 * Effective layout for a field after merging:
 * - variant defaults, and
 * - per-field overrides.
 */
export interface EffectiveFieldLayout extends FieldLayoutConfig {
    /**
     * Concrete size/density after merging defaults + overrides.
     */
    size?: FieldSize;
    density?: FieldDensity;
}

/**
 * Context passed to a variant's layout resolver.
 *
 * - `defaults`: layout defaults defined by the variant module.
 * - `overrides`: only the layout keys explicitly set on <InputField />.
 * - `props`: the raw <InputField /> props for this field.
 *
 * The resolver MUST respect host overrides: if a key is present in
 * `overrides`, it should not change it.
 */
export interface LayoutResolveContext<T = unknown> {
    defaults: FieldLayoutConfig;
    overrides: Partial<FieldLayoutConfig>;
    props: T;
}

/**
 * Variant-level layout resolver.
 *
 * This allows variants to implement mapping rules such as:
 * - "if labelPlacement is left ⇒ inline=true, error below, etc."
 * while still allowing host overrides to win.
 *
 * Variants may also fill in `relativeRoots` and `ordering` to define
 * how slots are attached to "label" vs "input" and in what relative
 * order they should render.
 */
export type LayoutResolver<T = unknown> = (ctx: LayoutResolveContext<T>) => FieldLayoutConfig;