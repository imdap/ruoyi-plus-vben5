import { SHOW_CHILD } from "./commonUtil.js";
function formatStrategyValues(pathKeys, getKeyPathEntities, showCheckedStrategy) {
	const valueSet = new Set(pathKeys);
	const keyPathEntities = getKeyPathEntities();
	return pathKeys.filter((key) => {
		const entity = keyPathEntities[key];
		const parent = entity ? entity.parent : null;
		const children = entity ? entity.children : null;
		if (entity && entity.node.disabled) return true;
		return showCheckedStrategy === "SHOW_CHILD" ? !(children && children.some((child) => child.key && valueSet.has(child.key))) : !(parent && !parent.node.disabled && valueSet.has(parent.key));
	});
}
function toPathOptions(valueCells, options, fieldNames, stringMode = false) {
	let currentList = options;
	const valueOptions = [];
	for (let i = 0; i < valueCells.length; i += 1) {
		const valueCell = valueCells[i];
		const foundIndex = currentList?.findIndex((option) => {
			const val = option[fieldNames.value];
			return stringMode ? String(val) === String(valueCell) : val === valueCell;
		});
		const foundOption = foundIndex !== -1 ? currentList?.[foundIndex] : null;
		valueOptions.push({
			value: foundOption?.[fieldNames.value] ?? valueCell,
			index: foundIndex,
			option: foundOption
		});
		currentList = foundOption?.[fieldNames.children];
	}
	return valueOptions;
}
export { formatStrategyValues, toPathOptions };
