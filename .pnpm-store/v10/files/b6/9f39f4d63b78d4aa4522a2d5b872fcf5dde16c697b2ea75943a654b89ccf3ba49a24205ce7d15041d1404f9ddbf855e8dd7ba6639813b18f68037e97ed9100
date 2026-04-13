import { inject, provide, ref } from "vue";
var SelectInputKey = Symbol("SelectInputContext");
function useSelectInputContext() {
	return inject(SelectInputKey, ref(null));
}
function useSelectInputProvider(context) {
	provide(SelectInputKey, context);
}
export { useSelectInputContext, useSelectInputProvider };
