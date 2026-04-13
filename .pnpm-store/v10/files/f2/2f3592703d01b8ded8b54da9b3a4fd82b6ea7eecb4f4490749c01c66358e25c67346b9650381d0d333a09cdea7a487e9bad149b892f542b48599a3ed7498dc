import { useComponentBaseConfig } from "../config-provider/context.js";
import tooltip_default from "../tooltip/index.js";
import { getPercentage, getSize, getStrokeColor } from "./utils.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";
import { Circle } from "@v-c/progress";

//#region src/progress/Circle.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const CIRCLE_MIN_STROKE_WIDTH = 3;
const getMinPercent = (width) => CIRCLE_MIN_STROKE_WIDTH / width * 100;
const OMIT_SEMANTIC_NAMES = [
	"root",
	"body",
	"indicator"
];
const defaults = {
	strokeLinecap: "round",
	width: 120
};
const Circle$1 = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const size = computed(() => props.size ?? props.width ?? 120);
	const { direction } = useComponentBaseConfig("progress", props);
	const realGapDegree = computed(() => {
		const { gapDegree, type } = props;
		if (gapDegree || gapDegree === 0) return gapDegree;
		if (type === "dashboard") return 75;
	});
	const gapPos = computed(() => {
		const { gapPosition, gapPlacement, type } = props;
		const mergedPlacement = (gapPlacement ?? gapPosition) || type === "dashboard" && "bottom" || void 0;
		const isRTL = direction.value === "rtl";
		switch (mergedPlacement) {
			case "start": return isRTL ? "right" : "left";
			case "end": return isRTL ? "left" : "right";
			default: return mergedPlacement;
		}
	});
	return () => {
		const { trailColor, railColor, strokeColor: customStrokeColor, success, prefixCls, classes, styles, strokeLinecap, steps } = props;
		const mergedRailColor = railColor ?? trailColor;
		const [width, height] = getSize(size.value, "circle");
		let strokeWidth = props?.strokeWidth;
		if (strokeWidth === void 0) strokeWidth = Math.max(getMinPercent(width), 6);
		const circleStyle = {
			width: `${width}px`,
			height: `${height}px`,
			fontSize: `${width * .15 + 6}px`
		};
		const isGradient = Object.prototype.toString.call(customStrokeColor) === "[object Object]";
		const strokeColor = getStrokeColor({
			success,
			strokeColor: props.strokeColor
		});
		const percentArray = getPercentage(props);
		const wrapperClassName = clsx(`${prefixCls}-body`, { [`${prefixCls}-circle-gradient`]: isGradient }, classes.body);
		const circleContent = createVNode(Circle, {
			"steps": steps,
			"percent": steps ? percentArray[1] : percentArray,
			"strokeWidth": strokeWidth,
			"railWidth": strokeWidth,
			"strokeColor": steps ? strokeColor[1] : strokeColor,
			"strokeLinecap": strokeLinecap,
			"railColor": mergedRailColor,
			"prefixCls": prefixCls,
			"gapDegree": realGapDegree.value,
			"gapPosition": gapPos.value,
			"classNames": omit(classes, OMIT_SEMANTIC_NAMES),
			"styles": omit(styles, OMIT_SEMANTIC_NAMES)
		}, null);
		const smallCircle = width <= 20;
		const children = slots?.default ? slots.default() : null;
		const node = createVNode("div", {
			"class": wrapperClassName,
			"style": {
				...circleStyle,
				...styles.body
			}
		}, [circleContent, !smallCircle && children]);
		if (smallCircle) return createVNode(tooltip_default, { "title": children }, _isSlot(node) ? node : { default: () => [node] });
		return node;
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: true
		},
		progressStatus: {
			type: String,
			required: true
		},
		strokeColor: {
			type: [String, Object],
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
		trailColor: {
			type: String,
			required: false
		},
		railColor: {
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
		steps: {
			type: [Number, Object],
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
		"aria-label": {
			type: [String, null],
			required: false
		},
		"aria-labelledby": {
			type: [String, null],
			required: false
		}
	}, defaults),
	name: "ProgressCircle",
	inheritAttrs: false
});
var Circle_default = Circle$1;

//#endregion
export { Circle_default as default };