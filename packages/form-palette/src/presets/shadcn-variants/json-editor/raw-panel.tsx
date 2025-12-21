// src/presets/shadcn-variants/json-editor/raw-panel.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Badge } from "@/presets/ui/badge";
import { Separator } from "@/presets/ui/separator";
import { ScrollArea } from "@/presets/ui/scroll-area";

import { JsonEditor } from "json-edit-react";

import type { ChangeDetail } from "@/variants/shared";
import type { JsonObject } from "@/lib/json-editor/utils";
import type { JsonEditorPermissions } from "./types";

export interface JsonEditorRawPanelProps {
    root: JsonObject;
    onRoot: (nextRoot: JsonObject, detail?: ChangeDetail<any>) => void;

    permissions?: JsonEditorPermissions;

    disabled?: boolean;
    readOnly?: boolean;

    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
}

function isPlainObject(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function JsonEditorRawPanel(props: JsonEditorRawPanelProps) {
    const {
        root,
        onRoot,
        permissions,
        disabled,
        readOnly,
        className,
        headerClassName,
        bodyClassName,
    } = props;

    const canViewRaw = permissions?.canViewRaw ?? true;
    const canEditRaw = permissions?.canEditRaw ?? false;

    if (!canViewRaw) return null;

    const viewOnly = !!disabled || !!readOnly || !canEditRaw;

    const onCopy = React.useCallback(async () => {
        try {
            await navigator.clipboard.writeText(
                JSON.stringify(root ?? {}, null, 2)
            );
        } catch {
            // ignore clipboard failures silently
        }
    }, [root]);

    return (
        <div
            className={cn(
                // Sidebar panel look (not a rounded "card")
                "flex min-h-0 flex-col border-r bg-background",
                className
            )}
        >
            {/* Panel header (matches screenshot style) */}
            <div
                className={cn(
                    "flex items-center justify-between gap-2 px-4 py-3",
                    headerClassName
                )}
            >
                <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                        Source code
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {viewOnly ? (
                        <Badge variant="secondary" className="h-6">
                            Read only
                        </Badge>
                    ) : null}

                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onCopy}
                        disabled={!root}
                    >
                        Copy
                    </Button>
                </div>
            </div>

            <Separator />

            {/* Scrollable editor body */}
            <ScrollArea className={cn("min-h-0 flex-1", bodyClassName)}>
                <div className="p-3">
                    <JsonEditor
                        data={root ?? {}}
                        setData={(next) => {
                            // Root must remain an object for this variant.
                            if (!isPlainObject(next)) return;
                            onRoot(next as JsonObject);
                        }}
                        viewOnly={viewOnly}
                    />
                </div>
            </ScrollArea>
        </div>
    );
}

export default JsonEditorRawPanel;
