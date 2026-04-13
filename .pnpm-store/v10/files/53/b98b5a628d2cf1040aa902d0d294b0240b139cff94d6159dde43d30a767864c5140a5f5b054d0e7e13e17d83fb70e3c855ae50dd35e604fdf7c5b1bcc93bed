Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_context = require("../context.cjs");
const require_util = require("../util.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
var Mark = /* @__PURE__ */ (0, vue.defineComponent)((props, { slots }) => {
	const sliderContext = require_context.useInjectSlider();
	return () => {
		const { prefixCls, value } = props;
		const { min, max, direction, includedStart, includedEnd, included } = sliderContext.value;
		const textCls = `${prefixCls}-text`;
		const positionStyle = require_util.getDirectionStyle(direction, value, min, max);
		return (0, vue.createVNode)("span", {
			"class": (0, _v_c_util.classNames)(textCls, { [`${textCls}-active`]: included && includedStart <= value && value <= includedEnd }),
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
var Mark_default = Mark;
exports.default = Mark_default;
