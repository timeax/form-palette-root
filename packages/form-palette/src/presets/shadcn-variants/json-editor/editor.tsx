// src/presets/shadcn-variants/json-editor/editor.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/presets/ui/button";
import { Separator } from "@/presets/ui/separator";

import { Code2, Eye, SplitSquareVertical, Upload, X } from "lucide-react";

import type { ChangeDetail } from "@/variants/shared";

import type { JsonObject, JsonPath, JsonValue } from "@/lib/json-editor/utils";
import {
    buildJsonRoutes,
    lastSegment,
    splitPath,
} from "@/lib/json-editor/utils";

import type {
    JsonEditorCallbacks,
    JsonEditorDefaults,
    JsonEditorFieldMap,
    JsonEditorFilters,
    JsonEditorLayoutMap,
    JsonEditorPermissions,
    JsonEditorResolvedField,
    JsonEditorViewMode,
    JsonRouteNode,
} from "./types";

import JsonEditorMain from "./main";
import JsonEditorRawPanel from "./raw-panel";

/* ─────────────────────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorHeaderRenderCtx {
    title: React.ReactNode;
    viewControls: React.ReactNode;

    loadFile: () => void;
    setViewMode: (mode: JsonEditorViewMode) => void;
    close: () => void;
}

export interface JsonEditorHandle {
    loadFile: () => void;

    getRoute: () => JsonPath;
    setRoute: (route: JsonPath) => void;

    getViewMode: () => JsonEditorViewMode;
    setViewMode: (mode: JsonEditorViewMode) => void;
}

export interface JsonEditorEditorProps {
    root: JsonObject;
    onRoot: (nextRoot: JsonObject, detail?: ChangeDetail<any>) => void;

    // config
    fieldMap?: JsonEditorFieldMap;
    layout?: JsonEditorLayoutMap;
    defaults?: JsonEditorDefaults;
    filters?: JsonEditorFilters;
    permissions?: JsonEditorPermissions;
    callbacks?: JsonEditorCallbacks;

    // hooks
    renderField?: (ctx: {
        field: JsonEditorResolvedField;
        route: JsonPath;
    }) => React.ReactNode;
    renderRouteLabel?: (ctx: {
        node: JsonRouteNode;
        active: boolean;
    }) => React.ReactNode;

    // header
    title?: React.ReactNode;
    schema?: string; // validation identifier/selector (NOT a UI title)
    onClose?: () => void;
    showClose?: boolean;
    renderHeader?: (ctx: JsonEditorHeaderRenderCtx) => React.ReactNode;

    // routing (optional controlled)
    route?: JsonPath;
    defaultRoute?: JsonPath;
    onRouteChange?: (route: JsonPath) => void;

    // view mode (optional controlled)
    viewMode?: JsonEditorViewMode;
    defaultViewMode?: JsonEditorViewMode;
    onViewModeChange?: (mode: JsonEditorViewMode) => void;

    // styling
    className?: string;
    contentClassName?: string;
    rawClassName?: string;
}

/* ─────────────────────────────────────────────────────────────
 * Local utils (keep minimal)
 * ───────────────────────────────────────────────────────────── */

function isPlainObject(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function prettifyLabel(key: string) {
    const spaced = key
        .replace(/_/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .trim();
    return spaced ? spaced[0]!.toUpperCase() + spaced.slice(1) : key;
}

function parentOf(path: JsonPath): JsonPath {
    const segs = splitPath(path);
    if (segs.length <= 1) return "";
    return segs.slice(0, -1).join(".");
}

function collectAllPaths(
    value: JsonValue,
    prefix: JsonPath = "",
    out: JsonPath[] = [],
) {
    if (value === null) return out;

    if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
            const p = prefix ? `${prefix}.${i}` : `${i}`;
            out.push(p);
            collectAllPaths(value[i] as JsonValue, p, out);
        }
        return out;
    }

    if (isPlainObject(value)) {
        for (const k of Object.keys(value)) {
            const p = prefix ? `${prefix}.${k}` : k;
            out.push(p);
            collectAllPaths((value as any)[k] as JsonValue, p, out);
        }
        return out;
    }

    return out;
}

function useControllable<T>(opts: {
    value?: T;
    defaultValue: T;
    onChange?: (v: T) => void;
}) {
    const { value, defaultValue, onChange } = opts;
    const [inner, setInner] = React.useState<T>(defaultValue);

    const isControlled = value !== undefined;
    const state = (isControlled ? value : inner) as T;

    const setState = React.useCallback(
        (next: T) => {
            if (!isControlled) setInner(next);
            onChange?.(next);
        },
        [isControlled, onChange],
    );

    // keep inner synced if controlled flips to uncontrolled later (rare, but safe)
    React.useEffect(() => {
        if (!isControlled) return;
        setInner(value as T);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isControlled]);

    return [state, setState] as const;
}

