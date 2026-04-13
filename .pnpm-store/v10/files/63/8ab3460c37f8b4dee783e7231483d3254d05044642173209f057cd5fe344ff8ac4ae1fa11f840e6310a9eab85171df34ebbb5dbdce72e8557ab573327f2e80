import { useStepsContext } from "./Context.js";
import { computed, createVNode, defineComponent, inject, mergeProps, provide, ref } from "vue";
import { clsx } from "@v-c/util";
import pickAttrs from "@v-c/util/dist/pickAttrs";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
var StepIconSemanticKey = Symbol("StepIconSemanticContext");
function useStepIconSemanticContext() {
	return inject(StepIconSemanticKey, ref({}));
}
const StepIconSemanticContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	provide(StepIconSemanticKey, computed(() => props.value));
	return () => {
		return slots?.default?.();
	};
}, { props: { value: {
	type: Object,
	required: true,
	default: void 0
} } });
var StepIcon_default = /* @__PURE__ */ defineComponent((_, { attrs, slots }) => {
	const stepsContext = useStepsContext();
	const stepIconSemanticContext = useStepIconSemanticContext();
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const { prefixCls, classNames = {}, styles = {} } = stepsContext.value ?? {};
		const { className: itemClassName, style: itemStyle } = stepIconSemanticContext.value ?? {};
		const itemCls = `${prefixCls}-item`;
		return createVNode("div", mergeProps(pickAttrs(restAttrs, false), {
			"class": clsx(`${itemCls}-icon`, classNames.itemIcon, itemClassName, className),
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
export { StepIconSemanticContextProvider, StepIcon_default as default, useStepIconSemanticContext };
