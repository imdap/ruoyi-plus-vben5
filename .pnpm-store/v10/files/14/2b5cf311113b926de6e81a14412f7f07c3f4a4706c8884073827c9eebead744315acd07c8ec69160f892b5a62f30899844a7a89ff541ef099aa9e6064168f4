import canUseDom from "./canUseDom.js";
function isStyleNameSupport(styleName) {
	if (canUseDom() && window.document.documentElement) {
		const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
		const { documentElement } = window.document;
		return styleNameList.some((name) => name in documentElement.style);
	}
	return false;
}
function isStyleValueSupport(styleName, value) {
	if (!isStyleNameSupport(styleName)) return false;
	const ele = document.createElement("div");
	const origin = ele.style[styleName];
	ele.style[styleName] = value;
	return ele.style[styleName] !== origin;
}
function isStyleSupport(styleName, styleValue) {
	if (!Array.isArray(styleName) && styleValue !== void 0) return isStyleValueSupport(styleName, styleValue);
	return isStyleNameSupport(styleName);
}
export { isStyleSupport };
