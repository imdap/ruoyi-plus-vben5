import { inject, provide, ref } from "vue";
var TreeSelectContextKey = Symbol("TreeSelectContext");
function useTreeSelectProvider(value) {
	provide(TreeSelectContextKey, value);
}
function useTreeSelectContext() {
	return inject(TreeSelectContextKey, ref(null));
}
export { useTreeSelectContext, useTreeSelectProvider };
