import { VueNode } from '@v-c/util/dist/type';
import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { CSSProperties } from 'vue';
import { DraggableConfig, NodeDragEventParams, NodeMouseEventHandler, NodeMouseEventParams, SemanticName } from './contextTypes';
import { BasicDataNode, DataNode, Direction, EventDataNode, FieldNames, IconType, Key, ScrollTo } from './interface';
import { AllowDrop } from './util';
export interface CheckInfo<TreeDataType extends BasicDataNode = DataNode> {
    event: 'check';
    node: EventDataNode<TreeDataType>;
    checked: boolean;
    nativeEvent: MouseEvent;
    checkedNodes: TreeDataType[];
    checkedNodesPositions?: {
        node: TreeDataType;
        pos: string;
    }[];
    halfCheckedKeys?: Key[];
}
export type DraggableFn = (node: DataNode) => boolean;
export type DraggableUnion = DraggableFn | boolean | DraggableConfig;
export type ExpandAction = false | 'click' | 'doubleClick';
export type { SemanticName } from './contextTypes';
export interface TreeProps<TreeDataType extends BasicDataNode = DataNode> {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    styles?: Partial<Record<SemanticName, CSSProperties>>;
    classNames?: Partial<Record<SemanticName, string>>;
    focusable?: boolean;
    activeKey?: Key | null;
    tabIndex?: number;
    treeData?: TreeDataType[];
    fieldNames?: FieldNames;
    showLine?: boolean;
    showIcon?: boolean;
    icon?: IconType;
    selectable?: boolean;
    expandAction?: ExpandAction;
    disabled?: boolean;
    multiple?: boolean;
    checkable?: boolean | VueNode;
    checkStrictly?: boolean;
    draggable?: DraggableUnion;
    defaultExpandParent?: boolean;
    autoExpandParent?: boolean;
    defaultExpandAll?: boolean;
    defaultExpandedKeys?: Key[];
    expandedKeys?: Key[];
    defaultCheckedKeys?: Key[];
    checkedKeys?: Key[] | {
        checked: Key[];
        halfChecked: Key[];
    };
    defaultSelectedKeys?: Key[];
    selectedKeys?: Key[];
    allowDrop?: AllowDrop<TreeDataType>;
    titleRender?: (node: TreeDataType) => any;
    dropIndicatorRender?: (props: {
        dropPosition: -1 | 0 | 1;
        dropLevelOffset: number;
        indent: number;
        prefixCls: string;
        direction: Direction;
    }) => any;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    onContextMenu?: (e: MouseEvent) => void;
    onClick?: NodeMouseEventHandler<TreeDataType>;
    onDoubleClick?: NodeMouseEventHandler<TreeDataType>;
    onScroll?: (e: Event) => void;
    onExpand?: (expandedKeys: Key[], info: {
        node: EventDataNode<TreeDataType>;
        expanded: boolean;
        nativeEvent: MouseEvent;
    }) => void;
    onCheck?: (checked: {
        checked: Key[];
        halfChecked: Key[];
    } | Key[], info: CheckInfo<TreeDataType>) => void;
    onSelect?: (selectedKeys: Key[], info: {
        event: 'select';
        selected: boolean;
        node: EventDataNode<TreeDataType>;
        selectedNodes: TreeDataType[];
        nativeEvent: MouseEvent;
    }) => void;
    onLoad?: (loadKeys: Key[], info: {
        event: 'load';
        node: EventDataNode<TreeDataType>;
    }) => void;
    loadData?: (treeNode: EventDataNode<TreeDataType>) => Promise<void>;
    loadedKeys?: Key[];
    onMouseEnter?: (info: NodeMouseEventParams<TreeDataType>) => void;
    onMouseLeave?: (info: NodeMouseEventParams<TreeDataType>) => void;
    onRightClick?: (info: {
        event: MouseEvent;
        node: EventDataNode<TreeDataType>;
    }) => void;
    onDragStart?: (info: NodeDragEventParams<TreeDataType>) => void;
    onDragEnter?: (info: NodeDragEventParams<TreeDataType> & {
        expandedKeys: Key[];
    }) => void;
    onDragOver?: (info: NodeDragEventParams<TreeDataType>) => void;
    onDragLeave?: (info: NodeDragEventParams<TreeDataType>) => void;
    onDragEnd?: (info: NodeDragEventParams<TreeDataType>) => void;
    onDrop?: (info: NodeDragEventParams<TreeDataType> & {
        dragNode: EventDataNode<TreeDataType>;
        dragNodesKeys: Key[];
        dropPosition: number;
        dropToGap: boolean;
    }) => void;
    /**
     * Used for `vc-tree-select` only.
     * Do not use in your production code directly since this will be refactor.
     */
    onActiveChange?: (key: Key | null) => void;
    filterTreeNode?: (treeNode: EventDataNode<TreeDataType>) => boolean;
    motion?: CSSMotionProps;
    switcherIcon?: IconType;
    height?: number;
    itemHeight?: number;
    scrollWidth?: number;
    itemScrollOffset?: number;
    virtual?: boolean;
    direction?: Direction;
    rootClassName?: string;
    rootStyle?: CSSProperties;
}
export interface TreeRef {
    scrollTo: ScrollTo;
    onKeyDown: (event: any) => void;
}
declare const Tree: import('vue').DefineSetupFnComponent<TreeProps<DataNode>, {}, {}, TreeProps<DataNode> & {}, import('vue').PublicProps>;
export default Tree;
