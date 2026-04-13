import { inject, provide, ref } from "vue";

//#region src/space/context.ts
const SpaceContextKey = Symbol("SpaceContextKey");
function useSpaceContextProvider(props) {
	provide(SpaceContextKey, props);
}
function useSpaceContext() {
	return inject(SpaceContextKey, ref({ latestIndex: 0 }));
}

//#endregion
export { SpaceContextKey, useSpaceContext, useSpaceContextProvider };