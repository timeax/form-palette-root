// resources/js/presets/shadcn-variants/lister/index.tsx
import * as React from "react";

import { useLister } from "@/presets/lister";
import type {
    ListerApi,
    ListerDefinition,
    ListerId,
    PresetMap,
} from "@/presets/lister/types";

import type { KeyOrFn, ListerVariantProps } from "./types";
import { inferOptionValueKeyFromRawList } from "./utils";
import { makeInlineDef, makeInlinePatch, mergeListerDef } from "./patch";
import ListerInner from "./inner";

function ListerResolvedInner<
    P extends PresetMap,
    TRaw extends Record<string, any>,
    TValue extends ListerId,
    TFilters extends Record<string, any>,
    TMeta,
    TMode extends "single" | "multiple",
>(props: ListerVariantProps<TMode, P, TRaw, TValue, TFilters, TMeta>) {
    const { api } = useLister<P>();

    const {
        def,

        // inline
        endpoint,
        method,
        buildRequest,
        selector,

        optionValue,
        optionLabel,
        optionIcon,
        optionDescription,
        optionDisabled,
        optionGroup,
        optionMeta,

        // ✅ NEW: search overrides
        search,
        searchTarget,

        // data
        value,
        onValue,
        filters,
        mode,
        confirm,
        permissions,

        // ui
        disabled,
        readOnly,
        className,
        placeholder,
        maxDisplayItems,
        panelClassName,
        contentClassName,
        renderTrigger,

        // trigger styling + controls (multi-select parity)
        size,
        density,
        clearable,
        leadingIcons,
        trailingIcons,
        icon,
        iconGap,
        leadingIconSpacing,
        trailingIconSpacing,
        leadingControl,
        trailingControl,
        leadingControlClassName,
        trailingControlClassName,
        joinControls,
        extendBoxToControls,

        // open opts
        title,
        searchMode,
        initialQuery,
        showRefresh,
        refreshMode,
        filtersSpec,
        renderOption,
    } = props as any;

    // standalone inline means: no base def + we actually have an endpoint
    const isStandaloneInline = !def && endpoint != null;

    // infer optionValue ONLY for standalone inline when not provided
    const shouldInferOptionValue =
        isStandaloneInline && optionValue === undefined;

    const [resolvedOptionValue, setResolvedOptionValue] = React.useState<
        KeyOrFn<TRaw, TValue> | undefined
    >(() => optionValue ?? ("id" as any));

    React.useEffect(() => {
        if (optionValue !== undefined) setResolvedOptionValue(optionValue);
    }, [optionValue]);

    React.useEffect(() => {
        if (!shouldInferOptionValue) return;
        if (!endpoint) return;

        let alive = true;

        (async () => {
            const provisional = makeInlineDef<TRaw, TValue, TFilters, TMeta>({
                endpoint,
                method,
                buildRequest,
                selector,
                optionValue: "id" as any,
                optionLabel,
                optionIcon,
                optionDescription,
                optionDisabled,
                optionGroup,
                optionMeta,
            });

            const res = await (api as ListerApi<P>).fetch(
                provisional as any,
                filters as any,
                { query: "", permissions } as any,
            );

            if (!alive) return;

            const rawList = (res?.raw ?? []) as any[];
            const inferred = inferOptionValueKeyFromRawList(rawList, "id");
            setResolvedOptionValue(inferred.key as any);
        })().catch(() => {});

        return () => {
            alive = false;
        };
    }, [
        api,
        endpoint,
        method,
        buildRequest,
        selector,
        filters,
        permissions,
        shouldInferOptionValue,
        optionLabel,
        optionIcon,
        optionDescription,
        optionDisabled,
        optionGroup,
        optionMeta,
    ]);

    // ✅ YOUR RULE:
    // inlineExists is allowed to be always true because optionValue is always resolved.
    const inlineExists =
        endpoint !== undefined ||
        method !== undefined ||
        buildRequest !== undefined ||
        selector !== undefined ||
        resolvedOptionValue !== undefined || // ✅ KEEP THIS (your rule)
        optionLabel !== undefined ||
        optionIcon !== undefined ||
        optionDescription !== undefined ||
        optionDisabled !== undefined ||
        optionGroup !== undefined ||
        optionMeta !== undefined ||
        // ✅ include search override as "inline patch" signal too
        search !== undefined;

    const finalDef = React.useMemo(() => {
        const baseDef = def as
            | ListerDefinition<TRaw, TValue, TFilters, TMeta>
            | undefined;

        if (!inlineExists) return baseDef;

        // no base => must build standalone inline def (requires endpoint)
        if (!baseDef) {
            if (!endpoint) return undefined;

            // ✅ ONLY resolvedOptionValue (no optionValue fallback)
            const ov = (resolvedOptionValue ?? ("id" as any)) as any;

            const built = makeInlineDef<TRaw, TValue, TFilters, TMeta>({
                endpoint,
                method,
                buildRequest,
                selector,
                optionValue: ov,
                optionLabel,
                optionIcon,
                optionDescription,
                optionDisabled,
                optionGroup,
                optionMeta,
            }) as any;

            // ✅ attach search override (if provided)
            if (search !== undefined) built.search = search;

            return built as any;
        }

        // base + inline => ALWAYS merge (your rule)
        const inlinePatch = makeInlinePatch<TRaw, TValue, TFilters, TMeta>({
            endpoint,
            method,
            buildRequest,
            selector,

            // ✅ ONLY resolvedOptionValue (no optionValue fallback)
            optionValue: (resolvedOptionValue ?? ("id" as any)) as any,

            optionLabel,
            optionIcon,
            optionDescription,
            optionDisabled,
            optionGroup,
            optionMeta,
        });

        const merged = mergeListerDef(baseDef, inlinePatch) as any;

        // ✅ attach/override search (if provided)
        if (search !== undefined) merged.search = search;

        return merged as any;
    }, [
        def,
        inlineExists,
        endpoint,
        method,
        buildRequest,
        selector,
        resolvedOptionValue,
        optionLabel,
        optionIcon,
        optionDescription,
        optionDisabled,
        optionGroup,
        optionMeta,
        search,
    ]);

    const openOptions = React.useMemo(() => {
        return {
            title,
            searchMode,
            initialQuery,
            showRefresh,
            refreshMode,
            filtersSpec,
            renderOption,

            // ✅ NEW: allow caller to seed the session searchTarget
            searchTarget,
        } as any;
    }, [
        title,
        searchMode,
        initialQuery,
        showRefresh,
        refreshMode,
        filtersSpec,
        renderOption,
        searchTarget,
    ]);

    if (!finalDef) return null;

    return (
        <ListerInner<P, TRaw, TValue, TFilters, TMeta, any>
            def={finalDef}
            value={value as any}
            onValue={onValue as any}
            filters={filters as any}
            mode={mode as any}
            confirm={confirm as any}
            permissions={permissions as any}
            disabled={disabled}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            maxDisplayItems={maxDisplayItems}
            renderTrigger={renderTrigger}
            contentClassName={contentClassName}
            panelClassName={panelClassName}
            openOptions={openOptions}
            // ✅ forward UI/controls props to inner
            size={size}
            density={density}
            clearable={clearable}
            leadingIcons={leadingIcons}
            trailingIcons={trailingIcons}
            icon={icon}
            iconGap={iconGap}
            leadingIconSpacing={leadingIconSpacing}
            trailingIconSpacing={trailingIconSpacing}
            leadingControl={leadingControl}
            trailingControl={trailingControl}
            leadingControlClassName={leadingControlClassName}
            trailingControlClassName={trailingControlClassName}
            joinControls={joinControls}
            extendBoxToControls={extendBoxToControls}
        />
    );
}

export default ListerResolvedInner;
