Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
const defaultProps = {
	percent: 0,
	prefixCls: "vc-progress",
	strokeColor: "#2db7f5",
	strokeLinecap: "round",
	strokeWidth: 1,
	railColor: "#D9D9D9",
	railWidth: 1,
	gapPosition: "bottom",
	loading: false
};
function useTransitionDuration() {
	const pathsRef = (0, vue.ref)([]);
	const prevTimeStamp = (0, vue.shallowRef)();
	(0, vue.onMounted)(() => {
		const now = Date.now();
		let updated = false;
		pathsRef.value.forEach((path) => {
			if (!path) return;
			updated = true;
			if (!path.style) path.style = {};
			const pathStyle = path.style;
			pathStyle.transitionDuration = ".3s, .3s, .3s, .06s";
			if (prevTimeStamp.value && now - prevTimeStamp.value < 100) pathStyle.transitionDuration = "0s, 0s";
			if (updated) prevTimeStamp.value = Date.now();
		});
	});
	return pathsRef;
}
exports.defaultProps = defaultProps;
exports.useTransitionDuration = useTransitionDuration;
