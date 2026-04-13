import { computed, unref } from "vue";
//#region src/hooks/useFlattenRecords.ts
function fillRecords(list, record, indent, childrenColumnName, expandedKeys, getRowKey, index) {
	const key = getRowKey(record, index);
	list.push({
		record,
		indent,
		index,
		rowKey: key
	});
	const expanded = expandedKeys?.has(key);
	const children = record?.[childrenColumnName];
	if (record && Array.isArray(children) && expanded) for (let i = 0; i < children.length; i += 1) fillRecords(list, children[i], indent + 1, childrenColumnName, expandedKeys, getRowKey, i);
}
function useFlattenRecords(data, childrenColumnName, expandedKeys, getRowKey) {
	return computed(() => {
		const mergedData = unref(data) || [];
		const mergedChildrenColumnName = unref(childrenColumnName);
		const mergedExpandedKeys = unref(expandedKeys);
		const mergedGetRowKey = unref(getRowKey);
		if (mergedExpandedKeys?.size) {
			const list = [];
			for (let i = 0; i < mergedData.length; i += 1) fillRecords(list, mergedData[i], 0, mergedChildrenColumnName, mergedExpandedKeys, mergedGetRowKey, i);
			return list;
		}
		return mergedData.map((item, index) => ({
			record: item,
			indent: 0,
			index,
			rowKey: mergedGetRowKey(item, index)
		}));
	});
}
//#endregion
export { useFlattenRecords as default };
