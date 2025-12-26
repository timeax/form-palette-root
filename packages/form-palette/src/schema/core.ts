// src/schema/core.ts
// noinspection JSUnusedGlobalSymbols,GrazieInspection

import type React from "react";
import type { z } from "zod";

import type {
    Method,
    AdapterResult,
    AdapterKey,
    AdapterSubmit,
    AdapterProps,
} from "./adapter";
import type { ButtonRef, Field } from "./field";
import { FieldRegistry } from "@/core/registry/field-registry";

/**
 * Generic dictionary type used throughout the core.
 *
 * This matches the legacy Dict<T> from the old types.ts.
 */
export type Dict<T = unknown> = Record<string, T>;

/**
 * If a Zod schema is present, infer the values from that schema;
 * otherwise use the fallback V type. Ensured to be a Dict so it
 * can safely be used as CoreContext's generic argument.
 */
export type InferFromSchema<S, V extends Dict> = S extends z.ZodType
    ? z.infer<S> & Dict
    : V;

/**
 * Event object passed to onSubmit, matching the legacy SubmitEvent
 * but kept transport-agnostic. The host decides how route/method/xhr
 * are interpreted and which adapter is used.
 *
 * @template TValues Shape of the outbound data for this submit event.
 */
export type SubmitEvent<TValues extends Dict, K extends AdapterKey> = {
    /**
     * Prevent the default submit behavior.
     *
     * In practice this prevents the core from continuing with its
     * normal submit/prepare flow.
     */
    preventDefault(): void;

    /**
     * Mutate the outbound data just before it is used.
     *
     * The callback may return a new data object or mutate in-place.
     */
    editData(cb: (data: TValues) => TValues | void): void;

    /**
     * Override the config for this adapter submission only.
     *
     * The core itself does not enforce any semantics here; the host
     * is expected to interpret this when wiring submissions.
     */
    setConfig(props: Partial<AdapterProps<K>>): void;
    setConfig(key: keyof AdapterProps<K>, value: any): void;

    /**
     * The button that triggered this submit, if any.
     */
    button?: ButtonRef;

    /**
     * The current outbound data snapshot (after any internal merges).
     */
    readonly formData: TValues;

    /**
     * The core context associated with this submit event.
     */
    form: CoreContext<TValues>;

    /**
     * If set to false, the core will abort the submit flow after
     * this handler returns.
     */
    continue: boolean;
};

/**
 * Shared base props for the core runtime, matching the spirit of
 * the legacy BaseProps, but transport-agnostic.
 *
 * @template V Shape of the underlying value map (pre-schema).
 * @template S Optional Zod schema type.
 */
export type BaseProps<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey,
> = {
    /**
     * Field names that should be ignored when building diffs or snapshots.
     * Useful for excluding secrets like passwords from logs.
     */
    exceptions?: string[];

    /**
     * Whether the core should persist values to the provided valueBag.
     */
    persist?: boolean;

    /**
     * Optional logical name for the core instance.
     */
    name?: string;

    /**
     * If true, a button may be automatically marked as "active" when
     * certain changes occur.
     */
    activateButtonOnChange?: boolean;

    /**
     * Called whenever a field changes.
     *
     * current is the field that changed; options carries any
     * variant-specific metadata.
     */
    onChange?(
        form: CoreContext<InferFromSchema<S, V>>,
        current: Field,
        options: Dict,
    ): void;

    /**
     * Called when the overall values snapshot is considered "updated".
     */
    onUpdate?(values: InferFromSchema<S, V>): void;

    /**
     * If true, onChange may run before certain internal updates.
     */
    changeBefore?: boolean;

    /**
     * Optional ref to the core context instance, for imperative access.
     */
    formRef?: React.MutableRefObject<CoreContext<InferFromSchema<S, V>> | null>;

    /**
     * Initial value bag for hydration / persistence.
     */
    valueBag?: InferFromSchema<S, V>;

    /**
     * Optional hook used to transform a single value as it is being
     * persisted or fed into the core.
     */
    valueFeed?: <K extends keyof InferFromSchema<S, V>>(
        name: K,
        value: InferFromSchema<S, V>[K],
        form: CoreContext<InferFromSchema<S, V>>,
    ) => InferFromSchema<S, V>[K] | undefined;

    /**
     * Called at the end of certain flows (legacy "finish" hook).
     *
     * Receives the core context so you can read values, errors, etc.
     */
    onFinish?(form: CoreContext<InferFromSchema<S, V>>): void;

    /**
     * Called after the core initializes.
     */
    init?(form: CoreContext<InferFromSchema<S, V>>): void;

    /**
     * Intercepts the submit event before the core proceeds.
     *
     * You can:
     * - mutate data,
     * - change route/method/xhr flags,
     * - abort by setting e.continue = false.
     */
    onSubmit?<T extends Dict = InferFromSchema<S, V>>(
        e: SubmitEvent<T, K>,
    ): Promise<void> | void;

    /**
     * Optional Zod schema used for validation and value inference.
     */
    schema?: S;
};

/**
 * Public core props, adapter-centric.
 *
 * - The library defines a built-in 'local' adapter flavour.
 *   AdapterSubmit<'local'> is `{ data: unknown }`.
 * - Hosts can extend the Adapters interface (schema/adapter.ts) to add
 *   their own adapter flavours (axios, inertia, etc.) and then use
 *   those keys here.
 *
 * @template V Shape of the underlying value map (pre-schema).
 * @template S Optional Zod schema type.
 * @template K Adapter key; defaults to 'local'.
 */
