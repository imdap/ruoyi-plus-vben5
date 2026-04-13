import { AggregationColor } from "../../color.js";
import { getGradientPercentColor } from "../../util.js";
import { GradientColorSlider } from "../ColorSlider.js";
import { computed, createVNode, defineComponent, shallowRef, watch } from "vue";

//#region src/color-picker/components/PanelPicker/GradientColorBar.tsx
function sortColors(colors) {
	return [...colors].sort((a, b) => a.percent - b.percent);
}
/**
* GradientColorBar will auto show when the mode is `gradient`.
*/
var GradientColorBar_default = /* @__PURE__ */ defineComponent((props) => {
	const isGradient = computed(() => props.mode === "gradient");
	const colorList = computed(() => props.colors.map((info) => ({
		percent: info.percent,
		color: info.color.toRgbString()
	})));
	const values = computed(() => colorList.value.map((info) => info.percent));
	const colorsRef = shallowRef(colorList.value);
	watch(colorList, (val) => {
		colorsRef.value = val;
	}, { deep: true });
	const onDragStart = ({ rawValues, draggingIndex, draggingValue }) => {
		if (rawValues.length > colorList.value.length) {
			const newPointColor = getGradientPercentColor(colorList.value, draggingValue);
			const nextColors = [...colorList.value];
			nextColors.splice(draggingIndex, 0, {
				percent: draggingValue,
				color: newPointColor
			});
			colorsRef.value = nextColors;
		} else colorsRef.value = colorList.value;
		props.onGradientDragging(true);
		props.onChange?.(new AggregationColor(sortColors(colorsRef.value)), true);
	};
	const onDragChange = ({ deleteIndex, draggingIndex, draggingValue }) => {
		let nextColors = [...colorsRef.value];
		if (deleteIndex !== -1) nextColors.splice(deleteIndex, 1);
		else {
			nextColors[draggingIndex] = {
				...nextColors[draggingIndex],
				percent: draggingValue
			};
			nextColors = sortColors(nextColors);
		}
		props.onChange?.(new AggregationColor(nextColors), true);
	};
	const onKeyDelete = (index) => {
		const nextColors = [...colorList.value];
		nextColors.splice(index, 1);
		const nextColor = new AggregationColor(nextColors);
		props.onChange?.(nextColor);
		props.onChangeComplete?.(nextColor);
	};
	const onInternalChangeComplete = (nextValues) => {
		props.onChangeComplete?.(new AggregationColor(colorList.value));
		if (props.activeIndex >= nextValues.length) props.onActive(nextValues.length - 1);
		props.onGradientDragging(false);
	};
	return () => {
		if (!isGradient.value) return null;
		return createVNode(GradientColorSlider, {
			"min": 0,
			"max": 100,
			"prefixCls": props.prefixCls,
			"className": `${props.prefixCls}-gradient-slider`,
			"colors": colorList.value,
			"color": null,
			"value": values.value,
			"range": true,
			"onChangeComplete": onInternalChangeComplete,
			"disabled": false,
			"type": "gradient",
			"activeIndex": props.activeIndex,
			"onActive": props.onActive,
			"onDragStart": onDragStart,
			"onDragChange": onDragChange,
			"onKeyDelete": onKeyDelete
		}, null);
	};
}, {
	props: {
		colors: {
			type: Array,
			required: true
		},
		prefixCls: {
			type: String,
			required: true
		},
		allowClear: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabledAlpha: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mode: {
			type: String,
			required: true
		},
		onModeChange: {
			type: Function,
			required: true
		},
		modeOptions: {
			type: Array,
			required: true
		},
		value: {
			type: Object,
			required: true
		},
		onChange: {
			type: Function,
			required: false
		},
		onChangeComplete: {
			type: Function,
			required: false
		},
		format: { required: false },
		onFormatChange: {
			type: Function,
			required: false
		},
		activeIndex: {
			type: Number,
			required: true
		},
		onActive: {
			type: Function,
			required: true
		},
		gradientDragging: {
			type: Boolean,
			required: true
		},
		onGradientDragging: {
			type: Function,
			required: true
		},
		onClear: {
			type: Function,
			required: false
		},
		disabledFormat: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "GradientColorBar",
	inheritAttrs: false
});

//#endregion
export { GradientColorBar_default as default };