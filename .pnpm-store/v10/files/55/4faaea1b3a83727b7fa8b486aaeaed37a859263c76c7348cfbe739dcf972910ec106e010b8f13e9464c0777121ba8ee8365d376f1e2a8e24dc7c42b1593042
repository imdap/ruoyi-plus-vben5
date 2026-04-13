import { useRefProvide } from "./context.js";
import Dialog_default from "./Dialog/index.js";
import { createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import Portal from "@v-c/portal";
var DialogWrap_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const animatedVisible = shallowRef(false);
	useRefProvide(props);
	const onEsc = ({ top, event }) => {
		const { keyboard = true } = props;
		if (top && keyboard) {
			event.stopPropagation();
			props?.onClose?.(event);
		}
	};
	watch(() => props.visible, () => {
		if (props.visible) animatedVisible.value = true;
	}, { immediate: true });
	return () => {
		const { visible, getContainer, forceRender, destroyOnHidden = false, afterClose } = props;
		if (!forceRender && destroyOnHidden && !animatedVisible.value) return null;
		return createVNode(Portal, {
			"open": visible || forceRender || animatedVisible.value,
			"autoDestroy": false,
			"onEsc": onEsc,
			"getContainer": getContainer,
			"autoLock": visible || animatedVisible.value
		}, { default: () => [createVNode(Dialog_default, mergeProps(props, {
			"destroyOnHidden": destroyOnHidden,
			"afterClose": () => {
				(props.closable && typeof props.closable === "object" ? props.closable : {}).afterClose?.();
				afterClose?.();
				animatedVisible.value = false;
			}
		}), slots)] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		className: {
			type: String,
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		rootStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		mask: {
			type: Boolean,
			required: false,
			default: void 0
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
		afterClose: {
			type: Function,
			required: false,
			default: void 0
		},
		afterOpenChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onClose: {
			type: Function,
			required: false,
			default: void 0
		},
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
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
			required: false,
			default: void 0
		},
		title: {
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
		footer: {
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
		transitionName: {
			type: String,
			required: false,
			default: void 0
		},
		maskTransitionName: {
			type: String,
			required: false,
			default: void 0
		},
		animation: {
			required: false,
			default: void 0
		},
		maskAnimation: {
			required: false,
			default: void 0
		},
		wrapStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		bodyStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		maskStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		wrapClassName: {
			type: String,
			required: false,
			default: void 0
		},
		width: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		height: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		bodyProps: {
			required: false,
			default: void 0
		},
		maskProps: {
			required: false,
			default: void 0
		},
		rootClassName: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		wrapProps: {
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
		closeIcon: {
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
		modalRender: {
			type: Function,
			required: false,
			default: void 0
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusTriggerAfterClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusTrap: {
			type: Boolean,
			required: false,
			default: void 0
		},
		panelRef: {
			required: false,
			default: void 0
		}
	}, {
		getContainer: void 0,
		closeIcon: void 0,
		prefixCls: "vc-dialog",
		keyboard: true,
		focusTriggerAfterClose: true,
		closable: true,
		mask: true,
		maskClosable: true,
		destroyOnHidden: false,
		forceRender: false
	}),
	name: "Dialog"
});
export { DialogWrap_default as default };
