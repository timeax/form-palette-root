// src/presets/shadcn-variants/password.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn-variants/text";
import { Input } from "@/presets/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Check } from "lucide-react";

type BaseProps = VariantBaseProps<string | undefined>;

/**
 * Options for the built-in password strength meter.
 *
 * NOTE: Score is always in the range 0–4 (inclusive).
 */
export interface StrengthOptions {
   /**
    * Custom scoring function.
    * Return a number in the range 0–4 (inclusive) where 0 = weakest, 4 = strongest.
    */
   calc?: (value: string) => number;

   /**
    * Labels for each score bucket (index 0..4).
    * Defaults to: ["Very weak", "Weak", "Okay", "Good", "Strong"]
    */
   labels?: [string, string, string, string, string];

   /**
    * Thresholds for score steps using a 0–100 bar.
    * Defaults to [0, 25, 50, 75, 100] mapping to scores 0..4 respectively.
    */
   thresholds?: [number, number, number, number, number];

   /**
    * Minimum score required to consider the password acceptable (0–4).
    * This is purely visual unless you enforce it in validate/onChange.
    * Default: 2
    */
   minScore?: number | 2;

   /**
    * Whether to show the textual label next to/under the bar.
    * Default: true
    */
   showLabel?: boolean;

   /**
    * Where to render the meter.
    * - "inline" → compact row under the input
    * - "block" → stacked with more spacing
    * Default: "inline"
    */
   display?: "inline" | "block";
}

/** Heuristic length/charset score: fast, dependency-free. Returns 0..4. */
function defaultScore(pw: string): number {
   if (!pw) return 0;
   let score = 0;

   // length
   if (pw.length >= 8) score++;
   if (pw.length >= 12) score++;

   // diversity
   const hasLower = /[a-z]/.test(pw);
   const hasUpper = /[A-Z]/.test(pw);
   const hasDigit = /\d/.test(pw);
   const hasSymbol = /[^A-Za-z0-9]/.test(pw);

   const variety = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean)
      .length;
   if (variety >= 2) score++;
   if (variety >= 3) score++;

   // Cap at 4
   return Math.max(0, Math.min(4, score));
}

const DEFAULT_LABELS: [string, string, string, string, string] = [
   "Very weak",
   "Weak",
   "Okay",
   "Good",
   "Strong",
];

const DEFAULT_THRESHOLDS: [number, number, number, number, number] = [
   0, 25, 50, 75, 100,
];

function normalizeStrengthOptions(
   raw: boolean | StrengthOptions | undefined,
): StrengthOptions | null {
   if (!raw) return null;

   const base: StrengthOptions = {
      calc: defaultScore,
      labels: DEFAULT_LABELS,
      thresholds: DEFAULT_THRESHOLDS,
      minScore: 2,
      showLabel: true,
      display: "inline",
   };

   if (raw === true) {
      return base;
   }

   return {
      ...base,
      ...raw,
      labels: raw.labels ?? base.labels,
      thresholds: raw.thresholds ?? base.thresholds,
      minScore: raw.minScore ?? base.minScore,
      showLabel: raw.showLabel ?? base.showLabel,
      display: raw.display ?? base.display,
   };
}

// ─────────────────────────────────────────────
// Definition map / rules
// ─────────────────────────────────────────────

export interface PasswordRuleConfig {
   /**
    * Pattern used to decide if the rule passes.
    */
   pattern: RegExp;

   /**
    * If true, the rule is considered optional (recommendation).
    * Default: false unless the rule name is not prefixed with "!".
    */
   optional?: boolean;

   /**
    * Weight in the scoring (relative importance).
    * Default: 1, doubled if the use key is prefixed with "!".
    */
   weight?: number;

   /**
    * Short label for the rule (e.g. "At least 8 characters").
    * Defaults to the map key if omitted.
    */
   label?: string;

   /**
    * Longer description, used in detailed rule view.
    */
   description?: string;
}

/**
 * A definition entry can be:
 * - string     → treated as a regex source
 * - RegExp     → used directly
 * - full config
 */
export type PasswordRuleDefinition =
   | string
   | RegExp
   | PasswordRuleConfig;

/**
 * Map of alias/keys → definition entries.
 */
export type PasswordDefinitionMap = Record<string, PasswordRuleDefinition>;

