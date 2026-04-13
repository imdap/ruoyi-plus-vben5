import { createVNode } from "vue";
import { clsx } from "@v-c/util";
//#region src/utils/expandUtil.tsx
function renderExpandIcon({ prefixCls, record, onExpand, expanded, expandable }) {
	const expandClassName = `${prefixCls}-row-expand-icon`;
	if (!expandable) return createVNode("span", { "class": clsx(expandClassName, `${prefixCls}-row-spaced`) }, null);
	const onClick = (event) => {
		onExpand(record, event);
		event.stopPropagation();
	};
	return createVNode("span", {
		"class": clsx(expandClassName, {
			[`${prefixCls}-row-expanded`]: expanded,
			[`${prefixCls}-row-collapsed`]: !expanded
		}),
		"onClick": onClick
	}, null);
}
function findAllChildrenKeys(data, getRowKey, childrenColumnName) {
	const keys = [];
	function dig(list) {
		(list || []).forEach((item, index) => {
			keys.push(getRowKey(item, index));
			dig(item[childrenColumnName]);
		});
	}
	dig(data);
	return keys;
}
function computedExpandedClassName(cls, record, index, indent) {
	if (typeof cls === "string") return cls;
	if (typeof cls === "function") return cls(record, index, indent);
	return "";
}
//#endregion
export { computedExpandedClassName, findAllChildrenKeys, renderExpandIcon };
