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
