import { computed, isVNode, unref } from "vue";

//#region src/typography/hooks/useTooltipProps.ts
function useTooltipProps(tooltip, editConfigText, children) {
	return computed(() => {
		const mergedTooltip = unref(tooltip);
		const mergedEditText = unref(editConfigText);
		const mergedChildren = unref(children);
		if (mergedTooltip === true) return { title: mergedEditText ?? mergedChildren };
		if (isVNode(mergedTooltip)) return { title: mergedTooltip };
		if (typeof mergedTooltip === "object") return {
			title: mergedEditText ?? mergedChildren,
			...mergedTooltip
		};
		if (mergedTooltip === void 0 || mergedTooltip === null) return { title: mergedTooltip };
		return { title: mergedTooltip };
	});
}
var useTooltipProps_default = useTooltipProps;

//#endregion
export { useTooltipProps_default as default };