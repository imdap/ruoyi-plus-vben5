import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig, useConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import useToken from "../theme/useToken.js";
import { useCompactItemContext } from "../space/Compact.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import PurePanel_default from "../_util/PurePanel.js";
import { getMergedStatus, getStatusClassNames } from "../_util/statusUtils.js";
import { DefaultRenderEmpty } from "../config-provider/defaultRenderEmpty.js";
import { useFormItemInputContext } from "../form/context.js";
import useVariant from "../form/hooks/useVariant.js";
import mergedBuiltinPlacements_default from "../select/mergedBuiltinPlacements.js";
import style_default from "../select/style/index.js";
import useIcons from "../select/useIcons.js";
import usePopupRender_default from "../select/usePopupRender.js";
import useShowArrow from "../select/useShowArrow.js";
import iconUtil_default from "../tree/utils/iconUtil.js";
import useTreeSelectStyle from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { getTransitionName } from "@v-c/util/dist/utils/transition";
import { omit } from "es-toolkit";
import VcTreeSelect, { SHOW_ALL, SHOW_CHILD, SHOW_PARENT, TreeNode } from "@v-c/tree-select";

//#region src/tree-select/index.tsx
const defaults = {
	listHeight: 256,
	choiceTransitionName: "",
	treeIcon: false
};
const omitKeys = [
	"prefixCls",
	"size",
	"disabled",
	"bordered",
	"style",
	"className",
	"rootClassName",
	"treeCheckable",
	"multiple",
	"listHeight",
	"listItemHeight",
	"placement",
	"notFoundContent",
	"switcherIcon",
	"treeLine",
	"getPopupContainer",
	"popupClassName",
	"dropdownClassName",
	"treeIcon",
	"transitionName",
	"choiceTransitionName",
	"status",
	"treeExpandAction",
	"builtinPlacements",
	"dropdownMatchSelectWidth",
	"popupMatchSelectWidth",
	"allowClear",
	"variant",
	"dropdownStyle",
	"dropdownRender",
	"popupRender",
	"tagRender",
	"maxCount",
	"showCheckedStrategy",
	"treeCheckStrictly",
	"styles",
	"classes"
];
const TreeSelect = /* @__PURE__ */ defineComponent((props, { slots, expose, emit, attrs }) => {
	const { prefixCls: treeSelectPrefixCls, getPopupContainer: getContextPopupContainer, direction, styles: contextStyles, classes: contextClassNames, switcherIcon, virtual, getPrefixCls, rootPrefixCls } = useComponentBaseConfig("treeSelect", props, ["switcherIcon"], "tree-select");
	const configCtx = useConfig();
	const { prefixCls: customizePrefixCls, variant: customVariant, size: customizeSize, disabled: customDisabled, status: customStatus, classes, styles } = toPropsRefs$1(props, "prefixCls", "variant", "size", "disabled", "status", "classes", "styles");
	const bordered = computed(() => props?.bordered ?? true);
	const [, token] = useToken();
	const listItemHeight = computed(() => props?.listItemHeight ?? token?.value?.controlHeightSM + token?.value?.paddingXXS);
	if (isDev) {
		const { treeCheckable, multiple } = props;
		const warning = devUseWarning("TreeSelect");
		Object.entries({
			dropdownMatchSelectWidth: "popupMatchSelectWidth",
			dropdownStyle: "styles.popup.root",
			dropdownClassName: "classNames.popup.root",
			popupClassName: "classNames.popup.root",
			dropdownRender: "popupRender",
			onDropdownVisibleChange: "onOpenChange",
			bordered: "variant"
		}).forEach(([oldProp, newProp]) => {
			warning.deprecated(!(props[oldProp] !== void 0), oldProp, newProp);
		});
		warning(multiple !== false || !treeCheckable, "usage", "`multiple` will always be `true` when `treeCheckable` is true");
		warning(!(props.showArrow !== void 0), "deprecated", "`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.");
	}
	const prefixCls = computed(() => getPrefixCls("select", customizePrefixCls.value));
	const treePrefixCls = computed(() => getPrefixCls("select-tree", customizePrefixCls.value));
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const rootCls = useCSSVarCls_default(prefixCls);
	const treeSelectRootCls = useCSSVarCls_default(treeSelectPrefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	useTreeSelectStyle(treeSelectPrefixCls, treePrefixCls, treeSelectRootCls);
	const [variant, enableVariantCls] = useVariant("treeSelect", customVariant, bordered);
	const mergedSize = useSize((ctx) => customizeSize.value ?? compactSize.value ?? ctx);
	const disabled = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled.value ?? disabled.value);
	const formItemInputContext = useFormItemInputContext();
	const mergedStatus = computed(() => getMergedStatus(formItemInputContext.value.status, customStatus.value));
	const mergedProps = computed(() => ({
		...props,
		size: mergedSize.value,
		disabled: mergedDisabled.value,
		status: mergedStatus.value,
		variant: variant.value
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => {
		return { popup: { _default: "root" } };
	}));
	const mergedOnOpenChange = (open) => {
		emit("openChange", open);
		emit("dropdownVisibleChange", open);
	};
	const mergedMaxCount = computed(() => {
		const { maxCount, showCheckedStrategy, treeCheckStrictly } = props;
		if (maxCount && (showCheckedStrategy === "SHOW_ALL" && !treeCheckStrictly || showCheckedStrategy === "SHOW_PARENT")) return;
		return maxCount;
	});
	const memoizedPlacement = computed(() => {
		const { placement } = props;
		if (placement !== void 0) return placement;
		return direction.value === "rtl" ? "bottomRight" : "bottomLeft";
	});
	const [zIndex] = useZIndex("SelectLike", computed(() => mergedStyles.value?.root?.zIndex));
	const treeSelectRef = shallowRef();
	expose({
		focus: () => treeSelectRef.value?.focus(),
		blur: () => treeSelectRef.value?.blur(),
		scrollTo: (arg) => treeSelectRef.value?.scrollTo?.(arg)
	});
	return () => {
		const { popupClassName, dropdownClassName, rootClass, popupRender, dropdownRender, popupMatchSelectWidth, dropdownMatchSelectWidth, treeCheckable, multiple, allowClear, treeLine, listHeight, builtinPlacements, switcherIcon: customSwitcherIcon, treeIcon, getPopupContainer, choiceTransitionName, transitionName, treeExpandAction, showCheckedStrategy, treeCheckStrictly } = props;
		const restProps = omit(props, omitKeys);
		const treeTitleRender = slots?.treeTitleRender ?? props.treeTitleRender;
		const mergedPopupClassName = clsx(popupClassName || dropdownClassName, `${treeSelectPrefixCls.value}-dropdown`, { [`${treeSelectPrefixCls.value}-dropdown-rtl`]: direction.value === "rtl" }, rootClass, mergedClassNames.value.root, mergedClassNames.value.popup?.root, cssVarCls.value, rootCls.value, treeSelectRootCls.value, hashId.value);
		const { style, className, restAttrs } = getAttrStyleAndClass(attrs);
		const mergedPopupRender = usePopupRender_default(popupRender || dropdownRender);
		const customSuffixIcon = getSlotPropsFnRun(slots, props, "suffixIcon", false);
		const showSuffixIcon = useShowArrow(customSuffixIcon, props.showArrow);
		const mergedPopupMatchSelectWidth = popupMatchSelectWidth ?? dropdownMatchSelectWidth ?? configCtx.value?.popupMatchSelectWidth;
		const isMultiple = !!(treeCheckable || multiple);
		const { hasFeedback, feedbackIcon, isFormItemInput } = formItemInputContext.value;
		const { suffixIcon, removeIcon, clearIcon } = useIcons({
			...restProps,
			suffixIcon: customSuffixIcon,
			multiple: isMultiple,
			showSuffixIcon,
			hasFeedback,
			feedbackIcon,
			prefixCls: prefixCls.value,
			componentName: "TreeSelect"
		});
		const mergedAllowClear = allowClear === true ? { clearIcon } : allowClear;
		const notFoundContent = getSlotPropsFnRun(slots, props, "notFoundContent", false);
		let mergedNotFound;
		if (notFoundContent !== void 0) mergedNotFound = notFoundContent;
		else mergedNotFound = configCtx?.value?.renderEmpty?.("Select") || createVNode(DefaultRenderEmpty, { "componentName": "Select" }, null);
		const onAttrs = {
			onFocus(e) {
				emit("focus", e);
			},
			onBlur(e) {
				emit("blur", e);
			},
			onSelect(value, option) {
				emit("select", value, option);
			},
			onChange(value, labelList, extra) {
				emit("change", value, labelList, extra);
				emit("update:value", value);
			},
			onDeselect(value, option) {
				emit("deselect", value, option);
			},
			onTreeExpand(expandedKeys) {
				emit("treeExpand", expandedKeys);
			},
			onTreeLoad(loadedKeys) {
				emit("treeLoad", loadedKeys);
			},
			onPopupScroll(e) {
				emit("popupScroll", e);
			},
			onSearch(value) {
				emit("search", value);
			}
		};
		const selectProps = omit(restProps, [
			"suffixIcon",
			"removeIcon",
			"clearIcon",
			"itemIcon",
			"switcherIcon",
			"classes",
			"styles",
			...Object.keys(onAttrs)
		]);
		const mergedClassName = clsx(!customizePrefixCls.value && treeSelectPrefixCls.value, {
			[`${prefixCls.value}-lg`]: mergedSize.value === "large",
			[`${prefixCls.value}-sm`]: mergedSize.value === "small",
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-${variant.value}`]: enableVariantCls.value,
			[`${prefixCls.value}-in-form-item`]: isFormItemInput
		}, getStatusClassNames(prefixCls.value, mergedStatus.value, hasFeedback), compactItemClassnames.value, className, rootClass, mergedClassNames?.value?.root, cssVarCls.value, rootCls.value, treeSelectRootCls.value, hashId.value);
		const mergedSwitcherIcon = slots?.switcherIcon ?? customSwitcherIcon ?? switcherIcon.value;
		const renderSwitcherIcon = (nodeProps) => createVNode(iconUtil_default, {
			"prefixCls": treePrefixCls.value,
			"switcherIcon": mergedSwitcherIcon,
			"treeNodeProps": nodeProps,
			"showLine": treeLine
		}, null);
		const popupOverflow = configCtx.value?.popupOverflow;
		const tagRender = slots?.tagRender ?? props?.tagRender;
		return createVNode(VcTreeSelect, mergeProps(restAttrs, onAttrs, {
			"ref": treeSelectRef,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"virtual": virtual.value,
			"disabled": mergedDisabled.value
		}, selectProps, {
			"popupMatchSelectWidth": mergedPopupMatchSelectWidth,
			"builtinPlacements": mergedBuiltinPlacements_default(builtinPlacements, popupOverflow),
			"prefixCls": prefixCls.value,
			"className": mergedClassName,
			"style": {
				...mergedStyles.value?.root,
				...style
			},
			"listHeight": listHeight,
			"listItemHeight": listItemHeight.value,
			"treeCheckable": treeCheckable ? createVNode("span", { "class": `${prefixCls.value}-tree-checkbox-inner` }, null) : treeCheckable,
			"treeLine": !!treeLine,
			"suffixIcon": suffixIcon,
			"multiple": isMultiple,
			"placement": memoizedPlacement.value,
			"removeIcon": removeIcon,
			"allowClear": mergedAllowClear,
			"switcherIcon": renderSwitcherIcon,
			"showTreeIcon": treeIcon,
			"notFoundContent": mergedNotFound,
			"getPopupContainer": getPopupContainer || getContextPopupContainer,
			"treeMotion": null,
			"popupClassName": mergedPopupClassName,
			"popupStyle": {
				...mergedStyles.value.root,
				...mergedStyles.value.popup?.root,
				zIndex: zIndex.value
			},
			"popupRender": mergedPopupRender,
			"onPopupVisibleChange": mergedOnOpenChange,
			"choiceTransitionName": getTransitionName(rootPrefixCls.value, "", choiceTransitionName),
			"transitionName": getTransitionName(rootPrefixCls.value, "slide-up", transitionName),
			"treeExpandAction": treeExpandAction,
			"tagRender": isMultiple ? tagRender : void 0,
			"maxCount": mergedMaxCount.value,
			"showCheckedStrategy": showCheckedStrategy,
			"treeCheckStrictly": treeCheckStrictly,
			"treeTitleRender": treeTitleRender
		}), null);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		styles: {
			type: [Object, Function],
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		suffixIcon: {
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
		size: {
			type: [String, null],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false
		},
		popupClassName: {
			type: String,
			required: false
		},
		dropdownClassName: {
			type: String,
			required: false
		},
		dropdownRender: {
			type: Function,
			required: false
		},
		popupRender: {
			type: Function,
			required: false
		},
		dropdownStyle: {
			type: Object,
			required: false
		},
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		treeLine: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
		},
		switcherIcon: {
			type: Function,
			required: false,
			skipCheck: true
		},
		rootClass: {
			type: String,
			required: false
		},
		dropdownMatchSelectWidth: {
			type: [Boolean, Number],
			required: false,
			default: void 0
		},
		popupMatchSelectWidth: {
			type: [Boolean, Number],
			required: false,
			default: void 0
		},
		showArrow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		variant: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		value: { required: false },
		defaultValue: { required: false },
		showSearch: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		searchValue: {
			type: String,
			required: false
		},
		inputValue: {
			type: String,
			required: false
		},
		autoClearSearchValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filterTreeNode: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		treeNodeFilterProp: {
			type: String,
			required: false
		},
		showCheckedStrategy: { required: false },
		treeNodeLabelProp: {
			type: String,
			required: false
		},
		fieldNames: {
			type: Object,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		treeCheckable: {
			type: [
				Boolean,
				Object,
				Function,
				String,
				Number,
				null,
				Array
			],
			required: false,
			default: void 0
		},
		treeCheckStrictly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		labelInValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		maxCount: {
			type: Number,
			required: false
		},
		treeData: {
			type: Array,
			required: false
		},
		treeDataSimpleMode: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		loadData: {
			type: Function,
			required: false
		},
		treeLoadedKeys: {
			type: Array,
			required: false
		},
		treeDefaultExpandAll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		treeExpandedKeys: {
			type: Array,
			required: false
		},
		treeDefaultExpandedKeys: {
			type: Array,
			required: false
		},
		treeExpandAction: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		virtual: {
			type: Boolean,
			required: false,
			default: void 0
		},
		listHeight: {
			type: Number,
			required: false
		},
		listItemHeight: {
			type: Number,
			required: false
		},
		listItemScrollOffset: {
			type: Number,
			required: false
		},
		treeTitleRender: {
			type: Function,
			required: false
		},
		treeIcon: {
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
		className: {
			type: String,
			required: false
		},
		tagRender: {
			type: Function,
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
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
		title: {
			type: String,
			required: false
		},
		tabIndex: {
			type: Number,
			required: false
		},
		notFoundContent: {
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
		onClear: {
			type: Function,
			required: false
		},
		maxLength: {
			type: Number,
			required: false
		},
		showScrollBar: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		choiceTransitionName: {
			type: String,
			required: false
		},
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getRawInputElement: {
			type: Function,
			required: false
		},
		maxTagTextLength: {
			type: Number,
			required: false
		},
		maxTagCount: {
			type: [Number, String],
			required: false
		},
		maxTagPlaceholder: {
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
		tokenSeparators: {
			type: Array,
			required: false
		},
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		prefix: {
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
		suffix: {
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
		clearIcon: {
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
		removeIcon: {
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
		animation: {
			type: String,
			required: false
		},
		transitionName: {
			type: String,
			required: false
		},
		popupStyle: {
			type: Object,
			required: false
		},
		popupAlign: {
			type: Object,
			required: false
		},
		builtinPlacements: {
			type: Object,
			required: false
		},
		getPopupContainer: {
			type: Function,
			required: false
		},
		showAction: {
			type: Array,
			required: false
		},
		onBlur: {
			type: Function,
			required: false
		},
		onFocus: {
			type: Function,
			required: false
		},
		onKeyUp: {
			type: Function,
			required: false
		},
		onKeyDown: {
			type: Function,
			required: false
		},
		onMouseDown: {
			type: Function,
			required: false
		},
		onInputKeyDown: {
			type: Function,
			required: false
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
		components: {
			type: Object,
			required: false
		}
	}, defaults),
	emits: [
		"focus",
		"blur",
		"openChange",
		"dropdownVisibleChange",
		"select",
		"treeExpand",
		"treeLoad",
		"change",
		"update:value",
		"deselect",
		"popupScroll",
		"search"
	],
	name: "ATreeSelect",
	inheritAttrs: false
});
const TreeSelectNode = TreeNode;
TreeSelect.TreeNode = TreeNode;
TreeSelect.SHOW_ALL = SHOW_ALL;
TreeSelect.SHOW_PARENT = SHOW_PARENT;
TreeSelect.SHOW_CHILD = SHOW_CHILD;
TreeSelect.install = (app) => {
	app.component(TreeSelect.name, TreeSelect);
	app.component("ATreeSelectOption", TreeSelectNode);
	return app;
};
TreeSelect._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default(TreeSelect, "popupAlign", (props) => omit(props, ["visible"]));
var tree_select_default = TreeSelect;

//#endregion
export { TreeSelectNode, tree_select_default as default };