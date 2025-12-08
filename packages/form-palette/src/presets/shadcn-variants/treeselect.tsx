import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Input } from "@/presets/ui/input";
import { Checkbox } from "@/presets/ui/checkbox";
import { Badge } from "@/presets/ui/badge";
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from "@/presets/ui/popover";
import {
   ChevronDown,
   ChevronRight,
   Search,
   X,
   Folder,
   FolderOpen,
   File,
   Check,
} from "lucide-react";

type TreeKey = string | number;

// Updated to support both single and array values
type TreeValue = TreeKey | TreeKey[] | undefined;

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type TreeSelectOption =
   | TreeKey
   | {
      label?: React.ReactNode;
      value?: TreeKey;
      description?: React.ReactNode;
      disabled?: boolean;
      icon?: React.ReactNode;
      children?: TreeSelectOption[];
      [key: string]: any;
   };

type NormalizedTreeItem = {
   key: string;
   value: TreeKey;
   labelNode: React.ReactNode;
   labelText: string;
   description?: React.ReactNode;
   disabled?: boolean;
   icon?: React.ReactNode;
   level: number;
   parentValue?: TreeKey;
   path: TreeKey[]; 
   hasChildren: boolean;
   children: NormalizedTreeItem[];
   raw: TreeSelectOption;
};

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function capitalizeFirst(label: string): string {
   if (!label) return label;
   return label.charAt(0).toUpperCase() + label.slice(1);
}

function normalizeTree(
   opts: readonly TreeSelectOption[] | undefined,
   config: Pick<
      ShadcnTreeSelectVariantProps,
      | "autoCap"
      | "optionLabel"
      | "optionValue"
      | "optionDescription"
      | "optionDisabled"
      | "optionIcon"
      | "optionKey"
   >,
   level = 0,
   parentValue?: TreeKey,
   path: TreeKey[] = []
): NormalizedTreeItem[] {
   if (!opts || !opts.length) return [];

   return opts.map((raw, index) => {
      const asObj: any =
         typeof raw === "string" || typeof raw === "number"
            ? { label: String(raw), value: raw }
            : raw;

      const value: TreeKey =
         typeof config.optionValue === "function"
            ? config.optionValue(raw)
            : typeof config.optionValue === "string"
               ? (asObj[config.optionValue] as TreeKey)
               : (asObj.value ??
                  asObj.id ??
                  asObj.key ??
                  String(index));

      let labelNode: React.ReactNode =
         typeof config.optionLabel === "function"
            ? config.optionLabel(raw)
            : typeof config.optionLabel === "string"
               ? asObj[config.optionLabel] ?? asObj.label ?? String(value)
               : asObj.label ?? String(value);

      if (config.autoCap && typeof labelNode === "string") {
         labelNode = capitalizeFirst(labelNode);
      }

      const labelText =
         typeof labelNode === "string"
            ? labelNode
            : typeof labelNode === "number"
               ? String(labelNode)
               : asObj.labelText ?? String(value);

      const description: React.ReactNode =
         typeof config.optionDescription === "function"
            ? config.optionDescription(raw)
            : typeof config.optionDescription === "string"
               ? asObj[config.optionDescription]
               : asObj.description;

      const disabled: boolean =
         typeof config.optionDisabled === "function"
            ? config.optionDisabled(raw)
            : typeof config.optionDisabled === "string"
               ? !!asObj[config.optionDisabled]
               : !!asObj.disabled;

      const icon: React.ReactNode =
         typeof config.optionIcon === "function"
            ? config.optionIcon(raw)
            : typeof config.optionIcon === "string"
               ? asObj[config.optionIcon]
               : asObj.icon;

      const key: React.Key =
         typeof config.optionKey === "function"
            ? config.optionKey(raw, index)
            : typeof config.optionKey === "string"
               ? asObj[config.optionKey] ?? value ?? index
               : asObj.key ?? value ?? index;

      const childrenRaw: TreeSelectOption[] | undefined = asObj.children;

      const nextPath = [...path, value];

      const children = normalizeTree(
         childrenRaw ?? [],
         config,
         level + 1,
         value,
         nextPath
      );

      return {
         key: String(key),
         value,
         labelNode,
         labelText,
         description,
         disabled,
         icon,
         level,
         parentValue,
         path, 
         hasChildren: !!children.length,
         children,
         raw,
      };
   });
}

