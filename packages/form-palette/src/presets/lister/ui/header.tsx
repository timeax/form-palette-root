import { ListerRuntime } from "@/presets/lister/runtime/session";
import { ListerSessionState } from "@/presets/lister";
import { GripVertical, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/presets/ui/button";

export const Header: React.FC<{
    draggable: boolean;
    actions: ListerRuntime<any>["actions"];
    session: ListerSessionState<any, any, any, any, any>;
    id: string;
}> = ({ actions, draggable, session, id }) => {
    const title = session?.title ?? session?.kind ?? "Select";
    const showRefresh = !!(session as any)?.showRefresh;

    return (
        <div className="flex items-center justify-between gap-2 px-3 py-2">
            <div
                data-slot="lister-drag-handle"
                className={cn(
                    "flex min-w-0 items-center gap-2",
                    draggable && "cursor-grab select-none touch-none",
                )}
                onMouseDown={() => actions.focus(id)}
            >
                {draggable && (
                    <GripVertical className="h-4 w-4 shrink-0 opacity-60" />
                )}
                <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{title}</div>
                    <div className="text-xs opacity-60">
                        {session?.loading
                            ? "Loading…"
                            : session?.refreshing
                              ? "Refreshing…"
                              : " "}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1">
                {showRefresh && (
                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => actions.refresh(id)}
                        disabled={!!session?.loading || !!session?.refreshing}
                    >
                        <RefreshCw className="h-4 w-4" />
                    </Button>
                )}

                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => actions.close(id)}
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
