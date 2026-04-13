function toArray(value) {
	if (value === null || value === void 0) return [];
	return Array.isArray(value) ? value : [value];
}
function isTitleType(title) {
	return ["string", "number"].includes(typeof title);
}
function injectPropsWithOption(option) {
	return { ...option };
}
function toVueNode(value) {
	return toArray(value);
}
function getTitle(item) {
	let title;
	if (item) {
		if (isTitleType(item.title)) title = item.title.toString();
		else if (isTitleType(item.label)) title = item.label.toString();
	}
	return title;
}
const isClient = typeof window !== "undefined" && window.document && window.document.documentElement;
const isBrowserClient = typeof process !== "undefined" && process.env.NODE_ENV !== "test" && isClient;
function hasValue(value) {
	return value !== void 0 && value !== null;
}
function isComboNoValue(value) {
	return !value && value !== 0;
}
export { getTitle, hasValue, injectPropsWithOption, isBrowserClient, isClient, isComboNoValue, toArray, toVueNode };
