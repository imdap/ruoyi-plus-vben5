import { useInjectSlider } from "../context.js";
import { getDirectionStyle } from "../util.js";
import { createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";
var Dot_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const sliderContext = useInjectSlider();
	return () => {
		const { min, max, direction, included, includedStart, includedEnd } = sliderContext.value;
		const { prefixCls, value, activeStyle } = props;
		const dotClassName = `${prefixCls}-dot`;
		const active = included && includedStart <= value && value <= includedEnd;
		let mergedStyle = { ...getDirectionStyle(direction, value, min, max) };
		if (active) mergedStyle = {
			...mergedStyle,
			...typeof activeStyle === "function" ? activeStyle(value) : activeStyle
		};
		return createVNode("span", {
			"class": classNames(dotClassName, { [`${dotClassName}-active`]: active }),
			"style": {
				...mergedStyle,
				...attrs.style
			}
		}, null);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	value: {
		type: Number,
		required: true,
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
export { Dot_default as default };
