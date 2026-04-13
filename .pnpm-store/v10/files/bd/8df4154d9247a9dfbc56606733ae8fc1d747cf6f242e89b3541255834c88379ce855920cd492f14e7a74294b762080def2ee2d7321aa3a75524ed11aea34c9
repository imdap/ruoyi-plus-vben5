import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import motion_default from "../_util/motion.js";
import { MenuContextProvider } from "./MenuContext.js";
import MenuDivider_default from "./MenuDivider.js";
import MenuItem_default from "./MenuItem.js";
import { OverrideProvider, useOverrideContext } from "./OverrideContext.js";
import style_default from "./style/index.js";
import SubMenu_default from "./SubMenu.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { EllipsisOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcMenu from "@v-c/menu";

//#region src/menu/menu.tsx
const omitPropKeys = [
	"prefixCls",
	"theme",
	"expandIcon",
	"_internalDisableMenuItemTitleTooltip",
	"inlineCollapsed",
	"siderCollapsed",
	"rootClass",
	"collapsedWidth",
	"mode",
	"selectable",
	"onClick",
	"overflowedIndicatorPopupClassName",
	"classes",
	"styles",
	"itemIcon",
	"labelRender",
	"extraRender"
];
const MENU_COMPONENTS = {
	item: MenuItem_default,
	submenu: SubMenu_default,
	divider: MenuDivider_default
};
function isEmptyIcon(icon) {
	return icon === null || icon === false;
}
const InternalMenu = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs, expose }) => {
	const override = useOverrideContext();
	const overrideObj = computed(() => {
		if (!override?.value) return {};
		return override?.value;
	});
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const { getPrefixCls, direction, getPopupContainer, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, expandIcon: contextExpandIcon } = useComponentBaseConfig("menu", props, ["expandIcon"]);
	const prefixCls = computed(() => getPrefixCls("menu", props?.prefixCls || overrideObj.value?.prefixCls));
	const rootPrefixCls = computed(() => getPrefixCls());
	if (isDev) devUseWarning("Menu")(!(props.inlineCollapsed && props.mode !== "inline"), "usage", "`inlineCollapsed` should only be used when `mode` is inline.");
	overrideObj?.value?.validator?.({ mode: props.mode });
	const onItemClick = (...args) => {
		emit("click", ...args);
		overrideObj?.value?.onClick?.();
	};
	const mergedMode = computed(() => {
		return overrideObj?.value?.mode || props?.mode;
	});
	const mergedSelectable = computed(() => props?.selectable ?? overrideObj?.value?.selectable);
	const mergedInlineCollapsed = computed(() => props?.inlineCollapsed ?? props?.siderCollapsed);
	const mergedProps = computed(() => {
		return {
			...props,
			mode: mergedMode.value,
			inlineCollapsed: mergedInlineCollapsed.value,
			selectable: mergedSelectable.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => ({
		popup: { _default: "root" },
		subMenu: { _default: "item" }
	})));
	const defaultMotions = {
		horizontal: { name: `${rootPrefixCls.value}-slide-up` },
		inline: motion_default(rootPrefixCls.value),
		other: { name: `${rootPrefixCls.value}-zoom-big` }
	};
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls, !override?.value);
	const contextValue = computed(() => ({
		prefixCls: prefixCls.value,
		inlineCollapsed: mergedInlineCollapsed.value || false,
		direction: direction.value,
		firstLevel: true,
		theme: props.theme,
		mode: mergedMode.value,
		disableMenuItemTitleTooltip: props._internalDisableMenuItemTitleTooltip,
		classes: mergedClassNames.value,
		styles: mergedStyles.value
	}));
	const menuRef = shallowRef();
	expose({ menu: menuRef });
	return () => {
		const expandIcon = slots?.expandIcon ?? props?.expandIcon;
		const mergedExpandIcon = (props) => {
			if (typeof expandIcon === "function" || isEmptyIcon(expandIcon)) return expandIcon || null;
			if (typeof overrideObj.value?.expandIcon === "function" || isEmptyIcon(overrideObj.value?.expandIcon)) return overrideObj.value.expandIcon || null;
			if (typeof contextExpandIcon.value === "function" || isEmptyIcon(contextExpandIcon.value)) return contextExpandIcon.value || null;
			const mergedIcon = expandIcon ?? overrideObj?.value.expandIcon ?? contextExpandIcon.value;
			const icon = typeof mergedIcon === "function" ? mergedIcon?.(props) : mergedIcon;
			const iconChild = filterEmpty(Array.isArray(icon) ? icon : [icon])[0];
			if (isVNode(iconChild)) return createVNode(iconChild, { class: `${prefixCls.value}-submenu-expand-icon` });
		};
		const _getPopupContainer = props?.getPopupContainer ?? getPopupContainer;
		const { theme, overflowedIndicatorPopupClassName, rootClass } = props;
		const passedProps = omit(props, omitPropKeys);
		const menuClassName = clsx(`${prefixCls.value}-${theme}`, contextClassName.value, attrs.class);
		const itemIcon = slots?.itemIcon ?? props?.itemIcon;
		const labelRender = slots?.labelRender ?? props?.labelRender;
		const extraRender = slots?.extraRender ?? props?.extraRender;
		const iconRender = slots?.iconRender ?? props?.iconRender;
		return createVNode(OverrideProvider, { "value": null }, { default: () => [createVNode(MenuContextProvider, { "value": contextValue.value }, { default: () => [createVNode(VcMenu, mergeProps({
			"getPopupContainer": _getPopupContainer,
			"overflowedIndicator": createVNode(EllipsisOutlined, null, null),
			"overflowedIndicatorPopupClassName": clsx(prefixCls.value, `${prefixCls.value}-${theme}`, overflowedIndicatorPopupClassName),
			"classes": {
				list: mergedClassNames.value?.list,
				listTitle: mergedClassNames.value?.itemTitle
			},
			"styles": {
				list: mergedStyles.value?.list,
				listTitle: mergedStyles.value?.itemTitle
			},
			"mode": mergedMode.value,
			"selectable": mergedSelectable.value
		}, passedProps, {
			"inlineCollapsed": mergedInlineCollapsed.value,
			"style": {
				...mergedStyles.value?.root,
				...contextStyle.value,
				...attrs.style
			},
			"ref": menuRef,
			"class": menuClassName,
			"prefixCls": prefixCls.value,
			"direction": direction.value,
			"defaultMotions": defaultMotions,
			"expandIcon": mergedExpandIcon,
			"rootClass": clsx(rootClass, hashId.value, overrideObj?.value?.rootClass, cssVarCls.value, rootCls.value, mergedClassNames.value?.root),
			"onClick": onItemClick,
			"onDeselect": (info) => {
				emit("deselect", info);
				emit("update:selectedKeys", info.selectedKeys);
			},
			"onSelect": (info) => {
				emit("select", info);
				emit("update:selectedKeys", info.selectedKeys);
			},
			"onOpenChange": (...args) => {
				emit("openChange", ...args);
				emit("update:openKeys", ...args);
			},
			"itemIcon": itemIcon,
			"labelRender": labelRender,
			"extraRender": extraRender,
			"iconRender": iconRender,
			"_internalComponents": MENU_COMPONENTS
		}), { default: () => [slots?.default?.()] })] })] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		theme: {
			type: String,
			required: false
		},
		inlineIndent: {
			type: Number,
			required: false
		},
		_internalDisableMenuItemTitleTooltip: {
			type: Boolean,
			required: false,
			default: void 0
		},
		items: {
			type: Array,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		extraRender: {
			type: Function,
			required: false
		},
		iconRender: {
			type: Function,
			required: false
		},
		itemIcon: {
			type: Function,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabledOverflow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false
		},
		mode: { required: false },
		inlineCollapsed: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpenKeys: {
			type: Array,
			required: false
		},
		openKeys: {
			type: Array,
			required: false
		},
		selectable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultSelectedKeys: {
			type: Array,
			required: false
		},
		selectedKeys: {
			type: Array,
			required: false
		},
		motion: {
			type: Object,
			required: false
		},
		defaultMotions: {
			type: Object,
			required: false
		},
		subMenuOpenDelay: {
			type: Number,
			required: false
		},
		subMenuCloseDelay: {
			type: Number,
			required: false
		},
		forceSubMenuRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		triggerSubMenuAction: { required: false },
		builtinPlacements: { required: false },
		expandIcon: { required: false },
		overflowedIndicator: {
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
		overflowedIndicatorPopupClassName: {
			type: String,
			required: false
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		_internalRenderMenuItem: {
			type: Function,
			required: false
		},
		_internalRenderSubMenuItem: {
			type: Function,
			required: false
		},
		popupRender: { required: false },
		id: {
			type: String,
			required: false
		},
		siderCollapsed: {
			type: Boolean,
			required: false,
			default: void 0
		},
		collapsedWidth: {
			type: [String, Number],
			required: false
		}
	}, { theme: "light" }),
	emits: [
		"click",
		"select",
		"deselect",
		"openChange",
		"update:openKeys",
		"update:selectedKeys"
	],
	name: "InternalMenu",
	inheritAttrs: false
});
var menu_default = InternalMenu;

//#endregion
export { menu_default as default };