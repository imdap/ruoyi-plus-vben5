import { getSize } from "./utils.js";
import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";

//#region src/progress/Steps.tsx
const Steps = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { classes, styles, size, steps, rounding = Math.round, percent = 0, strokeWidth = 8, strokeColor, railColor, trailColor, prefixCls } = props;
		const current = rounding(steps * (percent / 100));
		const [width, height] = getSize(size ?? [size === "small" ? 2 : 14, strokeWidth], "step", {
			steps,
			strokeWidth
		});
		const unitWidth = width / steps;
		const mergedRailColor = railColor ?? trailColor;
		const styledSteps = Array.from({ length: steps }).map((_, index) => {
			const color = Array.isArray(strokeColor) ? strokeColor[index] : strokeColor;
			return createVNode("div", {
				"key": index,
				"class": clsx(`${prefixCls}-steps-item`, { [`${prefixCls}-steps-item-active`]: index <= current - 1 }, classes.track),
				"style": {
					backgroundColor: index <= current - 1 ? color : mergedRailColor,
					width: `${unitWidth}px`,
					height: `${height}px`,
					...styles.track
				}
			}, null);
		});
		return createVNode("div", {
			"class": clsx(`${prefixCls}-steps-body`, classes.body),
			"style": styles.body
		}, [styledSteps, slots.default?.()]);
	};
}, {
	props: {
		steps: {
			type: Number,
			required: true
		},
		strokeColor: {
			type: [String, Array],
			required: false
		},
		railColor: {
			type: String,
			required: false
		},
		trailColor: {
			type: String,
			required: false
		},
		classes: {
			type: Object,
			required: true
		},
		styles: {
			type: Object,
			required: true
		},
		type: {
			type: String,
			required: false
		},
		percent: {
			type: Number,
			required: false
		},
		format: {
			type: Function,
			required: false
		},
		status: {
			type: String,
			required: false
		},
		showInfo: {
			type: Boolean,
			required: false,
			default: void 0
		},
		strokeWidth: {
			type: Number,
			required: false
		},
		strokeLinecap: {
			type: String,
			required: false
		},
		width: {
			type: Number,
			required: false
		},
		success: {
			type: Object,
			required: false
		},
		gapDegree: {
			type: Number,
			required: false
		},
		gapPlacement: {
			type: String,
			required: false
		},
		gapPosition: {
			type: String,
			required: false
		},
		size: {
			type: [
				Number,
				Array,
				String,
				Object
			],
			required: false
		},
		percentPosition: {
			type: Object,
			required: false
		},
		rounding: {
			type: Function,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		"aria-label": {
			type: [String, null],
			required: false
		},
		"aria-labelledby": {
			type: [String, null],
			required: false
		}
	},
	name: "ProgressSteps",
	inheritAttrs: false
});
var Steps_default = Steps;

//#endregion
export { Steps_default as default };