Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
function isConfigObj(closable) {
	return closable !== null && typeof closable === "object";
}
function getClosableConfig(closable, closeIcon, preset) {
	if (closable === false || closeIcon === false && (!isConfigObj(closable) || !closable?.closeIcon)) return null;
	const mergedCloseIcon = typeof closeIcon !== "boolean" ? closeIcon : void 0;
	if (isConfigObj(closable)) return {
		...closable,
		closeIcon: closable?.closeIcon ?? mergedCloseIcon
	};
	return preset || closable || closeIcon ? { closeIcon: mergedCloseIcon } : "empty";
}
function useClosable(stepClosable, stepCloseIcon, closable, closeIcon) {
	return (0, vue.computed)(() => {
		const stepClosableConfig = getClosableConfig(stepClosable.value, stepCloseIcon.value, false);
		const rootCloseableConfig = getClosableConfig(closable.value, closeIcon.value, true);
		if (stepClosableConfig !== "empty") return stepClosableConfig;
		return rootCloseableConfig;
	});
}
exports.useClosable = useClosable;