// Default rule definitions used by the meter.
const DEFAULT_RULE_DEFINITIONS: PasswordDefinitionMap = {
   "length-8": {
      pattern: /.{8,}/,
      label: "8+ chars",
      description: "Use at least 8 characters.",
   },
   "length-12": {
      pattern: /.{12,}/,
      optional: true,
      label: "12+ chars",
      description: "Use 12 or more characters for stronger security.",
   },
   lower: {
      pattern: /[a-z]/,
      label: "Lowercase",
      description: "Include at least one lowercase letter (a–z).",
   },
   upper: {
      pattern: /[A-Z]/,
      label: "Uppercase",
      description: "Include at least one uppercase letter (A–Z).",
   },
   digit: {
      pattern: /\d/,
      label: "Number",
      description: "Include at least one digit (0–9).",
   },
   symbol: {
      pattern: /[^A-Za-z0-9]/,
      label: "Symbol",
      description: "Include at least one symbol (e.g. !, @, #, ?).",
   },
   "no-space": {
      pattern: /^\S+$/,
      optional: true,
      label: "No spaces",
      description: "Avoid spaces in your password.",
   },
};

/**
 * Merge default → global → local rule definitions.
 *
 * - DEFAULT_RULE_DEFINITIONS
 * - window["form-palette"]?.ruleDefinition
 * - props.ruleDefinitions
 */
function getMergedRuleDefinitions(
   local?: PasswordDefinitionMap,
): PasswordDefinitionMap {
   let merged: PasswordDefinitionMap = { ...DEFAULT_RULE_DEFINITIONS };

   if (typeof window !== "undefined") {
      const fp = (window as any)["form-palette"];
      const globalDefs = fp?.ruleDefinition as
         | PasswordDefinitionMap
         | undefined;

      if (globalDefs && typeof globalDefs === "object") {
         merged = { ...merged, ...globalDefs };
      }
   }

   if (local && typeof local === "object") {
      merged = { ...merged, ...local };
   }

   return merged;
}

/**
 * Internal normalized state for a single rule.
 */
interface NormalizedRuleState {
   key: string;
   label: string;
   description?: string;
   optional: boolean;
   required: boolean;
   weight: number;
   passed: boolean;
}

/**
 * Props passed to custom meter renderers.
 */
export interface PasswordMeterRenderProps {
   /** Raw password value. */
   value: string;
   /** Bucket score 0..4 based on percent + thresholds. */
   score: number;
   /** 0–100 progress used for the bar. */
   percent: number;
   /** Human label for the current score. */
   label: string;
   /** Whether score >= minScore. */
   passed: boolean;
   /** Effective minScore after normalization. */
   minScore: number;
   /** Effective thresholds used for bucketing. */
   thresholds: [number, number, number, number, number];
   /** Effective labels used. */
   labels: [string, string, string, string, string];
   /** Rule-level details when using a definition map. */
   rules: NormalizedRuleState[];
}

/**
 * Password-only props (on top of Shadcn text UI props & VariantBaseProps).
 *
 * This is what the form runtime sees as VariantPropsFor<"password">.
 */
export interface PasswordVariantProps {
   /** Maximum number of characters permitted. */
   maxLength?: number;
   /** Browser autocomplete hint (e.g., "current-password", "new-password"). */
   autoComplete?: string;

   /** Show an eye button to toggle between obscured/plain text. (default: true) */
   revealToggle?: boolean;
   /** Start in the revealed (plain text) state. */
   defaultRevealed?: boolean;
   /** Called whenever the reveal state changes. */
   onRevealChange?(revealed: boolean): void;
   /** Override the icons used for hide/show. */
   renderToggleIcon?(revealed: boolean): React.ReactNode;
   /** Accessible label for the toggle button. */
   toggleAriaLabel?(revealed: boolean): string;

   /**
    * Extra className for the reveal toggle button.
    */
   toggleButtonClassName?: string;

   /**
    * Enable the built-in strength meter (boolean or options).
    *
    * - false / undefined → no built-in meter is shown
    * - true              → use defaults
    * - object            → merge with defaults
    */
   strengthMeter?: boolean | StrengthOptions;

   /**
    * Optional rule definition map.
    */
   ruleDefinitions?: PasswordDefinitionMap;

   /**
    * Selection of rule aliases to apply.
    *
    * - "length"  → use ruleDefinitions["length"] with default importance
    * - "!length" → same rule but treated as more important
    */
   ruleUses?: string[];

   /**
    * Built-in meter style:
    * - "simple" → single bar + label
    * - "rules"  → bar + per-rule checklist
    * Default: "simple"
    */
   meterStyle?: "simple" | "rules";

   /**
    * Optional custom meter renderer.
    */
   renderMeter?(props: PasswordMeterRenderProps): React.ReactNode;

   /**
    * ClassNames for the meter and rules UI.
    */
   meterWrapperClassName?: string;
   meterContainerClassName?: string;
   meterBarClassName?: string;
   meterLabelClassName?: string;

   rulesWrapperClassName?: string;
   rulesHeadingClassName?: string;
   rulesListClassName?: string;
   ruleItemClassName?: string;
   ruleIconClassName?: string;
   ruleLabelClassName?: string;

