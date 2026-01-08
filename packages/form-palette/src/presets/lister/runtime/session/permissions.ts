// packages/form-palette/src/presets/lister/runtime/session/permissions.ts

import type { ListerPermissionCtx, ListerProviderHost } from "../../types";

function stripBang(p: string) {
    return p.endsWith("!") ? p.slice(0, -1) : p;
}

function isMandatory(p: string) {
    return p.endsWith("!");
}

/**
 * Semantics:
 * - mandatory permissions (ending with "!") => all must pass
 * - optional permissions => if any exist, at least one must pass
 * - none => allow
 */
export function canOpenLister(
    host: ListerProviderHost,
    permissions: string[] | undefined,
    ctx: ListerPermissionCtx,
): boolean {
    if (!permissions || permissions.length === 0) return true;

    const mandatory = permissions.filter(isMandatory).map(stripBang);
    const optional = permissions.filter((p) => !isMandatory(p)).map(stripBang);

    for (const perm of mandatory) {
        if (!host.can([perm], ctx)) return false;
    }

    if (optional.length > 0) {
        return optional.some((perm) => host.can([perm], ctx));
    }

    return true;
}