export type CoreProps<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
> = BaseProps<V, S, K> &
    AdapterProps<K> & {
        /**
         * Which adapter flavour this core instance should use.
         *
         * - 'local' (default) → library-defined local submission (no URL/method semantics).
         * - extended keys      → host-defined adapters via Adapters augmentation.
         */
        adapter?: K;

        /**
         * Called after a submission completes. The payload type is derived from
         * the selected adapter key via the adapter registry:
         *
         *   AdapterSubmit<'local'> → { data: unknown }
         *   AdapterSubmit<'axios'> → host-defined type, etc.
         */
        onSubmitted?(
            form: CoreContext<InferFromSchema<S, V>>,
            payload: AdapterSubmit<K>,
            resolve?: () => void,
        ): void | Promise<void>;
    };

/**
 * Backwards-compatible alias for legacy naming, if you want it.
 */
export type FormProps<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreProps<V, S, K>;

/**
 * Result of a submit operation: values + validity flag.
 */
export type ValuesResult<V extends Dict> = { values: V; valid: boolean };

/**
 * Query API for fields, similar to DOM helpers but scoped
 * to the current form instance.
 *
 * "id" here refers to the field's groupId.
 */
export interface InputStore {
    /** All registered inputs (with at least one identifier). */
    all(): Field[];

    /** All inputs that have a non-empty name. */
    getAllNamed(): Field[];

    /** All inputs that have a bindId. */
    getAllBound(): Field[];

    /** All inputs that have a groupId. */
    getAllGrouped(): Field[];

    /** First field matching an exact name. */
    getByName(name: string): Field | undefined;

    /** All fields matching an exact name. */
    getAllByName(name: string): Field[];

    /** First field with this groupId. */
    getById(id: string): Field | undefined;

    /** All fields with this groupId. */
    getAllById(id: string): Field[];

    /** First bound field with this bindId (prefers mounted fields). */
    getByBind(id: string): Field | undefined;

    /** All fields that share this bindId. */
    getAllByBind(id: string): Field[];
}

/**
 * Core runtime context, renamed from the legacy FormContext.
 *
 * @template V Shape of the values object produced by this core instance.
 */
export interface CoreContext<V extends Dict> {
    /**
     * Compute the current values snapshot from registered fields.
     */
    values(): V;

    /**
     * Run validation and return the values + validity flag.
     */
    submit(): ValuesResult<V>;

    /**
     * Lookup a field by its binding id.
     */
    getBind(id: string): Field | undefined;

    /**
     * Run validation across fields.
     *
     * @param report If true, fields should update their own error states.
     * @returns true if all fields are valid, false otherwise.
     */
    validate(report?: boolean): boolean;

    /**
     * Register a new field with the core.
     */
    addField(field: Field): void;

    /**
     * Generic internal bucket for arbitrary metadata.
     */
    bucket: Dict;

    /**
     * Set a single field error or map an error bag.
     */
    error(name: string, msg: string): void;
    error(bag: Record<string, string>): void;

    /**
     * Re-run button control logic (which button is active/disabled etc.).
     */
    controlButton(): void;

    /**
     * Prepare an adapter-backed request.
     *
     * This mirrors the legacy prepare method:
     * - Builds a payload from values + extra.
     * - May run validation / beforeSubmit hooks.
     * - Returns an adapter result or undefined if aborted.
     *
     * The concrete adapter wiring is the host's responsibility.
     */
    prepare(
        type: Method,
        route: string,
        extra?: Partial<V>,
        ignoreForm?: boolean,
        autoErr?: boolean,
    ): Promise<AdapterResult<any> | undefined>;

    /**
     * Persist values to a provided data object, optionally transforming
     * values via the feed function.
     */
    persist(
        data: Partial<V>,
        feed?: (name: string, value: unknown, original: unknown) => unknown,
    ): void;

    /**
     * Imperatively set a single value by field name.
     */
    setValue(name: string, value: unknown): void;

    /**
     * Kick off a submit flow using optional extra data.
     */
    go(data?: Partial<V>, ignoreForm?: boolean): void;

    /**
     * Reset specific inputs by name.
     */
    reset(inputs: string[]): void;

    /**
     * Register the current active button.
     */
    set button(v: ButtonRef);

    /**
     * Force a submit regardless of validation state.
     */
    forceSubmit(): Promise<void>;

    /**
     * All registered fields.
     */
    readonly fields: Field[];

    /**
     * Effective core props at runtime, excluding internal-only fields.
     *
     * Note: the adapter key parameter is erased here (set to any) because
     * the runtime does not need the specific key for structural typing;
     * hosts can still use more precise generics at the component level.
     */
    readonly props: Omit<
        CoreProps<V, z.ZodType | undefined, any>,
        "formRef" | "valueBag"
    >;

    /**
     * Mark a button as active by name.
     */
    setActiveButton(name: string): void;

    /**
     * Return uncaught messages (errors that could not be mapped to a field).
     *
     * Typically used by an error strip component.
     */

    getUncaught(): readonly string[];
    hasUncaughtErrors: number;
    /**
     * Field-query "DOM" for this form.
     *
     * Example:
     *   const email = form.inputs.getByName("email");
     *   const phoneFields = form.inputs.getAllById("phone-group");
     *   const bound = form.inputs.getByBind("shipping");
     */
    inputs: Omit<FieldRegistry, "add" | "remove">;

    /**
     * Checks if the form values have changed
     */
    isDirty(): boolean;
}
