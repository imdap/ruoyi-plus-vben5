import { getSlotPropsFnRun } from "../../_util/tools.js";
import ActionButton_default from "../../_util/ActionButton.js";
import { useModalContext } from "../context.js";
import { createVNode, defineComponent, isVNode } from "vue";

//#region src/modal/components/ConfirmOkBtn.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ConfirmOkBtn = /* @__PURE__ */ defineComponent(() => {
	const context = useModalContext();
	return () => {
		const { autoFocusButton, close, isSilent, okButtonProps, rootPrefixCls, okType, onConfirm, onOk, onClose } = context.value;
		const okTextLocale = getSlotPropsFnRun({}, context.value, "okTextLocale");
		return createVNode(ActionButton_default, {
			"isSilent": isSilent,
			"type": okType || "primary",
			"actionFn": onOk,
			"close": (...args) => {
				close?.(...args);
				onConfirm?.(true);
				onClose?.();
			},
			"autoFocus": autoFocusButton === "ok",
			"buttonProps": okButtonProps,
			"prefixCls": `${rootPrefixCls}-btn`
		}, _isSlot(okTextLocale) ? okTextLocale : { default: () => [okTextLocale] });
	};
}, {
	name: "ConfirmOkBtn",
	inheritAttrs: false
});
var ConfirmOkBtn_default = ConfirmOkBtn;

//#endregion
export { ConfirmOkBtn_default as default };