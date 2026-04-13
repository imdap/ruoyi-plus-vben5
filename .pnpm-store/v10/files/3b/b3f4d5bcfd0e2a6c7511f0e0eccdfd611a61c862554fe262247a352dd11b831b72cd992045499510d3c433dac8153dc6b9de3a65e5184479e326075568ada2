import { Key, VueNode } from '@v-c/util/dist/type';
export type RawValueType = string | number;
export interface FlattenOptionData<OptionType = any> {
    label?: VueNode;
    data: OptionType;
    key: Key;
    value?: RawValueType;
    groupOption?: boolean;
    group?: boolean;
}
export interface DisplayValueType {
    key?: Key;
    value?: RawValueType;
    label?: VueNode;
    title?: VueNode;
    disabled?: boolean;
    index?: number;
}
export type RenderNode = VueNode | ((props: any) => VueNode);
export type RenderDOMFunc = (props: any) => HTMLElement;
export type Mode = 'multiple' | 'tags' | 'combobox';
export type Placement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
export type DisplayInfoType = 'add' | 'remove' | 'clear';
