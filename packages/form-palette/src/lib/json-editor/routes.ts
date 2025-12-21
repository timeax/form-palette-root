// src/lib/json-editor/routes.ts
import type * as React from "react";
import type {
    JsonEditorFilters,
    JsonEditorNavOptions,
    JsonObject,
    JsonPath,
    JsonRouteNode,
} from "./types";
import { lastSegment, pickBest } from "./glob";
import { isRouteAllowed } from "./filters";

function isObjectLike(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isPlainObject(v: unknown): v is JsonObject {
    return isObjectLike(v);
}

function resolveRouteLabel(
    path: JsonPath,
    nav?: JsonEditorNavOptions
): React.ReactNode {
    // wildcard labels win (best match)
    const hit = pickBest(nav?.routeLabels, path);
    if (hit) return hit.value;

    if (!path) return "Root";
    return lastSegment(path);
}

/**
 * buildJsonRoutes(value, navProps) → nav tree
 * - routes are derived from nested objects
 * - can optionally include object-items inside arrays as routes
 */
export function buildJsonRoutes(
    value: JsonObject | undefined,
    nav?: JsonEditorNavOptions,
    filters?: JsonEditorFilters
): JsonRouteNode[] {
    const rootObj: JsonObject = (value ?? {}) as JsonObject;

    const showRoot = nav?.showRoot ?? true;
    const maxDepth = nav?.maxDepth ?? Number.POSITIVE_INFINITY;
    const arrayRoutes = nav?.arrayRoutes ?? "none";

    const nodes: JsonRouteNode[] = [];

    const buildChildren = (
        obj: JsonObject,
        parentPath: JsonPath,
        depth: number
    ): JsonRouteNode[] => {
        if (depth >= maxDepth) return [];

        const out: JsonRouteNode[] = [];

        for (const [k, v] of Object.entries(obj)) {
            const nextPath = parentPath ? `${parentPath}.${k}` : k;

            // nested object => route
            if (isPlainObject(v)) {
                if (!isRouteAllowed(nextPath, filters)) continue;

                out.push({
                    path: nextPath,
                    key: k,
                    label: resolveRouteLabel(nextPath, nav),
                    children: buildChildren(v, nextPath, depth + 1),
                });
                continue;
            }

            // array of objects => optionally allow routes like "config.items.0"
            if (arrayRoutes === "objects" && Array.isArray(v)) {
                const anyObjIdx = (v as any[]).findIndex((x) =>
                    isPlainObject(x)
                );
                if (anyObjIdx === -1) continue;

                // route for the array itself? (treat as object page)
                if (!isRouteAllowed(nextPath, filters)) continue;

                const arrayNode: JsonRouteNode = {
                    path: nextPath,
                    key: k,
                    label: resolveRouteLabel(nextPath, nav),
                    children: [],
                };

                const children: JsonRouteNode[] = [];
                (v as any[]).forEach((item, idx) => {
                    if (!isPlainObject(item)) return;
                    const itemPath = `${nextPath}.${idx}`;
                    if (!isRouteAllowed(itemPath, filters)) return;

                    children.push({
                        path: itemPath,
                        key: String(idx),
                        label: resolveRouteLabel(itemPath, nav) ?? `#${idx}`,
                        children: buildChildren(item, itemPath, depth + 1),
                    });
                });

                arrayNode.children = children;
                out.push(arrayNode);
            }
        }

        // stable ordering (optional): alphabetical
        out.sort((a, b) => String(a.key).localeCompare(String(b.key)));
        return out;
    };

    if (showRoot) {
        if (isRouteAllowed("", filters)) {
            nodes.push({
                path: "",
                key: "",
                label: resolveRouteLabel("", nav),
                children: buildChildren(rootObj, "", 0),
            });
        } else {
            // If root is excluded, still expose its children as top-level pages
            nodes.push(...buildChildren(rootObj, "", 0));
        }
    } else {
        nodes.push(...buildChildren(rootObj, "", 0));
    }

    return nodes;
}
