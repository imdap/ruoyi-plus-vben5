import { generateColor } from "../util.js";
import ColorSteppers_default from "./ColorSteppers.js";
import { createVNode, defineComponent, shallowRef } from "vue";

//#region src/color-picker/components/ColorRgbInput.tsx
var ColorRgbInput_default = /* @__PURE__ */ defineComponent((props) => {
	const internalValue = shallowRef(generateColor(props.value || "#000"));
	const rgbValue = () => props.value || internalValue.value;
	const handleRgbChange = (step, type) => {
		const rgb = rgbValue().toRgb();
		rgb[type] = step || 0;
		const genColor = generateColor(rgb);
		internalValue.value = genColor;
		props.onChange?.(genColor);
	};
	return () => {
		const prefix = props.prefixCls;
		const rgb = rgbValue().toRgb();
		return createVNode("div", { "class": `${prefix}-rgb-input` }, [
			createVNode(ColorSteppers_default, {
				"max": 255,
				"min": 0,
				"value": Number(rgb.r),
				"prefixCls": prefix,
				"className": `${prefix}-rgb-input`,
				"onChange": (step) => handleRgbChange(Number(step), "r")
			}, null),
			createVNode(ColorSteppers_default, {
				"max": 255,
				"min": 0,
				"value": Number(rgb.g),
				"prefixCls": prefix,
				"className": `${prefix}-rgb-input`,
				"onChange": (step) => handleRgbChange(Number(step), "g")
			}, null),
			createVNode(ColorSteppers_default, {
				"max": 255,
				"min": 0,
				"value": Number(rgb.b),
				"prefixCls": prefix,
				"className": `${prefix}-rgb-input`,
				"onChange": (step) => handleRgbChange(Number(step), "b")
			}, null)
		]);
	};
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
	name: "ColorRgbInput",
	inheritAttrs: false
});

//#endregion
export { ColorRgbInput_default as default };