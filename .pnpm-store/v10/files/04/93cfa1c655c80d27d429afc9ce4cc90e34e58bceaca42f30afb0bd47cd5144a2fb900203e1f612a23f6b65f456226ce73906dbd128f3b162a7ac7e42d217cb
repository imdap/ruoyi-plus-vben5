import { execAsync } from "../../misc/exec.js";
import { promises } from "fs";

/**
* Get version of package from NPM registry
*/
async function getNPMVersion(options) {
	const tag = options.tag || "latest";
	const result = await execAsync(`npm view ${options.package}@${tag} --json`, { maxBuffer: 1024 * 1024 * 8 });
	const data = JSON.parse(result.stdout);
	return {
		version: data.version,
		file: data.dist?.tarball
	};
}
/**
* Get version of package from filename
*/
async function getPackageVersion(target) {
	return JSON.parse(await promises.readFile(target + "/package.json", "utf8")).version;
}

export { getNPMVersion, getPackageVersion };