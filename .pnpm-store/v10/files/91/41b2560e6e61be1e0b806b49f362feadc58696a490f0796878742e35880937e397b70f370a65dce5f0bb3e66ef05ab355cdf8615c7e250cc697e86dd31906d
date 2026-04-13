import { inject, provide, ref } from "vue";
var LegacyContextKey = Symbol("LegacyTreeSelectContext");
function useLegacyProvider(value) {
	provide(LegacyContextKey, value);
}
function useLegacyContext() {
	return inject(LegacyContextKey, ref(null));
}
export { useLegacyContext, useLegacyProvider };
