import { inject, provide } from "vue";

//#region src/slider/Context.ts
/** @private Internal context. Do not use in your production. */
const SliderInternalContextKey = Symbol("SliderInternalContext");
/** @private Internal context. Do not use in your production. */
function useSliderInternalContext() {
	return inject(SliderInternalContextKey, {});
}
function useSliderInternalContextProvider(value) {
	provide(SliderInternalContextKey, value);
}

//#endregion
export { useSliderInternalContext, useSliderInternalContextProvider };