import { inject, provide } from "vue";

//#region src/checkbox/GroupContext.tsx
const GroupContextKey = Symbol("GroupContext");
function useGroupContextProvider(value) {
	provide(GroupContextKey, value);
}
function useGroupContext() {
	return inject(GroupContextKey, void 0);
}

//#endregion
export { useGroupContext, useGroupContextProvider };