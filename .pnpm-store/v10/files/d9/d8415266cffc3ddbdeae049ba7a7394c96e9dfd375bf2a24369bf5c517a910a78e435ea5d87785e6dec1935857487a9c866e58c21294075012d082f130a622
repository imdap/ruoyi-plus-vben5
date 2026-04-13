import { a as JSONStringify, n as ArrayIsArray, r as DateNow } from "./globals.js";
import { t as getErrorMessage } from "./utils.js";
import { basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
//#region src-js/utils/node_version.ts
const TS_MODULE_EXTENSIONS = new Set([
	".ts",
	".mts",
	".cts"
]);
function normalizeModuleSpecifierPath(specifier) {
	if (!specifier.startsWith("file:")) return specifier;
	try {
		return fileURLToPath(specifier);
	} catch {
		return specifier;
	}
}
function isTypeScriptModuleSpecifier(specifier) {
	let ext = extname(normalizeModuleSpecifierPath(specifier)).toLowerCase();
	return TS_MODULE_EXTENSIONS.has(ext);
}
function isUnknownFileExtensionError(err) {
	if (err?.code === "ERR_UNKNOWN_FILE_EXTENSION") return !0;
	let message = err?.message;
	return typeof message == "string" && /unknown(?: or unsupported)? file extension/i.test(message);
}
function getUnsupportedTypeScriptModuleLoadHintForError(err, specifier, nodeVersion = process.version) {
	return !isTypeScriptModuleSpecifier(specifier) || !isUnknownFileExtensionError(err) ? null : `${getErrorMessage(err)}\n\nTypeScript config files require Node.js ^20.19.0 || >=22.18.0.\nDetected Node.js ${nodeVersion}.\nPlease upgrade Node.js or use a JSON config file instead.`;
}
//#endregion
//#region src-js/js_config.ts
const isObject = (v) => typeof v == "object" && !!v && !ArrayIsArray(v), VITE_OXLINT_CONFIG_FIELD = "lint";
function validateConfigExtends(root) {
	let visited = /* @__PURE__ */ new WeakSet(), inStack = /* @__PURE__ */ new WeakSet(), stackObjects = [], stackPaths = [], formatCycleError = (refPath, cycleStart, idx) => `\`extends\` contains a circular reference.

${refPath} points back to ${cycleStart}\nCycle: ${idx === -1 ? `${cycleStart} -> ${cycleStart}` : [...stackPaths.slice(idx), cycleStart].join(" -> ")}`, visit = (config, path) => {
		if (visited.has(config)) return;
		if (inStack.has(config)) {
			let idx = stackObjects.indexOf(config), cycleStart = idx === -1 ? "<unknown>" : stackPaths[idx];
			throw Error(formatCycleError(path, cycleStart, idx));
		}
		inStack.add(config), stackObjects.push(config), stackPaths.push(path);
		let maybeExtends = config.extends;
		if (maybeExtends !== void 0) {
			if (!ArrayIsArray(maybeExtends)) throw Error("`extends` must be an array of config objects (strings/paths are not supported).");
			for (let i = 0; i < maybeExtends.length; i++) {
				let item = maybeExtends[i];
				if (!isObject(item)) throw Error(`\`extends[${i}]\` must be a config object (strings/paths are not supported).`);
				let itemPath = `${path}.extends[${i}]`;
				if (inStack.has(item)) {
					let idx = stackObjects.indexOf(item), cycleStart = idx === -1 ? "<unknown>" : stackPaths[idx];
					throw Error(formatCycleError(itemPath, cycleStart, idx));
				}
				visit(item, itemPath);
			}
		}
		inStack.delete(config), stackObjects.pop(), stackPaths.pop(), visited.add(config);
	};
	visit(root, "<root>");
}
/**
* Load JavaScript config files in parallel.
*
* Uses native Node.js TypeScript support to import the config files.
* Each config file should have a default export containing the oxlint configuration.
*
* @param paths - Array of absolute paths to JavaScript/TypeScript config files
* @returns JSON-stringified result with all configs or error
*/
async function loadJsConfigs(paths) {
	try {
		let cacheKey = DateNow(), results = await Promise.allSettled(paths.map(async (path) => {
			let config = (await import(new URL(`file://${path}?cache=${cacheKey}`).href)).default;
			if (config === void 0) throw Error("Configuration file has no default export.");
			if (basename(path) === "vite.config.ts") {
				if (!isObject(config)) return {
					path,
					config: null
				};
				let lintConfig = config[VITE_OXLINT_CONFIG_FIELD];
				if (lintConfig === void 0) return {
					path,
					config: null
				};
				if (!isObject(lintConfig)) throw Error(`The \`${VITE_OXLINT_CONFIG_FIELD}\` field in the default export must be an object.`);
				return validateConfigExtends(lintConfig), {
					path,
					config: lintConfig
				};
			}
			if (!isObject(config)) throw Error("Configuration file must have a default export that is an object.");
			return validateConfigExtends(config), {
				path,
				config
			};
		})), successes = [], errors = [];
		for (let i = 0; i < results.length; i++) {
			let result = results[i];
			if (result.status === "fulfilled") successes.push(result.value);
			else {
				let path = paths[i], unsupportedNodeHint = getUnsupportedTypeScriptModuleLoadHintForError(result.reason, path);
				errors.push({
					path,
					error: unsupportedNodeHint ?? getErrorMessage(result.reason)
				});
			}
		}
		return errors.length > 0 ? JSONStringify({ Failures: errors }) : JSONStringify({ Success: successes });
	} catch (err) {
		return JSONStringify({ Error: getErrorMessage(err) });
	}
}
//#endregion
export { loadJsConfigs };
