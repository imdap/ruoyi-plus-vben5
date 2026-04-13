import { useComponentBaseConfig } from "../config-provider/context.js";
import { useRadioOptionTypeContextProvider } from "./context.js";
import radio_default from "./radio.js";
import { createVNode, defineComponent, mergeProps, ref } from "vue";

//#region src/radio/radioButton.tsx
const RadioButton = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls } = useComponentBaseConfig("radio", props);
	useRadioOptionTypeContextProvider(ref("button"));
	return () => {
		return createVNode(radio_default, mergeProps({ "prefixCls": prefixCls.value }, attrs, props), slots);
	};
}, {
	props: {
		defaultChecked: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		checked: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false
		},
		value: { required: false },
		tabIndex: {
			type: Number,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: false
		},
		skipGroup: {
			type: Boolean,
			required: false,
			default: void 0
		},
		required: {
			type: Boolean,
			required: false,
			default: void 0
		},
		checkedValue: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
		},
		unCheckedValue: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			required: false,
			default: void 0
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
		"update:checked",
		"update:value",
		"mouseenter",
		"mouseleave",
		"keypress",
		"keydown",
		"focus",
		"blur",
		"click"
	],
	name: "ARadioButton",
	inheritAttrs: false
});
var radioButton_default = RadioButton;

//#endregion
export { radioButton_default as default };