import { CSSProperties } from 'vue';
import { ColumnsType, ColumnType, DefaultRecordType, Direction, ExpandableConfig, GetComponentProps, GetRowKey, LegacyExpandableProps, PanelRender, RowClassName, TableComponents, TableLayout, TableSticky } from './interface';
import { EXPAND_COLUMN, INTERNAL_HOOKS } from './constant';
import { FooterComponents } from './Footer';
import { default as Column } from './sugar/Column';
import { default as ColumnGroup } from './sugar/ColumnGroup';
export declare const DEFAULT_PREFIX = "vc-table";
export type SemanticName = 'section' | 'title' | 'footer' | 'content';
export type ComponentsSemantic = 'wrapper' | 'cell' | 'row';
export interface TableProps<RecordType = any> extends Omit<LegacyExpandableProps<RecordType>, 'showExpandColumn'> {
    'prefixCls'?: string;
    'className'?: string;
    'style'?: CSSProperties;
    'classNames'?: Partial<Record<SemanticName, string>> & {
        body?: Partial<Record<ComponentsSemantic, string>>;
        header?: Partial<Record<ComponentsSemantic, string>>;
    };
    'styles'?: Partial<Record<SemanticName, CSSProperties>> & {
        body?: Partial<Record<ComponentsSemantic, CSSProperties>>;
        header?: Partial<Record<ComponentsSemantic, CSSProperties>>;
    };
    'data'?: readonly RecordType[];
    'columns'?: ColumnsType<RecordType>;
    'rowKey'?: string | keyof RecordType | GetRowKey<RecordType>;
    'tableLayout'?: TableLayout;
    'scroll'?: {
        x?: number | true | string;
        y?: number | string;
    };
    'expandable'?: ExpandableConfig<RecordType>;
    'indentSize'?: number;
    'rowClassName'?: string | RowClassName<RecordType>;
    'title'?: PanelRender<RecordType>;
    'footer'?: PanelRender<RecordType>;
    'summary'?: (data: readonly RecordType[]) => any;
    'headerCell'?: (ctx: {
        column: ColumnType<any>;
        index: number;
        text: any;
    }) => any;
    'bodyCell'?: (ctx: {
        column: ColumnType<any>;
        index: number;
        text: any;
        record: RecordType;
    }) => any;
    'caption'?: any;
    'id'?: string;
    'showHeader'?: boolean;
    'components'?: TableComponents<RecordType>;
    'onRow'?: GetComponentProps<RecordType>;
    'onHeaderRow'?: GetComponentProps<readonly ColumnType<RecordType>[]>;
    'emptyText'?: any | (() => any);
    'direction'?: Direction;
    'sticky'?: boolean | TableSticky;
    'rowHoverable'?: boolean;
    'onScroll'?: (event: Event) => void;
    'internalHooks'?: string;
    'transformColumns'?: (columns: ColumnsType<RecordType>) => ColumnsType<RecordType>;
    'tailor'?: boolean;
    'getContainerWidth'?: (ele: HTMLElement, width: number) => number;
    'internalRefs'?: {
        body: {
            value?: HTMLDivElement | null;
        };
    };
    'measureRowRender'?: (measureRow: any) => any;
    'getPopupContainer'?: (triggerNode?: HTMLElement) => HTMLElement;
    'onUpdate:expandedRowKeys'?: (keys: readonly any[]) => void;
}
declare const ImmutableTable: import('vue').DefineSetupFnComponent<TableProps<DefaultRecordType>, {}, {}, TableProps<DefaultRecordType> & {}, import('vue').PublicProps>;
type ImmutableTableType = typeof ImmutableTable & {
    EXPAND_COLUMN: typeof EXPAND_COLUMN;
    INTERNAL_HOOKS: typeof INTERNAL_HOOKS;
    Column: typeof Column;
    ColumnGroup: typeof ColumnGroup;
    Summary: typeof FooterComponents;
};
declare const _default: ImmutableTableType;
export default _default;
