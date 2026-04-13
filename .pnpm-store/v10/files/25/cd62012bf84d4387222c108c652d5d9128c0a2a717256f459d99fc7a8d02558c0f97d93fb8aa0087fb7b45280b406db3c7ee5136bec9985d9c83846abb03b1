import { Ref } from 'vue';
import { DefaultOptionType } from '..';
import { InternalFieldNames, LegacyKey, SingleValueType } from '../Cascader';
import { GetEntities } from './useEntities';
export default function useOptions(mergedFieldNames: Ref<InternalFieldNames>, options: Ref<DefaultOptionType[] | undefined>): [
    mergedOptions: Ref<DefaultOptionType[]>,
    getPathKeyEntities: GetEntities,
    getValueByKeyPath: (pathKeys: LegacyKey[]) => SingleValueType[]
];
