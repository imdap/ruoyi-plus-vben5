Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_DefaultPanel = require("./DefaultPanel.cjs");
let vue = require("vue");
var TourStep = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	return () => {
		const { current, renderPanel } = props;
		return (0, vue.createVNode)(vue.Fragment, null, [typeof renderPanel === "function" ? renderPanel({
			...props,
			...attrs
		}, current) : (0, vue.createVNode)(require_DefaultPanel.default, props, null)]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		total: {
			type: Number,
			required: false,
			default: void 0
		},
		current: {
			type: Number,
			required: false,
			default: void 0
		},
		onClose: {
			type: Function,
			required: false,
			default: void 0
		},
		onFinish: {
			type: Function,
			required: false,
			default: void 0
		},
		renderPanel: {
			type: Function,
			required: false,
			default: void 0
		},
		onPrev: {
			type: Function,
			required: false,
			default: void 0
		},
		onNext: {
			type: Function,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		target: {
			type: [
				Object,
				null,
				Function
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		title: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: true,
			default: void 0
		},
		description: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		mask: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		scrollIntoViewOptions: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		closeIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		closable: {
			type: [
				Boolean,
				Object,
				null
			],
			required: false,
			default: void 0
		}
	},
	name: "TourStep",
	inheritAttrs: false
});
var TourStep_default = TourStep;
exports.default = TourStep_default;
