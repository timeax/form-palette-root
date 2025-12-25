import {
    AnyDef,
    AnyState,
    Ctx,
    ListerApi,
    ListerFilterCtx,
    ListerId,
    ListerSearchMode,
    ListerSearchPayload,
    ListerSearchTarget,
    ListerSessionId,
    ListerStoreState,
    PresetMap,
} from "@/presets/lister";
import * as React from "react";

export function useLister<P extends PresetMap>(): {
    api: ListerApi<P>;
    store: ListerStoreState;
    /** active session convenience (can be undefined if none open) */
    state: AnyState | undefined;
    actions: {
        focus(id: ListerSessionId): void;
        dispose(id: ListerSessionId): void;

        apply(id: ListerSessionId): void;
        cancel(id: ListerSessionId): void;
        close(id: ListerSessionId): void;

        toggle(id: ListerSessionId, value: ListerId): void;
        select(id: ListerSessionId, value: ListerId): void;
        deselect(id: ListerSessionId, value: ListerId): void;
        clear(id: ListerSessionId): void;

        setQuery(id: ListerSessionId, q: string): void;
        setSearchMode(id: ListerSessionId, mode: ListerSearchMode): void;
        setSearchTarget(id: ListerSessionId, target: ListerSearchTarget): void;

        searchLocal: {
            (id: ListerSessionId, q: string): void;
            (
                id: ListerSessionId,
                q: string,
                payload?: ListerSearchPayload,
            ): void;
        };

        searchRemote: {
            (id: ListerSessionId, q: string): void;
            (
                id: ListerSessionId,
                q: string,
                payload?: ListerSearchPayload,
            ): void;
        };

        refresh(id: ListerSessionId): void;
        setPosition(
            id: ListerSessionId,
            pos: { x: number; y: number } | null,
        ): void;

        /** Filters (non-UI logic) */
        getFilterCtx<TFilters>(id: ListerSessionId): ListerFilterCtx<TFilters>;
        applyFilterOption(id: ListerSessionId, optionId: string | number): void;

        registerPreset(kind: string, def: AnyDef): void;
        getPreset(kind: string): AnyDef | undefined;

        getVisibleOptions(id: ListerSessionId): any[];
    };
} {
    const ctx = React.useContext(Ctx);
    if (!ctx)
        throw new Error("useLister must be used within <ListerProvider />");

    const api = React.useMemo(() => {
        const fetch = ((kindOrDef: any, filters?: any, opts?: any) =>
            ctx.apiFetchAny(kindOrDef, filters, opts)) as ListerApi<P>["fetch"];
        const open = ((kindOrDef: any, filters?: any, opts?: any) =>
            ctx.apiOpenAny(kindOrDef, filters, opts)) as ListerApi<P>["open"];

        return {
            fetch,
            open,
            registerPreset: (kind: string, def: AnyDef) =>
                ctx.registerPreset(kind, def),
            getPreset: (kind: string) => ctx.getPreset(kind),
        } satisfies ListerApi<P>;
    }, [ctx]);

    const active = ctx.store.activeId
        ? (ctx.store.sessions[ctx.store.activeId] as AnyState | undefined)
        : undefined;

    return {
        api,
        store: ctx.store,
        state: active,
        actions: {
            focus: ctx.focus,
            dispose: ctx.dispose,

            apply: ctx.apply,
            cancel: ctx.cancel,
            close: ctx.close,

            toggle: ctx.toggle,
            select: ctx.select,
            deselect: ctx.deselect,
            clear: ctx.clear,

            setQuery: ctx.setQuery,
            setSearchMode: ctx.setSearchMode,
            setSearchTarget: ctx.setSearchTarget,

            searchLocal: ctx.searchLocal,
            searchRemote: ctx.searchRemote,

            refresh: ctx.refresh,
            setPosition: ctx.setPosition,

            getFilterCtx: ctx.getFilterCtx,
            applyFilterOption: ctx.applyFilterOption,

            registerPreset: ctx.registerPreset,
            getPreset: ctx.getPreset,

            getVisibleOptions: ctx.getVisibleOptions,
        },
    };
}
