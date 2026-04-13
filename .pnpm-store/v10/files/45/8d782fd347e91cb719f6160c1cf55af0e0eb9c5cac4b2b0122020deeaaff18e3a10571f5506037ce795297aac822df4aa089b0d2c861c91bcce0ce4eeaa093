import { ref } from "vue";

//#region src/_util/hooks/useMultipleSelect.ts
/**
* @title multipleSelect hooks
* @description multipleSelect by hold down shift key
*/
function useMultipleSelect(getKey) {
	const prevSelectedIndex = ref(null);
	const multipleSelect = (currentSelectedIndex, data, selectedKeys) => {
		const configPrevSelectedIndex = prevSelectedIndex.value ?? currentSelectedIndex;
		const startIndex = Math.min(configPrevSelectedIndex || 0, currentSelectedIndex);
		const endIndex = Math.max(configPrevSelectedIndex || 0, currentSelectedIndex);
		const rangeKeys = data.slice(startIndex, endIndex + 1).map(getKey);
		const shouldSelected = rangeKeys.some((rangeKey) => !selectedKeys.has(rangeKey));
		const changedKeys = [];
		rangeKeys.forEach((item) => {
			if (shouldSelected) {
				if (!selectedKeys.has(item)) changedKeys.push(item);
				selectedKeys.add(item);
			} else {
				selectedKeys.delete(item);
				changedKeys.push(item);
			}
		});
		prevSelectedIndex.value = shouldSelected ? endIndex : null;
		return changedKeys;
	};
	const setPrevSelectedIndex = (value) => {
		prevSelectedIndex.value = value;
	};
	return [multipleSelect, setPrevSelectedIndex];
}

//#endregion
export { useMultipleSelect };