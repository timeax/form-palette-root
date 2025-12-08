// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
   entry: {
      index: "src/index.ts",                 // main library entry
      adapters: "src/adapters/index.ts",     // 👈 new entry
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
   external: ["react", "react-dom"],
});