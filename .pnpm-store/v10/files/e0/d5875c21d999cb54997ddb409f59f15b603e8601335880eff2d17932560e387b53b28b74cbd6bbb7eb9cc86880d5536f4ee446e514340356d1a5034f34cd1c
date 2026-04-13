import { tuple } from "../type.js";
import { nextTick } from "vue";
tuple("bottomLeft", "bottomRight", "topLeft", "topRight");
function getTransitionDirection(placement) {
	if (placement !== void 0 && (placement === "topLeft" || placement === "topRight")) return `slide-down`;
	return `slide-up`;
}
function getTransitionProps(transitionName, opt = {}) {
	if (!transitionName) return {};
	return transitionName ? {
		name: transitionName,
		appear: true,
		enterFromClass: `${transitionName} ${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-prepare ${transitionName}-enter-prepare ${transitionName}-enter-start`,
		enterActiveClass: `${transitionName} ${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-prepare ${transitionName}-enter-prepare `,
		enterToClass: `${transitionName} ${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-active ${transitionName}-enter-active`,
		leaveFromClass: `${transitionName} ${transitionName}-leave`,
		leaveActiveClass: `${transitionName} ${transitionName}-leave ${transitionName}-leave-active`,
		leaveToClass: `${transitionName} ${transitionName}-leave ${transitionName}-leave-active`,
		...opt
	} : {
		css: false,
		...opt
	};
}
function getTransitionGroupProps(transitionName, opt = {}) {
	if (!transitionName) return {
		css: false,
		...opt
	};
	return {
		name: transitionName,
		appear: true,
		enterFromClass: `${transitionName} ${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-prepare ${transitionName}-appear-start ${transitionName}-enter-prepare ${transitionName}-enter-start`,
		enterActiveClass: `${transitionName} ${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-prepare ${transitionName}-enter-prepare`,
		enterToClass: `${transitionName} ${transitionName}-enter ${transitionName}-appear ${transitionName}-appear-active ${transitionName}-enter-active`,
		leaveFromClass: `${transitionName} ${transitionName}-leave`,
		leaveActiveClass: `${transitionName} ${transitionName}-leave ${transitionName}-leave-active`,
		leaveToClass: `${transitionName} ${transitionName}-leave ${transitionName}-leave-active`,
		moveClass: `${transitionName} ${transitionName}-move`,
		...opt
	};
}
var getCollapsedHeight = () => ({
	height: 0,
	opacity: 0
});
var getRealHeight = (node) => ({
	height: `${node.scrollHeight}px`,
	opacity: 1
});
var getCurrentHeight = (node) => ({ height: `${node.offsetHeight}px` });
function collapseMotion(name = "ant-motion-collapse", style, className) {
	return {
		name,
		appear: true,
		css: true,
		onBeforeEnter: (node) => {
			className.value = name;
			style.value = getCollapsedHeight(node);
		},
		onEnter: (node) => {
			nextTick(() => {
				style.value = getRealHeight(node);
			});
		},
		onAfterEnter: () => {
			className.value = "";
			style.value = {};
		},
		onBeforeLeave: (node) => {
			className.value = name;
			style.value = getCurrentHeight(node);
		},
		onLeave: (node) => {
			setTimeout(() => {
				style.value = getCollapsedHeight(node);
			});
		},
		onAfterLeave: () => {
			className.value = "";
			style.value = {};
		}
	};
}
function getTransitionName(rootPrefixCls, motion, transitionName) {
	if (transitionName !== void 0) return transitionName;
	return `${rootPrefixCls}-${motion}`;
}
export { collapseMotion, getTransitionDirection, getTransitionGroupProps, getTransitionName, getTransitionProps };
