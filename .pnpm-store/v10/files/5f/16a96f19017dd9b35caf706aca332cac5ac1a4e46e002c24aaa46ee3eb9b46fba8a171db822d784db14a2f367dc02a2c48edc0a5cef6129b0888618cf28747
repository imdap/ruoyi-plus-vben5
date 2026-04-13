import { readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";
import { createJiti } from "jiti";
import { withCache } from "../async-utils/cache.js";
import { normalize } from "../async-utils/path.js";
import { resolveCss, resolveJs } from "../async-utils/resolvers.js";
export const createTailwindContext = async (ctx) => withCache("tailwind-context", ctx.tailwindConfigPath, async () => {
    const jiti = createJiti(getCurrentFilename(), {
        fsCache: false,
        moduleCache: false
    });
    const importBasePath = dirname(ctx.tailwindConfigPath);
    const tailwindPath = resolveJs(ctx, "tailwindcss", importBasePath);
    // eslint-disable-next-line eslint-plugin-typescript/naming-convention
    const { __unstable__loadDesignSystem } = await import(normalize(tailwindPath));
    const css = await readFile(ctx.tailwindConfigPath, "utf-8");
    // Load the design system and set up a compatible context object that is
    // usable by the rest of the plugin
    const design = await __unstable__loadDesignSystem(css, {
        base: importBasePath,
        loadModule: createLoader(ctx, jiti, {
            filepath: ctx.tailwindConfigPath,
            legacy: false,
            onError: (id, err, resourceType) => {
                console.error(`Unable to load ${resourceType}: ${id}`, err);
                if (resourceType === "config") {
                    return {};
                }
                else if (resourceType === "plugin") {
                    return () => { };
                }
            }
        }),
        loadStylesheet: async (id, base) => {
            try {
                const resolved = resolveCss(ctx, id, base);
                return {
                    base: dirname(resolved),
                    content: await readFile(resolved, "utf-8")
                };
            }
            catch {
                return {
                    base: "",
                    content: ""
                };
            }
        }
    });
    return design;
});
function createLoader(ctx, jiti, { filepath, legacy, onError }) {
    const cacheKey = `${+Date.now()}`;
    async function loadFile(id, base, resourceType) {
        try {
            const resolved = resolveJs(ctx, id, base);
            const url = pathToFileURL(resolved);
            url.searchParams.append("t", cacheKey);
            return await jiti.import(url.href, { default: true });
        }
        catch (err) {
            return onError(id, err, resourceType);
        }
    }
    if (legacy) {
        const baseDir = dirname(filepath);
        return async (id) => loadFile(id, baseDir, "module");
    }
    return async (id, base, resourceType) => {
        return {
            base,
            module: await loadFile(id, base, resourceType)
        };
    };
}
function getCurrentFilename() {
    // eslint-disable-next-line eslint-plugin-typescript/prefer-ts-expect-error
    // @ts-ignore - `import.meta` doesn't exist in CommonJS -> will be transformed in build step
    return import.meta.url;
}
//# sourceMappingURL=context.async.v4.js.map