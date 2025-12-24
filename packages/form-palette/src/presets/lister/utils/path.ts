// resources/js/context/lister/utils/path.ts

/**
 * Very small dot-path getter.
 * Supports:
 * - "a.b.c"
 * - ".a.b" (leading dot ok)
 * - "a[0].b" (basic bracket index)
 */
export function getPath(obj: any, path: string): any {
    if (!path) return obj;
    let p = path.trim();
    if (p.startsWith('.')) p = p.slice(1);

    // convert bracket notation into dots: a[0].b -> a.0.b
    p = p.replace(/\[(\d+)\]/g, '.$1');

    const parts = p.split('.').filter(Boolean);
    let cur: any = obj;

    for (const key of parts) {
        if (cur == null) return undefined;
        cur = cur[key as any];
    }

    return cur;
}
