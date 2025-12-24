// resources/js/context/lister/engine/selection.ts

import type { ListerChangeEvent, ListerId, ListerMode, ListerValueForMode } from '../types';

export function makeChangeEvent(): ListerChangeEvent {
    let prevented = false;
    return {
        get defaultPrevented() {
            return prevented;
        },
        preventDefault() {
            prevented = true;
        },
    };
}

export function computeNextDraft<TValue extends ListerId, TMode extends ListerMode>(
    mode: TMode,
    draftValue: ListerValueForMode<TValue, TMode>,
    clicked: TValue,
): { nextDraft: ListerValueForMode<TValue, TMode>; action: 'select' | 'deselect' } {
    if (mode === 'multiple') {
        const arr = (draftValue as TValue[]) ?? [];
        const has = arr.includes(clicked);
        const next = has ? arr.filter((v) => v !== clicked) : [...arr, clicked];
        return { nextDraft: next as any, action: has ? 'deselect' : 'select' };
    }

    const cur = draftValue as TValue | null;
    if (cur === clicked) return { nextDraft: null as any, action: 'deselect' }; // ✅ toggle off
    return { nextDraft: clicked as any, action: 'select' };
}
