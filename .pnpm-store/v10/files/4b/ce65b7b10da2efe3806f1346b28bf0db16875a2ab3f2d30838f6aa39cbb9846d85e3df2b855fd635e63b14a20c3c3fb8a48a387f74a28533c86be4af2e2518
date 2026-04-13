function toArray(value) {
	return Array.isArray(value) ? value : value !== void 0 ? [value] : [];
}
function fillFieldNames(fieldNames) {
	const { label, value, children } = fieldNames || {};
	return {
		_title: label ? [label] : ["title", "label"],
		value: value || "value",
		key: value || "value",
		children: children || "children"
	};
}
function isCheckDisabled(node) {
	return !node || node.disabled || node.disableCheckbox || node.checkable === false;
}
function getAllKeys(treeData, fieldNames) {
	const keys = [];
	const dig = (list) => {
		list.forEach((item) => {
			const children = item[fieldNames.children];
			if (children) {
				keys.push(item[fieldNames.value]);
				dig(children);
			}
		});
	};
	dig(treeData);
	return keys;
}
const isNil = (val) => val === null || val === void 0;
export { fillFieldNames, getAllKeys, isCheckDisabled, isNil, toArray };
