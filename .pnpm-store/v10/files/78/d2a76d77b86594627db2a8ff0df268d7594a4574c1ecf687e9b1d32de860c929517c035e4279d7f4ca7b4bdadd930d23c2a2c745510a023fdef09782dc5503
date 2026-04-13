import { ModalFunc, ModalStaticFunctions } from "../confirm.js";

//#region src/modal/useModal/types.d.ts
type ModalFuncWithPromise = (...args: Parameters<ModalFunc>) => ReturnType<ModalFunc> & {
  then: <T>(resolve: (confirmed: boolean) => T, reject: VoidFunction) => Promise<T>;
};
type HookAPI = Omit<Record<keyof ModalStaticFunctions, ModalFuncWithPromise>, 'warn'>;
//#endregion
export { HookAPI, ModalFuncWithPromise };