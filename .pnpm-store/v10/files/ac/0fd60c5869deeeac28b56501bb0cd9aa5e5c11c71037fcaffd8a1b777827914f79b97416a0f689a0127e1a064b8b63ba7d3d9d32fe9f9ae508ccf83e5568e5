import { ModalFuncProps } from "./interface.js";

//#region src/modal/confirm.d.ts
type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);
type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (configUpdate: ConfigUpdate) => void;
};
type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFunc>;
declare function confirm(config: ModalFuncProps): {
  destroy: (...args: any[]) => void;
  update: (configUpdate: ConfigUpdate) => void;
};
declare function withWarn(props: ModalFuncProps): ModalFuncProps;
declare function withInfo(props: ModalFuncProps): ModalFuncProps;
declare function withSuccess(props: ModalFuncProps): ModalFuncProps;
declare function withError(props: ModalFuncProps): ModalFuncProps;
declare function withConfirm(props: ModalFuncProps): ModalFuncProps;
declare function modalGlobalConfig({
  rootPrefixCls
}: {
  rootPrefixCls: string;
}): void;
//#endregion
export { ConfigUpdate, ModalFunc, ModalStaticFunctions, confirm as default, modalGlobalConfig, withConfirm, withError, withInfo, withSuccess, withWarn };