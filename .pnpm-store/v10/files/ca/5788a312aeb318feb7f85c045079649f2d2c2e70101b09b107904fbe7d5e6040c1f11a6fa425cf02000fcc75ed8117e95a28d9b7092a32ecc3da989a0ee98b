import { ConfirmCancelBtnProps } from "./components/ConfirmCancelBtn.js";
import { ConfirmOkBtnProps } from "./components/ConfirmOkBtn.js";
import { NormalCancelBtnProps } from "./components/NormalCancelBtn.js";
import { NormalOkBtnProps } from "./components/NormalOkBtn.js";
import { Ref } from "vue";

//#region src/modal/context.d.ts
type ModalContextProps = NormalCancelBtnProps & NormalOkBtnProps & ConfirmOkBtnProps & ConfirmCancelBtnProps;
declare function useModalContext(): Ref<ModalContextProps, ModalContextProps>;
declare function useModalProvider(value: Ref<ModalContextProps>): void;
//#endregion
export { ModalContextProps, useModalContext, useModalProvider };