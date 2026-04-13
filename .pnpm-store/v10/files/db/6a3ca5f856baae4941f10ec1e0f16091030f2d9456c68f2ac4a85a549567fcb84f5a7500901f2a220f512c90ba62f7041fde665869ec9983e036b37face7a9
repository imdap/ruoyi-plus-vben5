import canUseDom from "./canUseDom.js";
import { unref } from "vue";
function isDOM(node) {
	return node instanceof HTMLElement || node instanceof SVGElement;
}
function getDOM(elementRef) {
	const unrefElementRef = unref(elementRef);
	if (!canUseDom()) return unrefElementRef;
	const dom = findDOMNode(unrefElementRef) || (unrefElementRef && typeof unrefElementRef === "object" ? findDOMNode(unrefElementRef.nativeElement) : null);
	if (dom && (dom.nodeType === 3 || dom.nodeType === 8) && dom.nextElementSibling) return dom.nextElementSibling;
	return dom;
}
function findDOMNode(_node) {
	const node = unref(_node);
	if (!canUseDom()) return node;
	if (isDOM(node)) return node;
	else if (node && "$el" in node) return node.$el;
	return null;
}
export { findDOMNode as default, getDOM, isDOM };
