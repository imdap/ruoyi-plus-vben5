import { CSSMotionProps } from '@v-c/util/dist/utils/transition';
import { DataEntity, FlattenNode, Key, KeyEntities, ScrollTo } from './interface';
export interface NodeListRef {
    scrollTo: ScrollTo;
    getIndentWidth: () => number;
}
export declare const MOTION_KEY: string;
export declare const MotionEntity: DataEntity;
export interface NodeListProps {
    prefixCls: string;
    style?: any;
    data?: FlattenNode[];
    focusable?: boolean;
    tabIndex?: number;
    selectable?: boolean;
    checkable?: boolean;
    disabled?: boolean;
    expandedKeys: Key[];
    selectedKeys: Key[];
    checkedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    halfCheckedKeys: Key[];
    keyEntities: KeyEntities;
    dragging?: boolean;
    dragOverNodeKey: Key | null;
    dropPosition: number | null;
    motion?: CSSMotionProps;
    height?: number;
    itemHeight?: number;
    virtual?: boolean;
    scrollWidth?: number;
    activeItem?: FlattenNode | null;
    onKeyDown?: (e: KeyboardEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    onMouseDown?: (e: MouseEvent) => void;
    onMouseUp?: (e: MouseEvent) => void;
    onActiveChange?: (key: Key | null) => void;
    onListChangeStart?: () => void;
    onListChangeEnd?: () => void;
    onContextmenu?: (e: MouseEvent) => void;
    onScroll?: (e: Event) => void;
}
declare const NodeList: import('vue').DefineSetupFnComponent<NodeListProps, {}, {}, NodeListProps & {}, import('vue').PublicProps>;
export default NodeList;
