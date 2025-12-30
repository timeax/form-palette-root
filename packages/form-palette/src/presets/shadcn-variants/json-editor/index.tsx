// src/presets/shadcn-variants/json-editor/index.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { ScrollArea } from "@/presets/ui/scroll-area";

import { ChevronDown, ChevronUp, Code2 } from "lucide-react";

import type { ChangeDetail } from "@/variants/shared";
import type { JsonObject } from "@/lib/json-editor/utils";

import type {
    JsonEditorIndexHandle,
    JsonEditorTriggerSize,
    JsonEditorTriggerVariant,
    ShadcnJsonEditorProps,
} from "./types";

import JsonEditor from "./editor";

function isPlainObject(v: unknown): v is JsonObject {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function triggerHeightCls(size?: JsonEditorTriggerSize) {
    // match your input-ish sizing conventions
    switch (size) {
        case "sm":
            return "h-8 text-xs";
        case "lg":
            return "h-11 text-base";
        default:
            return "h-9 text-sm";
    }
}

export const ShadcnJsonEditorVariant = React.forwardRef<
    JsonEditorIndexHandle,
    ShadcnJsonEditorProps
>(function ShadcnJsonEditorVariant(props, ref) {
    const {
        mode = "popover",

        // wrapper ui
        title,
        schema,
        triggerLabel = "Edit JSON",
        triggerVariant = "outline" as JsonEditorTriggerVariant,
        triggerSize = "default" as JsonEditorTriggerSize,

        popoverClassName,
        panelClassName,
        className,

        open: openProp,
        onOpenChange,

        id,
        describedBy,

        onClose,

        // editor passthrough
        fieldMap,
        layout,
        defaults,
        filters,
        permissions,
        callbacks,

        renderRouteLabel,
        renderField,

        viewMode,
        defaultViewMode,
        onViewModeChange,

        route,
        onRouteChange,

        // Popover trigger visuals (optional)
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

        triggerClassName,
    } = props as any;

    const editorRef = React.useRef<any>(null);

    // ---------------------------------------------------------------------
    // Wiring: standalone OR variant
    // ---------------------------------------------------------------------

    const root: JsonObject = React.useMemo(() => {
        if ("root" in props) return (props as any).root;

        const v = (props as any).value;
        if (isPlainObject(v)) return v;
        if (v == null) return {} as JsonObject;

        // avoid crashing on non-object values
        return {} as JsonObject;
    }, [props]);

    const emitRoot = React.useCallback(
        (nextRoot: JsonObject, detail?: ChangeDetail<any>) => {
            if ("onRoot" in props) {
                (props as any).onRoot?.(nextRoot, detail);
                return;
            }
            (props as any).onValue?.(nextRoot, detail);
        },
        [props],
    );

    // ---------------------------------------------------------------------
    // Popover open state (controlled or internal)
    // ---------------------------------------------------------------------

    const [openInner, setOpenInner] = React.useState(false);
    const open = openProp ?? openInner;

    const setOpen = React.useCallback(
        (next: boolean) => {
            if (openProp === undefined) setOpenInner(next);
            onOpenChange?.(next);
            if (!next) onClose?.();
        },
        [openProp, onOpenChange, onClose],
    );

    const close = React.useCallback(() => setOpen(false), [setOpen]);
    const doOpen = React.useCallback(() => setOpen(true), [setOpen]);
    const toggle = React.useCallback(() => setOpen(!open), [setOpen, open]);

    // ---------------------------------------------------------------------
    // Inline “accordion-like” expansion (MUST NOT be a hook in a branch)
    // ---------------------------------------------------------------------

    const [expanded, setExpanded] = React.useState<boolean | undefined>();
    React.useImperativeHandle(
        ref,
        () => ({
            open: doOpen,
            close,
            toggle,
            editor: editorRef,
        }),
        [doOpen, close, toggle],
    );

    // If accordion and user didn't control viewMode, force default to visual
    const resolvedDefaultViewMode =
        defaultViewMode ??
        (mode === "accordion" && viewMode === undefined ? "visual" : undefined);

    const editorNode = (
        <JsonEditor
            ref={editorRef}
            root={root}
            onRoot={emitRoot}
            fieldMap={fieldMap}
            layout={layout}
            defaults={defaults}
            filters={filters}
            permissions={permissions}
            callbacks={callbacks}
            renderRouteLabel={renderRouteLabel as any}
            renderField={renderField as any}
            title={title}
            schema={schema}
            route={route}
            onRouteChange={onRouteChange}
            viewMode={viewMode as any}
            defaultViewMode={resolvedDefaultViewMode as any}
            onViewModeChange={onViewModeChange}
            showClose={mode === "popover"}
            onClose={mode === "popover" ? close : undefined}
        />
    );

    // ---------------------------------------------------------------------
    // Inline “accordion-like” mode
    // - header must look like an input trigger (border/bg/height/focus)
    // ---------------------------------------------------------------------

    if (mode === "accordion") {
        const headerHeight = triggerHeightCls(triggerSize);
        const wrapperBox = cn(
            "border-input w-full min-w-0 rounded-md border bg-surfaces-input shadow-xs",
            "transition-[color,box-shadow] outline-none",
            "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        );

        return (
            <div className={cn("w-full", className)}>
                <div
                    className={cn(
                        wrapperBox,
                        "overflow-hidden",
                        panelClassName,
                    )}
                >
                    {/* “Trigger area” */}
                    <div
                        className={cn(
                            "flex items-center justify-between gap-3 px-3",
                            headerHeight,
                        )}
                        aria-controls={
                            id ? `${id}__json_editor_panel` : undefined
                        }
                    >
                        {typeof schema === "string" ? (
                            <div className="min-w-0 flex-1 truncate">
                                {schema}
                            </div>
                        ) : (
                            <div className="min-w-0 flex-1 truncate">
                                {title ?? "JSON Editor"}
                            </div>
                        )}

                        <Button
                            type="button"
                            size="sm"
                            variant="link"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                            aria-controls={
                                id ? `${id}__json_editor_panel` : undefined
                            }
                            aria-label={
                                expanded
                                    ? "Collapse JSON editor"
                                    : "Expand JSON editor"
                            }
                            className="h-8 w-8 p-0"
                        >
                            {expanded ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </Button>
                    </div>

                    {expanded ? (
                        <div
                            id={id ? `${id}__json_editor_panel` : undefined}
                            className="h-130 min-h-0 overflow-hidden border-t border-border/60"
                        >
                            <ScrollArea className="h-full w-full">
                                <div className="min-h-0">{editorNode}</div>
                            </ScrollArea>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }

    // ---------------------------------------------------------------------
    // Popover mode (trigger visuals + optional controls)
    // ---------------------------------------------------------------------

    const triggerDisabled =
        "disabled" in props ? !!(props as any).disabled : false;

    const resolvedLeadingIcons: React.ReactNode[] = (() => {
        if (Array.isArray(leadingIcons) && leadingIcons.length)
            return leadingIcons;
        if (icon) return [icon];
        return [<Code2 key="default" className="h-4 w-4 opacity-70" />];
    })();

    const resolvedTrailingIcons: React.ReactNode[] =
        (Array.isArray(trailingIcons) ? trailingIcons : []) ?? [];

    const baseIconGap = iconGap ?? 4;
    const leadingGap = leadingIconSpacing ?? baseIconGap;
    const trailingGap = trailingIconSpacing ?? baseIconGap;

    const hasLeadingIcons = resolvedLeadingIcons.length > 0;
    const hasTrailingIcons = resolvedTrailingIcons.length > 0;

    const hasLeadingControl = !!leadingControl;
    const hasTrailingControl = !!trailingControl;
    const hasControls = hasLeadingControl || hasTrailingControl;

    const baseBoxClasses = cn(
        "border-input w-full min-w-0 rounded-md border bg-surfaces-input hover:bg-surfaces-input shadow-xs",
        "transition-[color,box-shadow] outline-none",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    );

    const TriggerButton = (
        <Button
            type="button"
            id={id}
            aria-describedby={describedBy}
            variant={triggerVariant as any}
            size={triggerSize as any}
            disabled={triggerDisabled}
            className={cn(
                "w-full justify-between",
                baseBoxClasses,
                hasControls &&
                    joinControls &&
                    extendBoxToControls &&
                    "border-none shadow-none focus-visible:ring-0 focus-visible:outline-none",
                triggerClassName,
            )}
        >
            <div className="flex w-full items-center justify-between gap-2 min-w-0">
                <div className="flex min-w-0 items-center gap-2 grow">
                    {hasLeadingIcons && (
                        <span
                            className="flex items-center shrink-0"
                            style={{ columnGap: leadingGap }}
                            data-slot="leading-icons"
                        >
                            {resolvedLeadingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </span>
                    )}

                    <span className="min-w-0 flex-1 truncate text-left">
                        {triggerLabel}
                    </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    {typeof schema === "string" ? (
                        <span className="ml-2 max-w-[45%] truncate text-xs text-muted-foreground">
                            {schema}
                        </span>
                    ) : null}

                    {hasTrailingIcons && (
                        <span
                            className="flex items-center"
                            style={{ columnGap: trailingGap }}
                            data-slot="trailing-icons"
                        >
                            {resolvedTrailingIcons.map((node, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center justify-center"
                                >
                                    {node}
                                </span>
                            ))}
                        </span>
                    )}
                </div>
            </div>
        </Button>
    );

    const PopoverCore = (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>

            <PopoverContent
                align="end"
                sideOffset={8}
                avoidCollisions
                collisionPadding={12}
                className={cn(
                    "p-0 overflow-hidden",
                    "w-[min(980px,var(--radix-popper-available-width))] max-w-[95dvw]",
                    "h-[min(85dvh,var(--radix-popper-available-height))] max-h-[min(85dvh,var(--radix-popper-available-height))]",
                    popoverClassName,
                )}
                style={{
                    maxHeight:
                        "min(85dvh, var(--radix-popper-available-height))",
                    maxWidth: "min(95dvw, var(--radix-popper-available-width))",
                }}
            >
                <ScrollArea className="h-full w-full">
                    <div className="min-h-0">{editorNode}</div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );

    if (!hasControls) {
        return <div className={cn("w-full", className)}>{PopoverCore}</div>;
    }

    if (joinControls) {
        return (
            <div className={cn("w-full", className)}>
                <div
                    className={cn(
                        "flex items-stretch w-full",
                        extendBoxToControls
                            ? baseBoxClasses
                            : "border-none shadow-none bg-transparent",
                    )}
                    data-slot="json-editor-group"
                >
                    {hasLeadingControl && (
                        <div
                            className={cn(
                                "flex items-center px-2",
                                leadingControlClassName,
                            )}
                            data-slot="leading-control"
                        >
                            {leadingControl}
                        </div>
                    )}

                    <div
                        className="flex-1 min-w-0"
                        data-slot="json-editor-region"
                    >
                        {PopoverCore}
                    </div>

                    {hasTrailingControl && (
                        <div
                            className={cn(
                                "flex items-center px-2",
                                trailingControlClassName,
                            )}
                            data-slot="trailing-control"
                        >
                            {trailingControl}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={cn("flex items-stretch w-full", className)}>
            {hasLeadingControl && (
                <div
                    className={cn(
                        "flex items-center mr-1",
                        leadingControlClassName,
                    )}
                    data-slot="leading-control"
                >
                    {leadingControl}
                </div>
            )}

            <div className="flex-1 min-w-0" data-slot="json-editor-region">
                {PopoverCore}
            </div>

            {hasTrailingControl && (
                <div
                    className={cn(
                        "flex items-center ml-1",
                        trailingControlClassName,
                    )}
                    data-slot="trailing-control"
                >
                    {trailingControl}
                </div>
            )}
        </div>
    );
});

export default ShadcnJsonEditorVariant;
