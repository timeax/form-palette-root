// src/lib/json-editor/utils.ts
import type {
    JsonEditorLayoutMap,
    JsonEditorLayoutRow,
    JsonPath,
} from "./types";
import { pickBest as _pickBest } from "./glob";

export type {
    JsonPrimitive,
    JsonValue,
    JsonObject,
    JsonPath,
    JsonWildcard,
    JsonEditorNavMode,
    JsonEditorNavOptions,
    JsonEditorFilters,
    JsonEditorLayoutRow,
    JsonEditorLayoutMap,
    JsonRouteNode,
} from "./types";

export {
    splitPath,
    lastSegment,
    matchSegment,
    matchPath,
    scoreMatch,
    pickBest,
    pickBestMatch,
} from "./glob";

export {
    isRouteAllowed,
    isFieldAllowed,
    filterVisibleRoutes,
    filterVisibleFieldPaths,
    filterVisiblePaths,
} from "./filters";

export type { JsonEditorLayout, LayoutRow } from "./layout";
export { resolveLayoutForParent } from "./layout";

export { buildJsonRoutes } from "./routes";

/**
 * Backwards-compat: pickLayout(layoutMap, activePath) → rows (best match wins)
 */
export function pickLayout(
    layoutMap: JsonEditorLayoutMap | undefined,
    activePath: JsonPath
): JsonEditorLayoutRow[] | undefined {
    const hit = _pickBest(layoutMap, activePath);
    return hit?.value;
}
