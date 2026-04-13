import { SEARCH_MARK } from "../hooks/useSearchOptions.js";
const VALUE_SPLIT = "__VC_CASCADER_SPLIT__";
const SHOW_PARENT = "SHOW_PARENT";
const SHOW_CHILD = "SHOW_CHILD";
function toPathKey(value) {
	return value.join(VALUE_SPLIT);
}
function toPathKeys(value) {
	return value.map(toPathKey);
}
function toPathValueStr(pathKey) {
	return pathKey.split(VALUE_SPLIT);
}
function fillFieldNames(fieldNames) {
	const { label, value, children } = fieldNames || {};
	const val = value || "value";
	return {
		label: label || "label",
		value: val,
		key: val,
		children: children || "children"
	};
}
function isLeaf(option, fieldNames) {
	return option.isLeaf ?? !option[fieldNames.children]?.length;
}
function scrollIntoParentView(element) {
	const parent = element.parentElement;
	if (!parent) return;
	const elementToParent = element.offsetTop - parent.offsetTop;
	if (elementToParent - parent.scrollTop < 0) parent.scrollTo({ top: elementToParent });
	else if (elementToParent + element.offsetHeight - parent.scrollTop > parent.offsetHeight) parent.scrollTo({ top: elementToParent + element.offsetHeight - parent.offsetHeight });
}
function getFullPathKeys(options, fieldNames) {
	return options.map((item) => item[SEARCH_MARK]?.map((opt) => opt[fieldNames.value]));
}
function isMultipleValue(value) {
	return Array.isArray(value) && Array.isArray(value[0]);
}
function toRawValues(value) {
	if (!value) return [];
	if (isMultipleValue(value)) return value;
	return (value.length === 0 ? [] : [value]).map((val) => Array.isArray(val) ? val : [val]);
}
export { SHOW_CHILD, SHOW_PARENT, VALUE_SPLIT, fillFieldNames, getFullPathKeys, isLeaf, scrollIntoParentView, toPathKey, toPathKeys, toPathValueStr, toRawValues };
