import { CSSProperties, InjectionKey } from 'vue';
import { BasicDataNode, DataNode, Direction, EventDataNode, IconType, Key, KeyEntities, TreeNodeProps } from './interface';
import { AllowDropOptions } from './util';
export interface NodeMouseEventParams<TreeDataType extends BasicDataNode = DataNode> {
    event: MouseEvent;
    node: EventDataNode<TreeDataType>;
}
export interface NodeDragEventParams<TreeDataType extends BasicDataNode = DataNode> {
    event: DragEvent;
    node: EventDataNode<TreeDataType>;
}
export type NodeMouseEventHandler<TreeDataType extends BasicDataNode = DataNode> = (e: MouseEvent, node: EventDataNode<TreeDataType>) => void;
export type NodeDragEventHandler<TreeDataType extends BasicDataNode = DataNode> = (e: DragEvent, nodeProps: TreeNodeProps<TreeDataType>, outsideTree?: boolean) => void;
export type DraggableFn = (node: DataNode) => boolean;
export interface DraggableConfig {
    icon?: any | false;
    nodeDraggable?: DraggableFn;
}
export interface DropIndicatorRenderProps {
    dropPosition: -1 | 0 | 1;
    dropLevelOffset: number;
    indent: number;
    prefixCls: string;
    direction: Direction;
}
export type SemanticName = 'itemIcon' | 'item' | 'itemTitle' | 'itemSwitcher';
export interface TreeContextProps<TreeDataType extends BasicDataNode = DataNode> {
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    classNames?: Partial<Record<SemanticName, string>>;
    prefixCls: string;
    selectable: boolean;
    showIcon: boolean;
    icon?: IconType;
    switcherIcon?: IconType;
    draggable?: DraggableConfig;
    draggingNodeKey?: Key | null;
    checkable: boolean | any;
    checkStrictly: boolean;
    disabled: boolean;
    keyEntities: KeyEntities;
    dropLevelOffset?: number | null;
    dropContainerKey: Key | null;
    dropTargetKey: Key | null;
    dropPosition: -1 | 0 | 1 | null;
    indent: number | null;
    dropIndicatorRender: (props: DropIndicatorRenderProps) => any;
    dragOverNodeKey: Key | null;
    direction: Direction;
    loadData?: (treeNode: EventDataNode<TreeDataType>) => Promise<void>;
    filterTreeNode?: (treeNode: EventDataNode<TreeDataType>) => boolean;
    titleRender?: (node: TreeDataType) => any;
    allowDrop?: (options: AllowDropOptions<TreeDataType>) => boolean;
    onNodeClick: NodeMouseEventHandler<TreeDataType>;
    onNodeDoubleClick: NodeMouseEventHandler<TreeDataType>;
    onNodeExpand: NodeMouseEventHandler<TreeDataType>;
    onNodeSelect: NodeMouseEventHandler<TreeDataType>;
    onNodeCheck: (e: MouseEvent, treeNode: EventDataNode<TreeDataType>, checked: boolean) => void;
    onNodeLoad: (treeNode: EventDataNode<TreeDataType>) => void;
    onNodeMouseEnter: NodeMouseEventHandler<TreeDataType>;
    onNodeMouseLeave: NodeMouseEventHandler<TreeDataType>;
    onNodeContextMenu: NodeMouseEventHandler<TreeDataType>;
    onNodeDragStart: NodeDragEventHandler<TreeDataType>;
    onNodeDragEnter: NodeDragEventHandler<TreeDataType>;
    onNodeDragOver: NodeDragEventHandler<TreeDataType>;
    onNodeDragLeave: NodeDragEventHandler<TreeDataType>;
    onNodeDragEnd: NodeDragEventHandler<TreeDataType>;
    onNodeDrop: NodeDragEventHandler<TreeDataType>;
}
export declare const TreeContextKey: InjectionKey<TreeContextProps<any>>;
/** Internal usage, safe to remove. Do not use in prod */
export declare const UnstableContextKey: InjectionKey<{
    nodeDisabled?: (n: DataNode) => boolean;
}>;
