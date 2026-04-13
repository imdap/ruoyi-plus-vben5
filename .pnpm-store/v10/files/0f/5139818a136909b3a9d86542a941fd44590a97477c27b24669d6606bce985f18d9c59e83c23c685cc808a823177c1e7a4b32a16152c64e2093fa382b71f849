import { Component, Plugin, PropType, Ref, SlotsType, VNode } from 'vue';
export declare const tuple: <T extends string[]>(...args: T) => T;
export declare const tupleNum: <T extends number[]>(...args: T) => T;
/**
 * https://stackoverflow.com/a/59187769
 * Extract the type of an element of an array/tuple without performing indexing
 */
export type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;
/**
 * https://github.com/Microsoft/TypeScript/issues/29729
 */
export type LiteralUnion<T extends string> = T | (string & {});
export type Data = Record<string, unknown>;
export type Key = string | number;
type DefaultFactory<T> = (props: Data) => T | null | undefined;
export interface PropOptions<T = any, D = T> {
    type?: PropType<T> | true | null;
    required?: boolean;
    default?: D | DefaultFactory<D> | null | undefined | object;
    validator?: (value: unknown) => boolean;
}
declare type VNodeChildAtom = Component | VNode | string | number | null | undefined | void | boolean;
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | VNode;
export declare function withInstall<T>(comp: T): T & Plugin;
export type MaybeRef<T> = T | Ref<T>;
export declare function eventType<T>(): {
    type: PropType<T | T[]>;
};
export declare function objectType<T = object>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export declare function booleanType(defaultVal?: boolean): {
    type: BooleanConstructor;
    default: boolean;
};
export declare function functionType<T = () => object>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export declare function anyType<T = any>(defaultVal?: T, required?: boolean): {
    default: T;
    type: PropType<T>;
};
export declare function vNodeType<T = VueNode>(): {
    type: PropType<T>;
};
export declare function arrayType<T extends any[]>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export declare function stringType<T extends string = string>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export declare function someType<T>(types?: any[], defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export type CustomSlotsType<T extends Record<string, any>> = SlotsType<T>;
export type AnyObject = Record<PropertyKey, any>;
export {};
