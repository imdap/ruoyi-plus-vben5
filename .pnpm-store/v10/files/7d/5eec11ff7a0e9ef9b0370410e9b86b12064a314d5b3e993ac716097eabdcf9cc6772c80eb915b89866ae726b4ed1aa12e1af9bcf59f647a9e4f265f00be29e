import { useBaseConfig } from "../config-provider/context.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import isNonNullable_default from "../_util/isNonNullable.js";
import { checkRenderNode } from "../_util/vueNode.js";
import { useBreadcrumbContext } from "./BreadcrumbContext.js";
import dropdown_default from "../dropdown/index.js";
import BreadcrumbSeparator_default from "./BreadcrumbSeparator.js";
import { renderItem } from "./useItemRender.js";
import { Fragment, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/breadcrumb/BreadcrumbItem.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const InternalBreadcrumbItem = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const breadcrumbContext = useBreadcrumbContext();
	/** If overlay is have Wrap a Dropdown */
	const renderBreadcrumbNode = (breadcrumbItem) => {
		const { prefixCls, menu, dropdownProps, href } = props;
		const dropdownIcon = getSlotPropsFnRun({}, props, "dropdownIcon");
		if (menu) {
			const mergeDropDownProps = { ...dropdownProps };
			if (menu) {
				const { items, ...menuProps } = menu || {};
				mergeDropDownProps.menu = {
					...menuProps,
					items: items?.map(({ key, title, label, path, ...itemProps }, index) => {
						let mergedLabel = getSlotPropsFnRun({ label: title }, { label }, "label");
						if (path) {
							(function() {
								return mergedLabel;
							})();
							mergedLabel = createVNode("a", { "href": `${href}${path}` }, [mergedLabel]);
						}
						return {
							...itemProps,
							key: key ?? index,
							label: mergedLabel
						};
					})
				};
			}
			return createVNode(dropdown_default, mergeProps({ "placement": "bottom" }, mergeDropDownProps), { default: () => [createVNode("span", { "class": `${prefixCls}-overlay-link` }, [breadcrumbItem, dropdownIcon])] });
		}
		return breadcrumbItem;
	};
	return () => {
		const { separator = "/", prefixCls } = props;
		const children = checkRenderNode(filterEmpty(slots?.default?.() ?? []));
		const { classes: mergedClassNames, styles: mergedStyles } = breadcrumbContext.value;
		const link = renderBreadcrumbNode(children);
		if (isNonNullable_default(link)) return createVNode(Fragment, null, [createVNode("li", {
			"class": clsx(`${prefixCls}-item`, mergedClassNames?.item),
			"style": mergedStyles?.item
		}, [link]), !!separator && createVNode(BreadcrumbSeparator_default, null, _isSlot(separator) ? separator : { default: () => [separator] })]);
		return null;
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		href: {
			type: String,
			required: false
		},
		menu: {
			type: Object,
			required: false
		},
		dropdownProps: {
			type: Object,
			required: false
		},
		dropdownIcon: {
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
		onClick: {
			type: Function,
			required: false
		},
		class: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		separator: { required: false }
	},
	name: "InternalBreadcrumbItem",
	inheritAttrs: false
});
const BreadcrumbItem = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const { prefixCls } = useBaseConfig("breadcrumb", props);
	return () => {
		let _slot;
		const { href, ...restProps } = props;
		const children = checkRenderNode(filterEmpty(slots?.default?.() ?? []));
		return createVNode(InternalBreadcrumbItem, mergeProps(restProps, { "prefixCls": prefixCls.value }), _isSlot(_slot = renderItem(prefixCls.value, restProps, children, href)) ? _slot : { default: () => [_slot] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		href: {
			type: String,
			required: false
		},
		menu: {
			type: Object,
			required: false
		},
		dropdownProps: {
			type: Object,
			required: false
		},
		dropdownIcon: {
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
		onClick: {
			type: Function,
			required: false
		},
		class: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		separator: { required: false }
	},
	name: "ABreadcrumbItem",
	inheritAttrs: false
});
BreadcrumbItem.__ANT_BREADCRUMB_ITEM = true;
var BreadcrumbItem_default = BreadcrumbItem;

//#endregion
export { InternalBreadcrumbItem, BreadcrumbItem_default as default };