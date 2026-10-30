// Packages the deployable app into dist/ (used by the CI "Archive build artifact" step).
import { cpSync, mkdirSync, rmSync } from "node:fs";

const files = ["server.js", "package.json", "package-lock.json", "src"];
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");
for (const file of files) {
  cpSync(file, `dist/${file}`, { recursive: true });
}
console.log(`Built dist/ with: ${files.join(", ")}`);
