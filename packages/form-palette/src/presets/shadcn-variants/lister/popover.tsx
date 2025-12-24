import type { ListerMode, ListerSessionId, ListerStoreState } from "@/presets/lister/types";
import { useLister } from "@/presets/lister";
import { cn } from "@/lib/utils";
import { FooterBar, OptionList, SearchBar } from "@/presets/lister/lister-ui";
import { Separator } from "@/presets/ui/separator";
import * as React from "react";

export function ListerPopoverPanel(props: {
    className?: string;
    id: ListerSessionId;
    store: ListerStoreState;
    mode: ListerMode;
    confirm: boolean;
}) {
    const { className, id, store, mode, confirm } = props;

    const { actions } = useLister<any>();

    return (
        <div
            className={cn(
                "flex flex-col overflow-hidden",

                // ✅ width: match trigger width (Radix popover var)
                "w-(--radix-popover-trigger-width)",

                // ✅ height: scale from trigger height, but keep sane bounds
                // (pick one: fixed max, or available-height aware)
                "min-h-[calc(var(--radix-popover-trigger-height)*8)]",
                "max-h-[min(520px,var(--radix-popover-content-available-height))]",

                className,
            )}
        >
            <div className="">
                <SearchBar id={id} store={store} />
            </div>

            <Separator />

            <div className="min-h-0 flex-1 relative overflow-y-auto">
                <OptionList id={id} className="h-full max-h-full" />
            </div>

            <Separator />

            <div className="">
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
