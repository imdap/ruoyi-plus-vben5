Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
var PanelContent = /* @__PURE__ */ (0, vue.defineComponent)({
	props: {
		id: {
			type: String,
			required: false,
			default: void 0
		},
		header: {
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
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		headerClass: {
			type: String,
			required: false,
			default: void 0
		},
		showArrow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		class: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		isActive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		openMotion: {
			type: Object,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		accordion: {
			type: Boolean,
			required: false,
			default: void 0
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		extra: {
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
		onItemClick: {
			type: Function,
			required: false,
			default: void 0
		},
		expandIcon: {
			type: Function,
			required: false,
			default: void 0
		},
		panelKey: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		role: {
			type: String,
			required: false,
			default: void 0
		},
		collapsible: {
			type: String,
			required: false,
			default: void 0
		},
		children: {
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
		}
	},
	name: "PanelContent",
	inheritAttrs: false,
	setup(props, { slots }) {
		const rendered = (0, vue.ref)(props.isActive || props.forceRender);
		(0, vue.watch)(() => [props.isActive, props.forceRender], () => {
			if (props.isActive || props.forceRender) rendered.value = true;
		});
		return () => {
			if (!rendered.value) return null;
			const { prefixCls, isActive, style, role, class: className, classNames: customizeClassNames, styles } = props;
			return (0, vue.createVNode)("div", {
				"class": (0, _v_c_util.classNames)(`${prefixCls}-panel`, {
					[`${prefixCls}-panel-active`]: isActive,
					[`${prefixCls}-panel-inactive`]: !isActive
				}, className),
				"style": style,
				"role": role
			}, [(0, vue.createVNode)("div", {
				"class": (0, _v_c_util.classNames)(`${prefixCls}-body`, customizeClassNames?.body),
				"style": styles?.body
			}, [slots.default?.()])]);
		};
	}
});
var PanelContent_default = PanelContent;
exports.default = PanelContent_default;
