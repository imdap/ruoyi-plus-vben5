import { Key, DataNode as TreeDataNode } from '@v-c/tree';
export type { Key };
export type SafeKey = Key;
export interface DataNode extends Record<string, any>, Omit<TreeDataNode, 'key' | 'children'> {
    key?: Key;
    value?: Key;
    children?: DataNode[];
}
export type SelectSource = 'option' | 'selection' | 'input' | 'clear';
export interface LabeledValueType {
    key?: Key;
    value?: Key;
    label?: any;
    /** Only works on `treeCheckStrictly` */
    halfChecked?: boolean;
}
export type DefaultValueType = Key | LabeledValueType | (Key | LabeledValueType)[];
export interface LegacyDataNode extends DataNode {
    props: any;
}
export interface FlattenDataNode {
    data: DataNode;
    key: Key;
    value: Key;
    level: number;
    parent?: FlattenDataNode;
}
export interface SimpleModeConfig {
    id?: string;
    pId?: string;
    rootPId?: SafeKey | null;
}
/** @deprecated This is only used for legacy compatible. Not works on new code. */
export interface LegacyCheckedNode {
    pos: string;
    node: any;
    children?: LegacyCheckedNode[];
}
export interface ChangeEventExtra {
    /** @deprecated Please save prev value by control logic instead */
    preValue: LabeledValueType[];
    triggerValue: Key;
    /** @deprecated Use `onSelect` or `onDeselect` instead. */
    selected?: boolean;
    /** @deprecated Use `onSelect` or `onDeselect` instead. */
    checked?: boolean;
    /** @deprecated This prop not work as react node anymore. */
    triggerNode: any;
    /** @deprecated This prop not work as react node anymore. */
    allCheckedNodes: LegacyCheckedNode[];
}
export interface FieldNames {
    value?: string;
    label?: string;
    children?: string;
    _title?: string[];
}
