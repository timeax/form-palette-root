/* ────────────────────────────────────────────────────────────── */
/* Public Hook                                                     */
/* ────────────────────────────────────────────────────────────── */

import { useListerContext } from "@/presets/lister";

export function useLister(ownerKey?: ListerOwnerKey) {
    const ctx = useListerContext();

    const id = React.useMemo(() => {
        const key = ownerKey ?? stableId("lister_owner");
        const existing = ctx.findSessionIdByOwnerKey(key);
        return existing ?? ctx.createSession(key);
    }, [ctx, ownerKey]);

    const state = React.useSyncExternalStore(
        ctx.store.subscribe,
        () => ctx.getSession(id) ?? ({} as any),
        () => ctx.getSession(id) ?? ({} as any),
    );

    const visibleOptionsList = React.useMemo(() => {
        return state
            ? (state as any).definition
                ? (state as any).searchMode === "local" ||
                  (state as any).searchMode === "hybrid"
                    ? (state as any).optionsList
                    : (state as any).optionsList
                : []
            : [];
    }, [state]);

    const api = React.useMemo(
        () => ({
            id,
            state,
            visibleOptionsList,
            open: ctx.open,
            refresh: ctx.refresh,
            setFilters: ctx.setFilters,
            clearFilters: ctx.clearFilters,
            setSort: ctx.setSort,
            setSearchMode: ctx.setSearchMode,
            setSearchTarget: ctx.setSearchTarget,
            searchLocal: ctx.searchLocal,
            searchRemote: ctx.searchRemote,
            select: ctx.select,
            selectMany: ctx.selectMany,
            draftUpdate: ctx.draftUpdate,
            draftUpdateAll: ctx.draftUpdateAll,
            draftReset: ctx.draftReset,
            resolve: (value: any) => ctx.resolveAndDispose(id, value),
            dispose: () => ctx.disposeSession(id),
        }),
        [ctx, id, state, visibleOptionsList],
    );

    return api as any;
}
