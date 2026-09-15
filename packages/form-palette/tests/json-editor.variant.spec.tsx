// @vitest-environment jsdom

import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { registerCoreVariants } from "../src";
import { JsonEditorMain } from "../src/presets/shadcn/variants/json-editor/main";

registerCoreVariants();

describe("JSON editor variant", () => {
    it("emits the updated root when a nested primitive changes", () => {
        const onRoot = vi.fn();

        render(
            <JsonEditorMain
                root={{ user: { name: "Ada" } }}
                onRoot={onRoot}
                route="user"
                allPaths={["user", "user.name"]}
            />,
        );

        fireEvent.change(screen.getByRole("textbox", { name: /Name/i }), {
            target: { value: "Grace" },
        });

        expect(onRoot).toHaveBeenCalledWith(
            { user: { name: "Grace" } },
            expect.any(Object),
        );
    });
});
