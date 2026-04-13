import { devUseWarning } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import useToken from "../theme/useToken.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { ZIndexProvider } from "../_util/zindexContext.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import getPlacements from "../_util/placements.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import PurePanel_default from "../_util/PurePanel.js";
import { OverrideProvider } from "../menu/OverrideContext.js";
import menu_default from "../menu/index.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { LeftOutlined, RightOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcDropdown from "@v-c/dropdown";

//#region src/dropdown/dropdown.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const Dropdown = /* @__PURE__ */ defineComponent((props, { slots, emit, attrs }) => {
	const { getPrefixCls, prefixCls, direction, getPopupContainer: getContextPopupContainer, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("dropdown", props);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const mergedProps = computed(() => {
		return props;
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const memoPlacement = computed(() => {
		const { placement } = props;
		if (!placement) return direction.value === "rtl" ? "bottomRight" : "bottomLeft";
		if (placement.includes("Center")) return placement.slice(0, placement.indexOf("Center"));
		return placement;
	});
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const [, token] = useToken();
	const warning = devUseWarning("Dropdown");
	const triggerActions = computed(() => {
		if (props.disabled) return [];
		if (typeof props.trigger === "string") {
			if (props.trigger === "contextmenu") return ["contextMenu"];
		}
		if (Array.isArray(props.trigger)) return props.trigger?.map((t) => t === "contextmenu" ? "contextMenu" : t);
		return props?.trigger;
	});
	const alignPoint = computed(() => !!triggerActions.value?.includes?.("contextMenu"));
	const mergedOpen = shallowRef(props.open ?? false);
	watch(() => props.open, (value) => {
		mergedOpen.value = value ?? false;
	});
	const onInnerOpenChange = (nextOpen) => {
		if (props.open === void 0) mergedOpen.value = nextOpen;
		emit("openChange", nextOpen, { source: "trigger" });
		emit("update:open", nextOpen);
	};
	const builtinPlacements = computed(() => getPlacements({
		arrowPointAtCenter: typeof props.arrow === "object" && props.arrow?.pointAtCenter,
		autoAdjustOverflow: props.autoAdjustOverflow,
		offset: token.value?.marginXXS,
		arrowWidth: props?.arrow ? token?.value.sizePopupArrow : 0,
		borderRadius: token?.value.borderRadius
	}));
	const onMenuClick = () => {
		const menu = props?.menu;
		if (menu?.selectable && menu?.multiple) return;
		if (props.open === void 0) mergedOpen.value = false;
		emit("update:open", false);
		emit("openChange", false, { source: "menu" });
	};
	const mergedRootStyles = computed(() => {
		return {
			...contextStyle.value,
			...mergedStyles.value.root
		};
	});
	const [zIndex, contextZIndex] = useZIndex("Dropdown", computed(() => mergedRootStyles.value.zIndex));
	const memoTransitionName = computed(() => {
		const rootPrefixCls = getPrefixCls();
		if (props.transitionName !== void 0) return props.transitionName;
		if (props?.placement?.includes("top")) return `${rootPrefixCls}-slide-down`;
		return `${rootPrefixCls}-slide-up`;
	});
	return () => {
		const children = filterEmpty(slots?.default?.());
		const child = children.length === 1 ? isVNode(children[0]) ? children[0] : createVNode("span", null, [children]) : createVNode("span", null, [children]);
		const { menu, popupRender, mouseEnterDelay, mouseLeaveDelay, arrow, getPopupContainer, rootClass, destroyOnHidden } = props;
		const mergedPopupRender = slots?.popupRender ?? popupRender;
		const popupTrigger = createVNode(child, {
			class: clsx(`${prefixCls.value}-trigger`, { [`${prefixCls.value}-rtl`]: direction.value === "rtl" }),
			disabled: child?.props?.disabled ?? props?.disabled
		});
		const renderOverlay = () => {
			const menuClassNames = omit(mergedClassNames.value, ["root"]);
			const menuStyles = omit(mergedStyles.value, ["root"]);
			let overlayNode;
			if (menu?.items) overlayNode = createVNode(menu_default, mergeProps(menu, {
				"onClick": (menu) => {
					emit("menuClick", menu);
				},
				"classes": {
					...menuClassNames,
					subMenu: { ...menuClassNames }
				},
				"styles": {
					...menuStyles,
					subMenu: { ...menuStyles }
				}
			}), omit(slots, ["default", "popupRender"]));
			if (mergedPopupRender) overlayNode = mergedPopupRender(overlayNode);
			const overlayFiltered = filterEmpty(Array.isArray(overlayNode) ? overlayNode : [overlayNode]).filter(Boolean);
			overlayNode = overlayFiltered.length === 1 ? typeof overlayFiltered[0] === "string" ? createVNode("span", null, [overlayFiltered]) : overlayFiltered : overlayFiltered;
			return createVNode(OverrideProvider, { "value": {
				prefixCls: `${prefixCls.value}-menu`,
				rootClass: clsx(cssVarCls.value, rootCls.value),
				expandIcon: createVNode("span", { "class": `${prefixCls.value}-menu-submenu-arrow` }, [direction.value === "rtl" ? createVNode(LeftOutlined, { "class": `${prefixCls.value}-menu-submenu-arrow-icon` }, null) : createVNode(RightOutlined, { "class": `${prefixCls.value}-menu-submenu-arrow-icon` }, null)]),
				mode: "vertical",
				selectable: false,
				onClick: onMenuClick,
				validator({ mode }) {
					warning(!mode || mode === "vertical", "usage", `mode="${mode}" is not supported for Dropdown's Menu.`);
				}
			} }, _isSlot(overlayNode) ? overlayNode : { default: () => [overlayNode] });
		};
		const overlayClassNameCustomized = clsx(rootClass, hashId.value, cssVarCls.value, rootCls.value, contextClassName.value, mergedClassNames.value?.root, { [`${prefixCls.value}-rtl`]: direction.value === "rtl" });
		let renderNode = createVNode(VcDropdown, mergeProps({ "alignPoint": alignPoint.value }, attrs, omit(props, ["rootClass"]), {
			"mouseEnterDelay": mouseEnterDelay,
			"mouseLeaveDelay": mouseLeaveDelay,
			"visible": mergedOpen.value,
			"builtinPlacements": builtinPlacements.value,
			"arrow": !!arrow,
			"prefixCls": prefixCls.value,
			"getPopupContainer": getPopupContainer || getContextPopupContainer,
			"transitionName": memoTransitionName.value,
			"trigger": triggerActions.value,
			"overlay": renderOverlay,
			"placement": memoPlacement.value,
			"onVisibleChange": onInnerOpenChange,
			"overlayStyle": {
				...mergedStyles.value?.root,
				zIndex: zIndex.value
			},
			"overlayClassName": overlayClassNameCustomized,
			"autoDestroy": destroyOnHidden
		}), _isSlot(popupTrigger) ? popupTrigger : { default: () => [popupTrigger] });
		if (zIndex.value) {
			const _renderNode = function() {
				return renderNode;
			}();
			renderNode = createVNode(ZIndexProvider, { "value": contextZIndex.value }, _isSlot(renderNode) ? renderNode : { default: () => [_renderNode] });
		}
		return renderNode;
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		menu: {
			type: Object,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		trigger: {
			type: Array,
			required: false
		},
		popupRender: {
			type: Function,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: Object,
			required: false
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		transitionName: {
			type: String,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mouseEnterDelay: {
			type: Number,
			required: false
		},
		mouseLeaveDelay: {
			type: Number,
			required: false
		},
		openClassName: {
			type: String,
			required: false
		},
		autoAdjustOverflow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		}
	}, {
		mouseEnterDelay: .15,
		mouseLeaveDelay: .1,
		placement: "",
		autoAdjustOverflow: true
	}),
	emits: [
		"update:open",
		"openChange",
		"menuClick"
	],
	name: "ADropdown",
	inheritAttrs: false
});
const PurePanel = PurePanel_default(Dropdown, "align", void 0, "dropdown", (prefixCls) => prefixCls);
/* istanbul ignore next */
function WrapPurePanel(props) {
	return createVNode(PurePanel, props, { default: () => [createVNode("span", null, null)] });
}
Dropdown._InternalPanelDoNotUseOrYouWillBeFired = WrapPurePanel;
Dropdown.install = (app) => {
	app.component(Dropdown.name, Dropdown);
};
var dropdown_default = Dropdown;

//#endregion
export { dropdown_default as default };