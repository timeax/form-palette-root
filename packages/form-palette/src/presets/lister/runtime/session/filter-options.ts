import type { ListerFilterApply, ListerFilterOption } from "../../types";

export type ResolvedFilterNode<TFilters> = {
    id: string;
    option: ListerFilterOption<TFilters>;
    kind: "group" | "value" | "input";
    disabled?: boolean;

    /** resolved (inherited) */
    bindKey?: string;

    /** for kind="value" */
    dbValue?: any;

    apply?: ListerFilterApply<TFilters, any>;
};

function hasExplicitId(opt: any): boolean {
    return opt != null && opt.id != null;
}

function getOptId(opt: any): string | number {
    if (opt?.id != null) return opt.id;
    if (opt?.value != null) return opt.value;
    if (opt?.label != null) return String(opt.label);
    return "node";
}

function getNodeId<TFilters>(
    opt: ListerFilterOption<TFilters>,
    parentNodeId?: string,
): string {
    if (hasExplicitId(opt)) return String((opt as any).id);

    const base = String(getOptId(opt as any));
    return parentNodeId ? `${parentNodeId}.${base}` : base;
}

function getOptKind(opt: any): "group" | "value" | "input" {
    return (opt?.kind ?? "group") as any;
}

function getOptDisabled(opt: any): boolean {
    return Boolean(opt?.disabled);
}

function getOptApply<TFilters>(opt: ListerFilterOption<TFilters>) {
    return (opt as any)?.apply as ListerFilterApply<TFilters, any> | undefined;
}

function getOptDbValue(opt: any) {
    return opt?.value;
}

/**
 * Index options by node id and resolve inherited bindKey.
 */
export function indexFilterOptions<TFilters>(
    options: Array<ListerFilterOption<TFilters>>,
): Record<string, ResolvedFilterNode<TFilters>> {
    const out: Record<string, ResolvedFilterNode<TFilters>> = {};

    const walk = (
        list: Array<ListerFilterOption<TFilters>>,
        inheritedBindKey?: string,
        parentNodeId?: string,
    ) => {
        for (const opt of list) {
            const nodeId = getNodeId(opt, parentNodeId);
            const kind = getOptKind(opt);
            const disabled = getOptDisabled(opt);

            const localBindKey = (opt as any)?.bindKey as string | undefined;
            const resolvedBindKey = localBindKey ?? inheritedBindKey;

            const apply = getOptApply(opt);
            const dbValue =
                kind === "value" ? getOptDbValue(opt as any) : undefined;

            out[nodeId] = {
                option: opt,
                id: nodeId,
                kind,
                disabled,
                bindKey: resolvedBindKey ?? apply?.key,
                dbValue,
                apply,
            };

            const children = (opt as any)?.children as
                | Array<ListerFilterOption<TFilters>>
                | undefined;

            if (Array.isArray(children) && children.length) {
                // if parent had explicit id, children should not be prefixed by it
                const nextParentId = hasExplicitId(opt) ? parentNodeId : nodeId;
                walk(children, resolvedBindKey, nextParentId);
            }
        }
    };

    walk(options);
    return out;
}
