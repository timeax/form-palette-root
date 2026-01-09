// resources/js/context/lister/lister-ui.tsx

import * as React from "react";
import { createPortal } from "react-dom";
import Draggable, {
    type DraggableData,
    type DraggableEvent,
} from "react-draggable";

import type { ListerMode, ListerSessionId, ListerStoreState } from "./types";
import { useLister } from ".";

import { Separator } from "@/presets/ui/separator";
import { cn } from "@/lib/utils";

import { SearchBar } from "./ui/search";
import { FooterBar } from "@/presets/lister/ui/footer-bar";
import { OptionList } from "@/presets/lister/ui/option-list";
import { Header } from "@/presets/lister/ui/header";

type AnyPresetMap = any;

// ─────────────────────────────────────────────
// Position helpers (UI-only)
// ─────────────────────────────────────────────

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function computeDefaultPos(idx: number) {
    const pad = 8;
    const margin = 24;

    const approxW = 420; // w-105
    const approxH = 560;

    const maxX = Math.max(pad, window.innerWidth - approxW - pad);
    const maxY = Math.max(pad, window.innerHeight - approxH - pad);

    const x = clamp(window.innerWidth - margin - approxW, pad, maxX);
    const y = clamp(
        window.innerHeight - margin - approxH - idx * 12,
        pad,
        maxY,
    );

    return { x, y };
}

function usePortalRoot(id = "__timeax_lister_ui__") {
    const [el, setEl] = React.useState<HTMLElement | null>(null);

    React.useEffect(() => {
        if (typeof document === "undefined") return;

        const existing = document.getElementById(id);
        const node = existing ?? document.createElement("div");
        if (!existing) {
            node.id = id;
            document.body.appendChild(node);
        }

        setEl(node);

        return () => {
            // Only remove if we created it
            if (!existing && node.parentNode) node.parentNode.removeChild(node);
        };
    }, [id]);

    return el;
}

// ─────────────────────────────────────────────
// UI overlay (PORTALED to document.body)
// ─────────────────────────────────────────────

export function ListerUI() {
    const { state } = useLister<AnyPresetMap>();

    // ✅ Hook must be before conditional returns
    const positionsRef = React.useRef(
        new Map<ListerSessionId, { x: number; y: number }>(),
    );

    const portalRoot = usePortalRoot();
    if (!portalRoot) return null;

    if (!state.order.length) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 pointer-events-none">
            {/* bounds parent */}
            <div className="relative h-full w-full">
                {state.order.map((id) => (
                    <ListerSessionPanel
                        key={String(id)}
                        id={id}
                        positionsRef={positionsRef}
                    />
                ))}
            </div>
        </div>,
        portalRoot,
    );
}

function ListerSessionPanel(props: {
    id: ListerSessionId;
    positionsRef: React.MutableRefObject<
        Map<ListerSessionId, { x: number; y: number }>
    >;
}) {
    const { id, positionsRef } = props;
    const { state, actions } = useLister<AnyPresetMap>();

    const session = (state.sessions as any)[id] as any;
    const isOpen = !!session?.isOpen;

    const idx = Math.max(0, state.order.indexOf(id));
    const isActive = state.activeId === id;

    // ✅ draggable defaults true
    const draggable: boolean = session?.draggable !== false;

    // ✅ nodeRef MUST be attached to the Draggable CHILD element
    const nodeRef = React.useRef<HTMLDivElement>(null);

    // ✅ compute defaultPosition ONCE per mount (no ref-mutation-in-render bug)
    const [defaultPos] = React.useState<{ x: number; y: number }>(() => {
        const saved = positionsRef.current.get(id);
        if (saved) return saved;

        const p = session?.position;

        return p && typeof p.x === "number" && typeof p.y === "number"
            ? { x: p.x, y: p.y }
            : computeDefaultPos(idx);
    });

    // ✅ ensure store has an entry (so non-draggable uses it too)
    React.useEffect(() => {
        if (!positionsRef.current.has(id)) {
            positionsRef.current.set(id, defaultPos);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    // keep stacking stable; bump active
    const zIndex = 1000 + idx + (isActive ? 1000 : 0);

    const panelClass = cn(
        "pointer-events-auto",
        "bg-popover text-popover-foreground border shadow-md rounded-lg",
        "w-105 max-w-[calc(100vw-16px)]",
        // ✅ IMPORTANT: give the panel a definite height
        "h-[min(560px,calc(100vh-100px))]",
        "overflow-hidden flex flex-col",
        isActive && "ring-2 ring-primary/30",
    );
    // ✅ Persist ONLY on stop (smooth drag)
    const onStop = (_e: DraggableEvent, data: DraggableData) => {
        positionsRef.current.set(id, { x: data.x, y: data.y });
    };

    // ✅ return null after hooks
    if (!isOpen) return null;

    const PanelBody = (
        <>
            <Header
                draggable={draggable}
                actions={actions}
                session={session}
                id={String(id)}
            />

            <Separator />

            <div className="shrink-0">
                <SearchBar
                    id={id}
                    store={state as unknown as ListerStoreState}
                />
            </div>

            <Separator />

            {/* ✅ overflow fix: min-h-0 + flex-1 + overflow-hidden on parent */}
            <div className="min-h-0 flex-1 overflow-hidden flex flex-col">
                <OptionList id={id} className="h-full" />
            </div>

            <Separator />

            <div className="shrink-0">
                <FooterBar
                    id={id}
                    mode={session?.mode as ListerMode}
                    confirm={!!session?.confirm}
                    onClear={() => actions.clear(id)}
                    onCancel={() => actions.cancel(id)}
                    onApply={() => actions.apply(id)}
                />
            </div>
        </>
    );

    // Non-draggable: render at stored position (absolute)
    if (!draggable) {
        const p = positionsRef.current.get(id) ?? defaultPos;

        return (
            <div
                className="absolute"
                style={{ left: p.x, top: p.y, zIndex }}
                onMouseDown={() => actions.focus(id)}
            >
                <div className={panelClass} style={{ zIndex }}>
                    {PanelBody}
                </div>
            </div>
        );
    }

    // Draggable: uncontrolled (smooth)
    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            handle='[data-slot="lister-drag-handle"]'
            defaultPosition={defaultPos}
            onStart={(e) => {
                // ignore right-click / non-primary
                // @ts-expect-error - react-draggable uses MouseEvent/TouchEvent union
                if (e?.button != null && e.button !== 0) return false;
                actions.focus(id);
            }}
            onStop={onStop}
        >
            {/* ✅ nodeRef is HERE (Draggable child) */}
            <div
                ref={nodeRef}
                className={cn("absolute left-0 top-0", panelClass)}
                style={{ zIndex }}
                onMouseDown={() => actions.focus(id)}
            >
                {PanelBody}
            </div>
        </Draggable>
    );
}
