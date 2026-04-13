import { CSSProperties } from 'vue';
import { default as useRowInfo } from '../hooks/useRowInfo';
import { ColumnType, CustomizeComponent } from '../interface';
export interface VirtualCellProps<RecordType> {
    rowInfo: ReturnType<typeof useRowInfo<RecordType>>;
    column: ColumnType<RecordType>;
    colIndex: number;
    indent: number;
    index: number;
    component?: CustomizeComponent;
    renderIndex: number;
    record: RecordType;
    style?: CSSProperties;
    className?: string;
    inverse?: boolean;
    getHeight?: (rowSpan: number) => number;
}
export declare function getColumnWidth(colIndex: number, colSpan: number, columnsOffset: number[]): number;
declare const VirtualCell: import('vue').DefineComponent<VirtualCellProps<any>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<VirtualCellProps<any>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default VirtualCell;
