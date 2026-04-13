import { inject, provide } from "vue";
//#region src/context.ts
var PreviewGroupContextKey = Symbol("PreviewGroupContext");
function usePreviewGroupContext() {
	return inject(PreviewGroupContextKey, null);
}
function usePreviewGroupProvider(value) {
	provide(PreviewGroupContextKey, value);
}
//#endregion
export { usePreviewGroupContext, usePreviewGroupProvider };
