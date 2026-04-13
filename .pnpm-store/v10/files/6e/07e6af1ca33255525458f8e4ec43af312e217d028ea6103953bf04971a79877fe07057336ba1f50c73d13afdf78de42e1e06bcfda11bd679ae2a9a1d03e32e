import { inject, provide } from "vue";

//#region src/radio/context.ts
const RadioGroupContextKey = Symbol("RadioGroupContextKey");
function useRadioGroupContextProvider(value) {
	provide(RadioGroupContextKey, value);
}
function useRadioGroupContext() {
	return inject(RadioGroupContextKey, void 0);
}
const RadioOptionTypeContextKey = Symbol("RadioOptionTypeContext");
function useRadioOptionTypeContextProvider(value) {
	provide(RadioOptionTypeContextKey, value);
}
function useRadioOptionTypeContext() {
	return inject(RadioOptionTypeContextKey, void 0);
}

//#endregion
export { useRadioGroupContext, useRadioGroupContextProvider, useRadioOptionTypeContext, useRadioOptionTypeContextProvider };