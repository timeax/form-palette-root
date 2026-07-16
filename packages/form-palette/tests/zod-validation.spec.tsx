// @vitest-environment jsdom

import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Form, InputField, registerCoreVariants } from "../src";
import { z } from "zod";

// Register variants before tests
registerCoreVariants();

describe("Zod validation path mapping", () => {
    it("correctly maps validation errors to nested/shared fields", async () => {
        const schema = z.object({
            profile: z.object({
                first_name: z.string().min(3, "First name must be at least 3 chars"),
            }),
        });

        const onSubmit = vi.fn();

        render(
            <Form
                adapter="local"
                schema={schema}
                onSubmit={onSubmit}
                valueBag={{ profile: { first_name: "Ab" } }} // Invalid, min is 3
            >
                <InputField
                    shared="profile"
                    name="first_name"
                    variant="text"
                    label="First Name"
                />
                <button type="submit" data-testid="submit-btn">Submit</button>
            </Form>
        );

        const btn = screen.getByTestId("submit-btn");
        await act(async () => {
            btn.click();
        });

        // The onSubmit should not be called since validation failed
        expect(onSubmit).not.toHaveBeenCalled();

        // The field should display the error message
        const errorText = screen.getByText("First name must be at least 3 chars");
        expect(errorText).toBeTruthy();
    });
});
