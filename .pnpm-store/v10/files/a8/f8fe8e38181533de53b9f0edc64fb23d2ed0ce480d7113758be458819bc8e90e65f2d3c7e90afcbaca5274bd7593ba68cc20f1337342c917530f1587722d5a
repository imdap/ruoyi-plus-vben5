import { r as runCli } from "./bindings-D6U4DxG3.js";
import { i as resolvePlugins } from "./apis-CF7S9zfN.js";
import Tinypool from "tinypool";
import { basename } from "node:path";
import { pathToFileURL } from "node:url";
//#region src-js/cli/worker-proxy.ts
let pool = null;
async function initExternalFormatter(numThreads) {
	pool = new Tinypool({
		filename: new URL("./cli-worker.js", import.meta.url).href,
		minThreads: numThreads,
		maxThreads: numThreads,
		runtime: "child_process",
		env: process.env
	});
	return resolvePlugins();
}
async function disposeExternalFormatter() {
	await pool?.destroy();
	pool = null;
}
async function formatFile(options, code) {
	return pool.run({
		options,
		code
	}, { name: "formatFile" }).catch((err) => {
		if (err instanceof Error) throw err;
		if (err !== null && typeof err === "object") {
			const obj = err;
			const newErr = new Error(obj.message);
			newErr.name = obj.name;
			throw newErr;
		}
		throw new Error(String(err));
	});
}
async function formatEmbeddedCode(options, code) {
	return pool.run({
		options,
		code
	}, { name: "formatEmbeddedCode" }).catch(() => null);
}
async function formatEmbeddedDoc(options, texts) {
	return pool.run({
		options,
		texts
	}, { name: "formatEmbeddedDoc" }).catch(() => null);
}
async function sortTailwindClasses(options, classes) {
	return pool.run({
		classes,
		options
	}, { name: "sortTailwindClasses" }).catch(() => null);
}
//#endregion
//#region src-js/cli/js_config.ts
const isObject = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const VITE_CONFIG_NAME = "vite.config.ts";
const VITE_OXFMT_CONFIG_FIELD = "fmt";
/**
* Load a JavaScript/TypeScript config file.
*
* Uses native Node.js `import()` to evaluate the config file.
* The config file should have a default export containing the oxfmt configuration object.
*
* For `vite.config.ts`, extracts the `.fmt` field from the default export.
* Returns `null` if the field is missing, signaling "skip this config" to the Rust side.
*
* @param path - Absolute path to the JavaScript/TypeScript config file
* @returns Config object, or `null` to signal "skip"
*/
async function loadJsConfig(path) {
	const fileUrl = pathToFileURL(path);
	fileUrl.searchParams.set("cache", Date.now().toString());
	const { default: config } = await import(fileUrl.href);
	if (config === void 0) throw new Error("Configuration file has no default export.");
	if (basename(path) === VITE_CONFIG_NAME) {
		if (!isObject(config)) return null;
		const fmtConfig = config[VITE_OXFMT_CONFIG_FIELD];
		if (fmtConfig === void 0) return null;
		if (!isObject(fmtConfig)) throw new Error(`The \`${VITE_OXFMT_CONFIG_FIELD}\` field in the default export must be an object.`);
		return fmtConfig;
	}
	if (!isObject(config)) throw new Error("Configuration file must have a default export that is an object.");
	return config;
}
//#endregion
//#region src-js/cli.ts
(async () => {
	const args = process.argv.slice(2);
	if (!process.stdout.isTTY) process.stdout._handle?.setBlocking?.(true);
	if (!process.stdin.isTTY) process.stdin._handle?.setBlocking?.(true);
	if (args.includes("--lsp")) process.stdout.write = process.stderr.write.bind(process.stderr);
	const [mode, exitCode] = await runCli(args, loadJsConfig, initExternalFormatter, formatFile, formatEmbeddedCode, formatEmbeddedDoc, sortTailwindClasses);
	if (mode === "init") {
		await import("./init-BbKOMZ57.js").then((m) => m.runInit());
		return;
	}
	if (mode === "migrate:prettier") {
		await import("./migrate-prettier-DCQhmQ6e.js").then((m) => m.runMigratePrettier());
		return;
	}
	if (mode === "migrate:biome") {
		await import("./migrate-biome-BMqs7-eg.js").then((m) => m.runMigrateBiome());
		return;
	}
	await disposeExternalFormatter();
	process.exitCode = exitCode;
	const [major, minor] = process.versions.node.split(".").map(Number);
	if (major < 25 || major === 25 && minor < 4) setTimeout(() => process.exit(), 50);
})();
//#endregion
export {};
