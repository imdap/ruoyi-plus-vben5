Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
let vue = require("vue");
function getIndeterminateCircle({ id, loading }) {
	if (!loading) return {
		indeterminateStyleProps: {},
		indeterminateStyleAnimation: null
	};
	const animationName = `${id}-indeterminate-animate`;
	return {
		indeterminateStyleProps: {
			transform: "rotate(0deg)",
			animation: `${animationName} 1s linear infinite`
		},
		indeterminateStyleAnimation: (0, vue.createVNode)("style", null, [`@keyframes ${animationName} {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`])
	};
}
var getIndeterminateCircle_default = getIndeterminateCircle;
exports.default = getIndeterminateCircle_default;
