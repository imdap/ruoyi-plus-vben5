import { lintWarning } from "./utils.js";

//#region src/linters/hashedAnimationLinter.ts
const linter = (key, value, info) => {
	if (key === "animation") {
		if (info.hashId && value !== "none") lintWarning(`You seem to be using hashed animation '${value}', in which case 'animationName' with Keyframe as value is recommended.`, info);
	}
};
var hashedAnimationLinter_default = linter;

//#endregion
export { hashedAnimationLinter_default as default };