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

export { CoreProvider } from "@/core/core-provider";

// Export with aliases directly to keep type info intact
export { CoreShell, CoreShell as Form } from "@/core/core-shell";

export { CoreRoot, CoreRoot as FormRoot } from "@/core/core-root";

// ─────────────────────────────────────────────────────────────
// Core hooks
// ─────────────────────────────────────────────────────────────

export { useCore } from "@/core/hooks/use-core";
export { useCoreContext } from "@/core/hooks/use-core-context";
export { useField } from "@/core/hooks/use-field";
export { useOptionalField } from "@/core/hooks/use-optional-field";
export { useButton } from "@/core/hooks/use-button";

// ─────────────────────────────────────────────────────────────
// Errors / helpers
// ─────────────────────────────────────────────────────────────

export { ErrorStrip } from "@/core/errors/error-strip";
export { mapZodError } from "@/core/errors/map-zod";
export { mapErrorBag } from "@/core/errors/map-error-bag";

// ─────────────────────────────────────────────────────────────
// Input layer
// ─────────────────────────────────────────────────────────────

export { InputField } from "@/input/input-field";
export type { InputFieldProps, InputFieldBaseProps } from "@/input/input-props";

// ─────────────────────────────────────────────────────────────
// Variants & registry
// ─────────────────────────────────────────────────────────────

export { registerVariant, getVariant, listVariants } from "@/variants/registry";

export { registerCoreVariants } from "@/variants"; // if you have a convenience registrar there

export { Textarea } from "@/presets/ui/textarea";
export { Input } from '@/presets/ui/input';
// If you want to surface specific core variants:
export { textVariant } from "@/variants/core/text";
// (and similarly for others as you add them)

// ─────────────────────────────────────────────────────────────
// Adapters
// ─────────────────────────────────────────────────────────────

export * from "@/adapters";
