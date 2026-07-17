// @vitest-environment jsdom

import * as React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Form, InputField, registerCoreVariants, ThemeProvider } from "@/index";

registerCoreVariants();

describe("Form Palette Theming Support", () => {
    it("applies global defaultProps to InputFields", () => {
        render(
            <Form adapter="local" valueBag={{ foo: "test" }}>
                <ThemeProvider theme={{ defaultProps: { size: "sm", labelPlacement: "left" } }}>
                    <InputField
                        variant="text"
                        name="foo"
                        label="My Label"
                        data-testid="input-field"
                    />
                </ThemeProvider>
            </Form>
        );

        const input = screen.getByTestId("input-field");
        const container = input.closest("[data-slot=field]");
        
        // Checking the attributes resolved by InputField on the container
        expect(container).toBeTruthy();
        expect(container?.getAttribute("data-label-placement")).toBe("left");
        
        // Size sm is passed down to Variant control. In Text variant, it maps to input element data-size
        expect(input.getAttribute("data-size")).toBe("sm");
    });

    it("applies variant-specific defaultProps to InputFields", () => {
        render(
            <Form adapter="local" valueBag={{ foo: "test", bar: 10 }}>
                <ThemeProvider theme={{
                    variants: {
                        text: { defaultProps: { labelPlacement: "hidden" } }
                    }
                }}>
                    <InputField
                        variant="text"
                        name="foo"
                        label="Text Label"
                        data-testid="text-field"
                    />
                    <InputField
                        variant="number"
                        name="bar"
                        label="Number Label"
                        data-testid="number-field"
                    />
                </ThemeProvider>
            </Form>
        );

        const textField = screen.getByTestId("text-field");
        const numberField = screen.getByTestId("number-field");

        const textContainer = textField.closest("[data-slot=field]");
        const numberContainer = numberField.closest("[data-slot=field]");

        expect(textContainer?.getAttribute("data-label-placement")).toBe("hidden");
        // Number variant should not be hidden as variant override only targeted text variant
        expect(numberContainer?.getAttribute("data-label-placement")).toBe("top"); // top is standard default
    });

    it("deep merges global, variant-specific and component classes correctly", () => {
        render(
            <Form adapter="local" valueBag={{ foo: "test" }}>
                <ThemeProvider theme={{
                    classes: { label: "global-label-cls" },
                    variants: {
                        text: {
                            classes: {
                                label: "variant-label-cls",
                                root: "variant-root-cls"
                            }
                        }
                    }
                }}>
                    <InputField
                        variant="text"
                        name="foo"
                        label="My Label"
                        className="direct-root-cls"
                        classes={{ label: "direct-label-cls" }}
                        data-testid="input-field"
                    />
                </ThemeProvider>
            </Form>
        );

        const input = screen.getByTestId("input-field");
        const container = input.closest("[data-slot=field]");
        
        expect(container?.className).toContain("variant-root-cls");
        expect(container?.className).toContain("direct-root-cls");

        // The label element
        const labelText = screen.getByText("My Label");
        const label = labelText.closest("label");
        expect(label).toBeTruthy();
        expect(label?.className).toContain("global-label-cls");
        expect(label?.className).toContain("variant-label-cls");
        expect(label?.className).toContain("direct-label-cls");
    });

    it("deep merges global, variant-specific and component inline styles correctly", () => {
        render(
            <Form adapter="local" valueBag={{ foo: "test" }}>
                <ThemeProvider theme={{
                    styles: { label: { color: "rgb(255, 0, 0)" } },
                    variants: {
                        text: {
                            styles: {
                                label: { fontSize: "20px" },
                                root: { border: "1px solid rgb(0, 128, 0)" }
                            }
                        }
                    }
                }}>
                    <InputField
                        variant="text"
                        name="foo"
                        label="My Label"
                        style={{ backgroundColor: "rgb(255, 255, 0)" }}
                        data-testid="input-field"
                    />
                </ThemeProvider>
            </Form>
        );

        const input = screen.getByTestId("input-field");
        const container = input.closest("[data-slot=field]") as HTMLElement;
        expect(container?.style.border).toBe("1px solid rgb(0, 128, 0)");
        expect(container?.style.backgroundColor).toBe("rgb(255, 255, 0)");

        const labelText = screen.getByText("My Label");
        const label = labelText.closest("label");
        expect(label).toBeTruthy();
        expect(label?.style.color).toBe("rgb(255, 0, 0)");
        expect(label?.style.fontSize).toBe("20px");
    });

    it("supports nested ThemeProviders and merges themes correctly", () => {
        render(
            <Form adapter="local" valueBag={{ foo: "test" }}>
                <ThemeProvider theme={{
                    defaultProps: { size: "lg" },
                    classes: { label: "outer-label-cls" }
                }}>
                    <ThemeProvider theme={{
                        defaultProps: { density: "compact" },
                        classes: { label: "inner-label-cls" }
                    }}>
                        <InputField
                            variant="text"
                            name="foo"
                            label="My Label"
                            data-testid="input-field"
                        />
                    </ThemeProvider>
                </ThemeProvider>
            </Form>
        );

        const input = screen.getByRole("textbox");
        expect(input.getAttribute("data-size")).toBe("lg");
        expect(input.getAttribute("data-density")).toBe("compact");

        const labelText = screen.getByText("My Label");
        const label = labelText.closest("label");
        expect(label).toBeTruthy();
        expect(label?.className).toContain("outer-label-cls");
        expect(label?.className).toContain("inner-label-cls");
    });
});
