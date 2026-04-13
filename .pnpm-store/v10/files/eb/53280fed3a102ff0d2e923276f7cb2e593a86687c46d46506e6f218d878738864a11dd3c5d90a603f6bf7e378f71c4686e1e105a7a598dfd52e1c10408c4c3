import { convertLegacyProps } from "../button/Button.js";
import button_default from "../button/index.js";
import { createVNode, defineComponent, mergeProps, onBeforeUnmount, onMounted, shallowRef } from "vue";

//#region src/_util/ActionButton.tsx
function isThenable(value) {
	return typeof value?.then === "function";
}
const ActionButton = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const clicked = shallowRef(false);
	const loading = shallowRef(false);
	const buttonRef = shallowRef();
	let autoFocusTimeout = null;
	const focusButton = () => {
		const instance = buttonRef.value;
		(instance?.$el ?? instance)?.focus?.({ preventScroll: true });
	};
	onMounted(() => {
		if (props.autoFocus) autoFocusTimeout = setTimeout(() => {
			focusButton();
		});
	});
	onBeforeUnmount(() => {
		if (autoFocusTimeout) {
			clearTimeout(autoFocusTimeout);
			autoFocusTimeout = null;
		}
	});
	const onInternalClose = (...args) => {
		props.close?.(...args);
	};
	const handlePromiseOnOk = (returnValueOfOnOk) => {
		if (!isThenable(returnValueOfOnOk)) return;
		loading.value = true;
		returnValueOfOnOk.then((...args) => {
			loading.value = false;
			clicked.value = false;
			onInternalClose(...args);
		}, (error) => {
			loading.value = false;
			clicked.value = false;
			if (props.isSilent?.()) return;
			return Promise.reject(error);
		});
	};
	const onClick = (e) => {
		if (clicked.value) return;
		clicked.value = true;
		const { actionFn } = props;
		if (!actionFn) {
			onInternalClose();
			return;
		}
		let returnValueOfOnOk;
		if (props.emitEvent) {
			returnValueOfOnOk = actionFn(e);
			if (props.quitOnNullishReturnValue && !isThenable(returnValueOfOnOk)) {
				clicked.value = false;
				onInternalClose(e);
				return;
			}
		} else if (actionFn.length) {
			returnValueOfOnOk = actionFn(onInternalClose);
			clicked.value = false;
		} else {
			returnValueOfOnOk = actionFn();
			if (!isThenable(returnValueOfOnOk)) {
				onInternalClose();
				return;
			}
		}
		handlePromiseOnOk(returnValueOfOnOk);
	};
	return () => {
		const buttonAttrs = props.buttonProps ?? {};
		return createVNode(button_default, mergeProps(convertLegacyProps(props.type), {
			"prefixCls": props.prefixCls,
			"loading": loading.value,
			"ref": buttonRef,
			"onClick": onClick
		}, buttonAttrs), { default: () => [slots.default?.()] });
	};
}, {
	props: {
		type: {
			type: String,
			required: false
		},
		actionFn: {
			type: Function,
			required: false
		},
		close: {
			type: Function,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: true
		},
		buttonProps: {
			type: Object,
			required: false
		},
		emitEvent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		quitOnNullishReturnValue: {
			type: Boolean,
			required: false,
			default: void 0
		},
		children: { required: false },
		isSilent: {
			type: Function,
			required: false
		}
	},
	name: "AActionButton",
	inheritAttrs: false
});
var ActionButton_default = ActionButton;

//#endregion
export { ActionButton_default as default };