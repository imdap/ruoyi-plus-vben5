import canUseDom from "./canUseDom.js";
import contains from "./contains.js";
var APPEND_ORDER = "data-vc-order";
var APPEND_PRIORITY = "data-vc-priority";
var MARK_KEY = `vc-util-key`;
var containerCache = /* @__PURE__ */ new Map();
function getMark({ mark } = {}) {
	if (mark) return mark.startsWith("data-") ? mark : `data-${mark}`;
	return MARK_KEY;
}
function getContainer(option) {
	if (option.attachTo) return option.attachTo;
	return document.querySelector("head") || document.body;
}
function getOrder(prepend) {
	if (prepend === "queue") return "prependQueue";
	return prepend ? "prepend" : "append";
}
function findStyles(container) {
	return Array.from((containerCache.get(container) || container).children).filter((node) => node.tagName === "STYLE");
}
function injectCSS(css, option = {}) {
	if (!canUseDom()) return null;
	const { csp, prepend, priority = 0 } = option;
	const mergedOrder = getOrder(prepend);
	const isPrependQueue = mergedOrder === "prependQueue";
	const styleNode = document.createElement("style");
	styleNode.setAttribute(APPEND_ORDER, mergedOrder);
	if (isPrependQueue && priority) styleNode.setAttribute(APPEND_PRIORITY, `${priority}`);
	if (csp?.nonce) styleNode.nonce = csp?.nonce;
	styleNode.innerHTML = css;
	const container = getContainer(option);
	const { firstChild } = container;
	if (prepend) {
		if (isPrependQueue) {
			const existStyle = findStyles(container).filter((node) => {
				if (!["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER))) return false;
				return priority >= Number(node.getAttribute(APPEND_PRIORITY) || 0);
			});
			if (existStyle.length) {
				container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
				return styleNode;
			}
		}
		container.insertBefore(styleNode, firstChild);
	} else container.appendChild(styleNode);
	return styleNode;
}
function findExistNode(key, option = {}) {
	return findStyles(getContainer(option)).find((node) => node.getAttribute(getMark(option)) === key);
}
function removeCSS(key, option = {}) {
	if (!canUseDom()) return null;
	const existNode = findExistNode(key, option);
	if (existNode) getContainer(option).removeChild(existNode);
}
function syncRealContainer(container, option) {
	const cachedRealContainer = containerCache.get(container);
	if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
		const placeholderStyle = injectCSS("", option);
		const { parentNode } = placeholderStyle;
		containerCache.set(container, parentNode);
		container.removeChild(placeholderStyle);
	}
}
function clearContainerCache() {
	containerCache.clear();
}
function updateCSS(css, key, option = {}) {
	if (!canUseDom()) return null;
	syncRealContainer(getContainer(option), option);
	const existNode = findExistNode(key, option);
	if (existNode) {
		if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) existNode.nonce = option.csp?.nonce;
		if (existNode.innerHTML !== css) existNode.innerHTML = css;
		return existNode;
	}
	const newNode = injectCSS(css, option);
	newNode.setAttribute(getMark(option), key);
	return newNode;
}
export { clearContainerCache, injectCSS, removeCSS, updateCSS };
