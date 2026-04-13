import { lintWarning } from "./utils.js";

//#region src/linters/NaNLinter.ts
const linter = (key, value, info) => {
	if (typeof value === "string" && /NaN/.test(value) || Number.isNaN(value)) lintWarning(`Unexpected 'NaN' in property '${key}: ${value}'.`, info);
};
var NaNLinter_default = linter;

//#endregion
export { NaNLinter_default as default };