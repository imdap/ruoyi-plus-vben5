import { fillLegacyProps } from "../utils/legacyUtil.js";
import { computed } from "vue";
function useFilterTreeData(treeData, searchValue, options) {
	return computed(() => {
		const { children: fieldChildren } = options.fieldNames.value;
		const mergedSearchValue = searchValue.value;
		if (!mergedSearchValue || options.filterTreeNode.value === false) return treeData.value;
		const filterOptionFunc = typeof options.filterTreeNode.value === "function" ? options.filterTreeNode.value : (_, dataNode) => String(dataNode[options.treeNodeFilterProp.value]).toUpperCase().includes(mergedSearchValue.toUpperCase());
		const filterTreeNodes = (nodes, keepAll = false) => nodes.reduce((filtered, node) => {
			const children = node[fieldChildren];
			const isMatch = keepAll || filterOptionFunc(mergedSearchValue, fillLegacyProps(node));
			const filteredChildren = filterTreeNodes(children || [], isMatch);
			if (isMatch || filteredChildren.length) filtered.push({
				...node,
				isLeaf: void 0,
				[fieldChildren]: filteredChildren
			});
			return filtered;
		}, []);
		return filterTreeNodes(treeData.value);
	});
}
export { useFilterTreeData as default };
