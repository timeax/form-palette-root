import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/presets/ui/popover";

type NormalizedMultiItem = {
   key: string;
   value: string | number;
   labelNode: React.ReactNode;
   labelText: string; // Used for width calculation
   disabled?: boolean;
};

export interface SelectionSummaryProps {
   selectedItems: NormalizedMultiItem[];
   placeholder?: React.ReactNode;
   onRemoveValue?: (value: NormalizedMultiItem) => void;
}

/**
 * Helper: Measure text width using a canvas.
 * Much faster than rendering hidden DOM elements.
 */
function getTextWidth(text: string, font: string) {
   if (typeof window === "undefined") return 0;
   const canvas =
      (window as any).__canvas ||
      ((window as any).__canvas = document.createElement("canvas"));
   const context = canvas.getContext("2d");
   context.font = font;
   const metrics = context.measureText(text);
   return metrics.width;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({
   selectedItems,
   placeholder,
   onRemoveValue,
}) => {
   const containerRef = React.useRef<HTMLSpanElement | null>(null);
   const [visibleCount, setVisibleCount] = React.useState(0);
   const [moreOpen, setMoreOpen] = React.useState(false);

   // Measure available width and calculate how many items fit
   React.useLayoutEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const computeVisibleItems = () => {
         const containerWidth = el.clientWidth;

         // 1. Get current font styles to ensure accurate measurement
         const computedStyle = window.getComputedStyle(el);
         const font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;

         // 2. Calculate the "Buffer" (12 characters width)
         // This is the space reserved for the "+ N more" trigger if truncation happens.
         // We use 'M' or '0' as an average widest character approximation, or a standard string.
         const bufferWidth = getTextWidth("000000000000", font);

         // 3. Width of the separator (e.g., ", ")
         const commaWidth = getTextWidth(", ", font);

         let usedWidth = 0;
         let count = 0;
         const totalItems = selectedItems.length;

         for (let i = 0; i < totalItems; i++) {
            const item = selectedItems[i];
            const itemWidth = getTextWidth(item.labelText, font);

            // Is this the very last item in the entire list?
            const isLastItem = i === totalItems - 1;

            // If it's the last item, we don't need the buffer space.
            // If it's NOT the last item, we must ensure we have space for this item AND the buffer.
            // (Because if we can't fit the *next* item, we'll need the buffer to show the badge).
            const spaceNeeded = isLastItem
               ? itemWidth
               : itemWidth + commaWidth + bufferWidth;

            if (usedWidth + spaceNeeded <= containerWidth) {
               usedWidth += itemWidth + commaWidth;
               count++;
            } else {
               // No more space
               break;
            }
         }

         // Ensure we show at least 1 item if there are items, 
         // unless even the first item is wider than the container (then CSS truncation handles it).
         setVisibleCount(Math.max(1, count));
      };

      computeVisibleItems();

      const ro = new ResizeObserver(computeVisibleItems);
      ro.observe(el);
      return () => ro.disconnect();
   }, [selectedItems, selectedItems.length]); // Re-run if items change

   const totalCount = selectedItems.length;

   if (!totalCount) {
      return (
         <span ref={containerRef} className="truncate text-muted-foreground w-full block">
            {placeholder ?? "Select options…"}
         </span>
      );
   }

   const visibleItems = selectedItems.slice(0, visibleCount);
   // If visible count covers everything, overflow is 0
   const overflowCount = totalCount - visibleItems.length;

   // Safety check: if our calculation says we can show X, but X < Total, 
   // strictly ensure we render the "More" chip.
   // If calculation resulted in showing all items, overflow is 0.
   const showMore = overflowCount > 0;

   const handleRemove = (value: NormalizedMultiItem) => {
      if (!onRemoveValue) return;
      onRemoveValue(value);
   };

   return (
      <span
         ref={containerRef}
         className="flex items-center w-full overflow-hidden whitespace-nowrap"
      >
         {/* Render Visible Items */}
         {visibleItems.map((item, index) => (
            <React.Fragment key={item.key}>
               <span className="truncate flex-shrink-0">
                  {item.labelNode}
               </span>
               {/* Add comma if it's not the last visible item */}
               {index < visibleItems.length - 1 && (
                  <span className="text-muted-foreground mr-1">,</span>
               )}
            </React.Fragment>
         ))}

         {/* Render Separator before "More" if needed */}
         {showMore && (
            <span className="text-muted-foreground mr-1">,</span>
         )}

         {/* Render "+N more" Chip */}
         {showMore && (
            <Popover open={moreOpen} onOpenChange={setMoreOpen}>
               <PopoverTrigger asChild>
                  <button
                     type="button"
                     className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 flex-shrink-0"
                     onClick={(e) => e.stopPropagation()}
                  >
                     +{overflowCount} more
                  </button>
               </PopoverTrigger>
               <PopoverContent
                  align="start"
                  className="w-56 max-h-64 overflow-y-auto p-2 text-sm"
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className="flex items-center justify-between mb-1">
                     <span className="font-medium text-xs text-muted-foreground">
                        Selected ({totalCount})
                     </span>
                     <button
                        type="button"
                        className="p-1 rounded hover:bg-muted"
                        onClick={() => setMoreOpen(false)}
                     >
                        <X className="h-3 w-3" />
                     </button>
                  </div>

                  <div className="space-y-1">
                     {selectedItems.map((item) => (
                        <div
                           key={item.key}
                           className={cn(
                              "flex items-center justify-between gap-2 rounded px-2 py-1",
                              "bg-muted/40"
                           )}
                        >
                           <span className="truncate">{item.labelNode}</span>
                           {onRemoveValue && (
                              <button
                                 type="button"
                                 className="flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item);
                                 }}
                              >
                                 <X className="h-3 w-3" />
                              </button>
                           )}
                        </div>
                     ))}
                  </div>
               </PopoverContent>
            </Popover>
         )}
      </span>
   );
};


// src/variants/select-utils.ts (or wherever you keep small helpers)

export type SelectPrimitive = string | number;

/**
 * Remove a single value from a selection array.
 *
 * - Works even if the selection is undefined/null.
 * - Compares using String() so "1" and 1 are treated consistently.
 */
export function removeSelectValue<T extends SelectPrimitive>(
   current: readonly T[] | undefined | null,
   valueToRemove: T
): T[] {
   if (!current || current.length === 0) return [];

   const target = String(valueToRemove);

   return current.filter((v) => String(v) !== target);
}