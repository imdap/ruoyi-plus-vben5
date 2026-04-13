import { defineComponent, inject, provide, ref } from "vue";
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
	provide(SliderContextKey, ctx);
}
function useInjectSlider() {
	return inject(SliderContextKey, ref({}));
}
const UnstableContextKey = Symbol("UnstableContext");
const defaultUnstableContextValue = {};
const UnstableProvider = defineComponent((props, { slots }) => {
	provide(UnstableContextKey, props.value);
	return () => {
		return slots?.default?.();
	};
}, { props: ["value"] });
function useUnstableContext() {
	return inject(UnstableContextKey, {});
}
export { UnstableContextKey, UnstableProvider, defaultSliderContextValue, defaultUnstableContextValue, useInjectSlider, useProviderSliderContext, useUnstableContext };
