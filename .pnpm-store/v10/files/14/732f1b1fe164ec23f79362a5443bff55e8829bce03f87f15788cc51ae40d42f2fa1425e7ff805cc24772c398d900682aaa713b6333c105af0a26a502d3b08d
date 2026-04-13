import { Ref } from 'vue';
import { GetRowKey, Key } from '../interface';
export interface FlattenData<RecordType> {
    record: RecordType;
    indent: number;
    index: number;
    rowKey: Key;
}
export default function useFlattenRecords<T>(data: Ref<T[] | readonly T[]> | T[] | readonly T[], childrenColumnName: Ref<string> | string, expandedKeys: Ref<Set<Key>> | Set<Key>, getRowKey: Ref<GetRowKey<T>> | GetRowKey<T>): import('vue').ComputedRef<FlattenData<T>[]>;
