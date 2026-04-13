import { groupKeysMap } from "../../_util/transKeys.js";
import { computed, unref } from "vue";

//#region src/transfer/hooks/useData.ts
function useData(dataSource, rowKey, targetKeys) {
	const mergedDataSource = computed(() => {
		const source = unref(dataSource) || [];
		const getRowKey = unref(rowKey);
		return source.map((record) => {
			if (getRowKey) return {
				...record,
				key: getRowKey(record)
			};
			return record;
		});
	});
	const mergedLists = computed(() => {
		const leftData = [];
		const targetKeysValue = unref(targetKeys) || [];
		const rightData = Array.from({ length: targetKeysValue.length });
		const targetKeysMap = groupKeysMap(targetKeysValue);
		mergedDataSource.value.forEach((record) => {
			if (targetKeysMap.has(record.key)) {
				const idx = targetKeysMap.get(record.key);
				rightData[idx] = record;
			} else leftData.push(record);
		});
		return {
			leftData,
			rightData
		};
	});
	return [
		mergedDataSource,
		computed(() => mergedLists.value.leftData.filter(Boolean)),
		computed(() => mergedLists.value.rightData.filter(Boolean))
	];
}
var useData_default = useData;

//#endregion
export { useData_default as default };