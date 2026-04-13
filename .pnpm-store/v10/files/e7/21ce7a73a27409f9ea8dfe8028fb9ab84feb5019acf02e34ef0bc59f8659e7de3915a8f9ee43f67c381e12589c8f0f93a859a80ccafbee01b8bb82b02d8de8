import { EventArgs, InternalNamePath, NamePath, Store } from "../types.js";
import getValue from "@v-c/util/dist/utils/get";
import setValue from "@v-c/util/dist/utils/set";

//#region src/form/utils/valueUtil.d.ts
/**
 * Convert name to internal supported format.
 * Support formats:
 * 'a' => ['a']
 * 'a.b.c' => ['a', 'b', 'c']
 * 123 => [123]
 * ['a', 123] => ['a', 123]
 * ['a', 'b', 'c'] => ['a', 'b', 'c']
 */
declare function getNamePath(path: NamePath | null): InternalNamePath;
/**
 * Create a new store object that contains only the values referenced by
 * the provided list of name paths.
 */
declare function cloneByNamePathList(store: Store, namePathList: InternalNamePath[]): Store;
/**
 * Check if `namePathList` includes `namePath`.
 * @param namePathList A list of `InternalNamePath[]`
 * @param namePath Compare `InternalNamePath`
 * @param partialMatch True will make `[a, b]` match `[a, b, c]`
 */
declare function containsNamePath(namePathList: InternalNamePath[], namePath: InternalNamePath, partialMatch?: boolean): boolean;
/**
 * Check if `namePath` is super set or equal of `subNamePath`.
 * @param namePath A list of `InternalNamePath[]`
 * @param subNamePath Compare `InternalNamePath`
 * @param partialMatch True will make `[a, b]` match `[a, b, c]`
 */
declare function matchNamePath(namePath: InternalNamePath, subNamePath: InternalNamePath | null, partialMatch?: boolean): boolean;
type SimilarObject = string | number | object;
declare function isSimilar(source: SimilarObject, target: SimilarObject): boolean;
declare function defaultGetValueFromEvent(valuePropName: string, ...args: EventArgs): any;
/**
 * Moves an array item from one position in an array to another.
 *
 * Note: This is a pure function so a new array will be returned, instead
 * of altering the array argument.
 *
 * @param array         Array in which to move an item.         (required)
 * @param moveIndex     The index of the item to move.          (required)
 * @param toIndex       The index to move item at moveIndex to. (required)
 */
declare function move<T>(array: T[], moveIndex: number, toIndex: number): (T | undefined)[];
//#endregion
export { cloneByNamePathList, containsNamePath, defaultGetValueFromEvent, getNamePath, getValue, isSimilar, matchNamePath, move, setValue };