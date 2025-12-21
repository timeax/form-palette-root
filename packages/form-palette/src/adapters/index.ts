// src/adapters/index.ts

import axios from "axios";
import { registerAdapter } from "@/core/adapter-registry";
import type { AdapterKey } from "@/schema/adapter";

import { createAxiosAdapter } from "./axios";
import { createInertiaAdapter } from "./inertia";

// Re-export core adapter types + helpers so hosts can import from a single place.
export * from "@/schema/adapter";
export * from "@/core/adapter-registry";

// Re-export the concrete factories for hosts that want manual wiring.
export { createAxiosAdapter, createInertiaAdapter };

/**
 * Register the Axios adapter under the "axios" key.
 *
 * This performs a basic runtime check to make sure Axios is present.
 * If Axios isn't available or doesn't look like a proper Axios instance,
 * an error is thrown.
 */
export function registerAxiosAdapter(): void {
    // Basic sanity check – if this fails, something is wrong with the axios import.
    if (!axios || typeof axios.request !== "function") {
        throw new Error(
            "[form-palette] Axios does not appear to be available. " +
                "Make sure 'axios' is installed and resolvable before calling registerAxiosAdapter()."
        );
    }

    registerAdapter<"axios">("axios", createAxiosAdapter);
}

/**
 * Register the Inertia adapter under the "inertia" key.
 *
 * This explicitly tests that '@inertiajs/react' can be imported and that
 * it exposes a router with a .visit() method. If not, an error is thrown.
 *
 * Note:
 * - This function is async because it uses dynamic import.
 * - Call it at bootstrap time and await it:
 *
 *     await registerInertiaAdapter();
 */
export async function registerInertiaAdapter(): Promise<void> {
    try {
        const mod: any = await import("@inertiajs/react");
        const router = mod?.router ?? mod?.Inertia;

        if (!router || typeof router.visit !== "function") {
            throw new Error(
                "[form-palette] '@inertiajs/react' was imported, " +
                    "but no router with a .visit() method was found."
            );
        }
    } catch (error) {
        throw new Error(
            "[form-palette] Failed to import '@inertiajs/react'. " +
                "Cannot register the 'inertia' adapter. " +
                "Make sure '@inertiajs/react' is installed and resolvable."
        );
    }

    registerAdapter<"inertia">("inertia", createInertiaAdapter);
}

/**
 * Optional helper: convenience registration for known adapter keys.
 *
 * This is purely ergonomic; you can also call registerAxiosAdapter /
 * registerInertiaAdapter directly.
 */
export async function registerKnownAdapter(key: AdapterKey): Promise<void> {
    switch (key) {
        case "axios":
            registerAxiosAdapter();
            return;
        case "inertia":
            await registerInertiaAdapter();
            return;
        default:
            // For now, we only special-case axios/inertia here.
            // Other adapters can be registered by calling registerAdapter() directly.
            throw new Error(
                `[form-palette] registerKnownAdapter: adapter "${key}" is not handled here.`
            );
    }
}

/**
 * Convenience helper: register all known adapters.
 **/
export function registerAllAdapters(): void {
    registerAxiosAdapter();
    registerInertiaAdapter();
}
