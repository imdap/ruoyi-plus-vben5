import { createVNode } from "vue";
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
		indeterminateStyleAnimation: createVNode("style", null, [`@keyframes ${animationName} {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -${strokeDashOffset};
          }`])
	};
};
export { getIndeterminateLine_default as default };
