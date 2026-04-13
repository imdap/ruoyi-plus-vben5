import { computed } from "vue";
function buildTreeStructure(nodes, config) {
	const { id, pId, rootPId } = config;
	const nodeMap = /* @__PURE__ */ new Map();
	const rootNodes = [];
	nodes.forEach((node) => {
		const nodeKey = node[id];
		const clonedNode = {
			...node,
			key: node.key || nodeKey
		};
		nodeMap.set(nodeKey, clonedNode);
	});
	nodeMap.forEach((node) => {
		const parentKey = node[pId];
		const parent = nodeMap.get(parentKey);
		if (parent) {
			parent.children = parent.children || [];
			parent.children.push(node);
		} else if (parentKey === rootPId || rootPId === null) rootNodes.push(node);
	});
	return rootNodes;
}
function useTreeData(treeData, simpleMode) {
	return computed(() => {
		if (simpleMode.value) {
			const config = {
				id: "id",
				pId: "pId",
				rootPId: null,
				...typeof simpleMode.value === "object" ? simpleMode.value : {}
			};
			return buildTreeStructure(treeData.value, config);
		}
		return treeData.value;
	});
}
export { useTreeData as default };
