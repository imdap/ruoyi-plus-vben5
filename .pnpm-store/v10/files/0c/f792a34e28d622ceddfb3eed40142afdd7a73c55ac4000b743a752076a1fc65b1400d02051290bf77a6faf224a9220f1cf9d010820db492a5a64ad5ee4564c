import { getAttrStyleAndClass } from "../../_util/hooks/useMergeSemantic.js";
import Input_default from "../Input.js";
import { createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import raf from "@v-c/util/dist/raf";
import { omit } from "es-toolkit";

//#region src/input/OTP/OTPInput.tsx
const OTPInput = /* @__PURE__ */ defineComponent((props, { attrs, expose, slots }) => {
	const inputRef = shallowRef();
	expose({
		focus: (...args) => inputRef.value?.focus?.(...args),
		blur: () => inputRef.value?.blur?.(),
		input: inputRef
	});
	const syncSelection = () => {
		raf(() => {
			const inputEle = inputRef.value?.input;
			if (document.activeElement === inputEle && inputEle) inputEle.select();
		});
	};
	const handleChange = (e) => {
		props.onChange(props.index, e?.target?.value ?? "");
	};
	const handleKeyDown = (event) => {
		const { key, ctrlKey, metaKey } = event;
		if (key === "ArrowLeft") props.onActiveChange(props.index - 1);
		else if (key === "ArrowRight") props.onActiveChange(props.index + 1);
		else if (key === "z" && (ctrlKey || metaKey)) event.preventDefault();
		else if (key === "Backspace" && !props.value) props.onActiveChange(props.index - 1);
		syncSelection();
	};
	const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
	const restInputProps = omit(props, [
		"prefixCls",
		"index",
		"onChange",
		"onActiveChange",
		"mask"
	]);
	const maskValue = typeof props.mask === "string" ? props.mask : props.value;
	return () => createVNode("span", {
		"class": `${props.prefixCls}-input-wrapper`,
		"role": "presentation"
	}, [props.mask && props.value !== "" && props.value !== void 0 && createVNode("span", {
		"class": `${props.prefixCls}-mask-icon`,
		"aria-hidden": "true"
	}, [maskValue]), createVNode(Input_default, mergeProps(restAttrs, restInputProps, {
		"ref": inputRef,
		"value": props.value,
		"type": props.mask === true ? "password" : props.type ?? "text",
		"class": clsx(className, { [`${props.prefixCls}-mask-input`]: props.mask }),
		"style": style,
		"onChange": handleChange,
		"htmlSize": 1,
		"onKeydown": handleKeyDown,
		"onFocus": () => syncSelection(),
		"onMousedown": () => syncSelection(),
		"onMouseup": () => syncSelection(),
		"aria-label": `OTP Input ${props.index + 1}`
	}, { "onUpdate:value": (value) => props.onChange(props.index, value ?? "") }), slots)]);
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		index: {
			type: Number,
			required: true
		},
		value: {
			type: String,
			required: false
		},
		onChange: {
			type: Function,
			required: true
		},
		onActiveChange: {
			type: Function,
			required: true
		},
		mask: {
			type: [Boolean, String],
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
		status: {
			type: String,
			required: false
		},
		addonBefore: {
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
		addonAfter: {
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
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
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
		rootClass: {
			type: String,
			required: false
		},
		defaultValue: { required: false },
		type: { required: false },
		showCount: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		autoComplete: {
			type: String,
			required: false
		},
		htmlSize: {
			type: Number,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		count: { required: false },
		maxlength: {
			type: Number,
			required: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dataAttrs: { required: false },
		components: { required: false },
		prefix: {
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
		suffix: {
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
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		changeOnComposing: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		inputMode: {
			type: String,
			required: false
		}
	},
	name: "AInputOTPInput",
	inheritAttrs: false
});
var OTPInput_default = OTPInput;

//#endregion
export { OTPInput_default as default };