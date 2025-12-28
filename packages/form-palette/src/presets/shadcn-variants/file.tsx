// src/presets/shadcn-variants/file.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";
import { cn, toArray } from "@/lib/utils";
import { Checkbox } from "@/presets/ui/checkbox";
import { ScrollArea } from "@/presets/ui/scroll-area";
import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { Badge } from "@/presets/ui/badge";
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
    FolderUp,
} from "lucide-react";
import { getPaletteUtil } from "@/lib/register-global";

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
    allowedTypes?: string[];
}) => Promise<CustomFileLoaderResult> | CustomFileLoaderResult;

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

/** ✅ Exact trigger height contract (your spec) */
function triggerHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}

/** Keep chips safely within the trigger height */
function chipHeight(size?: Size) {
    switch (size) {
        case "sm":
            return "h-5";
        case "lg":
            return "h-7";
        default:
            return "h-6";
    }
}

/** Folder button sizing that fits inside each trigger height */
function pickerBtnSize(size?: Size) {
    switch (size) {
        case "sm":
            return "h-6 w-6";
        case "lg":
            return "h-8 w-8";
        default:
            return "h-7 w-7";
    }
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
        name: (input as any).name ?? "Unknown File",
        status: "idle",
        ...input,
    } as FileItem;
}

function normaliseFromFiles(list: FileList | File[]): FileItem[] {
    const arr: File[] = Array.isArray(list) ? list : Array.from(list);
    return arr.map(normaliseFileLike);
}

function densityTokens(density?: Density) {
    switch (density) {
        case "compact":
            return {
                triggerPadX: "px-2",
                triggerGap: "gap-1.5",
                headerPad: "px-3 py-1.5",
                listPad: "p-1",
                rowPad: "px-2 py-1.5",
                footerPad: "p-1",
                dropPad: "px-5 py-6",
                dropGap: "gap-2",
                chipPad: "px-1",
                chipGap: "gap-1",
            };
        case "loose":
            return {
                triggerPadX: "px-4",
                triggerGap: "gap-3",
                headerPad: "px-4 py-2.5",
                listPad: "p-2",
                rowPad: "px-3 py-2.5",
                footerPad: "p-2",
                dropPad: "px-8 py-10",
                dropGap: "gap-4",
                chipPad: "px-2",
                chipGap: "gap-2",
            };
        default:
            return {
                triggerPadX: "px-3",
                triggerGap: "gap-2",
                headerPad: "px-3 py-2",
                listPad: "p-1",
                rowPad: "px-2 py-2",
                footerPad: "p-1",
                dropPad: "px-6 py-8",
                dropGap: "gap-3",
                chipPad: "px-1.5",
                chipGap: "gap-1.5",
            };
    }
}

function mergeHandlers<E>(
    a: ((e: E) => void) | undefined,
    b: ((e: E) => void) | undefined,
) {
    if (!a) return b;
    if (!b) return a;
    return (e: E) => {
        a(e);
        b(e);
    };
}

// ─────────────────────────────────────────────
// Props (with mode discriminator)
// ─────────────────────────────────────────────

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

type FileVariantBaseProps = Pick<
    VariantBaseProps<FileItem[]>,
    "value" | "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> & {
    multiple?: boolean;
    accept?: string | string[];
    maxFiles?: number;
    maxTotalSize?: number;

    showDropArea?: boolean;
    dropIcon?: React.ReactNode;
    dropTitle?: React.ReactNode;
    dropDescription?: React.ReactNode;
    custom?: boolean;
    asRaw?: boolean;
    renderDropArea?: (ctx: {
        openPicker: () => void;
        isDragging: boolean;
    }) => React.ReactNode;

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
        detail: ChangeDetail<{ from: "input" | "drop" | "custom-loader" }>,
    ) => void;

    customLoader?: CustomFileLoader;
    mergeMode?: "append" | "replace";

    formatFileName?: (item: FileItem) => React.ReactNode;
    formatFileSize?: (size?: number) => React.ReactNode;
    placeholder?: string;

    className?: string;
    dropAreaClassName?: string;
    listClassName?: string;
    triggerClassName?: string;
};

