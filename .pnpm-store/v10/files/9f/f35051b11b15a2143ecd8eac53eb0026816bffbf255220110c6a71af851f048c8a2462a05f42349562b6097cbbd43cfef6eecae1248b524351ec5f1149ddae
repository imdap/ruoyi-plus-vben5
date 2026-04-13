import { createVNode } from "vue";
import { CloseCircleFilled } from "@antdv-next/icons";

//#region src/_util/getAllowClear.tsx
function getAllowClear(allowClear) {
	let mergedAllowClear;
	if (typeof allowClear === "object" && allowClear?.clearIcon) mergedAllowClear = allowClear;
	else if (allowClear) mergedAllowClear = { clearIcon: createVNode(CloseCircleFilled, null, null) };
	return mergedAllowClear;
}
var getAllowClear_default = getAllowClear;

//#endregion
export { getAllowClear_default as default };