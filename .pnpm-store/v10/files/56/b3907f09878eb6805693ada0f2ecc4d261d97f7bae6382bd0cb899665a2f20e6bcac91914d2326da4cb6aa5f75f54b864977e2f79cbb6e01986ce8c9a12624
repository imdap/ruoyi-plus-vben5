import Progress_default from "./Progress.js";
import { Fragment, createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";

//#region src/spin/Indicator/Looper.tsx
const Looper = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	return () => {
		const { prefixCls, percent = 0 } = props;
		const dotClassName = `${prefixCls}-dot`;
		const holderClassName = `${dotClassName}-holder`;
		const hideClassName = `${holderClassName}-hidden`;
		return createVNode(Fragment, null, [createVNode("span", mergeProps(attrs, { "class": classNames(holderClassName, percent > 0 && hideClassName) }), [createVNode("span", { "class": classNames(dotClassName, `${prefixCls}-dot-spin`) }, [[
			1,
			2,
			3,
			4
		].map((i) => createVNode("i", {
			"class": `${prefixCls}-dot-item`,
			"key": i
		}, null))])]), createVNode(Progress_default, {
			"prefixCls": prefixCls,
			"percent": percent
		}, null)]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		percent: {
			type: Number,
			required: false
		}
	},
	inheritAttrs: false
});

//#endregion
export { Looper };