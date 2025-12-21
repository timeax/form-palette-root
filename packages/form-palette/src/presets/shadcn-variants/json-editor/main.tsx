// src/presets/shadcn-variants/json-editor-main.tsx
// noinspection GrazieInspection

import * as React from "react";
import { cn } from "@/lib/utils";

import { Badge } from "@/presets/ui/badge";
import { Button } from "@/presets/ui/button";
import { Separator } from "@/presets/ui/separator";

import { InputField } from "@/input/input-field";

import type { ChangeDetail } from "@/variants/shared";
import type {
    JsonObject,
    JsonPath,
    JsonValue,
    LayoutRow,
} from "@/lib/json-editor/utils";

import {
    splitPath,
    lastSegment,
    resolveLayoutForParent,
} from "@/lib/json-editor/utils";
import { getDirectChildPaths } from "@/lib/json-editor/tree";

import type {
    JsonEditorCallbacks,
    JsonEditorFieldMap,
    JsonEditorDefaults,
    JsonEditorFilters,
    JsonEditorLayoutMap,
    JsonEditorResolvedField,
    JsonEditorVariantSpec,
    JsonEditorEditMeta,
    JsonRouteNode,
} from "./types";

import { pickBest } from "@/lib/json-editor/utils";

/* ─────────────────────────────────────────────────────────────
 * Props
 * ───────────────────────────────────────────────────────────── */

export interface JsonEditorMainProps {
    /** root JSON (always an object for this editor) */
    root: JsonObject;

    /** notify parent (json-editor variant wrapper) */
    onRoot: (nextRoot: JsonObject, detail?: ChangeDetail<any>) => void;

    /** active "page" route: "" | "config" | "config.headers" */
    route: JsonPath;

    /**
     * IMPORTANT (matches your layout util):
     * A generic paths list used by layout/tree utils.
     * Should include *at least* all field paths you want to render.
     */
    allPaths: JsonPath[];

    /** config */
    fieldMap?: JsonEditorFieldMap;
    layout?: JsonEditorLayoutMap;
    defaults?: JsonEditorDefaults;
    filters?: JsonEditorFilters;

    /** callbacks */
    callbacks?: JsonEditorCallbacks;

    /** flags */
    disabled?: boolean;
    readOnly?: boolean;

    /** main header (inside main panel) */
    breadcrumb?: React.ReactNode;
    title?: React.ReactNode;
    headerRight?: React.ReactNode;

    /** navigation for section “open” buttons */
    onNavigate?: (route: JsonPath) => void;

    /** optional advanced override */
    renderField?: (ctx: {
        field: JsonEditorResolvedField;
        route: JsonPath;
    }) => React.ReactNode;
    renderRouteLabel?: (ctx: {
        node: JsonRouteNode;
        active: boolean;
    }) => React.ReactNode;

    /** styling */
    className?: string;
    contentClassName?: string;
}

/* ─────────────────────────────────────────────────────────────
 * Local JSON path helpers (NOT provided by your utils)
 * ───────────────────────────────────────────────────────────── */

