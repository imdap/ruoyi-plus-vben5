import { generateColor, getRoundNumber } from "../util.js";
import ColorSteppers_default from "./ColorSteppers.js";
import { createVNode, defineComponent, shallowRef } from "vue";

//#region src/color-picker/components/ColorHsbInput.tsx
var ColorHsbInput_default = /* @__PURE__ */ defineComponent((props) => {
	const internalValue = shallowRef(generateColor(props.value || "#000"));
	const hsbValue = () => props.value || internalValue.value;
	const handleHsbChange = (step, type) => {
		const hsb = hsbValue().toHsb();
		hsb[type] = type === "h" ? step || 0 : (step || 0) / 100;
		const genColor = generateColor(hsb);
		internalValue.value = genColor;
		props.onChange?.(genColor);
	};
	return () => {
		const prefix = props.prefixCls;
		const hsb = hsbValue().toHsb();
		return createVNode("div", { "class": `${prefix}-hsb-input` }, [
			createVNode(ColorSteppers_default, {
				"max": 360,
				"min": 0,
				"value": Number(hsb.h),
				"prefixCls": prefix,
				"className": `${prefix}-hsb-input`,
				"formatter": (step) => getRoundNumber(step || 0).toString(),
				"onChange": (step) => handleHsbChange(Number(step), "h")
			}, null),
			createVNode(ColorSteppers_default, {
				"max": 100,
				"min": 0,
				"value": Number(hsb.s) * 100,
				"prefixCls": prefix,
				"className": `${prefix}-hsb-input`,
				"formatter": (step) => `${getRoundNumber(step || 0)}%`,
				"onChange": (step) => handleHsbChange(Number(step), "s")
			}, null),
			createVNode(ColorSteppers_default, {
				"max": 100,
				"min": 0,
				"value": Number(hsb.b) * 100,
				"prefixCls": prefix,
				"className": `${prefix}-hsb-input`,
				"formatter": (step) => `${getRoundNumber(step || 0)}%`,
				"onChange": (step) => handleHsbChange(Number(step), "b")
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
	name: "ColorHsbInput",
	inheritAttrs: false
});

//#endregion
export { ColorHsbInput_default as default };