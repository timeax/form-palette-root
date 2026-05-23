// @vitest-environment jsdom

import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ShadcnTextVariant } from "../src/presets/shadcn-variants/text";

describe("text variant affix behavior", () => {
   it("renders visible prefix/suffix from model value", () => {
      render(
         <ShadcnTextVariant
            value={"123"}
            onValue={vi.fn()}
            prefix={"$"}
            suffix={"kg"}
         />,
      );

      expect((screen.getByRole("textbox") as HTMLInputElement).value).toBe(
         "$123kg",
      );
   });

   it("emits model without affixes by default", () => {
      const onValue = vi.fn();

      render(
         <ShadcnTextVariant
            value={""}
            onValue={onValue}
            prefix={"ID:"}
            suffix={"kg"}
         />,
      );

      fireEvent.change(screen.getByRole("textbox"), {
         target: { value: "ID:77kg" },
      });

      expect(onValue).toHaveBeenCalledWith(
         "77",
         expect.objectContaining({
            raw: "ID:77kg",
            meta: expect.objectContaining({ model: "77" }),
         }),
      );
   });

   it("preserves affixes in emitted model when strip flags are disabled", () => {
      const onValue = vi.fn();

      render(
         <ShadcnTextVariant
            value={""}
            onValue={onValue}
            prefix={"ID:"}
            suffix={"kg"}
            stripPrefix={false}
            stripSuffix={false}
         />,
      );

      fireEvent.change(screen.getByRole("textbox"), {
         target: { value: "ID:77kg" },
      });

      expect(onValue).toHaveBeenCalledWith(
         "ID:77kg",
         expect.objectContaining({
            raw: "ID:77kg",
            meta: expect.objectContaining({ model: "ID:77kg" }),
         }),
      );
   });

   it("masked + unmask=raw excludes affix characters from emitted raw payload", () => {
      const onValue = vi.fn();

      render(
         <ShadcnTextVariant
            value={""}
            onValue={onValue}
            mask="99"
            unmask="raw"
            prefix="$"
            suffix="%"
         />,
      );

      fireEvent.input(screen.getByRole("textbox"), {
         target: { value: "$45%" },
      });

      expect(onValue).toHaveBeenCalledWith(
         "45",
         expect.objectContaining({
            meta: expect.objectContaining({
               unmasked: "45",
            }),
         }),
      );
   });
});
