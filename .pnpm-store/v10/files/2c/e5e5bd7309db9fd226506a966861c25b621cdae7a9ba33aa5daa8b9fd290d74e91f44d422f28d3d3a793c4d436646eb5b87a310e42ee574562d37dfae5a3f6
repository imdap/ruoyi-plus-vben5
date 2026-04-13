import { getCurrentInstance, inject, provide, ref } from "vue";
import rcWarning, { resetWarned as resetWarned$1 } from "@v-c/util/dist/warning";

//#region src/_util/warning.ts
function noop() {}
let deprecatedWarnList = null;
function resetWarned() {
	deprecatedWarnList = null;
	resetWarned$1();
}
const isDev = process.env.NODE_ENV !== "production";
let _warning = noop;
if (isDev) _warning = (valid, component, message) => {
	rcWarning(valid, `[antd: ${component}] ${message}`);
	if (isDev) resetWarned();
};
const warning$1 = _warning;
const WarningContextKey = Symbol("WarningContext");
function useWarningProvider(props) {
	provide(WarningContextKey, props);
}
function useWarningContext() {
	if (!getCurrentInstance()) return {};
	return inject(WarningContextKey, { strict: ref(true) });
}
/**
* This is a hook but we not named as `useWarning`
* since this is only used in development.
* We should always wrap this in `if (process.env.NODE_ENV !== 'production')` condition
*/
const devUseWarning = isDev ? (component) => {
	const { strict } = useWarningContext();
	const typeWarning = (valid, type, message) => {
		if (!valid) if (strict?.value === false && type === "deprecated") {
			const existWarning = deprecatedWarnList;
			if (!deprecatedWarnList) deprecatedWarnList = {};
			deprecatedWarnList[component] = deprecatedWarnList[component] || [];
			if (!deprecatedWarnList[component].includes(message || "")) deprecatedWarnList[component].push(message || "");
			if (!existWarning) console.warn("[antd] There exists deprecated usage in your code:", deprecatedWarnList);
		} else warning$1(valid, component, message);
	};
	typeWarning.deprecated = (valid, oldProp, newProp, message) => {
		typeWarning(valid, "deprecated", `\`${oldProp}\` is deprecated. Please use \`${newProp}\` instead.${message ? ` ${message}` : ""}`);
	};
	return typeWarning;
} : () => {
	const noopWarning = () => {};
	noopWarning.deprecated = noop;
	return noopWarning;
};
var warning_default = warning$1;

//#endregion
export { warning_default as default, devUseWarning, isDev, noop, resetWarned, useWarningContext, useWarningProvider };