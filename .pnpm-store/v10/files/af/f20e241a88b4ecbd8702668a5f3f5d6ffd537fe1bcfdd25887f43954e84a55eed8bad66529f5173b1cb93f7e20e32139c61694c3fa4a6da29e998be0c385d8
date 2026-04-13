Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_common = require("./common.cjs");
const require_useId = require("./hooks/useId.cjs");
const require_getIndeterminateLine = require("./utils/getIndeterminateLine.cjs");
let vue = require("vue");
let _v_c_util_dist_Dom_findDOMNode = require("@v-c/util/dist/Dom/findDOMNode");
let _v_c_util_dist_props_util = require("@v-c/util/dist/props-util");
var Line = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const paths = require_common.useTransitionDuration();
	const mergedId = require_useId.default(props?.id);
	return () => {
		const { className, classNames, styles, percent, prefixCls, strokeColor, strokeLinecap, strokeWidth, railColor, railWidth, transition, loading, ...restProps } = props;
		delete restProps.gapPosition;
		const { restAttrs, style } = (0, _v_c_util_dist_props_util.getAttrStyleAndClass)(attrs);
		const percentList = Array.isArray(percent) ? percent : [percent];
		const strokeColorList = Array.isArray(strokeColor) ? strokeColor : [strokeColor];
		const center = strokeWidth / 2;
		const right = 100 - strokeWidth / 2;
		const pathString = `M ${strokeLinecap === "round" ? center : 0},${center}
         L ${strokeLinecap === "round" ? right : 100},${center}`;
		const viewBoxString = `0 0 100 ${strokeWidth}`;
		const { indeterminateStyleProps, indeterminateStyleAnimation } = require_getIndeterminateLine.default({
			id: mergedId,
			loading,
			percent: percentList[0],
			strokeLinecap,
			strokeWidth
		});
		let stackPtg = 0;
		return (0, vue.createVNode)("svg", (0, vue.mergeProps)(restAttrs, {
			"class": {
				[`${prefixCls}-line`]: true,
				className
			},
			"preserveAspectRatio": "none",
			"viewBox": viewBoxString,
			"style": style
		}, restProps), [
			(0, vue.createVNode)("path", {
				"class": [`${prefixCls}-line-rail`],
				"d": pathString,
				"stroke-linecap": strokeLinecap,
				"stroke": railColor,
				"stroke-width": railWidth || strokeWidth,
				"fill-opacity": "0"
			}, null),
			percentList.map((ptg, index) => {
				let dashPercent = 1;
				switch (strokeLinecap) {
					case "round":
						dashPercent = 1 - strokeWidth / 100;
						break;
					case "square":
						dashPercent = 1 - strokeWidth / 2 / 100;
						break;
					default:
						dashPercent = 1;
						break;
				}
				const pathStyle = {
					strokeDasharray: `${ptg * dashPercent}px, 100px`,
					strokeDashoffset: `-${stackPtg}px`,
					transition: transition || "stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear",
					...indeterminateStyleProps
				};
				const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1];
				stackPtg += ptg;
				return (0, vue.createVNode)("path", {
					"key": index,
					"class": `${prefixCls}-line-path`,
					"d": pathString,
					"stroke-linecap": strokeLinecap,
					"stroke": color,
					"stroke-width": strokeWidth,
					"fill-opacity": "0",
					"ref": (elem) => {
						paths.value[index] = (0, _v_c_util_dist_Dom_findDOMNode.getDOM)(elem);
					},
					"style": pathStyle
				}, null);
			}),
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
	name: "Line",
	inheritAttrs: false
});
var Line_default = Line;
exports.default = Line_default;
