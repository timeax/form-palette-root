// src/index.ts

// ─────────────────────────────────────────────────────────────
// Schema exports (types only)
// ─────────────────────────────────────────────────────────────

// TS 5.x+ — keep these as type-only to avoid runtime cycles & noise.
export type * from "@/schema/core";
export type * from "@/schema/adapter";
export type * from "@/schema/field";
export type * from "@/schema/input-field";
export type * from "@/schema/variant";

// ─────────────────────────────────────────────────────────────
// Core runtime: provider + shell/root
// ─────────────────────────────────────────────────────────────

export * from './core'
// ─────────────────────────────────────────────────────────────
// Errors / helpers
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// Input layer
// ─────────────────────────────────────────────────────────────

export * from "@/input";

// ─────────────────────────────────────────────────────────────
// Variants & registry
// ─────────────────────────────────────────────────────────────

export { registerVariant, getVariant, listVariants } from "@/variants/registry";

export { registerCoreVariants } from "@/variants"; // if you have a convenience registrar there

export { Textarea } from "@/presets/ui/textarea";
export { InputMask } from './presets/ui/input-mask';
export { InputNumber } from './presets/ui/number';
export { Input } from '@/presets/ui/input';
// ─────────────────────────────────────────────────────────────
// Adapters
// ─────────────────────────────────────────────────────────────

export * from "@/adapters";

export { registerPaletteUtil, getPaletteUtil } from "@/lib/register-global";