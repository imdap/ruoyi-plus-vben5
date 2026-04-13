import { Color } from "./color.js";
import ColorBlock_default from "./components/ColorBlock.js";
import { ColorPickerPrefixCls, defaultColor, formatColorValue } from "./util.js";
import Picker_default from "./components/Picker.js";
import useColorState_default from "./hooks/useColorState.js";
import useComponent from "./hooks/useComponent.js";
import { Fragment, computed, createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { toPropsRefs } from "@v-c/util/dist/props-util";
var HUE_COLORS = [
	{
		color: "rgb(255, 0, 0)",
		percent: 0
	},
	{
		color: "rgb(255, 255, 0)",
		percent: 17
	},
	{
		color: "rgb(0, 255, 0)",
		percent: 33
	},
	{
		color: "rgb(0, 255, 255)",
		percent: 50
	},
	{
		color: "rgb(0, 0, 255)",
		percent: 67
	},
	{
		color: "rgb(255, 0, 255)",
		percent: 83
	},
	{
		color: "rgb(255, 0, 0)",
		percent: 100
	}
];
function colorPickerProps() {
	return {
		value: { type: [
			String,
			Number,
			Object
		] },
		defaultValue: { type: [
			String,
			Number,
			Object
		] },
		valueFormat: { type: [String, Function] },
		prefixCls: { type: String },
		onChange: { type: Function },
		onChangeComplete: { type: Function },
		disabledAlpha: Boolean,
		disabled: Boolean,
		panelRender: Function,
		components: Object
	};
}
var ColorPicker_default = /* @__PURE__ */ defineComponent({
	props: { ...colorPickerProps() },
	emits: [
		"change",
		"changeComplete",
		"update:value"
	],
	setup(props, { attrs, emit }) {
		const { value } = toPropsRefs(props, "value");
		const [colorValue, setColorValue] = useColorState_default(props.defaultValue || defaultColor, value);
		const alphaColor = computed(() => colorValue.value.setA(1).toRgbString());
		const formatOutput = (nextColor) => formatColorValue(nextColor, props.valueFormat);
		const handleChange = (data, type) => {
			if (!value.value) setColorValue(data);
			const formattedValue = formatOutput(data);
			emit("change", formattedValue, type);
			emit("update:value", formattedValue);
		};
		const getHueColor = (hue) => new Color(colorValue.value.setHue(hue));
		const getAlphaColor = (alpha) => new Color(colorValue.value.setA(alpha / 100));
		const onHueChange = (hue) => {
			handleChange(getHueColor(hue), {
				type: "hue",
				value: hue
			});
		};
		const onAlphaChange = (alpha) => {
			handleChange(getAlphaColor(alpha), {
				type: "alpha",
				value: alpha
			});
		};
		const triggerChangeComplete = (nextColor, info) => {
			emit("changeComplete", formatOutput(nextColor), info);
		};
		const onHueChangeComplete = (hue) => {
			triggerChangeComplete(getHueColor(hue), {
				type: "hue",
				value: hue
			});
		};
		const onAlphaChangeComplete = (alpha) => {
			triggerChangeComplete(getAlphaColor(alpha), {
				type: "alpha",
				value: alpha
			});
		};
		const onPickerChangeComplete = (nextColor) => {
			triggerChangeComplete(nextColor);
		};
		return () => {
			const { prefixCls = ColorPickerPrefixCls, panelRender, disabledAlpha = false, disabled = false } = props;
			const [Slider] = useComponent(props.components);
			const mergeCls = classNames(`${prefixCls}-panel`, [attrs.class], { [`${prefixCls}-panel-disabled`]: disabled });
			const sharedSliderProps = {
				prefixCls,
				disabled,
				color: colorValue.value
			};
			const defaultPanel = createVNode(Fragment, null, [createVNode(Picker_default, mergeProps({ "onChange": handleChange }, sharedSliderProps, { "onChangeComplete": onPickerChangeComplete }), null), createVNode("div", { "class": `${prefixCls}-slider-container` }, [createVNode("div", { "class": classNames(`${prefixCls}-slider-group`, { [`${prefixCls}-slider-group-disabled-alpha`]: disabledAlpha }) }, [createVNode(Slider, mergeProps(sharedSliderProps, {
				"type": "hue",
				"colors": HUE_COLORS,
				"min": 0,
				"max": 359,
				"value": colorValue.value.getHue(),
				"onChange": onHueChange,
				"onChangeComplete": onHueChangeComplete
			}), null), !disabledAlpha && createVNode(Slider, mergeProps(sharedSliderProps, {
				"type": "alpha",
				"colors": [{
					percent: 0,
					color: "rgba(255, 0, 4, 0)"
				}, {
					percent: 100,
					color: alphaColor.value
				}],
				"min": 0,
				"max": 100,
				"value": colorValue.value.a * 100,
				"onChange": onAlphaChange,
				"onChangeComplete": onAlphaChangeComplete
			}), null)]), createVNode(ColorBlock_default, {
				"color": colorValue.value.toRgbString(),
				"prefixCls": prefixCls
			}, null)])]);
			return createVNode("div", {
				"class": mergeCls,
				"style": { ...attrs.style }
			}, [typeof panelRender === "function" ? panelRender(defaultPanel) : defaultPanel]);
		};
	},
	name: "ColorPicker"
});
export { ColorPicker_default as default };
