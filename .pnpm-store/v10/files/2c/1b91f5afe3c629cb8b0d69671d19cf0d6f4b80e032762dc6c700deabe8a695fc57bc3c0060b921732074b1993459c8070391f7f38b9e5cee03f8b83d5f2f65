import { pureAttrs } from "../_util/hooks/useMergeSemantic.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import { useMenuContext, useMenuContextProvider } from "./MenuContext.js";
import { Fragment, computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";
import { SubMenu, useFullPath } from "@v-c/menu";

//#region src/menu/SubMenu.tsx
const SubMenu$1 = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const menuContext = useMenuContext();
	const parentPath = useFullPath();
	useMenuContextProvider(computed(() => {
		return {
			...menuContext.value,
			firstLevel: false
		};
	}));
	const [zIndex] = useZIndex("Menu");
	return () => {
		const { popupClassName, theme: customTheme } = props;
		const { inlineCollapsed, prefixCls, theme: contextTheme, classes, styles = {} } = menuContext.value;
		let titleNode;
		const title = getSlotPropsFnRun(slots, props, "title");
		const icon = getSlotPropsFnRun(slots, props, "icon");
		if (!icon) titleNode = inlineCollapsed && !parentPath.value?.length && title && typeof title === "string" ? createVNode("div", { "class": `${prefixCls}-inline-collapsed-noicon` }, [title.charAt(0)]) : createVNode("span", { "class": `${prefixCls}-title-content` }, [title]);
		else {
			const titleIsSpan = typeof title === "object" && title.type === "span";
			titleNode = createVNode(Fragment, null, [createVNode(icon, {
				class: clsx(`${prefixCls}-item-icon`, classes?.itemIcon),
				style: styles.itemIcon
			}), titleIsSpan ? title : createVNode("span", { "class": `${prefixCls}-title-content` }, [title])]);
		}
		return createVNode(SubMenu, mergeProps(pureAttrs(attrs), omit(props, ["icon"]), {
			"title": titleNode,
			"classes": {
				list: classes?.subMenu?.list,
				listTitle: classes?.subMenu?.itemTitle
			},
			"styles": {
				list: styles?.subMenu?.list,
				listTitle: styles?.subMenu?.itemTitle
			},
			"popupClassName": clsx(prefixCls, popupClassName, classes?.popup?.root, `${prefixCls}-${customTheme || contextTheme}`),
			"popupStyle": {
				zIndex: zIndex.value,
				...props?.popupStyle,
				...styles?.popup?.root
			}
		}), { default: () => [slots?.default?.()] });
	};
}, {
	props: {
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
		icon: { required: false },
		theme: {
			type: String,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
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
		expandIcon: {
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
		popupClassName: {
			type: String,
			required: false
		},
		popupOffset: {
			type: Array,
			required: false
		},
		popupStyle: {
			type: Object,
			required: false
		},
		popupRender: {
			type: Function,
			required: false
		},
		onClick: {
			type: Function,
			required: false
		},
		onTitleClick: {
			type: Function,
			required: false
		},
		onTitleMouseEnter: {
			type: Function,
			required: false
		},
		onTitleMouseLeave: {
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
	name: "ASubMenu",
	inheritAttrs: false
});
var SubMenu_default = SubMenu$1;

//#endregion
export { SubMenu_default as default };