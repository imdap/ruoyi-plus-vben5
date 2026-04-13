import { inject, provide, ref } from "vue";
var BaseSelectContext = Symbol("BaseSelectContext");
function useBaseSelectProvider(context) {
	provide(BaseSelectContext, context);
}
function useBaseProps() {
	return inject(BaseSelectContext, ref(null));
}
export { useBaseProps as default, useBaseSelectProvider };
