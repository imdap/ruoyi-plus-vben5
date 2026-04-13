import { DataEntity, KeyEntities } from '@v-c/tree';
import { Ref } from 'vue';
import { DataNode, FieldNames, SafeKey } from '../interface';
export default function useDataEntities(treeData: Ref<DataNode[]>, fieldNames: Ref<FieldNames>): {
    valueEntities: Ref<Map<SafeKey, DataEntity>>;
    keyEntities: Ref<KeyEntities>;
};
