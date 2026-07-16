// src/presets/shadcn-variants/json-editor/types.ts
// noinspection GrazieInspection

import type { VariantKey, VariantPropsFor } from "@/schema/variant";
import * as React from "react";
import type { VariantBaseProps } from "@/variants/shared";
import type {
    JsonObject,
    JsonPath,
    JsonValue,
    JsonWildcard,
} from "@/lib/json-editor/utils";

/* ─────────────────────────────────────────────────────────────
 * Variant config (fieldMap/defaults.array)
 * ───────────────────────────────────────────────────────────── */

/**
 * A "variant spec" can be:
 * - a plain VariantKey ("text", "number", "toggle", ...)
 * - a variant key + props to pass into that variant
 */
export type JsonEditorVariantSpec =
    | VariantKey
    | {
          variant: VariantKey;
          props?: VariantPropsFor<any>;
      };

/**
 * Map a key-path (or wildcard) to a variant spec.
 *
 * Keys are matched against:
 * - full path:  "config.apiEndpoint"
 * - leaf key:   "apiEndpoint"
 *
 * Wild examples:
 * - "*api*"             (segment contains "api")
 * - "config.*"          (direct children)
 * - "config.**"         (subtree)
 * - "**.*token*"        (any route/leaf)
 */
export type JsonEditorFieldMap = Record<JsonWildcard, JsonEditorVariantSpec>;

/* ─────────────────────────────────────────────────────────────
 * Layout
 * ───────────────────────────────────────────────────────────── */

/**
 * Layout is scoped to a "page" (object route path).
 *
 * Each entry is a "row":
 * - string: render a single field row
 * - string[]: render these fields side-by-side (grid row)
 *
 * Example:
 * layout: {
 *   "": [["projectName","version"], "description"],
 *   "config": [["maxEntries","apiEndpoint"], "retry"]
 * }
 */
export type JsonEditorLayoutRow = string | string[];
export type JsonEditorLayoutMap = Record<JsonWildcard, JsonEditorLayoutRow[]>;

/* ─────────────────────────────────────────────────────────────
 * Include / Exclude filters
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
 * Defaults
 * ───────────────────────────────────────────────────────────── */

/**
 * Default value for a newly created key (or a new array item).
 * Can be a constant JsonValue, or a function.
 */
export type JsonEditorDefaultValueSpec =
    | JsonValue
    | ((ctx: {
          parentPath: JsonPath;
          key: string;
          current: JsonValue | undefined;
      }) => JsonValue);

export interface JsonEditorDefaults {
    /**
     * When adding a new array item, you can pick from allowed variants.
     * You can pass VariantKey or a {variant, props} spec.
     */
    array?: JsonEditorVariantSpec[];

    /**
     * Optional default values for new keys.
     * Keyed by wildcard path (full path / leaf / patterns).
     */
    values?: Record<JsonWildcard, JsonEditorDefaultValueSpec>;
}

/* ─────────────────────────────────────────────────────────────
 * Navigation (routes derived from JSON)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorNavMode = "sidebar" | "tabs" | "drawer";

export interface JsonEditorNavOptions {
    mode?: JsonEditorNavMode;

    /** Show root "" as a page in navigation. Default: true */
    showRoot?: boolean;

    /** Initial active route/page. Default: "" */
    defaultRoute?: JsonPath;

    /** Optional label overrides for route nodes */
    routeLabels?: Record<JsonWildcard, React.ReactNode>;

    /** Max object nesting to generate routes for. Optional safety */
    maxDepth?: number;

    /**
     * Whether arrays containing objects can contribute routes.
     * - "none": arrays never create routes (default)
     * - "objects": array items that are objects become routes like "config.items.0"
     */
    arrayRoutes?: "none" | "objects";
}

export interface JsonRouteNode {
    path: JsonPath; // "" | "config" | "config.api"
    key: string; // leaf segment ("config", "api")
    label: React.ReactNode;
    children: JsonRouteNode[];
}

/* ─────────────────────────────────────────────────────────────
 * View mode (Split / Visual / Raw)
 * ───────────────────────────────────────────────────────────── */

export type JsonEditorViewMode = "split" | "visual" | "raw";

