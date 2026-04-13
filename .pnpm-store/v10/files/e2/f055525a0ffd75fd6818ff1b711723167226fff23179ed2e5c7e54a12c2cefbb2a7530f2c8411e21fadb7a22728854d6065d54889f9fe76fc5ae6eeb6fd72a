Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
var Overlay = /* @__PURE__ */ (0, vue.defineComponent)((props) => {
	const overlayRef = (0, vue.shallowRef)();
	const setRef = (el) => {
		overlayRef.value = el;
	};
	return () => {
		const { overlay, arrow, prefixCls } = props;
		const overlayNode = typeof overlay === "function" ? overlay?.() : overlay;
		return (0, vue.createVNode)(vue.Fragment, null, [arrow && (0, vue.createVNode)("div", { "class": `${prefixCls}-arrow` }, null), (0, vue.createVNode)(overlayNode, { ref: setRef })]);
	};
}, { props: {
	overlay: {
		type: [
			Function,
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		],
		required: false,
		default: void 0
	},
	arrow: {
		type: Boolean,
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	}
} });
var Overlay_default = Overlay;
exports.default = Overlay_default;
