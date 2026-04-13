import { useBaseConfig } from "../../config-provider/context.js";
import { getTransitionProps } from "../../_util/motion.js";
import { Transition, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/tooltip/UniqueProvider/MotionContent.tsx
const MotionContent = /* @__PURE__ */ defineComponent((_, { slots }) => {
	const { getPrefixCls } = useBaseConfig();
	const rootPrefixCls = getPrefixCls();
	return () => {
		const children = filterEmpty(slots?.default?.() ?? [])?.[0];
		if (!isVNode(children)) return slots?.default?.();
		const transitionProps = getTransitionProps(`${rootPrefixCls}-fade`);
		return createVNode(Transition, mergeProps({ "appear": true }, transitionProps), { default: () => [children] });
	};
});
var MotionContent_default = MotionContent;

//#endregion
export { MotionContent_default as default };