function isPlainObject(v: unknown): v is Record<string, any> {
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

function valueTypeOf(v: JsonValue): JsonEditorResolvedField["valueType"] {
    if (v === null) return "null";
    if (Array.isArray(v)) return "array";
    if (isPlainObject(v)) return "object";
    if (typeof v === "string") return "string";
    if (typeof v === "number") return "number";
    return "boolean";
}

function getAtPath(root: any, path: JsonPath): any {
    if (!path) return root;
    const segs = splitPath(path);
    let cur = root;
    for (const seg of segs) {
        if (cur == null) return undefined;
        cur = cur[seg];
    }
    return cur;
}

function setAtPath(root: any, path: JsonPath, nextValue: any): any {
    const segs = splitPath(path);
    if (!segs.length) return nextValue;

    const out = Array.isArray(root) ? [...root] : { ...(root ?? {}) };
    let cur: any = out;

    for (let i = 0; i < segs.length; i++) {
        const seg = segs[i]!;
        const last = i === segs.length - 1;

        if (last) {
            cur[seg] = nextValue;
            break;
        }

        const prev = cur[seg];
        const next = Array.isArray(prev)
            ? [...prev]
            : isPlainObject(prev)
              ? { ...prev }
              : {};
        cur[seg] = next;
        cur = next;
    }

    return out;
}

function prettifyLabel(key: string) {
    const spaced = key
        .replace(/_/g, " ")
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .trim();
    return spaced ? spaced[0]!.toUpperCase() + spaced.slice(1) : key;
}

function typeTag(type: string) {
    return (
        <Badge variant="secondary" className="uppercase tracking-wide">
            {type}
        </Badge>
    );
}

function normalizeVariantSpec(spec: JsonEditorVariantSpec | undefined): {
    variant?: string;
    props?: any;
} {
    if (!spec) return {};
    if (typeof spec === "string") return { variant: spec };
    return { variant: spec.variant, props: spec.props };
}

function fallbackVariantForValueType(t: JsonEditorResolvedField["valueType"]) {
    if (t === "number") return "number";
    if (t === "boolean") return "toggle"; // default
    // null/string
    return "text";
}

function metaForPath(
    action: JsonEditorEditMeta["action"],
    route: JsonPath,
    path: JsonPath,
): JsonEditorEditMeta {
    const segs = splitPath(path);
    const key = segs.length ? String(segs[segs.length - 1]!) : "";
    const parent = segs.length > 1 ? segs.slice(0, -1).join(".") : "";
    return { action, route, path, parent, key };
}

/* ─────────────────────────────────────────────────────────────
 * Render a primitive field (always InputField)
 * ───────────────────────────────────────────────────────────── */

function PrimitiveField(props: {
    root: JsonObject;
    path: JsonPath;
    route: JsonPath;
    fieldMap?: JsonEditorFieldMap;
    callbacks?: JsonEditorCallbacks;
    disabled?: boolean;
    readOnly?: boolean;
    onRoot: (next: JsonObject, detail?: ChangeDetail<any>) => void;
    renderField?: JsonEditorMainProps["renderField"];
}) {
    const {
        root,
        path,
        route,
        fieldMap,
        callbacks,
        disabled,
        readOnly,
        onRoot,
        renderField,
    } = props;

    const key = lastSegment(path);
    const raw = getAtPath(root, path) as JsonValue | undefined;
    const val = (raw === undefined ? null : raw) as JsonValue;
    const valueType = valueTypeOf(val);

    const hit = pickBest(fieldMap, path);
    const spec = hit?.value;
    const resolved = normalizeVariantSpec(spec);

    const variant = resolved.variant || fallbackVariantForValueType(valueType);

    const field: JsonEditorResolvedField = {
        path,
        key,
        value: val,
        valueType,
        variant: spec,
    };

    const override = renderField?.({ field, route });
    if (override != null) return <>{override}</>;

    return (
        <InputField
            name={path}
            label={prettifyLabel(key)}
            variant={variant as any}
            tags={[{ label: typeTag(valueType) }] as any}
            disabled={disabled}
            readOnly={readOnly}
            {...(resolved.props ?? {})}
            value={val as any}
            onValue={(next: any, detail?: ChangeDetail<any>) => {
                if (disabled || readOnly) return;

                const nextRoot = setAtPath(root, path, next) as JsonObject;
                onRoot(nextRoot, detail);

                callbacks?.onEdit?.(nextRoot, metaForPath("edit", route, path));
            }}
        />
    );
}

/* ─────────────────────────────────────────────────────────────
 * Section card (OBJECT / ARRAY) like your screenshot
 * ───────────────────────────────────────────────────────────── */

function SectionCard(props: {
    title: React.ReactNode;
    tag: React.ReactNode;
    right?: React.ReactNode;
    children: React.ReactNode;
}) {
    const { title, tag, right, children } = props;

    return (
        <div className="rounded-lg border bg-background/50">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="font-medium truncate">{title}</div>
                        <div className="shrink-0">{tag}</div>
                    </div>
                </div>

                {right ? <div className="shrink-0">{right}</div> : null}
            </div>

            <Separator />
            <div className="p-4">{children}</div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
 * Main
 * ───────────────────────────────────────────────────────────── */

export function JsonEditorMain(props: JsonEditorMainProps) {
    const {
        root,
        onRoot,
        route,
        allPaths,
        fieldMap,
        layout,
        defaults,
        filters,
        callbacks,
        disabled,
        readOnly,
        breadcrumb,
        title,
        onNavigate,
        renderField,
        renderRouteLabel,
        className,
        contentClassName,
    } = props;

    const directChildPaths = React.useMemo(() => {
        return getDirectChildPaths(route, allPaths);
    }, [route, allPaths]);

    const rows: LayoutRow[] = React.useMemo(() => {
        return resolveLayoutForParent({
            parent: route,
            childPaths: directChildPaths,
            layout: layout as any,
            filters,
        });
    }, [route, directChildPaths, layout, filters]);

    const effectiveRows: LayoutRow[] = React.useMemo(() => {
        const hasAny = rows.some((r) => r.fields?.length);
        if (hasAny) return rows;

        return directChildPaths.map(
            (p) => ({ parent: route, kind: "row", fields: [p] }) as LayoutRow,
        );
    }, [rows, directChildPaths, route]);

    const pageValue = getAtPath(root, route) as JsonValue;
    const validJson = isPlainObject(root);

    return (
        <div className={cn("flex min-h-0 flex-col gap-4", className)}>
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    {breadcrumb ? (
                        <div className="text-sm text-muted-foreground truncate">
                            {breadcrumb}
                        </div>
                    ) : (
                        <div className="text-sm text-muted-foreground truncate">
                            Root Object
                            {route ? ` > ${splitPath(route).join(" > ")}` : ""}
                        </div>
                    )}

                    <div className="mt-1 text-3xl font-semibold leading-tight">
                        {title ??
                            (route
                                ? prettifyLabel(lastSegment(route))
                                : "Config.json")}
                    </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                    <Badge variant="secondary">
                        {validJson ? "Valid JSON" : "Invalid"}
                    </Badge>
                </div>
            </div>

            <div
                className={cn("flex min-h-0 flex-col gap-4", contentClassName)}
            >
                {!isPlainObject(pageValue) ? (
                    <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">
                        This page is not an object.
                    </div>
                ) : null}

                {effectiveRows.map((row, idx) => {
                    if (!row.fields?.length) return null;

                    const isGrid = row.fields.length > 1;

                    return (
                        <div
                            key={`${row.parent}::${row.kind}::${idx}`}
                            className={cn(
                                isGrid
                                    ? "grid gap-4 md:grid-cols-2"
                                    : "flex flex-col",
                            )}
                        >
                            {row.fields.map((path) => {
                                const v = getAtPath(root, path) as JsonValue;
                                const vt = valueTypeOf(v);

                                if (vt === "object" && isPlainObject(v)) {
                                    const sectionRoute = path;

                                    const sectionChildPaths =
                                        getDirectChildPaths(
                                            sectionRoute,
                                            allPaths,
                                        );
                                    const sectionRows = resolveLayoutForParent({
                                        parent: sectionRoute,
                                        childPaths: sectionChildPaths,
                                        layout: layout as any,
                                        filters,
                                    });

                                    const openBtn = onNavigate ? (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                onNavigate(sectionRoute)
                                            }
                                        >
                                            Open
                                        </Button>
                                    ) : null;

                                    const sectionTitle = renderRouteLabel
                                        ? renderRouteLabel({
                                              node: {
                                                  path: path,
                                                  key: lastSegment(path),
                                                  label: prettifyLabel(
                                                      lastSegment(path),
                                                  ),
                                                  children: [],
                                              },
                                              active: false,
                                          })
                                        : prettifyLabel(lastSegment(path));

                                    return (
                                        <SectionCard
                                            key={path}
                                            title={sectionTitle}
                                            tag={typeTag("object")}
                                            right={openBtn}
                                        >
                                            <div className="flex flex-col gap-4">
                                                {sectionRows.map((sr, sidx) => {
                                                    if (!sr.fields?.length)
                                                        return null;

                                                    const sGrid =
                                                        sr.fields.length > 1;

                                                    return (
                                                        <div
                                                            key={`${sectionRoute}::${sidx}`}
                                                            className={cn(
                                                                sGrid
                                                                    ? "grid gap-4 md:grid-cols-2"
                                                                    : "flex flex-col",
                                                            )}
                                                        >
                                                            {sr.fields.map(
                                                                (sp) => {
                                                                    const sv =
                                                                        getAtPath(
                                                                            root,
                                                                            sp,
                                                                        ) as JsonValue;
                                                                    const svt =
                                                                        valueTypeOf(
                                                                            sv,
                                                                        );

                                                                    if (
                                                                        svt ===
                                                                            "object" ||
                                                                        svt ===
                                                                            "array"
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    sp
                                                                                }
                                                                                className="rounded-md border px-3 py-2 text-sm text-muted-foreground flex items-center justify-between"
                                                                            >
                                                                                <div className="truncate">
                                                                                    {prettifyLabel(
                                                                                        lastSegment(
                                                                                            sp,
                                                                                        ),
                                                                                    )}
                                                                                </div>

                                                                                {onNavigate ? (
                                                                                    <Button
                                                                                        type="button"
                                                                                        size="sm"
                                                                                        variant="ghost"
                                                                                        onClick={() =>
                                                                                            onNavigate(
                                                                                                sp,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Open
                                                                                    </Button>
                                                                                ) : null}
                                                                            </div>
                                                                        );
                                                                    }

                                                                    return (
                                                                        <PrimitiveField
                                                                            key={
                                                                                sp
                                                                            }
                                                                            root={
                                                                                root
                                                                            }
                                                                            path={
                                                                                sp
                                                                            }
                                                                            route={
                                                                                route
                                                                            }
                                                                            fieldMap={
                                                                                fieldMap
                                                                            }
                                                                            callbacks={
                                                                                callbacks
                                                                            }
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            readOnly={
                                                                                readOnly
                                                                            }
                                                                            onRoot={
                                                                                onRoot
                                                                            }
                                                                            renderField={
                                                                                renderField
                                                                            }
                                                                        />
                                                                    );
                                                                },
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </SectionCard>
                                    );
                                }

                                if (vt === "array" && Array.isArray(v)) {
                                    const arrPath = path;
                                    const items = v;

                                    return (
                                        <SectionCard
                                            key={path}
                                            title={prettifyLabel(
                                                lastSegment(path),
                                            )}
                                            tag={typeTag("array")}
                                            right={
                                                onNavigate ? (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            onNavigate(arrPath)
                                                        }
                                                    >
                                                        Open
                                                    </Button>
                                                ) : null
                                            }
                                        >
                                            <div className="flex flex-col gap-3">
                                                <div className="text-sm text-muted-foreground">
                                                    {items.length} item
                                                    {items.length === 1
                                                        ? ""
                                                        : "s"}
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                    {items.map((_item, i) => {
                                                        const itemPath = `${arrPath}.${i}`;

                                                        return (
                                                            <div
                                                                key={itemPath}
                                                                className="flex items-start gap-2"
                                                            >
                                                                <div className="flex-1">
                                                                    <PrimitiveField
                                                                        root={
                                                                            root
                                                                        }
                                                                        path={
                                                                            itemPath
                                                                        }
                                                                        route={
                                                                            route
                                                                        }
                                                                        fieldMap={
                                                                            fieldMap
                                                                        }
                                                                        callbacks={
                                                                            callbacks
                                                                        }
                                                                        disabled={
                                                                            disabled
                                                                        }
                                                                        readOnly={
                                                                            readOnly
                                                                        }
                                                                        onRoot={
                                                                            onRoot
                                                                        }
                                                                        renderField={
                                                                            renderField
                                                                        }
                                                                    />
                                                                </div>

                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="mt-1"
                                                                    disabled={
                                                                        disabled ||
                                                                        readOnly
                                                                    }
                                                                    onClick={() => {
                                                                        if (
                                                                            disabled ||
                                                                            readOnly
                                                                        )
                                                                            return;

                                                                        const nextArr =
                                                                            items.filter(
                                                                                (
                                                                                    _,
                                                                                    idx2,
                                                                                ) =>
                                                                                    idx2 !==
                                                                                    i,
                                                                            );
                                                                        const nextRoot =
                                                                            setAtPath(
                                                                                root,
                                                                                arrPath,
                                                                                nextArr,
                                                                            ) as JsonObject;

                                                                        onRoot(
                                                                            nextRoot,
                                                                        );
                                                                        callbacks?.onDelete?.(
                                                                            nextRoot,
                                                                            metaForPath(
                                                                                "delete",
                                                                                route,
                                                                                itemPath,
                                                                            ),
                                                                        );
                                                                    }}
                                                                >
                                                                    ×
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="border-dashed"
                                                        disabled={
                                                            disabled || readOnly
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                disabled ||
                                                                readOnly
                                                            )
                                                                return;

                                                            const nextIndex =
                                                                items.length;
                                                            const nextArr = [
                                                                ...items,
                                                                "",
                                                            ];
                                                            const nextRoot =
                                                                setAtPath(
                                                                    root,
                                                                    arrPath,
                                                                    nextArr,
                                                                ) as JsonObject;

                                                            onRoot(nextRoot);
                                                            callbacks?.onAdd?.(
                                                                nextRoot,
                                                                metaForPath(
                                                                    "add",
                                                                    route,
                                                                    `${arrPath}.${nextIndex}`,
                                                                ),
                                                            );
                                                        }}
                                                    >
                                                        + Add Item
                                                    </Button>
                                                </div>
                                            </div>
                                        </SectionCard>
                                    );
                                }

                                return (
                                    <PrimitiveField
                                        key={path}
                                        root={root}
                                        path={path}
                                        route={route}
                                        fieldMap={fieldMap}
                                        callbacks={callbacks}
                                        disabled={disabled}
                                        readOnly={readOnly}
                                        onRoot={onRoot}
                                        renderField={renderField}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {defaults?.values ? null : null}
        </div>
    );
}

export default JsonEditorMain;
