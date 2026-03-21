// @vitest-environment jsdom

import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { InputNumber } from "../src/presets/ui/number";
import { ShadcnNumberVariant } from "../src/presets/shadcn-variants/number";

describe("number variant runtime safety", () => {
   it("renders a blank input when controlled with NaN", () => {
      render(<InputNumber value={Number.NaN} onValueChange={vi.fn()} />);

      expect((screen.getByRole("spinbutton") as HTMLInputElement).value).toBe("");
      expect(screen.queryByDisplayValue("NaN")).toBeNull();
   });

   it("stays stable when a host feeds NaN back through onValue", () => {
      function BadControlledHost() {
         const [value, setValue] = React.useState<any>(1);

         return (
            <ShadcnNumberVariant
               value={value}
               onValue={() => {
                  setValue(Number.NaN);
               }}
            />
         );
      }

      render(<BadControlledHost />);

      fireEvent.change(screen.getByRole("spinbutton"), {
         target: { value: "25" },
      });

      expect((screen.getByRole("spinbutton") as HTMLInputElement).value).toBe("");
      expect(screen.queryByDisplayValue("NaN")).toBeNull();
   });

   it("emits empty when blurred after invalid text", () => {
      const onValueChange = vi.fn();

      render(<InputNumber value={null} onValueChange={onValueChange} />);

      const input = screen.getByRole("spinbutton");

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "abc" } });
      fireEvent.blur(input);

      expect((input as HTMLInputElement).value).toBe("");
      expect(onValueChange).toHaveBeenLastCalledWith(
         expect.objectContaining({
            value: null,
            target: expect.objectContaining({ value: null }),
         }),
      );
   });

   it("recovers step buttons from a NaN controlled value", () => {
      const onValue = vi.fn();

      render(
         <ShadcnNumberVariant
            value={Number.NaN}
            onValue={onValue}
            showButtons
            buttonLayout="inline"
            step={2}
         />,
      );

      fireEvent.click(screen.getByLabelText("Increase value"));

      expect(onValue).toHaveBeenCalledWith(
         2,
         expect.objectContaining({ raw: 2 }),
      );
   });

   it("keeps valid finite numbers working as before", () => {
      const onValueChange = vi.fn();

      render(
         <InputNumber
            value={12.5}
            onValueChange={onValueChange}
            maxFractionDigits={1}
         />,
      );

      const input = screen.getByRole("spinbutton");

      expect((input as HTMLInputElement).value).toBe("12.5");

      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: "14.5" } });
      fireEvent.blur(input);

      expect(onValueChange).toHaveBeenCalledWith(
         expect.objectContaining({
            value: 14.5,
            target: expect.objectContaining({ value: 14.5 }),
         }),
      );
      expect((input as HTMLInputElement).value).toBe("14.5");
   });
});
