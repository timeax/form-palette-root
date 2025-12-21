import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Input } from "@/presets/ui/input";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
   DialogDescription,
} from "@/presets/ui/dialog";
import { X, Plus, MoreHorizontal, Tag, PenLine } from "lucide-react";

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type KeyValueMap = Record<string, string>;

export interface KV {
   key: string;
   value: string;
}

export interface ShadcnKeyValueVariantProps
   extends Pick<
      VariantBaseProps<KeyValueMap | undefined>,
      "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
   > {
   min?: number;
   max?: number;
   minVisible?: number;
   maxVisible?: number;
   showAddButton?: boolean;
   showMenuButton?: boolean;
   placeholder?: React.ReactNode;
   dialogTitle?: React.ReactNode;
   keyLabel?: React.ReactNode;
   valueLabel?: React.ReactNode;
   submitLabel?: React.ReactNode;
   moreLabel?: (count: number) => React.ReactNode;
   emptyLabel?: React.ReactNode;
   className?: string;
   chipsClassName?: string;
   chipClassName?: string;
   renderChip?: (ctx: {
      pair: KV;
      index: number;
      onEdit: () => void;
      onRemove: () => void;
      defaultChip: React.ReactNode;
   }) => React.ReactNode;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function mapToItems(map: KeyValueMap | undefined): KV[] {
   if (!map) return [];
   return Object.entries(map).map(([key, value]) => ({
      key,
      value: value ?? "",
   }));
}

function itemsToMap(items: KV[]): KeyValueMap {
   const out: KeyValueMap = {};
   for (const { key, value } of items) {
      if (!key) continue;
      out[key] = value;
   }
   return out;
}

function clampVisible(
    total: number,
    minVisible: number,
    maxVisible: number
): number {
    if (total === 0) return 0;
    const clampedMax = Math.max(minVisible, maxVisible);
    return Math.min(total, clampedMax);
}

function sizeClasses(size?: Size) {
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}
function densityPadding(density?: Density) {
   switch (density) {
      case "compact":
         return "py-1 px-2 gap-1.5";
      case "loose":
         return "py-3 px-3 gap-3";
      case "comfortable":
      default:
         return "py-1 px-3 gap-2";
   }
}

function defaultMoreLabel(count: number): React.ReactNode {
   return `+${count} more`;
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnKeyValueVariant = React.forwardRef<
   HTMLDivElement,
   ShadcnKeyValueVariantProps
>(function ShadcnKeyValueVariant(props, _ref) {
   const {
      value,
      onValue,
      error,
      disabled,
      readOnly,
      size,
      density,

      min = 0,
      max = Infinity,
      minVisible = 0,
      maxVisible = 6,

      showAddButton = true,
      showMenuButton = true,

      placeholder,
      dialogTitle = "Edit Item",
      keyLabel = "Key",
      valueLabel = "Value",
      submitLabel = "Save Changes",
      moreLabel = defaultMoreLabel,
      emptyLabel = "No items added",

      className,
      chipsClassName,
      chipClassName,
      renderChip,
   } = props;

   const isDisabled = disabled || readOnly;

   const items: KV[] = React.useMemo(
      () => mapToItems(value),
      [value]
   );

   const [dialogOpen, setDialogOpen] = React.useState(false);
   const [editingIndex, setEditingIndex] = React.useState<number | null>(
      null
   );
   const [draft, setDraft] = React.useState<KV>({ key: "", value: "" });

   const canAdd = items.length < max;
   const canDelete = items.length > min;

   // visible vs overflow
   const visibleCount = clampVisible(
      items.length,
      minVisible,
      maxVisible
   );
   const visibleItems = items.slice(0, visibleCount);
   const overflowCount = Math.max(0, items.length - visibleCount);

   // ────────────────────────────────
   // Change Logic
   // ────────────────────────────────

   const commitItems = React.useCallback(
      (next: KV[], meta: ChangeDetail["meta"]) => {
         if (!onValue) return;

         const nextMap = itemsToMap(next);
         const detail: ChangeDetail = {
            source: "variant",
            raw: next,
            nativeEvent: undefined,
            meta,
         };
         onValue(nextMap, detail);
      },
      [onValue]
   );

   const openForNew = React.useCallback(() => {
      if (isDisabled || !canAdd) return;
      setEditingIndex(null);
      setDraft({ key: "", value: "" });
      setDialogOpen(true);
   }, [isDisabled, canAdd]);

   const openForEdit = React.useCallback(
      (index: number) => {
         if (isDisabled) return;
         const item = items[index];
         if (!item) return;
         setEditingIndex(index);
         setDraft(item);
         setDialogOpen(true);
      },
      [isDisabled, items]
   );

   const handleDelete = React.useCallback(() => {
      if (editingIndex == null) return;
      if (!canDelete) return;

      const next = items.slice();
      next.splice(editingIndex, 1);

      setDialogOpen(false);
      commitItems(next, {
         action: "delete",
         index: editingIndex,
      });
   }, [editingIndex, items, canDelete, commitItems]);

   const handleSubmit = React.useCallback(() => {
      const trimmedKey = draft.key.trim();
      const trimmedValue = draft.value;

      if (!trimmedKey) return;

      let next = items.slice();

      if (editingIndex != null) {
         // edit
         next[editingIndex] = { key: trimmedKey, value: trimmedValue };
      } else {
         // add / upsert
         const existingIndex = next.findIndex(
            (kv) => kv.key === trimmedKey
         );
         if (existingIndex !== -1) {
            next[existingIndex] = {
               key: trimmedKey,
               value: trimmedValue,
            };
         } else {
            if (!canAdd) return;
            next.push({ key: trimmedKey, value: trimmedValue });
         }
      }

      setDialogOpen(false);
      commitItems(next, {
         action: editingIndex != null ? "edit" : "add",
         index: editingIndex ?? next.length - 1,
      });
   }, [draft, items, editingIndex, canAdd, commitItems]);

   const handleQuickRemove = React.useCallback(
      (index: number) => {
         if (isDisabled || !canDelete) return;
         const next = items.slice();
         next.splice(index, 1);
         commitItems(next, { action: "delete", index });
      },
      [isDisabled, canDelete, items, commitItems]
   );

   // ────────────────────────────────
   // Visuals
   // ────────────────────────────────

   const sizeCls = sizeClasses(size as Size | undefined);
   const densityCls = densityPadding(density as Density | undefined);

   const renderChipNode = (pair: KV, index: number) => {
      const baseChip = (
         <button
            type="button"
            key={index}
            className={cn(
               "group inline-flex items-center gap-1.5 rounded-md",
               "bg-secondary/50 border border-transparent",
               "px-2 py-1 text-xs transition-all duration-200",
               "hover:bg-secondary hover:border-border/50 hover:shadow-sm",
               "animate-in fade-in zoom-in-95 fill-mode-both",
               isDisabled && "opacity-50 cursor-not-allowed",
               chipClassName
            )}
            onClick={() => openForEdit(index)}
            disabled={isDisabled}
         >
            <span className="font-semibold text-foreground truncate max-w-[120px]">
               {pair.key}
            </span>
            <span className="text-muted-foreground/40">:</span>
            <span className="text-muted-foreground truncate max-w-[120px]">
               {pair.value}
            </span>

            {canDelete && !isDisabled && (
               <div
                  role="button"
                  tabIndex={0}
                  className={cn(
                     "ml-1 flex h-4 w-4 items-center justify-center rounded-full",
                     "text-muted-foreground/60 opacity-0 transition-all",
                     "hover:bg-destructive hover:text-destructive-foreground",
                     "group-hover:opacity-100",
                     "focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
                  )}
                  onClick={(e) => {
                     e.stopPropagation();
                     handleQuickRemove(index);
                  }}
                  onKeyDown={(e) => {
                     if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        handleQuickRemove(index);
                     }
                  }}
                  aria-label={`Remove ${pair.key}`}
               >
                  <X className="h-3 w-3" />
               </div>
            )}
         </button>
      );

      if (!renderChip) return baseChip;

      return renderChip({
         pair,
         index,
         onEdit: () => openForEdit(index),
         onRemove: () => handleQuickRemove(index),
         defaultChip: baseChip,
      });
   };

   const hasItems = items.length > 0;

   // ────────────────────────────────
   // Dialog
   // ────────────────────────────────

   const ManageDialog = (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                  <PenLine className="h-4 w-4 text-muted-foreground" />
                  {dialogTitle}
               </DialogTitle>
               <DialogDescription>
                  {editingIndex !== null ? "Modify the existing key-value pair." : "Add a new key-value pair to the list."}
               </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium text-muted-foreground">
                     {keyLabel}
                  </label>
                  <Input
                     value={draft.key}
                     onChange={(e) =>
                        setDraft((prev) => ({
                           ...prev,
                           key: e.target.value,
                        }))
                     }
                     className="col-span-3"
                     autoFocus
                     disabled={isDisabled}
                     placeholder="e.g. Color"
                  />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                  <label className="text-right text-sm font-medium text-muted-foreground">
                     {valueLabel}
                  </label>
                  <Input
                     value={draft.value}
                     onChange={(e) =>
                        setDraft((prev) => ({
                           ...prev,
                           value: e.target.value,
                        }))
                     }
                     className="col-span-3"
                     disabled={isDisabled}
                     placeholder="e.g. Blue"
                     onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSubmit();
                     }}
                  />
               </div>
            </div>

            <DialogFooter className="flex sm:justify-between flex-row items-center">
               <div>
                  {editingIndex != null && canDelete && (
                     <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={isDisabled}
                     >
                        Delete
                     </Button>
                  )}
               </div>

               <div className="flex gap-2">
                  <Button
                     type="button"
                     variant="outline"
                     size="sm"
                     onClick={() => setDialogOpen(false)}
                  >
                     Cancel
                  </Button>
                  <Button
                     type="button"
                     size="sm"
                     onClick={handleSubmit}
                     disabled={isDisabled}
                  >
                     {submitLabel}
                  </Button>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );

   // ────────────────────────────────
   // Render
   // ────────────────────────────────

   return (
      <div
         className={cn(
            "group/container w-full",
            isDisabled && "opacity-60 cursor-not-allowed",
            className
         )}
         aria-disabled={isDisabled}
         aria-invalid={error ? "true" : undefined}
      >
         {/* Container mimicking an Input */}
         <div
            className={cn(
               "relative flex w-full flex-wrap items-center rounded-md border border-input bg-background transition-all",
               // Focus within styles to mimic Input focus
               !isDisabled && "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
               densityCls,
               sizeCls,
               chipsClassName
            )}
         >
            {hasItems ? (
               <>
                  {visibleItems.map((pair, index) =>
                     renderChipNode(pair, index)
                  )}

                  {overflowCount > 0 && (
                     <button
                        type="button"
                        className={cn(
                           "inline-flex h-6 items-center gap-1 rounded-full",
                           "bg-muted px-2 text-[11px] font-medium text-muted-foreground",
                           "hover:bg-muted/80 hover:text-foreground transition-colors"
                        )}
                        onClick={() => {
                           setDialogOpen(true);
                           setEditingIndex(null);
                           setDraft({ key: "", value: "" });
                        }}
                        disabled={isDisabled}
                     >
                        {moreLabel(overflowCount)}
                     </button>
                  )}
               </>
            ) : (
               <div className="flex items-center gap-2 text-muted-foreground/60 select-none">
                  <Tag className="h-3.5 w-3.5" />
                  <span className="text-sm">{placeholder ?? emptyLabel}</span>
               </div>
            )}

            {/* Inline Add Button */}
            {showAddButton && canAdd && !isDisabled && (
               <button
                  type="button"
                  onClick={openForNew}
                  className={cn(
                     "inline-flex h-6 items-center gap-1 rounded-full",
                     "border border-dashed border-muted-foreground/30 px-2",
                     "text-[11px] font-medium text-muted-foreground",
                     "hover:border-primary/50 hover:bg-accent hover:text-accent-foreground transition-all",
                     "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  )}
               >
                  <Plus className="h-3 w-3" />
                  <span>Add</span>
               </button>
            )}

            {/* Menu/Manage Button */}
            {showMenuButton && hasItems && !isDisabled && (
               <div className="ml-auto pl-1">
                  <button
                     type="button"
                     onClick={() => {
                        // Default behavior: open "Add New"
                        setDialogOpen(true);
                        setEditingIndex(null);
                        setDraft({ key: "", value: "" });
                     }}
                     className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                     aria-label="Add another"
                  >
                     <MoreHorizontal className="h-4 w-4" />
                  </button>
               </div>
            )}
         </div>

         {/* Error Message Support (Optional usage) */}
         {error && typeof error === 'string' && (
            <p className="mt-1.5 text-xs font-medium text-destructive">
               {error}
            </p>
         )}

         {ManageDialog}
      </div>
   );
});

ShadcnKeyValueVariant.displayName = "ShadcnKeyValueVariant";

export default ShadcnKeyValueVariant;
