// resources/js/presets/shadcn-variants/lister/popover.tsx

import type { ListerMode, ListerSessionId } from "@/presets/lister/types";
import { useLister } from "@/presets/lister";
import { cn } from "@/lib/utils";
import { Separator } from "@/presets/ui/separator";
import * as React from "react";
import { SearchBar } from "@/presets/lister/ui/search";
import { OptionList } from "@/presets/lister/ui/option-list";
import { FooterBar } from "@/presets/lister/ui/footer-bar";

export function ListerPopoverPanel(props: {
    className?: string;
    id: ListerSessionId;
    mode: ListerMode;
    confirm: boolean;
}) {
    const { className, id, mode, confirm } = props;

    const { actions, store } = useLister<any>() as any;

    return (
        <div
            className={cn(
                "flex flex-col overflow-hidden",
                "w-(--radix-popover-trigger-width)",
                "min-h-[calc(var(--radix-popover-trigger-height)*8)]",
                "max-h-[min(520px,var(--radix-popover-content-available-height))]",
                className,
            )}
        >
            <div>
                <SearchBar id={id} store={store} />
            </div>

            <Separator />

            <div className="min-h-0 flex-1 relative overflow-y-auto">
                <OptionList id={id} className="h-full max-h-full" />
            </div>

            <Separator />

            <div>
                <FooterBar
                    id={id}
                    mode={mode}
                    confirm={confirm}
                    onClear={() => actions.clear(id)}
                    onCancel={() => actions.cancel(id)}
                    onApply={() => actions.apply(id)}
                />
            </div>
        </div>
    );
}