/* ─────────────────────────────────────────────────────────────
 * Editing permissions + callbacks
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorPermissions {
    canAdd?: boolean;
    canDelete?: boolean;
    canViewRaw?: boolean;
    canEditRaw?: boolean;

    /**
     * Keys/paths in this shape cannot be deleted even if canDelete is true.
     * (treated as "locked")
     */
    defaultShape?: JsonObject;

    /**
     * Optional finer-grain locks by wildcard.
     * If true, this key/path cannot be added/deleted/edited.
     */
    lockPaths?: JsonWildcard[];
}

export type JsonEditorEditAction = "add" | "delete" | "edit" | "edit-raw";

export interface JsonEditorEditMeta {
    action: JsonEditorEditAction;

    /** the page (object route) currently being edited */
    route: JsonPath;

    /** the exact key path being changed (field path) */
    path: JsonPath;

    /** parent object path of the key */
    parent: JsonPath;

    /** leaf key (segment) */
    key: string;
}

export interface JsonEditorCallbacks {
    onAdd?: (nextRoot: JsonObject, meta: JsonEditorEditMeta) => void;
    onDelete?: (nextRoot: JsonObject, meta: JsonEditorEditMeta) => void;
    onEdit?: (nextRoot: JsonObject, meta: JsonEditorEditMeta) => void;
}

/* ─────────────────────────────────────────────────────────────
 * Resolved field shape (for renderField hook)
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorResolvedField {
    path: JsonPath; // "config.apiEndpoint"
    key: string; // "apiEndpoint"
    value: JsonValue; // current value
    valueType: "string" | "number" | "boolean" | "null" | "object" | "array";
    variant?: JsonEditorVariantSpec; // resolved from fieldMap/defaults/etc
    hidden?: boolean; // from include/exclude
}

/* ─────────────────────────────────────────────────────────────
 * Variant props (the actual editor surface)
 * ───────────────────────────────────────────────────────────── */

/**
 * This is the "shared" props contract for the JSON editor variant UI.
 *
 * NOTE:
 * - `title` is purely UI (header text)
 * - `schema` is NOT a title — it’s a schema id/key for validation (later use)
 */
export interface ShadcnJsonEditorVariantProps extends Pick<
    VariantBaseProps<JsonObject | undefined>,
    "value" | "onValue" | "error" | "disabled" | "readOnly"
> {
    /** Header title (UI only) */
    title?: React.ReactNode;

    /** Optional schema id/key or raw JSON Schema object for validation */
    schema?: string | JsonObject;

    /** Primary config */
    fieldMap?: JsonEditorFieldMap;
    layout?: JsonEditorLayoutMap;
    defaults?: JsonEditorDefaults;

    /** Navigation derived from JSON structure */
    nav?: JsonEditorNavOptions;

    /** include/exclude for routes + fields */
    filters?: JsonEditorFilters;

    /** permissions + locks */
    permissions?: JsonEditorPermissions;

    /** callbacks */
    callbacks?: JsonEditorCallbacks;

    /**
     * Page rendering mode:
     * - "accordion": page sections expand/collapse in main panel
     * - "popover": nested objects open as overlays (optional UX)
     */
    mode?: "accordion" | "popover";

    /**
     * Routing:
     * - route: controlled current page
     * - defaultRoute: uncontrolled initial page (overrides nav.defaultRoute)
     * - onRouteChange: called whenever the editor navigates
     */
    route?: JsonPath;
    defaultRoute?: JsonPath;
    onRouteChange?: (route: JsonPath) => void;

    /**
     * View mode (top toggle):
     * - "split": raw sidebar + visual editor (default)
     * - "visual": visual editor only
     * - "raw": raw editor only
     *
     * If viewMode is provided, it is controlled.
     * Otherwise, the defaultViewMode seeds the internal state.
     */
    viewMode?: JsonEditorViewMode;
    defaultViewMode?: JsonEditorViewMode;
    onViewModeChange?: (mode: JsonEditorViewMode) => void;

    /** Close button intent (optional). Actual close UI is controlled by the wrapper (index.tsx). */
    onClose?: () => void;

    /** Visual (editor-level styling) */
    className?: string;
    contentClassName?: string;
    navClassName?: string;

    /**
     * Optional hooks to customize nav + page rendering.
     */
    renderRouteLabel?: (ctx: {
        node: JsonRouteNode;
        active: boolean;
    }) => React.ReactNode;
    renderField?: (ctx: {
        field: JsonEditorResolvedField;
        route: JsonPath;
    }) => React.ReactNode;

    // icons & controls (popover trigger only)
    leadingIcons?: React.ReactNode[];
    trailingIcons?: React.ReactNode[];
    icon?: React.ReactNode;
    iconGap?: number;
    leadingIconSpacing?: number;
    trailingIconSpacing?: number;

    leadingControl?: React.ReactNode;
    trailingControl?: React.ReactNode;
    leadingControlClassName?: string;
    trailingControlClassName?: string;

    joinControls?: boolean;
    extendBoxToControls?: boolean;

    triggerClassName?: string;
}

