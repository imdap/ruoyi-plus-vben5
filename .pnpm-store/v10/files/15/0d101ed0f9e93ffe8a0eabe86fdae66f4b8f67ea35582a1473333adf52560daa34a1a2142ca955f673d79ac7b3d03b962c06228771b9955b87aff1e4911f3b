import { isCheckDisabled } from "./valueUtil.js";
const SHOW_ALL = "SHOW_ALL";
const SHOW_PARENT = "SHOW_PARENT";
const SHOW_CHILD = "SHOW_CHILD";
function formatStrategyValues(values, strategy, keyEntities, fieldNames) {
	const valueSet = new Set(values);
	if (strategy === "SHOW_CHILD") return values.filter((key) => {
		const entity = keyEntities[String(key)];
		return !entity || !entity.children || !entity.children.some(({ node }) => valueSet.has(node[fieldNames.value])) || !entity.children.every(({ node }) => isCheckDisabled(node) || valueSet.has(node[fieldNames.value]));
	});
	if (strategy === "SHOW_PARENT") return values.filter((key) => {
		const entity = keyEntities[String(key)];
		const parent = entity ? entity.parent : null;
		return !parent || isCheckDisabled(parent.node) || !valueSet.has(parent.key);
	});
	return values;
}
export { SHOW_ALL, SHOW_CHILD, SHOW_PARENT, formatStrategyValues };
