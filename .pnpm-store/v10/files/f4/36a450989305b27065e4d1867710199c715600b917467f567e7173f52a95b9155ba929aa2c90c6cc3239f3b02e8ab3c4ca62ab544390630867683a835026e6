import { computed, ref, unref, watch } from "vue";

//#region src/transfer/hooks/useSelection.ts
const EMPTY_KEYS = [];
function filterKeys(keys, dataKeys) {
	const filteredKeys = keys.filter((key) => dataKeys.has(key));
	return keys.length === filteredKeys.length ? keys : filteredKeys;
}
function flattenKeys(keys) {
	return Array.from(keys).join(";");
}
function useSelection(leftDataSource, rightDataSource, selectedKeys) {
	const mergedSelectedKeys = ref(unref(selectedKeys) ?? EMPTY_KEYS);
	watch(() => unref(selectedKeys), (nextKeys) => {
		mergedSelectedKeys.value = nextKeys ?? EMPTY_KEYS;
	});
	const leftKeys = computed(() => new Set(unref(leftDataSource).map((src) => src?.key)));
	const rightKeys = computed(() => new Set(unref(rightDataSource).map((src) => src?.key)));
	const sourceSelectedKeys = computed(() => filterKeys(mergedSelectedKeys.value, leftKeys.value));
	const targetSelectedKeys = computed(() => filterKeys(mergedSelectedKeys.value, rightKeys.value));
	watch(() => [flattenKeys(leftKeys.value), flattenKeys(rightKeys.value)], () => {
		mergedSelectedKeys.value = [...filterKeys(mergedSelectedKeys.value, leftKeys.value), ...filterKeys(mergedSelectedKeys.value, rightKeys.value)];
	});
	const setMergedSelectedKeys = (nextKeys) => {
		if (unref(selectedKeys) === void 0) mergedSelectedKeys.value = nextKeys;
	};
	const setSourceSelectedKeys = (nextSrcKeys) => {
		setMergedSelectedKeys([...nextSrcKeys, ...targetSelectedKeys.value]);
	};
	const setTargetSelectedKeys = (nextTargetKeys) => {
		setMergedSelectedKeys([...sourceSelectedKeys.value, ...nextTargetKeys]);
	};
	return [
		sourceSelectedKeys,
		targetSelectedKeys,
		setSourceSelectedKeys,
		setTargetSelectedKeys
	];
}
var useSelection_default = useSelection;

//#endregion
export { useSelection_default as default };