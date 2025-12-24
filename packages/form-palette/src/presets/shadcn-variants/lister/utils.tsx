// resources/js/presets/shadcn-variants/lister/utils.tsx
import * as React from "react";
import type { ListerMode, ListerProviderHost } from "@/presets/lister/types";
import type { KeyOrFn } from "./types";

/* ─────────────────────────────────────────────────────────────
 * pick + equality
 * ───────────────────────────────────────────────────────────── */

function pick<TRaw extends Record<string, any>, TOut, TCtx = any>(
    raw: TRaw,
    keyOrFn: KeyOrFn<TRaw, TOut, TCtx> | undefined,
    ctx: TCtx,
): TOut | undefined {
    if (!keyOrFn) return undefined;
    if (typeof keyOrFn === "function") return keyOrFn(raw, ctx);
    return raw?.[keyOrFn] as TOut;
}

function isSameValue(a: any, b: any) {
    if (a === b) return true;
    const aa = Array.isArray(a);
    const bb = Array.isArray(b);
    if (aa !== bb) return false;
    if (aa && bb) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
        return true;
    }
    return false;
}

/* ─────────────────────────────────────────────────────────────
 * optionValue inference helpers (inline endpoint mode)
 * ───────────────────────────────────────────────────────────── */

function isScalarIdLike(v: any) {
    const t = typeof v;
    if (t !== "string" && t !== "number") return false;
    return !(t === "string" && v.trim() === "");
}

function uniqRatio(values: any[]) {
    const filtered = values.filter((v) => v != null && v !== "");
    if (!filtered.length) return 0;
    const set = new Set(
        filtered.map((v) => (typeof v === "string" ? v.trim() : v)),
    );
    return set.size / filtered.length;
}

function scoreKey(key: string, presence: number, uniq: number) {
    const k = key.toLowerCase();

    let bonus = 0;
    if (k === "id") bonus += 10;
    if (k === "_id") bonus += 7;
    if (k.includes("uuid")) bonus += 7;
    if (k.includes("slug")) bonus += 5;
    if (k.includes("code")) bonus += 4;
    if (k.includes("key")) bonus += 3;
    if (k.endsWith("id") && k !== "id") bonus += 4;

    if (k.includes("name") || k.includes("title") || k.includes("label")) {
        bonus -= 2;
    }

    const base = presence * 4 + uniq * 10;
    return base + bonus;
}

function inferOptionValueKeyFromRawList(rawList: any[], fallback = "id") {
    const sample = Array.isArray(rawList) ? rawList.slice(0, 10) : [];
    if (!sample.length) return { key: fallback, inferred: false };

    const common = ["id", "value", "key", "uuid", "slug", "_id", "code"];
    for (const k of common) {
        const vals = sample.map((r) => r?.[k]).filter(isScalarIdLike);
        const presence = vals.length / sample.length;
        const uniq = uniqRatio(vals);
        if (presence >= 0.9 && uniq >= 0.95) return { key: k, inferred: true };
    }

    const keys = new Set<string>();
    for (const r of sample) {
        if (!r || typeof r !== "object") continue;
        for (const k of Object.keys(r)) keys.add(k);
    }

    let bestKey = fallback;
    let bestScore = -Infinity;
    let bestPresence = 0;
    let bestUniq = 0;

    for (const k of keys) {
        const vals = sample.map((r) => r?.[k]).filter(isScalarIdLike);
        const presence = vals.length / sample.length;
        if (presence < 0.7) continue;

        const uniq = uniqRatio(vals);
        const score = scoreKey(k, presence, uniq);

        if (score > bestScore) {
            bestScore = score;
            bestKey = k;
            bestPresence = presence;
            bestUniq = uniq;
        }
    }

    if (bestPresence >= 0.9 && bestUniq >= 0.95) {
        return { key: bestKey, inferred: true };
    }

    return { key: fallback, inferred: false };
}

/* ─────────────────────────────────────────────────────────────
 * Trigger display
 * ───────────────────────────────────────────────────────────── */

function buildLabelsFromOptions(args: {
    mode: ListerMode;
    value: any;
    selectedOptions: any[] | null;
    placeholder: string;
    maxItems: number;
}) {
    const { mode, value, selectedOptions, placeholder, maxItems } = args;

    const labelFor = (opt: any) =>
        String(
            opt?.label ??
                opt?.meta?.label ??
                opt?.title ??
                opt?.name ??
                opt?.value ??
                "",
        ).trim();

    const labels = (() => {
        if (mode === "multiple") {
            const arr = Array.isArray(value) ? value : [];
            const map = new Map<any, string>();
            for (const o of selectedOptions ?? []) {
                if (o?.value == null) continue;
                const lbl = labelFor(o);
                if (lbl) map.set(o.value, lbl);
            }
            return arr.map((v) => map.get(v) ?? String(v));
        }

        if (value == null || value === "") return [];
        const opt = selectedOptions;
        const lbl = opt ? labelFor(opt) : "";
        return [lbl || String(value)];
    })();

    if (!labels.length) {
        return <span className="text-muted-foreground">{placeholder}</span>;
    }

    if (mode !== "multiple") {
        return <span className="truncate">{labels[0]}</span>;
    }

    const shown = labels.slice(0, Math.max(1, maxItems));
    const remaining = labels.length - shown.length;

    return (
        <span className="truncate">
            {shown.join(", ")}
            {remaining > 0 ? ` ..${remaining} more` : ""}
        </span>
    );
}

/* ─────────────────────────────────────────────────────────────
 * Defaults
 * ───────────────────────────────────────────────────────────── */

const defaultHost: ListerProviderHost = {
    can: () => true,
    log: () => {},
};

export {
    pick,
    isSameValue,
    inferOptionValueKeyFromRawList,
    buildLabelsFromOptions,
    defaultHost,
};
