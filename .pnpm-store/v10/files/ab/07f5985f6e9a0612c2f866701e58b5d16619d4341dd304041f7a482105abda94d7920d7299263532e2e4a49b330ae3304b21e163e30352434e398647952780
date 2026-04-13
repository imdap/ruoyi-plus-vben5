import { ContextIsolator } from "../_util/ContextIsolator.js";
import { createVNode, isVNode } from "vue";

//#region src/select/usePopupRender.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function usePopupRender(renderFn) {
	if (!renderFn) return;
	return (...args) => {
		let _slot;
		return createVNode(ContextIsolator, { "space": true }, _isSlot(_slot = renderFn(...args)) ? _slot : { default: () => [_slot] });
	};
}
var usePopupRender_default = usePopupRender;

//#endregion
export { usePopupRender_default as default };