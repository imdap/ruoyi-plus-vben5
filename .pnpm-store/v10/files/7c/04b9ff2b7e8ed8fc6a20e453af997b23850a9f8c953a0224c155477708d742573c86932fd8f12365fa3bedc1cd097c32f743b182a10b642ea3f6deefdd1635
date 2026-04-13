import { defineComponent, inject, provide } from "vue";

//#region src/app/context.ts
const AppConfigContextKey = Symbol("AppConfigContext");
const AppConfigProvider = defineComponent((props, { slots }) => {
	provide(AppConfigContextKey, props);
	return () => {
		return slots?.default?.();
	};
}, {
	props: ["message", "notification"],
	inheritAttrs: false
});
function useAppConfig() {
	return inject(AppConfigContextKey, {});
}
const AppContextKey = Symbol("AppContext");
function useAppContext() {
	return inject(AppContextKey, {
		message: {},
		notification: {},
		modal: {}
	});
}
function useAppContextProvider(value) {
	provide(AppContextKey, value);
}

//#endregion
export { AppConfigProvider, useAppConfig, useAppContext, useAppContextProvider };