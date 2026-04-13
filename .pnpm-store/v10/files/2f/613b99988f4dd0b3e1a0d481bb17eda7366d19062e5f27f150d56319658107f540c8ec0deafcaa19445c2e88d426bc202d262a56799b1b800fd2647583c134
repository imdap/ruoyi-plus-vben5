import { CSSProperties } from 'vue';
import { ColumnType, CustomizeComponent } from '../interface';
import { TableProps } from '../Table';
import { default as useRowInfo } from '../hooks/useRowInfo';
export interface BodyRowProps<RecordType> {
    record: RecordType;
    index: number;
    renderIndex: number;
    className?: string;
    style?: CSSProperties;
    classNames: NonNullable<TableProps['classNames']>['body'];
    styles: NonNullable<TableProps['styles']>['body'];
    rowComponent: CustomizeComponent;
    cellComponent: CustomizeComponent;
    scopeCellComponent: CustomizeComponent;
    indent?: number;
    rowKey: string | number;
    rowKeys: (string | number)[];
    expandedRowInfo?: {
        offset: number;
        colSpan: number;
        sticky: number;
    };
}
export declare function getCellProps<RecordType>(rowInfo: ReturnType<typeof useRowInfo<RecordType>>, record: RecordType, column: ColumnType<RecordType>, colIndex: number, indent: number, index: number, rowKeys?: (string | number)[], expandedRowOffset?: number): {
    key: import('../interface').Key;
    fixedInfo: import('../utils/fixUtil').FixedInfo;
    appendCellNode: any;
    additionalCellProps: Partial<import('../interface').CellAttributes>;
};
declare const BodyRow: import('vue').DefineComponent<BodyRowProps<any>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<BodyRowProps<any>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default BodyRow;
