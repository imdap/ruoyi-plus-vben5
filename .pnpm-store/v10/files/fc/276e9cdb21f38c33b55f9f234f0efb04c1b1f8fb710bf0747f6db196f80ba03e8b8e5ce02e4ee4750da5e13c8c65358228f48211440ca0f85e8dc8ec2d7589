import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useCompactItemContext } from "../space/Compact.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import PurePanel_default from "../_util/PurePanel.js";
import { getMergedStatus, getStatusClassNames } from "../_util/statusUtils.js";
import { DefaultRenderEmpty } from "../config-provider/defaultRenderEmpty.js";
import { useFormItemInputContext } from "../form/context.js";
import { useVariants } from "../form/hooks/useVariant.js";
import mergedBuiltinPlacements_default from "../select/mergedBuiltinPlacements.js";
import style_default from "../select/style/index.js";
import useIcons from "../select/useIcons.js";
import usePopupRender_default from "../select/usePopupRender.js";
import useShowArrow from "../select/useShowArrow.js";
import useBase from "./hooks/useBase.js";
import useCheckable from "./hooks/useCheckable.js";
import useIcons$1 from "./hooks/useIcons.js";
import style_default$1 from "./style/index.js";
import Panel_default from "./Panel.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { getTransitionName } from "@v-c/util/dist/utils/transition";
import { omit } from "es-toolkit";
import VcCascader, { SHOW_CHILD, SHOW_PARENT } from "@v-c/cascader";

