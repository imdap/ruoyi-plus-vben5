import { inject, provide, ref } from "vue";
var CascaderContextKey = Symbol("CascaderContext");
function useCascaderProvider(value) {
	provide(CascaderContextKey, value);
}
function useCascaderContext() {
	return inject(CascaderContextKey, ref(null));
}
export { useCascaderContext, useCascaderProvider };
