Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_Collection = require("./Collection.cjs");
const require_observerUtil = require("./utils/observerUtil.cjs");
const require_useResizeObserver = require("./useResizeObserver.cjs");
const require_index = require("./SingleObserver/index.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_props_util = require("@v-c/util/dist/props-util");
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
var INTERNAL_PREFIX_KEY = "vc-observer-key";
var ResizeObserver = /* @__PURE__ */ (0, vue.defineComponent)({
	props: {
		data: {
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onResize: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	setup(props, { slots }) {
		return () => {
			const childNodes = (0, _v_c_util_dist_props_util.filterEmpty)(slots.default?.() ?? []).filter(Boolean);
			if (process.env.NODE_ENV !== "production") {
				if (childNodes.length > 1) (0, _v_c_util.warning)(false, "Find more than one child node with `children` in ResizeObserver. Please use ResizeObserver.Collection instead.");
				else if (childNodes.length === 0) (0, _v_c_util.warning)(false, "`children` of ResizeObserver is empty. Nothing is in observe.");
			}
			return childNodes.map((child, index) => {
				const key = child?.key || `${INTERNAL_PREFIX_KEY}-${index}`;
				return (0, vue.createVNode)(require_index.default, (0, vue.mergeProps)(props, { "key": key }), _isSlot(child) ? child : { default: () => [child] });
			});
		};
	}
});
ResizeObserver.Collection = require_Collection.Collection;
var src_default = ResizeObserver;
exports._rs = require_observerUtil._rs;
exports.default = src_default;
exports.useResizeObserver = require_useResizeObserver.default;