function flattenTree(
   nodes: NormalizedTreeItem[]
): NormalizedTreeItem[] {
   const result: NormalizedTreeItem[] = [];
   
   function recurse(list: NormalizedTreeItem[]) {
       for(const node of list) {
           result.push(node);
           if(node.children.length) {
               recurse(node.children);
           }
       }
   }
   recurse(nodes);
   return result;
}

function toggleInArray(
   arr: TreeKey[] | undefined,
   key: TreeKey
): TreeKey[] | undefined {
   const list = arr ?? [];
   const idx = list.findIndex((v) => v === key);
   if (idx === -1) {
      return [...list, key];
   }
   const next = [...list];
   next.splice(idx, 1);
   return next.length ? next : undefined;
}

function triggerHeight(size?: Size) {
   switch (size) {
      case "sm":
         return "min-h-8 text-xs";
      case "lg":
         return "min-h-11 text-base";
      default:
         return "min-h-9 text-sm";
   }
}

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

export interface ShadcnTreeSelectVariantProps
   extends Pick<
      VariantBaseProps<TreeValue>,
      | "value"
      | "onValue"
      | "error"
      | "disabled"
      | "readOnly"
      | "size"
      | "density"
   > {
   options?: TreeSelectOption[];
   
   /**
    * If true, allows multiple selection (checkboxes).
    * If false, allows single selection (no checkboxes, closes on select).
    * Default: true
    */
   multiple?: boolean;

   autoCap?: boolean;
   optionLabel?: string | ((item: TreeSelectOption) => React.ReactNode);
   optionValue?: string | ((item: TreeSelectOption) => TreeKey);
   optionDescription?: string | ((item: TreeSelectOption) => React.ReactNode);
   optionDisabled?: string | ((item: TreeSelectOption) => boolean);
   optionIcon?: string | ((item: TreeSelectOption) => React.ReactNode);
   optionKey?: string | ((item: TreeSelectOption, index: number) => React.Key);

   searchable?: boolean;
   searchPlaceholder?: string;
   emptyLabel?: React.ReactNode;
   emptySearchText?: React.ReactNode;
   clearable?: boolean;
   placeholder?: React.ReactNode;

   className?: string;
   triggerClassName?: string;
   contentClassName?: string;

   renderOption?: (ctx: {
      item: NormalizedTreeItem;
      selected: boolean;
      index: number;
      option: React.ReactNode;
   }) => React.ReactNode;

   renderValue?: (ctx: {
      selectedItems: NormalizedTreeItem[];
      placeholder?: React.ReactNode;
   }) => React.ReactNode;

   expandAll?: boolean;
   defaultExpandedValues?: TreeKey[];
   leafOnly?: boolean;

   // Icons & controls
   leadingIcons?: React.ReactNode[];
   trailingIcons?: React.ReactNode[];
   icon?: React.ReactNode;
   iconGap?: number;
   leadingIconSpacing?: number;
   trailingIconSpacing?: number;

   leadingControl?: React.ReactNode;
   trailingControl?: React.ReactNode;
   leadingControlClassName?: string;
   trailingControlClassName?: string;

   joinControls?: boolean;
   extendBoxToControls?: boolean;
}


// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export const ShadcnTreeSelectVariant = React.forwardRef<
   HTMLButtonElement,
   ShadcnTreeSelectVariantProps
