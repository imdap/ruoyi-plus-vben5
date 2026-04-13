import { DataEntity } from '@v-c/tree';
import { ComputedRef, Ref } from 'vue';
import { LegacyKey, SingleValueType } from '../Cascader';
import { GetMissValues } from './useMissingValues';
export default function useValues(multiple: Ref<boolean>, rawValues: Ref<SingleValueType[]>, getPathKeyEntities: () => Record<string, DataEntity>, getValueByKeyPath: (pathKeys: LegacyKey[]) => SingleValueType[], getMissingValues: GetMissValues): ComputedRef<[
    checkedValues: SingleValueType[],
    halfCheckedValues: SingleValueType[],
    missingCheckedValues: SingleValueType[]
]>;
