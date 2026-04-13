import { usePickerContext } from "../context.js";
import { leftPad } from "../../utils/miscUtil.js";
import { getMaskRange, raf } from "./util.js";
import useLockEffect from "../hooks/useLockEffect.js";
import Icon_default from "./Icon.js";
import MaskFormat from "./MaskFormat.js";
import { computed, createVNode, defineComponent, mergeProps, onBeforeUnmount, ref, toRef, watch } from "vue";
import { clsx } from "@v-c/util";
var Input_default = /* @__PURE__ */ defineComponent((props, { attrs, expose }) => {
	const pickerCtx = usePickerContext();
	const prefixCls = computed(() => pickerCtx.value.prefixCls);
	const classNames = computed(() => pickerCtx.value.classNames);
	const styles = computed(() => pickerCtx.value.styles);
	const inputPrefixCls = computed(() => `${prefixCls.value}-input`);
	const focused = ref(false);
	const internalInputValue = ref(props.value);
	const focusCellText = ref("");
	const focusCellIndex = ref(null);
	const forceSelectionSyncMark = ref(null);
	const inputValue = computed(() => internalInputValue.value || "");
	watch(() => props.value, (val) => {
		internalInputValue.value = val;
	});
	const holderRef = ref();
	const inputRef = ref();
	expose({
		get nativeElement() {
			return holderRef.value;
		},
		get inputElement() {
			return inputRef.value;
		},
		focus: (options) => {
			inputRef.value?.focus(options);
		},
		blur: () => {
			inputRef.value?.blur();
		}
	});
	const maskFormat = computed(() => new MaskFormat(props.format || ""));
	const selectionRange = computed(() => {
		if (props.helped) return [0, 0];
		return maskFormat.value.getSelection(focusCellIndex.value);
	});
	const selectionStart = computed(() => selectionRange.value[0]);
	const selectionEnd = computed(() => selectionRange.value[1]);
	const onModify = (text) => {
		if (text && text !== props.format && text !== props.value) props?.onHelp?.();
	};
	const triggerInputChange = (text) => {
		if (props.validateFormat?.(text)) props?.onChange?.(text);
		internalInputValue.value = text;
		onModify(text);
	};
	const onInternalChange = (event) => {
		const target = event.target;
		if (!props.format) {
			const text = target.value;
			onModify(text);
			internalInputValue.value = text;
			props?.onChange?.(text);
		}
	};
	const onFormatPaste = (event) => {
		const pasteText = event.clipboardData?.getData("text") || "";
		if (props?.validateFormat?.(pasteText)) triggerInputChange(pasteText);
	};
	const mouseDownRef = ref(false);
	const onFormatMouseDown = () => {
		mouseDownRef.value = true;
	};
	const onFormatMouseUp = (event) => {
		const { selectionStart: start } = event.target;
		focusCellIndex.value = maskFormat.value.getMaskCellIndex(start);
		forceSelectionSyncMark.value = {};
		props.onMouseUp?.(event);
		mouseDownRef.value = false;
	};
	const onFormatFocus = (event) => {
		focused.value = true;
		focusCellIndex.value = 0;
		focusCellText.value = "";
		props.onFocus?.(event);
	};
	const onSharedBlur = (event) => {
		props.onBlur?.(event);
	};
	const onFormatBlur = (event) => {
		focused.value = false;
		onSharedBlur(event);
	};
	useLockEffect(toRef(props, "active"), () => {
		if (!props.active && !props.preserveInvalidOnBlur) internalInputValue.value = props.value;
	});
	const onSharedKeyDown = (event) => {
		if (event.key === "Enter" && props?.validateFormat?.(inputValue.value)) props?.onSubmit?.();
		props.onKeyDown?.(event);
	};
	const onFormatKeyDown = (event) => {
		onSharedKeyDown(event);
		const { key } = event;
		let nextCellText = null;
		let nextFillText = null;
		const maskCellLen = selectionEnd.value - selectionStart.value;
		const cellFormat = props.format.slice(selectionStart.value, selectionEnd.value);
		const offsetCellIndex = (offset) => {
			let nextIndex = focusCellIndex.value + offset;
			nextIndex = Math.max(nextIndex, 0);
			nextIndex = Math.min(nextIndex, maskFormat.value.size() - 1);
			focusCellIndex.value = nextIndex;
		};
		const offsetCellValue = (offset) => {
			const [rangeStart, rangeEnd, rangeDefault] = getMaskRange(cellFormat);
			const currentText = inputValue.value.slice(selectionStart.value, selectionEnd.value);
			const currentTextNum = Number(currentText);
			if (Number.isNaN(currentTextNum)) return String(rangeDefault || (offset > 0 ? rangeStart : rangeEnd));
			const num = currentTextNum + offset;
			const range = rangeEnd - rangeStart + 1;
			return String(rangeStart + (range + num - rangeStart) % range);
		};
		switch (key) {
			case "Backspace":
			case "Delete":
				nextCellText = "";
				nextFillText = cellFormat;
				break;
			case "ArrowLeft":
				nextCellText = "";
				offsetCellIndex(-1);
				break;
			case "ArrowRight":
				nextCellText = "";
				offsetCellIndex(1);
				break;
			case "ArrowUp":
				nextCellText = "";
				nextFillText = offsetCellValue(1);
				break;
			case "ArrowDown":
				nextCellText = "";
				nextFillText = offsetCellValue(-1);
				break;
			default:
				if (!Number.isNaN(Number(key))) {
					nextCellText = focusCellText.value + key;
					nextFillText = nextCellText;
				}
				break;
		}
		if (nextCellText !== null) {
			focusCellText.value = nextCellText;
			if (nextCellText.length >= maskCellLen) {
				offsetCellIndex(1);
				focusCellText.value = "";
			}
		}
		if (nextFillText !== null) triggerInputChange((inputValue.value.slice(0, selectionStart.value) + leftPad(nextFillText, maskCellLen) + inputValue.value.slice(selectionEnd.value)).slice(0, props.format.length));
		forceSelectionSyncMark.value = {};
	};
	const rafRef = ref();
	watch([
		maskFormat,
		() => props.format,
		focused,
		inputValue,
		focusCellIndex,
		selectionStart,
		selectionEnd,
		forceSelectionSyncMark
	], () => {
		if (!focused.value || !props.format || mouseDownRef.value) return;
		if (!maskFormat.value.match(inputValue.value)) {
			triggerInputChange(props.format);
			return;
		}
		inputRef.value?.setSelectionRange(selectionStart.value, selectionEnd.value);
		rafRef.value = raf(() => {
			inputRef.value?.setSelectionRange(selectionStart.value, selectionEnd.value);
		});
	}, { flush: "post" });
	onBeforeUnmount(() => {
		raf.cancel(rafRef.value);
	});
	return () => {
		const { className, active, showActiveCls, suffixIcon, format, validateFormat, onChange, onInput, helped, onHelp, onSubmit, onKeyDown, preserveInvalidOnBlur, invalid, clearIcon, ...restProps } = props;
		const inputProps = props.format ? {
			onFocus: onFormatFocus,
			onBlur: onFormatBlur,
			onKeydown: onFormatKeyDown,
			onMousedown: onFormatMouseDown,
			onMouseup: onFormatMouseUp,
			onPaste: onFormatPaste
		} : {};
		const Component = pickerCtx.value.input ?? "input";
		return createVNode("div", {
			"ref": holderRef,
			"class": clsx(inputPrefixCls.value, {
				[`${inputPrefixCls.value}-active`]: props.active && props.showActiveCls,
				[`${inputPrefixCls.value}-placeholder`]: props.helped
			}, attrs.class),
			"style": attrs.style
		}, [
			createVNode(Component, mergeProps({
				"ref": inputRef,
				"aria-invalid": props.invalid,
				"autoComplete": "off"
			}, attrs, restProps, {
				"onKeydown": onSharedKeyDown,
				"onBlur": onSharedBlur
			}, inputProps, {
				"value": inputValue.value,
				"onInput": onInternalChange,
				"class": classNames.value.input,
				"style": styles.value.input,
				"readonly": props.inputReadOnly
			}), null),
			createVNode(Icon_default, {
				"type": "suffix",
				"icon": props.suffixIcon
			}, null),
			props.clearIcon
		]);
	};
}, {
	props: {
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false,
			default: void 0
		},
		"aria-required": {
			type: Boolean,
			required: false,
			default: void 0
		},
		name: {
			type: String,
			required: false,
			default: void 0
		},
		autoComplete: {
			type: String,
			required: false,
			default: void 0
		},
		size: {
			type: Number,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
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
		format: {
			type: String,
			required: false,
			default: void 0
		},
		validateFormat: {
			type: Function,
			required: true,
			default: void 0
		},
		active: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showActiveCls: {
			type: Boolean,
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
		value: {
			type: String,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: true,
			default: void 0
		},
		onSubmit: {
			required: true,
			default: void 0
		},
		helped: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onHelp: {
			type: Function,
			required: true,
			default: void 0
		},
		preserveInvalidOnBlur: {
			type: Boolean,
			required: false,
			default: void 0
		},
		invalid: {
			type: Boolean,
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
		}
	},
	name: "Input",
	inheritAttrs: false
});
export { Input_default as default };
