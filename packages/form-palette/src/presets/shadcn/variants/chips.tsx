// src/presets/shadcn-variants/chips.tsx

import * as React from "react";

import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import type { ShadcnTextVariantProps } from "@/presets/shadcn/variants/text";
import { Input } from "@/presets/shadcn/ui/input";
import { Textarea } from "@/presets/shadcn/ui/textarea";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/shadcn/ui/popover";

type ChipsValue = string[] | undefined;
type BaseProps = VariantBaseProps<ChipsValue>;

/**
 * A key or shortcut that commits the current draft, or a list of alternatives.
 */
export type ChipsSeparator = string | readonly string[];

/**
 * Placement of chips relative to the entry control.
 *
 * - "inline" → inside the same visual box (Input) or in the textarea toolbox.
 * - "below"  → chips rendered as a block underneath the field.
 */
export type ChipsPlacement = "inline" | "below";

/**
 * Actions reported via ChangeDetail.meta.
 */
export type ChipsChangeAction = "add" | "remove" | "clear";

/**
 * Extra metadata sent with onValue() via ChangeDetail.
 */
export interface ChipsChangeMeta {
   action: ChipsChangeAction;
   added?: string[];
   removed?: string[];
   chips: string[];
}

/**
 * Chips-only props, on top of the injected ones.
 */
export interface ChipsVariantProps {
   /**
    * Placeholder shown when there are no chips and input is empty.
    */
   placeholder?: string;

   /**
    * Keys or shortcuts that commit the draft as one chip, e.g. "Enter" or
    * ["Enter", "Ctrl+Enter", ","]. An empty array disables keyboard commits.
    * Default: "Enter"
    */
   separators?: ChipsSeparator;

   /**
    * @deprecated Use `separators` to configure Enter. Only applies when
    * `separators` is omitted. Defaults to true.
    */
   addOnEnter?: boolean;

   /**
    * @deprecated Include "Tab" in `separators`. Only applies when
    * `separators` is omitted. Defaults to false.
    */
   addOnTab?: boolean;

   /**
    * When true, blurring the field commits the draft as one chip.
    * Default: false
    */
   addOnBlur?: boolean;

   /**
    * When false, duplicate chips are ignored.
    * Default: false
    */
   allowDuplicates?: boolean;

   /**
    * Maximum number of chips allowed.
    * Undefined → unlimited.
    */
   maxChips?: number;

   /**
    * When true, Backspace on empty input removes the last chip.
    * Default: true
    */
   backspaceRemovesLast?: boolean;

   /**
    * Show a small clear-all button.
    * Default: false
    */
   clearable?: boolean;

   /**
    * Called when chips are added.
    */
   onAddChips?(added: string[], next: string[]): void;

   /**
    * Called when chips are removed.
    */
   onRemoveChips?(removed: string[], next: string[]): void;

   /**
    * Optional custom chip renderer.
    *
    * If provided, you are responsible for calling onRemove(index)
    * from your UI when you want to remove a chip.
    */
   renderChip?(
      chip: string,
      index: number,
      ctx: {
         remove(): void;
         chips: string[];
      },
   ): React.ReactNode;

   /**
    * Optional custom overflow chip renderer.
    *
    * Receives the hidden count and the full chip list.
    */
   renderOverflowChip?(
      hiddenCount: number,
      chips: string[],
   ): React.ReactNode;

   /**
    * Max number of chips to *render*.
    * Extra chips are summarized as "+N more".
    */
   maxVisibleChips?: number;

   /**
    * Max number of characters to *display* per chip.
    * The underlying value is not truncated.
    */
   maxChipChars?: number;

   /**
    * CSS max-width for chip labels (e.g. 160 or "12rem").
    */
   maxChipWidth?: number | string;

   /**
    * When true, the entry control is a Textarea instead of Input.
    * Good for comment-style chip entry.
    */
   textareaMode?: boolean;

   /**
    * Where chips are rendered relative to the entry.
    *
    * Default:
    * - Input mode → "inline"
    * - Textarea mode → "inline"
    */
   placement?: ChipsPlacement;

   // UI hooks
   className?: string;              // outer wrapper
   chipsClassName?: string;         // <div> that holds all chips
   chipClassName?: string;          // each chip container
   chipLabelClassName?: string;     // inner label span
   chipRemoveClassName?: string;    // remove "x" button/span
   inputClassName?: string;         // entry text input / textarea overrides
}

