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
