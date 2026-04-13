import { TreeProps as TreeProps$1 } from "../Tree.js";
import { DataNode, Key } from "@v-c/tree";

//#region src/tree/utils/dictUtil.d.ts
type FieldNames = TreeProps$1['fieldNames'];
/** 计算选中范围，只考虑expanded情况以优化性能 */
declare function calcRangeKeys({
  treeData,
  expandedKeys,
  startKey,
  endKey,
  fieldNames
}: {
  treeData: DataNode[];
  expandedKeys: Key[];
  startKey?: Key;
  endKey?: Key;
  fieldNames?: FieldNames;
}): Key[];
declare function convertDirectoryKeysToNodes(treeData: DataNode[], keys: Key[], fieldNames?: FieldNames): DataNode[];
//#endregion
export { calcRangeKeys, convertDirectoryKeysToNodes };