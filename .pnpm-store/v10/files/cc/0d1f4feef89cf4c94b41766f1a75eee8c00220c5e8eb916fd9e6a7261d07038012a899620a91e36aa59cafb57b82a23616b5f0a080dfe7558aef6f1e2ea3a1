import { defaultProps, useTransitionDuration } from "../common.js";
import useId_default from "../hooks/useId.js";
import getIndeterminateCircle_default from "../utils/getIndeterminateCircle.js";
import PtgCircle_default from "./PtgCircle.js";
import { VIEW_BOX_SIZE, getCircleStyle } from "./util.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { omit } from "@v-c/util/dist/utils/omit";
function toArray(value) {
	const mergedValue = value ?? [];
	return Array.isArray(mergedValue) ? mergedValue : [mergedValue];
}
var Circle_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const halfSize = 100 / 2;
	const mergedId = useId_default(props.id);
	const gradientId = `${mergedId}-gradient`;
	const gapDegree = computed(() => props.gapDegree ?? 0);
	const radius = computed(() => halfSize - props.strokeWidth / 2);
	const perimeter = computed(() => Math.PI * 2 * radius.value);
	const rotateDeg = computed(() => gapDegree.value > 0 ? 90 + gapDegree.value / 2 : -90);
	const perimeterWithoutGap = computed(() => perimeter.value * ((360 - gapDegree.value) / 360));
	const stepObj = computed(() => typeof props.steps === "object" ? props.steps : {
		count: props.steps,
		gap: 2
	});
	const percentList = computed(() => toArray(props.percent));
	const strokeColorList = computed(() => toArray(props.strokeColor));
	const gradient = computed(() => strokeColorList.value.find((color) => color && typeof color === "object"));
	const isConicGradient = computed(() => gradient.value && typeof gradient.value === "object");
	const mergedStrokeLinecap = computed(() => isConicGradient.value ? "butt" : props.strokeLinecap);
	const paths = useTransitionDuration();
	return () => {
		const { id, className, strokeWidth, gapPosition, railColor, prefixCls, railWidth, classNames = {}, styles = {}, loading, ...restProps } = props;
		const { style, restAttrs } = getAttrStyleAndClass(attrs);
		const { count: stepCount, gap: stepGap } = stepObj.value ?? {};
		const { indeterminateStyleProps, indeterminateStyleAnimation } = getIndeterminateCircle_default({
			id: mergedId,
			loading: !!loading
		});
		const circleStyle = getCircleStyle(perimeter.value, perimeterWithoutGap.value, 0, 100, rotateDeg.value, gapDegree.value, gapPosition, railColor, mergedStrokeLinecap.value, strokeWidth);
		const getStokeList = () => {
			let stackPtg = 0;
			return percentList.value.map((ptg, index) => {
				const color = strokeColorList.value[index] || strokeColorList.value[strokeColorList.value.length - 1];
				const circleStyleForStack = getCircleStyle(perimeter.value, perimeterWithoutGap.value, stackPtg, ptg, rotateDeg.value, gapDegree.value, gapPosition, color, mergedStrokeLinecap.value, strokeWidth);
				stackPtg += ptg;
				return createVNode(PtgCircle_default, {
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
				const circleStyleForStack = getCircleStyle(perimeter.value, perimeterWithoutGap.value, stackPtg, stepPtg, rotateDeg.value, gapDegree.value, gapPosition, color, "butt", strokeWidth, stepGap);
				stackPtg += (perimeterWithoutGap.value - circleStyleForStack.strokeDashoffset + stepGap) * 100 / perimeterWithoutGap.value;
				return createVNode("circle", {
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
		return createVNode("svg", mergeProps(restAttrs, {
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
		}, omit(restProps, [
			"gapDegree",
			"steps",
			"percent",
			"strokeLinecap",
			"strokeColor"
		])), [
			!stepCount && createVNode("circle", {
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
	props: /* @__PURE__ */ mergeDefaults({
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
	}, defaultProps),
	name: "Circle"
});
export { Circle_default as default };
