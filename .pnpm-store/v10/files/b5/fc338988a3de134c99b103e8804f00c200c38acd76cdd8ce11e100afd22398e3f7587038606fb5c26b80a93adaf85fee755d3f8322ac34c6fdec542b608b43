Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_common = require("../common.cjs");
const require_useId = require("../hooks/useId.cjs");
const require_getIndeterminateCircle = require("../utils/getIndeterminateCircle.cjs");
const require_PtgCircle = require("./PtgCircle.cjs");
const require_util = require("./util.cjs");
let vue = require("vue");
let _v_c_util_dist_props_util = require("@v-c/util/dist/props-util");
let _v_c_util_dist_utils_omit = require("@v-c/util/dist/utils/omit");
function toArray(value) {
	const mergedValue = value ?? [];
	return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}
var Circle = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const halfSize = 100 / 2;
	const mergedId = require_useId.default(props.id);
	const gradientId = `${mergedId}-gradient`;
	const gapDegree = (0, vue.computed)(() => props.gapDegree ?? 0);
	const radius = (0, vue.computed)(() => halfSize - props.strokeWidth / 2);
	const perimeter = (0, vue.computed)(() => Math.PI * 2 * radius.value);
	const rotateDeg = (0, vue.computed)(() => gapDegree.value > 0 ? 90 + gapDegree.value / 2 : -90);
	const perimeterWithoutGap = (0, vue.computed)(() => perimeter.value * ((360 - gapDegree.value) / 360));
	const stepObj = (0, vue.computed)(() => typeof props.steps === "object" ? props.steps : {
		count: props.steps,
		gap: 2
	});
	const percentList = (0, vue.computed)(() => toArray(props.percent));
	const strokeColorList = (0, vue.computed)(() => toArray(props.strokeColor));
	const gradient = (0, vue.computed)(() => strokeColorList.value.find((color) => color && typeof color === "object"));
	const isConicGradient = (0, vue.computed)(() => gradient.value && typeof gradient.value === "object");
	const mergedStrokeLinecap = (0, vue.computed)(() => isConicGradient.value ? "butt" : props.strokeLinecap);
	const paths = require_common.useTransitionDuration();
	return () => {
		const { id, className, strokeWidth, gapPosition, railColor, prefixCls, railWidth, classNames = {}, styles = {}, loading, ...restProps } = props;
		const { style, restAttrs } = (0, _v_c_util_dist_props_util.getAttrStyleAndClass)(attrs);
		const { count: stepCount, gap: stepGap } = stepObj.value ?? {};
		const { indeterminateStyleProps, indeterminateStyleAnimation } = require_getIndeterminateCircle.default({
			id: mergedId,
			loading: !!loading
		});
		const circleStyle = require_util.getCircleStyle(perimeter.value, perimeterWithoutGap.value, 0, 100, rotateDeg.value, gapDegree.value, gapPosition, railColor, mergedStrokeLinecap.value, strokeWidth);
		const getStokeList = () => {
			let stackPtg = 0;
			return percentList.value.map((ptg, index) => {
				const color = strokeColorList.value[index] || strokeColorList.value[strokeColorList.value.length - 1];
				const circleStyleForStack = require_util.getCircleStyle(perimeter.value, perimeterWithoutGap.value, stackPtg, ptg, rotateDeg.value, gapDegree.value, gapPosition, color, mergedStrokeLinecap.value, strokeWidth);
				stackPtg += ptg;
				return (0, vue.createVNode)(require_PtgCircle.default, {
					"key": index,
					"color": color,
					"ptg": ptg,
					"radius": radius.value,
					"className": classNames.track,
					"prefixCls": prefixCls,
					"gradientId": gradientId,
					"style": [
						circleStyleForStack,
						indeterminateStyleProps,
						styles.track
					],
					"strokeLinecap": mergedStrokeLinecap.value,
					"strokeWidth": strokeWidth,
					"gapDegree": gapDegree.value,
					"ref": (elem) => {
						paths.value[index] = elem;
					},
					"size": 100
				}, null);
			}).reverse();
		};
		const getStepStokeList = () => {
			const current = Math.round(stepCount * (percentList.value[0] / 100));
			const stepPtg = 100 / stepCount;
			let stackPtg = 0;
			return Array.from({ length: stepCount }).fill(null).map((_, index) => {
				const color = index <= current - 1 ? strokeColorList.value[0] : railColor;
				const stroke = color && typeof color === "object" ? `url(#${gradientId})` : void 0;
				const circleStyleForStack = require_util.getCircleStyle(perimeter.value, perimeterWithoutGap.value, stackPtg, stepPtg, rotateDeg.value, gapDegree.value, gapPosition, color, "butt", strokeWidth, stepGap);
				stackPtg += (perimeterWithoutGap.value - circleStyleForStack.strokeDashoffset + stepGap) * 100 / perimeterWithoutGap.value;
				return (0, vue.createVNode)("circle", {
					"key": index,
					"class": [`${prefixCls}-circle-path`, classNames.track],
					"r": radius.value,
					"cx": halfSize,
					"cy": halfSize,
					"stroke": stroke,
					"stroke-width": strokeWidth,
					"opacity": 1,
					"style": {
						...circleStyleForStack,
						...styles.track
					},
					"ref": (elem) => {
						paths.value[index] = elem;
					}
				}, null);
			});
		};
		return (0, vue.createVNode)("svg", (0, vue.mergeProps)(restAttrs, {
			"class": [
				`${prefixCls}-circle`,
				classNames.root,
				className
			],
			"viewBox": `0 0 100 100`,
			"style": {
				...styles.root,
				...style
			},
			"id": id,
			"role": "presentation"
		}, (0, _v_c_util_dist_utils_omit.omit)(restProps, [
			"gapDegree",
			"steps",
			"percent",
			"strokeLinecap",
			"strokeColor"
		])), [
			!stepCount && (0, vue.createVNode)("circle", {
				"class": [`${prefixCls}-circle-rail`, classNames.rail],
				"r": radius.value,
				"cx": halfSize,
				"cy": halfSize,
				"stroke": railColor,
				"stroke-linecap": mergedStrokeLinecap.value,
				"stroke-width": railWidth || strokeWidth,
				"style": {
					...circleStyle,
					...styles.rail
				}
			}, null),
			stepCount ? getStepStokeList() : getStokeList(),
			indeterminateStyleAnimation
		]);
	};
}, {
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
		id: {
			type: String,
			required: false,
			default: void 0
		},
		strokeWidth: {
			type: Number,
			required: false,
			default: void 0
		},
		railWidth: {
			type: Number,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		percent: {
			type: [Number, Array],
			required: false,
			default: void 0
		},
		strokeColor: {
			type: [
				String,
				Object,
				Array
			],
			required: false,
			default: void 0
		},
		railColor: {
			type: String,
			required: false,
			default: void 0
		},
		strokeLinecap: {
			type: String,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		gapDegree: {
			type: Number,
			required: false,
			default: void 0
		},
		gapPosition: {
			type: String,
			required: false,
			default: void 0
		},
		transition: {
			type: String,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		steps: {
			type: [Number, Object],
			required: false,
			default: void 0
		}
	}, require_common.defaultProps),
	name: "Circle"
});
var Circle_default = Circle;
exports.default = Circle_default;
