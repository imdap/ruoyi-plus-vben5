import { i as saveOxfmtrcFile, n as exitWithError, r as hasOxfmtrcFile, t as createBlankOxfmtrcFile } from "./shared-BTEY2VsW.js";
//#region src-js/cli/migration/init.ts
/**
* Run the `--init` command to scaffold a default `.oxfmtrc.json` file.
*/
async function runInit() {
	const cwd = process.cwd();
	if (await hasOxfmtrcFile(cwd)) return exitWithError("Oxfmt configuration file already exists.");
	const oxfmtrc = await createBlankOxfmtrcFile(cwd);
	const jsonStr = JSON.stringify(oxfmtrc, null, 2);
	try {
		await saveOxfmtrcFile(cwd, jsonStr);
		console.log("Created `.oxfmtrc.json`.");
	} catch {
		return exitWithError("Failed to create `.oxfmtrc.json`.");
	}
}
//#endregion
export { runInit };
