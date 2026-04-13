import { writeJSONFile } from "../../misc/write-json.js";
import { promises } from "fs";

/**
* Write custom files
*/
async function exportCustomFiles(dir, options, result) {
	const customFiles = options.customFiles || {};
	for (const filename in customFiles) {
		const content = customFiles[filename];
		if (content === null) {
			try {
				await promises.unlink(dir + "/" + filename);
			} catch {}
			continue;
		}
		if (typeof content === "string") await promises.writeFile(dir + "/" + filename, content, "utf8");
		else if (typeof content === "object") await writeJSONFile(dir + "/" + filename, content);
		result?.add(filename);
	}
}

export { exportCustomFiles };