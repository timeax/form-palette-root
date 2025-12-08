import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    //@ts-ignore
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            // Alias for the library SOURCE
            "@": resolve(__dirname, "../packages/form-palette/src"),

            // Alias for the playground app itself
            "@app": resolve(__dirname, "./src"),

            // Optional: so you can still import by package name
            "@timeax/form-palette": resolve(
                __dirname,
                "../packages/form-palette/src"
            ),
        },
    },
});
