import type { KeyOf, ValueOf1 as ValueOf } from '../types.js';
declare const nodeValueSymbol: unique symbol;
export interface NodeComments {
    readonly comment?: string | undefined;
    readonly commentBefore?: string | undefined;
}
export interface NodeValue<T> extends NodeComments {
    readonly [nodeValueSymbol]?: true;
    readonly value: T;
}
export type NodeOrValue<T> = T | NodeValue<T>;
export interface CfgNodeBase<T> {
    readonly type: 'scalar' | 'array' | 'object';
    readonly value: T;
    getValue?: (<K extends KeyOf<T>>(key: K) => ValueOf<T, K> | undefined) | undefined;
    getNode?: (<K extends KeyOf<T>>(key: K) => RCfgNode<ValueOf<T, K>> | undefined) | undefined;
    setValue?: (<K extends KeyOf<T>>(key: K, value: NodeOrValue<ValueOf<T, K>>) => void) | undefined;
    delete?: (<K extends KeyOf<T>>(key: K) => boolean) | undefined;
    readonly length?: number | undefined;
    comment?: string | undefined;
    commentBefore?: string | undefined;
}
type ScalarValue = string | number | boolean | null | undefined;
export interface CfgScalarNode<T extends ScalarValue> extends CfgNodeBase<T> {
    readonly type: 'scalar';
    readonly value: T;
    setValue?: undefined;
    getValue?: undefined;
    getNode?: undefined;
    setNode?: undefined;
    sort?: undefined;
    getItems?: undefined;
    length?: undefined;
}
export interface CfgArrayNode<T> extends CfgNodeBase<{
    [key: number]: T;
}> {
    readonly type: 'array';
    readonly value: T[];
    getValue: (key: number) => T | undefined;
    getNode: (key: number) => RCfgNode<T> | undefined;
    setValue: (key: number, value: NodeOrValue<T>) => void;
    delete: (key: number) => boolean;
    push: (value: NodeOrValue<T>) => number;
    readonly length: number;
}
export interface CfgObjectNode<T extends object> extends CfgNodeBase<T> {
    readonly type: 'object';
    getValue: <K extends KeyOf<T>>(key: K) => ValueOf<T, K> | undefined;
    getNode: <K extends KeyOf<T>>(key: K) => RCfgNode<ValueOf<T, K>> | undefined;
    setValue: <K extends KeyOf<T>>(key: K, value: NodeOrValue<ValueOf<T, K>>) => void;
    delete: <K extends KeyOf<T>>(key: K) => boolean;
    readonly length?: undefined;
}
export type RCfgNode<T> = T extends undefined ? undefined : CfgNode<T>;
export type CfgNode<T> = T extends unknown[] ? CfgArrayNode<T[number]> : T extends object ? CfgObjectNode<T> : T extends string | number | boolean | undefined ? CfgScalarNode<T> : CfgNodeBase<T>;
export declare function isNodeValue<T>(value: unknown): value is NodeValue<T>;
export declare function createNodeValue<T>(value: T, comment?: string, commentBefore?: string): NodeValue<T>;
export declare function isCfgArrayNode<T>(node: CfgArrayNode<T> | CfgNodeBase<unknown> | undefined): node is CfgArrayNode<T>;
export declare function isCfgObjectNode<T extends object>(node: CfgObjectNode<T> | CfgNodeBase<unknown> | undefined): node is CfgObjectNode<T>;
export declare function isCfgScalarNode<T extends ScalarValue>(node: CfgNodeBase<T> | CfgNodeBase<unknown> | undefined): node is CfgScalarNode<T>;
export {};
//# sourceMappingURL=CfgTree.d.ts.map