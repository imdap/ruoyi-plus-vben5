import { Key, VueNode } from '@v-c/util/dist/type';
import { EditableConfig } from './interface';
export declare const tabsGlobal: {
    uuid: number;
};
export declare function setUUid(uuid: number): void;
export declare function getUUid(): number;
/**
 * We trade Map as deps which may change with same value but different ref object.
 * We should make it as hash for deps
 */
export declare function stringify<K extends PropertyKey, V>(obj: Record<K, V> | Map<K, V>): string;
export declare function getRemovable(closable?: boolean, closeIcon?: VueNode, editable?: EditableConfig, disabled?: boolean): boolean;
export declare function genDataNodeKey(key: Key): string;
