import { useInjectSlider } from "../context.js";
import { getDirectionStyle } from "../util.js";
import { createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";
var Mark_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const sliderContext = useInjectSlider();
	return () => {
		const { prefixCls, value } = props;
		const { min, max, direction, includedStart, includedEnd, included } = sliderContext.value;
		const textCls = `${prefixCls}-text`;
		const positionStyle = getDirectionStyle(direction, value, min, max);
		return createVNode("span", {
			"class": classNames(textCls, { [`${textCls}-active`]: included && includedStart <= value && value <= includedEnd }),
			"style": {
				...positionStyle,
				...props.style || {}
			},
			"onMousedown": (e) => {
				e.stopPropagation();
			},
			"onClick": () => {
				props?.onClick?.(value);
			}
		}, [slots.default?.()]);
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
		type: Object,
		required: false,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	}
} });
export { Mark_default as default };
