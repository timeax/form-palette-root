// src/core/hooks/use-optional-field.ts
// noinspection GrazieInspection

import {
    useField,
    UseFieldOptions,
    UseFieldReturn,
} from "@/core/hooks/use-field";

/**
 * Optional variant of `useField`.
 *
 * - If there is a CoreProvider, behaves like `useField`.
 * - If not, it fails gracefully and returns `undefined`.
 *
 * This is handy for inputs that should degrade gracefully when
 * rendered outside of a form context.
 */
export function useOptionalField<T = unknown>(
    options: UseFieldOptions<T>
): UseFieldReturn<T> | undefined {
    try {
        return useField<T>(options);
    } catch {
        // Most likely: no CoreProvider / context not available.
        return undefined;
    }
}
