import { VNode } from "vue";

//#region src/_util/vnode/index.d.ts
declare function resolveVNodeProps(vnode: VNode, name?: string, markerKey?: string): {
  [x: string]: any;
};
declare function resolveSlotsNode<T = any>(slots: Record<string, any>, slotName: string, name?: string, markerKey?: string): T[];
//#endregion
export { resolveSlotsNode, resolveVNodeProps };