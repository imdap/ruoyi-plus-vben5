import { TransferKey } from "../transfer/interface.js";

//#region src/_util/transKeys.d.ts
declare function groupKeysMap(keys: TransferKey[]): Map<TransferKey, number>;
declare function groupDisabledKeysMap<RecordType extends {
  disabled?: boolean;
  key?: TransferKey;
}>(dataSource: RecordType[]): Map<TransferKey, number>;
//#endregion
export { groupDisabledKeysMap, groupKeysMap };