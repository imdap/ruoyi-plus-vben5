import button_default from "../../button/index.js";
import { useModalContext } from "../context.js";
import { createVNode, defineComponent, isVNode, mergeProps } from "vue";

//#region src/modal/components/NormalCancelBtn.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const NormalCancelBtn = /* @__PURE__ */ defineComponent(() => {
	const context = useModalContext();
	return () => {
		const { onCancel, cancelTextLocale, cancelButtonProps } = context.value;
		return createVNode(button_default, mergeProps({ "onClick": onCancel }, cancelButtonProps), _isSlot(cancelTextLocale) ? cancelTextLocale : { default: () => [cancelTextLocale] });
	};
}, {
	name: "NormalCancelBtn",
	inheritAttrs: false
});
var NormalCancelBtn_default = NormalCancelBtn;

//#endregion
export { NormalCancelBtn_default as default };