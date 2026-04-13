import { devUseWarning, isDev } from "../_util/warning.js";
import { getSize, getSuccessPercent, validProgress } from "./utils.js";
import { LineStrokeColorVar } from "./style/index.js";
import { computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import { presetPrimaryColors } from "@ant-design/colors";

//#region src/progress/Line.tsx
/**
* @example
*   {
*     "0%": "#afc163",
*     "75%": "#009900",
*     "50%": "green", // ====> '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
*     "25%": "#66FF00",
*     "100%": "#ffffff"
*   }
*/
function sortGradient(gradients) {
	let tempArr = [];
	Object.keys(gradients).forEach((key) => {
		const formattedKey = Number.parseFloat(key.replace(/%/g, ""));
		if (!Number.isNaN(formattedKey)) tempArr.push({
			key: formattedKey,
			value: gradients[key]
		});
	});
	tempArr = tempArr.sort((a, b) => a.key - b.key);
	return tempArr.map(({ key, value }) => `${value} ${key}%`).join(", ");
}
/**
* Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
* butter, there is the bug. And... Besides women, there is the code.
*
* @example
*   {
*     "0%": "#afc163",
*     "25%": "#66FF00",
*     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
*     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
*     "100%": "#ffffff"
*   }
*/
function handleGradient(strokeColor, directionConfig) {
	const { from = presetPrimaryColors.blue, to = presetPrimaryColors.blue, direction = directionConfig === "rtl" ? "to left" : "to right", ...rest } = strokeColor;
	if (Object.keys(rest).length !== 0) {
		const background = `linear-gradient(${direction}, ${sortGradient(rest)})`;
		return {
			background,
			[LineStrokeColorVar]: background
		};
	}
	const background = `linear-gradient(${direction}, ${from}, ${to})`;
	return {
		background,
		[LineStrokeColorVar]: background
	};
}
const Line = /* @__PURE__ */ defineComponent((props, { slots }) => {
	if (isDev) devUseWarning("Progress").deprecated(!(props.strokeWidth !== void 0), "strokeWidth", "size");
	const mergedSize = computed(() => props.size ?? [-1, props.strokeWidth || (props.size === "small" ? 6 : 8)]);
	return () => {
		const { prefixCls, classes, styles, direction: directionConfig, percent, strokeWidth, strokeColor, strokeLinecap = "round", railColor, trailColor, percentPosition, success } = props;
		const { align: infoAlign, type: infoPosition } = percentPosition;
		const mergedRailColor = railColor ?? trailColor;
		const borderRadius = strokeLinecap === "square" || strokeLinecap === "butt" ? 0 : void 0;
		const [width, height] = getSize(mergedSize.value, "line", { strokeWidth });
		const railStyle = {
			backgroundColor: mergedRailColor || void 0,
			borderRadius: borderRadius !== void 0 ? `${borderRadius}px` : void 0,
			height: `${height}px`
		};
		const trackCls = `${prefixCls}-track`;
		const backgroundProps = strokeColor && typeof strokeColor !== "string" ? handleGradient(strokeColor, directionConfig) : {
			[LineStrokeColorVar]: strokeColor,
			background: strokeColor
		};
		const percentTrackStyle = {
			width: `${validProgress(percent)}%`,
			height,
			borderRadius,
			...backgroundProps
		};
		const successPercent = getSuccessPercent(props);
		const successTrackStyle = {
			width: `${validProgress(successPercent)}%`,
			height,
			borderRadius,
			backgroundColor: success?.strokeColor
		};
		return createVNode("div", {
			"class": clsx(`${prefixCls}-body`, classes.body, { [`${prefixCls}-body-layout-bottom`]: infoAlign === "center" && infoPosition === "outer" }),
			"style": {
				width: width > 0 ? width : "100%",
				...styles.body
			}
		}, [createVNode("div", {
			"class": clsx(`${prefixCls}-rail`, classes.rail),
			"style": {
				...railStyle,
				...styles.rail
			}
		}, [createVNode("div", {
			"class": clsx(trackCls, classes.track),
			"style": {
				...percentTrackStyle,
				...styles.track
			}
		}, [infoPosition === "inner" && slots.default?.()]), successPercent !== void 0 && createVNode("div", {
			"class": clsx(trackCls, `${trackCls}-success`, classes.track),
			"style": {
				...successTrackStyle,
				...styles.track
			}
		}, null)]), infoPosition === "outer" && slots.default?.()]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		direction: {
			type: [String, null],
			required: false
		},
		strokeColor: {
			type: [String, Object],
			required: false
		},
		percentPosition: {
			type: Object,
			required: true
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
	},
	name: "ProgressLine",
	inheritAttrs: false
});
var Line_default = Line;

//#endregion
export { Line_default as default, handleGradient, sortGradient };