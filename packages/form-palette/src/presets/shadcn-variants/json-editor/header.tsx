// src/presets/shadcn-variants/json-editor/header.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/presets/ui/toggle-group";

import type { JsonEditorViewMode } from "./types";

export interface JsonEditorHeaderProps {
    /** Header title (matches screenshot: simple, no filename/sublabel) */
    title?: React.ReactNode;

    /** View toggle */
    viewMode: JsonEditorViewMode;
    onViewMode: (mode: JsonEditorViewMode) => void;

    /** Top-right actions (optional wiring) */
    onLoad?: () => void;
    onSave?: () => void;
    onExport?: () => void;

    /** Close button (top-right) */
    onClose?: () => void;

    /** Disable all interactions */
    disabled?: boolean;

    className?: string;
}

export function JsonEditorHeader(props: JsonEditorHeaderProps) {
    const {
        title = "Structured JSON Editor",
        viewMode,
        onViewMode,
        onLoad,
        onSave,
        onExport,
        onClose,
        disabled,
        className,
    } = props;

    return (
        <div
            className={cn(
                "flex w-full items-center justify-between gap-4 border-b bg-background px-4 py-3",
                className
            )}
        >
            {/* Left: title only */}
            <div className="min-w-0">
                <div className="truncate text-sm font-medium">{title}</div>
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled || !onLoad}
                    onClick={onLoad}
                >
                    Load
                </Button>

                <ToggleGroup
                    type="single"
                    value={viewMode}
                    onValueChange={(v) => {
                        if (!v) return;
                        onViewMode(v as JsonEditorViewMode);
                    }}
                    disabled={disabled}
                    className="rounded-md border bg-muted/20 p-1"
                >
                    <ToggleGroupItem value="split" className="px-3 text-xs">
                        Split
                    </ToggleGroupItem>
                    <ToggleGroupItem value="visual" className="px-3 text-xs">
                        Visual
                    </ToggleGroupItem>
                    <ToggleGroupItem value="raw" className="px-3 text-xs">
                        Raw
                    </ToggleGroupItem>
                </ToggleGroup>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled || !onSave}
                    onClick={onSave}
                >
                    Save
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={disabled || !onExport}
                    onClick={onExport}
                >
                    Export
                </Button>

                {/* Close button (no profile icon) */}
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Close"
                    disabled={disabled || !onClose}
                    onClick={onClose}
                >
                    ×
                </Button>
            </div>
        </div>
    );
}

export default JsonEditorHeader;
