import { devUseWarning, isDev } from "../../_util/warning.js";
import { useComponentBaseConfig } from "../../config-provider/context.js";
import { useSize } from "../../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../../_util/tools.js";
import { getMergedStatus } from "../../_util/statusUtils.js";
import { useFormItemInputContext, useFormItemInputContextProvider } from "../../form/context.js";
import otp_default from "../style/otp.js";
import OTPInput_default from "./OTPInput.js";
import { Fragment, computed, createVNode, defineComponent, mergeProps, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";

//#region src/input/OTP/index.tsx
const strToArr = (str) => (str || "").split("");
const OTP = /* @__PURE__ */ defineComponent((props, { attrs, emit, slots }) => {
	if (isDev) devUseWarning("InputOTP")(!(typeof props.mask === "string" && props.mask.length > 1), "usage", "`mask` prop should be a single character.");
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("otp", props);
	const [hashId, cssVarCls] = otp_default(prefixCls);
	const mergedLength = computed(() => props.length ?? 6);
	const mergedSize = useSize((ctx) => props.size ?? ctx);
	const formItemInputContext = useFormItemInputContext();
	const mergedStatus = computed(() => getMergedStatus(formItemInputContext.value.status, props.status));
	useFormItemInputContextProvider(computed(() => ({
		...formItemInputContext.value,
		status: mergedStatus.value,
		hasFeedback: false,
		feedbackIcon: null
	})));
	const { classes, styles } = toPropsRefs(props, "classes", "styles");
	const mergedProps = computed(() => ({
		...props,
		length: mergedLength.value
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const inputRefs = shallowRef({});
	const internalFormatter = (txt) => props.formatter ? props.formatter(txt) : txt;
	const valueCells = shallowRef(strToArr(internalFormatter(props.value ?? props.defaultValue ?? "")));
	watch(() => props.value, (newValue) => {
		valueCells.value = strToArr(internalFormatter(newValue ?? ""));
	});
	const triggerValueCellsChange = (nextValueCells) => {
		const prevValue = valueCells.value.join("");
		valueCells.value = nextValueCells;
		emit("input", [...nextValueCells]);
		const nextValue = nextValueCells.join("");
		emit("update:value", nextValue);
		if (nextValueCells.length === mergedLength.value && nextValueCells.every((cell) => cell) && nextValue !== prevValue) emit("change", nextValue);
	};
	const patchValue = (index, txt) => {
		let nextCells = [...valueCells.value];
		for (let i = 0; i < index; i += 1) if (!nextCells[i]) nextCells[i] = "";
		if (txt.length <= 1) nextCells[index] = txt;
		else nextCells = nextCells.slice(0, index).concat(strToArr(txt));
		nextCells = nextCells.slice(0, mergedLength.value);
		for (let i = nextCells.length - 1; i >= 0; i -= 1) {
			if (nextCells[i]) break;
			nextCells.pop();
		}
		return strToArr(internalFormatter(nextCells.map((cell) => cell || " ").join(""))).map((cell, i) => {
			if (cell === " " && !nextCells[i]) return nextCells[i];
			return cell;
		});
	};
	const handleInputChange = (index, txt) => {
		const nextCells = patchValue(index, txt);
		const nextIndex = Math.min(index + txt.length, mergedLength.value - 1);
		if (nextIndex !== index && nextCells[index] !== void 0) inputRefs.value[nextIndex]?.focus?.();
		triggerValueCellsChange(nextCells);
	};
	const handleActiveChange = (nextIndex) => {
		inputRefs.value[nextIndex]?.focus?.();
	};
	const renderSeparator = (index) => {
		const separator = slots.separator || props.separator;
		const separatorNode = typeof separator === "function" ? separator({ index }) : separator;
		if (!separatorNode) return null;
		return createVNode("span", {
			"key": `otp-sep-${index}`,
			"class": clsx(`${prefixCls.value}-separator`, mergedClassNames.value.separator),
			"style": mergedStyles.value.separator
		}, [separatorNode]);
	};
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		return createVNode("div", mergeProps(restAttrs, {
			"class": clsx(className, prefixCls.value, cssVarCls.value, props.rootClass, contextClassName.value, hashId.value, {
				[`${prefixCls.value}-sm`]: mergedSize.value === "small",
				[`${prefixCls.value}-lg`]: mergedSize.value === "large",
				[`${prefixCls.value}-rtl`]: direction.value === "rtl"
			}, mergedClassNames.value.root),
			"style": {
				...mergedStyles.value.root,
				...contextStyle.value,
				...style
			},
			"role": "group"
		}), [Array.from({ length: mergedLength.value }).map((_, index) => createVNode(Fragment, null, [createVNode(OTPInput_default, {
			"key": `otp-${index}`,
			"prefixCls": prefixCls.value,
			"index": index,
			"value": valueCells.value[index] || "",
			"onChange": handleInputChange,
			"onActiveChange": handleActiveChange,
			"autoFocus": index === 0 && props.autoFocus,
			"mask": props.mask,
			"type": props.type,
			"inputMode": props.inputMode,
			"size": mergedSize.value,
			"variant": props.variant,
			"status": mergedStatus.value,
			"disabled": props.disabled,
			"class": clsx(`${prefixCls.value}-input`, mergedClassNames.value.input),
			"style": mergedStyles.value.input,
			"ref": (instance) => {
				inputRefs.value[index] = instance;
			}
		}, null), index < mergedLength.value - 1 ? renderSeparator(index) : null]))]);
	};
}, {
	props: {
		length: {
			type: Number,
			required: false
		},
		variant: {
			type: String,
			required: false
		},
		size: {
			type: [String, null],
			required: false
		},
		defaultValue: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		},
		formatter: {
			type: Function,
			required: false
		},
		separator: {
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
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
		},
		mask: {
			type: [Boolean, String],
			required: false,
			default: void 0
		},
		type: { required: false },
		inputMode: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	},
	emits: [
		"change",
		"input",
		"update:value"
	],
	name: "AInputOtp",
	inheritAttrs: false
});
var OTP_default = OTP;

//#endregion
export { OTP_default as default };