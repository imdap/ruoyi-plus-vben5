import select_default from "../../select/index.js";
import { FORMAT_HEX, FORMAT_HSB, FORMAT_RGB } from "../interface.js";
import ColorAlphaInput_default from "./ColorAlphaInput.js";
import ColorHexInput_default from "./ColorHexInput.js";
import ColorHsbInput_default from "./ColorHsbInput.js";
import ColorRgbInput_default from "./ColorRgbInput.js";
import { computed, createVNode, defineComponent, shallowRef, watch } from "vue";

//#region src/color-picker/components/ColorInput.tsx
const selectOptions = [
	FORMAT_HEX,
	FORMAT_HSB,
	FORMAT_RGB
].map((format) => ({
	value: format,
	label: format.toUpperCase()
}));
var ColorInput_default = /* @__PURE__ */ defineComponent((props) => {
	const colorFormat = shallowRef(props.format ?? FORMAT_HEX);
	watch(() => props.format, (val) => {
		if (val) colorFormat.value = val;
	});
	const triggerFormatChange = (fmt) => {
		colorFormat.value = fmt;
		props.onFormatChange?.(fmt);
	};
	const steppersNode = computed(() => {
		const inputProps = {
			value: props.value,
			prefixCls: props.prefixCls,
			onChange: props.onChange
		};
		switch (colorFormat.value) {
			case FORMAT_HSB: return createVNode(ColorHsbInput_default, inputProps, null);
			case FORMAT_RGB: return createVNode(ColorRgbInput_default, inputProps, null);
			default: return createVNode(ColorHexInput_default, inputProps, null);
		}
	});
	return () => {
		const prefixCls = props.prefixCls;
		return createVNode("div", { "class": `${prefixCls}-input-container` }, [
			!props.disabledFormat && createVNode(select_default, {
				"value": colorFormat.value,
				"variant": "borderless",
				"getPopupContainer": (current) => current,
				"popupMatchSelectWidth": 68,
				"placement": "bottomRight",
				"onChange": triggerFormatChange,
				"class": `${prefixCls}-format-select`,
				"size": "small",
				"options": selectOptions
			}, null),
			createVNode("div", { "class": `${prefixCls}-input` }, [steppersNode.value]),
			!props.disabledAlpha && createVNode(ColorAlphaInput_default, {
				"prefixCls": prefixCls,
				"value": props.value,
				"onChange": props.onChange
			}, null)
		]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		format: { required: false },
		onFormatChange: {
			type: Function,
			required: false
		},
		disabledAlpha: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: {
			type: Object,
			required: false
		},
		onChange: {
			type: Function,
			required: false
		},
		disabledFormat: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "ColorInput",
	inheritAttrs: false
});

//#endregion
export { ColorInput_default as default };