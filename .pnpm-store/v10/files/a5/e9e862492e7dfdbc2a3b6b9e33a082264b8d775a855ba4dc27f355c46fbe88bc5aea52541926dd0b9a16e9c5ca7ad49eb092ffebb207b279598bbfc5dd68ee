import { CSSProperties } from 'vue';
import { AlignType, CellEllipsisType, ColumnType, CustomizeComponent, DataIndex, DefaultRecordType, ScopeType } from '../interface';
export interface CellProps<RecordType extends DefaultRecordType> {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    record?: RecordType;
    /** `column` index is the real show rowIndex */
    index?: number;
    /** `colIndex` is for column position, mainly for header cells */
    colIndex?: number;
    /** the index of the record. For the render(value, record, renderIndex) */
    renderIndex?: number;
    dataIndex?: DataIndex<RecordType>;
    render?: ColumnType<RecordType>['render'];
    component?: CustomizeComponent;
    children?: any;
    colSpan?: number;
    rowSpan?: number;
    scope?: ScopeType;
    ellipsis?: CellEllipsisType;
    align?: AlignType;
    shouldCellUpdate?: (record: RecordType, prevRecord: RecordType) => boolean;
    column?: ColumnType<RecordType>;
    fixStart?: number | false;
    fixEnd?: number | false;
    fixedStartShadow?: boolean;
    fixedEndShadow?: boolean;
    offsetFixedStartShadow?: number;
    offsetFixedEndShadow?: number;
    zIndex?: number;
    zIndexReverse?: number;
    allColsFixedLeft?: boolean;
    /** @private Used for `expandable` with nest tree */
    appendNode?: any;
    additionalProps?: Record<string, any>;
    rowType?: 'header' | 'body' | 'footer';
    isSticky?: boolean;
}
declare const _default: any;
export default _default;
