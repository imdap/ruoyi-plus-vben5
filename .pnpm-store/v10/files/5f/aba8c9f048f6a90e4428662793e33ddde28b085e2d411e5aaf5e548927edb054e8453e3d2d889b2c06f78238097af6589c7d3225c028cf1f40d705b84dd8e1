import { createVNode } from "vue";
import { clsx } from "@v-c/util";

//#region src/table/ExpandIcon.tsx
function renderExpandIcon(locale) {
	return (props) => {
		const { prefixCls, onExpand, record, expanded, expandable } = props;
		const iconPrefix = `${prefixCls}-row-expand-icon`;
		return createVNode("button", {
			"type": "button",
			"onClick": (e) => {
				onExpand(record, e);
				e.stopPropagation();
			},
			"class": clsx(iconPrefix, {
				[`${iconPrefix}-spaced`]: !expandable,
				[`${iconPrefix}-expanded`]: expandable && expanded,
				[`${iconPrefix}-collapsed`]: expandable && !expanded
			}),
			"aria-label": expanded ? locale.collapse : locale.expand,
			"aria-expanded": expanded
		}, null);
	};
}
var ExpandIcon_default = renderExpandIcon;

//#endregion
export { ExpandIcon_default as default };