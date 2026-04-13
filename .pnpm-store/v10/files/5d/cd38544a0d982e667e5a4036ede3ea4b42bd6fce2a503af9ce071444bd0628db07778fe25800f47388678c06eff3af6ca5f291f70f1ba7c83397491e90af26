import { PresetColors } from "../theme/interface/presetColors.js";
import { Fragment, Text, cloneVNode, createVNode, isVNode } from "vue";

//#region src/button/buttonHelper.tsx
const rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isUnBorderedButtonVariant(type) {
	return type === "text" || type === "link";
}
function splitCNCharsBySpace(child, needInserted, style, className) {
	if (child === null || child === void 0) return child;
	const SPACE = needInserted ? " " : "";
	if (typeof child === "string" || typeof child === "number") {
		const text = String(child);
		const content = isTwoCNChar(text) ? text.split("").join(SPACE) : text;
		return createVNode("span", {
			class: className,
			style
		}, content);
	}
	if (isVNode(child)) {
		if (child.type === Text) {
			const text = String(child.children ?? "");
			const content = isTwoCNChar(text) ? text.split("").join(SPACE) : text;
			return createVNode("span", {
				key: child.key,
				class: className,
				style
			}, content);
		}
		if (child.type === Fragment) return createVNode("span", {
			key: child.key,
			class: className,
			style
		}, child.children);
		if (typeof child.type === "string" && typeof child.children === "string" && isTwoCNChar(child.children)) return cloneVNode(child, {
			class: className,
			style
		}, child.children?.split("")?.join?.(SPACE));
		return child;
	}
	return child;
}
function isPureTextChild(child) {
	if (typeof child === "string" || typeof child === "number") return true;
	if (isVNode(child)) return child.type === Text && typeof child.children === "string";
	return false;
}
function getChildText(child) {
	if (typeof child === "string" || typeof child === "number") return String(child);
	if (isVNode(child) && child.type === Text && typeof child.children === "string") return child.children;
	return "";
}
function spaceChildren(children, needInserted, style, className) {
	const childList = [];
	let isPrevChildPure = false;
	children.forEach((child) => {
		const isCurrentChildPure = isPureTextChild(child);
		if (isPrevChildPure && isCurrentChildPure) {
			const lastIndex = childList.length - 1;
			const lastChild = childList[lastIndex];
			const lastText = getChildText(lastChild);
			const currentText = getChildText(child);
			if (lastText !== "" && currentText !== "") childList[lastIndex] = `${lastText}${currentText}`;
			else childList.push(child);
		} else childList.push(child);
		isPrevChildPure = isCurrentChildPure;
	});
	return childList.map((item) => splitCNCharsBySpace(item, needInserted, style, className));
}
const _ButtonVariantTypes = [
	"outlined",
	"dashed",
	"solid",
	"filled",
	"text",
	"link"
];
const _ButtonColorTypes = [
	"default",
	"primary",
	"danger",
	...PresetColors
];

//#endregion
export { _ButtonColorTypes, _ButtonVariantTypes, isTwoCNChar, isUnBorderedButtonVariant, spaceChildren };