import { VueNode } from "../../_util/type.js";

//#region src/typography/Base/util.d.ts
declare function toList<T>(val: T | T[]): T[];
declare function getNode(dom: VueNode, defaultNode: VueNode, needDom?: boolean): VueNode;
/**
 * Check for element is native ellipsis
 * ref:
 * - https://github.com/ant-design/ant-design/issues/50143
 * - https://github.com/ant-design/ant-design/issues/50414
 */
declare function isEleEllipsis(ele: HTMLElement): boolean;
declare const isValidText: (val: any) => val is string | number;
//#endregion
export { getNode, isEleEllipsis, isValidText, toList };