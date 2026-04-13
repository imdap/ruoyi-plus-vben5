import useToken from "../../theme/useToken.js";
import { generateColor } from "../util.js";
import useLocale_default from "../../locale/useLocale.js";
import collapse_default from "../../collapse/index.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { Color, ColorBlock } from "@v-c/color-picker";

//#region src/color-picker/components/ColorPresets.tsx
function isBright(value, bgColorToken) {
	const { r, g, b, a } = value.toRgb();
	const hsv = new Color(value.toRgbString()).onBackground(bgColorToken).toHsv();
	if (a <= .5) return hsv.v > .5;
	return r * .299 + g * .587 + b * .114 > 192;
}
function genPresetColor(list) {
	return list.map((value) => {
		value.colors = value.colors.map(generateColor);
		return value;
	});
}
function genCollapsePanelKey(preset, index) {
	return `panel-${preset.key ?? index}`;
}
var ColorPresets_default = /* @__PURE__ */ defineComponent((props) => {
	const [locale] = useLocale_default("ColorPicker");
	const [, token] = useToken();
	const colorPresetsPrefixCls = computed(() => `${props.prefixCls}-presets`);
	const presetsValue = computed(() => genPresetColor(props.presets));
	const activeKeys = computed(() => presetsValue.value.reduce((acc, preset, index) => {
		const { defaultOpen = true } = preset;
		if (defaultOpen) acc.push(genCollapsePanelKey(preset, index));
		return acc;
	}, []));
	const handleClick = (colorValue) => {
		props.onChange?.(colorValue);
	};
	const items = computed(() => presetsValue.value.map((preset, index) => ({
		key: genCollapsePanelKey(preset, index),
		label: createVNode("div", { "class": `${colorPresetsPrefixCls.value}-label` }, [preset?.label]),
		content: createVNode("div", { "class": `${colorPresetsPrefixCls.value}-items` }, [Array.isArray(preset?.colors) && preset.colors?.length > 0 ? preset.colors.map((presetColor, idx) => {
			const colorInst = generateColor(presetColor);
			return createVNode(ColorBlock, mergeProps({
				"key": `preset-${idx}-${presetColor.toHexString?.() ?? idx}`,
				"color": colorInst.toCssString(),
				"prefixCls": props.prefixCls,
				"class": clsx(`${colorPresetsPrefixCls.value}-color`, {
					[`${colorPresetsPrefixCls.value}-color-checked`]: presetColor.toCssString() === props.value?.toCssString(),
					[`${colorPresetsPrefixCls.value}-color-bright`]: isBright(presetColor, token.value.colorBgElevated)
				})
			}, { onClick: () => handleClick(colorInst) }), null);
		}) : createVNode("span", { "class": `${colorPresetsPrefixCls.value}-empty` }, [locale?.value?.presetEmpty])])
	})));
	return () => createVNode("div", { "class": colorPresetsPrefixCls.value }, [createVNode(collapse_default, {
		"defaultActiveKey": activeKeys.value,
		"ghost": true,
		"items": items.value
	}, null)]);
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		presets: {
			type: Array,
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
	name: "ColorPresets",
	inheritAttrs: false
});

//#endregion
export { ColorPresets_default as default, isBright };