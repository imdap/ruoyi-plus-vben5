import { inject, provide, ref } from "vue";
var UnstableContextKey = Symbol("UnstableContext");
function useUnstableContext() {
	return inject(UnstableContextKey, { railFollowPrevStatus: ref() });
}
function useUnstableProvider(value) {
	provide(UnstableContextKey, value);
}
export { useUnstableContext, useUnstableProvider };
