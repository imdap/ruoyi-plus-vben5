import { inject, provide, ref } from "vue";

//#region src/modal/context.ts
const ModalContextKey = Symbol("ModalContext");
function useModalContext() {
	return inject(ModalContextKey, ref({}));
}
function useModalProvider(value) {
	provide(ModalContextKey, value);
}

//#endregion
export { useModalContext, useModalProvider };