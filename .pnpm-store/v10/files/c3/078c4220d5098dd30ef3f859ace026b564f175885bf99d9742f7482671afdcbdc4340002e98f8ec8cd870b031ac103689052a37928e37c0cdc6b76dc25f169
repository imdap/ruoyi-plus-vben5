import { Ref } from 'vue';
import { ExpandableConfig, ExpandableType, GetRowKey, Key, RenderExpandIcon, TriggerEventHandler } from '../interface';
import { TableProps } from '../Table';
export default function useExpand<RecordType>(props: TableProps<RecordType>, mergedData: Ref<readonly RecordType[]> | readonly RecordType[], getRowKey: Ref<GetRowKey<RecordType>> | GetRowKey<RecordType>): [
    expandableConfig: Ref<ExpandableConfig<RecordType>>,
    expandableType: Ref<ExpandableType>,
    expandedKeys: Ref<Set<Key>>,
    expandIcon: Ref<RenderExpandIcon<RecordType>>,
    childrenColumnName: Ref<string>,
    onTriggerExpand: TriggerEventHandler<RecordType>
];
