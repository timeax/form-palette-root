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
