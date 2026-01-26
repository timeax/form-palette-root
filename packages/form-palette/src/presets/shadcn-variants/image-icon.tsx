// src/presets/shadcn-variants/image-icon.tsx
// noinspection DuplicatedCode

import * as React from "react";
import type { VariantBaseProps } from "@/variants/shared";
import { cn, toArray } from "@/lib/utils";
import { ScrollArea } from "@/presets/ui/scroll-area";
import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { Badge } from "@/presets/ui/badge";
import { Checkbox } from "@/presets/ui/checkbox";
import {
    ChevronDown,
    FolderUp,
    Image as ImageIcon,
    LayoutGrid,
    Plus,
    Trash2,
    X,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { getPaletteUtil } from "@/lib/register-global";

import type {
    CustomFileLoader,
    FileItem,
    FileLike,
    FileSourceKind,
} from "@/presets/shadcn-variants/file";
import {
    type IconGroup,
    IconPickerPanel,
    DEFAULT_GROUPS,
    DEFAULT_ICONIFY_URL
} from "@/presets/shadcn-variants/icon";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Size = "sm" | "md" | "lg";
type Density = "compact" | "comfortable" | "loose";

export type ImageValue = File | string;

/** Raw field value (what the field/defaultValue supports) */
export type ImageIconRawValue = string | File;

/** Internal structured values (still accepted for backwards-compat) */
export type ImageIconValue =
    | { kind: "icon"; icon: string }
    | { kind: "image"; image: ImageValue; name?: string };

/** What the component accepts as `value` */
export type ImageIconInputValue =
    | ImageIconRawValue
    | ImageIconRawValue[]
    | ImageIconValue
    | ImageIconValue[]
    | null
    | undefined;

/** What the component emits via `onValue` */
export type ImageIconFieldValue =
    | ImageIconRawValue
    | ImageIconRawValue[]
    | null
    | undefined;

// ─────────────────────────────────────────────
// Helpers (copied from file variant style; minimal + safe)
// ─────────────────────────────────────────────

function fileId() {
    return `file_${Math.random().toString(36).slice(2)}`;
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

function formatSizeDefault(size?: number): string {
    if (!size || size <= 0) return "—";
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    return `${mb.toFixed(1)} MB`;
}

/** ✅ Exact trigger height contract */
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

function densityTokens(density?: Density) {
    switch (density) {
        case "compact":
            return {
                triggerPadX: "px-2",
                triggerGap: "gap-1.5",
                headerPad: "px-3 py-1.5",
                bodyPad: "p-2",
                listPad: "p-1",
                rowPad: "px-2 py-1.5",
                footerPad: "p-1",
                chipPad: "px-1",
                chipGap: "gap-1",
            };
        case "loose":
            return {
                triggerPadX: "px-4",
                triggerGap: "gap-3",
                headerPad: "px-4 py-2.5",
                bodyPad: "p-3",
                listPad: "p-2",
                rowPad: "px-3 py-2.5",
                footerPad: "p-2",
                chipPad: "px-2",
                chipGap: "gap-2",
            };
        default:
            return {
                triggerPadX: "px-3",
                triggerGap: "gap-2",
                headerPad: "px-3 py-2",
                bodyPad: "p-2.5",
                listPad: "p-1",
                rowPad: "px-2 py-2",
                footerPad: "p-1",
                chipPad: "px-1.5",
                chipGap: "gap-1.5",
            };
    }
}

// ─────────────────────────────────────────────
// Raw string parsing (icon vs file)
// ─────────────────────────────────────────────

const ICONIFY_KEY_RE = /^[a-z0-9]+[a-z0-9-]*:[a-z0-9]+[a-z0-9-]*$/i;
const FILE_EXT_RE =
    /\.(png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff|avif|pdf|zip|rar|7z)$/i;

function isFileLikeString(s: string) {
    const v = s.trim();
    if (!v) return false;

    if (v.includes("://")) return true;
    if (
        v.startsWith("http:") ||
        v.startsWith("https:") ||
        v.startsWith("blob:") ||
        v.startsWith("data:") ||
        v.startsWith("file:")
    )
        return true;

    // path-like
    if (v.includes("/") || v.includes("\\")) return true;

    // filename extension at the end
    return FILE_EXT_RE.test(v);
}

// ─────────────────────────────────────────────
// Props (mode discriminator)
// ─────────────────────────────────────────────

type BadgeVariant = React.ComponentProps<typeof Badge>["variant"];

type ImageIconVariantBaseProps = Pick<
    VariantBaseProps<ImageIconFieldValue>,
    "onValue" | "error" | "disabled" | "readOnly" | "size" | "density"
> & {
    value?: ImageIconInputValue;

    multiple?: boolean;

    // icon picker config
    iconUrl?: string;
    iconGroups?: IconGroup[];
    allowedIconGroupIds?: string[];
    iconMaxRender?: number;

    // image picker config
    accept?: string | string[];
    maxFiles?: number;
    maxTotalSize?: number;
    customLoader?: CustomFileLoader;
    mergeMode?: "append" | "replace";
    formatFileName?: (item: FileItem) => React.ReactNode;
    formatFileSize?: (size?: number) => React.ReactNode;

    /**
     * Convert FileItem (esp native File) into a persisted string value if possible.
     * Falls back to:
     *  - item.url
     *  - item.path
     *  - native File object
     */
    formatFileValue?: (file: FileItem) => string | undefined;

    placeholder?: string;

    className?: string;
    triggerClassName?: string;
    popoverClassName?: string;

    showCheckboxes?: boolean;
};

type DefaultModeProps = {
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

type ButtonTrigger =
    | React.ReactNode
    | ((ctx: {
          open: boolean;
          items: ImageIconValue[];
          selectedCount: number;
          disabled: boolean;
      }) => React.ReactNode);

type ButtonModeProps = {
    mode: "button";

    button?: ButtonTrigger;
    children?: ButtonTrigger;

    selectedBadge?: boolean;
    selectedBadgeHiddenWhenZero?: boolean;
    selectedBadgeVariant?: BadgeVariant;
    selectedBadgeClassName?: string;
    selectedBadgePlacement?: "end" | "corner";

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

export type ShadcnImageIconVariantProps = ImageIconVariantBaseProps &
    (DefaultModeProps | ButtonModeProps);

// ─────────────────────────────────────────────
// Small thumb preview for images
// ─────────────────────────────────────────────

function useImagePreview(value: ImageValue | undefined) {
    const [src, setSrc] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (!value) {
            setSrc(null);
            return;
        }

        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            setSrc(url);
            return () => URL.revokeObjectURL(url);
        }

        setSrc(value);
    }, [value]);

    return src;
}

const ImageThumb = ({ image }: { image: ImageValue }) => {
    const src = useImagePreview(image);

    return (
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-sm border bg-muted/50">
            {src ? (
                <img src={src} alt="" className="h-full w-full object-cover" />
            ) : (
                <ImageIcon className="h-4 w-4 text-muted-foreground/50" />
            )}
        </div>
    );
};

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export const ShadcnImageIconVariant = React.forwardRef<
    HTMLDivElement,
    ShadcnImageIconVariantProps
>(function ShadcnImageIconVariant(props, ref) {
    const {
        value,
        onValue,
        disabled,
        readOnly,
        error,
        size = "md",
        density = "comfortable",

        multiple = false,

        // icon config
        iconUrl,
        iconGroups,
        allowedIconGroupIds,
        iconMaxRender,

        // image config
        accept,
        maxFiles,
        maxTotalSize,
        customLoader,
        mergeMode = "append",
        formatFileName,
        formatFileSize = formatSizeDefault,
        formatFileValue: formatFileValueProp,

        placeholder = "Select icon or image…",
        className,
        triggerClassName,
        popoverClassName,
        showCheckboxes = true,

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
    } = props as ShadcnImageIconVariantProps & Record<string, any>;

    const joinControls =
        mode === "default" ? (joinControlsProp ?? true) : false;
    const extendBoxToControls =
        mode === "default" ? (extendBoxToControlsProp ?? true) : false;

    const isDisabled = Boolean(disabled || readOnly);

    const regFormatFileValue = getPaletteUtil("formatFileValue");
    const formatFileValue = formatFileValueProp ?? regFormatFileValue;

    const regIcon = getPaletteUtil("iconPicker");
    const resolvedIconUrl = iconUrl ?? regIcon?.url;
    const resolvedIconGroups = iconGroups ?? regIcon?.groups;

    const effectiveIconGroups = React.useMemo(() => {
        const groups = resolvedIconGroups ?? DEFAULT_GROUPS;
        const allowed = toArray(allowedIconGroupIds).filter(
            Boolean,
        ) as string[];
        if (!allowed.length) return groups;

        const filtered = groups.filter((g) => allowed.includes(g.id));
        return filtered.length ? filtered : groups;
    }, [resolvedIconGroups, allowedIconGroupIds]);

    const allowedIconPrefixes = React.useMemo(() => {
        const set = new Set<string>();
        for (const g of effectiveIconGroups) {
            for (const p of g.prefixes ?? []) set.add(p);
        }
        return set;
    }, [effectiveIconGroups]);

    const isIconString = React.useCallback(
        (raw: string) => {
            const s = raw.trim();
            if (!s) return false;

            if (!ICONIFY_KEY_RE.test(s)) return false;

            // If it looks file-like, prefer "image"
            if (isFileLikeString(s)) return false;

            // If groups are configured, enforce known prefixes
            const prefix = s.split(":")[0] ?? "";
            return !(
                allowedIconPrefixes.size > 0 && !allowedIconPrefixes.has(prefix)
            );
        },
        [allowedIconPrefixes],
    );

    const normaliseImageIconInput = React.useCallback(
        (v: unknown): ImageIconValue | null => {
            if (v == null) return null;

            // Legacy structured
            if (typeof v === "object" && v) {
                const anyV: any = v;
                if (anyV.kind === "icon" && typeof anyV.icon === "string") {
                    return { kind: "icon", icon: anyV.icon };
                }
                if (
                    anyV.kind === "image" &&
                    (typeof anyV.image === "string" ||
                        anyV.image instanceof File)
                ) {
                    return {
                        kind: "image",
                        image: anyV.image,
                        name:
                            typeof anyV.name === "string"
                                ? anyV.name
                                : undefined,
                    };
                }
            }

            // Raw file
            if (v instanceof File) {
                return { kind: "image", image: v, name: v.name };
            }

            // Raw string: icon or image(url/path/blob/data)
            if (typeof v === "string") {
                const s = v.trim();
                if (!s) return null;

                if (isIconString(s)) return { kind: "icon", icon: s };

                return {
                    kind: "image",
                    image: s,
                    name: s.split(/[\\/]/).pop() ?? s,
                };
            }

            return null;
        },
        [isIconString],
    );

    const den = densityTokens(density as Density);
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

    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [tab, setTab] = React.useState<"icon" | "image">("icon");

    const list = React.useMemo<ImageIconValue[]>(() => {
        const raw = multiple ? toArray(value) : value != null ? [value] : [];
        return raw
            .map(normaliseImageIconInput)
            .filter(Boolean) as ImageIconValue[];
    }, [multiple, normaliseImageIconInput, value]);

    const iconsSelected = React.useMemo(() => {
        return list.filter((x) => x.kind === "icon").map((x) => x.icon);
    }, [list]);

    const imagesSelected = React.useMemo(() => {
        return list.filter((x) => x.kind === "image");
    }, [list]);

    const toFieldRaw = React.useCallback(
        (x: ImageIconValue): ImageIconRawValue => {
            return x.kind === "icon" ? x.icon : x.image;
        },
        [],
    );

    const emit = React.useCallback(
        (nextList: ImageIconValue[], meta: any) => {
            if (!onValue) return;

            const rawList = nextList.map(toFieldRaw);

            if (multiple) {
                onValue(rawList, {
                    source: "variant",
                    raw: rawList,
                    nativeEvent: undefined,
                    meta,
                });
            } else {
                onValue(rawList[0] ?? undefined, {
                    source: "variant",
                    raw: rawList[0] ?? undefined,
                    nativeEvent: undefined,
                    meta,
                });
            }
        },
        [multiple, onValue, toFieldRaw],
    );

    const removeAt = (idx: number) => {
        const next = [...list];
        next.splice(idx, 1);
        emit(next, { action: "remove", index: idx });
    };

    const clearAll = () => emit([], { action: "clear" });

    // ─────────────────────────────────────────────
    // Chips (Icon / Image)
    // ─────────────────────────────────────────────

    const Chip = React.useCallback(
        ({ item, index }: { item: ImageIconValue; index: number }) => {
            const label =
                item.kind === "icon"
                    ? (item.icon.split(":")[1] ?? item.icon)
                    : (item.name ??
                      (typeof item.image === "string"
                          ? (item.image.split(/[\\/]/).pop() ?? item.image)
                          : item.image.name));

            return (
                <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                        "flex items-center overflow-hidden rounded-sm border bg-muted/60 text-xs transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none cursor-pointer",
                        chipHeightCls,
                        den.chipPad,
                        den.chipGap,
                        "max-w-50",
                    )}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        setPopoverOpen(true);
                    }}
                >
                    {item.kind === "icon" ? (
                        <Icon
                            icon={item.icon}
                            className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                        />
                    ) : (
                        <ImageIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}

                    <span className="truncate font-medium">{label}</span>

                    <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            removeAt(index);
                        }}
                        className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-muted-foreground/70 hover:bg-destructive/20 hover:text-destructive focus:outline-none"
                        aria-label="Remove"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            );
        },
        [chipHeightCls, den.chipGap, den.chipPad, removeAt],
    );

    // ─────────────────────────────────────────────
    // Button-mode trigger (badge)
    // ─────────────────────────────────────────────

    const selectedCount = list.length;

    const resolveButtonTriggerElement =
        React.useCallback((): React.ReactElement => {
            const ctx = {
                open: popoverOpen,
                items: list,
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

            if (React.isValidElement(rawNode))
                return injectBadgeIntoElement(rawNode);

            return (
                <button
                    type="button"
                    disabled={isDisabled}
                    className={cn(
                        triggerClassName,
                        selectedBadgePlacement === "corner" && "relative",
                    )}
                >
                    {rawNode ?? <span>{placeholder}</span>}
                    {badgeEl}
                </button>
            );
        }, [
            button,
            children,
            isDisabled,
            list,
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
    // Images panel logic (native input + custom loader)
    // ─────────────────────────────────────────────

    const [dragOver, setDragOver] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);
    const [imgSelectedIds, setImgSelectedIds] = React.useState<Set<string>>(
        () => new Set(),
    );

    const imageItems: FileItem[] = React.useMemo(() => {
        // derive FileItem[] from current image selections
        return imagesSelected.map((x) => normaliseFileLike(x.image));
    }, [imagesSelected]);

    const canAddMore = (nextCount: number) => {
        if (!multiple) return nextCount <= 1;
        return !(maxFiles && nextCount > maxFiles);
    };

    const convertFileItemToImageValue = (
        item: FileItem,
    ): ImageValue | undefined => {
        if (item.url) return item.url;
        if (item.path) return item.path;

        if (item.file) {
            const maybe = formatFileValue?.(item);
            return maybe ?? item.file;
        }

        return undefined;
    };

    const setImagesFromItems = (
        itemsForImages: FileItem[],
        detailMeta: any,
    ) => {
        const nextImages = itemsForImages
            .map((it) => {
                const v = convertFileItemToImageValue(it);
                if (!v) return null;
                return {
                    kind: "image",
                    image: v,
                    name: it.name,
                } as ImageIconValue;
            })
            .filter(Boolean) as ImageIconValue[];

        if (multiple) {
            const icons = list.filter((x) => x.kind === "icon");

            const merged =
                mergeMode === "replace"
                    ? [...nextImages, ...icons]
                    : [...imagesSelected, ...nextImages, ...icons].filter(
                          Boolean,
                      );

            const onlyImages = merged.filter((x) => x.kind === "image");
            const onlyIcons = merged.filter((x) => x.kind === "icon");
            const limitedImages = maxFiles
                ? onlyImages.slice(0, maxFiles)
                : onlyImages;

            emit([...limitedImages, ...onlyIcons], {
                action: "set-images",
                ...detailMeta,
            });
        } else {
            const next = nextImages[0] ?? list.find((x) => x.kind === "icon");
            emit(next ? [next] : [], { action: "set-image", ...detailMeta });
        }
    };

    const handleAddImageItems = (
        incoming: FileItem[],
        from: "input" | "drop" | "custom-loader",
    ) => {
        if (isDisabled) return;

        let next = multiple ? [...imageItems] : [];
        const added: FileItem[] = [];

        for (const item of incoming) {
            if (!canAddMore(next.length + 1)) break;

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

        if (added.length) {
            setImagesFromItems(next, { from });
        }
    };

    const openImagePicker = React.useCallback(async () => {
        if (isDisabled) return;

        const resolvedLoader = customLoader ?? getPaletteUtil("customLoader");

        if (resolvedLoader) {
            try {
                const result = await resolvedLoader({
                    multiple,
                    current: imageItems,
                    allowedTypes: toArray(accept),
                });
                if (!result) return;

                const normalized = toArray(result).map(normaliseFileLike);

                if (!multiple || mergeMode === "replace") {
                    setImagesFromItems(normalized, { from: "custom-loader" });
                } else {
                    handleAddImageItems(normalized, "custom-loader");
                }
            } catch (err) {
                console.error("Custom loader failed", err);
            }
            return;
        }

        fileInputRef.current?.click();
    }, [accept, customLoader, imageItems, isDisabled, mergeMode, multiple]);

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
            handleAddImageItems(files, "drop");
        },
        [isDisabled, handleAddImageItems],
    );

    const onNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            handleAddImageItems(normaliseFromFiles(e.target.files), "input");
        }
        e.target.value = "";
    };

    const removeImageItem = (id: string) => {
        const next = imageItems.filter((x) => x.id !== id);
        setImagesFromItems(next, { action: "remove-image", id });
        if (imgSelectedIds.has(id)) {
            const nextSel = new Set(imgSelectedIds);
            nextSel.delete(id);
            setImgSelectedIds(nextSel);
        }
    };

    const bulkRemoveImages = () => {
        const next = imageItems.filter((x) => !imgSelectedIds.has(x.id));
        setImagesFromItems(next, {
            action: "bulk-remove-images",
            ids: Array.from(imgSelectedIds),
        });
        setImgSelectedIds(new Set());
    };

    // ─────────────────────────────────────────────
    // Icon panel change
    // ─────────────────────────────────────────────

    const onIconsChange = (nextIcons: string[]) => {
        const images = list.filter((x) => x.kind === "image");
        const icons = nextIcons.map(
            (i) => ({ kind: "icon", icon: i }) as ImageIconValue,
        );

        if (multiple) {
            emit([...images, ...icons], { action: "set-icons" });
        } else {
            const next = icons[0] ?? images[0];
            emit(next ? [next] : [], { action: "set-icon" });
            if (icons[0]) setPopoverOpen(false);
        }
    };

    // ─────────────────────────────────────────────
    // Trigger Region (outer)
    // ─────────────────────────────────────────────

    const TriggerRegion = React.useMemo(() => {
        const COLLAPSE_LIMIT = 2;

        const hasItems = list.length > 0;
        const visibleItems = list.slice(0, COLLAPSE_LIMIT);
        const hiddenCount = list.length - COLLAPSE_LIMIT;
        const isOverflowing = hiddenCount > 0;

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
                        isDisabled && "cursor-not-allowed opacity-50",
                        error &&
                            (!joinControls || !hasExternalControls) &&
                            "border-destructive text-destructive",
                        triggerClassName,
                    )}
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

                    {/* Content */}
                    <div
                        className={cn(
                            "flex flex-1 items-center overflow-hidden",
                            den.triggerGap,
                        )}
                    >
                        {hasItems ? (
                            <>
                                {visibleItems.map((it, i) => (
                                    <Chip
                                        key={`${it.kind}:${i}`}
                                        item={it}
                                        index={i}
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

                    {/* Picker button */}
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
                            setPopoverOpen(true);
                        }}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>

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
                    className={cn(
                        "w-(--radix-popover-trigger-width) p-0",
                        popoverClassName,
                    )}
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
                                {multiple
                                    ? `${list.length} selected`
                                    : list[0]
                                      ? "Selected"
                                      : "No selection"}
                            </span>

                            {list.length ? (
                                <button
                                    type="button"
                                    className="hover:text-foreground"
                                    onClick={clearAll}
                                >
                                    Clear all
                                </button>
                            ) : null}
                        </div>

                        {/* Tabs */}
                        <div
                            className={cn(
                                "flex items-center gap-2 border-b",
                                den.bodyPad,
                            )}
                        >
                            <Button
                                type="button"
                                variant={tab === "icon" ? "secondary" : "ghost"}
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => setTab("icon")}
                            >
                                <LayoutGrid className="mr-2 h-3.5 w-3.5" />
                                Icon
                            </Button>
                            <Button
                                type="button"
                                variant={
                                    tab === "image" ? "secondary" : "ghost"
                                }
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => setTab("image")}
                            >
                                <ImageIcon className="mr-2 h-3.5 w-3.5" />
                                Image
                            </Button>
                        </div>

                        {/* Body */}
                        {tab === "icon" ? (
                            <IconPickerPanel
                                url={
                                    resolvedIconUrl ??
                                    DEFAULT_ICONIFY_URL
                                }
                                groups={effectiveIconGroups ?? []}
                                allowedGroupIds={allowedIconGroupIds}
                                multiple={multiple}
                                density={density as Density}
                                value={iconsSelected}
                                maxRender={iconMaxRender}
                                onPicked={() => {
                                    if (!multiple) setPopoverOpen(false);
                                }}
                                onValue={onIconsChange}
                            />
                        ) : (
                            <div className="flex flex-col">
                                {/* Drop area / Add */}
                                <div
                                    onClick={openImagePicker}
                                    onDragOver={onDragOver}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={onDrop}
                                    className={cn(
                                        "m-3 rounded-md border-2 border-dashed p-4 text-center text-xs transition-all",
                                        dragOver
                                            ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                                            : "border-muted-foreground/25 hover:bg-muted/30 hover:border-muted-foreground/50",
                                        isDisabled &&
                                            "cursor-not-allowed opacity-50",
                                        error &&
                                            "border-destructive/50 bg-destructive/5",
                                    )}
                                >
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                        <FolderUp className="h-4 w-4" />
                                        <span>Click or drag to add image</span>
                                    </div>
                                    {(maxFiles || maxTotalSize) && (
                                        <div className="mt-2 text-[11px] text-muted-foreground/70">
                                            {maxFiles
                                                ? `Max files: ${maxFiles}`
                                                : null}
                                            {maxFiles && maxTotalSize
                                                ? " • "
                                                : null}
                                            {maxTotalSize
                                                ? `Max total: ${formatFileSize(maxTotalSize)}`
                                                : null}
                                        </div>
                                    )}
                                </div>

                                {/* List */}
                                <ScrollArea
                                    className={cn(
                                        "h-auto max-h-75 w-full",
                                        den.listPad,
                                    )}
                                >
                                    <div className="flex flex-col gap-1">
                                        {imageItems.map((it) => {
                                            const selected = imgSelectedIds.has(
                                                it.id,
                                            );
                                            const toggle = () => {
                                                const next = new Set(
                                                    imgSelectedIds,
                                                );
                                                if (next.has(it.id))
                                                    next.delete(it.id);
                                                else next.add(it.id);
                                                setImgSelectedIds(next);
                                            };

                                            return (
                                                <div
                                                    key={it.id}
                                                    className={cn(
                                                        "group flex items-center gap-3 rounded-md text-sm transition-colors hover:bg-muted/50",
                                                        den.rowPad,
                                                    )}
                                                >
                                                    {showCheckboxes &&
                                                        multiple && (
                                                            <Checkbox
                                                                checked={
                                                                    selected
                                                                }
                                                                onCheckedChange={
                                                                    toggle
                                                                }
                                                                className="h-4 w-4 shrink-0"
                                                            />
                                                        )}

                                                    <ImageThumb
                                                        image={
                                                            convertFileItemToImageValue(
                                                                it,
                                                            ) ??
                                                            it.file ??
                                                            it.name
                                                        }
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <div className="truncate font-medium">
                                                            {formatFileName?.(
                                                                it,
                                                            ) ?? it.name}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <span>
                                                                {formatFileSize(
                                                                    it.size,
                                                                )}
                                                            </span>
                                                            {it.status ===
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
                                                            removeImageItem(
                                                                it.id,
                                                            );
                                                        }}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                                                    </Button>
                                                </div>
                                            );
                                        })}

                                        {!imageItems.length && (
                                            <div className="py-4 text-center text-xs text-muted-foreground">
                                                No images selected
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>

                                {/* Footer */}
                                <div
                                    className={cn(
                                        "border-t flex items-center justify-between",
                                        den.footerPad,
                                    )}
                                >
                                    {showCheckboxes &&
                                    multiple &&
                                    imgSelectedIds.size > 0 ? (
                                        <button
                                            type="button"
                                            className="text-xs text-destructive hover:underline"
                                            onClick={bulkRemoveImages}
                                        >
                                            Remove selected (
                                            {imgSelectedIds.size})
                                        </button>
                                    ) : (
                                        <span className="text-xs text-muted-foreground">
                                            {multiple
                                                ? `${imageItems.length} images`
                                                : imageItems[0]
                                                  ? "Image selected"
                                                  : "No image"}
                                        </span>
                                    )}

                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 text-xs"
                                        onClick={openImagePicker}
                                        disabled={isDisabled}
                                    >
                                        <Plus className="mr-2 h-3 w-3" />
                                        {multiple
                                            ? "Add images..."
                                            : imageItems.length
                                              ? "Replace image"
                                              : "Add image"}
                                    </Button>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    multiple={multiple}
                                    accept={
                                        Array.isArray(accept)
                                            ? accept.join(",")
                                            : accept
                                    }
                                    onChange={onNativeChange}
                                />
                            </div>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        );
    }, [
        Chip,
        accept,
        allowedIconGroupIds,
        bulkRemoveImages,
        clearAll,
        den.bodyPad,
        den.headerPad,
        den.listPad,
        den.rowPad,
        den.triggerGap,
        den.triggerPadX,
        den.footerPad,
        dragOver,
        error,
        hasExternalControls,
        heightCls,
        iconMaxRender,
        iconsSelected,
        imageItems,
        imgSelectedIds,
        isDisabled,
        joinControls,
        list,
        mode,
        multiple,
        onDragOver,
        onDrop,
        openImagePicker,
        pickerBtnCls,
        placeholder,
        popoverClassName,
        popoverOpen,
        removeImageItem,
        effectiveIconGroups,
        resolvedIconUrl,
        resolveButtonTriggerElement,
        resolvedLeadingIcons,
        resolvedTrailingIcons,
        setPopoverOpen,
        showCheckboxes,
        tab,
        triggerClassName,
        density,
        onIconsChange,
        formatFileName,
        formatFileSize,
    ]);

    // ─────────────────────────────────────────────
    // Wrapper (joined controls)
    // ─────────────────────────────────────────────

    const joinedBox = mode === "default" && joinControls && extendBoxToControls;

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
                    joinedBox && error && "border-destructive",
                )}
            >
                {mode === "default" && leadingControl && (
                    <div
                        className={cn(
                            "flex items-center",
                            joinControls && "border-r bg-muted/50 px-3",
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
                            joinControls && "border-l bg-muted/50 px-3",
                            trailingControlClassName,
                        )}
                    >
                        {trailingControl}
                    </div>
                )}
            </div>
        </div>
    );
});

ShadcnImageIconVariant.displayName = "ShadcnImageIconVariant";
export default ShadcnImageIconVariant;
