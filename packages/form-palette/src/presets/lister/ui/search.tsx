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
    ListerSearchTarget,
    ListerSessionId,
    ListerStoreState,
} from "@/presets/lister/types";

import { useLister } from "@/presets/lister";
import { Popover, PopoverContent, PopoverTrigger } from "@/presets/ui/popover";
import { Input } from "@/presets/ui/input";
import { Button } from "@/presets/ui/button";

import { ListerFiltersButton } from "./filter-ui";

type AnyPresetMap = any;
type FilterValue = string | number;

function asArray(v: any): FilterValue[] {
    if (v == null) return [];
    return Array.isArray(v) ? (v as FilterValue[]) : ([v] as FilterValue[]);
}

/**
 * Search bar + trailing controls:
 * - Search target popover (all/subject/only)
 * - Search mode toggle (remote/local/hybrid)
 * - Filters button
 *
 * Runtime responsibilities:
 * - actions.setQuery schedules remote refresh for remote/hybrid; local doesn't fetch
 * - actions.setSearchTarget schedules remote refresh for remote/hybrid
 * - selectors.visibleOptions handles local/hybrid client filtering
 */
export function SearchBar(props: {
    id: ListerSessionId;
    store?: ListerStoreState;
}) {
    const { id } = props;

    const { actions, state } = useLister<AnyPresetMap>();
    const store = (props.store ?? (state as any)) as ListerStoreState;

    const session = (store.sessions as any)?.[id] as any;
    if (!session) return null;

    const searchMode: "local" | "remote" | "hybrid" = (session.searchMode ??
        "remote") as any;
    const query = String(session.query ?? "");

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

    // Persisted target, with sane defaults
    const target: ListerSearchTarget =
        (session?.searchTarget as any) ??
        (searchSpec?.default
            ? { mode: "subject", subject: searchSpec.default }
            : allowAll
              ? { mode: "all" }
              : { mode: "subject", subject: specSubjects[0] ?? null });

    const subjectValue = String((target as any)?.subject ?? "");
    const isCustomSubject =
        !!subjectValue &&
        specSubjects.length > 0 &&
        !specSubjects.includes(subjectValue);

    const subjectSelectValue =
        isCustomSubject && allowCustomSubject ? "__custom__" : subjectValue;

    const onlyValue = asArray((target as any)?.only);

    const commitSearchTarget = (next: ListerSearchTarget) => {
        actions.setSearchTarget(id, next);

        // local/hybrid UI should feel immediate; state change triggers re-render anyway
        if (searchMode === "local") {
            queueMicrotask(() => {
                // no fetch needed; visibleOptions should respect target+query if selector does
                // (see note below)
            });
        }
    };

    const onQueryChange = (q: string) => {
        actions.setQuery(id, q);
    };

    const onSearchModeChange = (mode: "local" | "remote" | "hybrid") => {
        // runtime should expose this; keep call flexible until you add it
        actions.setSearchMode(id, mode);

        // make switching feel immediate for remote/hybrid
        queueMicrotask(() => {
            if (mode === "remote" || mode === "hybrid") actions.refresh(id);
            // local: no fetch
        });
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

                            <PopoverContent className="w-80 p-3">
                                <div className="space-y-3">
                                    <div className="text-xs opacity-70">
                                        Search target
                                    </div>

                                    <InputField
                                        variant="select"
                                        mode="button"
                                        value={(target as any).mode}
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
                                                } as any);
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
                                                } as any);
                                                return;
                                            }

                                            commitSearchTarget({
                                                mode: "subject",
                                                subject:
                                                    subjectValue ||
                                                    searchSpec?.default ||
                                                    specSubjects[0] ||
                                                    null,
                                            } as any);
                                        }}
                                    />

                                    {(target as any).mode === "subject" ? (
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
                                                            } as any);
                                                            return;
                                                        }

                                                        commitSearchTarget({
                                                            mode: "subject",
                                                            subject: v,
                                                        } as any);
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
                                                            } as any)
                                                        }
                                                        placeholder="e.g. email"
                                                        className="h-9 w-full rounded-md border px-3 text-sm"
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    ) : null}

                                    {(target as any).mode === "only" ? (
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
                                                    } as any)
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
                                                            } as any);
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
                            value={searchMode}
                            triggerClassName="border-none ring-0 shadow-none! px-1! cursor-pointer"
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
                            onChange={(e: any) =>
                                onSearchModeChange(e?.value as any)
                            }
                        />

                        {hasFilters ? (
                            <ListerFiltersButton id={id} store={store} />
                        ) : null}
                    </div>
                }
            />
        </div>
    );
}