function callCallbacks(
    callbacks: JsonEditorCallbacks | undefined,
    action: "edit" | "edit-raw",
    nextRoot: JsonObject,
    ctx: { route: JsonPath; path?: JsonPath },
) {
    if (!callbacks) return;

    const path = ctx.path ?? "";
    const key = path ? lastSegment(path) : "";
    const parent = path ? parentOf(path) : "";

    const meta = {
        action,
        route: ctx.route,
        path,
        parent,
        key,
    } as const;

    // For now: everything funnels through onEdit (you can expand later when you wire add/delete in main)
    callbacks.onEdit?.(nextRoot, meta as any);
}

/* ─────────────────────────────────────────────────────────────
 * Component
 * ───────────────────────────────────────────────────────────── */

export const JsonEditorEditor = React.forwardRef<
    JsonEditorHandle,
    JsonEditorEditorProps
>(function JsonEditorEditor(props, ref) {
    const {
        root,
        onRoot,

        fieldMap,
        layout,
        defaults,
        filters,
        permissions,
        callbacks,

        renderField,
        renderRouteLabel,

        title: headerTitle,
        schema,
        onClose,
        showClose,
        renderHeader,

        route: routeProp,
        defaultRoute,
        onRouteChange,

        viewMode: viewModeProp,
        defaultViewMode = "split",
        onViewModeChange,

        className,
        contentClassName,
        rawClassName,
    } = props;

    const canViewRaw = permissions?.canViewRaw ?? true;
    const canEditRaw = permissions?.canEditRaw ?? false;

    const routes = React.useMemo(
        () => buildJsonRoutes(root, undefined, filters),
        [root, filters],
    );

    const allPaths = React.useMemo(() => {
        const list = collectAllPaths(root as unknown as JsonValue, "", []);
        const seen = new Set<string>();
        return list.filter((p) => (seen.has(p) ? false : (seen.add(p), true)));
    }, [root]);

    const computedInitialRoute = React.useMemo(() => {
        const explicit = routeProp ?? defaultRoute;
        if (explicit !== undefined) return explicit;
        return routes[0]?.path ?? "";
    }, [routeProp, defaultRoute, routes]);

    const [route, setRoute] = useControllable<JsonPath>({
        value: routeProp,
        defaultValue: computedInitialRoute,
        onChange: onRouteChange,
    });

    const [viewMode, setViewMode] = useControllable<JsonEditorViewMode>({
        value: viewModeProp,
        defaultValue: defaultViewMode,
        onChange: onViewModeChange,
    });

    React.useEffect(() => {
        if (!canViewRaw && (viewMode === "raw" || viewMode === "split")) {
            setViewMode("visual");
        }
    }, [canViewRaw, setViewMode, viewMode]);

    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const loadFile = React.useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const close = React.useCallback(() => {
        onClose?.();
    }, [onClose]);

    const onFilePicked = React.useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;

            try {
                const raw = await file.text();
                const parsed = JSON.parse(raw);

                const nextRoot: JsonObject = isPlainObject(parsed)
                    ? (parsed as JsonObject)
                    : ({ value: parsed } as any);

                onRoot(nextRoot);
                callCallbacks(callbacks, "edit-raw", nextRoot, {
                    route,
                    path: "",
                });
            } catch {
                // Keep silent; raw-panel handles validation UX.
            }
        },
        [callbacks, onRoot, route],
    );

    const breadcrumb = React.useMemo(() => {
        const segs = splitPath(route);
        const parts: Array<{ path: JsonPath; label: React.ReactNode }> = [];

        const rootNode = {
            path: "" as JsonPath,
            key: "",
            label: "Root",
            children: routes,
        };

        const rootLabel = renderRouteLabel
            ? renderRouteLabel({ node: rootNode, active: !route })
            : rootNode.label;

        parts.push({ path: "", label: rootLabel });

        let acc = "";
        for (let i = 0; i < segs.length; i++) {
            const s = segs[i]!;
            acc = acc ? `${acc}.${s}` : s;
            const isActive = i === segs.length - 1;

            const label = renderRouteLabel
                ? renderRouteLabel({
                      node: {
                          path: acc,
                          key: s,
                          label: prettifyLabel(s),
                          children: [],
                      },
                      active: isActive,
                  })
                : prettifyLabel(s);

            parts.push({ path: acc, label });
        }

        return (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                {parts.map((p, idx) => (
                    <React.Fragment key={p.path || "root"}>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => setRoute(p.path)}
                        >
                            {p.label}
                        </Button>
                        {idx < parts.length - 1 ? (
                            <span className="opacity-60">/</span>
                        ) : null}
                    </React.Fragment>
                ))}
            </div>
        );
    }, [route, routes, renderRouteLabel, setRoute]);

    const routeTitle = React.useMemo(() => {
        if (!route) return "Config.json";
        const key = lastSegment(route);
        if (renderRouteLabel) {
            return renderRouteLabel({
                node: {
                    path: route,
                    key,
                    label: prettifyLabel(key),
                    children: [],
                },
                active: true,
            });
        }
        return prettifyLabel(key);
    }, [route, renderRouteLabel]);

    const viewControls = React.useMemo(() => {
        return (
            <div className="flex items-center gap-1 rounded-md border p-1">
                <Button
                    type="button"
                    size="sm"
                    variant={viewMode === "visual" ? "secondary" : "ghost"}
                    onClick={() => setViewMode("visual")}
                >
                    <Eye className="mr-2 h-4 w-4" />
                    Visual
                </Button>

                {canViewRaw ? (
                    <Button
                        type="button"
                        size="sm"
                        variant={viewMode === "split" ? "secondary" : "ghost"}
                        onClick={() => setViewMode("split")}
                    >
                        <SplitSquareVertical className="mr-2 h-4 w-4" />
                        Split
                    </Button>
                ) : null}

                {canViewRaw ? (
                    <Button
                        type="button"
                        size="sm"
                        variant={viewMode === "raw" ? "secondary" : "ghost"}
                        onClick={() => setViewMode("raw")}
                    >
                        <Code2 className="mr-2 h-4 w-4" />
                        Raw
                    </Button>
                ) : null}
            </div>
        );
    }, [canViewRaw, setViewMode, viewMode]);

    const header = React.useMemo(() => {
        const ctx: JsonEditorHeaderRenderCtx = {
            title: (
                <div className="min-w-0 flex items-center gap-2">
                    <div className="truncate font-medium">
                        {headerTitle ?? "JSON Editor"}
                    </div>
                </div>
            ),
            viewControls,
            loadFile,
            setViewMode,
            close,
        };

        if (renderHeader) return renderHeader(ctx);

        return (
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0 flex items-center gap-3">
                    {ctx.title}

                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={loadFile}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Load file
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    {viewControls}
                    {showClose && onClose ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={close}
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    ) : null}
                </div>
            </div>
        );
    }, [
        close,
        headerTitle,
        loadFile,
        onClose,
        renderHeader,
        schema,
        setViewMode,
        showClose,
        viewControls,
    ]);

    const onVisualRoot = React.useCallback(
        (nextRoot: JsonObject, detail?: ChangeDetail<any>) => {
            onRoot(nextRoot, detail);

            const d: any = detail;
            const pathGuess =
                (typeof d?.name === "string" && d.name) ||
                (typeof d?.path === "string" && d.path) ||
                route;

            callCallbacks(callbacks, "edit", nextRoot, {
                route,
                path: pathGuess,
            });
        },
        [callbacks, onRoot, route],
    );

    const onRawRoot = React.useCallback(
        (nextRoot: JsonObject, detail?: ChangeDetail<any>) => {
            onRoot(nextRoot, detail);
            callCallbacks(callbacks, "edit-raw", nextRoot, { route, path: "" });
        },
        [callbacks, onRoot, route],
    );

    React.useImperativeHandle(
        ref,
        () => ({
            loadFile,
            getRoute: () => route,
            setRoute: (r) => setRoute(r),
            getViewMode: () => viewMode,
            setViewMode: (m) => setViewMode(m),
        }),
        [loadFile, route, setRoute, setViewMode, viewMode],
    );

    const showRaw = canViewRaw && (viewMode === "split" || viewMode === "raw");
    const showVisual = viewMode !== "raw";

    return (
        <div className={cn("flex h-full min-h-0 w-full flex-col", className)}>
            <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={onFilePicked}
            />

            {header}
            <Separator />

            <div className={cn("flex min-h-0 flex-1", contentClassName)}>
                {/* Raw panel (LEFT) */}
                {showRaw ? (
                    <div
                        className={cn("w-105 shrink-0 border-r", rawClassName)}
                    >
                        <JsonEditorRawPanel
                            root={root}
                            onRoot={onRawRoot}
                            readOnly={!canEditRaw}
                        />
                    </div>
                ) : null}

                {/* Main (RIGHT) */}
                {showVisual ? (
                    <div className="min-h-0 flex-1 p-4">
                        <JsonEditorMain
                            root={root}
                            onRoot={onVisualRoot}
                            route={route}
                            allPaths={allPaths}
                            fieldMap={fieldMap}
                            layout={layout}
                            defaults={defaults}
                            filters={filters}
                            disabled={false}
                            readOnly={false}
                            breadcrumb={breadcrumb}
                            title={routeTitle}
                            onNavigate={(r) => setRoute(r)}
                            renderField={renderField}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
});

export default JsonEditorEditor;
