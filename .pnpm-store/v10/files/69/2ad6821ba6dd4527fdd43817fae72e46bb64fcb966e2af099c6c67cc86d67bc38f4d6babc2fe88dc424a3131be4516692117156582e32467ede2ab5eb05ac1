import { ModalEmits, ModalSlots } from "./interface.js";
import confirm, { modalGlobalConfig } from "./confirm.js";
import useModal from "./useModal/index.js";
import Modal, { InternalModalProps } from "./Modal.js";

//#region src/modal/index.d.ts
interface StaticModal {
  useModal: typeof useModal;
  confirm: typeof confirm;
  info: typeof confirm;
  success: typeof confirm;
  error: typeof confirm;
  warning: typeof confirm;
  warn: typeof confirm;
  destroyAll: () => void;
  config: typeof modalGlobalConfig;
}
type ModalProps = InternalModalProps;
declare const _default: typeof Modal & StaticModal;
//#endregion
export { type ModalEmits, ModalProps, type ModalSlots, _default as default, useModal };