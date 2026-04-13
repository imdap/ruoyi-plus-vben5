import { inject, provide, ref } from "vue";

//#region src/steps/context.ts
const InternalContext = Symbol("InternalContext");
function provideInternalContext(value) {
	provide(InternalContext, value);
}
/**
* When use this context. Will trade as sub component instead of root Steps component.
*/
function useInternalContext() {
	return inject(InternalContext, ref(null));
}

//#endregion
export { provideInternalContext, useInternalContext };