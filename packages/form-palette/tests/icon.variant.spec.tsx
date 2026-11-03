// @vitest-environment jsdom

import * as React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { IconPickerPanel, type IconGroup } from "../src/presets/shadcn/variants/icon";

vi.mock("@iconify/react", () => ({
    Icon: ({ icon }: { icon: string }) => <span>{icon}</span>,
}));

vi.mock("../src/presets/shadcn/ui/virtual-scroll", () => ({
    VirtualScrollGrid: ({
        data,
        itemContent,
    }: {
        data: string[];
        itemContent: (index: number, icon: string) => React.ReactNode;
    }) => <div>{data.map((icon, index) => itemContent(index, icon))}</div>,
}));

afterEach(() => {
    vi.unstubAllGlobals();
});

const groups: IconGroup[] = [
    { id: "material", label: "Material", prefixes: ["mdi"] },
    { id: "lucide", label: "Lucide", prefixes: ["lucide"] },
];

function picker(url: string, pickerGroups: IconGroup[] = groups) {
    return (
        <IconPickerPanel
            url={url}
            groups={pickerGroups}
            multiple={false}
            value={[]}
            onValue={vi.fn()}
        />
    );
}

describe("icon picker collection loading", () => {
    it("loads the selected group in strict mode without canceling its shared request", async () => {
        const fetchMock = vi.fn(async () => ({
            ok: true,
            json: async () => ({ uncategorized: ["home"] }),
        }));
        vi.stubGlobal("fetch", fetchMock);

        render(
            <React.StrictMode>
                {picker("https://icon-test-strict.example")}
            </React.StrictMode>,
        );

        expect(await screen.findByText("mdi:home")).toBeTruthy();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toBe(
            "https://icon-test-strict.example/collection?prefix=mdi",
        );
    });

    it("shows successful collections when another prefix fails", async () => {
        const fetchMock = vi.fn(async (url: string) => {
            if (url.endsWith("prefix=mdi")) {
                return {
                    ok: true,
                    json: async () => ({ uncategorized: ["home"] }),
                };
            }

            return { ok: false, status: 429 };
        });
        vi.stubGlobal("fetch", fetchMock);

        render(
            picker("https://icon-test-partial.example", [
                { id: "mixed", label: "Mixed", prefixes: ["mdi", "lucide"] },
            ]),
        );

        expect(await screen.findByText("mdi:home")).toBeTruthy();
        expect(screen.getByText(/HTTP 429/)).toBeTruthy();
        expect(fetchMock).toHaveBeenCalledTimes(2);
    });
});
