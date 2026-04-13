//#region src/table/util.ts
function getColumnKey(column, defaultKey) {
	if ("key" in column && column.key !== void 0 && column.key !== null) return column.key;
	if (column.dataIndex) return Array.isArray(column.dataIndex) ? column.dataIndex.join(".") : column.dataIndex;
	return defaultKey;
}
function getColumnPos(index, pos) {
	return pos ? `${pos}-${index}` : `${index}`;
}
function renderColumnTitle(title, props) {
	if (typeof title === "function") return title(props);
	return title;
}
/**
* Safe get column title
*
* Should filter [object Object]
*/
function safeColumnTitle(title, props) {
	const res = renderColumnTitle(title, props);
	if (Object.prototype.toString.call(res) === "[object Object]") return "";
	return res;
}

//#endregion
export { getColumnKey, getColumnPos, renderColumnTitle, safeColumnTitle };