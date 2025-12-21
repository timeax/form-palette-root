// src/lib/json-editor/tree.ts
export function getDirectChildPaths(
    parent: string,
    allPaths: string[]
): string[] {
    const prefix = parent ? parent + "." : "";
    return allPaths.filter((p) => {
        if (!p.startsWith(prefix)) return false;
        const rest = parent ? p.slice(prefix.length) : p;
        return rest.length > 0 && !rest.includes("."); // direct child only
    });
}
