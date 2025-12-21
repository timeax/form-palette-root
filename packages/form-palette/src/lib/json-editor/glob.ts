// src/lib/json-editor/glob.ts
import type { JsonPath, JsonWildcard } from "./types";

/* ─────────────────────────────────────────────────────────────
 * Tiny helpers
 * ───────────────────────────────────────────────────────────── */

export function splitPath(path: JsonPath): string[] {
    if (!path) return [];
    return path.split(".").filter(Boolean);
}

export function lastSegment(path: JsonPath): string {
    const segs = splitPath(path);
    return segs[segs.length - 1] ?? "";
}

/**
 * Escapes regex special chars except '*'
 */
function escapeRegexExceptStar(input: string): string {
    return input.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
}

function segmentGlobToRegex(pattern: string): RegExp {
    // segment-level glob: "*" means "any chars" (including empty)
    const src = "^" + escapeRegexExceptStar(pattern).replace(/\*/g, ".*") + "$";
    return new RegExp(src, "i");
}

export function matchSegment(pattern: string, segment: string): boolean {
    return segmentGlobToRegex(pattern).test(segment);
}

/* ─────────────────────────────────────────────────────────────
 * matchPath(pattern, path)
 *
 * Supports:
 * - "*api*"     (segment glob; default matches leaf key if no dots)
 * - "config.*"  (one segment)
 * - "config.**" (subtree)
 * - "**.*token*" (any depth)
 *
 * Semantics:
 * - If pattern contains '.' or '**' → match against the full path segments.
 * - Else → match against the leaf segment only.
 * ───────────────────────────────────────────────────────────── */

export function matchPath(pattern: JsonWildcard, path: JsonPath): boolean {
    const pat = (pattern ?? "").trim();
    if (!pat) return path === "";

    const pHasDot = pat.includes(".");
    const pHasDeep = pat.includes("**");

    const targetSegs = splitPath(path);

    // leaf-only matcher (no dots / deep)
    if (!pHasDot && !pHasDeep) {
        const leaf = targetSegs[targetSegs.length - 1] ?? "";
        return matchSegment(pat, leaf);
    }

    const patSegs = splitPath(pat);

    // backtracking matcher for ** (tiny; routes are small)
    function walk(pi: number, ti: number): boolean {
        while (pi < patSegs.length) {
            const seg = patSegs[pi];

            if (seg === "**") {
                // '**' matches zero or more segments
                if (pi === patSegs.length - 1) return true; // trailing '**' matches rest
                for (let k = ti; k <= targetSegs.length; k++) {
                    if (walk(pi + 1, k)) return true;
                }
                return false;
            }

            if (ti >= targetSegs.length) return false;

            // normal segment: can include '*' wildcards inside the segment
            if (!matchSegment(seg, targetSegs[ti])) return false;

            pi++;
            ti++;
        }

        return ti === targetSegs.length;
    }

    return walk(0, 0);
}

/* ─────────────────────────────────────────────────────────────
 * Specificity scoring for "best match wins"
 * (higher score = more specific)
 * ───────────────────────────────────────────────────────────── */

export function scoreMatch(pattern: JsonWildcard, path: JsonPath): number {
    if (!matchPath(pattern, path)) return -1;

    const pat = (pattern ?? "").trim();
    if (pat === path) return 10_000;

    const patSegs = splitPath(pat);
    const pathSegs = splitPath(path);

    // More segments + fewer wildcards => higher
    const segCountScore = patSegs.length * 100;

    // Character specificity: count non-wildcard chars
    const nonWildChars = pat.replace(/\*/g, "").replace(/\./g, "").length;

    // Penalize wildcards
    const starCount = (pat.match(/\*/g) ?? []).length;
    const deepCount = (pat.match(/\*\*/g) ?? []).length;

    // Reward closeness: deeper references tend to be more specific
    const depthCloseness = Math.min(patSegs.length, pathSegs.length) * 10;

    return (
        segCountScore +
        nonWildChars * 5 +
        depthCloseness -
        starCount * 15 -
        deepCount * 200
    );
}

/* ─────────────────────────────────────────────────────────────
 * pickBest(map, path)
 * Returns the best matching key and its value
 * ───────────────────────────────────────────────────────────── */

export function pickBest<T>(
    map: Record<JsonWildcard, T> | undefined,
    path: JsonPath
): { pattern: JsonWildcard; value: T } | null {
    if (!map) return null;

    let best: { pattern: JsonWildcard; value: T; score: number } | null = null;

    for (const [pattern, value] of Object.entries(map)) {
        const s = scoreMatch(pattern, path);
        if (s < 0) continue;
        if (!best || s > best.score) best = { pattern, value, score: s };
    }

    return best ? { pattern: best.pattern, value: best.value } : null;
}

/**
 * Compatibility with the old `pickBestMatch(path, rules)` signature.
 * Returns the best matching value (or undefined).
 */
export function pickBestMatch<T>(
    path: JsonPath,
    rules: Array<[JsonWildcard, T]>
): T | undefined {
    let best: { score: number; value: T } | undefined;

    for (const [pattern, value] of rules) {
        const s = scoreMatch(pattern, path);
        if (s < 0) continue;
        if (!best || s > best.score) best = { score: s, value };
    }

    return best?.value;
}
