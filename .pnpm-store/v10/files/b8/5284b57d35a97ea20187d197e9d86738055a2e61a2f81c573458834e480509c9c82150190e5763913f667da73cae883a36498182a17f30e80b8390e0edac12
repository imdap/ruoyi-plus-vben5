import useId_default from "../hooks/useId.js";
import { getDOM } from "./findDOMNode.js";
import isVisible_default from "./isVisible.js";
import { watch } from "vue";
function focusable(node, includePositive = false) {
	if (isVisible_default(node)) {
		const nodeName = node.nodeName.toLowerCase();
		const isFocusableElement = [
			"input",
			"select",
			"textarea",
			"button"
		].includes(nodeName) || node.isContentEditable || nodeName === "a" && !!node.getAttribute("href");
		const tabIndexAttr = node.getAttribute("tabindex");
		const tabIndexNum = Number(tabIndexAttr);
		let tabIndex = null;
		if (tabIndexAttr && !Number.isNaN(tabIndexNum)) tabIndex = tabIndexNum;
		else if (isFocusableElement && tabIndex === null) tabIndex = 0;
		if (isFocusableElement && node.disabled) tabIndex = null;
		return tabIndex !== null && (tabIndex >= 0 || includePositive && tabIndex < 0);
	}
	return false;
}
function getFocusNodeList(node, includePositive = false) {
	const res = [...node.querySelectorAll("*")].filter((child) => {
		return focusable(child, includePositive);
	});
	if (focusable(node, includePositive)) res.unshift(node);
	return res;
}
function triggerFocus(element, option) {
	if (!element) return;
	element.focus(option);
	const { cursor } = option || {};
	if (cursor) {
		const len = element.value.length;
		switch (cursor) {
			case "start":
				element.setSelectionRange(0, 0);
				break;
			case "end":
				element.setSelectionRange(len, len);
				break;
			default: element.setSelectionRange(0, len);
		}
	}
}
var lastFocusElement = null;
var focusElements = [];
var idToElementMap = /* @__PURE__ */ new Map();
var ignoredElementMap = /* @__PURE__ */ new Map();
var allowedElementMap = /* @__PURE__ */ new Map();
function getLastElement() {
	return focusElements[focusElements.length - 1];
}
function getLastLockId() {
	const lastElement = getLastElement();
	if (!lastElement) return void 0;
	for (const [id, ele] of idToElementMap.entries()) if (ele === lastElement) return id;
}
function isIgnoredElement(element) {
	const lockId = getLastLockId();
	if (!lockId || !element) return false;
	const ignoredEle = ignoredElementMap.get(lockId);
	return !!ignoredEle && (ignoredEle === element || ignoredEle.contains(element));
}
function isAllowedElement(element) {
	const lockId = getLastLockId();
	if (!lockId || !element) return false;
	const allowedElements = allowedElementMap.get(lockId);
	if (!allowedElements?.size) return false;
	for (const allowedElement of allowedElements) if (allowedElement === element || allowedElement.contains(element)) return true;
	return false;
}
function hasFocus(element) {
	const { activeElement } = document;
	return element === activeElement || element.contains(activeElement);
}
function syncFocus() {
	const lastElement = getLastElement();
	const { activeElement } = document;
	if (isIgnoredElement(activeElement) || isAllowedElement(activeElement)) return;
	if (lastElement && !hasFocus(lastElement)) {
		const focusableList = getFocusNodeList(lastElement);
		(focusableList.includes(lastFocusElement) ? lastFocusElement : focusableList[0])?.focus({ preventScroll: true });
	} else lastFocusElement = activeElement;
}
function onWindowKeyDown(e) {
	if (e.key === "Tab") {
		const { activeElement } = document;
		const focusableList = getFocusNodeList(getLastElement());
		const last = focusableList[focusableList.length - 1];
		if (e.shiftKey && activeElement === focusableList[0]) lastFocusElement = last;
		else if (!e.shiftKey && activeElement === last) lastFocusElement = focusableList[0];
	}
}
function lockFocus(element, id) {
	if (element) {
		idToElementMap.set(id, element);
		focusElements = focusElements.filter((ele) => ele !== element);
		focusElements.push(element);
		window.addEventListener("focusin", syncFocus);
		window.addEventListener("keydown", onWindowKeyDown, true);
		syncFocus();
	}
	return () => {
		lastFocusElement = null;
		focusElements = focusElements.filter((ele) => ele !== element);
		idToElementMap.delete(id);
		ignoredElementMap.delete(id);
		allowedElementMap.delete(id);
		if (focusElements.length === 0) {
			window.removeEventListener("focusin", syncFocus);
			window.removeEventListener("keydown", onWindowKeyDown, true);
		}
	};
}
function useLockFocus(lock, getElement) {
	const id = useId_default();
	watch([lock, () => getElement()], ([nextLock, element], _o, onCleanup) => {
		element = getDOM(element);
		if (nextLock && element) onCleanup(lockFocus(element, id));
	}, {
		flush: "post",
		immediate: true
	});
	const ignoreElement = (ele) => {
		if (ele) ignoredElementMap.set(id, ele);
	};
	const registerAllowedElement = (ele) => {
		if (!ele) return () => {};
		let allowedElements = allowedElementMap.get(id);
		if (!allowedElements) {
			allowedElements = /* @__PURE__ */ new Set();
			allowedElementMap.set(id, allowedElements);
		}
		allowedElements.add(ele);
		return () => {
			const nextAllowedElements = allowedElementMap.get(id);
			nextAllowedElements?.delete(ele);
			if (!nextAllowedElements?.size) allowedElementMap.delete(id);
		};
	};
	return [ignoreElement, registerAllowedElement];
}
export { getFocusNodeList, lockFocus, triggerFocus, useLockFocus };
