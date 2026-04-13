import { Color } from "../color.js";
import { generateColor } from "../util.js";
import { createVNode, defineComponent } from "vue";
var Gradient_default = /* @__PURE__ */ defineComponent({
	props: {
		colors: {
			type: Array,
			required: true
		},
		direction: String,
		type: { type: String },
		prefixCls: String
	},
	inheritAttrs: false,
	setup(props, { slots }) {
		return () => {
			const { colors, direction = "to right", type, prefixCls } = props;
			const gradientColors = colors.map((color, idx) => {
				let result = generateColor(color);
				if (type === "alpha" && idx === colors.length - 1) result = new Color(result.setA(1));
				return result.toRgbString();
			}).join(",");
			return createVNode("div", {
				"class": `${prefixCls}-gradient`,
				"style": {
					position: "absolute",
					inset: 0,
					background: `linear-gradient(${direction}, ${gradientColors})`
				}
			}, [slots.default?.()]);
		};
	}
});
export { Gradient_default as default };
