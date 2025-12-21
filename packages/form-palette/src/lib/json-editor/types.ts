// src/lib/json-editor/types.ts
import type * as React from "react";

/* ─────────────────────────────────────────────────────────────
 * JSON primitives
 * ───────────────────────────────────────────────────────────── */

export type JsonPrimitive = string | number | boolean | null;
// eslint-disable-next-line @typescript-eslint/ban-types
// @ts-ignore
export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];
// @ts-ignore
export type JsonObject = Record<string, JsonValue>;

export type JsonPath = string; // "" | "config" | "config.apiEndpoint"
export type JsonWildcard = string;

/* ─────────────────────────────────────────────────────────────
 * Filters (public shape)
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorFilters {
    /** Hide entire object routes/pages (navigation + rendering) */
    excludeRoutes?: JsonWildcard[];
    includeRoutes?: JsonWildcard[];

    /** Hide specific fields (by full path or leaf/wild patterns) */
    excludeFields?: JsonWildcard[];
    includeFields?: JsonWildcard[];

    /**
     * If true, excluding "config" also excludes "config.**".
     * Default: true
     */
    excludeRouteSubtree?: boolean;
}

/* ─────────────────────────────────────────────────────────────
 * Layout (public shape)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorLayoutRow = string | string[];
export type JsonEditorLayoutMap = Record<JsonWildcard, JsonEditorLayoutRow[]>;

/* ─────────────────────────────────────────────────────────────
 * Navigation (routes derived from JSON)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorNavMode = "sidebar" | "tabs" | "drawer";

export interface JsonEditorNavOptions {
    mode?: JsonEditorNavMode;
    showRoot?: boolean;
    defaultRoute?: JsonPath;
    routeLabels?: Record<JsonWildcard, React.ReactNode>;
    maxDepth?: number;
    arrayRoutes?: "none" | "objects";
}

export interface JsonRouteNode {
    path: JsonPath;
    key: string; // last segment
    label: React.ReactNode;
    children: JsonRouteNode[];
}
