Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
var Block = /* @__PURE__ */ (0, vue.defineComponent)((props, { slots }) => {
	return () => {
		return (0, vue.createVNode)("div", { "style": {
			width: "100%",
			height: "100%",
			background: props.bg
		} }, [slots.default?.()]);
	};
}, { props: { bg: {
	type: String,
	required: true,
	default: void 0
} } });
function getPtgColors(color, scale) {
	return Object.keys(color).map((key) => {
		const parsedKey = parseFloat(key);
		const ptgKey = `${Math.floor(parsedKey * scale)}%`;
		return `${color[key]} ${ptgKey}`;
	});
}
var PtgCircle = /* @__PURE__ */ (0, vue.defineComponent)((props, { expose, attrs }) => {
	const isGradient = (0, vue.computed)(() => props.color && typeof props.color === "object");
	const stroke = (0, vue.computed)(() => isGradient.value ? `#FFF` : void 0);
	expose({ circleRef: (0, vue.shallowRef)() });
	return () => {
		const { prefixCls, color, gradientId, radius, ptg, strokeLinecap, strokeWidth, size, gapDegree, className } = props;
		const halfSize = size / 2;
		const circleNode = (0, vue.createVNode)("circle", {
			"class": [`${prefixCls}-circle-path`, className],
			"r": radius,
			"cx": halfSize,
			"cy": halfSize,
			"stroke": stroke.value,
			"stroke-linecap": strokeLinecap,
			"stroke-width": strokeWidth,
			"opacity": ptg === 0 ? 0 : 1,
			"style": attrs?.style
		}, null);
		if (!isGradient.value) return circleNode;
		const maskId = `${gradientId}-conic`;
		const fromDeg = gapDegree ? `${180 + gapDegree / 2}deg` : "0deg";
		const conicColors = getPtgColors(color, (360 - gapDegree) / 360);
		const linearColors = getPtgColors(color, 1);
		const conicColorBg = `conic-gradient(from ${fromDeg}, ${conicColors.join(", ")})`;
		const linearColorBg = `linear-gradient(to ${gapDegree ? "bottom" : "top"}, ${linearColors.join(", ")})`;
		return (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)("mask", { "id": maskId }, [circleNode]), (0, vue.createVNode)("foreignObject", {
			"x": 0,
			"y": 0,
			"width": size,
			"height": size,
			"mask": `url(#${maskId})`
		}, [(0, vue.createVNode)(Block, { "bg": linearColorBg }, { default: () => [(0, vue.createVNode)(Block, { "bg": conicColorBg }, null)] })])]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		gradientId: {
			type: String,
			required: true,
			default: void 0
		},
		ptg: {
			type: Number,
			required: true,
			default: void 0
		},
		radius: {
			type: Number,
			required: true,
			default: void 0
		},
		strokeLinecap: {
			type: String,
			required: true,
			default: void 0
		},
		strokeWidth: {
			type: Number,
			required: true,
			default: void 0
		},
		size: {
			type: Number,
			required: true,
			default: void 0
		},
		color: {
			type: [String, Object],
			required: false,
			default: void 0
		},
		gapDegree: {
			type: Number,
			required: true,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		}
	},
	name: "PtgCircle",
	inheritAttrs: false
});
var PtgCircle_default = PtgCircle;
exports.default = PtgCircle_default;
