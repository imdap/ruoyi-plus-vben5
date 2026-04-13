import { isEmptyElement } from "@v-c/util/dist/props-util";
//#region src/utils.ts
var tabsGlobal = { uuid: 0 };
function setUUid(uuid) {
	tabsGlobal.uuid = uuid;
}
function getUUid() {
	return tabsGlobal.uuid;
}
/**
* We trade Map as deps which may change with same value but different ref object.
* We should make it as hash for deps
*/
function stringify(obj) {
	let tgt;
	if (obj instanceof Map) {
		tgt = {};
		obj.forEach((v, k) => {
			tgt[k] = v;
		});
	} else tgt = obj;
	return JSON.stringify(tgt);
}
function getRemovable(closable, closeIcon, editable, disabled) {
	if (!editable || disabled || closable === false || closable === void 0 && (isEmptyElement(closeIcon) || closeIcon === null)) return false;
	return true;
}
var VC_TABS_DOUBLE_QUOTE = "TABS_DQ";
function genDataNodeKey(key) {
	return String(key).replace(/"/g, VC_TABS_DOUBLE_QUOTE);
}
//#endregion
export { genDataNodeKey, getRemovable, getUUid, setUUid, stringify, tabsGlobal };
