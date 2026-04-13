import { getMotionName } from "../util.js";
import Content_default from "./Content/index.js";
import Mask_default from "./Mask.js";
import { createVNode, defineComponent, mergeDefaults, mergeProps, nextTick, shallowRef, useId, watch } from "vue";
import { warning } from "@v-c/util";
import contains from "@v-c/util/dist/Dom/contains";
import pickAttrs from "@v-c/util/dist/pickAttrs";
var Dialog_default = /* @__PURE__ */ defineComponent((props, { expose, slots }) => {
	if (process.env.NODE_ENV !== "production") {
		[
			"wrapStyle",
			"bodyStyle",
			"maskStyle"
		].forEach((prop) => {
			warning(!(prop in props && props[prop]), `${prop} is deprecated, please use styles instead.`);
		});
		if ("wrapClassName" in props && props.wrapClassName) warning(false, `wrapClassName is deprecated, please use classNames instead.`);
	}
	const lastOutSideActiveElementRef = shallowRef(null);
	const wrapperRef = shallowRef();
	const contentRef = shallowRef();
	const animatedVisible = shallowRef(props.visible);
	const isFixedPos = shallowRef(false);
	const ariaId = useId();
	function saveLastOutSideActiveElementRef() {
		if (!contains(wrapperRef.value, document.activeElement)) lastOutSideActiveElementRef.value = document.activeElement;
	}
	function focusDialogContent() {
		if (!contains(wrapperRef.value, document.activeElement)) contentRef.value?.focus?.();
	}
	function onDialogVisibleChanged(newVisible) {
		if (newVisible) focusDialogContent();
		else {
			const _animatedVisible = animatedVisible.value;
			animatedVisible.value = false;
			if (props.mask && lastOutSideActiveElementRef.value && props.focusTriggerAfterClose) {
				try {
					lastOutSideActiveElementRef.value?.focus?.({ preventScroll: true });
				} catch (e) {}
				lastOutSideActiveElementRef.value = null;
			}
			if (_animatedVisible) props?.afterClose?.();
		}
		props?.afterOpenChange?.(newVisible);
	}
	function onInternalClose(e) {
		props?.onClose?.(e);
	}
	const mouseDownOnMaskRef = shallowRef(false);
	let onWrapperClick = null;
	watch(() => props.maskClosable, () => {
		if (props.maskClosable) onWrapperClick = (e) => {
			if (wrapperRef.value === e.target && mouseDownOnMaskRef.value) onInternalClose(e);
		};
		else onWrapperClick = null;
	}, { immediate: true });
	function onWrapperMouseDown(e) {
		mouseDownOnMaskRef.value = e.target === wrapperRef.value;
	}
	watch(() => props.visible, () => {
		if (props.visible) {
			mouseDownOnMaskRef.value = false;
			animatedVisible.value = true;
			saveLastOutSideActiveElementRef();
			nextTick(() => {
				const wrapEl = wrapperRef.value;
				if (wrapEl) isFixedPos.value = getComputedStyle(wrapEl).position === "fixed";
			});
			if (!getMotionName(props.prefixCls, props.transitionName, props.animation)) nextTick(() => {
				onDialogVisibleChanged(true);
			});
		} else if (animatedVisible.value && !getMotionName(props.prefixCls, props.transitionName, props.animation)) onDialogVisibleChanged(false);
	}, { immediate: true });
	expose({});
	return () => {
		const { zIndex, wrapStyle, wrapProps, wrapClassName, closable, transitionName, animation, styles: modalStyles, prefixCls, rootClassName, visible, mask, maskAnimation, maskTransitionName, maskStyle, maskProps, classNames: modalClassNames, rootStyle } = props;
		const mergedStyle = {
			zIndex,
			...wrapStyle,
			...modalStyles?.wrapper,
			display: !animatedVisible.value ? "none" : void 0
		};
		return createVNode("div", mergeProps({
			"class": [`${prefixCls}-root`, rootClassName],
			"style": rootStyle
		}, pickAttrs(props, { data: true })), [createVNode(Mask_default, {
			"prefixCls": prefixCls,
			"visible": !!(mask && visible),
			"motionName": getMotionName(prefixCls, maskTransitionName, maskAnimation),
			"style": {
				zIndex,
				...maskStyle,
				...modalStyles?.mask
			},
			"maskProps": maskProps,
			"className": modalClassNames?.mask
		}, null), createVNode("div", mergeProps({
			"class": [
				`${prefixCls}-wrap`,
				wrapClassName,
				modalClassNames?.wrapper
			],
			"ref": wrapperRef,
			"onClick": onWrapperClick,
			"onMousedown": onWrapperMouseDown,
			"style": mergedStyle
		}, wrapProps), [createVNode(Content_default, mergeProps({
			...props,
			onClose: onInternalClose,
			onVisibleChanged: onDialogVisibleChanged
		}, {
			"ref": contentRef,
			"closable": closable,
			"ariaId": ariaId,
			"prefixCls": prefixCls,
			"visible": !!visible,
			"isFixedPos": isFixedPos.value,
			"motionName": getMotionName(prefixCls, transitionName, animation)
		}), slots)])]);
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
		prefixCls: "vc-dialog",
		visible: false,
		focusTriggerAfterClose: true,
		closable: true,
		mask: true,
		maskClosable: true,
		forceRender: false
	}),
	name: "Dialog"
});
export { Dialog_default as default };
