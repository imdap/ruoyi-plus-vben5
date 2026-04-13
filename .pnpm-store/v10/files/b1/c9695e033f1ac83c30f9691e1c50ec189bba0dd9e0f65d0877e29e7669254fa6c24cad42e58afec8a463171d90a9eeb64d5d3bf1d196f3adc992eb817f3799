import { toPathKeys } from "../utils/commonUtil.js";
import { computed } from "vue";
import { conductCheck } from "@v-c/tree";
function useValues(multiple, rawValues, getPathKeyEntities, getValueByKeyPath, getMissingValues) {
	return computed(() => {
		const [existValues, missingValues] = getMissingValues(rawValues.value);
		if (!multiple.value || !rawValues.value.length) return [
			existValues,
			[],
			missingValues
		];
		const { checkedKeys, halfCheckedKeys } = conductCheck(toPathKeys(existValues), true, getPathKeyEntities());
		return [
			getValueByKeyPath(checkedKeys),
			getValueByKeyPath(halfCheckedKeys),
			missingValues
		];
	});
}
export { useValues as default };
