import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import useAnimateConfig from "./hooks/useAnimateConfig.js";
import TabPane_default from "./TabPane.js";
import useLegacyItems from "./hooks/useLegacyItems.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef, toRef } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { CloseOutlined, EllipsisOutlined, PlusOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcTabs from "@v-c/tabs";

//#region src/tabs/index.tsx
const Tabs = /* @__PURE__ */ defineComponent((props, { attrs, slots, emit, expose }) => {
	const { classes, styles, type, size: customSize, tabPlacement: tabPlacementProp, tabPosition, hideAdd, centered, indicatorSize } = toPropsRefs$1(props, "classes", "styles", "type", "size", "tabPlacement", "tabPosition", "hideAdd", "centered", "indicatorSize");
	const more = toRef(props, "more");
	const popupClassName = toRef(props, "popupClassName");
	const indicator = toRef(props, "indicator");
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, getPopupContainer, getPrefixCls } = useComponentBaseConfig("tabs", props);
	const size = useSize(customSize);
	const mergedPlacement = computed(() => {
		const placement = tabPlacementProp.value ?? tabPosition.value;
		const isRTL = direction.value === "rtl";
		switch (placement) {
			case "start": return isRTL ? "right" : "left";
			case "end": return isRTL ? "left" : "right";
			default: return placement;
		}
	});
	const mergedItems = useLegacyItems(() => props.items, slots);
	const mergedProps = computed(() => {
		return {
			...props,
			size: size.value,
			tabPlacement: mergedPlacement.value,
			items: mergedItems.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => ({ popup: { _default: "root" } })));
	const mergedAnimated = computed(() => useAnimateConfig(prefixCls.value, props.animated));
	const mergedIndicator = computed(() => ({
		align: indicator.value?.align,
		size: indicator.value?.size ?? indicatorSize.value
	}));
	const tabsRef = shallowRef();
	expose({ nativeElement: computed(() => tabsRef.value?.$el ?? tabsRef.value ?? null) });
	if (isDev) {
		const warning = devUseWarning("Tabs");
		warning.deprecated(!popupClassName.value, "popupClassName", "classes.popup");
		warning.deprecated(!tabPosition.value, "tabPosition", "tabPlacement");
		warning(!(attrs.onPrevClick || attrs.onNextClick), "breaking", "`onPrevClick` and `onNextClick` has been removed. Please use `onTabScroll` instead.");
		warning.deprecated(!indicatorSize.value, "indicatorSize", "indicator");
		warning.deprecated(!(props.destroyInactiveTabPane || props.items?.some((item) => "destroyInactiveTabPane" in item)), "destroyInactiveTabPane", "destroyOnHidden");
	}
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const onInternalChange = (activeKey) => {
		emit("update:activeKey", activeKey);
		emit("change", activeKey);
	};
	const onInternalTabClick = (activeKey, e) => {
		emit("tabClick", activeKey, e);
	};
	const onInternalTabScroll = (info) => {
		emit("tabScroll", info);
	};
	return () => {
		const { className: attrClassName, style: attrStyle, restAttrs } = getAttrStyleAndClass(attrs);
		const addIcon = getSlotPropsFnRun(slots, props, "addIcon") ?? createVNode(PlusOutlined, null, null);
		const removeIcon = getSlotPropsFnRun(slots, props, "removeIcon") ?? createVNode(CloseOutlined, null, null);
		const moreIcon = getSlotPropsFnRun(slots, props, "moreIcon") ?? createVNode(EllipsisOutlined, null, null);
		const editableFn = () => {
			if (type.value !== "editable-card") return;
			return {
				onEdit: (editType, { key, event }) => {
					emit("edit", editType === "add" ? event : key ?? "", editType);
				},
				removeIcon,
				addIcon,
				showAdd: hideAdd.value !== true
			};
		};
		const mergedMoreFn = () => {
			const rootPrefixCls = getPrefixCls();
			if (!rootPrefixCls) return {
				icon: moreIcon,
				...more.value
			};
			return {
				icon: moreIcon,
				transitionName: `${rootPrefixCls}-slide-up`,
				...more.value
			};
		};
		const mergedMore = mergedMoreFn();
		const editable = editableFn();
		const restProps = omit(props, [
			"items",
			"styles",
			"classes",
			"type",
			"size",
			"hideAdd",
			"centered",
			"addIcon",
			"removeIcon",
			"moreIcon",
			"more",
			"indicatorSize",
			"tabPlacement",
			"tabPosition",
			"rootClass",
			"popupClassName",
			"animated",
			"indicator",
			"destroyInactiveTabPane",
			"renderTabBar",
			"tabBarExtraContent"
		]);
		const rootClassName = clsx(props.rootClass, contextClassName.value, mergedClassNames.value.root, {
			[`${prefixCls.value}-large`]: size.value === "large",
			[`${prefixCls.value}-small`]: size.value === "small",
			[`${prefixCls.value}-card`]: ["card", "editable-card"].includes(type.value ?? ""),
			[`${prefixCls.value}-editable-card`]: type.value === "editable-card",
			[`${prefixCls.value}-centered`]: centered.value
		}, hashId.value, cssVarCls.value, rootCls.value, attrClassName);
		const popupCls = clsx(popupClassName.value, hashId.value, cssVarCls.value, rootCls.value, mergedClassNames.value?.popup?.root);
		const mergedStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...attrStyle
		};
		let renderTabBar;
		if (slots.renderTabBar || props.renderTabBar) renderTabBar = (tabBarProps, TabNavListComponent) => {
			return getSlotPropsFnRun(slots, props, "renderTabBar", true, {
				props: tabBarProps,
				TabNavListComponent
			});
		};
		let tabBarExtraContent;
		if (props.tabBarExtraContent) tabBarExtraContent = props.tabBarExtraContent;
		else {
			const leftExtra = getSlotPropsFnRun(slots, {}, "leftExtra");
			const rightExtra = getSlotPropsFnRun(slots, {}, "rightExtra");
			if (!leftExtra && rightExtra) tabBarExtraContent = rightExtra;
			else if (leftExtra && rightExtra) tabBarExtraContent = {
				left: leftExtra,
				right: rightExtra
			};
			else if (leftExtra && !rightExtra) tabBarExtraContent = { left: leftExtra };
		}
		return createVNode(VcTabs, mergeProps({
			"ref": tabsRef,
			"direction": direction.value,
			"getPopupContainer": getPopupContainer
		}, restAttrs, restProps, {
			"items": mergedItems.value,
			"className": rootClassName,
			"classNames": {
				...mergedClassNames.value,
				popup: popupCls
			},
			"renderTabBar": renderTabBar,
			"tabBarExtraContent": tabBarExtraContent,
			"styles": mergedStyles.value,
			"style": mergedStyle,
			"editable": editable,
			"more": mergedMore,
			"prefixCls": prefixCls.value,
			"animated": mergedAnimated.value,
			"indicator": mergedIndicator.value,
			"destroyOnHidden": props.destroyOnHidden ?? props.destroyInactiveTabPane,
			"tabPosition": mergedPlacement.value,
			"onChange": onInternalChange,
			"onTabClick": onInternalTabClick,
			"onTabScroll": onInternalTabScroll
		}), null);
	};
}, {
	props: {
		addIcon: {
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
		moreIcon: {
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
		more: {
			type: Object,
			required: false
		},
		removeIcon: {
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
		styles: {
			type: [Object, Function],
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		popupClassName: {
			type: String,
			required: false
		},
		renderTabBar: {
			type: Function,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		size: {
			type: [String, null],
			required: false
		},
		hideAdd: {
			type: Boolean,
			required: false,
			default: void 0
		},
		centered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabPosition: {
			type: String,
			required: false
		},
		tabPlacement: {
			type: String,
			required: false
		},
		indicatorSize: {
			type: [Number, Function],
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		destroyInactiveTabPane: {
			type: Boolean,
			required: false,
			default: void 0
		},
		id: {
			type: [String, null],
			required: false
		},
		activeKey: {
			type: String,
			required: false
		},
		defaultActiveKey: {
			type: String,
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		animated: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		tabBarExtraContent: {
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
		tabBarGutter: {
			type: Number,
			required: false
		},
		tabBarStyle: {
			type: Object,
			required: false
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		locale: {
			type: Object,
			required: false
		},
		indicator: {
			type: Object,
			required: false
		}
	},
	emits: [
		"edit",
		"change",
		"tabClick",
		"tabScroll",
		"update:activeKey"
	],
	name: "ATabs",
	inheritAttrs: false
});
Tabs.TabPane = TabPane_default;
Tabs.install = (app) => {
	app.component(Tabs.name, Tabs);
	app.component(TabPane_default.name, TabPane_default);
};
var tabs_default = Tabs;

//#endregion
export { TabPane_default as TabPane, tabs_default as default };