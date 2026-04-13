import { createVNode, defineComponent, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";

//#region src/spin/Indicator/Progress.tsx
const viewSize = 100;
const borderWidth = viewSize / 5;
const radius = viewSize / 2 - borderWidth / 2;
const circumference = radius * 2 * Math.PI;
const position = 50;
const CustomCircle = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { dotClassName, hasCircleCls } = props;
		return createVNode("circle", {
			"class": classNames(`${dotClassName}-circle`, { [`${dotClassName}-circle-bg`]: hasCircleCls }),
			"r": radius,
			"cx": position,
			"cy": position,
			"stroke-width": borderWidth
		}, null);
	};
}, { props: {
	dotClassName: {
		type: String,
		required: false
	},
	hasCircleCls: {
		type: Boolean,
		required: false,
		default: void 0
	}
} });
const Progress = /* @__PURE__ */ defineComponent((props) => {
	const render = shallowRef(false);
	watch(() => props.percent !== 0, () => {
		if (props.percent !== 0) render.value = true;
	}, { immediate: true });
	return () => {
		const { percent, prefixCls } = props;
		const dotClassName = `${prefixCls}-dot`;
		const holderClassName = `${dotClassName}-holder`;
		const hideClassName = `${holderClassName}-hidden`;
		const safePtg = Math.max(Math.min(percent, 100), 0);
		if (!render.value) return null;
		const circleStyle = {
			strokeDashoffset: `${circumference / 4}`,
			strokeDasharray: `${circumference * safePtg / 100} ${circumference * (100 - safePtg) / 100}`
		};
		return createVNode("span", { "class": classNames(holderClassName, `${dotClassName}-progress`, safePtg <= 0 && hideClassName) }, [createVNode("svg", {
			"viewBox": `0 0 ${viewSize} ${viewSize}`,
			"role": "progressbar",
			"aria-valuemin": 0,
			"aria-valuemax": 100,
			"aria-valuenow": safePtg
		}, [createVNode(CustomCircle, {
			"dotClassName": dotClassName,
			"hasCircleCls": true
		}, null), createVNode(CustomCircle, {
			"dotClassName": dotClassName,
			"style": circleStyle
		}, null)])]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true
	},
	percent: {
		type: Number,
		required: true
	}
} });
var Progress_default = Progress;

//#endregion
export { Progress_default as default };