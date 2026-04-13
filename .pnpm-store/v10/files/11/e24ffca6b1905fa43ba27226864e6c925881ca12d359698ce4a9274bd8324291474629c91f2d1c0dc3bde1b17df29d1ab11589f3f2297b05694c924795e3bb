Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_context = require("../context.cjs");
const require_Dot = require("./Dot.cjs");
let vue = require("vue");
var Steps = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const sliderContext = require_context.useInjectSlider();
	const stepDots = (0, vue.computed)(() => {
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
		return (0, vue.createVNode)("div", { "class": `${prefixCls}-step` }, [stepDots.value.map((dotValue) => (0, vue.createVNode)(require_Dot.default, {
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
var Steps_default = Steps;
exports.default = Steps_default;
