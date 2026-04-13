import { toPathKey, toPathKeys } from "../utils/commonUtil.js";
import { formatStrategyValues } from "../utils/treeUtil.js";
import { conductCheck } from "@v-c/tree";
function useSelect(multiple, triggerChange, checkedValues, halfCheckedValues, missingCheckedValues, getPathKeyEntities, getValueByKeyPath, showCheckedStrategy) {
	return (valuePath) => {
		if (!multiple.value) triggerChange(valuePath);
		else {
			const pathKey = toPathKey(valuePath);
			const checkedPathKeys = toPathKeys(checkedValues.value);
			const halfCheckedPathKeys = toPathKeys(halfCheckedValues.value);
			const existInChecked = checkedPathKeys.includes(pathKey);
			const existInMissing = missingCheckedValues.value.some((valueCells) => toPathKey(valueCells) === pathKey);
			let nextCheckedValues = checkedValues.value;
			let nextMissingValues = missingCheckedValues.value;
			if (existInMissing && !existInChecked) nextMissingValues = missingCheckedValues.value.filter((valueCells) => toPathKey(valueCells) !== pathKey);
			else {
				const nextRawCheckedKeys = existInChecked ? checkedPathKeys.filter((key) => key !== pathKey) : [...checkedPathKeys, pathKey];
				const pathKeyEntities = getPathKeyEntities();
				let checkedKeys;
				if (existInChecked) ({checkedKeys} = conductCheck(nextRawCheckedKeys, {
					checked: false,
					halfCheckedKeys: halfCheckedPathKeys
				}, pathKeyEntities));
				else ({checkedKeys} = conductCheck(nextRawCheckedKeys, true, pathKeyEntities));
				nextCheckedValues = getValueByKeyPath(formatStrategyValues(checkedKeys, getPathKeyEntities, showCheckedStrategy?.value));
			}
			triggerChange([...nextMissingValues, ...nextCheckedValues]);
		}
	};
}
export { useSelect as default };
