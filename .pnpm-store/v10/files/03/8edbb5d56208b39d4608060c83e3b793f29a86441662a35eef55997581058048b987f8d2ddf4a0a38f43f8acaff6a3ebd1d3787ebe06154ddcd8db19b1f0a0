import { ArgsProps, ConfigOptions, MessageType, TypeOpen } from "./interface.js";
import PurePanel from "./PurePanel.js";
import useMessage from "./useMessage.js";
import { Key } from "@v-c/util/dist/type";

//#region src/message/index.d.ts
interface BaseMethods {
  open: (config: ArgsProps) => MessageType;
  destroy: (key?: Key) => void;
  config: (config: ConfigOptions) => void;
  useMessage: typeof useMessage;
  /** @private Internal Component. Do not use in your production. */
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
}
interface MessageMethods {
  info: TypeOpen;
  success: TypeOpen;
  error: TypeOpen;
  warning: TypeOpen;
  loading: TypeOpen;
}
declare const staticMethods: MessageMethods & BaseMethods;
declare function noop(): void;
declare const actWrapper: (wrapper: any) => void;
declare const actDestroy: typeof noop;
//#endregion
export { type ArgsProps, actDestroy, actWrapper, staticMethods as default, useMessage };