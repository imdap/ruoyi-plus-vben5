import { AnyObject } from "../../_util/type.js";
import { GetRowKey, Key } from "../interface.js";
import { Ref } from "vue";

//#region src/table/hooks/useLazyKVMap.d.ts
declare function useLazyKVMap<RecordType extends AnyObject = AnyObject>(data: readonly RecordType[] | Ref<RecordType[]>, childrenColumnName: string | Ref<string>, getRowKey: GetRowKey<RecordType> | Ref<GetRowKey<RecordType>>): readonly [(key: Key) => RecordType];
//#endregion
export { useLazyKVMap as default };