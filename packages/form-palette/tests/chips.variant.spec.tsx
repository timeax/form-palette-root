import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ShadcnChipsVariant } from "../src/presets/shadcn/variants/chips";

describe("ShadcnChipsVariant runtime safety", () => {
   it("does not crash when value is a non-array shape", () => {
      const onValue = vi.fn();

      let container: HTMLElement;
      expect(() => {
         const out = render(
            <ShadcnChipsVariant
               // Simulates a bad controlled value fed back by a host app.
               value={"not-an-array" as any}
               onValue={onValue}
            />,
         );
         container = out.container;
      }).not.toThrow();

      expect(container!.querySelectorAll('[data-slot="chip"]').length).toBe(0);
   });

   it("renders chips when value is a valid array", () => {
      render(
         <ShadcnChipsVariant
            value={["alpha", "beta"]}
            onValue={vi.fn()}
         />,
      );

      expect(screen.getByText("alpha")).toBeTruthy();
      expect(screen.getByText("beta")).toBeTruthy();
   });

   it("emits undefined when removing the final chip", () => {
      const onValue = vi.fn();

      render(
         <ShadcnChipsVariant
            value={["last-chip"]}
            onValue={onValue}
         />,
      );

      const input = screen.getByRole("textbox");
      fireEvent.keyDown(input, { key: "Backspace" });

      expect(onValue).toHaveBeenCalled();
      const firstCall = onValue.mock.calls[0];
      expect(firstCall[0]).toBeUndefined();
      expect(firstCall[1]?.meta?.action).toBe("remove");
   });

   it("stays stable when host mis-handles undefined as empty string", () => {
      function BadControlledHost() {
         const [value, setValue] = React.useState<any>(["one"]);

         return (
            <ShadcnChipsVariant
               value={value}
               onValue={(next) => {
                  // Intentional misuse pattern that previously crashed map().
                  setValue(next ?? "");
               }}
            />
         );
      }

      expect(() => render(<BadControlledHost />)).not.toThrow();

      const input = screen.getByRole("textbox");
      expect(() => fireEvent.keyDown(input, { key: "Backspace" })).not.toThrow();
   });
});
