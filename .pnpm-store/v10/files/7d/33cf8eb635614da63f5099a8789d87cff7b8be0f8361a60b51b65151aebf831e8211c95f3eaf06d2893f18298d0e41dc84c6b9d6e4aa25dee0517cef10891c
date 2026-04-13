Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_Mask = require("./Mask.cjs");
const require_Placeholder = require("./Placeholder.cjs");
const require_useClosable = require("./hooks/useClosable.cjs");
const require_util = require("./util.cjs");
const require_useTarget = require("./hooks/useTarget.cjs");
const require_placements = require("./placements.cjs");
const require_index = require("./TourStep/index.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_trigger = require("@v-c/trigger");
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
var Tour = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const triggerRef = (0, vue.shallowRef)();
	const placeholderRef = (0, vue.shallowRef)(null);
	const inlineMode = (0, vue.computed)(() => props?.getPopupContainer === false);
	const prefixCls = (0, vue.computed)(() => props?.prefixCls ?? "vc-tour");
	const steps = (0, vue.computed)(() => props?.steps ?? []);
	const stepCount = (0, vue.computed)(() => steps.value.length);
	const mergedCurrent = (0, vue.shallowRef)(typeof props?.current === "number" ? props.current : props?.defaultCurrent ?? 0);
	const setMergedCurrent = (nextCurrent) => {
		if (typeof props?.current === "undefined") mergedCurrent.value = nextCurrent;
	};
	(0, vue.watch)(() => props?.current, (val) => {
		if (typeof val === "number") mergedCurrent.value = val;
	});
	const internalOpen = (0, vue.shallowRef)(typeof props?.open === "boolean" ? props.open : props?.defaultOpen);
	const setInternalOpen = (nextOpen) => {
		if (typeof props?.open === "undefined") internalOpen.value = nextOpen;
	};
	(0, vue.watch)(() => props?.open, (val) => {
		if (typeof val !== "undefined") internalOpen.value = val;
	});
	const mergedOpen = (0, vue.computed)(() => {
		if (mergedCurrent.value < 0 || mergedCurrent.value >= stepCount.value) return false;
		return internalOpen.value ?? true;
	});
	const hasOpened = (0, vue.shallowRef)(mergedOpen.value);
	const openRef = (0, vue.shallowRef)(mergedOpen.value);
	(0, vue.watch)([mergedOpen], async () => {
		await (0, vue.nextTick)();
		if (mergedOpen.value) {
			if (!openRef.value) setMergedCurrent(0);
			hasOpened.value = true;
		}
		openRef.value = mergedOpen.value;
	});
	const stepInfo = (0, vue.computed)(() => steps.value?.[mergedCurrent.value] ?? {});
	const stepStyle = (0, vue.computed)(() => stepInfo.value?.style);
	const stepClassName = (0, vue.computed)(() => stepInfo.value?.className);
	const mergedClosable = require_useClosable.useClosable((0, vue.computed)(() => stepInfo.value?.closable), (0, vue.computed)(() => stepInfo.value?.closeIcon), (0, vue.computed)(() => props?.closable), (0, vue.computed)(() => props?.closeIcon));
	const mergedMask = (0, vue.computed)(() => {
		const mask = stepInfo.value?.mask ?? props?.mask ?? true;
		return mergedOpen.value && mask;
	});
	const mergedScrollIntoViewOptions = (0, vue.computed)(() => stepInfo?.value?.scrollIntoViewOptions ?? props?.scrollIntoViewOptions ?? defaultScrollIntoViewOptions);
	const [posInfo, targetElement] = require_useTarget.default((0, vue.computed)(() => (0, vue.unref)(stepInfo?.value?.target)), mergedOpen, (0, vue.computed)(() => props?.gap), mergedScrollIntoViewOptions, inlineMode, placeholderRef);
	const mergedPlacement = (0, vue.computed)(() => require_util.getPlacement(targetElement.value, props?.placement, stepInfo.value?.placement));
	const mergedArrow = (0, vue.computed)(() => {
		if (!targetElement.value) return false;
		if (typeof stepInfo.value?.arrow !== "undefined") return stepInfo.value?.arrow;
		return typeof props?.arrow === "undefined" ? true : props?.arrow;
	});
	const arrowPointAtCenter = (0, vue.computed)(() => typeof mergedArrow.value === "object" ? mergedArrow?.value?.pointAtCenter : false);
	(0, vue.watch)([arrowPointAtCenter, mergedCurrent], async () => {
		await (0, vue.nextTick)();
		triggerRef?.value?.forceAlign?.();
	}, { immediate: true });
	const onInternalChange = (nextCurrent) => {
		setMergedCurrent(nextCurrent);
		props?.onChange?.(nextCurrent);
	};
	const mergedBuiltinPlacements = (0, vue.computed)(() => {
		const { builtinPlacements } = props;
		if (builtinPlacements) return typeof builtinPlacements === "function" ? builtinPlacements({ arrowPointAtCenter: arrowPointAtCenter.value }) : builtinPlacements;
		return require_placements.getPlacements(arrowPointAtCenter.value);
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
		const placeholderClassName = (0, _v_c_util.clsx)(className, attrClass, rootClassName, `${prefixCls.value}-target-placeholder`);
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
		const popupElement = (0, vue.createVNode)(require_index.default, (0, vue.mergeProps)({
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
		return (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)(require_Mask.default, {
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
		}, null), (0, vue.createVNode)(_v_c_trigger.Trigger, (0, vue.mergeProps)(restAttrs, {
			"getPopupContainer": getPopupContainer,
			"builtinPlacements": mergedBuiltinPlacements.value,
			"ref": triggerRef,
			"popupStyle": stepStyle.value,
			"popupPlacement": mergedPlacement.value,
			"popupVisible": mergedOpen.value,
			"popupClassName": (0, _v_c_util.clsx)(rootClassName, stepClassName.value),
			"prefixCls": prefixCls.value,
			"popup": popupElement,
			"forceRender": false,
			"autoDestroy": true,
			"zIndex": zIndex,
			"arrow": !!mergedArrow.value,
			"onPopupAlign": onPopupAlign
		}), { default: () => [(0, vue.createVNode)(require_Placeholder.default, {
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
var Tour_default = Tour;
exports.default = Tour_default;
