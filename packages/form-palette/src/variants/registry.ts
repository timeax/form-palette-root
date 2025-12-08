// src/variants/registry.ts

import type { VariantKey, VariantModule } from "@/schema/variant";

/**
 * Internal storage for registered variants.
 */
const registry = new Map<VariantKey, VariantModule<any>>();

/**
 * Register (or overwrite) a variant module.
 *
 * Typically called from presets, e.g.:
 *
 *   registerVariant(textVariant);
 *   registerVariant(numberVariant);
 */
export function registerVariant<K extends VariantKey>(
    module: VariantModule<K>
): void {
    registry.set(module.variant, module as VariantModule<any>);
}

/**
 * Look up a variant module by key.
 */
export function getVariant<K extends VariantKey>(
    key: K
): VariantModule<K> | undefined {
    return registry.get(key) as VariantModule<K> | undefined;
}

/**
 * List all registered variant modules.
 */
export function listVariants(): VariantModule<VariantKey>[] {
    return Array.from(registry.values()) as VariantModule<VariantKey>[];
}
