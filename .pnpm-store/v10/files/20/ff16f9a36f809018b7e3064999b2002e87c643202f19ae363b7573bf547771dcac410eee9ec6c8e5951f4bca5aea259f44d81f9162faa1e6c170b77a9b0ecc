import { DataEntity, ExpandAction } from '@v-c/tree';
import { Ref } from 'vue';
import { DataNode, FieldNames, Key, SelectSource } from './interface';
import { TreeSelectProps } from './TreeSelect';
export interface TreeSelectContextProps {
    virtual?: boolean;
    popupMatchSelectWidth?: boolean | number;
    listHeight: number;
    listItemHeight: number;
    listItemScrollOffset?: number;
    treeData: DataNode[];
    fieldNames: FieldNames;
    onSelect: (value: Key, info: {
        selected: boolean;
        source?: SelectSource;
    }) => void;
    treeExpandAction?: ExpandAction;
    treeTitleRender?: (node: any) => any;
    onPopupScroll?: (event: Event) => void;
    leftMaxCount: number | null;
    /** When `true`, only take leaf node as count, or take all as count with `maxCount` limitation */
    leafCountOnly: boolean;
    valueEntities: Map<Key, DataEntity>;
    classNames?: TreeSelectProps['classNames'];
    styles?: TreeSelectProps['styles'];
}
export declare function useTreeSelectProvider(value: Ref<TreeSelectContextProps>): void;
export declare function useTreeSelectContext(): Ref<TreeSelectContextProps | null>;
