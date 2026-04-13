import { lintWarning } from "./utils.js";

//#region src/linters/legacyNotSelectorLinter.ts
function isConcatSelector(selector) {
	return (selector.match(/:not\(([^)]*)\)/)?.[1] || "").split(/(\[[^[]*\])|(?=[.#])/).filter((str) => str).length > 1;
}
function parsePath(info) {
	return info.parentSelectors.reduce((prev, cur) => {
		if (!prev) return cur;
		return cur.includes("&") ? cur.replace(/&/g, prev) : `${prev} ${cur}`;
	}, "");
}
const linter = (_key, _value, info) => {
	const notList = parsePath(info).match(/:not\([^)]*\)/g) || [];
	if (notList.length > 0 && notList.some(isConcatSelector)) lintWarning(`Concat ':not' selector not support in legacy browsers.`, info);
};
var legacyNotSelectorLinter_default = linter;

//#endregion
export { legacyNotSelectorLinter_default as default };