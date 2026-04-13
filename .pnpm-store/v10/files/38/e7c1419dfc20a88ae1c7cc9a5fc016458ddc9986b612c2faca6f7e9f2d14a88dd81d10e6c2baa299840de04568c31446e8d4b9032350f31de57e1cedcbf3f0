function getKey(data, index) {
	const { key } = data;
	let value;
	if ("value" in data) value = data.value;
	if (key !== null && key !== void 0) return key;
	if (value !== void 0) return value;
	return `vc-index-key-${index}`;
}
function isValidCount(value) {
	return typeof value !== "undefined" && !Number.isNaN(value);
}
function fillFieldNames(fieldNames, childrenAsData) {
	const { label, value, options, groupLabel } = fieldNames || {};
	const mergedLabel = label || (childrenAsData ? "children" : "label");
	return {
		label: mergedLabel,
		value: value || "value",
		options: options || "options",
		groupLabel: groupLabel || mergedLabel
	};
}
function flattenOptions(options, { fieldNames, childrenAsData } = {}) {
	const flattenList = [];
	const { label: fieldLabel, value: fieldValue, options: fieldOptions, groupLabel } = fillFieldNames(fieldNames, false);
	function dig(list, isGroupOption) {
		if (!Array.isArray(list)) return;
		list.forEach((data) => {
			if (isGroupOption || !(fieldOptions in data)) {
				const value = data[fieldValue];
				flattenList.push({
					key: getKey(data, flattenList.length),
					groupOption: isGroupOption,
					data,
					label: data[fieldLabel],
					value
				});
			} else {
				let grpLabel = data[groupLabel];
				if (grpLabel === void 0 && childrenAsData) grpLabel = data.label;
				flattenList.push({
					key: getKey(data, flattenList.length),
					group: true,
					data,
					label: grpLabel
				});
				dig(data[fieldOptions], true);
			}
		});
	}
	dig(options, false);
	return flattenList;
}
function injectPropsWithOption(option) {
	if (!option) return option;
	const newOption = { ...option };
	if (!("props" in newOption)) Object.defineProperty(newOption, "props", { get() {
		console.warn("Return type is option instead of Option instance. Please read value directly instead of reading from `props`.");
		return newOption;
	} });
	return newOption;
}
function getSeparatedContent(text, tokens, end) {
	if (!tokens || !tokens.length) return null;
	let match = false;
	const separate = (str, [token, ...restTokens]) => {
		if (!token) return [str];
		const list$1 = str.split(token);
		match = match || list$1.length > 1;
		return list$1.reduce((prevList, unitStr) => [...prevList, ...separate(unitStr, restTokens)], []).filter(Boolean);
	};
	const list = separate(text, tokens);
	if (match) return typeof end !== "undefined" ? list.slice(0, end) : list;
	else return null;
}
export { fillFieldNames, flattenOptions, getSeparatedContent, injectPropsWithOption, isValidCount };
