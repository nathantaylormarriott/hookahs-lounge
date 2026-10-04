import { cp, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const serverDir = join(root, ".netlify/functions-internal/server");
const sourceModules = join(root, "node_modules");
const dest = join(serverDir, "node_modules");

if (!existsSync(serverDir)) {
  console.log("Skipping impit copy; Netlify function output is not present.");
  process.exit(0);
}

const names = (await readdir(sourceModules)).filter(
  (name) => name === "impit" || name.startsWith("impit-"),
);

if (!names.includes("impit")) {
  throw new Error("impit is not installed, so the Instagram feed cannot run in production.");
}

await mkdir(dest, { recursive: true });
for (const name of names) {
  await cp(join(sourceModules, name), join(dest, name), { recursive: true, dereference: true });
}

console.log(`Copied ${names.join(", ")} into the Netlify function.`);
