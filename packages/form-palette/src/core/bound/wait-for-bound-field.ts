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
