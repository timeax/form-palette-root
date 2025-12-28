// src/schema/field.ts
// noinspection GrazieInspection

import type { RefObject } from "react";
import { VariantKey } from "@/schema/variant";

/**
 * Imperative handle for a submit button registered with the core.
 *
 * This mirrors the legacy `ButtonRef` interface, but is aligned with the
 * current CoreProvider implementation:
 *
 * - The core will try `setLoading(v)` / `setDisabled(v)` if available.
 * - Otherwise, it will fall back to setting `loading` / `disabled` props.
 */
export interface ButtonRef {
    /**
     * Logical name of the button.
     *
     * Used by the core runtime to track the "active" button
     * and to map behaviours to a specific action.
     */
    name: string;

    /**
     * Loading flag. The core may read or assign this directly if
     * no setter is provided.
     */
    loading?: boolean;

    /**
     * Disabled flag. The core may read or assign this directly if
     * no setter is provided.
     */
    disabled?: boolean;

    /**
     * Optional setter used by the core to toggle loading.
     */
    setLoading?(v: boolean): void;

    /**
     * Optional setter used by the core to toggle disabled state.
     */
    setDisabled?(v: boolean): void;
}

/**
 * Runtime representation of a single field registered with the core.
 *
 * This is a direct, type-safe evolution of the legacy `Field` interface
 * from the old `types.ts`, updated to match the new core + binder flow.
 */
export interface Field {
    /**
     * Primary field name, used in values, error bags, and schema mapping.
     *
     * May be omitted for purely bound/virtual fields that participate in
     * binder flows but are not directly part of the value bag.
     */
    name?: string;

    /**
     * Internal binding identifier.
     *
     * Used by "bound" helpers (observe-bound-field, wait-for-bound-field)
     * to locate shared/aliased fields without going through the name.
     */
    bindId?: string;

    /**
     * Optional explicit binding identifier.
     * Use to bind to a specific field in a nested object that has bindId
     */
    bind?: string;

    /**
     * Ref to the underlying DOM element used for focus/scroll operations.
     *
     * Implementations typically point this at the outer wrapper of the field.
     */
    ref?: RefObject<HTMLElement> | null;

    /**
     * Whether this field is required.
     *
     * Variant-level and schema-level validation may use this.
     */
    required?: boolean;

    /**
     * Current error message for the field.
     *
     * Undefined or empty string means "no error".
     */
    error?: string;

    /**
     * Current value of the field, as seen by the core runtime.
     *
     * For formatted inputs, this may be the formatted representation.
     */
    value?: unknown;

    /**
     * Initial/default value for the field.
     *
     * This is typically the "un-touched" value coming from props or
     * from a persisted value bag.
     */
    defaultValue?: unknown;

    /**
     * Original, unformatted value as first seen by the core.
     *
     * This allows callers to compare "what changed" relative to the
     * original snapshot, independent of any display formatting.
     */
    originalValue?: unknown;

    /**
     * Whether this field is currently performing an async operation
     * (e.g. remote validation).
     */
    loading?: boolean;

    /**
     * Optional group identifier used to group related fields together
     * (e.g. radio groups, segmented inputs).
     */
    groupId?: string;

    /**
     * Optional alias for this field.
     *
     * Aliases allow mapping server error bags or schema keys that do
     * not strictly match the `name` property.
     */
    alias?: string;

    /**
     * Marks this field as the "main" one in a group.
     *
     * Used by some variants/layouts to determine which field drives
     * overall group state.
     */
    main?: boolean;

    /**
     * If true, this field will be ignored when building values or
     * running certain validation flows.
     */
    ignore?: boolean;

    /**
     * Stable unique key (distinct from `name` and `bindId`).
     *
     * Used internally by registries and React lists.
     */
    key?: string;

    /**
     * Shared key for fields that share their value (e.g. custom views
     * over the same underlying data).
     *
     * This is used by the core when building nested objects, e.g.:
     *   shared = "profile", name = "first_name"
     *   ⇒ values.profile.first_name
     */
    shared?: string;

    // ─────────────────────────────────────────────────────────
    // Behaviour hooks (implemented by InputField / variants)
    // ─────────────────────────────────────────────────────────

    /**
     * Run validation for this field.
     *
     * @param report If true, the field should update its own error state;
     *               if false, it may simply return whether it is valid.
     * @returns `true` if the field is currently valid, `false` otherwise.
     */
    validate?(report?: boolean): boolean;

    /**
     * Optional hook used by the core or higher-level utilities to retrieve
     * the current value of the field.
     *
     * If omitted, the core will fall back to the `value` property.
     */
    getValue?(): unknown;

    /**
     * Optional hook used by the core or higher-level utilities to update
     * the current value of the field.
     *
     * If omitted, the core will fall back to mutating the `value` property.
     */
    setValue?(value: unknown): void;

    /**
     * Optional hook used by the core to reset the field back to its
     * default/original value.
     */
    reset?(): void;

    /**
     * Optional hook used by the core to set or clear the field error.
     *
     * If omitted, the core will fall back to assigning the `error` property.
     */
    setError?(message?: string): void;

    /**
     * Optional hook called whenever the field value changes.
     *
     * Used by binder utilities to propagate changes across bound fields.
     *
     * @param value   New value.
     * @param old     Previous value.
     * @param source  Source tag responsible for the change
     *                (e.g. "variant", "util", "paste", "programmatic").
     */
    onChange?(value: unknown, old: unknown, source: string): void;

    /**
     * Optional hook called whenever the field is submitted.
     * @param e
     */
    onSubmit?(e: unknown): any;
    variant: VariantKey
}
