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
