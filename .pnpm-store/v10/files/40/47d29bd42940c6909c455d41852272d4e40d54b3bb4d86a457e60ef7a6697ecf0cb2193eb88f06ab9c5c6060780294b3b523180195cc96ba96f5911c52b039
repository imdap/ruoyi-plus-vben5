import { Slots, VNode, VNodeArrayChildren, VNodeProps } from 'vue';
import { RefObject } from './createRef';
type NodeProps = Record<string, any> & Omit<VNodeProps, 'ref'> & {
    ref?: VNodeProps['ref'] | RefObject;
};
export declare function cloneElement<T, U>(vnode: VNode<T, U> | VNode<T, U>[], nodeProps?: NodeProps, override?: boolean, mergeRef?: boolean): VNode<T, U> | null;
export declare function cloneVNodes(vnodes: any, nodeProps?: {}, override?: boolean): any;
export declare function deepCloneElement<T, U>(vnode: VNode<T, U> | VNode<T, U>[], nodeProps?: NodeProps, override?: boolean, mergeRef?: boolean): any;
export declare function triggerVNodeUpdate(vm: VNode, attrs: Record<string, any>, dom: any): void;
export declare function ensureValidVNode<T extends Array<unknown>>(slot: T | null): T;
export declare function customRenderSlot(slots: Slots, name: string, props: Record<string, unknown>, fallback?: () => VNodeArrayChildren): VNodeArrayChildren;
export declare function resolveToElement(node: any): any;
export {};
