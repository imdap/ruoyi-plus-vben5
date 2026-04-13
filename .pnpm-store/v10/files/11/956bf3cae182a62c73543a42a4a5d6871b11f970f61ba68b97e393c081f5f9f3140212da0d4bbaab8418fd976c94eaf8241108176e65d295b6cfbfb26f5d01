import { MessageType } from "./interface.js";
import { CSSMotionProps } from "@v-c/util/dist/utils/transition";

//#region src/message/util.d.ts
declare function getMotion(prefixCls: string, transitionName?: string): CSSMotionProps;
/** Wrap message open with promise like function */
declare function wrapPromiseFn(openFn: (resolve: VoidFunction) => VoidFunction): MessageType;
//#endregion
export { getMotion, wrapPromiseFn };