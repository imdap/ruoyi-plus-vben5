Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
var getIndeterminateLine_default = (options) => {
	const { id, percent, strokeLinecap, strokeWidth, loading } = options;
	if (!loading) return {
		indeterminateStyleProps: {},
		indeterminateStyleAnimation: null
	};
	const animationName = `${id}-indeterminate-animate`;
	const strokeDashOffset = 100 - (percent + (strokeLinecap === "round" ? strokeWidth : 0));
	return {
		indeterminateStyleProps: {
			strokeDasharray: `${percent} 100`,
			animation: `${animationName} .6s linear alternate infinite`,
			strokeDashoffset: 0
		},
		indeterminateStyleAnimation: (0, vue.createVNode)("style", null, [`@keyframes ${animationName} {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -${strokeDashOffset};
          }`])
	};
};
exports.default = getIndeterminateLine_default;
