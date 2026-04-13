Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_Collection = require("../Collection.cjs");
const require_useResizeObserver = require("../useResizeObserver.cjs");
const require_DomWrapper = require("./DomWrapper.cjs");
let vue = require("vue");
let _v_c_util_dist_props_util = require("@v-c/util/dist/props-util");
let _v_c_util_dist_Dom_findDOMNode = require("@v-c/util/dist/Dom/findDOMNode");
_v_c_util_dist_Dom_findDOMNode = require_rolldown_runtime.__toESM(_v_c_util_dist_Dom_findDOMNode);
var SingleObserver = /* @__PURE__ */ (0, vue.defineComponent)({
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
	name: "SingleObserver",
	inheritAttrs: false,
	setup(props, { expose, slots }) {
		const wrapperRef = (0, vue.shallowRef)();
		const getDom = (el) => {
			const dom = (0, _v_c_util_dist_Dom_findDOMNode.default)(el);
			if (dom && (dom.nodeType === 3 || dom.nodeType === 8) && dom.nextElementSibling) return dom.nextElementSibling;
			return dom;
		};
		const setWrapperRef = (el) => {
			let _wrapper = el;
			if (el?.elementEl && typeof el.elementEl === "object") _wrapper = el.elementEl;
			else if (el?.__$el && typeof el.__$el === "object") _wrapper = el.__$el;
			wrapperRef.value = getDom(_wrapper);
		};
		const onCollectionResize = (0, vue.inject)(require_Collection.CollectionContext, () => {});
		require_useResizeObserver.default((0, vue.computed)(() => !props.disabled), wrapperRef, (...args) => props?.onResize?.(...args), (size, element) => {
			onCollectionResize?.(size, element, props.data);
		});
		expose({ getDom });
		return () => {
			const children = (0, _v_c_util_dist_props_util.filterEmpty)(slots?.default?.());
			if (children.length === 1 && (0, vue.isVNode)(children[0])) return (0, vue.createVNode)(children[0], { ref: setWrapperRef });
			return (0, vue.createVNode)(require_DomWrapper.default, { "ref": wrapperRef }, { default: () => [slots.default?.()] });
		};
	}
});
var SingleObserver_default = SingleObserver;
exports.default = SingleObserver_default;
