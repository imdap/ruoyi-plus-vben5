import { a as resolveJsFrom, t as expiringMap } from "./resolve-pWjAK-4f-C1Z6M6r2.js";
import { n as cacheForDirs, t as bigSign } from "./utils-D8dQkKEd-BtAa7w-M.js";
import * as path from "node:path";
import { pathToFileURL } from "node:url";
import { dirname, resolve } from "path";
import { readdirSync, statSync } from "fs";
//#region ../../node_modules/.pnpm/prettier-plugin-tailwindcss@0.0.0-insiders.3997fbd_prettier@3.8.1/node_modules/prettier-plugin-tailwindcss/dist/sorter-BZkvDMjt.mjs
let seen = /* @__PURE__ */ new Set();
function warn(key, arg, ...args) {
	if (seen.has(key)) return;
	seen.add(key);
	console.warn(arg, ...args);
}
function error(key, arg, ...args) {
	if (seen.has(key)) return;
	seen.add(key);
	console.error(arg, ...args);
}
function sync_default(start, callback) {
	let dir = resolve(".", start);
	let tmp;
	if (!statSync(dir).isDirectory()) dir = dirname(dir);
	while (true) {
		tmp = callback(dir, readdirSync(dir));
		if (tmp) return resolve(dir, tmp);
		dir = dirname(tmp = dir);
		if (tmp === dir) break;
	}
}
function sortClasses(classStr, { env, ignoreFirst = false, ignoreLast = false, removeDuplicates = true, collapseWhitespace = {
	start: true,
	end: true
} }) {
	if (typeof classStr !== "string" || classStr === "") return classStr;
	if (classStr.includes("{{")) return classStr;
	if (env.options.tailwindPreserveWhitespace) collapseWhitespace = false;
	if (env.options.tailwindPreserveDuplicates) removeDuplicates = false;
	if (collapseWhitespace && /^[\t\r\f\n ]+$/.test(classStr)) return " ";
	let result = "";
	let parts = classStr.split(/([\t\r\f\n ]+)/);
	let classes = parts.filter((_, i) => i % 2 === 0);
	let whitespace = parts.filter((_, i) => i % 2 !== 0);
	if (classes[classes.length - 1] === "") classes.pop();
	if (collapseWhitespace) whitespace = whitespace.map(() => " ");
	let prefix = "";
	if (ignoreFirst) prefix = `${classes.shift() ?? ""}${whitespace.shift() ?? ""}`;
	let suffix = "";
	if (ignoreLast) suffix = `${whitespace.pop() ?? ""}${classes.pop() ?? ""}`;
	let { classList, removedIndices } = sortClassList({
		classList: classes,
		api: env.context,
		removeDuplicates
	});
	whitespace = whitespace.filter((_, index) => !removedIndices.has(index + 1));
	for (let i = 0; i < classList.length; i++) result += `${classList[i]}${whitespace[i] ?? ""}`;
	if (collapseWhitespace) {
		prefix = prefix.replace(/\s+$/g, " ");
		suffix = suffix.replace(/^\s+/g, " ");
		result = result.replace(/^\s+/, collapseWhitespace.start ? "" : " ").replace(/\s+$/, collapseWhitespace.end ? "" : " ");
	}
	return prefix + result + suffix;
}
function sortClassList({ classList, api, removeDuplicates }) {
	let orderedClasses = api.getClassOrder(classList);
	orderedClasses.sort(([nameA, a], [nameZ, z]) => {
		if (nameA === "..." || nameA === "…") return 1;
		if (nameZ === "..." || nameZ === "…") return -1;
		if (a === z) return 0;
		if (a === null) return -1;
		if (z === null) return 1;
		return bigSign(a - z);
	});
	let removedIndices = /* @__PURE__ */ new Set();
	if (removeDuplicates) {
		let seenClasses = /* @__PURE__ */ new Set();
		orderedClasses = orderedClasses.filter(([cls, order], index) => {
			if (seenClasses.has(cls)) {
				removedIndices.add(index);
				return false;
			}
			if (order !== null) seenClasses.add(cls);
			return true;
		});
	}
	return {
		classList: orderedClasses.map(([className]) => className),
		removedIndices
	};
}
function resolveIfRelative(base, filePath) {
	if (!filePath) return null;
	return path.isAbsolute(filePath) ? filePath : path.resolve(base, filePath);
}
let pathToApiMap = expiringMap(1e4);
async function getTailwindConfig(options) {
	let base = options.base ?? process.cwd();
	let inputDir = options.filepath ? path.dirname(options.filepath) : base;
	let configPath = resolveIfRelative(base, options.configPath);
	let stylesheetPath = resolveIfRelative(base, options.stylesheetPath);
	let [mod, pkgDir] = await resolveTailwindPath({ packageName: options.packageName }, inputDir);
	let stylesheet = resolveStylesheet(stylesheetPath, base);
	let jsConfig = resolveJsConfigPath(configPath);
	if (!stylesheet && !(mod === null || mod === void 0 ? void 0 : mod.__unstable__loadDesignSystem)) jsConfig = jsConfig ?? findClosestJsConfig(inputDir);
	if (jsConfig) {
		if (!stylesheet) return pathToApiMap.remember(`${pkgDir}:${jsConfig}`, async () => {
			const { loadV3 } = await import("./v3-D-mr2VVh-FqDpKDIq.js");
			return loadV3(pkgDir, jsConfig);
		});
		error("explicit-stylesheet-and-config-together", base, `You have specified a Tailwind CSS stylesheet and a Tailwind CSS config at the same time. Use stylesheetPath unless you are using v3. Preferring the stylesheet.`);
	}
	if (mod && !mod.__unstable__loadDesignSystem) {
		if (!stylesheet) return pathToApiMap.remember(`${pkgDir}:${jsConfig}`, async () => {
			const { loadV3 } = await import("./v3-D-mr2VVh-FqDpKDIq.js");
			return loadV3(pkgDir, jsConfig);
		});
		mod = null;
		error("stylesheet-unsupported", base, "You have specified a Tailwind CSS stylesheet but your installed version of Tailwind CSS does not support this feature.");
	}
	if (mod && mod.__unstable__loadDesignSystem && pkgDir) stylesheet ?? (stylesheet = `${pkgDir}/theme.css`);
	return pathToApiMap.remember(`${pkgDir}:${stylesheet}`, async () => {
		const { loadV4 } = await import("./v4-C-HWEQJm-6MZhb6TA.js");
		return loadV4(mod, stylesheet);
	});
}
let resolvedModCache = expiringMap(1e4);
async function resolveTailwindPath(options, baseDir) {
	let pkgName = options.packageName ?? "tailwindcss";
	let makeKey = (dir) => `${pkgName}:${dir}`;
	let cached = resolvedModCache.get(makeKey(baseDir));
	if (cached !== void 0) return cached;
	let resolve = async () => {
		let pkgDir = null;
		let mod = null;
		try {
			mod = await import(pathToFileURL(resolveJsFrom(baseDir, pkgName)).toString());
			let pkgFile = resolveJsFrom(baseDir, `${pkgName}/package.json`);
			pkgDir = path.dirname(pkgFile);
		} catch {}
		return [mod, pkgDir];
	};
	let result = await resolve();
	let [, pkgDir] = result;
	if (pkgDir) cacheForDirs(resolvedModCache, baseDir, result, pkgDir, makeKey);
	else resolvedModCache.set(makeKey(baseDir), result);
	return result;
}
function resolveJsConfigPath(configPath) {
	if (!configPath) return null;
	if (configPath.endsWith(".css")) return null;
	return configPath;
}
let configPathCache = /* @__PURE__ */ new Map();
function findClosestJsConfig(inputDir) {
	let cached = configPathCache.get(inputDir);
	if (cached !== void 0) return cached;
	let configPath = null;
	try {
		configPath = sync_default(inputDir, (_, names) => {
			if (names.includes("tailwind.config.js")) return "tailwind.config.js";
			if (names.includes("tailwind.config.cjs")) return "tailwind.config.cjs";
			if (names.includes("tailwind.config.mjs")) return "tailwind.config.mjs";
			if (names.includes("tailwind.config.ts")) return "tailwind.config.ts";
		}) ?? null;
	} catch {}
	if (configPath) cacheForDirs(configPathCache, inputDir, configPath, path.dirname(configPath));
	else configPathCache.set(inputDir, null);
	return configPath;
}
function resolveStylesheet(stylesheetPath, base) {
	if (!stylesheetPath) return null;
	if (stylesheetPath.endsWith(".js") || stylesheetPath.endsWith(".mjs") || stylesheetPath.endsWith(".cjs") || stylesheetPath.endsWith(".ts") || stylesheetPath.endsWith(".mts") || stylesheetPath.endsWith(".cts")) error("stylesheet-is-js-file", base, "Your `stylesheetPath` option points to a JS/TS config file. You must point to your project's `.css` file for v4 projects.");
	else if (stylesheetPath.endsWith(".sass") || stylesheetPath.endsWith(".scss") || stylesheetPath.endsWith(".less") || stylesheetPath.endsWith(".styl")) error("stylesheet-is-preprocessor-file", base, "Your `stylesheetPath` option points to a preprocessor file. This is unsupported and you may get unexpected results.");
	else if (!stylesheetPath.endsWith(".css")) error("stylesheet-is-not-css-file", base, "Your `stylesheetPath` option does not point to a CSS file. This is unsupported and you may get unexpected results.");
	return stylesheetPath;
}
async function createSorter(opts) {
	let preserveDuplicates = opts.preserveDuplicates ?? false;
	let preserveWhitespace = opts.preserveWhitespace ?? false;
	let api = await getTailwindConfig({
		base: opts.base,
		filepath: opts.filepath,
		configPath: opts.configPath,
		stylesheetPath: opts.stylesheetPath,
		packageName: opts.packageName
	});
	let env = {
		context: api,
		changes: [],
		options: {
			tailwindPreserveWhitespace: preserveWhitespace,
			tailwindPreserveDuplicates: preserveDuplicates,
			tailwindPackageName: opts.packageName
		},
		matcher: void 0
	};
	return {
		sortClassLists(classes) {
			return classes.map((list) => {
				return sortClassList({
					api,
					classList: list,
					removeDuplicates: !preserveDuplicates
				}).classList;
			});
		},
		sortClassAttributes(classes) {
			return classes.map((list) => sortClasses(list, { env }));
		}
	};
}
//#endregion
export { sortClasses as a, sortClassList as i, error as n, warn as o, getTailwindConfig as r, createSorter as t };
