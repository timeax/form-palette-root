// packages/form-palette/src/presets/lister/ui/search.tsx

import * as React from "react";
import { InputField } from "@/input/input-field";
import {
    MapPin,
    Search,
    Globe as FaGlobeAmericas,
    SlidersHorizontal,
} from "lucide-react";

import type {
    ListerSearchPayload,
    ListerSearchTarget,
    ListerSessionId,
    ListerStoreState,
} from "@/presets/lister/types";

import { useLister } from "@/presets/lister";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { Input } from "@/presets/ui/input";
import { Button } from "@/presets/ui/button";

// ✅ NEW: use our custom filter UI button
import { ListerFiltersButton } from "./filter-ui";

type AnyPresetMap = any;

type FilterValue = string | number;

function asArray(v: any): FilterValue[] {
    if (v == null) return [];
    return Array.isArray(v) ? (v as FilterValue[]) : ([v] as FilterValue[]);
}

/**
 * Search bar + trailing controls:
 * - Search target (all/subject/only) popover (leading control)
 * - Search mode toggle (remote/local/hybrid)
 * - Filters UI (custom popover button)
 *
 * Notes:
 * - Search mode is bound to session.searchMode via actions.setSearchMode(id, mode)
 * - Search target is bound to session.searchTarget via actions.setSearchTarget(id, target)
 * - Filters live in session.filtersSpec?.options and session.selectedFilterValues
 */
