import { computed, defineComponent, inject, provide } from "vue";

//#region src/float-button/context.ts
const GroupContextKey = Symbol("FloatButtonGroupContext");
function useGroupContext() {
	return inject(GroupContextKey, void 0);
}
function useGroupContextProvider(value) {
	provide(GroupContextKey, value);
}
const GroupContextProvider = defineComponent((props, { slots }) => {
	useGroupContextProvider(computed(() => props.value));
	return () => slots.default?.();
}, {
	name: "AFloatButtonGroupContextProvider",
	inheritAttrs: false,
	props: ["value"]
});

//#endregion
export { GroupContextProvider, useGroupContext, useGroupContextProvider };