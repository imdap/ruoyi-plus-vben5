import { isVNode } from "vue";

//#region src/_util/convertToTooltipProps.ts
function convertToTooltipProps(tooltip, context) {
	if (tooltip === void 0 || tooltip === null) return null;
	if (typeof tooltip === "object" && !Array.isArray(tooltip) && !isVNode(tooltip)) return {
		...context,
		...tooltip
	};
	return {
		...context,
		title: tooltip
	};
}

//#endregion
export { convertToTooltipProps as default };