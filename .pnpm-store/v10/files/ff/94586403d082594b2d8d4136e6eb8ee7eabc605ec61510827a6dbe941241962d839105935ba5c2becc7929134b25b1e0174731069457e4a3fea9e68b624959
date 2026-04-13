import { lintWarning } from "./utils.js";

//#region src/linters/contentQuotesLinter.ts
const linter = (key, value, info) => {
	if (key === "content") {
		if (typeof value !== "string" || ![
			"normal",
			"none",
			"initial",
			"inherit",
			"unset"
		].includes(value) && !/(attr|counters?|url|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/.test(value) && !value.startsWith("var(") && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== "\"" && value.charAt(0) !== "'")) lintWarning(`You seem to be using a value for 'content' without quotes, try replacing it with \`content: '"${value}"'\`.`, info);
	}
};
var contentQuotesLinter_default = linter;

//#endregion
export { contentQuotesLinter_default as default };