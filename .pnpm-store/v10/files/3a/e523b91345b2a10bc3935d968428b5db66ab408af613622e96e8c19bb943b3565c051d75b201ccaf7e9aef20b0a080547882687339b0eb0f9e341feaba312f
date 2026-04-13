import { getSlotPropsFnRun } from "../_util/tools.js";
import { DisabledContextProvider } from "../config-provider/DisabledContext.js";
import useLocale_default from "../locale/useLocale.js";
import { useModalProvider } from "./context.js";
import { getConfirmLocale } from "./locale.js";
import NormalCancelBtn_default from "./components/NormalCancelBtn.js";
import NormalOkBtn_default from "./components/NormalOkBtn.js";
import { Fragment, computed, createVNode, defineComponent, isVNode } from "vue";
import { CloseOutlined } from "@antdv-next/icons";

//#region src/modal/shared.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function renderCloseIcon(prefixCls, closeIcon) {
	closeIcon = getSlotPropsFnRun({}, { closeIcon }, "closeIcon");
	return createVNode("span", { "class": `${prefixCls}-close-x` }, [closeIcon || createVNode(CloseOutlined, { "class": `${prefixCls}-close-icon` }, null)]);
}
const Footer = /* @__PURE__ */ defineComponent((props) => {
	const [locale] = useLocale_default("Modal", getConfirmLocale());
	const okTextLocale = computed(() => {
		return props.okText ?? locale?.value?.okText;
	});
	const cancelTextLocale = computed(() => {
		return props.cancelText ?? locale?.value?.cancelText;
	});
	useModalProvider(computed(() => ({
		confirmLoading: props.confirmLoading,
		okButtonProps: props.okButtonProps,
		cancelButtonProps: props.cancelButtonProps,
		okTextLocale: okTextLocale.value,
		cancelTextLocale: cancelTextLocale.value,
		okType: props.okType ?? "primary",
		onOk: props.onOk,
		onCancel: props.onCancel
	})));
	return () => {
		const { footer } = props;
		const defaultFooter = createVNode(Fragment, null, [createVNode(NormalCancelBtn_default, null, null), createVNode(NormalOkBtn_default, null, null)]);
		let footerNode;
		if (typeof footer === "function") footerNode = footer({
			originNode: defaultFooter,
			extra: {
				OkBtn: NormalOkBtn_default,
				CancelBtn: NormalCancelBtn_default
			}
		});
		else footerNode = footer;
		if (footerNode === void 0) footerNode = defaultFooter;
		return createVNode(DisabledContextProvider, { "disabled": false }, _isSlot(footerNode) ? footerNode : { default: () => [footerNode] });
	};
}, {
	props: {
		onOk: {
			type: Function,
			required: false
		},
		onCancel: {
			type: Function,
			required: false
		},
		footer: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		okText: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		okType: {
			type: String,
			required: false
		},
		cancelText: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		confirmLoading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		okButtonProps: {
			type: Object,
			required: false
		},
		cancelButtonProps: {
			type: Object,
			required: false
		}
	},
	name: "ModalFooter",
	inheritAttrs: false
});

//#endregion
export { Footer, renderCloseIcon };