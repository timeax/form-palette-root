// src/lib/json-editor/layout.ts
import type { JsonEditorFilters, JsonWildcard } from "./types";
import { matchSegment, pickBestMatch } from "./glob";
import { filterVisibleFieldPaths } from "./filters";

export type JsonEditorLayout = Record<JsonWildcard, Array<string | string[]>>;

export type LayoutRow = {
    /** parent path that owns these children */
    parent: string;
    /** row children (absolute paths) */
    fields: string[];
    /** optional hint for UI (grid/flex), you can extend later */
    kind: "row";
};

function joinPath(parent: string, child: string) {
    if (!parent) return child;
    if (!child) return parent;
    return parent + "." + child;
}

function uniq<T>(arr: T[]) {
    return Array.from(new Set(arr));
}

function sortStable(paths: string[]) {
    return [...paths].sort((a, b) => a.localeCompare(b));
}

/**
 * Expand a token into matching children:
 * - token can be exact key ("maxRetries") or pattern ("*api*")
 * - token can be a relative dotted path ("headers.Authorization") which becomes "parent.headers.Authorization"
 */
function matchChildrenForToken(
    parent: string,
    token: string,
    remaining: string[]
): string[] {
    const absoluteToken = joinPath(parent, token);

    // If token is a dotted child-path, treat it as an exact relative reference.
    if (token.includes(".")) {
        return remaining.includes(absoluteToken) ? [absoluteToken] : [];
    }

    // Otherwise token is a relative pattern against direct child keys
    const matches: string[] = [];
    const prefix = parent ? parent + "." : "";

    for (const p of remaining) {
        if (!p.startsWith(prefix)) continue;

        const rest = parent ? p.slice(prefix.length) : p;
        if (!rest || rest.includes(".")) continue; // not a direct child

        if (matchSegment(token, rest)) matches.push(p);
    }

    return sortStable(matches);
}

/**
 * Resolve a parent layout into ordered rows.
 *
 * Rules:
 * - layout[parentPattern] -> best match wins
 * - string token expands to ALL matching children (as separate rows)
 * - string[] row expands each token; if token matches multiple, it expands into multiple columns
 * - after processing layout rules, remaining children are auto-flowed (one per row)
 */
export function resolveLayoutForParent(opts: {
    parent: string; // e.g. "config"
    childPaths: string[]; // absolute paths of DIRECT children (recommended)
    layout?: JsonEditorLayout;
    filters?: JsonEditorFilters;
}): LayoutRow[] {
    const { parent, layout, filters } = opts;

    // visible children (field semantics)
    let remaining = filterVisibleFieldPaths(opts.childPaths, filters);
    remaining = sortStable(remaining);

    const rules = layout
        ? (Object.entries(layout) as Array<[string, Array<string | string[]>]>)
        : [];

    const spec = rules.length ? pickBestMatch(parent, rules) : undefined;

    const rows: LayoutRow[] = [];

    const take = (paths: string[]) => {
        const taken = new Set(paths);
        remaining = remaining.filter((p) => !taken.has(p));
    };

    if (spec?.length) {
        for (const entry of spec) {
            // 1) "key" => expands to matches; each match becomes its own row
            if (typeof entry === "string") {
                const matches = matchChildrenForToken(parent, entry, remaining);
                if (!matches.length) continue;

                for (const m of matches) {
                    rows.push({ parent, kind: "row", fields: [m] });
                }
                take(matches);
                continue;
            }

            // 2) ["a", "b"] => one row; each token can expand
            if (Array.isArray(entry)) {
                const cols: string[] = [];

                for (const token of entry) {
                    const matches = matchChildrenForToken(
                        parent,
                        token,
                        remaining
                    );
                    if (!matches.length) continue;
                    cols.push(...matches);
                }

                const uniqCols = uniq(cols);
                if (!uniqCols.length) continue;

                rows.push({ parent, kind: "row", fields: uniqCols });
                take(uniqCols);
            }
        }
    }

    // Auto-flow the rest (preserve sorted order)
    for (const p of remaining) {
        rows.push({ parent, kind: "row", fields: [p] });
    }

    return rows;
}
