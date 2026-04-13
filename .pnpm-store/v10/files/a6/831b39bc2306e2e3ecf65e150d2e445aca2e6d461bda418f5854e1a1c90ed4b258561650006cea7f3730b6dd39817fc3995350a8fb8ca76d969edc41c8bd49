import { BasicDataNode, DataEntity, DataNode, Direction, FlattenNode, Key, KeyEntities, TreeNodeProps } from './interface';
export interface AllowDropOptions<TreeDataType extends BasicDataNode = DataNode> {
    dragNode: TreeDataType;
    dropNode: TreeDataType;
    dropPosition: -1 | 0 | 1;
}
export type AllowDrop<TreeDataType extends BasicDataNode = DataNode> = (options: AllowDropOptions<TreeDataType>) => boolean;
export declare function arrDel(list: Key[], value: Key): import('packages/util/dist/type').Key[];
export declare function arrAdd(list: Key[], value: Key): import('packages/util/dist/type').Key[];
export declare function posToArr(pos: string): string[];
export declare function getDragChildrenKeys<TreeDataType extends BasicDataNode = DataNode>(dragNodeKey: Key, keyEntities: KeyEntities<TreeDataType>): Key[];
export declare function isLastChild<TreeDataType extends BasicDataNode = DataNode>(treeNodeEntity: DataEntity<TreeDataType>): boolean;
export declare function isFirstChild<TreeDataType extends BasicDataNode = DataNode>(treeNodeEntity: DataEntity<TreeDataType>): boolean;
export declare function calcDropPosition<TreeDataType extends BasicDataNode = DataNode>(event: MouseEvent, dragNodeProps: TreeNodeProps<TreeDataType>, targetNodeProps: TreeNodeProps<TreeDataType>, indent: number, startMousePosition: {
    x: number;
    y: number;
}, allowDrop: AllowDrop<TreeDataType>, flattenedNodes: FlattenNode<TreeDataType>[], keyEntities: KeyEntities<TreeDataType>, expandKeys: Key[], direction: Direction): {
    dropPosition: -1 | 0 | 1;
    dropLevelOffset: number;
    dropTargetKey: Key;
    dropTargetPos: string;
    dropContainerKey: Key | null;
    dragOverNodeKey: Key;
    dropAllowed: boolean;
};
export declare function calcSelectedKeys(selectedKeys: Key[], { multiple }: {
    multiple?: boolean;
}): import('packages/util/dist/type').Key[] | undefined;
export declare function parseCheckedKeys(keys: Key[] | {
    checked: Key[];
    halfChecked: Key[];
}): {
    checkedKeys?: Key[];
    halfCheckedKeys?: Key[];
} | null;
export declare function conductExpandParent(keyList: Key[], keyEntities: KeyEntities): Key[];
