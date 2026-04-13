import { Color } from "../color.js";
import useColorDrag_default from "../hooks/useColorDrag.js";
import { calcOffset, calculateColor } from "../util.js";
import Handler_default from "./Handler.js";
import Palette_default from "./Palette.js";
import Transform_default from "./Transform.js";
import Gradient_default from "./Gradient.js";
import { computed, createVNode, defineComponent, ref } from "vue";
import { classNames } from "@v-c/util";
import useEvent from "@v-c/util/dist/hooks/useEvent";
var Slider_default = /* @__PURE__ */ defineComponent({
	name: "Slider",
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
			default: false
		},
		onChange: Function,
		onChangeComplete: Function,
		type: {
			type: String,
			required: true
		},
		color: {
			type: Object,
			required: true
		}
	},
	setup(props, { emit }) {
		const sliderRef = ref();
		const transformRef = ref();
		const colorRef = ref(props.color);
		const getValue = (c) => {
			return props.type === "hue" ? c.getHue() : c.a * 100;
		};
		const onDragChange = useEvent((offsetValue) => {
			const calcColor = calculateColor({
				offset: offsetValue,
				targetRef: transformRef,
				containerRef: sliderRef,
				color: props.color,
				type: props.type
			});
			colorRef.value = calcColor;
			emit("change", getValue(calcColor));
		});
		const [offset, dragStartHandle] = useColorDrag_default({
			color: props.color,
			targetRef: transformRef,
			containerRef: sliderRef,
			calculate: () => calcOffset(props.color, props.type),
			onDragChange,
			onDragChangeComplete() {
				emit("changeComplete", getValue(colorRef.value));
			},
			direction: "x",
			disabledDrag: props.disabled
		});
		const handleColor = computed(() => {
			if (props.type === "hue") {
				const hsb = props.color.toHsb();
				hsb.s = 1;
				hsb.b = 1;
				hsb.a = 1;
				return new Color(hsb);
			}
			return props.color;
		});
		return () => {
			const { prefixCls, colors, type } = props;
			const gradientList = colors.map((info) => `${info.color} ${info.percent}%`);
			return createVNode("div", {
				"ref": sliderRef,
				"class": classNames(`${prefixCls}-slider`, `${prefixCls}-slider-${type}`),
				"onMousedown": dragStartHandle,
				"onTouchstart": dragStartHandle
			}, [createVNode(Palette_default, { "prefixCls": prefixCls }, { default: () => [createVNode(Transform_default, {
				"x": offset.value.x,
				"y": offset.value.y,
				"ref": transformRef
			}, { default: () => [createVNode(Handler_default, {
				"size": "small",
				"color": handleColor.value.toHexString(),
				"prefixCls": prefixCls
			}, null)] }), createVNode(Gradient_default, {
				"colors": gradientList,
				"type": type,
				"prefixCls": prefixCls
			}, null)] })]);
		};
	}
});
export { Slider_default as default };