//#region src/cascader/index.tsx
function highlightKeyword(str, lowerKeyword, prefixCls) {
	const cells = str.toLowerCase().split(lowerKeyword).reduce((list, cur, index) => index === 0 ? [cur] : [
		...list,
		lowerKeyword,
		cur
	], []);
	const fillCells = [];
	let start = 0;
	cells.forEach((cell, index) => {
		const end = start + cell.length;
		let originWorld = str.slice(start, end);
		start = end;
		if (index % 2 === 1) {
			(function() {
				return originWorld;
			})();
			originWorld = createVNode("span", {
				"class": `${prefixCls}-menu-item-keyword`,
				"key": `separator-${index}`
			}, [originWorld]);
		}
		fillCells.push(originWorld);
	});
	return fillCells;
}
const defaultSearchRender = (inputValue, path, prefixCls, fieldNames) => {
	const optionList = [];
	const lower = inputValue.toLowerCase();
	path.forEach((node, index) => {
		if (index !== 0) optionList.push(" / ");
		let label = node[fieldNames.label];
		const type = typeof label;
		if (type === "string" || type === "number") label = highlightKeyword(String(label), lower, prefixCls);
		optionList.push(label);
	});
	return optionList;
};
const Cascader = /* @__PURE__ */ defineComponent((props, { attrs, emit, slots, expose }) => {
	const { getPopupContainer: getContextPopupContainer, popupOverflow, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, getPrefixCls, expandIcon: contextExpandIcon, loadingIcon: contextLoadingIcon } = useComponentBaseConfig("cascader", props, ["expandIcon", "loadingIcon"]);
	const { prefixCls: customizePrefixCls, direction: propDirection, variant: customizeVariant, bordered, size: customizeSize, disabled: customDisabled, status: customStatus, classes, styles } = toPropsRefs(props, "prefixCls", "direction", "variant", "bordered", "size", "disabled", "status", "classes", "styles");
	const { prefixCls, cascaderPrefixCls, direction: mergedDirection, renderEmpty } = useBase(customizePrefixCls, propDirection);
	const isRtl = computed(() => mergedDirection.value === "rtl");
	const rootPrefixCls = computed(() => getPrefixCls());
	const rootCls = useCSSVarCls_default(prefixCls);
	const cascaderRootCls = useCSSVarCls_default(cascaderPrefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	style_default$1(cascaderPrefixCls, cascaderRootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, mergedDirection);
	const [variant, enableVariantCls] = useVariants("cascader", customizeVariant, computed(() => bordered.value ?? true));
	const mergedSize = useSize((ctx) => customizeSize.value ?? compactSize.value ?? ctx);
	const disabled = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled.value ?? disabled.value);
	const formItemInputContext = useFormItemInputContext();
	const mergedStatus = computed(() => getMergedStatus(formItemInputContext.value?.status, customStatus.value));
	const mergedProps = computed(() => {
		return {
			...props,
			variant: variant.value,
			size: mergedSize.value,
			status: mergedStatus.value,
			disabled: mergedDisabled.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => {
		return { popup: { _default: "root" } };
	}));
	if (isDev) {
		const warning = devUseWarning("Cascader");
		Object.entries({
			popupClassName: "classNames.popup.root",
			dropdownClassName: "classNames.popup.root",
			dropdownStyle: "styles.popup.root",
			dropdownRender: "popupRender",
			dropdownMenuColumnStyle: "popupMenuColumnStyle",
			bordered: "variant"
		}).forEach(([oldProp, newProp]) => {
			warning.deprecated(!(props[oldProp] !== void 0), oldProp, newProp);
		});
		warning(!(props.showArrow !== void 0), "deprecated", "`showArrow` is deprecated which will be removed in next major version. It will be a default behavior, you can hide it by setting `suffixIcon` to null.");
	}
	const mergedPopupStyle = computed(() => {
		const { popupStyle, dropdownStyle } = props;
		return {
			...mergedStyles.value.popup?.root,
			...popupStyle ?? dropdownStyle
		};
	});
	const [zIndex] = useZIndex("SelectLike", computed(() => mergedStyles.value?.popup?.root?.zIndex ?? mergedPopupStyle.value?.zIndex));
	const mergedShowSearch = computed(() => {
		if (!props.showSearch) return props.showSearch;
		let searchConfig = {
			render: defaultSearchRender,
			onSearch: (...args) => {
				emit("search", ...args);
			}
		};
		if (typeof props.showSearch === "object") {
			const { onSearch } = props.showSearch;
			searchConfig = {
				...searchConfig,
				...props.showSearch,
				onSearch: (...args) => {
					emit("search", ...args);
					onSearch?.(...args);
				}
			};
		}
		return searchConfig;
	});
	const memoPlacement = computed(() => {
		if (props.placement !== void 0) return props.placement;
		return isRtl.value ? "bottomRight" : "bottomLeft";
	});
	const onPopupVisibleChange = (open) => {
		emit("openChange", open);
		emit("dropdownVisibleChange", open);
		emit("popupVisibleChange", open);
	};
	const cascaderRef = shallowRef();
	expose({
		focus: () => cascaderRef.value?.focus?.(),
		blur: () => cascaderRef.value?.blur?.()
	});
	return () => {
		const { popupClassName, dropdownClassName, rootClass, dropdownRender, popupRender, dropdownMenuColumnStyle, popupMenuColumnStyle, showArrow, allowClear, expandIcon, transitionName, choiceTransitionName, builtinPlacements, getPopupContainer, displayRender, optionRender, multiple, prefixCls: _prefixCls, direction: _direction, size: _size, disabled: _disabled, status: _status, bordered: _bordered, variant: _variant, classes: _classes, styles: _styles, ...rest } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const mergedSuffixIcon = getSlotPropsFnRun(slots, props, "suffixIcon", false);
		const showSuffixIcon = useShowArrow(mergedSuffixIcon, showArrow);
		const { hasFeedback, isFormItemInput, feedbackIcon } = formItemInputContext.value || {};
		const { suffixIcon, removeIcon, clearIcon } = useIcons({
			...rest,
			multiple,
			hasFeedback,
			feedbackIcon,
			showSuffixIcon,
			suffixIcon: mergedSuffixIcon,
			prefixCls: prefixCls.value,
			componentName: "Cascader"
		});
		const mergedAllowClear = (allowClear ?? true) === true ? { clearIcon } : allowClear;
		const mergedPopupRender = usePopupRender_default((slots.popupRender ?? popupRender) || dropdownRender);
		const mergedPopupMenuColumnStyle = popupMenuColumnStyle ?? dropdownMenuColumnStyle;
		const customExpandIcon = getSlotPropsFnRun(slots, props, "expandIcon", false) ?? expandIcon;
		const { expandIcon: mergedExpandIcon, loadingIcon: mergedLoadingIcon } = useIcons$1({
			contextExpandIcon: contextExpandIcon.value,
			contextLoadingIcon: contextLoadingIcon.value,
			expandIcon: customExpandIcon,
			loadingIcon: void 0,
			isRtl: isRtl.value
		});
		const checkable = useCheckable(cascaderPrefixCls.value, multiple);
		const slotNotFound = getSlotPropsFnRun(slots, props, "notFoundContent", false);
		let mergedNotFoundContent = slotNotFound;
		if (slotNotFound === void 0) mergedNotFoundContent = renderEmpty.value?.("Cascader") || createVNode(DefaultRenderEmpty, { "componentName": "Cascader" }, null);
		const mergedDisplayRender = slots.displayRender ? (labels, selectedOptions) => slots.displayRender?.({
			labels,
			selectedOptions
		}) : displayRender;
		const mergedOptionRender = slots.optionRender ? (option) => slots.optionRender?.(option) : optionRender;
		const mergedPopupClassName = clsx(popupClassName || dropdownClassName, `${cascaderPrefixCls.value}-dropdown`, { [`${cascaderPrefixCls.value}-dropdown-rtl`]: isRtl.value }, rootClass, mergedClassNames.value?.popup?.root, cssVarCls.value, rootCls.value, cascaderRootCls.value, hashId.value);
		const mergedClassName = clsx(!customizePrefixCls.value && cascaderPrefixCls.value, {
			[`${prefixCls.value}-lg`]: mergedSize.value === "large",
			[`${prefixCls.value}-sm`]: mergedSize.value === "small",
			[`${prefixCls.value}-rtl`]: isRtl.value,
			[`${prefixCls.value}-${variant.value}`]: enableVariantCls.value,
			[`${prefixCls.value}-in-form-item`]: isFormItemInput
		}, getStatusClassNames(prefixCls.value, mergedStatus.value, hasFeedback), compactItemClassnames.value, contextClassName.value, rootClass, mergedClassNames.value?.root, rootCls.value, cascaderRootCls.value, hashId.value, cssVarCls.value, className);
		return createVNode(VcCascader, mergeProps(restAttrs, omit(rest, ["suffixIcon"]), {
			"ref": cascaderRef,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"prefixCls": prefixCls.value,
			"popupPrefixCls": customizePrefixCls.value || cascaderPrefixCls.value,
			"className": mergedClassName,
			"style": {
				...mergedStyles.value.root,
				...contextStyle.value,
				...style
			},
			"popupClassName": mergedPopupClassName,
			"popupStyle": {
				...mergedPopupStyle.value,
				zIndex: zIndex.value
			},
			"popupMenuColumnStyle": mergedPopupMenuColumnStyle,
			"placement": memoPlacement.value,
			"direction": mergedDirection.value,
			"builtinPlacements": mergedBuiltinPlacements_default(builtinPlacements, popupOverflow.value),
			"allowClear": mergedAllowClear,
			"showSearch": mergedShowSearch.value,
			"notFoundContent": mergedNotFoundContent,
			"expandIcon": mergedExpandIcon,
			"loadingIcon": mergedLoadingIcon,
			"checkable": checkable,
			"suffixIcon": suffixIcon,
			"removeIcon": removeIcon,
			"getPopupContainer": getPopupContainer || getContextPopupContainer,
			"popupRender": mergedPopupRender,
			"transitionName": getTransitionName(rootPrefixCls.value, "slide-up", transitionName),
			"choiceTransitionName": getTransitionName(rootPrefixCls.value, "", choiceTransitionName),
			"displayRender": mergedDisplayRender,
			"optionRender": mergedOptionRender,
			"disabled": mergedDisabled.value,
			"onPopupVisibleChange": onPopupVisibleChange,
			"onChange": (value, selectOptions) => {
				emit("change", value, selectOptions);
				emit("update:value", value);
			}
		}), { default: slots?.default });
	};
}, {
	props: {
		value: { required: false },
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		showArrow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
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
		options: {
			type: Array,
			required: false
		},
		status: {
			type: String,
			required: false
		},
		rootClass: {
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
		dropdownStyle: {
			type: Object,
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
		dropdownMenuColumnStyle: {
			type: Object,
			required: false
		},
		popupMenuColumnStyle: {
			type: Object,
			required: false
		},
		variant: {
			type: String,
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
		defaultValue: { required: false },
		id: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		fieldNames: {
			type: Object,
			required: false
		},
		optionRender: {
			type: Function,
			required: false
		},
		changeOnSelect: {
			type: Boolean,
			required: false,
			default: void 0
		},
		displayRender: {
			type: Function,
			required: false
		},
		showCheckedStrategy: { required: false },
		autoClearSearchValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showSearch: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		searchValue: {
			type: String,
			required: false
		},
		expandTrigger: {
			type: String,
			required: false
		},
		popupPrefixCls: {
			type: String,
			required: false
		},
		loadData: {
			type: Function,
			required: false
		},
		builtinPlacements: { required: false },
		expandIcon: { required: false },
		loadingIcon: { required: false },
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
		maxCount: {
			type: Number,
			required: false
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
		getInputElement: {
			type: Function,
			required: false
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
		popupMatchSelectWidth: {
			type: [Boolean, Number],
			required: false,
			default: void 0
		},
		popupAlign: {
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
		onPopupScroll: {
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
	},
	emits: [
		"openChange",
		"dropdownVisibleChange",
		"popupVisibleChange",
		"change",
		"update:value",
		"search"
	],
	name: "ACascader",
	inheritAttrs: false
});
Cascader.Panel = Panel_default;
Cascader.SHOW_PARENT = SHOW_PARENT;
Cascader.SHOW_CHILD = SHOW_CHILD;
Cascader.install = (app) => {
	app.component(Cascader.name, Cascader);
	app.component(Panel_default.name, Panel_default);
};
Cascader._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default(Cascader, "popupAlign", (props) => omit(props, ["visible"]));
var cascader_default = Cascader;

//#endregion
export { Panel_default as CascaderPanel, SHOW_CHILD, SHOW_PARENT, cascader_default as default };