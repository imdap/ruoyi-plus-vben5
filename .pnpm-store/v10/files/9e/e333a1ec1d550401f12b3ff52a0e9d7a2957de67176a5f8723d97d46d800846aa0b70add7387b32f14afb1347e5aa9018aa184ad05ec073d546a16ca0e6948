//#region src/_util/hooks/useMultipleSelect.d.ts
type PrevSelectedIndex = null | number;
/**
 * @title multipleSelect hooks
 * @description multipleSelect by hold down shift key
 */
declare function useMultipleSelect<T, K>(getKey: (item: T, index: number, array: T[]) => K): readonly [(currentSelectedIndex: number, data: T[], selectedKeys: Set<K>) => K[], (value: PrevSelectedIndex) => void];
//#endregion
export { PrevSelectedIndex, useMultipleSelect };