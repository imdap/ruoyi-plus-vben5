import { getSlotPropsFnRun } from "../../_util/tools.js";
import ActionButton_default from "../../_util/ActionButton.js";
import { useModalContext } from "../context.js";
import { createVNode, defineComponent, isVNode } from "vue";

//#region src/modal/components/ConfirmCancelBtn.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const ConfirmCancelBtn = /* @__PURE__ */ defineComponent(() => {
	const context = useModalContext();
	return () => {
		const { autoFocusButton, cancelButtonProps, isSilent, mergedOkCancel, rootPrefixCls, close, onCancel, onConfirm, onClose } = context.value;
		const cancelTextLocale = getSlotPropsFnRun({}, context.value, "cancelTextLocale");
		return mergedOkCancel ? createVNode(ActionButton_default, {
			"isSilent": isSilent,
			"actionFn": onCancel,
			"close": (...args) => {
				close?.(...args);
				onConfirm?.(false);
				onClose?.();
			},
			"autoFocus": autoFocusButton === "cancel",
			"buttonProps": cancelButtonProps,
			"prefixCls": `${rootPrefixCls}-btn`
		}, _isSlot(cancelTextLocale) ? cancelTextLocale : { default: () => [cancelTextLocale] }) : null;
	};
}, {
	name: "ConfirmCancelBtn",
	inheritAttrs: false
});
var ConfirmCancelBtn_default = ConfirmCancelBtn;

//#endregion
export { ConfirmCancelBtn_default as default };