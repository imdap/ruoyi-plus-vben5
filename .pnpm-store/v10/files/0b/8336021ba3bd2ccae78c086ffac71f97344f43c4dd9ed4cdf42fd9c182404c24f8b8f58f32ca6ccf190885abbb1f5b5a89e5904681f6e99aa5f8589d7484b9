import { i as saveOxfmtrcFile, n as exitWithError, r as hasOxfmtrcFile, t as createBlankOxfmtrcFile } from "./shared-BTEY2VsW.js";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
//#region src-js/cli/migration/migrate-prettier.ts
/**
* Run the `--migrate prettier` command to migrate various Prettier's config to `.oxfmtrc.json` file.
* https://prettier.io/docs/configuration
*/
async function runMigratePrettier() {
	const cwd = process.cwd();
	if (await hasOxfmtrcFile(cwd)) return exitWithError("Oxfmt configuration file already exists.");
	const { resolveConfigFile, resolveConfig } = await import("./prettier-DmvT5K0i.js");
	const prettierConfigPath = await resolveConfigFile(join(cwd, "dummy.js"));
	if (!prettierConfigPath) {
		console.log("No Prettier configuration file found.");
		const oxfmtrc = await createBlankOxfmtrcFile(cwd);
		const jsonStr = JSON.stringify(oxfmtrc, null, 2);
		try {
			await saveOxfmtrcFile(cwd, jsonStr);
			console.log("Created `.oxfmtrc.json` instead.");
		} catch {
			exitWithError("Failed to create `.oxfmtrc.json`.");
		}
		return;
	}
	let prettierConfig;
	try {
		prettierConfig = await resolveConfig(prettierConfigPath, { editorconfig: false });
		console.log("Found Prettier configuration at:", prettierConfigPath);
	} catch {
		return exitWithError(`Failed to parse: ${prettierConfigPath}`);
	}
	const oxfmtrc = await createBlankOxfmtrcFile(cwd);
	let hasSortPackageJsonPlugin = false;
	for (const [key, value] of Object.entries(prettierConfig ?? {})) {
		if (key === "plugins" && Array.isArray(value)) {
			for (const plugin of value) if (plugin === "prettier-plugin-tailwindcss") migrateTailwindOptions(prettierConfig, oxfmtrc);
			else if (plugin === "prettier-plugin-packagejson") hasSortPackageJsonPlugin = true;
			else if (typeof plugin === "string") console.error(`  - plugins: "${plugin}" is not supported, skipping...`);
			else console.error(`  - plugins: custom plugin module is not supported, skipping...`);
			continue;
		}
		if (key === "endOfLine" && value === "auto") {
			console.error(`  - "endOfLine: auto" is not supported, skipping...`);
			continue;
		}
		if (key === "experimentalTernaries" || key === "experimentalOperatorPosition") {
			console.error(`  - "${key}" is not supported in JS/TS files yet`);
			continue;
		}
		if (key.startsWith("tailwind")) continue;
		oxfmtrc[key] = value;
	}
	if (typeof oxfmtrc.printWidth !== "number") {
		console.error(`  - "printWidth" is not set in Prettier config, defaulting to 80 (Oxfmt default: 100)`);
		oxfmtrc.printWidth = 80;
	}
	if (hasSortPackageJsonPlugin) {
		oxfmtrc.sortPackageJson = {};
		console.error(`  - Migrated "prettier-plugin-packagejson" to "sortPackageJson"`);
	} else oxfmtrc.sortPackageJson = false;
	if (oxfmtrc.embeddedLanguageFormatting !== "off") console.error(`  - "embeddedLanguageFormatting" in JS/TS files is not fully supported yet`);
	const ignores = await resolvePrettierIgnore(cwd);
	if (ignores.length > 0) console.log("Migrated ignore patterns from `.prettierignore`");
	delete oxfmtrc.ignorePatterns;
	oxfmtrc.ignorePatterns = ignores;
	if ("overrides" in oxfmtrc) console.warn(`  - "overrides" cannot be migrated automatically. See: https://github.com/oxc-project/oxc/issues/18215`);
	const jsonStr = JSON.stringify(oxfmtrc, null, 2);
	try {
		await saveOxfmtrcFile(cwd, jsonStr);
		console.log("Created `.oxfmtrc.json`.");
	} catch {
		return exitWithError("Failed to create `.oxfmtrc.json`.");
	}
}
async function resolvePrettierIgnore(cwd) {
	const ignores = [];
	try {
		const lines = (await readFile(join(cwd, ".prettierignore"), "utf8")).split("\n");
		for (let line of lines) {
			line = line.trim();
			if (line === "" || line.startsWith("#")) continue;
			ignores.push(line);
		}
	} catch {}
	return ignores;
}
const TAILWIND_OPTION_MAPPING = {
	config: "tailwindConfig",
	stylesheet: "tailwindStylesheet",
	functions: "tailwindFunctions",
	attributes: "tailwindAttributes",
	preserveWhitespace: "tailwindPreserveWhitespace",
	preserveDuplicates: "tailwindPreserveDuplicates"
};
/**
* Migrate prettier-plugin-tailwindcss options to Oxfmt's sortTailwindcss format.
*
* Prettier format:
* ```json
* {
*   "plugins": ["prettier-plugin-tailwindcss"],
*   "tailwindConfig": "./tailwind.config.js",
*   "tailwindFunctions": ["clsx", "cn"]
* }
* ```
*
* Oxfmt format:
* ```json
* {
*   "sortTailwindcss": {
*     "config": "./tailwind.config.js",
*     "functions": ["clsx", "cn"]
*   }
* }
* ```
*/
function migrateTailwindOptions(prettierConfig, oxfmtrc) {
	const tailwindOptions = {};
	for (const [oxfmtKey, prettierKey] of Object.entries(TAILWIND_OPTION_MAPPING)) {
		const value = prettierConfig[prettierKey];
		if (value !== void 0) {
			if ((prettierKey == "tailwindFunctions" || prettierKey == "tailwindAttributes") && Array.isArray(value)) {
				for (const item of value) if (typeof item === "string" && item.startsWith("/") && item.endsWith("/")) {
					console.warn(`  - Do not support regex in "${prettierKey}" option yet, skipping: ${item}`);
					continue;
				}
			}
			tailwindOptions[oxfmtKey] = value;
		}
	}
	oxfmtrc.sortTailwindcss = tailwindOptions;
	console.log("Migrated prettier-plugin-tailwindcss options to sortTailwindcss");
}
//#endregion
export { runMigratePrettier };
