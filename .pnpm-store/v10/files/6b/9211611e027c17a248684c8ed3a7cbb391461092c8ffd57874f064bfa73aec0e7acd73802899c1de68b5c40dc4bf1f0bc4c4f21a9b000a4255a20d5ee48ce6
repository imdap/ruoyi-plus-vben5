import Mask_default from "./Mask.js";
import Placeholder_default from "./Placeholder.js";
import { useClosable } from "./hooks/useClosable.js";
import { getPlacement } from "./util.js";
import useTarget from "./hooks/useTarget.js";
import { getPlacements } from "./placements.js";
import TourStep_default from "./TourStep/index.js";
import { Fragment, computed, createVNode, defineComponent, mergeProps, nextTick, shallowRef, unref, watch } from "vue";
import { clsx } from "@v-c/util";
import { Trigger } from "@v-c/trigger";
var CENTER_PLACEHOLDER = {
	left: "50%",
	top: "50%",
	width: `1px`,
	height: `1px`
};
var defaultScrollIntoViewOptions = {
	block: "center",
	inline: "center"
};
var Tour_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const triggerRef = shallowRef();
	const placeholderRef = shallowRef(null);
	const inlineMode = computed(() => props?.getPopupContainer === false);
	const prefixCls = computed(() => props?.prefixCls ?? "vc-tour");
	const steps = computed(() => props?.steps ?? []);
	const stepCount = computed(() => steps.value.length);
	const mergedCurrent = shallowRef(typeof props?.current === "number" ? props.current : props?.defaultCurrent ?? 0);
	const setMergedCurrent = (nextCurrent) => {
		if (typeof props?.current === "undefined") mergedCurrent.value = nextCurrent;
	};
	watch(() => props?.current, (val) => {
		if (typeof val === "number") mergedCurrent.value = val;
	});
	const internalOpen = shallowRef(typeof props?.open === "boolean" ? props.open : props?.defaultOpen);
	const setInternalOpen = (nextOpen) => {
		if (typeof props?.open === "undefined") internalOpen.value = nextOpen;
	};
	watch(() => props?.open, (val) => {
		if (typeof val !== "undefined") internalOpen.value = val;
	});
	const mergedOpen = computed(() => {
		if (mergedCurrent.value < 0 || mergedCurrent.value >= stepCount.value) return false;
		return internalOpen.value ?? true;
	});
	const hasOpened = shallowRef(mergedOpen.value);
	const openRef = shallowRef(mergedOpen.value);
	watch([mergedOpen], async () => {
		await nextTick();
		if (mergedOpen.value) {
			if (!openRef.value) setMergedCurrent(0);
			hasOpened.value = true;
		}
		openRef.value = mergedOpen.value;
	});
	const stepInfo = computed(() => steps.value?.[mergedCurrent.value] ?? {});
	const stepStyle = computed(() => stepInfo.value?.style);
	const stepClassName = computed(() => stepInfo.value?.className);
	const mergedClosable = useClosable(computed(() => stepInfo.value?.closable), computed(() => stepInfo.value?.closeIcon), computed(() => props?.closable), computed(() => props?.closeIcon));
	const mergedMask = computed(() => {
		const mask = stepInfo.value?.mask ?? props?.mask ?? true;
		return mergedOpen.value && mask;
	});
	const mergedScrollIntoViewOptions = computed(() => stepInfo?.value?.scrollIntoViewOptions ?? props?.scrollIntoViewOptions ?? defaultScrollIntoViewOptions);
	const [posInfo, targetElement] = useTarget(computed(() => unref(stepInfo?.value?.target)), mergedOpen, computed(() => props?.gap), mergedScrollIntoViewOptions, inlineMode, placeholderRef);
	const mergedPlacement = computed(() => getPlacement(targetElement.value, props?.placement, stepInfo.value?.placement));
	const mergedArrow = computed(() => {
		if (!targetElement.value) return false;
		if (typeof stepInfo.value?.arrow !== "undefined") return stepInfo.value?.arrow;
		return typeof props?.arrow === "undefined" ? true : props?.arrow;
	});
	const arrowPointAtCenter = computed(() => typeof mergedArrow.value === "object" ? mergedArrow?.value?.pointAtCenter : false);
	watch([arrowPointAtCenter, mergedCurrent], async () => {
		await nextTick();
		triggerRef?.value?.forceAlign?.();
	}, { immediate: true });
	const onInternalChange = (nextCurrent) => {
		setMergedCurrent(nextCurrent);
		props?.onChange?.(nextCurrent);
	};
	const mergedBuiltinPlacements = computed(() => {
		const { builtinPlacements } = props;
		if (builtinPlacements) return typeof builtinPlacements === "function" ? builtinPlacements({ arrowPointAtCenter: arrowPointAtCenter.value }) : builtinPlacements;
		return getPlacements(arrowPointAtCenter.value);
	});
	const handleClose = () => {
		setInternalOpen(false);
		props?.onClose?.(mergedCurrent.value);
	};
	const fallbackDOM = () => {
		return targetElement.value || (typeof document !== "undefined" ? document.body : null);
	};
	return () => {
		const { styles, classNames, renderPanel, rootClassName, animated, zIndex = 1001, getPopupContainer, className, style, disabledInteraction, onPopupAlign } = props;
		const { class: attrClass, style: attrStyle, ...restAttrs } = attrs;
		const mergedMaskValue = mergedMask.value;
		const mergedShowMask = typeof mergedMaskValue === "boolean" ? mergedMaskValue : !!mergedMaskValue;
		const mergedMaskStyle = typeof mergedMaskValue === "boolean" ? void 0 : mergedMaskValue;
		const placeholderClassName = clsx(className, attrClass, rootClassName, `${prefixCls.value}-target-placeholder`);
		const placeholderStyle = {
			...posInfo.value ? {
				left: `${posInfo.value.left}px`,
				top: `${posInfo.value.top}px`,
				width: `${posInfo.value.width}px`,
				height: `${posInfo.value.height}px`
			} : CENTER_PLACEHOLDER,
			position: inlineMode.value ? "absolute" : "fixed",
			pointerEvents: "none",
			...style || {}
		};
		if (attrStyle && typeof attrStyle === "object") Object.assign(placeholderStyle, attrStyle);
		const popupElement = createVNode(TourStep_default, mergeProps({
			"styles": styles,
			"classNames": classNames,
			"arrow": mergedArrow.value,
			"key": "content",
			"prefixCls": prefixCls.value,
			"total": stepCount.value,
			"renderPanel": renderPanel,
			"onPrev": () => {
				onInternalChange(mergedCurrent.value - 1);
			},
			"onNext": () => {
				onInternalChange(mergedCurrent.value + 1);
			},
			"onClose": handleClose,
			"current": mergedCurrent.value,
			"onFinish": () => {
				handleClose();
				props?.onFinish?.();
			}
		}, stepInfo.value, { "closable": mergedClosable.value }), null);
		if (targetElement.value === void 0 || !hasOpened.value) return null;
		return createVNode(Fragment, null, [createVNode(Mask_default, {
			"getPopupContainer": getPopupContainer,
			"styles": styles,
			"classNames": classNames,
			"zIndex": zIndex,
			"prefixCls": prefixCls.value,
			"pos": posInfo.value,
			"showMask": mergedShowMask,
			"style": mergedMaskStyle?.style,
			"fill": mergedMaskStyle?.color,
			"open": mergedOpen.value,
			"animated": animated,
			"rootClassName": rootClassName,
			"disabledInteraction": disabledInteraction
		}, null), createVNode(Trigger, mergeProps(restAttrs, {
			"getPopupContainer": getPopupContainer,
			"builtinPlacements": mergedBuiltinPlacements.value,
			"ref": triggerRef,
			"popupStyle": stepStyle.value,
			"popupPlacement": mergedPlacement.value,
			"popupVisible": mergedOpen.value,
			"popupClassName": clsx(rootClassName, stepClassName.value),
			"prefixCls": prefixCls.value,
			"popup": popupElement,
			"forceRender": false,
			"autoDestroy": true,
			"zIndex": zIndex,
			"arrow": !!mergedArrow.value,
			"onPopupAlign": onPopupAlign
		}), { default: () => [createVNode(Placeholder_default, {
			"open": mergedOpen.value,
			"autoLock": !inlineMode.value,
			"getContainer": getPopupContainer,
			"domRef": placeholderRef,
			"fallbackDOM": fallbackDOM,
			"class": placeholderClassName,
			"style": placeholderStyle
		}, null)] })]);
	};
}, {
	props: {
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
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		steps: {
			type: Array,
			required: false,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultOpen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultCurrent: {
			type: Number,
			required: false,
			default: void 0
		},
		current: {
			type: Number,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onClose: {
			type: Function,
			required: false,
			default: void 0
		},
		onFinish: {
			type: Function,
			required: false,
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
		closable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		mask: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		rootClassName: {
			type: String,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		renderPanel: {
			type: Function,
			required: false,
			default: void 0
		},
		gap: {
			type: Object,
			required: false,
			default: void 0
		},
		animated: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		scrollIntoViewOptions: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: [Function, Boolean],
			required: false,
			default: void 0
		},
		builtinPlacements: {
			type: Function,
			required: false,
			skipCheck: true,
			default: void 0
		},
		disabledInteraction: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onPopupAlign: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "VcTour",
	inheritAttrs: false
});
export { Tour_default as default };