/**
 * We still type against ShadcnTextVariantProps so chips can reuse
 * size/density/icon props etc. We take control of:
 * - type / value / onValue
 * - leadingControl / trailingControl
 */
type TextUiProps = Omit<
   ShadcnTextVariantProps,
   | "type"
   | "inputMode"
   | "leadingControl"
   | "trailingControl"
   | "value"
   | "onValue"
>;

/**
 * Full props for the Shadcn-based chips variant.
 */
export type ShadcnChipsVariantProps = TextUiProps &
   ChipsVariantProps &
   Pick<BaseProps, "value" | "onValue" | "error">;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function matchesSeparator(event: React.KeyboardEvent, separators: readonly string[]): boolean {
   const key = event.key === " " ? "space" : event.key.toLowerCase();
   const modifiers = [
      event.altKey && "alt",
      event.ctrlKey && "ctrl",
      event.metaKey && "meta",
      event.shiftKey && "shift",
   ].filter(Boolean).join("+");

   return separators.some((separator) => {
      if (typeof separator !== "string") return false;
      // Keep a trailing + as the key itself, as in "Ctrl++".
      const parts = separator.trim().toLowerCase().split(/\s*\+\s*(?=.)/);
      return parts.pop() === key && parts.sort().join("+") === modifiers;
   });
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnChipsVariant = React.forwardRef<
   HTMLInputElement | HTMLTextAreaElement,
   ShadcnChipsVariantProps
>(function ShadcnChipsVariant(props, ref) {
   const {
      // variant base bits
      value,
      onValue,
      error,

      // chips behaviour
      placeholder,
      separators,
      addOnEnter = true,
      addOnTab = false,
      addOnBlur = false,
      allowDuplicates = false,
      maxChips,
      backspaceRemovesLast = true,
      clearable = false,
      onAddChips,
      onRemoveChips,
      renderChip,
      renderOverflowChip,
      maxVisibleChips,
      maxChipChars,
      maxChipWidth,
      textareaMode = false,
      placement,

      // UI classNames
      className,
      chipsClassName,
      chipClassName,
      chipLabelClassName,
      chipRemoveClassName,
      inputClassName,

      // rest of text UI bits (size, density, icons, etc.)
      ...restTextProps
   } = props;

   const hasInvalidIncomingValue =
      value !== undefined && !Array.isArray(value);

   React.useEffect(() => {
      if (process.env.NODE_ENV === "production") return;
      if (!hasInvalidIncomingValue) return;

      // Chips always render from an array; non-array controlled values
      // are treated as empty to prevent runtime crashes.
      // eslint-disable-next-line no-console
      console.warn(
         "[form-palette] ShadcnChipsVariant expected `value` to be `string[] | undefined`; received:",
         value,
      );
   }, [hasInvalidIncomingValue, value]);

   const chips = React.useMemo(
      () => (Array.isArray(value) ? value : []),
      [value],
   );
   const hasChips = chips.length > 0;

   const [inputText, setInputText] = React.useState("");
   const draft = inputText.trim();
   const keyboardSeparators = React.useMemo(() => {
      if (typeof separators === "string") return [separators];
      if (separators !== undefined) return Array.isArray(separators) ? separators : [];

      return [addOnEnter && "Enter", addOnTab && "Tab"].filter(
         (key): key is string => typeof key === "string",
      );
   }, [separators, addOnEnter, addOnTab]);

   // ─────────────────────────────────────────────
   // Value emit
   // ─────────────────────────────────────────────

   const emitChange = React.useCallback(
      (
         nextChips: string[],
         meta: Omit<ChipsChangeMeta, "chips">,
      ) => {
         const detail: ChangeDetail<ChipsChangeMeta> = {
            source: "variant",
            raw: nextChips,
            nativeEvent: undefined,
            meta: {
               ...meta,
               chips: nextChips,
            },
         };
         onValue?.(nextChips.length ? nextChips : undefined, detail);
      },
      [onValue],
   );

   const commitDraft = React.useCallback(() => {
      if (!draft) return;
      if (!allowDuplicates && chips.includes(draft)) return;
      if (typeof maxChips === "number" && chips.length >= maxChips) return;

      const added = [draft];
      const next = [...chips, draft];
      emitChange(next, { action: "add", added });
      onAddChips?.(added, next);
      setInputText("");
   }, [draft, chips, allowDuplicates, maxChips, emitChange, onAddChips]);

   const handleRemoveAt = React.useCallback(
      (index: number) => {
         if (index < 0 || index >= chips.length) return;
         const removed = [chips[index]];
         const next = chips.filter((_, i) => i !== index);

         emitChange(next, { action: "remove", removed });
         onRemoveChips?.(removed, next);
      },
      [chips, emitChange, onRemoveChips],
   );

   const handleClear = React.useCallback(
      (ev?: React.MouseEvent) => {
         ev?.preventDefault();
         ev?.stopPropagation();
         if (!chips.length) return;
         emitChange([], { action: "clear", removed: [...chips] });
         onRemoveChips?.([...chips], []);
         setInputText("");
      },
      [chips, emitChange, onRemoveChips],
   );

   // ─────────────────────────────────────────────
   // Entry events (Input or Textarea)
   // ─────────────────────────────────────────────

   const handleEntryChange = React.useCallback(
      (
         event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
      ) => {
         const next = event.target.value ?? "";
         setInputText(next);
      },
      [],
   );

   const handleEntryKeyDown = React.useCallback(
      (
         event:
            | React.KeyboardEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLTextAreaElement>,
      ) => {
         if (event.nativeEvent.isComposing) return;

         const key = event.key;
         if (matchesSeparator(event, keyboardSeparators)) {
            if (draft || key === "Enter") {
               event.preventDefault();
               commitDraft();
            }
            return;
         }

         // Backspace on empty input → remove last chip
         if (
            key === "Backspace" &&
            backspaceRemovesLast &&
            !inputText.length &&
            chips.length
         ) {
            event.preventDefault();
            handleRemoveAt(chips.length - 1);
            return;
         }
      },
      [
         inputText,
         draft,
         keyboardSeparators,
         backspaceRemovesLast,
         chips.length,
         commitDraft,
         handleRemoveAt,
      ],
   );
   const handleEntryBlur = React.useCallback(
      (
         event:
            | React.FocusEvent<HTMLInputElement>
            | React.FocusEvent<HTMLTextAreaElement>,
      ) => {
         if (addOnBlur) {
            commitDraft();
         }

         // Forward to host onBlur if provided in restTextProps
         const anyProps = restTextProps as any;
         const hostOnBlur = anyProps?.onBlur as
            | ((e: typeof event) => void)
            | undefined;
         hostOnBlur?.(event);
      },
      [addOnBlur, commitDraft, restTextProps],
   );

   const effectivePlaceholder =
      placeholder ?? (hasChips ? "" : "Add item…");

   // ─────────────────────────────────────────────
   // Chip rendering (maxVisible / overflow / truncation)
   // ─────────────────────────────────────────────

   const defaultMaxVisible = (!textareaMode && placement !== "below") ? 3 : undefined;
   const effectiveMaxVisibleChips = maxVisibleChips !== undefined ? maxVisibleChips : defaultMaxVisible;

   let visibleChips = chips;
   let hiddenCount = 0;

   if (
      typeof effectiveMaxVisibleChips === "number" &&
      effectiveMaxVisibleChips > 0 &&
      chips.length > effectiveMaxVisibleChips
   ) {
      visibleChips = chips.slice(0, effectiveMaxVisibleChips);
      hiddenCount = chips.length - visibleChips.length;
   }

   const maxWidthStyle: React.CSSProperties | undefined =
      maxChipWidth !== undefined
         ? {
            maxWidth:
               typeof maxChipWidth === "number"
                  ? `${maxChipWidth}px`
                  : maxChipWidth,
         }
         : undefined;

   const baseChipClasses = textareaMode
      ? "inline-flex min-w-0 max-w-full gap-1 items-center justify-between rounded-md bg-muted px-2 py-2 text-muted-foreground"
      : "inline-flex max-w-full items-center gap-1 rounded-sm bg-muted px-2 py-0.5 text-muted-foreground hover:bg-muted/80";

   const baseRemoveClasses = textareaMode
      ? "shrink-0 cursor-pointer text-[16px] opacity-70 hover:opacity-100 mt-0.5"
      : "cursor-pointer text-[16px] opacity-70 hover:opacity-100";

   const chipNodes = visibleChips.map((chip, index) => {
      if (renderChip) {
         return (
            <React.Fragment key={`${chip}-${index}`}>
               {renderChip(chip, index, {
                  remove: () => handleRemoveAt(index),
                  chips,
               })}
            </React.Fragment>
         );
      }

      let label = chip;
      if (
         typeof maxChipChars === "number" &&
         maxChipChars > 0 &&
         label.length > maxChipChars
      ) {
         label = label.slice(0, maxChipChars) + "…";
      }

      return (
         <button
            key={`${chip}-${index}`}
            type="button"
            className={cn(baseChipClasses, chipClassName)}
            onClick={(e) => {
               e.preventDefault();
            }}
            data-slot="chip"
         >
            <span
               className={cn(
                  "truncate",
                  chipLabelClassName,
               )}
               style={maxWidthStyle}
            >
               {label}
            </span>
            <span
               className={cn(baseRemoveClasses, chipRemoveClassName)}
               onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemoveAt(index);
               }}
               aria-hidden="true"
            >
               <X size={16} />
            </span>
         </button>
      );
   });

   if (hiddenCount > 0) {
      const hiddenChips = chips.slice(effectiveMaxVisibleChips ?? 0);
      const defaultOverflow = (
         <Popover>
            <PopoverTrigger asChild>
               <button
                  type="button"
                  className={cn(
                     baseChipClasses,
                     "cursor-pointer font-semibold bg-primary/10 text-primary hover:bg-primary/20",
                     chipClassName,
                  )}
                  data-slot="chip-overflow"
               >
                  +{hiddenCount} more
               </button>
            </PopoverTrigger>
            <PopoverContent className="p-3 w-64 max-h-60 overflow-y-auto" align="start">
               <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                  Hidden Chips
               </div>
               <div className="flex flex-wrap gap-1.5">
                  {hiddenChips.map((chip, hiddenIdx) => {
                     const actualIndex = (effectiveMaxVisibleChips ?? 0) + hiddenIdx;

                     let label = chip;
                     if (
                        typeof maxChipChars === "number" &&
                        maxChipChars > 0 &&
                        label.length > maxChipChars
                     ) {
                        label = label.slice(0, maxChipChars) + "…";
                     }

                     return (
                        <div
                           key={`${chip}-${actualIndex}`}
                           className={cn(baseChipClasses, chipClassName, "max-w-full")}
                        >
                           <span
                              className={cn("truncate", chipLabelClassName)}
                              style={maxWidthStyle}
                           >
                              {label}
                           </span>
                           <span
                              className={cn(baseRemoveClasses, chipRemoveClassName)}
                              onClick={(e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 handleRemoveAt(actualIndex);
                              }}
                              aria-hidden="true"
                           >
                              <X size={14} />
                           </span>
                        </div>
                     );
                  })}
               </div>
            </PopoverContent>
         </Popover>
      );

      const node =
         renderOverflowChip?.(hiddenCount, chips) ?? defaultOverflow;

      chipNodes.push(
         <React.Fragment key="__overflow">
            {node}
         </React.Fragment>,
      );
   }

   // ─────────────────────────────────────────────
   // Placement (inline vs below)
   // ─────────────────────────────────────────────

   const effectivePlacement: ChipsPlacement = textareaMode
      ? (placement ?? "inline")
      : (placement ?? "inline");

   const inlinePlacement = effectivePlacement === "inline";

   // Input-mode inline controls (inside the Input frame)
   let leadingControl: React.ReactNode | undefined;
   let trailingControl: React.ReactNode | undefined;

   // Below-the-field block (both modes)
   let chipsBelowBlock: React.ReactNode | undefined;

   // Textarea-mode upper toolbox (instead of leadingControl/trailingControl)
   let textareaUpperControl: React.ReactNode | undefined;
   let textareaUpperClassName: string | undefined;

   if (hasChips) {
      if (textareaMode) {
         if (inlinePlacement) {
            // chips live in the upper toolbox row, single-line row by default
            textareaUpperControl = (
               <div
                  data-slot="chips-upper"
                  className={cn(
                     "flex min-w-0 flex-wrap items-center gap-1 text-xs",
                     chipsClassName,
                  )}
               >
                  {chipNodes}
                  {clearable && (
                     <button
                        type="button"
                        onClick={handleClear}
                        className="ml-auto inline-flex h-6 px-2 items-center justify-center rounded-full text-[0.72rem] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                     >
                        Clear
                     </button>
                  )}
               </div>
            );
            textareaUpperClassName = chipsClassName;
         } else {
            // textareaMode + placement=below → block under the textarea box
            chipsBelowBlock = (
               <div
                  className={cn(
                     "mt-2 flex flex-wrap items-center gap-2 text-xs",
                     chipsClassName,
                  )}
                  data-slot="chips-list-below"
               >
                  {chipNodes}
                  {clearable && (
                     <button
                        type="button"
                        onClick={handleClear}
                        className="self-start inline-flex h-6 px-2 items-center justify-center rounded-full text-[0.72rem] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                     >
                        Clear
                     </button>
                  )}
               </div>
            );
         }
      } else {
         // INPUT MODE
         if (inlinePlacement) {
            leadingControl = (
               <div
                  className={cn(
                     "flex min-w-0 flex-row items-center gap-1 pr-1 py-1 text-xs pl-2",
                     chipsClassName,
                  )}
                  data-slot="chips-list"
               >
                  {chipNodes}
               </div>
            );

            if (clearable) {
               trailingControl = (
                  <div
                     className="flex h-full items-center pr-1"
                     data-slot="chips-trailing"
                  >
                     <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                        aria-label="Clear chips"
                     >
                        ×
                     </button>
                  </div>
               );
            }
         } else {
            chipsBelowBlock = (
               <div
                  className={cn(
                     "mt-1 flex flex-row items-center gap-1 text-xs",
                     chipsClassName,
                  )}
                  data-slot="chips-list-below"
               >
                  {chipNodes}
                  {clearable && (
                     <button
                        type="button"
                        onClick={handleClear}
                        className="inline-flex h-6 px-2 items-center justify-center rounded-full text-[0.72rem] text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
                        data-slot="chips-clear"
                     >
                        Clear
                     </button>
                  )}
               </div>
            );
         }
      }
   }

   const joinControls = !textareaMode && inlinePlacement && hasChips;
   const extendBoxToControls = !textareaMode && inlinePlacement && hasChips;

   // ─────────────────────────────────────────────
   // Entry control (Input vs Textarea)
   // ─────────────────────────────────────────────

   return (
      <div className={className} data-slot="chips-field">
         {textareaMode ? (
            <>
               {/* @ts-ignore */}
               <Textarea
                  ref={ref as any}
                  {...restTextProps}
                  value={inputText}
                  onChange={handleEntryChange}
                  onKeyDown={handleEntryKeyDown as any}
                  onBlur={handleEntryBlur as any}
                  extendBoxToToolbox={effectivePlacement === "inline"}
                  placeholder={effectivePlaceholder}
                  // textarea-specific defaults
                  autoResize={true}
                  rows={1}
                  upperControl={textareaUpperControl}
                  upperControlClassName={textareaUpperClassName}
                  inputClassName={inputClassName}
                  aria-invalid={error ? "true" : undefined}
               />
               {!inlinePlacement && hasChips && chipsBelowBlock}
            </>
         ) : (
            <>
               <Input
                  ref={ref as any}
                  {...restTextProps}
                  type="text"
                  // The Input's value is the *draft* text, not the chips.
                  value={inputText}
                  onChange={handleEntryChange as any}
                  onKeyDown={handleEntryKeyDown as any}
                  onBlur={handleEntryBlur as any}
                  placeholder={effectivePlaceholder}
                  // ONLY pass controls when chips are inline
                  leadingControl={inlinePlacement ? leadingControl : undefined}
                  trailingControl={inlinePlacement ? trailingControl : undefined}
                  // Only flip into "group box" mode when there are chips inline
                  joinControls={joinControls}
                  extendBoxToControls={extendBoxToControls}
                  inputClassName={cn(
                     "min-w-[4ch] flex-1 py-0",
                     inlinePlacement &&
                     hasChips &&
                     "bg-transparent border-none shadow-none outline-none",
                     inputClassName,
                  )}
                  aria-invalid={error ? "true" : undefined}
               />
               {!inlinePlacement && hasChips && chipsBelowBlock}
            </>
         )}
      </div>
   );
});

ShadcnChipsVariant.displayName = "ShadcnChipsVariant";

export default ShadcnChipsVariant;
