import { toArray } from "./typeUtil.js";
import getValue from "@v-c/util/dist/utils/get";
import setValue from "@v-c/util/dist/utils/set";

//#region src/form/utils/valueUtil.ts
/**
* Convert name to internal supported format.
* Support formats:
* 'a' => ['a']
* 'a.b.c' => ['a', 'b', 'c']
* 123 => [123]
* ['a', 123] => ['a', 123]
* ['a', 'b', 'c'] => ['a', 'b', 'c']
*/
function getNamePath(path) {
	if (typeof path === "string") return path.split(".");
	return toArray(path);
}
/**
* Create a new store object that contains only the values referenced by
* the provided list of name paths.
*/
function cloneByNamePathList(store, namePathList) {
	let newStore = {};
	namePathList.forEach((namePath) => {
		const value = getValue(store, namePath);
		newStore = setValue(newStore, namePath, value);
	});
	return newStore;
}
/**
* Check if `namePathList` includes `namePath`.
* @param namePathList A list of `InternalNamePath[]`
* @param namePath Compare `InternalNamePath`
* @param partialMatch True will make `[a, b]` match `[a, b, c]`
*/
function containsNamePath(namePathList, namePath, partialMatch = false) {
	return namePathList && namePathList.some((path) => matchNamePath(namePath, path, partialMatch));
}
/**
* Check if `namePath` is super set or equal of `subNamePath`.
* @param namePath A list of `InternalNamePath[]`
* @param subNamePath Compare `InternalNamePath`
* @param partialMatch True will make `[a, b]` match `[a, b, c]`
*/
function matchNamePath(namePath, subNamePath, partialMatch = false) {
	if (!namePath || !subNamePath) return false;
	if (!partialMatch && namePath.length !== subNamePath.length) return false;
	return subNamePath.every((nameUnit, i) => namePath[i] === nameUnit);
}
function isSimilar(source, target) {
	if (source === target) return true;
	if (!source && target || source && !target) return false;
	if (!source || !target || typeof source !== "object" || typeof target !== "object") return false;
	const sourceKeys = Object.keys(source);
	const targetKeys = Object.keys(target);
	return [...new Set([...sourceKeys, ...targetKeys])].every((key) => {
		const sourceValue = source[key];
		const targetValue = target[key];
		if (typeof sourceValue === "function" && typeof targetValue === "function") return true;
		return sourceValue === targetValue;
	});
}
function defaultGetValueFromEvent(valuePropName, ...args) {
	const event = args[0];
	if (event && event.target && typeof event.target === "object" && valuePropName in event.target) return event.target[valuePropName];
	return event;
}
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
function move(array, moveIndex, toIndex) {
	const { length } = array;
	if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) return array;
	const item = array[moveIndex];
	const diff = moveIndex - toIndex;
	if (diff > 0) return [
		...array.slice(0, toIndex),
		item,
		...array.slice(toIndex, moveIndex),
		...array.slice(moveIndex + 1, length)
	];
	if (diff < 0) return [
		...array.slice(0, moveIndex),
		...array.slice(moveIndex + 1, toIndex + 1),
		item,
		...array.slice(toIndex + 1, length)
	];
	return array;
}

//#endregion
export { cloneByNamePathList, containsNamePath, defaultGetValueFromEvent, getNamePath, getValue, isSimilar, matchNamePath, move, setValue };