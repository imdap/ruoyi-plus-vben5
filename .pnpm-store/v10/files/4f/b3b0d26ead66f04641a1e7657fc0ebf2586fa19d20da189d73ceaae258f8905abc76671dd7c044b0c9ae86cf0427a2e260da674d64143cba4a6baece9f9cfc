import { useBaseConfig } from "../../config-provider/context.js";
import en_US_default from "../../locale/en_US.js";
import useLocale_default from "../../locale/useLocale.js";
import ConfirmDialog_default from "../ConfirmDialog.js";
import { computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";

//#region src/modal/useModal/HookModal.tsx
const HookModal = /* @__PURE__ */ defineComponent((props, { expose }) => {
	const open = shallowRef(true);
	const innerConfig = shallowRef(props.config);
	const { direction, getPrefixCls } = useBaseConfig("modal");
	const prefixCls = computed(() => innerConfig.value.prefixCls ?? getPrefixCls("modal", innerConfig.value.prefixCls));
	const rootPrefixCls = computed(() => getPrefixCls());
	const afterClose = () => {
		props.afterClose?.();
		innerConfig.value.afterClose?.();
	};
	const close = (...args) => {
		open.value = false;
		if (args.some((param) => param?.triggerCancel)) innerConfig.value.onCancel?.(() => {}, ...args.slice(1));
	};
	expose({
		destroy: close,
		update: (configUpdate) => {
			innerConfig.value = typeof configUpdate === "function" ? configUpdate(innerConfig.value) : {
				...innerConfig.value,
				...configUpdate
			};
		}
	});
	const mergedOkCancel = computed(() => innerConfig.value.okCancel ?? innerConfig.value.type === "confirm");
	const [contextLocale] = useLocale_default("Modal", en_US_default.Modal);
	return () => {
		return createVNode(ConfirmDialog_default, mergeProps(innerConfig.value, {
			"close": close,
			"open": open.value,
			"afterClose": afterClose,
			"okText": innerConfig.value.okText ?? (mergedOkCancel.value ? contextLocale?.value?.okText : contextLocale?.value?.justOkText),
			"direction": innerConfig.value.direction ?? direction.value,
			"cancelText": innerConfig.value.cancelText ?? contextLocale?.value?.cancelText,
			"prefixCls": prefixCls.value,
			"rootPrefixCls": rootPrefixCls.value,
			"onConfirm": props.onConfirm,
			"isSilent": props.isSilent
		}), null);
	};
}, {
	props: {
		afterClose: {
			type: Function,
			required: true
		},
		config: {
			type: Object,
			required: true
		},
		onConfirm: {
			type: Function,
			required: false
		},
		isSilent: {
			type: Function,
			required: false
		}
	},
	name: "HookModal",
	inheritAttrs: false
});
var HookModal_default = HookModal;

//#endregion
export { HookModal_default as default };