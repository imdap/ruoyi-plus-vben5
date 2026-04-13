import { i as saveOxfmtrcFile, n as exitWithError, r as hasOxfmtrcFile, t as createBlankOxfmtrcFile } from "./shared-BTEY2VsW.js";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
//#region src-js/cli/migration/migrate-biome.ts
const BIOME_DEFAULTS = {
	lineWidth: 80,
	indentStyle: "tab",
	indentWidth: 2,
	lineEnding: "lf",
	attributePosition: "auto",
	bracketSpacing: true,
	quoteStyle: "double",
	jsxQuoteStyle: "double",
	quoteProperties: "asNeeded",
	trailingCommas: "all",
	semicolons: "always",
	arrowParentheses: "always",
	bracketSameLine: false
};
/**
* Run the `--migrate biome` command to migrate Biome's config to `.oxfmtrc.json` file.
* https://biomejs.dev/reference/configuration/
*/
async function runMigrateBiome() {
	const cwd = process.cwd();
	if (await hasOxfmtrcFile(cwd)) return exitWithError("Oxfmt configuration file already exists.");
	const biomeConfigPath = await resolveBiomeConfigFile(cwd);
	if (!biomeConfigPath) {
		console.log("No Biome configuration file found.");
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
	let biomeConfig;
	try {
		biomeConfig = parseJSONC(await readFile(biomeConfigPath, "utf8"));
		console.log("Found Biome configuration at:", biomeConfigPath);
	} catch {
		return exitWithError(`Failed to parse: ${biomeConfigPath}`);
	}
	const oxfmtrc = await createBlankOxfmtrcFile(cwd);
	const formatterConfig = biomeConfig.formatter ?? {};
	const jsFormatterConfig = biomeConfig.javascript?.formatter ?? {};
	migrateIndentStyle(formatterConfig, jsFormatterConfig, oxfmtrc);
	migrateIndentWidth(formatterConfig, jsFormatterConfig, oxfmtrc);
	migrateLineWidth(formatterConfig, jsFormatterConfig, oxfmtrc);
	migrateQuoteStyle(jsFormatterConfig, oxfmtrc);
	migrateJsxQuoteStyle(jsFormatterConfig, oxfmtrc);
	migrateQuoteProperties(jsFormatterConfig, oxfmtrc);
	migrateTrailingCommas(jsFormatterConfig, oxfmtrc);
	migrateSemicolons(jsFormatterConfig, oxfmtrc);
	migrateArrowParentheses(jsFormatterConfig, oxfmtrc);
	migrateBracketSameLine(formatterConfig, jsFormatterConfig, oxfmtrc);
	migrateBracketSpacing(formatterConfig, jsFormatterConfig, oxfmtrc);
	migrateAttributePosition(formatterConfig, jsFormatterConfig, oxfmtrc);
	const ignores = extractIgnorePatterns(biomeConfig);
	if (ignores.length > 0) console.log("Migrated ignore patterns from Biome config");
	delete oxfmtrc.ignorePatterns;
	oxfmtrc.ignorePatterns = ignores;
	if (biomeConfig.overrides && biomeConfig.overrides.length > 0) console.warn(`  - "overrides" cannot be migrated automatically yet`);
	const jsonStr = JSON.stringify(oxfmtrc, null, 2);
	try {
		await saveOxfmtrcFile(cwd, jsonStr);
		console.log("Created `.oxfmtrc.json`.");
	} catch {
		return exitWithError("Failed to create `.oxfmtrc.json`.");
	}
}
async function resolveBiomeConfigFile(cwd) {
	for (const filename of ["biome.json", "biome.jsonc"]) {
		const filepath = join(cwd, filename);
		try {
			await readFile(filepath, "utf8");
			return filepath;
		} catch {}
	}
	return null;
}
const stringOrCommentRe = /("(?:\\?[^])*?")|(\/\/.*)|(\/\*[^]*?\*\/)/g;
const stringOrTrailingCommaRe = /("(?:\\?[^])*?")|(,\s*)(?=]|})/g;
function parseJSONC(text) {
	text = String(text);
	try {
		return JSON.parse(text);
	} catch {
		return JSON.parse(text.replace(stringOrCommentRe, "$1").replace(stringOrTrailingCommaRe, "$1"));
	}
}
function migrateIndentStyle(formatterConfig, jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.indentStyle ?? formatterConfig.indentStyle;
	if (value !== void 0) oxfmtrc.useTabs = value === "tab";
	else oxfmtrc.useTabs = BIOME_DEFAULTS.indentStyle === "tab";
}
function migrateIndentWidth(formatterConfig, jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.indentWidth ?? formatterConfig.indentWidth;
	if (value !== void 0) oxfmtrc.tabWidth = value;
	else oxfmtrc.tabWidth = BIOME_DEFAULTS.indentWidth;
}
function migrateLineWidth(formatterConfig, jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.lineWidth ?? formatterConfig.lineWidth;
	if (value !== void 0) oxfmtrc.printWidth = value;
	else oxfmtrc.printWidth = BIOME_DEFAULTS.lineWidth;
}
function migrateQuoteStyle(jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.quoteStyle;
	if (value !== void 0) oxfmtrc.singleQuote = value === "single";
	else oxfmtrc.singleQuote = false;
}
function migrateJsxQuoteStyle(jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.jsxQuoteStyle;
	if (value !== void 0) oxfmtrc.jsxSingleQuote = value === "single";
	else oxfmtrc.jsxSingleQuote = false;
}
function migrateQuoteProperties(jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.quoteProperties;
	if (value !== void 0) {
		if (value === "asNeeded") oxfmtrc.quoteProps = "as-needed";
		else if (value === "preserve") oxfmtrc.quoteProps = "preserve";
	} else oxfmtrc.quoteProps = "as-needed";
}
function migrateTrailingCommas(jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.trailingCommas;
	if (value !== void 0) oxfmtrc.trailingComma = value;
	else oxfmtrc.trailingComma = BIOME_DEFAULTS.trailingCommas;
}
function migrateSemicolons(jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.semicolons;
	if (value !== void 0) oxfmtrc.semi = value === "always";
	else oxfmtrc.semi = BIOME_DEFAULTS.semicolons === "always";
}
function migrateArrowParentheses(jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.arrowParentheses;
	if (value !== void 0) {
		if (value === "always") oxfmtrc.arrowParens = "always";
		else if (value === "asNeeded") oxfmtrc.arrowParens = "avoid";
	} else oxfmtrc.arrowParens = BIOME_DEFAULTS.arrowParentheses === "always" ? "always" : "avoid";
}
function migrateBracketSameLine(_formatterConfig, jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.bracketSameLine;
	if (value !== void 0) oxfmtrc.bracketSameLine = value;
	else oxfmtrc.bracketSameLine = BIOME_DEFAULTS.bracketSameLine;
}
function migrateBracketSpacing(formatterConfig, jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.bracketSpacing ?? formatterConfig.bracketSpacing;
	if (value !== void 0) oxfmtrc.bracketSpacing = value;
	else oxfmtrc.bracketSpacing = BIOME_DEFAULTS.bracketSpacing;
}
function migrateAttributePosition(formatterConfig, jsFormatterConfig, oxfmtrc) {
	const value = jsFormatterConfig.attributePosition ?? formatterConfig.attributePosition;
	if (value !== void 0) if (value === "multiline") oxfmtrc.singleAttributePerLine = true;
	else oxfmtrc.singleAttributePerLine = false;
}
function extractIgnorePatterns(biomeConfig) {
	const ignores = [];
	if (biomeConfig.files?.includes) {
		for (const pattern of biomeConfig.files.includes) if (pattern.startsWith("!") && !pattern.startsWith("!!")) ignores.push(pattern.slice(1));
	}
	return ignores;
}
//#endregion
export { runMigrateBiome };
