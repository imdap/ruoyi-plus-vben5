Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_PanelContent = require("./PanelContent.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_omit = require("@v-c/util/dist/omit");
_v_c_util_dist_omit = require_rolldown_runtime.__toESM(_v_c_util_dist_omit);
let _v_c_util_dist_KeyCode = require("@v-c/util/dist/KeyCode");
_v_c_util_dist_KeyCode = require_rolldown_runtime.__toESM(_v_c_util_dist_KeyCode);
var CollapsePanel = /* @__PURE__ */ (0, vue.defineComponent)({
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
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
	}, {
		showArrow: true,
		classNames: {},
		styles: {}
	}),
	name: "CollapsePanel",
	inheritAttrs: false,
	setup(props, { attrs, expose }) {
		const disabled = (0, vue.computed)(() => props.collapsible === "disabled");
		const refWrapper = (0, vue.ref)();
		const ifExtraExist = (0, vue.computed)(() => props.extra !== null && props.extra !== void 0 && typeof props.extra !== "boolean");
		const collapsibleProps = (0, vue.computed)(() => {
			return {
				"onClick": () => {
					props.onItemClick?.(props.panelKey);
				},
				"onKeydown": (e) => {
					if (e.key === "Enter" || e.keyCode === _v_c_util_dist_KeyCode.default.ENTER || e.which === _v_c_util_dist_KeyCode.default.ENTER) props.onItemClick?.(props.panelKey);
				},
				"role": props.accordion ? "tab" : "button",
				"aria-expanded": props.isActive,
				"aria-disabled": disabled.value,
				"tabIndex": disabled.value ? -1 : 0
			};
		});
		expose({ ref: refWrapper });
		return () => {
			const { extra, prefixCls, isActive, class: className, expandIcon, forceRender, headerClass, collapsible, accordion, openMotion = {}, onItemClick, classNames: customizeClassNames = {}, showArrow = true, destroyOnHidden, styles = {}, header, panelKey, children, ...restProps } = props;
			const collapsePanelClassNames = (0, _v_c_util.classNames)(`${prefixCls}-item`, {
				[`${prefixCls}-item-active`]: isActive,
				[`${prefixCls}-item-disabled`]: disabled.value
			}, className);
			const headerProps = {
				class: (0, _v_c_util.classNames)(headerClass, `${prefixCls}-header`, { [`${prefixCls}-collapsible-${collapsible}`]: !!collapsible }, customizeClassNames.header),
				style: styles.header,
				...["header", "icon"].includes(collapsible) ? {} : collapsibleProps.value
			};
			const iconNodeInner = typeof expandIcon === "function" ? expandIcon(props) : (0, vue.createVNode)("i", { "class": "arrow" }, null);
			const iconNode = iconNodeInner && (0, vue.createVNode)("div", (0, vue.mergeProps)({
				"class": (0, _v_c_util.classNames)(`${prefixCls}-expand-icon`, customizeClassNames?.icon),
				"style": styles?.icon
			}, ["header", "icon"].includes(collapsible) ? collapsibleProps.value : {}), [iconNodeInner]);
			const panelContent = (0, vue.withDirectives)((0, vue.createVNode)(require_PanelContent.default, {
				"prefixCls": prefixCls,
				"classNames": customizeClassNames,
				"styles": styles,
				"isActive": isActive,
				"forceRender": forceRender,
				"role": accordion ? "tabpanel" : void 0
			}, { default: () => children }), [[vue.vShow, isActive]]);
			const transitionProps = {
				appear: false,
				...openMotion
			};
			return (0, vue.createVNode)("div", (0, vue.mergeProps)({
				...restProps,
				...(0, _v_c_util_dist_omit.default)(attrs, ["class"])
			}, {
				"ref": refWrapper,
				"class": collapsePanelClassNames
			}), [(0, vue.createVNode)("div", headerProps, [
				showArrow && iconNode,
				(0, vue.createVNode)("span", (0, vue.mergeProps)({
					"class": (0, _v_c_util.classNames)(`${prefixCls}-title`, customizeClassNames?.title),
					"style": styles?.title
				}, collapsible === "header" ? collapsibleProps.value : {}), [header]),
				ifExtraExist.value && (0, vue.createVNode)("div", { "class": `${prefixCls}-extra` }, [extra])
			]), (0, vue.createVNode)(vue.Transition, transitionProps, { default: () => [!destroyOnHidden || isActive ? panelContent : null] })]);
		};
	}
});
var Panel_default = CollapsePanel;
exports.default = Panel_default;
