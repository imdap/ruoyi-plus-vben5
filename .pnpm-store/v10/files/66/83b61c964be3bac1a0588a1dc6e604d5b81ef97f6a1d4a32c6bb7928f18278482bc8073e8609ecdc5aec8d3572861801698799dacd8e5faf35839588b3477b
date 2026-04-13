import { computed } from "vue";
import { conductCheck } from "@v-c/tree";
function useCheckedKeys(rawLabeledValues, rawHalfCheckedValues, treeConduction, keyEntities) {
	const merged = computed(() => {
		const extractValues = (values) => values.map(({ value }) => value);
		const checkedKeys = extractValues(rawLabeledValues.value);
		const halfCheckedKeys = extractValues(rawHalfCheckedValues.value);
		const missingValues = checkedKeys.filter((key) => !keyEntities.value[String(key)]);
		let finalCheckedKeys = checkedKeys;
		let finalHalfCheckedKeys = halfCheckedKeys;
		if (treeConduction.value) {
			const conductResult = conductCheck(checkedKeys, true, keyEntities.value);
			finalCheckedKeys = conductResult.checkedKeys;
			finalHalfCheckedKeys = conductResult.halfCheckedKeys;
		}
		return [Array.from(new Set([...missingValues, ...finalCheckedKeys])), finalHalfCheckedKeys];
	});
	return [computed(() => merged.value[0]), computed(() => merged.value[1])];
}
export { useCheckedKeys as default };
