import { useBaseSelectProvider } from "../hooks/useBaseProps.js";
import { getSeparatedContent, isValidCount } from "../utils/valueUtil.js";
import { useAllowClear } from "../hooks/useAllowClear.js";
import useComponents from "../hooks/useComponents.js";
import useLock from "../hooks/useLock.js";
import useOpen, { macroTask } from "../hooks/useOpen.js";
import useSelectTriggerControl, { isInside } from "../hooks/useSelectTriggerControl.js";
import "../hooks/index.js";
import SelectInput_default from "../SelectInput/index.js";
import SelectTrigger_default from "../SelectTrigger.js";
import Polite_default from "./Polite.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { KeyCodeStr } from "@v-c/util/dist/KeyCode";
import omit from "@v-c/util/dist/omit";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const isMultiple = (mode) => mode === "tags" || mode === "multiple";
var omitKeys = [
	"id",
	"prefixCls",
	"className",
	"styles",
	"classNames",
	"showSearch",
	"tagRender",
	"showScrollBar",
	"direction",
	"omitDomProps",
	"displayValues",
	"onDisplayValuesChange",
	"emptyOptions",
	"notFoundContent",
	"onClear",
	"maxCount",
	"placeholder",
	"mode",
	"disabled",
	"loading",
	"getInputElement",
	"getRawInputElement",
	"open",
	"defaultOpen",
	"onPopupVisibleChange",
	"activeValue",
	"onActiveValueChange",
	"activeDescendantId",
	"searchValue",
	"autoClearSearchValue",
	"onSearch",
	"onSearchSplit",
	"tokenSeparators",
	"allowClear",
	"prefix",
	"suffix",
	"suffixIcon",
	"clearIcon",
	"OptionList",
	"animation",
	"transitionName",
	"popupStyle",
	"popupClassName",
	"popupMatchSelectWidth",
	"popupRender",
	"popupAlign",
	"placement",
	"builtinPlacements",
	"getPopupContainer",
	"showAction",
	"onFocus",
	"onBlur",
	"onKeyUp",
	"onKeyDown",
	"onMouseDown",
	"components"
];
const BaseSelect = /* @__PURE__ */ defineComponent((props, { expose, attrs }) => {
	const mode = computed(() => props.mode);
	const getInputElement = computed(() => props.getInputElement);
	const getRawInputElement = computed(() => props.getRawInputElement);
	const components = computed(() => props.components);
	const searchValue = computed(() => props.searchValue);
	const displayValues = computed(() => props.displayValues);
	const open = computed(() => props.open);
	const tokenSeparators = computed(() => props.tokenSeparators);
	const disabled = computed(() => props.disabled);
	const multiple = computed(() => isMultiple(mode.value));
	const containerRef = shallowRef();
	const triggerRef = shallowRef();
	const listRef = shallowRef();
	const focused = shallowRef(false);
	expose({
		focus: (...args) => containerRef.value?.focus?.(...args),
		blur: () => containerRef.value?.blur?.(),
		scrollTo: (arg) => listRef.value?.scrollTo(arg),
		nativeElement: computed(() => getDOM(containerRef))
	});
	const mergedComponents = useComponents(components, getInputElement, getRawInputElement);
	const mergedSearchValue = computed(() => {
		if (mode.value !== "combobox") return searchValue.value;
		const val = displayValues.value?.[0]?.value;
		return typeof val === "string" || typeof val === "number" ? String(val) : "";
	});
	const mergedNotFoundContent = computed(() => {
		return props.notFoundContent ?? "Not Found";
	});
	const emptyListContent = computed(() => !props?.notFoundContent && props.emptyOptions);
	const [rawOpen, mergedOpen, triggerOpen, lockOptions] = useOpen(props?.defaultOpen || false, open, (openVal) => {
		props.onPopupVisibleChange?.(openVal);
	}, (nextOpen) => {
		return props.disabled || emptyListContent.value ? false : nextOpen;
	});
	const tokenWithEnter = computed(() => {
		return (tokenSeparators.value || []).some((tokenSeparator) => ["\n", "\r\n"].includes(tokenSeparator));
	});
	const onInternalSearch = (searchText, fromTyping, isCompositing) => {
		const { maxCount } = props;
		if (multiple.value && isValidCount(maxCount) && displayValues.value.length >= maxCount) return;
		let ret = true;
		let newSearchText = searchText;
		props?.onActiveValueChange?.(null);
		const separatedList = getSeparatedContent(searchText, tokenSeparators.value, isValidCount(maxCount) ? maxCount - displayValues.value.length : void 0);
		const patchLabels = isCompositing ? null : separatedList;
		if (mode.value !== "combobox" && patchLabels) {
			newSearchText = "";
			props?.onSearchSplit?.(patchLabels);
			triggerOpen(false);
			ret = false;
		}
		if (props.onSearch && mergedSearchValue.value !== newSearchText) props?.onSearch?.(newSearchText, { source: fromTyping ? "typing" : "effect" });
		if (searchText && fromTyping && ret) triggerOpen(true);
		return ret;
	};
	const onInternalSearchSubmit = (searchText) => {
		if (!searchText || !searchText.trim()) return;
		props?.onSearch?.(searchText, { source: "submit" });
	};
	watch(rawOpen, () => {
		if (!rawOpen.value && !multiple.value && mode.value !== "combobox") onInternalSearch("", false, false);
	}, { immediate: true });
	watch([disabled, mergedOpen], () => {
		if (disabled.value) {
			triggerOpen(false);
			focused.value = false;
		}
	}, { immediate: true });
	const [getClearLock, setClearLock] = useLock();
	const keyLockRef = shallowRef(false);
	const onInternalKeyDown = (event) => {
		const clearLock = getClearLock();
		const { key } = event;
		const isEnterKey = key === KeyCodeStr.Enter;
		const isSpaceKey = key === KeyCodeStr.Space;
		if (isEnterKey || isSpaceKey) {
			const isCombobox = mode.value === "combobox";
			const isEditable = isCombobox || !!props.showSearch;
			if (isSpaceKey && !isEditable || isEnterKey && !isCombobox) event.preventDefault();
			if (!mergedOpen.value) triggerOpen(true);
		}
		setClearLock(!!mergedSearchValue.value);
		if (key === KeyCodeStr.Backspace && !clearLock && multiple.value && !mergedSearchValue.value && displayValues.value.length) {
			const cloneDisplayValues = [...displayValues.value];
			let removedDisplayValue = null;
			for (let i = cloneDisplayValues.length - 1; i >= 0; i -= 1) {
				const current = cloneDisplayValues[i];
				if (!current.disabled) {
					cloneDisplayValues.splice(i, 1);
					removedDisplayValue = current;
					break;
				}
			}
			if (removedDisplayValue) props?.onDisplayValuesChange(cloneDisplayValues, {
				type: "remove",
				values: [removedDisplayValue]
			});
		}
		if (mergedOpen.value && (!isEnterKey || !keyLockRef.value) && !isSpaceKey) {
			if (isEnterKey) keyLockRef.value = true;
			listRef.value?.onKeyDown?.(event);
		}
		props?.onKeyDown?.(event);
	};
	const onInternalKeyUp = (event) => {
		if (mergedOpen.value) listRef.value?.onKeyUp?.(event);
		if (event.key === KeyCodeStr.Enter) keyLockRef.value = false;
		props?.onKeyUp?.(event);
	};
	const onSelectorRemove = (val) => {
		const newValues = displayValues.value.filter((i) => i !== val);
		props?.onDisplayValuesChange(newValues, {
			type: "remove",
			values: [val]
		});
	};
	const onInputBlur = () => {
		keyLockRef.value = false;
	};
	const getSelectElements = () => [getDOM(containerRef), triggerRef.value?.getPopupElement?.()];
	useSelectTriggerControl(getSelectElements, mergedOpen, triggerOpen, computed(() => !!mergedComponents.value.root));
	const internalMouseDownRef = shallowRef(false);
	const onInternalFocus = (event) => {
		focused.value = true;
		if (!disabled.value) {
			if (props.showAction?.includes?.("focus")) triggerOpen(true);
			props?.onFocus?.(event);
		}
	};
	const onRootBlur = () => {
		if (mergedOpen.value && !internalMouseDownRef.value) triggerOpen(false, { cancelFun: () => isInside(getSelectElements(), document.activeElement) });
	};
	const onInternalBlur = (event) => {
		focused.value = false;
		if (mergedSearchValue.value) {
			if (mode.value === "tags") props?.onSearch?.(mergedSearchValue.value, { source: "submit" });
			else if (mode.value === "multiple") props?.onSearch?.("", { source: "blur" });
		}
		onRootBlur();
		if (!disabled.value) props?.onBlur?.(event);
	};
	const onInternalMouseDown = (event) => {
		const { target } = event;
		if ((triggerRef?.value?.getPopupElement?.())?.contains?.(target) && triggerOpen) triggerOpen(true);
		props?.onMouseDown?.(event);
		internalMouseDownRef.value = true;
		macroTask(() => {
			internalMouseDownRef.value = false;
		});
	};
	const forceState = shallowRef({});
	function onPopupMouseEnter() {
		forceState.value = {};
	}
	useBaseSelectProvider(computed(() => {
		return {
			...props,
			notFoundContent: mergedNotFoundContent.value,
			open: mergedOpen.value,
			triggerOpen: mergedOpen.value,
			toggleOpen: triggerOpen,
			multiple: multiple.value,
			lockOptions: lockOptions.value,
			rawOpen: rawOpen.value
		};
	}));
	const onClearMouseDown = () => {
		props?.onClear?.();
		containerRef.value?.focus?.();
		props?.onDisplayValuesChange([], {
			type: "clear",
			values: displayValues.value
		});
		onInternalSearch("", false, false);
	};
	const allowClearConfig = useAllowClear(computed(() => props.prefixCls), displayValues, computed(() => props.allowClear ?? false), computed(() => props.clearIcon), computed(() => disabled.value ?? false), mergedSearchValue, mode);
	return () => {
		const { OptionList, prefixCls, className, loading, showSearch, prefix, placeholder, activeValue, animation, transitionName, popupStyle, popupClassName, direction, popupMatchSelectWidth, popupRender, popupAlign, placement, builtinPlacements, getPopupContainer, emptyOptions } = props;
		const mergedAllowClear = allowClearConfig.value.allowClear;
		const clearNode = allowClearConfig.value.clearIcon;
		const customizeInputElement = mode.value === "combobox" && typeof getInputElement.value === "function" && getInputElement.value() || null;
		let onTriggerVisibleChange = null;
		if (mergedComponents.value?.root) onTriggerVisibleChange = (newOpen) => {
			triggerOpen(newOpen);
		};
		const mergedSuffixIconFn = () => {
			const nextSuffix = props.suffix ?? props?.suffixIcon;
			if (typeof nextSuffix === "function") return nextSuffix?.({
				searchValue: mergedSearchValue.value,
				open: mergedOpen.value,
				focused: focused.value,
				showSearch: props.showSearch,
				loading: props.loading
			});
			return nextSuffix;
		};
		const mergedSuffixIcon = mergedSuffixIconFn();
		const optionList = createVNode(OptionList, { "ref": listRef }, null);
		const mergedClassName = clsx(prefixCls, className, {
			[`${prefixCls}-focused`]: focused.value,
			[`${prefixCls}-multiple`]: multiple.value,
			[`${prefixCls}-single`]: !multiple.value,
			[`${prefixCls}-allow-clear`]: mergedAllowClear,
			[`${prefixCls}-show-arrow`]: mergedSuffixIcon !== void 0 && mergedSuffixIcon !== null,
			[`${prefixCls}-disabled`]: disabled.value,
			[`${prefixCls}-loading`]: loading,
			[`${prefixCls}-open`]: mergedOpen.value,
			[`${prefixCls}-customize-input`]: customizeInputElement,
			[`${prefixCls}-show-search`]: showSearch
		});
		let renderNode = createVNode(SelectInput_default, mergeProps(attrs, omit(props, omitKeys), {
			"ref": containerRef,
			"prefixCls": prefixCls,
			"className": mergedClassName,
			"focused": focused.value,
			"prefix": prefix,
			"suffix": mergedSuffixIcon,
			"clearIcon": clearNode,
			"multiple": multiple.value,
			"mode": mode.value,
			"displayValues": displayValues.value,
			"placeholder": placeholder,
			"searchValue": mergedSearchValue.value,
			"activeValue": activeValue,
			"onSearch": onInternalSearch,
			"onSearchSubmit": onInternalSearchSubmit,
			"onInputBlur": onInputBlur,
			"onFocus": onInternalFocus,
			"onBlur": onInternalBlur,
			"onClearMouseDown": onClearMouseDown,
			"onKeyDown": onInternalKeyDown,
			"onKeyUp": onInternalKeyUp,
			"onSelectorRemove": onSelectorRemove,
			"tokenWithEnter": tokenWithEnter.value,
			"onMouseDown": onInternalMouseDown,
			"components": mergedComponents.value
		}), null);
		const _renderNode = function() {
			return renderNode;
		}();
		renderNode = createVNode(SelectTrigger_default, {
			"ref": triggerRef,
			"disabled": disabled.value ?? false,
			"prefixCls": prefixCls,
			"visible": mergedOpen.value,
			"popupElement": optionList,
			"animation": animation,
			"transitionName": transitionName,
			"popupStyle": popupStyle,
			"popupClassName": popupClassName,
			"direction": direction,
			"popupMatchSelectWidth": popupMatchSelectWidth,
			"popupRender": popupRender,
			"popupAlign": popupAlign,
			"placement": placement,
			"builtinPlacements": builtinPlacements,
			"getPopupContainer": getPopupContainer,
			"empty": emptyOptions,
			"onPopupVisibleChange": onTriggerVisibleChange,
			"onPopupMouseEnter": onPopupMouseEnter,
			"onPopupMouseDown": onInternalMouseDown,
			"onPopupBlur": onRootBlur
		}, _isSlot(renderNode) ? renderNode : { default: () => [_renderNode] });
		return createVNode(Fragment, null, [createVNode(Polite_default, {
			"visible": focused.value && !mergedOpen.value,
			"values": displayValues.value
		}, null), renderNode]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		showSearch: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tagRender: {
			type: Function,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
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
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false,
			default: void 0
		},
		tabIndex: {
			type: Number,
			required: false,
			default: void 0
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
			required: false,
			default: void 0
		},
		maxLength: {
			type: Number,
			required: false,
			default: void 0
		},
		showScrollBar: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		choiceTransitionName: {
			type: String,
			required: false,
			default: void 0
		},
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
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
		onPopupVisibleChange: {
			type: Function,
			required: false,
			default: void 0
		},
		getInputElement: {
			type: Function,
			required: false,
			default: void 0
		},
		getRawInputElement: {
			type: Function,
			required: false,
			default: void 0
		},
		maxTagTextLength: {
			type: Number,
			required: false,
			default: void 0
		},
		maxTagCount: {
			type: [Number, String],
			required: false,
			default: void 0
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
		suffixIcon: {
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
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false,
			default: void 0
		},
		popupStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		popupClassName: {
			type: String,
			required: false,
			default: void 0
		},
		popupMatchSelectWidth: {
			type: [Boolean, Number],
			required: false,
			default: void 0
		},
		popupRender: {
			type: Function,
			required: false,
			default: void 0
		},
		popupAlign: {
			type: Object,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		builtinPlacements: {
			type: Object,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false,
			default: void 0
		},
		showAction: {
			type: Array,
			required: false,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyUp: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onPopupScroll: {
			type: Function,
			required: false,
			default: void 0
		},
		onInputKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseLeave: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: true,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		omitDomProps: {
			type: Array,
			required: false,
			default: void 0
		},
		displayValues: {
			type: Array,
			required: true,
			default: void 0
		},
		onDisplayValuesChange: {
			type: Function,
			required: true,
			default: void 0
		},
		activeValue: {
			type: String,
			required: false,
			default: void 0
		},
		activeDescendantId: {
			type: String,
			required: false,
			default: void 0
		},
		onActiveValueChange: {
			type: Function,
			required: false,
			default: void 0
		},
		searchValue: {
			type: String,
			required: true,
			default: void 0
		},
		autoClearSearchValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onSearch: {
			type: Function,
			required: true,
			default: void 0
		},
		onSearchSplit: {
			type: Function,
			required: false,
			default: void 0
		},
		OptionList: {
			required: true,
			default: void 0
		},
		emptyOptions: {
			type: Boolean,
			required: true,
			default: void 0
		}
	}, {
		showScrollBar: "optional",
		notFoundContent: "Not Found",
		showAction: []
	}),
	name: "BaseSelect",
	inheritAttrs: false
});
export { BaseSelect, isMultiple };
