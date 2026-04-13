import { CellType, ColumnType, CustomizeComponent, GetComponentProps, StickyOffsets } from '../interface';
import { TableProps } from '../Table';
export interface RowProps<RecordType> {
    cells: readonly CellType<RecordType>[];
    stickyOffsets: StickyOffsets;
    flattenColumns: readonly ColumnType<RecordType>[];
    rowComponent: CustomizeComponent;
    cellComponent: CustomizeComponent;
    onHeaderRow?: GetComponentProps<readonly ColumnType<RecordType>[]>;
    index: number;
    classNames: NonNullable<TableProps['classNames']>['header'];
    styles: NonNullable<TableProps['styles']>['header'];
}
declare const HeaderRow: import('vue').DefineComponent<RowProps<any>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<RowProps<any>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default HeaderRow;
