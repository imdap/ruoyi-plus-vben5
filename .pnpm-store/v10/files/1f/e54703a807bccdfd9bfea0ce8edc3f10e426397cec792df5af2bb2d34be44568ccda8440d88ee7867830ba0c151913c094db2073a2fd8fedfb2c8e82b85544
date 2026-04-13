import Panel_default from "../Panel.js";
import { createVNode, mergeProps } from "vue";
import { toArray } from "@v-c/util/dist/Children/toArray";
import { isEmptyElement } from "@v-c/util/dist/props-util";
import { cloneElement } from "@v-c/util/dist/vnode";
function convertItemsToNodes(items, props) {
	const { prefixCls, accordion, collapsible, onItemClick, activeKey, openMotion, expandIcon, destroyOnHidden, classNames: collapseClassNames, styles } = props;
	return items.map((item, index) => {
		const { label, key: rawKey, collapsible: rawCollapsible, onItemClick: rawOnItemClick, destroyOnHidden: rawDestroyOnHidden, ...restProps } = item;
		const key = String(rawKey ?? index);
		const mergeCollapsible = rawCollapsible ?? collapsible;
		const mergedDestroyOnHidden = rawDestroyOnHidden ?? destroyOnHidden;
		const handleItemClick = (value) => {
			if (mergeCollapsible === "disabled") return;
			onItemClick?.(value);
			rawOnItemClick?.(value);
		};
		let isActive = false;
		if (accordion) isActive = activeKey?.[0] === key;
		else isActive = activeKey.includes(key);
		return createVNode(Panel_default, mergeProps(restProps, {
			"classNames": collapseClassNames,
			"styles": styles,
			"prefixCls": prefixCls,
			"key": key,
			"panelKey": key,
			"isActive": isActive,
			"accordion": accordion,
			"openMotion": openMotion,
			"expandIcon": expandIcon,
			"header": label,
			"destroyOnHidden": mergedDestroyOnHidden,
			"collapsible": mergeCollapsible,
			"onItemClick": handleItemClick
		}), null);
	});
}
function getNewChild(child, index, props) {
	if (isEmptyElement(child) || !child) return null;
	if (typeof child === "boolean" || typeof child === "number" || typeof child === "string") return child;
	const { prefixCls, accordion, collapsible, onItemClick, activeKey, openMotion, expandIcon, classNames: collapseClassNames, styles, destroyOnHidden } = props;
	const key = child.key || String(index);
	const { header, headerClass, collapsible: childCollapsible, onItemClick: childOnItemClick, destroyOnHidden: childDestroyOnHidden } = child.props || {};
	let isActive = false;
	if (accordion) isActive = activeKey[0] === key;
	else isActive = activeKey.includes(key);
	const mergeCollapsible = childCollapsible ?? collapsible;
	const handleItemClick = (value) => {
		if (mergeCollapsible === "disabled") return;
		onItemClick?.(value);
		childOnItemClick?.(value);
	};
	const childProps = {
		key,
		panelKey: key,
		header,
		headerClass,
		classNames: collapseClassNames,
		styles,
		isActive,
		prefixCls,
		destroyOnHidden: childDestroyOnHidden ?? destroyOnHidden,
		openMotion,
		accordion,
		children: child.children?.default?.(),
		onItemClick: handleItemClick,
		expandIcon,
		collapsible: mergeCollapsible
	};
	Object.keys(childProps).forEach((propName) => {
		if (typeof childProps[propName] === "undefined") delete childProps[propName];
	});
	return cloneElement(child, childProps);
}
function useItems(items, children, props) {
	if (Array.isArray(items)) return convertItemsToNodes(items, props);
	return toArray(children?.()).map((target, index) => getNewChild(target, index, props));
}
export { useItems };
