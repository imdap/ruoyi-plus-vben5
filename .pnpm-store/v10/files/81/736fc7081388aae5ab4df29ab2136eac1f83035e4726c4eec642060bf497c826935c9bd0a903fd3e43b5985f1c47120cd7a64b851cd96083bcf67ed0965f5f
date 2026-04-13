import { isDev } from "../../_util/warning.js";
import { getSlotPropsFnRun } from "../../_util/tools.js";

//#region src/typography/Base/util.ts
function toList(val) {
	if (val === false) return [false, false];
	return Array.isArray(val) ? val : [val];
}
function getNode(dom, defaultNode, needDom) {
	dom = getSlotPropsFnRun({}, { dom }, "dom", false);
	defaultNode = getSlotPropsFnRun({}, { defaultNode }, "defaultNode");
	if (dom === true || dom === void 0) return defaultNode;
	return dom || needDom && defaultNode;
}
/**
* Check for element is native ellipsis
* ref:
* - https://github.com/ant-design/ant-design/issues/50143
* - https://github.com/ant-design/ant-design/issues/50414
*/
function isEleEllipsis(ele) {
	const childDiv = document.createElement("em");
	ele.appendChild(childDiv);
	if (isDev) childDiv.className = "ant-typography-css-ellipsis-content-measure";
	const rect = ele.getBoundingClientRect();
	const childRect = childDiv.getBoundingClientRect();
	ele.removeChild(childDiv);
	return rect.left > childRect.left || childRect.right > rect.right || rect.top > childRect.top || childRect.bottom > rect.bottom;
}
const isValidText = (val) => ["string", "number"].includes(typeof val);

//#endregion
export { getNode, isEleEllipsis, isValidText, toList };