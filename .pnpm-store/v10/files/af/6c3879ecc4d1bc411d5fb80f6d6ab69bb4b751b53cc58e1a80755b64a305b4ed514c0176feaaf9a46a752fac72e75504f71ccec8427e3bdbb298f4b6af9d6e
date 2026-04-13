import { generateColor, getColorAlpha } from "../util.js";
import ColorSteppers_default from "./ColorSteppers.js";
import { computed, createVNode, defineComponent, shallowRef, watch } from "vue";

//#region src/color-picker/components/ColorAlphaInput.tsx
var ColorAlphaInput_default = /* @__PURE__ */ defineComponent((props) => {
	const internalValue = shallowRef(generateColor(props.value || "#000"));
	watch(() => props.value, (val) => {
		if (val) internalValue.value = val;
	});
	const alphaValue = computed(() => props.value ?? internalValue.value);
	const handleAlphaChange = (step) => {
		const hsba = alphaValue.value.toHsb();
		hsba.a = (step || 0) / 100;
		const genColor = generateColor(hsba);
		internalValue.value = genColor;
		props.onChange?.(genColor);
	};
	return () => {
		const { prefixCls } = props;
		return createVNode(ColorSteppers_default, {
			"value": getColorAlpha(alphaValue.value),
			"prefixCls": prefixCls,
			"formatter": (step) => `${step}%`,
			"className": `${prefixCls}-alpha-input`,
			"onChange": handleAlphaChange
		}, null);
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
	name: "ColorAlphaInput",
	inheritAttrs: false
});

//#endregion
export { ColorAlphaInput_default as default };