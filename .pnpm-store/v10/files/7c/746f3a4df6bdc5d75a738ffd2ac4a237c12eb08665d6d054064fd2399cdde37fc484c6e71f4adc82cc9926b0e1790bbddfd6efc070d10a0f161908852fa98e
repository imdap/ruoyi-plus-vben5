import useColorDrag_default from "../hooks/useColorDrag.js";
import { calcOffset, calculateColor } from "../util.js";
import Handler_default from "./Handler.js";
import Palette_default from "./Palette.js";
import Transform_default from "./Transform.js";
import { createVNode, defineComponent, ref } from "vue";
import useEvent from "@v-c/util/dist/hooks/useEvent";
var Picker_default = /* @__PURE__ */ defineComponent({
	name: "Picker",
	props: {
		color: {
			type: Object,
			required: true
		},
		prefixCls: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		onChange: Function,
		onChangeComplete: Function
	},
	setup(props, { emit }) {
		const pickerRef = ref();
		const transformRef = ref();
		const colorRef = ref(props.color);
		const onDragChange = useEvent((offsetValue) => {
			const calcColor = calculateColor({
				offset: offsetValue,
				targetRef: transformRef,
				containerRef: pickerRef,
				color: props.color
			});
			colorRef.value = calcColor;
			emit("change", calcColor);
		});
		const [offset, dragStartHandle] = useColorDrag_default({
			color: props.color,
			containerRef: pickerRef,
			targetRef: transformRef,
			calculate: () => calcOffset(props.color),
			onDragChange,
			onDragChangeComplete: () => emit("changeComplete", colorRef.value),
			disabledDrag: props.disabled
		});
		return () => {
			const { color, prefixCls } = props;
			return createVNode("div", {
				"ref": pickerRef,
				"class": `${prefixCls}-select`,
				"onMousedown": dragStartHandle,
				"onTouchstart": dragStartHandle
			}, [createVNode(Palette_default, { "prefixCls": prefixCls }, { default: () => [createVNode(Transform_default, {
				"x": offset.value.x,
				"y": offset.value.y,
				"ref": transformRef
			}, { default: () => [createVNode(Handler_default, {
				"color": color.toRgbString(),
				"prefixCls": prefixCls
			}, null)] }), createVNode("div", {
				"class": `${prefixCls}-saturation`,
				"style": {
					backgroundColor: `hsl(${color.toHsb().h},100%, 50%)`,
					backgroundImage: "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
				}
			}, null)] })]);
		};
	}
});
export { Picker_default as default };
