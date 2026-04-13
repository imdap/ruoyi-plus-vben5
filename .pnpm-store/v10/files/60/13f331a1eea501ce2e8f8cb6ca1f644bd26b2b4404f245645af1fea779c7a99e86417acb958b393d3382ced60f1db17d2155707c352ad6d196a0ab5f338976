import TreeNode_default from "../TreeNode.js";
import { createVNode, isVNode, toRaw } from "vue";
import warning from "@v-c/util/dist/warning";
function getNodeChildren(children) {
	let finalChildren = children;
	if (typeof children === "function") finalChildren = children();
	else if (children && typeof children === "object" && "default" in children) finalChildren = typeof children.default === "function" ? children.default() : children.default;
	return Array.isArray(finalChildren) ? finalChildren : [];
}
function convertChildrenToData(nodes = []) {
	return toRaw(nodes).map((node) => {
		if (!isVNode(node) || !node.type) return null;
		const { key, props, children } = node;
		const { value, ...restProps } = props || {};
		const data = {
			key,
			value,
			...restProps
		};
		const childData = convertChildrenToData(getNodeChildren(children));
		if (childData.length) data.children = childData;
		return data;
	}).filter((data) => data !== null);
}
function fillLegacyProps(dataNode) {
	if (!dataNode) return dataNode;
	const cloneNode = { ...dataNode };
	if (!("props" in cloneNode)) Object.defineProperty(cloneNode, "props", { get() {
		warning(false, "New `vc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.");
		return cloneNode;
	} });
	return cloneNode;
}
function fillAdditionalInfo(extra, triggerValue, checkedValues, treeData, showPosition, fieldNames) {
	let triggerNode = null;
	let nodeList = null;
	function generateMap() {
		function dig(list, level = "0", parentIncluded = false) {
			return (list || []).map((option, index) => {
				const pos = `${level}-${index}`;
				const value = option[fieldNames.value];
				const included = checkedValues.includes(value);
				const children = dig(option[fieldNames.children] || [], pos, included);
				const node = createVNode(TreeNode_default, option, { default: () => children.map((child) => child.node) });
				if (triggerValue === value) triggerNode = node;
				if (included) {
					const checkedNode = {
						pos,
						node,
						children
					};
					if (!parentIncluded) nodeList.push(checkedNode);
					return checkedNode;
				}
				return null;
			}).filter((node) => node !== null);
		}
		if (!nodeList) {
			nodeList = [];
			dig(treeData);
			nodeList.sort((a, b) => {
				const val1 = a.node.props?.value;
				const val2 = b.node.props?.value;
				return checkedValues.indexOf(val1) - checkedValues.indexOf(val2);
			});
		}
	}
	Object.defineProperty(extra, "triggerNode", { get() {
		warning(false, "`triggerNode` is deprecated. Please consider decoupling data with node.");
		generateMap();
		return triggerNode;
	} });
	Object.defineProperty(extra, "allCheckedNodes", { get() {
		warning(false, "`allCheckedNodes` is deprecated. Please consider decoupling data with node.");
		generateMap();
		if (showPosition) return nodeList;
		return (nodeList || []).map(({ node }) => node);
	} });
}
export { convertChildrenToData, fillAdditionalInfo, fillLegacyProps };
