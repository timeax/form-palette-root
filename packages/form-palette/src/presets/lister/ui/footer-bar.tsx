// ─────────────────────────────────────────────
// FooterBar
// ─────────────────────────────────────────────

import * as React from "react";

import type { ListerMode, ListerSessionId } from "../types";
import { useLister } from "..";

import { Button } from "@/presets/ui/button";

export function FooterBar(props: {
    id: ListerSessionId;
    mode: ListerMode;
    confirm: boolean;
    onClear(): void;
    onCancel(): void;
    onApply(): void;
}) {
    const { actions } = useLister<any>();

    const showConfirm = props.mode === "multiple" ? true : props.confirm;

    return (
        <div
            className="flex items-center justify-between gap-2 px-3 py-2"
            onMouseDown={() => actions.focus(props.id)}
        >
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={props.onClear}
            >
                Clear
            </Button>

            {showConfirm ? (
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button type="button" size="sm" onClick={props.onApply}>
                        Apply
                    </Button>
                </div>
            ) : (
                <div className="text-xs opacity-60">Click an item to apply</div>
            )}
        </div>
    );
}
