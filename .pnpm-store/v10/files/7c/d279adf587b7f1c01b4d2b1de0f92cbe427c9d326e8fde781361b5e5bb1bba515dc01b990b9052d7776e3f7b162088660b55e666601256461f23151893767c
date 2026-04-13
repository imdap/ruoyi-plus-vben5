import { VueNode } from '@v-c/util';
import { CSSProperties, HTMLAttributes, Ref, TdHTMLAttributes } from 'vue';
import { DeepNamePath } from './namePathType';
export type Key = string | number;
/**
 * Use `start` or `end` instead. `left` or `right` is deprecated.
 */
export type FixedType = 'start' | 'end' | 'left' | 'right' | boolean;
export type DefaultRecordType = Record<string, any>;
export type TableLayout = 'auto' | 'fixed';
export interface ScrollConfig {
    /** The index of the row to scroll to */
    index?: number;
    /** The key of the row to scroll to */
    key?: Key;
    /** The absolute scroll position from top */
    top?: number;
    /**
     * Additional offset in pixels to apply to the scroll position.
     * Only effective when using `key` or `index` mode.
     * Ignored when using `top` mode.
     * In `key` / `index` mode, `offset` is added to the position resolved by `align`.
     */
    offset?: number;
    align?: ScrollLogicalPosition;
}
export type VirtualScrollConfig = ScrollConfig & {
    align?: Exclude<ScrollLogicalPosition, 'center'>;
};
export interface Reference {
    nativeElement: HTMLDivElement;
    scrollTo: (config: ScrollConfig) => void;
}
export type RowClassName<RecordType> = (record: RecordType, index: number, indent: number) => string;
export interface CellType<RecordType> {
    key?: Key;
    className?: string;
    style?: CSSProperties;
    children?: VueNode;
    column?: ColumnsType<RecordType>[number];
    colSpan?: number;
    rowSpan?: number;
    /** Only used for table header */
    hasSubColumns?: boolean;
    colStart?: number;
    colEnd?: number;
}
export interface RenderedCell<RecordType> {
    props?: CellType<RecordType>;
    children?: VueNode;
}
export type Direction = 'ltr' | 'rtl';
export type SpecialString<T> = T | (string & NonNullable<unknown>);
export type DataIndex<T = any> = DeepNamePath<T> | SpecialString<T> | number | (SpecialString<T> | number)[];
export type CellEllipsisType = {
    showTitle?: boolean;
} | boolean;
export type ColScopeType = 'col' | 'colgroup';
export type RowScopeType = 'row' | 'rowgroup';
export type ScopeType = ColScopeType | RowScopeType;
interface ColumnSharedType<RecordType> {
    title?: VueNode;
    key?: Key;
    className?: string;
    hidden?: boolean;
    fixed?: FixedType;
    onHeaderCell?: GetComponentProps<ColumnsType<RecordType>[number]>;
    ellipsis?: CellEllipsisType;
    align?: AlignType;
    rowScope?: RowScopeType;
}
export interface ColumnGroupType<RecordType> extends ColumnSharedType<RecordType> {
    children: ColumnsType<RecordType>;
}
export type AlignType = 'start' | 'end' | 'left' | 'right' | 'center' | 'justify' | 'match-parent';
export interface ColumnType<RecordType = Record<string, any>> extends ColumnSharedType<RecordType> {
    colSpan?: number;
    dataIndex?: DataIndex<RecordType>;
    render?: (value: any, record: RecordType, index: number) => VueNode | RenderedCell<RecordType>;
    shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;
    rowSpan?: number;
    width?: number | string;
    minWidth?: number;
    onCell?: GetComponentProps<RecordType>;
    /** @deprecated Please use `onCell` instead */
    onCellClick?: (record: RecordType, e: MouseEvent) => void;
}
export type ColumnsType<RecordType = Record<string, any>> = readonly (ColumnGroupType<RecordType> | ColumnType<RecordType>)[];
export type GetRowKey<RecordType = Record<string, any>> = (record: RecordType, index?: number) => Key;
export interface StickyOffsets {
    start: readonly number[];
    end: readonly number[];
    widths: readonly number[];
    isSticky?: boolean;
}
export type CellAttributes = HTMLAttributes & TdHTMLAttributes & {
    colSpan?: number;
    rowSpan?: number;
    colspan?: number;
    rowspan?: number;
    className?: string;
};
export type GetComponentProps<DataType = Record<string, any>> = {
    bivarianceHack: (data: DataType, index?: number) => Partial<CellAttributes>;
}['bivarianceHack'];
type Component = any;
export type CustomizeComponent = Component;
export type OnCustomizeScroll = (info: {
    currentTarget?: HTMLElement;
    scrollLeft?: number;
}) => void;
export type CustomizeScrollBody<RecordType = Record<string, any>> = (data: readonly RecordType[], info: {
    scrollbarSize: number;
    ref: Ref<{
        scrollLeft: number;
        scrollTo?: (scrollConfig: ScrollConfig) => void;
    } | null>;
    onScroll: OnCustomizeScroll;
}) => any;
export interface TableComponents<RecordType> {
    table?: CustomizeComponent;
    header?: {
        table?: CustomizeComponent;
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
    };
    body?: CustomizeScrollBody<RecordType> | {
        wrapper?: CustomizeComponent;
        row?: CustomizeComponent;
        cell?: CustomizeComponent;
    };
}
export type GetComponent = (path: readonly string[], defaultComponent?: CustomizeComponent) => CustomizeComponent;
export type ExpandableType = false | 'row' | 'nest';
export interface LegacyExpandableProps<RecordType> {
    /** @deprecated Use `expandable.expandedRowKeys` instead */
    expandedRowKeys?: Key[];
    /** @deprecated Use `expandable.defaultExpandedRowKeys` instead */
    defaultExpandedRowKeys?: Key[];
    /** @deprecated Use `expandable.expandedRowRender` instead */
    expandedRowRender?: ExpandedRowRender<RecordType>;
    /** @deprecated Use `expandable.expandRowByClick` instead */
    expandRowByClick?: boolean;
    /** @deprecated Use `expandable.expandIcon` instead */
    expandIcon?: RenderExpandIcon<RecordType>;
    /** @deprecated Use `expandable.onExpand` instead */
    onExpand?: (expanded: boolean, record: RecordType) => void;
    /** @deprecated Use `expandable.onExpandedRowsChange` instead */
    onExpandedRowsChange?: (expandedKeys: Key[]) => void;
    /** @deprecated Use `expandable.defaultExpandAllRows` instead */
    defaultExpandAllRows?: boolean;
    /** @deprecated Use `expandable.indentSize` instead */
    indentSize?: number;
    /** @deprecated Use `expandable.expandIconColumnIndex` instead */
    expandIconColumnIndex?: number;
    /** @deprecated Use `expandable.expandedRowClassName` instead */
    expandedRowClassName?: RowClassName<RecordType>;
    /** @deprecated Use `expandable.childrenColumnName` instead */
    childrenColumnName?: string;
    title?: PanelRender<RecordType>;
}
export type ExpandedRowRender<ValueType> = (record: ValueType, index: number, indent: number, expanded: boolean) => any;
export interface RenderExpandIconProps<RecordType> {
    prefixCls: string;
    expanded: boolean;
    record: RecordType;
    expandable: boolean;
    onExpand: TriggerEventHandler<RecordType>;
}
export type RenderExpandIcon<RecordType> = (props: RenderExpandIconProps<RecordType>) => any;
export interface ExpandableConfig<RecordType> {
    expandedRowKeys?: readonly Key[];
    defaultExpandedRowKeys?: readonly Key[];
    expandedRowRender?: ExpandedRowRender<RecordType>;
    columnTitle?: VueNode;
    expandRowByClick?: boolean;
    expandIcon?: RenderExpandIcon<RecordType>;
    onExpand?: (expanded: boolean, record: RecordType) => void;
    onExpandedRowsChange?: (expandedKeys: readonly Key[]) => void;
    defaultExpandAllRows?: boolean;
    indentSize?: number;
    /** @deprecated Please use `EXPAND_COLUMN` in `columns` directly */
    expandIconColumnIndex?: number;
    showExpandColumn?: boolean;
    expandedRowClassName?: string | RowClassName<RecordType>;
    childrenColumnName?: string;
    rowExpandable?: (record: RecordType) => boolean;
    columnWidth?: number | string;
    fixed?: FixedType;
    expandedRowOffset?: number;
}
export type PanelRender<RecordType> = (data: readonly RecordType[]) => any;
export type TriggerEventHandler<RecordType> = (record: RecordType, event: MouseEvent) => void;
export interface TableSticky {
    offsetHeader?: number;
    offsetSummary?: number;
    offsetScroll?: number;
    getContainer?: () => Window | HTMLElement;
}
export {};
