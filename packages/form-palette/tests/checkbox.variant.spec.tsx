// @vitest-environment jsdom

import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ShadcnCheckboxVariant } from "../src/presets/shadcn-variants/checkbox";

describe("checkbox variant selectedOptions emission", () => {
   it("emits raw option objects in selectedOptions with object options + optionValue", () => {
      const onValue = vi.fn();
      const options = [
         { id: "read", label: "Read" },
         { id: "write", label: "Write" },
      ];

      render(
         <ShadcnCheckboxVariant
            id="checkbox-raw"
            value={[]}
            onValue={onValue}
            options={options}
            optionValue={"id"}
            optionLabel={"label"}
         />,
      );

      fireEvent.click(screen.getByText("Read"));

      const [, detail] = onValue.mock.calls[0];
      expect(detail.selectedOptions).toEqual([options[0]]);
      expect(onValue.mock.calls[0][0]).toEqual(["read"]);
   });

   it("keeps numeric option values from degrading into string keys", () => {
      const onValue = vi.fn();
      const options = [
         { id: 101, label: "One Zero One" },
         { id: 202, label: "Two Zero Two" },
      ];

      render(
         <ShadcnCheckboxVariant
            id="checkbox-numeric"
            value={{ 101: true }}
            onValue={onValue}
            options={options}
            optionValue={"id"}
            optionLabel={"label"}
            tristate
         />,
      );

      fireEvent.click(screen.getByText("Two Zero Two"));

      const [, detail] = onValue.mock.calls[0];
      expect(detail.selectedOptions).toEqual([options[0], options[1]]);
      expect(onValue.mock.calls[0][0]).toEqual({ 101: true, 202: true });
   });

   it("keeps tristate group main value as record while selectedOptions stays raw", () => {
      const onValue = vi.fn();
      const options = [
         { id: "alpha", label: "Alpha" },
         { id: "beta", label: "Beta" },
      ];

      render(
         <ShadcnCheckboxVariant
            id="checkbox-tristate"
            value={{ alpha: true }}
            onValue={onValue}
            options={options}
            optionValue={"id"}
            optionLabel={"label"}
            tristate
         />,
      );

      fireEvent.click(screen.getByText("Beta"));

      const [nextValue, detail] = onValue.mock.calls[0];
      expect(nextValue).toEqual({ alpha: true, beta: true });
      expect(detail.selectedOptions).toEqual([options[0], options[1]]);
   });

   it("falls back to primitive values for primitive options", () => {
      const onValue = vi.fn();

      render(
         <ShadcnCheckboxVariant
            id="checkbox-primitive"
            value={[]}
            onValue={onValue}
            options={["Alpha", "Beta"]}
         />,
      );

      fireEvent.click(screen.getByText("Alpha"));

      const [, detail] = onValue.mock.calls[0];
      expect(detail.selectedOptions).toEqual(["Alpha"]);
      expect(onValue.mock.calls[0][0]).toEqual(["Alpha"]);
   });
});