type FileDefaultModeProps = {
    mode?: "default";

    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;
    joinControls?: boolean;
    extendBoxToControls?: boolean;

    // not supported in default mode
    button?: never;
    children?: never;

    selectedBadge?: never;
    selectedBadgeHiddenWhenZero?: never;
    selectedBadgeVariant?: never;
    selectedBadgeClassName?: never;
    selectedBadgePlacement?: never;
};

type FileButtonTrigger =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          items: FileItem[];
          selectedCount: number;
          disabled: boolean;
      }) => React.ReactNode);

type FileButtonModeProps = {
    mode: "button";

    /** Used when mode="button". If provided, this is the trigger. If not, `children` is used. */
    button?: FileButtonTrigger;
    children?: FileButtonTrigger;

    /** Selected-count badge (mode="button" only) */
    selectedBadge?: boolean;
    selectedBadgeHiddenWhenZero?: boolean;
    selectedBadgeVariant?: BadgeVariant;
    selectedBadgeClassName?: string;
    selectedBadgePlacement?: "end" | "corner";

    // icons & controls NOT supported in button mode
    leadingIcons?: never;
    trailingIcons?: never;
    icon?: never;

    leadingControl?: never;
    trailingControl?: never;
    leadingControlClassName?: never;
    trailingControlClassName?: never;
    joinControls?: never;
    extendBoxToControls?: never;
};

export type ShadcnFileVariantProps = FileVariantBaseProps &
    (FileDefaultModeProps | FileButtonModeProps);

// ─────────────────────────────────────────────
// Sub-Components
// ─────────────────────────────────────────────

const FileThumbnail = ({ item }: { item: FileItem }) => {
    const [preview, setPreview] = React.useState<string | null>(null);

    React.useEffect(() => {
        const isImage =
            item.type?.startsWith("image/") ||
            item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
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
                <img
                    src={preview}
                    alt=""
                    className="h-full w-full object-cover"
                />
            ) : (
                <FileIcon className="h-4 w-4 text-muted-foreground/50" />
            )}
        </div>
    );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export const ShadcnFileVariant = React.forwardRef<
    HTMLDivElement,
    ShadcnFileVariantProps
