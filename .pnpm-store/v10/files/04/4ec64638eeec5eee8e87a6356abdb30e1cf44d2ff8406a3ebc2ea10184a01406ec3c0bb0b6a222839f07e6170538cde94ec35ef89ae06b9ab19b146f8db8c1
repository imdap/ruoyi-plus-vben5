import { Ref } from 'vue';
import { ColumnsType, ColumnType, Direction, FixedType, GetRowKey, Key, RenderExpandIcon, TriggerEventHandler } from '../../interface';
export declare function convertChildrenToColumns<RecordType>(children: any): ColumnsType<RecordType>;
export default function useColumns<RecordType>(options: {
    prefixCls?: Ref<string> | string;
    columns?: Ref<ColumnsType<RecordType> | undefined> | ColumnsType<RecordType>;
    children?: any;
    expandable: Ref<boolean> | boolean;
    expandedKeys: Ref<Set<Key>> | Set<Key>;
    columnTitle?: Ref<any> | any;
    getRowKey: Ref<GetRowKey<RecordType>> | GetRowKey<RecordType>;
    onTriggerExpand: TriggerEventHandler<RecordType>;
    expandIcon?: Ref<RenderExpandIcon<RecordType> | undefined> | RenderExpandIcon<RecordType>;
    rowExpandable?: Ref<((record: RecordType) => boolean) | undefined> | ((record: RecordType) => boolean) | undefined;
    expandIconColumnIndex?: Ref<number | undefined> | number;
    expandedRowOffset?: number;
    direction?: Ref<Direction> | Direction;
    expandRowByClick?: Ref<boolean | undefined> | boolean | undefined;
    columnWidth?: Ref<number | string | undefined> | number | string;
    fixed?: Ref<FixedType | undefined> | FixedType;
    scrollWidth?: Ref<number | null | undefined> | number | null | undefined;
    clientWidth: Ref<number> | number;
}, transformColumns?: Ref<((columns: ColumnsType<RecordType>) => ColumnsType<RecordType>) | null> | ((columns: ColumnsType<RecordType>) => ColumnsType<RecordType>) | null): [
    columns: Ref<ColumnsType<RecordType>>,
    flattenColumns: Ref<readonly ColumnType<RecordType>[]>,
    realScrollWidth: Ref<number | undefined>
];
