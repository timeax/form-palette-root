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