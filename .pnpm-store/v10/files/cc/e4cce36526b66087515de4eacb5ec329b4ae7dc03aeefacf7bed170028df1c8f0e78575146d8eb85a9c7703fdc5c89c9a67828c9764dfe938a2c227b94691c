import { join } from "node:path";
import { stat, writeFile } from "node:fs/promises";
//#region src-js/cli/migration/shared.ts
async function hasOxfmtrcFile(cwd) {
	return await isFile(join(cwd, ".oxfmtrc.json")) || await isFile(join(cwd, ".oxfmtrc.jsonc"));
}
const SCHEMA_RELATIVE_PATH = "./node_modules/oxfmt/configuration_schema.json";
async function hasSchemaFile(cwd) {
	return await isFile(join(cwd, "node_modules/oxfmt/configuration_schema.json")) ? SCHEMA_RELATIVE_PATH : null;
}
async function createBlankOxfmtrcFile(cwd) {
	const config = {
		$schema: await hasSchemaFile(cwd),
		ignorePatterns: []
	};
	if (config.$schema === null) delete config.$schema;
	return config;
}
async function saveOxfmtrcFile(cwd, jsonStr) {
	await writeFile(join(cwd, ".oxfmtrc.json"), jsonStr + "\n", "utf8");
}
function exitWithError(message) {
	console.error(message);
	process.exitCode = 1;
}
async function isFile(path) {
	try {
		return (await stat(path)).isFile();
	} catch {
		return false;
	}
}
//#endregion
export { saveOxfmtrcFile as i, exitWithError as n, hasOxfmtrcFile as r, createBlankOxfmtrcFile as t };
