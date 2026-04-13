import { inject, provide } from "vue";
//#region src/TabContext.ts
var TabContextKey = Symbol("TabContext");
function provideTabContext(value) {
	provide(TabContextKey, value);
}
function useTabContext() {
	return inject(TabContextKey, {});
}
//#endregion
export { provideTabContext, useTabContext };
