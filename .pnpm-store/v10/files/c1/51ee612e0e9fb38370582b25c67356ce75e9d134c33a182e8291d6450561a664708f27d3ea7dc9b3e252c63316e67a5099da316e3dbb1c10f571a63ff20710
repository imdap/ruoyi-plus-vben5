import { resolveOnChange } from "./utils/commonUtils.js";
import BaseInput from "./BaseInput.js";
import useCount from "./hooks/useCount.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { toPropsRefs } from "@v-c/util/dist/props-util";
import { triggerFocus } from "@v-c/util/dist/Dom/focus";
import { KeyCodeStr } from "@v-c/util/dist/KeyCode";
import omit from "@v-c/util/dist/omit";
//#region src/input.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var defaults = {
	prefixCls: "vc-input",
	type: "text"
};
var Input = /* @__PURE__ */ defineComponent((props, { slots, expose, attrs }) => {
	const focused = shallowRef(false);
	const compositionRef = shallowRef(false);
	const keyLockRef = shallowRef(false);
	const compositionEndValueRef = shallowRef(null);
	const { count, showCount } = toPropsRefs(props, "count", "showCount");
	const onChange = (e) => {
		props?.onChange?.(e);
	};
	const inputRef = shallowRef();
	const holderRef = shallowRef();
	const focus = (option) => {
		if (inputRef.value) triggerFocus(inputRef.value, option);
	};
	const value = shallowRef(props?.value ?? props?.defaultValue);
	watch(() => props.value, (newValue) => {
		value.value = newValue;
	});
	const formatValue = computed(() => value.value === void 0 || value.value === null ? "" : String(value.value));
	const selection = shallowRef(null);
	watch(selection, (newSelection) => {
		if (newSelection && inputRef.value) inputRef.value.setSelectionRange(...newSelection);
	});
	const countConfig = useCount(count, showCount);
	const mergedMax = computed(() => countConfig?.value?.max || props?.maxLength);
	const valueLength = computed(() => countConfig.value?.strategy?.(formatValue.value) ?? 0);
	const isOutOfRange = computed(() => !!mergedMax.value && valueLength.value > mergedMax.value);
	expose({
		focus,
		blur: () => {
			inputRef.value?.blur?.();
		},
		setSelectionRange: (start, end, direction) => {
			inputRef.value?.setSelectionRange(start, end, direction);
		},
		select: () => {
			inputRef.value?.select();
		},
		input: inputRef,
		nativeElement: computed(() => holderRef.value?.nativeElement || inputRef.value)
	});
	watch(() => props.disabled, () => {
		if (keyLockRef.value) keyLockRef.value = false;
		focused.value = focused.value && props.disabled ? false : focused.value;
	}, { immediate: true });
	const triggerChange = (e, currentValue) => {
		if (compositionRef.value && !props.changeOnComposing) return;
		if (compositionEndValueRef.value !== null) {
			if (currentValue === compositionEndValueRef.value) return;
			compositionEndValueRef.value = null;
		}
		let cutValue = currentValue;
		const config = countConfig.value;
		if (!compositionRef.value && config?.exceedFormatter && config.max && config.strategy(currentValue) > config.max) {
			cutValue = config.exceedFormatter(currentValue, { max: config.max });
			if (currentValue !== cutValue) selection.value = [inputRef.value?.selectionStart || 0, inputRef.value?.selectionEnd || 0];
		}
		if (props.value === void 0) value.value = cutValue;
		if (inputRef.value) resolveOnChange(inputRef.value, e, onChange, cutValue);
	};
	const onInternalChange = (e) => {
		triggerChange(e, e.target.value);
	};
	const onInternalCompositionStart = (e) => {
		compositionRef.value = true;
		compositionEndValueRef.value = null;
		props?.onCompositionStart?.(e);
	};
	const onInternalCompositionEnd = (e) => {
		compositionRef.value = false;
		const currentValue = e.target.value;
		if (!props.changeOnComposing && currentValue !== formatValue.value) triggerChange(e, currentValue);
		if (!props.changeOnComposing) compositionEndValueRef.value = currentValue;
		props?.onCompositionEnd?.(e);
	};
	const handleKeyDown = (e) => {
		if (e.key === KeyCodeStr.Enter && !keyLockRef.value && !e.isComposing) {
			keyLockRef.value = true;
			props.onPressEnter?.(e);
		}
		props?.onKeyDown?.(e);
	};
	const handleKeyUp = (e) => {
		if (e.key === "Enter") keyLockRef.value = false;
		props?.onKeyUp?.(e);
	};
	const handleFocus = (e) => {
		focused.value = true;
		props?.onFocus?.(e);
	};
	const handleBlur = (e) => {
		if (keyLockRef.value) keyLockRef.value = false;
		focused.value = false;
		props?.onBlur?.(e);
	};
	const handleReset = (e) => {
		compositionEndValueRef.value = null;
		if (props.value === void 0) value.value = "";
		focus();
		if (inputRef.value) resolveOnChange(inputRef.value, e, onChange);
	};
	const mergedAllowClear = computed(() => {
		if (!props.allowClear) return props.allowClear;
		const clearIcon = slots.clearIcon?.();
		if (clearIcon) return {
			...typeof props.allowClear === "object" ? props.allowClear : {},
			clearIcon
		};
		return props.allowClear;
	});
	return () => {
		const { autoComplete, prefixCls = defaults.prefixCls, disabled, htmlSize, classNames, styles, suffix, type = defaults.type, classes, readOnly, hidden, dataAttrs, components } = props;
		const { class: className, style, ...restAttrs } = attrs;
		const mergedClassName = className ?? props.class;
		const mergedStyle = style ?? props.style;
		const prefixNode = slots.prefix?.() ?? props.prefix;
		const suffixNode = slots.suffix?.() ?? suffix;
		const addonBefore = slots.addonBefore?.() ?? props.addonBefore;
		const addonAfter = slots.addonAfter?.() ?? props.addonAfter;
		const config = countConfig.value;
		const hasMaxLength = Number(mergedMax.value) > 0;
		let mergedSuffix = suffixNode;
		if (suffixNode || config?.show) {
			const dataCount = config?.showFormatter ? config.showFormatter({
				value: formatValue.value,
				count: valueLength.value,
				maxLength: mergedMax.value
			}) : `${valueLength.value}${hasMaxLength ? ` / ${mergedMax.value}` : ""}`;
			mergedSuffix = createVNode(Fragment, null, [config?.show && createVNode("span", {
				"class": clsx(`${prefixCls}-show-count-suffix`, { [`${prefixCls}-show-count-has-suffix`]: !!suffixNode }, classNames?.count),
				"style": styles?.count
			}, [dataCount]), suffixNode]);
		}
		const inputElement = createVNode("input", mergeProps(restAttrs, omit(props, [
			"prefixCls",
			"onPressEnter",
			"addonBefore",
			"addonAfter",
			"prefix",
			"suffix",
			"allowClear",
			"defaultValue",
			"showCount",
			"count",
			"classes",
			"htmlSize",
			"styles",
			"classNames",
			"onClear",
			"dataAttrs",
			"components",
			"hidden",
			"readOnly",
			"value",
			"type",
			"class",
			"style",
			"onFocus",
			"onBlur",
			"onChange",
			"onKeyDown",
			"onKeyUp",
			"onCompositionStart",
			"onCompositionEnd",
			"onInput",
			"changeOnComposing"
		]), {
			"autocomplete": autoComplete,
			"ref": inputRef,
			"value": formatValue.value,
			"onInput": onInternalChange,
			"onFocus": handleFocus,
			"onBlur": handleBlur,
			"onKeydown": handleKeyDown,
			"onKeyup": handleKeyUp,
			"class": clsx(prefixCls, { [`${prefixCls}-disabled`]: disabled }, classNames?.input),
			"style": styles?.input,
			"size": htmlSize,
			"type": type,
			"maxlength": props.maxLength,
			"onCompositionstart": onInternalCompositionStart,
			"onCompositionend": onInternalCompositionEnd,
			"disabled": disabled,
			"readonly": readOnly
		}), null);
		return createVNode(BaseInput, {
			"ref": holderRef,
			"value": formatValue.value,
			"prefixCls": prefixCls,
			"class": clsx(mergedClassName, isOutOfRange.value && `${prefixCls}-out-of-range`),
			"style": mergedStyle,
			"allowClear": mergedAllowClear.value,
			"handleReset": handleReset,
			"suffix": mergedSuffix,
			"prefix": prefixNode,
			"addonBefore": addonBefore,
			"addonAfter": addonAfter,
			"focused": focused.value,
			"triggerFocus": focus,
			"disabled": disabled,
			"readOnly": readOnly,
			"classNames": classNames,
			"styles": styles,
			"dataAttrs": dataAttrs,
			"components": components,
			"hidden": hidden,
			"onClear": props.onClear,
			"classes": classes
		}, _isSlot(inputElement) ? inputElement : { default: () => [inputElement] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		value: {
			required: false,
			default: void 0
		},
		defaultValue: {
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		type: {
			type: [String, Object],
			required: false,
			default: void 0
		},
		showCount: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		onPressEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		autoComplete: {
			type: String,
			required: false,
			default: void 0
		},
		htmlSize: {
			type: Number,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
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
		count: {
			type: Object,
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
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
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
		onCompositionStart: {
			type: Function,
			required: false,
			default: void 0
		},
		onCompositionEnd: {
			type: Function,
			required: false,
			default: void 0
		},
		changeOnComposing: {
			type: Boolean,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		dataAttrs: {
			type: Object,
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
		addonBefore: {
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
		addonAfter: {
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
		classes: {
			type: Object,
			required: false,
			default: void 0
		},
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		}
	}, defaults),
	name: "Input",
	inheritAttrs: false
});
//#endregion
export { Input as default };
