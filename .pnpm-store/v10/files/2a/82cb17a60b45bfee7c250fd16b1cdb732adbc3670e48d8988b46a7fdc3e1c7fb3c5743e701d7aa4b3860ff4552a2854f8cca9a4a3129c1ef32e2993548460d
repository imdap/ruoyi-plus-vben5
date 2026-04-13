import { BaseSelectPropsWithoutPrivate, BaseSelectSemanticName } from '@v-c/select';
import { ExpandAction, IconType } from '@v-c/tree';
import { VueNode } from '@v-c/util';
import { CSSProperties } from 'vue';
import { DataNode, FieldNames, SafeKey, SimpleModeConfig } from './interface';
import { CheckedStrategy } from './utils/strategyUtil';
export type SemanticName = BaseSelectSemanticName;
export type PopupSemantic = 'item' | 'itemTitle';
export interface SearchConfig {
    searchValue?: string;
    onSearch?: (value: string) => void;
    autoClearSearchValue?: boolean;
    filterTreeNode?: boolean | ((inputValue: string, treeNode: DataNode) => boolean);
    treeNodeFilterProp?: string;
}
export interface TreeSelectProps<ValueType = any, OptionType extends DataNode = DataNode> extends Omit<BaseSelectPropsWithoutPrivate, 'mode' | 'classNames' | 'styles' | 'showSearch'> {
    prefixCls?: string;
    id?: string;
    classNames?: Partial<Record<SemanticName, string>> & {
        popup?: Partial<Record<PopupSemantic, string>>;
    };
    styles?: Partial<Record<SemanticName, CSSProperties>> & {
        popup?: Partial<Record<PopupSemantic, CSSProperties>>;
    };
    value?: ValueType;
    defaultValue?: ValueType;
    onChange?: (value: ValueType, labelList: VueNode[] | null, extra: any) => void;
    showSearch?: boolean | SearchConfig;
    /** @deprecated Use `showSearch.searchValue` instead */
    searchValue?: string;
    /** @deprecated Use `showSearch.searchValue` instead */
    inputValue?: string;
    /** @deprecated Use `showSearch.onSearch` instead */
    onSearch?: (value: string) => void;
    /** @deprecated Use `showSearch.autoClearSearchValue` instead */
    autoClearSearchValue?: boolean;
    /** @deprecated Use `showSearch.filterTreeNode` instead */
    filterTreeNode?: boolean | ((inputValue: string, treeNode: DataNode) => boolean);
    /** @deprecated Use `showSearch.treeNodeFilterProp` instead */
    treeNodeFilterProp?: string;
    onSelect?: (value: ValueType, option: OptionType) => void;
    onDeselect?: (value: ValueType, option: OptionType) => void;
    showCheckedStrategy?: CheckedStrategy;
    treeNodeLabelProp?: string;
    fieldNames?: FieldNames;
    multiple?: boolean;
    treeCheckable?: boolean | VueNode;
    treeCheckStrictly?: boolean;
    labelInValue?: boolean;
    maxCount?: number;
    treeData?: OptionType[];
    treeDataSimpleMode?: boolean | SimpleModeConfig;
    loadData?: (dataNode: any) => Promise<unknown>;
    treeLoadedKeys?: SafeKey[];
    onTreeLoad?: (loadedKeys: SafeKey[]) => void;
    treeDefaultExpandAll?: boolean;
    treeExpandedKeys?: SafeKey[];
    treeDefaultExpandedKeys?: SafeKey[];
    onTreeExpand?: (expandedKeys: SafeKey[]) => void;
    treeExpandAction?: ExpandAction;
    virtual?: boolean;
    listHeight?: number;
    listItemHeight?: number;
    listItemScrollOffset?: number;
    onPopupVisibleChange?: (open: boolean) => void;
    treeTitleRender?: (node: OptionType) => VueNode;
    treeLine?: boolean;
    treeIcon?: IconType;
    showTreeIcon?: boolean;
    switcherIcon?: IconType;
    treeMotion?: any;
    onPopupScroll?: (event: Event) => void;
    popupMatchSelectWidth?: boolean | number;
}
declare const TreeSelect: import('vue').DefineComponent<TreeSelectProps<any, DataNode>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<TreeSelectProps<any, DataNode>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default TreeSelect;
