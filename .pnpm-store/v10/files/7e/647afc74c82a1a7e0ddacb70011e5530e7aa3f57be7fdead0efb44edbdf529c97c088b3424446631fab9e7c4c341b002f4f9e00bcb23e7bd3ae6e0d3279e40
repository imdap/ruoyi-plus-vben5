import { DataEntity } from '@v-c/tree';
import { Ref } from 'vue';
import { DefaultOptionType, InternalFieldNames } from '../Cascader';
export interface OptionsInfo {
    keyEntities: Record<string, DataEntity>;
    pathKeyEntities: Record<string, DataEntity>;
}
export type GetEntities = () => OptionsInfo['pathKeyEntities'];
/** Lazy parse options data into conduct-able info to avoid perf issue in single mode */
export default function useEntities(options: Ref<DefaultOptionType[]>, fieldNames: Ref<InternalFieldNames>): GetEntities;
