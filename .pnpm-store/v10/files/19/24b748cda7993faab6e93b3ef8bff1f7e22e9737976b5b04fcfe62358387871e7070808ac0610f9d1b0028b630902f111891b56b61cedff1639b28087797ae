import { useInjectSlider } from "../context.js";
import Dot_default from "./Dot.js";
import { computed, createVNode, defineComponent } from "vue";
var Steps_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const sliderContext = useInjectSlider();
	const stepDots = computed(() => {
		const { max, min, step } = sliderContext.value;
		const { marks, dots } = props;
		const dotSet = /* @__PURE__ */ new Set();
		marks.forEach((mark) => {
			dotSet.add(mark.value);
		});
		if (dots && step !== null) {
			let current = min;
			while (current <= max) {
				dotSet.add(current);
				current += step;
			}
		}
		return Array.from(dotSet);
	});
	return () => {
		const { prefixCls, activeStyle } = props;
		return createVNode("div", { "class": `${prefixCls}-step` }, [stepDots.value.map((dotValue) => createVNode(Dot_default, {
			"prefixCls": prefixCls,
			"key": dotValue,
			"value": dotValue,
			"style": { ...attrs.style },
			"activeStyle": activeStyle
		}, null))]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	marks: {
		type: Array,
		required: true,
		default: void 0
	},
	dots: {
		type: Boolean,
		required: false,
		default: void 0
	},
	style: {
		type: [Object, Function],
		required: false,
		default: void 0
	},
	activeStyle: {
		type: [Object, Function],
		required: false,
		default: void 0
	}
} });
export { Steps_default as default };
