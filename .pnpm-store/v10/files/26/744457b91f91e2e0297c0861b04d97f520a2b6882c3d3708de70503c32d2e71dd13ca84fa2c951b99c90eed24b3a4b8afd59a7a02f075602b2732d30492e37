Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_portal = require("@v-c/portal");
_v_c_portal = require_rolldown_runtime.__toESM(_v_c_portal);
var Placeholder = /* @__PURE__ */ (0, vue.defineComponent)((props, { expose, attrs }) => {
	expose({
		getDom: () => {
			return props?.domRef.value ?? props?.fallbackDOM?.();
		},
		__$el: (0, vue.computed)(() => props?.domRef?.value ?? props?.fallbackDOM?.())
	});
	return () => {
		const { open, autoLock, getContainer } = props;
		return (0, vue.createVNode)(_v_c_portal.default, {
			"open": open,
			"autoLock": autoLock,
			"getContainer": getContainer
		}, { default: () => [(0, vue.createVNode)("div", (0, vue.mergeProps)({ "ref": props.domRef }, attrs), null)] });
	};
}, {
	props: {
		domRef: {
			type: Object,
			required: true,
			default: void 0
		},
		fallbackDOM: {
			type: Function,
			required: true,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoLock: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		}
	},
	name: "TourPlaceholder",
	inheritAttrs: false
});
var Placeholder_default = Placeholder;
exports.default = Placeholder_default;
