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

                // ✅ IMPORTANT: give the panel a REAL height, not only max-height
                "h-[min(520px,var(--radix-popover-content-available-height))]",

                // ✅ real fallback min-height (don’t depend on trigger-height var)
                "min-h-80",

                className,
            )}
        >
            <div className="shrink-0">
                <SearchBar id={id} store={store} />
            </div>

            <Separator />

            {/* ✅ this now has a real height because parent has real height */}
            <div className="min-h-0 flex-1 overflow-hidden flex flex-col relative">
                <OptionList id={id} className="h-full absolute left-0 w-full top-0" />
            </div>

            <Separator />

            <div className="shrink-0">
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
