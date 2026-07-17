// @vitest-environment jsdom

import * as React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";

vi.mock("@toast-ui/editor", () => {
   const ctorCalls: any[] = [];
   const instances: any[] = [];

   class MockEditor {
      private html: string;
      private markdown: string;
      private handlers: Record<string, (...args: any[]) => void> = {};

      constructor(options: any) {
         ctorCalls.push(options);
         this.html = options.initialValue ?? "";
         this.markdown = options.initialValue ?? "";
         instances.push(this);
      }

      getHTML() {
         return this.html;
      }
      getMarkdown() {
         return this.markdown;
      }
      setHTML(html: string) {
         this.html = html;
      }
      setMarkdown(markdown: string) {
         this.markdown = markdown;
      }
      insertText(text: string) {
         this.html += text;
         this.markdown += text;
      }
      on(type: string, handler: (...args: any[]) => void) {
         this.handlers[type] = handler;
      }
      off(type: string) {
         delete this.handlers[type];
      }
      destroy() {}
   }

   return {
      default: MockEditor,
      __mock: {
         ctorCalls,
         instances,
      },
   };
});

import { ShadcnEditorVariant } from "../src/presets/shadcn/variants/editor";
import * as ToastEditorModule from "@toast-ui/editor";

const editorMock = (ToastEditorModule as any).__mock as {
   ctorCalls: any[];
   instances: any[];
};

describe("editor variant theme support", () => {
   beforeEach(() => {
      editorMock.ctorCalls.length = 0;
      editorMock.instances.length = 0;
   });

   it("uses dark theme in auto mode under dark ancestor", async () => {
      const { container } = render(
         <div className="dark">
            <ShadcnEditorVariant value="hello" onValue={vi.fn()} theme="auto" />
         </div>,
      );

      await waitFor(() =>
         expect(container.querySelector("[data-editor-theme='dark']")).toBeTruthy(),
      );

      const lastCtor = editorMock.ctorCalls[editorMock.ctorCalls.length - 1];
      expect(lastCtor.theme).toBe("dark");
   });

   it("uses light theme in auto mode under light ancestor", async () => {
      const { container } = render(
         <div>
            <ShadcnEditorVariant value="hello" onValue={vi.fn()} theme="auto" />
         </div>,
      );

      await waitFor(() =>
         expect(container.querySelector("[data-editor-theme='light']")).toBeTruthy(),
      );

      const lastCtor = editorMock.ctorCalls[editorMock.ctorCalls.length - 1];
      expect(lastCtor.theme).toBeUndefined();
   });

   it("honors explicit dark override", async () => {
      const { container } = render(
         <div>
            <ShadcnEditorVariant value="hello" onValue={vi.fn()} theme="dark" />
         </div>,
      );

      await waitFor(() =>
         expect(container.querySelector("[data-editor-theme='dark']")).toBeTruthy(),
      );

      const lastCtor = editorMock.ctorCalls[editorMock.ctorCalls.length - 1];
      expect(lastCtor.theme).toBe("dark");
   });

   it("honors explicit light override inside dark ancestor", async () => {
      const { container } = render(
         <div className="dark">
            <ShadcnEditorVariant value="hello" onValue={vi.fn()} theme="light" />
         </div>,
      );

      await waitFor(() =>
         expect(container.querySelector("[data-editor-theme='light']")).toBeTruthy(),
      );

      const lastCtor = editorMock.ctorCalls[editorMock.ctorCalls.length - 1];
      expect(lastCtor.theme).toBeUndefined();
   });

   it("recreates on theme flip without losing external value", async () => {
      function Host() {
         const [dark, setDark] = React.useState(false);

         React.useEffect(() => {
            setDark(true);
         }, []);

         return (
            <div className={dark ? "dark" : ""}>
               <ShadcnEditorVariant value="persist-me" onValue={vi.fn()} theme="auto" />
            </div>
         );
      }

      render(<Host />);

      await waitFor(() => {
         expect(editorMock.ctorCalls.length).toBeGreaterThan(1);
      });

      const lastCtor = editorMock.ctorCalls[editorMock.ctorCalls.length - 1];
      expect(lastCtor.initialValue).toBe("persist-me");
      expect(lastCtor.theme).toBe("dark");
   });

   it("does not change value contract while typing path stays intact", async () => {
      const onValue = vi.fn();
      render(<ShadcnEditorVariant value="x" onValue={onValue} theme="dark" />);

      const ctor = editorMock.ctorCalls[editorMock.ctorCalls.length - 1];
      const firstInstance = editorMock.instances[editorMock.instances.length - 1];
      firstInstance.setHTML("next-value");
      
      // Wait for editor ref setup microtasks to complete (resets syncingRef.current)
      await Promise.resolve();
      ctor.events.change();

      await waitFor(() => {
         expect(onValue).toHaveBeenCalledWith(
            "next-value",
            expect.objectContaining({
               source: "user",
               raw: "next-value",
            }),
         );
      });
   });
});