export function SearchBar(props: {
    id: ListerSessionId;
    store: ListerStoreState;
}) {
    const { id, store } = props;
    const { actions } = useLister<AnyPresetMap>();

    const session = store.sessions[id] as any;

    const searchMode: "local" | "remote" | "hybrid" = (session?.searchMode ??
        "remote") as any;

    const query = session?.query ?? "";

    const hasFilters = !!session?.filtersSpec?.options?.length;

    // Spec coming from your ListerDefinition.search
    const searchSpec = session?.searchSpec as
        | undefined
        | {
              subjects?: readonly string[];
              only?: readonly string[];
              allowAll?: boolean;
              allowCustomSubject?: boolean;
              allowCustomOnly?: boolean;
              default?: string;
          };

    const specSubjects = (searchSpec?.subjects ?? []) as string[];
    const specOnly = (searchSpec?.only ?? []) as string[];
    const allowAll = !!searchSpec?.allowAll;
    const allowCustomSubject = !!searchSpec?.allowCustomSubject;
    const allowCustomOnly = !!searchSpec?.allowCustomOnly;

    // persisted target (like searchMode)
    const target: ListerSearchTarget =
        (session?.searchTarget as any) ??
        (searchSpec?.default
            ? { mode: "subject", subject: searchSpec.default }
            : allowAll
              ? { mode: "all" }
              : { mode: "subject", subject: specSubjects[0] ?? null });

    // UI helper: when subject is not in the list, treat as "custom"
    const subjectValue = (target?.subject ?? "") as string;
    const isCustomSubject =
        !!subjectValue &&
        specSubjects.length > 0 &&
        !specSubjects.includes(subjectValue);

    const subjectSelectValue =
        isCustomSubject && allowCustomSubject ? "__custom__" : subjectValue;

    const onlyValue = asArray(target?.only);

    const buildSearchPayload = (t: ListerSearchTarget): ListerSearchPayload => {
        if (t.mode === "all") return { searchAll: true };

        if (t.mode === "only") {
            const only = asArray(t.only)
                .map((x) => String(x).trim())
                .filter(Boolean);

            return only.length ? { searchOnly: only } : {};
        }

        const subject = (t.subject ?? "").trim();
        return subject ? { subject } : {};
    };

    /**
     * IMPORTANT:
     * - remote => call searchRemote (provider debounces + fetches)
     * - local  => call searchLocal (no fetch)
     * - hybrid => call searchLocal ONLY (provider's hybrid logic schedules remote fetch)
     */
    const runSearch = (mode: "local" | "remote" | "hybrid", q: string) => {
        const latestTarget = ((store.sessions[id] as any)?.searchTarget ??
            target) as ListerSearchTarget;

        const payload = buildSearchPayload(latestTarget);

        if (mode === "remote") return actions.searchRemote(id, q, payload);
        if (mode === "local") return actions.searchLocal(id, q, payload);

        // hybrid: local now, remote is scheduled by provider
        return actions.searchLocal(id, q, payload);
    };

    const onQueryChange = (q: string) => {
        runSearch(searchMode, q);
    };

    const onSearchModeChange = (mode: "local" | "remote" | "hybrid") => {
        actions.setSearchMode(id, mode);

        // make behavior feel immediate when switching
        queueMicrotask(() => {
            const s = (store.sessions[id] as any) ?? session;
            const q = s?.query ?? "";
            runSearch(mode, q);
        });
    };

    const commitSearchTarget = (next: ListerSearchTarget) => {
        // Provider will persist it and (for remote/hybrid) schedule a refetch based on session.searchTarget
        actions.setSearchTarget(id, next);

        // For local mode, "refetch" isn't a thing, but we still want the UI to feel immediate.
        if (searchMode === "local") {
            queueMicrotask(() => {
                const s = (store.sessions[id] as any) ?? session;
                const q = s?.query ?? "";
                runSearch("local", q);
            });
        }
    };

    const hasSearchTargetUI =
        !!searchSpec &&
        (allowAll ||
            specSubjects.length > 0 ||
            specOnly.length > 0 ||
            allowCustomSubject);


    return (
        <div className="px-3 py-2" onMouseDown={() => actions.focus(id)}>
            <Input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder={
                    searchMode === "local"
                        ? "Search…"
                        : searchMode === "hybrid"
                          ? "Search (hybrid)…"
                          : "Search (remote)…"
                }
                icon={<Search className="h-4 w-4" />}
                leadingControl={
                    hasSearchTargetUI ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    title="Search target"
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent align="start" className="w-80 p-3">
                                <div className="space-y-3">
                                    <div className="text-xs opacity-70">
                                        Search target
                                    </div>

                                    <InputField
                                        variant="select"
                                        mode="button"
                                        value={target.mode}
                                        options={[
                                            ...(allowAll
                                                ? [
                                                      {
                                                          label: "All",
                                                          value: "all",
                                                      },
                                                  ]
                                                : []),
                                            {
                                                label: "Subject",
                                                value: "subject",
                                            },
                                            { label: "Only", value: "only" },
                                        ]}
                                        onChange={(e: any) => {
                                            const mode =
                                                e?.value as ListerSearchTarget["mode"];

                                            if (mode === "all") {
                                                commitSearchTarget({
                                                    mode: "all",
                                                });
                                                return;
                                            }

                                            if (mode === "only") {
                                                commitSearchTarget({
                                                    mode: "only",
                                                    only: onlyValue.length
                                                        ? onlyValue
                                                        : specOnly.length
                                                          ? [specOnly[0]]
                                                          : [],
                                                });
                                                return;
                                            }

                                            commitSearchTarget({
                                                mode: "subject",
                                                subject:
                                                    subjectValue ||
                                                    searchSpec?.default ||
                                                    specSubjects[0] ||
                                                    null,
                                            });
                                        }}
                                    />

                                    {target.mode === "subject" ? (
                                        <div className="space-y-2">
                                            {specSubjects.length ? (
                                                <InputField
                                                    variant="select"
                                                    mode="button"
                                                    value={subjectSelectValue}
                                                    options={[
                                                        ...specSubjects.map(
                                                            (c) => ({
                                                                label: c,
                                                                value: c,
                                                            }),
                                                        ),
                                                        ...(allowCustomSubject
                                                            ? [
                                                                  {
                                                                      label: "Custom…",
                                                                      value: "__custom__",
                                                                  },
                                                              ]
                                                            : []),
                                                    ]}
                                                    onChange={(e: any) => {
                                                        const v =
                                                            e?.value as string;

                                                        if (
                                                            v === "__custom__"
                                                        ) {
                                                            commitSearchTarget({
                                                                mode: "subject",
                                                                subject:
                                                                    subjectValue ||
                                                                    "",
                                                            });
                                                            return;
                                                        }

                                                        commitSearchTarget({
                                                            mode: "subject",
                                                            subject: v,
                                                        });
                                                    }}
                                                />
                                            ) : null}

                                            {allowCustomSubject &&
                                            subjectSelectValue ===
                                                "__custom__" ? (
                                                <div className="space-y-1">
                                                    <div className="text-xs opacity-70">
                                                        Custom column
                                                    </div>
                                                    <input
                                                        value={subjectValue}
                                                        onChange={(e) =>
                                                            commitSearchTarget({
                                                                mode: "subject",
                                                                subject:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        placeholder="e.g. email"
                                                        className="h-9 w-full rounded-md border px-3 text-sm"
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}

                                    {target.mode === "only" ? (
                                        <div className="space-y-2">
                                            <InputField
                                                variant="multi-select"
                                                mode="button"
                                                value={onlyValue as any}
                                                options={specOnly.map((c) => ({
                                                    label: c,
                                                    value: c,
                                                }))}
                                                onChange={(e: any) =>
                                                    commitSearchTarget({
                                                        mode: "only",
                                                        only: asArray(e?.value),
                                                    })
                                                }
                                            />

                                            {allowCustomOnly ? (
                                                <div className="space-y-1">
                                                    <div className="text-xs opacity-70">
                                                        Add custom column
                                                    </div>
                                                    <input
                                                        placeholder="type column + Enter"
                                                        className="h-9 w-full rounded-md border px-3 text-sm"
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key !==
                                                                "Enter"
                                                            )
                                                                return;

                                                            const v = (
                                                                e.currentTarget
                                                                    .value ?? ""
                                                            ).trim();
                                                            if (!v) return;

                                                            e.preventDefault();

                                                            const next =
                                                                Array.from(
                                                                    new Set([
                                                                        ...onlyValue.map(
                                                                            String,
                                                                        ),
                                                                        v,
                                                                    ]),
                                                                );

                                                            e.currentTarget.value =
                                                                "";

                                                            commitSearchTarget({
                                                                mode: "only",
                                                                only: next,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}
                                </div>
                            </PopoverContent>
                        </Popover>
                    ) : null
                }
                trailingControl={
                    <div className="flex items-center gap-2">
                        <InputField
                            variant="select"
                            mode="button"
                            defaultValue={searchMode}
                            triggerClassName={'border-none ring-0 shadow-none! px-1! cursor-pointer'}
                            options={[
                                {
                                    label: "Remote search",
                                    value: "remote",
                                    icon: (
                                        <FaGlobeAmericas className="size-3" />
                                    ),
                                },
                                {
                                    label: "Local search",
                                    value: "local",
                                    icon: <MapPin className="size-3" />,
                                },
                                {
                                    label: "Hybrid search",
                                    value: "hybrid",
                                    icon: (
                                        <FaGlobeAmericas className="size-3" />
                                    ),
                                },
                            ]}
                            onChange={(e: any) => onSearchModeChange(e?.value)}
                        />

                        {/* ✅ NEW: filters UI */}
                        {hasFilters ? (
                            <ListerFiltersButton id={id} store={store} />
                        ) : null}
                    </div>
                }
            />
        </div>
    );
}
