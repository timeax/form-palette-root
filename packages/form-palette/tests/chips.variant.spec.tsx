// @vitest-environment jsdom

import * as React from "react";
import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { ShadcnChipsVariant } from "../src/presets/shadcn/variants/chips";

describe("ShadcnChipsVariant keyboard separators", () => {
   it.each([false, true])("commits one draft with punctuation (textareaMode=%s)", (textareaMode) => {
      const onValue = vi.fn();
      const onAddChips = vi.fn();
      const comment = textareaMode ? "Looks good, ship it; thanks.\nSee you soon." : "Looks good, ship it; thanks.";
      render(<ShadcnChipsVariant textareaMode={textareaMode} onValue={onValue} onAddChips={onAddChips} />);
      const input = screen.getByRole<HTMLInputElement | HTMLTextAreaElement>("textbox");

      fireEvent.change(input, { target: { value: `  ${comment}  ` } });
      expect(fireEvent.keyDown(input, { key: "Enter", shiftKey: true })).toBe(true);
      expect(fireEvent.keyDown(input, { key: "Tab" })).toBe(true);
      fireEvent.blur(input);
      expect(onValue).not.toHaveBeenCalled();

      expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(false);
      expect(onValue).toHaveBeenCalledOnce();
      expect(onValue).toHaveBeenCalledWith([comment], expect.objectContaining({
         meta: { action: "add", added: [comment], chips: [comment] },
      }));
      expect(onAddChips).toHaveBeenCalledWith([comment], [comment]);
      expect(input.value).toBe("");
   });

   it("matches alternatives case-insensitively with exact modifiers", () => {
      const onValue = vi.fn();
      const separators = ["CTRL+ENTER", "Shift+Meta+Enter", ",", ";"] as const;
      render(<ShadcnChipsVariant textareaMode separators={separators} addOnTab onValue={onValue} />);
      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "draft" } });
      expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true);
      expect(fireEvent.keyDown(input, { key: "Enter", ctrlKey: true, shiftKey: true })).toBe(true);
      expect(fireEvent.keyDown(input, { key: "Tab" })).toBe(true);
      expect(onValue).not.toHaveBeenCalled();

      for (const event of [
         { key: "Enter", ctrlKey: true },
         { key: "Enter", shiftKey: true, metaKey: true },
         { key: "," },
         { key: ";" },
      ]) {
         fireEvent.change(input, { target: { value: "draft" } });
         expect(fireEvent.keyDown(input, event)).toBe(false);
         expect(onValue).toHaveBeenLastCalledWith(["draft"], expect.anything());
      }
      expect(onValue).toHaveBeenCalledTimes(4);
   });

   it("accepts a single shortcut and leaves composition events alone", () => {
      const onValue = vi.fn();
      render(<ShadcnChipsVariant separators="Alt+Enter" value={["existing"]} onValue={onValue} />);
      const input = screen.getByRole("textbox");

      expect(fireEvent.keyDown(input, { key: "Backspace", isComposing: true })).toBe(true);
      fireEvent.change(input, { target: { value: "new" } });
      expect(fireEvent.keyDown(input, { key: "Enter", altKey: true, isComposing: true })).toBe(true);
      expect(onValue).not.toHaveBeenCalled();
      expect(fireEvent.keyDown(input, { key: "Enter", altKey: true })).toBe(false);
      expect(onValue).toHaveBeenCalledWith(["existing", "new"], expect.anything());
   });

   it("lets callers disable keyboard commits and opt into committing on blur", () => {
      const onValue = vi.fn();
      render(<ShadcnChipsVariant separators={[]} addOnBlur addOnEnter addOnTab onValue={onValue} />);
      const input = screen.getByRole("textbox");

      fireEvent.change(input, { target: { value: "one, two; three" } });
      expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true);
      expect(fireEvent.keyDown(input, { key: "Tab" })).toBe(true);
      expect(onValue).not.toHaveBeenCalled();
      fireEvent.blur(input);
      expect(onValue).toHaveBeenCalledWith(["one, two; three"], expect.anything());
   });

   it("honors legacy Enter and Tab options when separators is omitted", () => {
      const onValue = vi.fn();
      render(<ShadcnChipsVariant addOnEnter={false} addOnTab onValue={onValue} />);
      const input = screen.getByRole("textbox");

      expect(fireEvent.keyDown(input, { key: "Tab" })).toBe(true);
      fireEvent.change(input, { target: { value: "draft" } });
      expect(fireEvent.keyDown(input, { key: "Enter" })).toBe(true);
      expect(onValue).not.toHaveBeenCalled();
      expect(fireEvent.keyDown(input, { key: "Tab" })).toBe(false);
      expect(onValue).toHaveBeenCalledWith(["draft"], expect.anything());
   });

   it("still respects duplicate and chip count limits", () => {
      const onValue = vi.fn();
      const { rerender } = render(<ShadcnChipsVariant value={["existing"]} onValue={onValue} />);
      const input = screen.getByRole<HTMLInputElement>("textbox");

      fireEvent.change(input, { target: { value: "existing" } });
      fireEvent.keyDown(input, { key: "Enter" });
      expect(onValue).not.toHaveBeenCalled();
      expect(input.value).toBe("existing");

      rerender(<ShadcnChipsVariant allowDuplicates maxChips={1} value={["existing"]} onValue={onValue} />);
      fireEvent.keyDown(input, { key: "Enter" });
      expect(onValue).not.toHaveBeenCalled();

      rerender(<ShadcnChipsVariant allowDuplicates maxChips={2} value={["existing"]} onValue={onValue} />);
      fireEvent.keyDown(input, { key: "Enter" });
      expect(onValue).toHaveBeenCalledWith(["existing", "existing"], expect.anything());
   });
});

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
