import isValid_default from "../isValid.js";
import omit from "../omit.js";
import { Comment, Fragment, Text, isVNode, toRef } from "vue";
function isEmptyElement(c) {
	return c && (c.type === Comment || c.type === Fragment && c.children.length === 0 || c.type === Text && c.children.trim() === "");
}
function filterEmpty(children = []) {
	if (!Array.isArray(children)) children = [children];
	const res = [];
	children.forEach((child) => {
		if (Array.isArray(child)) res.push(...child);
		else if (child?.type === Fragment) res.push(...filterEmpty(child.children));
		else res.push(child);
	});
	return res.filter((c) => !isEmptyElement(c));
}
const skipFlattenKey = Symbol("skipFlatten");
function flattenChildren(children, isFilterEmpty = true) {
	const temp = Array.isArray(children) ? children : [children];
	const res = [];
	temp.forEach((child) => {
		if (Array.isArray(child)) res.push(...flattenChildren(child, isFilterEmpty));
		else if (isValid_default(child)) res.push(child);
		else if (child && typeof child === "object" && child.type === Fragment) if (child.key === skipFlattenKey) res.push(child);
		else res.push(...flattenChildren(child.children, isFilterEmpty));
		else if (child && isVNode(child)) {
			if (isFilterEmpty && !isEmptyElement(child)) res.push(child);
			else if (!isFilterEmpty) res.push(child);
		}
	});
	if (isFilterEmpty) return filterEmpty(res);
	return res;
}
function toPropsRefs(obj, ...args) {
	const _res = {};
	args.forEach((key) => {
		_res[key] = toRef(obj, key);
	});
	return _res;
}
function removeUndefined(obj) {
	const res = {};
	Object.keys(obj).forEach((key) => {
		const value = obj[key];
		if (value !== void 0) res[key] = value;
	});
	return res;
}
var defaultOptions = {
	class: true,
	style: true
};
function pureAttrs(attrs, options = defaultOptions) {
	const enableClass = options.class ?? defaultOptions.class;
	const enableStyle = options.style ?? defaultOptions.style;
	const newAttrs = { ...attrs };
	if (enableClass) delete newAttrs.class;
	if (enableStyle) delete newAttrs.style;
	if (options.omits && options.omits.length > 0) return omit(newAttrs, options.omits);
	return newAttrs;
}
function getAttrStyleAndClass(attrs, options) {
	return {
		className: attrs.class,
		style: attrs.style,
		restAttrs: pureAttrs(attrs, options)
	};
}
function getStylePxValue(value) {
	if (typeof value === "number") return `${value}px`;
	else if (typeof value === "string") {
		const trimed = value.trim();
		if (Number.isNaN(Number(trimed))) return trimed;
		else return `${Number(trimed)}px`;
	}
	return value;
}
export { filterEmpty, flattenChildren, getAttrStyleAndClass, getStylePxValue, isEmptyElement, pureAttrs, removeUndefined, skipFlattenKey, toPropsRefs };
