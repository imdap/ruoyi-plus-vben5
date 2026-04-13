Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
var SliderContextKey = Symbol("SliderContext");
const defaultSliderContextValue = {
	min: 0,
	max: 0,
	direction: "ltr",
	step: 1,
	includedStart: 0,
	includedEnd: 0,
	tabIndex: 0,
	keyboard: true,
	styles: {},
	classNames: {}
};
function useProviderSliderContext(ctx) {
	(0, vue.provide)(SliderContextKey, ctx);
}
function useInjectSlider() {
	return (0, vue.inject)(SliderContextKey, (0, vue.ref)({}));
}
const UnstableContextKey = Symbol("UnstableContext");
const defaultUnstableContextValue = {};
const UnstableProvider = (0, vue.defineComponent)((props, { slots }) => {
	(0, vue.provide)(UnstableContextKey, props.value);
	return () => {
		return slots?.default?.();
	};
}, { props: ["value"] });
function useUnstableContext() {
	return (0, vue.inject)(UnstableContextKey, {});
}
exports.UnstableContextKey = UnstableContextKey;
exports.UnstableProvider = UnstableProvider;
exports.defaultSliderContextValue = defaultSliderContextValue;
exports.defaultUnstableContextValue = defaultUnstableContextValue;
exports.useInjectSlider = useInjectSlider;
exports.useProviderSliderContext = useProviderSliderContext;
exports.useUnstableContext = useUnstableContext;
