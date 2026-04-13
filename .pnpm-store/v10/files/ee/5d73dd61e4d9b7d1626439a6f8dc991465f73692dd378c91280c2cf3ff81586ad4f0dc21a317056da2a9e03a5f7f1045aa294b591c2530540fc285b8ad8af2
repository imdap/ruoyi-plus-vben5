Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_useMutateObserver = require("./useMutateObserver.cjs");
const require_Wrapper = require("./Wrapper.cjs");
let vue = require("vue");
let _v_c_util_dist_Dom_findDOMNode = require("@v-c/util/dist/Dom/findDOMNode");
_v_c_util_dist_Dom_findDOMNode = require_rolldown_runtime.__toESM(_v_c_util_dist_Dom_findDOMNode);
let _v_c_util_dist_vnode = require("@v-c/util/dist/vnode");
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
var MutateObserver_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "VCMutateObserver",
	props: {
		onMutate: {
			type: Function,
			default: () => {}
		},
		options: {
			type: Object,
			default: void 0
		}
	},
	setup(props, { slots }) {
		const internalOptions = (0, vue.toRef)(props, "options");
		const elementRef = (0, vue.ref)();
		const wrapperRef = (0, vue.ref)();
		const target = (0, vue.shallowRef)(null);
		const callback = (...args) => props.onMutate(...args);
		const bindRef = (e) => elementRef.value = e;
		const getDom = () => {
			const dom = (0, _v_c_util_dist_Dom_findDOMNode.default)(elementRef) || (elementRef.value && typeof elementRef.value === "object" ? (0, _v_c_util_dist_Dom_findDOMNode.default)(elementRef.value.nativeElement) : null) || wrapperRef.value && (0, _v_c_util_dist_Dom_findDOMNode.default)(wrapperRef.value);
			if (dom && dom.nodeType === 3 && dom.nextElementSibling) return dom.nextElementSibling;
			return dom;
		};
		require_useMutateObserver.default(target, callback, internalOptions);
		return () => {
			let _slot;
			const children = slots?.default?.();
			if (!children) {
				if (process.env.NODE_ENV !== "production") console.error("MutationObserver need children props");
				return null;
			}
			(0, vue.nextTick)(() => {
				target.value = getDom();
			});
			return (0, vue.createVNode)(require_Wrapper.default, { "ref": wrapperRef }, _isSlot(_slot = (0, _v_c_util_dist_vnode.cloneElement)(children, { ref: bindRef }, true, true)) ? _slot : { default: () => [_slot] });
		};
	}
});
exports.default = MutateObserver_default;
