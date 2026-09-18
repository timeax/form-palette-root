import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const source = resolve("src/styles.css");
const destination = resolve("dist/styles.css");

await mkdir(dirname(destination), {
    recursive: true,
});

await copyFile(source, destination);

console.log("Copied src/styles.css → dist/styles.css");