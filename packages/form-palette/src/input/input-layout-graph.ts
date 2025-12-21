// src/input/input-layout-graph.ts

import * as React from "react";

import type {
    FieldLayoutConfig,
    FieldOrdering,
    FieldRootId,
    FieldSlotId,
    RelativeRootsMap,
    SlotPlacement,
} from "@/schema/input-field";

/**
 * Helper slots are all non-root slots:
 * - sublabel
 * - description
 * - helpText
 * - errorText
 */
export type HelperSlotId = Exclude<FieldSlotId, FieldRootId>;

export interface HelperSlot {
    id: HelperSlotId;
    root: FieldRootId;
    placement: SlotPlacement;
    content: React.ReactNode;
}

/**
 * Accessor for a (root, placement) group.
 *
 * - `slots()` gives you the concrete HelperSlot[] (possibly empty).
 * - `render(fn)` calls `fn(slots)` only if there are slots,
 *   otherwise returns null (so React renders nothing).
 */
export interface SlotAccessor {
    root: FieldRootId;
    placement: SlotPlacement;

    /**
     * Concrete list of slots for this root + placement.
     * May be an empty array.
     */
    slots(): HelperSlot[];

    /**
     * Render this group.
     *
     * If no slots are present, returns null so nothing is rendered.
     *
     * Example:
     *   graph
     *     .getSlotsFor("input", "below")
     *     .render((slots) =>
     *       slots.map((slot) =>
     *         renderHelperSlot("input", slot, classes)
     *       )
     *     );
     */
    render(renderFn: (slots: HelperSlot[]) => React.ReactNode): React.ReactNode;
}

/**
 * Layout graph for helpers.
 */
export interface LayoutGraph {
    helperSlots: HelperSlot[];

    /**
     * Get a slot accessor for a given root + placement.
     */
    getSlotsFor(root: FieldRootId, placement: SlotPlacement): SlotAccessor;
}

/**
 * Default root attachment for helpers when layout.relativeRoots
 * does not specify anything.
 */
const defaultRelativeRoots: RelativeRootsMap = {
    sublabel: "label",
    description: "input",
    helpText: "input",
    errorText: "input",
};

/**
 * Default relative ordering per root when layout.ordering
 * is not provided.
 *
 * Only governs *priority* when multiple helpers share the same
 * root + placement. It does not decide the placement itself.
 */
const defaultOrdering: FieldOrdering = {
    label: ["sublabel"],
    input: ["errorText", "description", "helpText"],
};

function defaultPlacementFor(id: HelperSlotId): SlotPlacement {
    if (id === "sublabel") {
        // Typical: small label text to the right of the main label
        return "right";
    }

    if (id == "tags") return "right";
    // For description/help/error, "below" the root is the usual default
    return "below";
}

interface BuildLayoutGraphArgs {
    layout: FieldLayoutConfig;
    /**
     * Raw contents for each helper slot.
     * Undefined/null means "no slot".
     */
    sublabel?: React.ReactNode;
    description?: React.ReactNode;
    helpText?: React.ReactNode;
    errorText?: React.ReactNode;
    tags?: React.ReactNode;
}

/**
 * Build a layout graph for helper slots given:
 * - the effective layout (after variant defaults + overrides)
 * - the actual content for each slot
 */
export function buildLayoutGraph(args: BuildLayoutGraphArgs): LayoutGraph {
    const { layout, sublabel, description, helpText, errorText, tags } = args;

    const relativeRoots: RelativeRootsMap = {
        ...defaultRelativeRoots,
        ...(layout.relativeRoots ?? {}),
    };

    const ordering: FieldOrdering = {
        ...defaultOrdering,
        ...(layout.ordering ?? {}),
    };

    const helperSlots: HelperSlot[] = [];

    const pushSlot = (
        id: HelperSlotId,
        content: React.ReactNode | undefined,
        placement: SlotPlacement | undefined,
    ) => {
        if (content === undefined || content === null) return;

        const root: FieldRootId =
            relativeRoots[id] ?? ((id === "sublabel" || id == 'tags') ? "label" : "input");

        const effectivePlacement: SlotPlacement =
            placement ?? defaultPlacementFor(id);

        if (effectivePlacement === "hidden") return;

        helperSlots.push({
            id,
            root,
            placement: effectivePlacement,
            content,
        });
    };

    pushSlot("sublabel", sublabel, layout.sublabelPlacement);
    pushSlot("description", description, layout.descriptionPlacement);
    pushSlot("helpText", helpText, layout.helpTextPlacement);
    pushSlot("errorText", errorText, layout.errorTextPlacement);
    pushSlot("tags", tags, layout.tagPlacement);

    function makeAccessor(
        root: FieldRootId,
        placement: SlotPlacement,
    ): SlotAccessor {
        // cache per accessor so multiple .slots()/.render() calls
        // don't keep re-filtering
        let cache: HelperSlot[] | null = null;

        const compute = (): HelperSlot[] => {
            if (cache) return cache;

            const base = helperSlots.filter(
                (s) => s.root === root && s.placement === placement,
            );

            const order = ordering[root] ?? [];
            if (!order.length) {
                cache = base;
                return cache;
            }

            cache = [...base].sort((a, b) => {
                const ai = order.indexOf(a.id);
                const bi = order.indexOf(b.id);

                const aRank = ai === -1 ? Number.POSITIVE_INFINITY : ai;
                const bRank = bi === -1 ? Number.POSITIVE_INFINITY : bi;

                return aRank - bRank;
            });

            return cache;
        };

        return {
            root,
            placement,
            slots: () => compute(),
            render(renderFn) {
                const slots = compute();
                if (!slots.length) return null; // nothing rendered
                return renderFn(slots);
            },
        };
    }

    return {
        helperSlots,
        getSlotsFor(root, placement) {
            return makeAccessor(root, placement);
        },
    };
}
