import { genCssVar } from "../theme/util/genStyleUtils.js";
import { Fragment, createTextVNode, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";

//#region src/steps/ProgressIcon.tsx
const ProgressIcon = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { prefixCls, rootPrefixCls, percent } = props;
		const progressCls = `${prefixCls}-item-progress-icon`;
		const circleCls = `${progressCls}-circle`;
		const [, varRef] = genCssVar(rootPrefixCls, "cmp-steps");
		const dashArray = `calc(${varRef("progress-radius")} * 2 * ${Math.PI * percent / 100}) 9999`;
		return createVNode(Fragment, null, [createVNode("svg", {
			"class": `${progressCls}-svg`,
			"viewBox": "0 0 100 100",
			"width": "100%",
			"height": "100%",
			"xmlns": "http://www.w3.org/2000/svg",
			"aria-valuemax": 100,
			"aria-valuemin": 0,
			"aria-valuenow": percent
		}, [
			createVNode("title", null, [createTextVNode("Progress")]),
			createVNode("circle", { "class": clsx(circleCls, `${circleCls}-rail`) }, null),
			createVNode("circle", {
				"class": clsx(circleCls, `${circleCls}-ptg`),
				"stroke-dasharray": dashArray,
				"transform": "rotate(-90 50 50)"
			}, null)
		]), slots?.default?.()]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		rootPrefixCls: {
			type: String,
			required: true
		},
		percent: {
			type: Number,
			required: true
		}
	},
	name: "ProgressIcon"
});
var ProgressIcon_default = ProgressIcon;

//#endregion
export { ProgressIcon_default as default };