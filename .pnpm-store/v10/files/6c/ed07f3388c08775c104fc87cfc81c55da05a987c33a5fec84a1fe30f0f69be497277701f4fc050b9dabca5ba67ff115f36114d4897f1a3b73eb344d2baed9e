import { inject, provide, ref } from "vue";

//#region src/descriptions/DescriptionsContext.ts
const DescriptionsContext = Symbol("DescriptionsContext");
function useDescriptionsProvider(props) {
	provide(DescriptionsContext, props);
}
function useDescriptionsCtx() {
	return inject(DescriptionsContext, ref({}));
}

//#endregion
export { useDescriptionsCtx, useDescriptionsProvider };