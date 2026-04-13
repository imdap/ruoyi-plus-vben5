Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_context = require("../context.cjs");
const require_util = require("../util.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
var Dot = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const sliderContext = require_context.useInjectSlider();
	return () => {
		const { min, max, direction, included, includedStart, includedEnd } = sliderContext.value;
		const { prefixCls, value, activeStyle } = props;
		const dotClassName = `${prefixCls}-dot`;
		const active = included && includedStart <= value && value <= includedEnd;
		let mergedStyle = { ...require_util.getDirectionStyle(direction, value, min, max) };
		if (active) mergedStyle = {
			...mergedStyle,
			...typeof activeStyle === "function" ? activeStyle(value) : activeStyle
		};
		return (0, vue.createVNode)("span", {
			"class": (0, _v_c_util.classNames)(dotClassName, { [`${dotClassName}-active`]: active }),
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
var Dot_default = Dot;
exports.default = Dot_default;
