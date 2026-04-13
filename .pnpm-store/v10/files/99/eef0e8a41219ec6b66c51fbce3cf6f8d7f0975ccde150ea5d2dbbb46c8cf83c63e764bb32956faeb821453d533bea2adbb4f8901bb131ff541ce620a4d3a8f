Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_Mark = require("./Mark.cjs");
let vue = require("vue");
var Marks = /* @__PURE__ */ (0, vue.defineComponent)((props, { emit, slots }) => {
	return () => {
		const { prefixCls, marks = [] } = props;
		const markPrefixCls = `${prefixCls}-mark`;
		if (!marks.length) return null;
		return (0, vue.createVNode)("div", { "class": markPrefixCls }, [marks.map(({ value, style, label }) => (0, vue.createVNode)(require_Mark.default, {
			"key": value,
			"prefixCls": markPrefixCls,
			"style": style,
			"value": value,
			"onClick": () => emit("click", value)
		}, { default: () => [slots.mark?.({
			point: value,
			label
		}) || label] }))]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	marks: {
		type: Array,
		required: false,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	}
} });
var Marks_default = Marks;
exports.default = Marks_default;