   /**
    * Extra className for the outer field wrapper.
    */
   className?: string;
}

// We still *type* against ShadcnTextVariantProps so password can reuse
// all the visual/text props. We take control of type, value, onValue & trailingControl.
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   "type" | "inputMode" | "leadingControl" | "trailingControl" | "value" | "onValue"
>;

/**
 * Full props for the Shadcn-based password variant.
 */
export type ShadcnPasswordVariantProps = TextUiProps &
   PasswordVariantProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Rule normalization & scoring
// ─────────────────────────────────────────────

function normalizeRules(
   value: string,
   definitions?: PasswordDefinitionMap,
   uses?: string[],
): { rules: NormalizedRuleState[]; percent: number | null } {
   if (!definitions || Object.keys(definitions).length === 0) {
      return { rules: [], percent: null };
   }

   const useList =
      uses && uses.length ? uses : Object.keys(definitions);

   const rules: NormalizedRuleState[] = [];
   let totalWeight = 0;
   let passedWeight = 0;

   for (const rawKey of useList) {
      if (!rawKey) continue;

      const important = rawKey.startsWith("!");
      const key = important ? rawKey.slice(1) : rawKey;
      const def = definitions[key];
      if (!def) continue;

      let pattern: RegExp;
      let optional = !important;
      let weight = important ? 2 : 1;
      let label = key;
      let description: string | undefined;

      if (typeof def === "string") {
         pattern = new RegExp(def);
      } else if (def instanceof RegExp) {
         pattern = def;
      } else {
         pattern = def.pattern;
         if (def.optional !== undefined) optional = def.optional;
         if (def.weight !== undefined) weight = def.weight;
         if (def.label) label = def.label;
         if (def.description) description = def.description;
      }

      const passed = pattern.test(value);
      totalWeight += weight;
      if (passed) passedWeight += weight;

      rules.push({
         key,
         label,
         description,
         optional,
         required: !optional,
         weight,
         passed,
      });
   }

   if (totalWeight === 0) {
      return { rules, percent: null };
   }

   const percent = (passedWeight / totalWeight) * 100;
   return { rules, percent };
}

function clampScore(x: number): number {
   if (Number.isNaN(x)) return 0;
   return Math.max(0, Math.min(4, x));
}

function computeMeterState(
   value: string,
   strength: StrengthOptions,
   definitions?: PasswordDefinitionMap,
   uses?: string[],
): PasswordMeterRenderProps {
   const { rules, percent: rulesPercent } = normalizeRules(
      value,
      definitions,
      uses,
   );

   const labels = strength.labels ?? DEFAULT_LABELS;
   const thresholds = strength.thresholds ?? DEFAULT_THRESHOLDS;
   const minScore = (strength.minScore ?? 2) as number;

   let percent: number;
   let score: number;

   if (rulesPercent != null) {
      percent = rulesPercent;
   } else {
      const rawScore = clampScore(
         strength.calc ? strength.calc(value) : defaultScore(value),
      );
      percent = (rawScore / 4) * 100;
   }

   let bucketIndex = 0;
   for (let i = 0; i < thresholds.length; i++) {
      if (percent >= thresholds[i]) {
         bucketIndex = i;
      } else {
         break;
      }
   }
   score = bucketIndex;

   const label =
      labels[score] ??
      labels[labels.length - 1] ??
      DEFAULT_LABELS[DEFAULT_LABELS.length - 1];

   const passed = score >= minScore;

   return {
      value,
      score,
      percent,
      label,
      passed,
      minScore,
      thresholds: thresholds,
      labels,
      rules,
   };
}

function meterColor(score: number): string {
   if (score <= 1) return "bg-destructive";
   if (score === 2) return "bg-orange-500";
   if (score === 3) return "bg-amber-500";
   return "bg-emerald-500";
}

// ─────────────────────────────────────────────
// Main variant component
// ─────────────────────────────────────────────

export const ShadcnPasswordVariant = React.forwardRef<
   HTMLInputElement,
   ShadcnPasswordVariantProps
