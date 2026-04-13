import { inject, provide } from "vue";
//#region src/Footer/SummaryContext.tsx
var SummaryContextKey = Symbol("TableSummaryContext");
function useProvideSummaryContext(value) {
	provide(SummaryContextKey, value);
}
function useInjectSummaryContext() {
	return inject(SummaryContextKey, {});
}
//#endregion
export { useInjectSummaryContext, useProvideSummaryContext };
