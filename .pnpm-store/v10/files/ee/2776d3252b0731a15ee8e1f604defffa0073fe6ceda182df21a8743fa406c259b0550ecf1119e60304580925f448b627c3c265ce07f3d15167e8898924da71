import useCursor from "./hooks/useCursor.js";
import useFrame_default from "./hooks/useFrame.js";
import StepHandler_default from "./StepHandler.js";
import { getDecupleSteps } from "./utils/numberUtil.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watch, watchEffect } from "vue";
import getMiniDecimal, { getNumberPrecision, num2str, toFixed, validateNumber } from "@v-c/mini-decimal";
import { clsx } from "@v-c/util";
import { triggerFocus } from "@v-c/util/dist/Dom/focus";
import { KeyCodeStr } from "@v-c/util/dist/KeyCode";
import omit from "@v-c/util/dist/omit";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var defaults = {
	prefixCls: "vc-input-number",
	step: 1,
	controls: true,
	changeOnWheel: false,
	mode: "input",
	stringMode: false
};
function getDecimalValue(stringMode, decimalValue) {
	if (stringMode || decimalValue.isEmpty()) return decimalValue.toString();
	return decimalValue.toNumber();
}
function getDecimalIfValidate(value) {
	const decimal = getMiniDecimal(value);
	return decimal.isInvalidate() ? null : decimal;
}
var InputNumber_default = /* @__PURE__ */ defineComponent((props, { attrs, slots, expose, emit }) => {
	const focus = shallowRef(false);
	const userTypingRef = shallowRef(false);
	const compositionRef = shallowRef(false);
	const shiftKeyRef = shallowRef(false);
	const rootRef = shallowRef();
	const inputRef = shallowRef();
	expose({
		focus: (option) => {
			if (inputRef.value) triggerFocus(inputRef.value, option);
		},
		blur: () => {
			inputRef.value?.blur?.();
		},
		nativeElement: computed(() => rootRef.value || inputRef.value || null),
		input: inputRef
	});
	const decimalValue = shallowRef(getMiniDecimal(props.value ?? props.defaultValue ?? ""));
	const setUncontrolledDecimalValue = (newDecimal) => {
		if (props.value === void 0) decimalValue.value = newDecimal;
	};
	const getPrecision = (numStr, userTyping) => {
		if (userTyping) return;
		if (props.precision !== void 0 && props.precision >= 0) return props.precision;
		return Math.max(getNumberPrecision(numStr), getNumberPrecision(props.step ?? 1));
	};
	const mergedParser = (num) => {
		const numStr = String(num);
		if (props.parser) return props.parser(numStr);
		let parsedStr = numStr;
		if (props.decimalSeparator) parsedStr = parsedStr.replace(props.decimalSeparator, ".");
		return parsedStr.replace(/[^\w.-]+/g, "");
	};
	const inputValue = shallowRef("");
	const inputValueRef = shallowRef("");
	const mergedFormatter = (number, userTyping) => {
		if (props.formatter) return props.formatter(number, {
			userTyping,
			input: String(inputValueRef.value)
		});
		let str = typeof number === "number" ? num2str(number) : number;
		if (!userTyping) {
			const mergedPrecision = getPrecision(str, userTyping);
			if (validateNumber(str) && (props.decimalSeparator || mergedPrecision !== void 0 && mergedPrecision >= 0)) {
				const separatorStr = props.decimalSeparator || ".";
				str = toFixed(str, separatorStr, mergedPrecision);
			}
		}
		return str;
	};
	const syncInputValue = () => {
		const initValue = props.defaultValue ?? props.value;
		if (decimalValue.value.isInvalidate() && ["string", "number"].includes(typeof initValue)) inputValue.value = Number.isNaN(initValue) ? "" : initValue;
		else inputValue.value = mergedFormatter(decimalValue.value.toString(), false);
		inputValueRef.value = inputValue.value;
	};
	syncInputValue();
	watch(inputValue, (val) => {
		inputValueRef.value = val;
	});
	const setInputValue = (newValue, userTyping) => {
		inputValue.value = mergedFormatter(newValue.isInvalidate() ? newValue.toString(false) : newValue.toString(!userTyping), userTyping);
	};
	const maxDecimal = computed(() => props.max !== void 0 ? getDecimalIfValidate(props.max) : null);
	const minDecimal = computed(() => props.min !== void 0 ? getDecimalIfValidate(props.min) : null);
	const upDisabled = computed(() => {
		if (!maxDecimal.value || !decimalValue.value || decimalValue.value.isInvalidate()) return false;
		return maxDecimal.value.lessEquals(decimalValue.value);
	});
	const downDisabled = computed(() => {
		if (!minDecimal.value || !decimalValue.value || decimalValue.value.isInvalidate()) return false;
		return decimalValue.value.lessEquals(minDecimal.value);
	});
	const recordCursorRef = shallowRef(() => {});
	const restoreCursorRef = shallowRef(() => {});
	watchEffect(() => {
		if (inputRef.value) {
			const [record, restore] = useCursor(inputRef.value, focus.value);
			recordCursorRef.value = record;
			restoreCursorRef.value = restore;
		}
	});
	const recordCursor = () => recordCursorRef.value?.();
	const restoreCursor = () => restoreCursorRef.value?.();
	const getRangeValue = (target) => {
		if (maxDecimal.value && !target.lessEquals(maxDecimal.value)) return maxDecimal.value;
		if (minDecimal.value && !minDecimal.value.lessEquals(target)) return minDecimal.value;
		return null;
	};
	const isInRange = (target) => !getRangeValue(target);
	const triggerValueUpdate = (newValue, userTyping) => {
		let updateValue = newValue;
		let isRangeValidate = isInRange(updateValue) || updateValue.isEmpty();
		if (!updateValue.isEmpty() && !userTyping) {
			updateValue = getRangeValue(updateValue) || updateValue;
			isRangeValidate = true;
		}
		if (!props.readOnly && !props.disabled && isRangeValidate) {
			const numStr = updateValue.toString();
			const mergedPrecision = getPrecision(numStr, userTyping);
			if (mergedPrecision !== void 0 && mergedPrecision >= 0) {
				updateValue = getMiniDecimal(toFixed(numStr, ".", mergedPrecision));
				if (!isInRange(updateValue)) updateValue = getMiniDecimal(toFixed(numStr, ".", mergedPrecision, true));
			}
			if (!updateValue.equals(decimalValue.value)) {
				setUncontrolledDecimalValue(updateValue);
				const outValue = updateValue.isEmpty() ? null : getDecimalValue(props.stringMode, updateValue);
				emit("update:value", outValue);
				props.onChange?.(outValue);
				if (props.value === void 0) setInputValue(updateValue, userTyping);
			}
			return updateValue;
		}
		return decimalValue.value;
	};
	const onNextPromise = useFrame_default();
	const collectInputValue = (inputStr) => {
		recordCursor();
		inputValueRef.value = inputStr;
		inputValue.value = inputStr;
		if (!compositionRef.value) {
			const finalDecimal = getMiniDecimal(mergedParser(inputStr));
			if (!finalDecimal.isNaN()) triggerValueUpdate(finalDecimal, true);
		}
		props.onInput?.(inputStr);
		onNextPromise(() => {
			let nextInputStr = inputStr;
			if (!props.parser) nextInputStr = inputStr.replace(/。/g, ".");
			if (nextInputStr !== inputStr) collectInputValue(nextInputStr);
		});
	};
	const onCompositionStart = (e) => {
		compositionRef.value = true;
		props.onCompositionStart?.(e);
	};
	const onCompositionEnd = (e) => {
		compositionRef.value = false;
		props.onCompositionEnd?.(e);
		if (inputRef.value) collectInputValue(inputRef.value.value);
	};
	const onInternalInput = (e) => {
		collectInputValue(e.target.value);
	};
	const onInternalStep = (up, emitter) => {
		if (up && upDisabled.value || !up && downDisabled.value) return;
		userTypingRef.value = false;
		let stepDecimal = getMiniDecimal(shiftKeyRef.value ? getDecupleSteps(props.step ?? 1) : props.step ?? 1);
		if (!up) stepDecimal = stepDecimal.negate();
		const updatedValue = triggerValueUpdate((decimalValue.value || getMiniDecimal(0)).add(stepDecimal.toString()), false);
		const outValue = getDecimalValue(props.stringMode, updatedValue);
		props.onStep?.(outValue, {
			offset: shiftKeyRef.value ? getDecupleSteps(props.step ?? 1) : props.step ?? 1,
			type: up ? "up" : "down",
			emitter
		});
		inputRef.value?.focus();
	};
	const flushInputValue = (userTyping) => {
		const parsedValue = getMiniDecimal(mergedParser(inputValue.value));
		let formatValue;
		if (!parsedValue.isNaN()) formatValue = triggerValueUpdate(parsedValue, userTyping);
		else formatValue = triggerValueUpdate(decimalValue.value, userTyping);
		if (props.value !== void 0) setInputValue(decimalValue.value, false);
		else if (!formatValue.isNaN()) setInputValue(formatValue, false);
	};
	const onBeforeInput = (e) => {
		userTypingRef.value = true;
		props.onBeforeInput?.(e);
	};
	const onKeyDown = (event) => {
		const { key, shiftKey } = event;
		userTypingRef.value = true;
		shiftKeyRef.value = shiftKey;
		if (key === KeyCodeStr.Enter) {
			if (!compositionRef.value) userTypingRef.value = false;
			flushInputValue(false);
			props.onPressEnter?.(event);
		}
		if (props.keyboard === false) {
			props.onKeyDown?.(event);
			return;
		}
		if (!compositionRef.value && [
			"Up",
			"ArrowUp",
			"Down",
			"ArrowDown"
		].includes(key)) {
			onInternalStep(key === "Up" || key === "ArrowUp", "keyboard");
			event.preventDefault();
		}
		props.onKeyDown?.(event);
	};
	const onKeyUp = (event) => {
		userTypingRef.value = false;
		shiftKeyRef.value = false;
		props.onKeyUp?.(event);
	};
	watchEffect((onCleanup) => {
		if (props.changeOnWheel && focus.value && inputRef.value) {
			const onWheel = (event) => {
				onInternalStep(event.deltaY < 0, "wheel");
				event.preventDefault();
			};
			inputRef.value.addEventListener("wheel", onWheel, { passive: false });
			onCleanup(() => inputRef.value?.removeEventListener("wheel", onWheel));
		}
	});
	const onBlur = (e) => {
		if (props.changeOnBlur ?? true) flushInputValue(false);
		focus.value = false;
		userTypingRef.value = false;
		props.onBlur?.(e);
	};
	const onFocus = (e) => {
		focus.value = true;
		props.onFocus?.(e);
	};
	const onInternalMouseDown = (event) => {
		if (inputRef.value && event.target !== inputRef.value) {
			inputRef.value.focus();
			event.preventDefault();
		}
		props.onMouseDown?.(event);
	};
	watch([
		() => props.precision,
		() => props.formatter,
		() => props.decimalSeparator
	], () => {
		if (!decimalValue.value.isInvalidate()) setInputValue(decimalValue.value, false);
	});
	watch(() => props.value, (newVal) => {
		const newValue = getMiniDecimal(newVal ?? "");
		decimalValue.value = newValue;
		const currentParsedValue = getMiniDecimal(mergedParser(inputValue.value));
		if (!newValue.equals(currentParsedValue) || !userTypingRef.value || props.formatter) setInputValue(newValue, userTypingRef.value);
	});
	watch(() => inputValue.value, () => {
		if (props.formatter) restoreCursor();
	}, { flush: "post" });
	return () => {
		const { prefixCls = defaults.prefixCls, classNames: classNames$1, styles, step = defaults.step, disabled, readOnly, controls = defaults.controls, mode = defaults.mode, placeholder } = props;
		const mergedPrefixCls = prefixCls || defaults.prefixCls;
		const { class: className, style, ...restAttrs } = attrs;
		const mergedClassName = props.className || className;
		const mergedStyle = {
			...styles?.root,
			...props.style,
			...style
		};
		const prefixNode = slots.prefix?.() ?? props.prefix;
		const suffixNode = slots.suffix?.() ?? props.suffix;
		const upNode = slots.upHandler?.() ?? props.upHandler;
		const downNode = slots.downHandler?.() ?? props.downHandler;
		const upHandlerNode = createVNode(StepHandler_default, {
			"prefixCls": mergedPrefixCls,
			"action": "up",
			"disabled": upDisabled.value,
			"onStep": onInternalStep,
			"className": classNames$1?.action,
			"style": styles?.action
		}, _isSlot(upNode) ? upNode : { default: () => [upNode] });
		const downHandlerNode = createVNode(StepHandler_default, {
			"prefixCls": mergedPrefixCls,
			"action": "down",
			"disabled": downDisabled.value,
			"onStep": onInternalStep,
			"className": classNames$1?.action,
			"style": styles?.action
		}, _isSlot(downNode) ? downNode : { default: () => [downNode] });
		const inputAttrs = omit({ ...restAttrs }, [
			"prefixCls",
			"classNames",
			"styles",
			"defaultValue",
			"value",
			"prefix",
			"suffix",
			"upHandler",
			"downHandler",
			"keyboard",
			"changeOnWheel",
			"controls",
			"mode",
			"parser",
			"formatter",
			"precision",
			"decimalSeparator",
			"onChange",
			"onInput",
			"onPressEnter",
			"onStep",
			"changeOnBlur",
			"class",
			"style",
			"onMouseDown",
			"onClick",
			"onMouseUp",
			"onMouseLeave",
			"onMouseMove",
			"onMouseEnter",
			"onMouseOut",
			"onFocus",
			"onBlur",
			"onKeyDown",
			"onKeyUp",
			"onCompositionStart",
			"onCompositionEnd",
			"onBeforeInput"
		]);
		return createVNode("div", {
			"ref": rootRef,
			"class": clsx(mergedPrefixCls, `${mergedPrefixCls}-mode-${mode}`, mergedClassName, classNames$1?.root, {
				[`${mergedPrefixCls}-focused`]: focus.value,
				[`${mergedPrefixCls}-disabled`]: disabled,
				[`${mergedPrefixCls}-readonly`]: readOnly,
				[`${mergedPrefixCls}-not-a-number`]: decimalValue.value.isNaN(),
				[`${mergedPrefixCls}-out-of-range`]: !decimalValue.value.isInvalidate() && !isInRange(decimalValue.value)
			}),
			"style": mergedStyle,
			"onMousedown": onInternalMouseDown,
			"onMouseup": (e) => {
				props.onMouseUp?.(e);
			},
			"onMouseleave": (e) => {
				props.onMouseLeave?.(e);
			},
			"onMousemove": (e) => {
				props.onMouseMove?.(e);
			},
			"onMouseenter": (e) => {
				props.onMouseEnter?.(e);
			},
			"onMouseout": (e) => {
				props.onMouseOut?.(e);
			},
			"onClick": (e) => {
				props.onClick?.(e);
			}
		}, [
			mode === "spinner" && controls && downHandlerNode,
			!!prefixNode && createVNode("div", {
				"class": clsx(`${mergedPrefixCls}-prefix`, classNames$1?.prefix),
				"style": styles?.prefix
			}, [prefixNode]),
			createVNode("input", mergeProps({
				"autocomplete": "off",
				"role": "spinbutton",
				"aria-valuemin": props.min,
				"aria-valuemax": props.max,
				"aria-valuenow": decimalValue.value.isInvalidate() ? null : decimalValue.value.toString(),
				"step": step,
				"ref": inputRef,
				"class": clsx(`${mergedPrefixCls}-input`, classNames$1?.input),
				"style": styles?.input,
				"value": inputValue.value,
				"onInput": onInternalInput,
				"disabled": disabled,
				"readonly": readOnly,
				"placeholder": placeholder,
				"onFocus": onFocus,
				"onBlur": onBlur,
				"onKeydown": onKeyDown,
				"onKeyup": onKeyUp,
				"onCompositionstart": onCompositionStart,
				"onCompositionend": onCompositionEnd,
				"onBeforeinput": onBeforeInput
			}, inputAttrs), null),
			!!suffixNode && createVNode("div", {
				"class": clsx(`${mergedPrefixCls}-suffix`, classNames$1?.suffix),
				"style": styles?.suffix
			}, [suffixNode]),
			mode === "spinner" && controls && upHandlerNode,
			mode === "input" && controls && createVNode("div", {
				"class": clsx(`${mergedPrefixCls}-actions`, classNames$1?.actions),
				"style": styles?.actions
			}, [upHandlerNode, downHandlerNode])
		]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		class: {
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
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
		min: {
			required: false,
			default: void 0
		},
		max: {
			required: false,
			default: void 0
		},
		step: {
			required: false,
			default: void 0
		},
		defaultValue: {
			required: false,
			default: void 0
		},
		value: {
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefix: {
			required: false,
			default: void 0
		},
		suffix: {
			required: false,
			default: void 0
		},
		upHandler: {
			required: false,
			default: void 0
		},
		downHandler: {
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		changeOnWheel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		controls: {
			type: Boolean,
			required: false,
			default: void 0
		},
		parser: {
			type: Function,
			required: false,
			default: void 0
		},
		formatter: {
			type: Function,
			required: false,
			default: void 0
		},
		precision: {
			type: Number,
			required: false,
			default: void 0
		},
		decimalSeparator: {
			type: String,
			required: false,
			default: void 0
		},
		onInput: {
			type: Function,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onPressEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onStep: {
			type: Function,
			required: false,
			default: void 0
		},
		changeOnBlur: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		onMouseDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseUp: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseLeave: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseMove: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseEnter: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseOut: {
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
		onBeforeInput: {
			type: Function,
			required: false,
			default: void 0
		},
		stringMode: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		}
	}, defaults),
	name: "InputNumber",
	inheritAttrs: false,
	emits: ["update:value"]
});
export { InputNumber_default as default };
