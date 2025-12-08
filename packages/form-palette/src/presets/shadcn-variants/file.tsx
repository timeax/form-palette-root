// src/presets/shadcn-variants/file.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/presets/ui/checkbox";
import { ScrollArea } from "@/presets/ui/scroll-area";
import { Button } from "@/presets/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/presets/ui/popover";
import {
   FileIcon,
   UploadCloud,
   Trash2,
   CheckCircle2,
   X,
   AlertCircle,
   Loader2,
   ChevronDown,
   Plus,
   FolderUp
} from "lucide-react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type FileSourceKind = "native" | "path" | "url" | "custom";

export interface FileItem {
   id: string;
   kind: FileSourceKind;
   file?: File;
   path?: string;
   url?: string;
   name: string;
   size?: number;
   type?: string;
   status?: "idle" | "loading" | "done" | "failed";
   error?: string | null;
   meta?: any;
}

export type FileLike =
   | File
   | string
   | {
      id?: string;
      file?: File;
      path?: string;
      url?: string;
      name?: string;
      size?: number;
      type?: string;
      status?: FileItem["status"];
      error?: string | null;
      meta?: any;
      [key: string]: unknown;
   };

export type CustomFileLoaderResult = FileLike | FileLike[] | null | undefined;

export type CustomFileLoader = (ctx: {
   multiple: boolean;
   current: FileItem[];
}) => Promise<CustomFileLoaderResult> | CustomFileLoaderResult;

