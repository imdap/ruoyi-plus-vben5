import { inject, provide, ref } from "vue";
var SelectContextKey = Symbol("SelectContext");
function useSelectProvider(value) {
	provide(SelectContextKey, value);
}
function useSelectContext() {
	return inject(SelectContextKey, ref(null));
}
export { useSelectContext, useSelectProvider };
