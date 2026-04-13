import useBaseProps from "../hooks/useBaseProps.js";
import { isValidateOpenKey } from "../utils/keyUtil.js";
import Affix_default from "./Affix.js";
import { useSelectInputProvider } from "./context.js";
import Content_default from "./Content/index.js";
import { cloneVNode, computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import KeyCode from "@v-c/util/dist/KeyCode";
import omit from "@v-c/util/dist/omit";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
var DEFAULT_OMIT_PROPS = [
	"value",
	"onChange",
	"removeIcon",
	"placeholder",
	"maxTagCount",
	"maxTagTextLength",
	"maxTagPlaceholder",
	"choiceTransitionName",
	"onInputKeyDown",
	"onPopupScroll",
	"tabIndex",
	"activeValue",
	"onSelectorRemove",
	"focused"
];
function mergeVNodeProps(originProps, nextProps) {
	const mergedProps = {
		...originProps,
		...nextProps
	};
	Object.keys(originProps).forEach((key) => {
		const originVal = originProps[key];
		const nextVal = nextProps[key];
		if (typeof originVal === "function" && typeof nextVal === "function") mergedProps[key] = (...args) => {
			nextVal(...args);
			originVal(...args);
		};
	});
	return mergedProps;
}
var SelectInput_default = /* @__PURE__ */ defineComponent((props, { attrs, expose, slots }) => {
	const baseProps = useBaseProps();
	const rootRef = shallowRef();
	const inputRef = shallowRef();
	const prefixCls = computed(() => props.prefixCls);
	const className = computed(() => props.className);
	const style = computed(() => props.style);
	const prefix = computed(() => props.prefix);
	const suffix = computed(() => props.suffix);
	const clearIcon = computed(() => props.clearIcon);
	const multiple = computed(() => props.multiple);
	const mode = computed(() => props.mode);
	const onClearMouseDown = computed(() => props.onClearMouseDown);
	const onInputKeyDown = computed(() => props.onInputKeyDown);
	const components = computed(() => props.components);
	const triggerOpen = computed(() => baseProps.value?.triggerOpen ?? false);
	const toggleOpen = computed(() => baseProps.value?.toggleOpen);
	const showSearch = computed(() => baseProps.value?.showSearch ?? false);
	const disabled = computed(() => baseProps.value?.disabled ?? false);
	const loading = computed(() => baseProps.value?.loading ?? false);
	const classNamesConfig = computed(() => baseProps.value?.classNames);
	const stylesConfig = computed(() => baseProps.value?.styles);
	const onInternalInputKeyDown = (event) => {
		const { keyCode } = event;
		const isTextAreaElement = inputRef.value?.input instanceof HTMLTextAreaElement;
		if (!isTextAreaElement && triggerOpen.value && (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN)) event.preventDefault();
		if (onInputKeyDown.value) onInputKeyDown.value(event);
		if (isTextAreaElement && !triggerOpen.value && [
			KeyCode.UP,
			KeyCode.DOWN,
			KeyCode.LEFT,
			KeyCode.RIGHT
		].includes(keyCode)) return;
		if (!(event.ctrlKey || event.altKey || event.metaKey) && isValidateOpenKey(keyCode)) toggleOpen.value?.(true);
	};
	expose({
		focus: (options) => {
			(inputRef.value?.input || rootRef.value)?.focus?.(options);
		},
		blur: () => {
			(inputRef.value?.input || rootRef.value)?.blur?.();
		},
		nativeElement: computed(() => getDOM(rootRef.value))
	});
	const onInternalMouseDown = (event) => {
		if (!disabled.value) {
			const inputDOM = getDOM(inputRef.value?.input);
			event._ori_target = inputDOM;
			const isClickOnInput = inputDOM === event.target || inputDOM?.contains(event.target);
			if (inputDOM && !isClickOnInput) event.preventDefault();
			const shouldPreventCloseOnSingle = triggerOpen.value && !multiple.value && (mode.value === "combobox" || showSearch.value);
			const shouldPreventCloseOnMultipleInput = triggerOpen.value && multiple.value && isClickOnInput;
			const shouldPreventClose = shouldPreventCloseOnSingle || shouldPreventCloseOnMultipleInput;
			if (!event._select_lazy) {
				inputRef.value?.input?.focus();
				if (!shouldPreventClose) toggleOpen.value?.();
			} else if (triggerOpen.value) toggleOpen.value?.(false);
		}
		props?.onMouseDown?.(event);
	};
	useSelectInputProvider(computed(() => ({
		...props,
		onInputKeyDown: onInternalInputKeyDown
	})));
	return () => {
		const RootComponent = components.value?.root;
		const domProps = omit({
			...attrs,
			onFocus: props.onFocus,
			onBlur: props.onBlur,
			onFocusin: props.onFocus,
			onFocusout: props.onBlur,
			onKeydown: props.onKeyDown,
			onKeyup: props.onKeyUp,
			onMousedown: props.onMouseDown
		}, DEFAULT_OMIT_PROPS);
		if (RootComponent) {
			const mergedProps = mergeVNodeProps(RootComponent.props || {}, domProps);
			if (isVNode(RootComponent)) return cloneVNode(RootComponent, {
				...mergedProps,
				ref: rootRef
			});
			return createVNode(RootComponent, mergeProps(mergedProps, { "ref": rootRef }), null);
		}
		return createVNode("div", mergeProps(domProps, {
			"ref": rootRef,
			"class": className.value,
			"style": style.value,
			"onMousedown": onInternalMouseDown,
			"onKeydown": props.onKeyDown,
			"onKeyup": props.onKeyUp,
			"onFocusin": props.onFocus,
			"onFocusout": props.onBlur
		}), [
			createVNode(Affix_default, {
				"class": clsx(`${prefixCls.value}-prefix`, classNamesConfig.value?.prefix),
				"style": stylesConfig.value?.prefix
			}, { default: () => [prefix.value] }),
			createVNode(Content_default, { "ref": inputRef }, null),
			createVNode(Affix_default, {
				"class": clsx(`${prefixCls.value}-suffix`, { [`${prefixCls.value}-suffix-loading`]: loading.value }, classNamesConfig.value?.suffix),
				"style": stylesConfig.value?.suffix
			}, { default: () => [suffix.value] }),
			clearIcon.value && createVNode(Affix_default, {
				"class": clsx(`${prefixCls.value}-clear`, classNamesConfig.value?.clear),
				"style": stylesConfig.value?.clear,
				"onMousedown": (e) => {
					e._select_lazy = true;
					onClearMouseDown.value?.(e);
				}
			}, { default: () => [clearIcon.value] }),
			slots.default?.()
		]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
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
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		displayValues: {
			type: Array,
			required: true,
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
		searchValue: {
			type: String,
			required: false,
			default: void 0
		},
		activeValue: {
			type: String,
			required: false,
			default: void 0
		},
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		autoClearSearchValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onSearch: {
			type: Function,
			required: false,
			default: void 0
		},
		onSearchSubmit: {
			type: Function,
			required: false,
			default: void 0
		},
		onInputBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		onClearMouseDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onInputKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onSelectorRemove: {
			type: Function,
			required: false,
			default: void 0
		},
		maxLength: {
			type: Number,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tokenWithEnter: {
			type: Boolean,
			required: false,
			default: void 0
		},
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
		focused: {
			type: Boolean,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: true,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyUp: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseDown: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "SelectInput",
	inheritAttrs: false
});
export { SelectInput_default as default };
