import { cn } from "@/lib/utils";

/**
 * Standard corner radiuses for form-palette.
 * In Tailwind v4, rounded-md, rounded-sm, and rounded-lg are tied directly
 * to the theme radius scale (--radius-md, --radius-sm, etc.).
 */
export const FIELD_RADIUS = "rounded-md";
export const CONTROL_RADIUS = "rounded-sm";
export const PILL_RADIUS = "rounded-full";

/**
 * Standard surface and border colors for form controls.
 */
export const FIELD_SURFACE = "bg-surfaces-input";
export const FIELD_BORDER = "border-input";

/**
 * Standard focus and invalid states.
 */
export const FIELD_FOCUS =
    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]";
export const FIELD_INVALID =
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40";

/**
 * Base box classes shared across standard input fields and picker triggers.
 */
export const baseFieldBoxClasses = cn(
    "w-full min-w-0 border shadow-xs transition-[color,box-shadow] outline-none",
    FIELD_BORDER,
    FIELD_SURFACE,
    FIELD_RADIUS,
    "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
    FIELD_INVALID,
);
