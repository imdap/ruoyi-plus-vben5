import { isVNode, toRaw } from "vue";
function convertNodeToOption(node) {
	const { key, props, children } = node;
	const { value, label, ...restProps } = props || {};
	let finalChildren = children;
	if (typeof children === "function") finalChildren = children();
	else if (children && typeof children === "object" && "default" in children) finalChildren = typeof children.default === "function" ? children.default() : children.default;
	const finalLabel = label ?? restProps.children ?? finalChildren;
	return {
		key,
		value: value !== void 0 ? value : key,
		label: finalLabel,
		...restProps
	};
}
function convertChildrenToData(nodes, optionOnly = false) {
	return toRaw(nodes).map((node, index) => {
		if (!isVNode(node) || !node.type) return null;
		const { type, key, props } = node;
		const isSelectOptGroup = type?.isSelectOptGroup;
		if (optionOnly || !isSelectOptGroup) return convertNodeToOption(node);
		const { children, ...restProps } = props || {};
		return {
			key: `__VC_SELECT_GRP__${key === null ? index : String(key)}__`,
			label: key,
			...restProps,
			options: convertChildrenToData(children || [])
		};
	}).filter((data) => data !== null);
}
export { convertChildrenToData };
