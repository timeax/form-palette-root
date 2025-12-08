"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type TriState = boolean | "none"
type BaseProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

export interface CheckboxProps
  extends Omit<BaseProps, "checked" | "onCheckedChange"> {
  checked?: TriState
  onCheckedChange?: (checked: TriState) => void
  /**
   * Enable tri-state behaviour:
   *  - true  → checked (✓)
   *  - false → partial (−)
   *  - "none" → unchecked (empty)
   */
  tristate?: boolean
}

function Checkbox({
  className,
  checked = false,
  onCheckedChange,
  tristate = false,
  ...props
}: CheckboxProps) {
  // Map our states → Radix checked value
  // - in tri-state mode:
  //   true  → true
  //   false → "indeterminate" (minus)
  //   "none" → false (unchecked)
  // - non-tristate: normal boolean
  const internalChecked: boolean | "indeterminate" =
    tristate
      ? checked === true
        ? true
        : checked === false
          ? "indeterminate"
          : false // "none"
      : checked === true

  const handleCheckedChange: CheckboxPrimitive.CheckboxProps["onCheckedChange"] =
    () => {
      if (!onCheckedChange) return

      if (tristate) {
        // Cycle: "none" (empty) → true (check) → false (minus) → "none"
        const prev: TriState = checked ?? "none"
        const next: TriState =
          prev === "none"
            ? true
            : prev === true
              ? false
              : "none"

        onCheckedChange(next)
      } else {
        // Simple toggle boolean (treat "none" as false)
        const next = checked === true ? false : true
        onCheckedChange(next)
      }
    }

  // Icon mapping:
  // - tri-state:
  //   false → minus
  //   true  → check
  //   "none" → nothing
  // - non-tristate:
  //   true  → check
  //   else → nothing
  const icon = tristate
    ? checked === false
      ? <MinusIcon className="size-3.5" />
      : checked === true
        ? <CheckIcon className="size-3.5" />
        : null
    : checked
      ? <CheckIcon className="size-3.5" />
      : null

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={internalChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs outline-none transition-shadow",
        "dark:bg-input/30",
        // checked & indeterminate share "selected" styling
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:border-primary",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {icon}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }