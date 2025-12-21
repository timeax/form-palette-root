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
