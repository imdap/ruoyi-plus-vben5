import { computed, defineComponent, inject, provide } from "vue";
var OverflowContextKey = Symbol("OverflowContext");
const OverflowContextProvider = /* @__PURE__ */ defineComponent({
	name: "OverflowContextProvider",
	inheritAttrs: false,
	props: { value: { type: Object } },
	setup(props, { slots }) {
		provide(OverflowContextKey, computed(() => props.value));
		return () => slots.default?.();
	}
});
function useInjectOverflowContext() {
	return inject(OverflowContextKey, null);
}
export { OverflowContextProvider, useInjectOverflowContext };
