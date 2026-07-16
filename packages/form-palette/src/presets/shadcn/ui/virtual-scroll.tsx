import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/presets/shadcn/ui/scroll-area";
import { Virtuoso, VirtuosoGrid, VirtuosoProps, VirtuosoGridProps } from "react-virtuoso";

export interface VirtualScrollProps<T> extends Omit<VirtuosoProps<T, any>, "components"> {
    className?: string;
    rootProps?: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;
    scrollbarProps?: React.ComponentPropsWithoutRef<typeof ScrollBar>;
    components?: VirtuosoProps<T, any>["components"];
}

export function VirtualScroll<T>({
    className,
    rootProps,
    scrollbarProps,
    style,
    components,
    ...props
}: VirtualScrollProps<T>) {
    const Scroller = React.useMemo(() => {
        return React.forwardRef<HTMLDivElement, any>((scrollerProps, ref) => {
            return (
                <ScrollAreaPrimitive.Viewport
                    {...scrollerProps}
                    ref={ref}
                    data-slot="scroll-area-viewport"
                    className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
                />
            );
        });
    }, []);

    const combinedComponents = React.useMemo(() => {
        return {
            ...components,
            Scroller,
        };
    }, [components, Scroller]);

    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={className}
            {...rootProps}
            style={{ ...style, position: "relative" }}
        >
            <Virtuoso
                {...props}
                components={combinedComponents}
            />
            <ScrollBar {...scrollbarProps} />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}

export interface VirtualScrollGridProps<T> extends Omit<VirtuosoGridProps<T, any>, "components"> {
    className?: string;
    rootProps?: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;
    scrollbarProps?: React.ComponentPropsWithoutRef<typeof ScrollBar>;
    components?: VirtuosoGridProps<T, any>["components"];
}

export function VirtualScrollGrid<T>({
    className,
    rootProps,
    scrollbarProps,
    style,
    components,
    ...props
}: VirtualScrollGridProps<T>) {
    const Scroller = React.useMemo(() => {
        return React.forwardRef<HTMLDivElement, any>((scrollerProps, ref) => {
            return (
                <ScrollAreaPrimitive.Viewport
                    {...scrollerProps}
                    ref={ref}
                    data-slot="scroll-area-viewport"
                    className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
                />
            );
        });
    }, []);

    const combinedComponents = React.useMemo(() => {
        return {
            ...components,
            Scroller,
        };
    }, [components, Scroller]);

    return (
        <ScrollAreaPrimitive.Root
            data-slot="scroll-area"
            className={className}
            {...rootProps}
            style={{ ...style, position: "relative" }}
        >
            <VirtuosoGrid
                {...props}
                components={combinedComponents}
            />
            <ScrollBar {...scrollbarProps} />
            <ScrollAreaPrimitive.Corner />
        </ScrollAreaPrimitive.Root>
    );
}
