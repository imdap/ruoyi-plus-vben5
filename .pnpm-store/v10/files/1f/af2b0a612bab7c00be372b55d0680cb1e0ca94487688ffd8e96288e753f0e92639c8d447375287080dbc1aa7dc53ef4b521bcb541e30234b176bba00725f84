import { BasicDataNode, DataEntity, DataNode, EventDataNode, FieldNames, FlattenNode, GetKey, Key, KeyEntities, NodeElement, TreeNodeProps } from '../interface';
export declare function getPosition(level: string | number, index: number): string;
export declare function isTreeNode(node: NodeElement): boolean;
export declare function getKey(key: Key, pos: string): import('packages/util/dist/type').Key;
export declare function fillFieldNames(fieldNames?: FieldNames): Required<FieldNames>;
export declare function warningWithoutKey(treeData: DataNode[], fieldNames: FieldNames): void;
export declare function convertTreeToData(rootNodes: any): DataNode[];
export declare function flattenTreeData<TreeDataType extends BasicDataNode = DataNode>(treeNodeList: TreeDataType[], expandedKeys: Key[] | true, fieldNames: FieldNames): FlattenNode<TreeDataType>[];
type ExternalGetKey = GetKey<DataNode> | string;
interface TraverseDataNodesConfig {
    childrenPropName?: string;
    externalGetKey?: ExternalGetKey;
    fieldNames?: FieldNames;
}
export declare function traverseDataNodes(dataNodes: DataNode[], callback: (data: {
    node: DataNode;
    index: number;
    pos: string;
    key: Key;
    parentPos: string | number | null;
    level: number;
    nodes: DataNode[];
}) => void, config?: TraverseDataNodesConfig | string): void;
interface Wrapper {
    posEntities: Record<string, DataEntity>;
    keyEntities: KeyEntities;
}
export declare function convertDataToEntities(dataNodes: DataNode[], { initWrapper, processEntity, onProcessFinished, externalGetKey, childrenPropName, fieldNames, }?: {
    initWrapper?: (wrapper: Wrapper) => Wrapper;
    processEntity?: (entity: DataEntity, wrapper: Wrapper) => void;
    onProcessFinished?: (wrapper: Wrapper) => void;
    externalGetKey?: ExternalGetKey;
    childrenPropName?: string;
    fieldNames?: FieldNames;
}, 
/** @deprecated Use `config.externalGetKey` instead */
legacyExternalGetKey?: ExternalGetKey): Wrapper;
export interface TreeNodeRequiredProps<TreeDataType extends BasicDataNode = DataNode> {
    expandedKeys: Key[];
    selectedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    checkedKeys: Key[];
    halfCheckedKeys: Key[];
    dragOverNodeKey: Key | null;
    dropPosition: number | null;
    keyEntities: KeyEntities<TreeDataType>;
}
export declare function getTreeNodeProps<TreeDataType extends BasicDataNode = DataNode>(key: Key, { expandedKeys, selectedKeys, loadedKeys, loadingKeys, checkedKeys, halfCheckedKeys, dragOverNodeKey, dropPosition, keyEntities, }: TreeNodeRequiredProps<TreeDataType>): {
    eventKey: import('packages/util/dist/type').Key;
    expanded: boolean;
    selected: boolean;
    loaded: boolean;
    loading: boolean;
    checked: boolean;
    halfChecked: boolean;
    pos: string;
    dragOver: boolean;
    dragOverGapTop: boolean;
    dragOverGapBottom: boolean;
};
export declare function convertNodePropsToEventData<TreeDataType extends BasicDataNode = DataNode>(props: TreeNodeProps<TreeDataType>): EventDataNode<TreeDataType>;
export declare function isLeafNode<TreeDataType extends BasicDataNode = DataNode>(isLeaf: boolean | undefined, loadData: ((node: EventDataNode<TreeDataType>) => Promise<any>) | undefined, hasChildren: boolean, loaded: boolean | undefined): boolean;
export {};
