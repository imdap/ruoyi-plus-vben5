import { VNode, VNodeChild } from "vue";

//#region src/_util/type.d.ts
type AnyObject = Record<string, any>;
type EmptyObject = Record<never, never>;
type RenderNodeFn<Args extends any[] = any[]> = (...args: Args) => VNodeChild;
type VueNode<Args extends any[] = any[]> = RenderNodeFn<Args> | string | number | null | undefined | VNode | boolean;
type EmitsArrToEvent<T extends Record<string, any>> = { [K in keyof T]: T[K] extends any[] ? (...args: T[K]) => void : T[K] };
type EmitsType<T extends Record<string, any>> = EmitsArrToEvent<T>;
interface EmptyEmit {}
type SlotsDefineType<T extends Record<string, any> = Record<string, any>> = {
  default?: () => any;
} & T;
type ValidChar = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';
//#endregion
export { AnyObject, EmitsArrToEvent, EmitsType, EmptyEmit, EmptyObject, RenderNodeFn, SlotsDefineType, ValidChar, VueNode };