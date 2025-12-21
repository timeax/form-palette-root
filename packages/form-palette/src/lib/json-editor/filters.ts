// src/lib/json-editor/filters.ts
import type { JsonEditorFilters, JsonPath } from "./types";
import { lastSegment, matchPath } from "./glob";

/* ─────────────────────────────────────────────────────────────
 * Routes
 * ───────────────────────────────────────────────────────────── */

/**
 * Route visibility:
 * - includeRoutes (if set) acts as allow-list
 * - excludeRoutes always remove
 * - if excludeRouteSubtree=true: excluding "config" also excludes "config.**"
 */
export function isRouteAllowed(
    path: JsonPath,
    filters?: JsonEditorFilters
): boolean {
    if (!filters) return true;

    const excludeSubtree = filters.excludeRouteSubtree ?? true;

    if (filters.includeRoutes && filters.includeRoutes.length) {
        const ok = filters.includeRoutes.some((p) => matchPath(p, path));
        if (!ok) return false;
    }

    if (filters.excludeRoutes && filters.excludeRoutes.length) {
        for (const p of filters.excludeRoutes) {
            if (!p) continue;

            // direct match (wildcards + leaf-aware matching)
            if (matchPath(p, path)) return false;

            if (!excludeSubtree) continue;

            // subtree match for exact path prefixes (best effort)
            // (we only do this for exact-ish patterns without glob chars)
            const isExact =
                !p.includes("*") && p !== "." && p !== "/" && p.trim() !== "";
            if (!isExact) continue;

            // If p is a leaf-only pattern (no dots), don't treat it as a subtree prefix unless it
            // actually matches a real ancestor prefix of the route.
            const leaf = lastSegment(path);
            if (!p.includes(".") && p === leaf) continue;

            if (path === p) return false;
            if (path.startsWith(p + ".")) return false;
        }
    }

    return true;
}

/* ─────────────────────────────────────────────────────────────
 * Fields
 * ───────────────────────────────────────────────────────────── */

/**
 * Field visibility:
 * - includeFields (if set) acts as allow-list
 * - excludeFields always remove
 *
 * NOTE: field patterns use the same leaf-aware matcher:
 * - "token" (no dots) matches leaf key only
 * - "config.*token*" matches full path
 */
export function isFieldAllowed(
    fieldPath: JsonPath,
    filters?: JsonEditorFilters
): boolean {
    if (!filters) return true;

    if (filters.includeFields && filters.includeFields.length) {
        const ok = filters.includeFields.some((p) => matchPath(p, fieldPath));
        if (!ok) return false;
    }

    if (filters.excludeFields && filters.excludeFields.length) {
        const hit = filters.excludeFields.some((p) => matchPath(p, fieldPath));
        if (hit) return false;
    }

    return true;
}

/* ─────────────────────────────────────────────────────────────
 * Bulk helpers
 * ───────────────────────────────────────────────────────────── */

export function filterVisibleRoutes<T extends { path: JsonPath }>(
    nodes: T[],
    filters?: JsonEditorFilters
): T[] {
    return nodes.filter((n) => isRouteAllowed(n.path, filters));
}

export function filterVisibleFieldPaths(
    fieldPaths: JsonPath[],
    filters?: JsonEditorFilters
): JsonPath[] {
    return fieldPaths.filter((p) => isFieldAllowed(p, filters));
}

/**
 * Convenience for code that still uses a generic "paths" list.
 * By default, this uses field filtering semantics (because most callers are rendering fields).
 */
export function filterVisiblePaths(
    paths: JsonPath[],
    filters?: JsonEditorFilters,
    kind: "field" | "route" = "field"
): JsonPath[] {
    return kind === "route"
        ? paths.filter((p) => isRouteAllowed(p, filters))
        : paths.filter((p) => isFieldAllowed(p, filters));
}
