import * as React from "react";

import { cn } from "@/lib/utils";
import type {
    ChangeDetail,
    VariantBaseProps,
} from "@/variants/shared";

export type EditorTheme = "auto" | "light" | "dark";
export type EditorThemeTarget = "nearest" | "document";

export type EditorToolbarItem =
    | "heading"
    | "bold"
    | "italic"
    | "strike"
    | "hr"
    | "quote"
    | "ul"
    | "ol"
    | "task"
    | "table"
    | "code"
    | "codeblock";

export type EditorToolbar =
    | "default"
    | "none"
    | EditorToolbarItem[][];

export interface ShadcnEditorVariantProps
    extends Pick<
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
    height?: string;

    /**
     * Toolbar configuration.
     *
     * - "default": standard Milkdown toolbar
     * - "none": no toolbar
     * - nested array: custom toolbar groups
     */
    toolbar?: EditorToolbar;

    /**
     * If true, pasted rich content is converted to plain text.
     */
    pastePlainText?: boolean;

    /**
     * Editor theme.
     */
    theme?: EditorTheme;

    /**
     * Where `theme="auto"` should resolve its theme.
     */
    themeTarget?: EditorThemeTarget;

    className?: string;
}

type MilkdownEditor = {
    action<T>(action: (ctx: any) => T): T;
    destroy(): Promise<void> | void;
};

const DEFAULT_TOOLBAR: EditorToolbarItem[][] = [
    ["heading"],
    ["bold", "italic", "strike", "code"],
    ["ul", "ol", "task"],
    ["quote", "codeblock"],
    ["table", "hr"],
];

function isDarkThemedElement(
    element: Element | null | undefined,
): boolean {
    if (!element) {
        return false;
    }

    if (element.classList.contains("dark")) {
        return true;
    }

    return element.getAttribute("data-theme") === "dark";
}

function resolveAutoDarkFromHost(
    host: HTMLElement | null,
    target: EditorThemeTarget,
): boolean {
    if (typeof document === "undefined") {
        return false;
    }

    if (target === "document") {
        return (
            isDarkThemedElement(document.documentElement) ||
            isDarkThemedElement(document.body)
        );
    }

    let node: HTMLElement | null = host;

    while (node) {
        const isEditorMarker =
            node.hasAttribute("data-editor-theme");

        if (!isEditorMarker) {
            if (node.classList.contains("dark")) {
                return true;
            }

            if (node.hasAttribute("data-theme")) {
                return (
                    node.getAttribute("data-theme") === "dark"
                );
            }
        }

        node = node.parentElement;
    }

    return (
        isDarkThemedElement(document.documentElement) ||
        isDarkThemedElement(document.body)
    );
}

function ToolbarButton({
    children,
    disabled,
    title,
    onClick,
}: {
    children: React.ReactNode;
    disabled?: boolean;
    title: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            title={title}
            disabled={disabled}
            onMouseDown={(event) => {
                event.preventDefault();
            }}
            onClick={onClick}
            className={cn(
                "inline-flex h-8 min-w-8 items-center justify-center",
                "rounded-md px-2 text-sm",
                "text-foreground",
                "transition-colors",
                "hover:bg-muted",
                "disabled:pointer-events-none disabled:opacity-50",
            )}
        >
            {children}
        </button>
    );
}

