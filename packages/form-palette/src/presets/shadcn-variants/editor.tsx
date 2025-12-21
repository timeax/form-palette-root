// src/presets/shadcn-variants/editor.tsx

import * as React from "react";
import Editor from "@toast-ui/editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { cn } from "@/lib/utils";
import type { ChangeDetail, VariantBaseProps, } from "@/variants/shared";

/**
 * Host app MUST import Toast UI Editor CSS:
 *   import "@toast-ui/editor/dist/toastui-editor.css";
 */

export type ToastToolbarItem =
    | "heading"
    | "bold"
    | "italic"
    | "strike"
    | "hr"
    | "quote"
    | "ul"
    | "ol"
    | "task"
    | "indent"
    | "outdent"
    | "table"
    | "image"
    | "link"
    | "code"
    | "codeblock";

export type EditorFormat = "html" | "markdown";
export type EditorToolbar = "default" | "none" | ToastToolbarItem[][];

type TuiEditorInstance = {
    getHTML(): string;
    getMarkdown(): string;
    setHTML(html: string, cursorToEnd?: boolean): void;
    setMarkdown(markdown: string, cursorToEnd?: boolean): void;
    insertText(text: string): void;

    setHeight?(height: string): void;
    setPlaceholder?(placeholder: string): void;
    changeMode?(mode: "markdown" | "wysiwyg", withoutFocus?: boolean): void;
    changePreviewStyle?(style: "tab" | "vertical"): void;

    on(type: string, handler: (...args: any[]) => void): void;
    off(type: string): void;
    destroy(): void;
};

export interface ShadcnEditorVariantProps extends Pick<
    VariantBaseProps<string | undefined>,
    | "value"
    | "onValue"
    | "error"
    | "disabled"
    | "readOnly"
    | "required"
    | "size"
    | "density"
> {
    placeholder?: string;
    height?: string; // ex) "400px"
    previewStyle?: "vertical" | "tab";
    editType?: "wysiwyg" | "markdown";
    useCommandShortcut?: boolean;

    /** Which format to store in the form value */
    format?: EditorFormat;

    /**
     * Toolbar config:
     * - "default" uses Toast UI defaults
     * - "none" hides tools + mode switch
     * - array provides toolbarItems
     */
    toolbar?: EditorToolbar;

    /** If true, paste is intercepted and inserted as plain text only */
    pastePlainText?: boolean;

    className?: string;
}

export function ShadcnEditorVariant(props: ShadcnEditorVariantProps) {
    const {
        value,
        onValue,
        error,
        disabled,
        readOnly,
        required,
        size,
        density,
        className,

        placeholder = "",
        height = "400px",
        previewStyle = "vertical",
        editType = "wysiwyg",
        useCommandShortcut = true,
        format = "html",
        toolbar = "default",
        pastePlainText = false,
    } = props;

    const mountRef = React.useRef<HTMLDivElement>(null);
    const editorRef = React.useRef<TuiEditorInstance | null>(null);

    const formatRef = React.useRef<EditorFormat>(format);
    const onValueRef = React.useRef<typeof onValue>(onValue);

    const syncingRef = React.useRef(false);
    const loadedRef = React.useRef(false);

    formatRef.current = format;
    onValueRef.current = onValue;

    const effectiveReadOnly = Boolean(disabled || readOnly);

    const readContent = React.useCallback((ed: TuiEditorInstance): string => {
        return formatRef.current === "markdown"
            ? (ed.getMarkdown() ?? "")
            : (ed.getHTML() ?? "");
    }, []);

    const emit = React.useCallback((next: string) => {
        const detail: ChangeDetail<string> = { source: "user", raw: next };
        onValueRef.current?.(next, detail);
    }, []);

    const structuralKey = React.useMemo(() => {
        const hideModeSwitch = toolbar === "none" || pastePlainText;
        // toolbar array is serializable (strings)
        return JSON.stringify({ toolbar, useCommandShortcut, hideModeSwitch });
    }, [toolbar, useCommandShortcut, pastePlainText]);

    // Create / recreate editor when structural options change
    React.useEffect(() => {
        const el = mountRef.current;
        if (!el) return;

        // Clean existing instance first
        if (editorRef.current) {
            try {
                editorRef.current.off("change");
            } catch {}
            try {
                editorRef.current.off("load");
            } catch {}
            try {
                editorRef.current.destroy();
            } catch {}
            editorRef.current = null;
        }

        loadedRef.current = false;
        syncingRef.current = true;

        const hideModeSwitch = toolbar === "none" || pastePlainText;

        const options: any = {
            el,
            height,
            initialValue: value ?? "",
            previewStyle,
            initialEditType: editType,
            useCommandShortcut,
            usageStatistics: false,
            placeholder,
            hideModeSwitch,
            ...(toolbar === "none"
                ? { toolbarItems: [] }
                : Array.isArray(toolbar)
                  ? { toolbarItems: toolbar }
                  : {}),
            events: {
                load: () => {
                    loadedRef.current = true;
                    syncingRef.current = false;
                },
                change: () => {
                    const ed = editorRef.current;
                    if (!ed) return;
                    if (syncingRef.current) return;
                    emit(readContent(ed));
                },
            },
        };

        editorRef.current = new (Editor as any)(options) as TuiEditorInstance;

        // If load never fires for some reason, don’t permanently block changes
        Promise.resolve().then(() => {
            syncingRef.current = false;
        });

        return () => {
            const ed = editorRef.current;
            if (!ed) return;

            try {
                ed.off("change");
            } catch {}
            try {
                ed.off("load");
            } catch {}
            try {
                ed.destroy();
            } catch {}

            editorRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [structuralKey]); // intentionally only structural props

    // Keep height/placeholder updated without recreating (when supported)
    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.setHeight === "function") ed.setHeight(height);
    }, [height]);

    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.setPlaceholder === "function")
            ed.setPlaceholder(placeholder);
    }, [placeholder]);

    // Update mode + preview style without recreating (when supported)
    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.changeMode === "function") ed.changeMode(editType);
    }, [editType]);

    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;
        if (typeof ed.changePreviewStyle === "function")
            ed.changePreviewStyle(previewStyle);
    }, [previewStyle]);

    // Sync external value → editor (avoid cursor-jank with equality checks)
    React.useEffect(() => {
        const ed = editorRef.current;
        if (!ed) return;

        const next = value ?? "";

        syncingRef.current = true;

        if (format === "markdown") {
            const cur = ed.getMarkdown?.() ?? "";
            if (cur !== next) ed.setMarkdown(next, false);
        } else {
            const cur = ed.getHTML?.() ?? "";
            if (cur !== next) ed.setHTML(next, false);
        }

        Promise.resolve().then(() => {
            syncingRef.current = false;
        });
    }, [value, format]);

    // Plain-text paste interception (optional)
    React.useEffect(() => {
        if (!pastePlainText) return;

        const host = mountRef.current;
        if (!host) return;

        const onPaste = (e: ClipboardEvent) => {
            e.preventDefault();
            const text = e.clipboardData?.getData("text/plain") ?? "";
            const ed = editorRef.current;
            if (text && ed) ed.insertText(text);
        };

        host.addEventListener("paste", onPaste);
        return () => host.removeEventListener("paste", onPaste);
    }, [pastePlainText]);

    return (
        <div
            data-size={size}
            data-density={density}
            className={cn(
                "rounded-md border border-input bg-background overflow-hidden",
                effectiveReadOnly && "opacity-60 pointer-events-none",
                className
            )}
            aria-invalid={error ? true : undefined}
            aria-required={required ? true : undefined}
        >
            <div ref={mountRef} />
        </div>
    );
}