>(function ShadcnFileVariant(props, ref) {
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
        asRaw,
        className,
        custom,
        dropAreaClassName,
        listClassName,
        triggerClassName,

        // default-mode only
        leadingIcons,
        trailingIcons,
        icon,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        joinControls: joinControlsProp,
        extendBoxToControls: extendBoxToControlsProp,

        // button-mode only
        mode = "default",
        button,
        children,
        selectedBadge = true,
        selectedBadgeHiddenWhenZero = true,
        selectedBadgeVariant = "secondary",
        selectedBadgeClassName,
        selectedBadgePlacement = "corner",
    } = props as ShadcnFileVariantProps & Record<string, any>;

    const joinControls =
        mode === "default" ? (joinControlsProp ?? true) : false;
    const extendBoxToControls =
        mode === "default" ? (extendBoxToControlsProp ?? true) : false;

    // ─────────────────────────────────────────────
    // State
    // ─────────────────────────────────────────────
    const items = toArray(value) ?? [];
    const isDisabled = Boolean(disabled || readOnly);

    const [dragOver, setDragOver] = React.useState(false);
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
        () => new Set(),
    );
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const den = densityTokens(density as Density);

    // Pre-calculations
    const heightCls = triggerHeight(size as Size);
    const chipHeightCls = chipHeight(size as Size);
    const pickerBtnCls = pickerBtnSize(size as Size);

    const resolvedLeadingIcons = (
        leadingIcons?.length ? leadingIcons : icon ? [icon] : []
    ) as React.ReactNode[];
    const resolvedTrailingIcons = (
        trailingIcons?.length ? trailingIcons : []
    ) as React.ReactNode[];
    const hasExternalControls = !!leadingControl || !!trailingControl;

    const COLLAPSE_LIMIT = 2;

    // ─────────────────────────────────────────────
    // Logic
    // ─────────────────────────────────────────────

    const emitChange = React.useCallback(
        (next: FileItem[], meta: any) => {
            onValue?.(next, {
                source: "variant",
                raw: next,
                nativeEvent: undefined,
                meta,
            });
        },
        [onValue],
    );

    const handleAddItems = React.useCallback(
        (incoming: FileItem[], from: "input" | "drop" | "custom-loader") => {
            if (isDisabled) return;

            let next = multiple ? [...items] : [];
            const added: FileItem[] = [];

            for (const item of incoming) {
                if (multiple && maxFiles && next.length >= maxFiles) break;

                const currentTotalSize = next.reduce(
                    (acc, i) => acc + (i.size || 0),
                    0,
                );
                if (
                    maxTotalSize &&
                    currentTotalSize + (item.size || 0) > maxTotalSize
                )
                    break;

                next.push(item);
                added.push(item);
            }

            if (added.length > 0) {
                onFilesAdded?.(added, {
                    source: "variant",
                    raw: added,
                    nativeEvent: undefined,
                    meta: { from },
                });
                emitChange(next, { action: "add", from, added });
            }
        },
        [
            emitChange,
            isDisabled,
            items,
            maxFiles,
            maxTotalSize,
            multiple,
            onFilesAdded,
        ],
    );

    const handleRemove = React.useCallback(
        (id: string) => {
            const next = items.filter((i) => i.id !== id);
            emitChange(next, { action: "remove", id });
            if (selectedIds.has(id)) {
                const nextSel = new Set(selectedIds);
                nextSel.delete(id);
                setSelectedIds(nextSel);
            }
        },
        [emitChange, items, selectedIds],
    );

    const handleBulkRemove = React.useCallback(() => {
        const next = items.filter((i) => !selectedIds.has(i.id));
        emitChange(next, {
            action: "bulk-remove",
            ids: Array.from(selectedIds),
        });
        setSelectedIds(new Set());
    }, [emitChange, items, selectedIds]);

    const openPicker = React.useCallback(async () => {
        if (isDisabled) return;

        let resolvedLoader =
            customLoader ?? (custom && getPaletteUtil("customLoader"));

        if (resolvedLoader) {
            try {
                const result = await resolvedLoader({
                    multiple,
                    current: items,
                    allowedTypes: toArray(accept),
                });
                if (!result) return;

                const normalized = toArray(result).map(normaliseFileLike);
                if (mergeMode === "replace" || !multiple) {
                    emitChange(normalized, {
                        action: "set",
                        from: "custom-loader",
                    });
                } else {
                    handleAddItems(normalized, "custom-loader");
                }
            } catch (err) {
                console.error("Custom loader failed", err);
            }
            return;
        }

        fileInputRef.current?.click();
    }, [
        customLoader,
        emitChange,
        handleAddItems,
        isDisabled,
        items,
        mergeMode,
        multiple,
    ]);

    const onDragOver = React.useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            if (!isDisabled) setDragOver(true);
        },
        [isDisabled],
    );

    const onDrop = React.useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            if (isDisabled || !e.dataTransfer.files?.length) return;
            const files = normaliseFromFiles(e.dataTransfer.files);
            handleAddItems(files, "drop");
        },
        [handleAddItems, isDisabled],
    );

    const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            handleAddItems(normaliseFromFiles(e.target.files), "input");
        }
        e.target.value = "";
    };

    // ─────────────────────────────────────────────
    // UI Pieces: Interactive File Chip
    // ─────────────────────────────────────────────

    const FileChip = React.useCallback(
        ({
            item,
            condensed = false,
        }: {
            item: FileItem;
            condensed?: boolean;
        }) => {
            const name = formatFileName ? formatFileName(item) : item.name;
            const [preview, setPreview] = React.useState<string | null>(null);
            const [isOpen, setIsOpen] = React.useState(false);

            React.useEffect(() => {
                const isImage =
                    item.type?.startsWith("image/") ||
                    item.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                if (!isImage) {
                    setPreview(null);
                    return;
                }

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
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <div
                            role="button"
                            tabIndex={0}
                            className={cn(
                                "flex items-center overflow-hidden rounded-sm border bg-muted/60 text-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none cursor-pointer",
                                chipHeightCls,
                                den.chipPad,
                                den.chipGap,
                                condensed ? "max-w-30" : "max-w-50",
                            )}
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(true);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.stopPropagation();
                                    setIsOpen(true);
                                }
                            }}
                        >
                            <FileIcon className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span className="truncate font-medium">{name}</span>

                            <button
                                type="button"
                                onPointerDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(item.id);
                                }}
                                className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 hover:bg-destructive/20 hover:text-destructive focus:outline-none"
                                aria-label="Remove file"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    </PopoverTrigger>

                    <PopoverContent
                        className="w-64 p-0"
                        align="start"
                        side="bottom"
                    >
                        <div className="relative aspect-video w-full flex items-center justify-center bg-muted/30 border-b">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt={item.name}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                                    <FileIcon className="h-10 w-10" />
                                    <span className="text-[10px] uppercase">
                                        No Preview
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-3">
                            <div
                                className="font-medium text-sm truncate"
                                title={item.name}
                            >
                                {name}
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                                <span>{formatFileSize(item.size)}</span>
                                {item.type && (
                                    <span className="uppercase opacity-70">
                                        {item.type.split("/").pop()}
                                    </span>
                                )}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            );
        },
        [
            chipHeightCls,
            den.chipGap,
            den.chipPad,
            formatFileName,
            formatFileSize,
            handleRemove,
        ],
    );

    // ─────────────────────────────────────────────
    // Button-mode trigger (with badge)
    // ─────────────────────────────────────────────

    const selectedCount = items.length;

    const resolveButtonTriggerElement =
        React.useCallback((): React.ReactElement => {
            const ctx = {
                open: popoverOpen,
                items,
                selectedCount,
                disabled: isDisabled,
            };

            const rawNode =
                typeof button === "function"
                    ? button(ctx)
                    : (button ??
                      (typeof children === "function"
                          ? children(ctx)
                          : children));

            const shouldShowBadge =
                Boolean(selectedBadge) &&
                (!selectedBadgeHiddenWhenZero || selectedCount > 0);

            const badgeEl = shouldShowBadge ? (
                <Badge
                    variant={selectedBadgeVariant}
                    className={cn(
                        "text-[10px] h-5 px-1.5 leading-none",
                        selectedBadgePlacement === "corner" &&
                            "absolute -top-2 -right-2",
                        selectedBadgeClassName,
                    )}
                >
                    {selectedCount}
                </Badge>
            ) : null;

            // Note: Using broader typings and `as any` in cloneElement prop bags to avoid TS complaining
            // when enhancing arbitrary custom components that may not declare DOM event props.
            const injectBadgeIntoElement = (el: React.ReactElement<any>) => {
                if (!badgeEl) return el;

                const existingClass = (el.props as any).className as
                    | string
                    | undefined;
                const nextClass = cn(
                    existingClass,
                    selectedBadgePlacement === "corner" && "relative",
                );

                const child = (el.props as any).children;

                if (selectedBadgePlacement === "end") {
                    return React.cloneElement(el, {
                        className: nextClass,
                        children: (
                            <span className="inline-flex items-center gap-2">
                                <span className="min-w-0">{child}</span>
                                {badgeEl}
                            </span>
                        ),
                    } as any);
                }

                return React.cloneElement(el, {
                    className: nextClass,
                    children: (
                        <>
                            {child}
                            {badgeEl}
                        </>
                    ),
                } as any);
            };

            const withDnD = (el: React.ReactElement<any>) =>
                React.cloneElement(el, {
                    onDragOver: mergeHandlers(
                        (el.props as any).onDragOver,
                        onDragOver,
                    ),
                    onDragLeave: mergeHandlers(
                        (el.props as any).onDragLeave,
                        () => setDragOver(false),
                    ),
                    onDrop: mergeHandlers((el.props as any).onDrop, onDrop),
                } as any);

            if (React.isValidElement(rawNode)) {
                return withDnD(injectBadgeIntoElement(rawNode));
            }

            // fallback trigger (no input styles; just whatever you passed + optional badge)
            const fallback = (
                <button
                    type="button"
                    disabled={isDisabled}
                    className={cn(
                        triggerClassName,
                        selectedBadgePlacement === "corner" && "relative",
                    )}
                    onDragOver={onDragOver}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                >
                    {rawNode ?? <span>{placeholder}</span>}
                    {badgeEl}
                </button>
            );

            // end placement needs an inline flex wrapper (fallback only)
            if (badgeEl && selectedBadgePlacement === "end") {
                return (
                    <button
                        type="button"
                        disabled={isDisabled}
                        className={cn(triggerClassName)}
                        onDragOver={onDragOver}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={onDrop}
                    >
                        <span className="inline-flex items-center gap-2">
                            <span className="min-w-0">
                                {rawNode ?? <span>{placeholder}</span>}
                            </span>
                            {badgeEl}
                        </span>
                    </button>
                );
            }

            return fallback;
        }, [
            button,
            children,
            isDisabled,
            items,
            onDragOver,
            onDrop,
            placeholder,
            popoverOpen,
            selectedBadge,
            selectedBadgeClassName,
            selectedBadgeHiddenWhenZero,
            selectedBadgePlacement,
            selectedBadgeVariant,
            selectedCount,
            triggerClassName,
        ]);

    // ─────────────────────────────────────────────
    // Trigger Region
    // ─────────────────────────────────────────────

    const TriggerRegion = React.useMemo(() => {
        // A) Drop Zone Mode (Big Box) - No Popover, the list is external
        if (showDropArea) {
            if (renderDropArea)
                return renderDropArea({ openPicker, isDragging: dragOver });

            return (
                <div
                    onClick={openPicker}
                    onDragOver={onDragOver}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                    className={cn(
                        "group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-center transition-all duration-200",
                        den.dropPad,
                        den.dropGap,
                        dragOver
                            ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                            : "border-muted-foreground/25 hover:bg-muted/30 hover:border-muted-foreground/50",
                        isDisabled && "cursor-not-allowed opacity-50",
                        error && "border-destructive/50 bg-destructive/5",
                        dropAreaClassName,
                    )}
                >
                    <div className="rounded-full bg-surfaces-input p-3 shadow-sm">
                        {dropIcon ?? (
                            <UploadCloud className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                            {dropTitle ?? "Click or drag to select"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {dropDescription ??
                                (multiple ? "Select files" : "Select a file")}
                        </p>
                    </div>
                </div>
            );
        }

        // B) Select-like mode: uses Popover
        const hasItems = items.length > 0;
        const visibleItems = items.slice(0, COLLAPSE_LIMIT);
        const hiddenCount = items.length - COLLAPSE_LIMIT;
        const isOverflowing = hiddenCount > 0;
        const anySelected = selectedIds.size > 0 && showCheckboxes && multiple;

        const TriggerEl =
            mode === "button" ? (
                resolveButtonTriggerElement()
            ) : (
                <div
                    className={cn(
                        "relative flex w-full cursor-pointer items-center py-0 transition-all",
                        heightCls,
                        den.triggerPadX,
                        den.triggerGap,
                        (!joinControls || !hasExternalControls) &&
                            "rounded-md border border-input bg-surfaces-input ring-offset-background hover:bg-accent/5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                        dragOver &&
                            (!joinControls || !hasExternalControls) &&
                            "border-primary ring-2 ring-primary/20",
                        isDisabled && "cursor-not-allowed opacity-50",
                        error &&
                            (!joinControls || !hasExternalControls) &&
                            "border-destructive text-destructive",
                        triggerClassName,
                    )}
                    onDragOver={onDragOver}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={onDrop}
                >
                    {/* Leading Icons */}
                    {resolvedLeadingIcons.map((ico, i) => (
                        <span
                            key={i}
                            className="flex shrink-0 items-center justify-center text-muted-foreground"
                        >
                            {ico}
                        </span>
                    ))}

                    {/* Content: Chips or Placeholder */}
                    <div
                        className={cn(
                            "flex flex-1 items-center overflow-hidden",
                            den.triggerGap,
                        )}
                    >
                        {hasItems ? (
                            <>
                                {visibleItems.map((item) => (
                                    <FileChip
                                        key={item.id}
                                        item={item}
                                        condensed={multiple}
                                    />
                                ))}
                                {isOverflowing && (
                                    <span className="flex h-5 items-center justify-center rounded-sm bg-muted px-1.5 text-xs font-medium text-muted-foreground">
                                        +{hiddenCount}
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="truncate text-muted-foreground">
                                {placeholder}
                            </span>
                        )}
                    </div>

                    {/* Trailing Icons */}
                    {resolvedTrailingIcons.map((ico, i) => (
                        <span
                            key={i}
                            className="flex shrink-0 items-center justify-center text-muted-foreground"
                        >
                            {ico}
                        </span>
                    ))}

                    {/* Dedicated File Picker Button */}
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                            "shrink-0 text-muted-foreground hover:text-foreground",
                            pickerBtnCls,
                        )}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            openPicker();
                        }}
                    >
                        <FolderUp className="h-4 w-4" />
                    </Button>

                    {/* Chevron (for Popover) */}
                    <ChevronDown
                        className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground opacity-50 transition-transform duration-200",
                            popoverOpen && "rotate-180",
                        )}
                    />
                </div>
            );

        return (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>{TriggerEl}</PopoverTrigger>

                <PopoverContent
                    className="w-(--radix-popover-trigger-width) p-0"
                    align="start"
                >
                    <div className="flex flex-col">
                        {/* Header */}
                        <div
                            className={cn(
                                "flex items-center justify-between border-b text-xs font-medium text-muted-foreground",
                                den.headerPad,
                            )}
                        >
                            <span>
                                {anySelected
                                    ? `${selectedIds.size} selected`
                                    : `${items.length} files total`}
                            </span>

                            {anySelected ? (
                                <button
                                    type="button"
                                    className="text-destructive hover:underline"
                                    onClick={handleBulkRemove}
                                >
                                    Remove selected
                                </button>
                            ) : items.length > 0 ? (
                                <button
                                    type="button"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={() =>
                                        emitChange([], { action: "clear" })
                                    }
                                >
                                    Clear all
                                </button>
                            ) : null}
                        </div>

                        {/* Scrollable List */}
                        <ScrollArea
                            className={cn(
                                "h-auto max-h-75 w-full",
                                den.listPad,
                            )}
                        >
                            <div className="flex flex-col gap-1">
                                {items.map((item) => {
                                    const selected = selectedIds.has(item.id);
                                    const toggle = () => {
                                        const next = new Set(selectedIds);
                                        if (next.has(item.id))
                                            next.delete(item.id);
                                        else next.add(item.id);
                                        setSelectedIds(next);
                                    };

                                    return (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                "group flex items-center gap-3 rounded-md text-sm transition-colors hover:bg-muted/50",
                                                den.rowPad,
                                            )}
                                        >
                                            {showCheckboxes && multiple && (
                                                <Checkbox
                                                    checked={selected}
                                                    onCheckedChange={toggle}
                                                    className="h-4 w-4 shrink-0"
                                                />
                                            )}

                                            <FileThumbnail item={item} />

                                            <div className="min-w-0 flex-1">
                                                <div className="truncate font-medium">
                                                    {formatFileName?.(item) ??
                                                        item.name}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span>
                                                        {formatFileSize(
                                                            item.size,
                                                        )}
                                                    </span>
                                                    {item.status ===
                                                        "failed" && (
                                                        <span className="text-destructive">
                                                            Failed
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemove(item.id);
                                                }}
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
                        <div className={cn("border-t", den.footerPad)}>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full justify-start text-xs"
                                onClick={() => {
                                    setPopoverOpen(false);
                                    openPicker();
                                }}
                            >
                                <Plus className="mr-2 h-3 w-3" />
                                {multiple
                                    ? "Add files..."
                                    : items.length
                                      ? "Replace file"
                                      : "Add file"}
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }, [
        COLLAPSE_LIMIT,
        FileChip,
        den,
        dragOver,
        dropAreaClassName,
        dropDescription,
        dropIcon,
        dropTitle,
        emitChange,
        error,
        handleBulkRemove,
        handleRemove,
        heightCls,
        isDisabled,
        items,
        joinControls,
        mode,
        multiple,
        onDragOver,
        onDrop,
        openPicker,
        pickerBtnCls,
        placeholder,
        popoverOpen,
        renderDropArea,
        resolveButtonTriggerElement,
        resolvedLeadingIcons,
        resolvedTrailingIcons,
        selectedIds,
        showCheckboxes,
        showDropArea,
        hasExternalControls,
        triggerClassName,
        formatFileName,
        formatFileSize,
        setPopoverOpen,
    ]);

    // ─────────────────────────────────────────────
    // External List (Drop Zone Mode Only)
    // ─────────────────────────────────────────────

    const showExternalList = multiple && showDropArea && items.length > 0;
    const anySelectedExternal =
        selectedIds.size > 0 && showCheckboxes && multiple;

    const ExternalFileList = showExternalList ? (
        <>
            {(anySelectedExternal || items.length > 0) && (
                <div className="mt-2 flex items-center justify-between px-1 text-xs text-muted-foreground">
                    <span>{items.length} files</span>
                    <div className="flex gap-2">
                        {anySelectedExternal && (
                            <button
                                type="button"
                                onClick={handleBulkRemove}
                                className="text-destructive hover:underline"
                            >
                                Remove selected
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => emitChange([], { action: "clear" })}
                            className="hover:text-foreground"
                        >
                            Clear all
                        </button>
                    </div>
                </div>
            )}

            <ScrollArea className={cn("mt-1 w-full", listClassName)}>
                <div className="flex flex-col gap-2">
                    {items.map((item, index) => {
                        const selected = selectedIds.has(item.id);
                        const toggle = () => {
                            const next = new Set(selectedIds);
                            if (next.has(item.id)) next.delete(item.id);
                            else next.add(item.id);
                            setSelectedIds(next);
                        };

                        if (renderFileItem) {
                            return renderFileItem({
                                item,
                                index,
                                selected,
                                toggleSelected: toggle,
                                remove: () => handleRemove(item.id),
                            });
                        }

                        return (
                            <div
                                key={item.id}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-lg border bg-card pr-3 transition-all hover:bg-muted/30",
                                    density === "compact"
                                        ? "p-2"
                                        : density === "loose"
                                          ? "p-3"
                                          : "p-2",
                                )}
                            >
                                {showCheckboxes && (
                                    <Checkbox
                                        checked={selected}
                                        onCheckedChange={toggle}
                                        className="ml-1"
                                    />
                                )}
                                <FileThumbnail item={item} />
                                <div className="min-w-0 flex-1 space-y-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="truncate text-sm font-medium text-foreground">
                                            {formatFileName?.(item) ??
                                                item.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{formatFileSize(item.size)}</span>
                                        {item.status === "loading" && (
                                            <span className="flex items-center gap-1 text-primary">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                            </span>
                                        )}
                                        {item.status === "failed" && (
                                            <span className="flex items-center gap-1 text-destructive">
                                                <AlertCircle className="h-3 w-3" />
                                            </span>
                                        )}
                                        {item.status === "done" && (
                                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemove(item.id)}
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                                >
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

    const joinedBox =
        mode === "default" &&
        joinControls &&
        extendBoxToControls &&
        !showDropArea;

    return (
        <div
            ref={ref}
            className={cn("w-full", className)}
            aria-disabled={isDisabled}
            aria-invalid={!!error}
        >
            <div
                className={cn(
                    "flex w-full",
                    joinedBox
                        ? "items-stretch rounded-md border border-input bg-surfaces-input shadow-xs ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                        : "items-start",
                    joinedBox &&
                        dragOver &&
                        "border-primary ring-2 ring-primary/20",
                    joinedBox && error && "border-destructive",
                )}
            >
                {mode === "default" && leadingControl && (
                    <div
                        className={cn(
                            "flex items-center",
                            joinControls &&
                                !showDropArea &&
                                "border-r bg-muted/50 px-3",
                            leadingControlClassName,
                        )}
                    >
                        {leadingControl}
                    </div>
                )}

                <div className="flex-1 min-w-0">{TriggerRegion}</div>

                {mode === "default" && trailingControl && (
                    <div
                        className={cn(
                            "flex items-center",
                            joinControls &&
                                !showDropArea &&
                                "border-l bg-muted/50 px-3",
                            trailingControlClassName,
                        )}
                    >
                        {trailingControl}
                    </div>
                )}
            </div>

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
});

ShadcnFileVariant.displayName = "ShadcnFileVariant";
export default ShadcnFileVariant;
