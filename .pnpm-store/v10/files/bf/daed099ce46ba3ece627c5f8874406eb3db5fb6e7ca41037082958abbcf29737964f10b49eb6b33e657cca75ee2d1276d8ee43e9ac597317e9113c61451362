import { inject, provide, ref } from "vue";
//#region src/context/TableContext.tsx
var TableContextKey = Symbol("TableContextProps");
function useProvideTableContext(props) {
	provide(TableContextKey, props);
}
function useInjectTableContext() {
	return inject(TableContextKey, {});
}
var makeImmutable = (component, _shouldTriggerRender) => component;
var responseImmutable = (component) => component;
function useImmutableMark() {
	return ref(0);
}
//#endregion
export { TableContextKey, makeImmutable, responseImmutable, useImmutableMark, useInjectTableContext, useProvideTableContext };
