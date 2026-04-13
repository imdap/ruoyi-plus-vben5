Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_Context = require("./Context.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_pickAttrs = require("@v-c/util/dist/pickAttrs");
_v_c_util_dist_pickAttrs = require_rolldown_runtime.__toESM(_v_c_util_dist_pickAttrs);
let _v_c_util_dist_props_util = require("@v-c/util/dist/props-util");
var StepIconSemanticKey = Symbol("StepIconSemanticContext");
function useStepIconSemanticContext() {
	return (0, vue.inject)(StepIconSemanticKey, (0, vue.ref)({}));
}
const StepIconSemanticContextProvider = /* @__PURE__ */ (0, vue.defineComponent)((props, { slots }) => {
	(0, vue.provide)(StepIconSemanticKey, (0, vue.computed)(() => props.value));
	return () => {
		return slots?.default?.();
	};
}, { props: { value: {
	type: Object,
	required: true,
	default: void 0
} } });
var StepIcon = /* @__PURE__ */ (0, vue.defineComponent)((_, { attrs, slots }) => {
	const stepsContext = require_Context.useStepsContext();
	const stepIconSemanticContext = useStepIconSemanticContext();
	return () => {
		const { className, style, restAttrs } = (0, _v_c_util_dist_props_util.getAttrStyleAndClass)(attrs);
		const { prefixCls, classNames = {}, styles = {} } = stepsContext.value ?? {};
		const { className: itemClassName, style: itemStyle } = stepIconSemanticContext.value ?? {};
		const itemCls = `${prefixCls}-item`;
		return (0, vue.createVNode)("div", (0, vue.mergeProps)((0, _v_c_util_dist_pickAttrs.default)(restAttrs, false), {
			"class": (0, _v_c_util.clsx)(`${itemCls}-icon`, classNames.itemIcon, itemClassName, className),
			"style": [
				styles.itemIcon,
				itemStyle,
				style
			]
		}), [slots?.default?.()]);
	};
}, {
	name: "StepIcon",
	inheritAttrs: false
});
var StepIcon_default = StepIcon;
exports.StepIconSemanticContextProvider = StepIconSemanticContextProvider;
exports.default = StepIcon_default;
exports.useStepIconSemanticContext = useStepIconSemanticContext;
