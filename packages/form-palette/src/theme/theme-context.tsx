import * as React from "react";
import type { InputFieldProps, InputFieldClassNames } from "@/input/input-props";
import type { VariantKey } from "@/schema/variant";

export interface FormPaletteTheme {
    /**
     * Default props to merge into every <InputField /> instance.
     */
    defaultProps?: Partial<InputFieldProps<any>>;

    /**
     * Default classNames to merge for specific elements of the field layout.
     */
    classes?: Partial<InputFieldClassNames>;

    /**
     * Inline style overrides for specific elements of the field layout.
     */
    styles?: Partial<Record<keyof InputFieldClassNames, React.CSSProperties>>;

    /**
     * Variant-specific overrides.
     */
    variants?: {
        [key in VariantKey]?: {
            defaultProps?: Partial<InputFieldProps<key>>;
            classes?: Partial<InputFieldClassNames>;
            styles?: Partial<Record<keyof InputFieldClassNames, React.CSSProperties>>;
        };
    };
}

const ThemeContext = React.createContext<FormPaletteTheme | null>(null);

export interface ThemeProviderProps {
    theme: FormPaletteTheme;
    children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
    const outerTheme = React.useContext(ThemeContext);

    const mergedTheme = React.useMemo(() => {
        if (!outerTheme) return theme;
        return mergeThemes(outerTheme, theme);
    }, [outerTheme, theme]);

    return (
        <ThemeContext.Provider value={mergedTheme}>
            {children}
        </ThemeContext.Provider>
    );
}

export const PaletteThemeProvider = ThemeProvider;

export function usePaletteTheme(): FormPaletteTheme {
    return React.useContext(ThemeContext) ?? {};
}

// Deep merge helper for theme configurations
function mergeThemes(outer: FormPaletteTheme, inner: FormPaletteTheme): FormPaletteTheme {
    const merged: FormPaletteTheme = {
        defaultProps: { ...outer.defaultProps, ...inner.defaultProps },
        classes: mergeClasses(outer.classes, inner.classes),
        styles: mergeStyleObjects(outer.styles, inner.styles),
        variants: { ...outer.variants },
    };

    if (inner.variants) {
        for (const key of Object.keys(inner.variants)) {
            const variantKey = key as VariantKey;
            const innerVar = inner.variants[variantKey];
            const outerVar = outer.variants?.[variantKey];
            if (innerVar) {
                merged.variants![variantKey] = {
                    defaultProps: { ...outerVar?.defaultProps, ...innerVar.defaultProps } as any,
                    classes: mergeClasses(outerVar?.classes, innerVar.classes),
                    styles: mergeStyleObjects(outerVar?.styles, innerVar.styles),
                };
            }
        }
    }

    return merged;
}

function mergeClasses(
    outer?: Partial<InputFieldClassNames>,
    inner?: Partial<InputFieldClassNames>
): Partial<InputFieldClassNames> | undefined {
    if (!outer && !inner) return undefined;
    if (!outer) return inner;
    if (!inner) return outer;

    const result = { ...outer };
    for (const key of Object.keys(inner) as Array<keyof InputFieldClassNames>) {
        const outerVal = outer[key];
        const innerVal = inner[key];
        if (outerVal && innerVal) {
            result[key] = `${outerVal} ${innerVal}`;
        } else if (innerVal) {
            result[key] = innerVal;
        }
    }
    return result;
}

function mergeStyleObjects(
    outer?: Partial<Record<keyof InputFieldClassNames, React.CSSProperties>>,
    inner?: Partial<Record<keyof InputFieldClassNames, React.CSSProperties>>
) {
    if (!outer && !inner) return undefined;
    if (!outer) return inner;
    if (!inner) return outer;

    const result = { ...outer };
    for (const key of Object.keys(inner) as Array<keyof InputFieldClassNames>) {
        result[key] = { ...outer[key], ...inner[key] };
    }
    return result;
}
