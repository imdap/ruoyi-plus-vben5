import useOffsetStyle from "../hooks/useOffsetStyle.js";
import { Arrow } from "./Arrow.js";
import Mask_default from "./Mask.js";
import { Transition, computed, createVNode, defineComponent, mergeDefaults, mergeProps, nextTick, shallowRef, vShow, watchEffect, withDirectives } from "vue";
import { useResizeObserver } from "@v-c/resize-observer";
import { classNames } from "@v-c/util";
import { toPropsRefs } from "@v-c/util/dist/props-util";
import { useFocusBoundary } from "@v-c/util/dist/Dom/focusBoundary";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
var Popup_default = /* @__PURE__ */ defineComponent((props, { attrs, slots, expose }) => {
	const focusBoundary = useFocusBoundary();
	const { offsetX, offsetR, offsetY, offsetB, open, ready, align } = toPropsRefs(props, "offsetX", "offsetB", "offsetY", "offsetR", "ready", "open", "align");
	const isNodeVisible = computed(() => props.open || props.keepDom);
	const isMobile = computed(() => !!props.mobile);
	const getPopupContainerNeedParams = props?.getPopupContainer?.length > 0;
	const mergedProps = computed(() => {
		const { mobile, mask, maskMotion, motion } = props;
		if (mobile) return [
			mobile.mask,
			mobile.maskMotion,
			mobile.motion
		];
		return [
			mask,
			maskMotion,
			motion
		];
	});
	const show = shallowRef(!props.getPopupContainer || !getPopupContainerNeedParams);
	watchEffect(async () => {
		await nextTick();
		const getPopupContainerNeedParams$1 = props?.getPopupContainer?.length > 0;
		const target = props.target;
		if (!show.value && getPopupContainerNeedParams$1 && target) show.value = true;
	});
	const onInternalResize = (size, element) => {
		props?.onResize?.(size, element);
		props?.onAlign?.();
	};
	const offsetStyle = useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY);
	const popupElementRef = shallowRef();
	watchEffect((onCleanup) => {
		if (props.open && popupElementRef.value && focusBoundary?.registerAllowedElement) onCleanup(focusBoundary.registerAllowedElement(popupElementRef.value));
	});
	expose({
		getElement: () => popupElementRef.value,
		nativeElement: popupElementRef
	});
	useResizeObserver(open, popupElementRef, onInternalResize);
	return () => {
		if (!show.value) return null;
		const { onEsc, stretch, targetHeight, targetWidth, portal: Portal, forceRender, getPopupContainer, target, autoDestroy, zIndex, prefixCls, arrow, arrowPos, align: align$1, onMouseEnter, onMouseLeave, onPointerEnter, onPointerDownCapture, onClick, onPrepare, onVisibleChanged } = props;
		const miscStyle = {};
		if (stretch) {
			if (stretch.includes("height") && targetHeight) miscStyle.height = `${targetHeight}px`;
			else if (stretch.includes("minHeight") && targetHeight) miscStyle.minHeight = `${targetHeight}px`;
			if (stretch.includes("width") && targetWidth) miscStyle.width = `${targetWidth}px`;
			else if (stretch.includes("minWidth") && targetWidth) miscStyle.minWidth = `${targetWidth}px`;
		}
		if (!open.value) miscStyle.pointerEvents = "none";
		const [mergedMask, mergedMaskMotion, mergedPopupMotion] = mergedProps.value;
		const popupMotionName = mergedPopupMotion?.name ?? mergedPopupMotion?.motionName;
		const baseTransitionProps = popupMotionName ? getTransitionProps(popupMotionName, mergedPopupMotion) : {
			appear: true,
			...mergedPopupMotion || {}
		};
		const mergedTransitionProps = {
			appear: true,
			...baseTransitionProps,
			onBeforeEnter: (element) => {
				onPrepare?.();
				baseTransitionProps?.onBeforeEnter?.(element);
			},
			onAfterEnter: (element) => {
				baseTransitionProps?.onAfterEnter?.(element);
				requestAnimationFrame(() => {
					onVisibleChanged?.(true);
				});
			},
			onAfterLeave: (element) => {
				baseTransitionProps.onAfterLeave?.(element);
				onVisibleChanged?.(false);
			}
		};
		const cls = classNames(prefixCls, attrs.class, props.className, { [`${prefixCls}-mobile`]: isMobile.value });
		return createVNode(Portal, {
			"open": forceRender || isNodeVisible.value,
			"getContainer": getPopupContainer && (() => getPopupContainer(target)),
			"autoDestroy": autoDestroy,
			"onEsc": onEsc
		}, { default: () => [
			createVNode(Mask_default, {
				"prefixCls": prefixCls,
				"open": open.value,
				"zIndex": zIndex,
				"mask": mergedMask,
				"motion": mergedMaskMotion,
				"mobile": isMobile.value
			}, null),
			createVNode(Transition, mergedTransitionProps, { default: () => [withDirectives(createVNode("div", mergeProps({
				"ref": popupElementRef,
				"class": cls,
				"style": [
					{
						"--arrow-x": `${arrowPos.x || 0}px`,
						"--arrow-y": `${arrowPos.y || 0}px`
					},
					offsetStyle.value,
					miscStyle,
					{
						boxSizing: "border-box",
						zIndex
					},
					props.style
				],
				"onMouseenter": onMouseEnter,
				"onMouseleave": onMouseLeave,
				"onPointerenter": onPointerEnter,
				"onClick": onClick
			}, { onPointerdownCapture: onPointerDownCapture }), [!!arrow && createVNode(Arrow, {
				"prefixCls": prefixCls,
				"arrow": arrow === true ? {} : arrow,
				"arrowPos": arrowPos,
				"align": align$1
			}, null), typeof props?.popup === "function" ? props.popup() : props.popup]), [[vShow, open.value]])] }),
			slots?.default?.()
		] });
	};
}, { props: /* @__PURE__ */ mergeDefaults({
	onEsc: {
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: true,
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
	popup: {
		type: Function,
		required: false,
		skipCheck: true,
		default: void 0
	},
	target: {
		required: true,
		default: void 0
	},
	onMouseEnter: {
		type: Function,
		required: false,
		default: void 0
	},
	onMouseLeave: {
		type: Function,
		required: false,
		default: void 0
	},
	onPointerEnter: {
		type: Function,
		required: false,
		default: void 0
	},
	onPointerDownCapture: {
		type: Function,
		required: false,
		default: void 0
	},
	zIndex: {
		type: Number,
		required: false,
		default: void 0
	},
	mask: {
		type: Boolean,
		required: false,
		default: void 0
	},
	onVisibleChanged: {
		type: Function,
		required: true,
		default: void 0
	},
	align: {
		type: Object,
		required: false,
		default: void 0
	},
	arrow: {
		type: [Object, Boolean],
		required: false,
		default: void 0
	},
	arrowPos: {
		type: Object,
		required: true,
		default: void 0
	},
	open: {
		type: Boolean,
		required: true,
		default: void 0
	},
	keepDom: {
		type: Boolean,
		required: true,
		default: void 0
	},
	fresh: {
		type: Boolean,
		required: false,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	},
	motion: {
		type: Object,
		required: false,
		default: void 0
	},
	maskMotion: {
		type: Object,
		required: false,
		default: void 0
	},
	forceRender: {
		type: Boolean,
		required: false,
		default: void 0
	},
	getPopupContainer: {
		type: [Function, Boolean],
		required: false,
		default: void 0
	},
	autoDestroy: {
		type: Boolean,
		required: false,
		default: void 0
	},
	portal: {
		required: true,
		default: void 0
	},
	ready: {
		type: Boolean,
		required: true,
		default: void 0
	},
	offsetX: {
		type: Number,
		required: true,
		default: void 0
	},
	offsetY: {
		type: Number,
		required: true,
		default: void 0
	},
	offsetR: {
		type: Number,
		required: true,
		default: void 0
	},
	offsetB: {
		type: Number,
		required: true,
		default: void 0
	},
	onAlign: {
		required: true,
		default: void 0
	},
	onPrepare: {
		type: Function,
		required: true,
		default: void 0
	},
	stretch: {
		type: String,
		required: false,
		default: void 0
	},
	targetWidth: {
		type: Number,
		required: false,
		default: void 0
	},
	targetHeight: {
		type: Number,
		required: false,
		default: void 0
	},
	onResize: {
		required: false,
		default: void 0
	},
	mobile: {
		type: Object,
		required: false,
		default: void 0
	}
}, { autoDestroy: true }) });
export { Popup_default as default };
