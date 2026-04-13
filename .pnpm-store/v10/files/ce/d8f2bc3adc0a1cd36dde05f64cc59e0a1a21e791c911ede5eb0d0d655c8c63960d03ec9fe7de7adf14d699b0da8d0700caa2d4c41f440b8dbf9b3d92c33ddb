import { TransferKey } from "../interface.js";
import { Ref } from "vue";

//#region src/transfer/hooks/useSelection.d.ts
type MaybeRef<T> = T | Ref<T>;
declare function useSelection<T extends {
  key: TransferKey;
}>(leftDataSource: MaybeRef<T[]>, rightDataSource: MaybeRef<T[]>, selectedKeys?: MaybeRef<TransferKey[] | undefined>): [sourceSelectedKeys: Ref<TransferKey[]>, targetSelectedKeys: Ref<TransferKey[]>, setSourceSelectedKeys: (srcKeys: TransferKey[]) => void, setTargetSelectedKeys: (srcKeys: TransferKey[]) => void];
//#endregion
export { useSelection as default };