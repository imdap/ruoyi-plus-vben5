import { inject, provide } from "vue";
//#region src/VirtualTable/context.tsx
var StaticContextKey = Symbol("TableVirtualStaticContext");
var GridContextKey = Symbol("TableVirtualGridContext");
function useProvideStaticContext(value) {
	provide(StaticContextKey, value);
}
function useInjectStaticContext() {
	return inject(StaticContextKey, {});
}
function useProvideGridContext(value) {
	provide(GridContextKey, value);
}
function useInjectGridContext() {
	return inject(GridContextKey, {});
}
//#endregion
export { useInjectGridContext, useInjectStaticContext, useProvideGridContext, useProvideStaticContext };
