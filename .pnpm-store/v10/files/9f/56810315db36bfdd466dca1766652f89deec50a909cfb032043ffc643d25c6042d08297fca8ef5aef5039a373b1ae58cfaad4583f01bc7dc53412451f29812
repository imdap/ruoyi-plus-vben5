import { createVNode } from "vue";
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
		indeterminateStyleAnimation: createVNode("style", null, [`@keyframes ${animationName} {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }`])
	};
}
var getIndeterminateCircle_default = getIndeterminateCircle;
export { getIndeterminateCircle_default as default };
