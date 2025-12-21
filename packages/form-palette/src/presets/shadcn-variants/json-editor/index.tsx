// src/presets/shadcn-variants/json-editor/index.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { ScrollArea } from "@/presets/ui/scroll-area";

import { Code2 } from "lucide-react";

import type { ChangeDetail } from "@/variants/shared";
import type { JsonObject } from "@/lib/json-editor/utils";

import type {
    JsonEditorIndexHandle,
    JsonEditorTriggerSize,
    JsonEditorTriggerVariant,
    ShadcnJsonEditorProps,
} from "./types";

import JsonEditorEditor from "./editor";

function isPlainObject(v: unknown): v is JsonObject {
    return typeof v === "object" && v !== null && !Array.isArray(v);
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
        triggerSize = "sm" as JsonEditorTriggerSize,

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
    } = props;

    const editorRef = React.useRef<any>(null);

    // ---------------------------------------------------------------------
    // Wiring: standalone OR variant
    // ---------------------------------------------------------------------

    const root: JsonObject = React.useMemo(() => {
        if ("root" in props) return props.root;

        const v = props.value;
        if (isPlainObject(v)) return v;
        if (v == null) return {} as JsonObject;

        // avoid crashing on non-object values
        return {} as JsonObject;
    }, [props]);

    const emitRoot = React.useCallback(
        (nextRoot: JsonObject, detail?: ChangeDetail<any>) => {
            if ("onRoot" in props) {
                props.onRoot?.(nextRoot, detail);
                return;
            }
            props.onValue?.(nextRoot, detail);
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

    const [expanded, setExpanded] = React.useState(true);

    React.useEffect(() => {
        if (mode === "accordion") setExpanded(true);
    }, [mode]);

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
        <JsonEditorEditor
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
    // ---------------------------------------------------------------------

    if (mode === "accordion") {
        return (
            <div className={cn("w-full", className)}>
                <div
                    className={cn(
                        "rounded-md border overflow-hidden",
                        panelClassName,
                    )}
                >
                    <div className="flex items-center justify-between gap-3 px-3 py-2">
                        {typeof schema === "string" ? (
                            <div className="min-w-0 flex-1 truncate text-sm">
                                {schema}
                            </div>
                        ) : (
                            <div className="min-w-0 flex-1 truncate text-sm">
                                {title ?? "JSON Editor"}
                            </div>
                        )}

                        <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => setExpanded((v) => !v)}
                            aria-expanded={expanded}
                            aria-controls={
                                id ? `${id}__json_editor_panel` : undefined
                            }
                        >
                            {expanded ? "Hide" : "Show"}
                        </Button>
                    </div>

                    {expanded ? (
                        <div
                            id={id ? `${id}__json_editor_panel` : undefined}
                            className="h-130 min-h-0 overflow-hidden"
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
    // Popover mode
    // ---------------------------------------------------------------------

    const triggerDisabled =
        "disabled" in props ? !!(props as any).disabled : false;

    return (
        <div className={cn("w-full", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        id={id}
                        aria-describedby={describedBy}
                        variant={triggerVariant as any}
                        size={triggerSize as any}
                        disabled={triggerDisabled}
                        className="w-full justify-between"
                    >
                        <span className="flex min-w-0 flex-1 items-center gap-2 truncate text-left">
                            <Code2 className="h-4 w-4 opacity-70" />
                            <span className="truncate">{triggerLabel}</span>
                        </span>

                        {typeof schema === "string" ? (
                            <span className="ml-2 max-w-[45%] truncate text-xs text-muted-foreground">
                                {schema}
                            </span>
                        ) : null}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    align="end"
                    sideOffset={8}
                    avoidCollisions
                    collisionPadding={12}
                    className={cn(
                        "p-0 overflow-hidden",
                        // Clamp to real available space Radix calculates
                        "w-[min(980px,var(--radix-popper-available-width))] max-w-[95dvw]",
                        "h-[min(85dvh,var(--radix-popper-available-height))] max-h-[min(85dvh,var(--radix-popper-available-height))]",
                        popoverClassName,
                    )}
                    style={{
                        maxHeight:
                            "min(85dvh, var(--radix-popper-available-height))",
                        maxWidth:
                            "min(95dvw, var(--radix-popper-available-width))",
                    }}
                >
                    <ScrollArea className="h-full w-full">
                        <div className="min-h-0">{editorNode}</div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
});

export default ShadcnJsonEditorVariant;
