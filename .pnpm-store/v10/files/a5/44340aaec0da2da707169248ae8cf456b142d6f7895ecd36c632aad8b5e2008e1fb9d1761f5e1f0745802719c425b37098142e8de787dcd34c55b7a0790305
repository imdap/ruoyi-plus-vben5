import { getGradientPercentColor } from "../util.js";
import { useSliderInternalContextProvider } from "../../slider/Context.js";
import slider_default from "../../slider/index.js";
import { cloneVNode, computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";
import { UnstableProvider } from "@v-c/slider";

//#region src/color-picker/components/ColorSlider.tsx
const GradientColorSlider = /* @__PURE__ */ defineComponent((props) => {
	const linearCss = computed(() => {
		return `linear-gradient(90deg, ${props.colors.map((c) => `${c.color} ${c.percent}%`).join(", ")})`;
	});
	const pointColor = computed(() => {
		if (!props.color || !props.type) return null;
		if (props.type === "alpha") return props.color.toRgbString();
		if (props.type === "gradient") return null;
		return `hsl(${props.color.toHsb().h}, 100%, 50%)`;
	});
	const handleRender = ({ node, index, value }) => {
		const nodeProps = node?.props || {};
		const mergedStyle = { ...nodeProps.style };
		if (props.type === "gradient") mergedStyle.background = getGradientPercentColor(props.colors, value);
		return cloneVNode(node, {
			...nodeProps,
			style: mergedStyle,
			class: clsx(nodeProps.class, { [`${props.prefixCls}-slider-handle-active`]: props.activeIndex === index }),
			onFocus: (e) => {
				props.onActive?.(index);
				nodeProps.onFocus?.(e);
			},
			onKeydown: (e) => {
				if ((e.key === "Delete" || e.key === "Backspace") && props.onKeyDelete) props.onKeyDelete(index);
				nodeProps.onKeydown?.(e);
			}
		});
	};
	useSliderInternalContextProvider({ handleRender });
	return () => {
		const { prefixCls, range = false, className, onDragStart, onDragChange, value, onChange, onChangeComplete, ...restProps } = props;
		const { activeIndex: _activeIndex, onActive: _onActive, onKeyDelete: _onKeyDelete, colors: _colors, color: _color, type: _type, ...sliderRestProps } = restProps;
		return createVNode(UnstableProvider, { "value": {
			onDragStart,
			onDragChange
		} }, { default: () => [createVNode(slider_default, mergeProps(sliderRestProps, {
			"class": clsx(className, `${prefixCls}-slider`),
			"tooltip": { open: false },
			"range": range ? {
				editable: true,
				minCount: 2
			} : false,
			"track": false,
			"styles": {
				rail: { background: linearCss.value },
				handle: pointColor.value ? { background: pointColor.value } : {}
			},
			"classes": {
				rail: `${prefixCls}-slider-rail`,
				handle: `${prefixCls}-slider-handle`
			},
			"value": value,
			"onChange": (v) => onChange?.(Array.isArray(v) ? v : [v]),
			"onChangeComplete": (v) => onChangeComplete(Array.isArray(v) ? v : [v])
		}), null)] });
	};
}, {
	props: {
		value: {
			type: Array,
			required: true
		},
		onChange: {
			type: Function,
			required: false
		},
		onChangeComplete: {
			type: Function,
			required: true
		},
		range: {
			type: Boolean,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false
		},
		activeIndex: {
			type: Number,
			required: false
		},
		onActive: {
			type: Function,
			required: false
		},
		type: { required: true },
		onDragStart: {
			type: Function,
			required: false
		},
		onDragChange: {
			type: Function,
			required: false
		},
		onKeyDelete: {
			type: Function,
			required: false
		},
		color: { required: true },
		prefixCls: {
			type: String,
			required: true
		},
		colors: {
			type: Array,
			required: true
		},
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		disabled: {
			type: Boolean,
			required: true
		}
	},
	name: "GradientColorSlider",
	inheritAttrs: false
});
const SingleColorSlider = /* @__PURE__ */ defineComponent((props) => {
	const onChange = (v) => props.onChange?.(v[0]);
	const onChangeComplete = (v) => props.onChangeComplete?.(v[0]);
	return () => {
		const { value, ...restProps } = props;
		return createVNode(GradientColorSlider, mergeProps(omit(restProps, ["onChange", "onChangeComplete"]), {
			"value": [value],
			"onChange": onChange,
			"onChangeComplete": onChangeComplete
		}), null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		colors: {
			type: Array,
			required: true
		},
		min: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		disabled: {
			type: Boolean,
			required: true
		},
		onChange: {
			type: Function,
			required: true
		},
		onChangeComplete: {
			type: Function,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		color: {
			type: Object,
			required: true
		}
	},
	name: "ColorSlider",
	inheritAttrs: false
});
var ColorSlider_default = SingleColorSlider;

//#endregion
export { GradientColorSlider, ColorSlider_default as default };