import { devUseWarning, isDev } from "../_util/warning.js";
import { useBaseConfig, useComponentBaseConfig } from "../config-provider/context.js";
import { ContextIsolator } from "../_util/ContextIsolator.js";
import { useMergedMask } from "../_util/hooks/useMergedMask.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { ZIndexProvider } from "../_util/zindexContext.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import useClosable, { pickClosable } from "../_util/hooks/useClosable.js";
import { canUseDocElement } from "../_util/styleChecker.js";
import useFocusable from "../drawer/useFocusable.js";
import skeleton_default from "../skeleton/index.js";
import { usePanelRef } from "../watermark/context.js";
import { Footer, renderCloseIcon } from "./shared.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { CloseOutlined } from "@antdv-next/icons";
import { getTransitionName } from "@v-c/util/dist/utils/transition";
import { omit } from "es-toolkit";
import Dialog from "@v-c/dialog";

//#region src/modal/Modal.tsx
let mousePosition;
function getClickPosition(e) {
	mousePosition = {
		x: e.pageX,
		y: e.pageY
	};
	setTimeout(() => {
		mousePosition = null;
	}, 100);
}
if (canUseDocElement()) document.documentElement.addEventListener("click", getClickPosition, true);
const Modal = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const { getPopupContainer: getContextPopupContainer, getPrefixCls, prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, centered: contextCentered, cancelButtonProps: contextCancelButtonProps, okButtonProps: contextOkButtonProps, mask: contextMask } = useComponentBaseConfig("modal", props, [
		"centered",
		"cancelButtonProps",
		"okButtonProps",
		"mask"
	]);
	const { mask: modalMask, classes, styles, zIndex: customZIndex, width: widthRef, rootClass: rootClassRef, rootStyle: rootStyleRef, panelRef: panelRefRef, focusable, focusTriggerAfterClose, maskClosable } = toPropsRefs(props, "mask", "classes", "styles", "zIndex", "width", "rootClass", "rootStyle", "panelRef", "focusable", "focusTriggerAfterClose", "maskClosable");
	const { modal: modalContext } = useBaseConfig();
	const modalRenderRef = computed(() => slots.modalRender || props.modalRender);
	const rootPrefixCls = computed(() => getPrefixCls());
	const closableContext = computed(() => {
		const { closable } = props;
		if (typeof closable === "boolean") return [void 0, void 0];
		return [closable?.afterClose, closable?.onClose];
	});
	const [mergedMask, maskBlurClassName, mergeMaskClosable] = useMergedMask(modalMask, contextMask, prefixCls, maskClosable);
	const mergedFocusable = useFocusable(focusable, mergedMask, focusTriggerAfterClose);
	const onClose = () => {
		closableContext.value?.[1]?.();
	};
	const handleCancel = (e) => {
		if (props.confirmLoading) return;
		emit("cancel", e);
		emit("update:open", false);
		onClose();
	};
	const handleOk = (e) => {
		emit("ok", e);
		onClose();
	};
	if (isDev) {
		const warning = devUseWarning("Modal");
		[
			["bodyStyle", "styles.body"],
			["maskStyle", "styles.mask"],
			["destroyOnClose", "destroyOnHidden"]
		].forEach(([deprecatedName, newName]) => {
			warning.deprecated(!(props[deprecatedName] !== void 0), deprecatedName, newName);
		});
	}
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const closableIconContext = useClosable(pickClosable(computed(() => ({
		...props,
		closeIcon: getSlotPropsFnRun(slots, props, "closeIcon", false)
	}))), pickClosable(modalContext), computed(() => {
		return {
			closable: true,
			closeIcon: createVNode(CloseOutlined, { "class": `${prefixCls.value}-close-icon` }, null),
			closeIconRender: (icon) => renderCloseIcon(prefixCls.value, icon)
		};
	}));
	const [zIndex, contextZIndex] = useZIndex("Modal", customZIndex);
	const mergedProps = computed(() => ({
		...props,
		mask: mergedMask.value,
		zIndex: zIndex.value,
		focusTriggerAfterClose: mergedFocusable.value?.focusTriggerAfterClose,
		focusable: mergedFocusable.value,
		maskClosable: maskClosable.value
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes, maskBlurClassName), useToArr(contextStyles, styles), useToProps(mergedProps));
	const numWidth = computed(() => {
		if (widthRef.value && typeof widthRef.value === "object") return;
		return widthRef.value;
	});
	const responsiveWidth = computed(() => {
		if (widthRef.value && typeof widthRef.value === "object") return widthRef.value;
	});
	const responsiveWidthVars = computed(() => {
		const vars = {};
		if (responsiveWidth.value) Object.keys(responsiveWidth.value).forEach((breakpoint) => {
			const breakpointWidth = responsiveWidth.value?.[breakpoint];
			if (breakpointWidth !== void 0) vars[`--${prefixCls.value}-${breakpoint}-width`] = typeof breakpointWidth === "number" ? `${breakpointWidth}px` : breakpointWidth;
		});
		return vars;
	});
	const innerPanelRef = usePanelRef(computed(() => `.${prefixCls.value}-${modalRenderRef.value ? "render" : "container"}`));
	const mergedPanelRef = (instance) => {
		innerPanelRef(instance);
		const panelRef = panelRefRef?.value;
		if (typeof panelRef === "function") panelRef(instance);
		else if (panelRef && typeof panelRef === "object") panelRef.value = instance;
	};
	return () => {
		const { wrapClassName, centered, loading, confirmLoading, destroyOnHidden, destroyOnClose, getContainer: customizeGetContainer } = props;
		const { className, style: attrStyle, restAttrs } = getAttrStyleAndClass(attrs);
		const wrapClassNameExtended = clsx(wrapClassName, {
			[`${prefixCls.value}-centered`]: centered ?? contextCentered.value,
			[`${prefixCls.value}-wrap-rtl`]: direction.value === "rtl"
		});
		const [rawClosable, mergedCloseIcon, closeBtnIsDisabled, ariaProps] = closableIconContext.value;
		const [closableAfterClose] = closableContext.value;
		const mergedClosable = rawClosable ? {
			disabled: closeBtnIsDisabled,
			closeIcon: mergedCloseIcon,
			afterClose: () => {
				closableAfterClose?.();
			},
			...ariaProps
		} : false;
		const mergedModalRender = modalRenderRef.value ? (node) => createVNode("div", { "class": `${prefixCls.value}-render` }, [getSlotPropsFnRun(slots, { modalRender: modalRenderRef.value }, "modalRender", true, node)]) : void 0;
		const mergedOkButtonProps = {
			...contextOkButtonProps.value,
			...props.okButtonProps
		};
		const mergedCancelButtonProps = {
			...contextCancelButtonProps.value,
			...props.cancelButtonProps
		};
		const footer = slots?.footer ?? props?.footer;
		const okText = slots?.okText ?? props?.okText;
		const cancelText = slots?.cancelText ?? props?.cancelText;
		const dialogFooter = props.footer !== null && !loading ? createVNode(Footer, {
			"confirmLoading": confirmLoading,
			"okType": props.okType,
			"okText": okText,
			"cancelText": cancelText,
			"okButtonProps": mergedOkButtonProps,
			"cancelButtonProps": mergedCancelButtonProps,
			"footer": footer,
			"onOk": handleOk,
			"onCancel": handleCancel
		}, null) : null;
		const restProps = omit(props, [
			"open",
			"prefixCls",
			"rootClass",
			"rootStyle",
			"wrapClassName",
			"centered",
			"width",
			"footer",
			"class",
			"style",
			"classes",
			"styles",
			"loading",
			"confirmLoading",
			"okButtonProps",
			"cancelButtonProps",
			"mask",
			"zIndex",
			"modalRender",
			"closeIcon",
			"destroyOnHidden",
			"destroyOnClose",
			"mousePosition",
			"focusTriggerAfterClose",
			"panelRef",
			"focusable"
		]);
		const titleNode = getSlotPropsFnRun(slots, props, "title");
		const mergedClassName = clsx(hashId.value, contextClassName.value, className);
		const mergedRootClassName = clsx(hashId.value, rootClassRef.value, cssVarCls.value, rootCls.value, mergedClassNames.value.root);
		const getContainer = customizeGetContainer === void 0 ? getContextPopupContainer : customizeGetContainer;
		return createVNode(ContextIsolator, {
			"form": true,
			"space": true
		}, { default: () => [createVNode(ZIndexProvider, { "value": contextZIndex.value }, { default: () => [createVNode(Dialog, mergeProps(omit(restAttrs, ["content"]), restProps, {
			"width": numWidth.value,
			"zIndex": zIndex.value,
			"getContainer": getContainer,
			"prefixCls": prefixCls.value,
			"rootClassName": mergedRootClassName,
			"rootStyle": {
				...rootStyleRef.value,
				...mergedStyles.value.root
			},
			"footer": dialogFooter,
			"title": titleNode,
			"visible": props.open,
			"mousePosition": props.mousePosition ?? mousePosition,
			"onClose": handleCancel,
			"closable": mergedClosable,
			"closeIcon": mergedCloseIcon,
			"focusTriggerAfterClose": mergedFocusable.value?.focusTriggerAfterClose,
			"focusTrap": mergedFocusable.value?.trap,
			"transitionName": getTransitionName(rootPrefixCls.value, "zoom", props.transitionName),
			"maskTransitionName": getTransitionName(rootPrefixCls.value, "fade", props.maskTransitionName),
			"mask": mergedMask.value,
			"maskClosable": mergeMaskClosable.value,
			"className": mergedClassName,
			"style": {
				...contextStyle.value,
				...responsiveWidthVars.value,
				...attrStyle
			},
			"classNames": {
				...mergedClassNames.value,
				wrapper: clsx(mergedClassNames.value.wrapper, wrapClassNameExtended)
			},
			"styles": mergedStyles.value,
			"panelRef": mergedPanelRef,
			"destroyOnHidden": destroyOnHidden ?? destroyOnClose,
			"modalRender": mergedModalRender
		}), { default: () => [loading ? createVNode(skeleton_default, {
			"active": true,
			"title": false,
			"paragraph": { rows: 4 },
			"class": `${prefixCls.value}-body-skeleton`
		}, null) : slots.default?.()] })] })] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		confirmLoading: {
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
		afterClose: {
			type: Function,
			required: false
		},
		afterOpenChange: {
			type: Function,
			required: false
		},
		centered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		width: {
			type: [
				String,
				Number,
				Object
			],
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
		forceRender: {
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
		},
		destroyOnClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		wrapClassName: {
			type: String,
			required: false
		},
		maskTransitionName: {
			type: String,
			required: false
		},
		transitionName: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		rootStyle: {
			type: Object,
			required: false
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
		zIndex: {
			type: Number,
			required: false
		},
		bodyStyle: {
			type: Object,
			required: false
		},
		maskStyle: {
			type: Object,
			required: false
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
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		wrapProps: { required: false },
		prefixCls: {
			type: String,
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
		modalRender: {
			type: Function,
			required: false
		},
		focusTriggerAfterClose: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mousePosition: {
			type: [Object, null],
			required: false
		},
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		focusable: {
			type: Object,
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
		visible: {
			type: Boolean,
			required: false,
			default: void 0
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
		panelRef: { required: false }
	}, {
		focusTriggerAfterClose: true,
		width: 520
	}),
	emits: [
		"ok",
		"cancel",
		"update:open"
	],
	name: "AModal",
	inheritAttrs: false
});
var Modal_default = Modal;

//#endregion
export { Modal_default as default };