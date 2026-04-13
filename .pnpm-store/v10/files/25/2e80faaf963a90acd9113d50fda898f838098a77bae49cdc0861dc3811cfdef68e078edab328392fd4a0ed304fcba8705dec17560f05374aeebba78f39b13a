import { pureAttrs } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import tooltip_default from "../tooltip/index.js";
import { useSiderCtx } from "../layout/Sider.js";
import { useMenuContext } from "./MenuContext.js";
import { createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty, getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";
import { Item } from "@v-c/menu";

//#region src/menu/MenuItem.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const MenuItem = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const menuContext = useMenuContext();
	const { siderCollapsed } = useSiderCtx();
	return () => {
		const extra = getSlotPropsFnRun(slots, props, "extra");
		const icon = getSlotPropsFnRun(slots, props, "icon");
		const title = getSlotPropsFnRun(slots, props, "title", false);
		const { className, style } = getAttrStyleAndClass(attrs);
		const { danger } = props;
		const { prefixCls, firstLevel, direction, disableMenuItemTitleTooltip, inlineCollapsed: isInlineCollapsed, styles, classes } = menuContext.value;
		const children = filterEmpty(slots?.default?.());
		const renderItemChildren = (inlineCollapsed) => {
			const label = children?.[0];
			const wrapNode = createVNode("span", {
				"class": clsx(`${prefixCls}-title-content`, firstLevel ? classes?.itemContent : classes?.subMenu?.itemContent, { [`${prefixCls}-title-content-with-extra`]: !!extra || extra === 0 }),
				"style": firstLevel ? styles?.itemContent : styles?.subMenu?.itemContent
			}, [children]);
			const _children = children?.[0];
			if (!icon || isVNode(_children) && _children.type === "span") {
				if (_children && inlineCollapsed && firstLevel && typeof label === "string") return createVNode("div", { "class": `${prefixCls}-inline-collapsed-noicon` }, [label.charAt(0)]);
			}
			return wrapNode;
		};
		let tooltipTitle = title;
		if (typeof title === "undefined") tooltipTitle = firstLevel ? children : "";
		else if (title === false) tooltipTitle = "";
		const tooltipProps = { title: tooltipTitle };
		if (!siderCollapsed?.value && !isInlineCollapsed) {
			tooltipProps.title = null;
			tooltipProps.open = false;
		}
		const childrenLength = children.length;
		let returnNode = createVNode(Item, mergeProps(pureAttrs(attrs), omit(props, [
			"title",
			"icon",
			"danger"
		]), {
			"class": clsx(firstLevel ? classes?.item : classes?.subMenu?.item, {
				[`${prefixCls}-item-danger`]: !!danger,
				[`${prefixCls}-item-only-child`]: (icon ? childrenLength + 1 : childrenLength) === 1
			}, className),
			"style": [firstLevel ? styles?.item : styles?.subMenu?.item, style],
			"title": typeof title === "string" ? title : void 0
		}), { default: () => [icon ? createVNode(icon, {
			class: clsx(`${prefixCls}-item-icon`, firstLevel ? classes?.itemIcon : classes?.subMenu?.itemIcon),
			style: firstLevel ? styles?.itemIcon : styles?.subMenu?.itemIcon
		}) : null, renderItemChildren(isInlineCollapsed)] });
		if (!disableMenuItemTitleTooltip) {
			const _returnNode = function() {
				return returnNode;
			}();
			returnNode = createVNode(tooltip_default, mergeProps(tooltipProps, {
				"placement": direction === "rtl" ? "left" : "right",
				"classes": { root: `${prefixCls}-inline-collapsed-tooltip` }
			}), _isSlot(returnNode) ? returnNode : { default: () => [_returnNode] });
		}
		return returnNode;
	};
}, {
	props: {
		icon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		danger: {
			type: Boolean,
			required: false,
			default: void 0
		},
		title: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		eventKey: {
			type: String,
			required: false
		},
		warnKey: {
			type: Boolean,
			required: false,
			default: void 0
		},
		attribute: {
			type: Object,
			required: false
		},
		onKeyDown: {
			type: Function,
			required: false
		},
		onFocus: {
			type: Function,
			required: false
		},
		role: {
			type: String,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		label: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		itemIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		extra: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		onMouseEnter: {
			type: Function,
			required: false
		},
		onMouseLeave: {
			type: Function,
			required: false
		},
		onClick: {
			type: Function,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		class: {
			type: String,
			required: false
		}
	},
	name: "AMenuItem",
	inheritAttrs: false
});
var MenuItem_default = MenuItem;

//#endregion
export { MenuItem_default as default };