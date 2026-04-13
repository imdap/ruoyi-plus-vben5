import { inject, provide } from "vue";

//#region src/anchor/context.ts
const AnchorContextKey = Symbol("AnchorContext");
function useAnchorProvider(ctx) {
	provide(AnchorContextKey, ctx);
}
function useAnchorContext() {
	return inject(AnchorContextKey, void 0);
}

//#endregion
export { useAnchorContext, useAnchorProvider };