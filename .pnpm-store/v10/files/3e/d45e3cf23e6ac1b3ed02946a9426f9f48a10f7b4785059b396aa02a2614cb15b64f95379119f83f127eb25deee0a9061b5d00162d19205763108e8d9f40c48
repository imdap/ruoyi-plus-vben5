import { promises } from "fs";

/**
* Write JSON file
*/
async function writeJSONFile(filename, data) {
	return promises.writeFile(filename, JSON.stringify(data, null, "	") + "\n");
}

export { writeJSONFile };