/* ─────────────────────────────────────────────────────────────
 * Index wrapper (popover/accordion + trigger + standalone wiring)
 * ───────────────────────────────────────────────────────────── */

/**
 * Wrapper mode:
 * - "popover": show trigger + popover
 * - "accordion": inline panel that can expand/collapse
 */
export type JsonEditorMode = "popover" | "accordion";

/**
 * Typed to match your shadcn button variants/sizes.
 * If your project differs, change these unions here once.
 */
export type JsonEditorTriggerVariant =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";

export type JsonEditorTriggerSize = "default" | "sm" | "lg" | "icon";

/**
 * Exposed ref handle from index.tsx wrapper (not the inner editor).
 * The wrapper controls popover open/close; it can also expose the inner editor ref.
 */
export interface JsonEditorIndexHandle {
    open: () => void;
    close: () => void;
    toggle: () => void;
    editor: React.RefObject<any>;
}

/**
 * Standalone wiring:
 * - caller provides root/onRoot directly
 */
export type JsonEditorStandaloneWiring = {
    root: JsonObject;
    onRoot: (nextRoot: JsonObject, detail?: any) => void;

    value?: never;
    onValue?: never;
};

/**
 * Variant wiring:
 * - InputField variant uses value/onValue
 */
export type JsonEditorVariantWiring = Pick<
    VariantBaseProps<JsonObject | undefined>,
    "value" | "onValue" | "disabled" | "readOnly" | "error" | "size" | "density"
> & {
    root?: never;
    onRoot?: never;
};

/**
 * Props for the exported component (index.tsx):
 * - accepts standalone OR variant wiring
 * - wrapper owns mode/open/trigger UI
 * - editor-specific props are passed through, without redefining a second type list
 *
 * IMPORTANT:
 * - wrapper uses `wrapperClassName` (outer container)
 * - editor uses `className` (inner editor surface)
 */
export interface JsonEditorWrapperProps {
    /** Wrapper mode (popover vs accordion). */
    mode?: JsonEditorMode;

    /** Trigger UI (popover mode) */
    triggerLabel?: React.ReactNode;
    triggerVariant?: JsonEditorTriggerVariant;
    triggerSize?: JsonEditorTriggerSize;

    /** Popover sizing/skin */
    popoverClassName?: string;

    /** Inline/accordion container class */
    panelClassName?: string;

    /** Outer wrapper class */
    wrapperClassName?: string;

    /** Optional: controlled popover open state */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    /** Accessibility (useful when rendered as an InputField variant) */
    id?: string;
    describedBy?: string;

    /** Called when the wrapper closes (popover close / accordion hide). */
    onClose?: () => void;
}

/**
 * Single source of truth for what index.tsx accepts:
 * - (standalone OR variant wiring)
 * - wrapper props
 * - editor props (minus a few keys owned by wrapper)
 */
export type ShadcnJsonEditorProps = (
    | JsonEditorStandaloneWiring
    | JsonEditorVariantWiring
) &
    JsonEditorWrapperProps &
    Omit<
        ShadcnJsonEditorVariantProps,
        | "onValue"
        | "value"
        | "disabled"
        | "readOnly"
        | "error"
        | "size"
        | "density"
        | "onClose"
    >;
