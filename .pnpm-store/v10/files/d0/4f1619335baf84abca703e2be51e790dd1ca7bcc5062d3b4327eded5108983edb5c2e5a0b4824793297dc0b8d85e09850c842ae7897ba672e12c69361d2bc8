import { inject, provide, ref } from "vue";

//#region src/breadcrumb/BreadcrumbContext.ts
const BreadcrumbContextKey = Symbol("BreadcrumbContext");
function useBreadcrumbProvider(value) {
	provide(BreadcrumbContextKey, value);
}
function useBreadcrumbContext() {
	return inject(BreadcrumbContextKey, ref({}));
}

//#endregion
export { useBreadcrumbContext, useBreadcrumbProvider };