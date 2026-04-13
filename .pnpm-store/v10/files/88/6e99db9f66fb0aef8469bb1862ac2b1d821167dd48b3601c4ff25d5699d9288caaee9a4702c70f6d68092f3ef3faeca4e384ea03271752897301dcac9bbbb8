import { computed, defineComponent, inject, provide } from "vue";
var TriggerContextKey = Symbol("TriggerContextKey");
function useTriggerContext() {
	return inject(TriggerContextKey, void 0);
}
const TriggerContextProvider = defineComponent((props, { slots }) => {
	provide(TriggerContextKey, computed(() => props));
	return () => {
		return slots?.default?.();
	};
}, { props: ["registerSubPopup"] });
const UniqueContextKey = Symbol("UniqueContextKey");
function useUniqueContext() {
	return inject(UniqueContextKey, void 0);
}
const UniqueContextProvider = defineComponent((props, { slots }) => {
	provide(UniqueContextKey, props);
	return () => {
		return slots?.default?.();
	};
}, { props: ["show", "hide"] });
export { TriggerContextProvider, UniqueContextKey, UniqueContextProvider, useTriggerContext, useUniqueContext };
