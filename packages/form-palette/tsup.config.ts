// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
    entry: {
        index: "src/index.ts", // main library entry
        adapters: "src/adapters/index.ts", // 👈 new entry
        extra: "src/extra.ts",
    },
    outDir: "dist",
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    target: "es2019",
    treeshake: true,
    splitting: false,
    platform: "browser",
    external: [
        "react",
        "axios",
        "react-dom",
        "@inertiajs/core",
        "@inertiajs/react",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dialog",
        "@radix-ui/react-label",
        "@radix-ui/react-popover",
        "@radix-ui/react-radio-group",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-select",
        "@radix-ui/react-separator",
        "@radix-ui/react-slider",
        "@radix-ui/react-slot",
        "@radix-ui/react-switch",
        "@radix-ui/react-toggle",
        "@radix-ui/react-toggle-group",
        "@radix-ui/react-tooltip",
        "react-virtuosp",
    ],
});
