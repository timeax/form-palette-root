# Index 

Included Source Files (112)
- [packages/form-palette/src/core/adapter-registry.ts](#1)
- [packages/form-palette/src/core/bound/bind-host.ts](#2)
- [packages/form-palette/src/core/bound/observe-bound-field.ts](#3)
- [packages/form-palette/src/core/bound/wait-for-bound-field.ts](#4)
- [packages/form-palette/src/core/context.ts](#5)
- [packages/form-palette/src/core/core-provider.tsx](#6)
- [packages/form-palette/src/core/core-root.tsx](#7)
- [packages/form-palette/src/core/core-shell.tsx](#8)
- [packages/form-palette/src/core/errors/error-strip.tsx](#9)
- [packages/form-palette/src/core/errors/index.ts](#10)
- [packages/form-palette/src/core/errors/map-error-bag.ts](#11)
- [packages/form-palette/src/core/errors/map-zod.ts](#12)
- [packages/form-palette/src/core/hooks/use-button.ts](#13)
- [packages/form-palette/src/core/hooks/use-core-context.ts](#14)
- [packages/form-palette/src/core/hooks/use-core.ts](#15)
- [packages/form-palette/src/core/hooks/use-field.ts](#16)
- [packages/form-palette/src/core/hooks/use-optional-field.ts](#17)
- [packages/form-palette/src/core/index.ts](#18)
- [packages/form-palette/src/core/registry/binder-registry.ts](#19)
- [packages/form-palette/src/core/registry/field-registry.ts](#20)
- [packages/form-palette/src/input/input-field.tsx](#21)
- [packages/form-palette/src/input/input-layout-graph.ts](#22)
- [packages/form-palette/src/input/input-props.ts](#23)
- [packages/form-palette/src/lib/get-global-countries.ts](#24)
- [packages/form-palette/src/lib/group-layout.ts](#25)
- [packages/form-palette/src/lib/json-editor/filters.ts](#26)
- [packages/form-palette/src/lib/json-editor/glob.ts](#27)
- [packages/form-palette/src/lib/json-editor/layout.ts](#28)
- [packages/form-palette/src/lib/json-editor/routes.ts](#29)
- [packages/form-palette/src/lib/json-editor/tree.ts](#30)
- [packages/form-palette/src/lib/json-editor/types.ts](#31)
- [packages/form-palette/src/lib/json-editor/utils.ts](#32)
- [packages/form-palette/src/lib/normalise-options.ts](#33)
- [packages/form-palette/src/lib/utils.ts](#34)
- [packages/form-palette/src/presets/shadcn-variants/checkbox.tsx](#35)
- [packages/form-palette/src/presets/shadcn-variants/chips.tsx](#36)
- [packages/form-palette/src/presets/shadcn-variants/color.tsx](#37)
- [packages/form-palette/src/presets/shadcn-variants/custom.tsx](#38)
- [packages/form-palette/src/presets/shadcn-variants/date.tsx](#39)
- [packages/form-palette/src/presets/shadcn-variants/editor.tsx](#40)
- [packages/form-palette/src/presets/shadcn-variants/file.tsx](#41)
- [packages/form-palette/src/presets/shadcn-variants/json-editor/editor.tsx](#42)
- [packages/form-palette/src/presets/shadcn-variants/json-editor/index.tsx](#43)
- [packages/form-palette/src/presets/shadcn-variants/json-editor/main.tsx](#44)
- [packages/form-palette/src/presets/shadcn-variants/json-editor/raw-panel.tsx](#45)
- [packages/form-palette/src/presets/shadcn-variants/json-editor/types.ts](#46)
- [packages/form-palette/src/presets/shadcn-variants/keyvalue.tsx](#47)
- [packages/form-palette/src/presets/shadcn-variants/multiselect.tsx](#48)
- [packages/form-palette/src/presets/shadcn-variants/number.tsx](#49)
- [packages/form-palette/src/presets/shadcn-variants/password.tsx](#50)
- [packages/form-palette/src/presets/shadcn-variants/phone.tsx](#51)
- [packages/form-palette/src/presets/shadcn-variants/radio.tsx](#52)
- [packages/form-palette/src/presets/shadcn-variants/select.tsx](#53)
- [packages/form-palette/src/presets/shadcn-variants/slider.tsx](#54)
- [packages/form-palette/src/presets/shadcn-variants/text.tsx](#55)
- [packages/form-palette/src/presets/shadcn-variants/textarea.tsx](#56)
- [packages/form-palette/src/presets/shadcn-variants/toggle-group.tsx](#57)
- [packages/form-palette/src/presets/shadcn-variants/toggle.tsx](#58)
- [packages/form-palette/src/presets/shadcn-variants/tree-select-types.ts](#59)
- [packages/form-palette/src/presets/shadcn-variants/treeselect.tsx](#60)
- [packages/form-palette/src/presets/ui/badge.tsx](#61)
- [packages/form-palette/src/presets/ui/button.tsx](#62)
- [packages/form-palette/src/presets/ui/calendar.tsx](#63)
- [packages/form-palette/src/presets/ui/checkbox.tsx](#64)
- [packages/form-palette/src/presets/ui/dialog.tsx](#65)
- [packages/form-palette/src/presets/ui/field.tsx](#66)
- [packages/form-palette/src/presets/ui/input-mask.tsx](#67)
- [packages/form-palette/src/presets/ui/input.tsx](#68)
- [packages/form-palette/src/presets/ui/label.tsx](#69)
- [packages/form-palette/src/presets/ui/number.tsx](#70)
- [packages/form-palette/src/presets/ui/popover.tsx](#71)
- [packages/form-palette/src/presets/ui/radio-group.tsx](#72)
- [packages/form-palette/src/presets/ui/scroll-area.tsx](#73)
- [packages/form-palette/src/presets/ui/select.tsx](#74)
- [packages/form-palette/src/presets/ui/separator.tsx](#75)
- [packages/form-palette/src/presets/ui/slider.tsx](#76)
- [packages/form-palette/src/presets/ui/switch.tsx](#77)
- [packages/form-palette/src/presets/ui/textarea.tsx](#78)
- [packages/form-palette/src/presets/ui/time-dropdowns.tsx](#79)
- [packages/form-palette/src/presets/ui/toggle-group.tsx](#80)
- [packages/form-palette/src/presets/ui/toggle.tsx](#81)
- [packages/form-palette/src/presets/ui/tooltip.tsx](#82)
- [packages/form-palette/src/schema/adapter.ts](#83)
- [packages/form-palette/src/schema/core.ts](#84)
- [packages/form-palette/src/schema/field.ts](#85)
- [packages/form-palette/src/schema/input-field.ts](#86)
- [packages/form-palette/src/schema/variant.ts](#87)
- [packages/form-palette/src/variants/core/checkbox.tsx](#88)
- [packages/form-palette/src/variants/core/chips.tsx](#89)
- [packages/form-palette/src/variants/core/color.tsx](#90)
- [packages/form-palette/src/variants/core/custom.tsx](#91)
- [packages/form-palette/src/variants/core/date.tsx](#92)
- [packages/form-palette/src/variants/core/editor.ts](#93)
- [packages/form-palette/src/variants/core/file.tsx](#94)
- [packages/form-palette/src/variants/core/json-editor.tsx](#95)
- [packages/form-palette/src/variants/core/keyvalue.tsx](#96)
- [packages/form-palette/src/variants/core/multiselect.tsx](#97)
- [packages/form-palette/src/variants/core/number.tsx](#98)
- [packages/form-palette/src/variants/core/password.tsx](#99)
- [packages/form-palette/src/variants/core/phone.tsx](#100)
- [packages/form-palette/src/variants/core/radio.tsx](#101)
- [packages/form-palette/src/variants/core/select.tsx](#102)
- [packages/form-palette/src/variants/core/slider.tsx](#103)
- [packages/form-palette/src/variants/core/text.tsx](#104)
- [packages/form-palette/src/variants/core/textarea.tsx](#105)
- [packages/form-palette/src/variants/core/toggle-group.tsx](#106)
- [packages/form-palette/src/variants/core/toggle.tsx](#107)
- [packages/form-palette/src/variants/core/treeselect.tsx](#108)
- [packages/form-palette/src/variants/helpers/selection-summary.tsx](#109)
- [packages/form-palette/src/variants/index.ts](#110)
- [packages/form-palette/src/variants/registry.ts](#111)
- [packages/form-palette/src/variants/shared.ts](#112)

---
---
#### 1


` File: packages/form-palette/src/core/adapter-registry.ts`  [↑ Back to top](#index)

```ts
// src/core/adapter-registry.ts

import { AdapterKey, AdapterOk, NamedAdapterFactory } from "@/schema/adapter";

/**
 * Internal registry of adapter factories.
 *
 * We keep it simple: a plain JS object keyed by AdapterKey.
 */
const registry: Partial<
    Record<AdapterKey, NamedAdapterFactory<AdapterKey, any>>
> = {};

/**
 * Built-in 'local' adapter.
 *
 * Semantics:
 * - send(options?) resolves to `{ data: Body }`
 * - submit/run do nothing by default (no side effects)
 *
 * The core will typically call onSubmitted with the result of send().
 */
export const localAdapter: NamedAdapterFactory<"local", any> = (config) => {
    return {
        submit() {
            // no-op; core is responsible for calling onSubmitted
            // using send() if it chooses to.
        },
        async send() {
            const result: AdapterOk<"local"> = { data: config.data };

            if (config.callbacks?.onSuccess) {
                config.callbacks.onSuccess(result);
            }

            if (config.callbacks?.onFinish) {
                config.callbacks.onFinish();
            }

            return result;
        },
        run() {
            // By default, run behaves like submit (no-op),
            // but hosts can choose to always call send() instead.
            this.submit();
        },
    };
};

/**
 * Initialise registry with the built-in 'local' adapter.
 */
registry.local = localAdapter as NamedAdapterFactory<AdapterKey, any>;

/**
 * Register or override an adapter factory for a given key.
 *
 * Hosts can call this at bootstrap time, e.g.:
 *
 *   registerAdapter<'axios'>('axios', axiosAdapter);
 */
export function registerAdapter<K extends AdapterKey, Body = any>(
    key: K,
    factory: NamedAdapterFactory<K, Body>
): void {
    registry[key] = factory as NamedAdapterFactory<AdapterKey, any>;
}

/**
 * Lookup an adapter factory by key.
 *
 * If no adapter is found for the given key, this returns undefined.
 */
export function getAdapter<K extends AdapterKey>(
    key: K
): NamedAdapterFactory<K, any> | undefined {
    const factory = registry[key];
    return factory as NamedAdapterFactory<K, any> | undefined;
}

/**
 * Check whether an adapter is registered for the given key.
 */
export function hasAdapter(key: AdapterKey): boolean {
    return typeof registry[key] === "function";
}
```

---
#### 2


` File: packages/form-palette/src/core/bound/bind-host.ts`  [↑ Back to top](#index)

```ts
// src/core/bound/bind-host.ts (or inline in binder-registry.ts)
import type { Dict, CoreContext } from "@/schema/core";
import type { Field } from "@/schema/field";

/**
 * Minimal surface needed for bound helpers.
 *
 * CoreContext already satisfies this, and FieldRegistry can be made to
 * satisfy it as well (via getBind).
 */
export interface BindHost<V extends Dict = Dict> {
    getBind(id: string): Field | undefined;
    controlButton?(): void;
}
```

---
#### 3


` File: packages/form-palette/src/core/bound/observe-bound-field.ts`  [↑ Back to top](#index)

```ts
// src/core/bound/observe-bound-field.ts

import type { Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { BindHost } from "@/core/bound/bind-host";

/** Get the live bound field (if mounted and present). */
export function getBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string
): Field | undefined {
    return host.getBind(bindId);
}

export function hasBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string
): boolean {
    return !!getBoundField(host, bindId);
}

export function readBoundValue<T = unknown, V extends Dict = Dict>(
    host: BindHost<V>,
    bindId: string
): T | undefined {
    return getBoundField(host, bindId)?.value as T | undefined;
}

export function setBoundValue<T = unknown, V extends Dict = Dict>(
    host: BindHost<V>,
    bindId: string,
    value: T,
    variant: string = "util"
): boolean {
    const f = getBoundField(host, bindId);
    if (!f) return false;

    (f as any).value = value as unknown;

    // optional: dirty/enable logic if host supports it
    try {
        host.controlButton?.();
    } catch {
        // ignore
    }

    (f as any).onChange?.(value, undefined, variant);
    return true;
}

export function setBoundError<V extends Dict>(
    _host: BindHost<V>, // host not strictly needed here
    bindId: string,
    msg: string
): boolean {
    const f = _host.getBind(bindId);
    if (!f) return false;
    (f as any).error = msg ?? "";
    return true;
}

export function validateBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string,
    report = true
): boolean {
    const f = getBoundField(host, bindId);
    if (!f) return false;
    return !!(f as any).validate?.(report);
}

/**
 * Observe a bound field for value/error + liveness.
 */
export function observeBoundField<T = unknown, V extends Dict = Dict>(
    host: BindHost<V>,
    bindId: string,
    handler: (evt: {
        exists: boolean;
        field?: Field;
        value?: T;
        error?: string;
    }) => void,
    pollMs = 300
): () => void {
    let current: Field | undefined = getBoundField(host, bindId);
    let restoreOnChange: Field["onChange"] | undefined;

    const fire = () => {
        if (!current) {
            handler({ exists: false });
            return;
        }

        handler({
            exists: true,
            field: current,
            value: (current as any).value as T,
            error: (current as any).error,
        });
    };

    const wire = () => {
        const f = getBoundField(host, bindId);

        if (f === current) return;

        if (current && restoreOnChange) {
            (current as any).onChange = restoreOnChange;
            restoreOnChange = undefined;
        }

        current = f;

        if (current) {
            restoreOnChange = (current as any).onChange;
            (current as any).onChange = (
                next: unknown,
                prev: unknown,
                variant: string
            ) => {
                restoreOnChange?.(next, prev, variant);
                handler({
                    exists: true,
                    field: current,
                    value: next as T,
                    error: (current as any).error,
                });
            };
        }

        fire();
    };

    // initial
    wire();

    let intervalId: number | undefined;
    if (typeof window !== "undefined") {
        intervalId = window.setInterval(wire, pollMs);
    }

    let mo: MutationObserver | undefined;
    if (
        typeof MutationObserver !== "undefined" &&
        typeof document !== "undefined"
    ) {
        try {
            mo = new MutationObserver(wire);
            mo.observe(document.body, {
                childList: true,
                subtree: true,
            });
        } catch {
            // ignore
        }
    }

    return () => {
        if (typeof window !== "undefined" && typeof intervalId === "number") {
            window.clearInterval(intervalId);
        }
        if (mo) {
            mo.disconnect();
            mo = undefined;
        }
        if (current && restoreOnChange) {
            (current as any).onChange = restoreOnChange;
            restoreOnChange = undefined;
        }
    };
}
```

---
#### 4


` File: packages/form-palette/src/core/bound/wait-for-bound-field.ts`  [↑ Back to top](#index)

```ts
// src/core/bound/wait-for-bound-field.ts

import type { Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { BindHost } from "@/core/bound/bind-host";
import {
    getBoundField,
    observeBoundField,
} from "@/core/bound/observe-bound-field";

export function waitForBoundField<V extends Dict>(
    host: BindHost<V>,
    bindId: string,
    timeoutMs = 5000
): Promise<Field> {
    const existing = getBoundField(host, bindId);
    if (existing) return Promise.resolve(existing);

    return new Promise<Field>((resolve, reject) => {
        let settled = false;

        const settleResolve = (field: Field) => {
            if (settled) return;
            settled = true;
            stop();
            clearTimeout(to);
            resolve(field);
        };

        const settleReject = (error: Error) => {
            if (settled) return;
            settled = true;
            stop();
            clearTimeout(to);
            reject(error);
        };

        const stop = observeBoundField(
            host,
            bindId,
            (e) => {
                if (e.exists && e.field) {
                    settleResolve(e.field);
                }
            },
            150
        );

        const to = setTimeout(() => {
            settleReject(
                new Error(
                    `waitForBoundField('${bindId}') timed out after ${timeoutMs}ms`
                )
            );
        }, timeoutMs);
    });
}
```

---
#### 5


` File: packages/form-palette/src/core/context.ts`  [↑ Back to top](#index)

```ts
// src/core/context.ts
import React from "react";
import type { CoreContext, Dict } from "@/schema/core";

/**
 * Non-generic alias for the core context type used at runtime.
 *
 * We store CoreContext<Dict> in React context and let
 * caller-side hooks (useCore, useCoreContext, etc.) cast
 * to a more specific generic shape when needed.
 */
export type AnyCoreContext = CoreContext<Dict>;

/**
 * React context carrying the current form/core instance.
 *
 * - Provider is set up in core-provider.tsx.
 * - Consumers should generally use the typed hook in
 *   hooks/use-core-context.ts instead of reading this directly.
 */
export const CoreContextReact = React.createContext<AnyCoreContext | null>(
    null
);
```

---
#### 6


` File: packages/form-palette/src/core/core-provider.tsx`  [↑ Back to top](#index)

```tsx
// src/core/core-provider.tsx
// noinspection JSConstantReassignment,JSUnusedGlobalSymbols,GrazieInspection

import * as React from "react";

import { CoreContextReact } from "@/core/context";
import { mapZodError } from "@/core/errors/map-zod";
import { mapErrorBag } from "@/core/errors/map-error-bag";
import { getAdapter, localAdapter } from "@/core/adapter-registry";
import { FieldRegistry } from "@/core/registry/field-registry";

import type { z } from "zod";
import type {
    AdapterKey,
    AdapterResult,
    Method,
    AdapterProps,
} from "@/schema/adapter";
import type {
    CoreContext,
    CoreProps,
    Dict,
    InferFromSchema,
    SubmitEvent,
    ValuesResult,
} from "@/schema/core";
import type { ButtonRef, Field } from "@/schema/field";

type Props<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey,
> = CoreProps<V, S, K> & {
    children?: React.ReactNode;
};

// Core-level props that are NOT part of AdapterProps<K>
const CORE_PROP_KEYS = new Set<string>([
    "adapter",
    "schema",
    "exceptions",
    "persist",
    "name",
    "activateButtonOnChange",
    "onChange",
    "onUpdate",
    "changeBefore",
    "formRef",
    "valueBag",
    "valueFeed",
    "onFinish",
    "init",
    "onSubmit",
    "onSubmitted",
    "children",
]);

// ─────────────────────────────────────────────────────────────
// Internal helpers (generic utils)
// ─────────────────────────────────────────────────────────────
function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;

    // NaN === NaN
    if (typeof a === "number" && typeof b === "number") {
        if (Number.isNaN(a) && Number.isNaN(b)) return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
    }

    if (isPlainObject(a) && isPlainObject(b)) {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) return false;
        for (const key of aKeys) {
            if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
            if (!deepEqual((a as any)[key], (b as any)[key])) return false;
        }
        return true;
    }

    return false;
}
// ─────────────────────────────────────────────────────────────
// CoreProvider
// ─────────────────────────────────────────────────────────────

/**
 * CoreProvider: owns the form/core runtime state and implements CoreContext.
 *
 * - Tracks all inputs in a single store (inputsRef)
 * - Supports:
 *   - named inputs via `name`
 *   - bound inputs via `bindId`
 *   - grouped inputs via `groupId`
 * - Manages errors and uncaught messages
 * - Builds values snapshots (including bucket values)
 * - Orchestrates submission via the adapter registry
 */
export function CoreProvider<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
>(props: Props<V, S, K>) {
    type Values = InferFromSchema<S, V>;

    // Single input store: FieldRegistry
    const registryRef = React.useRef<FieldRegistry>(new FieldRegistry());
``
    // bucket, errors, button
    const bucketRef = React.useRef<Dict>({});
    const uncaughtRef = React.useRef<string[]>([]);
    const errorsRef = React.useRef<Dict<string> | null>(null);
    const buttonRef = React.useRef<ButtonRef | null>(null);
    const activeButtonNameRef = React.useRef<string | null>(null);

    /**
     * Original snapshot used for "dirty" checks.
     * Lazily captured on first dirty-check.
     */
    const originalRef = React.useRef<Values | null>(null);

    // latest props
    const propsRef = React.useRef(props);
    React.useEffect(() => {
        propsRef.current = props;
    }, [props]);

    const adapterKey = (props.adapter ?? "local") as AdapterKey;
    const schema = props.schema;
    const errorBagId = props.name ?? undefined;
    let context!: CoreContext<Values>;

    // ─────────────────────────────────────────────────────────
    // Common helpers
    // ─────────────────────────────────────────────────────────

    function fetchAllNamedFields(): Field[] {
        return registryRef.current.getAllNamed();
    }

    function clearFieldErrors() {
        for (const field of fetchAllNamedFields()) {
            const anyField = field as any;
            if (typeof anyField.setError === "function") {
                anyField.setError(undefined);
            } else if ("error" in anyField) {
                anyField.error = undefined;
            }
        }
    }

    function findFieldForErrorKey(key: string): Field | undefined {
        if (!key) return undefined;
        return fetchAllNamedFields().find((f) => {
            const raw = f.name;
            if (!raw) return false;
            const trimmed = raw.trim();
            if (!trimmed) return false;

            const base = trimmed.replace(/\[]$/, "");
            if (key === base || key === trimmed) return true;

            const sharedKey = (f as any).shared as string | undefined;
            if (!sharedKey) return false;

            const sharedBase = `${sharedKey}.${base}`;
            const sharedRaw = `${sharedKey}.${trimmed}`;
            return key === sharedBase || key === sharedRaw;
        });
    }

    function setFieldError(name: string, message: string) {
        const field = findFieldForErrorKey(name);

        if (field) {
            const anyField = field as any;
            if (typeof anyField.setError === "function") {
                anyField.setError(message);
            } else {
                anyField.error = message;
            }
        } else {
            uncaughtRef.current.push(message);
        }
    }

    /**
     * Collect values from inputs into a Values object.
     *
     * Semantics:
     * - `name="tags[]"` ⇒ `values.tags: unknown[]`
     * - `shared="profile", name="first_name"` ⇒ `values.profile.first_name`
     * - bucketRef.current is merged in and overridden by live field values.
     * - `exceptions` can hide keys (e.g. ["password", "profile.ssn"])
     */
    function collectValues(): Values {
        const exceptions = propsRef.current.exceptions ?? [];
        const list: Dict = {};
        const shared: Dict<Dict> = {};

        for (const item of fetchAllNamedFields()) {
            const rawName = item.name;
            if (!rawName) continue;

            const trimmed = rawName.trim();
            if (!trimmed) continue;

            const isArray = trimmed.endsWith("[]");
            const base = trimmed.replace(/\[]$/, "");
            const sharedKey = (item as any).shared as string | undefined;

            const target = sharedKey
                ? (shared[sharedKey] ?? (shared[sharedKey] = {}))
                : list;

            const fullPath = sharedKey ? `${sharedKey}.${base}` : base;
            if (
                exceptions.includes(trimmed) ||
                exceptions.includes(base) ||
                exceptions.includes(fullPath)
            ) {
                continue;
            }

            const anyField = item as any;
            const val =
                typeof anyField.getValue === "function"
                    ? (anyField.getValue() as unknown)
                    : (anyField.value as unknown);

            if (isArray) {
                const existing = target[base];
                if (Array.isArray(existing)) {
                    target[base] = [...existing, val];
                } else if (typeof existing === "undefined") {
                    target[base] = [val];
                } else {
                    target[base] = [existing, val];
                }
            } else {
                target[base] = val;
            }
        }

        const fromFields: Dict = { ...list, ...shared };
        const merged: Dict = {
            ...bucketRef.current,
            ...fromFields,
        };

        return merged as Values;
    }

    function validateInternal(report: boolean = false): boolean {
        let valid = true;

        if (report) {
            uncaughtRef.current = [];
            clearFieldErrors();
        }

        // field-level
        for (const field of fetchAllNamedFields()) {
            const anyField = field as any;
            if (typeof anyField.validate === "function") {
                const ok = anyField.validate(report);
                if (!ok) valid = false;
            }
        }

        // schema-level
        if (schema) {
            try {
                schema.parse(collectValues());
            } catch (err: unknown) {
                valid = false;

                if (report && err && typeof err === "object") {
                    const anyErr = err as any;
                    if (anyErr.issues) {
                        const { fieldErrors, uncaught } = mapZodError(anyErr);
                        for (const [name, message] of Object.entries(
                            fieldErrors
                        )) {
                            setFieldError(name, message);
                        }
                        if (uncaught.length) {
                            uncaughtRef.current.push(...uncaught);
                        }
                    }
                }
            }
        }

        return valid;
    }

    function getAdapterPropsFrom(current: Props<V, S, K>): AdapterProps<K> {
        const result: any = {};
        for (const key in current) {
            if (!CORE_PROP_KEYS.has(key)) {
                result[key] = (current as any)[key];
            }
        }
        return result as AdapterProps<K>;
    }

    // ─────────────────────────────────────────────────────────
    // Submission
    // ─────────────────────────────────────────────────────────

    async function submitWithAdapter(
        adapterOverride?: Partial<AdapterProps<K>>,
        extra?: Partial<Values>,
        ignoreForm?: boolean,
        autoErr: boolean = true,
        autoRun: boolean = true
    ): Promise<AdapterResult<any> | undefined> {
        const currentProps = propsRef.current as Props<V, S, K>;

        // active button + loading
        const btn = buttonRef.current as any;
        const activeName = activeButtonNameRef.current;
        const isActiveButton =
            !!btn && typeof btn === "object" && btn.name === activeName;

        const setButtonLoading = (loading: boolean) => {
            if (!isActiveButton) return;
            if (typeof btn.setLoading === "function") {
                btn.setLoading(loading);
            } else if ("loading" in btn) {
                btn.loading = loading;
            }
        };

        setButtonLoading(true);

        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            setButtonLoading(false);
        };

        if (!ignoreForm) {
            const ok = validateInternal(true);
            if (!ok) {
                finish();
                return undefined;
            }
        }

        let submissionValues: Values = {
            ...collectValues(),
            ...(extra ?? {}),
        };

        // Base adapter config from props + override from caller
        let adapterConfig: AdapterProps<K> = {
            ...(getAdapterPropsFrom(currentProps) as any),
            ...(adapterOverride as Partial<AdapterProps<K>> | undefined),
        };

        const event: SubmitEvent<Values, K> = {
            preventDefault() {
                this.continue = false;
            },
            editData(cb) {
                const result = cb(submissionValues);
                if (result) {
                    submissionValues = result;
                }
            },
            setConfig(arg1: any, arg2?: any) {
                if (typeof arg1 === "string") {
                    // key, value
                    (adapterConfig as any)[arg1] = arg2;
                } else if (arg1 && typeof arg1 === "object") {
                    // partial props
                    adapterConfig = {
                        ...(adapterConfig as any),
                        ...arg1,
                    };
                }
            },

            button: buttonRef.current ?? undefined,
            get formData() {
                return submissionValues;
            },

            form: context,
            continue: true,
        };

        if (currentProps.onSubmit) {
            try {
                await currentProps.onSubmit(event as any);
            } catch (err) {
                // host blew up: end this submit cycle
                finish();
                throw err;
            }
        }

        if (!event.continue) {
            finish();
            return undefined;
        }

        const factory =
            getAdapter(adapterKey) ??
            (localAdapter as unknown as (cfg: any) => AdapterResult<any>);

        const adapter = factory({
            // adapter-specific config (url, method, config, etc.)
            ...(adapterConfig as any),

            // core config
            data: submissionValues,
            errorBag: errorBagId,
            callbacks: {
                onSuccess(ok: unknown) {
                    const maybe = propsRef.current.onSubmitted;
                    if (maybe) {
                        void maybe(context, ok as any, () => {
                            finish();
                        });
                    }
                },
                onError(err: unknown, updateRef) {
                    if (!autoErr || !err || typeof err !== "object") {
                        return;
                    }

                    const anyErr = err as any;
                    if (anyErr.errors && typeof anyErr.errors === "object") {
                        const { fieldErrors, uncaught } = mapErrorBag(
                            anyErr.errors ?? {}
                        );

                        if (updateRef) {
                            errorsRef.current = fieldErrors;
                        } else
                            for (const [name, message] of Object.entries(
                                fieldErrors
                            )) {
                                setFieldError(name, message);
                            }
                        if (uncaught.length) {
                            uncaughtRef.current.push(...uncaught);
                        }
                    }
                },
                onFinish() {
                    const maybe = propsRef.current.onFinish;
                    if (maybe) {
                        maybe(context);
                    }
                    finish();
                },
            },
        });
        if (autoRun) {
            try {
                await adapter.send();
            } catch (e) {
                console.log("Adapter failed to send.", e);
                // errors flow via callbacks; adapter may still call onFinish
            }
        }

        return adapter;
    }

    // No separate inputs view: expose registry directly via context.inputs

    // ─────────────────────────────────────────────────────────
    // CoreContext implementation
    // ─────────────────────────────────────────────────────────

    context = {
        values(): Values {
            return collectValues();
        },

        submit(): ValuesResult<Values> {
            const valid = validateInternal(true);
            const vals = collectValues();
            return { values: vals, valid };
        },

        getBind(id: string): Field | undefined {
            return registryRef.current.getByBind(id);
        },

        validate(report?: boolean): boolean {
            return validateInternal(report);
        },

        addField(field: Field): void {
            // Normalise name
            const rawName = field.name ?? "";
            (field as any).name = rawName.trim();

            // hydrate from valueBag before registering
            const { valueBag, valueFeed } = propsRef.current;
            const trimmed = (field.name ?? "").trim();
            const hasName = !!trimmed;
            const isArray = hasName && trimmed.endsWith("[]");
            const base = hasName ? trimmed.replace(/\[]$/, "") : "";
            const sharedKey = (field as any).shared as string | undefined;

            if (valueBag && !(field as any).ignore && hasName) {
                const sourceRoot: any =
                    sharedKey && (valueBag as any)[sharedKey]
                        ? (valueBag as any)[sharedKey]
                        : valueBag;

                let value: unknown = undefined;

                if (sourceRoot && typeof sourceRoot === "object") {
                    if (isArray && Array.isArray(sourceRoot[base])) {
                        const siblings = fetchAllNamedFields().filter((f) => {
                            const rn = (f.name ?? "").trim();
                            return (
                                rn === trimmed &&
                                ((f as any).shared as string | undefined) ===
                                    sharedKey
                            );
                        });
                        const idx = siblings.length;
                        value = (sourceRoot[base] as unknown[])[idx];
                    } else {
                        value = sourceRoot[base];
                    }
                }

                let hydrated: unknown = value;
                if (valueFeed) {
                    const maybe = valueFeed(
                        base as keyof Values,
                        value as any,
                        context as any
                    );
                    if (typeof maybe !== "undefined") {
                        hydrated = maybe;
                    }
                }

                if (typeof hydrated !== "undefined") {
                    const anyField = field as any;
                    if (typeof anyField.setValue === "function") {
                        anyField.setValue(hydrated);
                    } else {
                        anyField.value = hydrated;
                    }
                }
            }

            // finally register into the single store (name/bindId/groupId)
            registryRef.current.add(field);
        },

        // Expose registry view as inputs (delegates to FieldRegistry instance)
        inputs: registryRef.current,

        // Also expose raw list of fields for compatibility is defined later as a getter

        bucket: bucketRef.current,

        error(
            nameOrBag: string | Record<string, string>,
            maybeMsg?: string
        ): void {
            if (typeof nameOrBag === "string") {
                if (!maybeMsg) return;
                setFieldError(nameOrBag, maybeMsg);
                return;
            }

            const { fieldErrors, uncaught } = mapErrorBag(nameOrBag);
            for (const [name, message] of Object.entries(fieldErrors)) {
                setFieldError(name, message);
            }
            if (uncaught.length) {
                uncaughtRef.current.push(...uncaught);
            }
        },

        controlButton(): void {
            const { activateButtonOnChange } = propsRef.current;
            if (!activateButtonOnChange) return;

            const btn = buttonRef.current as any;
            const activeName = activeButtonNameRef.current;

            // If there is no active button or it doesn't match, nothing to control.
            if (!btn || btn.name !== activeName) {
                return;
            }

            // Capture original snapshot lazily.
            if (!originalRef.current) {
                originalRef.current = collectValues();
            }

            const current = collectValues();
            const original = originalRef.current!;

            const dirty = !deepEqual(original, current);

            const setDisabled = (disabled: boolean) => {
                if (typeof btn.setDisabled === "function") {
                    btn.setDisabled(disabled);
                } else if ("disabled" in btn) {
                    btn.disabled = disabled;
                }
            };

            // Dirty ⇒ enable button, clean ⇒ disable button
            setDisabled(!dirty);
        },

        isDirty() {
            if (!originalRef.current) {
                originalRef.current = collectValues();
            }

            const current = collectValues();
            const original = originalRef.current!;

            return !deepEqual(original, current);
        },

        async prepare(
            type: Method,
            route: string,
            extra?: Partial<Values>,
            ignoreForm?: boolean,
            autoErr?: boolean
        ): Promise<AdapterResult<any> | undefined> {
            // Bridge old (method, route) API into adapter config overrides.
            const override: any = {
                method: type,
                url: route,
            };
            return submitWithAdapter(
                override as Partial<AdapterProps<K>>,
                extra,
                ignoreForm,
                autoErr,
                false
            );
        },

        persist(
            data: Partial<Values>,
            feed?: (name: string, value: unknown, original: unknown) => unknown
        ): void {
            const seen: Record<string, number> = {};
            const root = data as any;

            const useFeed =
                feed ||
                (propsRef.current.valueFeed
                    ? (
                          name: string,
                          value: unknown,
                          original: unknown
                      ): unknown => {
                          const vf = propsRef.current.valueFeed!;
                          const maybe = vf(
                              name as keyof Values,
                              value as any,
                              context as any
                          );
                          return typeof maybe === "undefined"
                              ? original
                              : maybe;
                      }
                    : undefined);

            for (const field of fetchAllNamedFields()) {
                const rawName = field.name;
                if (!rawName) continue;
                if ((field as any).ignore) continue;

                const trimmed = rawName.trim();
                if (!trimmed) continue;

                const isArray = trimmed.endsWith("[]");
                const base = trimmed.replace(/\[]$/, "");
                const sharedKey = (field as any).shared as string | undefined;
                const key = sharedKey ? `${sharedKey}.${base}` : base;

                let value: unknown = undefined;

                if (sharedKey) {
                    const group = root[sharedKey];
                    if (group && typeof group === "object") {
                        if (isArray && Array.isArray(group[base])) {
                            const idx = seen[key] ?? 0;
                            value = (group[base] as unknown[])[idx];
                            seen[key] = idx + 1;
                        } else {
                            value = group[base];
                        }
                    }
                } else {
                    if (isArray && Array.isArray(root[base])) {
                        const idx = seen[key] ?? 0;
                        value = (root[base] as unknown[])[idx];
                        seen[key] = idx + 1;
                    } else {
                        value = root[base];
                    }
                }

                const anyField = field as any;
                const original =
                    typeof anyField.getValue === "function"
                        ? anyField.getValue()
                        : anyField.value;

                let next = value;
                if (useFeed) {
                    const maybe = useFeed(base, value, original);
                    if (typeof maybe === "undefined") {
                        continue;
                    }
                    next = maybe;
                }

                if (typeof anyField.setValue === "function") {
                    anyField.setValue(next);
                } else {
                    anyField.value = next;
                }
            }

            if (propsRef.current.onUpdate) {
                propsRef.current.onUpdate(collectValues());
            }
        },

        setValue(name: string, value: unknown): void {
            if (!name) return;

            let sharedKey: string | undefined;
            let base = name;

            if (name.includes(".")) {
                const [group, field] = name.split(".", 2);
                sharedKey = group;
                base = field;
            }

            const targetField = fetchAllNamedFields().find((f) => {
                const raw = (f.name ?? "").trim();
                if (!raw) return false;

                const isArray = raw.endsWith("[]");
                const rawBase = raw.replace(/\[]$/, "");
                const fShared = (f as any).shared as string | undefined;

                const sameGroup = fShared === sharedKey;
                const sameName =
                    raw === name ||
                    rawBase === base ||
                    `${fShared}.${rawBase}` === name;

                return (!sharedKey || sameGroup) && sameName && !isArray;
            });

            if (targetField) {
                const anyField = targetField as any;
                if (typeof anyField.setValue === "function") {
                    anyField.setValue(value);
                } else {
                    anyField.value = value;
                }
            } else {
                bucketRef.current[name] = value;
            }

            if (propsRef.current.onUpdate) {
                propsRef.current.onUpdate(collectValues());
            }
        },

        go(data?: Partial<Values>, ignoreForm?: boolean): void {
            void submitWithAdapter(undefined, data, ignoreForm, true, true);
        },

        reset(inputs: string[]): void {
            if (!inputs.length) return;

            for (const field of fetchAllNamedFields()) {
                const raw = field.name;
                if (!raw) continue;
                if (!inputs.includes(raw)) continue;

                const anyField = field as any;
                if (typeof anyField.reset === "function") {
                    anyField.reset();
                } else if (typeof anyField.setValue === "function") {
                    anyField.setValue(undefined);
                } else {
                    anyField.value = undefined;
                }
            }
        },

        set button(btn: ButtonRef) {
            buttonRef.current = btn;
        },

        async forceSubmit(): Promise<void> {
            await submitWithAdapter(undefined, undefined, false, true, true);
        },

        get fields(): Field[] {
            return fetchAllNamedFields();
        },

        get props() {
            const { formRef, valueBag, ...rest } = propsRef.current;
            return rest as any;
        },

        setActiveButton(name: string): void {
            activeButtonNameRef.current = name;
        },

        getUncaught(): readonly string[] {
            return uncaughtRef.current;
        },
    } as CoreContext<Values>;

    // formRef exposure
    React.useEffect(() => {
        if (!props.formRef) return;

        props.formRef.current = context;
        return () => {
            if (props.formRef) {
                props.formRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    // init hook once
    React.useEffect(() => {
        if (props.init) {
            props.init(context);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CoreContextReact.Provider value={context as any}>
            {props.children}
        </CoreContextReact.Provider>
    );
}
```

---
#### 7


` File: packages/form-palette/src/core/core-root.tsx`  [↑ Back to top](#index)

```tsx
// src/core/core-root.tsx

import * as React from "react";

import { useCore } from "@/core/hooks/use-core";
import { ErrorStrip } from "@/core/errors/error-strip";
import type { CoreContext, Dict } from "@/schema/core";

export interface CoreRootProps
    extends React.FormHTMLAttributes<HTMLFormElement> {
    /**
     * If true, the global ErrorStrip will not be rendered automatically.
     */
    noErrorStrip?: boolean;

    /**
     * Optional hook invoked after CoreRoot orchestrates the submit.
     *
     * - The native event is already `preventDefault()`-ed.
     * - The adapter flow is triggered via `form.go(...)`.
     * - Use this to tap into submit without breaking the core.
     */
    onSubmitForm?(
        event: React.FormEvent<HTMLFormElement>,
        form: CoreContext<Dict>
    ): void | Promise<void>;
}

/**
 * CoreRoot: actual <form> element wired to the core runtime.
 *
 * Responsibilities:
 * - Own the native submit event and prevent full-page navigation.
 * - Delegate submit orchestration to form.go().
 * - Optionally render the global ErrorStrip at the top.
 */
export function CoreRoot(props: CoreRootProps) {
    const { noErrorStrip, onSubmitForm, children, ...rest } = props;

    const form = useCore<Dict>();

    const handleSubmit = React.useCallback(
        (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (form.props.activateButtonOnChange && !form.isDirty()) return;
            // Core submit orchestration (adapter-specific behaviour lives inside).
            form.go();

            // Optional host-level hook.
            if (onSubmitForm) {
                void onSubmitForm(event, form);
            }

            // If the host provided a native onSubmit prop, call it too.
            if (typeof rest.onSubmit === "function") {
                rest.onSubmit(event);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [form, onSubmitForm, rest.onSubmit]
    );

    // We intentionally override onSubmit so the core owns submit routing.
    const { onSubmit: _ignored, ...passThrough } = rest;

    return (
        <form onSubmit={handleSubmit} {...passThrough}>
            {!noErrorStrip && <ErrorStrip form={form} />}
            {children}
        </form>
    );
}
```

---
#### 8


` File: packages/form-palette/src/core/core-shell.tsx`  [↑ Back to top](#index)

```tsx
// src/core/core-shell.tsx

import * as React from "react";

import { CoreProvider } from "@/core/core-provider";
import { CoreRoot, type CoreRootProps } from "@/core/core-root";

import type { z } from "zod";
import type { AdapterKey } from "@/schema/adapter";
import type { CoreProps, Dict } from "@/schema/core";
import { cn } from "@/lib/utils";

/**
 * Shared base props for CoreShell, independent of wrapping behaviour.
 */
type CoreShellBaseProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreProps<V, S, K> & {
    /**
     * Props passed directly to the underlying <form> element via CoreRoot.
     */
    formProps?: CoreRootProps;
    children?: React.ReactNode;
};

/**
 * When `wrapped` is true, you can provide gap/contentClassName.
 */
export type CoreShellWrappedProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreShellBaseProps<V, S, K> & {
    wrapped: true;
    /**
     * Gap for the inner wrapper. You can still control layout
     * (flex/grid/etc.) via `contentClassName`.
     */
    gap?: React.CSSProperties["gap"];
    /**
     * Class applied to the wrapper around children.
     */
    contentClassName?: string;
};

/**
 * When `wrapped` is not true (false/undefined), gap/contentClassName
 * are not allowed.
 */
export type CoreShellUnwrappedProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreShellBaseProps<V, S, K> & {
    wrapped?: false | undefined;
};

export type CoreShellProps<
    V extends Dict = Dict,
    S extends z.ZodType | undefined = z.ZodType | undefined,
    K extends AdapterKey = "local",
> = CoreShellWrappedProps<V, S, K> | CoreShellUnwrappedProps<V, S, K>;

/**
 * Combined provider + form-root wrapper.
 *
 * Usage:
 *   <CoreShell adapter="local" schema={schema} formProps={{ className: "space-y-4" }}>
 *     {...fields + buttons...}
 *   </CoreShell>
 *
 *   <CoreShell
 *     adapter="local"
 *     schema={schema}
 *     wrapped
 *     gap="1rem"
 *     contentClassName="flex flex-col"
 *   >
 *     {...fields + buttons...}
 *   </CoreShell>
 */
export function CoreShell<
    V extends Dict,
    S extends z.ZodType | undefined,
    K extends AdapterKey = "local",
>(props: CoreShellProps<V, S, K>) {
    if (props.wrapped) {
        const {
            formProps,
            children,
            wrapped, // eslint-disable-line @typescript-eslint/no-unused-vars
            gap,
            contentClassName,
            ...coreProps
        } = props;

        const content = (
            <div
                className={cn('flex flex-col', contentClassName)}
                style={gap !== undefined ? { gap } : undefined}
            >
                {children}
            </div>
        );

        return (
            <CoreProvider<V, S, K> {...coreProps as any}>
                <CoreRoot {...(formProps ?? {})}>{content}</CoreRoot>
            </CoreProvider>
        );
    }

    const { formProps, children, ...coreProps } = props;

    return (
        <CoreProvider<V, S, K> {...coreProps as any}>
            <CoreRoot {...(formProps ?? {})}>{children}</CoreRoot>
        </CoreProvider>
    );
}
```

---
#### 9


` File: packages/form-palette/src/core/errors/error-strip.tsx`  [↑ Back to top](#index)

```tsx
// src/core/errors/error-strip.tsx

import * as React from "react";

import { useCore } from "@/core/hooks/use-core";
import type { CoreContext, Dict } from "@/schema/core";

export interface ErrorStripProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Optional explicit form context. If omitted, the strip will use
     * the nearest CoreProvider via useCore().
     */
    form?: CoreContext<Dict>;

    /**
     * Optional explicit messages. If provided, these are used instead of
     * form.getUncaught().
     */
    messages?: readonly string[];

    /**
     * Custom renderer for each message.
     */
    renderMessage?: (message: string, index: number) => React.ReactNode;

    /**
     * Wrapper element type. Defaults to "div".
     */
    as?: React.ElementType;

    /**
     * Props forwarded to the inner <ul> element.
     */
    listProps?: React.HTMLAttributes<HTMLUListElement>;
}

/**
 * Simple global/uncaught error renderer.
 *
 * Reads messages from `form.getUncaught()` (unless `messages` is provided)
 * and renders them as a list.
 */
export function ErrorStrip(props: ErrorStripProps) {
    const {
        form: formProp,
        messages: messagesProp,
        renderMessage,
        as: As = "div",
        listProps,
        ...wrapperProps
    } = props;

    const ctxFromHook = useCore<Dict>();
    const form = formProp ?? ctxFromHook;

    const messages = messagesProp ?? form?.getUncaught?.() ?? [];

    if (!messages.length) return null;

    return (
        <As {...wrapperProps}>
            <ul {...listProps}>
                {messages.map((msg, index) => (
                    <li key={index}>
                        {renderMessage ? renderMessage(msg, index) : msg}
                    </li>
                ))}
            </ul>
        </As>
    );
}
```

---
#### 10


` File: packages/form-palette/src/core/errors/index.ts`  [↑ Back to top](#index)

```ts
export * from "./map-error-bag";
export * from "./map-zod";
export * from './error-strip'
```

---
#### 11


` File: packages/form-palette/src/core/errors/map-error-bag.ts`  [↑ Back to top](#index)

```ts
// src/core/errors/map-error-bag.ts

export type ErrorBag = Record<string, string | string[] | undefined | null>;

export type ErrorBagMapResult = {
    /** Field-specific errors keyed by field name. */
    fieldErrors: Record<string, string>;
    /** Errors that could not be mapped to a specific field. */
    uncaught: string[];
};

/**
 * Map a generic "error bag" object into field errors + uncaught messages.
 *
 * Typical input:
 *   {
 *     name: "Name is required",
 *     email: ["Email is invalid"],
 *     message: "Something went wrong" // global
 *   }
 *
 * Heuristics:
 * - Keys like "message", "error", "_", "global" → treated as global/uncaught.
 * - Everything else → treated as a field error.
 * - Array values are joined with "\n".
 */
export function mapErrorBag(bag: ErrorBag): ErrorBagMapResult {
    const fieldErrors: Record<string, string> = {};
    const uncaught: string[] = [];

    const GLOBAL_KEYS = new Set(["message", "error", "errors", "_", "global"]);

    for (const [key, raw] of Object.entries(bag)) {
        if (raw == null) continue;

        const value = Array.isArray(raw)
            ? raw.filter(Boolean).join("\n")
            : String(raw);

        if (!value) continue;

        if (GLOBAL_KEYS.has(key)) {
            uncaught.push(value);
        } else {
            const existing = fieldErrors[key];
            fieldErrors[key] = existing ? `${existing}\n${value}` : value;
        }
    }

    return { fieldErrors, uncaught };
}
```

---
#### 12


` File: packages/form-palette/src/core/errors/map-zod.ts`  [↑ Back to top](#index)

```ts
// src/core/errors/map-zod.ts
import type { $ZodIssue, $ZodError } from "zod/v4/core";

export type ZodErrorMapResult = {
    /** Field-specific errors keyed by field name. */
    fieldErrors: Record<string, string>;
    /** Errors that could not be mapped to a specific field. */
    uncaught: string[];
};

/**
 * Map a ZodError into field-specific errors + uncaught messages.
 *
 * Heuristics:
 * - If issue.path[0] is a string → treated as a field name.
 * - Otherwise → message is pushed into `uncaught`.
 *
 * If a field has multiple issues, messages are joined with `\n`.
 */
export function mapZodError(error: $ZodError): ZodErrorMapResult {
    const fieldErrors: Record<string, string> = {};
    const uncaught: string[] = [];

    for (const issue of error.issues as $ZodIssue[]) {
        const path = issue.path;
        const message = issue.message || "Validation error";

        const first = path[0];

        if (typeof first === "string" && first.length > 0) {
            const existing = fieldErrors[first];
            fieldErrors[first] = existing ? `${existing}\n${message}` : message;
        } else {
            uncaught.push(message);
        }
    }

    return { fieldErrors, uncaught };
}
```

---
#### 13


` File: packages/form-palette/src/core/hooks/use-button.ts`  [↑ Back to top](#index)

```ts
// src/core/hooks/use-button.ts
// noinspection JSUnusedGlobalSymbols

import * as React from "react";

import { useCoreContext } from "@/core/hooks/use-core-context";
import type { CoreContext, Dict } from "@/schema/core";
import type { ButtonRef } from "@/schema/field";

export interface UseButtonOptions {
    /**
     * Logical name of the button.
     *
     * Used by the core to:
     * - mark this as the "active" button before submit
     * - toggle loading/disabled specifically for this button
     */
    name: string;

    /**
     * If true, clicking this button should trigger a submit:
     *
     * - form.setActiveButton(name)
     * - form.go()
     */
    submit?: boolean;

    /**
     * Initial disabled state.
     */
    disabled?: boolean;

    /**
     * Optional click handler.
     *
     * This runs *in addition to* the submit behavior (if `submit` is true).
     * You can call `event.preventDefault()` to prevent the auto-submit.
     */
    onClick?(
        event: React.MouseEvent<HTMLButtonElement>,
        form: CoreContext<Dict>
    ): void | Promise<void>;
}

export interface UseButtonReturn {
    /**
     * Current loading state, controlled by the core (via adapters) and
     * optionally by the host via setLoading.
     */
    loading: boolean;
    setLoading(loading: boolean): void;

    /**
     * Current disabled state.
     */
    disabled: boolean;
    setDisabled(disabled: boolean): void;

    /**
     * Ref for the underlying <button>.
     */
    ref: React.RefObject<HTMLButtonElement>;

    /**
     * Click handler wired to the core.
     */
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;

    /**
     * Convenience bundle for spreading onto a <button>.
     *
     * Example:
     *   const btn = useButton({ name: "save", submit: true });
     *   return <button {...btn.buttonProps}>Save</button>;
     */
    buttonProps: {
        ref: React.RefObject<HTMLButtonElement>;
        disabled: boolean;
        "data-loading"?: "true" | "false";
        onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    };
}

/**
 * useButton
 *
 * - Registers a ButtonRef with the core.
 * - Cooperates with setActiveButton + adapter-based submit.
 * - Handles loading/disabled toggling via the core's callbacks.
 */
export function useButton(options: UseButtonOptions): UseButtonReturn {
    const form = useCoreContext<Dict>();

    const { name, disabled: disabledProp = false } = options;

    const [loading, setLoadingState] = React.useState<boolean>(false);
    const [disabled, setDisabledState] = React.useState<boolean>(
        Boolean(disabledProp)
    );

    const ref = React.useRef<HTMLButtonElement>(null);

    // Keep latest options for callbacks
    const optsRef = React.useRef<UseButtonOptions>(options);
    React.useEffect(() => {
        optsRef.current = options;
    }, [options]);

    // Build the ButtonRef once
    const buttonRef = React.useRef<ButtonRef | (ButtonRef & any) | null>(null);

    if (!buttonRef.current) {
        // @ts-ignore
        const btn: ButtonRef & {
            loading: boolean;
            disabled: boolean;
            setLoading?(v: boolean): void;
            setDisabled?(v: boolean): void;
            ref?: React.RefObject<HTMLButtonElement>;
        } = {
            name,
            // Accessor for "loading" as required by ButtonRef
            set loading(v: boolean) {
                setLoadingState(v);
            },
            // Accessor for "disable" (note: interface uses `disable`, not `disabled`)
            //@ts-ignore
            set disable(v: boolean) {
                setDisabledState(v);
            },
            // Extra properties used by CoreProvider via any-casts
            get loading() {
                return loading;
            },
            setDisabled(v: boolean) {
                setDisabledState(v);
            },
            get disabled() {
                return disabled;
            },
            ref: ref as React.RefObject<HTMLButtonElement>,
        };

        // Also expose setLoading for CoreProvider's convenience
        (btn as any).setLoading = (v: boolean) => {
            setLoadingState(v);
        };

        buttonRef.current = btn;
    }

    // Keep mutable button properties in sync when name changes
    React.useEffect(() => {
        if (!buttonRef.current) return;
        buttonRef.current.name = name;
    }, [name]);

    // Register this button with the core
    React.useEffect(() => {
        if (!buttonRef.current) return;

        // Expose to the core runtime so submitWithAdapter can toggle loading.
        (form as any).button = buttonRef.current;

        return () => {
            // On unmount, if the core still points to this button,
            // we simply clear it.
            const anyForm = form as any;
            if (anyForm.button === buttonRef.current) {
                anyForm.button = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const currentOpts = optsRef.current;
        const shouldSubmit = !!currentOpts.submit;

        // Host-level handler first
        if (currentOpts.onClick) {
            currentOpts.onClick(event, form);
        }

        if (event.defaultPrevented) {
            return;
        }

        if (shouldSubmit) {
            // Mark this as the active button for the submit cycle.
            form.setActiveButton(currentOpts.name);

            // Kick off the standard submit pipeline.
            form.go();
        }
    };

    const setLoading = (v: boolean) => {
        setLoadingState(v);
    };

    const setDisabled = (v: boolean) => {
        setDisabledState(v);
    };

    return {
        loading,
        setLoading,
        disabled,
        setDisabled,
        ref: ref as React.RefObject<HTMLButtonElement>,
        onClick: handleClick,
        buttonProps: {
            ref: ref as React.RefObject<HTMLButtonElement>,
            disabled: disabled || loading,
            "data-loading": loading ? "true" : "false",
            onClick: handleClick,
        },
    };
}
```

---
#### 14


` File: packages/form-palette/src/core/hooks/use-core-context.ts`  [↑ Back to top](#index)

```ts
// src/core/hooks/use-core-context.ts
import { useContext } from "react";
import { CoreContextReact } from "@/core/context";
import type { CoreContext, Dict } from "@/schema/core";

/**
 * Typed hook to access the current core/form context.
 *
 * Must be used inside a <CoreProvider>. If no provider is found,
 * this will throw to make misuse obvious.
 */
export function useCoreContext<V extends Dict = Dict>(): CoreContext<V> {
    const ctx = useContext(CoreContextReact);

    if (!ctx) {
        throw new Error("useCoreContext must be used within a <CoreProvider>.");
    }

    return ctx as CoreContext<V>;
}
```

---
#### 15


` File: packages/form-palette/src/core/hooks/use-core.ts`  [↑ Back to top](#index)

```ts
// src/core/hooks/use-core.ts
import type { CoreContext, Dict } from "@/schema/core";
import { useCoreContext } from "./use-core-context";

/**
 * Convenience alias for useCoreContext.
 *
 * This mirrors the legacy useForm hook: you get the full CoreContext,
 * and can call core.values(), core.submit(), core.go(), etc.
 */
export function useCore<V extends Dict = Dict>(): CoreContext<V> {
    return useCoreContext<V>();
}
```

---
#### 16


` File: packages/form-palette/src/core/hooks/use-field.ts`  [↑ Back to top](#index)

```ts
// src/core/hooks/use-field.ts
// noinspection JSUnusedGlobalSymbols,GrazieInspection

import * as React from "react";

import { useCoreContext } from "@/core/hooks/use-core-context";
import type { CoreContext, Dict } from "@/schema/core";
import type { Field } from "@/schema/field";

export type UseFieldValidate<T> = (
    value: T,
    field?: Field,
    form?: CoreContext<any>,
    report?: boolean
) => boolean | string;

export interface UseFieldOptions<T = unknown> {
    /**
     * Primary field name.
     *
     * This is the key that will show up in the values snapshot and
     * error bags (unless mapped via `shared` or `alias`).
     */
    name?: string;

    /**
     * Optional internal binding identifier.
     *
     * Used by the bound helpers (observeBoundField, waitForBoundField)
     * and the binder registry.
     */
    bindId?: string;

    /**
     * Optional external binding key – a semantic identifier for this
     * field’s binding group.
     *
     * Example:
     *   bind="shipping"
     */
    bind?: string;

    /**
     * Shared key for nested grouping, e.g:
     *
     *   shared="profile", name="first_name"
     *   → values.profile.first_name
     */
    shared?: string;

    /**
     * Optional grouping identifier used to group related controls
     * (e.g. radio groups, segmented inputs).
     */
    groupId?: string;

    /**
     * Optional alias for error / mapping purposes.
     *
     * Example:
     *   alias="email" but name="contact.email"
     */
    alias?: string;

    /**
     * Marks this field as the "main" one in a group.
     */
    main?: boolean;

    /**
     * If true, this field is ignored by snapshot / some validation
     * flows, but may still exist in the registry.
     */
    ignore?: boolean;

    /**
     * Whether the field is required.
     */
    required?: boolean;

    /**
     * Initial/default value for this field.
     */
    defaultValue?: T;

    /**
     * Initial disabled flag.
     */
    disabled?: boolean;

    /**
     * Initial readOnly flag.
     */
    readOnly?: boolean;

    /**
     * Custom validation hook.
     *
     * Return:
     * - `true`       → valid
     * - `false`      → invalid (no message)
     * - `"message"`  → invalid with explicit message
     */
    validate?: UseFieldValidate<T>;

    /**
     * Optional projector to derive an "original" value from the
     * initial default.
     */
    getOriginalValue?(value: T | undefined): unknown;

    /**
     * Local change hook for the field.
     *
     * This is in addition to the form-level `onChange`.
     */
    onValueChange?(next: T, prev: T, variant: string): void;
}

export interface UseFieldReturn<T = unknown> {
    /** Ref to the underlying DOM element */
    ref: React.RefObject<HTMLElement>;
    key: string;
    /** Current value */
    value: T | undefined;
    setValue(next: T | undefined, variant?: string): void;

    /** Current error message */
    error: string;
    setError(message: string): void;

    /** Async-loading flag (e.g. remote validation) */
    loading: boolean;
    setLoading(loading: boolean): void;

    /** Required flag */
    required: boolean;
    setRequired(required: boolean): void;

    /** Disabled flag */
    disabled: boolean;
    setDisabled(disabled: boolean): void;

    /** Readonly flag */
    readOnly: boolean;
    setReadOnly(readOnly: boolean): void;

    /** Metadata / wiring */
    name: string;
    bindId: string;
    bind?: string;
    shared?: string;
    groupId?: string;
    alias?: string;
    main?: boolean;
    ignore?: boolean;

    /** Snapshots */
    readonly defaultValue: T | undefined;
    readonly originalValue: unknown;

    /** Owning core context */
    form: CoreContext<Dict>;

    /** Run validation (optionally reporting errors) */
    validate(report?: boolean): boolean | undefined;
}

/**
 * Strict field hook.
 *
 * - Registers the field with the core provider / registry.
 * - Exposes value/error/loading and lifecycle helpers.
 * - Wires into:
 *   - core-level `onChange`
 *   - `controlButton()` dirty logic
 */
export function useField<T = unknown>(
    options: UseFieldOptions<T>
): UseFieldReturn<T> {
    const form = useCoreContext<Dict>();

    const {
        name: rawName,
        bindId: rawBindId,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        required: requiredProp = false,
        defaultValue,
        disabled: disabledProp = false,
        readOnly: readOnlyProp = false,
        validate,
        getOriginalValue,
        onValueChange,
    } = options;

    const ref = React.useRef<HTMLElement>(null);

    // Core state (value, error, loading, original) lives in a ref
    const stateRef = React.useRef<{
        value: T | undefined;
        error: string;
        loading: boolean;
        original: unknown;
    }>({
        value: defaultValue,
        error: "",
        loading: false,
        original: getOriginalValue
            ? getOriginalValue(defaultValue)
            : defaultValue,
    });

    // React state mirrors (used for rerenders)
    const [value, setValueState] = React.useState<T | undefined>(
        stateRef.current.value
    );
    const [error, setErrorState] = React.useState<string>(
        stateRef.current.error
    );
    const [loading, setLoadingState] = React.useState<boolean>(
        stateRef.current.loading
    );
    const [required, setRequired] = React.useState<boolean>(
        Boolean(requiredProp)
    );
    const [disabled, setDisabled] = React.useState<boolean>(
        Boolean(disabledProp)
    );
    const [readOnly, setReadOnly] = React.useState<boolean>(
        Boolean(readOnlyProp)
    );

    const id = React.useId();
    // Stable wiring keys
    // @ts-ignore
    const keyRef = React.useRef<string>(
        (() => {
            if (rawName && rawName.trim()) return `${rawName.trim()}-${id}`;
            if (rawBindId && rawBindId.trim())
                return `${rawBindId.trim()}-${id}`;
            return `field-${Math.random().toString(36).slice(2)}-${id}`;
        })()
    ) as React.RefObject<string>;

    const bindIdRef = React.useRef<string>(
        (rawBindId && rawBindId.trim()) || keyRef.current
    );

    const fieldRef = React.useRef<Field | null>(null);

    // Build the Field object once
    if (!fieldRef.current) {
        const key = keyRef.current;
        const bindId = bindIdRef.current;
        const trimmedName = rawName?.trim() ?? "";

        const validateFn = (report?: boolean): boolean => {
            const formDisabled = false; // core-level disable could be added later
            const curDisabled = formDisabled || disabled || readOnly;

            if (curDisabled && !report) {
                return true;
            }

            const current = stateRef.current.value as T;
            let ok = true;
            let message = "";

            if (
                required &&
                (current === undefined ||
                    current === null ||
                    (typeof current === "string" && current.trim() === "") ||
                    (Array.isArray(current) && current.length === 0))
            ) {
                ok = false;
                message = "This field is required.";
            } else if (validate) {
                const result = validate(
                    current,
                    fieldRef.current!,
                    form,
                    !!report
                );
                if (typeof result === "string") {
                    ok = false;
                    message = result;
                } else if (!result) {
                    ok = false;
                }
            }

            if (!report) {
                return ok;
            }

            // Report mode → set/clear error
            stateRef.current.error = ok ? "" : message;
            setErrorState(ok ? "" : message);
            return ok;
        };

        const f: Field = {
            key,
            bindId,
            bind,
            name: trimmedName,
            shared,
            groupId,
            alias,
            main,
            ignore,
            required,
            ref: ref as React.RefObject<HTMLElement>,
            get defaultValue() {
                return stateRef.current.original;
            },
            get value() {
                return stateRef.current.value;
            },
            set value(v: unknown) {
                stateRef.current.value = v as T | undefined;
                setValueState(v as T | undefined);
            },
            get originalValue() {
                return stateRef.current.original;
            },
            get error() {
                return stateRef.current.error;
            },
            set error(msg: string) {
                stateRef.current.error = msg;
                setErrorState(msg);
            },
            get loading() {
                return stateRef.current.loading;
            },
            set loading(v: boolean) {
                stateRef.current.loading = v;
                setLoadingState(v);
            },
            validate: validateFn,
            onChange(value: unknown, old: unknown, variant: string) {
                if (onValueChange) {
                    onValueChange(value as T, old as T, variant);
                }
            },
            // Flags not directly on the Field interface but used via `as any`
            // in core-provider (getValue/setValue/reset).
        } as Field & {
            getValue(): T | undefined;
            setValue(next: T | undefined): void;
            reset(): void;
        };

        // Imperative helpers used by the core
        (f as any).getValue = () => stateRef.current.value;
        (f as any).setValue = (next: T | undefined) => {
            stateRef.current.value = next;
            setValueState(next);
        };
        (f as any).reset = () => {
            stateRef.current.value = defaultValue;
            stateRef.current.error = "";
            stateRef.current.loading = false;

            setValueState(defaultValue);
            setErrorState("");
            setLoadingState(false);
        };

        fieldRef.current = f;
    }

    const field = fieldRef.current;

    // Sync prop-driven flags when they change
    React.useEffect(() => {
        setRequired(requiredProp);
        if (field) {
            field.required = requiredProp;
        }
    }, [requiredProp, field]);

    React.useEffect(() => {
        setDisabled(disabledProp);
    }, [disabledProp]);

    React.useEffect(() => {
        setReadOnly(readOnlyProp);
    }, [readOnlyProp]);

    // Register field with the core
    React.useEffect(() => {
        if (!field) return;

        form.addField(field);

        return () => {
            // Remove from registry directly
            const registry = form.inputs as any;
            if (registry && typeof registry.remove === "function") {
                registry.remove(field.key);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form, field]);

    // Value setter that wires into form-level change + button control
    function setValue(next: T | undefined, variant: string = "direct") {
        const prev = stateRef.current.value as T | undefined;
        if (Object.is(prev, next)) return;

        const runFormOnChange = () => {
            const props: any = form.props ?? {};
            const fn = props.onChange as
                | ((
                      form: CoreContext<Dict>,
                      current: Field,
                      options: Dict
                  ) => void)
                | undefined;

            if (!fn) return;

            fn(form as any, field, {
                variant,
                value: next,
                previous: prev,
            });
        };

        const props: any = form.props ?? {};
        const changeBefore = !!props.changeBefore;

        if (changeBefore) {
            runFormOnChange();
        }

        stateRef.current.value = next;
        setValueState(next);

        // Local field-level onChange
        if (field.onChange) {
            field.onChange(next, prev, variant);
        }

        if (!changeBefore) {
            runFormOnChange();
        }

        // Let the core adjust the active button’s disabled state
        form.controlButton();
    }

    function setError(message: string) {
        stateRef.current.error = message;
        setErrorState(message);
    }

    function setLoading(loading: boolean) {
        stateRef.current.loading = loading;
        setLoadingState(loading);
    }

    return {
        ref: ref as React.RefObject<HTMLElement>,
        get key() {
            return keyRef.current!;
        },
        value,
        setValue,
        error,
        setError,
        loading,
        setLoading,
        required,
        setRequired,
        disabled,
        setDisabled,
        readOnly,
        setReadOnly,
        name: field.name!,
        bindId: field.bindId!,
        bind: field.bind,
        shared: field.shared,
        groupId: field.groupId,
        alias: field.alias,
        main: field.main,
        ignore: field.ignore,
        get defaultValue() {
            return stateRef.current.original as T | undefined;
        },
        get originalValue() {
            return stateRef.current.original;
        },
        form,
        validate(report?: boolean) {
            return field.validate?.(report);
        },
    };
}
```

---
#### 17


` File: packages/form-palette/src/core/hooks/use-optional-field.ts`  [↑ Back to top](#index)

```ts
// src/core/hooks/use-optional-field.ts
// noinspection GrazieInspection
import * as React from "react";
import {
    useField,
    type UseFieldOptions,
    type UseFieldReturn,
} from "@/core/hooks/use-field";
import type { CoreContext, Dict } from "@/schema/core";

/**
 * Optional variant of `useField`.
 *
 * - If there is a CoreProvider, behaves like `useField`.
 * - If not, it becomes a self-managed field (value/error/loading/etc).
 */
export function useOptionalField<T = unknown>(
    options: UseFieldOptions<T>
): UseFieldReturn<T> {
    // Try strict core-bound field first.
    try {
        return useField<T>(options);
    } catch {
        // Fall through to self-managed mode.
    }

    // --- Self-managed fallback (no CoreProvider) ---

    if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn(
            "[FormPalette] useOptionalField: No CoreProvider found. " +
            "Running in self-managed mode."
        );
    }

    const {
        name: rawName,
        bindId: rawBindId,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        required: requiredProp = false,
        defaultValue,
        disabled: disabledProp = false,
        readOnly: readOnlyProp = false,
        validate,
        getOriginalValue,
        onValueChange,
    } = options;

    const ref = React.useRef<HTMLElement>(null);

    const [value, setValueState] = React.useState<T | undefined>(defaultValue);
    const [error, setErrorState] = React.useState<string>("");
    const [loading, setLoadingState] = React.useState<boolean>(false);
    const [required, setRequired] = React.useState<boolean>(requiredProp);
    const [disabled, setDisabled] = React.useState<boolean>(disabledProp);
    const [readOnly, setReadOnly] = React.useState<boolean>(readOnlyProp);

    const originalRef = React.useRef<unknown>(
        getOriginalValue
            ? getOriginalValue(defaultValue as T | undefined)
            : defaultValue
    );

    const id = React.useId();

    const keyRef = React.useRef<string>("");
    if (!keyRef.current) {
        if (rawName && rawName.trim()) {
            keyRef.current = `${rawName.trim()}-${id}`;
        } else if (rawBindId && rawBindId.trim()) {
            keyRef.current = `${rawBindId.trim()}-${id}`;
        } else {
            keyRef.current = `field-${Math.random()
                .toString(36)
                .slice(2)}-${id}`;
        }
    }

    const bindIdRef = React.useRef<string>("");
    if (!bindIdRef.current) {
        bindIdRef.current = (rawBindId && rawBindId.trim()) || keyRef.current;
    }

    // Keep prop-driven flags in sync
    React.useEffect(() => {
        setRequired(requiredProp);
    }, [requiredProp]);

    React.useEffect(() => {
        setDisabled(disabledProp);
    }, [disabledProp]);

    React.useEffect(() => {
        setReadOnly(readOnlyProp);
    }, [readOnlyProp]);

    function setValue(next: T | undefined, variant: string = "direct") {
        const prev = value;
        if (Object.is(prev, next)) return;

        setValueState(next);

        if (onValueChange) {
            onValueChange(next as T, prev as T, variant);
        }
    }

    function setError(message: string) {
        setErrorState(message);
    }

    function setLoading(next: boolean) {
        setLoadingState(next);
    }

    function runValidate(report?: boolean): boolean {
        const current = value as T;
        let ok = true;
        let message = "";

        if (
            required &&
            (current === undefined ||
                current === null ||
                (typeof current === "string" && current.trim() === "") ||
                (Array.isArray(current) && current.length === 0))
        ) {
            ok = false;
            message = "This field is required.";
        } else if (validate) {
            const result = validate(current, undefined, undefined, !!report);
            if (typeof result === "string") {
                ok = false;
                message = result;
            } else if (!result) {
                ok = false;
            }
        }

        if (report) {
            setErrorState(ok ? "" : message);
        }

        return ok;
    }

    // Minimal stub so callers can safely access `field.form`
    const dummyForm = {} as CoreContext<Dict>;

    return {
        ref: ref as React.RefObject<HTMLElement>,
        get key() {
            return keyRef.current;
        },
        value,
        setValue,
        error,
        setError,
        loading,
        setLoading,
        required,
        setRequired,
        disabled,
        setDisabled,
        readOnly,
        setReadOnly,
        name: rawName?.trim() ?? "",
        bindId: bindIdRef.current,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        get defaultValue() {
            return originalRef.current as T | undefined;
        },
        get originalValue() {
            return originalRef.current;
        },
        form: dummyForm,
        validate(report?: boolean) {
            return runValidate(report);
        },
    };
}
```

---
#### 18


` File: packages/form-palette/src/core/index.ts`  [↑ Back to top](#index)

```ts
export * from './adapter-registry';

export { CoreProvider } from './core-provider'
export { CoreShell as Form, type CoreShellProps } from './core-shell'
export { CoreRoot as FormRoot } from './core-root'

export * from './hooks/use-button';
export * from './hooks/use-core';
export * from './hooks/use-core-context';
export * from './hooks/use-field';
export * from './hooks/use-optional-field'
export * from './errors'
```

---
#### 19


` File: packages/form-palette/src/core/registry/binder-registry.ts`  [↑ Back to top](#index)

```ts
// src/core/registry/binder-registry.ts
// noinspection JSUnusedGlobalSymbols

import type { Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { BindHost } from "@/core/bound/bind-host";
import {
    getBoundField,
    hasBoundField,
    readBoundValue,
    setBoundValue,
    setBoundError,
    validateBoundField,
    observeBoundField,
} from "@/core/bound/observe-bound-field";
import { waitForBoundField } from "@/core/bound/wait-for-bound-field";

/**
 * BinderRegistry: bound-field utilities for a given host (CoreContext or FieldRegistry).
 *
 * - Hosts must satisfy BindHost (getBind + optional controlButton).
 * - FieldRegistry already does (via getBind() we added).
 * - CoreContext also does.
 *
 * You typically access this via:
 *   form.inputs.binding  // where inputs is a FieldRegistry
 */
export class BinderRegistry<V extends Dict = Dict> {
    constructor(private readonly host: BindHost<V>) {}

    /** Raw field access. */
    get(bindId: string): Field | undefined {
        return getBoundField(this.host, bindId);
    }

    has(bindId: string): boolean {
        return hasBoundField(this.host, bindId);
    }

    /** Read current value. */
    value<T = unknown>(bindId: string): T | undefined {
        return readBoundValue<T, V>(this.host, bindId);
    }

    /** Set value (and trigger controlButton / onChange). */
    set<T = unknown>(
        bindId: string,
        value: T,
        variant: string = "util"
    ): boolean {
        return setBoundValue<T, V>(this.host, bindId, value, variant);
    }

    /** Set error message on the bound field. */
    error(bindId: string, msg: string): boolean {
        return setBoundError<V>(this.host, bindId, msg);
    }

    /** Run the field’s own validate(). */
    validate(bindId: string, report = true): boolean {
        return validateBoundField<V>(this.host, bindId, report);
    }

    /** Observe a bound field’s value/error and liveness. */
    observe<T = unknown>(
        bindId: string,
        handler: (evt: {
            exists: boolean;
            field?: Field;
            value?: T;
            error?: string;
        }) => void,
        pollMs = 300
    ): () => void {
        return observeBoundField<T, V>(this.host, bindId, handler, pollMs);
    }

    /** Wait for a bound field to appear. */
    wait(bindId: string, timeoutMs = 5000): Promise<Field> {
        return waitForBoundField<V>(this.host, bindId, timeoutMs);
    }
}
```

---
#### 20


` File: packages/form-palette/src/core/registry/field-registry.ts`  [↑ Back to top](#index)

```ts
// src/core/registry/field-registry.ts

import type { Field } from "@/schema/field";
import { BinderRegistry } from "@/core/registry/binder-registry";

/**
 * Runtime helper: check if a DOM node is currently attached.
 *
 * Guards against SSR or test environments where document may not exist.
 */
export function isInDom(node: Element | null | undefined): boolean {
    if (!node || !(node instanceof Node)) return false;
    if (typeof document === "undefined") return false;
    return document.body.contains(node);
}

/**
 * Central store for all fields registered with the core runtime.
 *
 * Goals:
 * - Keep stable Field references (no cloning).
 * - Prefer mounted fields for all “get” operations.
 * - Prune stale/detached fields opportunistically.
 */
export class FieldRegistry {
    private list: Field[] = [];
    #binding: BinderRegistry | undefined;

    // ─────────────────────────────────────────────────────────
    // internals
    // ─────────────────────────────────────────────────────────

    private getEl(field: Field): Element | null {
        const anyField = field as any;
        const el = anyField?.ref?.current as Element | null | undefined;
        return el ?? null;
    }

    /** Mounted = has an element and that element is currently in the DOM. */
    private isMounted(field: Field): boolean {
        return isInDom(this.getEl(field));
    }

    /**
     * Detached = has an element but it is NOT currently in the DOM.
     * Note: if ref.current is null, we treat it as “unknown” (do NOT prune).
     */
    private isDetached(field: Field): boolean {
        const el = this.getEl(field);
        return !isInDom(el);
    }

    /** Mounted-first stable ordering (does not mutate input). */
    private sortMountedFirst(fields: Field[]): Field[] {
        if (fields.length <= 1) return fields.slice();
        return fields
            .slice()
            .sort(
                (a, b) => Number(this.isMounted(b)) - Number(this.isMounted(a))
            );
    }

    /** Prefer the first mounted candidate; else fall back to first candidate. */
    private pickPreferred(fields: Field[]): Field | undefined {
        if (!fields.length) return undefined;
        const mounted = fields.find((f) => this.isMounted(f));
        return mounted ?? fields[0];
    }

    /**
     * Remove detached fields.
     *
     * IMPORTANT: We only remove entries that have a non-null ref.current AND are
     * not in the DOM. We do not remove “unknown” (null-ref) fields because they
     * may be in the process of mounting.
     */
    private pruneDetached(): void {
        if (!this.list.length) return;
        this.list = this.list.filter((f) => !this.isDetached(f));
    }

    /**
     * Remove detached fields that conflict with an incoming field by identifier.
     * This prevents stale “same-name / same-bindId / same-groupId” entries from
     * hijacking lookups.
     */
    private pruneDetachedConflicts(incoming: Field): void {
        const anyIncoming = incoming as any;

        const name = (incoming.name ?? "").trim();
        const bindId = (anyIncoming.bindId as string | undefined) ?? "";
        const groupId = (anyIncoming.groupId as string | undefined) ?? "";

        if (!name && !bindId && !groupId) return;

        this.list = this.list.filter((f) => {
            if (!this.isDetached(f)) return true;

            const anyF = f as any;
            const fName = (f.name ?? "").trim();

            const sameName = !!name && fName === name;
            const sameBind = !!bindId && anyF.bindId === bindId;
            const sameGroup = !!groupId && anyF.groupId === groupId;

            // If it matches any identifier and is detached → prune it.
            return !(sameName || sameBind || sameGroup);
        });
    }

    /**
     * Whether this field should be tracked at all.
     *
     * We require at least one of: name, bindId, groupId.
     */
    hasIdentifier(field: Field): boolean {
        const anyField = field as any;
        const name = (field.name ?? "").trim();
        return !!(name || anyField.bindId || anyField.groupId);
    }

    // ─────────────────────────────────────────────────────────
    // mutations
    // ─────────────────────────────────────────────────────────

    /**
     * Add a field to the registry if it has an identifier.
     *
     * Rules:
     * - Opportunistically prune detached fields.
     * - Prune detached conflicts (same name/bindId/groupId) before adding.
     * - If the same field instance is already tracked, ignore.
     * - If the same key already exists (rare), prefer mounted; otherwise replace.
     */
    add(field: Field): void {
        if (!this.hasIdentifier(field)) return;

        // Keep the list clean as fields remount/unmount.
        this.pruneDetached();

        // Remove stale entries that would conflict with lookups.
        this.pruneDetachedConflicts(field);

        // Same instance? do nothing.
        if (this.list.includes(field)) return;

        const incomingKey = (field as any)?.key as string | undefined;

        // If a field with the same key exists, prefer mounted one.
        if (incomingKey) {
            const idx = this.list.findIndex(
                (f) => (f as any)?.key === incomingKey
            );
            if (idx !== -1) {
                const existing = this.list[idx];
                const existingMounted = this.isMounted(existing);
                const incomingMounted = this.isMounted(field);

                // Prefer mounted; if neither mounted, prefer the incoming (newer).
                if (existingMounted && !incomingMounted) return;
                this.list[idx] = field;
                return;
            }
        }

        this.list.push(field);
    }

    /**
     * Remove a field from the registry.
     */
    remove(field: Field): void {
        const idx = this.list.indexOf(field);
        if (idx === -1) return;
        this.list.splice(idx, 1);
    }

    /**
     * Clear all tracked fields.
     */
    clear(): void {
        this.list = [];
    }

    // ─────────────────────────────────────────────────────────
    // accessors (mounted-preferred)
    // ─────────────────────────────────────────────────────────

    /**
     * All fields tracked by this registry (mounted-first).
     */
    all(): Field[] {
        // Keep list tidy when reading too.
        this.pruneDetached();
        return this.sortMountedFirst(this.list);
    }

    /** All fields that have a non-empty name (mounted-first). */
    getAllNamed(): Field[] {
        this.pruneDetached();
        return this.sortMountedFirst(
            this.list.filter((f) => !!(f.name && f.name.trim().length > 0))
        );
    }

    /** All fields that have a bindId (mounted-first). */
    getAllBound(): Field[] {
        this.pruneDetached();
        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).bindId)
        );
    }

    /** All fields that have a groupId (mounted-first). */
    getAllGrouped(): Field[] {
        this.pruneDetached();
        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).groupId)
        );
    }

    // ─────────────────────────────────────────────────────────
    // name-based lookups (prefer mounted)
    // ─────────────────────────────────────────────────────────

    /**
     * First field with a given name (exact, trimmed match).
     *
     * Behaviour:
     * - Prefer a field whose ref is currently in the DOM.
     * - If none are mounted, fall back to the first matching field.
     */
    getByName(name: string): Field | undefined {
        if (!name) return undefined;
        const target = name.trim();
        if (!target) return undefined;

        this.pruneDetached();

        const candidates = this.list.filter(
            (f) => (f.name ?? "").trim() === target
        );
        return this.pickPreferred(candidates);
    }

    /**
     * All fields with a given name (exact, trimmed match), mounted-first.
     */
    getAllByName(name: string): Field[] {
        if (!name) return [];
        const target = name.trim();
        if (!target) return [];

        this.pruneDetached();

        return this.sortMountedFirst(
            this.list.filter((f) => (f.name ?? "").trim() === target)
        );
    }

    // ─────────────────────────────────────────────────────────
    // groupId-based lookups (prefer mounted)
    // ─────────────────────────────────────────────────────────

    /** First field with the given groupId (prefer mounted). */
    getByGroupId(id: string): Field | undefined {
        if (!id) return undefined;

        this.pruneDetached();

        const candidates = this.list.filter((f) => (f as any).groupId === id);
        return this.pickPreferred(candidates);
    }

    /** All fields with the given groupId (mounted-first). */
    getAllByGroupId(id: string): Field[] {
        if (!id) return [];

        this.pruneDetached();

        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).groupId === id)
        );
    }

    // ─────────────────────────────────────────────────────────
    // bindId-based lookups (prefer mounted)
    // ─────────────────────────────────────────────────────────

    /**
     * All fields that share the given bindId (mounted-first).
     */
    getAllByBind(id: string): Field[] {
        if (!id) return [];

        this.pruneDetached();

        return this.sortMountedFirst(
            this.list.filter((f) => (f as any).bindId === id)
        );
    }

    /**
     * First field with the given bindId (prefer mounted).
     */
    getByBind(id: string): Field | undefined {
        if (!id) return undefined;

        const candidates = this.getAllByBind(id);
        return this.pickPreferred(candidates);
    }

    getBind(id: string): Field | undefined {
        return this.getByBind(id);
    }

    get binding(): BinderRegistry {
        if (!(this.#binding instanceof BinderRegistry)) {
            this.#binding = new BinderRegistry(this);
        }
        return this.#binding;
    }
}
```

---
#### 21


` File: packages/form-palette/src/input/input-field.tsx`  [↑ Back to top](#index)

```tsx
// src/input/input-field.tsx
// noinspection JSUnusedLocalSymbols,SpellCheckingInspection,DuplicatedCode

import * as React from "react";

import type {
    InputFieldClassNameProps,
    InputFieldClassNames,
    InputFieldProps,
} from "@/input/input-props";
import type {
    FieldLayoutConfig,
    LayoutResolveContext,
    SlotPlacement,
    ValidateResult,
} from "@/schema/input-field";
import type { VariantKey, VariantValueFor } from "@/schema/variant";
import { getVariant } from "@/variants";

import {
    Field as UiField,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldTitle,
} from "@/presets/ui/field";
import { ChangeDetail } from "@/variants/shared";
import { buildLayoutGraph, type HelperSlot } from "@/input/input-layout-graph";
import { cn } from "@/lib/utils";
import { useOptionalField } from "@/core";

/**
 * Normalise a ValidateResult into an array of error messages.
 */
function normalizeValidateResult(result: ValidateResult): string[] {
    if (result === undefined || result === null || result === true) return [];
    if (result === false) return ["Invalid value."];
    if (typeof result === "string") return result ? [result] : [];
    if (Array.isArray(result)) return result.filter(Boolean);
    return [];
}

/**
 * Build the layout for this field using:
 * - variant defaults
 * - host overrides
 * - optional variant-level resolveLayout()
 */
function resolveLayoutForField(
    defaults: FieldLayoutConfig | undefined,
    overrides: Partial<FieldLayoutConfig>,
    props: unknown,
    variantResolve?: (ctx: LayoutResolveContext) => FieldLayoutConfig
): FieldLayoutConfig {
    const base: FieldLayoutConfig = defaults ? { ...defaults } : {};

    if (variantResolve) {
        return variantResolve({
            defaults: base,
            overrides,
            props,
        });
    }

    // Fallback: shallow merge defaults + overrides
    return {
        ...base,
        ...overrides,
    };
}

/**
 * Render a single helper slot using the Shadcn field primitives.
 */
function renderHelperSlot(
    root: "label" | "input",
    slot: HelperSlot,
    classes: any
): React.ReactNode {
    const placement: SlotPlacement = slot.placement;

    switch (slot.id) {
        case "sublabel":
            return (
                <FieldDescription
                    key={`sublabel-${placement}-${root}`}
                    className={cn(
                        "text-xs text-muted-foreground",
                        classes?.sublabel
                    )}
                    data-slot={`sublabel-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "description":
            return (
                <FieldDescription
                    key={`description-${placement}-${root}`}
                    className={cn(
                        "text-xs text-muted-foreground",
                        classes?.description
                    )}
                    data-slot={`description-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "helpText":
            return (
                <FieldDescription
                    key={`helpText-${placement}-${root}`}
                    className={cn(
                        "text-xs text-muted-foreground",
                        classes?.helpText
                    )}
                    data-slot={`helptext-${placement}`}
                >
                    {slot.content}
                </FieldDescription>
            );

        case "errorText":
            return (
                <FieldError
                    key={`error-${placement}-${root}`}
                    className={cn("text-xs text-destructive", classes?.error)}
                    data-slot={`error-${placement}`}
                >
                    {slot.content}
                </FieldError>
            );

        case "tags":
            return (
                <div
                    key={`tags-${placement}-${root}`}
                    className={cn("flex items-center gap-1", classes?.tags)}
                    data-slot={`tags-${placement}`}
                >
                    {slot.content}
                </div>
            );

        default:
            return null;
    }
}

export function getClasses(
    props: InputFieldClassNameProps & {
        className?: string;
        classes?: Partial<InputFieldClassNames>;
    }
): InputFieldClassNames {
    const legacy = props.classes ?? {};

    return {
        root: cn(legacy.root, props.className) || undefined,

        labelRow: cn(legacy.labelRow, props.labelRowClassName) || undefined,
        inlineRow: cn(legacy.inlineRow, props.inlineRowClassName) || undefined,

        label: cn(legacy.label, props.labelClassName) || undefined,
        sublabel: cn(legacy.sublabel, props.sublabelClassName) || undefined,
        description:
            cn(legacy.description, props.descriptionClassName) || undefined,
        helpText: cn(legacy.helpText, props.helpTextClassName) || undefined,
        error: cn(legacy.error, props.errorClassName) || undefined,

        group: cn(legacy.group, props.groupClassName) || undefined,
        content: cn(legacy.content, props.contentClassName) || undefined,
        variant: cn(legacy.variant, props.variantClassName) || undefined,

        inlineInputColumn:
            cn(legacy.inlineInputColumn, props.inlineInputColumnClassName) ||
            undefined,
        inlineLabelColumn:
            cn(legacy.inlineLabelColumn, props.inlineLabelColumnClassName) ||
            undefined,

        required: cn(legacy.required, props.requiredClassName) || undefined,
        tag: cn(legacy.tag, props.tagClassName) || undefined,
    };
}

/**
 * Public InputField component.
 *
 * - Uses `useField` to register a Field and manage value/error/loading.
 * - Delegates rendering to the chosen variant's `Variant` component.
 * - Uses Shadcn's Field primitives for structure.
 * - Lets variants influence layout via defaults + optional resolveLayout().
 * - Uses a layout graph (buildLayoutGraph) + getSlotsFor().render(...) to
 *   position helpers (sublabel, description, helpText, error, tags) relative to
 *   "label" vs "input" roots without empty wrapper divs.
 */
export function InputField<K extends VariantKey = VariantKey>(
    props: InputFieldProps<K>
) {
    const {
        variant,

        // Field identity / wiring
        name,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        required,
        defaultValue,

        // Chrome
        label,
        sublabel,
        description,
        helpText,
        errorText,

        // Container + tags
        contain,
        tags,
        tagPlacement,

        // Layout overrides
        labelPlacement,
        sublabelPlacement,
        descriptionPlacement,
        helpTextPlacement,
        errorTextPlacement,
        inline,
        fullWidth,
        size,
        density,

        // Validation hook
        onValidate,
        onChange,

        // Field wrapper props
        className,
        style,
        classes: _depreciated,

        // Everything else → forwarded to variant
        ...rest
    } = props as InputFieldProps & {
        className?: string;
        style?: React.CSSProperties;
    };

    const module = getVariant(variant);

    if (!module) {
        if (process.env.NODE_ENV !== "production") {
            // eslint-disable-next-line no-console
            console.warn(
                `[form-palette] InputField: variant "${String(
                    variant
                )}" is not registered.`
            );
        }
        return null;
    }

    const classes = getClasses(props);

    type TValue = VariantValueFor<K>;

    // Compute layout: defaults + host overrides + optional variant resolver
    const layout = React.useMemo(() => {
        const defaultsLayout = module.defaults?.layout;
        const overrides: Partial<FieldLayoutConfig> = {};

        if (labelPlacement !== undefined) {
            overrides.labelPlacement = labelPlacement;
        }
        if (sublabelPlacement !== undefined) {
            overrides.sublabelPlacement = sublabelPlacement;
        }
        if (descriptionPlacement !== undefined) {
            overrides.descriptionPlacement = descriptionPlacement;
        }
        if (helpTextPlacement !== undefined) {
            overrides.helpTextPlacement = helpTextPlacement;
        }
        if (errorTextPlacement !== undefined) {
            overrides.errorTextPlacement = errorTextPlacement;
        }
        if (tagPlacement !== undefined) {
            overrides.tagPlacement = tagPlacement;
        }
        if (inline !== undefined) {
            overrides.inline = inline;
        }
        if (fullWidth !== undefined) {
            overrides.fullWidth = fullWidth;
        }

        return resolveLayoutForField(
            defaultsLayout,
            overrides,
            props,
            module.resolveLayout as any
        );
    }, [
        module,
        labelPlacement,
        sublabelPlacement,
        descriptionPlacement,
        helpTextPlacement,
        errorTextPlacement,
        tagPlacement,
        inline,
        fullWidth,
        props,
    ]);

    const effectiveSize =
        size ?? module.defaults?.layout?.defaultSize ?? undefined;
    const effectiveDensity =
        density ?? module.defaults?.layout?.defaultDensity ?? undefined;

    /**
     * Validation callback used by the field hook.
     *
     * It combines:
     * - variant-level validation (module.validate)
     * - per-field validation (props.onValidate)
     */
    const validate = React.useCallback(
        (
            value: TValue | undefined,
            field: any,
            form: any,
            _report: boolean
        ): boolean | string => {
            const messages: string[] = [];

            if (module.validate) {
                const res = module.validate(value, {
                    required: !!required,
                    props: props as any,
                    field: field as any,
                    form: form as any,
                });
                messages.push(...normalizeValidateResult(res));
            }

            if (onValidate) {
                const res = onValidate(value as any, field as any, form as any);
                messages.push(...normalizeValidateResult(res));
            }

            if (!messages.length) return true;
            return messages[0] ?? "Invalid value.";
        },
        [module, required, onValidate, props]
    );

    // Hook into the core: register field, track value/error/loading
    const field = useOptionalField<TValue>({
        name,
        bind,
        shared,
        groupId,
        alias,
        main,
        ignore,
        required,
        defaultValue: defaultValue as TValue | undefined,
        validate,
    } as any);

    const { value, setValue, error, ref, key } = field;

    const Variant = module.Variant as React.ComponentType<any>;
    const visualError = (errorText ?? error) || "";

    /**
     * Central change handler for this field.
     *
     * Flow:
     *   Variant.onValue(next, detail) →
     *   InputField.handleValueChange →
     *   props.onChange?.({ value, detail, event, preventDefault }) →
     *   (if not prevented) setValue(final)
     */
    const handleValueChange = React.useCallback(
        (next: TValue | undefined, detail?: ChangeDetail) => {
            let finalValue = next;
            let defaultPrevented = false;

            if (onChange) {
                const e = {
                    value: next,
                    preventDefault() {
                        defaultPrevented = true;
                    },
                    get isDefaultPrevented() {
                        return defaultPrevented;
                    },
                    event: detail?.nativeEvent as
                        | React.SyntheticEvent
                        | undefined,
                    detail: detail as ChangeDetail,
                };

                onChange(e);

                // If the handler returns a value, use it instead of `next`.
                finalValue = e.value;
                if (defaultPrevented) {
                    // Host took control and blocked the core update.
                    return;
                }
            }

            // NOTE: Second argument is an optional "source" tag.
            // If your setValue only accepts one arg, drop `String(variant)`.
            (setValue as any)(finalValue, String(variant));
        },
        [onChange, setValue, variant]
    );

    const disabledProp = (rest as any).disabled;
    const readOnlyProp = (rest as any).readOnly;

    // Convenience shorthands for layout
    const lp = layout.labelPlacement;
    const sp = layout.sublabelPlacement;
    const dp = layout.descriptionPlacement;
    const hp = layout.helpTextPlacement;
    const ep = layout.errorTextPlacement;
    const tp = layout.tagPlacement;

    const isInline = !!layout.inline;
    const isCompactInline = isInline && layout.fullWidth === false;

    const rootClassName = cn(
        "gap-1",
        contain && !inline && "rounded-xl border border-border bg-background",
        classes?.root,
        className
    );

    // Variant-level className merge (host + classes.variant)
    const hostVariantClass = (rest as any).className as string | undefined;

    const mergedVariantClass =
        cn(
            // In compact inline mode, force the control to size to its content
            isCompactInline && "inline-flex w-auto",
            hostVariantClass,
            classes?.variant
        ) || undefined;

    // Build tags content cluster (individual pills)
    const tagsContent = React.useMemo(() => {
        const items = (tags ?? []) as any[];

        if (!items.length) return null;

        return (
            <>
                {items.map((tag, index) => (
                    <span
                        key={index}
                        className={cn(
                            "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                            tag.className,
                            classes?.tag
                        )}
                        style={{
                            color: tag.color,
                            backgroundColor: tag.bgColor,
                        }}
                    >
                        {tag.icon && (
                            <span className="shrink-0">{tag.icon}</span>
                        )}
                        <span>{tag.label}</span>
                    </span>
                ))}
            </>
        );
    }, [tags, classes?.tag]);

    // Build helper layout graph for this field
    const graph = React.useMemo(
        () =>
            buildLayoutGraph({
                layout,
                sublabel,
                description,
                helpText,
                errorText: visualError || undefined,
                tags: tagsContent || undefined,
            }),
        [layout, sublabel, description, helpText, visualError, tagsContent]
    );

    // Detect whether there are any label-root slots so we don't render empty rows/spacing
    const hasLabelSlotsAt = (placement: SlotPlacement): boolean => {
        let found = false;

        graph.getSlotsFor("label", placement).render((slots: HelperSlot[]) => {
            if (slots.length > 0) {
                found = true;
            }
            return null;
        });

        return found;
    };

    const hasLabelLeftSlots = hasLabelSlotsAt("left");
    const hasLabelRightSlots = hasLabelSlotsAt("right");
    const hasLabelAboveSlots = hasLabelSlotsAt("above");
    const hasLabelBelowSlots = hasLabelSlotsAt("below");

    // Any content that belongs to the label *block* at all
    const hasAnyLabelBlockContent =
        !!label ||
        hasLabelLeftSlots ||
        hasLabelRightSlots ||
        hasLabelAboveSlots ||
        hasLabelBelowSlots;

    // Content that specifically lives inside the label "row"
    const hasLabelRowContent =
        !!label || hasLabelLeftSlots || hasLabelRightSlots;

    // ─────────────────────────────────────────────────────
    // INLINE LAYOUT
    // ─────────────────────────────────────────────────────

    // In inline mode, label can effectively be left / right / hidden.
    const inlineLabelSide: "left" | "right" | "hidden" =
        lp === "right" ? "right" : lp === "hidden" ? "hidden" : "left";

    // Width semantics for inline:
    // - compact inline (fullWidth === false) → input column is content-sized
    // - normal inline                     → input grows, label minimal
    const inlineInputColClass = cn(
        "flex flex-col",
        isCompactInline ? "flex-none" : "flex-1 min-w-0",
        classes?.inlineInputColumn
    );

    const inlineLabelColClass = cn(
        isCompactInline ? "flex-1 min-w-0" : "min-w-0",
        classes?.inlineLabelColumn
    );

    const inlineFieldGroupClass = isCompactInline
        ? cn(
              // compact, content-sized group
              "inline-flex w-auto",
              // kill the Shadcn container on this group in compact-inline mode
              "[container-type:normal]",
              "[container-name:none]",
              classes?.group
          )
        : (classes?.group ?? undefined);

    const inlineFieldContentClass = isCompactInline
        ? cn("flex-none w-auto", classes?.content)
        : cn("w-full", classes?.content);

    const inlineInputColumn = (
        <div className={inlineInputColClass}>
            {/* Above input (input root) */}
            {graph
                .getSlotsFor("input", "above")
                .render((slots) =>
                    slots.map((slot) =>
                        renderHelperSlot("input", slot, classes)
                    )
                )}

            <FieldGroup className={inlineFieldGroupClass}>
                <FieldContent className={inlineFieldContentClass}>
                    <Variant
                        {...(rest as any)}
                        id={key}
                        ref={ref as any}
                        value={value}
                        onValue={handleValueChange}
                        error={error}
                        required={required}
                        disabled={disabledProp}
                        readOnly={readOnlyProp}
                        size={effectiveSize}
                        density={effectiveDensity}
                        className={mergedVariantClass}
                    />
                </FieldContent>
            </FieldGroup>

            {/* Below input (input root) */}
            {graph
                .getSlotsFor("input", "below")
                .render((slots) =>
                    slots.map((slot) =>
                        renderHelperSlot("input", slot, classes)
                    )
                )}
        </div>
    );

    const inlineLabelColumn =
        inlineLabelSide === "hidden" || !hasAnyLabelBlockContent ? null : (
            <div className={cn("flex flex-col gap-0", inlineLabelColClass)}>
                {/* Above label (label root) */}
                {graph
                    .getSlotsFor("label", "above")
                    .render((slots) =>
                        slots.map((slot) =>
                            renderHelperSlot("label", slot, classes)
                        )
                    )}

                {hasLabelRowContent && (
                    <div
                        className={cn(
                            "flex items-baseline justify-between gap-1",
                            classes?.labelRow
                        )}
                        data-slot="label-row"
                    >
                        {/* Left-of-label helpers (label root) */}
                        {graph.getSlotsFor("label", "left").render((slots) => (
                            <div className="flex items-baseline gap-1">
                                {slots.map((slot) =>
                                    renderHelperSlot("label", slot, classes)
                                )}
                            </div>
                        ))}

                        {label && (
                            <FieldLabel
                                htmlFor={key}
                                className={cn(
                                    "text-sm font-medium text-foreground",
                                    classes?.label
                                )}
                            >
                                <FieldTitle>
                                    {label}{" "}
                                    {required ? (
                                        <span
                                            className={cn(
                                                "text-destructive",
                                                classes?.required
                                            )}
                                        >
                                            *
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </FieldTitle>
                            </FieldLabel>
                        )}

                        {/* Right-of-label helpers (label root) */}
                        {graph.getSlotsFor("label", "right").render((slots) => (
                            <div className="flex items-baseline gap-1">
                                {slots.map((slot) =>
                                    renderHelperSlot("label", slot, classes)
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Below label (label root) */}
                {graph
                    .getSlotsFor("label", "below")
                    .render((slots) =>
                        slots.map((slot) =>
                            renderHelperSlot("label", slot, classes)
                        )
                    )}
            </div>
        );

    const inlineRowClassName = cn(
        "flex gap-2",
        hasLabelAboveSlots || hasLabelBelowSlots
            ? "items-start"
            : "items-center",
        classes?.inlineRow
    );

    // ─────────────────────────────────────────────────────
    // STACKED LAYOUT
    // ─────────────────────────────────────────────────────

    const hasStackedLabelBlock = lp !== "hidden" && hasAnyLabelBlockContent;

    const stackedGroupClassName = cn(
        hasStackedLabelBlock && hasLabelRowContent && "mt-0.5",
        classes?.group
    );

    const Element = contain ? "div" : React.Fragment;
    const attrs = (a: "l" | "i" = "l") =>
        contain
            ? a === "l"
                ? { className: "p-4 border-b border-input" }
                : { className: "px-4 pt-2 pb-4" }
            : {};

    return (
        <UiField
            className={rootClassName}
            style={style}
            data-variant={String(variant)}
            data-label-placement={lp ?? undefined}
            data-sublabel-placement={sp ?? undefined}
            data-description-placement={dp ?? undefined}
            data-helptext-placement={hp ?? undefined}
            data-errortext-placement={ep ?? undefined}
            data-tag-placement={tp ?? undefined}
            data-inline={isInline ? "true" : "false"}
            data-fullwidth={layout.fullWidth ? "true" : "false"}
        >
            {isInline ? (
                // INLINE MODE: label + control on the same row
                <div className={inlineRowClassName} data-slot="inline-row">
                    {inlineLabelSide === "right" ? (
                        <>
                            {inlineInputColumn}
                            {inlineLabelColumn}
                        </>
                    ) : inlineLabelSide === "hidden" ? (
                        <>{inlineInputColumn}</>
                    ) : (
                        <>
                            {inlineLabelColumn}
                            {inlineInputColumn}
                        </>
                    )}
                </div>
            ) : (
                // STACKED MODE
                <>
                    {hasStackedLabelBlock && (
                        <Element {...attrs()}>
                            {/* Above label (label root) */}
                            {graph
                                .getSlotsFor("label", "above")
                                .render((slots) =>
                                    slots.map((slot) =>
                                        renderHelperSlot("label", slot, classes)
                                    )
                                )}

                            {hasLabelRowContent && (
                                <div
                                    className={cn(
                                        "flex items-baseline justify-between gap-1",
                                        classes?.labelRow
                                    )}
                                    data-slot="label-row"
                                >
                                    {/* Left-of-label helpers (label root) */}
                                    {graph
                                        .getSlotsFor("label", "left")
                                        .render((slots) => (
                                            <div className="flex items-baseline gap-1">
                                                {slots.map((slot) =>
                                                    renderHelperSlot(
                                                        "label",
                                                        slot,
                                                        classes
                                                    )
                                                )}
                                            </div>
                                        ))}

                                    {label && (
                                        <FieldLabel
                                            htmlFor={key}
                                            className={cn(
                                                "text-sm font-medium text-foreground",
                                                classes?.label
                                            )}
                                        >
                                            <FieldTitle>
                                                {label}{" "}
                                                {required ? (
                                                    <span
                                                        className={cn(
                                                            "text-destructive",
                                                            classes?.required
                                                        )}
                                                    >
                                                        *
                                                    </span>
                                                ) : (
                                                    ""
                                                )}
                                            </FieldTitle>
                                        </FieldLabel>
                                    )}

                                    {/* Right-of-label helpers (label root) */}
                                    {graph
                                        .getSlotsFor("label", "right")
                                        .render((slots) => (
                                            <div className="flex items-baseline gap-1">
                                                {slots.map((slot) =>
                                                    renderHelperSlot(
                                                        "label",
                                                        slot,
                                                        classes
                                                    )
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Below label (label root) */}
                            {graph
                                .getSlotsFor("label", "below")
                                .render((slots) =>
                                    slots.map((slot) =>
                                        renderHelperSlot("label", slot, classes)
                                    )
                                )}
                        </Element>
                    )}

                    <Element {...attrs("i")}>
                        {/* Above input (input root) */}
                        {graph
                            .getSlotsFor("input", "above")
                            .render((slots) =>
                                slots.map((slot) =>
                                    renderHelperSlot("input", slot, classes)
                                )
                            )}

                        <FieldGroup className={stackedGroupClassName}>
                            <FieldContent
                                className={cn("w-full", classes?.content)}
                            >
                                <Variant
                                    {...(rest as any)}
                                    id={key}
                                    ref={ref as any}
                                    value={value}
                                    onValue={handleValueChange}
                                    error={error}
                                    required={required}
                                    disabled={disabledProp}
                                    readOnly={readOnlyProp}
                                    size={effectiveSize}
                                    density={effectiveDensity}
                                    className={mergedVariantClass}
                                />
                            </FieldContent>
                        </FieldGroup>

                        {/* Below input (input root) */}
                        {graph
                            .getSlotsFor("input", "below")
                            .render((slots) =>
                                slots.map((slot) =>
                                    renderHelperSlot("input", slot, classes)
                                )
                            )}
                    </Element>
                </>
            )}
        </UiField>
    );
}
```

---
#### 22


` File: packages/form-palette/src/input/input-layout-graph.ts`  [↑ Back to top](#index)

```ts
// src/input/input-layout-graph.ts

import * as React from "react";

import type {
    FieldLayoutConfig,
    FieldOrdering,
    FieldRootId,
    FieldSlotId,
    RelativeRootsMap,
    SlotPlacement,
} from "@/schema/input-field";

/**
 * Helper slots are all non-root slots:
 * - sublabel
 * - description
 * - helpText
 * - errorText
 */
export type HelperSlotId = Exclude<FieldSlotId, FieldRootId>;

export interface HelperSlot {
    id: HelperSlotId;
    root: FieldRootId;
    placement: SlotPlacement;
    content: React.ReactNode;
}

/**
 * Accessor for a (root, placement) group.
 *
 * - `slots()` gives you the concrete HelperSlot[] (possibly empty).
 * - `render(fn)` calls `fn(slots)` only if there are slots,
 *   otherwise returns null (so React renders nothing).
 */
export interface SlotAccessor {
    root: FieldRootId;
    placement: SlotPlacement;

    /**
     * Concrete list of slots for this root + placement.
     * May be an empty array.
     */
    slots(): HelperSlot[];

    /**
     * Render this group.
     *
     * If no slots are present, returns null so nothing is rendered.
     *
     * Example:
     *   graph
     *     .getSlotsFor("input", "below")
     *     .render((slots) =>
     *       slots.map((slot) =>
     *         renderHelperSlot("input", slot, classes)
     *       )
     *     );
     */
    render(renderFn: (slots: HelperSlot[]) => React.ReactNode): React.ReactNode;
}

/**
 * Layout graph for helpers.
 */
export interface LayoutGraph {
    helperSlots: HelperSlot[];

    /**
     * Get a slot accessor for a given root + placement.
     */
    getSlotsFor(root: FieldRootId, placement: SlotPlacement): SlotAccessor;
}

/**
 * Default root attachment for helpers when layout.relativeRoots
 * does not specify anything.
 */
const defaultRelativeRoots: RelativeRootsMap = {
    sublabel: "label",
    description: "input",
    helpText: "input",
    errorText: "input",
};

/**
 * Default relative ordering per root when layout.ordering
 * is not provided.
 *
 * Only governs *priority* when multiple helpers share the same
 * root + placement. It does not decide the placement itself.
 */
const defaultOrdering: FieldOrdering = {
    label: ["sublabel"],
    input: ["errorText", "description", "helpText"],
};

function defaultPlacementFor(id: HelperSlotId): SlotPlacement {
    if (id === "sublabel") {
        // Typical: small label text to the right of the main label
        return "right";
    }

    if (id == "tags") return "right";
    // For description/help/error, "below" the root is the usual default
    return "below";
}

interface BuildLayoutGraphArgs {
    layout: FieldLayoutConfig;
    /**
     * Raw contents for each helper slot.
     * Undefined/null means "no slot".
     */
    sublabel?: React.ReactNode;
    description?: React.ReactNode;
    helpText?: React.ReactNode;
    errorText?: React.ReactNode;
    tags?: React.ReactNode;
}

/**
 * Build a layout graph for helper slots given:
 * - the effective layout (after variant defaults + overrides)
 * - the actual content for each slot
 */
export function buildLayoutGraph(args: BuildLayoutGraphArgs): LayoutGraph {
    const { layout, sublabel, description, helpText, errorText, tags } = args;

    const relativeRoots: RelativeRootsMap = {
        ...defaultRelativeRoots,
        ...(layout.relativeRoots ?? {}),
    };

    const ordering: FieldOrdering = {
        ...defaultOrdering,
        ...(layout.ordering ?? {}),
    };

    const helperSlots: HelperSlot[] = [];

    const pushSlot = (
        id: HelperSlotId,
        content: React.ReactNode | undefined,
        placement: SlotPlacement | undefined,
    ) => {
        if (content === undefined || content === null) return;

        const root: FieldRootId =
            relativeRoots[id] ?? ((id === "sublabel" || id == 'tags') ? "label" : "input");

        const effectivePlacement: SlotPlacement =
            placement ?? defaultPlacementFor(id);

        if (effectivePlacement === "hidden") return;

        helperSlots.push({
            id,
            root,
            placement: effectivePlacement,
            content,
        });
    };

    pushSlot("sublabel", sublabel, layout.sublabelPlacement);
    pushSlot("description", description, layout.descriptionPlacement);
    pushSlot("helpText", helpText, layout.helpTextPlacement);
    pushSlot("errorText", errorText, layout.errorTextPlacement);
    pushSlot("tags", tags, layout.tagPlacement);

    function makeAccessor(
        root: FieldRootId,
        placement: SlotPlacement,
    ): SlotAccessor {
        // cache per accessor so multiple .slots()/.render() calls
        // don't keep re-filtering
        let cache: HelperSlot[] | null = null;

        const compute = (): HelperSlot[] => {
            if (cache) return cache;

            const base = helperSlots.filter(
                (s) => s.root === root && s.placement === placement,
            );

            const order = ordering[root] ?? [];
            if (!order.length) {
                cache = base;
                return cache;
            }

            cache = [...base].sort((a, b) => {
                const ai = order.indexOf(a.id);
                const bi = order.indexOf(b.id);

                const aRank = ai === -1 ? Number.POSITIVE_INFINITY : ai;
                const bRank = bi === -1 ? Number.POSITIVE_INFINITY : bi;

                return aRank - bRank;
            });

            return cache;
        };

        return {
            root,
            placement,
            slots: () => compute(),
            render(renderFn) {
                const slots = compute();
                if (!slots.length) return null; // nothing rendered
                return renderFn(slots);
            },
        };
    }

    return {
        helperSlots,
        getSlotsFor(root, placement) {
            return makeAccessor(root, placement);
        },
    };
}
```

---
#### 23


` File: packages/form-palette/src/input/input-props.ts`  [↑ Back to top](#index)

```ts
// src/input/input-props.ts
// noinspection DuplicatedCode

import * as React from "react";

import type { CoreContext, Dict } from "@/schema/core";
import type { Field } from "@/schema/field";
import type { FieldSize, FieldDensity, ChangeDetail } from "@/variants/shared";
import type {
    VariantKey,
    VariantValueFor,
    VariantPropsFor,
} from "@/schema/variant";
import type {
    LabelPlacement,
    SublabelPlacement,
    DescriptionPlacement,
    HelpTextPlacement,
    ErrorTextPlacement,
    ValidateResult,
    SlotPlacement,
} from "@/schema/input-field";

/**
 * Core, variant-agnostic props for InputField.
 *
 * @template TValue Logical value type for this field. Will be refined by
 *                  variant typing (VariantValueFor<K>).
 */
export interface InputFieldBaseProps<TValue = unknown> {
    // ─────────────────────────────────────────────
    // Identity / wiring into the core runtime
    // ─────────────────────────────────────────────

    name?: string;
    bind?: string;
    groupId?: string;
    shared?: string;
    ignore?: boolean;
    alias?: string
    main?: boolean;
    tags?: FieldTag[];
    contain?: boolean

    // ─────────────────────────────────────────────
    // Chrome / description
    // ─────────────────────────────────────────────

    label?: React.ReactNode;
    sublabel?: React.ReactNode;
    description?: React.ReactNode;
    helpText?: React.ReactNode;

    /**
     * Optional explicit error text to display.
     *
     * This is *visual* error copy. The actual validation state still
     * lives in field.error / schema / onValidate.
     */
    errorText?: React.ReactNode;

    /**
     * Placement hints for label / sublabel / description / helpText / errorText.
     *
     * These are purely layout hints; actual behaviour is implemented
     * by the preset / host component.
     */
    labelPlacement?: LabelPlacement;
    sublabelPlacement?: SublabelPlacement;
    descriptionPlacement?: DescriptionPlacement;
    helpTextPlacement?: HelpTextPlacement;
    errorTextPlacement?: ErrorTextPlacement;
    tagPlacement?: SlotPlacement

    // ─────────────────────────────────────────────
    // State flags
    // ─────────────────────────────────────────────

    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;

    size?: FieldSize;
    density?: FieldDensity;

    // ─────────────────────────────────────────────
    // Layout hooks
    // ─────────────────────────────────────────────

    inline?: boolean;
    fullWidth?: boolean;

    // ─────────────────────────────────────────────
    // Validation hooks
    // ─────────────────────────────────────────────

    onValidate?(
        value: TValue | undefined,
        field: Field,
        form: CoreContext<Dict>
    ): ValidateResult;

    /**
     * Per-field change hook at the InputField level.
     *
     * - `value` is what the variant is trying to set.
     * - `detail` comes from the variant (`ChangeDetail`).
     * - If you return `undefined`, the original value is used.
     * - If you return *anything else*, that is what will be stored
     *   in the core (and emitted to the form).
     */
    onChange?(e: {
        value: TValue | undefined,
        preventDefault(): void;
        event?: React.SyntheticEvent;
        readonly isDefaultPrevented?: boolean;
        readonly detail: ChangeDetail
    }): void;
}


export type Events<TRaw, TValue, TMeta> = {
    onValidate?(
        value: TValue | undefined,
        field: Field,
        form: CoreContext<Dict>
    ): ValidateResult;

    /**
     * Per-field change hook at the InputField level.
     *
     * - `value` is what the variant is trying to set.
     * - `detail` comes from the variant (`ChangeDetail`).
     * - If you return `undefined`, the original value is used.
     * - If you return *anything else*, that is what will be stored
     *   in the core (and emitted to the form).
     */
    onChange?(e: {
        value: TValue | undefined,
        preventDefault(): void;
        event?: React.SyntheticEvent;
        readonly isDefaultPrevented?: boolean;
        readonly detail: ChangeDetail<TMeta, TRaw>
    }): void;
}

/**
 * Public props for <InputField />.
 *
 * - `variant` selects the variant module.
 * - All variant-specific props are merged directly into the field props
 *   via `VariantPropsFor<K>`.
 *
 * NOTE: this is a type alias (not an interface) so we can safely intersect
 * unions coming from VariantPropsFor<K> / VariantValueFor<K>.
 */
export type InputFieldProps<
    K extends VariantKey = VariantKey,
    H = unknown
> = InputFieldBaseProps<VariantValueFor<K, H>> &
    VariantPropsFor<K, H> &
    InputFieldClassNameProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | 'defaultValue'> & {
        variant: K;

        /**
         * @deprecated Use the specific *ClassName props instead
         * (className, labelClassName, errorClassName, etc.).
         */
        classes?: Partial<InputFieldClassNames>;
        defaultValue?: any;
    };

export interface InputFieldClassNameProps {
    /** Root comes from `className` on HTMLDivElement */
    labelRowClassName?: string;
    inlineRowClassName?: string;
    labelClassName?: string;
    sublabelClassName?: string;
    descriptionClassName?: string;
    helpTextClassName?: string;
    errorClassName?: string;
    groupClassName?: string;
    contentClassName?: string;
    variantClassName?: string;
    inlineInputColumnClassName?: string;
    inlineLabelColumnClassName?: string;
    requiredClassName?: string;
    tagClassName?: string;
}

export interface InputFieldClassNames {
    root?: string;
    labelRow?: string;
    inlineRow?: string;
    label?: string;
    sublabel?: string;
    description?: string;
    helpText?: string;
    error?: string;
    group?: string;
    content?: string;
    variant?: string;
    inlineInputColumn?: string
    inlineLabelColumn?: string;
    required?: string;
    tag?: string
}


export interface FieldTag {
    label: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    color?: string;   // text color
    bgColor?: string; // background color
}
```

---
#### 24


` File: packages/form-palette/src/lib/get-global-countries.ts`  [↑ Back to top](#index)

```ts
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
```

---
#### 25


` File: packages/form-palette/src/lib/group-layout.ts`  [↑ Back to top](#index)

```ts
// src/lib/group-layout.ts
import type * as React from "react";
import { cn } from "@/lib/utils";

export type GroupLayoutMode = "list" | "grid";

export interface BuildGroupLayoutOptions {
    layout: GroupLayoutMode;
    columns: number;
    itemGapPx?: number;

    // outer classes
    groupClassName?: string;
    className?: string; // alias fallback used by some variants

    // option row classes
    optionClassName?: string;

    // text classes
    labelClassName?: string;
    descriptionClassName?: string;

    // precomputed style tokens that differ per variant
    densityPaddingClass: string;
    labelTextSizeClass: string;
    descriptionTextSizeClass: string;
}

export interface BuildGroupLayoutResult {
    groupStyle: React.CSSProperties | undefined;
    groupClasses: string;
    baseOptionClass: string;
    labelClassesBase: string;
    descriptionClassesBase: string;
}

/**
 * Shared helper to compute group layout style + classes for list/grid option groups.
 * Variants provide their own density and text-size class tokens.
 */
export function buildGroupLayoutClasses(
    opts: BuildGroupLayoutOptions
): BuildGroupLayoutResult {
    const {
        layout,
        columns,
        itemGapPx,
        groupClassName,
        className,
        optionClassName,
        labelClassName,
        descriptionClassName,
        densityPaddingClass,
        labelTextSizeClass,
        descriptionTextSizeClass,
    } = opts;

    let groupStyle: React.CSSProperties | undefined;
    if (!itemGapPx) {
        if (layout === "grid") {
            groupStyle = {
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            } as React.CSSProperties;
        }
    } else if (layout === "list") {
        groupStyle = { rowGap: itemGapPx } as React.CSSProperties;
    } else {
        groupStyle = {
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: itemGapPx,
        } as React.CSSProperties;
    }

    const groupClasses = cn(
        layout === "grid" ? "grid" : "flex flex-col",
        groupClassName ?? className
    );

    const baseOptionClass = cn(
        "relative flex items-start",
        "data-[disabled=true]:opacity-60 data-[disabled=true]:cursor-not-allowed",
        densityPaddingClass,
        optionClassName
    );

    const labelClassesBase = cn(
        "font-medium text-foreground",
        labelTextSizeClass,
        labelClassName
    );

    const descriptionClassesBase = cn(
        "mt-0.5 text-muted-foreground",
        descriptionTextSizeClass,
        descriptionClassName
    );

    return {
        groupStyle,
        groupClasses,
        baseOptionClass,
        labelClassesBase,
        descriptionClassesBase,
    };
}
```

---
#### 26


` File: packages/form-palette/src/lib/json-editor/filters.ts`  [↑ Back to top](#index)

```ts
// src/lib/json-editor/filters.ts
import type { JsonEditorFilters, JsonPath } from "./types";
import { lastSegment, matchPath } from "./glob";

/* ─────────────────────────────────────────────────────────────
 * Routes
 * ───────────────────────────────────────────────────────────── */

/**
 * Route visibility:
 * - includeRoutes (if set) acts as allow-list
 * - excludeRoutes always remove
 * - if excludeRouteSubtree=true: excluding "config" also excludes "config.**"
 */
export function isRouteAllowed(
    path: JsonPath,
    filters?: JsonEditorFilters
): boolean {
    if (!filters) return true;

    const excludeSubtree = filters.excludeRouteSubtree ?? true;

    if (filters.includeRoutes && filters.includeRoutes.length) {
        const ok = filters.includeRoutes.some((p) => matchPath(p, path));
        if (!ok) return false;
    }

    if (filters.excludeRoutes && filters.excludeRoutes.length) {
        for (const p of filters.excludeRoutes) {
            if (!p) continue;

            // direct match (wildcards + leaf-aware matching)
            if (matchPath(p, path)) return false;

            if (!excludeSubtree) continue;

            // subtree match for exact path prefixes (best effort)
            // (we only do this for exact-ish patterns without glob chars)
            const isExact =
                !p.includes("*") && p !== "." && p !== "/" && p.trim() !== "";
            if (!isExact) continue;

            // If p is a leaf-only pattern (no dots), don't treat it as a subtree prefix unless it
            // actually matches a real ancestor prefix of the route.
            const leaf = lastSegment(path);
            if (!p.includes(".") && p === leaf) continue;

            if (path === p) return false;
            if (path.startsWith(p + ".")) return false;
        }
    }

    return true;
}

/* ─────────────────────────────────────────────────────────────
 * Fields
 * ───────────────────────────────────────────────────────────── */

/**
 * Field visibility:
 * - includeFields (if set) acts as allow-list
 * - excludeFields always remove
 *
 * NOTE: field patterns use the same leaf-aware matcher:
 * - "token" (no dots) matches leaf key only
 * - "config.*token*" matches full path
 */
export function isFieldAllowed(
    fieldPath: JsonPath,
    filters?: JsonEditorFilters
): boolean {
    if (!filters) return true;

    if (filters.includeFields && filters.includeFields.length) {
        const ok = filters.includeFields.some((p) => matchPath(p, fieldPath));
        if (!ok) return false;
    }

    if (filters.excludeFields && filters.excludeFields.length) {
        const hit = filters.excludeFields.some((p) => matchPath(p, fieldPath));
        if (hit) return false;
    }

    return true;
}

/* ─────────────────────────────────────────────────────────────
 * Bulk helpers
 * ───────────────────────────────────────────────────────────── */

export function filterVisibleRoutes<T extends { path: JsonPath }>(
    nodes: T[],
    filters?: JsonEditorFilters
): T[] {
    return nodes.filter((n) => isRouteAllowed(n.path, filters));
}

export function filterVisibleFieldPaths(
    fieldPaths: JsonPath[],
    filters?: JsonEditorFilters
): JsonPath[] {
    return fieldPaths.filter((p) => isFieldAllowed(p, filters));
}

/**
 * Convenience for code that still uses a generic "paths" list.
 * By default, this uses field filtering semantics (because most callers are rendering fields).
 */
export function filterVisiblePaths(
    paths: JsonPath[],
    filters?: JsonEditorFilters,
    kind: "field" | "route" = "field"
): JsonPath[] {
    return kind === "route"
        ? paths.filter((p) => isRouteAllowed(p, filters))
        : paths.filter((p) => isFieldAllowed(p, filters));
}
```

---
#### 27


` File: packages/form-palette/src/lib/json-editor/glob.ts`  [↑ Back to top](#index)

```ts
// src/lib/json-editor/glob.ts
import type { JsonPath, JsonWildcard } from "./types";

/* ─────────────────────────────────────────────────────────────
 * Tiny helpers
 * ───────────────────────────────────────────────────────────── */

export function splitPath(path: JsonPath): string[] {
    if (!path) return [];
    return path.split(".").filter(Boolean);
}

export function lastSegment(path: JsonPath): string {
    const segs = splitPath(path);
    return segs[segs.length - 1] ?? "";
}

/**
 * Escapes regex special chars except '*'
 */
function escapeRegexExceptStar(input: string): string {
    return input.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
}

function segmentGlobToRegex(pattern: string): RegExp {
    // segment-level glob: "*" means "any chars" (including empty)
    const src = "^" + escapeRegexExceptStar(pattern).replace(/\*/g, ".*") + "$";
    return new RegExp(src, "i");
}

export function matchSegment(pattern: string, segment: string): boolean {
    return segmentGlobToRegex(pattern).test(segment);
}

/* ─────────────────────────────────────────────────────────────
 * matchPath(pattern, path)
 *
 * Supports:
 * - "*api*"     (segment glob; default matches leaf key if no dots)
 * - "config.*"  (one segment)
 * - "config.**" (subtree)
 * - "**.*token*" (any depth)
 *
 * Semantics:
 * - If pattern contains '.' or '**' → match against the full path segments.
 * - Else → match against the leaf segment only.
 * ───────────────────────────────────────────────────────────── */

export function matchPath(pattern: JsonWildcard, path: JsonPath): boolean {
    const pat = (pattern ?? "").trim();
    if (!pat) return path === "";

    const pHasDot = pat.includes(".");
    const pHasDeep = pat.includes("**");

    const targetSegs = splitPath(path);

    // leaf-only matcher (no dots / deep)
    if (!pHasDot && !pHasDeep) {
        const leaf = targetSegs[targetSegs.length - 1] ?? "";
        return matchSegment(pat, leaf);
    }

    const patSegs = splitPath(pat);

    // backtracking matcher for ** (tiny; routes are small)
    function walk(pi: number, ti: number): boolean {
        while (pi < patSegs.length) {
            const seg = patSegs[pi];

            if (seg === "**") {
                // '**' matches zero or more segments
                if (pi === patSegs.length - 1) return true; // trailing '**' matches rest
                for (let k = ti; k <= targetSegs.length; k++) {
                    if (walk(pi + 1, k)) return true;
                }
                return false;
            }

            if (ti >= targetSegs.length) return false;

            // normal segment: can include '*' wildcards inside the segment
            if (!matchSegment(seg, targetSegs[ti])) return false;

            pi++;
            ti++;
        }

        return ti === targetSegs.length;
    }

    return walk(0, 0);
}

/* ─────────────────────────────────────────────────────────────
 * Specificity scoring for "best match wins"
 * (higher score = more specific)
 * ───────────────────────────────────────────────────────────── */

export function scoreMatch(pattern: JsonWildcard, path: JsonPath): number {
    if (!matchPath(pattern, path)) return -1;

    const pat = (pattern ?? "").trim();
    if (pat === path) return 10_000;

    const patSegs = splitPath(pat);
    const pathSegs = splitPath(path);

    // More segments + fewer wildcards => higher
    const segCountScore = patSegs.length * 100;

    // Character specificity: count non-wildcard chars
    const nonWildChars = pat.replace(/\*/g, "").replace(/\./g, "").length;

    // Penalize wildcards
    const starCount = (pat.match(/\*/g) ?? []).length;
    const deepCount = (pat.match(/\*\*/g) ?? []).length;

    // Reward closeness: deeper references tend to be more specific
    const depthCloseness = Math.min(patSegs.length, pathSegs.length) * 10;

    return (
        segCountScore +
        nonWildChars * 5 +
        depthCloseness -
        starCount * 15 -
        deepCount * 200
    );
}

/* ─────────────────────────────────────────────────────────────
 * pickBest(map, path)
 * Returns the best matching key and its value
 * ───────────────────────────────────────────────────────────── */

export function pickBest<T>(
    map: Record<JsonWildcard, T> | undefined,
    path: JsonPath
): { pattern: JsonWildcard; value: T } | null {
    if (!map) return null;

    let best: { pattern: JsonWildcard; value: T; score: number } | null = null;

    for (const [pattern, value] of Object.entries(map)) {
        const s = scoreMatch(pattern, path);
        if (s < 0) continue;
        if (!best || s > best.score) best = { pattern, value, score: s };
    }

    return best ? { pattern: best.pattern, value: best.value } : null;
}

/**
 * Compatibility with the old `pickBestMatch(path, rules)` signature.
 * Returns the best matching value (or undefined).
 */
export function pickBestMatch<T>(
    path: JsonPath,
    rules: Array<[JsonWildcard, T]>
): T | undefined {
    let best: { score: number; value: T } | undefined;

    for (const [pattern, value] of rules) {
        const s = scoreMatch(pattern, path);
        if (s < 0) continue;
        if (!best || s > best.score) best = { score: s, value };
    }

    return best?.value;
}
```

---
#### 28


` File: packages/form-palette/src/lib/json-editor/layout.ts`  [↑ Back to top](#index)

```ts
// src/lib/json-editor/layout.ts
import type { JsonEditorFilters, JsonWildcard } from "./types";
import { matchSegment, pickBestMatch } from "./glob";
import { filterVisibleFieldPaths } from "./filters";

export type JsonEditorLayout = Record<JsonWildcard, Array<string | string[]>>;

export type LayoutRow = {
    /** parent path that owns these children */
    parent: string;
    /** row children (absolute paths) */
    fields: string[];
    /** optional hint for UI (grid/flex), you can extend later */
    kind: "row";
};

function joinPath(parent: string, child: string) {
    if (!parent) return child;
    if (!child) return parent;
    return parent + "." + child;
}

function uniq<T>(arr: T[]) {
    return Array.from(new Set(arr));
}

function sortStable(paths: string[]) {
    return [...paths].sort((a, b) => a.localeCompare(b));
}

/**
 * Expand a token into matching children:
 * - token can be exact key ("maxRetries") or pattern ("*api*")
 * - token can be a relative dotted path ("headers.Authorization") which becomes "parent.headers.Authorization"
 */
function matchChildrenForToken(
    parent: string,
    token: string,
    remaining: string[]
): string[] {
    const absoluteToken = joinPath(parent, token);

    // If token is a dotted child-path, treat it as an exact relative reference.
    if (token.includes(".")) {
        return remaining.includes(absoluteToken) ? [absoluteToken] : [];
    }

    // Otherwise token is a relative pattern against direct child keys
    const matches: string[] = [];
    const prefix = parent ? parent + "." : "";

    for (const p of remaining) {
        if (!p.startsWith(prefix)) continue;

        const rest = parent ? p.slice(prefix.length) : p;
        if (!rest || rest.includes(".")) continue; // not a direct child

        if (matchSegment(token, rest)) matches.push(p);
    }

    return sortStable(matches);
}

/**
 * Resolve a parent layout into ordered rows.
 *
 * Rules:
 * - layout[parentPattern] -> best match wins
 * - string token expands to ALL matching children (as separate rows)
 * - string[] row expands each token; if token matches multiple, it expands into multiple columns
 * - after processing layout rules, remaining children are auto-flowed (one per row)
 */
export function resolveLayoutForParent(opts: {
    parent: string; // e.g. "config"
    childPaths: string[]; // absolute paths of DIRECT children (recommended)
    layout?: JsonEditorLayout;
    filters?: JsonEditorFilters;
}): LayoutRow[] {
    const { parent, layout, filters } = opts;

    // visible children (field semantics)
    let remaining = filterVisibleFieldPaths(opts.childPaths, filters);
    remaining = sortStable(remaining);

    const rules = layout
        ? (Object.entries(layout) as Array<[string, Array<string | string[]>]>)
        : [];

    const spec = rules.length ? pickBestMatch(parent, rules) : undefined;

    const rows: LayoutRow[] = [];

    const take = (paths: string[]) => {
        const taken = new Set(paths);
        remaining = remaining.filter((p) => !taken.has(p));
    };

    if (spec?.length) {
        for (const entry of spec) {
            // 1) "key" => expands to matches; each match becomes its own row
            if (typeof entry === "string") {
                const matches = matchChildrenForToken(parent, entry, remaining);
                if (!matches.length) continue;

                for (const m of matches) {
                    rows.push({ parent, kind: "row", fields: [m] });
                }
                take(matches);
                continue;
            }

            // 2) ["a", "b"] => one row; each token can expand
            if (Array.isArray(entry)) {
                const cols: string[] = [];

                for (const token of entry) {
                    const matches = matchChildrenForToken(
                        parent,
                        token,
                        remaining
                    );
                    if (!matches.length) continue;
                    cols.push(...matches);
                }

                const uniqCols = uniq(cols);
                if (!uniqCols.length) continue;

                rows.push({ parent, kind: "row", fields: uniqCols });
                take(uniqCols);
            }
        }
    }

    // Auto-flow the rest (preserve sorted order)
    for (const p of remaining) {
        rows.push({ parent, kind: "row", fields: [p] });
    }

    return rows;
}
```

---
#### 29


` File: packages/form-palette/src/lib/json-editor/routes.ts`  [↑ Back to top](#index)

```ts
// src/lib/json-editor/routes.ts
import type * as React from "react";
import type {
    JsonEditorFilters,
    JsonEditorNavOptions,
    JsonObject,
    JsonPath,
    JsonRouteNode,
} from "./types";
import { lastSegment, pickBest } from "./glob";
import { isRouteAllowed } from "./filters";

function isObjectLike(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isPlainObject(v: unknown): v is JsonObject {
    return isObjectLike(v);
}

function resolveRouteLabel(
    path: JsonPath,
    nav?: JsonEditorNavOptions
): React.ReactNode {
    // wildcard labels win (best match)
    const hit = pickBest(nav?.routeLabels, path);
    if (hit) return hit.value;

    if (!path) return "Root";
    return lastSegment(path);
}

/**
 * buildJsonRoutes(value, navProps) → nav tree
 * - routes are derived from nested objects
 * - can optionally include object-items inside arrays as routes
 */
export function buildJsonRoutes(
    value: JsonObject | undefined,
    nav?: JsonEditorNavOptions,
    filters?: JsonEditorFilters
): JsonRouteNode[] {
    const rootObj: JsonObject = (value ?? {}) as JsonObject;

    const showRoot = nav?.showRoot ?? true;
    const maxDepth = nav?.maxDepth ?? Number.POSITIVE_INFINITY;
    const arrayRoutes = nav?.arrayRoutes ?? "none";

    const nodes: JsonRouteNode[] = [];

    const buildChildren = (
        obj: JsonObject,
        parentPath: JsonPath,
        depth: number
    ): JsonRouteNode[] => {
        if (depth >= maxDepth) return [];

        const out: JsonRouteNode[] = [];

        for (const [k, v] of Object.entries(obj)) {
            const nextPath = parentPath ? `${parentPath}.${k}` : k;

            // nested object => route
            if (isPlainObject(v)) {
                if (!isRouteAllowed(nextPath, filters)) continue;

                out.push({
                    path: nextPath,
                    key: k,
                    label: resolveRouteLabel(nextPath, nav),
                    children: buildChildren(v, nextPath, depth + 1),
                });
                continue;
            }

            // array of objects => optionally allow routes like "config.items.0"
            if (arrayRoutes === "objects" && Array.isArray(v)) {
                const anyObjIdx = (v as any[]).findIndex((x) =>
                    isPlainObject(x)
                );
                if (anyObjIdx === -1) continue;

                // route for the array itself? (treat as object page)
                if (!isRouteAllowed(nextPath, filters)) continue;

                const arrayNode: JsonRouteNode = {
                    path: nextPath,
                    key: k,
                    label: resolveRouteLabel(nextPath, nav),
                    children: [],
                };

                const children: JsonRouteNode[] = [];
                (v as any[]).forEach((item, idx) => {
                    if (!isPlainObject(item)) return;
                    const itemPath = `${nextPath}.${idx}`;
                    if (!isRouteAllowed(itemPath, filters)) return;

                    children.push({
                        path: itemPath,
                        key: String(idx),
                        label: resolveRouteLabel(itemPath, nav) ?? `#${idx}`,
                        children: buildChildren(item, itemPath, depth + 1),
                    });
                });

                arrayNode.children = children;
                out.push(arrayNode);
            }
        }

        // stable ordering (optional): alphabetical
        out.sort((a, b) => String(a.key).localeCompare(String(b.key)));
        return out;
    };

    if (showRoot) {
        if (isRouteAllowed("", filters)) {
            nodes.push({
                path: "",
                key: "",
                label: resolveRouteLabel("", nav),
                children: buildChildren(rootObj, "", 0),
            });
        } else {
            // If root is excluded, still expose its children as top-level pages
            nodes.push(...buildChildren(rootObj, "", 0));
        }
    } else {
        nodes.push(...buildChildren(rootObj, "", 0));
    }

    return nodes;
}
```

---
#### 30


` File: packages/form-palette/src/lib/json-editor/tree.ts`  [↑ Back to top](#index)

```ts
// src/lib/json-editor/tree.ts
export function getDirectChildPaths(
    parent: string,
    allPaths: string[]
): string[] {
    const prefix = parent ? parent + "." : "";
    return allPaths.filter((p) => {
        if (!p.startsWith(prefix)) return false;
        const rest = parent ? p.slice(prefix.length) : p;
        return rest.length > 0 && !rest.includes("."); // direct child only
    });
}
```

---
#### 31


` File: packages/form-palette/src/lib/json-editor/types.ts`  [↑ Back to top](#index)

```ts
// src/lib/json-editor/types.ts
import type * as React from "react";

/* ─────────────────────────────────────────────────────────────
 * JSON primitives
 * ───────────────────────────────────────────────────────────── */

export type JsonPrimitive = string | number | boolean | null;
// eslint-disable-next-line @typescript-eslint/ban-types
// @ts-ignore
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
// @ts-ignore
export type JsonObject = Record<string, JsonValue>;

export type JsonPath = string; // "" | "config" | "config.apiEndpoint"
export type JsonWildcard = string;

/* ─────────────────────────────────────────────────────────────
 * Filters (public shape)
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorFilters {
    /** Hide entire object routes/pages (navigation + rendering) */
    excludeRoutes?: JsonWildcard[];
    includeRoutes?: JsonWildcard[];

    /** Hide specific fields (by full path or leaf/wild patterns) */
    excludeFields?: JsonWildcard[];
    includeFields?: JsonWildcard[];

    /**
     * If true, excluding "config" also excludes "config.**".
     * Default: true
     */
    excludeRouteSubtree?: boolean;
}

/* ─────────────────────────────────────────────────────────────
 * Layout (public shape)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorLayoutRow = string | string[];
export type JsonEditorLayoutMap = Record<JsonWildcard, JsonEditorLayoutRow[]>;

/* ─────────────────────────────────────────────────────────────
 * Navigation (routes derived from JSON)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorNavMode = "sidebar" | "tabs" | "drawer";

export interface JsonEditorNavOptions {
    mode?: JsonEditorNavMode;
    showRoot?: boolean;
    defaultRoute?: JsonPath;
    routeLabels?: Record<JsonWildcard, React.ReactNode>;
    maxDepth?: number;
    arrayRoutes?: "none" | "objects";
}

export interface JsonRouteNode {
    path: JsonPath;
    key: string; // last segment
    label: React.ReactNode;
    children: JsonRouteNode[];
}
```

---
#### 32


` File: packages/form-palette/src/lib/json-editor/utils.ts`  [↑ Back to top](#index)

```ts
// src/lib/json-editor/utils.ts
import type {
    JsonEditorLayoutMap,
    JsonEditorLayoutRow,
    JsonPath,
} from "./types";
import { pickBest as _pickBest } from "./glob";

export type {
    JsonPrimitive,
    JsonValue,
    JsonObject,
    JsonPath,
    JsonWildcard,
    JsonEditorNavMode,
    JsonEditorNavOptions,
    JsonEditorFilters,
    JsonEditorLayoutRow,
    JsonEditorLayoutMap,
    JsonRouteNode,
} from "./types";

export {
    splitPath,
    lastSegment,
    matchSegment,
    matchPath,
    scoreMatch,
    pickBest,
    pickBestMatch,
} from "./glob";

export {
    isRouteAllowed,
    isFieldAllowed,
    filterVisibleRoutes,
    filterVisibleFieldPaths,
    filterVisiblePaths,
} from "./filters";

export type { JsonEditorLayout, LayoutRow } from "./layout";
export { resolveLayoutForParent } from "./layout";

export { buildJsonRoutes } from "./routes";

/**
 * Backwards-compat: pickLayout(layoutMap, activePath) → rows (best match wins)
 */
export function pickLayout(
    layoutMap: JsonEditorLayoutMap | undefined,
    activePath: JsonPath
): JsonEditorLayoutRow[] | undefined {
    const hit = _pickBest(layoutMap, activePath);
    return hit?.value;
}
```

---
#### 33


` File: packages/form-palette/src/lib/normalise-options.ts`  [↑ Back to top](#index)

```ts
// noinspection SuspiciousTypeOfGuard

import { SelectPrimitive } from "@/variants/helpers/selection-summary";
import React from "react";
import { ShadcnTreeSelectVariantProps } from "@/presets/shadcn-variants/treeselect";
import {
    NormalizedTreeItem,
    TreeKey,
    TreeSelectOption,
} from "@/presets/shadcn-variants/tree-select-types";

/* ──────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────── */

export type OptionRenderFn = (...args: any[]) => React.ReactNode;

export type OptionAccessor<TItem, TValue> =
    | ((item: TItem, index: number) => TValue)
    | keyof TItem
    | string
    | null
    | undefined;

export type OptionAccessorNoIndex<TItem, TValue> =
    | ((item: TItem) => TValue)
    | keyof TItem
    | string
    | null
    | undefined;

export type OptionKeyAccessor<TItem> =
    | ((item: TItem, index: number) => React.Key)
    | keyof TItem
    | string
    | null
    | undefined;

export interface GlobalNormalizeConfig<TItem, TValue = SelectPrimitive> {
    autoCap?: boolean;

    optionLabel?: OptionAccessorNoIndex<TItem, React.ReactNode>;
    optionValue?: OptionAccessorNoIndex<TItem, TValue>;
    optionDescription?: OptionAccessorNoIndex<TItem, React.ReactNode>;
    optionDisabled?: OptionAccessorNoIndex<TItem, boolean>;
    optionIcon?: OptionAccessorNoIndex<TItem, React.ReactNode>;
    optionKey?: OptionKeyAccessor<TItem>;
}

export interface GlobalNormalizedOption<TItem, TValue = SelectPrimitive> {
    key: string;
    value: TValue;
    labelNode: React.ReactNode;
    labelText: string;
    description?: React.ReactNode;
    disabled: boolean;
    icon?: React.ReactNode;

    /** Option-level renderer (falls back to global renderOption in the variant) */
    render?: OptionRenderFn;

    raw: TItem;
}

/* ──────────────────────────────────────────────────────────────
 * Shared core normalizer (used by list + tree)
 * ────────────────────────────────────────────────────────────── */

function isPrimitiveOption(raw: unknown): raw is string | number {
    return typeof raw === "string" || typeof raw === "number";
}

function asObject(raw: any): any {
    return isPrimitiveOption(raw) ? { label: String(raw), value: raw } : raw;
}

/**
 * Support option-level renderers without introducing a new prop name.
 * First function found wins.
 */
const RENDER_KEYS = [
    "render",
    "renderOption",
    "renderItem",
    "renderLabel",
    "renderer",
] as const;

function resolveRender(obj: any): OptionRenderFn | undefined {
    if (!obj) return undefined;

    for (const k of RENDER_KEYS) {
        const maybe = obj[k];
        if (typeof maybe === "function") return maybe as OptionRenderFn;
    }

    return undefined;
}

function resolveValue<TItem, TValue>(
    raw: TItem,
    obj: any,
    index: number,
    optionValue: GlobalNormalizeConfig<TItem, TValue>["optionValue"]
): TValue {
    // EXACT behaviour preserved:
    // - if fn: call with *raw*
    // - if string: read obj[key]
    // - else: fallback chain obj.value ?? obj.id ?? obj.key ?? String(index)
    return typeof optionValue === "function"
        ? optionValue(raw)
        : typeof optionValue === "string"
          ? (obj[optionValue] as TValue)
          : ((obj.value ?? obj.id ?? obj.key ?? String(index)) as TValue);
}

function resolveLabelNode<TItem, TValue>(
    raw: TItem,
    obj: any,
    value: TValue,
    optionLabel: GlobalNormalizeConfig<TItem, TValue>["optionLabel"]
): React.ReactNode {
    // EXACT behaviour preserved:
    // - if fn: call with raw
    // - if string: obj[key] ?? obj.label ?? String(value)
    // - else: obj.label ?? String(value)
    return typeof optionLabel === "function"
        ? optionLabel(raw)
        : typeof optionLabel === "string"
          ? (obj[optionLabel] ?? obj.label ?? String(value))
          : (obj.label ?? String(value));
}

function resolveDescription<TItem, TValue>(
    raw: TItem,
    obj: any,
    optionDescription: GlobalNormalizeConfig<TItem, TValue>["optionDescription"]
): React.ReactNode {
    // EXACT behaviour preserved:
    return typeof optionDescription === "function"
        ? optionDescription(raw)
        : typeof optionDescription === "string"
          ? obj[optionDescription]
          : obj.description;
}

function resolveDisabled<TItem, TValue>(
    raw: TItem,
    obj: any,
    optionDisabled: GlobalNormalizeConfig<TItem, TValue>["optionDisabled"]
): boolean {
    // EXACT behaviour preserved:
    return typeof optionDisabled === "function"
        ? optionDisabled(raw)
        : typeof optionDisabled === "string"
          ? !!obj[optionDisabled]
          : !!obj.disabled;
}

function resolveIcon<TItem, TValue>(
    raw: TItem,
    obj: any,
    optionIcon: GlobalNormalizeConfig<TItem, TValue>["optionIcon"]
): React.ReactNode {
    // EXACT behaviour preserved:
    return typeof optionIcon === "function"
        ? optionIcon(raw)
        : typeof optionIcon === "string"
          ? obj[optionIcon]
          : obj.icon;
}

function resolveKey<TItem, TValue>(
    raw: TItem,
    obj: any,
    index: number,
    value: TValue,
    optionKey: GlobalNormalizeConfig<TItem, TValue>["optionKey"]
): React.Key {
    // EXACT behaviour preserved:
    return typeof optionKey === "function"
        ? optionKey(raw, index)
        : typeof optionKey === "string"
          ? (obj[optionKey] ?? (value as any) ?? index)
          : (obj.key ?? (value as any) ?? index);
}

function resolveLabelText<TValue>(
    labelNode: React.ReactNode,
    obj: any,
    value: TValue
): string {
    // EXACT behaviour preserved:
    return typeof labelNode === "string"
        ? labelNode
        : typeof labelNode === "number"
          ? String(labelNode)
          : (obj.labelText ?? String(value));
}

function normalizeOne<TItem, TValue>(
    raw: TItem,
    index: number,
    config: GlobalNormalizeConfig<TItem, TValue>
): GlobalNormalizedOption<TItem, TValue> {
    const obj = asObject(raw);

    const value = resolveValue(raw, obj, index, config.optionValue);

    let labelNode = resolveLabelNode(raw, obj, value, config.optionLabel);

    if (config.autoCap && typeof labelNode === "string") {
        labelNode = capitalizeFirst(labelNode);
    }

    const labelText = resolveLabelText(labelNode, obj, value);

    const description = resolveDescription(raw, obj, config.optionDescription);
    const disabled = resolveDisabled(raw, obj, config.optionDisabled);
    const icon = resolveIcon(raw, obj, config.optionIcon);
    const key = resolveKey(raw, obj, index, value, config.optionKey);

    const render = resolveRender(obj);

    return {
        key: String(key),
        value,
        labelNode,
        labelText,
        description,
        disabled,
        icon,
        render,
        raw,
    };
}

/* ──────────────────────────────────────────────────────────────
 * Public exports
 * ────────────────────────────────────────────────────────────── */

// Overload kept to avoid breaking call-sites that were using <T> as a cast.
export function globalNormalizeOptions<T>(opts: any, config: any): T[];
export function globalNormalizeOptions<TItem, TValue = SelectPrimitive>(
    opts: readonly TItem[] | undefined | null,
    config: GlobalNormalizeConfig<TItem, TValue>
): GlobalNormalizedOption<TItem, TValue>[];
export function globalNormalizeOptions(opts: any, config: any) {
    if (!opts || !opts.length) return [];
    return opts.map((raw: any, index: number) =>
        normalizeOne(raw, index, config)
    );
}

export function globalNormalizeCheckBasedOptions<
    TItem extends Record<string, any>,
    TLabelKey extends keyof TItem | null | undefined,
    TValueKey extends keyof TItem | null | undefined,
>(
    item: TItem,
    index: number,
    optionLabelKey: TLabelKey,
    optionValueKey: TValueKey
) {
    const anyItem = item as any;

    const rawValue =
        optionValueKey != null
            ? anyItem[optionValueKey as string]
            : anyItem.value;

    const value = rawValue as any;

    const rawLabel =
        optionLabelKey != null
            ? anyItem[optionLabelKey as string]
            : (anyItem.label ?? String(rawValue ?? index));

    const description = anyItem.description;
    const disabled = !!anyItem.disabled;
    const key: React.Key = anyItem.key ?? index;

    const render = resolveRender(anyItem);

    return {
        key: String(key),
        value,
        label: rawLabel,
        description,
        disabled,
        render,
        raw: item,
    };
}

export type NormalizedTreeItemWithRender = NormalizedTreeItem & {
    render?: OptionRenderFn;
};

export function normalizeTree(
    opts: readonly TreeSelectOption[] | undefined,
    config: Pick<
        ShadcnTreeSelectVariantProps,
        | "autoCap"
        | "optionLabel"
        | "optionValue"
        | "optionDescription"
        | "optionDisabled"
        | "optionIcon"
        | "optionKey"
    >,
    level = 0,
    parentValue?: TreeKey,
    path: TreeKey[] = []
): NormalizedTreeItemWithRender[] {
    if (!opts || !opts.length) return [];

    return opts.map((raw, index) => {
        // We keep the same “primitive -> {label,value}” coercion
        const obj = asObject(raw);

        // Reuse the same normalization core, but with TreeKey value typing
        const base = normalizeOne<TreeSelectOption, TreeKey>(
            raw,
            index,
            config as any // (config shape matches; this avoids duplicating the resolver types)
        );

        const childrenRaw: TreeSelectOption[] | undefined = obj.children;

        const nextPath = [...path, base.value];

        const children = normalizeTree(
            childrenRaw ?? [],
            config,
            level + 1,
            base.value,
            nextPath
        );

        return {
            ...base,
            level,
            parentValue,
            path, // ancestors only (EXACT behaviour preserved)
            hasChildren: !!children.length,
            children,
        };
    });
}

export function capitalizeFirst(label: string): string {
    if (!label) return label;
    return label.charAt(0).toUpperCase() + label.slice(1);
}
```

---
#### 34


` File: packages/form-palette/src/lib/utils.ts`  [↑ Back to top](#index)

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

---
#### 35


` File: packages/form-palette/src/presets/shadcn-variants/checkbox.tsx`  [↑ Back to top](#index)

```tsx
// noinspection RedundantConditionalExpressionJS,PointlessBooleanExpressionJS,SuspiciousTypeOfGuard,GrazieInspection,GrazieStyle

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/presets/ui/checkbox";
import { globalNormalizeCheckBasedOptions } from "@/lib/normalise-options";
import { buildGroupLayoutClasses } from "@/lib/group-layout";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type CheckboxSize = "sm" | "md" | "lg";
export type CheckboxDensity = "compact" | "comfortable" | "loose";
export type CheckboxLayoutMode = "list" | "grid";

/**
 * Internal state we store in the value list.
 * "none" never goes into the external value.
 */
export type CheckboxTriStateValue = true | false;

/**
 * Internal state we pass to the Shadcn checkbox.
 * "none" is used to represent "no stance yet".
 */
export type CheckboxInternalState = true | false | "none";

export interface CheckboxGroupEntry<TValue> {
    value: TValue;
    state: CheckboxTriStateValue; // true or false only
}

export type CheckboxGroupValue<TValue> =
    | readonly CheckboxGroupEntry<TValue>[]
    | undefined;

/**
 * Single checkbox value.
 * undefined → "none"
 */
export type CheckboxSingleValue = boolean | undefined;

/**
 * Public union type for the variant's value.
 *
 * - In single mode: we expect CheckboxSingleValue
 * - In group mode: we expect CheckboxGroupValue<TValue>
 *
 * At the type level this is a union; at runtime we branch using `single`.
 */
export type CheckboxVariantValue<TValue> =
    | CheckboxSingleValue
    | CheckboxGroupValue<TValue>;

export interface CheckboxItem<TValue> {
    value: TValue;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    key?: React.Key;

    /**
     * Option-level renderer (provided by the normaliser).
     * If present, it should override the variant-level `renderOption` for this item.
     */
    render?: (ctx: CheckboxRenderOptionContext<TValue>) => React.ReactNode;

    /**
     * Override tri-state behaviour for this item.
     * If undefined, variant-level `tristate` is used.
     */
    tristate?: boolean;
}

export interface CheckboxMappers<TItem, TValue> {
    getValue: (item: TItem, index: number) => TValue;
    getLabel: (item: TItem, index: number) => React.ReactNode;
    getDescription?: (item: TItem, index: number) => React.ReactNode;
    isDisabled?: (item: TItem, index: number) => boolean;
    getKey?: (item: TItem, index: number) => React.Key;
    getTristate?: (item: TItem, index: number) => boolean | undefined;
}

export interface CheckboxRenderOptionContext<TValue> {
    item: CheckboxItem<TValue>;
    index: number;
    state: CheckboxInternalState;
    effectiveTristate: boolean;
    disabled: boolean;
    size: CheckboxSize;
    density: CheckboxDensity;
    checkboxId?: string;
    click(): void;
    /**
     * Prebuilt Shadcn checkbox node.
     */
    checkbox: React.ReactNode;
}

/**
 * UI props for both single and group modes.
 */
export interface ShadcnCheckboxUiProps<TItem, TValue> {
    /**
     * Group mode:
     *  - Required when `single` is not true.
     *
     * Single mode:
     *  - Optional; if provided, `items[0]` can supply label/description.
     */
    items?: readonly TItem[];

    /**
     * Mapping functions for arbitrary item shapes.
     * Takes precedence over optionValue/optionLabel.
     */
    mappers?: CheckboxMappers<TItem, TValue>;

    /**
     * Property name that holds the value on each item.
     *
     * Example:
     *   items = [{ id: "read", label: "Read" }]
     *   optionValue = "id"
     */
    optionValue?: keyof TItem;

    /**
     * Property name that holds the label on each item.
     *
     * Example:
     *   items = [{ id: "read", title: "Read" }]
     *   optionLabel = "title"
     */
    optionLabel?: keyof TItem;

    /**
     * Custom renderer for each option row.
     */
    renderOption?: (
        ctx: CheckboxRenderOptionContext<TValue>
    ) => React.ReactNode;

    /**
     * If true, treat this variant as a single checkbox instead of a group.
     *
     * Value is then CheckboxSingleValue (boolean | undefined).
     */
    single?: boolean;

    /**
     * Variant-level default tri-state behaviour.
     *
     * - In single mode: directly controls tri-state for the single checkbox.
     * - In group mode: default for all items, unless item.tristate overrides.
     */
    tristate?: boolean;

    /**
     * Layout mode in group mode: vertical list or CSS grid.
     */
    layout?: CheckboxLayoutMode;

    /**
     * Number of columns in grid mode.
     * Default: 2.
     */
    columns?: number;

    /**
     * Gap between items in px.
     */
    itemGapPx?: number;

    /**
     * Visual size of the checkbox / text.
     * Default: "md".
     */
    size?: CheckboxSize;

    /**
     * Vertical density of each row.
     * Default: "comfortable".
     */
    density?: CheckboxDensity;

    /**
     * When true, capitalizes the first letter of the label
     * (only applied when the label is a string).
     */
    autoCap?: boolean;

    /**
     * ARIA attributes for the group wrapper.
     */
    "aria-label"?: string;
    "aria-labelledby"?: string;

    /**
     * Wrapper class for the entire group (or single field).
     */
    groupClassName?: string;

    /**
     * Extra classes for each option row (group mode).
     */
    optionClassName?: string;

    /**
     * Extra classes for the option label text.
     */
    labelClassName?: string;

    /**
     * Extra classes for the option label text in group mode only.
     * This allows styling group item labels without affecting single mode labels.
     */
    optionLabelClassName?: string;

    /**
     * Extra classes for the option description text.
     */
    descriptionClassName?: string;

    /**
     * Single-mode inline label (if you want variant-level text).
     * Usually you'll rely on InputField's label instead.
     */
    singleLabel?: React.ReactNode;

    /**
     * Single-mode description text under the label.
     */
    singleDescription?: React.ReactNode;
}

/**
 * Full props for the Shadcn-based checkbox variant.
 *
 * TValue: primitive or object key
 * TItem: item shape used to build checkbox items
 */
export type ShadcnCheckboxVariantProps<
    TValue,
    TItem = CheckboxItem<TValue>,
> = ShadcnCheckboxUiProps<TItem, TValue> &
    Pick<
        VariantBaseProps<CheckboxVariantValue<TValue>>,
        "value" | "onValue" | "error" | "disabled" | "required"
    > & {
        id?: string;
        className?: string; // alias for groupClassName
        name?: string; // optional: name for native form post in group mode
        "aria-describedby"?: string;
    };

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function paddingForDensity(density: CheckboxDensity): string {
    switch (density) {
        case "compact":
        // return "py-1.5";
        case "loose":
            return "py-2";
        case "comfortable":
        default:
            return "py-0";
    }
}

function labelTextSize(size: CheckboxSize): string {
    switch (size) {
        case "sm":
            return "text-xs";
        case "lg":
            return "text-base";
        case "md":
        default:
            return "text-sm";
    }
}

function descriptionTextSize(size: CheckboxSize): string {
    switch (size) {
        case "sm":
            return "text-[0.7rem]";
        case "lg":
            return "text-sm";
        case "md":
        default:
            return "text-xs";
    }
}

function capitalizeFirst(label: string): string {
    if (!label) return label;
    return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Normalize arbitrary items to CheckboxItem<TValue>[] using:
 * 1) mappers,
 * 2) optionValue/optionLabel,
 * 3) native CheckboxItem fields,
 * 4) primitive arrays (string[] / number[] / boolean[]).
 */
function normalizeItems<TItem, TValue>(
    items: readonly TItem[] | undefined,
    mappers?: CheckboxMappers<TItem, TValue>,
    optionValueKey?: keyof TItem,
    optionLabelKey?: keyof TItem
): CheckboxItem<TValue>[] {
    if (!items || !items.length) return [];

    // 1) Explicit mappers win
    if (mappers) {
        return items.map((item, index) => ({
            value: mappers.getValue(item, index),
            label: mappers.getLabel(item, index),
            description: mappers.getDescription
                ? mappers.getDescription(item, index)
                : undefined,
            disabled: mappers.isDisabled
                ? mappers.isDisabled(item, index)
                : false,
            key: mappers.getKey ? mappers.getKey(item, index) : index,
            tristate: mappers.getTristate
                ? mappers.getTristate(item, index)
                : undefined,
        }));
    }

    // 2) optionValue / optionLabel
    if (optionValueKey || optionLabelKey) {
        return items.map((item, index) => {
            const anyItem = item as any;
            const normalised = globalNormalizeCheckBasedOptions(
                item as any,
                index,
                optionLabelKey,
                optionValueKey
            );
            const tristate = anyItem.tristate as boolean | undefined;

            return {
                ...normalised,
                tristate,
            };
        });
    }

    // 3 & 4) Fallbacks:
    //    - primitive arrays (string[] / number[] / boolean[])
    //    - already-shaped CheckboxItem<TValue>[]
    return items.map((item, index) => {
        if (
            typeof item === "string" ||
            typeof item === "number" ||
            typeof item === "boolean"
        ) {
            const v = item as unknown as TValue;
            return {
                value: v,
                label: String(item),
                description: undefined,
                disabled: false,
                key: index,
                tristate: undefined,
            } satisfies CheckboxItem<TValue>;
        }

        return item as unknown as CheckboxItem<TValue>;
    });
}

function isEqualValue(a: unknown, b: unknown): boolean {
    return Object.is(a, b);
}

/**
 * Extract group value from the union.
 */
function asGroupValue<TValue>(
    value: CheckboxVariantValue<TValue>
): CheckboxGroupValue<TValue> {
    if (!value) return undefined;
    if (Array.isArray(value)) return value;
    return undefined;
}

/**
 * Extract single value from the union.
 */
function asSingleValue(
    value: CheckboxVariantValue<unknown>
): CheckboxSingleValue {
    if (Array.isArray(value)) return undefined;
    if (typeof value === "boolean" || value === undefined) return value;
    return undefined;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const InnerShadcnCheckboxVariant = <TValue, TItem = CheckboxItem<TValue>>(
    props: ShadcnCheckboxVariantProps<TValue, TItem>,
    ref: React.Ref<HTMLDivElement>
) => {
    const {
        // variant base
        value,
        onValue,
        error,
        disabled,
        required,

        // UI / behaviour
        items,
        mappers,
        optionValue,
        optionLabel,
        renderOption,
        single,
        tristate: tristateDefault,
        layout = "list",
        columns = 2,
        itemGapPx,
        size = "md",
        density = "comfortable",
        autoCap = false,

        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        name,

        groupClassName,
        optionClassName,
        labelClassName,
        optionLabelClassName,
        descriptionClassName,

        className, // alias for groupClassName

        singleLabel,
        singleDescription,

        id,
        ...restProps
    } = props;

    const hasError = !!error;
    const isSingle = !!single;

    // ─────────────────────────────────────────
    // Single mode
    // ─────────────────────────────────────────
    if (isSingle) {
        const singleVal = asSingleValue(value);
        const effectiveTristate = !!tristateDefault;

        const internalState: CheckboxInternalState = effectiveTristate
            ? (singleVal ?? "none")
            : !!singleVal;

        const handleSingleChange = (next: CheckboxInternalState) => {
            if (!onValue || disabled) return;

            let nextPublic: CheckboxSingleValue;

            if (effectiveTristate) {
                // tri-state single:
                // "none" → undefined
                // true/false → same
                nextPublic = next === "none" ? undefined : !!next;
            } else {
                // non-tristate: behave like normal checkbox
                nextPublic = next === true;
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: nextPublic,
                nativeEvent: undefined,
                meta: undefined,
            };

            onValue(nextPublic, detail);
        };

        let labelText = singleLabel ?? undefined;
        if (autoCap && typeof labelText === "string") {
            labelText = capitalizeFirst(labelText);
        }

        const descriptionText = singleDescription ?? undefined;

        const labelCls = cn(
            "text-foreground",
            labelTextSize(size),
            labelClassName
        );

        const descriptionCls = cn(
            "mt-0.5 text-muted-foreground",
            descriptionTextSize(size),
            descriptionClassName
        );

        return (
            <div
                ref={ref}
                role="group"
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                aria-invalid={hasError || undefined}
                aria-required={required || undefined}
                data-slot="checkbox-single"
                className={cn(
                    "flex items-start gap-3",
                    paddingForDensity(density),
                    groupClassName ?? className
                )}
                {...restProps}
            >
                <Checkbox
                    id={id}
                    checked={internalState}
                    tristate={effectiveTristate}
                    disabled={disabled}
                    onCheckedChange={handleSingleChange}
                    className="mt-0.5"
                />

                {(labelText || descriptionText) && (
                    <div className="flex min-w-0 flex-col">
                        {labelText && (
                            <span className={labelCls}>{labelText}</span>
                        )}
                        {descriptionText && (
                            <span className={descriptionCls}>
                                {descriptionText}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // ─────────────────────────────────────────
    // Group mode
    // ─────────────────────────────────────────

    const groupValue = asGroupValue<TValue>(value);
    const normalized = React.useMemo(
        () =>
            normalizeItems<TItem, TValue>(
                items,
                mappers,
                optionValue,
                optionLabel
            ),
        [items, mappers, optionValue, optionLabel]
    );

    const {
        groupStyle,
        groupClasses,
        baseOptionClass,
        labelClassesBase,
        descriptionClassesBase,
    } = buildGroupLayoutClasses({
        layout,
        columns,
        itemGapPx,
        groupClassName,
        className,
        optionClassName,
        labelClassName,
        descriptionClassName,
        densityPaddingClass: paddingForDensity(density),
        labelTextSizeClass: labelTextSize(size),
        descriptionTextSizeClass: descriptionTextSize(size),
    });

    const findEntryIndex = React.useCallback(
        (val: TValue): number => {
            if (!groupValue) return -1;
            return groupValue.findIndex((e) => isEqualValue(e.value, val));
        },
        [groupValue]
    );

    const getEntryState = React.useCallback(
        (val: TValue): CheckboxTriStateValue | "none" => {
            const idx = findEntryIndex(val);
            if (!groupValue || idx === -1) return "none";
            return groupValue[idx].state;
        },
        [groupValue, findEntryIndex]
    );

    const updateGroupValue = React.useCallback(
        (
            itemValue: TValue,
            nextInternal: CheckboxInternalState,
            effectiveTristate: boolean
        ) => {
            if (!onValue || disabled) return;

            const currentList = groupValue ? [...groupValue] : [];
            const idx = currentList.findIndex((e) =>
                isEqualValue(e.value, itemValue)
            );

            let nextList: CheckboxGroupEntry<TValue>[] = currentList;

            if (effectiveTristate) {
                // Tri-state:
                // "none" → remove
                // true/false → ensure entry is present with state
                if (nextInternal === "none") {
                    if (idx !== -1) {
                        nextList = [
                            ...currentList.slice(0, idx),
                            ...currentList.slice(idx + 1),
                        ];
                    }
                } else {
                    const nextState: CheckboxTriStateValue =
                        nextInternal === true;
                    if (idx === -1) {
                        nextList = [
                            ...currentList,
                            { value: itemValue, state: nextState },
                        ];
                    } else {
                        nextList = [...currentList];
                        nextList[idx] = {
                            ...nextList[idx],
                            state: nextState,
                        };
                    }
                }
            } else {
                // Non tri-state:
                // true → ensure present
                // false/"none" → remove entry (false acts as none)
                if (nextInternal === true) {
                    if (idx === -1) {
                        nextList = [
                            ...currentList,
                            { value: itemValue, state: true },
                        ];
                    } else {
                        nextList = [...currentList];
                        nextList[idx] = {
                            ...nextList[idx],
                            state: true,
                        };
                    }
                } else {
                    // false / "none": remove
                    if (idx !== -1) {
                        nextList = [
                            ...currentList.slice(0, idx),
                            ...currentList.slice(idx + 1),
                        ];
                    }
                }
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: nextList,
                nativeEvent: undefined,
                meta: undefined,
            };

            onValue(nextList, detail);
        },
        [onValue, disabled, groupValue]
    );

    return (
        <div
            ref={ref}
            id={id}
            role="group"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            data-slot="checkbox-group"
            className={groupClasses}
            style={groupStyle}
            {...restProps}
        >
            {normalized.map((item, index) => {
                const effectiveTristate =
                    item.tristate ?? tristateDefault ?? false;

                const currentState = getEntryState(item.value);
                const internalState: CheckboxInternalState = effectiveTristate
                    ? currentState // "none" | true | false
                    : currentState === "none"
                      ? false
                      : currentState;

                const optionDisabled = !!disabled || !!item.disabled;
                const optionKey = item.key ?? index;
                const checkboxId = id ? `${id}-option-${optionKey}` : undefined;

                // Apply autoCap to string labels for display
                let displayItem: CheckboxItem<TValue> = item;
                if (autoCap && typeof item.label === "string") {
                    displayItem = {
                        ...item,
                        label: capitalizeFirst(item.label),
                    };
                }

                const checkboxNode = (
                    <Checkbox
                        id={checkboxId}
                        checked={internalState}
                        disabled={optionDisabled}
                        tristate={effectiveTristate}
                        onCheckedChange={(next) =>
                            updateGroupValue(
                                item.value,
                                next as CheckboxInternalState,
                                effectiveTristate
                            )
                        }
                        className="mt-1"
                    />
                );

                const hiddenInput =
                    name != null ? (
                        <input
                            type="hidden"
                            name={name}
                            value={String(item.value)}
                            // Only send if in list; tri-state false still "has standing"
                            // in code, but native form post is simple and you can
                            // derive negative states server-side if you want.
                            disabled={getEntryState(item.value) === "none"}
                        />
                    ) : null;

                
                const renderer = (item as CheckboxItem<TValue>).render ?? renderOption;

                if (renderer) {
                    return (
                        <div
                            key={optionKey}
                            data-slot="checkbox-option"
                            data-disabled={optionDisabled ? "true" : "false"}
                            className={baseOptionClass}
                        >
                            {renderer({
                                item: displayItem,
                                index,
                                state: internalState,
                                effectiveTristate,
                                disabled: optionDisabled,
                                size,
                                density,
                                checkboxId,
                                click() {
                                    if (optionDisabled) return;

                                    const nextInternal: CheckboxInternalState =
                                        effectiveTristate
                                            ? internalState === "none"
                                                ? true
                                                : internalState === true
                                                  ? false
                                                  : "none"
                                            : internalState === true
                                              ? false
                                              : true;

                                    updateGroupValue(
                                        item.value,
                                        nextInternal,
                                        effectiveTristate
                                    );
                                },
                                checkbox: checkboxNode,
                            })}
                            {hiddenInput}
                        </div>
                    );
                }

                // Default row layout: checkbox + label + description
                return (
                    <div
                        key={optionKey}
                        data-slot="checkbox-option"
                        data-disabled={optionDisabled ? "true" : "false"}
                        className={baseOptionClass}
                    >
                        <label
                            htmlFor={checkboxId}
                            className="flex w-full cursor-pointer items-start gap-3 select-none"
                        >
                            {checkboxNode}

                            <div className="flex min-w-0 flex-col">
                                <span
                                    className={cn(
                                        labelClassesBase,
                                        optionLabelClassName
                                    )}
                                >
                                    {displayItem.label}
                                </span>
                                {displayItem.description != null && (
                                    <span className={descriptionClassesBase}>
                                        {displayItem.description}
                                    </span>
                                )}
                            </div>
                        </label>

                        {hiddenInput}
                    </div>
                );
            })}
        </div>
    );
};

export const ShadcnCheckboxVariant = React.forwardRef(
    InnerShadcnCheckboxVariant
) as unknown as <TValue, TItem = CheckboxItem<TValue>>(
    props: ShadcnCheckboxVariantProps<TValue, TItem> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => React.ReactElement | null;

// ShadcnCheckboxVariant.displayName = "ShadcnCheckboxVariant";

export default ShadcnCheckboxVariant;

// ─────────────────────────────────────────────
// Public aliases for the registry
// ─────────────────────────────────────────────

/**
 * Default item value type for the checkbox variant.
 *
 * You can still use the generic ShadcnCheckboxVariantProps<TValue, TItem>
 * directly if you need a different TValue; the registry uses this alias.
 */
export type DefaultCheckboxItemValue = string | number;

/**
 * Public "value" type for the checkbox variant used by the registry:
 *
 * - Single mode: boolean | undefined
 * - Group mode: CheckboxGroupEntry<DefaultCheckboxItemValue>[] | undefined
 *
 * In tri-state group mode, both `true` and `false` entries are present;
 * `"none"` never appears in this type.
 */
export type CheckboxVariantPublicValue =
    CheckboxVariantValue<DefaultCheckboxItemValue>;

/**
 * Public props type for the checkbox variant used by the registry.
 *
 * This is ShadcnCheckboxVariantProps with TValue fixed to DefaultCheckboxItemValue.
 */
export type ShadcnCheckboxVariantPublicProps =
    ShadcnCheckboxVariantProps<DefaultCheckboxItemValue>;
```

---
#### 36


` File: packages/form-palette/src/presets/shadcn-variants/chips.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/chips.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import { Textarea } from "@/presets/ui/textarea";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ChipsValue = string[] | undefined;
type BaseProps = VariantBaseProps<ChipsValue>;

/**
 * How we split text into chips when committing.
 */
export type ChipsSeparator =
   | string
   | RegExp
   | (string | RegExp)[];

/**
 * Placement of chips relative to the entry control.
 *
 * - "inline" → inside the same visual box (Input) or in the textarea toolbox.
 * - "below"  → chips rendered as a block underneath the field.
 */
export type ChipsPlacement = "inline" | "below";

/**
 * Actions reported via ChangeDetail.meta.
 */
export type ChipsChangeAction = "add" | "remove" | "clear";

/**
 * Extra metadata sent with onValue() via ChangeDetail.
 */
export interface ChipsChangeMeta {
   action: ChipsChangeAction;
   added?: string[];
   removed?: string[];
   chips: string[];
}

/**
 * Chips-only props, on top of the injected ones.
 */
export interface ChipsVariantProps {
   /**
    * Placeholder shown when there are no chips and input is empty.
    */
   placeholder?: string;

   /**
    * Separators used to split raw input into chips.
    *
    * - string  → split on that string
    * - RegExp  → split with regex
    * - array   → try each in order
    *
    * Default: [",", ";"]
    */
   separators?: ChipsSeparator;

   /**
    * When true, pressing Enter commits the current input as chips.
    * Default: true
    */
   addOnEnter?: boolean;

   /**
    * When true, pressing Tab commits the current input as chips.
    * Default: true
    */
   addOnTab?: boolean;

   /**
    * When true, blurring the field commits any remaining input as chips.
    * Default: true
    */
   addOnBlur?: boolean;

   /**
    * When false, duplicate chips are ignored.
    * Default: false
    */
   allowDuplicates?: boolean;

   /**
    * Maximum number of chips allowed.
    * Undefined → unlimited.
    */
   maxChips?: number;

   /**
    * When true, Backspace on empty input removes the last chip.
    * Default: true
    */
   backspaceRemovesLast?: boolean;

   /**
    * Show a small clear-all button.
    * Default: false
    */
   clearable?: boolean;

   /**
    * Called when chips are added.
    */
   onAddChips?(added: string[], next: string[]): void;

   /**
    * Called when chips are removed.
    */
   onRemoveChips?(removed: string[], next: string[]): void;

   /**
    * Optional custom chip renderer.
    *
    * If provided, you are responsible for calling onRemove(index)
    * from your UI when you want to remove a chip.
    */
   renderChip?(
      chip: string,
      index: number,
      ctx: {
         remove(): void;
         chips: string[];
      },
   ): React.ReactNode;

   /**
    * Optional custom overflow chip renderer.
    *
    * Receives the hidden count and the full chip list.
    */
   renderOverflowChip?(
      hiddenCount: number,
      chips: string[],
   ): React.ReactNode;

   /**
    * Max number of chips to *render*.
    * Extra chips are summarized as "+N more".
    */
   maxVisibleChips?: number;

   /**
    * Max number of characters to *display* per chip.
    * The underlying value is not truncated.
    */
   maxChipChars?: number;

   /**
    * CSS max-width for chip labels (e.g. 160 or "12rem").
    */
   maxChipWidth?: number | string;

   /**
    * When true, the entry control is a Textarea instead of Input.
    * Good for comment-style chip entry.
    */
   textareaMode?: boolean;

   /**
    * Where chips are rendered relative to the entry.
    *
    * Default:
    * - Input mode → "inline"
    * - Textarea mode → "inline"
    */
   placement?: ChipsPlacement;

   // UI hooks
   className?: string;              // outer wrapper
   chipsClassName?: string;         // <div> that holds all chips
   chipClassName?: string;          // each chip container
   chipLabelClassName?: string;     // inner label span
   chipRemoveClassName?: string;    // remove "x" button/span
   inputClassName?: string;         // entry text input / textarea overrides
}

/**
 * We still type against ShadcnTextVariantProps so chips can reuse
 * size/density/icon props etc. We take control of:
 * - type / value / onValue
 * - leadingControl / trailingControl
 */
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   | "type"
   | "inputMode"
   | "leadingControl"
   | "trailingControl"
   | "value"
   | "onValue"
>;

/**
 * Full props for the Shadcn-based chips variant.
 */
export type ShadcnChipsVariantProps = TextUiProps &
   ChipsVariantProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function normalizeSeparators(sep?: ChipsSeparator): (string | RegExp)[] {
   if (!sep) return [",", ";"];
   if (Array.isArray(sep)) return sep;
   return [sep];
}

function splitIntoTokens(raw: string, sep?: ChipsSeparator): string[] {
   const separators = normalizeSeparators(sep);
   let acc: string[] = [raw];

   for (const s of separators) {
      const next: string[] = [];
      for (const chunk of acc) {
         if (!chunk) continue;
         if (typeof s === "string") {
            next.push(...chunk.split(s));
         } else {
            next.push(...chunk.split(s));
         }
      }
      acc = next;
   }

   return acc
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnChipsVariant = React.forwardRef<
   HTMLInputElement | HTMLTextAreaElement,
   ShadcnChipsVariantProps
>(function ShadcnChipsVariant(props, ref) {
   const {
      // variant base bits
      value,
      onValue,
      error,

      // chips behaviour
      placeholder,
      separators,
      addOnEnter = true,
      addOnTab = true,
      addOnBlur = true,
      allowDuplicates = false,
      maxChips,
      backspaceRemovesLast = true,
      clearable = false,
      onAddChips,
      onRemoveChips,
      renderChip,
      renderOverflowChip,
      maxVisibleChips,
      maxChipChars,
      maxChipWidth,
      textareaMode = false,
      placement,

      // UI classNames
      className,
      chipsClassName,
      chipClassName,
      chipLabelClassName,
      chipRemoveClassName,
      inputClassName,

      // rest of text UI bits (size, density, icons, etc.)
      ...restTextProps
   } = props;

   const chips = React.useMemo(() => value ?? [], [value]);
   const hasChips = chips.length > 0;

   const [inputText, setInputText] = React.useState("");

   // ─────────────────────────────────────────────
   // Value emit
   // ─────────────────────────────────────────────

   const emitChange = React.useCallback(
      (
         nextChips: string[],
         meta: Omit<ChipsChangeMeta, "chips">,
      ) => {
         const detail: ChangeDetail<ChipsChangeMeta> = {
            source: "variant",
            raw: nextChips,
            nativeEvent: undefined,
            meta: {
               ...meta,
               chips: nextChips,
            },
         };
         onValue?.(nextChips.length ? nextChips : undefined, detail);
      },
      [onValue],
   );

   const commitFromRaw = React.useCallback(
      (raw: string) => {
         const tokens = splitIntoTokens(raw, separators);
         if (!tokens.length) return;

         let next = [...chips];
         const added: string[] = [];

         for (const token of tokens) {
            if (!allowDuplicates && next.includes(token)) continue;
            if (typeof maxChips === "number" && next.length >= maxChips) {
               break;
            }
            next.push(token);
            added.push(token);
         }

         if (!added.length) return;

         emitChange(next, { action: "add", added });
         onAddChips?.(added, next);
         setInputText("");
      },
      [chips, separators, allowDuplicates, maxChips, emitChange, onAddChips],
   );

   const handleRemoveAt = React.useCallback(
      (index: number) => {
         if (index < 0 || index >= chips.length) return;
         const removed = [chips[index]];
         const next = chips.filter((_, i) => i !== index);

         emitChange(next, { action: "remove", removed });
         onRemoveChips?.(removed, next);
      },
      [chips, emitChange, onRemoveChips],
   );

   const handleClear = React.useCallback(
      (ev?: React.MouseEvent) => {
         ev?.preventDefault();
         ev?.stopPropagation();
         if (!chips.length) return;
         emitChange([], { action: "clear", removed: [...chips] });
         onRemoveChips?.([...chips], []);
         setInputText("");
      },
      [chips, emitChange, onRemoveChips],
   );

   // ─────────────────────────────────────────────
   // Entry events (Input or Textarea)
   // ─────────────────────────────────────────────

   const handleEntryChange = React.useCallback(
      (
         event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
      ) => {
         const next = event.target.value ?? "";
         setInputText(next);
      },
      [],
   );

   const handleEntryKeyDown = React.useCallback(
      (
         event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>,
      ) => {
         const key = event.key;

         if (key === "Enter" && addOnEnter) {
            event.preventDefault();
            if (inputText.trim().length) {
               commitFromRaw(inputText);
            }
            return;
         }

         if (key === "Tab" && addOnTab && inputText.trim().length) {
            event.preventDefault();
            commitFromRaw(inputText);
            return;
         }

         // Backspace on empty input → remove last chip
         if (
            key === "Backspace" &&
            backspaceRemovesLast &&
            !inputText.length &&
            chips.length
         ) {
            event.preventDefault();
            handleRemoveAt(chips.length - 1);
            return;
         }
      },
      [
         inputText,
         addOnEnter,
         addOnTab,
         backspaceRemovesLast,
         chips.length,
         commitFromRaw,
         handleRemoveAt,
      ],
   );

   const handleEntryBlur = React.useCallback(
      (
         event:
            | React.FocusEvent<HTMLInputElement>
            | React.FocusEvent<HTMLTextAreaElement>,
      ) => {
         if (addOnBlur && inputText.trim().length) {
            commitFromRaw(inputText);
         }

         // Forward to host onBlur if provided in restTextProps
         const anyProps = restTextProps as any;
         const hostOnBlur = anyProps?.onBlur as
            | ((e: typeof event) => void)
            | undefined;
         hostOnBlur?.(event);
      },
      [addOnBlur, inputText, commitFromRaw, restTextProps],
   );

   const effectivePlaceholder =
      placeholder ?? (hasChips ? "" : "Add item…");

   // ─────────────────────────────────────────────
   // Chip rendering (maxVisible / overflow / truncation)
   // ─────────────────────────────────────────────

   let visibleChips = chips;
   let hiddenCount = 0;

   if (
      typeof maxVisibleChips === "number" &&
      maxVisibleChips > 0 &&
      chips.length > maxVisibleChips
   ) {
      visibleChips = chips.slice(0, maxVisibleChips);
      hiddenCount = chips.length - visibleChips.length;
   }

   const maxWidthStyle: React.CSSProperties | undefined =
      maxChipWidth !== undefined
         ? {
            maxWidth:
               typeof maxChipWidth === "number"
                  ? `${maxChipWidth}px`
                  : maxChipWidth,
         }
         : undefined;

   const baseChipClasses = textareaMode
      ? "inline-flex min-w-0 gap-1 items-center justify-between rounded-md bg-muted px-2 py-2 text-muted-foreground"
      : "inline-flex max-w-full items-center gap-1 rounded bg-muted px-2 py-0.5 text-muted-foreground hover:bg-muted/80";

   const baseRemoveClasses = textareaMode
      ? "cursor-pointer text-[16px] opacity-70 hover:opacity-100 mt-0.5"
      : "cursor-pointer text-[16px] opacity-70 hover:opacity-100";

   const chipNodes = visibleChips.map((chip, index) => {
      if (renderChip) {
         return (
            <React.Fragment key={`${chip}-${index}`}>
               {renderChip(chip, index, {
                  remove: () => handleRemoveAt(index),
                  chips,
               })}
            </React.Fragment>
         );
      }

      let label = chip;
      if (
         typeof maxChipChars === "number" &&
         maxChipChars > 0 &&
         label.length > maxChipChars
      ) {
         label = label.slice(0, maxChipChars) + "…";
      }

      return (
         <button
            key={`${chip}-${index}`}
            type="button"
            className={cn(baseChipClasses, chipClassName)}
            onClick={(e) => {
               e.preventDefault();
            }}
            data-slot="chip"
         >
            <span
               className={cn(
                  "truncate",
                  chipLabelClassName,
               )}
               style={maxWidthStyle}
            >
               {label}
            </span>
            <span
               className={cn(baseRemoveClasses, chipRemoveClassName)}
               onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveAt(index);
               }}
               aria-hidden="true"
            >
               <X size={16} />
            </span>
         </button>
      );
   });

   if (hiddenCount > 0) {
      const defaultOverflow = (
         <span
            className={cn(
               baseChipClasses,
               "cursor-default",
               chipClassName,
            )}
            data-slot="chip-overflow"
         >
            +{hiddenCount} more
         </span>
      );

      const node =
         renderOverflowChip?.(hiddenCount, chips) ?? defaultOverflow;

      chipNodes.push(
         <React.Fragment key="__overflow">
            {node}
         </React.Fragment>,
      );
   }

   // ─────────────────────────────────────────────
   // Placement (inline vs below)
   // ─────────────────────────────────────────────

   const effectivePlacement: ChipsPlacement = textareaMode
      ? (placement ?? "inline")
      : (placement ?? "inline");

   const inlinePlacement = effectivePlacement === "inline";

   // Input-mode inline controls (inside the Input frame)
   let leadingControl: React.ReactNode | undefined;
   let trailingControl: React.ReactNode | undefined;

   // Below-the-field block (both modes)
   let chipsBelowBlock: React.ReactNode | undefined;

   // Textarea-mode upper toolbox (instead of leadingControl/trailingControl)
   let textareaUpperControl: React.ReactNode | undefined;
   let textareaUpperClassName: string | undefined;

   if (hasChips) {
      if (textareaMode) {
         if (inlinePlacement) {
            // chips live in the upper toolbox row, single-line row by default
            textareaUpperControl = (
               <div
                  data-slot="chips-upper"
                  className={cn(
                     "flex items-center gap-1 text-xs",
                     chipsClassName,
                  )}
               >
                  {chipNodes}
                  {clearable && (
                     <button
                        type="button"
                        onClick={handleClear}
                        className="ml-auto inline-flex h-6 px-2 items-center justify-center rounded-full text-[0.72rem] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                     >
                        Clear
                     </button>
                  )}
               </div>
            );
            textareaUpperClassName = chipsClassName;
         } else {
            // textareaMode + placement=below → block under the textarea box
            chipsBelowBlock = (
               <div
                  className={cn(
                     "mt-2 flex items-center gap-2 text-xs",
                     chipsClassName,
                  )}
                  data-slot="chips-list-below"
               >
                  {chipNodes}
                  {clearable && (
                     <button
                        type="button"
                        onClick={handleClear}
                        className="self-start inline-flex h-6 px-2 items-center justify-center rounded-full text-[0.72rem] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                     >
                        Clear
                     </button>
                  )}
               </div>
            );
         }
      } else {
         // INPUT MODE
         if (inlinePlacement) {
            leadingControl = (
               <div
                  className={cn(
                     "flex min-w-0 flex-row items-center gap-1 pr-1 py-1 text-xs pl-2",
                     chipsClassName,
                  )}
                  data-slot="chips-list"
               >
                  {chipNodes}
               </div>
            );

            if (clearable) {
               trailingControl = (
                  <div
                     className="flex h-full items-center pr-1"
                     data-slot="chips-trailing"
                  >
                     <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                        aria-label="Clear chips"
                     >
                        ×
                     </button>
                  </div>
               );
            }
         } else {
            chipsBelowBlock = (
               <div
                  className={cn(
                     "mt-1 flex flex-row items-center gap-1 text-xs",
                     chipsClassName,
                  )}
                  data-slot="chips-list-below"
               >
                  {chipNodes}
                  {clearable && (
                     <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex h-6 px-2 items-center justify-center rounded-full text-[0.72rem] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                     >
                        Clear
                     </button>
                  )}
               </div>
            );
         }
      }
   }

   const joinControls = !textareaMode && inlinePlacement && hasChips;
   const extendBoxToControls = !textareaMode && inlinePlacement && hasChips;

   // ─────────────────────────────────────────────
   // Entry control (Input vs Textarea)
   // ─────────────────────────────────────────────

   return (
      <div className={className} data-slot="chips-field">
         {textareaMode ? (
            <>
               {/* @ts-ignore */}
               <Textarea
                  ref={ref as any}
                  {...restTextProps}
                  value={inputText}
                  onChange={handleEntryChange}
                  onKeyDown={handleEntryKeyDown as any}
                  onBlur={handleEntryBlur as any}
                  extendBoxToToolbox={effectivePlacement === "inline"}
                  placeholder={effectivePlaceholder}
                  // textarea-specific defaults
                  autoResize={true}
                  rows={1}
                  upperControl={textareaUpperControl}
                  upperControlClassName={textareaUpperClassName}
                  inputClassName={inputClassName}
                  aria-invalid={error ? "true" : undefined}
               />
               {!inlinePlacement && hasChips && chipsBelowBlock}
            </>
         ) : (
            <>
               <Input
                  ref={ref as any}
                  {...restTextProps}
                  type="text"
                  // The Input's value is the *draft* text, not the chips.
                  value={inputText}
                  onChange={handleEntryChange as any}
                  onKeyDown={handleEntryKeyDown as any}
                  onBlur={handleEntryBlur as any}
                  placeholder={effectivePlaceholder}
                  // ONLY pass controls when chips are inline
                  leadingControl={inlinePlacement ? leadingControl : undefined}
                  trailingControl={inlinePlacement ? trailingControl : undefined}
                  // Only flip into "group box" mode when there are chips inline
                  joinControls={joinControls}
                  extendBoxToControls={extendBoxToControls}
                  inputClassName={cn(
                     "min-w-[4ch] flex-1 py-0",
                     inlinePlacement &&
                     hasChips &&
                     "bg-transparent border-none shadow-none outline-none",
                     inputClassName,
                  )}
                  aria-invalid={error ? "true" : undefined}
               />
               {!inlinePlacement && hasChips && chipsBelowBlock}
            </>
         )}
      </div>
   );
});

ShadcnChipsVariant.displayName = "ShadcnChipsVariant";

export default ShadcnChipsVariant;
```

---
#### 37


` File: packages/form-palette/src/presets/shadcn-variants/color.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/color.tsx

import * as React from "react";

import type { VariantModule } from "@/schema/variant";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

type BaseProps = VariantBaseProps<string | undefined>;

/**
 * Extra options specific to the color variant.
 */
export interface ColorSpecificProps {
   /**
    * If false, we hide the colour preview box.
    * Default: true
    */
   showPreview?: boolean;

   /**
    * If false, we hide the picker toggle control/icon.
    * Default: true
    */
   showPickerToggle?: boolean;

   /**
    * Size of the colour swatch in pixels.
    * Default: 18
    */
   previewSize?: number;

   /**
    * Optional className for the outer wrapper that hosts
    * the Input + hidden color input.
    */
   wrapperClassName?: string;

   /**
    * Optional className for the preview button itself (around the swatch).
    */
   previewButtonClassName?: string;

   /**
    * Optional className for the swatch box inside the preview button.
    */
   previewSwatchClassName?: string;

   /**
    * Optional className for the hidden `<input type="color">`.
    *
    * By default this input is visually hidden and only used
    * to invoke the browser/OS colour picker, but you can override
    * this class to make it visible and style it.
    */
   pickerInputClassName?: string;

   /**
    * Custom icon shown in the trailing control as the picker toggle.
    * If omitted, a tiny ▾ triangle is used.
    */
   pickerToggleIcon?: React.ReactNode;

   className?: string;
}

/**
 * We inherit the *visual/behavioural* props from ShadcnTextVariant,
 * but control value / onValue / type / inputMode / leadingControl / trailingControl ourselves.
 */
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   "type" | "inputMode" | "leadingControl" | "trailingControl" | "value" | "onValue"
>;

/**
 * Full props for the color variant as seen by the form runtime.
 */
export type ShadcnColorVariantProps = TextUiProps &
   ColorSpecificProps &
   Pick<BaseProps, "value" | "onValue">;

function normalizeColorForPicker(value: string | undefined): string {
   // Very light sanity: accept #rgb or #rrggbb; otherwise fall back.
   if (typeof value === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
      return value;
   }
   return "#000000";
}

export const ShadcnColorVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnColorVariantProps
>(function ShadcnColorVariant(props, ref) {
   const {
      // variant contract
      value,
      onValue,

      // colour-specific
      showPreview = true,
      showPickerToggle = true,
      previewSize = 18,
      wrapperClassName,
      previewButtonClassName,
      previewSwatchClassName,
      pickerInputClassName,
      pickerToggleIcon,

      // from text variant UI
      error,
      joinControls = true,
      extendBoxToControls = true,

      // everything else → Input (size, density, className, icons, etc.)
      ...restTextProps
   } = props;

   const [local, setLocal] = React.useState<string>(value ?? "");
   const [pickerOpen, setPickerOpen] = React.useState(false);

   React.useEffect(() => {
      setLocal(value ?? "");
   }, [value]);

   const pickerRef = React.useRef<HTMLInputElement | null>(null);

   const effectiveColor = normalizeColorForPicker(local || value);
   const showError = Boolean(error);

   const openSystemPicker = React.useCallback(() => {
      setPickerOpen(true);
      // Small timeout so state flushes before click; not strictly required but safe.
      window.setTimeout(() => {
         pickerRef.current?.click();
      }, 0);
   }, []);

   const handleTextChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const next = event.target.value ?? "";
         setLocal(next);

         if (onValue) {
            const detail: ChangeDetail<{ source: "input" }> = {
               source: "variant",
               raw: next,
               nativeEvent: event,
               meta: { source: "input" },
            };
            onValue(next || undefined, detail);
         }
      },
      [onValue]
   );

   const handlePickerChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const next = event.target.value ?? "";
         setLocal(next);

         if (onValue) {
            const detail: ChangeDetail<{ source: "picker" }> = {
               source: "variant",
               raw: next,
               nativeEvent: event,
               meta: { source: "picker" },
            };
            onValue(next || undefined, detail);
         }

         // Once the user picks a colour, the OS picker closes.
         setPickerOpen(false);
      },
      [onValue]
   );

   const handlePickerBlur = React.useCallback(() => {
      // If the user cancels the picker, blur fires and we can clear state.
      setPickerOpen(false);
   }, []);

   // ———————————————————————————————
   // Leading control: colour preview
   // ———————————————————————————————

   const leadingControl = showPreview ? (
      <button
         type="button"
         onClick={openSystemPicker}
         className={cn(
            "flex h-full items-center px-3 border-r border-border/50",
            "hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:bg-muted/50",
            previewButtonClassName
         )}
         tabIndex={-1}
         aria-label="Open colour picker"
      >
         <span
            className={cn(
               "inline-flex rounded-sm shadow-sm ring-1 ring-inset ring-foreground/10",
               previewSwatchClassName
            )}
            style={{
               width: previewSize,
               height: previewSize,
               backgroundColor: effectiveColor,
            }}
         />
      </button>
   ) : undefined;

   // ———————————————————————————————
   // Trailing control: picker toggle icon
   // ———————————————————————————————

   const toggleNode =
      pickerToggleIcon !== undefined ? (
         pickerToggleIcon
      ) : (
         // Swapped the text caret for a Lucide Palette icon
         <Palette className="h-4 w-4 opacity-50" />
      );

   const trailingControl = showPickerToggle ? (
      <button
         type="button"
         onClick={openSystemPicker}
         className="flex h-full items-center px-3 text-muted-foreground hover:text-foreground transition-colors"
         tabIndex={-1}
         aria-label={pickerOpen ? "Close colour picker" : "Open colour picker"}
         data-open={pickerOpen ? "true" : "false"}
      >
         {toggleNode}
      </button>
   ) : undefined;

   // ———————————————————————————————
   // Render
   // ———————————————————————————————

   return (
      <div className={cn("relative group/color", wrapperClassName)}>
         <Input
            ref={ref}
            {...restTextProps}
            type="text"
            value={local}
            onChange={handleTextChange}
            leadingControl={leadingControl}
            trailingControl={trailingControl}
            joinControls={joinControls}
            extendBoxToControls={extendBoxToControls}
            aria-invalid={showError ? "true" : undefined}
            // Added mono font and uppercase for cleaner hex code display
            className={cn("font-mono uppercase", restTextProps.className)}
            maxLength={9}
         />

         {/* Native color input – used to show the real browser/OS picker.
                By default it's visually hidden; override pickerInputClassName
                if you ever want to show/style it directly. */}
         <input
            ref={pickerRef}
            type="color"
            // hidden
            className={cn(
               "absolute h-0 w-0 opacity-0 pointer-events-none",
               pickerInputClassName
            )}
            value={effectiveColor}
            onChange={handlePickerChange}
            onBlur={handlePickerBlur}
            tabIndex={-1}
            aria-hidden="true"
         />
      </div>
   );
});

ShadcnColorVariant.displayName = "ShadcnColorVariant";
```

---
#### 38


` File: packages/form-palette/src/presets/shadcn-variants/custom.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/custom.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";

/**
 * Props for the generic "custom" variant.
 *
 * - The only special props we define are:
 *   - component: the React component to render
 *   - valueProp / changeProp / disabledProp / readOnlyProp / errorProp
 *   - idProp / nameProp / placeholderProp
 *   - mapValue / mapDetail (optional hooks)
 *
 * - All other props are treated as "component props" and forwarded
 *   directly to the underlying component.
 *
 * The underlying component is expected to:
 *   - accept the mapped `valueProp`
 *   - call the mapped `changeProp` with the next value (first argument)
 *   - optionally use disabled/readOnly/error/id/name/placeholder via the mapped names
 */
export interface ShadcnCustomVariantProps<TValue = unknown>
   extends VariantBaseProps<TValue> {
   /**
    * The actual React component to render.
    *
    * Example:
    *   component={MyToggle}
    */
   component: React.ComponentType<any>;

   /**
    * Prop name that carries the current value for the component.
    * Default: "value".
    */
   valueProp?: string;

   /**
    * Prop name for the change handler that the component will call.
    * Default: "onChange".
    *
    * The component is expected to call:
    *   props[changeProp](nextValue, ...otherArgs?)
    *
    * The first argument is taken as the new value.
    */
   changeProp?: string;

   /**
    * Prop name for disabled state.
    * Default: "disabled".
    */
   disabledProp?: string;

   /**
    * Prop name for read-only state.
    * Default: "readOnly".
    */
   readOnlyProp?: string;

   /**
    * Prop name for passing error to the component (if it cares).
    * If provided, we pass the `error` field as-is.
    * Example values: "error", "isInvalid", "status".
    */
   errorProp?: string;

   /**
    * Prop name for the id attribute.
    * Default: "id".
    */
   idProp?: string;

   /**
    * Prop name for the name attribute.
    * Default: "name".
    */
   nameProp?: string;

   /**
    * Prop name for the placeholder attribute.
    * Default: "placeholder".
    */
   placeholderProp?: string;

   /**
    * Optional transform for the raw next value before it hits the field.
    *
    * Receives the first argument that the component passes to the change
    * handler, plus the full argument list for flexibility.
    */
   mapValue?: (raw: any, ...args: any[]) => TValue;

   /**
    * Optional builder for ChangeDetail, given the raw next value.
    *
    * If omitted, a default { source: "variant", raw } detail is used.
    */
   mapDetail?: (raw: any, ...args: any[]) => ChangeDetail;

   /**
    * Any other props are assumed to belong to the custom component.
    */
   [key: string]: unknown;
}

export const ShadcnCustomVariant = React.forwardRef<
   any,
   ShadcnCustomVariantProps<any>
>(function ShadcnCustomVariant(props, ref) {
   const {
      // Variant base props we care about:
      value,
      onValue,
      error,
      disabled,
      readOnly,
      id,
      name,
      placeholder,

      // Mapping props:
      component: Component,
      valueProp = "value",
      changeProp = "onChange",
      disabledProp = "disabled",
      readOnlyProp = "readOnly",
      errorProp,
      idProp = "id",
      nameProp = "name",
      placeholderProp = "placeholder",

      mapValue,
      mapDetail,

      // Everything else goes straight to the component:
      ...rest
   } = props as ShadcnCustomVariantProps<any>;

   // If there is no component, bail out (dev-time safety).
   if (!Component) {
      if (process.env.NODE_ENV !== "production") {
         // eslint-disable-next-line no-console
         console.warn(
            "[form-palette] ShadcnCustomVariant: `component` prop is required.",
         );
      }
      return null;
   }

   const isDisabled = !!disabled;
   const isReadOnly = !!readOnly;

   /**
    * Bridge from the component's change callback to the variant contract.
    *
    * We assume the custom component calls the mapped change prop
    * with the **next value as its first argument**:
    *
    *   props[changeProp](nextValue, ...rest)
    */
   const handleChange = React.useCallback(
      (...args: any[]) => {
         if (!onValue) return;
         if (isDisabled || isReadOnly) return;

         const raw = args[0];

         const next = mapValue
            ? mapValue(raw, ...args)
            : (raw as any);

         const detail: ChangeDetail =
            mapDetail?.(raw, ...args) ?? {
               source: "variant",
               raw,
               nativeEvent: undefined,
               meta: undefined,
            };

         (onValue as any)(next, detail);
      },
      [onValue, isDisabled, isReadOnly, mapValue, mapDetail],
   );

   // Build the props for the custom component.
   const innerProps: Record<string, unknown> = {
      ...rest, // ← all non-special props from InputField go directly to the component
   };

   // Map value → component[valueProp]
   innerProps[valueProp] = value;

   // Map handler → component[changeProp]
   innerProps[changeProp] = handleChange;

   // Map disabled / readOnly
   if (disabledProp) {
      innerProps[disabledProp] = isDisabled;
   }
   if (readOnlyProp) {
      innerProps[readOnlyProp] = isReadOnly;
   }

   // Map error if a mapping key is provided
   if (errorProp && error !== undefined) {
      innerProps[errorProp] = error;
   }

   // Map id/name/placeholder if present
   if (id !== undefined && idProp) {
      innerProps[idProp] = id;
   }
   if (name !== undefined && nameProp) {
      innerProps[nameProp] = name;
   }
   if (placeholder !== undefined && placeholderProp) {
      innerProps[placeholderProp] = placeholder;
   }

   return <Component ref={ref} {...innerProps} />;
});

ShadcnCustomVariant.displayName = "ShadcnCustomVariant";

export default ShadcnCustomVariant;
```

---
#### 39


` File: packages/form-palette/src/presets/shadcn-variants/date.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import { Calendar as CalendarIcon, X as XIcon } from "lucide-react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "@/presets/ui/popover";
import { Calendar } from "@/presets/ui/calendar";
import { TimeDropdowns } from "../ui/time-dropdowns";

type DateMode = "single" | "range";

export interface DateRange {
   from?: Date;
   to?: Date;
}

type DateValue = Date | DateRange | undefined;

type BaseProps = VariantBaseProps<DateValue>;

// Calendar disabled type from your calendar wrapper
type DisabledDays = React.ComponentProps<typeof Calendar>["disabled"];

/**
 * Logical temporal "kind" for the field.
 *
 * This controls the default mask + formatting/parsing.
 *
 * - "date"      → yyyy-MM-dd (default)
 * - "datetime"  → yyyy-MM-dd HH:mm
 * - "time"      → HH:mm
 * - "hour"      → HH
 * - "monthYear" → MM/yyyy
 * - "year"      → yyyy
 */
export type DateKind =
   | "date"
   | "datetime"
   | "time"
   | "hour"
   | "monthYear"
   | "year"
   | (string & {});

/**
 * Public props for the date variant (legacy + mask extensions).
 */
export interface DateVariantProps {
   mode?: DateMode;
   placeholder?: React.ReactNode;

   clearable?: boolean;

   minDate?: Date;
   maxDate?: Date;
   disabledDays?: DisabledDays;

   /**
    * Pattern for single dates.
    *
    * Tokens:
    * - yyyy → full year
    * - MM   → month (01–12)
    * - dd   → day (01–31)
    * - HH   → hours (00–23)
    * - mm   → minutes (00–59)
    *
    * Default depends on `kind`:
    * - date      → "yyyy-MM-dd"
    * - datetime  → "yyyy-MM-dd HH:mm"
    * - time      → "HH:mm"
    * - hour      → "HH"
    * - monthYear → "MM/yyyy"
    * - year      → "yyyy"
    */
   formatSingle?: string;

   /**
    * String pattern or custom formatter for ranges.
    *
    * - string → same token rules as formatSingle, applied to both ends
    * - function → full control over display text
    */
   formatRange?:
   | string
   | ((range: DateRange | undefined) => string);

   /**
    * Separator when formatRange is a string pattern.
    * Default: " – "
    */
   rangeSeparator?: string;

   /**
    * When true, keep the calendar open after a selection.
    *
    * For range mode, the picker also stays open until both
    * `from` and `to` are chosen.
    */
   stayOpenOnSelect?: boolean;

   /**
    * Controlled open state for the popover.
    */
   open?: boolean;
   onOpenChange?(o: boolean): void;

   /**
    * Temporal kind (controls default mask + formatting/parsing).
    *
    * Default: "date".
    */
   kind?: DateKind;

   /**
    * Optional explicit input mask pattern for the text input.
    *
    * If omitted, a sensible default based on `kind` is used.
    *
    * Mask tokens follow the same rules as the underlying Input mask:
    *   9 = digit, a = letter, * = alphanumeric.
    */
   inputMask?: string;

   /**
    * Whether to render the calendar popover.
    *
    * Defaults:
    * - true  for `kind` = "date" | "datetime"
    * - false for time-only kinds ("time", "hour", "monthYear", "year")
    */
   showCalendar?: boolean;
}

/**
 * We still reuse the Shadcn text UI props (size, density, icons, etc.),
 * but we take over type/value/onValue and the controls.
 */
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   | "type"
   | "inputMode"
   | "leadingControl"
   | "trailingControl"
   | "value"
   | "onValue"
>;

/**
 * Full props for the Shadcn-based date variant.
 */
export type ShadcnDateVariantProps = TextUiProps &
   DateVariantProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function isRange(value: DateValue): value is DateRange {
   return !!value && !(value instanceof Date);
}

function normalizeValueForMode(
   value: DateValue,
   mode: DateMode,
): { single: Date | undefined; range: DateRange | undefined } {
   if (mode === "single") {
      if (value instanceof Date) {
         return { single: value, range: undefined };
      }
      if (isRange(value)) {
         // prefer "from" when coming from a range
         return { single: value.from ?? value.to, range: undefined };
      }
      return { single: undefined, range: undefined };
   }

   // range mode
   if (isRange(value)) {
      return { single: undefined, range: value };
   }
   if (value instanceof Date) {
      return { single: undefined, range: { from: value } };
   }
   return { single: undefined, range: undefined };
}

function hasSelection(value: DateValue): boolean {
   if (!value) return false;
   if (value instanceof Date) return true;
   return !!value.from || !!value.to;
}

function isRangeComplete(range: DateRange | undefined): boolean {
   return !!(range && range.from && range.to);
}

function pad2(n: number): string {
   return n.toString().padStart(2, "0");
}

interface KindConfig {
   mask: string;
   singlePattern: string;
}

function resolveKindConfig(kind: DateKind | undefined): KindConfig {
   const k = (kind ?? "date") as DateKind;

   switch (k) {
      case "datetime":
         return {
            mask: "9999-99-99 99:99",
            singlePattern: "yyyy-MM-dd HH:mm",
         };
      case "time":
         return {
            mask: "99:99",
            singlePattern: "HH:mm",
         };
      case "hour":
         return {
            mask: "99",
            singlePattern: "HH",
         };
      case "monthYear":
         return {
            mask: "99/9999",
            singlePattern: "MM/yyyy",
         };
      case "year":
         return {
            mask: "9999",
            singlePattern: "yyyy",
         };
      case "date":
      default:
         return {
            mask: "9999-99-99",
            singlePattern: "yyyy-MM-dd",
         };
   }
}

function formatDateWithPattern(
   date: Date,
   pattern: string | undefined,
): string {
   const p = pattern ?? "yyyy-MM-dd";

   const yyyy = date.getFullYear().toString();
   const MM = pad2(date.getMonth() + 1);
   const dd = pad2(date.getDate());
   const HH = pad2(date.getHours());
   const mm = pad2(date.getMinutes());

   return p
      .replace(/yyyy/g, yyyy)
      .replace(/MM/g, MM)
      .replace(/dd/g, dd)
      .replace(/HH/g, HH)
      .replace(/mm/g, mm);
}

function formatDisplaySingle(
   date: Date | undefined,
   pattern?: string,
): string {
   if (!date) return "";
   return formatDateWithPattern(date, pattern);
}

function formatDisplayRange(
   range: DateRange | undefined,
   formatRange: DateVariantProps["formatRange"],
   singlePattern?: string,
   separator?: string,
): string {
   if (!range || (!range.from && !range.to)) return "";

   if (typeof formatRange === "function") {
      return formatRange(range);
   }

   const pattern = formatRange ?? singlePattern ?? "yyyy-MM-dd";
   const sep = separator ?? " – ";

   const fromStr = range.from
      ? formatDateWithPattern(range.from, pattern)
      : "";
   const toStr = range.to
      ? formatDateWithPattern(range.to, pattern)
      : "";

   if (!fromStr && !toStr) return "";
   if (!fromStr) return toStr;
   if (!toStr) return fromStr;

   return `${fromStr}${sep}${toStr}`;
}

/**
 * Parse a raw digit string (unmasked) into a Date based on `kind`.
 *
 * Returns null when the input is incomplete or invalid.
 */
function parseRawToDate(rawDigits: string, kind: DateKind): Date | null {
   const len = rawDigits.length;

   switch (kind) {
      case "datetime": {
         if (len < 12) return null;
         const year = Number(rawDigits.slice(0, 4));
         const month = Number(rawDigits.slice(4, 6));
         const day = Number(rawDigits.slice(6, 8));
         const hour = Number(rawDigits.slice(8, 10));
         const minute = Number(rawDigits.slice(10, 12));
         if (!year || month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
         }
         if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return null;
         }
         return new Date(year, month - 1, day, hour, minute, 0, 0);
      }

      case "time": {
         if (len < 4) return null;
         const hour = Number(rawDigits.slice(0, 2));
         const minute = Number(rawDigits.slice(2, 4));
         if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
            return null;
         }
         const d = new Date();
         d.setSeconds(0, 0);
         d.setHours(hour, minute);
         return d;
      }

      case "hour": {
         if (len < 2) return null;
         const hour = Number(rawDigits.slice(0, 2));
         if (hour < 0 || hour > 23) return null;
         const d = new Date();
         d.setSeconds(0, 0);
         d.setHours(hour, 0);
         return d;
      }

      case "monthYear": {
         if (len < 6) return null;
         const month = Number(rawDigits.slice(0, 2));
         const year = Number(rawDigits.slice(2, 6));
         if (!year || month < 1 || month > 12) {
            return null;
         }
         return new Date(year, month - 1, 1, 0, 0, 0, 0);
      }

      case "year": {
         if (len < 4) return null;
         const year = Number(rawDigits.slice(0, 4));
         if (!year) return null;
         return new Date(year, 0, 1, 0, 0, 0, 0);
      }

      case "date":
      default: {
         if (len < 8) return null;
         const year = Number(rawDigits.slice(0, 4));
         const month = Number(rawDigits.slice(4, 6));
         const day = Number(rawDigits.slice(6, 8));
         if (!year || month < 1 || month > 12 || day < 1 || day > 31) {
            return null;
         }
         return new Date(year, month - 1, day, 0, 0, 0, 0);
      }
   }
}

function meterSafeDigits(masked: string): string {
   return masked.replace(/\D+/g, "");
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnDateVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnDateVariantProps
>(function ShadcnDateVariant(props, ref) {
   const {
      // variant base bits
      value,
      onValue,
      error,

      // date props
      mode: modeProp = "single",
      placeholder,
      clearable = true,
      minDate,
      maxDate,
      disabledDays,
      formatSingle: formatSingleProp,
      formatRange,
      rangeSeparator,
      stayOpenOnSelect,
      open,
      onOpenChange,

      kind: kindProp = "date",
      inputMask,
      showCalendar: showCalendarProp,

      //@ts-ignore text UI bits (size, density, className, icons, etc.)
      className,
      ...restTextProps
   } = props;

   const mode: DateMode = modeProp ?? "single";
   const kind: DateKind = kindProp ?? "date";

   const kindConfig = resolveKindConfig(kind);
   const singlePattern = formatSingleProp ?? kindConfig.singlePattern;
   const resolvedMask = inputMask ?? kindConfig.mask;

   const defaultShowCalendar =
      kind === "date" || kind === "datetime";
   const showCalendar =
      typeof showCalendarProp === "boolean"
         ? showCalendarProp
         : defaultShowCalendar;

   const [internalOpen, setInternalOpen] = React.useState(false);
   const isControlledOpen = open !== undefined;
   const currentOpen = isControlledOpen ? !!open : internalOpen;

   const handleOpenChange = React.useCallback(
      (next: boolean) => {
         if (!isControlledOpen) {
            setInternalOpen(next);
         }
         onOpenChange?.(next);
      },
      [isControlledOpen, onOpenChange],
   );

   const { single, range } = normalizeValueForMode(value, mode);

   const displayValue = React.useMemo(() => {
      if (mode === "single") {
         return formatDisplaySingle(single, singlePattern);
      }
      return formatDisplayRange(
         range,
         formatRange,
         singlePattern,
         rangeSeparator,
      );
   }, [mode, single, range, singlePattern, formatRange, rangeSeparator]);

   const [localText, setLocalText] = React.useState<string>(displayValue);

   // Sync local text with external value / formatting
   React.useEffect(() => {
      setLocalText(displayValue);
   }, [displayValue]);

   // Time dropdown visibility:
   // - Only for mode="single"
   // - For datetime/time/hour kinds
   const showTimeDropdowns =
      mode === "single" &&
      (kind === "datetime" || kind === "time" || kind === "hour");

   const handleSelect = React.useCallback(
      (next: Date | DateRange | undefined) => {
         let nextValue: DateValue;
         let nextRange: DateRange | undefined;

         if (mode === "single") {
            if (next instanceof Date) {
               let selected = next;

               // For datetime, preserve previously chosen time (if any)
               if (kind === "datetime" && single) {
                  selected = new Date(
                     selected.getFullYear(),
                     selected.getMonth(),
                     selected.getDate(),
                     single.getHours(),
                     single.getMinutes(),
                     single.getSeconds(),
                     0,
                  );
               }

               nextValue = selected;
            } else {
               nextValue = undefined;
            }
            nextRange = undefined;
         } else {
            if (next && next instanceof Date) {
               nextRange = { from: next };
            } else {
               nextRange = (next as DateRange | undefined) ?? undefined;
            }
            nextValue = nextRange;
         }

         const rangeComplete =
            mode === "range" ? isRangeComplete(nextRange) : !!nextValue;

         const detail: ChangeDetail<{
            mode: DateMode;
            from: "calendar";
            rangeComplete: boolean;
         }> = {
            source: "variant",
            raw: nextValue,
            nativeEvent: undefined,
            meta: {
               mode,
               from: "calendar",
               rangeComplete,
            },
         };

         onValue?.(nextValue, detail);

         const shouldStayOpen =
            stayOpenOnSelect ||
            (mode === "range" && !rangeComplete);

         if (!shouldStayOpen) {
            handleOpenChange(false);
         }
      },
      [mode, stayOpenOnSelect, onValue, handleOpenChange, kind, single],
   );

   const handleTimeChange = React.useCallback(
      (next: Date | undefined) => {
         if (!next) {
            const detail: ChangeDetail<{
               mode: DateMode;
               kind: DateKind;
               from: "time";
               cleared: boolean;
            }> = {
               source: "variant",
               raw: undefined,
               nativeEvent: undefined,
               meta: {
                  mode,
                  kind,
                  from: "time",
                  cleared: true,
               },
            };
            onValue?.(undefined, detail);
            return;
         }

         const detail: ChangeDetail<{
            mode: DateMode;
            kind: DateKind;
            from: "time";
         }> = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta: {
               mode,
               kind,
               from: "time",
            },
         };

         onValue?.(next, detail);
      },
      [mode, kind, onValue],
   );

   const handleClear = React.useCallback(
      (ev: React.MouseEvent) => {
         ev.preventDefault();
         ev.stopPropagation();

         const detail: ChangeDetail<{
            mode: DateMode;
            cleared: boolean;
         }> = {
            source: "variant",
            raw: undefined,
            nativeEvent: ev as any,
            meta: {
               mode,
               cleared: true,
            },
         };
         onValue?.(undefined, detail);
      },
      [mode, onValue],
   );

   const hasValue = hasSelection(value);
   const placeholderText =
      typeof placeholder === "string"
         ? placeholder
         : mode === "range"
            ? "Select date range"
            : "Select date";

   /**
    * Manual text input (mask-driven) — only for `mode = "single"`.
    * Range editing via text gets very hairy, so we keep range as
    * a calendar-driven control for now.
    */
   const handleInputChange = React.useCallback(
      (event: any) => {
         if (mode !== "single") return;

         const masked = (event?.value ??
            event?.target?.value ??
            "") as string;

         setLocalText(masked);

         const digits = meterSafeDigits(masked);

         if (!digits.length) {
            const detail: ChangeDetail<{
               mode: DateMode;
               kind: DateKind;
               from: "text";
               cleared: boolean;
            }> = {
               source: "variant",
               raw: undefined,
               nativeEvent: event,
               meta: {
                  mode,
                  kind,
                  from: "text",
                  cleared: true,
               },
            };
            onValue?.(undefined, detail);
            return;
         }

         const parsed = parseRawToDate(digits, kind);
         if (!parsed) {
            // Incomplete or invalid — keep local text but don't
            // push a Date value yet.
            return;
         }

         // If min/max are set, enforce them here.
         if (minDate && parsed < minDate) return;
         if (maxDate && parsed > maxDate) return;

         const detail: ChangeDetail<{
            mode: DateMode;
            kind: DateKind;
            from: "text";
         }> = {
            source: "variant",
            raw: parsed,
            nativeEvent: event,
            meta: {
               mode,
               kind,
               from: "text",
            },
         };

         onValue?.(parsed, detail);
      },
      [mode, kind, minDate, maxDate, onValue],
   );

   const trailingControl = (
      <div
         className="flex h-full items-center gap-1 pr-1"
         data-slot="date-controls"
      >
         {clearable && hasValue && (
            <button
               type="button"
               onClick={handleClear}
               className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
               aria-label="Clear date"
               data-slot="date-clear"
            >
               <XIcon className="h-3 w-3" />
            </button>
         )}

         {showCalendar && (
            <button
               type="button"
               onClick={() => handleOpenChange(!currentOpen)}
               className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
               aria-label="Open calendar"
               data-slot="date-toggle"
            >
               <CalendarIcon className="h-4 w-4" />
            </button>
         )}
      </div>
   );

   const inputNode = (
      <Input
         ref={ref}
         {...restTextProps}
         type="text"
         value={localText}
         onChange={mode === "single" ? (handleInputChange as any) : undefined}
         readOnly={mode !== "single" && showCalendar}
         placeholder={placeholderText}
         trailingControl={trailingControl}
         aria-invalid={error ? "true" : undefined}
         // Mask only makes sense when we allow typing.
         mask={mode === "single" ? resolvedMask : undefined}
      />
   );

   // If calendar is disabled completely, just render the masked input.
   if (!showCalendar) {
      return (
         <div className={className} data-slot="date-field">
            {inputNode}
         </div>
      );
   }

   const showCalendarBody = kind !== "time" && kind !== "hour";

   // Calendar / time popover.
   return (
      <Popover open={currentOpen} onOpenChange={handleOpenChange}>
         <PopoverTrigger asChild>
            <div className={className} data-slot="date-field">
               {inputNode}
            </div>
         </PopoverTrigger>
         <PopoverContent
            align="start"
            className="w-auto p-0"
            data-slot="date-popover"
         >
            <div className="flex flex-col gap-2 p-2">
               {showCalendarBody && (
                  <Calendar
                     mode={mode}
                     //@ts-ignore date UI bits
                     selected={mode === "single" ? single : range}
                     onSelect={handleSelect as any}
                     disabled={disabledDays}
                     fromDate={minDate}
                     toDate={maxDate}
                     initialFocus
                  />
               )}

               {showTimeDropdowns && (
                  <TimeDropdowns
                     value={single ?? undefined}
                     onChange={handleTimeChange}
                     label={
                        kind === "datetime"
                           ? "Time"
                           : undefined
                     }
                     minuteStep={5}
                     showSeconds={false}
                     density="compact"
                  />
               )}
            </div>
         </PopoverContent>
      </Popover>
   );
});

ShadcnDateVariant.displayName = "ShadcnDateVariant";

export default ShadcnDateVariant;
```

---
#### 40


` File: packages/form-palette/src/presets/shadcn-variants/editor.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/editor.tsx

import * as React from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { cn } from "@/lib/utils";
import type { ChangeDetail, VariantBaseProps, } from "@/variants/shared";

/**
 * Host app MUST import Toast UI Editor CSS:
 *   import "@toast-ui/editor/dist/toastui-editor.css";
 */

export type ToastToolbarItem =
    | "heading"
    | "bold"
    | "italic"
    | "strike"
    | "hr"
    | "quote"
    | "ul"
    | "ol"
    | "task"
    | "indent"
    | "outdent"
    | "table"
    | "image"
    | "link"
    | "code"
    | "codeblock";

export type EditorFormat = "html" | "markdown";
export type EditorToolbar = "default" | "none" | ToastToolbarItem[][];

type TuiEditorInstance = {
    getHTML(): string;
    getMarkdown(): string;
    setHTML(html: string, cursorToEnd?: boolean): void;
    setMarkdown(markdown: string, cursorToEnd?: boolean): void;
    insertText(text: string): void;

    setHeight?(height: string): void;
    setPlaceholder?(placeholder: string): void;
    changeMode?(mode: "markdown" | "wysiwyg", withoutFocus?: boolean): void;
    changePreviewStyle?(style: "tab" | "vertical"): void;

    on(type: string, handler: (...args: any[]) => void): void;
    off(type: string): void;
    destroy(): void;
};

export interface ShadcnEditorVariantProps extends Pick<
    VariantBaseProps<string | undefined>,
    | "value"
    | "onValue"
    | "error"
    | "disabled"
    | "readOnly"
    | "required"
    | "size"
    | "density"
> {
    placeholder?: string;
    height?: string; // ex) "400px"
    previewStyle?: "vertical" | "tab";
    editType?: "wysiwyg" | "markdown";
    useCommandShortcut?: boolean;

    /** Which format to store in the form value */
    format?: EditorFormat;

    /**
     * Toolbar config:
     * - "default" uses Toast UI defaults
     * - "none" hides tools + mode switch
     * - array provides toolbarItems
     */
    toolbar?: EditorToolbar;

    /** If true, paste is intercepted and inserted as plain text only */
    pastePlainText?: boolean;

    className?: string;
}

export function ShadcnEditorVariant(props: ShadcnEditorVariantProps) {
    const {
        value,
        onValue,
        error,
        disabled,
        readOnly,
        required,
        size,
        density,
        className,

        placeholder = "",
        height = "400px",
        previewStyle = "vertical",
        editType = "wysiwyg",
        useCommandShortcut = true,
        format = "html",
        toolbar = "default",
        pastePlainText = false,
    } = props;

    const mountRef = React.useRef<HTMLDivElement>(null);
    const editorRef = React.useRef<TuiEditorInstance | null>(null);

    const formatRef = React.useRef<EditorFormat>(format);
    const onValueRef = React.useRef<typeof onValue>(onValue);

    const syncingRef = React.useRef(false);
    const loadedRef = React.useRef(false);

    formatRef.current = format;
    onValueRef.current = onValue;

    const effectiveReadOnly = Boolean(disabled || readOnly);

    const readContent = React.useCallback((ed: TuiEditorInstance): string => {
        return formatRef.current === "markdown"
            ? (ed.getMarkdown() ?? "")
            : (ed.getHTML() ?? "");
    }, []);

    const emit = React.useCallback((next: string) => {
        const detail: ChangeDetail<string> = { source: "user", raw: next };
        onValueRef.current?.(next, detail);
    }, []);

    const structuralKey = React.useMemo(() => {
        const hideModeSwitch = toolbar === "none" || pastePlainText;
        // toolbar array is serializable (strings)
        return JSON.stringify({ toolbar, useCommandShortcut, hideModeSwitch });
    }, [toolbar, useCommandShortcut, pastePlainText]);

    // Create / recreate editor when structural options change
    React.useEffect(() => {
        const el = mountRef.current;
        if (!el) return;

        // Clean existing instance first
        if (editorRef.current) {
            try {
                editorRef.current.off("change");
            } catch {}
            try {
                editorRef.current.off("load");
            } catch {}
            try {
                editorRef.current.destroy();
            } catch {}
            editorRef.current = null;
        }

        loadedRef.current = false;
        syncingRef.current = true;

        const hideModeSwitch = toolbar === "none" || pastePlainText;

        const options: any = {
            el,
            height,
            initialValue: value ?? "",
            previewStyle,
            initialEditType: editType,
            useCommandShortcut,
            usageStatistics: false,
            placeholder,
            hideModeSwitch,
            ...(toolbar === "none"
                ? { toolbarItems: [] }
                : Array.isArray(toolbar)
                  ? { toolbarItems: toolbar }
                  : {}),
            events: {
                load: () => {
                    loadedRef.current = true;
                    syncingRef.current = false;
                },
                change: () => {
                    const ed = editorRef.current;
                    if (!ed) return;
                    if (syncingRef.current) return;
                    emit(readContent(ed));
                },
            },
        };

        editorRef.current = new (Editor as any)(options) as TuiEditorInstance;

        // If load never fires for some reason, don’t permanently block changes
        Promise.resolve().then(() => {
            syncingRef.current = false;
        });

        return () => {
            const ed = editorRef.current;
            if (!ed) return;

            try {
                ed.off("change");
            } catch {}
            try {
                ed.off("load");
            } catch {}
            try {
                ed.destroy();
            } catch {}

            editorRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [structuralKey]); // intentionally only structural props

    // Keep height/placeholder updated without recreating (when supported)
    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.setHeight === "function") ed.setHeight(height);
    }, [height]);

    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.setPlaceholder === "function")
            ed.setPlaceholder(placeholder);
    }, [placeholder]);

    // Update mode + preview style without recreating (when supported)
    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.changeMode === "function") ed.changeMode(editType);
    }, [editType]);

    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.changePreviewStyle === "function")
            ed.changePreviewStyle(previewStyle);
    }, [previewStyle]);

    // Sync external value → editor (avoid cursor-jank with equality checks)
    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;

        const next = value ?? "";

        syncingRef.current = true;

        if (format === "markdown") {
            const cur = ed.getMarkdown?.() ?? "";
            if (cur !== next) ed.setMarkdown(next, false);
        } else {
            const cur = ed.getHTML?.() ?? "";
            if (cur !== next) ed.setHTML(next, false);
        }

        Promise.resolve().then(() => {
            syncingRef.current = false;
        });
    }, [value, format]);

    // Plain-text paste interception (optional)
    React.useEffect(() => {
        if (!pastePlainText) return;

        const host = mountRef.current;
        if (!host) return;

        const onPaste = (e: ClipboardEvent) => {
            e.preventDefault();
            const text = e.clipboardData?.getData("text/plain") ?? "";
            const ed = editorRef.current;
            if (text && ed) ed.insertText(text);
        };

        host.addEventListener("paste", onPaste);
        return () => host.removeEventListener("paste", onPaste);
    }, [pastePlainText]);

    return (
        <div
            data-size={size}
            data-density={density}
            className={cn(
                "rounded-md border border-input bg-background overflow-hidden",
                effectiveReadOnly && "opacity-60 pointer-events-none",
                className
            )}
            aria-invalid={error ? true : undefined}
            aria-required={required ? true : undefined}
        >
            <div ref={mountRef} />
        </div>
    );
}
```

---
#### 41


` File: packages/form-palette/src/presets/shadcn-variants/file.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/file.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/presets/ui/checkbox";
import { ScrollArea } from "@/presets/ui/scroll-area";
import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { Badge } from "@/presets/ui/badge";
import {
    FileIcon,
    UploadCloud,
    Trash2,
    CheckCircle2,
    X,
    AlertCircle,
    Loader2,
    ChevronDown,
    Plus,
    FolderUp,
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type FileSourceKind = "native" | "path" | "url" | "custom";

export interface FileItem {
    id: string;
    kind: FileSourceKind;
    file?: File;
    path?: string;
    url?: string;
    name: string;
    size?: number;
    type?: string;
    status?: "idle" | "loading" | "done" | "failed";
    error?: string | null;
    meta?: any;
}

export type FileLike =
    | File
    | string
    | {
          id?: string;
          file?: File;
          path?: string;
          url?: string;
          name?: string;
          size?: number;
          type?: string;
          status?: FileItem["status"];
          error?: string | null;
          meta?: any;
          [key: string]: unknown;
      };

export type CustomFileLoaderResult = FileLike | FileLike[] | null | undefined;

export type CustomFileLoader = (ctx: {
    multiple: boolean;
    current: FileItem[];
}) => Promise<CustomFileLoaderResult> | CustomFileLoaderResult;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function fileId() {
    return `file_${Math.random().toString(36).slice(2)}`;
}

function formatSizeDefault(size?: number): string {
    if (!size || size <= 0) return "—";
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
}

/** ✅ Exact trigger height contract (your spec) */
function triggerHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}

/** Keep chips safely within the trigger height */
function chipHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "h-5";
        case "lg":
            return "h-7";
        default:
            return "h-6";
    }
}

/** Folder button sizing that fits inside each trigger height */
function pickerBtnSize(size?: Size) {
    switch (size) {
        case "sm":
            return "h-6 w-6";
        case "lg":
            return "h-8 w-8";
        default:
            return "h-7 w-7";
    }
}

function toArray<T>(v: T | T[] | null | undefined): T[] {
    if (v == null) return [];
    return Array.isArray(v) ? v : [v];
}

function normaliseFileLike(input: FileLike): FileItem {
    const asAny: any = input as any;
    const existingId = asAny.id as string | undefined;

    if (existingId && (asAny.file || asAny.path || asAny.url)) {
        return {
            id: existingId,
            kind: (asAny.kind as FileSourceKind) ?? "custom",
            file: asAny.file,
            path: asAny.path,
            url: asAny.url,
            name: asAny.name ?? asAny.file?.name ?? existingId,
            size: asAny.size ?? asAny.file?.size,
            type: asAny.type ?? asAny.file?.type,
            status: asAny.status ?? "idle",
            error: asAny.error ?? null,
            meta: asAny.meta,
        };
    }

    if (input instanceof File) {
        return {
            id: existingId ?? fileId(),
            kind: "native",
            file: input,
            name: input.name,
            size: input.size,
            type: input.type,
            status: "idle",
            error: null,
        };
    }

    if (typeof input === "string") {
        const isUrl = input.includes("://");
        const name = input.split(/[\\/]/).pop() ?? input;
        return {
            id: existingId ?? fileId(),
            kind: isUrl ? "url" : "path",
            [isUrl ? "url" : "path"]: input,
            name,
            status: "idle",
            error: null,
        } as FileItem;
    }

    return {
        id: existingId ?? fileId(),
        kind: "custom",
        name: (input as any).name ?? "Unknown File",
        status: "idle",
        ...input,
    } as FileItem;
}

function normaliseFromFiles(list: FileList | File[]): FileItem[] {
    const arr: File[] = Array.isArray(list) ? list : Array.from(list);
    return arr.map(normaliseFileLike);
}

function densityTokens(density?: Density) {
    switch (density) {
        case "compact":
            return {
                triggerPadX: "px-2",
                triggerGap: "gap-1.5",
                headerPad: "px-3 py-1.5",
                listPad: "p-1",
                rowPad: "px-2 py-1.5",
                footerPad: "p-1",
                dropPad: "px-5 py-6",
                dropGap: "gap-2",
                chipPad: "px-1",
                chipGap: "gap-1",
            };
        case "loose":
            return {
                triggerPadX: "px-4",
                triggerGap: "gap-3",
                headerPad: "px-4 py-2.5",
                listPad: "p-2",
                rowPad: "px-3 py-2.5",
                footerPad: "p-2",
                dropPad: "px-8 py-10",
                dropGap: "gap-4",
                chipPad: "px-2",
                chipGap: "gap-2",
            };
        default:
            return {
                triggerPadX: "px-3",
                triggerGap: "gap-2",
                headerPad: "px-3 py-2",
                listPad: "p-1",
                rowPad: "px-2 py-2",
                footerPad: "p-1",
                dropPad: "px-6 py-8",
                dropGap: "gap-3",
                chipPad: "px-1.5",
                chipGap: "gap-1.5",
            };
    }
}

function mergeHandlers<E>(
    a: ((e: E) => void) | undefined,
    b: ((e: E) => void) | undefined
) {
    if (!a) return b;
    if (!b) return a;
    return (e: E) => {
        a(e);
        b(e);
    };
}

// ─────────────────────────────────────────────
// Props (with mode discriminator)
// ─────────────────────────────────────────────

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

type FileVariantBaseProps = Pick<
    VariantBaseProps<FileItem[]>,
    "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> & {
    multiple?: boolean;
    accept?: string | string[];
    maxFiles?: number;
    maxTotalSize?: number;

    showDropArea?: boolean;
    dropIcon?: React.ReactNode;
    dropTitle?: React.ReactNode;
    dropDescription?: React.ReactNode;

    renderDropArea?: (ctx: {
        openPicker: () => void;
        isDragging: boolean;
    }) => React.ReactNode;

    renderFileItem?: (ctx: {
        item: FileItem;
        index: number;
        selected: boolean;
        toggleSelected: () => void;
        remove: () => void;
    }) => React.ReactNode;

    showCheckboxes?: boolean;
    onFilesAdded?: (
        added: FileItem[],
        detail: ChangeDetail<{ from: "input" | "drop" | "custom-loader" }>
    ) => void;

    customLoader?: CustomFileLoader;
    mergeMode?: "append" | "replace";

    formatFileName?: (item: FileItem) => React.ReactNode;
    formatFileSize?: (size?: number) => React.ReactNode;
    placeholder?: string;

    className?: string;
    dropAreaClassName?: string;
    listClassName?: string;
    triggerClassName?: string;
};

type FileDefaultModeProps = {
    mode?: "default";

    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;
    joinControls?: boolean;
    extendBoxToControls?: boolean;

    // not supported in default mode
    button?: never;
    children?: never;

    selectedBadge?: never;
    selectedBadgeHiddenWhenZero?: never;
    selectedBadgeVariant?: never;
    selectedBadgeClassName?: never;
    selectedBadgePlacement?: never;
};

type FileButtonTrigger =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          items: FileItem[];
          selectedCount: number;
          disabled: boolean;
      }) => React.ReactNode);

type FileButtonModeProps = {
    mode: "button";

    /** Used when mode="button". If provided, this is the trigger. If not, `children` is used. */
    button?: FileButtonTrigger;
    children?: FileButtonTrigger;

    /** Selected-count badge (mode="button" only) */
    selectedBadge?: boolean;
    selectedBadgeHiddenWhenZero?: boolean;
    selectedBadgeVariant?: BadgeVariant;
    selectedBadgeClassName?: string;
    selectedBadgePlacement?: "end" | "corner";

    // icons & controls NOT supported in button mode
    leadingIcons?: never;
    trailingIcons?: never;
    icon?: never;

    leadingControl?: never;
    trailingControl?: never;
    leadingControlClassName?: never;
    trailingControlClassName?: never;
    joinControls?: never;
    extendBoxToControls?: never;
};

export type ShadcnFileVariantProps = FileVariantBaseProps &
    (FileDefaultModeProps | FileButtonModeProps);

// ─────────────────────────────────────────────
// Sub-Components
// ─────────────────────────────────────────────

const FileThumbnail = ({ item }: { item: FileItem }) => {
    const [preview, setPreview] = React.useState<string | null>(null);

    React.useEffect(() => {
        const isImage =
            item.type?.startsWith("image/") ||
            item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
        if (!isImage) return;

        if (item.file) {
            const url = URL.createObjectURL(item.file);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
        if (item.url || item.path) {
            setPreview(item.url || item.path || null);
        }
    }, [item]);

    return (
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-sm border bg-muted/50">
            {preview ? (
                <img
                    src={preview}
                    alt=""
                    className="h-full w-full object-cover"
                />
            ) : (
                <FileIcon className="h-4 w-4 text-muted-foreground/50" />
            )}
        </div>
    );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export const ShadcnFileVariant = React.forwardRef<
    HTMLDivElement,
    ShadcnFileVariantProps
>(function ShadcnFileVariant(props, ref) {
    const {
        value,
        onValue,
        disabled,
        readOnly,
        error,
        size = "md",
        density = "comfortable",

        multiple = false,
        accept,
        maxFiles,
        maxTotalSize,

        showDropArea = false,
        dropIcon,
        dropTitle,
        dropDescription,
        renderDropArea,

        renderFileItem,
        showCheckboxes,
        onFilesAdded,
        customLoader,
        mergeMode = "append",

        formatFileName,
        formatFileSize = formatSizeDefault,
        placeholder = "Select file...",

        className,
        dropAreaClassName,
        listClassName,
        triggerClassName,

        // default-mode only
        leadingIcons,
        trailingIcons,
        icon,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        joinControls: joinControlsProp,
        extendBoxToControls: extendBoxToControlsProp,

        // button-mode only
        mode = "default",
        button,
        children,
        selectedBadge = true,
        selectedBadgeHiddenWhenZero = true,
        selectedBadgeVariant = "secondary",
        selectedBadgeClassName,
        selectedBadgePlacement = "corner",
    } = props as ShadcnFileVariantProps & Record<string, any>;

    const joinControls =
        mode === "default" ? (joinControlsProp ?? true) : false;
    const extendBoxToControls =
        mode === "default" ? (extendBoxToControlsProp ?? true) : false;

    // ─────────────────────────────────────────────
    // State
    // ─────────────────────────────────────────────
    const items = value ?? [];
    const isDisabled = Boolean(disabled || readOnly);

    const [dragOver, setDragOver] = React.useState(false);
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
        () => new Set()
    );
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const den = densityTokens(density as Density);

    // Pre-calculations
    const heightCls = triggerHeight(size as Size);
    const chipHeightCls = chipHeight(size as Size);
    const pickerBtnCls = pickerBtnSize(size as Size);

    const resolvedLeadingIcons = (
        leadingIcons?.length ? leadingIcons : icon ? [icon] : []
    ) as React.ReactNode[];
    const resolvedTrailingIcons = (
        trailingIcons?.length ? trailingIcons : []
    ) as React.ReactNode[];
    const hasExternalControls = !!leadingControl || !!trailingControl;

    const COLLAPSE_LIMIT = 2;

    // ─────────────────────────────────────────────
    // Logic
    // ─────────────────────────────────────────────

    const emitChange = React.useCallback(
        (next: FileItem[], meta: any) => {
            onValue?.(next, {
                source: "variant",
                raw: next,
                nativeEvent: undefined,
                meta,
            });
        },
        [onValue]
    );

    const handleAddItems = React.useCallback(
        (incoming: FileItem[], from: "input" | "drop" | "custom-loader") => {
            if (isDisabled) return;

            let next = multiple ? [...items] : [];
            const added: FileItem[] = [];

            for (const item of incoming) {
                if (multiple && maxFiles && next.length >= maxFiles) break;

                const currentTotalSize = next.reduce(
                    (acc, i) => acc + (i.size || 0),
                    0
                );
                if (
                    maxTotalSize &&
                    currentTotalSize + (item.size || 0) > maxTotalSize
                )
                    break;

                next.push(item);
                added.push(item);
            }

            if (added.length > 0) {
                onFilesAdded?.(added, {
                    source: "variant",
                    raw: added,
                    nativeEvent: undefined,
                    meta: { from },
                });
                emitChange(next, { action: "add", from, added });
            }
        },
        [
            emitChange,
            isDisabled,
            items,
            maxFiles,
            maxTotalSize,
            multiple,
            onFilesAdded,
        ]
    );

    const handleRemove = React.useCallback(
        (id: string) => {
            const next = items.filter((i) => i.id !== id);
            emitChange(next, { action: "remove", id });
            if (selectedIds.has(id)) {
                const nextSel = new Set(selectedIds);
                nextSel.delete(id);
                setSelectedIds(nextSel);
            }
        },
        [emitChange, items, selectedIds]
    );

    const handleBulkRemove = React.useCallback(() => {
        const next = items.filter((i) => !selectedIds.has(i.id));
        emitChange(next, {
            action: "bulk-remove",
            ids: Array.from(selectedIds),
        });
        setSelectedIds(new Set());
    }, [emitChange, items, selectedIds]);

    const openPicker = React.useCallback(async () => {
        if (isDisabled) return;

        if (customLoader) {
            try {
                const result = await customLoader({ multiple, current: items });
                if (!result) return;

                const normalized = toArray(result).map(normaliseFileLike);
                if (mergeMode === "replace" || !multiple) {
                    emitChange(normalized, {
                        action: "set",
                        from: "custom-loader",
                    });
                } else {
                    handleAddItems(normalized, "custom-loader");
                }
            } catch (err) {
                console.error("Custom loader failed", err);
            }
            return;
        }

        fileInputRef.current?.click();
    }, [
        customLoader,
        emitChange,
        handleAddItems,
        isDisabled,
        items,
        mergeMode,
        multiple,
    ]);

    const onDragOver = React.useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (!isDisabled) setDragOver(true);
        },
        [isDisabled]
    );

    const onDrop = React.useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            if (isDisabled || !e.dataTransfer.files?.length) return;
            const files = normaliseFromFiles(e.dataTransfer.files);
            handleAddItems(files, "drop");
        },
        [handleAddItems, isDisabled]
    );

    const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            handleAddItems(normaliseFromFiles(e.target.files), "input");
        }
        e.target.value = "";
    };

    // ─────────────────────────────────────────────
    // UI Pieces: Interactive File Chip
    // ─────────────────────────────────────────────

    const FileChip = React.useCallback(
        ({
            item,
            condensed = false,
        }: {
            item: FileItem;
            condensed?: boolean;
        }) => {
            const name = formatFileName ? formatFileName(item) : item.name;
            const [preview, setPreview] = React.useState<string | null>(null);
            const [isOpen, setIsOpen] = React.useState(false);

            React.useEffect(() => {
                const isImage =
                    item.type?.startsWith("image/") ||
                    item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                if (!isImage) {
                    setPreview(null);
                    return;
                }

                if (item.file) {
                    const url = URL.createObjectURL(item.file);
                    setPreview(url);
                    return () => URL.revokeObjectURL(url);
                }
                if (item.url || item.path) {
                    setPreview(item.url || item.path || null);
                }
            }, [item]);

            return (
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <div
                            role="button"
                            tabIndex={0}
                            className={cn(
                                "flex items-center overflow-hidden rounded-sm border bg-muted/60 text-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none cursor-pointer",
                                chipHeightCls,
                                den.chipPad,
                                den.chipGap,
                                condensed ? "max-w-30" : "max-w-50"
                            )}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.stopPropagation();
                                    setIsOpen(true);
                                }
                            }}
                        >
                            <FileIcon className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span className="truncate font-medium">{name}</span>

                            <button
                                type="button"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item.id);
                                }}
                                className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 hover:bg-destructive/20 hover:text-destructive focus:outline-none"
                                aria-label="Remove file"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-64 p-0"
                        align="start"
                        side="bottom"
                    >
                        <div className="relative aspect-video w-full flex items-center justify-center bg-muted/30 border-b">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt={item.name}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                                    <FileIcon className="h-10 w-10" />
                                    <span className="text-[10px] uppercase">
                                        No Preview
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-3">
                            <div
                                className="font-medium text-sm truncate"
                                title={item.name}
                            >
                                {name}
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                                <span>{formatFileSize(item.size)}</span>
                                {item.type && (
                                    <span className="uppercase opacity-70">
                                        {item.type.split("/").pop()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            );
        },
        [
            chipHeightCls,
            den.chipGap,
            den.chipPad,
            formatFileName,
            formatFileSize,
            handleRemove,
        ]
    );

    // ─────────────────────────────────────────────
    // Button-mode trigger (with badge)
    // ─────────────────────────────────────────────

    const selectedCount = items.length;

    const resolveButtonTriggerElement =
        React.useCallback((): React.ReactElement => {
            const ctx = {
                open: popoverOpen,
                items,
                selectedCount,
                disabled: isDisabled,
            };

            const rawNode =
                typeof button === "function"
                    ? button(ctx)
                    : (button ??
                      (typeof children === "function"
                          ? children(ctx)
                          : children));

            const shouldShowBadge =
                Boolean(selectedBadge) &&
                (!selectedBadgeHiddenWhenZero || selectedCount > 0);

            const badgeEl = shouldShowBadge ? (
                <Badge
                    variant={selectedBadgeVariant}
                    className={cn(
                        "text-[10px] h-5 px-1.5 leading-none",
                        selectedBadgePlacement === "corner" &&
                            "absolute -top-2 -right-2",
                        selectedBadgeClassName
                    )}
                >
                    {selectedCount}
                </Badge>
            ) : null;

            // Note: Using broader typings and `as any` in cloneElement prop bags to avoid TS complaining
            // when enhancing arbitrary custom components that may not declare DOM event props.
            const injectBadgeIntoElement = (el: React.ReactElement<any>) => {
                if (!badgeEl) return el;

                const existingClass = (el.props as any).className as
                    | string
                    | undefined;
                const nextClass = cn(
                    existingClass,
                    selectedBadgePlacement === "corner" && "relative"
                );

                const child = (el.props as any).children;

                if (selectedBadgePlacement === "end") {
                    return React.cloneElement(el, {
                        className: nextClass,
                        children: (
                            <span className="inline-flex items-center gap-2">
                                <span className="min-w-0">{child}</span>
                                {badgeEl}
                            </span>
                        ),
                    } as any);
                }

                return React.cloneElement(el, {
                    className: nextClass,
                    children: (
                        <>
                            {child}
                            {badgeEl}
                        </>
                    ),
                } as any);
            };

            const withDnD = (el: React.ReactElement<any>) =>
                React.cloneElement(el, {
                    onDragOver: mergeHandlers(
                        (el.props as any).onDragOver,
                        onDragOver
                    ),
                    onDragLeave: mergeHandlers(
                        (el.props as any).onDragLeave,
                        () => setDragOver(false)
                    ),
                    onDrop: mergeHandlers((el.props as any).onDrop, onDrop),
                } as any);

            if (React.isValidElement(rawNode)) {
                return withDnD(injectBadgeIntoElement(rawNode));
            }

            // fallback trigger (no input styles; just whatever you passed + optional badge)
            const fallback = (
                <button
                    type="button"
                    disabled={isDisabled}
                    className={cn(
                        triggerClassName,
                        selectedBadgePlacement === "corner" && "relative"
                    )}
                    onDragOver={onDragOver}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                >
                    {rawNode ?? <span>{placeholder}</span>}
                    {badgeEl}
                </button>
            );

            // end placement needs an inline flex wrapper (fallback only)
            if (badgeEl && selectedBadgePlacement === "end") {
                return (
                    <button
                        type="button"
                        disabled={isDisabled}
                        className={cn(triggerClassName)}
                        onDragOver={onDragOver}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={onDrop}
                    >
                        <span className="inline-flex items-center gap-2">
                            <span className="min-w-0">
                                {rawNode ?? <span>{placeholder}</span>}
                            </span>
                            {badgeEl}
                        </span>
                    </button>
                );
            }

            return fallback;
        }, [
            button,
            children,
            isDisabled,
            items,
            onDragOver,
            onDrop,
            placeholder,
            popoverOpen,
            selectedBadge,
            selectedBadgeClassName,
            selectedBadgeHiddenWhenZero,
            selectedBadgePlacement,
            selectedBadgeVariant,
            selectedCount,
            triggerClassName,
        ]);

    // ─────────────────────────────────────────────
    // Trigger Region
    // ─────────────────────────────────────────────

    const TriggerRegion = React.useMemo(() => {
        // A) Drop Zone Mode (Big Box) - No Popover, the list is external
        if (showDropArea) {
            if (renderDropArea)
                return renderDropArea({ openPicker, isDragging: dragOver });

            return (
                <div
                    onClick={openPicker}
                    onDragOver={onDragOver}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    className={cn(
                        "group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-center transition-all duration-200",
                        den.dropPad,
                        den.dropGap,
                        dragOver
                            ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                            : "border-muted-foreground/25 hover:bg-muted/30 hover:border-muted-foreground/50",
                        isDisabled && "cursor-not-allowed opacity-50",
                        error && "border-destructive/50 bg-destructive/5",
                        dropAreaClassName
                    )}
                >
                    <div className="rounded-full bg-surfaces-input p-3 shadow-sm">
                        {dropIcon ?? (
                            <UploadCloud className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            {dropTitle ?? "Click or drag to select"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {dropDescription ??
                                (multiple ? "Select files" : "Select a file")}
                        </p>
                    </div>
                </div>
            );
        }

        // B) Select-like mode: uses Popover
        const hasItems = items.length > 0;
        const visibleItems = items.slice(0, COLLAPSE_LIMIT);
        const hiddenCount = items.length - COLLAPSE_LIMIT;
        const isOverflowing = hiddenCount > 0;
        const anySelected = selectedIds.size > 0 && showCheckboxes && multiple;

        const TriggerEl =
            mode === "button" ? (
                resolveButtonTriggerElement()
            ) : (
                <div
                    className={cn(
                        "relative flex w-full cursor-pointer items-center py-0 transition-all",
                        heightCls,
                        den.triggerPadX,
                        den.triggerGap,
                        (!joinControls || !hasExternalControls) &&
                            "rounded-md border border-input bg-surfaces-input ring-offset-background hover:bg-accent/5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        dragOver &&
                            (!joinControls || !hasExternalControls) &&
                            "border-primary ring-2 ring-primary/20",
                        isDisabled && "cursor-not-allowed opacity-50",
                        error &&
                            (!joinControls || !hasExternalControls) &&
                            "border-destructive text-destructive",
                        triggerClassName
                    )}
                    onDragOver={onDragOver}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                >
                    {/* Leading Icons */}
                    {resolvedLeadingIcons.map((ico, i) => (
                        <span
                            key={i}
                            className="flex shrink-0 items-center justify-center text-muted-foreground"
                        >
                            {ico}
                        </span>
                    ))}

                    {/* Content: Chips or Placeholder */}
                    <div
                        className={cn(
                            "flex flex-1 items-center overflow-hidden",
                            den.triggerGap
                        )}
                    >
                        {hasItems ? (
                            <>
                                {visibleItems.map((item) => (
                                    <FileChip
                                        key={item.id}
                                        item={item}
                                        condensed={multiple}
                                    />
                                ))}
                                {isOverflowing && (
                                    <span className="flex h-5 items-center justify-center rounded-sm bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                                        +{hiddenCount}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="truncate text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </div>

                    {/* Trailing Icons */}
                    {resolvedTrailingIcons.map((ico, i) => (
                        <span
                            key={i}
                            className="flex shrink-0 items-center justify-center text-muted-foreground"
                        >
                            {ico}
                        </span>
                    ))}

                    {/* Dedicated File Picker Button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "shrink-0 text-muted-foreground hover:text-foreground",
                            pickerBtnCls
                        )}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            openPicker();
                        }}
                    >
                        <FolderUp className="h-4 w-4" />
                    </Button>

                    {/* Chevron (for Popover) */}
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground opacity-50 transition-transform duration-200",
                            popoverOpen && "rotate-180"
                        )}
                    />
                </div>
            );

        return (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>{TriggerEl}</PopoverTrigger>

                <PopoverContent
                    className="w-(--radix-popover-trigger-width) p-0"
                    align="start"
                >
                    <div className="flex flex-col">
                        {/* Header */}
                        <div
                            className={cn(
                                "flex items-center justify-between border-b text-xs font-medium text-muted-foreground",
                                den.headerPad
                            )}
                        >
                            <span>
                                {anySelected
                                    ? `${selectedIds.size} selected`
                                    : `${items.length} files total`}
                            </span>

                            {anySelected ? (
                                <button
                                    type="button"
                                    className="text-destructive hover:underline"
                                    onClick={handleBulkRemove}
                                >
                                    Remove selected
                                </button>
                            ) : items.length > 0 ? (
                                <button
                                    type="button"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={() =>
                                        emitChange([], { action: "clear" })
                                    }
                                >
                                    Clear all
                                </button>
                            ) : null}
                        </div>

                        {/* Scrollable List */}
                        <ScrollArea
                            className={cn(
                                "h-auto max-h-75 w-full",
                                den.listPad
                            )}
                        >
                            <div className="flex flex-col gap-1">
                                {items.map((item) => {
                                    const selected = selectedIds.has(item.id);
                                    const toggle = () => {
                                        const next = new Set(selectedIds);
                                        if (next.has(item.id))
                                            next.delete(item.id);
                                        else next.add(item.id);
                                        setSelectedIds(next);
                                    };

                                    return (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "group flex items-center gap-3 rounded-md text-sm transition-colors hover:bg-muted/50",
                                                den.rowPad
                                            )}
                                        >
                                            {showCheckboxes && multiple && (
                                                <Checkbox
                                                    checked={selected}
                                                    onCheckedChange={toggle}
                                                    className="h-4 w-4 shrink-0"
                                                />
                                            )}

                                            <FileThumbnail item={item} />

                                            <div className="min-w-0 flex-1">
                                                <div className="truncate font-medium">
                                                    {formatFileName?.(item) ??
                                                        item.name}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span>
                                                        {formatFileSize(
                                                            item.size
                                                        )}
                                                    </span>
                                                    {item.status ===
                                                        "failed" && (
                                                        <span className="text-destructive">
                                                            Failed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemove(item.id);
                                                }}
                                            >
                                                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    );
                                })}

                                {items.length === 0 && (
                                    <div className="py-4 text-center text-xs text-muted-foreground">
                                        No files selected
                                    </div>
                                )}
                            </div>
                        </ScrollArea>

                        {/* Footer Add Button */}
                        <div className={cn("border-t", den.footerPad)}>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => {
                                    setPopoverOpen(false);
                                    openPicker();
                                }}
                            >
                                <Plus className="mr-2 h-3 w-3" />
                                {multiple
                                    ? "Add files..."
                                    : items.length
                                      ? "Replace file"
                                      : "Add file"}
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }, [
        COLLAPSE_LIMIT,
        FileChip,
        den,
        dragOver,
        dropAreaClassName,
        dropDescription,
        dropIcon,
        dropTitle,
        emitChange,
        error,
        handleBulkRemove,
        handleRemove,
        heightCls,
        isDisabled,
        items,
        joinControls,
        mode,
        multiple,
        onDragOver,
        onDrop,
        openPicker,
        pickerBtnCls,
        placeholder,
        popoverOpen,
        renderDropArea,
        resolveButtonTriggerElement,
        resolvedLeadingIcons,
        resolvedTrailingIcons,
        selectedIds,
        showCheckboxes,
        showDropArea,
        hasExternalControls,
        triggerClassName,
        formatFileName,
        formatFileSize,
        setPopoverOpen,
    ]);

    // ─────────────────────────────────────────────
    // External List (Drop Zone Mode Only)
    // ─────────────────────────────────────────────

    const showExternalList = multiple && showDropArea && items.length > 0;
    const anySelectedExternal =
        selectedIds.size > 0 && showCheckboxes && multiple;

    const ExternalFileList = showExternalList ? (
        <>
            {(anySelectedExternal || items.length > 0) && (
                <div className="mt-2 flex items-center justify-between px-1 text-xs text-muted-foreground">
                    <span>{items.length} files</span>
                    <div className="flex gap-2">
                        {anySelectedExternal && (
                            <button
                                type="button"
                                onClick={handleBulkRemove}
                                className="text-destructive hover:underline"
                            >
                                Remove selected
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => emitChange([], { action: "clear" })}
                            className="hover:text-foreground"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            <ScrollArea className={cn("mt-1 w-full", listClassName)}>
                <div className="flex flex-col gap-2">
                    {items.map((item, index) => {
                        const selected = selectedIds.has(item.id);
                        const toggle = () => {
                            const next = new Set(selectedIds);
                            if (next.has(item.id)) next.delete(item.id);
                            else next.add(item.id);
                            setSelectedIds(next);
                        };

                        if (renderFileItem) {
                            return renderFileItem({
                                item,
                                index,
                                selected,
                                toggleSelected: toggle,
                                remove: () => handleRemove(item.id),
                            });
                        }

                        return (
                            <div
                                key={item.id}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-lg border bg-card pr-3 transition-all hover:bg-muted/30",
                                    density === "compact"
                                        ? "p-2"
                                        : density === "loose"
                                          ? "p-3"
                                          : "p-2"
                                )}
                            >
                                {showCheckboxes && (
                                    <Checkbox
                                        checked={selected}
                                        onCheckedChange={toggle}
                                        className="ml-1"
                                    />
                                )}
                                <FileThumbnail item={item} />
                                <div className="min-w-0 flex-1 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="truncate text-sm font-medium text-foreground">
                                            {formatFileName?.(item) ??
                                                item.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{formatFileSize(item.size)}</span>
                                        {item.status === "loading" && (
                                            <span className="flex items-center gap-1 text-primary">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                            </span>
                                        )}
                                        {item.status === "failed" && (
                                            <span className="flex items-center gap-1 text-destructive">
                                                <AlertCircle className="h-3 w-3" />
                                            </span>
                                        )}
                                        {item.status === "done" && (
                                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(item.id)}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>
        </>
    ) : null;

    // ─────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────

    const joinedBox =
        mode === "default" &&
        joinControls &&
        extendBoxToControls &&
        !showDropArea;

    return (
        <div
            ref={ref}
            className={cn("w-full", className)}
            aria-disabled={isDisabled}
            aria-invalid={!!error}
        >
            <div
                className={cn(
                    "flex w-full",
                    joinedBox
                        ? "items-stretch rounded-md border border-input bg-surfaces-input shadow-xs ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        : "items-start",
                    joinedBox &&
                        dragOver &&
                        "border-primary ring-2 ring-primary/20",
                    joinedBox && error && "border-destructive"
                )}
            >
                {mode === "default" && leadingControl && (
                    <div
                        className={cn(
                            "flex items-center",
                            joinControls &&
                                !showDropArea &&
                                "border-r bg-muted/50 px-3",
                            leadingControlClassName
                        )}
                    >
                        {leadingControl}
                    </div>
                )}

                <div className="flex-1 min-w-0">{TriggerRegion}</div>

                {mode === "default" && trailingControl && (
                    <div
                        className={cn(
                            "flex items-center",
                            joinControls &&
                                !showDropArea &&
                                "border-l bg-muted/50 px-3",
                            trailingControlClassName
                        )}
                    >
                        {trailingControl}
                    </div>
                )}
            </div>

            {ExternalFileList}

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple={multiple}
                accept={Array.isArray(accept) ? accept.join(",") : accept}
                onChange={onNativeChange}
            />
        </div>
    );
});

ShadcnFileVariant.displayName = "ShadcnFileVariant";
export default ShadcnFileVariant;
```

---
#### 42


` File: packages/form-palette/src/presets/shadcn-variants/json-editor/editor.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/json-editor/editor.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Separator } from "@/presets/ui/separator";

import { Code2, Eye, SplitSquareVertical, Upload, X } from "lucide-react";

import type { ChangeDetail } from "@/variants/shared";

import type { JsonObject, JsonPath, JsonValue } from "@/lib/json-editor/utils";
import {
    buildJsonRoutes,
    lastSegment,
    splitPath,
} from "@/lib/json-editor/utils";

import type {
    JsonEditorCallbacks,
    JsonEditorDefaults,
    JsonEditorFieldMap,
    JsonEditorFilters,
    JsonEditorLayoutMap,
    JsonEditorPermissions,
    JsonEditorResolvedField,
    JsonEditorViewMode,
    JsonRouteNode,
} from "./types";

import JsonEditorMain from "./main";
import JsonEditorRawPanel from "./raw-panel";

/* ─────────────────────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorHeaderRenderCtx {
    title: React.ReactNode;
    viewControls: React.ReactNode;

    loadFile: () => void;
    setViewMode: (mode: JsonEditorViewMode) => void;
    close: () => void;
}

export interface JsonEditorHandle {
    loadFile: () => void;

    getRoute: () => JsonPath;
    setRoute: (route: JsonPath) => void;

    getViewMode: () => JsonEditorViewMode;
    setViewMode: (mode: JsonEditorViewMode) => void;
}

export interface JsonEditorEditorProps {
    root: JsonObject;
    onRoot: (nextRoot: JsonObject, detail?: ChangeDetail<any>) => void;

    // config
    fieldMap?: JsonEditorFieldMap;
    layout?: JsonEditorLayoutMap;
    defaults?: JsonEditorDefaults;
    filters?: JsonEditorFilters;
    permissions?: JsonEditorPermissions;
    callbacks?: JsonEditorCallbacks;

    // hooks
    renderField?: (ctx: {
        field: JsonEditorResolvedField;
        route: JsonPath;
    }) => React.ReactNode;
    renderRouteLabel?: (ctx: {
        node: JsonRouteNode;
        active: boolean;
    }) => React.ReactNode;

    // header
    title?: React.ReactNode;
    schema?: string; // validation identifier/selector (NOT a UI title)
    onClose?: () => void;
    showClose?: boolean;
    renderHeader?: (ctx: JsonEditorHeaderRenderCtx) => React.ReactNode;

    // routing (optional controlled)
    route?: JsonPath;
    defaultRoute?: JsonPath;
    onRouteChange?: (route: JsonPath) => void;

    // view mode (optional controlled)
    viewMode?: JsonEditorViewMode;
    defaultViewMode?: JsonEditorViewMode;
    onViewModeChange?: (mode: JsonEditorViewMode) => void;

    // styling
    className?: string;
    contentClassName?: string;
    rawClassName?: string;
}

/* ─────────────────────────────────────────────────────────────
 * Local utils (keep minimal)
 * ───────────────────────────────────────────────────────────── */

function isPlainObject(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function prettifyLabel(key: string) {
    const spaced = key
        .replace(/_/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .trim();
    return spaced ? spaced[0]!.toUpperCase() + spaced.slice(1) : key;
}

function parentOf(path: JsonPath): JsonPath {
    const segs = splitPath(path);
    if (segs.length <= 1) return "";
    return segs.slice(0, -1).join(".");
}

function collectAllPaths(
    value: JsonValue,
    prefix: JsonPath = "",
    out: JsonPath[] = [],
) {
    if (value === null) return out;

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            const p = prefix ? `${prefix}.${i}` : `${i}`;
            out.push(p);
            collectAllPaths(value[i] as JsonValue, p, out);
        }
        return out;
    }

    if (isPlainObject(value)) {
        for (const k of Object.keys(value)) {
            const p = prefix ? `${prefix}.${k}` : k;
            out.push(p);
            collectAllPaths((value as any)[k] as JsonValue, p, out);
        }
        return out;
    }

    return out;
}

function useControllable<T>(opts: {
    value?: T;
    defaultValue: T;
    onChange?: (v: T) => void;
}) {
    const { value, defaultValue, onChange } = opts;
    const [inner, setInner] = React.useState<T>(defaultValue);

    const isControlled = value !== undefined;
    const state = (isControlled ? value : inner) as T;

    const setState = React.useCallback(
        (next: T) => {
            if (!isControlled) setInner(next);
            onChange?.(next);
        },
        [isControlled, onChange],
    );

    // keep inner synced if controlled flips to uncontrolled later (rare, but safe)
    React.useEffect(() => {
        if (!isControlled) return;
        setInner(value as T);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isControlled]);

    return [state, setState] as const;
}

function callCallbacks(
    callbacks: JsonEditorCallbacks | undefined,
    action: "edit" | "edit-raw",
    nextRoot: JsonObject,
    ctx: { route: JsonPath; path?: JsonPath },
) {
    if (!callbacks) return;

    const path = ctx.path ?? "";
    const key = path ? lastSegment(path) : "";
    const parent = path ? parentOf(path) : "";

    const meta = {
        action,
        route: ctx.route,
        path,
        parent,
        key,
    } as const;

    // For now: everything funnels through onEdit (you can expand later when you wire add/delete in main)
    callbacks.onEdit?.(nextRoot, meta as any);
}

/* ─────────────────────────────────────────────────────────────
 * Component
 * ───────────────────────────────────────────────────────────── */

export const JsonEditorEditor = React.forwardRef<
    JsonEditorHandle,
    JsonEditorEditorProps
>(function JsonEditorEditor(props, ref) {
    const {
        root,
        onRoot,

        fieldMap,
        layout,
        defaults,
        filters,
        permissions,
        callbacks,

        renderField,
        renderRouteLabel,

        title: headerTitle,
        schema,
        onClose,
        showClose,
        renderHeader,

        route: routeProp,
        defaultRoute,
        onRouteChange,

        viewMode: viewModeProp,
        defaultViewMode = "split",
        onViewModeChange,

        className,
        contentClassName,
        rawClassName,
    } = props;

    const canViewRaw = permissions?.canViewRaw ?? true;
    const canEditRaw = permissions?.canEditRaw ?? false;

    const routes = React.useMemo(
        () => buildJsonRoutes(root, undefined, filters),
        [root, filters],
    );

    const allPaths = React.useMemo(() => {
        const list = collectAllPaths(root as unknown as JsonValue, "", []);
        const seen = new Set<string>();
        return list.filter((p) => (seen.has(p) ? false : (seen.add(p), true)));
    }, [root]);

    const computedInitialRoute = React.useMemo(() => {
        const explicit = routeProp ?? defaultRoute;
        if (explicit !== undefined) return explicit;
        return routes[0]?.path ?? "";
    }, [routeProp, defaultRoute, routes]);

    const [route, setRoute] = useControllable<JsonPath>({
        value: routeProp,
        defaultValue: computedInitialRoute,
        onChange: onRouteChange,
    });

    const [viewMode, setViewMode] = useControllable<JsonEditorViewMode>({
        value: viewModeProp,
        defaultValue: defaultViewMode,
        onChange: onViewModeChange,
    });

    React.useEffect(() => {
        if (!canViewRaw && (viewMode === "raw" || viewMode === "split")) {
            setViewMode("visual");
        }
    }, [canViewRaw, setViewMode, viewMode]);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const loadFile = React.useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const close = React.useCallback(() => {
        onClose?.();
    }, [onClose]);

    const onFilePicked = React.useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;

            try {
                const raw = await file.text();
                const parsed = JSON.parse(raw);

                const nextRoot: JsonObject = isPlainObject(parsed)
                    ? (parsed as JsonObject)
                    : ({ value: parsed } as any);

                onRoot(nextRoot);
                callCallbacks(callbacks, "edit-raw", nextRoot, {
                    route,
                    path: "",
                });
            } catch {
                // Keep silent; raw-panel handles validation UX.
            }
        },
        [callbacks, onRoot, route],
    );

    const breadcrumb = React.useMemo(() => {
        const segs = splitPath(route);
        const parts: Array<{ path: JsonPath; label: React.ReactNode }> = [];

        const rootNode = {
            path: "" as JsonPath,
            key: "",
            label: "Root",
            children: routes,
        };

        const rootLabel = renderRouteLabel
            ? renderRouteLabel({ node: rootNode, active: !route })
            : rootNode.label;

        parts.push({ path: "", label: rootLabel });

        let acc = "";
        for (let i = 0; i < segs.length; i++) {
            const s = segs[i]!;
            acc = acc ? `${acc}.${s}` : s;
            const isActive = i === segs.length - 1;

            const label = renderRouteLabel
                ? renderRouteLabel({
                      node: {
                          path: acc,
                          key: s,
                          label: prettifyLabel(s),
                          children: [],
                      },
                      active: isActive,
                  })
                : prettifyLabel(s);

            parts.push({ path: acc, label });
        }

        return (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {parts.map((p, idx) => (
                    <React.Fragment key={p.path || "root"}>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => setRoute(p.path)}
                        >
                            {p.label}
                        </Button>
                        {idx < parts.length - 1 ? (
                            <span className="opacity-60">/</span>
                        ) : null}
                    </React.Fragment>
                ))}
            </div>
        );
    }, [route, routes, renderRouteLabel, setRoute]);

    const routeTitle = React.useMemo(() => {
        if (!route) return "Config.json";
        const key = lastSegment(route);
        if (renderRouteLabel) {
            return renderRouteLabel({
                node: {
                    path: route,
                    key,
                    label: prettifyLabel(key),
                    children: [],
                },
                active: true,
            });
        }
        return prettifyLabel(key);
    }, [route, renderRouteLabel]);

    const viewControls = React.useMemo(() => {
        return (
            <div className="flex items-center gap-1 rounded-md border p-1">
                <Button
                    type="button"
                    size="sm"
                    variant={viewMode === "visual" ? "secondary" : "ghost"}
                    onClick={() => setViewMode("visual")}
                >
                    <Eye className="mr-2 h-4 w-4" />
                    Visual
                </Button>

                {canViewRaw ? (
                    <Button
                        type="button"
                        size="sm"
                        variant={viewMode === "split" ? "secondary" : "ghost"}
                        onClick={() => setViewMode("split")}
                    >
                        <SplitSquareVertical className="mr-2 h-4 w-4" />
                        Split
                    </Button>
                ) : null}

                {canViewRaw ? (
                    <Button
                        type="button"
                        size="sm"
                        variant={viewMode === "raw" ? "secondary" : "ghost"}
                        onClick={() => setViewMode("raw")}
                    >
                        <Code2 className="mr-2 h-4 w-4" />
                        Raw
                    </Button>
                ) : null}
            </div>
        );
    }, [canViewRaw, setViewMode, viewMode]);

    const header = React.useMemo(() => {
        const ctx: JsonEditorHeaderRenderCtx = {
            title: (
                <div className="min-w-0 flex items-center gap-2">
                    <div className="truncate font-medium">
                        {headerTitle ?? "JSON Editor"}
                    </div>
                </div>
            ),
            viewControls,
            loadFile,
            setViewMode,
            close,
        };

        if (renderHeader) return renderHeader(ctx);

        return (
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0 flex items-center gap-3">
                    {ctx.title}

                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={loadFile}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Load file
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    {viewControls}
                    {showClose && onClose ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={close}
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    ) : null}
                </div>
            </div>
        );
    }, [
        close,
        headerTitle,
        loadFile,
        onClose,
        renderHeader,
        schema,
        setViewMode,
        showClose,
        viewControls,
    ]);

    const onVisualRoot = React.useCallback(
        (nextRoot: JsonObject, detail?: ChangeDetail<any>) => {
            onRoot(nextRoot, detail);

            const d: any = detail;
            const pathGuess =
                (typeof d?.name === "string" && d.name) ||
                (typeof d?.path === "string" && d.path) ||
                route;

            callCallbacks(callbacks, "edit", nextRoot, {
                route,
                path: pathGuess,
            });
        },
        [callbacks, onRoot, route],
    );

    const onRawRoot = React.useCallback(
        (nextRoot: JsonObject, detail?: ChangeDetail<any>) => {
            onRoot(nextRoot, detail);
            callCallbacks(callbacks, "edit-raw", nextRoot, { route, path: "" });
        },
        [callbacks, onRoot, route],
    );

    React.useImperativeHandle(
        ref,
        () => ({
            loadFile,
            getRoute: () => route,
            setRoute: (r) => setRoute(r),
            getViewMode: () => viewMode,
            setViewMode: (m) => setViewMode(m),
        }),
        [loadFile, route, setRoute, setViewMode, viewMode],
    );

    const showRaw = canViewRaw && (viewMode === "split" || viewMode === "raw");
    const showVisual = viewMode !== "raw";

    return (
        <div className={cn("flex h-full min-h-0 w-full flex-col", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={onFilePicked}
            />

            {header}
            <Separator />

            <div className={cn("flex min-h-0 flex-1", contentClassName)}>
                {/* Raw panel (LEFT) */}
                {showRaw ? (
                    <div
                        className={cn("w-105 shrink-0 border-r", rawClassName)}
                    >
                        <JsonEditorRawPanel
                            root={root}
                            onRoot={onRawRoot}
                            readOnly={!canEditRaw}
                        />
                    </div>
                ) : null}

                {/* Main (RIGHT) */}
                {showVisual ? (
                    <div className="min-h-0 flex-1 p-4">
                        <JsonEditorMain
                            root={root}
                            onRoot={onVisualRoot}
                            route={route}
                            allPaths={allPaths}
                            fieldMap={fieldMap}
                            layout={layout}
                            defaults={defaults}
                            filters={filters}
                            disabled={false}
                            readOnly={false}
                            breadcrumb={breadcrumb}
                            title={routeTitle}
                            onNavigate={(r) => setRoute(r)}
                            renderField={renderField}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
});

export default JsonEditorEditor;
```

---
#### 43


` File: packages/form-palette/src/presets/shadcn-variants/json-editor/index.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/json-editor/index.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";

import { Code2 } from "lucide-react";

import type { ChangeDetail } from "@/variants/shared";
import type { JsonObject } from "@/lib/json-editor/utils";

import type {
    JsonEditorIndexHandle,
    JsonEditorTriggerSize,
    JsonEditorTriggerVariant,
    ShadcnJsonEditorProps,
} from "./types";

import JsonEditorEditor from "./editor";

function isPlainObject(v: unknown): v is JsonObject {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

export const ShadcnJsonEditorVariant = React.forwardRef<
    JsonEditorIndexHandle,
    ShadcnJsonEditorProps
>(function ShadcnJsonEditorVariant(props, ref) {
    const {
        mode = "popover",

        // wrapper ui
        title,
        schema,
        triggerLabel = "Edit JSON",
        triggerVariant = "outline" as JsonEditorTriggerVariant,
        triggerSize = "sm" as JsonEditorTriggerSize,

        popoverClassName,
        panelClassName,
        className,

        open: openProp,
        onOpenChange,

        id,
        describedBy,

        onClose,

        // editor passthrough
        fieldMap,
        layout,
        defaults,
        filters,
        permissions,
        callbacks,

        renderRouteLabel,
        renderField,

        viewMode,
        defaultViewMode,
        onViewModeChange,

        route,
        onRouteChange,
    } = props;

    const editorRef = React.useRef<any>(null);

    // ---------------------------------------------------------------------
    // Wiring: standalone OR variant
    // ---------------------------------------------------------------------

    const root: JsonObject = React.useMemo(() => {
        if ("root" in props) return props.root;

        const v = props.value;
        if (isPlainObject(v)) return v;
        if (v == null) return {} as JsonObject;

        // avoid crashing on non-object values
        return {} as JsonObject;
    }, [props]);

    const emitRoot = React.useCallback(
        (nextRoot: JsonObject, detail?: ChangeDetail<any>) => {
            if ("onRoot" in props) {
                props.onRoot?.(nextRoot, detail);
                return;
            }
            props.onValue?.(nextRoot, detail);
        },
        [props],
    );

    // ---------------------------------------------------------------------
    // Popover open state (controlled or internal)
    // ---------------------------------------------------------------------

    const [openInner, setOpenInner] = React.useState(false);
    const open = openProp ?? openInner;

    const setOpen = React.useCallback(
        (next: boolean) => {
            if (openProp === undefined) setOpenInner(next);
            onOpenChange?.(next);
            if (!next) onClose?.();
        },
        [openProp, onOpenChange, onClose],
    );

    const close = React.useCallback(() => setOpen(false), [setOpen]);
    const doOpen = React.useCallback(() => setOpen(true), [setOpen]);
    const toggle = React.useCallback(() => setOpen(!open), [setOpen, open]);

    // ---------------------------------------------------------------------
    // “Accordion-like” inline expansion (MUST NOT be a hook in a branch)
    // ---------------------------------------------------------------------

    const [expanded, setExpanded] = React.useState(true);

    React.useEffect(() => {
        // when switching modes, keep sensible defaults:
        if (mode === "accordion") setExpanded(true);
    }, [mode]);

    React.useImperativeHandle(
        ref,
        () => ({
            open: doOpen,
            close,
            toggle,
            editor: editorRef,
        }),
        [doOpen, close, toggle],
    );

    let resolvedViewMode = viewMode ?? defaultViewMode;
    if (!viewMode && mode === "accordion") resolvedViewMode = "visual";

    const editorNode = (
        <JsonEditorEditor
            ref={editorRef}
            root={root}
            onRoot={emitRoot}
            fieldMap={fieldMap}
            layout={layout}
            defaults={defaults}
            filters={filters}
            permissions={permissions}
            callbacks={callbacks}
            renderRouteLabel={renderRouteLabel as any}
            renderField={renderField as any}
            title={title}
            schema={schema}
            route={route}
            onRouteChange={onRouteChange}
            viewMode={resolvedViewMode as any}
            defaultViewMode={defaultViewMode}
            onViewModeChange={onViewModeChange}
            showClose={mode === "popover"}
            onClose={mode === "popover" ? close : undefined}
        />
    );

    // ---------------------------------------------------------------------
    // Inline “accordion-like” mode
    // ---------------------------------------------------------------------

    if (mode === "accordion") {
        return (
            <div className={cn("w-full", className)}>
                <div className={cn("rounded-md border", panelClassName)}>
                    <div className="flex items-center justify-between gap-3 px-3 py-2">
                        {typeof schema === "string" ? (
                            <div className="min-w-0 flex-1 truncate text-sm">
                                {schema}
                            </div>
                        ) : (
                            <div className="min-w-0 flex-1 truncate text-sm">
                                {title ?? "JSON Editor"}
                            </div>
                        )}

                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                            aria-controls={
                                id ? `${id}__json_editor_panel` : undefined
                            }
                        >
                            {expanded ? "Hide" : "Show"}
                        </Button>
                    </div>

                    {expanded ? (
                        <div
                            id={id ? `${id}__json_editor_panel` : undefined}
                            className="h-130 min-h-0"
                        >
                            {editorNode}
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }

    // ---------------------------------------------------------------------
    // Popover mode
    // ---------------------------------------------------------------------

    const triggerDisabled =
        "disabled" in props ? !!(props as any).disabled : false;

    return (
        <div className={cn("w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        id={id}
                        aria-describedby={describedBy}
                        variant={triggerVariant as any}
                        size={triggerSize as any}
                        disabled={triggerDisabled}
                        className="w-full justify-between"
                    >
                        <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-left">
                            <Code2 className="h-4 w-4 opacity-70" />
                            <span className="truncate">{triggerLabel}</span>
                        </span>

                        {typeof schema === "string" ? (
                            <span className="ml-2 max-w-[45%] truncate text-xs text-muted-foreground">
                                {schema}
                            </span>
                        ) : null}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className={cn(
                        "p-0 w-245 max-w-[95vw] h-155 max-h-[85vh] overflow-hidden",
                        popoverClassName,
                    )}
                >
                    {editorNode}
                </PopoverContent>
            </Popover>
        </div>
    );
});

export default ShadcnJsonEditorVariant;
```

---
#### 44


` File: packages/form-palette/src/presets/shadcn-variants/json-editor/main.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/json-editor-main.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/presets/ui/badge";
import { Button } from "@/presets/ui/button";
import { Separator } from "@/presets/ui/separator";

import { InputField } from "@/input/input-field";

import type { ChangeDetail } from "@/variants/shared";
import type {
    JsonObject,
    JsonPath,
    JsonValue,
    LayoutRow,
} from "@/lib/json-editor/utils";

import {
    splitPath,
    lastSegment,
    resolveLayoutForParent,
} from "@/lib/json-editor/utils";
import { getDirectChildPaths } from "@/lib/json-editor/tree";

import type {
    JsonEditorCallbacks,
    JsonEditorFieldMap,
    JsonEditorDefaults,
    JsonEditorFilters,
    JsonEditorLayoutMap,
    JsonEditorResolvedField,
    JsonEditorVariantSpec,
    JsonEditorEditMeta,
    JsonRouteNode,
} from "./types";

import { pickBest } from "@/lib/json-editor/utils";

/* ─────────────────────────────────────────────────────────────
 * Props
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorMainProps {
    /** root JSON (always an object for this editor) */
    root: JsonObject;

    /** notify parent (json-editor variant wrapper) */
    onRoot: (nextRoot: JsonObject, detail?: ChangeDetail<any>) => void;

    /** active "page" route: "" | "config" | "config.headers" */
    route: JsonPath;

    /**
     * IMPORTANT (matches your layout util):
     * A generic paths list used by layout/tree utils.
     * Should include *at least* all field paths you want to render.
     */
    allPaths: JsonPath[];

    /** config */
    fieldMap?: JsonEditorFieldMap;
    layout?: JsonEditorLayoutMap;
    defaults?: JsonEditorDefaults;
    filters?: JsonEditorFilters;

    /** callbacks */
    callbacks?: JsonEditorCallbacks;

    /** flags */
    disabled?: boolean;
    readOnly?: boolean;

    /** main header (inside main panel) */
    breadcrumb?: React.ReactNode;
    title?: React.ReactNode;
    headerRight?: React.ReactNode;

    /** navigation for section “open” buttons */
    onNavigate?: (route: JsonPath) => void;

    /** optional advanced override */
    renderField?: (ctx: {
        field: JsonEditorResolvedField;
        route: JsonPath;
    }) => React.ReactNode;
    renderRouteLabel?: (ctx: {
        node: JsonRouteNode;
        active: boolean;
    }) => React.ReactNode;

    /** styling */
    className?: string;
    contentClassName?: string;
}

/* ─────────────────────────────────────────────────────────────
 * Local JSON path helpers (NOT provided by your utils)
 * ───────────────────────────────────────────────────────────── */

function isPlainObject(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function valueTypeOf(v: JsonValue): JsonEditorResolvedField["valueType"] {
    if (v === null) return "null";
    if (Array.isArray(v)) return "array";
    if (isPlainObject(v)) return "object";
    if (typeof v === "string") return "string";
    if (typeof v === "number") return "number";
    return "boolean";
}

function getAtPath(root: any, path: JsonPath): any {
    if (!path) return root;
    const segs = splitPath(path);
    let cur = root;
    for (const seg of segs) {
        if (cur == null) return undefined;
        cur = cur[seg];
    }
    return cur;
}

function setAtPath(root: any, path: JsonPath, nextValue: any): any {
    const segs = splitPath(path);
    if (!segs.length) return nextValue;

    const out = Array.isArray(root) ? [...root] : { ...(root ?? {}) };
    let cur: any = out;

    for (let i = 0; i < segs.length; i++) {
        const seg = segs[i]!;
        const last = i === segs.length - 1;

        if (last) {
            cur[seg] = nextValue;
            break;
        }

        const prev = cur[seg];
        const next = Array.isArray(prev)
            ? [...prev]
            : isPlainObject(prev)
              ? { ...prev }
              : {};
        cur[seg] = next;
        cur = next;
    }

    return out;
}

function prettifyLabel(key: string) {
    const spaced = key
        .replace(/_/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .trim();
    return spaced ? spaced[0]!.toUpperCase() + spaced.slice(1) : key;
}

function typeTag(type: string) {
    return (
        <Badge variant="secondary" className="uppercase tracking-wide">
            {type}
        </Badge>
    );
}

function normalizeVariantSpec(spec: JsonEditorVariantSpec | undefined): {
    variant?: string;
    props?: any;
} {
    if (!spec) return {};
    if (typeof spec === "string") return { variant: spec };
    return { variant: spec.variant, props: spec.props };
}

function fallbackVariantForValueType(t: JsonEditorResolvedField["valueType"]) {
    if (t === "number") return "number";
    if (t === "boolean") return "toggle"; // default
    // null/string
    return "text";
}

function metaForPath(
    action: JsonEditorEditMeta["action"],
    route: JsonPath,
    path: JsonPath,
): JsonEditorEditMeta {
    const segs = splitPath(path);
    const key = segs.length ? String(segs[segs.length - 1]!) : "";
    const parent = segs.length > 1 ? segs.slice(0, -1).join(".") : "";
    return { action, route, path, parent, key };
}

/* ─────────────────────────────────────────────────────────────
 * Render a primitive field (always InputField)
 * ───────────────────────────────────────────────────────────── */

function PrimitiveField(props: {
    root: JsonObject;
    path: JsonPath;
    route: JsonPath;
    fieldMap?: JsonEditorFieldMap;
    callbacks?: JsonEditorCallbacks;
    disabled?: boolean;
    readOnly?: boolean;
    onRoot: (next: JsonObject, detail?: ChangeDetail<any>) => void;
    renderField?: JsonEditorMainProps["renderField"];
}) {
    const {
        root,
        path,
        route,
        fieldMap,
        callbacks,
        disabled,
        readOnly,
        onRoot,
        renderField,
    } = props;

    const key = lastSegment(path);
    const raw = getAtPath(root, path) as JsonValue | undefined;
    const val = (raw === undefined ? null : raw) as JsonValue;
    const valueType = valueTypeOf(val);

    const hit = pickBest(fieldMap, path);
    const spec = hit?.value;
    const resolved = normalizeVariantSpec(spec);

    const variant = resolved.variant || fallbackVariantForValueType(valueType);

    const field: JsonEditorResolvedField = {
        path,
        key,
        value: val,
        valueType,
        variant: spec,
    };

    const override = renderField?.({ field, route });
    if (override != null) return <>{override}</>;

    return (
        <InputField
            name={path}
            label={prettifyLabel(key)}
            variant={variant as any}
            tags={[{ label: typeTag(valueType) }] as any}
            disabled={disabled}
            readOnly={readOnly}
            {...(resolved.props ?? {})}
            value={val as any}
            onValue={(next: any, detail?: ChangeDetail<any>) => {
                if (disabled || readOnly) return;

                const nextRoot = setAtPath(root, path, next) as JsonObject;
                onRoot(nextRoot, detail);

                callbacks?.onEdit?.(nextRoot, metaForPath("edit", route, path));
            }}
        />
    );
}

/* ─────────────────────────────────────────────────────────────
 * Section card (OBJECT / ARRAY) like your screenshot
 * ───────────────────────────────────────────────────────────── */

function SectionCard(props: {
    title: React.ReactNode;
    tag: React.ReactNode;
    right?: React.ReactNode;
    children: React.ReactNode;
}) {
    const { title, tag, right, children } = props;

    return (
        <div className="rounded-lg border bg-background/50">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="font-medium truncate">{title}</div>
                        <div className="shrink-0">{tag}</div>
                    </div>
                </div>

                {right ? <div className="shrink-0">{right}</div> : null}
            </div>

            <Separator />
            <div className="p-4">{children}</div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
 * Main
 * ───────────────────────────────────────────────────────────── */

export function JsonEditorMain(props: JsonEditorMainProps) {
    const {
        root,
        onRoot,
        route,
        allPaths,
        fieldMap,
        layout,
        defaults,
        filters,
        callbacks,
        disabled,
        readOnly,
        breadcrumb,
        title,
        onNavigate,
        renderField,
        renderRouteLabel,
        className,
        contentClassName,
    } = props;

    const directChildPaths = React.useMemo(() => {
        return getDirectChildPaths(route, allPaths);
    }, [route, allPaths]);

    const rows: LayoutRow[] = React.useMemo(() => {
        return resolveLayoutForParent({
            parent: route,
            childPaths: directChildPaths,
            layout: layout as any,
            filters,
        });
    }, [route, directChildPaths, layout, filters]);

    const effectiveRows: LayoutRow[] = React.useMemo(() => {
        const hasAny = rows.some((r) => r.fields?.length);
        if (hasAny) return rows;

        return directChildPaths.map(
            (p) => ({ parent: route, kind: "row", fields: [p] }) as LayoutRow,
        );
    }, [rows, directChildPaths, route]);

    const pageValue = getAtPath(root, route) as JsonValue;
    const validJson = isPlainObject(root);

    return (
        <div className={cn("flex min-h-0 flex-col gap-4", className)}>
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    {breadcrumb ? (
                        <div className="text-sm text-muted-foreground truncate">
                            {breadcrumb}
                        </div>
                    ) : (
                        <div className="text-sm text-muted-foreground truncate">
                            Root Object
                            {route ? ` > ${splitPath(route).join(" > ")}` : ""}
                        </div>
                    )}

                    <div className="mt-1 text-3xl font-semibold leading-tight">
                        {title ??
                            (route
                                ? prettifyLabel(lastSegment(route))
                                : "Config.json")}
                    </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                    <Badge variant="secondary">
                        {validJson ? "Valid JSON" : "Invalid"}
                    </Badge>
                </div>
            </div>

            <div
                className={cn("flex min-h-0 flex-col gap-4", contentClassName)}
            >
                {!isPlainObject(pageValue) ? (
                    <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
                        This page is not an object.
                    </div>
                ) : null}

                {effectiveRows.map((row, idx) => {
                    if (!row.fields?.length) return null;

                    const isGrid = row.fields.length > 1;

                    return (
                        <div
                            key={`${row.parent}::${row.kind}::${idx}`}
                            className={cn(
                                isGrid
                                    ? "grid gap-4 md:grid-cols-2"
                                    : "flex flex-col",
                            )}
                        >
                            {row.fields.map((path) => {
                                const v = getAtPath(root, path) as JsonValue;
                                const vt = valueTypeOf(v);

                                if (vt === "object" && isPlainObject(v)) {
                                    const sectionRoute = path;

                                    const sectionChildPaths =
                                        getDirectChildPaths(
                                            sectionRoute,
                                            allPaths,
                                        );
                                    const sectionRows = resolveLayoutForParent({
                                        parent: sectionRoute,
                                        childPaths: sectionChildPaths,
                                        layout: layout as any,
                                        filters,
                                    });

                                    const openBtn = onNavigate ? (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                onNavigate(sectionRoute)
                                            }
                                        >
                                            Open
                                        </Button>
                                    ) : null;

                                    const sectionTitle = renderRouteLabel
                                        ? renderRouteLabel({
                                              node: {
                                                  path: path,
                                                  key: lastSegment(path),
                                                  label: prettifyLabel(
                                                      lastSegment(path),
                                                  ),
                                                  children: [],
                                              },
                                              active: false,
                                          })
                                        : prettifyLabel(lastSegment(path));

                                    return (
                                        <SectionCard
                                            key={path}
                                            title={sectionTitle}
                                            tag={typeTag("object")}
                                            right={openBtn}
                                        >
                                            <div className="flex flex-col gap-4">
                                                {sectionRows.map((sr, sidx) => {
                                                    if (!sr.fields?.length)
                                                        return null;

                                                    const sGrid =
                                                        sr.fields.length > 1;

                                                    return (
                                                        <div
                                                            key={`${sectionRoute}::${sidx}`}
                                                            className={cn(
                                                                sGrid
                                                                    ? "grid gap-4 md:grid-cols-2"
                                                                    : "flex flex-col",
                                                            )}
                                                        >
                                                            {sr.fields.map(
                                                                (sp) => {
                                                                    const sv =
                                                                        getAtPath(
                                                                            root,
                                                                            sp,
                                                                        ) as JsonValue;
                                                                    const svt =
                                                                        valueTypeOf(
                                                                            sv,
                                                                        );

                                                                    if (
                                                                        svt ===
                                                                            "object" ||
                                                                        svt ===
                                                                            "array"
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    sp
                                                                                }
                                                                                className="rounded-md border px-3 py-2 text-sm text-muted-foreground flex items-center justify-between"
                                                                            >
                                                                                <div className="truncate">
                                                                                    {prettifyLabel(
                                                                                        lastSegment(
                                                                                            sp,
                                                                                        ),
                                                                                    )}
                                                                                </div>

                                                                                {onNavigate ? (
                                                                                    <Button
                                                                                        type="button"
                                                                                        size="sm"
                                                                                        variant="ghost"
                                                                                        onClick={() =>
                                                                                            onNavigate(
                                                                                                sp,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Open
                                                                                    </Button>
                                                                                ) : null}
                                                                            </div>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <PrimitiveField
                                                                            key={
                                                                                sp
                                                                            }
                                                                            root={
                                                                                root
                                                                            }
                                                                            path={
                                                                                sp
                                                                            }
                                                                            route={
                                                                                route
                                                                            }
                                                                            fieldMap={
                                                                                fieldMap
                                                                            }
                                                                            callbacks={
                                                                                callbacks
                                                                            }
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            readOnly={
                                                                                readOnly
                                                                            }
                                                                            onRoot={
                                                                                onRoot
                                                                            }
                                                                            renderField={
                                                                                renderField
                                                                            }
                                                                        />
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </SectionCard>
                                    );
                                }

                                if (vt === "array" && Array.isArray(v)) {
                                    const arrPath = path;
                                    const items = v;

                                    return (
                                        <SectionCard
                                            key={path}
                                            title={prettifyLabel(
                                                lastSegment(path),
                                            )}
                                            tag={typeTag("array")}
                                            right={
                                                onNavigate ? (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            onNavigate(arrPath)
                                                        }
                                                    >
                                                        Open
                                                    </Button>
                                                ) : null
                                            }
                                        >
                                            <div className="flex flex-col gap-3">
                                                <div className="text-sm text-muted-foreground">
                                                    {items.length} item
                                                    {items.length === 1
                                                        ? ""
                                                        : "s"}
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                    {items.map((_item, i) => {
                                                        const itemPath = `${arrPath}.${i}`;

                                                        return (
                                                            <div
                                                                key={itemPath}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <div className="flex-1">
                                                                    <PrimitiveField
                                                                        root={
                                                                            root
                                                                        }
                                                                        path={
                                                                            itemPath
                                                                        }
                                                                        route={
                                                                            route
                                                                        }
                                                                        fieldMap={
                                                                            fieldMap
                                                                        }
                                                                        callbacks={
                                                                            callbacks
                                                                        }
                                                                        disabled={
                                                                            disabled
                                                                        }
                                                                        readOnly={
                                                                            readOnly
                                                                        }
                                                                        onRoot={
                                                                            onRoot
                                                                        }
                                                                        renderField={
                                                                            renderField
                                                                        }
                                                                    />
                                                                </div>

                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="mt-1"
                                                                    disabled={
                                                                        disabled ||
                                                                        readOnly
                                                                    }
                                                                    onClick={() => {
                                                                        if (
                                                                            disabled ||
                                                                            readOnly
                                                                        )
                                                                            return;

                                                                        const nextArr =
                                                                            items.filter(
                                                                                (
                                                                                    _,
                                                                                    idx2,
                                                                                ) =>
                                                                                    idx2 !==
                                                                                    i,
                                                                            );
                                                                        const nextRoot =
                                                                            setAtPath(
                                                                                root,
                                                                                arrPath,
                                                                                nextArr,
                                                                            ) as JsonObject;

                                                                        onRoot(
                                                                            nextRoot,
                                                                        );
                                                                        callbacks?.onDelete?.(
                                                                            nextRoot,
                                                                            metaForPath(
                                                                                "delete",
                                                                                route,
                                                                                itemPath,
                                                                            ),
                                                                        );
                                                                    }}
                                                                >
                                                                    ×
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="border-dashed"
                                                        disabled={
                                                            disabled || readOnly
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                disabled ||
                                                                readOnly
                                                            )
                                                                return;

                                                            const nextIndex =
                                                                items.length;
                                                            const nextArr = [
                                                                ...items,
                                                                "",
                                                            ];
                                                            const nextRoot =
                                                                setAtPath(
                                                                    root,
                                                                    arrPath,
                                                                    nextArr,
                                                                ) as JsonObject;

                                                            onRoot(nextRoot);
                                                            callbacks?.onAdd?.(
                                                                nextRoot,
                                                                metaForPath(
                                                                    "add",
                                                                    route,
                                                                    `${arrPath}.${nextIndex}`,
                                                                ),
                                                            );
                                                        }}
                                                    >
                                                        + Add Item
                                                    </Button>
                                                </div>
                                            </div>
                                        </SectionCard>
                                    );
                                }

                                return (
                                    <PrimitiveField
                                        key={path}
                                        root={root}
                                        path={path}
                                        route={route}
                                        fieldMap={fieldMap}
                                        callbacks={callbacks}
                                        disabled={disabled}
                                        readOnly={readOnly}
                                        onRoot={onRoot}
                                        renderField={renderField}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {defaults?.values ? null : null}
        </div>
    );
}

export default JsonEditorMain;
```

---
#### 45


` File: packages/form-palette/src/presets/shadcn-variants/json-editor/raw-panel.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/json-editor/raw-panel.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Badge } from "@/presets/ui/badge";
import { Separator } from "@/presets/ui/separator";
import { ScrollArea } from "@/presets/ui/scroll-area";

import { JsonEditor } from "json-edit-react";

import type { ChangeDetail } from "@/variants/shared";
import type { JsonObject } from "@/lib/json-editor/utils";
import type { JsonEditorPermissions } from "./types";

export interface JsonEditorRawPanelProps {
    root: JsonObject;
    onRoot: (nextRoot: JsonObject, detail?: ChangeDetail<any>) => void;

    permissions?: JsonEditorPermissions;

    disabled?: boolean;
    readOnly?: boolean;

    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
}

function isPlainObject(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function JsonEditorRawPanel(props: JsonEditorRawPanelProps) {
    const {
        root,
        onRoot,
        permissions,
        disabled,
        readOnly,
        className,
        headerClassName,
        bodyClassName,
    } = props;

    const canViewRaw = permissions?.canViewRaw ?? true;
    const canEditRaw = permissions?.canEditRaw ?? false;

    if (!canViewRaw) return null;

    const viewOnly = !!disabled || !!readOnly || !canEditRaw;

    const onCopy = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(
                JSON.stringify(root ?? {}, null, 2)
            );
        } catch {
            // ignore clipboard failures silently
        }
    }, [root]);

    return (
        <div
            className={cn(
                // Sidebar panel look (not a rounded "card")
                "flex min-h-0 flex-col border-r bg-background",
                className
            )}
        >
            {/* Panel header (matches screenshot style) */}
            <div
                className={cn(
                    "flex items-center justify-between gap-2 px-4 py-3",
                    headerClassName
                )}
            >
                <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                        Source code
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {viewOnly ? (
                        <Badge variant="secondary" className="h-6">
                            Read only
                        </Badge>
                    ) : null}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onCopy}
                        disabled={!root}
                    >
                        Copy
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Scrollable editor body */}
            <ScrollArea className={cn("min-h-0 flex-1", bodyClassName)}>
                <div className="p-3">
                    <JsonEditor
                        data={root ?? {}}
                        setData={(next) => {
                            // Root must remain an object for this variant.
                            if (!isPlainObject(next)) return;
                            onRoot(next as JsonObject);
                        }}
                        viewOnly={viewOnly}
                    />
                </div>
            </ScrollArea>
        </div>
    );
}

export default JsonEditorRawPanel;
```

---
#### 46


` File: packages/form-palette/src/presets/shadcn-variants/json-editor/types.ts`  [↑ Back to top](#index)

```ts
// src/presets/shadcn-variants/json-editor/types.ts
// noinspection GrazieInspection

import type { VariantKey, VariantPropsFor } from "@/schema/variant";
import * as React from "react";
import type { VariantBaseProps } from "@/variants/shared";
import type {
    JsonObject,
    JsonPath,
    JsonValue,
    JsonWildcard,
} from "@/lib/json-editor/utils";

/* ─────────────────────────────────────────────────────────────
 * Variant config (fieldMap/defaults.array)
 * ───────────────────────────────────────────────────────────── */

/**
 * A "variant spec" can be:
 * - a plain VariantKey ("text", "number", "toggle", ...)
 * - a variant key + props to pass into that variant
 */
export type JsonEditorVariantSpec =
    | VariantKey
    | {
          variant: VariantKey;
          props?: VariantPropsFor<any>;
      };

/**
 * Map a key-path (or wildcard) to a variant spec.
 *
 * Keys are matched against:
 * - full path:  "config.apiEndpoint"
 * - leaf key:   "apiEndpoint"
 *
 * Wild examples:
 * - "*api*"             (segment contains "api")
 * - "config.*"          (direct children)
 * - "config.**"         (subtree)
 * - "**.*token*"        (any route/leaf)
 */
export type JsonEditorFieldMap = Record<JsonWildcard, JsonEditorVariantSpec>;

/* ─────────────────────────────────────────────────────────────
 * Layout
 * ───────────────────────────────────────────────────────────── */

/**
 * Layout is scoped to a "page" (object route path).
 *
 * Each entry is a "row":
 * - string: render a single field row
 * - string[]: render these fields side-by-side (grid row)
 *
 * Example:
 * layout: {
 *   "": [["projectName","version"], "description"],
 *   "config": [["maxEntries","apiEndpoint"], "retry"]
 * }
 */
export type JsonEditorLayoutRow = string | string[];
export type JsonEditorLayoutMap = Record<JsonWildcard, JsonEditorLayoutRow[]>;

/* ─────────────────────────────────────────────────────────────
 * Include / Exclude filters
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorFilters {
    /** Hide entire object routes/pages (navigation + rendering) */
    excludeRoutes?: JsonWildcard[];
    includeRoutes?: JsonWildcard[];

    /** Hide specific fields (by full path or leaf/wild patterns) */
    excludeFields?: JsonWildcard[];
    includeFields?: JsonWildcard[];

    /**
     * If true, excluding "config" also excludes "config.**".
     * Default: true
     */
    excludeRouteSubtree?: boolean;
}

/* ─────────────────────────────────────────────────────────────
 * Defaults
 * ───────────────────────────────────────────────────────────── */

/**
 * Default value for a newly created key (or a new array item).
 * Can be a constant JsonValue, or a function.
 */
export type JsonEditorDefaultValueSpec =
    | JsonValue
    | ((ctx: {
          parentPath: JsonPath;
          key: string;
          current: JsonValue | undefined;
      }) => JsonValue);

export interface JsonEditorDefaults {
    /**
     * When adding a new array item, you can pick from allowed variants.
     * You can pass VariantKey or a {variant, props} spec.
     */
    array?: JsonEditorVariantSpec[];

    /**
     * Optional default values for new keys.
     * Keyed by wildcard path (full path / leaf / patterns).
     */
    values?: Record<JsonWildcard, JsonEditorDefaultValueSpec>;
}

/* ─────────────────────────────────────────────────────────────
 * Navigation (routes derived from JSON)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorNavMode = "sidebar" | "tabs" | "drawer";

export interface JsonEditorNavOptions {
    mode?: JsonEditorNavMode;

    /** Show root "" as a page in navigation. Default: true */
    showRoot?: boolean;

    /** Initial active route/page. Default: "" */
    defaultRoute?: JsonPath;

    /** Optional label overrides for route nodes */
    routeLabels?: Record<JsonWildcard, React.ReactNode>;

    /** Max object nesting to generate routes for. Optional safety */
    maxDepth?: number;

    /**
     * Whether arrays containing objects can contribute routes.
     * - "none": arrays never create routes (default)
     * - "objects": array items that are objects become routes like "config.items.0"
     */
    arrayRoutes?: "none" | "objects";
}

export interface JsonRouteNode {
    path: JsonPath; // "" | "config" | "config.api"
    key: string; // leaf segment ("config", "api")
    label: React.ReactNode;
    children: JsonRouteNode[];
}

/* ─────────────────────────────────────────────────────────────
 * View mode (Split / Visual / Raw)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorViewMode = "split" | "visual" | "raw";

/* ─────────────────────────────────────────────────────────────
 * Editing permissions + callbacks
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorPermissions {
    canAdd?: boolean;
    canDelete?: boolean;
    canViewRaw?: boolean;
    canEditRaw?: boolean;

    /**
     * Keys/paths in this shape cannot be deleted even if canDelete is true.
     * (treated as "locked")
     */
    defaultShape?: JsonObject;

    /**
     * Optional finer-grain locks by wildcard.
     * If true, this key/path cannot be added/deleted/edited.
     */
    lockPaths?: JsonWildcard[];
}

export type JsonEditorEditAction = "add" | "delete" | "edit" | "edit-raw";

export interface JsonEditorEditMeta {
    action: JsonEditorEditAction;

    /** the page (object route) currently being edited */
    route: JsonPath;

    /** the exact key path being changed (field path) */
    path: JsonPath;

    /** parent object path of the key */
    parent: JsonPath;

    /** leaf key (segment) */
    key: string;
}

export interface JsonEditorCallbacks {
    onAdd?: (nextRoot: JsonObject, meta: JsonEditorEditMeta) => void;
    onDelete?: (nextRoot: JsonObject, meta: JsonEditorEditMeta) => void;
    onEdit?: (nextRoot: JsonObject, meta: JsonEditorEditMeta) => void;
}

/* ─────────────────────────────────────────────────────────────
 * Resolved field shape (for renderField hook)
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorResolvedField {
    path: JsonPath; // "config.apiEndpoint"
    key: string; // "apiEndpoint"
    value: JsonValue; // current value
    valueType: "string" | "number" | "boolean" | "null" | "object" | "array";
    variant?: JsonEditorVariantSpec; // resolved from fieldMap/defaults/etc
    hidden?: boolean; // from include/exclude
}

/* ─────────────────────────────────────────────────────────────
 * Variant props (the actual editor surface)
 * ───────────────────────────────────────────────────────────── */

/**
 * This is the "shared" props contract for the JSON editor variant UI.
 *
 * NOTE:
 * - `title` is purely UI (header text)
 * - `schema` is NOT a title — it’s a schema id/key for validation (later use)
 */
export interface ShadcnJsonEditorVariantProps extends Pick<
    VariantBaseProps<JsonObject | undefined>,
    "value" | "onValue" | "error" | "disabled" | "readOnly"
> {
    /** Header title (UI only) */
    title?: React.ReactNode;

    /** Optional schema id/key or raw JSON Schema object for validation */
    schema?: string | JsonObject;

    /** Primary config */
    fieldMap?: JsonEditorFieldMap;
    layout?: JsonEditorLayoutMap;
    defaults?: JsonEditorDefaults;

    /** Navigation derived from JSON structure */
    nav?: JsonEditorNavOptions;

    /** include/exclude for routes + fields */
    filters?: JsonEditorFilters;

    /** permissions + locks */
    permissions?: JsonEditorPermissions;

    /** callbacks */
    callbacks?: JsonEditorCallbacks;

    /**
     * Page rendering mode:
     * - "accordion": page sections expand/collapse in main panel
     * - "popover": nested objects open as overlays (optional UX)
     */
    mode?: "accordion" | "popover";

    /**
     * Routing:
     * - route: controlled current page
     * - defaultRoute: uncontrolled initial page (overrides nav.defaultRoute)
     * - onRouteChange: called whenever the editor navigates
     */
    route?: JsonPath;
    defaultRoute?: JsonPath;
    onRouteChange?: (route: JsonPath) => void;

    /**
     * View mode (top toggle):
     * - "split": raw sidebar + visual editor (default)
     * - "visual": visual editor only
     * - "raw": raw editor only
     *
     * If viewMode is provided, it is controlled.
     * Otherwise, the defaultViewMode seeds the internal state.
     */
    viewMode?: JsonEditorViewMode;
    defaultViewMode?: JsonEditorViewMode;
    onViewModeChange?: (mode: JsonEditorViewMode) => void;

    /** Close button intent (optional). Actual close UI is controlled by the wrapper (index.tsx). */
    onClose?: () => void;

    /** Visual (editor-level styling) */
    className?: string;
    contentClassName?: string;
    navClassName?: string;

    /**
     * Optional hooks to customize nav + page rendering.
     */
    renderRouteLabel?: (ctx: {
        node: JsonRouteNode;
        active: boolean;
    }) => React.ReactNode;
    renderField?: (ctx: {
        field: JsonEditorResolvedField;
        route: JsonPath;
    }) => React.ReactNode;
}

/* ─────────────────────────────────────────────────────────────
 * Index wrapper (popover/accordion + trigger + standalone wiring)
 * ───────────────────────────────────────────────────────────── */

/**
 * Wrapper mode:
 * - "popover": show trigger + popover
 * - "accordion": inline panel that can expand/collapse
 */
export type JsonEditorMode = "popover" | "accordion";

/**
 * Typed to match your shadcn button variants/sizes.
 * If your project differs, change these unions here once.
 */
export type JsonEditorTriggerVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

export type JsonEditorTriggerSize = "default" | "sm" | "lg" | "icon";

/**
 * Exposed ref handle from index.tsx wrapper (not the inner editor).
 * The wrapper controls popover open/close; it can also expose the inner editor ref.
 */
export interface JsonEditorIndexHandle {
    open: () => void;
    close: () => void;
    toggle: () => void;
    editor: React.RefObject<any>;
}

/**
 * Standalone wiring:
 * - caller provides root/onRoot directly
 */
export type JsonEditorStandaloneWiring = {
    root: JsonObject;
    onRoot: (nextRoot: JsonObject, detail?: any) => void;

    value?: never;
    onValue?: never;
};

/**
 * Variant wiring:
 * - InputField variant uses value/onValue
 */
export type JsonEditorVariantWiring = Pick<
    VariantBaseProps<JsonObject | undefined>,
    "value" | "onValue" | "disabled" | "readOnly" | "error" | "size" | "density"
> & {
    root?: never;
    onRoot?: never;
};

/**
 * Props for the exported component (index.tsx):
 * - accepts standalone OR variant wiring
 * - wrapper owns mode/open/trigger UI
 * - editor-specific props are passed through, without redefining a second type list
 *
 * IMPORTANT:
 * - wrapper uses `wrapperClassName` (outer container)
 * - editor uses `className` (inner editor surface)
 */
export interface JsonEditorWrapperProps {
    /** Wrapper mode (popover vs accordion). */
    mode?: JsonEditorMode;

    /** Trigger UI (popover mode) */
    triggerLabel?: React.ReactNode;
    triggerVariant?: JsonEditorTriggerVariant;
    triggerSize?: JsonEditorTriggerSize;

    /** Popover sizing/skin */
    popoverClassName?: string;

    /** Inline/accordion container class */
    panelClassName?: string;

    /** Outer wrapper class */
    wrapperClassName?: string;

    /** Optional: controlled popover open state */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    /** Accessibility (useful when rendered as an InputField variant) */
    id?: string;
    describedBy?: string;

    /** Called when the wrapper closes (popover close / accordion hide). */
    onClose?: () => void;
}

/**
 * Single source of truth for what index.tsx accepts:
 * - (standalone OR variant wiring)
 * - wrapper props
 * - editor props (minus a few keys owned by wrapper)
 */
export type ShadcnJsonEditorProps = (
    | JsonEditorStandaloneWiring
    | JsonEditorVariantWiring
) &
    JsonEditorWrapperProps &
    Omit<
        ShadcnJsonEditorVariantProps,
        | "onValue"
        | "value"
        | "disabled"
        | "readOnly"
        | "error"
        | "size"
        | "density"
        | "onClose"
    >;
```

---
#### 47


` File: packages/form-palette/src/presets/shadcn-variants/keyvalue.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Input } from "@/presets/ui/input";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
   DialogDescription,
} from "@/presets/ui/dialog";
import { X, Plus, MoreHorizontal, Tag, PenLine } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type KeyValueMap = Record<string, string>;

export interface KV {
   key: string;
   value: string;
}

export interface ShadcnKeyValueVariantProps
   extends Pick<
      VariantBaseProps<KeyValueMap | undefined>,
      "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
   > {
   min?: number;
   max?: number;
   minVisible?: number;
   maxVisible?: number;
   showAddButton?: boolean;
   showMenuButton?: boolean;
   placeholder?: React.ReactNode;
   dialogTitle?: React.ReactNode;
   keyLabel?: React.ReactNode;
   valueLabel?: React.ReactNode;
   submitLabel?: React.ReactNode;
   moreLabel?: (count: number) => React.ReactNode;
   emptyLabel?: React.ReactNode;
   className?: string;
   chipsClassName?: string;
   chipClassName?: string;
   renderChip?: (ctx: {
      pair: KV;
      index: number;
      onEdit: () => void;
      onRemove: () => void;
      defaultChip: React.ReactNode;
   }) => React.ReactNode;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function mapToItems(map: KeyValueMap | undefined): KV[] {
   if (!map) return [];
   return Object.entries(map).map(([key, value]) => ({
      key,
      value: value ?? "",
   }));
}

function itemsToMap(items: KV[]): KeyValueMap {
   const out: KeyValueMap = {};
   for (const { key, value } of items) {
      if (!key) continue;
      out[key] = value;
   }
   return out;
}

function clampVisible(
    total: number,
    minVisible: number,
    maxVisible: number
): number {
    if (total === 0) return 0;
    const clampedMax = Math.max(minVisible, maxVisible);
    return Math.min(total, clampedMax);
}

function sizeClasses(size?: Size) {
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}
function densityPadding(density?: Density) {
   switch (density) {
      case "compact":
         return "py-1 px-2 gap-1.5";
      case "loose":
         return "py-3 px-3 gap-3";
      case "comfortable":
      default:
         return "py-1 px-3 gap-2";
   }
}

function defaultMoreLabel(count: number): React.ReactNode {
   return `+${count} more`;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnKeyValueVariant = React.forwardRef<
   HTMLDivElement,
   ShadcnKeyValueVariantProps
>(function ShadcnKeyValueVariant(props, _ref) {
   const {
      value,
      onValue,
      error,
      disabled,
      readOnly,
      size,
      density,

      min = 0,
      max = Infinity,
      minVisible = 0,
      maxVisible = 6,

      showAddButton = true,
      showMenuButton = true,

      placeholder,
      dialogTitle = "Edit Item",
      keyLabel = "Key",
      valueLabel = "Value",
      submitLabel = "Save Changes",
      moreLabel = defaultMoreLabel,
      emptyLabel = "No items added",

      className,
      chipsClassName,
      chipClassName,
      renderChip,
   } = props;

   const isDisabled = disabled || readOnly;

   const items: KV[] = React.useMemo(
      () => mapToItems(value),
      [value]
   );

   const [dialogOpen, setDialogOpen] = React.useState(false);
   const [editingIndex, setEditingIndex] = React.useState<number | null>(
      null
   );
   const [draft, setDraft] = React.useState<KV>({ key: "", value: "" });

   const canAdd = items.length < max;
   const canDelete = items.length > min;

   // visible vs overflow
   const visibleCount = clampVisible(
      items.length,
      minVisible,
      maxVisible
   );
   const visibleItems = items.slice(0, visibleCount);
   const overflowCount = Math.max(0, items.length - visibleCount);

   // ────────────────────────────────
   // Change Logic
   // ────────────────────────────────

   const commitItems = React.useCallback(
      (next: KV[], meta: ChangeDetail["meta"]) => {
         if (!onValue) return;

         const nextMap = itemsToMap(next);
         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta,
         };
         onValue(nextMap, detail);
      },
      [onValue]
   );

   const openForNew = React.useCallback(() => {
      if (isDisabled || !canAdd) return;
      setEditingIndex(null);
      setDraft({ key: "", value: "" });
      setDialogOpen(true);
   }, [isDisabled, canAdd]);

   const openForEdit = React.useCallback(
      (index: number) => {
         if (isDisabled) return;
         const item = items[index];
         if (!item) return;
         setEditingIndex(index);
         setDraft(item);
         setDialogOpen(true);
      },
      [isDisabled, items]
   );

   const handleDelete = React.useCallback(() => {
      if (editingIndex == null) return;
      if (!canDelete) return;

      const next = items.slice();
      next.splice(editingIndex, 1);

      setDialogOpen(false);
      commitItems(next, {
         action: "delete",
         index: editingIndex,
      });
   }, [editingIndex, items, canDelete, commitItems]);

   const handleSubmit = React.useCallback(() => {
      const trimmedKey = draft.key.trim();
      const trimmedValue = draft.value;

      if (!trimmedKey) return;

      let next = items.slice();

      if (editingIndex != null) {
         // edit
         next[editingIndex] = { key: trimmedKey, value: trimmedValue };
      } else {
         // add / upsert
         const existingIndex = next.findIndex(
            (kv) => kv.key === trimmedKey
         );
         if (existingIndex !== -1) {
            next[existingIndex] = {
               key: trimmedKey,
               value: trimmedValue,
            };
         } else {
            if (!canAdd) return;
            next.push({ key: trimmedKey, value: trimmedValue });
         }
      }

      setDialogOpen(false);
      commitItems(next, {
         action: editingIndex != null ? "edit" : "add",
         index: editingIndex ?? next.length - 1,
      });
   }, [draft, items, editingIndex, canAdd, commitItems]);

   const handleQuickRemove = React.useCallback(
      (index: number) => {
         if (isDisabled || !canDelete) return;
         const next = items.slice();
         next.splice(index, 1);
         commitItems(next, { action: "delete", index });
      },
      [isDisabled, canDelete, items, commitItems]
   );

   // ────────────────────────────────
   // Visuals
   // ────────────────────────────────

   const sizeCls = sizeClasses(size as Size | undefined);
   const densityCls = densityPadding(density as Density | undefined);

   const renderChipNode = (pair: KV, index: number) => {
      const baseChip = (
         <button
            type="button"
            key={index}
            className={cn(
               "group inline-flex items-center gap-1.5 rounded-md",
               "bg-secondary/50 border border-transparent",
               "px-2 py-1 text-xs transition-all duration-200",
               "hover:bg-secondary hover:border-border/50 hover:shadow-sm",
               "animate-in fade-in zoom-in-95 fill-mode-both",
               isDisabled && "opacity-50 cursor-not-allowed",
               chipClassName
            )}
            onClick={() => openForEdit(index)}
            disabled={isDisabled}
         >
            <span className="font-semibold text-foreground truncate max-w-[120px]">
               {pair.key}
            </span>
            <span className="text-muted-foreground/40">:</span>
            <span className="text-muted-foreground truncate max-w-[120px]">
               {pair.value}
            </span>

            {canDelete && !isDisabled && (
               <div
                  role="button"
                  tabIndex={0}
                  className={cn(
                     "ml-1 flex h-4 w-4 items-center justify-center rounded-full",
                     "text-muted-foreground/60 opacity-0 transition-all",
                     "hover:bg-destructive hover:text-destructive-foreground",
                     "group-hover:opacity-100",
                     "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  onClick={(e) => {
                     e.stopPropagation();
                     handleQuickRemove(index);
                  }}
                  onKeyDown={(e) => {
                     if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        handleQuickRemove(index);
                     }
                  }}
                  aria-label={`Remove ${pair.key}`}
               >
                  <X className="h-3 w-3" />
               </div>
            )}
         </button>
      );

      if (!renderChip) return baseChip;

      return renderChip({
         pair,
         index,
         onEdit: () => openForEdit(index),
         onRemove: () => handleQuickRemove(index),
         defaultChip: baseChip,
      });
   };

   const hasItems = items.length > 0;

   // ────────────────────────────────
   // Dialog
   // ────────────────────────────────

   const ManageDialog = (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <PenLine className="h-4 w-4 text-muted-foreground" />
                  {dialogTitle}
               </DialogTitle>
               <DialogDescription>
                  {editingIndex !== null ? "Modify the existing key-value pair." : "Add a new key-value pair to the list."}
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium text-muted-foreground">
                     {keyLabel}
                  </label>
                  <Input
                     value={draft.key}
                     onChange={(e) =>
                        setDraft((prev) => ({
                           ...prev,
                           key: e.target.value,
                        }))
                     }
                     className="col-span-3"
                     autoFocus
                     disabled={isDisabled}
                     placeholder="e.g. Color"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium text-muted-foreground">
                     {valueLabel}
                  </label>
                  <Input
                     value={draft.value}
                     onChange={(e) =>
                        setDraft((prev) => ({
                           ...prev,
                           value: e.target.value,
                        }))
                     }
                     className="col-span-3"
                     disabled={isDisabled}
                     placeholder="e.g. Blue"
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit();
                     }}
                  />
               </div>
            </div>

            <DialogFooter className="flex sm:justify-between flex-row items-center">
               <div>
                  {editingIndex != null && canDelete && (
                     <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDisabled}
                     >
                        Delete
                     </Button>
                  )}
               </div>

               <div className="flex gap-2">
                  <Button
                     type="button"
                     variant="outline"
                     size="sm"
                     onClick={() => setDialogOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     type="button"
                     size="sm"
                     onClick={handleSubmit}
                     disabled={isDisabled}
                  >
                     {submitLabel}
                  </Button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );

   // ────────────────────────────────
   // Render
   // ────────────────────────────────

   return (
      <div
         className={cn(
            "group/container w-full",
            isDisabled && "opacity-60 cursor-not-allowed",
            className
         )}
         aria-disabled={isDisabled}
         aria-invalid={error ? "true" : undefined}
      >
         {/* Container mimicking an Input */}
         <div
            className={cn(
               "relative flex w-full flex-wrap items-center rounded-md border border-input bg-background transition-all",
               // Focus within styles to mimic Input focus
               !isDisabled && "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
               densityCls,
               sizeCls,
               chipsClassName
            )}
         >
            {hasItems ? (
               <>
                  {visibleItems.map((pair, index) =>
                     renderChipNode(pair, index)
                  )}

                  {overflowCount > 0 && (
                     <button
                        type="button"
                        className={cn(
                           "inline-flex h-6 items-center gap-1 rounded-full",
                           "bg-muted px-2 text-[11px] font-medium text-muted-foreground",
                           "hover:bg-muted/80 hover:text-foreground transition-colors"
                        )}
                        onClick={() => {
                           setDialogOpen(true);
                           setEditingIndex(null);
                           setDraft({ key: "", value: "" });
                        }}
                        disabled={isDisabled}
                     >
                        {moreLabel(overflowCount)}
                     </button>
                  )}
               </>
            ) : (
               <div className="flex items-center gap-2 text-muted-foreground/60 select-none">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="text-sm">{placeholder ?? emptyLabel}</span>
               </div>
            )}

            {/* Inline Add Button */}
            {showAddButton && canAdd && !isDisabled && (
               <button
                  type="button"
                  onClick={openForNew}
                  className={cn(
                     "inline-flex h-6 items-center gap-1 rounded-full",
                     "border border-dashed border-muted-foreground/30 px-2",
                     "text-[11px] font-medium text-muted-foreground",
                     "hover:border-primary/50 hover:bg-accent hover:text-accent-foreground transition-all",
                     "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  )}
               >
                  <Plus className="h-3 w-3" />
                  <span>Add</span>
               </button>
            )}

            {/* Menu/Manage Button */}
            {showMenuButton && hasItems && !isDisabled && (
               <div className="ml-auto pl-1">
                  <button
                     type="button"
                     onClick={() => {
                        // Default behavior: open "Add New"
                        setDialogOpen(true);
                        setEditingIndex(null);
                        setDraft({ key: "", value: "" });
                     }}
                     className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                     aria-label="Add another"
                  >
                     <MoreHorizontal className="h-4 w-4" />
                  </button>
               </div>
            )}
         </div>

         {/* Error Message Support (Optional usage) */}
         {error && typeof error === 'string' && (
            <p className="mt-1.5 text-xs font-medium text-destructive">
               {error}
            </p>
         )}

         {ManageDialog}
      </div>
   );
});

ShadcnKeyValueVariant.displayName = "ShadcnKeyValueVariant";

export default ShadcnKeyValueVariant;
```

---
#### 48


` File: packages/form-palette/src/presets/shadcn-variants/multiselect.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/multi-select.tsx
// noinspection DuplicatedCode

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Input } from "@/presets/ui/input";
import { Checkbox } from "@/presets/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/presets/ui/popover";
import { ChevronDown, Search, X } from "lucide-react";
import { Badge } from "@/presets/ui/badge";
import {
    removeSelectValue,
    SelectionSummary,
} from "@/variants/helpers/selection-summary";
import { globalNormalizeOptions } from "@/lib/normalise-options";

type SelectPrimitive = string | number;

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type MultiSelectOption =
    | SelectPrimitive
    | {
          label?: React.ReactNode;
          value?: SelectPrimitive;
          description?: React.ReactNode;
          disabled?: boolean;
          icon?: React.ReactNode;
          [key: string]: any;
      };

type NormalizedMultiItem = {
    key: string;
    value: SelectPrimitive;
    labelNode: React.ReactNode;
    labelText: string;
    description?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    /** Option-level renderer (falls back to global renderOption) */
    render?: (...args: any[]) => React.ReactNode;
    raw: MultiSelectOption;
};

type MultiSelectBaseProps = Pick<
    VariantBaseProps<SelectPrimitive[] | undefined>,
    "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> & {
    /**
     * Options for the multi-select.
     *
     * You can pass:
     * - primitives: ["ng", "gh", "ke"]
     * - objects:    [{ label, value, ...extra }]
     */
    options?: MultiSelectOption[];

    /**
     * Automatically capitalise the first letter of the label
     * (when the resolved label is a string).
     */
    autoCap?: boolean;

    /**
     * How to read the label from each option.
     *
     * - string → key on the option object
     * - function → custom mapper
     * - omitted → tries `label`, else String(value)
     */
    optionLabel?: string | ((item: MultiSelectOption) => React.ReactNode);

    /**
     * How to read the value from each option.
     *
     * - string → key on the option object
     * - function → custom mapper
     * - omitted → uses `value`, or `id`, or `key`, or index
     */
    optionValue?: string | ((item: MultiSelectOption) => SelectPrimitive);

    /**
     * Optional description line under the label.
     */
    optionDescription?: string | ((item: MultiSelectOption) => React.ReactNode);

    /**
     * How to determine if an option is disabled.
     */
    optionDisabled?: string | ((item: MultiSelectOption) => boolean);

    /**
     * How to extract an icon for each option.
     *
     * - string → key on the option object (default "icon")
     * - function → custom mapper
     */
    optionIcon?: string | ((item: MultiSelectOption) => React.ReactNode);

    /**
     * How to compute the React key for each option.
     */
    optionKey?:
        | string
        | ((item: MultiSelectOption, index: number) => React.Key);

    /**
     * Enable inline search inside the dropdown.
     */
    searchable?: boolean;

    /**
     * Placeholder for the search input.
     */
    searchPlaceholder?: string;

    /**
     * Text to show when search yields no results.
     */
    emptySearchText?: React.ReactNode;

    /**
     * Placeholder when nothing is selected.
     */
    placeholder?: React.ReactNode;

    /**
     * Show a small clear button in the trigger when any value is selected.
     */
    clearable?: boolean;

    /**
     * Whether to show a "Select all" row.
     */
    showSelectAll?: boolean;

    /**
     * Label for the "Select all" row.
     * Default: "Select all".
     */
    selectAllLabel?: React.ReactNode;

    /**
     * Where to place the "Select all" row.
     * Default: "top".
     */
    selectAllPosition?: "top" | "bottom";

    /**
     * Custom renderer for each option row (checkbox + label).
     */
    renderOption?: (ctx: {
        item: NormalizedMultiItem;
        selected: boolean;
        index: number;
        option: React.ReactNode; // prebuilt row you can wrap
        click(): void;
    }) => React.ReactNode;

    /**
     * Custom renderer for the trigger summary.
     */
    renderValue?: (ctx: {
        selectedItems: NormalizedMultiItem[];
        placeholder?: React.ReactNode;
    }) => React.ReactNode;

    /**
     * Custom renderer for the checkbox.
     *
     * - item: the option item (or null for "select all")
     * - selected: whether this row is currently fully selected
     * - indeterminate: partially selected (used for "select all")
     * - isSelectAll: true for the "select all" row
     */
    renderCheckbox?: (ctx: {
        item: NormalizedMultiItem | null;
        selected: boolean;
        indeterminate: boolean;
        isSelectAll: boolean;
    }) => React.ReactNode;

    /**
     * Max height (in px) for the dropdown list before scrolling.
     * Default: 260.
     */
    maxListHeight?: number;

    /**
     * Wrapper class for the whole variant.
     */
    className?: string;

    /**
     * Extra classes for the trigger button.
     */
    triggerClassName?: string;

    /**
     * Extra classes for the popover content.
     */
    contentClassName?: string;
};

type MultiSelectDefaultModeProps = {
    mode?: "default";

    // Icons & controls (default mode only)
    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;
    iconGap?: number;
    leadingIconSpacing?: number;
    trailingIconSpacing?: number;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;

    joinControls?: boolean;
    extendBoxToControls?: boolean;

    // Not supported in default mode
    button?: never;
    children?: never;
    selectedBadge?: never;
    selectedBadgeHiddenWhenZero?: never;
    selectedBadgeClassName?: never;
    selectedBadgePlacement?: never;
};

type MultiSelectButtonModeButton =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          selectedItems: NormalizedMultiItem[];
          selectedCount: number;
      }) => React.ReactNode);

type MultiSelectButtonModeProps = {
    mode: "button";

    /**
     * Used when mode="button". If provided, this is the trigger.
     * If not provided, `children` is used.
     */
    button?: MultiSelectButtonModeButton;
    children?: MultiSelectButtonModeButton;

    /**
     * Selected-count badge (mode="button" only)
     */
    selectedBadge?: boolean;
    selectedBadgeHiddenWhenZero?: boolean;
    selectedBadgeClassName?: string;
    selectedBadgePlacement?: "end" | "corner";

    // Icons & controls NOT supported in button mode
    leadingIcons?: never;
    trailingIcons?: never;
    icon?: never;
    iconGap?: never;
    leadingIconSpacing?: never;
    trailingIconSpacing?: never;

    leadingControl?: never;
    trailingControl?: never;
    leadingControlClassName?: never;
    trailingControlClassName?: never;

    joinControls?: never;
    extendBoxToControls?: never;
};

export type ShadcnMultiSelectVariantProps = MultiSelectBaseProps &
    (MultiSelectDefaultModeProps | MultiSelectButtonModeProps);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function normalizeOptions(
    opts: readonly MultiSelectOption[] | undefined,
    config: Pick<
        ShadcnMultiSelectVariantProps,
        | "autoCap"
        | "optionLabel"
        | "optionValue"
        | "optionDescription"
        | "optionDisabled"
        | "optionKey"
        | "optionIcon"
    >
): NormalizedMultiItem[] {
    return globalNormalizeOptions(opts, config);
}

function triggerHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}

function triggerPadding(density?: Density) {
    switch (density) {
        case "compact":
            return "py-1";
        case "loose":
            return "py-2";
        case "comfortable":
        default:
            return "py-1.5";
    }
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnMultiSelectVariant = React.forwardRef<
    HTMLButtonElement,
    ShadcnMultiSelectVariantProps
>(function ShadcnMultiSelectVariant(props, _ref) {
    const {
        value,
        onValue,
        error,
        disabled,
        readOnly,
        size,
        density,

        options,

        autoCap,
        optionLabel,
        optionValue,
        optionDescription,
        optionDisabled,
        optionIcon,
        optionKey,

        searchable,
        searchPlaceholder,
        emptySearchText,

        placeholder,
        clearable,

        showSelectAll,
        selectAllLabel,
        selectAllPosition = "top",

        renderOption,
        renderValue,
        renderCheckbox,

        maxListHeight = 260,

        className,
        triggerClassName,
        contentClassName,

        // Mode
        mode = "default",

        // Icons & controls (default mode only)
        leadingIcons,
        trailingIcons,
        icon,
        iconGap,
        leadingIconSpacing,
        trailingIconSpacing,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        joinControls = true,
        extendBoxToControls = true,

        // Button mode only
        button,
        children,
        selectedBadge,
        selectedBadgeHiddenWhenZero,
        selectedBadgeClassName,
        selectedBadgePlacement = "end",
    } = props;

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");

    const items = React.useMemo(
        () =>
            normalizeOptions(options ?? [], {
                autoCap,
                optionLabel,
                optionValue,
                optionDescription,
                optionDisabled,
                optionKey,
                optionIcon,
            }),
        [
            options,
            autoCap,
            optionLabel,
            optionValue,
            optionDescription,
            optionDisabled,
            optionKey,
            optionIcon,
        ]
    );

    const selectedValues = React.useMemo(
        () => new Set<SelectPrimitive>((value ?? []) as SelectPrimitive[]),
        [value]
    );

    const selectedItems = React.useMemo(
        () => items.filter((it) => selectedValues.has(it.value)),
        [items, selectedValues]
    );

    const filteredItems = React.useMemo(() => {
        if (!query) return items;
        const q = query.toLowerCase();
        return items.filter((it) => it.labelText.toLowerCase().includes(q));
    }, [items, query]);

    const selectableItems = React.useMemo(
        () => items.filter((it) => !it.disabled),
        [items]
    );

    const allSelectableValues = React.useMemo(
        () => new Set<SelectPrimitive>(selectableItems.map((it) => it.value)),
        [selectableItems]
    );

    const allSelected =
        selectableItems.length > 0 &&
        selectableItems.every((it) => selectedValues.has(it.value));

    const someSelected =
        selectableItems.length > 0 &&
        !allSelected &&
        selectableItems.some((it) => selectedValues.has(it.value));

    const heightCls = triggerHeight(size as Size | undefined);
    const padCls = triggerPadding(density as Density | undefined);

    const showClear = clearable && (value?.length ?? 0) > 0;

    const disabledTrigger = disabled || readOnly;

    const handleToggleValue = React.useCallback(
        (primitive: SelectPrimitive) => {
            if (!onValue || disabled || readOnly) return;

            const current = (value ?? []) as SelectPrimitive[];
            const isSelected = current.some((v) => v === primitive);

            let next: SelectPrimitive[];
            if (isSelected) {
                next = current.filter((v) => v !== primitive);
            } else {
                next = [...current, primitive];
            }

            const final = next.length ? next : undefined;

            const detail: ChangeDetail = {
                source: "variant",
                raw: {
                    type: "toggle",
                    value: primitive,
                    next: final,
                },
                nativeEvent: undefined,
                meta: undefined,
            };

            onValue(final as any, detail);
        },
        [onValue, value, disabled, readOnly]
    );

    const handleSelectAll = React.useCallback(() => {
        if (!onValue || disabled || readOnly) return;

        const current = (value ?? []) as SelectPrimitive[];

        const allSelectableArr = Array.from(allSelectableValues);

        const currentlyAllSelected =
            allSelectableArr.length > 0 &&
            allSelectableArr.every((v) => selectedValues.has(v));

        let next: SelectPrimitive[];

        if (currentlyAllSelected) {
            // unselect all selectable ones, keep others (if any)
            next = current.filter((v) => !allSelectableValues.has(v));
        } else {
            // union of existing + all selectable
            const merged = new Set<SelectPrimitive>(current);
            for (const v of allSelectableArr) merged.add(v);
            next = Array.from(merged);
        }

        const final = next.length ? next : undefined;

        const detail: ChangeDetail = {
            source: "variant",
            raw: {
                type: "select-all",
                next: final,
            },
            nativeEvent: undefined,
            meta: {
                allSelected: !currentlyAllSelected,
            },
        };

        onValue(final as any, detail);
    }, [
        onValue,
        value,
        disabled,
        readOnly,
        allSelectableValues,
        selectedValues,
    ]);

    const handleClearAll = React.useCallback(() => {
        if (!onValue || disabled || readOnly) return;

        const detail: ChangeDetail = {
            source: "variant",
            raw: {
                type: "clear",
            },
            nativeEvent: undefined,
            meta: undefined,
        };

        onValue(undefined as any, detail);
    }, [onValue, disabled, readOnly]);

    const triggerSummary = renderValue ? (
        renderValue({ selectedItems, placeholder })
    ) : (
        <SelectionSummary
            selectedItems={selectedItems}
            placeholder={placeholder}
            onRemoveValue={(item) => {
                // whatever you already do to unselect a single value
                // e.g. toggleValue(value) if it adds/removes from the set
                // toggleValue(value);

                const updated = removeSelectValue(
                    selectedValues as unknown as SelectPrimitive[],
                    item.value
                );

                const detail: ChangeDetail = {
                    source: "variant",
                    raw: item,
                    nativeEvent: undefined,
                    meta: { action: "remove", removed: value },
                };

                onValue?.(updated, detail);
            }}
        />
    );

    // ─────────────────────────────────────────────
    // Icons setup (same semantics as select variant)
    // ─────────────────────────────────────────────

    const resolvedLeadingIcons: React.ReactNode[] = (() => {
        if (leadingIcons && leadingIcons.length) return leadingIcons;
        if (icon) return [icon];
        return [];
    })();

    const resolvedTrailingIcons: React.ReactNode[] = trailingIcons ?? [];

    const baseIconGap = iconGap ?? 4;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const hasLeadingIcons = resolvedLeadingIcons.length > 0;
    const hasTrailingIcons = resolvedTrailingIcons.length > 0;

    const hasLeadingControl = !!leadingControl;
    const hasTrailingControl = !!trailingControl;
    const hasControls = hasLeadingControl || hasTrailingControl;

    const makeCheckboxNode = React.useCallback(
        (opts: {
            item: NormalizedMultiItem | null;
            selected: boolean;
            indeterminate: boolean;
            isSelectAll: boolean;
        }) => {
            if (renderCheckbox) {
                return renderCheckbox(opts);
            }

            return (
                <Checkbox
                    className="mr-2 mt-0.5"
                    checked={opts.indeterminate ? "none" : opts.selected}
                    aria-hidden="true"
                    // purely visual; click handled on row button
                    onCheckedChange={() => {}}
                />
            );
        },
        [renderCheckbox]
    );

    const baseBoxClasses = cn(
        "border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs",
        "transition-[color,box-shadow] outline-none",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
    );

    // Trigger button body (icons + summary + clear + trailing icons + chevron)
    const DefaultTriggerButton = (
        <button
            ref={_ref}
            type="button"
            disabled={disabledTrigger}
            className={cn(
                "flex w-full items-center justify-between rounded-md border border-input bg-surfaces-input px-3 text-left shadow-xs",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                heightCls,
                padCls,
                hasControls &&
                    joinControls &&
                    extendBoxToControls &&
                    "border-none shadow-none focus-visible:ring-0 focus-visible:outline-none",
                triggerClassName
            )}
        >
            <div className="flex w-full items-center justify-between gap-2">
                {/* Left side: leading icons + summary */}
                <div className="flex min-w-0 items-center grow gap-2">
                    {hasLeadingIcons && (
                        <span
                            className="flex items-center gap-1 shrink-0"
                            style={{ columnGap: leadingGap }}
                            data-slot="leading-icons"
                        >
                            {resolvedLeadingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </span>
                    )}

                    <div className="min-w-0 flex-1">{triggerSummary}</div>
                </div>

                {/* Right side: clear + trailing icons + chevron */}
                <div className="flex items-center gap-1 shrink-0">
                    {showClear && (
                        <button
                            type="button"
                            aria-label="Clear selection"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleClearAll();
                            }}
                            className="flex h-4 w-4 items-center justify-center rounded hover:bg-muted"
                            data-slot="clear"
                        >
                            <X className="h-3 w-3 pointer-events-none" />
                        </button>
                    )}

                    {hasTrailingIcons && (
                        <span
                            className="flex items-center gap-1"
                            style={{ columnGap: trailingGap }}
                            data-slot="trailing-icons"
                        >
                            {resolvedTrailingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </span>
                    )}

                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </div>
            </div>
        </button>
    );

    // Button mode trigger
    const ButtonModeTrigger = React.useMemo(() => {
        if (mode !== "button") return null;

        const selectedCount = selectedItems.length;
        const content: React.ReactNode = (() => {
            const renderable = button ?? children;
            if (typeof renderable === "function") {
                return renderable({
                    open,
                    selectedItems,
                    selectedCount,
                });
            }
            return (
                renderable ?? (
                    <button
                        type="button"
                        className={cn(
                            "inline-flex items-center gap-2",
                            triggerClassName
                        )}
                    >
                        <span className="truncate">{triggerSummary}</span>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>
                )
            );
        })();

        if (!selectedBadge) return content;

        const hiddenZero = selectedBadgeHiddenWhenZero && selectedCount === 0;
        if (hiddenZero) return content;

        if (selectedBadgePlacement === "corner") {
            return (
                <span className="relative inline-block">
                    {content}
                    <Badge
                        className={cn(
                            "absolute -top-2 -right-2 h-5 min-w-5 px-1.5",
                            selectedBadgeClassName
                        )}
                    >
                        {selectedCount}
                    </Badge>
                </span>
            );
        }

        // default: end placement
        return (
            <span className="inline-flex items-center gap-2">
                {content}
                <Badge
                    className={cn(
                        "ml-1 h-5 min-w-5 px-1.5",
                        selectedBadgeClassName
                    )}
                >
                    {selectedCount}
                </Badge>
            </span>
        );
    }, [
        mode,
        button,
        children,
        triggerClassName,
        open,
        selectedItems,
        selectedBadge,
        selectedBadgeHiddenWhenZero,
        selectedBadgePlacement,
        selectedBadgeClassName,
        triggerSummary,
    ]);

    // Core multi-select element (Popover + list)
    const TriggerNode =
        mode === "button" ? ButtonModeTrigger : DefaultTriggerButton;
    const MultiSelectCore = (
        <Popover
            open={open && !disabledTrigger}
            onOpenChange={(next) => {
                if (disabledTrigger) return;
                setOpen(next);
                if (!next) setQuery("");
            }}
        >
            <PopoverTrigger asChild>{TriggerNode}</PopoverTrigger>

            <PopoverContent
                className={cn(
                    "w-(--radix-popover-trigger-width) p-0",
                    contentClassName
                )}
                align="start"
            >
                {/* Search bar */}
                {searchable && (
                    <div className="p-2 border-b border-border">
                        <Input
                            autoFocus
                            icon={<Search className="size-4" />}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder ?? "Search options…"}
                            size={size}
                            density={density}
                        />
                    </div>
                )}

                <div
                    className="py-1 overflow-auto"
                    style={{ maxHeight: maxListHeight }}
                >
                    {/* Optional "Select all" at top */}
                    {showSelectAll && selectAllPosition === "top" && (
                        <button
                            type="button"
                            className={cn(
                                "flex w-full items-center px-2 py-1.5 text-sm",
                                "hover:bg-muted/70",
                                "disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                            onClick={handleSelectAll}
                        >
                            {makeCheckboxNode({
                                item: null,
                                selected: allSelected,
                                indeterminate: someSelected,
                                isSelectAll: true,
                            })}
                            <span className="truncate">
                                {selectAllLabel ?? "Select all"}
                            </span>
                        </button>
                    )}

                    {/* Options */}
                    {filteredItems.length === 0 ? (
                        <div className="px-2 py-1.5 text-xs text-muted-foreground">
                            {emptySearchText ?? "No results found"}
                        </div>
                    ) : (
                        filteredItems.map((item, index) => {
                            const selected = selectedValues.has(item.value);

                            const row = (
                                <button
                                    key={item.key}
                                    type="button"
                                    className={cn(
                                        "flex w-full items-start gap-2 px-2 py-1.5 text-sm",
                                        "hover:bg-muted/70",
                                        item.disabled &&
                                            "opacity-50 cursor-not-allowed"
                                    )}
                                    onClick={() => {
                                        if (item.disabled) return;
                                        handleToggleValue(item.value);
                                    }}
                                >
                                    {makeCheckboxNode({
                                        item,
                                        selected,
                                        indeterminate: false,
                                        isSelectAll: false,
                                    })}

                                    <div className="flex flex-1 items-start gap-2">
                                        {item.icon && (
                                            <span className="mt-0.5 shrink-0">
                                                {item.icon}
                                            </span>
                                        )}
                                        <div className="flex flex-col">
                                            <span>{item.labelNode}</span>
                                            {item.description && (
                                                <span className="text-xs text-muted-foreground">
                                                    {item.description}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );

                            // Prefer per-option renderer (normalized) if present; fall back to global renderOption
                            const renderer = (item as any).render ?? renderOption;

                            if (!renderer) return row;

                            return renderer({
                                item,
                                selected,
                                index,
                                option: row,
                                click() {
                                    if (item.disabled) return;
                                    handleToggleValue(item.value);
                                },
                            });
                        })
                    )}

                    {/* Optional "Select all" at bottom */}
                    {showSelectAll && selectAllPosition === "bottom" && (
                        <button
                            type="button"
                            className={cn(
                                "mt-1 flex w-full items-center px-2 py-1.5 text-sm border-t border-border",
                                "hover:bg-muted/70",
                                "disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                            onClick={handleSelectAll}
                        >
                            {makeCheckboxNode({
                                item: null,
                                selected: allSelected,
                                indeterminate: someSelected,
                                isSelectAll: true,
                            })}
                            <span className="truncate">
                                {selectAllLabel ?? "Select all"}
                            </span>
                        </button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );

    // ─────────────────────────────────────────────
    // Layout modes (mirroring select variant)
    // ─────────────────────────────────────────────

    // CASE 1: button mode or no controls → just the multi-select
    if (mode === "button" || !hasControls) {
        return (
            <div
                data-slot="select-field"
                data-multi="true"
                className={cn(
                    "w-full",
                    disabled && "opacity-50 cursor-not-allowed",
                    className
                )}
                aria-disabled={disabled || undefined}
                aria-invalid={error ? "true" : undefined}
            >
                {MultiSelectCore}
            </div>
        );
    }

    // CASE 2: controls + joinControls → shared single box
    if (joinControls) {
        const groupClassName = cn(
            "flex items-stretch w-full",
            extendBoxToControls &&
                cn(
                    "relative",
                    baseBoxClasses // ring via :focus-within
                ),
            !extendBoxToControls &&
                "relative border-none shadow-none bg-transparent",
            className
        );

        return (
            <div
                data-slot="select-field"
                data-multi="true"
                className="w-full"
                aria-disabled={disabled || undefined}
                aria-invalid={error ? "true" : undefined}
            >
                <div
                    className={groupClassName}
                    data-slot="select-group"
                    data-disabled={disabled ? "true" : "false"}
                >
                    {hasLeadingControl && (
                        <div
                            className={cn(
                                "flex items-center px-2",
                                leadingControlClassName
                            )}
                            data-slot="leading-control"
                        >
                            {leadingControl}
                        </div>
                    )}

                    <div
                        className={cn("flex-1 min-w-0 flex items-stretch")}
                        data-slot="select-region"
                    >
                        {MultiSelectCore}
                    </div>

                    {hasTrailingControl && (
                        <div
                            className={cn(
                                "flex items-center px-2",
                                trailingControlClassName
                            )}
                            data-slot="trailing-control"
                        >
                            {trailingControl}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // CASE 3: controls present, but separate (no joined box)
    return (
        <div
            data-slot="select-field"
            data-multi="true"
            className={cn(
                "flex items-stretch w-full",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
            aria-disabled={disabled || undefined}
            aria-invalid={error ? "true" : undefined}
        >
            {hasLeadingControl && (
                <div
                    className={cn(
                        "flex items-center mr-1",
                        leadingControlClassName
                    )}
                    data-slot="leading-control"
                >
                    {leadingControl}
                </div>
            )}

            <div className="flex-1 min-w-0" data-slot="select-region">
                {MultiSelectCore}
            </div>

            {hasTrailingControl && (
                <div
                    className={cn(
                        "flex items-center ml-1",
                        trailingControlClassName
                    )}
                    data-slot="trailing-control"
                >
                    {trailingControl}
                </div>
            )}
        </div>
    );
});

ShadcnMultiSelectVariant.displayName = "ShadcnMultiSelectVariant";

export default ShadcnMultiSelectVariant;
```

---
#### 49


` File: packages/form-palette/src/presets/shadcn-variants/number.tsx`  [↑ Back to top](#index)

```tsx
import React from "react";
import { InputNumber, InputNumberProps, InputNumberValueChangeEvent } from "../ui/number";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown, Plus, Minus } from "lucide-react";

// Wrapper-level props for the variant
export type ShadcnNumberVariantProps =
   // All the usual number stuff (mode, locale, prefix, suffix, etc.)
   Omit<InputNumberProps,
      | "onValueChange"
      | "onChange"
      | "leadingControl"
      | "trailingControl"
   >
   & {
      /**
       * Show +/- buttons around the numeric field.
       * Defaults to false.
       */
      showButtons?: boolean;

      /**
       * How the step buttons are laid out when showButtons is true.
       *
       * - 'inline': "-" on the left, "+" on the right
       * - 'stacked': vertical +/- stack on the right
       */
      buttonLayout?: "inline" | "stacked";
   };


export const ShadcnNumberVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnNumberVariantProps
>(function ShadcnNumberVariant(props, forwardedRef) {
   const {
      showButtons,
      buttonLayout = "stacked",
      disabled, // Extract disabled to style buttons
      ...rest
   } = props;

   // we still want access to these for stepping logic
   const {
      step = 1,
      min,
      value,
      max,
      onValue: onValueChange,
      name,
      id,
      inputId,
   } = rest as ShadcnNumberVariantProps;

   const handleChange = React.useCallback(
      (e: InputNumberValueChangeEvent) => {
         if (onValueChange) {
            onValueChange(e.value as any, {
               source: "user",
               nativeEvent: e.originalEvent as any,
               raw: e.value,
            });
         }
      },
      [onValueChange]
   );

   const handleStep = React.useCallback(
      (direction: 1 | -1, originalEvent: React.SyntheticEvent<any>) => {
         if (disabled) return;

         const current = value ?? 0;
         let next = current + direction * step;

         if (typeof min === "number") next = Math.max(next, min);
         if (typeof max === "number") next = Math.min(next, max);

         // Prime-style event
         const e: InputNumberValueChangeEvent = {
            originalEvent,
            value: next,
            stopPropagation: () => originalEvent.stopPropagation(),
            preventDefault: () => originalEvent.preventDefault(),
            target: {
               name,
               id: id ?? inputId ?? null,
               value: next,
            },
         };

         handleChange(e)
      },
      [value, step, min, max, onValueChange, name, id, inputId, disabled, handleChange]
   );

   // --- Styles ---
   // Common styles for the interactive buttons
   const btnBase = "flex h-full items-center justify-center bg-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed";

   // Build controls based on layout
   let leadingControl: React.ReactNode | undefined;
   let trailingControl: React.ReactNode | undefined;

   if (showButtons) {
      if (buttonLayout === "inline") {
         // INLINE: "-" on the left, "+" on the right
         leadingControl = (
            <button
               type="button"
               tabIndex={-1} // Prevent tabbing to buttons
               disabled={disabled}
               onClick={(e) => handleStep(-1, e)}
               className={cn(btnBase, "border-r border-input px-3")}
               aria-label="Decrease value"
            >
               <Minus className="h-4 w-4" />
            </button>
         );

         trailingControl = (
            <button
               type="button"
               tabIndex={-1}
               disabled={disabled}
               onClick={(e) => handleStep(1, e)}
               className={cn(btnBase, "border-l border-input px-3")}
               aria-label="Increase value"
            >
               <Plus className="h-4 w-4" />
            </button>
         );
      } else {
         // STACKED: vertical +/- on the right
         trailingControl = (
            <div className="flex h-full flex-col border-l border-input">
               <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  onClick={(e) => handleStep(1, e)}
                  className={cn(btnBase, "h-1/2 px-2 border-b border-input")}
                  aria-label="Increase value"
               >
                  <ChevronUp className="h-3 w-3" />
               </button>
               <button
                  type="button"
                  tabIndex={-1}
                  disabled={disabled}
                  onClick={(e) => handleStep(-1, e)}
                  className={cn(btnBase, "h-1/2 px-2")}
                  aria-label="Decrease value"
               >
                  <ChevronDown className="h-3 w-3" />
               </button>
            </div>
         );
      }
   }

   return (
      <InputNumber
         ref={forwardedRef}
         value={value}
         disabled={disabled}
         {...rest}
         onValueChange={handleChange}
         leadingControl={leadingControl}
         trailingControl={trailingControl}
         extendBoxToControls
         // Ensure the controls sit flush inside the container
         leadingControlClassName={cn("flex h-full", rest.leadingControlClassName)}
         trailingControlClassName={cn("flex h-full", rest.trailingControlClassName)}
      />
   );
});
```

---
#### 50


` File: packages/form-palette/src/presets/shadcn-variants/password.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/password.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Check } from "lucide-react";

type BaseProps = VariantBaseProps<string | undefined>;

/**
 * Options for the built-in password strength meter.
 *
 * NOTE: Score is always in the range 0–4 (inclusive).
 */
export interface StrengthOptions {
   /**
    * Custom scoring function.
    * Return a number in the range 0–4 (inclusive) where 0 = weakest, 4 = strongest.
    */
   calc?: (value: string) => number;

   /**
    * Labels for each score bucket (index 0..4).
    * Defaults to: ["Very weak", "Weak", "Okay", "Good", "Strong"]
    */
   labels?: [string, string, string, string, string];

   /**
    * Thresholds for score steps using a 0–100 bar.
    * Defaults to [0, 25, 50, 75, 100] mapping to scores 0..4 respectively.
    */
   thresholds?: [number, number, number, number, number];

   /**
    * Minimum score required to consider the password acceptable (0–4).
    * This is purely visual unless you enforce it in validate/onChange.
    * Default: 2
    */
   minScore?: number | 2;

   /**
    * Whether to show the textual label next to/under the bar.
    * Default: true
    */
   showLabel?: boolean;

   /**
    * Where to render the meter.
    * - "inline" → compact row under the input
    * - "block" → stacked with more spacing
    * Default: "inline"
    */
   display?: "inline" | "block";
}

/** Heuristic length/charset score: fast, dependency-free. Returns 0..4. */
function defaultScore(pw: string): number {
   if (!pw) return 0;
   let score = 0;

   // length
   if (pw.length >= 8) score++;
   if (pw.length >= 12) score++;

   // diversity
   const hasLower = /[a-z]/.test(pw);
   const hasUpper = /[A-Z]/.test(pw);
   const hasDigit = /\d/.test(pw);
   const hasSymbol = /[^A-Za-z0-9]/.test(pw);

   const variety = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean)
      .length;
   if (variety >= 2) score++;
   if (variety >= 3) score++;

   // Cap at 4
   return Math.max(0, Math.min(4, score));
}

const DEFAULT_LABELS: [string, string, string, string, string] = [
   "Very weak",
   "Weak",
   "Okay",
   "Good",
   "Strong",
];

const DEFAULT_THRESHOLDS: [number, number, number, number, number] = [
   0, 25, 50, 75, 100,
];

function normalizeStrengthOptions(
   raw: boolean | StrengthOptions | undefined,
): StrengthOptions | null {
   if (!raw) return null;

   const base: StrengthOptions = {
      calc: defaultScore,
      labels: DEFAULT_LABELS,
      thresholds: DEFAULT_THRESHOLDS,
      minScore: 2,
      showLabel: true,
      display: "inline",
   };

   if (raw === true) {
      return base;
   }

   return {
      ...base,
      ...raw,
      labels: raw.labels ?? base.labels,
      thresholds: raw.thresholds ?? base.thresholds,
      minScore: raw.minScore ?? base.minScore,
      showLabel: raw.showLabel ?? base.showLabel,
      display: raw.display ?? base.display,
   };
}

// ─────────────────────────────────────────────
// Definition map / rules
// ─────────────────────────────────────────────

export interface PasswordRuleConfig {
   /**
    * Pattern used to decide if the rule passes.
    */
   pattern: RegExp;

   /**
    * If true, the rule is considered optional (recommendation).
    * Default: false unless the rule name is not prefixed with "!".
    */
   optional?: boolean;

   /**
    * Weight in the scoring (relative importance).
    * Default: 1, doubled if the use key is prefixed with "!".
    */
   weight?: number;

   /**
    * Short label for the rule (e.g. "At least 8 characters").
    * Defaults to the map key if omitted.
    */
   label?: string;

   /**
    * Longer description, used in detailed rule view.
    */
   description?: string;
}

/**
 * A definition entry can be:
 * - string     → treated as a regex source
 * - RegExp     → used directly
 * - full config
 */
export type PasswordRuleDefinition =
   | string
   | RegExp
   | PasswordRuleConfig;

/**
 * Map of alias/keys → definition entries.
 */
export type PasswordDefinitionMap = Record<string, PasswordRuleDefinition>;

// Default rule definitions used by the meter.
const DEFAULT_RULE_DEFINITIONS: PasswordDefinitionMap = {
   "length-8": {
      pattern: /.{8,}/,
      label: "8+ chars",
      description: "Use at least 8 characters.",
   },
   "length-12": {
      pattern: /.{12,}/,
      optional: true,
      label: "12+ chars",
      description: "Use 12 or more characters for stronger security.",
   },
   lower: {
      pattern: /[a-z]/,
      label: "Lowercase",
      description: "Include at least one lowercase letter (a–z).",
   },
   upper: {
      pattern: /[A-Z]/,
      label: "Uppercase",
      description: "Include at least one uppercase letter (A–Z).",
   },
   digit: {
      pattern: /\d/,
      label: "Number",
      description: "Include at least one digit (0–9).",
   },
   symbol: {
      pattern: /[^A-Za-z0-9]/,
      label: "Symbol",
      description: "Include at least one symbol (e.g. !, @, #, ?).",
   },
   "no-space": {
      pattern: /^\S+$/,
      optional: true,
      label: "No spaces",
      description: "Avoid spaces in your password.",
   },
};

/**
 * Merge default → global → local rule definitions.
 *
 * - DEFAULT_RULE_DEFINITIONS
 * - window["form-palette"]?.ruleDefinition
 * - props.ruleDefinitions
 */
function getMergedRuleDefinitions(
   local?: PasswordDefinitionMap,
): PasswordDefinitionMap {
   let merged: PasswordDefinitionMap = { ...DEFAULT_RULE_DEFINITIONS };

   if (typeof window !== "undefined") {
      const fp = (window as any)["form-palette"];
      const globalDefs = fp?.ruleDefinition as
         | PasswordDefinitionMap
         | undefined;

      if (globalDefs && typeof globalDefs === "object") {
         merged = { ...merged, ...globalDefs };
      }
   }

   if (local && typeof local === "object") {
      merged = { ...merged, ...local };
   }

   return merged;
}

/**
 * Internal normalized state for a single rule.
 */
interface NormalizedRuleState {
   key: string;
   label: string;
   description?: string;
   optional: boolean;
   required: boolean;
   weight: number;
   passed: boolean;
}

/**
 * Props passed to custom meter renderers.
 */
export interface PasswordMeterRenderProps {
   /** Raw password value. */
   value: string;
   /** Bucket score 0..4 based on percent + thresholds. */
   score: number;
   /** 0–100 progress used for the bar. */
   percent: number;
   /** Human label for the current score. */
   label: string;
   /** Whether score >= minScore. */
   passed: boolean;
   /** Effective minScore after normalization. */
   minScore: number;
   /** Effective thresholds used for bucketing. */
   thresholds: [number, number, number, number, number];
   /** Effective labels used. */
   labels: [string, string, string, string, string];
   /** Rule-level details when using a definition map. */
   rules: NormalizedRuleState[];
}

/**
 * Password-only props (on top of Shadcn text UI props & VariantBaseProps).
 *
 * This is what the form runtime sees as VariantPropsFor<"password">.
 */
export interface PasswordVariantProps {
   /** Maximum number of characters permitted. */
   maxLength?: number;
   /** Browser autocomplete hint (e.g., "current-password", "new-password"). */
   autoComplete?: string;

   /** Show an eye button to toggle between obscured/plain text. (default: true) */
   revealToggle?: boolean;
   /** Start in the revealed (plain text) state. */
   defaultRevealed?: boolean;
   /** Called whenever the reveal state changes. */
   onRevealChange?(revealed: boolean): void;
   /** Override the icons used for hide/show. */
   renderToggleIcon?(revealed: boolean): React.ReactNode;
   /** Accessible label for the toggle button. */
   toggleAriaLabel?(revealed: boolean): string;

   /**
    * Extra className for the reveal toggle button.
    */
   toggleButtonClassName?: string;

   /**
    * Enable the built-in strength meter (boolean or options).
    *
    * - false / undefined → no built-in meter is shown
    * - true              → use defaults
    * - object            → merge with defaults
    */
   strengthMeter?: boolean | StrengthOptions;

   /**
    * Optional rule definition map.
    */
   ruleDefinitions?: PasswordDefinitionMap;

   /**
    * Selection of rule aliases to apply.
    *
    * - "length"  → use ruleDefinitions["length"] with default importance
    * - "!length" → same rule but treated as more important
    */
   ruleUses?: string[];

   /**
    * Built-in meter style:
    * - "simple" → single bar + label
    * - "rules"  → bar + per-rule checklist
    * Default: "simple"
    */
   meterStyle?: "simple" | "rules";

   /**
    * Optional custom meter renderer.
    */
   renderMeter?(props: PasswordMeterRenderProps): React.ReactNode;

   /**
    * ClassNames for the meter and rules UI.
    */
   meterWrapperClassName?: string;
   meterContainerClassName?: string;
   meterBarClassName?: string;
   meterLabelClassName?: string;

   rulesWrapperClassName?: string;
   rulesHeadingClassName?: string;
   rulesListClassName?: string;
   ruleItemClassName?: string;
   ruleIconClassName?: string;
   ruleLabelClassName?: string;

   /**
    * Extra className for the outer field wrapper.
    */
   className?: string;
}

// We still *type* against ShadcnTextVariantProps so password can reuse
// all the visual/text props. We take control of type, value, onValue & trailingControl.
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   "type" | "inputMode" | "leadingControl" | "trailingControl" | "value" | "onValue"
>;

/**
 * Full props for the Shadcn-based password variant.
 */
export type ShadcnPasswordVariantProps = TextUiProps &
   PasswordVariantProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Rule normalization & scoring
// ─────────────────────────────────────────────

function normalizeRules(
   value: string,
   definitions?: PasswordDefinitionMap,
   uses?: string[],
): { rules: NormalizedRuleState[]; percent: number | null } {
   if (!definitions || Object.keys(definitions).length === 0) {
      return { rules: [], percent: null };
   }

   const useList =
      uses && uses.length ? uses : Object.keys(definitions);

   const rules: NormalizedRuleState[] = [];
   let totalWeight = 0;
   let passedWeight = 0;

   for (const rawKey of useList) {
      if (!rawKey) continue;

      const important = rawKey.startsWith("!");
      const key = important ? rawKey.slice(1) : rawKey;
      const def = definitions[key];
      if (!def) continue;

      let pattern: RegExp;
      let optional = !important;
      let weight = important ? 2 : 1;
      let label = key;
      let description: string | undefined;

      if (typeof def === "string") {
         pattern = new RegExp(def);
      } else if (def instanceof RegExp) {
         pattern = def;
      } else {
         pattern = def.pattern;
         if (def.optional !== undefined) optional = def.optional;
         if (def.weight !== undefined) weight = def.weight;
         if (def.label) label = def.label;
         if (def.description) description = def.description;
      }

      const passed = pattern.test(value);
      totalWeight += weight;
      if (passed) passedWeight += weight;

      rules.push({
         key,
         label,
         description,
         optional,
         required: !optional,
         weight,
         passed,
      });
   }

   if (totalWeight === 0) {
      return { rules, percent: null };
   }

   const percent = (passedWeight / totalWeight) * 100;
   return { rules, percent };
}

function clampScore(x: number): number {
   if (Number.isNaN(x)) return 0;
   return Math.max(0, Math.min(4, x));
}

function computeMeterState(
   value: string,
   strength: StrengthOptions,
   definitions?: PasswordDefinitionMap,
   uses?: string[],
): PasswordMeterRenderProps {
   const { rules, percent: rulesPercent } = normalizeRules(
      value,
      definitions,
      uses,
   );

   const labels = strength.labels ?? DEFAULT_LABELS;
   const thresholds = strength.thresholds ?? DEFAULT_THRESHOLDS;
   const minScore = (strength.minScore ?? 2) as number;

   let percent: number;
   let score: number;

   if (rulesPercent != null) {
      percent = rulesPercent;
   } else {
      const rawScore = clampScore(
         strength.calc ? strength.calc(value) : defaultScore(value),
      );
      percent = (rawScore / 4) * 100;
   }

   let bucketIndex = 0;
   for (let i = 0; i < thresholds.length; i++) {
      if (percent >= thresholds[i]) {
         bucketIndex = i;
      } else {
         break;
      }
   }
   score = bucketIndex;

   const label =
      labels[score] ??
      labels[labels.length - 1] ??
      DEFAULT_LABELS[DEFAULT_LABELS.length - 1];

   const passed = score >= minScore;

   return {
      value,
      score,
      percent,
      label,
      passed,
      minScore,
      thresholds: thresholds,
      labels,
      rules,
   };
}

function meterColor(score: number): string {
   if (score <= 1) return "bg-destructive";
   if (score === 2) return "bg-orange-500";
   if (score === 3) return "bg-amber-500";
   return "bg-emerald-500";
}

// ─────────────────────────────────────────────
// Main variant component
// ─────────────────────────────────────────────

export const ShadcnPasswordVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnPasswordVariantProps
>(function ShadcnPasswordVariant(props, ref) {
   const {
      // base variant bits
      value,
      onValue,
      error,

      // password base props
      maxLength,
      autoComplete,
      revealToggle = true,
      defaultRevealed = false,
      onRevealChange,
      renderToggleIcon,
      toggleAriaLabel,
      toggleButtonClassName,

      // strength / rules
      strengthMeter,
      ruleDefinitions,
      ruleUses,
      meterStyle = "simple",
      renderMeter,
      meterWrapperClassName,
      meterContainerClassName,
      meterBarClassName,
      meterLabelClassName,
      rulesWrapperClassName,
      rulesHeadingClassName,
      rulesListClassName,
      ruleItemClassName,
      ruleIconClassName,
      ruleLabelClassName,

      className,

      // everything else from Shadcn text UI
      ...restTextProps
   } = props;

   const [revealed, setRevealed] = React.useState<boolean>(
      Boolean(defaultRevealed),
   );

   const normalizedStrength = React.useMemo(
      () => normalizeStrengthOptions(strengthMeter),
      [strengthMeter],
   );

   const effectiveRuleDefinitions = React.useMemo(
      () => getMergedRuleDefinitions(ruleDefinitions),
      [ruleDefinitions],
   );

   const meterState = React.useMemo<PasswordMeterRenderProps | null>(() => {
      if (!normalizedStrength) return null;
      const v = value ?? "";
      return computeMeterState(
         v,
         normalizedStrength,
         effectiveRuleDefinitions,
         ruleUses,
      );
   }, [normalizedStrength, value, ruleUses, effectiveRuleDefinitions]);

   const handleToggleReveal = React.useCallback(() => {
      setRevealed((prev) => {
         const next = !prev;
         onRevealChange?.(next);
         return next;
      });
   }, [onRevealChange]);

   const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const next = event.target.value ?? "";
         const detail: ChangeDetail<PasswordMeterRenderProps | undefined> = {
            source: "variant",
            raw: next,
            nativeEvent: event,
            meta: meterState ?? undefined,
         };
         onValue?.(next, detail);
      },
      [onValue, meterState],
   );

   const toggleLabel =
      toggleAriaLabel?.(revealed) ??
      (revealed ? "Hide password" : "Show password");

   const trailingControl =
      revealToggle === false ? undefined : (
         <button
            type="button"
            onClick={handleToggleReveal}
            aria-label={toggleLabel}
            tabIndex={-1}
            className={cn(
               "inline-flex h-full items-center justify-center px-3 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:bg-muted/50",
               toggleButtonClassName,
            )}
            data-slot="password-toggle"
         >
            {renderToggleIcon ? (
               renderToggleIcon(revealed)
            ) : revealed ? (
               <EyeOff className="h-4 w-4" />
            ) : (
               <Eye className="h-4 w-4" />
            )}
         </button>
      );

   const meterNode =
      normalizedStrength && meterState
         ? renderMeter?.(meterState) ??
         (strengthMeter && (
            <div
               className={cn(
                  normalizedStrength.display === "block"
                     ? "mt-2 space-y-2"
                     : "mt-1.5 flex flex-col gap-0",
                  meterWrapperClassName,
               )}
               data-slot="password-meter"
            >
               {/* Progress Bar Row */}
               <div
                  className={cn(
                     "flex w-full items-center gap-3",
                     meterContainerClassName,
                  )}
               >
                  <div className="flex-1">
                     {/* Reduced height from h-2 to h-1 */}
                     <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                           className={cn(
                              "h-full transition-all duration-300 ease-out",
                              meterColor(meterState.score),
                              meterBarClassName,
                           )}
                           style={{ width: `${meterState.percent}%` }}
                        />
                     </div>
                  </div>

                  {normalizedStrength.showLabel !== false && (
                     <div
                        className={cn(
                           "min-w-[4rem] text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
                           meterLabelClassName,
                        )}
                     >
                        {meterState.label}
                     </div>
                  )}
               </div>

               {/* New Modern Chips for Rules */}
               {meterStyle === "rules" &&
                  meterState.rules.length > 0 && (
                     <div
                        className={cn(
                           "flex flex-wrap gap-1.5 pt-1",
                           rulesWrapperClassName,
                        )}
                     >
                        {meterState.rules.map((rule) => (
                           <span
                              key={rule.key}
                              className={cn(
                                 "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-200",
                                 rule.passed
                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
                                    : "border-transparent bg-secondary text-muted-foreground",
                                 ruleItemClassName
                              )}
                           >
                              {rule.passed && (
                                 <Check className="h-3 w-3" strokeWidth={3} />
                              )}
                              {rule.label}
                           </span>
                        ))}
                     </div>
                  )}
            </div>
         ))
         : null;

   return (
      <div className={cn("group/password w-full", className)} data-slot="password-field">
         <Input
            ref={ref}
            {...restTextProps}
            type={revealed ? "text" : "password"}
            value={value ?? ""}
            onChange={handleChange}
            maxLength={maxLength}
            autoComplete={autoComplete}
            trailingControl={trailingControl}
            aria-invalid={error ? "true" : undefined}
         />
         {meterNode}
      </div>
   );
});

ShadcnPasswordVariant.displayName = "ShadcnPasswordVariant";

export default ShadcnPasswordVariant;
```

---
#### 51


` File: packages/form-palette/src/presets/shadcn-variants/phone.tsx`  [↑ Back to top](#index)

```tsx
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
```

---
#### 52


` File: packages/form-palette/src/presets/shadcn-variants/radio.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/radio.tsx
// noinspection GrazieInspection

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { buildGroupLayoutClasses } from "@/lib/group-layout";

// Adjust path if your radio group lives elsewhere
import { RadioGroup, RadioGroupItem } from "@/presets/ui/radio-group";
import { globalNormalizeCheckBasedOptions } from "@/lib/normalise-options";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

/**
 * Visual size of the radio UI.
 */
export type RadioSize = "sm" | "md" | "lg";

/**
 * Vertical density of each radio row.
 *
 * Names aligned with your FieldDensity, but local to this variant.
 */
export type RadioDensity = "compact" | "comfortable" | "loose";

/**
 * Layout mode for the group.
 *
 * - "list" → stacked rows
 * - "grid" → CSS grid with `columns`
 */
export type RadioLayoutMode = "list" | "grid";

/**
 * Base radio item shape.
 */
export interface RadioItem<TValue> {
    value: TValue;
    label: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    key?: React.Key;

    /**
     * Option-level renderer (provided by the normaliser).
     * If present, it overrides the variant-level `renderOption` for this item.
     */
    render?: (ctx: RadioRenderOptionContext<TValue>) => React.ReactNode;
}

/**
 * Mapping functions used when TItem is not `RadioItem<TValue>`.
 */
export interface RadioMappers<TItem, TValue> {
    getValue: (item: TItem, index: number) => TValue;
    getLabel: (item: TItem, index: number) => React.ReactNode;
    getDescription?: (item: TItem, index: number) => React.ReactNode;
    isDisabled?: (item: TItem, index: number) => boolean;
    getKey?: (item: TItem, index: number) => React.Key;
}

/**
 * Context passed to a custom renderOption callback.
 */
export interface RadioRenderOptionContext<TValue> {
    item: RadioItem<TValue>;
    index: number;
    selected: boolean;
    disabled: boolean;
    size: RadioSize;
    density: RadioDensity;
    click(): void;
    /**
     * DOM id of this option (tied to the underlying RadioGroupItem).
     */
    optionId?: string;

    /**
     * Prebuilt radio control for convenience.
     * You can ignore this and render your own if you want.
     */
    radio: React.ReactNode;
}

/**
 * UI-specific radio props (independent of VariantBaseProps).
 */
export interface ShadcnRadioUiProps<TItem, TValue> {
    /**
     * Items to render as choices.
     *
     * Can be:
     * - `RadioItem<TValue>[]`, or
     * - any custom TItem[] when used with mapping functions
     *   or optionValue/optionLabel keys.
     * - primitive arrays such as `string[]` or `number[]` (fallback).
     */
    items: readonly TItem[];

    /**
     * Mapping functions for TItem → value/label/etc.
     *
     * Takes precedence over optionValue/optionLabel if provided.
     */
    mappers?: RadioMappers<TItem, TValue>;

    /**
     * Property name on TItem that holds the **value**.
     *
     * Example:
     *   items = [{ id: "free", title: "Free" }]
     *   optionValue = "id"
     */
    optionValue?: keyof TItem | string;

    /**
     * Property name on TItem that holds the **label**.
     *
     * Example:
     *   items = [{ id: "free", title: "Free" }]
     *   optionLabel = "title"
     */
    optionLabel?: keyof TItem | string;

    /**
     * Optional custom renderer for each option.
     *
     * If provided, the default label/description layout is skipped and
     * this function is responsible for rendering the row.
     */
    renderOption?: (ctx: RadioRenderOptionContext<TValue>) => React.ReactNode;

    /**
     * Layout mode for the group.
     * Default: "list".
     */
    layout?: RadioLayoutMode;

    /**
     * Number of columns in grid mode.
     * Default: 2.
     */
    columns?: number;

    /**
     * Gap between items (list rows or grid cells) in px.
     * If omitted, Tailwind gaps/classes can handle spacing.
     */
    itemGapPx?: number;

    /**
     * Visual size of the radios.
     * Default: "md".
     */
    size?: RadioSize;

    /**
     * Vertical density (padding) of each row.
     * Default: "comfortable".
     */
    density?: RadioDensity;

    /**
     * When true, capitalizes the **first letter** of the label
     * (only applied when the label is a string).
     */
    autoCap?: boolean;

    /**
     * ARIA overrides for the group.
     */
    "aria-label"?: string;
    "aria-labelledby"?: string;

    /**
     * Wrapper class for the whole radio group.
     */
    groupClassName?: string;

    /**
     * Extra classes for each radio option row.
     */
    optionClassName?: string;

    /**
     * Extra classes for the option label node.
     */
    labelClassName?: string;

    /**
     * Extra classes for the description text under the label.
     */
    descriptionClassName?: string;
}

/**
 * Full props for the Shadcn-based radio variant.
 */
export type ShadcnRadioVariantProps<
    TValue,
    TItem = RadioItem<TValue>,
> = ShadcnRadioUiProps<TItem, TValue> &
    Pick<
        VariantBaseProps<TValue | undefined>,
        "value" | "onValue" | "error" | "disabled" | "required"
    > & {
        id?: string;
        name?: string;
        className?: string; // alias for groupClassName
        "aria-describedby"?: string;
    };

/**
 * Convenience type for the concrete React component.
 */
export interface ShadcnRadioVariantComponent<
    TValue,
    TItem = RadioItem<TValue>,
> extends React.ForwardRefExoticComponent<
    ShadcnRadioVariantProps<TValue, TItem> & React.RefAttributes<HTMLDivElement>
> {}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function paddingForDensity(density: RadioDensity): string {
    switch (density) {
        case "compact":
            return "py-1.5";
        case "loose":
            return "py-3";
        case "comfortable":
        default:
            return "py-1";
    }
}

function labelTextSize(size: RadioSize): string {
    switch (size) {
        case "sm":
            return "text-xs";
        case "lg":
            return "text-base";
        case "md":
        default:
            return "text-sm";
    }
}

function descriptionTextSize(size: RadioSize): string {
    switch (size) {
        case "sm":
            return "text-[0.7rem]";
        case "lg":
            return "text-sm";
        case "md":
        default:
            return "text-xs";
    }
}

function capitalizeFirst(label: string): string {
    if (!label) return label;
    return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Normalise TItem[] into RadioItem<TValue>[] using one of:
 * - explicit mappers
 * - optionValue/optionLabel keys
 * - native RadioItem fields
 * - primitive arrays (string[] / number[] / boolean[])
 */
function normalizeItems<TItem, TValue>(
    items: readonly TItem[],
    mappers?: RadioMappers<TItem, TValue>,
    optionValueKey?: keyof TItem,
    optionLabelKey?: keyof TItem
): RadioItem<TValue>[] {
    // 1) Full mappers win – most explicit
    if (mappers) {
        return items.map((item, index) => ({
            value: mappers.getValue(item, index),
            label: mappers.getLabel(item, index),
            description: mappers.getDescription
                ? mappers.getDescription(item, index)
                : undefined,
            disabled: mappers.isDisabled
                ? mappers.isDisabled(item, index)
                : false,
            key: mappers.getKey ? mappers.getKey(item, index) : index,
        }));
    }

    // 2) optionValue / optionLabel keys
    if (optionValueKey || optionLabelKey) {
        return items.map((item, index) => {
            return globalNormalizeCheckBasedOptions(
                item as any,
                index,
                optionLabelKey,
                optionValueKey
            );
        });
    }

    // 3) Fallbacks:
    //    - primitive arrays (string[] / number[] / boolean[])
    //    - already-shaped RadioItem<TValue>[]
    return items.map((item, index) => {
        // Primitive → use as both value and label
        if (
            typeof item === "string" ||
            typeof item === "number" ||
            typeof item === "boolean"
        ) {
            const v = item as unknown as TValue;
            return {
                value: v,
                label: String(item),
                description: undefined,
                disabled: false,
                key: index,
            } satisfies RadioItem<TValue>;
        }

        // Assume it's already a RadioItem<TValue>-like object
        return item as unknown as RadioItem<TValue>;
    });
}

/**
 * Shallow-ish equality for values.
 */
function isEqualValue(a: unknown, b: unknown): boolean {
    return Object.is(a, b);
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

const InnerShadcnRadioVariant = <TValue, TItem = RadioItem<TValue>>(
    props: ShadcnRadioVariantProps<TValue, TItem>,
    ref: React.Ref<HTMLDivElement>
) => {
    const {
        // variant base
        value,
        onValue,
        error,
        disabled,
        required,

        // radio UI
        items,
        mappers,
        optionValue,
        optionLabel,
        renderOption,
        layout = "list",
        columns = 2,
        itemGapPx,
        size = "md",
        density = "comfortable",
        autoCap = false,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        name,

        groupClassName,
        optionClassName,
        labelClassName,
        descriptionClassName,

        className, // alias for groupClassName
        id,

        // passthrough to RadioGroup
        ...restGroupProps
    } = props;

    const hasError = !!error;

    const normalized = React.useMemo(
        () =>
            normalizeItems<TItem, TValue>(
                items,
                mappers,
                //@ts-ignore
                optionValue,
                optionLabel
            ),
        [items, mappers, optionValue, optionLabel]
    );

    // Map TValue → string for RadioGroup
    const selectedString = React.useMemo(() => {
        if (value === undefined) return undefined;
        const found = normalized.find((item) =>
            isEqualValue(item.value, value)
        );
        return found ? String(found.value) : undefined;
    }, [normalized, value]);

    const handleSelect = React.useCallback(
        (next: TValue) => {
            if (!onValue || disabled) return;

            const detail: ChangeDetail = {
                source: "variant",
                raw: next,
                nativeEvent: undefined,
                meta: undefined,
            };

            onValue(next, detail);
        },
        [onValue, disabled]
    );

    const handleRadioChange = React.useCallback(
        (raw: string) => {
            const found = normalized.find((item) => String(item.value) === raw);
            if (!found) return;
            handleSelect(found.value);
        },
        [normalized, handleSelect]
    );

    const {
        groupStyle,
        groupClasses,
        baseOptionClass,
        labelClassesBase,
        descriptionClassesBase,
    } = buildGroupLayoutClasses({
        layout,
        columns,
        itemGapPx,
        groupClassName,
        className,
        optionClassName,
        labelClassName,
        descriptionClassName,
        densityPaddingClass: paddingForDensity(density),
        labelTextSizeClass: labelTextSize(size),
        descriptionTextSizeClass: descriptionTextSize(size),
    });

    return (
        <RadioGroup
            ref={ref}
            id={id}
            name={name}
            value={selectedString}
            onValueChange={handleRadioChange}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            className={groupClasses}
            style={groupStyle}
            data-slot="radio-group"
            {...restGroupProps}
        >
            {normalized.map((item, index) => {
                const itemString = String(item.value);
                const selected = selectedString === itemString;
                const optionDisabled = !!disabled || !!item.disabled;
                const optionKey = item.key ?? index;
                const optionId = id ? `${id}-option-${optionKey}` : undefined;

                // Apply autoCap to string labels for display
                let displayItem: RadioItem<TValue> = item;
                if (autoCap && typeof item.label === "string") {
                    displayItem = {
                        ...item,
                        label: capitalizeFirst(item.label),
                    };
                }

                const radioNode = (
                    <RadioGroupItem
                        id={optionId}
                        value={itemString}
                        disabled={optionDisabled}
                        className="mt-1"
                    />
                );

                const renderer = (item as RadioItem<TValue>).render ?? renderOption;

                // Custom renderer path
                if (renderer) {
                    return (
                        <div
                            key={optionKey}
                            data-slot="radio-option"
                            data-checked={selected ? "true" : "false"}
                            data-disabled={optionDisabled ? "true" : "false"}
                            className={baseOptionClass}
                        >
                            {renderer({
                                item: displayItem,
                                index,
                                selected,
                                disabled: optionDisabled,
                                size,
                                density,
                                optionId,
                                click() {
                                    if (optionDisabled) return;
                                    handleSelect(displayItem.value);
                                },
                                radio: radioNode,
                            })}
                        </div>
                    );
                }

                // Default rendering
                return (
                    <div
                        key={optionKey}
                        data-slot="radio-option"
                        data-checked={selected ? "true" : "false"}
                        data-disabled={optionDisabled ? "true" : "false"}
                        className={baseOptionClass}
                    >
                        <label
                            htmlFor={optionId}
                            className="flex cursor-pointer items-start gap-3 w-full"
                        >
                            {radioNode}

                            <div className="flex flex-col min-w-0">
                                <span className={labelClassesBase}>
                                    {displayItem.label}
                                </span>
                                {displayItem.description != null && (
                                    <span className={descriptionClassesBase}>
                                        {displayItem.description}
                                    </span>
                                )}
                            </div>
                        </label>
                    </div>
                );
            })}
        </RadioGroup>
    );
};

/**
 * Concrete Shadcn radio variant component.
 *
 * Cast to a generic-friendly type so TS can still infer TValue/TItem.
 */
export const ShadcnRadioVariant = React.forwardRef(
    InnerShadcnRadioVariant
) as unknown as <TValue, TItem = RadioItem<TValue>>(
    props: ShadcnRadioVariantProps<TValue, TItem> & {
        ref?: React.Ref<HTMLDivElement>;
    }
) => React.ReactElement | null;

export default ShadcnRadioVariant;
```

---
#### 53


` File: packages/form-palette/src/presets/shadcn-variants/select.tsx`  [↑ Back to top](#index)

```tsx
// noinspection DuplicatedCode

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import {
   Select,
   SelectTrigger,
   SelectContent,
   SelectItem,
} from "@/presets/ui/select";
import { Input } from "@/presets/ui/input";
import { Search, X } from "lucide-react";
import { globalNormalizeOptions } from "@/lib/normalise-options";

type SelectPrimitive = string | number;

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type SelectOption =
   | SelectPrimitive
   | {
      label?: React.ReactNode;
      value?: SelectPrimitive;
      description?: React.ReactNode;
      disabled?: boolean;
      [key: string]: any;
   };

type NormalizedSelectItem = {
   key: string;
   value: SelectPrimitive;
   labelNode: React.ReactNode;
   labelText: string;
   description?: React.ReactNode;
   disabled?: boolean;
   icon?: React.ReactNode;
   /** Option-level renderer (falls back to global renderOption) */
   render?: (...args: any[]) => React.ReactNode;
   raw: SelectOption;
};

/**
 * Shadcn-based Select variant.
 */
export interface SelectBaseProps
   extends Pick<
      VariantBaseProps<SelectPrimitive | undefined>,
      "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
   > {
   /**
    * Options for the select.
    *
    * You can pass:
    * - primitives: ["ng", "gh", "ke"]
    * - objects:    [{ label, value, ...extra }]
    */
   options?: SelectOption[];

   /**
    * Automatically capitalise the first letter of the label
    * (when the resolved label is a string).
    */
   autoCap?: boolean;

   /**
    * How to read the label from each option.
    *
    * - string → key on the option object
    * - function → custom mapper
    * - omitted → tries `label`, else String(value)
    */
   optionLabel?: string | ((item: SelectOption) => React.ReactNode);

   /**
    * How to read the value from each option.
    *
    * - string → key on the option object
    * - function → custom mapper
    * - omitted → uses `value`, or `id`, or `key`, or index
    */
   optionValue?: string | ((item: SelectOption) => SelectPrimitive);

   /**
    * Optional description line under the label.
    */
   optionDescription?: string | ((item: SelectOption) => React.ReactNode);

   /**
    * How to determine if an option is disabled.
    */
   optionDisabled?: string | ((item: SelectOption) => boolean);

   /**
    * How to extract an icon for each option.
    *
    * - string → key on the option object (default "icon")
    * - function → custom mapper
    */
   optionIcon?: string | ((item: SelectOption) => React.ReactNode);

   /**
    * How to compute the React key for each option.
    */
   optionKey?: string | ((item: SelectOption, index: number) => React.Key);

   /**
    * Enable inline search inside the dropdown.
    */
   searchable?: boolean;

   /**
    * Placeholder for the search input.
    */
   searchPlaceholder?: string;

   /**
    * Label shown when there are no options available at all.
    *
    * If omitted, falls back to `emptySearchText` or a default message.
    */
   emptyLabel?: React.ReactNode;

   /**
    * Text to show when search yields no results
    * (but there *are* options in general).
    */
   emptySearchText?: React.ReactNode;

   /**
    * Show a small clear button in the trigger when a value is selected.
    */
   clearable?: boolean;

   /**
    * Placeholder when nothing is selected.
    */
   placeholder?: React.ReactNode;

   /**
    * Wrapper class for the whole variant.
    */
   className?: string;

   /**
    * Extra classes for the SelectTrigger.
    */
   triggerClassName?: string;

   /**
    * Extra classes for the SelectContent popover.
    */
   contentClassName?: string;

   /**
    * Custom renderer for each option row.
    */
   renderOption?: (ctx: {
      item: NormalizedSelectItem;
      selected: boolean;
      index: number;
      option: React.ReactNode; // prebuilt <SelectItem> you can wrap
      click(): void
   }) => React.ReactNode;

   /**
    * Custom renderer for the trigger value.
    */
   renderValue?: (ctx: {
      selectedItem: NormalizedSelectItem | null;
      placeholder?: React.ReactNode;
   }) => React.ReactNode;

   // ─────────────────────────────────────────────
   // Icons & controls (mirror text variant concepts)
   // ─────────────────────────────────────────────

   // (moved to default-mode props)

   /**
    * Icons displayed on the right side of the trigger,
    * near the clear button / chevron area.
    */
   trailingIcons?: React.ReactNode[];

   /**
    * Convenience single-icon prop for the left side.
    */
   icon?: React.ReactNode;

   /**
    * Base gap between icons and text.
    * Defaults to 4px-ish via `gap-1`.
    */
   iconGap?: number;

   /**
    * Extra spacing to apply between leading icons and the text.
    */
   leadingIconSpacing?: number;

   /**
    * Extra spacing to apply between trailing icons and the clear button.
    */
   trailingIconSpacing?: number;

   /**
    * Arbitrary React node rendered before the select (e.g. a button).
    */
   leadingControl?: React.ReactNode;

   /**
    * Arbitrary React node rendered after the select (e.g. a button).
    */
   trailingControl?: React.ReactNode;

   /**
    * Extra classes for the leading control wrapper.
    */
   leadingControlClassName?: string;

   /**
    * Extra classes for the trailing control wrapper.
    */
   trailingControlClassName?: string;

   /**
    * If true and there are controls, the select trigger + controls share
    * a single visual box (borders, radius, focus states).
    */
   joinControls?: boolean;

   /**
    * When joinControls is true, whether the box styling extends over controls
    * (true) or controls are visually separate (false).
    */
   extendBoxToControls?: boolean;

   // ─────────────────────────────────────────────
   // Virtual-scroll-ish incremental rendering
   // ─────────────────────────────────────────────

   /**
    * Enable incremental rendering for large option lists.
    *
    * When true, only a page of options is rendered initially,
    * and more are revealed as the user scrolls down.
    */
   virtualScroll?: boolean;

   /**
    * Number of options to render per "page" when virtualScroll is enabled.
    * Default: 50.
    */
   virtualScrollPageSize?: number;

   /**
    * Distance from the bottom (in px) at which the next page loads.
    * Default: 48px.
    */
   virtualScrollThreshold?: number;
}

type SelectDefaultModeProps = {
   mode?: "default";

   // Icons & controls (default mode only)
   leadingIcons?: React.ReactNode[];
   trailingIcons?: React.ReactNode[];
   icon?: React.ReactNode;
   iconGap?: number;
   leadingIconSpacing?: number;
   trailingIconSpacing?: number;

   leadingControl?: React.ReactNode;
   trailingControl?: React.ReactNode;
   leadingControlClassName?: string;
   trailingControlClassName?: string;

   joinControls?: boolean;
   extendBoxToControls?: boolean;

   // Not supported in default mode
   button?: never;
   children?: never;
};

type SelectButtonModeButton =
   | React.ReactNode
   | ((ctx: {
        open: boolean;
        selectedItem: NormalizedSelectItem | null;
        selectedValue: SelectPrimitive | undefined;
        placeholder?: React.ReactNode;
     }) => React.ReactNode);

type SelectButtonModeProps = {
   mode: "button";

   /**
    * Used when mode="button". If provided, this is the trigger.
    * If not provided, `children` is used.
    */
   button?: SelectButtonModeButton;
   children?: SelectButtonModeButton;

   // Icons & controls NOT supported in button mode
   leadingIcons?: never;
   trailingIcons?: never;
   icon?: never;
   iconGap?: never;
   leadingIconSpacing?: never;
   trailingIconSpacing?: never;

   leadingControl?: never;
   trailingControl?: never;
   leadingControlClassName?: never;
   trailingControlClassName?: never;

   joinControls?: never;
   extendBoxToControls?: never;
};

export type ShadcnSelectVariantProps =
   SelectBaseProps & (SelectDefaultModeProps | SelectButtonModeProps);

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────


function normalizeOptions(
   opts: readonly SelectOption[] | undefined,
   config: Pick<
      SelectBaseProps,
      | "autoCap"
      | "optionLabel"
      | "optionValue"
      | "optionDescription"
      | "optionDisabled"
      | "optionKey"
      | "optionIcon"
   >
): NormalizedSelectItem[] {
   return globalNormalizeOptions(opts, config)
}

function triggerHeight(size?: Size) {
   switch (size) {
      case "sm":
         return "h-8 text-xs";
      case "lg":
         return "h-11 text-base";
      default:
         return "h-9 text-sm";
   }
}

function triggerPadding(density?: Density) {
   switch (density) {
      case "compact":
         return "py-1";
      case "loose":
         return "py-2";
      case "comfortable":
      default:
         return "py-1.5";
   }
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnSelectVariant = React.forwardRef<
   HTMLButtonElement,
   ShadcnSelectVariantProps
>(function ShadcnSelectVariant(props, _ref) {
   const {
      value,
      onValue,
      error,
      disabled,
      readOnly,
      size,
      density,

      options,

      autoCap,
      optionLabel,
      optionValue,
      optionDescription,
      optionDisabled,
      optionIcon,
      optionKey,

      searchable,
      searchPlaceholder,

      emptyLabel,
      emptySearchText,

      clearable,

      placeholder,

      className,
      triggerClassName,
      contentClassName,

      renderOption,
      renderValue,

      // Mode
      mode = "default",

      // Icons & controls
      leadingIcons,
      trailingIcons,
      icon,
      iconGap,
      leadingIconSpacing,
      trailingIconSpacing,
      leadingControl,
      trailingControl,
      leadingControlClassName,
      trailingControlClassName,
      joinControls = true,
      extendBoxToControls = true,

      // Button mode only
      button,
      children,

      // Virtual scroll / incremental render
      virtualScroll = false,
      virtualScrollPageSize = 50,
      virtualScrollThreshold = 48,
   } = props;

   const isButtonMode = mode === "button";

   const [open, setOpen] = React.useState(false);
   const [query, setQuery] = React.useState("");

   const items = React.useMemo(
      () =>
         normalizeOptions(options ?? [], {
            autoCap,
            optionLabel,
            optionValue,
            optionDescription,
            optionDisabled,
            optionKey,
            optionIcon,
         }),
      [
         options,
         autoCap,
         optionLabel,
         optionValue,
         optionDescription,
         optionDisabled,
         optionKey,
         optionIcon,
      ]
   );

   const valueMap = React.useMemo(() => {
      const map = new Map<string, SelectPrimitive>();
      for (const item of items) {
         map.set(String(item.value), item.value);
      }
      return map;
   }, [items]);

   const selectedItem =
      value == null
         ? null
         : items.find((it) => it.value === value) ?? null;

   const filteredItems = React.useMemo(() => {
      if (!query) return items;
      const q = query.toLowerCase();
      return items.filter((it) =>
         it.labelText.toLowerCase().includes(q)
      );
   }, [items, query]);

   // ─────────────────────────────────────────────
   // Incremental render state
   // ─────────────────────────────────────────────

   const [visibleCount, setVisibleCount] = React.useState(() =>
      virtualScroll
         ? Math.min(virtualScrollPageSize, filteredItems.length)
         : filteredItems.length
   );

   const listRef = React.useRef<HTMLDivElement | null>(null);

   // Reset visibleCount when list / filter / toggle changes
   React.useEffect(() => {
      if (!virtualScroll) {
         setVisibleCount(filteredItems.length);
         return;
      }

      setVisibleCount(
         Math.min(virtualScrollPageSize, filteredItems.length)
      );
   }, [virtualScroll, filteredItems.length, virtualScrollPageSize]);

   const handleListScroll = React.useCallback(() => {
      if (!virtualScroll) return;
      const el = listRef.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      if (distanceFromBottom <= virtualScrollThreshold) {
         setVisibleCount((prev) => {
            if (prev >= filteredItems.length) return prev;
            const next = prev + virtualScrollPageSize;
            return Math.min(next, filteredItems.length);
         });
      }
   }, [virtualScroll, filteredItems.length, virtualScrollPageSize, virtualScrollThreshold]);

   const renderedItems = React.useMemo(
      () =>
         virtualScroll
            ? filteredItems.slice(0, visibleCount)
            : filteredItems,
      [filteredItems, visibleCount, virtualScroll]
   );

   const handleChange = React.useCallback(
      (rawKey: string) => {
         if (!onValue) return;

         const primitive =
            valueMap.get(rawKey) ??
            (rawKey as unknown as SelectPrimitive);

         const item =
            items.find(
               (it) => String(it.value) === String(primitive)
            ) ?? null;

         const detail: ChangeDetail = {
            source: "variant",
            raw: item?.raw ?? primitive,
            nativeEvent: undefined,
            meta: undefined,
         };

         onValue(primitive, detail);
      },
      [onValue, valueMap, items]
   );

   const currentKey =
      selectedItem != null ? String(selectedItem.value) : "";

   const heightCls = triggerHeight(size as Size | undefined);
   const padCls = triggerPadding(density as Density | undefined);

   const showClear = clearable && value != null;

   // ─────────────────────────────────────────────
   // Icons setup (similar to text variant)
   // ─────────────────────────────────────────────

   const resolvedLeadingIcons: React.ReactNode[] = (() => {
      if (isButtonMode) return [];
      if (leadingIcons && leadingIcons.length) return leadingIcons;
      if (icon) return [icon];
      return [];
   })();

   const resolvedTrailingIcons: React.ReactNode[] = isButtonMode ? [] : (trailingIcons ?? []);

   const baseIconGap = iconGap ?? 4;
   const leadingGap = leadingIconSpacing ?? baseIconGap;
   const trailingGap = trailingIconSpacing ?? baseIconGap;

   const hasLeadingIcons = resolvedLeadingIcons.length > 0;
   const hasTrailingIcons = resolvedTrailingIcons.length > 0;

   const hasLeadingControl = !isButtonMode && !!leadingControl;
   const hasTrailingControl = !isButtonMode && !!trailingControl;
   const hasControls = hasLeadingControl || hasTrailingControl;

   const triggerInner = renderValue ? (
      renderValue({
         selectedItem,
         placeholder,
      })
   ) : selectedItem ? (
      <span className="truncate flex items-center gap-2">
         {selectedItem.icon && (
            <span className="shrink-0">
               {selectedItem.icon}
            </span>
         )}
         <span className="truncate">{selectedItem.labelNode}</span>
      </span>
   ) : (
      <span className="truncate text-muted-foreground">
         {placeholder ?? "Select..."}
      </span>
   );

   const baseBoxClasses = cn(
      "border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs",
      "transition-[color,box-shadow] outline-none",
      "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
   );

   const ButtonModeTrigger = React.useMemo(() => {
      if (!isButtonMode) return null;

      const selectedValue = value as SelectPrimitive | undefined;
      const renderable = button ?? children;

      const content: React.ReactNode = (() => {
         if (typeof renderable === "function") {
            return renderable({
               open,
               selectedItem,
               selectedValue,
               placeholder,
            });
         }

         if (renderable != null) return renderable;

         // Default fallback:
         // - if options have icons, show selected icon (or first icon)
         // - else show simple label
         const iconNode =
            selectedItem?.icon ?? items.find((it) => it.icon)?.icon ?? null;

         if (iconNode) {
            return (
               <span className="inline-flex items-center justify-center">
                  {iconNode}
               </span>
            );
         }

         return (
            <span className="truncate">
               {selectedItem?.labelNode ?? (placeholder ?? "Select...")}
            </span>
         );
      })();

      // Important: SelectTrigger wants a single element child when asChild.
      // Use a button by default to keep it accessible.
      return (
         <button
            ref={_ref}
            type="button"
            disabled={disabled || readOnly}
            className={cn(
               "inline-flex items-center justify-center",
               "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
               triggerClassName
            )}
            aria-label={
               selectedItem?.labelText
                  ? `Selected: ${selectedItem.labelText}`
                  : "Select"
            }
         >
            {content}
         </button>
      );
   }, [
      isButtonMode,
      button,
      children,
      open,
      selectedItem,
      value,
      placeholder,
      items,
      disabled,
      readOnly,
      triggerClassName,
      _ref,
   ]);

   // Trigger content (inner layout: icons + label + clear + trailing icons)
   const TriggerBody = isButtonMode ? (
      <SelectTrigger asChild>{ButtonModeTrigger}</SelectTrigger>
   ) : (
      <SelectTrigger
         onPointerDown={(e) => {
            if (e.target instanceof HTMLButtonElement) {
               if (
                  e.target.getAttribute("data-slot") ==
                  "clear"
               ) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!onValue) return;
                  const detail: ChangeDetail = {
                     source: "variant",
                     raw: undefined,
                     nativeEvent: undefined,
                     meta: { action: "clear" },
                  };
                  onValue(undefined, detail);
               }
            }
         }}
         className={cn(
            "w-full justify-between",
            heightCls,
            padCls,
            hasControls && joinControls && extendBoxToControls
               ? "border-none shadow-none focus:ring-0 focus:outline-none"
               : "",
            triggerClassName
         )}
      >
         <div className="flex w-full items-center justify-between gap-2">
            {/* Left side: leading icons + label */}
            <div className="flex min-w-0 items-center gap-2">
               {hasLeadingIcons && (
                  <span
                     className="flex items-center gap-1 shrink-0"
                     style={{ columnGap: leadingGap }}
                     data-slot="leading-icons"
                  >
                     {resolvedLeadingIcons.map((node, idx) => (
                        <span
                           key={idx}
                           className="flex items-center justify-center"
                        >
                           {node}
                        </span>
                     ))}
                  </span>
               )}
               <div className="min-w-0 flex-1">
                  {triggerInner}
               </div>
            </div>

            {/* Right side: clear button + trailing icons */}
            <div className="flex items-center gap-1 shrink-0">
               {showClear && (
                  <button
                     data-slot={"clear"}
                     type="button"
                     aria-label="Clear selection"
                     className="flex h-4 w-4 items-center justify-center rounded hover:bg-muted"
                  >
                     <X className="h-3 w-3 pointer-events-none" />
                  </button>
               )}

               {hasTrailingIcons && (
                  <span
                     className="flex items-center gap-1"
                     style={{ columnGap: trailingGap }}
                     data-slot="trailing-icons"
                  >
                     {resolvedTrailingIcons.map((node, idx) => (
                        <span
                           key={idx}
                           className="flex items-center justify-center"
                        >
                           {node}
                        </span>
                     ))}
                  </span>
               )}
            </div>
         </div>
      </SelectTrigger>
   );

   const SelectWithTrigger = (
      <Select
         value={currentKey}
         onValueChange={handleChange}
         disabled={disabled || readOnly}
         open={open}
         onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (!nextOpen) setQuery("");
         }}
      >
         {TriggerBody}

         <SelectContent
            className={cn("min-w-32", contentClassName)}
         >
            {searchable && (
               <div className="p-1">
                  <Input
                     autoFocus
                     icon={<Search className="size-4" />}
                     value={query}
                     onChange={(e) =>
                        setQuery(e.target.value)
                     }
                     placeholder={
                        searchPlaceholder ?? "Search..."
                     }
                     size={size}
                     density={density}
                  />
               </div>
            )}

            {/* CASE 1: no options at all */}
            {items.length === 0 ? (
               <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  {emptyLabel ??
                     emptySearchText ??
                     "No options available"}
               </div>
            ) : /* CASE 2: have options, but search filters everything out */ filteredItems.length === 0 ? (
               <div className="px-2 py-1.5 text-xs text-muted-foreground">
                  {emptySearchText ?? "No results found"}
               </div>
            ) : (
               // CASE 3: normal list, possibly virtually paged
               <div
                  ref={listRef}
                  className="max-h-60 overflow-auto"
                  onScroll={handleListScroll}
               >
                  {renderedItems.map((item, index) => {
                     const optionNode = (
                        <SelectItem
                           key={item.key}
                           value={String(item.value)}
                           disabled={item.disabled}
                        >
                           <div className="flex items-start gap-2">
                              {item.icon && (
                                 <span className="mt-0.5 shrink-0">
                                    {item.icon}
                                 </span>
                              )}
                              <div className="flex flex-col">
                                 <span>{item.labelNode}</span>
                                 {item.description && (
                                    <span className="text-xs text-muted-foreground">
                                       {item.description}
                                    </span>
                                 )}
                              </div>
                           </div>
                        </SelectItem>
                       );

                       // Prefer per-option renderer (normalized) if present; fall back to global renderOption
                       const renderer = (item as any).render ?? renderOption;

                       if (!renderer) return optionNode;

                       return renderer({
                          item,
                          selected:
                             selectedItem != null &&
                             String(selectedItem.value) === String(item.value),
                          index,
                          option: optionNode,
                          click() {
                             if (disabled || readOnly || item.disabled) return;
                             handleChange(String(item.value));
                             setOpen(false);
                             setQuery("");
                          },
                       });
                    })}

                  {virtualScroll &&
                     renderedItems.length <
                     filteredItems.length && (
                        <div className="px-2 py-1 text-[10px] text-muted-foreground text-center">
                           Scroll to load more…
                        </div>
                     )}
               </div>
            )}
         </SelectContent>
      </Select>
   );

   // ─────────────────────────────────────────────
   // Layout modes:
   // - no controls
   // - controls + joinControls
   // - controls, separate boxes
   // ─────────────────────────────────────────────

   // CASE 1: button mode OR no controls → just the select
   if (isButtonMode || !hasControls) {
      return (
         <div
            data-slot="select-field"
            className={cn(
               "w-full",
               disabled && "opacity-50 cursor-not-allowed",
               className
            )}
            aria-disabled={disabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            {SelectWithTrigger}
         </div>
      );
   }

   // CASE 2: controls + joinControls → share single box like text variant
   if (joinControls) {
      const groupClassName = cn(
         "flex items-stretch w-full",
         extendBoxToControls &&
         cn(
            "relative",
            baseBoxClasses // ring via :focus-within
         ),
         !extendBoxToControls &&
         "relative border-none shadow-none bg-transparent",
         className
      );

      return (
         <div
            data-slot="select-field"
            className="w-full"
            aria-disabled={disabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            <div
               className={groupClassName}
               data-slot="select-group"
               data-disabled={disabled ? "true" : "false"}
            >
               {hasLeadingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        leadingControlClassName
                     )}
                     data-slot="leading-control"
                  >
                     {leadingControl}
                  </div>
               )}

               <div
                  className={cn(
                     "flex-1 min-w-0 flex items-stretch"
                  )}
                  data-slot="select-region"
               >
                  {SelectWithTrigger}
               </div>

               {hasTrailingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        trailingControlClassName
                     )}
                     data-slot="trailing-control"
                  >
                     {trailingControl}
                  </div>
               )}
            </div>
         </div>
      );
   }

   // CASE 3: controls present, but separate (no joined box)
   return (
      <div
         data-slot="select-field"
         className={cn(
            "flex items-stretch w-full",
            disabled && "opacity-50 cursor-not-allowed",
            className
         )}
         aria-disabled={disabled || undefined}
         aria-invalid={error ? "true" : undefined}
      >
         {hasLeadingControl && (
            <div
               className={cn(
                  "flex items-center mr-1",
                  leadingControlClassName
               )}
               data-slot="leading-control"
            >
               {leadingControl}
            </div>
         )}

         <div className="flex-1 min-w-0">
            {SelectWithTrigger}
         </div>

         {hasTrailingControl && (
            <div
               className={cn(
                  "flex items-center ml-1",
                  trailingControlClassName
               )}
               data-slot="trailing-control"
            >
               {trailingControl}
            </div>
         )}
      </div>
   );
});

ShadcnSelectVariant.displayName = "ShadcnSelectVariant";

export default ShadcnSelectVariant;
```

---
#### 54


` File: packages/form-palette/src/presets/shadcn-variants/slider.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/slider.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Slider } from "@/presets/ui/slider";

type SliderValue = number | undefined;

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export interface ShadcnSliderVariantProps
   extends Pick<
      VariantBaseProps<SliderValue>,
      | "value"
      | "onValue"
      | "error"
      | "disabled"
      | "readOnly"
      | "size"
      | "density"
   > {
   /**
    * Minimum value for the slider.
    * Default: 0
    */
   min?: number;

   /**
    * Maximum value for the slider.
    * Default: 100
    */
   max?: number;

   /**
    * Step between values.
    * Default: 1
    */
   step?: number;

   /**
    * Show the current value as text next to the slider.
    * Default: true
    */
   showValue?: boolean;

   /**
    * Where to place the value label, relative to the slider.
    * - "end"   → right of the slider (horizontal)
    * - "start" → left of the slider
    *
    * Default: "end"
    */
   valuePlacement?: "start" | "end";

   /**
    * Custom formatter for the numeric value.
    * If omitted, uses the raw number.
    */
   formatValue?: (value: SliderValue) => React.ReactNode;

   /**
    * Wrapper class for the entire slider field.
    */
   className?: string;

   /**
    * Extra classes for the Slider root.
    */
   sliderClassName?: string;

   /**
    * Extra classes for the value label.
    */
   valueClassName?: string;

   // ─────────────────────────────────────────────
   // Icons & controls (mirror text / select variants)
   // ─────────────────────────────────────────────

   /**
    * One or more icons displayed inside the slider region, on the left.
    *
    * If not provided and `icon` is set, that single icon
    * is treated as `leadingIcons[0]`.
    */
   leadingIcons?: React.ReactNode[];

   /**
    * Icons displayed on the right side of the slider region
    * (before/after the value label depending on placement).
    */
   trailingIcons?: React.ReactNode[];

   /**
    * Convenience single-icon prop for the left side.
    */
   icon?: React.ReactNode;

   /**
    * Base gap between icons and slider/value.
    * Defaults to 4px-ish via `gap-1`.
    */
   iconGap?: number;

   /**
    * Extra spacing to apply between leading icons and the slider track.
    */
   leadingIconSpacing?: number;

   /**
    * Extra spacing to apply between trailing icons and the value label.
    */
   trailingIconSpacing?: number;

   /**
    * Arbitrary React node rendered before the slider (e.g. a button).
    */
   leadingControl?: React.ReactNode;

   /**
    * Arbitrary React node rendered after the slider (e.g. a button).
    */
   trailingControl?: React.ReactNode;

   /**
    * Extra classes for the leading control wrapper.
    */
   leadingControlClassName?: string;

   /**
    * Extra classes for the trailing control wrapper.
    */
   trailingControlClassName?: string;

   /**
    * If true and there are controls, the slider + controls share
    * a single visual box (borders, radius, focus states).
    * Default: true (to match text/select behaviour).
    */
   joinControls?: boolean;

   /**
    * When joinControls is true, whether the box styling extends over controls
    * (true) or controls are visually separate (false).
    * Default: true.
    */
   extendBoxToControls?: boolean;

   // ─────────────────────────────────────────────
   // Built-in +/- control variants
   // ─────────────────────────────────────────────

   /**
    * Built-in +/- controls around the slider.
    *
    * - "none"  → no built-in step buttons (default)
    * - "boxed" → +/- inside the same frame as the slider
    * - "edge"  → loose layout: "- [ slider ] +"
    */
   controlVariant?: "none" | "boxed" | "edge";

   /**
    * Step used when clicking the +/- controls.
    * Defaults to `step`.
    */
   controlStep?: number;

   /**
    * Custom node for the decrement control. Default: "−".
    */
   controlDecrementIcon?: React.ReactNode;

   /**
    * Custom node for the increment control. Default: "+".
    */
   controlIncrementIcon?: React.ReactNode;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function sliderHeight(size?: Size): string {
   switch (size) {
      case "sm":
         return "h-7 text-xs";
      case "lg":
         return "h-10 text-base";
      case "md":
      default:
         return "h-9 text-sm";
   }
}

function sliderPadding(density?: Density): string {
   switch (density) {
      case "compact":
         return "py-1";
      case "loose":
         return "py-3";
      case "comfortable":
      default:
         return "py-2";
   }
}

function defaultFormatValue(value: SliderValue): React.ReactNode {
   if (value == null) return "—";
   return value;
}

function clampToRange(v: number, min: number, max: number): number {
   if (v < min) return min;
   if (v > max) return max;
   return v;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnSliderVariant = React.forwardRef<
   HTMLDivElement,
   ShadcnSliderVariantProps
>(function ShadcnSliderVariant(props, _ref) {
   const {
      value,
      onValue,
      error,
      disabled,
      readOnly,
      size,
      density,

      min = 0,
      max = 100,
      step = 1,

      showValue = true,
      valuePlacement = "end",
      formatValue,

      className,
      sliderClassName,
      valueClassName,

      // Icons & controls
      leadingIcons,
      trailingIcons,
      icon,
      iconGap,
      leadingIconSpacing,
      trailingIconSpacing,
      leadingControl,
      trailingControl,
      leadingControlClassName,
      trailingControlClassName,
      joinControls = true,
      extendBoxToControls = true,

      // Built-in +/- controls
      controlVariant = "none",
      controlStep,
      controlDecrementIcon,
      controlIncrementIcon,
   } = props;

   const numericValue: number =
      typeof value === "number" ? value : min;

   const isDisabled = !!(disabled || readOnly);

   const handleChange = React.useCallback(
      (vals: number[]) => {
         if (!onValue) return;
         const next = clampToRange(vals[0], min, max);

         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta: undefined,
         };

         onValue(next, detail);
      },
      [onValue, min, max]
   );

   const stepAmount = controlStep ?? step;

   const applyStep = React.useCallback(
      (direction: -1 | 1) => {
         if (!onValue || isDisabled) return;

         const current =
            typeof value === "number" ? value : min;
         const candidate = current + direction * stepAmount;
         const next = clampToRange(candidate, min, max);

         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta: {
               action: direction > 0 ? "increment" : "decrement",
            },
         };

         onValue(next, detail);
      },
      [onValue, value, isDisabled, min, max, stepAmount]
   );

   const heightCls = sliderHeight(size as Size | undefined);
   const paddingCls = sliderPadding(density as Density | undefined);

   const displayValue =
      (formatValue ?? defaultFormatValue)(value ?? numericValue);

   // Icons resolution (same idea as text/select)
   const resolvedLeadingIcons: React.ReactNode[] = (() => {
      if (leadingIcons && leadingIcons.length) return leadingIcons;
      if (icon) return [icon];
      return [];
   })();

   const resolvedTrailingIcons: React.ReactNode[] = trailingIcons ?? [];

   const baseIconGap = iconGap ?? 4;
   const leadingGap = leadingIconSpacing ?? baseIconGap;
   const trailingGap = trailingIconSpacing ?? baseIconGap;

   const hasLeadingIcons = resolvedLeadingIcons.length > 0;
   const hasTrailingIcons = resolvedTrailingIcons.length > 0;

   // Value label
   const valueNode =
      showValue ? (
         <div
            className={cn(
               "text-xs text-muted-foreground whitespace-nowrap",
               valueClassName
            )}
            data-slot="slider-value"
         >
            {displayValue}
         </div>
      ) : null;

   const baseBoxClasses = cn(
      "border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs",
      "transition-[color,box-shadow] outline-none",
      "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
   );

   // ─────────────────────────────────────────────
   // Built-in +/- controls → map to leading/trailingControl
   // ─────────────────────────────────────────────

   let effectiveLeadingControl = leadingControl;
   let effectiveTrailingControl = trailingControl;
   let effectiveJoinControls = joinControls;

   if (controlVariant === "boxed" || controlVariant === "edge") {
      const decLabel =
         controlDecrementIcon ?? <span className="text-base">−</span>;
      const incLabel =
         controlIncrementIcon ?? <span className="text-base">+</span>;

      const decButton = (
         <button
            type="button"
            onClick={() => applyStep(-1)}
            disabled={isDisabled}
            className={cn(
               "inline-flex items-center justify-center px-2 text-sm",
               "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
         >
            {decLabel}
         </button>
      );

      const incButton = (
         <button
            type="button"
            onClick={() => applyStep(1)}
            disabled={isDisabled}
            className={cn(
               "inline-flex items-center justify-center px-2 text-sm",
               "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
         >
            {incLabel}
         </button>
      );

      // Only auto-wire if caller didn't override them.
      if (!effectiveLeadingControl) {
         effectiveLeadingControl = decButton;
      }
      if (!effectiveTrailingControl) {
         effectiveTrailingControl = incButton;
      }

      // Edge variant → loose layout: "- [ slider ] +"
      if (controlVariant === "edge") {
         effectiveJoinControls = false;
      }
   }

   const hasLeadingControl = !!effectiveLeadingControl;
   const hasTrailingControl = !!effectiveTrailingControl;
   const hasControls = hasLeadingControl || hasTrailingControl;

   // Inner slider+icons+value layout (no outer controls)
   const SliderRegion = (
      <div
         className={cn(
            "flex w-full items-center gap-2",
            heightCls,
            paddingCls
         )}
         data-slot="slider-region"
      >
         {/* value before slider */}
         {valuePlacement === "start" && valueNode && (
            <div className="shrink-0 mr-1">{valueNode}</div>
         )}

         {/* leading icons */}
         {hasLeadingIcons && (
            <span
               className="flex items-center gap-1 shrink-0"
               style={{ columnGap: leadingGap }}
               data-slot="leading-icons"
            >
               {resolvedLeadingIcons.map((node, idx) => (
                  <span
                     key={idx}
                     className="flex items-center justify-center"
                  >
                     {node}
                  </span>
               ))}
            </span>
         )}

         {/* slider track */}
         <div className="flex-1 min-w-0" data-slot="slider-track">
            <Slider
               value={[numericValue]}
               onValueChange={handleChange}
               min={min}
               max={max}
               step={step}
               disabled={isDisabled}
               className={cn("w-full", sliderClassName)}
            />
         </div>

         {/* trailing icons */}
         {hasTrailingIcons && (
            <span
               className="flex items-center gap-1 shrink-0"
               style={{ columnGap: trailingGap }}
               data-slot="trailing-icons"
            >
               {resolvedTrailingIcons.map((node, idx) => (
                  <span
                     key={idx}
                     className="flex items-center justify-center"
                  >
                     {node}
                  </span>
               ))}
            </span>
         )}

         {/* value after slider */}
         {valuePlacement === "end" && valueNode && (
            <div className="shrink-0 ml-1">{valueNode}</div>
         )}
      </div>
   );

   // ─────────────────────────────────────────────
   // Layout cases
   // ─────────────────────────────────────────────

   // CASE 1: no controls → just slider region
   if (!hasControls) {
      return (
         <div
            data-slot="slider-field"
            className={cn(
               "w-full flex items-center",
               isDisabled && "opacity-50 cursor-not-allowed",
               className
            )}
            aria-disabled={isDisabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            {SliderRegion}
         </div>
      );
   }

   // CASE 2: controls + joinControls → single shared box (sketch #1: boxed)
   if (effectiveJoinControls) {
      const groupClassName = cn(
         "flex items-stretch w-full",
         extendBoxToControls &&
         cn(
            "relative",
            baseBoxClasses // focus ring via :focus-within
         ),
         !extendBoxToControls &&
         "relative border-none shadow-none bg-transparent",
         className
      );

      return (
         <div
            data-slot="slider-field"
            className="w-full"
            aria-disabled={isDisabled || undefined}
            aria-invalid={error ? "true" : undefined}
         >
            <div
               className={groupClassName}
               data-slot="slider-group"
               data-disabled={isDisabled ? "true" : "false"}
            >
               {hasLeadingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        leadingControlClassName
                     )}
                     data-slot="leading-control"
                  >
                     {effectiveLeadingControl}
                  </div>
               )}

               <div
                  className="flex-1 min-w-0 flex items-stretch"
                  data-slot="slider-region-wrapper"
               >
                  {SliderRegion}
               </div>

               {hasTrailingControl && (
                  <div
                     className={cn(
                        "flex items-center px-2",
                        trailingControlClassName
                     )}
                     data-slot="trailing-control"
                  >
                     {effectiveTrailingControl}
                  </div>
               )}
            </div>
         </div>
      );
   }

   // CASE 3: controls present but separate boxes (sketch #2: edge)
   return (
      <div
         data-slot="slider-field"
         className={cn(
            "flex items-stretch w-full",
            isDisabled && "opacity-50 cursor-not-allowed",
            className
         )}
         aria-disabled={isDisabled || undefined}
         aria-invalid={error ? "true" : undefined}
      >
         {hasLeadingControl && (
            <div
               className={cn(
                  "flex items-center mr-1",
                  leadingControlClassName
               )}
               data-slot="leading-control"
            >
               {effectiveLeadingControl}
            </div>
         )}

         <div
            className="flex-1 min-w-0"
            data-slot="slider-region-outer"
         >
            {SliderRegion}
         </div>

         {hasTrailingControl && (
            <div
               className={cn(
                  "flex items-center ml-1",
                  trailingControlClassName
               )}
               data-slot="trailing-control"
            >
               {effectiveTrailingControl}
            </div>
         )}
      </div>
   );
});

ShadcnSliderVariant.displayName = "ShadcnSliderVariant";

export default ShadcnSliderVariant;
```

---
#### 55


` File: packages/form-palette/src/presets/shadcn-variants/text.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/ui/shadcn-variants/text.tsx
// noinspection GrazieInspection

import * as React from "react";

import { Input } from "@/presets/ui/input";
import type {
    ChangeDetail,
    ExtraFieldProps,
    VariantBaseProps,
} from "@/variants/shared";
import type { InputMaskChangeEvent } from "../ui/input-mask";

type MaskMode = "raw" | "masked";

/**
 * Mask-related props for the Shadcn text variant.
 *
 * These are forwarded to the underlying <Input>, which in turn wires
 * them into the InputMask implementation.
 */
export interface ShadcnTextMaskProps {
    /**
     * Mask pattern – Primereact style.
     * Example: "99/99/9999", "(999) 999-9999"
     */
    mask?: string;

    /**
     * Per-symbol definitions for slots.
     * Kept for future custom engine; not used by the current
     * react-input-mask implementation.
     */
    maskDefinitions?: Record<string, RegExp>;

    /**
     * Character used to visually represent an empty slot.
     * Default: "_".
     */
    slotChar?: string;

    /**
     * If true, when the value is effectively "empty" (no unmasked chars),
     * we emit an empty string "" instead of a fully-masked placeholder.
     *
     * NOTE: This behaviour is implemented in the variant, not Input,
     * so we preserve your existing semantics.
     */
    autoClear?: boolean;

    /**
     * Whether the *model* value is raw or masked.
     *
     * - "raw" or true   → onValue receives unmasked value
     * - "masked" or false/undefined → onValue receives full masked string
     *
     * NOTE: detail.raw is **always** the masked string.
     */
    unmask?: MaskMode | boolean;

    /**
     * Placeholder for future caret-mode logic when we go back
     * to a custom engine. Currently unused, kept for API compatibility.
     */
    maskInsertMode?: "stream" | "caret";
}

/**
 * Extra UI props for the Shadcn text input (pure HTML-level).
 *
 * These are forwarded straight to the underlying <Input />.
 */
export type ShadcnTextUiProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size"
> & {
    /**
     * Extra classes applied only to the *inner* input element
     * (the actual <input>, not the wrapper box).
     */
    inputClassName?: string;

    /**
     * Fixed prefix rendered as part of the input value, NOT as an icon.
     * E.g. "₦", "ID: ".
     *
     * The underlying <Input> will:
     *  - take the model value (without prefix),
     *  - render prefix + value,
     *  - expose the full visible string in event.target.value.
     */
    prefix?: string;

    /**
     * Fixed suffix rendered as part of the input value, NOT as an icon.
     * E.g. "%", "kg".
     */
    suffix?: string;

    /**
     * If true (default), we strip the prefix from the value
     * before emitting it via `onValue`.
     */
    stripPrefix?: boolean;

    /**
     * If true (default), we strip the suffix from the value
     * before emitting it via `onValue`.
     */
    stripSuffix?: boolean;
} & ShadcnTextMaskProps;

/**
 * Props for the Shadcn-based text variant.
 *
 * This is a *form* wrapper around the base <Input />:
 *  - Handles value ↔ ChangeDetail mapping.
 *  - Delegates all visual concerns (masking, affixes, icons, controls,
 *    size, density) to the Input component.
 */
export type ShadcnTextVariantProps = ExtraFieldProps<
    VariantBaseProps<string | undefined>
> & {
    /**
     * If true and there are controls, the input + controls share one box
     * (borders, radius, focus states).
     *
     * Delegated to the underlying <Input />.
     */
    joinControls?: boolean;

    /**
     * When joinControls is true, whether the box styling extends over controls
     * (true) or controls are visually separate (false).
     */
    extendBoxToControls?: boolean;
} & ShadcnTextUiProps;

export const ShadcnTextVariant = React.forwardRef<
    HTMLInputElement,
    ShadcnTextVariantProps & ShadcnTextUiProps
>(function ShadcnTextVariant(props, forwardedRef) {
    const {
        // form-level props
        value,
        onValue,
        disabled,
        readOnly,
        required,
        error,
        size,
        density,

        // extras from VariantBaseProps / ExtraFieldProps
        leadingIcons,
        trailingIcons,
        icon,
        iconGap,
        leadingIconSpacing,
        trailingIconSpacing,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        px,
        py,
        ps,
        pe,
        pb,

        joinControls = true,
        extendBoxToControls = true,

        // masking
        mask,
        maskDefinitions,
        slotChar,
        autoClear,
        unmask,
        maskInsertMode,

        // affixes
        prefix,
        suffix,
        stripPrefix = true,
        stripSuffix = true,

        // visual props
        inputClassName,
        className,
        style,
        ...rest
    } = props;

    const isMasked = Boolean(mask);

    // ─────────────────────────────────────────────
    // Plain change handler (unmasked <Input />)
    // ─────────────────────────────────────────────

    const handlePlainChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const displayed = e.target.value ?? "";

            let modelValue = displayed;

            // strip prefix if configured
            if (prefix && stripPrefix && modelValue.startsWith(prefix)) {
                modelValue = modelValue.slice(prefix.length);
            }

            // strip suffix if configured
            if (suffix && stripSuffix && modelValue.endsWith(suffix)) {
                modelValue = modelValue.slice(
                    0,
                    modelValue.length - suffix.length
                );
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: displayed, // actual visible value (with affixes)
                nativeEvent: e,
                meta: {
                    prefix,
                    suffix,
                    stripPrefix,
                    stripSuffix,
                    model: modelValue,
                },
            };

            onValue?.(modelValue, detail);
        },
        [onValue, prefix, suffix, stripPrefix, stripSuffix]
    );

    // ─────────────────────────────────────────────
    // Masked change handler (InputMask under <Input />)
    // ─────────────────────────────────────────────

    const handleMaskedChange = React.useCallback(
        (e: InputMaskChangeEvent) => {
            const maskedValue = e.value ?? "";

            // Same heuristic as your original variant:
            // "Unmasked" = characters that would normally be accepted by masks.
            const unmaskedInner =
                maskedValue.match(/[0-9A-Za-z]/g)?.join("") ?? "";

            const mode: MaskMode =
                unmask === true || unmask === "raw" ? "raw" : "masked";

            // IMPORTANT: detail.raw is ALWAYS the masked value.
            const detail: ChangeDetail = {
                source: "variant",
                raw: maskedValue,
                nativeEvent: e.originalEvent as any,
                meta: {
                    masked: maskedValue,
                    unmasked: unmaskedInner,
                    mode,
                    prefix,
                    suffix,
                },
            };

            let emitValue = mode === "raw" ? unmaskedInner : maskedValue;

            // autoClear: if nothing "real" was typed, treat as empty.
            if (autoClear && unmaskedInner.length === 0) {
                emitValue = "";
            }

            onValue?.(emitValue, detail);
        },
        [onValue, unmask, autoClear, prefix, suffix]
    );

    // Variant-level "model" is always the raw value you store.
    // The underlying <Input> is responsible for visually applying prefix/suffix
    // or mask literals on top of this model.
    const modelValue = value ?? "";

    return (
        <Input
            ref={forwardedRef}
            // visual & sizing
            className={className}
            style={style}
            size={size as any}
            density={density as any}
            inputClassName={inputClassName}
            // flags
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            aria-invalid={error ? "true" : undefined}
            // masking
            mask={mask}
            maskDefinitions={maskDefinitions}
            slotChar={slotChar}
            autoClear={autoClear}
            unmask={unmask}
            maskInsertMode={maskInsertMode}
            // affixes (value-level, not icons)
            prefix={prefix}
            suffix={suffix}
            stripPrefix={stripPrefix}
            stripSuffix={stripSuffix}
            // icons & controls
            leadingIcons={leadingIcons}
            trailingIcons={trailingIcons}
            icon={icon}
            iconGap={iconGap}
            leadingIconSpacing={leadingIconSpacing}
            trailingIconSpacing={trailingIconSpacing}
            leadingControl={leadingControl}
            trailingControl={trailingControl}
            leadingControlClassName={leadingControlClassName}
            trailingControlClassName={trailingControlClassName}
            joinControls={joinControls}
            extendBoxToControls={extendBoxToControls}
            px={px}
            py={py}
            ps={ps}
            pe={pe}
            pb={pb}
            // value & event mapping
            value={modelValue}
            onChange={
                isMasked
                    ? (handleMaskedChange as any)
                    : (handlePlainChange as any)
            }
            {...rest}
        />
    );
});

ShadcnTextVariant.displayName = "ShadcnTextVariant";

export default ShadcnTextVariant;
```

---
#### 56


` File: packages/form-palette/src/presets/shadcn-variants/textarea.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/textarea.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { Textarea } from "@/presets/ui/textarea";
import type { TextareaProps as UiTextareaProps } from "@/presets/ui/textarea";

type TextareaValue = string | undefined;
type BaseProps = VariantBaseProps<TextareaValue>;

/**
 * Full props for the Shadcn-based textarea variant.
 *
 * - Reuses all UI-level behaviour from `Textarea` (autoResize, upperControl,
 *   leading/trailing controls, icons, size/density, padding knobs, etc.).
 * - Takes over `value` / `onChange` so it can emit through `onValue` with
 *   a `ChangeDetail`.
 */
export interface ShadcnTextareaVariantProps
   extends Omit<UiTextareaProps, "value" | "defaultValue" | "onChange">,
   Pick<BaseProps, "value" | "onValue" | "error"> { }

export const ShadcnTextareaVariant = React.forwardRef<
   HTMLTextAreaElement,
   ShadcnTextareaVariantProps
>(function ShadcnTextareaVariant(props, ref) {
   const {
      value,
      onValue,
      error,
      // everything else goes straight to the UI Textarea
      ...rest
   } = props;

   const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
         const next = event.target.value ?? "";

         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: event,
            meta: undefined,
         };

         // empty string → undefined, same convention as text/chips
         onValue?.(next.length ? next : undefined, detail);
      },
      [onValue],
   );

   return (
      <Textarea
         ref={ref}
         {...rest}
         value={value ?? ""}
         onChange={handleChange}
         aria-invalid={error ? "true" : undefined}
      />
   );
});

ShadcnTextareaVariant.displayName = "ShadcnTextareaVariant";

export default ShadcnTextareaVariant;
```

---
#### 57


` File: packages/form-palette/src/presets/shadcn-variants/toggle-group.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/toggle.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/presets/ui/toggle-group";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/presets/ui/tooltip";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface ToggleOption {
    label: React.ReactNode;
    value: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    tooltip?: React.ReactNode;
    meta?: any;
}

/**
 * Allow primitive options as shorthand:
 * - "free" → { value: "free", label: "free" }
 */
export type ToggleOptionInput = ToggleOption | string | number | boolean;

export interface ShadcnToggleVariantProps
    extends Pick<
        VariantBaseProps<string | string[]>,
        | "value"
        | "onValue"
        | "error"
        | "disabled"
        | "readOnly"
        | "size"
        | "density"
    > {
    /**
     * Options for the toggle group.
     *
     * Can be:
     * - ToggleOption objects
     * - Primitive strings/numbers/booleans (shorthand)
     * - Objects using option* keys (optionValue, optionLabel, etc.)
     */
    options: ToggleOptionInput[];

    multiple?: boolean;
    variant?: "default" | "outline";
    layout?: "horizontal" | "vertical" | "grid";
    gridCols?: number;
    fillWidth?: boolean;

    /**
     * Property name to read the option value from, when using
     * custom option objects.
     *
     * If omitted, falls back to:
     *   - obj.value
     *   - or the primitive itself (for primitive options)
     */
    optionValue?: string;

    /**
     * Property name to read the option label from, when using
     * custom option objects.
     *
     * If omitted, falls back to:
     *   - obj.label
     *   - or String(value)
     */
    optionLabel?: string;

    /**
     * Property name to read an icon node from, when using
     * custom option objects.
     *
     * If omitted, falls back to obj.icon.
     */
    optionIcon?: string;

    /**
     * Property name to read disabled flag from, when using
     * custom option objects.
     *
     * If omitted, falls back to obj.disabled.
     */
    optionDisabled?: string;

    /**
     * Property name to read tooltip content from, when using
     * custom option objects.
     *
     * If omitted, falls back to obj.tooltip.
     */
    optionTooltip?: string;

    /**
     * Property name to read meta from, when using custom option objects.
     *
     * If omitted, falls back to obj.meta.
     */
    optionMeta?: string;

    /**
     * Optional custom renderer for each option.
     * Receives the normalized ToggleOption and selected state.
     */
    renderOption?: (
        option: ToggleOption,
        isSelected: boolean
    ) => React.ReactNode;

    className?: string;

    /** Base class for all items */
    itemClassName?: string;

    /** Class applied ONLY to selected items (overrides/merges with default active styles) */
    activeClassName?: string;

    /**
     * When true, capitalizes the first letter of the label
     * (only applied when the label is a string).
     */
    autoCap?: boolean;

    /**
     * Gap between buttons in pixels.
     *
     * - Applies to both flex (horizontal/vertical) and grid layouts.
     * - If omitted, falls back to Tailwind gap classes.
     */
    gap?: number;
}

// Internal normalized shape, tracking original item
interface NormalizedToggle<T = ToggleOptionInput> {
    ui: ToggleOption;
    raw: T;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function mapSizeToToggleSize(size?: "sm" | "md" | "lg") {
    switch (size) {
        case "sm":
            return "sm";
        case "lg":
            return "lg";
        case "md":
        default:
            return "default";
    }
}

function normalizeValue(
    val: string | string[] | undefined | null,
    multiple: boolean
): string | string[] {
    if (multiple) {
        if (Array.isArray(val)) return val;
        if (typeof val === "string") return [val];
        return [];
    }
    // Single mode
    if (Array.isArray(val)) return val[0] || "";
    return val || "";
}

function capitalizeFirst(label: string): string {
    if (!label) return label;
    return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Normalize a ToggleOptionInput into a full ToggleOption,
 * using option* keys when present.
 *
 * autoCap is only applied to string labels for display.
 */
function normalizeOption(
    input: ToggleOptionInput,
    {
        optionValue,
        optionLabel,
        optionIcon,
        optionDisabled,
        optionTooltip,
        optionMeta,
    }: {
        optionValue?: string;
        optionLabel?: string;
        optionIcon?: string;
        optionDisabled?: string;
        optionTooltip?: string;
        optionMeta?: string;
    },
    autoCap: boolean
): NormalizedToggle {
    const anyInput = input as any;

    // 1) Custom object with option* keys
    if (
        optionValue ||
        optionLabel ||
        optionIcon ||
        optionDisabled ||
        optionTooltip ||
        optionMeta
    ) {
        const rawValue =
            optionValue != null
                ? anyInput[optionValue]
                : (anyInput.value ?? input);
        const value = String(rawValue);

        let label: React.ReactNode;
        if (optionLabel != null) {
            label = anyInput[optionLabel];
        } else if (anyInput.label != null) {
            label = anyInput.label;
        } else {
            label = String(rawValue ?? value);
        }

        if (autoCap && typeof label === "string") {
            label = capitalizeFirst(label);
        }

        const icon =
            optionIcon != null
                ? anyInput[optionIcon]
                : (anyInput.icon ?? undefined);
        const disabled =
            optionDisabled != null
                ? !!anyInput[optionDisabled]
                : !!anyInput.disabled;
        const tooltip =
            optionTooltip != null
                ? anyInput[optionTooltip]
                : (anyInput.tooltip ?? undefined);
        const meta =
            optionMeta != null
                ? anyInput[optionMeta]
                : (anyInput.meta ?? undefined);

        return {
            ui: {
                value,
                label,
                icon,
                disabled,
                tooltip,
                meta,
            },
            raw: input,
        };
    }

    // 2) Primitive shorthand
    if (
        typeof input === "string" ||
        typeof input === "number" ||
        typeof input === "boolean"
    ) {
        const value = String(input);
        let label: React.ReactNode = value;
        if (autoCap && typeof label === "string") {
            label = capitalizeFirst(label);
        }

        return {
            ui: {
                value,
                label,
            },
            raw: input,
        };
    }

    // 3) Already a ToggleOption-like object
    const baseValue = anyInput.value ?? String(anyInput.label ?? "");
    const value = String(baseValue);

    let label: React.ReactNode =
        anyInput.label != null ? anyInput.label : String(value);
    if (autoCap && typeof label === "string") {
        label = capitalizeFirst(label);
    }

    return {
        ui: {
            value,
            label,
            icon: anyInput.icon,
            disabled: !!anyInput.disabled,
            tooltip: anyInput.tooltip,
            meta: anyInput.meta,
        },
        raw: input,
    };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnToggleVariant = React.forwardRef<
    HTMLDivElement,
    ShadcnToggleVariantProps
>(function ShadcnToggleVariant(props, ref) {
    const {
        value,
        onValue,
        disabled,
        readOnly,
        error,
        size = "md",

        options = [],
        multiple = false,
        variant = "default",
        layout = "horizontal",
        gridCols = 2,
        fillWidth: fullWidth = false,

        optionValue,
        optionLabel,
        optionIcon,
        optionDisabled,
        optionTooltip,
        optionMeta,

        renderOption,
        className,
        itemClassName,
        activeClassName,
        autoCap = false,
        gap: itemGapPx,
    } = props;

    const isDisabled = Boolean(disabled || readOnly);
    const toggleSize = mapSizeToToggleSize(size as any);
    const currentValue = normalizeValue(value, multiple);

    const normalizedOptions = React.useMemo(
        () =>
            options.map((opt) =>
                normalizeOption(
                    opt,
                    {
                        optionValue,
                        optionLabel,
                        optionIcon,
                        optionDisabled,
                        optionTooltip,
                        optionMeta,
                    },
                    autoCap
                )
            ),
        [
            options,
            optionValue,
            optionLabel,
            optionIcon,
            optionDisabled,
            optionTooltip,
            optionMeta,
            autoCap,
        ]
    );

    // ─────────────────────────────────────────────
    // Handlers
    // ─────────────────────────────────────────────

    const handleChange = React.useCallback(
        (val: string | string[]) => {
            if (readOnly) return;
            if (!onValue) return;

            let rawSelection:
                | ToggleOptionInput
                | ToggleOptionInput[]
                | undefined;

            if (Array.isArray(val)) {
                const selected = normalizedOptions.filter((entry) =>
                    val.includes(entry.ui.value)
                );
                rawSelection = selected.map((entry) => entry.raw);
            } else {
                const found = normalizedOptions.find(
                    (entry) => entry.ui.value === val
                );
                rawSelection = found?.raw;
            }

            const detail: ChangeDetail = {
                source: "variant",
                raw: rawSelection, // original item(s)
                nativeEvent: undefined,
                meta: { action: "toggle" },
            };

            onValue(val, detail);
        },
        [onValue, readOnly, normalizedOptions]
    );

    // ─────────────────────────────────────────────
    // Layout Logic
    // ─────────────────────────────────────────────

    const layoutClasses = cn(
        layout === "horizontal" && "flex flex-wrap",
        layout === "vertical" && "flex flex-col items-stretch",
        layout === "grid" && "grid",
        fullWidth && "w-full",
        fullWidth && layout === "horizontal" && "[&>*]:flex-1",
        fullWidth && layout === "vertical" && "[&>*]:w-full",
        className
    );

    console.log(layoutClasses, fullWidth, autoCap);
    const groupStyle: React.CSSProperties | undefined = React.useMemo(() => {
        const style: React.CSSProperties = {};

        if (layout === "grid") {
            style.gridTemplateColumns = `repeat(${gridCols}, minmax(0, 1fr))`;
        }

        if (typeof itemGapPx === "number") {
            style.gap = itemGapPx;
        }

        return Object.keys(style).length ? style : undefined;
    }, [layout, gridCols, itemGapPx]);

    // ─────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────

    return (
        <ToggleGroup
            ref={ref}
            type={multiple ? "multiple" : "single"}
            value={currentValue as any}
            onValueChange={handleChange}
            disabled={isDisabled}
            variant={variant}
            size={toggleSize}
            className={layoutClasses}
            style={groupStyle}
            aria-invalid={!!error}
        >
            {normalizedOptions.map(({ ui: opt }) => {
                const isSelected = multiple
                    ? (currentValue as string[]).includes(opt.value)
                    : currentValue === opt.value;

                const contentNode = renderOption ? (
                    renderOption(opt, isSelected)
                ) : (
                    <div className="flex items-center gap-2 truncate">
                        {opt.icon && (
                            <span className="shrink-0">{opt.icon}</span>
                        )}
                        <span className="truncate">{opt.label}</span>
                    </div>
                );

                const itemNode = (
                    <ToggleGroupItem
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                        aria-label={
                            typeof opt.label === "string"
                                ? opt.label
                                : opt.value
                        }
                        className={cn(
                            // Base Transitions
                            "transition-all",

                            // Default Active State (Shadcn defaults)
                            "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",

                            // Error State
                            error &&
                                "border-destructive/50 hover:bg-destructive/10 data-[state=on]:bg-destructive data-[state=on]:text-destructive-foreground",

                            // Variant: Outline specific tweaks
                            variant === "outline" &&
                                layout === "horizontal" &&
                                !fullWidth &&
                                "first:rounded-l-md last:rounded-r-md rounded-none border-l-0 first:border-l",

                            // Layout tweaks
                            fullWidth && "justify-center",

                            // Custom Item Class
                            itemClassName,

                            // Active Class Name (Applied only when selected)
                            isSelected && activeClassName
                        )}
                    >
                        {contentNode}
                    </ToggleGroupItem>
                );

                if (opt.tooltip && !isDisabled) {
                    return (
                        <TooltipProvider key={opt.value} delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    {itemNode}
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{opt.tooltip}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );
                }

                return itemNode;
            })}
        </ToggleGroup>
    );
});

ShadcnToggleVariant.displayName = "ShadcnToggleVariant";
export default ShadcnToggleVariant;
```

---
#### 58


` File: packages/form-palette/src/presets/shadcn-variants/toggle.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/shadcn-variants/toggle.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Switch } from "@/presets/ui/switch"; // adjust path if your Switch lives elsewhere

type ToggleValue = boolean | undefined;
type BaseProps = VariantBaseProps<ToggleValue>;

type Size = "sm" | "md" | "lg";
type Density = "default" | "dense";

/**
 * UI props specific to the Shadcn-based toggle.
 *
 * This uses Switch as the underlying control, but we keep
 * the API surface small and focused.
 */
export interface ShadcnToggleUiProps
   extends Omit<
      React.ComponentProps<typeof Switch>,
      "checked" | "onCheckedChange" | "className"
   > {
   /**
    * Visual size of the switch / text.
    * Default: "md".
    */
   size?: Size;

   /**
    * Row density (vertical padding & gap).
    * Default: "default".
    */
   density?: Density;

   /**
    * Place the switch on the left or right of the state text.
    * Default: "left".
    */
   controlPlacement?: "left" | "right";

   /**
    * Optional state text shown next to the control when ON.
    */
   onText?: React.ReactNode;

   /**
    * Optional state text shown next to the control when OFF.
    */
   offText?: React.ReactNode;

   /**
    * Wrapper class for the whole toggle row.
    */
   className?: string;

   /**
    * Extra classes for the Switch root.
    */
   switchClassName?: string;

   /**
    * Extra classes for the Switch thumb.
    * (Your patched Switch should support thumbClassName.)
    */
   switchThumbClassName?: string;
}

/**
 * Full props for the Shadcn-based toggle variant.
 *
 * We only pick value/onValue/error from the variant base props;
 * everything else (id, disabled, aria-*) flows via Switch props.
 */
export type ShadcnToggleVariantProps = ShadcnToggleUiProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function rowGap(density: Density) {
   return density === "dense" ? "gap-2" : "gap-3";
}

function rowPadding(density: Density) {
   return density === "dense" ? "py-0.5" : "py-1";
}

function textSize(size: Size) {
   if (size === "sm") return "text-sm";
   if (size === "lg") return "text-base";
   return "text-sm";
}

// Map size → Switch track + thumb sizing
function switchRootSize(size: Size) {
   if (size === "sm") return "h-5 w-9";
   if (size === "lg") return "h-7 w-12";
   // default shadcn-ish base
   return "h-[1.15rem] w-8";
}

function switchThumbSize(size: Size) {
   if (size === "sm") return "size-3.5";
   if (size === "lg") return "size-5";
   return "size-4";
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnToggleVariant = React.forwardRef<
   HTMLButtonElement,
   ShadcnToggleVariantProps
>(function ShadcnToggleVariant(props, _ref) {
   const {
      // variant bits
      value,
      onValue,
      error,

      // UI config
      size = "md",
      density = "default",
      controlPlacement = "left",
      onText,
      offText,
      className,
      switchClassName,
      switchThumbClassName,

      // Switch passthroughs
      disabled,
      id,
      "aria-describedby": describedBy,
      ...restSwitchProps
   } = props;

   const checked = !!value;

   const handleToggle = React.useCallback(
      (next: boolean) => {
         const nextVal = !!next;
         const detail: ChangeDetail = {
            source: "variant",
            raw: nextVal,
            nativeEvent: undefined,
            meta: undefined,
         };
         onValue?.(nextVal, detail);
      },
      [onValue],
   );

   const rowCls = cn(
      "flex w-fit items-center",
      rowGap(density),
      rowPadding(density),
   );

   const stateText =
      onText != null || offText != null ? (
         <span
            className={cn("select-none text-muted-foreground", textSize(size))}
         >
            {checked ? onText : offText}
         </span>
      ) : null;

   const switchEl = (
      <Switch
         id={id}
         checked={checked}
         onCheckedChange={handleToggle}
         disabled={disabled}
         aria-describedby={describedBy}
         aria-checked={checked}
         className={cn(switchRootSize(size), switchClassName)}
         thumbClassName={cn(switchThumbSize(size), switchThumbClassName)}
         {...restSwitchProps}
      />
   );

   return (
      <div
         data-slot="toggle-field"
         className={cn(
            "w-fit",
            disabled && "opacity-50 cursor-not-allowed",
            className,
         )}
         aria-disabled={disabled || undefined}
         aria-invalid={error ? "true" : undefined}
      >
         <div className={rowCls}>
            {controlPlacement === "left" ? (
               <>
                  {switchEl}
                  {stateText}
               </>
            ) : (
               <>
                  {stateText}
                  {switchEl}
               </>
            )}
         </div>
      </div>
   );
});

ShadcnToggleVariant.displayName = "ShadcnToggleVariant";

export default ShadcnToggleVariant;
```

---
#### 59


` File: packages/form-palette/src/presets/shadcn-variants/tree-select-types.ts`  [↑ Back to top](#index)

```ts
import React from "react";

export type TreeKey = string | number;
export type TreeValue = TreeKey | TreeKey[] | undefined;

export type TreeSelectOption =
    | TreeKey
    | {
          label?: React.ReactNode;
          value?: TreeKey;
          description?: React.ReactNode;
          disabled?: boolean;
          icon?: React.ReactNode;
          children?: TreeSelectOption[];
          [key: string]: any;
      };

export type NormalizedTreeItem = {
    key: string;
    value: TreeKey;
    labelNode: React.ReactNode;
    labelText: string;
    description?: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
    level: number;
    parentValue?: TreeKey;
    path: TreeKey[]; // ancestors only (not including self)
    hasChildren: boolean;
    children: NormalizedTreeItem[];
    raw: TreeSelectOption;
};
```

---
#### 60


` File: packages/form-palette/src/presets/shadcn-variants/treeselect.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/presets/ui/checkbox";
import { Badge } from "@/presets/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/presets/ui/popover";
import {
    ChevronDown,
    ChevronRight,
    Search,
    X,
    Folder,
    FolderOpen,
    File,
    Check,
} from "lucide-react";
import { normalizeTree, type NormalizedTreeItemWithRender } from "@/lib/normalise-options";
import {
    NormalizedTreeItem,
    TreeKey,
    TreeSelectOption,
    TreeValue,
} from "@/presets/shadcn-variants/tree-select-types";

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function flattenTree(
    nodes: NormalizedTreeItemWithRender[]
): NormalizedTreeItemWithRender[] {
    const result: NormalizedTreeItemWithRender[] = [];
    function recurse(list: NormalizedTreeItemWithRender[]) {
        for (const node of list) {
            result.push(node);
            if (node.children.length) recurse(node.children);
        }
    }
    recurse(nodes);
    return result;
}

function toggleInArray(
    arr: TreeKey[] | undefined,
    key: TreeKey
): TreeKey[] | undefined {
    const list = arr ?? [];
    const idx = list.findIndex((v) => v === key);
    if (idx === -1) return [...list, key];
    const next = [...list];
    next.splice(idx, 1);
    return next.length ? next : undefined;
}

function densityClasses(density?: Density) {
    switch (density) {
        case "compact":
            return {
                triggerPy: "py-1",
                searchPy: "py-2",
                rowPy: "py-1",
                rowGap: "gap-1.5",
            };
        case "loose":
            return {
                triggerPy: "py-2.5",
                searchPy: "py-3",
                rowPy: "py-2",
                rowGap: "gap-2.5",
            };
        default:
            return {
                triggerPy: "py-2",
                searchPy: "py-2.5",
                rowPy: "py-1.5",
                rowGap: "gap-2",
            };
    }
}

function triggerHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "min-h-8 text-xs";
        case "lg":
            return "min-h-11 text-base";
        default:
            return "min-h-9 text-sm";
    }
}

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

type TreeSelectBaseProps = Pick<
    VariantBaseProps<TreeValue>,
    "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> & {
    options?: TreeSelectOption[];

    /**
     * If true, allows multiple selection (checkboxes).
     * If false, allows single selection (no checkboxes, closes on select).
     * Default: true
     */
    multiple?: boolean;

    autoCap?: boolean;
    optionLabel?: string | ((item: TreeSelectOption) => React.ReactNode);
    optionValue?: string | ((item: TreeSelectOption) => TreeKey);
    optionDescription?: string | ((item: TreeSelectOption) => React.ReactNode);
    optionDisabled?: string | ((item: TreeSelectOption) => boolean);
    optionIcon?: string | ((item: TreeSelectOption) => React.ReactNode);
    optionKey?: string | ((item: TreeSelectOption, index: number) => React.Key);

    searchable?: boolean;
    searchPlaceholder?: string;
    emptyLabel?: React.ReactNode;
    emptySearchText?: React.ReactNode;
    clearable?: boolean;
    placeholder?: React.ReactNode;

    className?: string;
    triggerClassName?: string;
    contentClassName?: string;

    renderOption?: (ctx: {
        item: NormalizedTreeItem;
        selected: boolean;
        index: number;
        option: React.ReactNode;
        click(): void;
    }) => React.ReactNode;

    renderValue?: (ctx: {
        selectedItems: NormalizedTreeItem[];
        placeholder?: React.ReactNode;
    }) => React.ReactNode;

    expandAll?: boolean;
    defaultExpandedValues?: TreeKey[];
    leafOnly?: boolean;
};

type TreeSelectDefaultModeProps = {
    mode?: "default";

    // Icons & controls (default mode only)
    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;
    iconGap?: number;
    leadingIconSpacing?: number;
    trailingIconSpacing?: number;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;

    joinControls?: boolean;
    extendBoxToControls?: boolean;

    // Not supported in default mode
    button?: never;
    children?: never;
    selectedBadge?: never;
    selectedBadgeHiddenWhenZero?: never;
    selectedBadgeVariant?: never;
    selectedBadgeClassName?: never;
    selectedBadgePlacement?: never;
};

type TreeSelectButtonModeButton =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          selectedItems: NormalizedTreeItem[];
          selectedCount: number;
      }) => React.ReactNode);

type TreeSelectButtonModeProps = {
    mode: "button";

    /**
     * Used when mode="button". If provided, this is the trigger.
     * If not provided, `children` is used.
     */
    button?: TreeSelectButtonModeButton;

    children?: TreeSelectButtonModeButton;

    /**
     * Selected-count badge (mode="button" only)
     */
    selectedBadge?: boolean;
    selectedBadgeHiddenWhenZero?: boolean;
    selectedBadgeVariant?: BadgeVariant;
    selectedBadgeClassName?: string;
    selectedBadgePlacement?: "end" | "corner";

    // Icons & controls NOT supported in button mode
    leadingIcons?: never;
    trailingIcons?: never;
    icon?: never;
    iconGap?: never;
    leadingIconSpacing?: never;
    trailingIconSpacing?: never;

    leadingControl?: never;
    trailingControl?: never;
    leadingControlClassName?: never;
    trailingControlClassName?: never;

    joinControls?: never;
    extendBoxToControls?: never;
};

export type ShadcnTreeSelectVariantProps = TreeSelectBaseProps &
    (TreeSelectDefaultModeProps | TreeSelectButtonModeProps);

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnTreeSelectVariant = React.forwardRef<
    HTMLButtonElement,
    ShadcnTreeSelectVariantProps
>(function ShadcnTreeSelectVariant(props, ref) {
    const {
        value,
        onValue,
        disabled,
        readOnly,
        size,
        density,

        options,
        multiple = true,

        autoCap,
        optionLabel,
        optionValue,
        optionDescription,
        optionDisabled,
        optionIcon,
        optionKey,

        searchable = true,
        searchPlaceholder,

        emptyLabel,
        emptySearchText,

        clearable = true,
        placeholder,

        className,
        triggerClassName,
        contentClassName,

        renderOption,
        renderValue,

        expandAll = false,
        defaultExpandedValues,
        leafOnly = false,

        // Icons & controls
        leadingIcons,
        trailingIcons,
        icon,
        iconGap,
        leadingIconSpacing,
        trailingIconSpacing,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        joinControls = true,
        extendBoxToControls = true,

        mode = "default",
        button,
        children,

        selectedBadge = true,
        selectedBadgeHiddenWhenZero = true,
        selectedBadgeVariant = "secondary",
        selectedBadgeClassName,
        selectedBadgePlacement = "corner",
    } = props;

    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");

    const isDisabled = disabled || readOnly;
    const d = React.useMemo(
        () => densityClasses(density as Density),
        [density]
    );

    // Normalize tree
    const tree = React.useMemo(
        () =>
            normalizeTree(options ?? [], {
                autoCap,
                optionLabel,
                optionValue,
                optionDescription,
                optionDisabled,
                optionIcon,
                optionKey,
            }),
        [
            options,
            autoCap,
            optionLabel,
            optionValue,
            optionDescription,
            optionDisabled,
            optionIcon,
            optionKey,
        ]
    );

    const allNodesFlat = React.useMemo(() => flattenTree(tree), [tree]);

    // Expanded tracking (derive)
    const computedInitialExpanded = React.useMemo(() => {
        if (expandAll) {
            return new Set<TreeKey>(
                allNodesFlat.filter((n) => n.hasChildren).map((n) => n.value)
            );
        }
        if (defaultExpandedValues?.length) {
            return new Set<TreeKey>(defaultExpandedValues);
        }
        return new Set<TreeKey>();
    }, [expandAll, defaultExpandedValues, allNodesFlat]);

    const [expanded, setExpanded] = React.useState<Set<TreeKey>>(
        computedInitialExpanded
    );

    // Re-sync expanded when inputs/options change
    React.useEffect(() => {
        setExpanded(computedInitialExpanded);
    }, [computedInitialExpanded]);

    const toggleExpanded = React.useCallback((key: TreeKey) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    }, []);

    const displayedNodes = React.useMemo(() => {
        if (query) {
            const q = query.toLowerCase();
            const matchSet = new Set<TreeKey>();

            const checkMatch = (node: NormalizedTreeItem): boolean => {
                const selfMatch = node.labelText.toLowerCase().includes(q);
                const childMatch = node.children.some(checkMatch);
                if (selfMatch || childMatch) {
                    matchSet.add(node.value);
                    node.path.forEach((p) => matchSet.add(p));
                    return true;
                }
                return false;
            };

            tree.forEach(checkMatch);
            return allNodesFlat.filter((n) => matchSet.has(n.value));
        }

        return allNodesFlat.filter((node) => {
            if (node.level === 0) return true;
            for (const ancestorKey of node.path) {
                if (!expanded.has(ancestorKey)) return false;
            }
            return true;
        });
    }, [allNodesFlat, query, tree, expanded]);

    // Selection normalization
    const selectedValues = React.useMemo<TreeKey[]>(() => {
        if (value === undefined || value === null) return [];
        if (Array.isArray(value)) {
            return multiple ? value : value.length ? [value[0] as TreeKey] : [];
        }
        return [value];
    }, [value, multiple]);

    const selectedItems = React.useMemo(
        () =>
            allNodesFlat.filter((node) => selectedValues.includes(node.value)),
        [allNodesFlat, selectedValues]
    );

    const selectedCount = selectedItems.length;

    const handleToggleValue = React.useCallback(
        (item: NormalizedTreeItem) => {
            if (isDisabled) return;

            // In leafOnly mode, parents toggle expansion instead of selection
            if (leafOnly && item.hasChildren) {
                if (!item.disabled) toggleExpanded(item.value);
                return;
            }

            let nextValue: TreeValue;

            if (multiple) {
                nextValue = toggleInArray(selectedValues, item.value);
            } else {
                nextValue = item.value;
                setOpen(false);
            }

            const nextSelectedValues = Array.isArray(nextValue)
                ? nextValue
                : nextValue !== undefined && nextValue !== null
                  ? [nextValue]
                  : [];

            const detail: ChangeDetail = {
                source: "variant",
                raw: item.raw,
                nativeEvent: undefined,
                meta: {
                    toggled: item.value,
                    selectedValues: nextSelectedValues,
                },
            };

            onValue?.(nextValue, detail);
        },
        [
            isDisabled,
            leafOnly,
            multiple,
            selectedValues,
            onValue,
            toggleExpanded,
        ]
    );

    const handleClear = React.useCallback(() => {
        if (!onValue) return;
        const detail: ChangeDetail = {
            source: "variant",
            raw: undefined,
            nativeEvent: undefined,
            meta: { action: "clear" },
        };
        onValue(undefined, detail);
    }, [onValue]);

    const resolvedLeadingIcons =
        leadingIcons && leadingIcons.length ? leadingIcons : icon ? [icon] : [];
    const resolvedTrailingIcons = trailingIcons ?? [];
    const baseIconGap = iconGap ?? 4;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const hasLeadingControl = !!leadingControl;
    const hasTrailingControl = !!trailingControl;
    const hasControls = hasLeadingControl || hasTrailingControl;

    const showClear =
        mode === "default" &&
        clearable &&
        !isDisabled &&
        selectedValues.length > 0;

    // ─────────────────────────────────────────────
    // Trigger rendering
    // ─────────────────────────────────────────────

    const renderDefaultTriggerContent = () => {
        if (!selectedItems.length) {
            return (
                <span className="text-muted-foreground">
                    {placeholder ?? "Select..."}
                </span>
            );
        }

        if (!multiple && selectedItems.length === 1) {
            return (
                <span className="text-foreground">
                    {selectedItems[0].labelNode}
                </span>
            );
        }

        if (selectedItems.length <= 3) {
            return (
                <div className="flex flex-wrap gap-1">
                    {selectedItems.map((item) => (
                        <Badge
                            key={item.key}
                            variant="secondary"
                            className="px-1.5 h-5 text-[10px] font-medium border-border/50 bg-secondary/50"
                        >
                            {item.labelNode}
                        </Badge>
                    ))}
                </div>
            );
        }

        return (
            <div className="flex items-center gap-1">
                <Badge
                    variant="secondary"
                    className="px-1.5 h-5 text-[10px] bg-secondary/50"
                >
                    {selectedItems.length} selected
                </Badge>
            </div>
        );
    };

    const triggerContent = renderValue
        ? renderValue({ selectedItems, placeholder })
        : renderDefaultTriggerContent();

    const baseBoxClasses = cn(
        "flex items-center justify-between border-input w-full min-w-0 rounded-md border bg-background text-sm shadow-xs ring-offset-background",
        "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive",
        d.triggerPy
    );

    const DefaultTriggerButton = (
        <button
            ref={ref}
            type="button"
            disabled={isDisabled}
            className={cn(
                triggerHeight(size as Size),
                hasControls && extendBoxToControls
                    ? "border-none shadow-none focus:outline-none bg-transparent w-full text-left"
                    : baseBoxClasses,
                triggerClassName
            )}
        >
            <div className="flex w-full items-center justify-between gap-2 overflow-hidden">
                <div className="flex flex-1 items-center gap-2 overflow-hidden">
                    {resolvedLeadingIcons.length > 0 && (
                        <span
                            className="flex items-center shrink-0"
                            style={{ columnGap: leadingGap }}
                        >
                            {resolvedLeadingIcons.map((node, idx) => (
                                <span key={idx}>{node}</span>
                            ))}
                        </span>
                    )}
                    <div className="truncate w-full text-left">
                        {triggerContent}
                    </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    {showClear && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClear();
                            }}
                            className="text-muted-foreground hover:text-foreground p-0.5 rounded-sm hover:bg-muted transition-colors"
                            aria-label="Clear selection"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}

                    {resolvedTrailingIcons.length > 0 && (
                        <span
                            className="flex items-center"
                            style={{ columnGap: trailingGap }}
                        >
                            {resolvedTrailingIcons.map((node, idx) => (
                                <span key={idx}>{node}</span>
                            ))}
                        </span>
                    )}

                    <ChevronDown className="h-4 w-4 opacity-50" />
                </div>
            </div>
        </button>
    );

    const ButtonModeTrigger = React.useMemo(() => {
        if (mode !== "button") return null;

        const ctx = { open, selectedItems, selectedCount };
        const triggerNode =
            typeof button === "function"
                ? button(ctx)
                : (button ??
                  (typeof children === "function" ? children(ctx) : children));

        const shouldShowBadge =
            Boolean(selectedBadge) &&
            (!selectedBadgeHiddenWhenZero || selectedCount > 0);

        const badgeEl = shouldShowBadge ? (
            <Badge
                variant={selectedBadgeVariant as any}
                className={cn(
                    "text-[10px] h-5 px-1.5 leading-none",
                    selectedBadgePlacement === "corner" &&
                        "absolute -top-2 -right-2",
                    selectedBadgeClassName
                )}
            >
                {selectedCount}
            </Badge>
        ) : null;

        const wrapWithBadge = (inner: React.ReactNode) => {
            if (!badgeEl) return inner;
            if (selectedBadgePlacement === "end") {
                return (
                    <span className="inline-flex items-center gap-2">
                        <span className="min-w-0">{inner}</span>
                        {badgeEl}
                    </span>
                );
            }
            return (
                <span className="relative inline-flex">
                    {inner}
                    {badgeEl}
                </span>
            );
        };

        // If user gave us a real element, use it directly (PopoverTrigger will clone props)
        if (React.isValidElement(triggerNode)) {
            return wrapWithBadge(triggerNode);
        }

        // Fallback: wrap text/anything in a plain button
        return wrapWithBadge(
            <button
                type="button"
                disabled={isDisabled}
                className={cn(triggerClassName)}
            >
                {triggerNode ?? <span>Select…</span>}
            </button>
        );
    }, [
        mode,
        open,
        button,
        children,
        selectedItems,
        selectedCount,
        selectedBadge,
        selectedBadgeHiddenWhenZero,
        selectedBadgeVariant,
        selectedBadgeClassName,
        selectedBadgePlacement,
        isDisabled,
        triggerClassName,
    ]);

    const TriggerNode =
        mode === "button" ? ButtonModeTrigger : DefaultTriggerButton;

    // ─────────────────────────────────────────────
    // Tree Body
    // ─────────────────────────────────────────────

    const TreeBody = (
        <div className="max-h-80 w-full overflow-y-auto overflow-x-hidden py-1">
            {emptyLabel && tree.length === 0 && !query && (
                <div className="px-4 py-3 text-sm text-center text-muted-foreground">
                    {emptyLabel}
                </div>
            )}

            {tree.length > 0 && displayedNodes.length === 0 && (
                <div className="px-4 py-3 text-sm text-center text-muted-foreground">
                    {emptySearchText ?? "No results found"}
                </div>
            )}

            {displayedNodes.map((item, index) => {
                const selected = selectedValues.includes(item.value);
                const isExpanded = expanded.has(item.value);
                const parentInLeafOnly = leafOnly && item.hasChildren;

                const optionNode = (
                    <div
                        className={cn(
                            "relative flex items-center px-2 text-sm outline-none select-none",
                            d.rowGap,
                            d.rowPy,
                            item.disabled
                                ? "opacity-50"
                                : "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                            selected && !multiple && "bg-accent",
                            selected && multiple && "bg-accent/50"
                        )}
                        style={{ paddingLeft: 12 + item.level * 20 }}
                        onClick={(e) => {
                            e.preventDefault();
                            if (!item.disabled) handleToggleValue(item);
                        }}
                    >
                        {/* Guidelines */}
                        {item.level > 0 &&
                            Array.from({ length: item.level }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute border-l border-border/40 h-full top-0"
                                    style={{ left: 19 + i * 20 }}
                                />
                            ))}

                        {/* Expander */}
                        <button
                            type="button"
                            disabled={!!item.disabled || !item.hasChildren}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (item.disabled) return;
                                toggleExpanded(item.value);
                            }}
                            className={cn(
                                "z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                                !item.hasChildren &&
                                    "opacity-0 pointer-events-none"
                            )}
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                        >
                            {isExpanded ? (
                                <ChevronDown className="h-3.5 w-3.5" />
                            ) : (
                                <ChevronRight className="h-3.5 w-3.5" />
                            )}
                        </button>

                        {/* Checkbox (Multi Only, hide for parent nodes in leafOnly mode) */}
                        {multiple && !parentInLeafOnly && (
                            <Checkbox
                                checked={selected}
                                className="shrink-0 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                style={{ pointerEvents: "none" }}
                            />
                        )}

                        {/* Icon */}
                        {item.icon ? (
                            <span className="text-muted-foreground">
                                {item.icon}
                            </span>
                        ) : item.hasChildren ? (
                            isExpanded ? (
                                <FolderOpen className="h-4 w-4 text-blue-400/80 fill-blue-400/20" />
                            ) : (
                                <Folder className="h-4 w-4 text-blue-400/80 fill-blue-400/20" />
                            )
                        ) : (
                            <File className="h-4 w-4 text-muted-foreground/60" />
                        )}

                        {/* Label */}
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="truncate font-medium leading-none">
                                {item.labelNode}
                            </span>
                            {item.description && (
                                <span className="text-xs text-muted-foreground truncate mt-0.5">
                                    {item.description}
                                </span>
                            )}
                        </div>

                        {/* Checkmark (Single Only) */}
                        {!multiple && selected && (
                            <Check className="h-4 w-4 text-primary ml-auto" />
                        )}
                    </div>
                );

                // Prefer per-option renderer (normalized) if present; fall back to global renderOption
                const renderer = (item as any).render ?? renderOption;

                if (!renderer) {
                    return (
                        <React.Fragment key={item.key}>
                            {optionNode}
                        </React.Fragment>
                    );
                }

                const rendered = renderer({
                    item,
                    selected,
                    index,
                    option: optionNode,
                    click() {
                        if (!item.disabled) handleToggleValue(item);
                    },
                });

                return (
                    <React.Fragment key={item.key}>{rendered}</React.Fragment>
                );
            })}
        </div>
    );

    const SelectBody = (
        <Popover
            open={open}
            onOpenChange={(next) => {
                setOpen(next);
                if (!next) setQuery("");
            }}
            modal={true}
        >
            <PopoverTrigger asChild>{TriggerNode as any}</PopoverTrigger>

            <PopoverContent
                className={cn(
                    "p-0 w-(--radix-popover-trigger-width) min-w-75",
                    contentClassName
                )}
                align="start"
            >
                {searchable && (
                    <div
                        className={cn(
                            "flex items-center border-b px-3",
                            d.searchPy
                        )}
                    >
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                            autoFocus
                            className="flex h-4 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder ?? "Search..."}
                        />
                    </div>
                )}
                {TreeBody}
            </PopoverContent>
        </Popover>
    );

    if (!hasControls) {
        return (
            <div
                data-slot="tree-select-field"
                className={cn("w-full", className)}
            >
                {SelectBody}
            </div>
        );
    }

    if (joinControls) {
        return (
            <div
                data-slot="tree-select-field"
                className={cn("w-full", className)}
            >
                <div
                    className={cn(
                        "flex items-center w-full rounded-md border border-input bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background",
                        isDisabled && "opacity-50 cursor-not-allowed bg-muted"
                    )}
                >
                    {hasLeadingControl && (
                        <div
                            className={cn(
                                "pl-3 pr-1 text-muted-foreground",
                                leadingControlClassName
                            )}
                        >
                            {leadingControl}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">{SelectBody}</div>
                    {hasTrailingControl && (
                        <div
                            className={cn(
                                "pr-3 pl-1 text-muted-foreground",
                                trailingControlClassName
                            )}
                        >
                            {trailingControl}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-center gap-2 w-full", className)}>
            {hasLeadingControl && leadingControl}
            <div className="flex-1 min-w-0">{SelectBody}</div>
            {hasTrailingControl && trailingControl}
        </div>
    );
});

ShadcnTreeSelectVariant.displayName = "ShadcnTreeSelectVariant";

export default ShadcnTreeSelectVariant;
```

---
#### 61


` File: packages/form-palette/src/presets/ui/badge.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
```

---
#### 62


` File: packages/form-palette/src/presets/ui/button.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

---
#### 63


` File: packages/form-palette/src/presets/ui/calendar.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/presets/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md"
            : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
```

---
#### 64


` File: packages/form-palette/src/presets/ui/checkbox.tsx`  [↑ Back to top](#index)

```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type TriState = boolean | "none"
type BaseProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

export interface CheckboxProps
  extends Omit<BaseProps, "checked" | "onCheckedChange"> {
  checked?: TriState
  onCheckedChange?: (checked: TriState) => void
  /**
   * Enable tri-state behaviour:
   *  - true  → checked (✓)
   *  - false → partial (−)
   *  - "none" → unchecked (empty)
   */
  tristate?: boolean
}

function Checkbox({
  className,
  checked = false,
  onCheckedChange,
  tristate = false,
  ...props
}: CheckboxProps) {
  // Map our states → Radix checked value
  // - in tri-state mode:
  //   true  → true
  //   false → "indeterminate" (minus)
  //   "none" → false (unchecked)
  // - non-tristate: normal boolean
  const internalChecked: boolean | "indeterminate" =
    tristate
      ? checked === true
        ? true
        : checked === false
          ? "indeterminate"
          : false // "none"
      : checked === true

  const handleCheckedChange: CheckboxPrimitive.CheckboxProps["onCheckedChange"] =
    () => {
      if (!onCheckedChange) return

      if (tristate) {
        // Cycle: "none" (empty) → true (check) → false (minus) → "none"
        const prev: TriState = checked ?? "none"
        const next: TriState =
          prev === "none"
            ? true
            : prev === true
              ? false
              : "none"

        onCheckedChange(next)
      } else {
        // Simple toggle boolean (treat "none" as false)
        const next = checked === true ? false : true
        onCheckedChange(next)
      }
    }

  // Icon mapping:
  // - tri-state:
  //   false → minus
  //   true  → check
  //   "none" → nothing
  // - non-tristate:
  //   true  → check
  //   else → nothing
  const icon = tristate
    ? checked === false
      ? <MinusIcon className="size-3.5" />
      : checked === true
        ? <CheckIcon className="size-3.5" />
        : null
    : checked
      ? <CheckIcon className="size-3.5" />
      : null

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={internalChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs outline-none transition-shadow",
        "dark:bg-input/30",
        // checked & indeterminate share "selected" styling
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {icon}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
```

---
#### 65


` File: packages/form-palette/src/presets/ui/dialog.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
```

---
#### 66


` File: packages/form-palette/src/presets/ui/field.tsx`  [↑ Back to top](#index)

```tsx
import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Label } from "@/presets/ui/label"
import { Separator } from "@/presets/ui/separator"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        ],
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-1 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-1 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn("text-destructive text-sm font-normal", className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
```

---
#### 67


` File: packages/form-palette/src/presets/ui/input-mask.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import { Input } from "@/presets/ui/input";

export interface InputMaskChangeEvent {
   originalEvent: React.SyntheticEvent<HTMLInputElement> | Event | undefined;
   value: string;
   stopPropagation(): void;
   preventDefault(): void;
   target: {
      name?: string;
      id?: string;
      value: string;
   };
}

export interface InputMaskCompleteEvent {
   originalEvent: React.SyntheticEvent<HTMLInputElement> | Event;
   value: string;
}

export interface InputMaskRef {
   focus(): void;
   getElement(): HTMLInputElement | null;
}

export interface InputMaskProps
   extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "onChange" | "value" | "defaultValue"
   > {
   mask: string | null;
   autoClear?: boolean;
   autoFocus?: boolean;
   invalid?: boolean;
   unmask?: boolean;
   slotChar?: string;
   'data-slot'?: string;
   value?: string | null;
   onChange?: (e: InputMaskChangeEvent) => void;
   onComplete?: (e: InputMaskCompleteEvent) => void;
}

const isEmpty = (val: unknown): boolean =>
   val === null || val === undefined || val === "";

const isAndroid = (): boolean =>
   typeof navigator !== "undefined" &&
   /android/i.test(navigator.userAgent || "");

const isIOS = (): boolean =>
   typeof navigator !== "undefined" &&
   /(iphone|ipad|ipod)/i.test(navigator.userAgent || "");

const isChrome = (): boolean =>
   typeof navigator !== "undefined" &&
   /chrome/i.test(navigator.userAgent || "");

const focusEl = (el: HTMLInputElement | null) => {
   if (el && typeof el.focus === "function") {
      el.focus();
   }
};

function useUpdateEffect(effect: React.EffectCallback, deps: React.DependencyList) {
   const mounted = React.useRef(false);

   React.useEffect(() => {
      if (mounted.current) {
         return effect();
      }
      mounted.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, deps);
}

export const InputMask = React.memo(
   React.forwardRef<InputMaskRef, InputMaskProps>((inProps, ref) => {
      // merge defaults with incoming props
      const props = React.useMemo(
         () => ({
            autoClear: true,
            autoFocus: false,
            disabled: false,
            invalid: false,
            readOnly: false,
            required: false,
            slotChar: "_",
            type: "text",
            unmask: false,
            ...inProps,
         }),
         [inProps]
      );

      const elementRef = React.useRef<HTMLInputElement | null>(null);
      const firstNonMaskPos = React.useRef<number | null>(null);
      const lastRequiredNonMaskPos = React.useRef(0);
      const tests = React.useRef<(RegExp | null)[]>([]);
      const buffer = React.useRef<string[]>([]);
      const len = React.useRef(0);
      const oldVal = React.useRef<string | null>(null);
      const focus = React.useRef(false);
      const focusText = React.useRef<string | null>(null);
      const isValueChecked = React.useRef<boolean | null>(null);
      const partialPosition = React.useRef<number | null>(null);
      const defaultBuffer = React.useRef<string | null>(null);
      const caretTimeoutId = React.useRef<number | null>(null);
      const androidChrome = React.useRef(false);

      const caret = (first?: number, last?: number) => {
         let range: any;
         let begin: number | null = null;
         let end: number | null = null;
         const inputEl = elementRef.current;

         if (!inputEl || !inputEl.offsetParent || inputEl !== document.activeElement) {
            return null;
         }

         if (typeof first === "number") {
            begin = first;
            end = typeof last === "number" ? last : begin;

            if (inputEl.setSelectionRange) {
               inputEl.setSelectionRange(begin, end);
            } else if ((inputEl as any).createTextRange) {
               range = (inputEl as any).createTextRange();
               range.collapse(true);
               range.moveEnd("character", end);
               range.moveStart("character", begin);
               range.select();
            }
            //@ts-ignore
         } else if (inputEl.setSelectionRange) {
            begin = inputEl.selectionStart ?? 0;
            end = inputEl.selectionEnd ?? begin;
         } else if ((document as any).selection && (document as any).selection.createRange) {
            range = (document as any).selection.createRange();
            begin = 0 - range.duplicate().moveStart("character", -100000);
            end = begin + range.text.length;
         }

         if (begin === null || end === null) {
            return null;
         }

         return { begin, end };
      };

      const getPlaceholder = React.useCallback(
         (i: number): string => {
            const slotChar = props.slotChar ?? "_";

            if (i < slotChar.length) {
               return slotChar.charAt(i);
            }

            return slotChar.charAt(0);
         },
         [props.slotChar]
      );

      const isCompleted = () => {
         const first = firstNonMaskPos.current ?? 0;

         for (let i = first; i <= lastRequiredNonMaskPos.current; i++) {
            if (tests.current[i] && buffer.current[i] === getPlaceholder(i)) {
               return false;
            }
         }

         return true;
      };

      const getValue = () =>
         props.unmask ? getUnmaskedValue() : elementRef.current?.value ?? "";

      const seekNext = (pos: number) => {
         while (++pos < len.current && !tests.current[pos]) {
            /* loop */
         }
         return pos;
      };

      const seekPrev = (pos: number) => {
         while (--pos >= 0 && !tests.current[pos]) {
            /* loop */
         }
         return pos;
      };

      const shiftL = (begin: number, end: number) => {
         if (begin < 0) {
            return;
         }

         let i: number;
         let j: number;

         for (i = begin, j = seekNext(end); i < len.current; i++) {
            if (tests.current[i]) {
               if (j < len.current && tests.current[i]!.test(buffer.current[j]!)) {
                  buffer.current[i] = buffer.current[j]!;
                  buffer.current[j] = getPlaceholder(j);
               } else {
                  break;
               }

               j = seekNext(j);
            }
         }

         writeBuffer();
         caret(Math.max(firstNonMaskPos.current ?? 0, begin));
      };

      const shiftR = (pos: number) => {
         let i: number;
         let c: string;
         let j: number;
         let t: string;

         for (i = pos, c = getPlaceholder(pos); i < len.current; i++) {
            if (tests.current[i]) {
               j = seekNext(i);
               t = buffer.current[i]!;
               buffer.current[i] = c;
               if (j < len.current && tests.current[j]!.test(t)) {
                  c = t;
               } else {
                  break;
               }
            }
         }
      };

      const clearBuffer = (start: number, end: number) => {
         for (let i = start; i < end && i < len.current; i++) {
            if (tests.current[i]) {
               buffer.current[i] = getPlaceholder(i);
            }
         }
      };

      const writeBuffer = () => {
         if (elementRef.current) {
            elementRef.current.value = buffer.current.join("");
         }
      };

      const checkVal = (allow?: boolean): number => {
         isValueChecked.current = true;

         const test = elementRef.current?.value ?? "";
         let lastMatch = -1;
         let i: number;
         let c: string;
         let pos: number;

         for (i = 0, pos = 0; i < len.current; i++) {
            if (tests.current[i]) {
               buffer.current[i] = getPlaceholder(i);

               while (pos++ < test.length) {
                  c = test.charAt(pos - 1);
                  if (tests.current[i]!.test(c)) {
                     buffer.current[i] = c;
                     lastMatch = i;
                     break;
                  }
               }

               if (pos > test.length) {
                  clearBuffer(i + 1, len.current);
                  break;
               }
            } else {
               if (buffer.current[i] === test.charAt(pos)) {
                  pos++;
               }
               if (i < (partialPosition.current ?? 0)) {
                  lastMatch = i;
               }
            }
         }

         if (allow) {
            writeBuffer();
         } else if (lastMatch + 1 < (partialPosition.current ?? 0)) {
            if (props.autoClear || buffer.current.join("") === defaultBuffer.current) {
               if (elementRef.current && elementRef.current.value) {
                  elementRef.current.value = "";
               }
               clearBuffer(0, len.current);
            } else {
               writeBuffer();
            }
         } else {
            writeBuffer();
            if (elementRef.current) {
               elementRef.current.value = elementRef.current.value.substring(0, lastMatch + 1);
            }
         }

         return partialPosition.current ? i : (firstNonMaskPos.current ?? 0);
      };

      const handleAndroidInput = (e: React.SyntheticEvent<HTMLInputElement>) => {
         const inputEl = elementRef.current;
         if (!inputEl) return;

         const curVal = inputEl.value;
         const pos = caret();
         if (!pos) return;

         if (oldVal.current && oldVal.current.length > curVal.length) {
            // deletion/backspace
            checkVal(true);
            while (pos.begin > 0 && !tests.current[pos.begin - 1]) {
               pos.begin--;
            }
            if (pos.begin === 0) {
               while (
                  pos.begin < (firstNonMaskPos.current ?? 0) &&
                  !tests.current[pos.begin]
               ) {
                  pos.begin++;
               }
            }
            caret(pos.begin, pos.begin);
         } else {
            checkVal(true);
            while (pos.begin < len.current && !tests.current[pos.begin]) {
               pos.begin++;
            }
            caret(pos.begin, pos.begin);
         }

         if (props.onComplete && isCompleted()) {
            props.onComplete({
               originalEvent: e,
               value: getValue(),
            });
         }

         updateModel(e);
      };

      const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
         console.log("InputMask onBlur");
         focus.current = false;
         checkVal();
         updateModel(e);

         if (props.onBlur) {
            props.onBlur(e);
         }

         if (elementRef.current && elementRef.current.value !== focusText.current) {
            const event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, false);
            elementRef.current.dispatchEvent(event);
         }
      };

      const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (props.readOnly) {
            return;
         }

         const k = e.which || e.keyCode;
         let pos: { begin: number; end: number } | null;
         let begin: number;
         let end: number;

         oldVal.current = elementRef.current?.value ?? null;

         // backspace, delete, escape
         if (k === 8 || k === 46 || (isIOS() && k === 127)) {
            pos = caret();
            if (!pos) {
               return;
            }
            begin = pos.begin;
            end = pos.end;

            if (end - begin === 0) {
               begin = k !== 46 ? seekPrev(begin) : (end = seekNext(begin - 1));
               end = k === 46 ? seekNext(end) : end;
            }

            clearBuffer(begin, end);
            shiftL(begin, end - 1);
            updateModel(e as any);
            e.preventDefault();
         } else if (k === 13) {
            // enter
            onBlur(e as any);
            updateModel(e as any);
         } else if (k === 27) {
            // escape
            if (elementRef.current) {
               elementRef.current.value = focusText.current ?? "";
            }
            caret(0, checkVal());
            updateModel(e as any);
            e.preventDefault();
         }
      };

      const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
         if (props.readOnly) {
            return;
         }

         const pos = caret();
         if (!pos) {
            return;
         }

         const k = e.which || e.keyCode;
         let p: number;
         let c: string;
         let next: number;
         let completed = false;

         if (e.ctrlKey || e.altKey || e.metaKey || k < 32) {
            return;
         } else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
               clearBuffer(pos.begin, pos.end);
               shiftL(pos.begin, pos.end - 1);
            }

            p = seekNext(pos.begin - 1);
            if (p < len.current) {
               c = String.fromCharCode(k);
               if (tests.current[p] && tests.current[p]!.test(c)) {
                  shiftR(p);
                  buffer.current[p] = c;
                  writeBuffer();

                  next = seekNext(p);
                  if (isAndroid()) {
                     const proxy = () => caret(next);
                     setTimeout(proxy, 0);
                  } else {
                     caret(next);
                  }

                  if (pos.begin <= lastRequiredNonMaskPos.current) {
                     completed = isCompleted();
                  }
               }
            }

            e.preventDefault();
         }

         updateModel(e as any);

         if (props.onComplete && completed) {
            props.onComplete({
               originalEvent: e,
               value: getValue(),
            });
         }
      };

      const getUnmaskedValue = React.useCallback((): string => {
         const unmaskedBuffer: string[] = [];

         for (let i = 0; i < buffer.current.length; i++) {
            const c = buffer.current[i]!;
            if (tests.current[i] && c !== getPlaceholder(i)) {
               unmaskedBuffer.push(c);
            }
         }

         return unmaskedBuffer.join("");
      }, [getPlaceholder]);

      const updateModel = (e?: React.SyntheticEvent<HTMLInputElement>) => {
         if (!props.onChange) return;

         const val = props.unmask ? getUnmaskedValue() : e && (e.target as HTMLInputElement)?.value;

         const normalized = defaultBuffer.current !== val ? (val ?? "") : "";
         console.log("InputMask updateModel:", { val, normalized });
         const payload: InputMaskChangeEvent = {
            originalEvent: e,
            value: normalized,
            stopPropagation: () => {
               (e as any)?.stopPropagation?.();
            },
            preventDefault: () => {
               (e as any)?.preventDefault?.();
            },
            target: {
               name: props.name,
               id: props.id,
               value: normalized,
            },
         };

         props.onChange(payload);
      };

      const updateValue = (allow?: boolean): number | undefined => {
         let pos: number | undefined;

         if (elementRef.current) {
            if (isEmpty(props.value)) {
               elementRef.current.value = "";
            } else {
               elementRef.current.value = props.value ?? "";
               pos = checkVal(allow);
               setTimeout(() => {
                  if (elementRef.current) {
                     writeBuffer();
                     return checkVal(allow);
                  }
               }, 10);
            }

            focusText.current = elementRef.current.value;
         }

         return pos;
      };

      const isValueUpdated = React.useCallback(() => {
         const elVal = elementRef.current?.value ?? "";
         return props.unmask
            ? (props.value ?? "") !== getUnmaskedValue()
            : defaultBuffer.current !== elVal && elVal !== (props.value ?? "");
      }, [props.unmask, props.value, getUnmaskedValue]);

      const init = () => {
         const mask = props.mask;
         if (!mask) return;

         tests.current = [];
         partialPosition.current = mask.length;
         len.current = mask.length;
         firstNonMaskPos.current = null;

         const defs: Record<string, string> = {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]",
         };

         androidChrome.current = isChrome() && isAndroid();
         const maskTokens = mask.split("");

         for (let i = 0; i < maskTokens.length; i++) {
            const c = maskTokens[i]!;

            if (c === "?") {
               len.current--;
               partialPosition.current = i;
            } else if (defs[c]) {
               tests.current.push(new RegExp(defs[c]!));
               if (firstNonMaskPos.current === null) {
                  firstNonMaskPos.current = tests.current.length - 1;
               }
               if (i < (partialPosition.current ?? 0)) {
                  lastRequiredNonMaskPos.current = tests.current.length - 1;
               }
            } else {
               tests.current.push(null);
            }
         }

         buffer.current = [];

         for (let i = 0; i < maskTokens.length; i++) {
            const c = maskTokens[i]!;
            if (c !== "?") {
               if (defs[c]) {
                  buffer.current.push(getPlaceholder(i));
               } else {
                  buffer.current.push(c);
               }
            }
         }

         defaultBuffer.current = buffer.current.join("");
      };

      const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
         console.log("InputMask onFocus");
         if (props.readOnly) {
            return;
         }

         focus.current = true;
         if (caretTimeoutId.current) {
            window.clearTimeout(caretTimeoutId.current);
         }

         let pos: number;

         if (elementRef.current) {
            focusText.current = elementRef.current.value;
         } else {
            focusText.current = "";
         }

         pos = checkVal() || 0;

         caretTimeoutId.current = window.setTimeout(() => {
            if (elementRef.current !== document.activeElement) {
               return;
            }

            writeBuffer();

            if (props.mask && pos === props.mask.replace("?", "").length) {
               caret(0, pos);
            } else {
               caret(pos);
            }
         }, 100);

         if (props.onFocus) {
            props.onFocus(e);
         }
      };

      const handleInputChange = (
         e: React.FormEvent<HTMLInputElement>,
         isOnPaste = false
      ) => {
         if (props.readOnly) {
            return;
         }

         if (!isOnPaste) {
            const pos = checkVal(true);
            caret(pos);
         }

         updateModel(e as any);

         if (props.onComplete && isCompleted()) {
            props.onComplete({
               originalEvent: e,
               value: getValue(),
            });
         }
      };

      const onInput = (event: React.FormEvent<HTMLInputElement>) => {
         androidChrome.current
            ? handleAndroidInput(event as any)
            : handleInputChange(event);
      };

      React.useImperativeHandle(
         ref,
         () => ({
            focus: () => focusEl(elementRef.current),
            getElement: () => elementRef.current,
         }),
         []
      );

      React.useEffect(() => {
         if (!elementRef.current) return;
      }, []);

      React.useEffect(() => {
         init();
         updateValue();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useUpdateEffect(() => {
         init();
         const pos = updateValue(true);
         if (typeof pos === "number") {
            caret(pos);
         }
         if (props.unmask) {
            updateModel();
         }
      }, [props.mask, props.unmask]);

      useUpdateEffect(() => {
         if (isValueUpdated()) {
            updateValue();
         }
      }, [isValueUpdated]);

      const {
         mask,
         autoClear,
         unmask,
         slotChar,
         onChange,
         onComplete,
         value,
         autoFocus,
         onFocus: i,
         onBlur: j,
         onKeyDown: k,
         onKeyPress: l,
         onInput: m,
         className,
         ...restInputProps
      } = props;

      return (
         <input
            ref={elementRef}
            autoFocus={autoFocus}
            id={props.id}
            name={props.name}
            style={props.style}
            className={className}
            placeholder={props.placeholder}
            size={props.size}
            maxLength={props.maxLength}
            tabIndex={props.tabIndex}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            onInput={onInput}
            onPaste={(e) => handleInputChange(e, true)}
            {...restInputProps}
         />
      );
   })
);

InputMask.displayName = "InputMask";
```

---
#### 68


` File: packages/form-palette/src/presets/ui/input.tsx`  [↑ Back to top](#index)

```tsx
// src/presets/ui/input.tsx
// @ts-nocheck

import * as React from "react";
import { cn } from "@/lib/utils";
import { InputMask } from "../ui/input-mask";

type MaskMode = "raw" | "masked";

// Mask-related props (UI-level only; value semantics are up to callers)
export interface InputMaskProps {
    mask?: string;
    maskDefinitions?: Record<string, RegExp>; // reserved for future engine
    slotChar?: string;
    autoClear?: boolean;
    unmask?: MaskMode | boolean;
    maskInsertMode?: "stream" | "caret";
}

// Prefix / suffix (value-level, NOT icons)
export interface InputAffixProps {
    prefix?: string;
    suffix?: string;

    /**
     * If true (default), we assume the model value does NOT contain the prefix
     * and we only add it visually at render time.
     */
    stripPrefix?: boolean;

    /**
     * If true (default), we assume the model value does NOT contain the suffix
     * and we only add it visually at render time.
     */
    stripSuffix?: boolean;
}

// Icons & controls (pure overlays, like in ShadcnTextVariant)
export interface InputIconControlProps {
    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;

    iconGap?: number;
    leadingIconSpacing?: number;
    trailingIconSpacing?: number;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;

    joinControls?: boolean;
    extendBoxToControls?: boolean;

    px?: number;
    py?: number;
    ps?: number;
    pe?: number;
    pb?: number;

    inputClassName?: string;
}

export interface InputSizeProps {
    size?: "sm" | "md" | "lg" | (string & {});
    density?: "compact" | "normal" | "relaxed" | "dense" | "loose" | (string & {});
}

// ─────────────────────────────────────────────
// KeyFilter support (PrimeReact-style)
// ─────────────────────────────────────────────

export type InputKeyFilter =
    | string
    | RegExp
    | ((
        nextValue: string,
        ctx: {
            event: any;
            currentValue: string;
            input: HTMLInputElement;
        }
    ) => boolean);

export interface InputKeyFilterProps {
    /**
     * Filter that constrains what can be typed / pasted.
     *
     * - string preset: "int" | "num" | "money" | "hex" | "alpha" | "alphanum" | "email"
     * - string pattern: converted to new RegExp(pattern)
     * - RegExp: used directly
     * - function: custom validator
     */
    keyFilter?: InputKeyFilter;

    /**
     * Which keyboard event to hook for filtering:
     * - "keydown"
     * - "keypress" (closest to PrimeReact default)
     * - "beforeinput"
     *
     * Default: "keypress"
     */
    keyFilterOn?: "keydown" | "keypress" | "beforeinput";

    /**
     * Whether to apply keyFilter to paste events.
     * Default: true
     */
    keyFilterOnPaste?: boolean;
}

function cx(...parts: any[]) {
    return cn(...parts);
}

function resolveKeyFilterPattern(filter: string | RegExp | undefined): RegExp | null {
    if (!filter) return null;

    if (filter instanceof RegExp) {
        // remove stateful flags for safety
        const flags = filter.flags.replace("g", "").replace("y", "");
        return new RegExp(filter.source, flags);
    }

    const presets: Record<string, RegExp> = {
        int: /^[+-]?\d*$/,
        num: /^-?\d*(\.\d*)?$/,
        money: /^-?\d*(\.\d{0,2})?$/,
        hex: /^[0-9a-f]*$/i,
        alpha: /^[A-Za-z]*$/,
        alphanum: /^[A-Za-z0-9]*$/,
        email: /^[^\s@]*@?[^\s@]*$/, // lenient while typing
    };

    const preset = presets[filter];
    if (preset) return preset;

    try {
        return new RegExp(filter);
    } catch {
        return null;
    }
}

function runKeyFilter(
    filter: InputKeyFilter | undefined,
    nextValue: string,
    input: HTMLInputElement,
    event: any
): boolean {
    if (!filter) return true;
    // Always allow empty so users can clear the field
    if (nextValue === "") return true;

    if (typeof filter === "function") {
        return filter(nextValue, {
            event,
            currentValue: input.value,
            input,
        });
    }

    const pattern = resolveKeyFilterPattern(filter as any);
    if (!pattern) return true;
    return pattern.test(nextValue);
}

function computeNextFromInsertion(
    input: HTMLInputElement,
    inserted: string
): string {
    const value = input.value ?? "";
    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? start;
    return value.slice(0, start) + inserted + value.slice(end);
}

// Same logic as in ShadcnTextVariant
function resolveBasePadding(size: unknown, density: unknown) {
    let px = 12;
    let py = 4;

    const s = (size as string | undefined) ?? "md";
    const d = (density as string | undefined) ?? "normal";

    if (s === "sm") {
        px = 10;
        py = 3;
    } else if (s === "lg") {
        px = 14;
        py = 5;
    }

    if (d === "dense" || d === "compact") {
        py = Math.max(2, py - 1);
    } else if (d === "relaxed" || d === "loose") {
        py = py + 1;
    }

    return { px, py };
}

// Same logic as in ShadcnTextVariant
function resolveSizeDensityClasses(size: unknown, density: unknown) {
    const s = (size as string | undefined) ?? "md";
    const d = (density as string | undefined) ?? "normal";

    let heightCls = "h-9";
    let textCls = "text-base md:text-sm";

    if (s === "sm") {
        heightCls = "h-8";
        textCls = "text-sm";
    } else if (s === "lg") {
        heightCls = "h-10";
        textCls = "text-base";
    }

    let densityCls = "";
    if (d === "dense" || d === "compact") {
        densityCls = "leading-tight";
    } else if (d === "relaxed" || d === "loose") {
        densityCls = "leading-relaxed";
    }

    return { heightCls, textCls, densityCls };
}

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    InputMaskProps,
    InputAffixProps,
    InputIconControlProps,
    InputSizeProps,
    InputKeyFilterProps { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    function Input(rawProps, forwardedRef) {
        const {
            // base
            className,
            style,
            type,
            disabled,
            readOnly,
            required,

            // size / density
            size = "md",
            density = "normal",

            // mask
            mask,
            maskDefinitions, // reserved
            slotChar,
            autoClear,
            unmask,
            maskInsertMode,

            // affixes (value-level)
            prefix,
            suffix,
            stripPrefix = true,
            stripSuffix = true,

            // icons / controls
            leadingIcons,
            trailingIcons,
            icon,
            iconGap,
            leadingIconSpacing,
            trailingIconSpacing,
            leadingControl,
            trailingControl,
            leadingControlClassName,
            trailingControlClassName,
            joinControls = true,
            extendBoxToControls = true,
            px,
            py,
            ps,
            pe,
            pb,
            inputClassName,

            // key filter
            keyFilter,
            keyFilterOn = "keypress",
            keyFilterOnPaste = true,

            // events
            onChange,
            onFocus,
            onBlur,
            onKeyDown,
            onKeyPress,
            onBeforeInput,
            onPaste,

            // rest of native props (value, defaultValue, placeholder, etc.)
            ...rest
        } = rawProps as InputProps;

        const sizeKey = (size as string | undefined) ?? "md";
        const densityKey = (density as string | undefined) ?? "normal";
        const isMasked = Boolean(mask);

        const innerRef = React.useRef<HTMLInputElement | null>(null);
        React.useImperativeHandle(
            forwardedRef,
            () => innerRef.current as any,
            []
        );

        // Icons ONLY (prefix/suffix are NOT treated as icons)
        const resolvedLeadingIcons: React.ReactNode[] = (() => {
            if (leadingIcons && leadingIcons.length) return leadingIcons;
            if (icon) return [icon];
            return [];
        })();

        const resolvedTrailingIcons: React.ReactNode[] = trailingIcons ?? [];

        const hasLeadingIcons = resolvedLeadingIcons.length > 0;
        const hasTrailingIcons = resolvedTrailingIcons.length > 0;

        const hasLeadingControl = !!leadingControl;
        const hasTrailingControl = !!trailingControl;
        const hasControls = hasLeadingControl || hasTrailingControl;
        const hasIcons = hasLeadingIcons || hasTrailingIcons;
        const hasExtras = hasControls || hasIcons;

        const baseIconGap = iconGap ?? 4;
        const leadingGap = leadingIconSpacing ?? baseIconGap;
        const trailingGap = trailingIconSpacing ?? baseIconGap;

        // Measure icon widths (for padding vars)
        const leadingIconsRef = React.useRef<HTMLDivElement | null>(null);
        const trailingIconsRef = React.useRef<HTMLDivElement | null>(null);

        const [leadingIconsWidth, setLeadingIconsWidth] =
            React.useState<number>(0);
        const [trailingIconsWidth, setTrailingIconsWidth] =
            React.useState<number>(0);

        React.useLayoutEffect(() => {
            if (typeof window === "undefined") return;
            if (typeof ResizeObserver === "undefined") return;

            const leadingEl = leadingIconsRef.current;
            const trailingEl = trailingIconsRef.current;
            if (!leadingEl && !trailingEl) return;

            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const width = entry.contentRect.width;
                    if (entry.target === leadingIconsRef.current) {
                        setLeadingIconsWidth(width);
                    } else if (entry.target === trailingIconsRef.current) {
                        setTrailingIconsWidth(width);
                    }
                }
            });

            if (leadingEl) observer.observe(leadingEl);
            if (trailingEl) observer.observe(trailingEl);

            return () => observer.disconnect();
        }, [hasLeadingIcons, hasTrailingIcons]);

        // Padding vars (same idea as ShadcnTextVariant, feeding into Tailwind
        // utilities on the actual “box” via CSS variables)
        const { px: pxDefault, py: pyDefault } = resolveBasePadding(
            size,
            density
        );

        const extraPx = typeof px === "number" ? px : 0;
        const extraPy = typeof py === "number" ? py : 0;
        const extraPs = typeof ps === "number" ? ps : 0;
        const extraPe = typeof pe === "number" ? pe : 0;
        const extraPb = typeof pb === "number" ? pb : 0;

        let paddingStart = pxDefault + extraPx + extraPs;
        let paddingEnd = pxDefault + extraPx + extraPe;
        const paddingTop = pyDefault + extraPy;
        const paddingBottom = pyDefault + extraPy + extraPb;

        const textGap = baseIconGap;

        if (hasLeadingIcons && leadingIconsWidth > 0) {
            paddingStart += leadingIconsWidth + textGap;
        }
        if (hasTrailingIcons && trailingIconsWidth > 0) {
            paddingEnd += trailingIconsWidth + textGap;
        }

        const varsStyle: React.CSSProperties = {
            ...(style ?? {}),
            "--fp-pl": `${paddingStart}px`,
            "--fp-pr": `${paddingEnd}px`,
            "--fp-pt": `${paddingTop}px`,
            "--fp-pb": `${paddingBottom}px`,
        } as React.CSSProperties;

        const { heightCls, textCls, densityCls } = resolveSizeDensityClasses(
            size,
            density
        );

        // Core “box” classes (border, radius, focus, size/density),
        // WITHOUT padding – padding is applied only on the actual box element.
        const baseBoxClasses = cx(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
            "border-input w-full min-w-0 rounded-md border bg-[var(--surfaces-input,_transparent)] shadow-xs",
            "transition-[color,box-shadow] outline-none",
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            heightCls,
            textCls,
            densityCls
        );

        // Padding classes driven by CSS vars
        const boxPaddingClasses = cx(
            "px-(--fp-pl,--spacing(3)) pr-(--fp-pr,--spacing(3))",
            "pt-(--fp-pt,--spacing(1)) pb-(--fp-pb,--spacing(1))"
        );

        // Inner neutral input (used when the *wrapper* carries the box)
        const innerInputNeutral = cx(
            "w-full min-w-0 bg-transparent border-none shadow-none outline-none",
            "px-0 py-0",
            "focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent",
            "placeholder:text-muted-foreground",
            inputClassName
        );

        const maskMode: MaskMode =
            unmask === true || unmask === "raw" ? "raw" : "masked";

        // Focus handler with prefix/suffix selection logic
        const handleFocus = React.useCallback(
            (event: React.FocusEvent<HTMLInputElement>) => {
                onFocus?.(event);

                if (!prefix && !suffix) return;

                const inputEl = event.currentTarget;
                const inputValue = inputEl.value;
                const prefixLength = (prefix || "").length;
                const suffixLength = (suffix || "").length;
                const end =
                    inputValue.length === 0
                        ? 0
                        : inputValue.length - suffixLength;

                try {
                    inputEl.setSelectionRange(prefixLength, end);
                } catch {
                    // ignore if unsupported
                }
            },
            [onFocus, prefix, suffix]
        );

        const focusInput = () => {
            if (innerRef.current) {
                innerRef.current.focus();
            }
        };

        const handleIconMouseDown = (e: React.MouseEvent) => {
            e.preventDefault();
            focusInput();
        };

        const placeholder =
            typeof mask === "string" && mask
                ? mask
                : (rest as any).placeholder;

        const hasCustomPadding =
            typeof px === "number" ||
            typeof py === "number" ||
            typeof ps === "number" ||
            typeof pe === "number" ||
            typeof pb === "number";

        const hasKeyFilter = !!keyFilter;

        // Key filter wrappers
        const handleKeyDownWrapped = React.useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (
                    hasKeyFilter &&
                    keyFilterOn === "keydown" &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !event.altKey &&
                    event.key &&
                    event.key.length === 1
                ) {
                    const inputEl = event.currentTarget;
                    const nextValue = computeNextFromInsertion(
                        inputEl,
                        event.key
                    );
                    if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                        event.preventDefault();
                        return;
                    }
                }

                onKeyDown?.(event);
            },
            [hasKeyFilter, keyFilterOn, keyFilter, onKeyDown]
        );

        const handleKeyPressWrapped = React.useCallback(
            (event: React.KeyboardEvent<HTMLInputElement>) => {
                if (
                    hasKeyFilter &&
                    keyFilterOn === "keypress" &&
                    !event.ctrlKey &&
                    !event.metaKey &&
                    !event.altKey &&
                    event.key &&
                    event.key.length === 1
                ) {
                    const inputEl = event.currentTarget;
                    const nextValue = computeNextFromInsertion(
                        inputEl,
                        event.key
                    );
                    if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                        event.preventDefault();
                        return;
                    }
                }

                onKeyPress?.(event);
            },
            [hasKeyFilter, keyFilterOn, keyFilter, onKeyPress]
        );

        const handleBeforeInputWrapped = React.useCallback(
            (event: any) => {
                if (
                    hasKeyFilter &&
                    keyFilterOn === "beforeinput" &&
                    event?.nativeEvent
                ) {
                    const inputEl = event.currentTarget as HTMLInputElement;
                    const data = event.nativeEvent.data as string | null;
                    const inputType = event.nativeEvent.inputType as string | null;

                    // We only care about text insertions; deletions/etc. pass through.
                    if (data && inputType && inputType.startsWith("insert")) {
                        const nextValue = computeNextFromInsertion(
                            inputEl,
                            data
                        );
                        if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                            event.preventDefault();
                            return;
                        }
                    }
                }

                onBeforeInput?.(event);
            },
            [hasKeyFilter, keyFilterOn, keyFilter, onBeforeInput]
        );

        const handlePasteWrapped = React.useCallback(
            (event: React.ClipboardEvent<HTMLInputElement>) => {
                if (hasKeyFilter && keyFilterOnPaste) {
                    const pasted =
                        event.clipboardData?.getData("text") ?? "";
                    if (pasted) {
                        const inputEl = event.currentTarget;
                        const nextValue = computeNextFromInsertion(
                            inputEl,
                            pasted
                        );
                        if (!runKeyFilter(keyFilter, nextValue, inputEl, event)) {
                            event.preventDefault();
                            return;
                        }
                    }
                }

                onPaste?.(event);
            },
            [hasKeyFilter, keyFilterOnPaste, keyFilter, onPaste]
        );

        // Core renderer (mask vs plain)
        const renderBaseInput = (extra: {
            className?: string;
            style?: React.CSSProperties;
            inner?: boolean; // false → input is the box; true/undefined → input is inner neutral
        }) => {
            const useInnerNeutral = extra.inner !== false;

            // MASKED: we delegate value semantics to caller.
            if (isMasked && mask) {
                let maskWithAffixes = mask;
                if (prefix) {
                    maskWithAffixes = `${prefix}${maskWithAffixes}`;
                }
                if (suffix) {
                    maskWithAffixes = `${maskWithAffixes}${suffix}`;
                }

                return (
                    //@ts-ignore
                    <InputMask
                        ref={innerRef as any}
                        mask={maskWithAffixes}
                        slotChar={slotChar ?? "_"}
                        unmask={maskMode === "raw"}
                        disabled={disabled}
                        readOnly={readOnly}
                        onChange={onChange as any}
                        onBlur={onBlur as any}
                        onFocus={handleFocus as any}
                        onKeyDown={handleKeyDownWrapped as any}
                        onKeyPress={handleKeyPressWrapped as any}
                        onBeforeInput={handleBeforeInputWrapped as any}
                        onPaste={handlePasteWrapped as any}
                        aria-required={required ? "true" : undefined}
                        data-size={sizeKey}
                        data-density={densityKey}
                        placeholder={placeholder}
                        className={cx(
                            useInnerNeutral ? innerInputNeutral : "",
                            extra.className
                        )}
                        style={extra.style}
                        data-slot="input"
                        {...rest}
                    />
                );
            }

            // PLAIN: value-level prefix/suffix
            const modelValue = (rest.value ??
                rest.defaultValue ??
                "") as string | number | readonly string[];

            let displayValue =
                typeof modelValue === "string"
                    ? modelValue
                    : Array.isArray(modelValue)
                        ? modelValue.join(",")
                        : String(modelValue ?? "");

            if (prefix) {
                const hasPrefix = displayValue.startsWith(prefix);

                if (stripPrefix) {
                    const withoutPrefix = hasPrefix
                        ? displayValue.slice(prefix.length)
                        : displayValue;
                    displayValue = prefix + withoutPrefix;
                } else {
                    displayValue = hasPrefix
                        ? displayValue
                        : prefix + displayValue;
                }
            }

            if (suffix) {
                const hasSuffix = displayValue.endsWith(suffix);

                if (stripSuffix) {
                    const withoutSuffix = hasSuffix
                        ? displayValue.slice(
                            0,
                            displayValue.length - suffix.length
                        )
                        : displayValue;
                    displayValue = withoutSuffix + suffix;
                } else {
                    displayValue = hasSuffix
                        ? displayValue
                        : displayValue + suffix;
                }
            }

            return (
                //@ts-ignore
                <input
                    ref={innerRef}
                    type={type}
                    data-slot="input"
                    className={cx(
                        useInnerNeutral ? innerInputNeutral : "",
                        extra.className
                    )}
                    style={extra.style}
                    disabled={disabled}
                    readOnly={readOnly}
                    aria-required={required ? "true" : undefined}
                    data-size={sizeKey}
                    data-density={densityKey}
                    placeholder={placeholder}
                    value={displayValue}
                    onChange={onChange as any}
                    onBlur={onBlur as any}
                    onFocus={handleFocus}
                    onKeyDown={handleKeyDownWrapped as any}
                    onKeyPress={handleKeyPressWrapped as any}
                    onBeforeInput={handleBeforeInputWrapped as any}
                    onPaste={handlePasteWrapped as any}
                    {...rest}
                />
            );
        };

        // RENDER MODES
        // 1. No controls, no icons → simple input (input is the box)
        if (!hasControls && !hasIcons && !hasCustomPadding) {
            return renderBaseInput({
                inner: false,
                className: cx(baseBoxClasses, boxPaddingClasses, className),
                style: varsStyle,
            });
        }

        // 2. No controls, but icons and/or custom padding → wrapper + box input
        if (!hasControls) {
            return (
                <div
                    className={cx("relative w-full")}
                    style={style}
                    data-slot="input-wrapper"
                    data-has-icons={hasIcons ? "true" : "false"}
                >
                    {renderBaseInput({
                        inner: false,
                        className: cx(baseBoxClasses, boxPaddingClasses, className),
                        style: varsStyle,
                    })}

                    {hasLeadingIcons && (
                        <div
                            ref={leadingIconsRef}
                            className="pointer-events-auto absolute inset-y-0 left-0 flex items-center cursor-pointer"
                            style={{
                                gap: leadingGap,
                                paddingLeft: `${pxDefault}px`,
                            }}
                            data-slot="leading-icons"
                            onMouseDown={handleIconMouseDown}
                        >
                            {resolvedLeadingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </div>
                    )}

                    {hasTrailingIcons && (
                        <div
                            ref={trailingIconsRef}
                            className="pointer-events-auto absolute inset-y-0 right-0 flex items-center cursor-pointer"
                            style={{
                                gap: trailingGap,
                                paddingRight: `${pxDefault}px`,
                            }}
                            data-slot="trailing-icons"
                            onMouseDown={handleIconMouseDown}
                        >
                            {resolvedTrailingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // From here: we have controls → we take over the box.
        // data-slot="input-group" NEVER carries padding; padding is on input-region / input-box.

        const innerInputClassJoined = innerInputNeutral;

        // 3. Joined mode: controls + input share one visual box
        if (hasControls && joinControls) {
            const groupClassName = cx(
                "flex items-stretch w-full overflow-hidden",
                extendBoxToControls && cx("relative", baseBoxClasses), // box is the group
                !extendBoxToControls &&
                "relative border-none shadow-none bg-transparent",
                className
            );

            const inputRegionClassName = cx(
                "relative flex-1 flex items-center min-w-0",
                // When the group isn't the box, the region becomes the box.
                !extendBoxToControls && baseBoxClasses,
                "pl-[var(--fp-pl)] pr-[var(--fp-pr)] pt-[var(--fp-pt)] pb-[var(--fp-pb)]"
            );

            return (
                <div
                    className={groupClassName}
                    style={varsStyle}
                    data-slot="input-group"
                    data-has-extras={hasExtras ? "true" : "false"}
                    data-disabled={disabled ? "true" : "false"}
                    data-size={sizeKey}
                    data-density={densityKey}
                >
                    {hasLeadingControl && (
                        <div
                            className={cx(
                                "flex items-center",
                                leadingControlClassName
                            )}
                            data-slot="leading-control"
                        >
                            {leadingControl}
                        </div>
                    )}

                    <div
                        className={inputRegionClassName}
                        data-slot="input-region"
                    >
                        {renderBaseInput({
                            inner: true,
                            className: innerInputClassJoined,
                            style: undefined,
                        })}

                        {hasLeadingIcons && (
                            <div
                                ref={leadingIconsRef}
                                className="absolute inset-y-0 left-0 flex items-center cursor-pointer"
                                style={{
                                    gap: leadingGap,
                                    paddingLeft: `${pxDefault}px`,
                                }}
                                data-slot="leading-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedLeadingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}

                        {hasTrailingIcons && (
                            <div
                                ref={trailingIconsRef}
                                className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                                style={{
                                    gap: trailingGap,
                                    paddingRight: `${pxDefault}px`,
                                }}
                                data-slot="trailing-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedTrailingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {hasTrailingControl && (
                        <div
                            className={cx(
                                "flex items-center",
                                trailingControlClassName
                            )}
                            data-slot="trailing-control"
                        >
                            {trailingControl}
                        </div>
                    )}
                </div>
            );
        }

        // 4. Separate mode: input box + separate neighbour controls
        const standaloneBoxClassName = cx(
            "relative",
            baseBoxClasses,
            "pl-[var(--fp-pl)] pr-[var(--fp-pr)] pt-[var(--fp-pt)] pb-[var(--fp-pb)]",
            className
        );

        return (
            <div className="flex items-stretch gap-1 w-full">
                {hasLeadingControl && (
                    <div
                        className={cx(
                            "flex items-center",
                            leadingControlClassName
                        )}
                        data-slot="leading-control"
                    >
                        {leadingControl}
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <div
                        className={standaloneBoxClassName}
                        style={varsStyle}
                        data-slot="input-box"
                        data-has-extras={hasExtras ? "true" : "false"}
                        data-disabled={disabled ? "true" : "false"}
                        data-size={sizeKey}
                        data-density={densityKey}
                    >
                        {renderBaseInput({
                            inner: true,
                            className: innerInputNeutral,
                            style: undefined,
                        })}

                        {hasLeadingIcons && (
                            <div
                                ref={leadingIconsRef}
                                className="absolute inset-y-0 left-0 flex items-center cursor-pointer"
                                style={{
                                    gap: leadingGap,
                                    paddingLeft: `${pxDefault}px`,
                                }}
                                data-slot="leading-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedLeadingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}

                        {hasTrailingIcons && (
                            <div
                                ref={trailingIconsRef}
                                className="absolute inset-y-0 right-0 flex items-center cursor-pointer"
                                style={{
                                    gap: trailingGap,
                                    paddingRight: `${pxDefault}px`,
                                }}
                                data-slot="trailing-icons"
                                onMouseDown={handleIconMouseDown}
                            >
                                {resolvedTrailingIcons.map((node, idx) => (
                                    <span
                                        key={idx}
                                        className="flex items-center justify-center"
                                    >
                                        {node}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {hasTrailingControl && (
                    <div
                        className={cx(
                            "flex items-center",
                            trailingControlClassName
                        )}
                        data-slot="trailing-control"
                    >
                        {trailingControl}
                    </div>
                )}
            </div>
        );
    }
);
```

---
#### 69


` File: packages/form-palette/src/presets/ui/label.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
```

---
#### 70


` File: packages/form-palette/src/presets/ui/number.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import { ShadcnTextVariantProps } from "../shadcn-variants/text";
import { FieldSize } from "@/variants/shared";
import { Input } from "./input";
// Adjust this import to your actual text variant path:
//// import { ShadcnTextVariant } from "@/presets/shadcn-variants/text";

type InputRef = HTMLInputElement;

export interface InputNumberValueChangeEvent {
   originalEvent: React.SyntheticEvent<any> | null;
   value: number | null;
   stopPropagation(): void;
   preventDefault(): void;
   target: {
      name?: string | null;
      id?: string | null;
      value: number | null;
   };
}

export interface InputNumberProps
   extends Omit<ShadcnTextVariantProps, 'min' | 'max' | 'value'>, Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      | "value"
      | "defaultValue"
      | "onChange"
      | "onInput"
      | "onKeyDown"
      | "onKeyUp"
      | "size"
      | 'max'
      | 'min'
   > {
   onKeyUp?(event: React.KeyboardEvent<HTMLInputElement>): unknown;
   onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): unknown;
   // Prime-style props we actually use

   value?: number | null;

   /**
    * Emitted when the numeric value changes (Prime-style).
    */
   onValueChange?: (e: InputNumberValueChangeEvent) => void;

   /**
    * Optional simple change handler (numeric value).
    */
   onChange?: (e: { originalEvent: React.SyntheticEvent<any>; value: number | null }) => void;

   locale?: string;
   localeMatcher?: Intl.NumberFormatOptions["localeMatcher"];

   mode?: "decimal" | "currency";
   currency?: string;
   currencyDisplay?: Intl.NumberFormatOptions["currencyDisplay"];

   useGrouping?: boolean;

   minFractionDigits?: number;
   maxFractionDigits?: number;

   roundingMode?: Intl.NumberFormatOptions["roundingMode"];

   min?: number | null;
   max?: number | null;

   step?: number;

   allowEmpty?: boolean;

   format?: boolean;

   inputId?: string;
   inputClassName?: string;
   inputStyle?: React.CSSProperties;
   inputRef?: React.Ref<InputRef> | null;

   /**
    * String prefix/suffix (like Prime). They are part of formatting logic.
    * You can ALSO forward them to your text variant as visual adornments.
    */
   prefix?: string;
   suffix?: string;

   // We keep size as number | undefined to mirror InputText
   size?: FieldSize;

   invalid?: boolean;
}

export const InputNumber = React.memo(
   React.forwardRef<InputRef, InputNumberProps>((inProps, ref) => {
      const props: InputNumberProps = {
         allowEmpty: true,
         autoFocus: false,
         format: true,
         locale: undefined,
         localeMatcher: undefined,
         mode: "decimal",
         useGrouping: true,
         step: 1,
         roundingMode: undefined,
         type: "text",
         ...inProps,
      };

      const [focusedState, setFocusedState] = React.useState(false);

      const elementRef = React.useRef<HTMLSpanElement | null>(null);
      const inputRef = React.useRef<InputRef | null>(null);
      const timer = React.useRef<number | undefined>(undefined);
      const lastValue = React.useRef<string>("");

      const numberFormat = React.useRef<Intl.NumberFormat | null>(null);
      const groupChar = React.useRef<string>("");
      const prefixChar = React.useRef<string>("");
      const suffixChar = React.useRef<string>("");

      const _numeral = React.useRef<RegExp | null>(null);
      const _group = React.useRef<RegExp | null>(null);
      const _minusSign = React.useRef<RegExp | null>(null);
      const _currency = React.useRef<RegExp | null>(null);
      const _decimal = React.useRef<RegExp | null>(null);
      const _decimalSeparator = React.useRef<string>(".");
      const _suffix = React.useRef<RegExp | null>(null);
      const _prefix = React.useRef<RegExp | null>(null);
      const _index = React.useRef<(d: string) => number | undefined>(() => 0);

      const isFocusedByClick = React.useRef(false);

      const resolveLocale = React.useCallback((): string => {
         if (props.locale) return props.locale;
         if (typeof navigator !== "undefined" && navigator.language) {
            return navigator.language;
         }
         return "en-US";
      }, [props.locale]);

      const _locale = resolveLocale();

      const inputMode =
         props.inputMode ||
         (props.mode === "decimal" && !props.minFractionDigits && !props.maxFractionDigits
            ? "numeric"
            : "decimal");

      const getOptions = React.useCallback((): Intl.NumberFormatOptions => {
         return {
            localeMatcher: props.localeMatcher,
            style: props.mode,
            currency: props.currency,
            currencyDisplay: props.currencyDisplay,
            useGrouping: props.useGrouping,
            minimumFractionDigits:
               props.minFractionDigits !== undefined ? props.minFractionDigits : undefined,
            maximumFractionDigits:
               props.maxFractionDigits !== undefined ? props.maxFractionDigits : undefined,
            roundingMode: props.roundingMode,
         };
      }, [
         props.localeMatcher,
         props.mode,
         props.currency,
         props.currencyDisplay,
         props.useGrouping,
         props.minFractionDigits,
         props.maxFractionDigits,
         props.roundingMode,
      ]);

      const escapeRegExp = (text: string): string =>
         text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

      const constructParser = React.useCallback(() => {
         const loc = _locale;
         numberFormat.current = new Intl.NumberFormat(loc, getOptions());

         // numerals
         const numerals = [
            ...new Intl.NumberFormat(loc, { useGrouping: false }).format(9876543210),
         ].reverse();
         const index = new Map<string, number>(numerals.map((d, i) => [d, i]));
         _numeral.current = new RegExp("[" + numerals.join("") + "]", "g");
         _index.current = (d: string) => index.get(d) ?? 0;

         // grouping
         const formatterGroup = new Intl.NumberFormat(loc, { useGrouping: true });
         groupChar.current = formatterGroup
            .format(1000000)
            .trim()
            .replace(_numeral.current, "")
            .charAt(0);
         _group.current = new RegExp("[" + groupChar.current + "]", "g");

         // minus
         const formatterMinus = new Intl.NumberFormat(loc, { useGrouping: false });
         const minusString = formatterMinus
            .format(-1)
            .trim()
            .replace(_numeral.current, "");
         _minusSign.current = new RegExp("[" + minusString + "]", "g");

         // currency
         if (props.currency) {
            const formatterCurrency = new Intl.NumberFormat(loc, {
               style: "currency",
               currency: props.currency,
               currencyDisplay: props.currencyDisplay,
               minimumFractionDigits: 0,
               maximumFractionDigits: 0,
               roundingMode: props.roundingMode,
            });
            _currency.current = new RegExp(
               "[" +
               formatterCurrency
                  .format(1)
                  .replace(/\s/g, "")
                  .replace(_numeral.current, "")
                  .replace(_group.current, "") +
               "]",
               "g"
            );
         } else {
            _currency.current = new RegExp("[]", "g");
         }

         // decimal separator + expression
         const formatterDecimal = new Intl.NumberFormat(loc, {
            useGrouping: false,
         });
         const decSample = formatterDecimal.format(1.1).trim().replace(_numeral.current, "");
         _decimalSeparator.current = decSample || ".";
         const formatterDecOptions = new Intl.NumberFormat(loc, {
            ...getOptions(),
            useGrouping: false,
         });
         _decimal.current = new RegExp(
            "[" +
            formatterDecOptions
               .format(1.1)
               .replace(_currency.current, "")
               .trim()
               .replace(_numeral.current, "") +
            "]",
            "g"
         );

         // prefix
         if (props.prefix) {
            prefixChar.current = props.prefix;
         } else {
            const formatterPrefix = new Intl.NumberFormat(loc, {
               style: props.mode,
               currency: props.currency,
               currencyDisplay: props.currencyDisplay,
            });
            prefixChar.current = formatterPrefix.format(1).split("1")[0];
         }
         _prefix.current = new RegExp(escapeRegExp(prefixChar.current || ""), "g");

         // suffix
         if (props.suffix) {
            suffixChar.current = props.suffix;
         } else {
            const formatterSuffix = new Intl.NumberFormat(loc, {
               style: props.mode,
               currency: props.currency,
               currencyDisplay: props.currencyDisplay,
               minimumFractionDigits: 0,
               maximumFractionDigits: 0,
               roundingMode: props.roundingMode,
            });
            suffixChar.current = formatterSuffix.format(1).split("1")[1];
         }
         _suffix.current = new RegExp(escapeRegExp(suffixChar.current || ""), "g");
      }, [
         _locale,
         getOptions,
         props.currency,
         props.currencyDisplay,
         props.mode,
         props.prefix,
         props.roundingMode,
         props.suffix,
      ]);

      const formatValue = React.useCallback(
         (value: number | string | null | undefined): string => {
            if (value == null) return "";
            if (value === "-") return "-";

            const numeric =
               typeof value === "number"
                  ? value
                  : typeof value === "string"
                     ? Number(value)
                     : Number.NaN;

            if (Number.isNaN(numeric)) return "";

            if (props.format) {
               const formatter =
                  numberFormat.current || new Intl.NumberFormat(_locale, getOptions());
               let formatted = formatter.format(numeric);

               if (props.prefix) {
                  formatted = props.prefix + formatted;
               }

               if (props.suffix) {
                  formatted = formatted + props.suffix;
               }

               return formatted;
            }

            return numeric.toString();
         },
         [getOptions, _locale, props.format, props.prefix, props.suffix]
      );

      const parseValue = React.useCallback(
         (text: string): number | string | null => {
            if (!text) return null;

            let filteredText = text;

            if (_suffix.current) {
               filteredText = filteredText.replace(_suffix.current, "");
            }
            if (_prefix.current) {
               filteredText = filteredText.replace(_prefix.current, "");
            }

            filteredText = filteredText
               .trim()
               .replace(/\s/g, "")
               .replace(_currency.current!, "")
               .replace(_group.current!, "")
               .replace(_minusSign.current!, "-")
               .replace(_decimal.current!, ".")
               .replace(_numeral.current!, (d: string) =>
                  String(_index.current(d) ?? "")
               );

            if (!filteredText) return null;

            if (filteredText === "-") {
               return "-";
            }

            const parsedValue = +filteredText;

            return Number.isNaN(parsedValue) ? null : parsedValue;
         },
         []
      );

      const addWithPrecision = (base: number, increment: number, precision = 10) =>
         Math.round((base + increment) * precision) / precision;

      const clearTimer = () => {
         if (timer.current != null) {
            window.clearInterval(timer.current);
            timer.current = undefined;
         }
      };

      const allowMinusSign = () =>
         props.min == null || props.min < 0;

      const isMinusSign = (ch: string) => {
         if ((_minusSign.current && _minusSign.current.test(ch)) || ch === "-") {
            _minusSign.current && (_minusSign.current.lastIndex = 0);
            return true;
         }
         return false;
      };

      const isDecimalMode = () => props.mode === "decimal";

      const isFloat = (val: number) => {
         const formatter = new Intl.NumberFormat(_locale, getOptions());
         const parsed = parseValue(formatter.format(val));
         if (parsed === null || typeof parsed !== "number") {
            return false;
         }
         return parsed % 1 !== 0;
      };

      const replaceDecimalSeparator = (val: number | string): string | number => {
         if (typeof val === "number" && isFloat(val)) {
            return val.toString().replace(/\.(?=[^.]*$)/, _decimalSeparator.current);
         }
         return val;
      };

      const isDecimalSign = (ch: string) => {
         if (_decimal.current && (_decimal.current.test(ch) || isFloat(Number(ch)))) {
            _decimal.current.lastIndex = 0;
            return true;
         }
         return false;
      };

      const getDecimalCharIndexes = (val: string) => {
         let decimalCharIndex = -1;
         let decimalCharIndexWithoutPrefix = -1;

         if (_decimal.current) {
            decimalCharIndex = val.search(_decimal.current);
            _decimal.current.lastIndex = 0;

            let filteredVal = val;
            if (_prefix.current) {
               filteredVal = filteredVal.replace(_prefix.current, "");
            }
            filteredVal = filteredVal.trim().replace(/\s/g, "").replace(_currency.current!, "");

            decimalCharIndexWithoutPrefix = filteredVal.search(_decimal.current);
            _decimal.current.lastIndex = 0;
         }

         return { decimalCharIndex, decimalCharIndexWithoutPrefix };
      };

      const getCharIndexes = (val: string) => {
         let decimalCharIndex = -1;
         let minusCharIndex = -1;
         let suffixCharIndex = -1;
         let currencyCharIndex = -1;

         if (_decimal.current) {
            decimalCharIndex = val.search(_decimal.current);
            _decimal.current.lastIndex = 0;
         }

         if (_minusSign.current) {
            minusCharIndex = val.search(_minusSign.current);
            _minusSign.current.lastIndex = 0;
         }

         if (_suffix.current) {
            suffixCharIndex = val.search(_suffix.current);
            _suffix.current.lastIndex = 0;
         }

         if (_currency.current) {
            currencyCharIndex = val.search(_currency.current);
            if (currencyCharIndex === 0 && prefixChar.current && prefixChar.current.length > 1) {
               currencyCharIndex = prefixChar.current.trim().length;
            }
            _currency.current.lastIndex = 0;
         }

         return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
      };

      const resetRegex = () => {
         if (_numeral.current) _numeral.current.lastIndex = 0;
         if (_decimal.current) _decimal.current.lastIndex = 0;
         if (_group.current) _group.current.lastIndex = 0;
         if (_minusSign.current) _minusSign.current.lastIndex = 0;
      };

      const isNumeralChar = (ch: string) => {
         if (
            ch.length === 1 &&
            ((_numeral.current && _numeral.current.test(ch)) ||
               (_decimal.current && _decimal.current.test(ch)) ||
               (_group.current && _group.current.test(ch)) ||
               (_minusSign.current && _minusSign.current.test(ch)))
         ) {
            resetRegex();
            return true;
         }
         return false;
      };

      const evaluateEmpty = (newValue: number | null | string | undefined) => {
         if ((newValue == null || newValue === "") && !props.allowEmpty) {
            return props.min ?? 0;
         }
         return newValue;
      };

      const validateValueByLimit = (value: number | null | string): number | null => {
         if (value === "-" || value === null || value === "") {
            return null;
         }
         let num = typeof value === "number" ? value : Number(value);
         if (Number.isNaN(num)) {
            return null;
         }
         if (props.min != null && num < props.min) num = props.min;
         if (props.max != null && num > props.max) num = props.max;
         return num;
      };

      const validateValue = (value: number | null | string): number | null => {
         if (value === "-") return null;
         return validateValueByLimit(value);
      };

      const formattedValue = (val: number | null | string | undefined): string => {
         const newVal = evaluateEmpty(val);
         return formatValue(newVal as any);
      };

      const updateModel = (
         event: React.SyntheticEvent<any> | null,
         value: number | null
      ) => {
         const finalValue = value;

         if (props.onValueChange) {
            props.onValueChange({
               originalEvent: event,
               value: finalValue,
               stopPropagation() {
                  event?.stopPropagation();
               },
               preventDefault() {
                  event?.preventDefault();
               },
               target: {
                  name: props.name ?? null,
                  id: props.id ?? null,
                  value: finalValue,
               },
            });
         }

         if (props.onChange && event) {
            props.onChange({ originalEvent: event, value: finalValue });
         }
      };

      const handleOnChange = (
         event: React.SyntheticEvent<any>,
         currentValue: string,
         newValue: number | null
      ) => {
         if (!props.onChange) return;
         const parsedCurrent =
            typeof currentValue === "string" ? (parseValue(currentValue) as number | null) : null;
         const changed = newValue !== parsedCurrent;
         if (changed) {
            props.onChange({ originalEvent: event, value: newValue });
         }
      };

      const concatValues = (val1: string, val2: string): string => {
         if (val1 && val2) {
            const decimalCharIndex = val2.search(_decimal.current!);
            _decimal.current!.lastIndex = 0;

            const newVal1 = replaceDecimalSeparator(val1) as string;
            const base = newVal1.split(_decimal.current!)[0].replace(_suffix.current!, "").trim();

            return decimalCharIndex !== -1 ? base + val2.slice(decimalCharIndex) : val1;
         }
         return val1;
      };

      const getDecimalLength = (value: string): number => {
         if (value) {
            const valueSplit = value.split(_decimal.current!);
            if (valueSplit.length === 2) {
               return valueSplit[1].replace(_suffix.current!, "").length;
            }
         }
         return 0;
      };

      const deleteRange = (value: string, start: number, end: number): string => {
         if (end - start === value.length) {
            return "";
         } else if (start === 0) {
            return value.slice(end);
         } else if (end === value.length) {
            return value.slice(0, start);
         }
         return value.slice(0, start) + value.slice(end);
      };

      const replaceSuffix = (value: string) =>
         value
            ? value
               .replace(_suffix.current!, "")
               .trim()
               .replace(/\s/g, "")
               .replace(_currency.current!, "")
            : value;

      const insertText = (value: string, text: string, start: number, end: number): string => {
         const textSplit = isDecimalSign(text) ? text : text.split(_decimal.current!);

         if (textSplit.length === 2) {
            const local = value.slice(start, end);
            const decimalCharIndex = local.search(_decimal.current!);
            _decimal.current!.lastIndex = 0;

            return decimalCharIndex > 0
               ? value.slice(0, start) + formatValue(text as any) + replaceSuffix(value).slice(end)
               : value || formatValue(text as any);
         }

         if (isDecimalSign(text) && value.length === 0) {
            return formatValue("0." as any);
         }

         if (end - start === value.length) {
            return formatValue(text as any);
         }

         if (start === 0) {
            const suffix = /[A-Za-z]$/.test(value[end]) ? end - 1 : end;
            return text + value.slice(suffix);
         }

         if (end === value.length) {
            return value.slice(0, start) + text;
         }

         const selectionValue = value.slice(start, end);
         const space = /\s$/.test(selectionValue) ? " " : "";
         return value.slice(0, start) + text + space + value.slice(end);
      };

      const evaluateEmptyForUpdate = (
         newValue: number | null | string | undefined
      ): number | null | string | undefined => evaluateEmpty(newValue);

      const updateInput = (
         value: number | null,
         insertedValueStr: string | null,
         operation: string,
         valueStr?: string | null
      ) => {
         insertedValueStr = insertedValueStr || "";

         const inputEl = inputRef.current;
         if (!inputEl) return;

         const inputValue = inputEl.value;
         let newValue = formatValue(value);

         const currentLength = inputValue.length;

         if (newValue !== valueStr && valueStr != null) {
            newValue = concatValues(newValue, valueStr);
         }

         if (currentLength === 0) {
            inputEl.value = newValue;
            inputEl.setSelectionRange(0, 0);

            const index = initCursor();
            const selectionEnd = index + insertedValueStr.length + (isDecimalSign(insertedValueStr) ? 1 : 0);
            inputEl.setSelectionRange(selectionEnd, selectionEnd);
         } else {
            let selectionStart = inputEl.selectionStart ?? 0;
            let selectionEnd = inputEl.selectionEnd ?? 0;

            if (props.maxLength && props.maxLength < newValue.length) {
               return;
            }

            inputEl.value = newValue;
            const newLength = newValue.length;

            if (operation === "range-insert") {
               const startValue = parseValue((inputValue || "").slice(0, selectionStart));
               const startValueStr = startValue != null ? String(startValue) : "";
               const startExpr = startValueStr.split("").join("(" + groupChar.current + ")?");
               const sRegex = new RegExp(startExpr, "g");
               sRegex.test(newValue);

               const tExpr = insertedValueStr.split("").join("(" + groupChar.current + ")?");
               const tRegex = new RegExp(tExpr, "g");
               tRegex.test(newValue.slice(sRegex.lastIndex));

               selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
               inputEl.setSelectionRange(selectionEnd, selectionEnd);
            } else if (newLength === currentLength) {
               if (operation === "insert" || operation === "delete-back-single") {
                  let newSelectionEnd = selectionEnd;
                  if (insertedValueStr === "0") {
                     newSelectionEnd = selectionEnd + 1;
                  } else {
                     newSelectionEnd =
                        newSelectionEnd + Number(isDecimalSign(value as any) || isDecimalSign(insertedValueStr));
                  }
                  inputEl.setSelectionRange(newSelectionEnd, newSelectionEnd);
               } else if (operation === "delete-single") {
                  inputEl.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
               } else if (operation === "delete-range" || operation === "spin") {
                  inputEl.setSelectionRange(selectionEnd, selectionEnd);
               }
            } else if (operation === "delete-back-single") {
               const prevChar = inputValue.charAt(selectionEnd - 1);
               const nextChar = inputValue.charAt(selectionEnd);
               const diff = currentLength - newLength;
               const isGroupChar = _group.current!.test(nextChar);
               if (isGroupChar && diff === 1) {
                  selectionEnd = selectionEnd + 1;
               } else if (!isGroupChar && isNumeralChar(prevChar)) {
                  selectionEnd = selectionEnd + (-1 * diff + 1);
               }
               _group.current!.lastIndex = 0;
               inputEl.setSelectionRange(selectionEnd, selectionEnd);
            } else if (inputValue === "-" && operation === "insert") {
               inputEl.setSelectionRange(0, 0);
               const idx = initCursor();
               const end = idx + insertedValueStr.length + 1;
               inputEl.setSelectionRange(end, end);
            } else {
               selectionEnd = selectionEnd + (newLength - currentLength);
               inputEl.setSelectionRange(selectionEnd, selectionEnd);
            }
         }

         inputEl.setAttribute("aria-valuenow", value == null ? "" : String(value));
      };

      const updateInputValue = (newValue: number | null) => {
         const evaluated = evaluateEmptyForUpdate(newValue) as number | null;
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const current = inputEl.value;
         const formatted = formattedValue(evaluated);

         if (current !== formatted) {
            inputEl.value = formatted;
            inputEl.setAttribute("aria-valuenow", evaluated == null ? "" : String(evaluated));
         }
      };

      const isValueChanged = (currentValue: string, newValue: number | null) => {
         if (newValue == null && currentValue != null) return true;
         if (newValue != null) {
            const parsedCurrent =
               typeof currentValue === "string" ? (parseValue(currentValue) as number | null) : null;
            return newValue !== parsedCurrent;
         }
         return false;
      };

      const updateValue = (
         event: React.SyntheticEvent<any>,
         valueStr: string | null,
         insertedValueStr: string | null,
         operation: string
      ) => {
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const currentValue = inputEl.value;

         if (valueStr != null) {
            const parsed = parseValue(valueStr);
            const newValue = evaluateEmpty(parsed) as number | null;
            const limited = validateValueByLimit(parsed as any);

            updateInput(limited, insertedValueStr, operation, valueStr);
            if (
               event &&
               typeof currentValue === "string" &&
               typeof limited === "number" &&
               isValueChanged(currentValue, limited)
            ) {
               handleOnChange(event, currentValue, limited);
            }

            // update model immediately for spin/insert/delete etc
            updateModel(event, limited);
         }
      };

      const spin = (event: React.SyntheticEvent<any>, dir: 1 | -1) => {
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const step = (props.step ?? 1) * dir;
         const currentValue = (parseValue(inputEl.value) as number | null) ?? 0;
         const newValue = validateValue(addWithPrecision(currentValue, step));
         if (newValue == null) return;

         if (props.maxLength && props.maxLength < formatValue(newValue).length) {
            return;
         }

         // onChange before onValueChange, like Prime
         handleOnChange(event as any, inputEl.value, newValue);
         updateInput(newValue, null, "spin");
         updateModel(event as any, newValue);
      };

      const _repeat = (
         event: React.SyntheticEvent<any>,
         interval: number | null,
         dir: 1 | -1
      ) => {
         const i = interval ?? 500;
         clearTimer();
         timer.current = window.setTimeout(() => {
            _repeat(event, 40, dir);
         }, i) as any;
         spin(event, dir);
      };

      const insert = (
         event: React.KeyboardEvent<HTMLInputElement> | React.SyntheticEvent<any>,
         text: string,
         sign: { isDecimalSign: boolean; isMinusSign: boolean } = {
            isDecimalSign: false,
            isMinusSign: false,
         }
      ) => {
         const inputEl = inputRef.current;
         if (!inputEl) return;

         const minusCharIndexOnText = text.search(_minusSign.current!);
         _minusSign.current!.lastIndex = 0;

         if (!allowMinusSign() && minusCharIndexOnText !== -1) {
            return;
         }

         let selectionStart = inputEl.selectionStart ?? 0;
         let selectionEnd = inputEl.selectionEnd ?? 0;
         const inputValue = inputEl.value.trim();
         const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } =
            getCharIndexes(inputValue);
         const maxFractionDigits = numberFormat.current?.resolvedOptions().maximumFractionDigits ?? 0;
         const hasBoundOrAffix = !!(props.min || props.max || props.suffix || props.prefix);
         let newValueStr: string | null = null;

         if (sign.isMinusSign) {
            const isNewMinusSign = minusCharIndex === -1;
            if (selectionStart === 0 || selectionStart === currencyCharIndex + 1) {
               newValueStr = inputValue;
               if (isNewMinusSign || selectionEnd !== 0) {
                  newValueStr = insertText(inputValue, text, 0, selectionEnd);
               }
               updateValue(event as any, newValueStr, text, "insert");
            }
         } else if (sign.isDecimalSign) {
            if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
               updateValue(event as any, inputValue, text, "insert");
            } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
               newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
               updateValue(event as any, newValueStr, text, "insert");
            } else if (decimalCharIndex === -1 && (maxFractionDigits || props.maxFractionDigits)) {
               const allowedDecimal =
                  inputMode !== "numeric" || (inputMode === "numeric" && hasBoundOrAffix);
               if (allowedDecimal) {
                  newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
                  updateValue(event as any, newValueStr, text, "insert");
               }
            }
         } else {
            const operation = selectionStart !== selectionEnd ? "range-insert" : "insert";
            if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
               if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
                  const charIndex =
                     currencyCharIndex >= selectionStart
                        ? currencyCharIndex - 1
                        : suffixCharIndex >= selectionStart
                           ? suffixCharIndex
                           : inputValue.length;
                  newValueStr =
                     inputValue.slice(0, selectionStart) +
                     text +
                     inputValue.slice(selectionStart + text.length, charIndex) +
                     inputValue.slice(charIndex);
                  updateValue(event as any, newValueStr, text, operation);
               }
            } else {
               newValueStr = insertText(inputValue, text, selectionStart, selectionEnd);
               updateValue(event as any, newValueStr, text, operation);
            }
         }
      };

      const initCursor = () => {
         const inputEl = inputRef.current;
         if (!inputEl) return 0;

         let selectionStart = inputEl.selectionStart ?? 0;
         let inputValue = inputEl.value;
         const valueLength = inputValue.length;
         let index: number | null = null;

         const prefixLength = (prefixChar.current || "").length;
         inputValue = inputValue.replace(_prefix.current!, "");
         selectionStart = selectionStart - prefixLength;

         let ch = inputValue.charAt(selectionStart);
         if (isNumeralChar(ch)) {
            return selectionStart + prefixLength;
         }

         // search left
         let i = selectionStart - 1;
         while (i >= 0) {
            ch = inputValue.charAt(i);
            if (isNumeralChar(ch)) {
               index = i + prefixLength;
               break;
            }
            i--;
         }

         if (index != null) {
            inputEl.setSelectionRange(index + 1, index + 1);
         } else {
            i = selectionStart;
            while (i < valueLength) {
               ch = inputValue.charAt(i);
               if (isNumeralChar(ch)) {
                  index = i + prefixLength;
                  break;
               }
               i++;
            }
            if (index != null) {
               inputEl.setSelectionRange(index, index);
            }
         }

         return index ?? 0;
      };

      const onInputPointerDown = () => {
         isFocusedByClick.current = true;
      };

      const onInputClick = () => {
         initCursor();
      };

      const onInput = (event: React.FormEvent<HTMLInputElement>) => {
         if (props.disabled || props.readOnly) return;

         if (utilsIsSpecialChar.current) {
            event.currentTarget.value = lastValue.current;
            utilsIsSpecialChar.current = false;
         }

         // Chrome accent-dead fix is in nativeEvent.data; we can skip deep check here
      };

      // track special char for alt/ctrl/meta + keys
      const utilsIsSpecialChar = React.useRef(false);

      const onInputAndroidKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
         const isAndroid = /Android/i.test(navigator.userAgent);
         if (!isAndroid || props.disabled || props.readOnly) return;

         props.onKeyUp?.(event);

         if (event.defaultPrevented) return;

         const code = event.which || event.keyCode;
         if (code !== 13) {
            event.preventDefault();
         }

         const ch = String.fromCharCode(code);
         const decimal = isDecimalSign(ch);
         const minus = isMinusSign(ch);

         if ((code >= 48 && code <= 57) || minus || decimal) {
            insert(event, ch, { isDecimalSign: decimal, isMinusSign: minus });
         } else {
            const inputVal = (event.target as HTMLInputElement).value;
            updateValue(event, inputVal, null, "delete-single");
         }
      };

      const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
         if (props.disabled || props.readOnly) return;

         if (event.altKey || event.ctrlKey || event.metaKey) {
            // cut is treated as normal char
            if (event.key.toLowerCase() === "x" && (event.ctrlKey || event.metaKey)) {
               utilsIsSpecialChar.current = false;
            } else {
               utilsIsSpecialChar.current = true;
            }
            return;
         }

         props.onKeyDown?.(event);

         if (event.defaultPrevented) return;

         const inputEl = event.currentTarget;
         lastValue.current = inputEl.value;

         const isAndroid = /Android/i.test(navigator.userAgent);
         if (isAndroid) return;

         let selectionStart = inputEl.selectionStart ?? 0;
         let selectionEnd = inputEl.selectionEnd ?? 0;
         const inputValue = inputEl.value;
         let newValueStr: string | null = null;

         switch (event.code) {
            case "ArrowUp":
               spin(event, 1);
               event.preventDefault();
               break;
            case "ArrowDown":
               spin(event, -1);
               event.preventDefault();
               break;
            case "ArrowLeft": {
               const charPrev = inputValue.charAt(selectionStart - 1);
               if (!isNumeralChar(charPrev)) {
                  event.preventDefault();
               }
               break;
            }
            case "ArrowRight": {
               const charNext = inputValue.charAt(selectionStart);
               if (!isNumeralChar(charNext)) {
                  event.preventDefault();
               }
               break;
            }
            case "Tab":
            case "Enter":
            case "NumpadEnter": {
               const parsedVal = validateValue(parseValue(inputValue) as any);
               inputRef.current!.value = formatValue(parsedVal as any);
               inputRef.current!.setAttribute("aria-valuenow", parsedVal == null ? "" : String(parsedVal));
               updateModel(event, parsedVal);
               break;
            }
            case "Backspace": {
               event.preventDefault();
               if (selectionStart === selectionEnd) {
                  const deleteChar = inputValue.charAt(selectionStart - 1);
                  if (isNumeralChar(deleteChar)) {
                     const {
                        decimalCharIndex,
                        decimalCharIndexWithoutPrefix,
                     } = getDecimalCharIndexes(inputValue);
                     const decimalLength = getDecimalLength(inputValue);
                     if (_group.current!.test(deleteChar)) {
                        _group.current!.lastIndex = 0;
                        newValueStr =
                           inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                     } else if (_decimal.current!.test(deleteChar)) {
                        _decimal.current!.lastIndex = 0;
                        if (decimalLength) {
                           inputRef.current!.setSelectionRange(selectionStart - 1, selectionStart - 1);
                        } else {
                           newValueStr =
                              inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                        }
                     } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                        const insertedText =
                           isDecimalMode() && (props.minFractionDigits || 0) < decimalLength ? "" : "0";
                        newValueStr =
                           inputValue.slice(0, selectionStart - 1) +
                           insertedText +
                           inputValue.slice(selectionStart);
                     } else if (decimalCharIndexWithoutPrefix === 1) {
                        newValueStr =
                           inputValue.slice(0, selectionStart - 1) +
                           "0" +
                           inputValue.slice(selectionStart);
                        newValueStr = (parseValue(newValueStr) as number) > 0 ? newValueStr : "";
                     } else {
                        newValueStr =
                           inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                     }
                  } else if (_currency.current!.test(deleteChar)) {
                     const {
                        minusCharIndex,
                        currencyCharIndex,
                     } = getCharIndexes(inputValue);
                     if (minusCharIndex === currencyCharIndex - 1) {
                        newValueStr =
                           inputValue.slice(0, minusCharIndex) + inputValue.slice(selectionStart);
                     }
                  }
                  updateValue(event, newValueStr, null, "delete-single");
               } else {
                  newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
                  updateValue(event, newValueStr, null, "delete-range");
               }
               break;
            }
            case "Delete": {
               event.preventDefault();
               if (selectionStart === selectionEnd) {
                  const deleteChar = inputValue.charAt(selectionStart);
                  const {
                     decimalCharIndex,
                     decimalCharIndexWithoutPrefix,
                  } = getDecimalCharIndexes(inputValue);
                  if (isNumeralChar(deleteChar)) {
                     const decimalLength = getDecimalLength(inputValue);
                     if (_group.current!.test(deleteChar)) {
                        _group.current!.lastIndex = 0;
                        newValueStr =
                           inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                     } else if (_decimal.current!.test(deleteChar)) {
                        _decimal.current!.lastIndex = 0;
                        if (decimalLength) {
                           inputRef.current!.setSelectionRange(selectionStart + 1, selectionStart + 1);
                        } else {
                           newValueStr =
                              inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                        }
                     } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                        const insertedText =
                           isDecimalMode() && (props.minFractionDigits || 0) < decimalLength ? "" : "0";
                        newValueStr =
                           inputValue.slice(0, selectionStart) +
                           insertedText +
                           inputValue.slice(selectionStart + 1);
                     } else if (decimalCharIndexWithoutPrefix === 1) {
                        newValueStr =
                           inputValue.slice(0, selectionStart) +
                           "0" +
                           inputValue.slice(selectionStart + 1);
                        newValueStr = (parseValue(newValueStr) as number) > 0 ? newValueStr : "";
                     } else {
                        newValueStr =
                           inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                     }
                  }
                  updateValue(event, newValueStr, null, "delete-back-single");
               } else {
                  newValueStr = deleteRange(inputValue, selectionStart, selectionEnd);
                  updateValue(event, newValueStr, null, "delete-range");
               }
               break;
            }
            case "End":
               event.preventDefault();
               if (props.max != null) {
                  updateModel(event, props.max);
                  updateInputValue(props.max);
               }
               break;
            case "Home":
               event.preventDefault();
               if (props.min != null) {
                  updateModel(event, props.min);
                  updateInputValue(props.min);
               }
               break;
            default: {
               event.preventDefault();
               let ch = event.key;
               if (!ch) break;

               if (ch === ".") {
                  ch = _decimalSeparator.current;
               }

               const decimal = isDecimalSign(ch);
               const minus = isMinusSign(ch);
               if ((ch >= "0" && ch <= "9") || minus || decimal) {
                  insert(event, ch, { isDecimalSign: decimal, isMinusSign: minus });
               }
               break;
            }
         }
      };

      const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
         event.preventDefault();
         if (props.disabled || props.readOnly) return;

         const data = (event.clipboardData || (window as any).clipboardData).getData("Text");
         if (!data) return;

         const filteredData = parseValue(data);
         if (filteredData != null) {
            if (typeof filteredData === "number" && isFloat(filteredData)) {
               const formatted = formatValue(filteredData);
               if (inputRef.current) {
                  inputRef.current.value = formatted;
               }
               updateModel(event, filteredData);
            } else {
               insert(event, String(filteredData));
            }
         }
      };

      const onInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
         setFocusedState(true);
         props.onFocus?.(event);

         if ((props.suffix || props.currency || props.prefix) && inputRef.current && !isFocusedByClick.current) {
            const inputValue = inputRef.current.value;
            const prefixLength = (prefixChar.current || "").length;
            const suffixLength = (suffixChar.current || "").length;
            const end = inputValue.length === 0 ? 0 : inputValue.length - suffixLength;
            inputRef.current.setSelectionRange(prefixLength, end);
         }
      };

      const onInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
         setFocusedState(false);
         isFocusedByClick.current = false;

         if (inputRef.current) {
            const currentValue = inputRef.current.value;
            if (isValueChanged(currentValue, props.value ?? null)) {
               const newValue = validateValue(parseValue(currentValue) as any);
               updateInputValue(newValue);
               updateModel(event, newValue);
            }
         }

         props.onBlur?.(event);
      };

      const changeValue = () => {
         const val = validateValueByLimit(props.value as any);
         updateInputValue(props.format ? (val as any) : (replaceDecimalSeparator(val as any) as any));
         const newValue = validateValue(props.value as any);
         if (props.value != null && props.value !== newValue) {
            updateModel(null, newValue);
         }
      };

      React.useImperativeHandle(ref, () => inputRef.current as InputRef);

      // attach provided inputRef
      React.useEffect(() => {
         if (props.inputRef) {
            if (typeof props.inputRef === "function") {
               props.inputRef(inputRef.current);
            } else {
               (props.inputRef as React.MutableRefObject<InputRef | null>).current =
                  inputRef.current;
            }
         }
      }, [props.inputRef]);

      // unmount cleanup
      React.useEffect(
         () => () => {
            clearTimer();
         },
         []
      );

      // mount init
      React.useEffect(() => {
         constructParser();
         const newValue = validateValue(props.value as any);
         if (props.value != null && props.value !== newValue) {
            updateModel(null, newValue);
         }
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      // update on locale/options changes
      React.useEffect(() => {
         constructParser();
         changeValue();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [
         _locale,
         props.locale,
         props.localeMatcher,
         props.mode,
         props.currency,
         props.currencyDisplay,
         props.useGrouping,
         props.minFractionDigits,
         props.maxFractionDigits,
         props.suffix,
         props.prefix,
      ]);

      // update on value changes
      React.useEffect(() => {
         changeValue();
         // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [props.value]);

      // disable timer if disabled
      React.useEffect(() => {
         if (props.disabled) clearTimer();
      }, [props.disabled]);

      // ---- render ----

      const inputClassName = [
         props.inputClassName,
         props.invalid ? "p-invalid" : undefined,
      ]
         .filter(Boolean)
         .join(" ");

      const valueToRender = formattedValue(props.value ?? null);

      // Destructure once near the top of your render/component:
      const {
         inputId,
         inputStyle,
         leadingControl,
         trailingControl,
         leadingControlClassName,
         trailingControlClassName,
         value,
         icon,
         iconGap,

         // anything you *don’t* want to pass down can be pulled out here too
         // e.g. internal-only props

         ...passThroughProps // everything else goes straight to ShadcnTextVariant
      } = props;

      return (
         //@ts-ignore
         <Input
            value={value as any}
            ref={inputRef}
            // 1. forward all “normal” input props, aria props, etc.
            {...passThroughProps}

            // 2. override / shape the ones we control
            id={inputId ?? props.id}
            style={inputStyle ?? props.style}
            role="spinbutton"
            className={inputClassName || props.className}
            defaultValue={valueToRender}
            type={props.type ?? "text"}
            inputMode={inputMode}

            // 3. internal event handlers (your logic wins over anything from props)
            onKeyDown={onInputKeyDown}
            onKeyPress={onInputAndroidKey}
            onInput={onInput}
            onClick={onInputClick}
            onPointerDown={onInputPointerDown}
            onBlur={onInputBlur}
            onFocus={onInputFocus}
            onPaste={onPaste}

            // 4. controls / adornments
            leadingControl={leadingControl}
            trailingControl={trailingControl}
            leadingControlClassName={leadingControlClassName}
            trailingControlClassName={trailingControlClassName}
            icon={icon}
            iconGap={iconGap}
         />
      );
   })
);

InputNumber.displayName = "InputNumber";
```

---
#### 71


` File: packages/form-palette/src/presets/ui/popover.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden pointer-events-auto",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
```

---
#### 72


` File: packages/form-palette/src/presets/ui/radio-group.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
```

---
#### 73


` File: packages/form-palette/src/presets/ui/scroll-area.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
```

---
#### 74


` File: packages/form-palette/src/presets/ui/select.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}
function SelectTrigger({
  className,
  size = "default",
  children,
  icon: Icon = ChevronDownIcon,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
  /**
   * Optional custom icon component.
   * Example: `icon={ChevronUpIcon}`
   */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-[var(--surfaces-input,_transparent)] px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <Icon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
```

---
#### 75


` File: packages/form-palette/src/presets/ui/separator.tsx`  [↑ Back to top](#index)

```tsx
"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
```

---
#### 76


` File: packages/form-palette/src/presets/ui/slider.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
```

---
#### 77


` File: packages/form-palette/src/presets/ui/switch.tsx`  [↑ Back to top](#index)

```tsx
"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  thumbClassName,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { thumbClassName?: string }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0", thumbClassName
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
```

---
#### 78


` File: packages/form-palette/src/presets/ui/textarea.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaIconControlProps {
  // lower icons (overlaid in textarea-field)
  leadingIcons?: React.ReactNode[];
  trailingIcons?: React.ReactNode[];
  icon?: React.ReactNode;

  iconGap?: number;
  leadingIconSpacing?: number;
  trailingIconSpacing?: number;

  // lower side controls (outside the text area by default)
  leadingControl?: React.ReactNode;
  trailingControl?: React.ReactNode;
  leadingControlClassName?: string;
  trailingControlClassName?: string;

  /**
   * If true, move the visual box (border, bg, radius, focus) from
   * `textarea-field` to `textarea-inner` so the side controls are
   * inside the same frame.
   *
   * Default: false (controls sit outside the border).
   */
  extendBoxToControls?: boolean;

  /**
   * If true, move the visual box all the way up to `textarea-box`,
   * so the upper toolbox and the inner row share a single frame.
   *
   * When this is true, it overrides `extendBoxToControls`.
   *
   * Default: false.
   */
  extendBoxToToolbox?: boolean;

  /**
   * Extra padding knobs (same semantics as Input).
   *
   * px → symmetric horizontal padding
   * py → symmetric vertical padding
   * ps/pe → logical start/end padding adjustments
   * pb → extra bottom padding (stacked with py)
   */
  px?: number;
  py?: number;
  ps?: number;
  pe?: number;
  pb?: number;

  /**
   * Extra classes merged into the raw <textarea>.
   * (The box padding/border live on the wrappers.)
   */
  inputClassName?: string;
}

export interface TextareaSizeProps {
  size?: "sm" | "md" | "lg" | (string & {});
  density?:
  | "compact"
  | "normal"
  | "relaxed"
  | "dense"
  | "loose"
  | (string & {});
}

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
  TextareaIconControlProps,
  TextareaSizeProps {
  /**
   * Auto-resize based on content.
   * Default: true.
   */
  autoResize?: boolean;

  /**
   * Minimum number of visual rows.
   * Default: 1.
   */
  rows?: number;

  /**
   * Maximum number of visual rows.
   * Undefined → unlimited.
   */
  maxRows?: number;

  /**
   * Optional upper toolbox area.
   */
  upperControl?: React.ReactNode;
  upperControlClassName?: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function resolveSizeDensityClasses(size: unknown, density: unknown) {
  const s = (size as string | undefined) ?? "md";
  const d = (density as string | undefined) ?? "normal";

  let textCls = "text-base md:text-sm";

  if (s === "sm") {
    textCls = "text-sm";
  } else if (s === "lg") {
    textCls = "text-base";
  }

  let densityCls = "";
  if (d === "dense" || d === "compact") {
    densityCls = "leading-tight";
  } else if (d === "relaxed" || d === "loose") {
    densityCls = "leading-relaxed";
  }

  return { textCls, densityCls };
}

function resolveBasePadding(size: unknown, density: unknown) {
  // mirror Input baseline
  let px = 12;
  let py = 8;

  const s = (size as string | undefined) ?? "md";
  const d = (density as string | undefined) ?? "normal";

  if (s === "sm") {
    px = 10;
    py = 6;
  } else if (s === "lg") {
    px = 14;
    py = 10;
  }

  if (d === "dense" || d === "compact") {
    py = Math.max(2, py - 1);
  } else if (d === "relaxed" || d === "loose") {
    py = py + 1;
  }

  return { px, py };
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(rawProps, forwardedRef) {
    const {
      // layout wrapper
      className,
      style,

      // native textarea bits
      disabled,
      readOnly,
      required,
      onChange,
      onFocus,
      onBlur,
      placeholder,

      // size / density
      size = "md",
      density = "normal",

      // auto-resize
      autoResize = true,
      rows: minRowsProp,
      maxRows,

      // controls / icons
      leadingIcons,
      trailingIcons,
      icon,
      iconGap,
      leadingIconSpacing,
      trailingIconSpacing,
      leadingControl,
      trailingControl,
      leadingControlClassName,
      trailingControlClassName,
      extendBoxToControls = false,
      extendBoxToToolbox = false,
      px,
      py,
      ps,
      pe,
      pb,
      inputClassName,

      // upper toolbox
      upperControl,
      upperControlClassName,

      // rest of <textarea> props
      ...rest
    } = rawProps;

    const sizeKey = (size as string | undefined) ?? "md";
    const densityKey = (density as string | undefined) ?? "normal";

    const innerRef = React.useRef<HTMLTextAreaElement | null>(null);
    React.useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLTextAreaElement,
      []
    );

    // icons
    const resolvedLeadingIcons: React.ReactNode[] = (() => {
      if (leadingIcons && leadingIcons.length) return leadingIcons;
      if (icon) return [icon];
      return [];
    })();
    const resolvedTrailingIcons: React.ReactNode[] = trailingIcons ?? [];

    const hasLeadingIcons = resolvedLeadingIcons.length > 0;
    const hasTrailingIcons = resolvedTrailingIcons.length > 0;
    const hasLeadingControl = !!leadingControl;
    const hasTrailingControl = !!trailingControl;

    const hasIcons = hasLeadingIcons || hasTrailingIcons;
    const hasControls = hasLeadingControl || hasTrailingControl;
    const hasExtras = hasIcons || hasControls;

    const baseIconGap = iconGap ?? 1;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const leadingIconsRef = React.useRef<HTMLDivElement | null>(null);
    const trailingIconsRef = React.useRef<HTMLDivElement | null>(null);
    const [leadingIconsWidth, setLeadingIconsWidth] = React.useState(0);
    const [trailingIconsWidth, setTrailingIconsWidth] = React.useState(0);

    const measureIconWidths = React.useCallback(() => {
      if (typeof window === "undefined") return;

      const lead = leadingIconsRef.current;
      const trail = trailingIconsRef.current;

      if (lead) {
        const rect = lead.getBoundingClientRect();
        setLeadingIconsWidth(rect.width);
      } else {
        setLeadingIconsWidth(0);
      }

      if (trail) {
        const rect = trail.getBoundingClientRect();
        setTrailingIconsWidth(rect.width);
      } else {
        setTrailingIconsWidth(0);
      }
    }, []);

    // MutationObserver → recompute icon widths when content changes
    React.useLayoutEffect(() => {
      if (
        typeof window === "undefined" ||
        typeof MutationObserver === "undefined"
      ) {
        measureIconWidths();
        return;
      }

      const observers: MutationObserver[] = [];
      const lead = leadingIconsRef.current;
      const trail = trailingIconsRef.current;

      if (lead) {
        const obs = new MutationObserver(() => measureIconWidths());
        obs.observe(lead, {
          childList: true,
          subtree: true,
          attributes: true,
        });
        observers.push(obs);
      }

      if (trail) {
        const obs = new MutationObserver(() => measureIconWidths());
        obs.observe(trail, {
          childList: true,
          subtree: true,
          attributes: true,
        });
        observers.push(obs);
      }

      measureIconWidths();

      return () => observers.forEach((o) => o.disconnect());
    }, [measureIconWidths, hasLeadingIcons, hasTrailingIcons]);

    // row height / rows
    const [rowHeight, setRowHeight] = React.useState<number | null>(null);
    const baseMinRows = Math.max(minRowsProp ?? 1, 1);
    const [rows, setRows] = React.useState<number>(baseMinRows);

    // measure a single-row height from the textarea itself
    React.useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const el = innerRef.current;
      if (!el) return;

      const prevValue = el.value;
      const prevHeight = el.style.height;

      el.value = "X";
      el.style.height = "0px";
      const singleRowHeight = el.scrollHeight;

      el.value = prevValue;
      el.style.height = prevHeight;

      if (singleRowHeight > 0 && Number.isFinite(singleRowHeight)) {
        setRowHeight(singleRowHeight);
        setRows(baseMinRows);
      }
    }, [sizeKey, densityKey, baseMinRows]);

    // auto-resize helper
    const recomputeHeight = React.useCallback(() => {
      if (!autoResize) return;
      if (!innerRef.current) return;
      if (!rowHeight) return;

      const el = innerRef.current;

      el.style.height = "0px";
      const scrollH = el.scrollHeight;

      // if empty, keep exactly minRows
      if (!el.value || el.value.length === 0) {
        const h = baseMinRows * rowHeight;
        el.style.height = `${h}px`;
        setRows(baseMinRows);
        return;
      }

      const rawRows = scrollH / rowHeight;
      let nextRows = Math.max(baseMinRows, Math.ceil(rawRows));
      if (typeof maxRows === "number" && maxRows > 0) {
        nextRows = Math.min(nextRows, maxRows);
      }

      const nextHeight = nextRows * rowHeight;
      el.style.height = `${nextHeight}px`;
      setRows(nextRows);
    }, [autoResize, rowHeight, baseMinRows, maxRows]);

    // run when controlled value changes or initial mount
    React.useLayoutEffect(() => {
      recomputeHeight();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recomputeHeight, rest.value, rest.defaultValue]);

    // padding (frame-level)
    const { px: pxDefault, py: pyDefault } = resolveBasePadding(size, density);

    const extraPx = typeof px === "number" ? px : 0;
    const extraPy = typeof py === "number" ? py : 0;
    const extraPs = typeof ps === "number" ? ps : 0;
    const extraPe = typeof pe === "number" ? pe : 0;
    const extraPb = typeof pb === "number" ? pb : 0;

    const basePaddingStart = pxDefault + extraPx + extraPs;
    const basePaddingEnd = pxDefault + extraPx + extraPe;
    const paddingTop = pyDefault + extraPy;
    const paddingBottom = pyDefault + extraPy + extraPb;

    // extra space text needs because of icons
    const iconsLeftExtra =
      hasLeadingIcons && leadingIconsWidth > 0
        ? leadingIconsWidth + baseIconGap
        : 0;

    const iconsRightExtra =
      hasTrailingIcons && trailingIconsWidth > 0
        ? trailingIconsWidth + baseIconGap
        : 0;

    const { textCls, densityCls } = resolveSizeDensityClasses(size, density);

    // vars for the frame: both base + adjusted
    const vars: React.CSSProperties = {
      "--fp-pl-base": `${basePaddingStart}px`,
      "--fp-pr-base": `${basePaddingEnd}px`,
      "--fp-pl": `${basePaddingStart + iconsLeftExtra}px`,
      "--fp-pr": `${basePaddingEnd + iconsRightExtra}px`,
      "--fp-pt": `${paddingTop}px`,
      "--fp-pb": `${paddingBottom}px`,
      "--fp-row-height": rowHeight ? `${rowHeight}px` : undefined,
      "--fp-rows": rows,
    } as React.CSSProperties;

    const mergedWrapperStyle: React.CSSProperties = {
      ...(style ?? {}),
      ...vars,
    };

    // visual frame (border/background/focus)
    const frameClasses = cn(
      "border-input placeholder:text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
      "dark:bg-input/30 rounded-md border bg-[var(--surfaces-input,_transparent)] shadow-xs transition-[color,box-shadow] outline-none",
      "disabled:cursor-not-allowed disabled:opacity-50"
    );

    // padding utility using adjusted vars (--fp-pl / --fp-pr)
    const framePaddingClasses = cn(
      "px-(--fp-pl,--spacing(3)) pr-(--fp-pr,--spacing(3))",
      "pt-(--fp-pt,--spacing(1)) pb-(--fp-pb,--spacing(1))"
    );

    // which element owns the frame?
    const boxOnToolbox = extendBoxToToolbox;
    const boxOnInner = !boxOnToolbox && extendBoxToControls;
    const boxOnField = !boxOnToolbox && !boxOnInner;

    const wrapperClasses = cn("w-full", className);

    const boxClasses = cn(
      "flex flex-col gap-1",
      boxOnToolbox && frameClasses,
      boxOnToolbox && framePaddingClasses
    );

    const innerRowClasses = cn(
      "flex items-stretch gap-1",
      boxOnInner && frameClasses,
      boxOnInner && framePaddingClasses
    );

    const fieldWrapperClasses = cn(
      "relative flex-1 min-w-0",
      boxOnField && frameClasses,
      boxOnField && framePaddingClasses
    );

    const textareaClasses = cn(
      "block w-full min-h-[1px] resize-none bg-transparent border-none outline-none shadow-none",
      "px-0 py-0",
      "placeholder:text-muted-foreground",
      textCls,
      densityCls,
      inputClassName
    );

    const focusTextarea = () => {
      if (innerRef.current) innerRef.current.focus();
    };

    const handleFocus = React.useCallback(
      (event: React.FocusEvent<HTMLTextAreaElement>) => {
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = React.useCallback(
      (event: React.FocusEvent<HTMLTextAreaElement>) => {
        onBlur?.(event);
      },
      [onBlur]
    );

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(event);
        // for uncontrolled usage, recompute on each keystroke
        recomputeHeight();
      },
      [onChange, recomputeHeight]
    );

    const handleIconMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      focusTextarea();
    };

    const controlCellStyle: React.CSSProperties | undefined =
      rowHeight != null ? { height: `${rowHeight}px` } : undefined;

    const lowerControlAlignStyle: React.CSSProperties = {
      marginTop: "auto",
      ...controlCellStyle,
    };

    const leadingArea = hasLeadingControl ? (
      <div
        data-slot="textarea-leading-area"
        className={cn("flex flex-col h-full", leadingControlClassName)}
      >
        <div
          data-slot="textarea-leading-control"
          className="flex items-center mt-auto"
          style={lowerControlAlignStyle}
          onMouseDown={(e) => {
            e.preventDefault();
            focusTextarea();
          }}
        >
          {leadingControl}
        </div>
      </div>
    ) : null;

    const trailingArea = hasTrailingControl ? (
      <div
        data-slot="textarea-trailing-area"
        className={cn("flex flex-col h-full mt-auto", trailingControlClassName)}
      >
        <div
          data-slot="textarea-trailing-control"
          className="flex items-center"
          style={lowerControlAlignStyle}
          onMouseDown={(e) => {
            e.preventDefault();
            focusTextarea();
          }}
        >
          {trailingControl}
        </div>
      </div>
    ) : null;

    return (
      <div
        data-slot="textarea-wrapper"
        className={wrapperClasses}
        style={mergedWrapperStyle}
        data-size={sizeKey}
        data-density={densityKey}
      >
        <div
          data-slot="textarea-box"
          className={boxClasses}
          data-has-extras={hasExtras ? "true" : "false"}
        >
          {upperControl && (
            <div
              data-slot="textarea-upper"
              className={cn("flex items-center", upperControlClassName)}
            >
              {upperControl}
            </div>
          )}

          <div data-slot="textarea-inner" className={innerRowClasses}>
            {leadingArea}

            <div data-slot="textarea-field" className={fieldWrapperClasses}>
              <textarea
                ref={innerRef}
                data-slot="textarea"
                className={textareaClasses}
                disabled={disabled}
                readOnly={readOnly}
                aria-required={required ? "true" : undefined}
                rows={autoResize ? undefined : baseMinRows}
                placeholder={placeholder}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...rest}
              />

              {hasLeadingIcons && (
                <div
                  ref={leadingIconsRef}
                  data-slot="textarea-leading-icons"
                  className="pointer-events-auto absolute left-0 flex items-end"
                  style={{
                    gap: leadingGap,
                    // anchor from base padding, NOT icon-adjusted padding
                    paddingLeft: "var(--fp-pl-base)",
                    bottom: "calc(var(--fp-pb, 0px) + 2px)",
                  }}
                  onMouseDown={handleIconMouseDown}
                >
                  {resolvedLeadingIcons.map((node, idx) => (
                    <span
                      key={idx}
                      className="flex items-center justify-center"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              )}

              {hasTrailingIcons && (
                <div
                  ref={trailingIconsRef}
                  data-slot="textarea-trailing-icons"
                  className="pointer-events-auto absolute right-0 flex items-end"
                  style={{
                    gap: trailingGap,
                    paddingRight: "var(--fp-pr-base)",
                    bottom: "calc(var(--fp-pb, 0px) + 2px)",
                  }}
                  onMouseDown={handleIconMouseDown}
                >
                  {resolvedTrailingIcons.map((node, idx) => (
                    <span
                      key={idx}
                      className="flex items-center justify-center"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {trailingArea}
          </div>
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
```

---
#### 79


` File: packages/form-palette/src/presets/ui/time-dropdowns.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/presets/ui/select";

export interface TimeDropdownsProps {
    /**
     * Current date-time value.
     * Only the time portion will be modified; date part is preserved.
     */
    value: Date | undefined;

    /**
     * Called whenever any of the time parts change.
     */
    onChange(next: Date | undefined): void;

    /**
     * Whether to show seconds dropdown.
     * Default: false.
     */
    showSeconds?: boolean;

    /**
     * Step between minutes in the dropdown.
     * Default: 5.
     */
    minuteStep?: number;

    /**
     * Step between seconds in the dropdown.
     * Default: 5.
     */
    secondStep?: number;

    /**
     * If true, show 12-hour clock with AM/PM toggle.
     * If false, show 24-hour clock (00–23).
     * Default: false (24-hour).
     */
    use12Hour?: boolean;

    /**
     * Optional label to show above or beside the dropdowns.
     */
    label?: React.ReactNode;

    /**
     * Custom className for the outer wrapper.
     */
    className?: string;

    /**
     * Custom className for each SelectTrigger (hours/minutes/seconds).
     */
    triggerClassName?: string;

    /**
     * Compact / normal layout toggle.
     * Just a quick spacing switch for now.
     */
    density?: "compact" | "normal";
}

function pad2(n: number): string {
    return n.toString().padStart(2, "0");
}

function buildMinuteOptions(step: number): string[] {
    const items: string[] = [];
    for (let m = 0; m < 60; m += step) {
        items.push(pad2(m));
    }
    return items;
}

function buildSecondOptions(step: number): string[] {
    const items: string[] = [];
    for (let s = 0; s < 60; s += step) {
        items.push(pad2(s));
    }
    return items;
}

function buildHourOptions24(): string[] {
    const items: string[] = [];
    for (let h = 0; h < 24; h++) {
        items.push(pad2(h));
    }
    return items;
}

function buildHourOptions12(): string[] {
    const items: string[] = [];
    for (let h = 1; h <= 12; h++) {
        items.push(h.toString());
    }
    return items;
}

/**
 * Safely create a new Date instance with updated time parts,
 * preserving the original date portion when possible.
 */
function withTime(
    base: Date | undefined,
    opts: { hours?: number; minutes?: number; seconds?: number },
): Date {
    const src = base ? new Date(base.getTime()) : new Date();
    const h = opts.hours ?? src.getHours();
    const m = opts.minutes ?? src.getMinutes();
    const s = opts.seconds ?? src.getSeconds();
    src.setHours(h, m, s, 0);
    return src;
}

/**
 * Drop-in time dropdown cluster for use in the date popover.
 *
 * Renders hour / minute (and optionally second) Selects plus
 * an AM/PM toggle when `use12Hour` is true.
 */
export const TimeDropdowns: React.FC<TimeDropdownsProps> = (props) => {
    const {
        value,
        onChange,
        showSeconds = false,
        minuteStep = 5,
        secondStep = 5,
        use12Hour = false,
        label,
        className,
        triggerClassName,
        density = "normal",
    } = props;

    const minuteOptions = React.useMemo(
        () => buildMinuteOptions(minuteStep),
        [minuteStep],
    );
    const secondOptions = React.useMemo(
        () => buildSecondOptions(secondStep),
        [secondStep],
    );

    const hourOptions = React.useMemo(
        () => (use12Hour ? buildHourOptions12() : buildHourOptions24()),
        [use12Hour],
    );

    // Derive current parts from value.
    let hours24 = value ? value.getHours() : 0;
    let minutes = value ? value.getMinutes() : 0;
    let seconds = value ? value.getSeconds() : 0;

    let hourDisplay: string;
    let period: "am" | "pm" | null = null;

    if (use12Hour) {
        period = hours24 >= 12 ? "pm" : "am";
        let h12 = hours24 % 12;
        if (h12 === 0) h12 = 12;
        hourDisplay = h12.toString();
    } else {
        hourDisplay = pad2(hours24);
    }

    const minuteDisplay = pad2(minutes);
    const secondDisplay = pad2(seconds);

    const baseTriggerClasses = cn(
        "h-8 w-[4.2rem] px-2 py-0 text-xs",
        "whitespace-nowrap",
        "border-input bg-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    );

    const triggerClasses = cn(
        baseTriggerClasses,
        triggerClassName,
        density === "compact" && "h-7 text-[0.7rem] px-1.5",
    );

    const gapClass = density === "compact" ? "gap-1" : "gap-2";

    const handleHourChange = (hStr: string) => {
        let nextHours24: number;

        if (use12Hour) {
            const h12 = parseInt(hStr, 10) || 0;
            if (!period) {
                // fallback: assume AM
                nextHours24 = h12 % 12;
            } else {
                if (period === "am") {
                    nextHours24 = h12 % 12; // 12am → 0
                } else {
                    nextHours24 = h12 % 12 + 12; // 12pm → 12, 1pm → 13
                }
            }
        } else {
            nextHours24 = parseInt(hStr, 10) || 0;
        }

        const nextDate = withTime(value, { hours: nextHours24 });
        onChange(nextDate);
    };

    const handleMinuteChange = (mStr: string) => {
        const m = parseInt(mStr, 10) || 0;
        const nextDate = withTime(value, { minutes: m });
        onChange(nextDate);
    };

    const handleSecondChange = (sStr: string) => {
        const s = parseInt(sStr, 10) || 0;
        const nextDate = withTime(value, { seconds: s });
        onChange(nextDate);
    };

    const handlePeriodChange = (p: string) => {
        if (!use12Hour) return;
        const nextPeriod = p === "pm" ? "pm" : "am";

        // Convert from current hours24 + new period.
        let h12 = hours24 % 12;
        if (h12 === 0) h12 = 12;

        let nextHours24: number;
        if (nextPeriod === "am") {
            nextHours24 = h12 % 12; // 12am → 0
        } else {
            nextHours24 = h12 % 12 + 12; // 12pm → 12, etc.
        }

        const nextDate = withTime(value, { hours: nextHours24 });
        onChange(nextDate);
    };

    return (
        <div
            className={cn(
                "flex w-full flex-col gap-2",
                density === "compact" && "gap-1",
                className,
            )}
            data-slot="time-dropdowns"
        >
            {label && (
                <div className="text-xs font-medium text-muted-foreground">
                    {label}
                </div>
            )}

            <div
                className={cn(
                    "flex w-full items-center",
                    gapClass,
                )}
                data-slot="time-dropdowns-row"
            >
                {/* Hour */}
                <Select value={hourDisplay} onValueChange={handleHourChange}>
                    <SelectTrigger
                        className={triggerClasses}
                        data-slot="time-hour"
                    >
                        <SelectValue placeholder="HH" />
                    </SelectTrigger>
                    <SelectContent>
                        {hourOptions.map((h) => (
                            <SelectItem key={h} value={h}>
                                {use12Hour ? h.padStart(2, " ") : pad2(Number(h))}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Minute */}
                <Select
                    value={minuteDisplay}
                    onValueChange={handleMinuteChange}
                >
                    <SelectTrigger
                        className={triggerClasses}
                        data-slot="time-minute"
                    >
                        <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                        {minuteOptions.map((m) => (
                            <SelectItem key={m} value={m}>
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Second (optional) */}
                {showSeconds && (
                    <Select
                        value={secondDisplay}
                        onValueChange={handleSecondChange}
                    >
                        <SelectTrigger
                            className={triggerClasses}
                            data-slot="time-second"
                        >
                            <SelectValue placeholder="SS" />
                        </SelectTrigger>
                        <SelectContent>
                            {secondOptions.map((s) => (
                                <SelectItem key={s} value={s}>
                                    {s}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* AM/PM (optional) */}
                {use12Hour && (
                    <Select
                        value={period ?? "am"}
                        onValueChange={handlePeriodChange}
                    >
                        <SelectTrigger
                            className={cn(
                                triggerClasses,
                                "w-[3.8rem]",
                            )}
                            data-slot="time-period"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="am">AM</SelectItem>
                            <SelectItem value="pm">PM</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </div>
        </div>
    );
};
```

---
#### 80


` File: packages/form-palette/src/presets/ui/toggle-group.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/presets/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants> & {
    spacing?: number
  }) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
```

---
#### 81


` File: packages/form-palette/src/presets/ui/toggle.tsx`  [↑ Back to top](#index)

```tsx
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
```

---
#### 82


` File: packages/form-palette/src/presets/ui/tooltip.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

---
#### 83


` File: packages/form-palette/src/schema/adapter.ts`  [↑ Back to top](#index)

```ts
// src/schema/adapter.ts
import { Page } from "@inertiajs/core";

import { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * HTTP methods supported by the core adapter layer.
 *
 * This matches the legacy Method union from the old types.ts.
 */
export type Method = 'post' | 'get' | 'delete' | 'put' | 'patch';

/**
 * Lifecycle callbacks used by adapters to report events back to the core.
 *
 * @template Ok  Type of the "successful" response payload (e.g. AxiosResponse).
 * @template Err Type of the "error" payload (e.g. AxiosError, unknown).
 */
export interface AdapterCallbacks<Ok = unknown, Err = unknown> {
    /**
     * Called when the underlying request completes successfully.
     * The adapter decides what "success" means (HTTP 2xx, no exception, etc.).
     */
    onSuccess?(response: Ok): void;

    /**
     * Called when the underlying request fails.
     * Adapters should pass the most informative error shape they have.
     */
    onError?(error: Err, updateRef?: boolean): void;

    /**
     * Called at the end of the adapter lifecycle, whether success or error.
     * Useful for clearing loading states, unlocking buttons, etc.
     */
    onFinish?(): void;
}

/**
 * Result interface returned by an adapter.
 *
 * Generic evolution of the legacy AdapterResult:
 *
 *   type AdapterResult = {
 *     submit(options?: unknown): void;
 *     send<T = unknown>(): Promise<AxiosResponse<T>>;
 *     run(options?: unknown): void;
 *   };
 *
 * Differences:
 * - The success payload is generic (Ok) instead of hard-coded to AxiosResponse.
 * - send() always returns Promise<Ok>.
 * - run() may return either void or Promise<Ok>, depending on adapter.
 *
 * @template Ok Type of the "successful" response payload.
 */
export interface AdapterResult<Ok = unknown> {
    /**
     * Fire-and-forget trigger.
     *
     * Intended for flows where the caller does not care about the response
     * object itself (e.g. SPA navigation).
     *
     * @param options Optional adapter-specific options.
     */
    submit(options?: unknown): void;

    /**
     * Promise-based trigger.
     *
     * Intended for flows where the caller wants to await the response object.
     * Adapters should reject the promise when an error occurs.
     *
     * @param options Optional adapter-specific options.
     */
    send(options?: unknown): Promise<Ok>;

    /**
     * Convenience trigger.
     *
     * Adapters are free to implement this as:
     * - submit(options) (returning void), or
     * - send(options) (returning Promise<Ok>).
     *
     * Callers that need strict typing can prefer send();
     * callers that just need "do the thing" can use run().
     *
     * @param options Optional adapter-specific options.
     */
    run(options?: unknown): void | Promise<Ok>;
}

/**
 * Configuration passed from the core runtime to a concrete adapter factory.
 *
 * @template Body Type of the outbound payload (form values + extra data).
 * @template Ok   Type of the "successful" response payload.
 * @template Err  Type of the "error" payload.
 */
export interface AdapterConfig<Body = unknown, Ok = unknown, Err = unknown> {
    /**
     * Request body payload built by the core.
     *
     * Typically something like:
     *
     *   { ...formValues, ...extra }
     */
    data: Body;

    errorBag?: string;

    /**
     * Lifecycle callbacks provided by the core.
     *
     * The adapter should invoke these at the appropriate times; it must not
     * swallow errors without calling onError (when provided).
     */
    callbacks?: AdapterCallbacks<Ok, Err>;
}

/**
 * Factory function type for creating an adapter instance.
 *
 * Concrete implementations (Axios, Inertia, fetch, custom) can conform
 * to this signature. The core runtime only knows about this type and does
 * not depend on any adapter-specific details.
 *
 * @template Body Type of the outbound payload (form values + extra data).
 * @template Ok   Type of the "successful" response payload.
 * @template Err  Type of the "error" payload.
 */
export type AdapterFactory<
    Body = unknown,
    Ok = unknown,
    Err = unknown,
> = (config: AdapterConfig<Body, Ok, Err>) => AdapterResult<Ok>;

/**
 * Registry of adapter flavours.
 *
 * The library hard-codes a single built-in adapter flavour:
 *
 *   - 'local' → host-handled, no transport semantics.
 *               .send() resolves to `{ data: Body }`.
 *
 * Hosts can extend this interface via module augmentation to add
 * their own adapter flavours (e.g. 'axios', 'inertia', ...).
 */
export interface Adapters {
    local: {
        /**
         * Type of the value produced by adapter.send() for this adapter flavour.
         */
        ok: { data: unknown };

        /**
         * Type of the error value passed into callbacks.onError for this adapter.
         */
        err: unknown;
    };

    axios: {
        /**
         * What adapter.send() resolves with for Axios.
         */
        ok: AxiosResponse<unknown>;

        /**
         * What callbacks.onError receives for Axios.
         *
         * We pass the *payload* (e.g. response.data), not the raw AxiosError,
         * so Form Palette's autoErr branch can see `.errors`.
         */
        err: unknown;

        /**
         * Extra public props exposed on CoreProps when adapter="axios".
         *
         * These are set on the Core shell and then used by createAxiosAdapter.
         */
        props: {
            /**
             * Request URL for this form.
             * Required when using the axios adapter.
             */
            url: string;

            /**
             * HTTP method to use for this form.
             * Optional: the adapter/Core can still default to "post".
             */
            method?: Method;

            /**
             * Base Axios request config merged into every request.
             *
             * Useful for baseURL, headers, withCredentials, params,
             * timeout, etc. Per-call overrides still go through the
             * `options` parameter of submit/send/run.
             */
            config?: AxiosRequestConfig<any>;
        };
    };

    inertia: {
        /**
         * What adapter.send() resolves with for Inertia.
         * This is the Page object passed to onSuccess.
         */
        ok: Page<any>;

        /**
         * What callbacks.onError receives for Inertia.
         *
         * We shape this as `{ errors: ErrorBag }` so Form Palette's
         * autoErr branch can see `.errors`.
         */
        err: { errors: Record<string, string | string[]> } | unknown;

        /**
         * Extra public props exposed on CoreProps when adapter="inertia".
         */
        props: {
            /**
             * Target URL / route for the Inertia visit.
             */
            url: string;

            /**
             * HTTP method to use for the visit.
             */
            method?: Method;
        };
    };
}

export type AdapterProps<K extends AdapterKey> =
    Adapters[K] extends { props: infer P } ? P : {};
/**
 * Union of all adapter keys known to the core.
 *
 * Hosts can extend this union by augmenting the Adapters interface.
 */
export type AdapterKey = keyof Adapters;

/**
 * Helper: given an adapter key K, get its "ok" payload type.
 */
export type AdapterOk<K extends AdapterKey> = Adapters[K]['ok'];

/**
 * Helper: given an adapter key K, get its "error" payload type.
 */
export type AdapterError<K extends AdapterKey> = Adapters[K]['err'];

/**
 * Helper: what CoreProps.onSubmitted receives for adapter K.
 *
 * For now, this is the same as AdapterOk<K>. If a host wants a different
 * shape, they can wrap/transform in their own components.
 */
export type AdapterSubmit<K extends AdapterKey> = AdapterOk<K>;

/**
 * AdapterConfig specialised for a named adapter key K, using the
 * registry's ok/err types for that key.
 *
 * @template K    Adapter key.
 * @template Body Outbound payload type.
 */
export type NamedAdapterConfig<
    K extends AdapterKey,
    Body = unknown,
> = AdapterConfig<Body, AdapterOk<K>, AdapterError<K>> & AdapterProps<K>;

/**
 * AdapterFactory specialised for a named adapter key K.
 *
 * @template K    Adapter key.
 * @template Body Outbound payload type.
 */
export type NamedAdapterFactory<
    K extends AdapterKey,
    Body = unknown,
> = (config: NamedAdapterConfig<K, Body>) => AdapterResult<AdapterOk<K>>;
```

---
#### 84


` File: packages/form-palette/src/schema/core.ts`  [↑ Back to top](#index)

```ts
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
export type BaseProps<V extends Dict, S extends z.ZodType | undefined, K extends AdapterKey> = {
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
        options: Dict
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
        form: CoreContext<InferFromSchema<S, V>>
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
        e: SubmitEvent<T, K>
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
> = BaseProps<V, S, K> & AdapterProps<K> & {
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
        resolve?: () => void
    ): void | Promise<void>;
}

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
        autoErr?: boolean
    ): Promise<AdapterResult<any> | undefined>;

    /**
     * Persist values to a provided data object, optionally transforming
     * values via the feed function.
     */
    persist(
        data: Partial<V>,
        feed?: (name: string, value: unknown, original: unknown) => unknown
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
    isDirty(): boolean
}
```

---
#### 85


` File: packages/form-palette/src/schema/field.ts`  [↑ Back to top](#index)

```ts
// src/schema/field.ts
// noinspection GrazieInspection

import type { RefObject } from "react";

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
}
```

---
#### 86


` File: packages/form-palette/src/schema/input-field.ts`  [↑ Back to top](#index)

```ts
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
```

---
#### 87


` File: packages/form-palette/src/schema/variant.ts`  [↑ Back to top](#index)

```ts
// src/schema/variant.ts
// noinspection GrazieInspection

import type { ComponentType } from "react";

import type { Dict, CoreContext } from "@/schema/core";
import type { Field } from "@/schema/field";
import type {
    FieldLayoutConfig,
    LayoutResolver,
    ValidateResult,
} from "@/schema/input-field";
import type { VariantBaseProps } from "@/variants/shared";
import { ShadcnNumberVariantProps } from "@/presets/shadcn-variants/number";
import { ShadcnPhoneVariantProps } from "@/presets/shadcn-variants/phone";
import { ShadcnColorVariantProps } from "@/presets/shadcn-variants/color";
import { ShadcnPasswordVariantProps } from "@/presets/shadcn-variants/password";
import {
    ShadcnDateVariantProps,
} from "@/presets/shadcn-variants/date";
import { ShadcnChipsVariantProps } from "@/presets/shadcn-variants/chips";
import { ShadcnTextareaVariantProps } from "@/presets/shadcn-variants/textarea";
import { ShadcnToggleVariantProps } from "@/presets/shadcn-variants/toggle";
import { ShadcnRadioVariantProps } from "@/presets/shadcn-variants/radio";
import { CheckboxVariantPublicValue, ShadcnCheckboxVariantPublicProps } from "@/presets/shadcn-variants/checkbox";
import { ShadcnMultiSelectVariantProps } from "@/presets/shadcn-variants/multiselect";
import { SliderValue } from "@/variants/core/slider";
import { ShadcnSliderVariantProps } from "@/presets/shadcn-variants/slider";
import { KeyValueMap, ShadcnKeyValueVariantProps } from "@/presets/shadcn-variants/keyvalue";
import { ShadcnCustomVariantProps } from "@/presets/shadcn-variants/custom";
import { ShadcnTreeSelectVariantProps } from "@/presets/shadcn-variants/treeselect";
import { FileLike, ShadcnFileVariantProps } from "@/presets/shadcn-variants/file";
import { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { SelectVariantProps } from "@/variants/core/select";
import { ShadcnToggleVariantProps as ShadcnToggleGroupVariantProps } from "@/presets/shadcn-variants/toggle-group";
import { ShadcnEditorVariantProps } from "@/presets/shadcn-variants/editor";
import { JsonObject } from "@/lib/json-editor/utils";
import { ShadcnJsonEditorProps } from "@/presets/shadcn-variants/json-editor/types";

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
    'toggle-group': VariantEntry<any | undefined, ShadcnToggleGroupVariantProps>

    radio: VariantEntry<unknown | undefined, ShadcnRadioVariantProps<unknown, H>>
    checkbox: VariantEntry<CheckboxVariantPublicValue, ShadcnCheckboxVariantPublicProps>
    select: VariantEntry<string | number | undefined, SelectVariantProps>
    'multi-select': VariantEntry<Array<string | number> | undefined, ShadcnMultiSelectVariantProps>,
    slider: VariantEntry<SliderValue, ShadcnSliderVariantProps>
    keyvalue: VariantEntry<KeyValueMap | undefined, ShadcnKeyValueVariantProps>
    custom: VariantEntry<unknown | undefined, ShadcnCustomVariantProps>,
    treeselect: VariantEntry<string | number | undefined, ShadcnTreeSelectVariantProps>,
    file: VariantEntry<FileLike, ShadcnFileVariantProps>
    editor: VariantEntry<string | undefined, ShadcnEditorVariantProps>
    'json-editor': VariantEntry<JsonObject | undefined, ShadcnJsonEditorProps>
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
#### 88


` File: packages/form-palette/src/variants/core/checkbox.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/checkbox.ts

import type { VariantModuleFor } from "@/schema/variant";
import { ShadcnCheckboxVariant } from "@/presets/shadcn-variants/checkbox";
import type {
   ShadcnCheckboxVariantPublicProps,
   CheckboxVariantPublicValue,
} from "@/presets/shadcn-variants/checkbox";
import type { VariantBaseProps } from "@/variants/shared";
import { toggleLayoutDefaults } from "./toggle";

/**
 * Public props type you can import elsewhere:
 *
 *   import type { CheckboxVariantProps } from "@/variants/core/checkbox";
 */
export type CheckboxVariantProps = ShadcnCheckboxVariantPublicProps;

/**
 * Concrete Variant component type, if you need it:
 *
 *   VariantBaseProps<CheckboxVariantPublicValue> & CheckboxVariantProps
 */
type CheckboxVariantComponentProps =
   VariantBaseProps<CheckboxVariantPublicValue> & CheckboxVariantProps;

/**
 * Runtime module for the "checkbox" variant.
 *
 * This wires the Shadcn preset into the core registry with sensible defaults.
 */
export const checkboxModule: VariantModuleFor<"checkbox"> = {
   variant: "checkbox",

   // ShadcnCheckboxVariant is generic; we fix it to the public aliases
   // via this cast. At call sites you'll still get strong typing because
   // the registry types know the concrete value/props.
   Variant: ShadcnCheckboxVariant as unknown as React.ComponentType<CheckboxVariantComponentProps>,

   resolveLayout({ props }) {
      if (props.single) {
         return toggleLayoutDefaults
      }

      return {};
   },

   meta: {
      label: "Checkbox",
      description:
         "Single or group checkboxes with optional per-item tri-state support.",
      tags: ["checkbox", "group", "boolean", "tri-state"],
   },
};
```

---
#### 89


` File: packages/form-palette/src/variants/core/chips.tsx`  [↑ Back to top](#index)

```tsx
import ShadcnChipsVariant from "@/presets/shadcn-variants/chips";
import { VariantModuleFor } from "@/schema/variant";


export const chipVariant: VariantModuleFor<"chips"> = {
   variant: "chips",
   Variant: ShadcnChipsVariant as any,
   // Optional layout defaults – tweak as you like
   defaults: {
      layout: {
         fullWidth: true,
         // You can set defaultSize/defaultDensity here if you want:
         // defaultSize: "md",
         // defaultDensity: "normal",
      },
   },
   meta: {
      label: "Chips",
      description: "Chips input allowing multiple selections.",
      tags: ["chips", "multi-select", "tags"],
   },
}
```

---
#### 90


` File: packages/form-palette/src/variants/core/color.tsx`  [↑ Back to top](#index)

```tsx
// ———————————————————————————————
// VariantModule wiring

import { ShadcnColorVariant } from "@/presets/shadcn-variants/color";
import { VariantModule } from "@/schema/variant";

// ———————————————————————————————
export const ColorVariantModule: VariantModule<"color"> = {
   variant: "color",
   Variant: ShadcnColorVariant,
   meta: {
      label: "Phone",
      description: "Phone number input with country code and masking.",
      tags: ["phone", "tel", "contact"],
   },
};
```

---
#### 91


` File: packages/form-palette/src/variants/core/custom.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/custom.tsx

import type { VariantModule } from "@/schema/variant";
import { ShadcnCustomVariant } from "@/presets/shadcn-variants/custom";

/**
 * Core "custom" variant module.
 *
 * - Delegates all UI to ShadcnCustomVariant.
 * - No layout defaults, no built-in validation.
 * - Consumers can override layout via InputField props if needed.
 */
export const customVariant: VariantModule<"custom"> = {
   variant: "custom",
   Variant: ShadcnCustomVariant,
};

export default customVariant;
```

---
#### 92


` File: packages/form-palette/src/variants/core/date.tsx`  [↑ Back to top](#index)

```tsx
import ShadcnDateVariant from "@/presets/shadcn-variants/date";
import { VariantModuleFor } from "@/schema/variant";


export const dateVariant: VariantModuleFor<"date"> = {
   variant: "date",
   Variant: ShadcnDateVariant as any,

   // Optional layout defaults – tweak as you like
   defaults: {
      layout: {
         fullWidth: true,
         // You can set defaultSize/defaultDensity here if you want:
         // defaultSize: "md",
         // defaultDensity: "normal",
      },
   },

   meta: {
      label: "Date",
      description:
         "Date input with calendar picker.",
      tags: ["date", "calendar", "picker"],
   },
}
```

---
#### 93


` File: packages/form-palette/src/variants/core/editor.ts`  [↑ Back to top](#index)

```ts
import { VariantModule } from "@/schema/variant";
import { ShadcnEditorVariant } from "@/presets/shadcn-variants/editor";

export const shadcnEditorVariant: VariantModule<"editor"> = {
    variant: "editor",
    Variant: ShadcnEditorVariant,
    meta: {
        label: "Editor",
        description: "Toast UI Editor (vanilla @toast-ui/editor).",
        tags: ["editor", "rich-text", "markdown", "toast-ui"],
    },
};
```

---
#### 94


` File: packages/form-palette/src/variants/core/file.tsx`  [↑ Back to top](#index)

```tsx
import ShadcnFileVariant from "@/presets/shadcn-variants/file";
import { VariantModule } from "@/schema/variant";



export const fileManagerModule: VariantModule<'file'> = {
   Variant: ShadcnFileVariant as any,
   variant: 'file'
}
```

---
#### 95


` File: packages/form-palette/src/variants/core/json-editor.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/json-editor.tsx

import type { VariantModule } from "@/schema/variant";
import ShadcnJsonEditorVariant from "@/presets/shadcn-variants/json-editor";
import type { ShadcnJsonEditorProps } from "@/presets/shadcn-variants/json-editor/types";
import Ajv from "ajv";

const ajv = new Ajv({
    allErrors: true,
    strict: false,
});

/**
 * Core JSON Editor variant module.
 */
export const jsonEditorVariant: VariantModule<"json-editor"> = {
    variant: "json-editor",

    // Visual component: Shadcn-based JSON editor
    Variant: ShadcnJsonEditorVariant as any,

    // Validation logic
    validate(value, { props }) {
        const { schema } = props;
        let resolvedSchema = schema;

        // If schema is a string, try to parse it as JSON
        if (typeof schema === "string") {
            try {
                resolvedSchema = JSON.parse(schema);
            } catch (e) {
                // If it's not valid JSON, we can't use it for validation
                // It might be a schema ID/name, so we skip AJV validation here
                resolvedSchema = null;
            }
        }

        // Only try a validation if the schema property is provided (as an object)
        if (resolvedSchema && typeof resolvedSchema === "object") {
            try {
                const validate = ajv.compile(resolvedSchema);
                const valid = validate(value);

                if (!valid) {
                    // Return the first error message or a generic one
                    const error = validate.errors?.[0];
                    return error ? `${error.instancePath} ${error.message}`.trim() : "Invalid JSON structure";
                }
            } catch (e) {
                // Compilation error (e.g. invalid schema format)
                return `Schema Error: ${e instanceof Error ? e.message : String(e)}`;
            }
        }

        return true;
    },

    // Layout defaults for this variant
    defaults: {
        layout: {
            labelPlacement: "top",
            sublabelPlacement: "right",
            descriptionPlacement: "below",
            helpTextPlacement: "below",
            errorTextPlacement: "below",
            inline: false,
            fullWidth: true,
            defaultSize: "md",
            defaultDensity: "comfortable",
        },
    },

    meta: {
        label: "JSON Editor",
        description: "Advanced JSON editor with visual and raw modes",
        tags: ["json", "editor", "object", "array"],
    },
};

export default jsonEditorVariant;
```

---
#### 96


` File: packages/form-palette/src/variants/core/keyvalue.tsx`  [↑ Back to top](#index)

```tsx
import ShadcnKeyValueVariant from "@/presets/shadcn-variants/keyvalue";
import { VariantModule } from "@/schema/variant";


export const keyValueModule: VariantModule<'keyvalue'> = {
   variant: 'keyvalue',
   Variant: ShadcnKeyValueVariant,

   meta: {
      label: ''
   }
}
```

---
#### 97


` File: packages/form-palette/src/variants/core/multiselect.tsx`  [↑ Back to top](#index)

```tsx


// src/variants/multi-select.ts

import type { VariantModule } from "@/schema/variant";
import {
   ShadcnMultiSelectVariant,
   type ShadcnMultiSelectVariantProps,
} from "@/presets/shadcn-variants/multiselect";

export type MultiSelectValue = (string | number)[] | undefined;


/**
 * Variant module for "multi-select".
 *
 * No defaults / layout overrides here — layout is driven by InputField +
 * host overrides, same as your other variants.
 */
export const multiSelectVariantModule: VariantModule<"multi-select"> = {
   variant: "multi-select",
   Variant: ShadcnMultiSelectVariant,
   meta: {
      
   }
};

export default multiSelectVariantModule;
```

---
#### 98


` File: packages/form-palette/src/variants/core/number.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/text.tsx

import * as React from "react";

import type { Dict } from "@/schema/core";
import type { VariantModule } from "@/schema/variant";
import type { ValidateResult } from "@/schema/input-field";
import { ShadcnTextVariant } from "@/presets/shadcn-variants/text";
import type { ShadcnTextUiProps } from "@/presets/shadcn-variants/text";
import { ShadcnNumberVariant, ShadcnNumberVariantProps } from "@/presets/shadcn-variants/number";

/**
 * Text variant props (core layer).
 *
 * - Extends Dict so it can cleanly participate in the Variants registry.
 * - Extends the Shadcn UI props so the core variant can pass everything
 *   straight through to the underlying visual component.
 *
 * This is where we hang *semantic* flags that drive validation.
 */
export interface TextVariantProps extends Dict, ShadcnTextUiProps {
   /**
    * If true, the value will be trimmed before validation.
    * (Visual value is still whatever the user types; this is just for
    * validation semantics.)
    */
   trim?: boolean;

   /**
    * Minimum allowed string length (after optional trimming).
    */
   minLength?: number;

   /**
    * Maximum allowed string length (after optional trimming).
    */
   maxLength?: number;
}

/**
 * Simple validation helper for the text variant.
 */
function validateText(
   value: number | undefined,
   ctx: {
      required?: boolean;
      props: ShadcnNumberVariantProps;
   }
): ValidateResult {
   const { required, props } = ctx;
   const { minLength, maxLength } = props;

   const raw = (value ?? "") + "";
   const v = raw.trim();

   // required
   if (required && v.length === 0) {
      return "This field is required.";
   }

   // minLength
   if (typeof minLength === "number" && v.length > 0 && v.length < minLength) {
      return `Please enter at least ${minLength} characters.`;
   }

   // maxLength
   if (typeof maxLength === "number" && v.length > maxLength) {
      return `Please enter no more than ${maxLength} characters.`;
   }

   return true;
}

/**
 * Core text variant module.
 *
 * - Uses ShadcnTextVariant as the visual component.
 * - Adds simple length-based validation.
 * - Provides layout defaults for InputField to use.
 */
export const numberVariant: VariantModule<"number"> = {
   variant: "number",

   // Visual component: Shadcn-based text input
   Variant: ShadcnNumberVariant as any,

   // Validation logic (runs before/alongside per-field onValidate)
   validate(value, { required, props, field, form }) {
      // field + form are available if you need them later.
      return validateText(value, { required, props });
   },

   // Layout defaults for this variant
   defaults: {
      layout: {
         labelPlacement: "top",
         sublabelPlacement: "right",
         descriptionPlacement: "below",
         helpTextPlacement: "below",
         errorTextPlacement: "below",
         inline: false,
         fullWidth: true,
         defaultSize: "md",
         defaultDensity: "comfortable",
      },
   },

   meta: {
      label: "Number",
      description: "Single-line number input",
      tags: ["number", "input", "integer", "float"],
   },
};

export default numberVariant;
```

---
#### 99


` File: packages/form-palette/src/variants/core/password.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/password.tsx

import type { VariantModuleFor } from "@/schema/variant";
import { ShadcnPasswordVariant } from "@/presets/shadcn-variants/password";

/**
 * Core module for the "password" variant.
 *
 * - Uses the ShadcnPasswordVariant UI (Input + reveal toggle + strength meter).
 * - Value type is string | undefined (from Variants["password"].value).
 * - Props are ShadcnPasswordVariantProps (from Variants["password"].props).
 */
export const passwordVariant: VariantModuleFor<"password"> = {
   variant: "password",
   Variant: ShadcnPasswordVariant,

   // Optional layout defaults – tweak as you like
   defaults: {
      layout: {
         fullWidth: true,
         // You can set defaultSize/defaultDensity here if you want:
         // defaultSize: "md",
         // defaultDensity: "normal",
      },
   },

   meta: {
      label: "Password",
      description:
         "Password input with reveal toggle and optional strength meter.",
      tags: ["auth", "security", "password"],
   },
};

export default passwordVariant;
```

---
#### 100


` File: packages/form-palette/src/variants/core/phone.tsx`  [↑ Back to top](#index)

```tsx
// ———————————————————————————————
// VariantModule wiring

import { ShadcnPhoneVariant } from "@/presets/shadcn-variants/phone";
import { VariantModule } from "@/schema/variant";

// ———————————————————————————————
export const PhoneVariantModule: VariantModule<"phone"> = {
   variant: "phone",
   Variant: ShadcnPhoneVariant,
   meta: {
      label: "Phone",
      description: "Phone number input with country code and masking.",
      tags: ["phone", "tel", "contact"],
   },
};
```

---
#### 101


` File: packages/form-palette/src/variants/core/radio.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/radio.ts

import type { VariantModuleFor } from "@/schema/variant";
import { ShadcnRadioVariant } from "@/presets/shadcn-variants/radio";

/**
 * Built-in "radio" variant module.
 *
 * Uses the Shadcn-based implementation in presets/shadcn-variants/radio.tsx
 */
export const radioVariantModule: VariantModuleFor<"radio"> = {
   variant: "radio",
   // Note: registry-level typing uses unknown, but the component itself is generic.
   Variant: ShadcnRadioVariant as any,
   defaults: {
      layout: {
         // Standard stacked field layout; the smart renderer still
         // handles ordering/relative roots for helpers.
         labelPlacement: "top",
         sublabelPlacement: "right",
         descriptionPlacement: "below",
         helpTextPlacement: "below",
         errorTextPlacement: "below",
         inline: false,
         fullWidth: true,

         // Explicit layout hints
         defaultSize: "md",
         defaultDensity: "comfortable", // ← uses your FieldDensity union
      },
   },
   meta: {
      label: "Radio group",
      description:
         "Choose one option from a list of mutually exclusive choices.",
      tags: ["choice", "select", "exclusive", "radio"],
   },
};
```

---
#### 102


` File: packages/form-palette/src/variants/core/select.tsx`  [↑ Back to top](#index)

```tsx
import ShadcnSelectVariant, { ShadcnSelectVariantProps } from "@/presets/shadcn-variants/select";
import { VariantModuleFor } from "@/schema/variant";

export type SelectVariantProps = ShadcnSelectVariantProps;

export const selectModule: VariantModuleFor<"select"> = {
   variant: "select",
   Variant: ShadcnSelectVariant,

   meta: {
      label: "Select",
      description: "Single-value dropdown based on Shadcn Select.",
      tags: ["select", "dropdown", "single-value"],
   },
};
```

---
#### 103


` File: packages/form-palette/src/variants/core/slider.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/slider.ts

import type { ValidateResult } from "@/schema/input-field";
import type { ShadcnSliderVariantProps } from "@/presets/shadcn-variants/slider";
import { ShadcnSliderVariant } from "@/presets/shadcn-variants/slider";
import { VariantModule } from "@/schema/variant";

/**
 * Slider value type:
 * - `number | undefined` for now (single-value slider).
 *   If/when you add range support, this can be widened to [number, number].
 */
export type SliderValue = number | undefined;


/**
 * Basic validation:
 * - if required → must have a numeric value
 * - otherwise always OK
 */
function validateSlider(
   value: SliderValue,
   ctx: { required?: boolean }
): ValidateResult {
   if (ctx.required) {
      if (value === undefined || value === null) {
         return "Required.";
      }
      if (typeof value !== "number" || Number.isNaN(value)) {
         return "Invalid number.";
      }
   }

   // You could optionally enforce min/max here using ctx.props
   return true;
}

/**
 * Register the slider variant with the global registry.
 *
 * No layout defaults are provided here:
 * - layout (inline vs stacked, label placement, etc.) is controlled by
 *   the host via FieldLayoutConfig / InputField overrides instead.
 */
export default {
   variant: "slider",
   Variant: ShadcnSliderVariant,
   validate(value, ctx): ValidateResult {
      return validateSlider(value as SliderValue, {
         required: ctx.required,
      });
   },
} as VariantModule<'slider'>;

export type SliderVariantProps = ShadcnSliderVariantProps;
```

---
#### 104


` File: packages/form-palette/src/variants/core/text.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/text.tsx

import * as React from "react";

import type { Dict } from "@/schema/core";
import type { VariantModule } from "@/schema/variant";
import type { ValidateResult } from "@/schema/input-field";
import { ShadcnTextVariant } from "@/presets/shadcn-variants/text";
import type { ShadcnTextUiProps, ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";

/**
 * Text variant props (core layer).
 *
 * - Extends Dict so it can cleanly participate in the Variants registry.
 * - Extends the Shadcn UI props so the core variant can pass everything
 *   straight through to the underlying visual component.
 *
 * This is where we hang *semantic* flags that drive validation.
 */
export interface TextVariantProps extends Dict, ShadcnTextUiProps {
    /**
     * If true, the value will be trimmed before validation.
     * (Visual value is still whatever the user types; this is just for
     * validation semantics.)
     */
    trim?: boolean;

    /**
     * Minimum allowed string length (after optional trimming).
     */
    minLength?: number;

    /**
     * Maximum allowed string length (after optional trimming).
     */
    maxLength?: number;
}

/**
 * Simple validation helper for the text variant.
 */
function validateText(
    value: string | undefined,
    ctx: {
        required?: boolean;
        props: ShadcnTextVariantProps & TextVariantProps;
    }
): ValidateResult {
    const { required, props } = ctx;
    const { trim, minLength, maxLength } = props;

    const raw = value ?? "";
    const v = trim ? raw.trim() : raw;

    // required
    if (required && v.length === 0) {
        return "This field is required.";
    }

    // minLength
    if (typeof minLength === "number" && v.length > 0 && v.length < minLength) {
        return `Please enter at least ${minLength} characters.`;
    }

    // maxLength
    if (typeof maxLength === "number" && v.length > maxLength) {
        return `Please enter no more than ${maxLength} characters.`;
    }

    return true;
}

/**
 * Core text variant module.
 *
 * - Uses ShadcnTextVariant as the visual component.
 * - Adds simple length-based validation.
 * - Provides layout defaults for InputField to use.
 */
export const textVariant: VariantModule<"text"> = {
    variant: "text",

    // Visual component: Shadcn-based text input
    Variant: ShadcnTextVariant,

    // Validation logic (runs before/alongside per-field onValidate)
    validate(value, { required, props, field, form }) {
        //@ts-ignore field + form are available if you need them later.
        return validateText(value, { required, props });
    },

    // Layout defaults for this variant
    defaults: {
        layout: {
            labelPlacement: "top",
            sublabelPlacement: "right",
            descriptionPlacement: "below",
            helpTextPlacement: "below",
            errorTextPlacement: "below",
            inline: false,
            fullWidth: true,
            defaultSize: "md",
            defaultDensity: "comfortable",
        },
    },

    meta: {
        label: "Text",
        description: "Single-line text input",
        tags: ["text", "input", "string"],
    },
};

export default textVariant;
```

---
#### 105


` File: packages/form-palette/src/variants/core/textarea.tsx`  [↑ Back to top](#index)

```tsx
import ShadcnTextareaVariant from "@/presets/shadcn-variants/textarea";
import { VariantModuleFor } from "@/schema/variant";


export const textareaVariant: VariantModuleFor<"textarea"> = {
   variant: "textarea",
   Variant: ShadcnTextareaVariant as any,
   // Optional layout defaults – tweak as you like
   defaults: {
      layout: {
         fullWidth: true,
         // You can set defaultSize/defaultDensity here if you want:
         // defaultSize: "md",
         // defaultDensity: "normal",
      },
   },
   meta: {
      label: "Textarea",
      description: "Multi-line text input area.",
      tags: ["text", "multiline", "comments", "notes"],
   },
}
```

---
#### 106


` File: packages/form-palette/src/variants/core/toggle-group.tsx`  [↑ Back to top](#index)

```tsx
// ———————————————————————————————
// VariantModule wiring

import { ShadcnToggleVariant } from "@/presets/shadcn-variants/toggle-group";
import { VariantModule } from "@/schema/variant";

// ———————————————————————————————
export const toggleGroupModule: VariantModule<"toggle-group"> = {
   variant: "toggle-group",
   Variant: ShadcnToggleVariant,
   meta: {
      label: "Toggle group",
      description: "Toggle group component buttons.",
      tags: ["buttons", "toggle"],
   },
};
```

---
#### 107


` File: packages/form-palette/src/variants/core/toggle.tsx`  [↑ Back to top](#index)

```tsx
// src/variants/core/toggle.ts

import type { VariantModuleFor } from "@/schema/variant";
import type { FieldLayoutConfig } from "@/schema/input-field";
import ShadcnToggleVariant from "@/presets/shadcn-variants/toggle";

export const toggleLayoutDefaults: FieldLayoutConfig = {
   // Render label + control in a single row
   inline: true,

   // Semantically: label is to the "right" of the control for this variant.
   // (Your InputField can use this to decide macro-level positioning.)
   labelPlacement: "right",

   // Attach all helpers to the label root by default.
   // Sublabel will still use its own placement (default: "right"),
   // but it's logically anchored to the label block.
   relativeRoots: {
      sublabel: "label",
      description: "label",
      helpText: "label",
      errorText: "label",
   },

   fullWidth: false,

   // Within the label root, show error first, then description, then help,
   // then sublabel (all still respecting their individual placements).
   ordering: {
      label: ["errorText", "description", "helpText", "sublabel"],
      // For this variant we don't really use input-root helpers,
      // but we keep the key for completeness.
      input: [],
   },
};

export const ToggleVariantModule: VariantModuleFor<"toggle"> = {
   variant: "toggle",
   Variant: ShadcnToggleVariant as any,
   defaults: {
      layout: toggleLayoutDefaults,
   },
   meta: {
      label: "Toggle",
      description: "Boolean on/off switch",
      tags: ["boolean", "toggle", "switch"],
   },
};

export default ToggleVariantModule;
```

---
#### 108


` File: packages/form-palette/src/variants/core/treeselect.tsx`  [↑ Back to top](#index)

```tsx
import ShadcnTreeSelectVariant from "@/presets/shadcn-variants/treeselect";
import { VariantModule } from "@/schema/variant";



const treeselectModule: VariantModule<'treeselect'> = {
   variant: 'treeselect',
   Variant: ShadcnTreeSelectVariant as any
}

export default treeselectModule
```

---
#### 109


` File: packages/form-palette/src/variants/helpers/selection-summary.tsx`  [↑ Back to top](#index)

```tsx
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/presets/ui/popover";

type NormalizedMultiItem = {
   key: string;
   value: string | number;
   labelNode: React.ReactNode;
   labelText: string; // Used for width calculation
   disabled?: boolean;
};

export interface SelectionSummaryProps {
   selectedItems: NormalizedMultiItem[];
   placeholder?: React.ReactNode;
   onRemoveValue?: (value: NormalizedMultiItem) => void;
}

/**
 * Helper: Measure text width using a canvas.
 * Much faster than rendering hidden DOM elements.
 */
function getTextWidth(text: string, font: string) {
   if (typeof window === "undefined") return 0;
   const canvas =
      (window as any).__canvas ||
      ((window as any).__canvas = document.createElement("canvas"));
   const context = canvas.getContext("2d");
   context.font = font;
   const metrics = context.measureText(text);
   return metrics.width;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
   selectedItems,
   placeholder,
   onRemoveValue,
}) => {
   const containerRef = React.useRef<HTMLSpanElement | null>(null);
   const [visibleCount, setVisibleCount] = React.useState(0);
   const [moreOpen, setMoreOpen] = React.useState(false);

   // Measure available width and calculate how many items fit
   React.useLayoutEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const computeVisibleItems = () => {
         const containerWidth = el.clientWidth;

         // 1. Get current font styles to ensure accurate measurement
         const computedStyle = window.getComputedStyle(el);
         const font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;

         // 2. Calculate the "Buffer" (12 characters width)
         // This is the space reserved for the "+ N more" trigger if truncation happens.
         // We use 'M' or '0' as an average widest character approximation, or a standard string.
         const bufferWidth = getTextWidth("000000000000", font);

         // 3. Width of the separator (e.g., ", ")
         const commaWidth = getTextWidth(", ", font);

         let usedWidth = 0;
         let count = 0;
         const totalItems = selectedItems.length;

         for (let i = 0; i < totalItems; i++) {
            const item = selectedItems[i];
            const itemWidth = getTextWidth(item.labelText, font);

            // Is this the very last item in the entire list?
            const isLastItem = i === totalItems - 1;

            // If it's the last item, we don't need the buffer space.
            // If it's NOT the last item, we must ensure we have space for this item AND the buffer.
            // (Because if we can't fit the *next* item, we'll need the buffer to show the badge).
            const spaceNeeded = isLastItem
               ? itemWidth
               : itemWidth + commaWidth + bufferWidth;

            if (usedWidth + spaceNeeded <= containerWidth) {
               usedWidth += itemWidth + commaWidth;
               count++;
            } else {
               // No more space
               break;
            }
         }

         // Ensure we show at least 1 item if there are items, 
         // unless even the first item is wider than the container (then CSS truncation handles it).
         setVisibleCount(Math.max(1, count));
      };

      computeVisibleItems();

      const ro = new ResizeObserver(computeVisibleItems);
      ro.observe(el);
      return () => ro.disconnect();
   }, [selectedItems, selectedItems.length]); // Re-run if items change

   const totalCount = selectedItems.length;

   if (!totalCount) {
      return (
         <span ref={containerRef} className="truncate text-muted-foreground w-full block">
            {placeholder ?? "Select options…"}
         </span>
      );
   }

   const visibleItems = selectedItems.slice(0, visibleCount);
   // If visible count covers everything, overflow is 0
   const overflowCount = totalCount - visibleItems.length;

   // Safety check: if our calculation says we can show X, but X < Total, 
   // strictly ensure we render the "More" chip.
   // If calculation resulted in showing all items, overflow is 0.
   const showMore = overflowCount > 0;

   const handleRemove = (value: NormalizedMultiItem) => {
      if (!onRemoveValue) return;
      onRemoveValue(value);
   };

   return (
      <span
         ref={containerRef}
         className="flex items-center w-full overflow-hidden whitespace-nowrap"
      >
         {/* Render Visible Items */}
         {visibleItems.map((item, index) => (
            <React.Fragment key={item.key}>
               <span className="truncate flex-shrink-0">
                  {item.labelNode}
               </span>
               {/* Add comma if it's not the last visible item */}
               {index < visibleItems.length - 1 && (
                  <span className="text-muted-foreground mr-1">,</span>
               )}
            </React.Fragment>
         ))}

         {/* Render Separator before "More" if needed */}
         {showMore && (
            <span className="text-muted-foreground mr-1">,</span>
         )}

         {/* Render "+N more" Chip */}
         {showMore && (
            <Popover open={moreOpen} onOpenChange={setMoreOpen}>
               <PopoverTrigger asChild>
                  <button
                     type="button"
                     className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 flex-shrink-0"
                     onClick={(e) => e.stopPropagation()}
                  >
                     +{overflowCount} more
                  </button>
               </PopoverTrigger>
               <PopoverContent
                  align="start"
                  className="w-56 max-h-64 overflow-y-auto p-2 text-sm"
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className="flex items-center justify-between mb-1">
                     <span className="font-medium text-xs text-muted-foreground">
                        Selected ({totalCount})
                     </span>
                     <button
                        type="button"
                        className="p-1 rounded hover:bg-muted"
                        onClick={() => setMoreOpen(false)}
                     >
                        <X className="h-3 w-3" />
                     </button>
                  </div>

                  <div className="space-y-1">
                     {selectedItems.map((item) => (
                        <div
                           key={item.key}
                           className={cn(
                              "flex items-center justify-between gap-2 rounded px-2 py-1",
                              "bg-muted/40"
                           )}
                        >
                           <span className="truncate">{item.labelNode}</span>
                           {onRemoveValue && (
                              <button
                                 type="button"
                                 className="flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item);
                                 }}
                              >
                                 <X className="h-3 w-3" />
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
               </PopoverContent>
            </Popover>
         )}
      </span>
   );
};


// src/variants/select-utils.ts (or wherever you keep small helpers)

export type SelectPrimitive = string | number;

/**
 * Remove a single value from a selection array.
 *
 * - Works even if the selection is undefined/null.
 * - Compares using String() so "1" and 1 are treated consistently.
 */
export function removeSelectValue<T extends SelectPrimitive>(
   current: readonly T[] | undefined | null,
   valueToRemove: T
): T[] {
   if (!current || current.length === 0) return [];

   const target = String(valueToRemove);

   return current.filter((v) => String(v) !== target);
}
```

---
#### 110


` File: packages/form-palette/src/variants/index.ts`  [↑ Back to top](#index)

```ts
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
```

---
#### 111


` File: packages/form-palette/src/variants/registry.ts`  [↑ Back to top](#index)

```ts
// src/variants/registry.ts

import type { VariantKey, VariantModule } from "@/schema/variant";

/**
 * Internal storage for registered variants.
 */
const registry = new Map<VariantKey, VariantModule<any>>();

/**
 * Register (or overwrite) a variant module.
 *
 * Typically called from presets, e.g.:
 *
 *   registerVariant(textVariant);
 *   registerVariant(numberVariant);
 */
export function registerVariant<K extends VariantKey>(
    module: VariantModule<K>
): void {
    registry.set(module.variant, module as VariantModule<any>);
}

/**
 * Look up a variant module by key.
 */
export function getVariant<K extends VariantKey>(
    key: K
): VariantModule<K> | undefined {
    return registry.get(key) as VariantModule<K> | undefined;
}

/**
 * List all registered variant modules.
 */
export function listVariants(): VariantModule<VariantKey>[] {
    return Array.from(registry.values()) as VariantModule<VariantKey>[];
}
```

---
#### 112


` File: packages/form-palette/src/variants/shared.ts`  [↑ Back to top](#index)

```ts
// src/variants/shared.ts

import React from "react";

/**
 * Size hint for field variants.
 *
 * Presets can interpret these however they like (font size, padding, etc.).
 */
export type FieldSize = "sm" | "md" | "lg";

/**
 * Density hint for field variants.
 *
 * - "compact"     → tight vertical spacing
 * - "comfortable" → default spacing
 * - "loose"       → extra breathing room
 */
export type FieldDensity = "compact" | "comfortable" | "loose";

/**
 * Logical source of a change event.
 *
 * Variants and utilities can tag changes to help the host reason
 * about where a value came from.
 */
export type ChangeSource =
    | "variant"
    | "paste"
    | "programmatic"
    | "util"
    | (string & {}); // allow custom tags

/**
 * Additional context passed along with value changes.
 */
export interface ChangeDetail<TMeta = unknown, TRaw = unknown> {
    /**
     * Logical source for this change.
     */
    source: ChangeSource;

    /**
     * Optional raw input that produced this value.
     *
     * Example: original keyboard input or pasted string.
     */
    raw?: TRaw;

    nativeEvent?: React.SyntheticEvent;
    /**
     * Variant-specific metadata (e.g. cursor position).
     */
    meta?: TMeta;
}

/**
 * Base props shared by all variant components.
 *
 * Each variant module will extend this with its own props type.
 */
export interface VariantBaseProps<TValue> {
    /**
     * Current logical value for this field.
     */
    value?: TValue | undefined;

    /**
     * Called whenever the variant wants to update the value.
     *
     * The detail payload describes where the change came from.
     */
    onValue?(value: TValue | undefined, detail?: ChangeDetail): void;

    /**
     * State flags.
     */
    disabled?: boolean;
    defaultValue?: any;
    readOnly?: boolean;
    required?: boolean;

    alias?: string;
    main?: boolean;
    /**
     * Current error message for this field, if any.
     */
    error?: string;

    /**
     * Size & density hints.
     *
     * Variants are free to ignore these, but presets (e.g. Shadcn)
     * will typically honour them.
     */
    size?: FieldSize;
    density?: FieldDensity;
}

export interface Extras {
    trailingIcons?: React.ReactNode[];
    leadingIcons?: React.ReactNode[];
    icon?: React.ReactNode;
    iconGap?: number;
    trailingIconSpacing?: number;
    leadingIconSpacing?: number;
    trailingControl?: React.ReactNode;
    leadingControl?: React.ReactNode;
    /**
     * Optional className applied to the container that wraps the leading control.
     * This does not affect the control node itself, only the wrapper div.
     */
    leadingControlClassName?: string;
    /**
     * Optional className applied to the container that wraps the trailing control.
     * This does not affect the control node itself, only the wrapper div.
     */
    trailingControlClassName?: string;
    px?: number;
    py?: number
    pb?: number;
    pe?: number;
    ps?: number;
}

export type ExtraFieldProps<Props> = Extras & Props;
```


---
*Generated with [Prodex](https://github.com/emxhive/prodex) — Codebase decoded.*
<!-- PRODEx v1.4.5 | 2025-12-21T00:44:17.417Z -->