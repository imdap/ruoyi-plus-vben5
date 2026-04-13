import { isVNode } from "vue";
import { flattenChildren } from "@v-c/util/dist/props-util";

//#region src/table/utils.ts
function convertColumnsToColumnProps(children) {
	return flattenChildren(children).filter((node) => isVNode(node)).map((node) => {
		const { key, props, children: nodeChildren } = node;
		const column = {
			key,
			...props || {}
		};
		if (nodeChildren?.default) column.children = convertColumnsToColumnProps(nodeChildren.default());
		return column;
	}).filter(Boolean);
}

//#endregion
export { convertColumnsToColumnProps };