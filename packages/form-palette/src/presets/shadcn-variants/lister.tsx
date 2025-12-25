/* ─────────────────────────────────────────────────────────────
 * Public component
 * ───────────────────────────────────────────────────────────── */

import { ListerId, PresetMap } from "@/presets/lister/types";
import { ListerVariantProps } from "@/presets/shadcn-variants/lister/types";
import { ListerProvider } from "@/presets/lister";
import { defaultHost } from "@/presets/shadcn-variants/lister/utils";
import ListerResolvedInner from "@/presets/shadcn-variants/lister/index";

export default function ListerVariant<
    TMode extends "single" | "multiple",
    P extends PresetMap = PresetMap,
    TRaw extends Record<string, any> = any,
    TValue extends ListerId = any,
    TFilters extends Record<string, any> = any,
    TMeta = any,
>(props: ListerVariantProps<TMode, P, TRaw, TValue, TFilters, TMeta>) {
    const { host, presets, remoteDebounceMs, ...rest } = props;
    return (
        <ListerProvider
            host={host ?? defaultHost}
            presets={presets}
            remoteDebounceMs={remoteDebounceMs}
        >
            <ListerResolvedInner {...(rest as any)} />
        </ListerProvider>
    );
}