>(function ShadcnPasswordVariant(props, ref) {
   const {
      // base variant bits
      value,
      onValue,
      error,

      // password base props
      maxLength,
      autoComplete,
      revealToggle = true,
      defaultRevealed = false,
      onRevealChange,
      renderToggleIcon,
      toggleAriaLabel,
      toggleButtonClassName,

      // strength / rules
      strengthMeter,
      ruleDefinitions,
      ruleUses,
      meterStyle = "simple",
      renderMeter,
      meterWrapperClassName,
      meterContainerClassName,
      meterBarClassName,
      meterLabelClassName,
      rulesWrapperClassName,
      rulesHeadingClassName,
      rulesListClassName,
      ruleItemClassName,
      ruleIconClassName,
      ruleLabelClassName,

      className,

      // everything else from Shadcn text UI
      ...restTextProps
   } = props;

   const [revealed, setRevealed] = React.useState<boolean>(
      Boolean(defaultRevealed),
   );

   const normalizedStrength = React.useMemo(
      () => normalizeStrengthOptions(strengthMeter),
      [strengthMeter],
   );

   const effectiveRuleDefinitions = React.useMemo(
      () => getMergedRuleDefinitions(ruleDefinitions),
      [ruleDefinitions],
   );

   const meterState = React.useMemo<PasswordMeterRenderProps | null>(() => {
      if (!normalizedStrength) return null;
      const v = value ?? "";
      return computeMeterState(
         v,
         normalizedStrength,
         effectiveRuleDefinitions,
         ruleUses,
      );
   }, [normalizedStrength, value, ruleUses, effectiveRuleDefinitions]);

   const handleToggleReveal = React.useCallback(() => {
      setRevealed((prev) => {
         const next = !prev;
         onRevealChange?.(next);
         return next;
      });
   }, [onRevealChange]);

   const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
         const next = event.target.value ?? "";
         const detail: ChangeDetail<PasswordMeterRenderProps | undefined> = {
            source: "variant",
            raw: next,
            nativeEvent: event,
            meta: meterState ?? undefined,
         };
         onValue?.(next, detail);
      },
      [onValue, meterState],
   );

   const toggleLabel =
      toggleAriaLabel?.(revealed) ??
      (revealed ? "Hide password" : "Show password");

   const trailingControl =
      revealToggle === false ? undefined : (
         <button
            type="button"
            onClick={handleToggleReveal}
            aria-label={toggleLabel}
            tabIndex={-1}
            className={cn(
               "inline-flex h-full items-center justify-center px-3 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:bg-muted/50",
               toggleButtonClassName,
            )}
            data-slot="password-toggle"
         >
            {renderToggleIcon ? (
               renderToggleIcon(revealed)
            ) : revealed ? (
               <EyeOff className="h-4 w-4" />
            ) : (
               <Eye className="h-4 w-4" />
            )}
         </button>
      );

   const meterNode =
      normalizedStrength && meterState
         ? renderMeter?.(meterState) ??
         (strengthMeter && (
            <div
               className={cn(
                  normalizedStrength.display === "block"
                     ? "mt-2 space-y-2"
                     : "mt-1.5 flex flex-col gap-0",
                  meterWrapperClassName,
               )}
               data-slot="password-meter"
            >
               {/* Progress Bar Row */}
               <div
                  className={cn(
                     "flex w-full items-center gap-3",
                     meterContainerClassName,
                  )}
               >
                  <div className="flex-1">
                     {/* Reduced height from h-2 to h-1 */}
                     <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                           className={cn(
                              "h-full transition-all duration-300 ease-out",
                              meterColor(meterState.score),
                              meterBarClassName,
                           )}
                           style={{ width: `${meterState.percent}%` }}
                        />
                     </div>
                  </div>

                  {normalizedStrength.showLabel !== false && (
                     <div
                        className={cn(
                           "min-w-[4rem] text-right text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
                           meterLabelClassName,
                        )}
                     >
                        {meterState.label}
                     </div>
                  )}
               </div>

               {/* New Modern Chips for Rules */}
               {meterStyle === "rules" &&
                  meterState.rules.length > 0 && (
                     <div
                        className={cn(
                           "flex flex-wrap gap-1.5 pt-1",
                           rulesWrapperClassName,
                        )}
                     >
                        {meterState.rules.map((rule) => (
                           <span
                              key={rule.key}
                              className={cn(
                                 "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors duration-200",
                                 rule.passed
                                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
                                    : "border-transparent bg-secondary text-muted-foreground",
                                 ruleItemClassName
                              )}
                           >
                              {rule.passed && (
                                 <Check className="h-3 w-3" strokeWidth={3} />
                              )}
                              {rule.label}
                           </span>
                        ))}
                     </div>
                  )}
            </div>
         ))
         : null;

   return (
      <div className={cn("group/password w-full", className)} data-slot="password-field">
         <Input
            ref={ref}
            {...restTextProps}
            type={revealed ? "text" : "password"}
            value={value ?? ""}
            onChange={handleChange}
            maxLength={maxLength}
            autoComplete={autoComplete}
            trailingControl={trailingControl}
            aria-invalid={error ? "true" : undefined}
         />
         {meterNode}
      </div>
   );
});

ShadcnPasswordVariant.displayName = "ShadcnPasswordVariant";

export default ShadcnPasswordVariant;
