// src/presets/shadcn-variants/custom.tsx

import * as React from "react";
import type { VariantBaseProps, ChangeDetail } from "@/variants/shared";

/**
 * Props for the generic "custom" variant.
 *
 * - The only special props we define are:
 *   - component: the React component to render
 *   - valueProp / changeProp / disabledProp / readOnlyProp / errorProp
 *   - idProp / nameProp / placeholderProp
 *   - mapValue / mapDetail (optional hooks)
 *
 * - All other props are treated as "component props" and forwarded
 *   directly to the underlying component.
 *
 * The underlying component is expected to:
 *   - accept the mapped `valueProp`
 *   - call the mapped `changeProp` with the next value (first argument)
 *   - optionally use disabled/readOnly/error/id/name/placeholder via the mapped names
 */
export interface ShadcnCustomVariantProps<TValue = unknown>
   extends VariantBaseProps<TValue> {
   /**
    * The actual React component to render.
    *
    * Example:
    *   component={MyToggle}
    */
   component: React.ComponentType<any>;

   /**
    * Prop name that carries the current value for the component.
    * Default: "value".
    */
   valueProp?: string;

   /**
    * Prop name for the change handler that the component will call.
    * Default: "onChange".
    *
    * The component is expected to call:
    *   props[changeProp](nextValue, ...otherArgs?)
    *
    * The first argument is taken as the new value.
    */
   changeProp?: string;

   /**
    * Prop name for disabled state.
    * Default: "disabled".
    */
   disabledProp?: string;

   /**
    * Prop name for read-only state.
    * Default: "readOnly".
    */
   readOnlyProp?: string;

   /**
    * Prop name for passing error to the component (if it cares).
    * If provided, we pass the `error` field as-is.
    * Example values: "error", "isInvalid", "status".
    */
   errorProp?: string;

   /**
    * Prop name for the id attribute.
    * Default: "id".
    */
   idProp?: string;

   /**
    * Prop name for the name attribute.
    * Default: "name".
    */
   nameProp?: string;

   /**
    * Prop name for the placeholder attribute.
    * Default: "placeholder".
    */
   placeholderProp?: string;

   /**
    * Optional transform for the raw next value before it hits the field.
    *
    * Receives the first argument that the component passes to the change
    * handler, plus the full argument list for flexibility.
    */
   mapValue?: (raw: any, ...args: any[]) => TValue;

   /**
    * Optional builder for ChangeDetail, given the raw next value.
    *
    * If omitted, a default { source: "variant", raw } detail is used.
    */
   mapDetail?: (raw: any, ...args: any[]) => ChangeDetail;

   /**
    * Any other props are assumed to belong to the custom component.
    */
   [key: string]: unknown;
}

export const ShadcnCustomVariant = React.forwardRef<
   any,
   ShadcnCustomVariantProps<any>
>(function ShadcnCustomVariant(props, ref) {
   const {
      // Variant base props we care about:
      value,
      onValue,
      error,
      disabled,
      readOnly,
      id,
      name,
      placeholder,

      // Mapping props:
      component: Component,
      valueProp = "value",
      changeProp = "onChange",
      disabledProp = "disabled",
      readOnlyProp = "readOnly",
      errorProp,
      idProp = "id",
      nameProp = "name",
      placeholderProp = "placeholder",

      mapValue,
      mapDetail,

      // Everything else goes straight to the component:
      ...rest
   } = props as ShadcnCustomVariantProps<any>;

   // If there is no component, bail out (dev-time safety).
   if (!Component) {
      if (process.env.NODE_ENV !== "production") {
         // eslint-disable-next-line no-console
         console.warn(
            "[form-palette] ShadcnCustomVariant: `component` prop is required.",
         );
      }
      return null;
   }

   const isDisabled = !!disabled;
   const isReadOnly = !!readOnly;

   /**
    * Bridge from the component's change callback to the variant contract.
    *
    * We assume the custom component calls the mapped change prop
    * with the **next value as its first argument**:
    *
    *   props[changeProp](nextValue, ...rest)
    */
   const handleChange = React.useCallback(
      (...args: any[]) => {
         if (!onValue) return;
         if (isDisabled || isReadOnly) return;

         const raw = args[0];

         const next = mapValue
            ? mapValue(raw, ...args)
            : (raw as any);

         const detail: ChangeDetail =
            mapDetail?.(raw, ...args) ?? {
               source: "variant",
               raw,
               nativeEvent: undefined,
               meta: undefined,
            };

         (onValue as any)(next, detail);
      },
      [onValue, isDisabled, isReadOnly, mapValue, mapDetail],
   );

   // Build the props for the custom component.
   const innerProps: Record<string, unknown> = {
      ...rest, // ← all non-special props from InputField go directly to the component
   };

   // Map value → component[valueProp]
   innerProps[valueProp] = value;

   // Map handler → component[changeProp]
   innerProps[changeProp] = handleChange;

   // Map disabled / readOnly
   if (disabledProp) {
      innerProps[disabledProp] = isDisabled;
   }
   if (readOnlyProp) {
      innerProps[readOnlyProp] = isReadOnly;
   }

   // Map error if a mapping key is provided
   if (errorProp && error !== undefined) {
      innerProps[errorProp] = error;
   }

   // Map id/name/placeholder if present
   if (id !== undefined && idProp) {
      innerProps[idProp] = id;
   }
   if (name !== undefined && nameProp) {
      innerProps[nameProp] = name;
   }
   if (placeholder !== undefined && placeholderProp) {
      innerProps[placeholderProp] = placeholder;
   }

   return <Component ref={ref} {...innerProps} />;
});

ShadcnCustomVariant.displayName = "ShadcnCustomVariant";

export default ShadcnCustomVariant;