import { computed, defineComponent, inject, provide, ref } from "vue";

//#region src/_util/zindexContext.ts
const ZIndexContextKey = Symbol("ZIndexContextKey");
function useZIndexContext() {
	return inject(ZIndexContextKey, ref(void 0));
}
function useZIndexProvider(zIndex) {
	provide(ZIndexContextKey, zIndex);
}
const ZIndexProvider = defineComponent((props, { slots }) => {
	useZIndexProvider(computed(() => {
		return props.value;
	}));
	return () => {
		return slots?.default?.();
	};
}, { props: ["value"] });

//#endregion
export { ZIndexProvider, useZIndexContext, useZIndexProvider };