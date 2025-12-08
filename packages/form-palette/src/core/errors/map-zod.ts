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
