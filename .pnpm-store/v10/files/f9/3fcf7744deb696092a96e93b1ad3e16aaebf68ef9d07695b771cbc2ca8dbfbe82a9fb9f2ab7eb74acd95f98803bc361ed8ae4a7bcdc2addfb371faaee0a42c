import Modal_default from "./Modal.js";
import destroyFns_default from "./destroyFns.js";
import confirm, { modalGlobalConfig, withError, withInfo, withSuccess, withWarn } from "./confirm.js";
import PurePanel_default from "./PurePanel.js";
import useModal from "./useModal/index.js";

//#region src/modal/index.tsx
const Modal = Modal_default;
Modal.useModal = useModal;
Modal.confirm = confirm;
Modal.info = (config) => confirm(withInfo(config));
Modal.success = (config) => confirm(withSuccess(config));
Modal.error = (config) => confirm(withError(config));
Modal.warning = (config) => confirm(withWarn(config));
Modal.warn = Modal.warning;
Modal.destroyAll = () => {
	while (destroyFns_default.length) destroyFns_default.pop()?.();
};
Modal.config = modalGlobalConfig;
Modal.install = (app) => {
	app.component(Modal.name, Modal);
};
var modal_default = Modal;
Modal._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default;

//#endregion
export { modal_default as default, useModal };