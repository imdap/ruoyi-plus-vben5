import { useComponentBaseConfig, useConfig } from "../config-provider/context.js";
import en_US_default from "../locale/en_US.js";
import useLocale_default from "../locale/useLocale.js";
import button_default from "../button/index.js";
import ActionButton_default from "../_util/ActionButton.js";
import PurePanel_default$1 from "../popover/PurePanel.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { ExclamationCircleFilled } from "@antdv-next/icons";

//#region src/popconfirm/PurePanel.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const Overlay = /* @__PURE__ */ defineComponent((props) => {
	const config = useConfig();
	const btnPrefixCls = computed(() => config.value?.getPrefixCls?.("btn") ?? "ant-btn");
	const [contextLocale] = useLocale_default("Popconfirm", en_US_default.Popconfirm);
	return () => {
		const { prefixCls, icon = createVNode(ExclamationCircleFilled, null, null), title, description, cancelText, okText, okType = "primary", okButtonProps, cancelButtonProps, showCancel = true, close, onConfirm, onCancel, onPopupClick, classes, styles } = props;
		const cancelButtonAttrs = {
			size: "small",
			...cancelButtonProps ?? {}
		};
		const okButtonAttrs = {
			size: "small",
			...okButtonProps ?? {}
		};
		const mergedCancelText = cancelText ?? contextLocale?.value?.cancelText;
		const mergedOkText = okText ?? contextLocale?.value?.okText;
		const mergedShowCancel = showCancel !== false;
		const handlePopupClick = (e) => {
			onPopupClick?.(e);
		};
		return createVNode("div", {
			"class": `${prefixCls}-inner-content`,
			"onClick": handlePopupClick
		}, [createVNode("div", { "class": `${prefixCls}-message` }, [icon && createVNode("span", { "class": `${prefixCls}-message-icon` }, [icon]), createVNode("div", { "class": `${prefixCls}-message-text` }, [title && createVNode("div", {
			"class": clsx(`${prefixCls}-title`, classes?.title),
			"style": styles?.title
		}, [title]), description && createVNode("div", {
			"class": clsx(`${prefixCls}-description`, classes?.content),
			"style": styles?.content
		}, [description])])]), createVNode("div", { "class": `${prefixCls}-buttons` }, [mergedShowCancel && createVNode(button_default, mergeProps({ "onClick": onCancel }, cancelButtonAttrs), _isSlot(mergedCancelText) ? mergedCancelText : { default: () => [mergedCancelText] }), createVNode(ActionButton_default, {
			"type": okType,
			"actionFn": onConfirm,
			"close": close,
			"prefixCls": btnPrefixCls.value,
			"buttonProps": okButtonAttrs,
			"emitEvent": true,
			"quitOnNullishReturnValue": true
		}, _isSlot(mergedOkText) ? mergedOkText : { default: () => [mergedOkText] })])]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		close: {
			type: Function,
			required: false
		},
		onConfirm: {
			type: Function,
			required: false
		},
		onCancel: {
			type: Function,
			required: false
		},
		onPopupClick: {
			type: Function,
			required: false
		},
		classes: {
			type: Object,
			required: false
		},
		styles: {
			type: Object,
			required: false
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
		okButtonProps: {
			type: Object,
			required: false
		},
		cancelButtonProps: {
			type: Object,
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
		showCancel: {
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
		description: {
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
		}
	},
	name: "APopconfirmOverlay",
	inheritAttrs: false
});
const PurePanel = /* @__PURE__ */ defineComponent((props) => {
	const { prefixCls } = useComponentBaseConfig("popconfirm", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	return () => createVNode(PurePanel_default$1, {
		"placement": props.placement,
		"class": clsx(prefixCls.value, hashId.value, cssVarCls.value, props.class),
		"style": props.style,
		"content": createVNode(Overlay, mergeProps({ "prefixCls": prefixCls.value }, props), null)
	}, null);
}, {
	props: {
		class: {
			type: String,
			required: false
		},
		style: {
			type: Object,
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
		onCancel: {
			type: Function,
			required: false
		},
		onPopupClick: {
			type: Function,
			required: false
		},
		classes: {
			type: Object,
			required: false
		},
		styles: {
			type: Object,
			required: false
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
		okButtonProps: {
			type: Object,
			required: false
		},
		cancelButtonProps: {
			type: Object,
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
		showCancel: {
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
		description: {
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
		placement: {
			type: String,
			required: false
		}
	},
	name: "PopconfirmPurePanel",
	inheritAttrs: false
});
var PurePanel_default = PurePanel;

//#endregion
export { Overlay, PurePanel_default as default };