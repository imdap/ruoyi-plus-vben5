import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { clsx, toPropsRefs } from "../_util/tools.js";
import { getSize, getSuccessPercent, validProgress } from "./utils.js";
import Circle_default from "./Circle.js";
import style_default from "./style/index.js";
import Line_default from "./Line.js";
import Steps_default from "./Steps.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { CheckCircleFilled, CheckOutlined, CloseCircleFilled, CloseOutlined } from "@antdv-next/icons";
import { FastColor } from "@ant-design/fast-color";

//#region src/progress/progress.tsx
const ProgressTypes = [
	"line",
	"circle",
	"dashboard"
];
const ProgressStatuses = [
	"normal",
	"exception",
	"active",
	"success"
];
const defaultProps = {
	percent: 0,
	showInfo: true,
	size: "medium",
	type: "line",
	percentPosition: {}
};
function getStrokeColorIsBright(strokeColor) {
	if (!strokeColor) return false;
	const color = typeof strokeColor === "string" ? strokeColor : Object.values(strokeColor)[0];
	try {
		return new FastColor(color).isLight();
	} catch (e) {
		if (isDev) console.error(e);
		return false;
	}
}
function getPercentNumber(percent, success) {
	const successPercent = getSuccessPercent({ success });
	return Number.parseInt((successPercent ?? percent ?? 0)?.toString(), 10);
}
const Progress = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("progress", props);
	const { classes, styles, rootClass } = toPropsRefs(props, "classes", "styles", "rootClass");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedPercent = computed(() => props.percent ?? defaultProps.percent);
	const mergedSize = computed(() => props.size ?? defaultProps.size);
	const mergedShowInfo = computed(() => props.showInfo ?? defaultProps.showInfo);
	const mergedType = computed(() => props.type ?? defaultProps.type);
	const mergedPercentPosition = computed(() => props.percentPosition ?? defaultProps.percentPosition);
	const mergedProps = computed(() => ({
		...props,
		percent: mergedPercent.value,
		size: mergedSize.value,
		showInfo: mergedShowInfo.value,
		type: mergedType.value,
		percentPosition: mergedPercentPosition.value
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const infoAlign = computed(() => mergedPercentPosition.value.align ?? "end");
	const infoPosition = computed(() => mergedPercentPosition.value.type ?? "outer");
	const isLineType = computed(() => mergedType.value === "line");
	const isPureLineType = computed(() => isLineType.value && !props.steps);
	const strokeColorNotArray = computed(() => Array.isArray(props.strokeColor) ? props.strokeColor[0] : props.strokeColor);
	const strokeColorNotGradient = computed(() => typeof props.strokeColor === "string" || Array.isArray(props.strokeColor) ? props.strokeColor : void 0);
	const strokeColorIsBright = computed(() => getStrokeColorIsBright(strokeColorNotArray.value));
	const percentNumber = computed(() => getPercentNumber(mergedPercent.value, props.success));
	const progressStatus = computed(() => {
		if (!ProgressStatuses.includes(props.status) && percentNumber.value >= 100) return "success";
		return props.status || "normal";
	});
	if (isDev) {
		const warning = devUseWarning("Progress");
		[
			["width", "size"],
			["trailColor", "railColor"],
			["gapPosition", "gapPlacement"]
		].forEach(([deprecatedName, newName]) => {
			warning.deprecated(!(props[deprecatedName] !== void 0), deprecatedName, newName);
		});
		if (mergedType.value === "circle" || mergedType.value === "dashboard") {
			if (Array.isArray(props.size)) warning(false, "usage", "Type \"circle\" and \"dashboard\" do not accept array as `size`, please use number or preset size instead.");
			else if (typeof props.size === "object") warning(false, "usage", "Type \"circle\" and \"dashboard\" do not accept object as `size`, please use number or preset size instead.");
		}
		warning.deprecated(props.size !== "default", "size=\"default\"", "size=\"medium\"");
	}
	const progressInfo = computed(() => {
		if (!mergedShowInfo.value) return null;
		const successPercent = getSuccessPercent(props);
		let text;
		const textFormatter = props.format || ((number) => `${number}%`);
		const isBrightInnerColor = isLineType.value && strokeColorIsBright.value && infoPosition.value === "inner";
		if (infoPosition.value === "inner" || props.format || progressStatus.value !== "exception" && progressStatus.value !== "success") text = textFormatter(validProgress(mergedPercent.value), validProgress(successPercent));
		else if (progressStatus.value === "exception") text = isLineType.value ? createVNode(CloseCircleFilled, null, null) : createVNode(CloseOutlined, null, null);
		else if (progressStatus.value === "success") text = isLineType.value ? createVNode(CheckCircleFilled, null, null) : createVNode(CheckOutlined, null, null);
		return createVNode("span", {
			"class": clsx(`${prefixCls.value}-indicator`, {
				[`${prefixCls.value}-indicator-bright`]: isBrightInnerColor,
				[`${prefixCls.value}-indicator-${infoAlign.value}`]: isPureLineType.value,
				[`${prefixCls.value}-indicator-${infoPosition.value}`]: isPureLineType.value
			}, mergedClassNames.value.indicator),
			"style": mergedStyles.value.indicator,
			"title": typeof text === "string" ? text : void 0
		}, [text]);
	});
	const sharedProps = computed(() => ({
		...mergedProps.value,
		classes: mergedClassNames.value,
		styles: mergedStyles.value
	}));
	return () => {
		const { className, style: attrStyle, restAttrs } = getAttrStyleAndClass(attrs);
		let progress;
		if (mergedType.value === "line") {
			const steps = typeof props.steps === "object" ? props.steps.count : props.steps;
			progress = props.steps ? createVNode(Steps_default, mergeProps(sharedProps.value, {
				"strokeColor": strokeColorNotGradient.value,
				"prefixCls": prefixCls.value,
				"steps": steps
			}), { default: () => [progressInfo.value] }) : createVNode(Line_default, mergeProps(sharedProps.value, {
				"strokeColor": strokeColorNotArray.value,
				"prefixCls": prefixCls.value,
				"direction": direction.value,
				"percentPosition": {
					align: infoAlign.value,
					type: infoPosition.value
				}
			}), { default: () => [progressInfo.value] });
		} else if (mergedType.value === "circle" || mergedType.value === "dashboard") progress = createVNode(Circle_default, mergeProps(sharedProps.value, {
			"strokeColor": strokeColorNotArray.value,
			"prefixCls": prefixCls.value,
			"progressStatus": progressStatus.value
		}), { default: () => [progressInfo.value] });
		const classString = clsx(prefixCls.value, `${prefixCls.value}-status-${progressStatus.value}`, {
			[`${prefixCls.value}-${mergedType.value === "dashboard" && "circle" || mergedType.value}`]: mergedType.value !== "line",
			[`${prefixCls.value}-inline-circle`]: mergedType.value === "circle" && getSize(mergedSize.value, "circle")[0] <= 20,
			[`${prefixCls.value}-line`]: isPureLineType.value,
			[`${prefixCls.value}-line-align-${infoAlign.value}`]: isPureLineType.value,
			[`${prefixCls.value}-line-position-${infoPosition.value}`]: isPureLineType.value,
			[`${prefixCls.value}-steps`]: props.steps,
			[`${prefixCls.value}-show-info`]: mergedShowInfo.value,
			[`${prefixCls.value}-small`]: mergedSize.value === "small",
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, contextClassName.value, className, rootClass.value, mergedClassNames.value.root, hashId.value, cssVarCls.value);
		const rootStyle = [
			contextStyle.value,
			mergedStyles.value.root,
			attrStyle
		];
		const ariaProps = {};
		if (props["aria-label"] !== void 0) ariaProps["aria-label"] = props["aria-label"];
		if (props["aria-labelledby"] !== void 0) ariaProps["aria-labelledby"] = props["aria-labelledby"];
		return createVNode("div", mergeProps(restAttrs, {
			"style": rootStyle,
			"class": classString,
			"role": "progressbar",
			"aria-valuenow": percentNumber.value,
			"aria-valuemin": 0,
			"aria-valuemax": 100
		}, ariaProps), [progress]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
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
		strokeColor: {
			type: [
				String,
				Array,
				Object
			],
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
	}, defaultProps),
	name: "AProgress",
	inheritAttrs: false
});
Progress.install = (app) => {
	app.component(Progress.name, Progress);
};
var progress_default = Progress;

//#endregion
export { ProgressTypes, progress_default as default };