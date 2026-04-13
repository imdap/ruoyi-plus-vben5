import { inject, provide } from "vue";
var UnstableContextKey = Symbol("UnstableContext");
function useUnstableContext() {
	return inject(UnstableContextKey, {});
}
function useUnstableContextProvider(value) {
	provide(UnstableContextKey, value);
}
export { useUnstableContext, useUnstableContextProvider };
