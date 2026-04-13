import { getSlotPropsFnRun } from "../../_util/tools.js";
import TabPane_default from "../TabPane.js";
import { computed, isVNode } from "vue";
import { filterEmpty, flattenChildren } from "@v-c/util/dist/props-util";

//#region src/tabs/hooks/useLegacyItems.ts
function convertItem(item, index, slots) {
	const { ...rest } = item;
	const labelRender = filterEmpty(slots?.labelRender?.({
		item,
		index
	}) ?? []);
	const label = labelRender.length ? labelRender : getSlotPropsFnRun(item, {}, "label");
	const childrenRender = () => {
		if (slots?.contentRender) {
			const vnode = filterEmpty(slots?.contentRender?.({
				item,
				index
			}) ?? []);
			if (vnode.length) return vnode;
		}
		return getSlotPropsFnRun(item, {}, "content");
	};
	return {
		...rest,
		children: childrenRender,
		label,
		className: rest.class,
		destroyOnHidden: rest.destroyOnHidden
	};
}
function isTabPaneNode(node) {
	if (!isVNode(node)) return false;
	const type = node.type;
	return type === TabPane_default || type?.name === "ATabPane";
}
function useLegacyItems(items, slots) {
	return computed(() => {
		const itemsValue = items();
		if (itemsValue && itemsValue.length) return itemsValue.map((item, index) => convertItem(item, index, slots));
		return flattenChildren(slots?.default?.() ?? []).map((node, index) => {
			if (!isTabPaneNode(node)) return null;
			const { tab, closeIcon, icon, destroyInactiveTabPane, destroyOnHidden, children: childrenProp, class: className, className: _className, tabKey, ...restProps } = node.props || {};
			return convertItem({
				key: tabKey != null ? String(tabKey) : node.key != null ? String(node.key) : `${index}`,
				label: node.children?.tab ?? tab,
				closeIcon: node.children?.closeIcon ?? closeIcon,
				icon: node.children?.icon ?? icon,
				content: node.children?.default ?? childrenProp,
				class: className ?? _className,
				destroyOnHidden: destroyOnHidden ?? destroyInactiveTabPane,
				...restProps
			}, index, slots);
		}).filter(Boolean);
	});
}

//#endregion
export { useLegacyItems as default };