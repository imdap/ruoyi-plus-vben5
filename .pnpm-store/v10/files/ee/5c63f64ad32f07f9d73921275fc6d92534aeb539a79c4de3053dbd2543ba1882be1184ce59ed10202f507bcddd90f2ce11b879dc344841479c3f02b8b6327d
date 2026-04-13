//#region src/utils/valueUtil.tsx
var INTERNAL_KEY_PREFIX = "VC_TABLE_KEY";
function toArray(arr) {
	if (arr === void 0 || arr === null) return [];
	return Array.isArray(arr) ? arr : [arr];
}
function getColumnsKey(columns) {
	const columnKeys = [];
	const keys = {};
	columns.forEach((column) => {
		const { key, dataIndex } = column || {};
		let mergedKey = key || toArray(dataIndex).join("-") || INTERNAL_KEY_PREFIX;
		while (keys[mergedKey]) mergedKey = `${mergedKey}_next`;
		keys[mergedKey] = true;
		columnKeys.push(mergedKey);
	});
	return columnKeys;
}
function validateValue(val) {
	if (Array.isArray(val) && val.length === 0) return false;
	return val !== null && val !== void 0;
}
function validNumberValue(value) {
	return typeof value === "number" && !Number.isNaN(value);
}
//#endregion
export { getColumnsKey, validNumberValue, validateValue };
