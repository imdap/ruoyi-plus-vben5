import { shallowRef, unref } from "vue";

//#region src/table/hooks/useLazyKVMap.ts
function useLazyKVMap(data, childrenColumnName, getRowKey) {
	const mapCacheRef = shallowRef({});
	function getRecordByKey(key) {
		const mergedData = unref(data);
		const mergedChildrenColumnName = unref(childrenColumnName);
		const mergedGetRowKey = unref(getRowKey);
		if (!mapCacheRef.value || mapCacheRef.value.data !== mergedData || mapCacheRef.value.childrenColumnName !== mergedChildrenColumnName || mapCacheRef.value.getRowKey !== mergedGetRowKey) {
			const kvMap = /* @__PURE__ */ new Map();
			function dig(records) {
				records.forEach((record, index) => {
					const rowKey = mergedGetRowKey(record, index);
					kvMap.set(rowKey, record);
					if (record && typeof record === "object" && mergedChildrenColumnName in record) dig(record[mergedChildrenColumnName] || []);
				});
			}
			dig(mergedData);
			mapCacheRef.value = {
				data: mergedData,
				childrenColumnName: mergedChildrenColumnName,
				kvMap,
				getRowKey: mergedGetRowKey
			};
		}
		return mapCacheRef.value.kvMap?.get(key);
	}
	return [getRecordByKey];
}

//#endregion
export { useLazyKVMap as default };