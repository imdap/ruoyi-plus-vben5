import { inject, provide } from "vue";

//#region src/layout/context.ts
const LayoutContextSymbol = Symbol("LayoutContext");
function useLayoutProvider(props) {
	provide(LayoutContextSymbol, props);
}
function useLayoutCtx() {
	return inject(LayoutContextSymbol, { siderHook: {
		addSider: () => null,
		removeSider: () => null
	} });
}

//#endregion
export { useLayoutCtx, useLayoutProvider };