import { Fragment, Text, cloneVNode, h, isVNode } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { isFragment } from "@v-c/util/dist/Children/isFragment";

//#region src/_util/vueNode.ts
function replaceElement(element, replacement, props) {
	if (!isVNode(element)) return replacement;
	return cloneVNode(element, typeof props === "function" ? props(element.props || {}) : props);
}
function cloneElement(element, props) {
	return replaceElement(element, element, props);
}
function getVNode(node) {
	if (typeof node === "function") return node?.();
	return node;
}
function checkRenderNode(node) {
	if (!node) return;
	const pureChild = filterEmpty(Array.isArray(node) ? node : [node]);
	if (pureChild.length > 0) if (pureChild.length === 1) return pureChild[0];
	else return h(Fragment, null, pureChild);
}
function getTextByNode(node) {
	if (isVNode(node) && node.type === Text) return node.children;
	else if (typeof node === "object" && node !== null && (typeof node.children === "string" || typeof node.children === "number")) return node.children;
	return node;
}
function getTextNodeArr(nodes) {
	const res = [];
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		res.push(getTextByNode(node));
	}
	return res;
}

//#endregion
export { checkRenderNode, cloneElement, getTextByNode, getTextNodeArr, getVNode, isFragment, replaceElement };