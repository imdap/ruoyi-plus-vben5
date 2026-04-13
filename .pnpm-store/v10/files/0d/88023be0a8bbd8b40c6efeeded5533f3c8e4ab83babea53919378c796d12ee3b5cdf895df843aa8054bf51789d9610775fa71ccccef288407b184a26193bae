Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_pickAttrs = require("@v-c/util/dist/pickAttrs");
_v_c_util_dist_pickAttrs = require_rolldown_runtime.__toESM(_v_c_util_dist_pickAttrs);
var DefaultPanel = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	return () => {
		const { prefixCls, current, total, title, description, onClose, onPrev, onNext, onFinish, closable, classNames: tourClassNames, styles } = props;
		const ariaProps = (0, _v_c_util_dist_pickAttrs.default)(closable || {}, true);
		const closeIcon = closable?.closeIcon ?? (0, vue.createVNode)("span", { "class": `${prefixCls}-close-x` }, [(0, vue.createTextVNode)("×")]);
		const mergedClosable = !!closable;
		const className = attrs.class;
		return (0, vue.createVNode)("div", { "class": (0, _v_c_util.clsx)(`${prefixCls}-panel`, className) }, [(0, vue.createVNode)("div", {
			"class": (0, _v_c_util.clsx)(`${prefixCls}-section`, tourClassNames?.section),
			"style": styles?.section
		}, [
			mergedClosable && (0, vue.createVNode)("button", (0, vue.mergeProps)({
				"type": "button",
				"onClick": onClose,
				"aria-label": "Close"
			}, ariaProps, { "class": `${prefixCls}-close` }), [closeIcon]),
			(0, vue.createVNode)("div", {
				"class": (0, _v_c_util.clsx)(`${prefixCls}-header`, tourClassNames?.header),
				"style": styles?.header
			}, [(0, vue.createVNode)("div", {
				"class": (0, _v_c_util.clsx)(`${prefixCls}-title`, tourClassNames?.title),
				"style": styles?.title
			}, [title])]),
			(0, vue.createVNode)("div", {
				"class": (0, _v_c_util.clsx)(`${prefixCls}-description`, tourClassNames?.description),
				"style": styles?.description
			}, [description]),
			(0, vue.createVNode)("div", {
				"class": (0, _v_c_util.clsx)(`${prefixCls}-footer`, tourClassNames?.footer),
				"style": styles?.footer
			}, [(0, vue.createVNode)("div", { "class": `${prefixCls}-sliders` }, [total > 1 ? [...Array.from({ length: total }).keys()].map((item, index) => {
				return (0, vue.createVNode)("span", {
					"key": item,
					"class": index === current ? "active" : ""
				}, null);
			}) : null]), (0, vue.createVNode)("div", {
				"class": (0, _v_c_util.clsx)(`${prefixCls}-actions`, tourClassNames?.actions),
				"style": styles?.actions
			}, [current !== 0 ? (0, vue.createVNode)("button", {
				"class": `${prefixCls}-prev-btn`,
				"onClick": onPrev
			}, [(0, vue.createTextVNode)("Prev")]) : null, current === total - 1 ? (0, vue.createVNode)("button", {
				"class": `${prefixCls}-finish-btn`,
				"onClick": onFinish
			}, [(0, vue.createTextVNode)("Finish")]) : (0, vue.createVNode)("button", {
				"class": `${prefixCls}-next-btn`,
				"onClick": onNext
			}, [(0, vue.createTextVNode)("Next")])])])
		])]);
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
	name: "TourDefaultPanel",
	inheritAttrs: false
});
var DefaultPanel_default = DefaultPanel;
exports.default = DefaultPanel_default;
