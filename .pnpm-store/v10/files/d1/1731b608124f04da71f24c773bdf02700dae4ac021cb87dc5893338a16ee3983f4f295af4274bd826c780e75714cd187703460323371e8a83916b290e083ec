import button_default from "../button/index.js";
import { createVNode, defineComponent, mergeProps } from "vue";

//#region src/date-picker/PickerButton.tsx
const PickerButton = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { size = "small", type = "primary", ...restProps } = props;
		return createVNode(button_default, mergeProps({
			"size": size,
			"type": type
		}, restProps), { default: () => [slots.default?.()] });
	};
}, {
	props: {
		href: {
			type: String,
			required: false
		},
		htmlType: {
			type: String,
			required: false
		},
		target: {
			type: String,
			required: false
		},
		autoInsertSpace: {
			type: Boolean,
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: false
		},
		color: { required: false },
		variant: {
			type: String,
			required: false
		},
		icon: {
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
		iconPlacement: {
			type: String,
			required: false
		},
		shape: {
			type: String,
			required: false
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
		loading: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		ghost: {
			type: Boolean,
			required: false,
			default: void 0
		},
		danger: {
			type: Boolean,
			required: false,
			default: void 0
		},
		block: {
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
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		_skipSemantic: {
			type: Boolean,
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
	name: "APickerButton"
});
var PickerButton_default = PickerButton;

//#endregion
export { PickerButton_default as default };