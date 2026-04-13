import { dirname, resolve } from "node:path";
import { withCache } from "../async-utils/cache.js";
import { findPathRecursive } from "../async-utils/fs.js";
export const findProjectRoot = (ctx, options) => withCache("project-root", options.entryPoint ?? options.tailwindConfig ?? options.tsconfig, () => {
    const { entryPoint, tailwindConfig, tsconfig } = options;
    const rootItems = [
        "package.json",
        "node_modules",
        "tailwind.config.js",
        "tailwind.config.cjs",
        "tailwind.config.mjs",
        "tsconfig.json",
        "jsconfig.json"
    ];
    if (entryPoint || tailwindConfig || tsconfig) {
        const root = findPathRecursive(ctx.cwd, dirname(resolve(ctx.cwd, entryPoint ?? tailwindConfig ?? tsconfig)), rootItems);
        if (root) {
            return dirname(root);
        }
    }
});
//# sourceMappingURL=project.js.map