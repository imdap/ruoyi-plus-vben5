import { ArgsProps, GlobalConfigProps } from "./interface.js";
import PurePanel from "./PurePanel.js";
import useNotification from "./useNotification.js";
import { Key } from "@v-c/util/dist/type";

//#region src/notification/index.d.ts
interface BaseMethods {
  open: (config: ArgsProps) => void;
  destroy: (key?: Key) => void;
  config: (config: GlobalConfigProps) => void;
  useNotification: typeof useNotification;
  /** @private Internal Component. Do not use in your production. */
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
}
type StaticFn = (config: ArgsProps) => void;
interface NoticeMethods {
  success: StaticFn;
  info: StaticFn;
  warning: StaticFn;
  error: StaticFn;
}
declare const staticMethods: NoticeMethods & BaseMethods;
declare function noop(): void;
declare const actWrapper: (wrapper: any) => void;
declare const actDestroy: typeof noop;
//#endregion
export { type ArgsProps, actDestroy, actWrapper, staticMethods as default, useNotification };