export interface ShadcnFileVariantProps
   extends Pick<
      VariantBaseProps<FileItem[]>,
      "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
   > {
   multiple?: boolean;
   accept?: string | string[];
   maxFiles?: number;
   maxTotalSize?: number;

   showDropArea?: boolean;
   dropIcon?: React.ReactNode;
   dropTitle?: React.ReactNode;
   dropDescription?: React.ReactNode;

   renderDropArea?: (ctx: { openPicker: () => void; isDragging: boolean }) => React.ReactNode;
   renderFileItem?: (ctx: {
      item: FileItem;
      index: number;
      selected: boolean;
      toggleSelected: () => void;
      remove: () => void;
   }) => React.ReactNode;

   showCheckboxes?: boolean;
   onFilesAdded?: (
      added: FileItem[],
      detail: ChangeDetail<{ from: "input" | "drop" | "custom-loader" }>
   ) => void;

   customLoader?: CustomFileLoader;
   mergeMode?: "append" | "replace";

   formatFileName?: (item: FileItem) => React.ReactNode;
   formatFileSize?: (size?: number) => React.ReactNode;
   placeholder?: string;

   className?: string;
   dropAreaClassName?: string;
   listClassName?: string;

   leadingIcons?: React.ReactNode[];
   trailingIcons?: React.ReactNode[];
   icon?: React.ReactNode;

   leadingControl?: React.ReactNode;
   trailingControl?: React.ReactNode;
   leadingControlClassName?: string;
   trailingControlClassName?: string;
   joinControls?: boolean;
   extendBoxToControls?: boolean;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function fileId() {
   return `file_${Math.random().toString(36).slice(2)}`;
}

function formatSizeDefault(size?: number): string {
   if (!size || size <= 0) return "—";
   const kb = size / 1024;
   if (kb < 1024) return `${kb.toFixed(1)} KB`;
   const mb = kb / 1024;
   return `${mb.toFixed(1)} MB`;
}

function sliderHeight(size?: Size) {
   switch (size) {
      case "sm": return "min-h-8 text-xs";
      case "lg": return "min-h-12 text-base";
      case "md": default: return "min-h-10 text-sm";
   }
}

function toArray<T>(v: T | T[] | null | undefined): T[] {
   if (v == null) return [];
   return Array.isArray(v) ? v : [v];
}

function normaliseFileLike(input: FileLike): FileItem {
   const asAny: any = input as any;
   const existingId = asAny.id as string | undefined;

   if (existingId && (asAny.file || asAny.path || asAny.url)) {
      return {
         id: existingId,
         kind: (asAny.kind as FileSourceKind) ?? "custom",
         file: asAny.file,
         path: asAny.path,
         url: asAny.url,
         name: asAny.name ?? asAny.file?.name ?? existingId,
         size: asAny.size ?? asAny.file?.size,
         type: asAny.type ?? asAny.file?.type,
         status: asAny.status ?? "idle",
         error: asAny.error ?? null,
         meta: asAny.meta,
      };
   }

   if (input instanceof File) {
      return {
         id: existingId ?? fileId(),
         kind: "native",
         file: input,
         name: input.name,
         size: input.size,
         type: input.type,
         status: "idle",
         error: null,
      };
   }

   if (typeof input === "string") {
      const isUrl = input.includes("://");
      const name = input.split(/[\\/]/).pop() ?? input;
      return {
         id: existingId ?? fileId(),
         kind: isUrl ? "url" : "path",
         [isUrl ? "url" : "path"]: input,
         name,
         status: "idle",
         error: null,
      } as FileItem;
   }

   return {
      id: existingId ?? fileId(),
      kind: "custom",
      name: input.name ?? "Unknown File",
      status: "idle",
      ...input
   } as FileItem;
}

function normaliseFromFiles(list: FileList | File[]): FileItem[] {
   const arr: File[] = Array.isArray(list) ? list : Array.from(list);
   return arr.map(normaliseFileLike);
}

// ─────────────────────────────────────────────
// Sub-Components
// ─────────────────────────────────────────────

const FileThumbnail = ({ item }: { item: FileItem }) => {
   const [preview, setPreview] = React.useState<string | null>(null);

   React.useEffect(() => {
      const isImage = item.type?.startsWith("image/") || item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
      if (!isImage) return;

      if (item.file) {
         const url = URL.createObjectURL(item.file);
         setPreview(url);
         return () => URL.revokeObjectURL(url);
      }
      if (item.url || item.path) {
         setPreview(item.url || item.path || null);
      }
   }, [item]);

   return (
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-sm border bg-muted/50">
         {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
         ) : (
            <FileIcon className="h-4 w-4 text-muted-foreground/50" />
         )}
      </div>
   );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export const ShadcnFileVariant = React.forwardRef<HTMLDivElement, ShadcnFileVariantProps>(
   function ShadcnFileVariant(props, ref) {
      const {
         value,
         onValue,
         disabled,
         readOnly,
         error,
         size = "md",
         density = "comfortable",

         multiple = false,
         accept,
         maxFiles,
         maxTotalSize,

         showDropArea = false,
         dropIcon,
         dropTitle,
         dropDescription,
         renderDropArea,

         renderFileItem,
         showCheckboxes,
         onFilesAdded,
         customLoader,
         mergeMode = "append",

         formatFileName,
         formatFileSize = formatSizeDefault,
         placeholder = "Select file...",

         className,
         dropAreaClassName,
         listClassName,

         leadingIcons,
         trailingIcons,
         icon,
         leadingControl,
         trailingControl,
         leadingControlClassName,
         trailingControlClassName,
         joinControls = true,
         extendBoxToControls = true,
      } = props;

      // ─────────────────────────────────────────────
      // State
      // ─────────────────────────────────────────────
      const items = value ?? [];
      const isDisabled = !!disabled || !!readOnly;

      const [dragOver, setDragOver] = React.useState(false);
      const [selectedIds, setSelectedIds] = React.useState<Set<string>>(() => new Set());
      const [popoverOpen, setPopoverOpen] = React.useState(false);
      const fileInputRef = React.useRef<HTMLInputElement | null>(null);

      // Pre-calculations
      const heightCls = sliderHeight(size as Size);
      const resolvedLeadingIcons = leadingIcons || (icon ? [icon] : []);
      const resolvedTrailingIcons = trailingIcons || [];
      const hasExternalControls = !!leadingControl || !!trailingControl;

      const COLLAPSE_LIMIT = 2; // How many chips to show before +N

      // ─────────────────────────────────────────────
      // Logic
      // ─────────────────────────────────────────────

      const emitChange = React.useCallback(
         (next: FileItem[], meta: any) => {
            onValue?.(next, { source: "variant", raw: next, nativeEvent: undefined, meta });
         },
         [onValue]
      );

      const handleAddItems = (incoming: FileItem[], from: "input" | "drop" | "custom-loader") => {
         if (isDisabled) return;

         let next = multiple ? [...items] : [];
         const added: FileItem[] = [];

         for (const item of incoming) {
            if (multiple && maxFiles && next.length >= maxFiles) break;

            const currentTotalSize = next.reduce((acc, i) => acc + (i.size || 0), 0);
            if (maxTotalSize && (currentTotalSize + (item.size || 0)) > maxTotalSize) break;

            next.push(item);
            added.push(item);
         }

         if (added.length > 0) {
            onFilesAdded?.(added, { source: "variant", raw: added, nativeEvent: undefined, meta: { from } });
            emitChange(next, { action: "add", from, added });
         }
      };

      const handleRemove = (id: string) => {
         const next = items.filter((i) => i.id !== id);
         emitChange(next, { action: "remove", id });
         if (selectedIds.has(id)) {
            const nextSel = new Set(selectedIds);
            nextSel.delete(id);
            setSelectedIds(nextSel);
         }
      };

      const handleBulkRemove = () => {
         const next = items.filter(i => !selectedIds.has(i.id));
         emitChange(next, { action: "bulk-remove", ids: Array.from(selectedIds) });
         setSelectedIds(new Set());
      };

      const openPicker = async () => {
         if (isDisabled) return;

         if (customLoader) {
            try {
               const result = await customLoader({ multiple, current: items });
               if (!result) return;

               const normalized = toArray(result).map(normaliseFileLike);
               if (mergeMode === "replace" || !multiple) {
                  emitChange(normalized, { action: "set", from: "custom-loader" });
               } else {
                  handleAddItems(normalized, "custom-loader");
               }
            } catch (err) {
               console.error("Custom loader failed", err);
            }
            return;
         }
         fileInputRef.current?.click();
      };

      const onDragOver = (e: React.DragEvent) => {
         e.preventDefault();
         if (!isDisabled) setDragOver(true);
      };

      const onDrop = (e: React.DragEvent) => {
         e.preventDefault();
         setDragOver(false);
         if (isDisabled || !e.dataTransfer.files?.length) return;
         const files = normaliseFromFiles(e.dataTransfer.files);
         handleAddItems(files, "drop");
      };

      const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         if (e.target.files?.length) {
            handleAddItems(normaliseFromFiles(e.target.files), "input");
         }
         e.target.value = "";
      };

      // ─────────────────────────────────────────────
      // UI Pieces
      // ─────────────────────────────────────────────

      const FileChip = ({ item, condensed = false }: { item: FileItem, condensed?: boolean }) => {
         const name = formatFileName ? formatFileName(item) : item.name;
         return (
            <div
               className={cn(
                  "flex items-center gap-1.5 overflow-hidden rounded-sm border bg-muted/60 px-1.5 py-0.5 text-xs transition-colors hover:bg-muted",
                  condensed ? "max-w-[120px]" : "max-w-[200px]"
               )}
               onClick={(e) => e.stopPropagation()}
            >
               <FileIcon className="h-3 w-3 text-muted-foreground shrink-0" />
               <span className="truncate font-medium">{name}</span>
               <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}
                  className="ml-auto rounded-full text-muted-foreground/70 hover:text-destructive"
               >
                  <X className="h-3 w-3" />
               </button>
            </div>
         );
      };

      // ─────────────────────────────────────────────
      // Trigger Region Logic
      // ─────────────────────────────────────────────

      const TriggerRegion = React.useMemo(() => {
         // A. Drop Zone Mode (Big Box) - No Popover, list is external
         if (showDropArea) {
            if (renderDropArea) return renderDropArea({ openPicker, isDragging: dragOver });
            return (
               <div
                  onClick={openPicker}
                  onDragOver={onDragOver}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={onDrop}
                  className={cn(
                     "group relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-all duration-200",
                     dragOver
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-muted-foreground/25 hover:bg-muted/30 hover:border-muted-foreground/50",
                     isDisabled && "cursor-not-allowed opacity-50",
                     error && "border-destructive/50 bg-destructive/5",
                     dropAreaClassName
                  )}
               >
                  <div className="rounded-full bg-background p-3 shadow-sm">
                     {dropIcon ?? <UploadCloud className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <div className="space-y-1">
                     <p className="text-sm font-medium text-foreground">{dropTitle ?? "Click or drag to select"}</p>
                     <p className="text-xs text-muted-foreground">{dropDescription ?? (multiple ? "Select files" : "Select a file")}</p>
                  </div>
               </div>
            );
         }

         // B. Select-Like Input Mode - Uses Popover
         const hasItems = items.length > 0;
         const visibleItems = items.slice(0, COLLAPSE_LIMIT);
         const hiddenCount = items.length - COLLAPSE_LIMIT;
         const isOverflowing = hiddenCount > 0;
         const anySelected = selectedIds.size > 0 && showCheckboxes && multiple;

         return (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
               <PopoverTrigger asChild>
                  <div
                     className={cn(
                        "relative flex w-full cursor-pointer items-center gap-2 px-3 transition-all",
                        heightCls,
                        (!joinControls || !hasExternalControls) && "rounded-md border border-input bg-[var(--surfaces-input,_transparent)] shadow-xs ring-offset-background hover:bg-accent/5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        dragOver && "border-primary ring-2 ring-primary/20",
                        isDisabled && "cursor-not-allowed opacity-50",
                        error && "border-destructive text-destructive",
                        className
                     )}
                     onDragOver={onDragOver}
                     onDragLeave={() => setDragOver(false)}
                     onDrop={onDrop}
                  >
                     {/* Leading Icons */}
                     {resolvedLeadingIcons.map((ico, i) => (
                        <span key={i} className="flex shrink-0 items-center justify-center text-muted-foreground">{ico}</span>
                     ))}

                     {/* Content: Chips or Placeholder */}
                     <div className="flex flex-1 items-center gap-2 overflow-hidden">
                        {hasItems ? (
                           <>
                              {visibleItems.map(item => (
                                 <FileChip key={item.id} item={item} condensed={multiple} />
                              ))}
                              {isOverflowing && (
                                 <span className="flex h-5 items-center justify-center rounded-sm bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                                    +{hiddenCount}
                                 </span>
                              )}
                           </>
                        ) : (
                           <span className="truncate text-muted-foreground">{placeholder}</span>
                        )}
                     </div>

                     {/* Trailing Icons & Controls */}
                     {resolvedTrailingIcons.map((ico, i) => (
                        <span key={i} className="flex shrink-0 items-center justify-center text-muted-foreground">{ico}</span>
                     ))}

                     {/* 1. Dedicated File Control Button (Folder Icon) */}
                     <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={(e) => {
                           e.stopPropagation(); // Stop Popover from toggling
                           openPicker();
                        }}
                     >
                        <FolderUp className="h-4 w-4" />
                     </Button>

                     {/* 2. Chevron (for Popover) */}
                     <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground opacity-50 transition-transform duration-200", popoverOpen && "rotate-180")} />
                  </div>
               </PopoverTrigger>

               {/* Popover Content (Full Width) */}
               <PopoverContent
                  className="w-[--radix-popover-trigger-width] p-0"
                  align="start"
               >
                  <div className="flex flex-col">
                     {/* Header: Mass Selection Actions OR Summary */}
                     <div className="flex items-center justify-between border-b px-3 py-2 text-xs font-medium text-muted-foreground">
                        <span>
                           {anySelected ? `${selectedIds.size} selected` : `${items.length} files total`}
                        </span>

                        {anySelected ? (
                           <button
                              type="button"
                              className="text-destructive hover:underline"
                              onClick={handleBulkRemove}
                           >
                              Remove selected
                           </button>
                        ) : items.length > 0 && (
                           <button
                              type="button"
                              className="text-muted-foreground hover:text-foreground"
                              onClick={() => emitChange([], { action: "clear" })}
                           >
                              Clear all
                           </button>
                        )}
                     </div>

                     {/* Scrollable List with Checkboxes */}
                     <ScrollArea className="h-auto max-h-[300px] w-full p-1">
                        <div className="flex flex-col gap-1">
                           {items.map(item => {
                              const selected = selectedIds.has(item.id);
                              const toggle = () => {
                                 const next = new Set(selectedIds);
                                 if (next.has(item.id)) next.delete(item.id); else next.add(item.id);
                                 setSelectedIds(next);
                              };
                              return (
                                 <div key={item.id} className="group flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-muted/50">
                                    {showCheckboxes && multiple && (
                                       <Checkbox checked={selected} onCheckedChange={toggle} className="h-4 w-4 shrink-0" />
                                    )}

                                    <FileThumbnail item={item} />

                                    <div className="min-w-0 flex-1">
                                       <div className="truncate font-medium">{formatFileName?.(item) ?? item.name}</div>
                                       <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <span>{formatFileSize(item.size)}</span>
                                          {item.status === 'failed' && <span className="text-destructive">Failed</span>}
                                       </div>
                                    </div>

                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="h-7 w-7 opacity-0 group-hover:opacity-100"
                                       onClick={(e) => { e.stopPropagation(); handleRemove(item.id); }}
                                    >
                                       <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Button>
                                 </div>
                              );
                           })}
                           {items.length === 0 && (
                              <div className="py-4 text-center text-xs text-muted-foreground">
                                 No files selected
                              </div>
                           )}
                        </div>
                     </ScrollArea>

                     {/* Footer Add Button */}
                     <div className="border-t p-1">
                        <Button
                           variant="secondary"
                           size="sm"
                           className="w-full justify-start text-xs"
                           onClick={() => { setPopoverOpen(false); openPicker(); }}
                        >
                           <Plus className="mr-2 h-3 w-3" />
                           Add files...
                        </Button>
                     </div>
                  </div>
               </PopoverContent>
            </Popover>
         );
      }, [
         showDropArea, items, multiple, dragOver, isDisabled, placeholder,
         joinControls, hasExternalControls, resolvedLeadingIcons, resolvedTrailingIcons,
         popoverOpen, COLLAPSE_LIMIT, heightCls, openPicker, onDragOver, onDrop, renderDropArea, className,
         error, dropAreaClassName, dropIcon, dropTitle, dropDescription,
         selectedIds, showCheckboxes, handleBulkRemove, emitChange, formatFileName, formatFileSize, handleRemove
      ]);

      // ─────────────────────────────────────────────
      // External List (Drop Zone Mode Only)
      // ─────────────────────────────────────────────

      const showExternalList = (multiple && showDropArea && items.length > 0);
      const anySelectedExternal = selectedIds.size > 0 && showCheckboxes && multiple;

      const ExternalFileList = showExternalList ? (
         <>
            {/* Bulk Actions for External List */}
            {(anySelectedExternal || items.length > 0) && (
               <div className="mt-2 flex items-center justify-between px-1 text-xs text-muted-foreground">
                  <span>{items.length} files</span>
                  <div className="flex gap-2">
                     {anySelectedExternal && (
                        <button type="button" onClick={handleBulkRemove} className="text-destructive hover:underline">Remove selected</button>
                     )}
                     <button type="button" onClick={() => emitChange([], { action: "clear" })} className="hover:text-foreground">Clear all</button>
                  </div>
               </div>
            )}

            <ScrollArea className={cn("mt-1 w-full", listClassName)}>
               <div className="flex flex-col gap-2">
                  {items.map((item, index) => {
                     const selected = selectedIds.has(item.id);
                     const toggle = () => {
                        const next = new Set(selectedIds);
                        if (next.has(item.id)) next.delete(item.id); else next.add(item.id);
                        setSelectedIds(next);
                     };

                     if (renderFileItem) {
                        return renderFileItem({ item, index, selected, toggleSelected: toggle, remove: () => handleRemove(item.id) });
                     }

                     return (
                        <div key={item.id} className="group relative flex items-center gap-3 rounded-lg border bg-card p-2 pr-3 transition-all hover:bg-muted/30">
                           {showCheckboxes && <Checkbox checked={selected} onCheckedChange={toggle} className="ml-1" />}
                           <FileThumbnail item={item} />
                           <div className="min-w-0 flex-1 space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                 <span className="truncate text-sm font-medium text-foreground">{formatFileName?.(item) ?? item.name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                 <span>{formatFileSize(item.size)}</span>
                                 {item.status === 'loading' && <span className="flex items-center gap-1 text-primary"><Loader2 className="h-3 w-3 animate-spin" /></span>}
                                 {item.status === 'failed' && <span className="flex items-center gap-1 text-destructive"><AlertCircle className="h-3 w-3" /></span>}
                                 {item.status === 'done' && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                              </div>
                           </div>
                           <button type="button" onClick={() => handleRemove(item.id)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100">
                              <Trash2 className="h-4 w-4" />
                           </button>
                        </div>
                     );
                  })}
               </div>
            </ScrollArea>
         </>
      ) : null;

      // ─────────────────────────────────────────────
      // Render
      // ─────────────────────────────────────────────

      return (
         <div
            ref={ref}
            className={cn("w-full", className)}
            aria-disabled={isDisabled}
            aria-invalid={!!error}
         >
            {/* 1. Trigger Group */}
            <div className={cn(
               "flex w-full",
               joinControls && extendBoxToControls && !showDropArea
                  ? "items-stretch rounded-md border border-input bg-[var(--surfaces-input,_transparent)] shadow-xs ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                  : "items-start gap-2"
            )}>
               {leadingControl && (
                  <div className={cn(
                     "flex items-center",
                     joinControls && !showDropArea && "border-r bg-muted/50 px-3",
                     leadingControlClassName
                  )}>
                     {leadingControl}
                  </div>
               )}

               <div className="flex-1 min-w-0">
                  {TriggerRegion}
               </div>

               {trailingControl && (
                  <div className={cn(
                     "flex items-center",
                     joinControls && !showDropArea && "border-l bg-muted/50 px-3",
                     trailingControlClassName
                  )}>
                     {trailingControl}
                  </div>
               )}
            </div>

            {/* 2. External List (Drop Zone Mode Only) */}
            {ExternalFileList}

            <input
               ref={fileInputRef}
               type="file"
               className="hidden"
               multiple={multiple}
               accept={Array.isArray(accept) ? accept.join(",") : accept}
               onChange={onNativeChange}
            />
         </div>
      );
   }
);

ShadcnFileVariant.displayName = "ShadcnFileVariant";
export default ShadcnFileVariant;
