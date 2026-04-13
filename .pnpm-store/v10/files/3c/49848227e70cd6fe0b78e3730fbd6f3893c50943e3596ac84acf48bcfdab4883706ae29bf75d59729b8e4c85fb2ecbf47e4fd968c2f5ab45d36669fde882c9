import { isVNode } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/splitter/hooks/useItems.ts
function getCollapsible(collapsible) {
	if (collapsible === "") collapsible = true;
	if (collapsible && typeof collapsible === "object") return {
		...collapsible,
		showCollapsibleIcon: collapsible.showCollapsibleIcon === void 0 ? "auto" : collapsible.showCollapsibleIcon
	};
	const mergedCollapsible = !!collapsible;
	return {
		start: mergedCollapsible,
		end: mergedCollapsible,
		showCollapsibleIcon: "auto"
	};
}
/**
* Convert `children` into `items`.
*/
function convertChildrenToItems(children) {
	return filterEmpty(children).filter((item) => isVNode(item)).map((node) => {
		const { props, children } = node;
		const defaultSize = props?.["default-size"] ?? props?.defaultSize;
		const { collapsible, resizable, ...restProps } = props ?? {};
		const mergedResizable = resizable !== false;
		return {
			...restProps,
			defaultSize,
			resizable: mergedResizable,
			collapsible: getCollapsible(collapsible),
			_$slots: children
		};
	});
}

//#endregion
export { convertChildrenToItems };