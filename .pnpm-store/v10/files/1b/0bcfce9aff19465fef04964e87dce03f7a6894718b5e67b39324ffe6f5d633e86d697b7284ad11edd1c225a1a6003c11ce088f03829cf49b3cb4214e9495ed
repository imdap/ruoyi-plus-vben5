import { filterEmpty } from "./props-util/index.js";
import warning_default from "./warning.js";
import { isDOM } from "./Dom/findDOMNode.js";
import { Comment, Fragment, cloneVNode, isVNode, render } from "vue";
function cloneElement(vnode, nodeProps = {}, override = true, mergeRef = false) {
	let ele = vnode;
	if (Array.isArray(vnode)) ele = filterEmpty(vnode)[0];
	if (!ele) return null;
	const node = cloneVNode(ele, nodeProps, mergeRef);
	node.props = override ? {
		...node.props,
		...nodeProps
	} : node.props;
	warning_default(typeof node.props.class !== "object", "class must be string");
	return node;
}
function cloneVNodes(vnodes, nodeProps = {}, override = true) {
	return vnodes.map((vnode) => cloneElement(vnode, nodeProps, override));
}
function deepCloneElement(vnode, nodeProps = {}, override = true, mergeRef = false) {
	if (Array.isArray(vnode)) return vnode.map((item) => deepCloneElement(item, nodeProps, override, mergeRef));
	else {
		if (!isVNode(vnode)) return vnode;
		const cloned = cloneElement(vnode, nodeProps, override, mergeRef);
		if (Array.isArray(cloned.children)) cloned.children = deepCloneElement(cloned.children);
		return cloned;
	}
}
function triggerVNodeUpdate(vm, attrs, dom) {
	render(cloneVNode(vm, { ...attrs }), dom);
}
function ensureValidVNode(slot) {
	return (slot || []).some((child) => {
		if (!isVNode(child)) return true;
		if (child.type === Comment) return false;
		if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
		return true;
	}) ? slot : null;
}
function customRenderSlot(slots, name, props, fallback) {
	const slot = slots[name]?.(props);
	if (ensureValidVNode(slot)) return slot;
	return fallback?.();
}
function resolveToElement(node) {
	if (!node) return null;
	if (isDOM(node?.__$el)) return node.__$el;
	if (isDOM(node)) return node;
	const exposed = node;
	const nativeEl = exposed?.nativeElement;
	if (isDOM(nativeEl?.value)) return nativeEl.value;
	if (isDOM(nativeEl)) return nativeEl;
	const exposedEl = exposed?.el;
	if (isDOM(exposedEl?.value)) return exposedEl.value;
	if (isDOM(exposedEl)) return exposedEl;
	if (typeof exposed?.getElement === "function") {
		const el = exposed.getElement();
		if (isDOM(el)) return el;
	}
	if (isDOM(exposed?.$el)) return exposed.$el;
	else if (exposed.$el) {
		const dom = exposed.$el;
		if (dom && (dom.nodeType === 3 || dom.nodeType === 8) && dom.nextElementSibling) return dom.nextElementSibling;
	}
	return null;
}
export { cloneElement, cloneVNodes, customRenderSlot, deepCloneElement, ensureValidVNode, resolveToElement, triggerVNodeUpdate };
