import { lintWarning } from "./utils.js";

//#region src/linters/parentSelectorLinter.ts
const linter = (_key, _value, info) => {
	if (info.parentSelectors.some((selector) => {
		return selector.split(",").some((item) => item.split("&").length > 2);
	})) lintWarning("Should not use more than one `&` in a selector.", info);
};
var parentSelectorLinter_default = linter;

//#endregion
export { parentSelectorLinter_default as default };