export function ShadcnEditorVariant(
    props: ShadcnEditorVariantProps,
) {
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
        toolbar = "default",
        pastePlainText = false,
        theme = "auto",
        themeTarget = "nearest",
    } = props;

    const containerRef =
        React.useRef<HTMLDivElement>(null);

    const mountRef =
        React.useRef<HTMLDivElement>(null);

    const editorRef =
        React.useRef<MilkdownEditor | null>(null);

    const onValueRef =
        React.useRef<typeof onValue>(onValue);

    const valueRef =
        React.useRef(value ?? "");

    const syncingRef = React.useRef(false);

    const [ready, setReady] = React.useState(false);
    const [autoDark, setAutoDark] =
        React.useState(false);

    onValueRef.current = onValue;

    const effectiveReadOnly =
        Boolean(disabled || readOnly);

    const effectiveTheme: "light" | "dark" =
        theme === "auto"
            ? autoDark
                ? "dark"
                : "light"
            : theme;

    const toolbarGroups =
        toolbar === "default"
            ? DEFAULT_TOOLBAR
            : toolbar === "none"
              ? []
              : toolbar;

    const emit = React.useCallback(
        (next: string) => {
            valueRef.current = next;

            const detail: ChangeDetail<string> = {
                source: "user",
                raw: next,
            };

            onValueRef.current?.(next, detail);
        },
        [],
    );

    /**
     * Resolve automatic theme.
     */
    React.useEffect(() => {
        if (theme !== "auto") {
            return;
        }

        if (typeof document === "undefined") {
            return;
        }

        const host = containerRef.current;

        const recompute = () => {
            setAutoDark(
                resolveAutoDarkFromHost(
                    host,
                    themeTarget,
                ),
            );
        };

        recompute();

        const observer = new MutationObserver(
            recompute,
        );

        observer.observe(
            document.documentElement,
            {
                attributes: true,
                subtree: true,
                attributeFilter: [
                    "class",
                    "data-theme",
                ],
            },
        );

        if (document.body) {
            observer.observe(document.body, {
                attributes: true,
                subtree: true,
                attributeFilter: [
                    "class",
                    "data-theme",
                ],
            });
        }

        return () => observer.disconnect();
    }, [theme, themeTarget]);

    /**
     * Create Milkdown.
     *
     * Everything Milkdown-related is dynamically imported
     * here intentionally. This keeps Form Palette safe when
     * its root entrypoint is evaluated by Node during SSR.
     */
    React.useEffect(() => {
        const root = mountRef.current;

        if (!root) {
            return;
        }

        let disposed = false;

        const createEditor = async () => {
            const [
                core,
                commonmarkModule,
                gfmModule,
                listenerModule,
            ] = await Promise.all([
                import("@milkdown/kit/core"),
                import(
                    "@milkdown/kit/preset/commonmark"
                ),
                import(
                    "@milkdown/kit/preset/gfm"
                ),
                import(
                    "@milkdown/kit/plugin/listener"
                ),
            ]);

            if (disposed) {
                return;
            }

            const {
                Editor,
                rootCtx,
                defaultValueCtx,
                editorViewOptionsCtx,
            } = core;

            const { commonmark } =
                commonmarkModule;

            const { gfm } = gfmModule;

            const {
                listener,
                listenerCtx,
            } = listenerModule;

            const editor = await Editor.make()
                .config((ctx) => {
                    ctx.set(rootCtx, root);

                    ctx.set(
                        defaultValueCtx,
                        valueRef.current,
                    );

                    ctx.update(
                        editorViewOptionsCtx,
                        (previous) => ({
                            ...previous,
                            editable: () =>
                                !effectiveReadOnly,
                            attributes: {
                                ...previous.attributes,
                                class:
                                    "form-palette-milkdown-editor",
                                "aria-required":
                                    required
                                        ? "true"
                                        : "false",
                                "aria-invalid": error
                                    ? "true"
                                    : "false",
                                "data-placeholder":
                                    placeholder,
                            },
                        }),
                    );

                    ctx.get(
                        listenerCtx,
                    ).markdownUpdated(
                        (
                            _ctx,
                            markdown,
                            previousMarkdown,
                        ) => {
                            if (
                                syncingRef.current ||
                                markdown ===
                                    previousMarkdown
                            ) {
                                return;
                            }

                            emit(markdown);
                        },
                    );
                })
                .use(commonmark)
                .use(gfm)
                .use(listener)
                .create();

            if (disposed) {
                await editor.destroy();
                return;
            }

            editorRef.current =
                editor as unknown as MilkdownEditor;

            setReady(true);
        };

        void createEditor();

        return () => {
            disposed = true;
            setReady(false);

            const editor = editorRef.current;
            editorRef.current = null;

            if (editor) {
                void editor.destroy();
            }
        };

        // Creation should happen only when the editor's
        // structural configuration changes.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        effectiveReadOnly,
        placeholder,
        required,
        Boolean(error),
    ]);

    /**
     * Controlled value:
     *
     * external value -> Milkdown
     */
    React.useEffect(() => {
        const next = value ?? "";

        if (next === valueRef.current) {
            return;
        }

        valueRef.current = next;

        const editor = editorRef.current;

        if (!editor) {
            return;
        }

        const sync = async () => {
            const { replaceAll } =
                await import(
                    "@milkdown/kit/utils"
                );

            if (!editorRef.current) {
                return;
            }

            syncingRef.current = true;

            try {
                editor.action(
                    replaceAll(next),
                );
            } finally {
                queueMicrotask(() => {
                    syncingRef.current = false;
                });
            }
        };

        void sync();
    }, [value]);

    /**
     * Optional plain-text paste handling.
     */
    React.useEffect(() => {
        if (!pastePlainText) {
            return;
        }

        const host = mountRef.current;

        if (!host) {
            return;
        }

        const onPaste = (
            event: ClipboardEvent,
        ) => {
            const editor = editorRef.current;

            if (!editor) {
                return;
            }

            const text =
                event.clipboardData?.getData(
                    "text/plain",
                );

            if (!text) {
                return;
            }

            event.preventDefault();

            void import(
                "@milkdown/kit/utils"
            ).then(({ insert }) => {
                editor.action(
                    insert(text, true),
                );
            });
        };

        host.addEventListener(
            "paste",
            onPaste,
            true,
        );

        return () => {
            host.removeEventListener(
                "paste",
                onPaste,
                true,
            );
        };
    }, [pastePlainText]);

    const runToolbarAction =
        React.useCallback(
            async (
                item: EditorToolbarItem,
            ) => {
                const editor =
                    editorRef.current;

                if (
                    !editor ||
                    effectiveReadOnly
                ) {
                    return;
                }

                const [
                    { callCommand },
                    commonmarkModule,
                    gfmModule,
                ] = await Promise.all([
                    import(
                        "@milkdown/kit/utils"
                    ),
                    import(
                        "@milkdown/kit/preset/commonmark"
                    ),
                    import(
                        "@milkdown/kit/preset/gfm"
                    ),
                ]);

                const {
                    wrapInHeadingCommand,
                    toggleStrongCommand,
                    toggleEmphasisCommand,
                    toggleInlineCodeCommand,
                    wrapInBlockquoteCommand,
                    wrapInBulletListCommand,
                    wrapInOrderedListCommand,
                    insertHrCommand,
                    createCodeBlockCommand,
                } = commonmarkModule;

                const {
                    toggleStrikethroughCommand,
                    insertTableCommand,
                } = gfmModule;

                switch (item) {
                    case "heading":
                        editor.action(
                            callCommand(
                                wrapInHeadingCommand.key,
                                2,
                            ),
                        );
                        break;

                    case "bold":
                        editor.action(
                            callCommand(
                                toggleStrongCommand.key,
                            ),
                        );
                        break;

                    case "italic":
                        editor.action(
                            callCommand(
                                toggleEmphasisCommand.key,
                            ),
                        );
                        break;

                    case "strike":
                        editor.action(
                            callCommand(
                                toggleStrikethroughCommand.key,
                            ),
                        );
                        break;

                    case "code":
                        editor.action(
                            callCommand(
                                toggleInlineCodeCommand.key,
                            ),
                        );
                        break;

                    case "quote":
                        editor.action(
                            callCommand(
                                wrapInBlockquoteCommand.key,
                            ),
                        );
                        break;

                    case "ul":
                        editor.action(
                            callCommand(
                                wrapInBulletListCommand.key,
                            ),
                        );
                        break;

                    case "ol":
                        editor.action(
                            callCommand(
                                wrapInOrderedListCommand.key,
                            ),
                        );
                        break;

                    case "codeblock":
                        editor.action(
                            callCommand(
                                createCodeBlockCommand.key,
                            ),
                        );
                        break;

                    case "hr":
                        editor.action(
                            callCommand(
                                insertHrCommand.key,
                            ),
                        );
                        break;

                    case "table":
                        editor.action(
                            callCommand(
                                insertTableCommand.key,
                            ),
                        );
                        break;

                    case "task": {
                        const { insert } =
                            await import(
                                "@milkdown/kit/utils"
                            );

                        editor.action(
                            insert("- [ ] ", true),
                        );

                        break;
                    }
                }
            },
            [effectiveReadOnly],
        );

    const toolbarLabel = (
        item: EditorToolbarItem,
    ) => {
        switch (item) {
            case "heading":
                return "H2";
            case "bold":
                return "B";
            case "italic":
                return "I";
            case "strike":
                return "S";
            case "code":
                return "</>";
            case "quote":
                return "❝";
            case "ul":
                return "• List";
            case "ol":
                return "1.";
            case "task":
                return "☑";
            case "codeblock":
                return "{ }";
            case "table":
                return "Table";
            case "hr":
                return "—";
        }
    };

    const toolbarTitle = (
        item: EditorToolbarItem,
    ) => {
        switch (item) {
            case "heading":
                return "Heading";
            case "bold":
                return "Bold";
            case "italic":
                return "Italic";
            case "strike":
                return "Strikethrough";
            case "code":
                return "Inline code";
            case "quote":
                return "Block quote";
            case "ul":
                return "Bullet list";
            case "ol":
                return "Ordered list";
            case "task":
                return "Task list";
            case "codeblock":
                return "Code block";
            case "table":
                return "Table";
            case "hr":
                return "Horizontal rule";
        }
    };

    return (
        <div
            ref={containerRef}
            data-size={size}
            data-density={density}
            data-theme={effectiveTheme}
            data-editor-theme={
                effectiveTheme
            }
            data-ready={ready || undefined}
            aria-invalid={
                error ? true : undefined
            }
            aria-required={
                required
                    ? true
                    : undefined
            }
            className={cn(
                "overflow-hidden rounded-md border border-input",
                "bg-surfaces-input text-foreground",
                effectiveReadOnly &&
                    "opacity-60",
                error &&
                    "border-destructive",
                className,
            )}
        >
            {toolbarGroups.length > 0 && (
                <div
                    className={cn(
                        "flex flex-wrap items-center gap-1",
                        "border-b border-border",
                        "px-2 py-1.5",
                    )}
                >
                    {toolbarGroups.map(
                        (group, groupIndex) => (
                            <React.Fragment
                                key={groupIndex}
                            >
                                {groupIndex >
                                    0 && (
                                    <span
                                        aria-hidden="true"
                                        className="mx-1 h-5 w-px bg-border"
                                    />
                                )}

                                <div className="flex items-center gap-0.5">
                                    {group.map(
                                        (item) => (
                                            <ToolbarButton
                                                key={
                                                    item
                                                }
                                                title={toolbarTitle(
                                                    item,
                                                )}
                                                disabled={
                                                    effectiveReadOnly ||
                                                    !ready
                                                }
                                                onClick={() =>
                                                    void runToolbarAction(
                                                        item,
                                                    )
                                                }
                                            >
                                                {toolbarLabel(
                                                    item,
                                                )}
                                            </ToolbarButton>
                                        ),
                                    )}
                                </div>
                            </React.Fragment>
                        ),
                    )}
                </div>
            )}

            <div
                ref={mountRef}
                className={cn(
                    "form-palette-milkdown",
                    "[&_.milkdown]:min-h-full",
                    "[&_.ProseMirror]:min-h-full",
                    "[&_.ProseMirror]:outline-none",
                    "[&_.ProseMirror]:px-4",
                    "[&_.ProseMirror]:py-3",
                    "[&_.ProseMirror]:text-foreground",
                    "[&_.ProseMirror_p]:my-2",
                    "[&_.ProseMirror_h1]:mb-3",
                    "[&_.ProseMirror_h1]:mt-4",
                    "[&_.ProseMirror_h1]:text-2xl",
                    "[&_.ProseMirror_h1]:font-semibold",
                    "[&_.ProseMirror_h2]:mb-3",
                    "[&_.ProseMirror_h2]:mt-4",
                    "[&_.ProseMirror_h2]:text-xl",
                    "[&_.ProseMirror_h2]:font-semibold",
                    "[&_.ProseMirror_h3]:mb-2",
                    "[&_.ProseMirror_h3]:mt-3",
                    "[&_.ProseMirror_h3]:text-lg",
                    "[&_.ProseMirror_h3]:font-semibold",
                    "[&_.ProseMirror_blockquote]:border-l-2",
                    "[&_.ProseMirror_blockquote]:border-border",
                    "[&_.ProseMirror_blockquote]:pl-4",
                    "[&_.ProseMirror_blockquote]:text-muted-foreground",
                    "[&_.ProseMirror_code]:rounded-sm",
                    "[&_.ProseMirror_code]:bg-muted",
                    "[&_.ProseMirror_code]:px-1",
                    "[&_.ProseMirror_pre]:overflow-x-auto",
                    "[&_.ProseMirror_pre]:rounded-md",
                    "[&_.ProseMirror_pre]:bg-muted",
                    "[&_.ProseMirror_pre]:p-3",
                    "[&_.ProseMirror_ul]:list-disc",
                    "[&_.ProseMirror_ul]:pl-6",
                    "[&_.ProseMirror_ol]:list-decimal",
                    "[&_.ProseMirror_ol]:pl-6",
                    "[&_.ProseMirror_table]:w-full",
                    "[&_.ProseMirror_table]:border-collapse",
                    "[&_.ProseMirror_td]:border",
                    "[&_.ProseMirror_td]:border-border",
                    "[&_.ProseMirror_td]:p-2",
                    "[&_.ProseMirror_th]:border",
                    "[&_.ProseMirror_th]:border-border",
                    "[&_.ProseMirror_th]:p-2",
                )}
                style={{
                    minHeight: height,
                }}
            />
        </div>
    );
}