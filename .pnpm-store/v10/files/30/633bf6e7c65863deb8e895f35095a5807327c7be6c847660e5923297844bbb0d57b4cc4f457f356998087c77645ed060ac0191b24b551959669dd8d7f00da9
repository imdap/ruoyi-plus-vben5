import { getSlotPropsFnRun } from "../../_util/tools.js";
import { Looper } from "./Looper.js";
import { createVNode, defineComponent, isVNode, mergeDefaults, mergeProps } from "vue";

//#region src/spin/Indicator/index.tsx
const Indicator = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	return () => {
		const { prefixCls, percent } = props;
		const dotClassName = `${prefixCls}-dot`;
		const indicator = getSlotPropsFnRun(slots, props, "indicator");
		if (indicator && isVNode(indicator)) return createVNode(indicator, {
			class: dotClassName,
			percent
		});
		return createVNode(Looper, mergeProps(attrs, {
			"prefixCls": prefixCls,
			"percent": percent
		}), null);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: true
		},
		indicator: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		percent: {
			type: Number,
			required: false
		}
	}, { indicator: void 0 }),
	inheritAttrs: false
});
var Indicator_default = Indicator;

//#endregion
export { Indicator_default as default };