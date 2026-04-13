import { toHexFormat } from "../color.js";
import { generateColor } from "../util.js";
import Input_default from "../../input/Input.js";
import { createVNode, defineComponent, shallowRef, watch } from "vue";

//#region src/color-picker/components/ColorHexInput.tsx
const hexReg = /(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i;
const isHexString = (hex) => hexReg.test(`#${hex}`);
var ColorHexInput_default = /* @__PURE__ */ defineComponent((props) => {
	const hexValue = shallowRef();
	watch(() => props.value, (val) => {
		if (val) hexValue.value = toHexFormat(val.toHexString());
	}, { immediate: true });
	const handleHexChange = (e) => {
		const originValue = e.target.value;
		hexValue.value = toHexFormat(originValue);
		if (isHexString(toHexFormat(originValue, true))) props.onChange?.(generateColor(originValue));
	};
	return () => createVNode(Input_default, {
		"class": `${props.prefixCls}-hex-input`,
		"value": hexValue.value,
		"prefix": "#",
		"onChange": handleHexChange,
		"size": "small"
	}, null);
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		value: {
			type: Object,
			required: false
		},
		onChange: {
			type: Function,
			required: false
		}
	},
	name: "ColorHexInput",
	inheritAttrs: false
});

//#endregion
export { ColorHexInput_default as default };