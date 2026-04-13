import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import useToken from "../theme/useToken.js";
import { normalizeMaskConfig } from "../_util/hooks/useMergedMask.js";
import { CONTAINER_MAX_OFFSET } from "../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import config_provider_default from "../config-provider/index.js";
import isNonNullable_default from "../_util/isNonNullable.js";
import useLocale_default from "../locale/useLocale.js";
import { useModalProvider } from "./context.js";
import ConfirmCancelBtn_default from "./components/ConfirmCancelBtn.js";
import ConfirmOkBtn_default from "./components/ConfirmOkBtn.js";
import { getConfirmLocale } from "./locale.js";
import Modal_default from "./Modal.js";
import confirm_default from "./style/confirm.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { CheckCircleFilled, CloseCircleFilled, ExclamationCircleFilled, InfoCircleFilled } from "@antdv-next/icons";
import { getTransitionName } from "@v-c/util/dist/utils/transition";

//#region src/modal/ConfirmDialog.tsx
const ConfirmContent = /* @__PURE__ */ defineComponent((props) => {
	if (isDev) {
		const { icon } = props;
		devUseWarning("Modal")(!(typeof icon === "string" && icon?.length > 2), "breaking", `\`icon\` is using VueNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`);
	}
	const mergedType = computed(() => {
		const { type } = props;
		return type || "confirm";
	});
	const mergedOkCancel = computed(() => {
		return props.okCancel ?? mergedType.value === "confirm";
	});
	const autoFocusButton = props.autoFocusButton === null ? false : props.autoFocusButton || "ok";
	const [locale] = useLocale_default("Modal", getConfirmLocale());
	const mergedLocale = computed(() => props.locale || locale?.value);
	const okTextLocale = computed(() => props?.okText ?? (mergedOkCancel.value ? mergedLocale.value?.okText : mergedLocale.value?.justOkText));
	const cancelTextLocale = computed(() => props?.cancelText ?? mergedLocale.value?.cancelText);
	const { closable } = props;
	const { onClose } = closable && typeof closable === "object" ? closable : {};
	useModalProvider(computed(() => ({
		autoFocusButton,
		cancelTextLocale: cancelTextLocale.value,
		okTextLocale: okTextLocale.value,
		mergedOkCancel: mergedOkCancel.value,
		onClose,
		...props
	})));
	return () => {
		const { confirmPrefixCls, footer } = props;
		const content = getSlotPropsFnRun({}, props, "content", false);
		const icon = getSlotPropsFnRun({}, props, "icon", false);
		const title = getSlotPropsFnRun({}, props, "title", false);
		let mergedIcon = icon;
		if (!icon && icon !== null) switch (mergedType.value) {
			case "info":
				mergedIcon = createVNode(InfoCircleFilled, null, null);
				break;
			case "success":
				mergedIcon = createVNode(CheckCircleFilled, null, null);
				break;
			case "error":
				mergedIcon = createVNode(CloseCircleFilled, null, null);
				break;
			default: mergedIcon = createVNode(ExclamationCircleFilled, null, null);
		}
		const hasTitle = isNonNullable_default(title) && title !== "";
		const hasIcon = isNonNullable_default(mergedIcon);
		const bodyCls = `${confirmPrefixCls}-body`;
		const footerOriginNode = createVNode(Fragment, null, [createVNode(ConfirmCancelBtn_default, null, null), createVNode(ConfirmOkBtn_default, null, null)]);
		return createVNode("div", { "class": `${confirmPrefixCls}-body-wrapper` }, [
			createVNode("div", { "class": clsx(bodyCls, {
				[`${bodyCls}-has-title`]: hasTitle,
				[`${bodyCls}-no-icon`]: !hasIcon
			}) }, [mergedIcon, createVNode("div", { "class": `${confirmPrefixCls}-paragraph` }, [hasTitle && createVNode("span", { "class": `${confirmPrefixCls}-title` }, [title]), createVNode("div", { "class": `${confirmPrefixCls}-content` }, [content])])]),
			footer === void 0 || typeof footer === "function" ? createVNode("div", { "class": `${confirmPrefixCls}-btns` }, [typeof footer === "function" ? footer({
				originNode: footerOriginNode,
				extra: {
					OkBtn: ConfirmOkBtn_default,
					CancelBtn: ConfirmCancelBtn_default
				}
			}) : footerOriginNode]) : footer,
			createVNode(confirm_default, { "prefixCls": props.prefixCls }, null)
		]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		afterClose: {
			type: Function,
			required: false
		},
		close: {
			type: Function,
			required: false
		},
		onConfirm: {
			type: Function,
			required: false
		},
		autoFocusButton: {
			type: [null, String],
			required: false
		},
		rootPrefixCls: {
			type: String,
			required: false
		},
		iconPrefixCls: {
			type: String,
			required: false
		},
		theme: {
			type: Object,
			required: false
		},
		locale: {
			type: Object,
			required: false
		},
		isSilent: {
			type: Function,
			required: false
		},
		class: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		title: {
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
		content: {
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
		onOk: {
			type: Function,
			required: false
		},
		onCancel: {
			type: Function,
			required: false
		},
		onClose: {
			type: Function,
			required: false
		},
		okButtonProps: {
			type: Object,
			required: false
		},
		cancelButtonProps: {
			type: Object,
			required: false
		},
		centered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		width: {
			type: [String, Number],
			required: false
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
		icon: {
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
		mask: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		okCancel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false
		},
		wrapClassName: {
			type: String,
			required: false
		},
		maskStyle: {
			type: Object,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false
		},
		maskTransitionName: {
			type: String,
			required: false
		},
		direction: {
			type: [String, null],
			required: false
		},
		bodyStyle: {
			type: Object,
			required: false
		},
		closeIcon: {
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
		modalRender: {
			type: Function,
			required: false
		},
		focusTriggerAfterClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		appContext: {
			type: Object,
			required: false
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		className: {
			type: String,
			required: false
		},
		children: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		visible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mousePosition: {
			type: [Object, null],
			required: false
		},
		wrapStyle: {
			type: Object,
			required: false
		},
		height: {
			type: [String, Number],
			required: false
		},
		bodyProps: { required: false },
		maskProps: { required: false },
		rootClassName: {
			type: String,
			required: false
		},
		wrapProps: { required: false },
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		panelRef: { required: false },
		confirmPrefixCls: {
			type: String,
			required: true
		}
	},
	name: "ConfirmContent",
	inheritAttrs: false
});
const ConfirmDialog = /* @__PURE__ */ defineComponent((props) => {
	const { cancelButtonProps: contextCancelButtonProps, okButtonProps: contextOkButtonProps } = useComponentBaseConfig("modal", props, ["okButtonProps", "cancelButtonProps"]);
	if (isDev) {
		const warning = devUseWarning("Modal");
		[["bodyStyle", "styles.body"], ["maskStyle", "styles.mask"]].forEach(([deprecatedName, newName]) => {
			warning.deprecated(!(props[deprecatedName] !== void 0), deprecatedName, newName);
		});
	}
	const [, token] = useToken();
	const mergedZIndex = computed(() => props.zIndex ?? token.value.zIndexPopupBase + CONTAINER_MAX_OFFSET);
	return () => {
		const { close, maskStyle, direction, prefixCls, wrapClassName, rootPrefixCls, bodyStyle, closable = false, styles, title, class: className, style, width = 416, type, maskClosable: customMaskClosable, mask, ...restProps } = props;
		const confirmPrefixCls = `${prefixCls}-confirm`;
		const mergedMaskFn = () => {
			const nextMaskConfig = normalizeMaskConfig(mask, customMaskClosable);
			nextMaskConfig.closable ??= false;
			return nextMaskConfig;
		};
		const mergedMask = mergedMaskFn();
		const classString = clsx(confirmPrefixCls, `${confirmPrefixCls}-${type || "confirm"}`, { [`${confirmPrefixCls}-rtl`]: direction === "rtl" }, className);
		return createVNode(Modal_default, mergeProps(restProps, {
			"class": classString,
			"wrapClassName": clsx({ [`${confirmPrefixCls}-centered`]: !!props.centered }, wrapClassName),
			"onCancel": () => {
				close?.({ triggerCancel: true });
				props.onConfirm?.(false);
			},
			"title": title,
			"footer": null,
			"transitionName": getTransitionName(rootPrefixCls || "", "zoom", props.transitionName),
			"maskTransitionName": getTransitionName(rootPrefixCls || "", "fade", props.maskTransitionName),
			"mask": mergedMask,
			"style": style,
			"styles": {
				body: bodyStyle,
				mask: maskStyle,
				...styles
			},
			"width": width,
			"zIndex": mergedZIndex.value,
			"closable": closable
		}), { default: () => [createVNode(ConfirmContent, mergeProps(props, {
			"confirmPrefixCls": confirmPrefixCls,
			"okButtonProps": {
				...contextOkButtonProps.value,
				...props.okButtonProps
			},
			"cancelButtonProps": {
				...contextCancelButtonProps.value,
				...props.cancelButtonProps
			}
		}), null)] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: true
		},
		afterClose: {
			type: Function,
			required: false
		},
		close: {
			type: Function,
			required: false
		},
		onConfirm: {
			type: Function,
			required: false
		},
		autoFocusButton: {
			type: [null, String],
			required: false
		},
		rootPrefixCls: {
			type: String,
			required: false
		},
		iconPrefixCls: {
			type: String,
			required: false
		},
		theme: {
			type: Object,
			required: false
		},
		locale: {
			type: Object,
			required: false
		},
		isSilent: {
			type: Function,
			required: false
		},
		class: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		title: {
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
		content: {
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
		onOk: {
			type: Function,
			required: false
		},
		onCancel: {
			type: Function,
			required: false
		},
		onClose: {
			type: Function,
			required: false
		},
		okButtonProps: {
			type: Object,
			required: false
		},
		cancelButtonProps: {
			type: Object,
			required: false
		},
		centered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		width: {
			type: [String, Number],
			required: false
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
		icon: {
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
		mask: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		okCancel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false
		},
		wrapClassName: {
			type: String,
			required: false
		},
		maskStyle: {
			type: Object,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false
		},
		maskTransitionName: {
			type: String,
			required: false
		},
		direction: {
			type: [String, null],
			required: false
		},
		bodyStyle: {
			type: Object,
			required: false
		},
		closeIcon: {
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
		modalRender: {
			type: Function,
			required: false
		},
		focusTriggerAfterClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		appContext: {
			type: Object,
			required: false
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		className: {
			type: String,
			required: false
		},
		children: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		visible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mousePosition: {
			type: [Object, null],
			required: false
		},
		wrapStyle: {
			type: Object,
			required: false
		},
		height: {
			type: [String, Number],
			required: false
		},
		bodyProps: { required: false },
		maskProps: { required: false },
		rootClassName: {
			type: String,
			required: false
		},
		wrapProps: { required: false },
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		panelRef: { required: false }
	}, { closable: false }),
	name: "ConfirmDialog",
	inheritAttrs: false
});
const ConfirmDialogWrapper = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { rootPrefixCls, iconPrefixCls, direction, theme } = props;
		return createVNode(config_provider_default, {
			"prefixCls": rootPrefixCls,
			"iconPrefixCls": iconPrefixCls,
			"direction": direction,
			"theme": theme
		}, { default: () => [createVNode(ConfirmDialog, props, null)] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		afterClose: {
			type: Function,
			required: false
		},
		close: {
			type: Function,
			required: false
		},
		onConfirm: {
			type: Function,
			required: false
		},
		autoFocusButton: {
			type: [null, String],
			required: false
		},
		rootPrefixCls: {
			type: String,
			required: false
		},
		iconPrefixCls: {
			type: String,
			required: false
		},
		theme: {
			type: Object,
			required: false
		},
		locale: {
			type: Object,
			required: false
		},
		isSilent: {
			type: Function,
			required: false
		},
		class: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		title: {
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
		content: {
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
		onOk: {
			type: Function,
			required: false
		},
		onCancel: {
			type: Function,
			required: false
		},
		onClose: {
			type: Function,
			required: false
		},
		okButtonProps: {
			type: Object,
			required: false
		},
		cancelButtonProps: {
			type: Object,
			required: false
		},
		centered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		width: {
			type: [String, Number],
			required: false
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
		icon: {
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
		mask: {
			type: [Object, Boolean],
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false
		},
		okCancel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false
		},
		wrapClassName: {
			type: String,
			required: false
		},
		maskStyle: {
			type: Object,
			required: false
		},
		type: {
			type: String,
			required: false
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		getContainer: {
			type: [
				String,
				Function,
				Boolean
			],
			required: false,
			skipCheck: true,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false
		},
		maskTransitionName: {
			type: String,
			required: false
		},
		direction: {
			type: [String, null],
			required: false
		},
		bodyStyle: {
			type: Object,
			required: false
		},
		closeIcon: {
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
		modalRender: {
			type: Function,
			required: false
		},
		focusTriggerAfterClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		appContext: {
			type: Object,
			required: false
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		className: {
			type: String,
			required: false
		},
		children: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		visible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mousePosition: {
			type: [Object, null],
			required: false
		},
		wrapStyle: {
			type: Object,
			required: false
		},
		height: {
			type: [String, Number],
			required: false
		},
		bodyProps: { required: false },
		maskProps: { required: false },
		rootClassName: {
			type: String,
			required: false
		},
		wrapProps: { required: false },
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		panelRef: { required: false }
	},
	name: "ConfirmDialogWrapper",
	inheritAttrs: false
});
var ConfirmDialog_default = ConfirmDialogWrapper;

//#endregion
export { ConfirmContent, ConfirmDialog_default as default };