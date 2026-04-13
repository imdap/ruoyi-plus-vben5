import { AnyObject } from "../_util/type.js";
import { ColumnTitle, ColumnTitleProps, ColumnType, Key } from "./interface.js";

//#region src/table/util.d.ts
declare function getColumnKey<RecordType extends AnyObject = AnyObject>(column: ColumnType<RecordType>, defaultKey: string): Key;
declare function getColumnPos(index: number, pos?: string): string;
declare function renderColumnTitle<RecordType extends AnyObject = AnyObject>(title: ColumnTitle<RecordType>, props: ColumnTitleProps<RecordType>): any;
/**
 * Safe get column title
 *
 * Should filter [object Object]
 */
declare function safeColumnTitle<RecordType extends AnyObject = AnyObject>(title: ColumnTitle<RecordType>, props: ColumnTitleProps<RecordType>): any;
//#endregion
export { getColumnKey, getColumnPos, renderColumnTitle, safeColumnTitle };