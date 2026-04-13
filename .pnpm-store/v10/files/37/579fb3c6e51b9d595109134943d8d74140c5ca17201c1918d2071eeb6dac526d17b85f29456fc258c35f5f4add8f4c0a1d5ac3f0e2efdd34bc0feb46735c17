import { DataEntity, IconType } from '@v-c/tree';
import { Ref } from 'vue';
import { Key, SafeKey } from './interface';
import { TreeSelectProps } from './TreeSelect';
export interface LegacyContextProps {
    checkable: boolean | any;
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    treeExpandedKeys?: Key[];
    treeDefaultExpandedKeys: Key[];
    onTreeExpand?: (keys: Key[]) => void;
    treeDefaultExpandAll?: boolean;
    treeIcon?: IconType;
    showTreeIcon?: boolean;
    switcherIcon?: IconType;
    treeLine?: boolean;
    treeNodeFilterProp: string;
    treeLoadedKeys?: SafeKey[];
    treeMotion?: any;
    loadData?: TreeSelectProps['loadData'];
    onTreeLoad?: TreeSelectProps['onTreeLoad'];
    keyEntities: Record<string, DataEntity<any>>;
}
export declare function useLegacyProvider(value: Ref<LegacyContextProps>): void;
export declare function useLegacyContext(): Ref<LegacyContextProps | null>;