>(function ShadcnTreeSelectVariant(props, _ref) {
   const {
      value,
      onValue,
      error,
      disabled,
      readOnly,
      size,
      density,

      options,
      multiple = true, // Default to true to match previous behavior

      autoCap,
      optionLabel,
      optionValue,
      optionDescription,
      optionDisabled,
      optionIcon,
      optionKey,

      searchable = true,
      searchPlaceholder,

      emptyLabel,
      emptySearchText,

      clearable = true,
      placeholder,

      className,
      triggerClassName,
      contentClassName,

      renderOption,
      renderValue,

      expandAll = false,
      defaultExpandedValues,
      leafOnly = false,

      // Icons & controls
      leadingIcons,
      trailingIcons,
      icon,
      iconGap,
      leadingIconSpacing,
      trailingIconSpacing,
      leadingControl,
      trailingControl,
      leadingControlClassName,
      trailingControlClassName,
      joinControls = true,
      extendBoxToControls = true,
   } = props;

   const [open, setOpen] = React.useState(false);
   const [query, setQuery] = React.useState("");

   // Normalize tree
   const tree = React.useMemo(
      () =>
         normalizeTree(options ?? [], {
            autoCap,
            optionLabel,
            optionValue,
            optionDescription,
            optionDisabled,
            optionIcon,
            optionKey,
         }),
      [
         options,
         autoCap,
         optionLabel,
         optionValue,
         optionDescription,
         optionDisabled,
         optionIcon,
         optionKey,
      ]
   );

   const allNodesFlat = React.useMemo(
      () => flattenTree(tree),
      [tree]
   );

   // Expanded tracking
   const initialExpanded = React.useMemo(() => {
      if (expandAll) {
         return new Set<TreeKey>(
            allNodesFlat
               .filter((n) => n.hasChildren)
               .map((n) => n.value)
         );
      }
      if (defaultExpandedValues?.length) {
         return new Set<TreeKey>(defaultExpandedValues);
      }
      return new Set<TreeKey>();
   }, [expandAll, defaultExpandedValues, allNodesFlat]);

   const [expanded, setExpanded] = React.useState<Set<TreeKey>>(initialExpanded);

   const toggleExpanded = React.useCallback(
      (key: TreeKey) => {
         setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
               next.delete(key);
            } else {
               next.add(key);
            }
            return next;
         });
      },
      []
   );

   const displayedNodes = React.useMemo(() => {
      if (query) {
         const q = query.toLowerCase();
         const matchSet = new Set<TreeKey>();
         const checkMatch = (node: NormalizedTreeItem): boolean => {
            const selfMatch = node.labelText.toLowerCase().includes(q);
            const childMatch = node.children.some(checkMatch);
            if (selfMatch || childMatch) {
               matchSet.add(node.value);
               node.path.forEach(p => matchSet.add(p));
               return true;
            }
            return false;
         };
         tree.forEach(checkMatch);
         return allNodesFlat.filter(n => matchSet.has(n.value));
      }

      return allNodesFlat.filter((node) => {
          if (node.level === 0) return true;
          for (const ancestorKey of node.path) {
              if (!expanded.has(ancestorKey)) return false;
          }
          return true;
      });
   }, [allNodesFlat, query, tree, expanded]);

   // Selection State Normalization
   const selectedValues = React.useMemo(() => {
      if (value === undefined || value === null) return [];
      return Array.isArray(value) ? value : [value];
   }, [value]);

   const selectedItems = React.useMemo(
      () =>
         allNodesFlat.filter((node) =>
            selectedValues.includes(node.value)
         ),
      [allNodesFlat, selectedValues]
   );

   const isDisabled = disabled || readOnly;

   const handleToggleValue = React.useCallback(
      (item: NormalizedTreeItem) => {
         if (isDisabled) return;
         
         // In leafOnly mode, parents toggle expansion instead of selection
         if (leafOnly && item.hasChildren) {
             toggleExpanded(item.value);
             return;
         }

         let nextValue: TreeValue;

         if (multiple) {
             // Multi-select: toggle in array
             nextValue = toggleInArray(selectedValues, item.value);
         } else {
             // Single-select: set value, close popover
             // If clicking same item, do we deselect? usually no for select boxes, 
             // but let's allow basic switch.
             nextValue = item.value; 
             setOpen(false);
         }

         const detail: ChangeDetail = {
            source: "variant",
            raw: item.raw,
            nativeEvent: undefined,
            meta: {
               toggled: item.value,
               selectedValues: Array.isArray(nextValue) ? nextValue : (nextValue ? [nextValue] : []),
            },
         };

         onValue?.(nextValue, detail);
      },
      [isDisabled, leafOnly, multiple, selectedValues, onValue, toggleExpanded]
   );

   const handleClear = React.useCallback(() => {
      if (!onValue) return;
      const detail: ChangeDetail = {
         source: "variant",
         raw: undefined,
         nativeEvent: undefined,
         meta: { action: "clear" },
      };
      onValue(undefined, detail);
   }, [onValue]);

   const resolvedLeadingIcons = leadingIcons && leadingIcons.length ? leadingIcons : (icon ? [icon] : []);
   const resolvedTrailingIcons = trailingIcons ?? [];
   const baseIconGap = iconGap ?? 4;
   const leadingGap = leadingIconSpacing ?? baseIconGap;
   const trailingGap = trailingIconSpacing ?? baseIconGap;
   const hasLeadingControl = !!leadingControl;
   const hasTrailingControl = !!trailingControl;
   const hasControls = hasLeadingControl || hasTrailingControl;
   const showClear = clearable && !isDisabled && selectedValues.length > 0;

   // ─────────────────────────────────────────────
   // Render: Trigger
   // ─────────────────────────────────────────────

   const renderDefaultTriggerContent = () => {
       if (!selectedItems.length) {
           return <span className="text-muted-foreground">{placeholder ?? "Select..."}</span>;
       }

       // Single Select Mode: Just show text
       if (!multiple && selectedItems.length === 1) {
           return <span className="text-foreground">{selectedItems[0].labelNode}</span>;
       }

       // Multi Select Mode: Badges
       if (selectedItems.length <= 3) {
           return (
               <div className="flex flex-wrap gap-1">
                   {selectedItems.map(item => (
                       <Badge key={item.key} variant="secondary" className="px-1.5 h-5 text-[10px] font-medium border-border/50 bg-secondary/50">
                           {item.labelNode}
                       </Badge>
                   ))}
               </div>
           )
       }

       return (
           <div className="flex items-center gap-1">
                <Badge variant="secondary" className="px-1.5 h-5 text-[10px] bg-secondary/50">
                    {selectedItems.length} selected
                </Badge>
           </div>
       );
   }

   const triggerContent = renderValue
      ? renderValue({ selectedItems, placeholder })
      : renderDefaultTriggerContent();

   const baseBoxClasses = cn(
      "flex items-center justify-between border-input w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm shadow-xs ring-offset-background",
      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:border-destructive"
   );

   const TriggerButton = (
      <button
         type="button"
         disabled={isDisabled}
         className={cn(
            triggerHeight(size as Size),
            hasControls && extendBoxToControls
               ? "border-none shadow-none focus:outline-none bg-transparent w-full text-left"
               : baseBoxClasses,
            triggerClassName
         )}
      >
         <div className="flex w-full items-center justify-between gap-2 overflow-hidden">
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
               {resolvedLeadingIcons.length > 0 && (
                  <span className="flex items-center shrink-0" style={{ columnGap: leadingGap }}>
                     {resolvedLeadingIcons.map((node, idx) => <span key={idx}>{node}</span>)}
                  </span>
               )}
               <div className="truncate w-full text-left">
                  {triggerContent}
               </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
               {showClear && (
                  <div
                     role="button"
                     onClick={(e) => {
                        e.stopPropagation();
                        handleClear();
                     }}
                     className="text-muted-foreground hover:text-foreground p-0.5 rounded-sm hover:bg-muted transition-colors"
                  >
                     <X className="h-3.5 w-3.5" />
                  </div>
               )}
               {resolvedTrailingIcons.length > 0 && (
                   <span className="flex items-center" style={{ columnGap: trailingGap }}>
                       {resolvedTrailingIcons.map((node, idx) => <span key={idx}>{node}</span>)}
                   </span>
               )}
               <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
         </div>
      </button>
   );

   // ─────────────────────────────────────────────
   // Render: Tree Body
   // ─────────────────────────────────────────────

   const TreeBody = (
      <div className="max-h-80 w-full overflow-y-auto overflow-x-hidden py-1">
         {emptyLabel && tree.length === 0 && !query && (
            <div className="px-4 py-3 text-sm text-center text-muted-foreground">
               {emptyLabel}
            </div>
         )}
         {tree.length > 0 && displayedNodes.length === 0 && (
            <div className="px-4 py-3 text-sm text-center text-muted-foreground">
               {emptySearchText ?? "No results found"}
            </div>
         )}

         {displayedNodes.map((item, index) => {
               const selected = selectedValues.includes(item.value);
               const isExpanded = expanded.has(item.value);

               return (
                  <div
                     key={item.key}
                     className={cn(
                        "relative flex items-center gap-2 px-2 py-1.5 text-sm outline-none select-none",
                        item.disabled ? "opacity-50" : "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        selected && !multiple && "bg-accent", // Highlight background if single select
                        selected && multiple && "bg-accent/50" // Subtler highlight if multi select (checkbox does work)
                     )}
                     style={{ paddingLeft: 12 + item.level * 20 }}
                     onClick={(e) => {
                         e.preventDefault();
                         if(!item.disabled) handleToggleValue(item);
                     }}
                  >
                     {/* Guidelines */}
                     {item.level > 0 && Array.from({ length: item.level }).map((_, i) => (
                         <div 
                            key={i}
                            className="absolute border-l border-border/40 h-full top-0"
                            style={{ left: 19 + i * 20 }}
                         />
                     ))}

                     {/* Expander */}
                     <button
                        type="button"
                        onClick={(e) => {
                           e.stopPropagation();
                           toggleExpanded(item.value);
                        }}
                        className={cn(
                            "z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                            !item.hasChildren && "opacity-0 pointer-events-none"
                        )}
                     >
                        {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                     </button>

                     {/* Checkbox (Multi Only) */}
                     {multiple && (
                        <Checkbox
                            checked={selected}
                            className="shrink-0 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            style={{ pointerEvents: 'none' }} 
                        />
                     )}

                     {/* Icon */}
                     {item.icon ? (
                         <span className="text-muted-foreground">{item.icon}</span>
                     ) : (
                         item.hasChildren ? (
                             isExpanded ? <FolderOpen className="h-4 w-4 text-blue-400/80 fill-blue-400/20" /> : <Folder className="h-4 w-4 text-blue-400/80 fill-blue-400/20" />
                         ) : (
                             <File className="h-4 w-4 text-muted-foreground/60" />
                         )
                     )}

                     {/* Label */}
                     <div className="flex flex-col min-w-0 flex-1">
                        <span className="truncate font-medium leading-none">
                           {item.labelNode}
                        </span>
                        {item.description && (
                           <span className="text-xs text-muted-foreground truncate mt-0.5">
                              {item.description}
                           </span>
                        )}
                     </div>

                     {/* Checkmark (Single Only) */}
                     {!multiple && selected && (
                         <Check className="h-4 w-4 text-primary ml-auto" />
                     )}
                  </div>
               );
            })}
      </div>
   );

   const SelectBody = (
      <Popover
         open={open}
         onOpenChange={(next) => {
            setOpen(next);
            if (!next) setQuery("");
         }}
         modal={true}
      >
         <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
         <PopoverContent
            className={cn("p-0 w-(--radix-popover-trigger-width) min-w-[300px]", contentClassName)}
            align="start"
         >
            {searchable && (
               <div className="flex items-center border-b px-3 py-2.5">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                     autoFocus
                     className="flex h-4 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                     placeholder={searchPlaceholder ?? "Search..."}
                  />
               </div>
            )}
            {TreeBody}
         </PopoverContent>
      </Popover>
   );

   if (!hasControls) {
      return <div data-slot="tree-select-field" className={cn("w-full", className)}>{SelectBody}</div>;
   }

   if (joinControls) {
      return (
         <div data-slot="tree-select-field" className={cn("w-full", className)}>
            <div className={cn(
                "flex items-center w-full rounded-md border border-input bg-background shadow-xs focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background",
                isDisabled && "opacity-50 cursor-not-allowed bg-muted"
            )}>
               {hasLeadingControl && <div className={cn("pl-3 pr-1 text-muted-foreground", leadingControlClassName)}>{leadingControl}</div>}
               <div className="flex-1 min-w-0">{SelectBody}</div>
               {hasTrailingControl && <div className={cn("pr-3 pl-1 text-muted-foreground", trailingControlClassName)}>{trailingControl}</div>}
            </div>
         </div>
      );
   }

   return (
      <div className={cn("flex items-center gap-2 w-full", className)}>
         {hasLeadingControl && leadingControl}
         <div className="flex-1 min-w-0">{SelectBody}</div>
         {hasTrailingControl && trailingControl}
      </div>
   );
});

ShadcnTreeSelectVariant.displayName = "ShadcnTreeSelectVariant";

export default ShadcnTreeSelectVariant;
