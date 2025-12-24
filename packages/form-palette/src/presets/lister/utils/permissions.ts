// resources/js/context/lister/utils/permissions.ts

import type { ListerPermissionCtx, ListerProviderHost } from '../types';

function stripBang(p: string) {
    return p.endsWith('!') ? p.slice(0, -1) : p;
}

function isMandatory(p: string) {
    return p.endsWith('!');
}

/**
 * Provider-side evaluation using host.can(...) as a primitive check.
 * We call host.can([perm], ctx) per entry so we can enforce:
 * - all mandatory pass
 * - if any optional exist, at least one optional passes
 */
export function evaluatePermissions(host: ListerProviderHost, entries: string[] | undefined, ctx: ListerPermissionCtx): boolean {
    if (!entries || entries.length === 0) return true;

    const mandatory = entries.filter(isMandatory).map(stripBang);
    const optional = entries.filter((p) => !isMandatory(p)).map(stripBang);

    for (const perm of mandatory) {
        if (!host.can([perm], ctx)) return false;
    }

    if (optional.length > 0) {
        return optional.some((perm) => host.can([perm], ctx));
    }

    return true;
}
