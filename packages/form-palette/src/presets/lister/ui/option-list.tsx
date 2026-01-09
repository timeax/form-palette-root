// OptionList (react-virtuoso, variable height, no forwardRef components)

import * as React from "react";
import { Virtuoso } from "react-virtuoso";

import {
    ListerId,
    ListerOption,
    ListerSessionId,
    useLister,
} from "@/presets/lister";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type AnyPresetMap = any;

// ─────────────────────────────────────────────
// Icon helpers (opt.icon)
// ─────────────────────────────────────────────

function isSvgSnippetString(v: any): v is string {
    if (typeof v !== "string") return false;
    const s = v.trim();
    return s.startsWith("<svg") || (s.includes("<svg") && s.includes("</svg>"));
}

function isUrlishString(v: any): v is string {
    if (typeof v !== "string") return false;
    const s = v.trim();
    return (
        s.startsWith("http://") ||
        s.startsWith("https://") ||
        s.startsWith("data:image/") ||
        s.startsWith("/") ||
        s.startsWith("./") ||
        s.startsWith("../")
    );
}

function isIconifyNameString(v: any): v is string {
    if (typeof v !== "string") return false;
    const s = v.trim();
    return s.includes(":") && !s.includes("/") && !s.includes("<");
}

function normalizeIconifyInput(icon: any): any | null {
    if (icon == null) return null;
    if (typeof icon === "string")
        return isIconifyNameString(icon) ? { icon } : null;
    if (typeof icon === "object") {
        if (typeof (icon as any).icon === "string") return icon;
    }
    return null;
}

function OptionIcon(props: { icon: any; className?: string }) {
    const { icon, className } = props;

    if (React.isValidElement(icon)) {
        return <span className={cn("shrink-0", className)}>{icon}</span>;
    }

    if (isSvgSnippetString(icon)) {
        return (
            <span
                className={cn(
                    "shrink-0 inline-flex [&_svg]:h-4 [&_svg]:w-4",
                    className,
                )}
                aria-hidden
                dangerouslySetInnerHTML={{ __html: icon }}
            />
        );
    }

    if (isUrlishString(icon)) {
        return (
            <img
                src={icon}
                alt=""
                aria-hidden
                className={cn("shrink-0 h-4 w-4 object-contain", className)}
            />
        );
    }

    const iconify = normalizeIconifyInput(icon);
    if (iconify) {
        const name = iconify.icon as string;

        // Optional: if you expose @iconify/react somewhere globally
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const IconifyReact = (globalThis as any)?.IconifyReactIcon;

        if (IconifyReact) {
            return (
                <span
                    className={cn("shrink-0 inline-flex", className)}
                    aria-hidden
                >
                    <IconifyReact {...iconify} className="h-4 w-4" />
                </span>
            );
        }

        return (
            <span className={cn("shrink-0 inline-flex", className)} aria-hidden>
                <span className="iconify h-4 w-4" data-icon={name} />
            </span>
        );
    }

    return null;
}

// ─────────────────────────────────────────────
// OptionList (Virtuoso)
// ─────────────────────────────────────────────

export function OptionList(props: { id: ListerSessionId; className?: string }) {
    const { id, className } = props;

    const { state, actions, selectors } = useLister<AnyPresetMap>();
    const s = (state.sessions as any)[id] as any;

    const options: Array<ListerOption<any, any, any>> =
        (selectors.visibleOptions(id) as any[]) ?? [];

    const draft = s?.draftValue;
    const isMulti = s?.mode === "multiple";

    const isSelected = React.useCallback(
        (value: ListerId) => {
            if (isMulti) return Array.isArray(draft) && draft.includes(value);
            return draft === value;
        },
        [draft, isMulti],
    );

    if (s?.errorCode) {
        return (
            <div className={cn("h-full min-h-0 overflow-y-auto", className)}>
                <div className="px-3 py-4 text-sm opacity-70">
                    Error: {String(s.errorCode)}
                </div>
            </div>
        );
    }

    if (s?.loading && !s?.optionsList?.length) {
        return (
            <div className={cn("h-full min-h-0 overflow-y-auto", className)}>
                <div className="px-3 py-4 text-sm opacity-70">Loading…</div>
            </div>
        );
    }

    if (!options.length) {
        return (
            <div className={cn("h-full min-h-0 overflow-y-auto", className)}>
                <div className="px-3 py-4 text-sm opacity-70">No results</div>
            </div>
        );
    }

    return (
        <div className={cn("h-full min-h-0 overflow-hidden", className)}>
            <div className="h-full min-h-0 p-1">
                <Virtuoso
                    style={{ height: "100%", minHeight: 0 }}
                    data={options}
                    increaseViewportBy={{ top: 400, bottom: 400 }}
                    computeItemKey={(index, opt) =>
                        String((opt as any)?.value ?? index)
                    }
                    itemContent={(_index, opt) => {
                        const selected = isSelected(opt.value as any);
                        const disabled = !!opt.disabled;

                        const onClick = () => {
                            if (disabled) return;
                            actions.toggle(id, opt.value as any);
                        };

                        // space-y-1 equivalent
                        return (
                            <div className="py-1">
                                <button
                                    type="button"
                                    onMouseDown={() => actions.focus(id)}
                                    onClick={onClick}
                                    disabled={disabled}
                                    className={cn(
                                        "flex w-full items-start gap-2 rounded-sm px-3 py-2 text-left",
                                        "transition hover:bg-muted/60",
                                        selected && "bg-muted",
                                        disabled &&
                                            "cursor-not-allowed opacity-50",
                                    )}
                                >
                                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                                        {selected ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <span className="h-4 w-4" />
                                        )}
                                    </div>

                                    {opt.icon ? (
                                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center opacity-80">
                                            <OptionIcon icon={opt.icon} />
                                        </div>
                                    ) : null}

                                    <div className="min-w-0 flex-1">
                                        <div className="truncate text-sm font-medium">
                                            {opt.label ?? String(opt.value)}
                                        </div>
                                        {opt.description ? (
                                            <div className="line-clamp-2 text-xs opacity-70">
                                                {opt.description}
                                            </div>
                                        ) : null}
                                    </div>

                                    {opt.group ? (
                                        <div className="shrink-0 text-xs opacity-50">
                                            {opt.group}
                                        </div>
                                    ) : null}
                                </button>
                            </div>
                        );
                    }}
                />
            </div>
        </div>
    );
}
