import { inject, provide } from "vue";

//#region src/grid/RowContext.ts
const RowContext = Symbol("RowContext");
function useRowContextProvider(value) {
	provide(RowContext, value);
}
function useRowContext() {
	return inject(RowContext, {});
}

//#endregion
export { useRowContext, useRowContextProvider };