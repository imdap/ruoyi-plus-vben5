import ResizableTextArea from "./ResizableTextArea.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import omit from "@v-c/util/dist/omit";
import { getAttrStyleAndClass, toPropsRefs } from "@v-c/util/dist/props-util";
import { BaseInput, resolveOnChange, useCount } from "@v-c/input";
import { KeyCodeStr } from "@v-c/util/dist/KeyCode";
//#region src/TextArea.tsx
var TextArea = /* @__PURE__ */ defineComponent((props, { expose, attrs }) => {
	const { count, showCount } = toPropsRefs(props, "count", "showCount");
	const value = shallowRef(props?.value ?? props?.defaultValue ?? "");
	watch(() => props.value, () => {
		value.value = props.value;
	});
	const formatValue = computed(() => value.value === void 0 || value.value === null ? "" : String(value.value));
	const focused = shallowRef(false);
	const compositionRef = shallowRef(false);
	const compositionEndValueRef = shallowRef(null);
	const textareaResized = shallowRef();
	const holderRef = shallowRef();
	const resizableTextAreaRef = shallowRef();
	const getTextArea = () => resizableTextAreaRef.value?.textArea;
	const focus = () => {
		getTextArea().focus();
	};
	expose({
		resizableTextArea: resizableTextAreaRef,
		focus,
		blur: () => {
			getTextArea().blur();
		},
		nativeElement: computed(() => holderRef.value?.nativeElement || getTextArea())
	});
	watch(() => props.disabled, () => {
		const prev = focused.value;
		if (props.disabled && prev) focused.value = !props?.disabled && prev;
	}, {
		immediate: true,
		flush: "post"
	});
	const selection = shallowRef(null);
	watch(selection, () => {
		if (selection.value) getTextArea().setSelectionRange(...selection.value);
	});
	const countConfig = useCount(count, showCount);
	const mergedMax = computed(() => countConfig.value.max ?? props.maxLength);
	const hasMaxLength = computed(() => Number(mergedMax.value) > 0);
	const valueLength = computed(() => countConfig.value.strategy(formatValue.value));
	const isOutOfRange = computed(() => !!mergedMax.value && valueLength.value > mergedMax.value);
	const triggerChange = (e, currentValue) => {
		if (compositionRef.value && !props.changeOnComposing) return;
		if (compositionEndValueRef.value !== null) {
			if (currentValue === compositionEndValueRef.value) return;
			compositionEndValueRef.value = null;
		}
		let cutValue = currentValue;
		if (!compositionRef.value && countConfig.value.exceedFormatter && countConfig.value.max && countConfig.value.strategy(currentValue) > countConfig.value.max) {
			cutValue = countConfig.value.exceedFormatter(currentValue, { max: countConfig.value.max });
			const textarea = getTextArea();
			if (currentValue !== cutValue) selection.value = [textarea.selectionStart || 0, textarea.selectionEnd || 0];
		}
		const textarea = getTextArea();
		if (textarea && textarea.value !== cutValue) textarea.value = cutValue;
		value.value = cutValue;
		resolveOnChange(e.currentTarget, e, props.onChange, cutValue);
	};
	const onInternalCompositionStart = () => {
		compositionRef.value = true;
		compositionEndValueRef.value = null;
	};
	const onInternalCompositionEnd = (e) => {
		compositionRef.value = false;
		const currentValue = e.currentTarget.value;
		if (!props.changeOnComposing && currentValue !== formatValue.value) triggerChange(e, currentValue);
		if (!props.changeOnComposing) compositionEndValueRef.value = currentValue;
	};
	const onInternalChange = (e) => {
		triggerChange(e, e.target.value);
	};
	const handleKeyDown = (e) => {
		const { onPressEnter } = props;
		if (e.key === KeyCodeStr.Enter && onPressEnter && !e.isComposing) onPressEnter(e);
		props?.onKeydown?.(e);
	};
	const handleFocus = (e) => {
		focused.value = true;
		props?.onFocus?.(e);
	};
	const handleBlur = (e) => {
		focused.value = false;
		props?.onBlur?.(e);
	};
	const handleReset = (e) => {
		compositionEndValueRef.value = null;
		value.value = "";
		focus();
		resolveOnChange(getTextArea(), e, props.onChange);
	};
	const handleResize = (size) => {
		props?.onResize?.(size);
		if (getTextArea()?.style.height) textareaResized.value = true;
	};
	return () => {
		const { suffix, classNames, styles, prefixCls = "vc-textarea", allowClear, autoSize, showCount, disabled, hidden, readOnly, onClear, maxLength } = props;
		const { style, restAttrs, className } = getAttrStyleAndClass(attrs);
		let suffixNode = suffix;
		let dataCount;
		if (countConfig.value.show) {
			if (countConfig.value.showFormatter) dataCount = countConfig.value.showFormatter?.({
				value: formatValue.value,
				count: valueLength.value,
				maxLength: mergedMax.value
			});
			else dataCount = `${valueLength.value}${hasMaxLength.value ? ` / ${mergedMax.value}` : ""}`;
			suffixNode = createVNode(Fragment, null, [suffixNode, createVNode("span", {
				"class": clsx(`${prefixCls}-data-count`, classNames?.count),
				"style": styles?.count
			}, [dataCount])]);
		}
		const isPureTextArea = !autoSize && !showCount && !allowClear;
		const textareaProps = {
			onKeydown: handleKeyDown,
			onFocus: handleFocus,
			onBlur: handleBlur,
			onCompositionstart: onInternalCompositionStart,
			onCompositionend: onInternalCompositionEnd
		};
		return createVNode(BaseInput, {
			"ref": holderRef,
			"value": formatValue.value,
			"allowClear": allowClear,
			"handleReset": handleReset,
			"suffix": suffixNode,
			"prefixCls": prefixCls,
			"classNames": {
				...classNames,
				affixWrapper: clsx(classNames?.affixWrapper, {
					[`${prefixCls}-show-count`]: showCount,
					[`${prefixCls}-textarea-allow-clear`]: allowClear
				})
			},
			"disabled": disabled,
			"focused": focused.value,
			"class": clsx(className, isOutOfRange.value && `${prefixCls}-out-of-range`),
			"style": {
				...style,
				...textareaResized.value && !isPureTextArea ? { height: "auto" } : {}
			},
			"dataAttrs": { affixWrapper: { "data-count": typeof dataCount === "string" ? dataCount : void 0 } },
			"hidden": hidden,
			"readOnly": readOnly,
			"onClear": onClear
		}, { default: () => [createVNode(ResizableTextArea, mergeProps(restAttrs, omit(props, [
			"suffix",
			"classNames",
			"styles",
			"prefixCls",
			"allowClear",
			"autoSize",
			"showCount",
			"disabled",
			"hidden",
			"readOnly",
			"onClear",
			"maxLength",
			"onResize",
			"onChange",
			"onKeydown",
			"onPressEnter",
			"onFocus",
			"onBlur",
			"changeOnComposing"
		]), {
			"autoSize": autoSize,
			"maxLength": maxLength,
			"onChange": onInternalChange
		}, textareaProps, {
			"class": clsx(classNames?.textarea),
			"style": {
				resize: style?.resize,
				...styles?.textarea
			},
			"disabled": disabled,
			"value": value.value,
			"prefixCls": prefixCls,
			"onResize": handleResize,
			"ref": resizableTextAreaRef,
			"readOnly": readOnly
		}), null)] });
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
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoSize: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		onPressEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onResize: {
			type: Function,
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
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		suffix: {
			required: false,
			default: void 0
		},
		showCount: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		count: {
			required: false,
			default: void 0
		},
		onClear: {
			type: Function,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		maxLength: {
			type: Number,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onKeydown: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyup: {
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
		changeOnComposing: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, { prefixCls: "vc-textarea" }),
	name: "TextArea",
	inheritAttrs: false
});
//#endregion
export { TextArea as default };
