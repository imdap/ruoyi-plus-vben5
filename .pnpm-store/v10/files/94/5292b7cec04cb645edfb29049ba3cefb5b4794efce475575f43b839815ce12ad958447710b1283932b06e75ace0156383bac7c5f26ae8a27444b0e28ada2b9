import { getSlotPropsFnRun } from "../../_util/tools.js";
import { convertLegacyProps } from "../../button/Button.js";
import button_default from "../../button/index.js";
import { useModalContext } from "../context.js";
import { createVNode, defineComponent, isVNode, mergeProps } from "vue";

//#region src/modal/components/NormalOkBtn.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const NormalOkBtn = /* @__PURE__ */ defineComponent(() => {
	const context = useModalContext();
	return () => {
		const { okType, confirmLoading, okButtonProps, onOk } = context.value;
		const okTextLocale = getSlotPropsFnRun({}, { okTextLocale: context.value.okTextLocale }, "okTextLocale");
		return createVNode(button_default, mergeProps(convertLegacyProps(okType), {
			"loading": confirmLoading,
			"onClick": onOk
		}, okButtonProps), _isSlot(okTextLocale) ? okTextLocale : { default: () => [okTextLocale] });
	};
}, {
	name: "NormalOkBtn",
	inheritAttrs: false
});
var NormalOkBtn_default = NormalOkBtn;

//#endregion
export { NormalOkBtn_default as default };