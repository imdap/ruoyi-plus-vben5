import { TriggerContextProvider, useTriggerContext, useUniqueContext } from "./context.js";
import useAction from "./hooks/useAction.js";
import { getAlignPopupClassName } from "./util.js";
import useAlign from "./hooks/useAlign.js";
import useDelay from "./hooks/useDelay.js";
import useWatch from "./hooks/useWatch.js";
import useWinClick from "./hooks/useWinClick.js";
import Popup_default from "./Popup/index.js";
import UniqueProvider_default from "./UniqueProvider/index.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, nextTick, reactive, ref, shallowRef, useId, watch, watchEffect } from "vue";
import Portal from "@v-c/portal";
import { useResizeObserver } from "@v-c/resize-observer";
import { classNames } from "@v-c/util";
import { getShadowRoot } from "@v-c/util/dist/Dom/shadow";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { resolveToElement } from "@v-c/util/dist/vnode";
var defaults = {
	prefixCls: "vc-trigger-popup",
	action: "hover",
	mouseLeaveDelay: .1,
	maskClosable: true,
	builtinPlacements: {},
	popupVisible: void 0,
	defaultPopupVisible: void 0
};
function generateTrigger(PortalComponent = Portal) {
	return /* @__PURE__ */ defineComponent((props, { expose, slots, attrs }) => {
		const mergedAutoDestroy = computed(() => props.autoDestroy ?? false);
		const openUncontrolled = computed(() => props.popupVisible === void 0);
		const isMobile = computed(() => !!props.mobile);
		const subPopupElements = ref({});
		const parentContext = useTriggerContext();
		const context = computed(() => {
			return { registerSubPopup(id$1, subPopupEle) {
				if (subPopupEle) subPopupElements.value[id$1] = subPopupEle;
				else delete subPopupElements.value[id$1];
				parentContext?.value.registerSubPopup(id$1, subPopupEle);
			} };
		});
		const uniqueContext = useUniqueContext();
		const id = useId();
		const popupEle = shallowRef(null);
		const externalPopupRef = shallowRef(null);
		const setPopupRef = (node) => {
			const element = resolveToElement(node);
			externalPopupRef.value = element;
			if (popupEle.value !== element) popupEle.value = element;
			parentContext?.value?.registerSubPopup(id, element ?? null);
		};
		const targetEle = shallowRef();
		const externalForwardRef = shallowRef(null);
		const setTargetRef = (node) => {
			const element = resolveToElement(node);
			if (element && targetEle.value !== element) {
				targetEle.value = element;
				externalForwardRef.value = element;
			} else if (!element) {
				targetEle.value = void 0;
				externalForwardRef.value = null;
			}
		};
		const originChildProps = reactive({});
		const baseActionProps = shallowRef({});
		const hoverActionProps = shallowRef({});
		const cloneProps = computed(() => ({
			...baseActionProps.value,
			...hoverActionProps.value
		}));
		const inPopupOrChild = (ele) => {
			const childDOM = targetEle.value;
			return childDOM?.contains(ele) || childDOM && getShadowRoot(childDOM)?.host === ele || ele === childDOM || popupEle.value?.contains(ele) || popupEle.value && getShadowRoot(popupEle.value)?.host === ele || ele === popupEle.value || Object.values(subPopupElements.value).some((subPopupEle) => subPopupEle?.contains(ele) || ele === subPopupEle);
		};
		const innerArrow = computed(() => {
			return props.arrow ? { ...props?.arrow !== true ? props?.arrow : {} } : null;
		});
		const internalOpen = shallowRef(props?.defaultPopupVisible ?? false);
		if (props.popupVisible !== void 0) internalOpen.value = props.popupVisible;
		const mergedOpen = computed(() => {
			return props?.popupVisible ?? internalOpen.value;
		});
		const isOpen = () => mergedOpen.value;
		watch(() => props.popupVisible, async (nextVisible) => {
			if (nextVisible !== void 0) {
				await nextTick();
				internalOpen.value = nextVisible;
			}
		});
		const getUniqueOptions = (delay = 0) => {
			return {
				popup: props.popup,
				target: targetEle.value,
				delay,
				prefixCls: props.prefixCls,
				popupClassName: props.popupClassName,
				uniqueContainerClassName: props.uniqueContainerClassName,
				uniqueContainerStyle: props.uniqueContainerStyle,
				popupStyle: props.popupStyle,
				popupPlacement: props.popupPlacement,
				builtinPlacements: props.builtinPlacements,
				popupAlign: props.popupAlign,
				zIndex: props.zIndex,
				mask: props.mask,
				maskClosable: props.maskClosable,
				popupMotion: props.popupMotion,
				maskMotion: props.maskMotion,
				arrow: innerArrow.value,
				getPopupContainer: props.getPopupContainer,
				getPopupClassNameFromAlign: props.getPopupClassNameFromAlign,
				id,
				onEsc
			};
		};
		watch([mergedOpen, targetEle], () => {
			if (uniqueContext && props.unique && targetEle.value && !openUncontrolled.value && !parentContext?.value) if (mergedOpen.value) {
				const enterDelay = props.mouseEnterDelay ?? 0;
				uniqueContext?.show(getUniqueOptions(enterDelay), isOpen);
			} else uniqueContext?.hide(props.mouseLeaveDelay || 0);
		});
		const openRef = shallowRef(mergedOpen.value);
		watch(mergedOpen, () => {
			openRef.value = mergedOpen.value;
		});
		const internalTriggerOpen = (nextOpen) => {
			if (mergedOpen.value !== nextOpen) {
				internalOpen.value = nextOpen;
				props?.onOpenChange?.(nextOpen);
				props?.onPopupVisibleChange?.(nextOpen);
			}
		};
		const delayInvoke = useDelay();
		const triggerOpen = (nextOpen, delay = 0) => {
			if (props.popupVisible !== void 0) {
				delayInvoke(() => {
					internalTriggerOpen(nextOpen);
				}, delay);
				return;
			}
			if (uniqueContext && props.unique && openUncontrolled.value && !parentContext?.value) {
				if (nextOpen) uniqueContext?.show(getUniqueOptions(delay), isOpen);
				else uniqueContext.hide(delay);
				return;
			}
			delayInvoke(() => {
				internalTriggerOpen(nextOpen);
			}, delay);
		};
		function onEsc({ top }) {
			if (top) triggerOpen(false);
		}
		const inMotion = shallowRef(false);
		watch(mergedOpen, () => {
			if (mergedOpen.value) inMotion.value = true;
		});
		const motionPrepareResolve = shallowRef();
		const mousePos = ref(null);
		const setMousePosByEvent = (event) => {
			mousePos.value = [event.clientX, event.clientY];
		};
		const [ready, offsetX, offsetY, offsetR, offsetB, arrowX, arrowY, scaleX, scaleY, alignInfo, onAlign] = useAlign(mergedOpen, popupEle, computed(() => props?.alignPoint && mousePos.value !== null ? mousePos.value : targetEle.value), computed(() => props?.popupPlacement), computed(() => props?.builtinPlacements), computed(() => props?.popupAlign), props?.onPopupAlign, isMobile);
		const [showActions, hideActions] = useAction(computed(() => props.action), computed(() => props.showAction), computed(() => props.hideAction));
		const clickToShow = computed(() => showActions.value?.has("click"));
		const clickToHide = computed(() => hideActions.value?.has("click") || hideActions.value?.has("contextmenu"));
		const triggerAlign = () => {
			if (!inMotion.value) onAlign();
			else onAlign(true);
		};
		const onScroll = () => {
			if (openRef.value && props?.alignPoint && clickToHide.value) triggerOpen(false);
		};
		useWatch(mergedOpen, targetEle, popupEle, triggerAlign, onScroll);
		watch([mousePos, () => props.popupPlacement], async () => {
			await nextTick();
			triggerAlign();
		});
		watch(() => JSON.stringify(props.popupAlign), async () => {
			await nextTick();
			const { builtinPlacements, popupPlacement } = props;
			if (mergedOpen.value && !builtinPlacements?.[popupPlacement]) triggerAlign();
		});
		const alignedClassName = computed(() => {
			return classNames(getAlignPopupClassName(props.builtinPlacements, props.prefixCls, alignInfo.value, props.alignPoint), props?.getPopupClassNameFromAlign?.(alignInfo.value));
		});
		expose({
			nativeElement: externalForwardRef,
			popupElement: externalPopupRef,
			forceAlign: triggerAlign
		});
		const targetWidth = shallowRef(0);
		const targetHeight = shallowRef(0);
		const syncTargetSize = () => {
			if (props.stretch && targetEle.value) {
				const rect = targetEle.value.getBoundingClientRect();
				targetWidth.value = rect.width;
				targetHeight.value = rect.height;
			}
		};
		const onTargetResize = () => {
			syncTargetSize();
			triggerAlign();
		};
		const onVisibleChanged = (visible) => {
			inMotion.value = false;
			onAlign();
			props?.afterOpenChange?.(visible);
			props?.afterPopupVisibleChange?.(visible);
		};
		const onPrepare = () => {
			syncTargetSize();
			return new Promise((resolve) => {
				motionPrepareResolve.value = resolve;
				inMotion.value = true;
			});
		};
		watch([motionPrepareResolve], () => {
			if (motionPrepareResolve.value) {
				onAlign();
				motionPrepareResolve.value();
				motionPrepareResolve.value = void 0;
			}
		}, { flush: "post" });
		function wrapperAction(target, eventName, nextOpen, delay, callback, ignoreCheck) {
			target[eventName] = (event, ...args) => {
				if (!ignoreCheck || !ignoreCheck()) {
					callback?.(event);
					triggerOpen(nextOpen, delay);
				}
				originChildProps[eventName]?.(event, ...args);
			};
		}
		const touchToShow = computed(() => showActions.value?.has("touch"));
		const touchToHide = computed(() => hideActions.value?.has("touch"));
		const touchedRef = shallowRef(false);
		watchEffect(() => {
			const nextCloneProps = {};
			if (touchToShow.value || touchToHide.value) nextCloneProps.onTouchstart = (...args) => {
				touchedRef.value = true;
				if (openRef.value && touchToHide.value) triggerOpen(false);
				else if (!openRef.value && touchToShow.value) triggerOpen(true);
				originChildProps.onTouchstart?.(...args);
			};
			if (clickToShow.value || clickToHide.value) nextCloneProps.onClick = (event, ...args) => {
				if (openRef.value && clickToHide.value) triggerOpen(false);
				else if (!openRef.value && clickToShow.value) {
					setMousePosByEvent(event);
					triggerOpen(true);
				}
				originChildProps?.onClick?.(event, ...args);
				touchedRef.value = false;
			};
			baseActionProps.value = nextCloneProps;
		});
		const onPopupPointerDown = useWinClick(mergedOpen, computed(() => clickToHide.value || touchToHide.value), targetEle, popupEle, computed(() => props.mask), computed(() => props.maskClosable), inPopupOrChild, triggerOpen);
		const hoverToShow = computed(() => showActions.value?.has("hover"));
		const hoverToHide = computed(() => hideActions.value?.has("hover"));
		let onPopupMouseEnter;
		let onPopupMouseLeave;
		const ignoreMouseTrigger = () => {
			return touchedRef.value;
		};
		watchEffect(() => {
			const { mouseEnterDelay, mouseLeaveDelay, alignPoint, focusDelay, blurDelay } = props;
			const nextHoverProps = {};
			if (hoverToShow.value) {
				const onMouseEnterCallback = (event) => {
					setMousePosByEvent(event);
				};
				wrapperAction(nextHoverProps, "onMouseenter", true, mouseEnterDelay, onMouseEnterCallback, ignoreMouseTrigger);
				wrapperAction(nextHoverProps, "onPointerenter", true, mouseEnterDelay, onMouseEnterCallback, ignoreMouseTrigger);
				onPopupMouseEnter = (event) => {
					if ((mergedOpen.value || inMotion.value) && popupEle?.value?.contains(event.target)) triggerOpen(true, mouseEnterDelay);
				};
				if (alignPoint) nextHoverProps.onMouseMove = (event) => {
					originChildProps.onMousemove?.(event);
				};
			} else onPopupMouseEnter = void 0;
			if (hoverToHide.value) {
				wrapperAction(nextHoverProps, "onMouseleave", false, mouseLeaveDelay, void 0, ignoreMouseTrigger);
				wrapperAction(nextHoverProps, "onPointerleave", false, mouseLeaveDelay, void 0, ignoreMouseTrigger);
				onPopupMouseLeave = (event) => {
					const { relatedTarget } = event;
					if (relatedTarget && inPopupOrChild(relatedTarget)) return;
					triggerOpen(false, mouseLeaveDelay);
				};
			} else onPopupMouseLeave = void 0;
			if (showActions.value.has("focus")) wrapperAction(nextHoverProps, "onFocus", true, focusDelay);
			if (hideActions.value.has("focus")) wrapperAction(nextHoverProps, "onBlur", false, blurDelay);
			if (showActions.value.has("contextmenu")) nextHoverProps.onContextmenu = (event, ...args) => {
				if (openRef.value && hideActions.value.has("contextmenu")) triggerOpen(false);
				else {
					setMousePosByEvent(event);
					triggerOpen(true);
				}
				event.preventDefault();
				originChildProps.onContextmenu?.(event, ...args);
			};
			hoverActionProps.value = nextHoverProps;
		});
		const rendedRef = shallowRef(false);
		watchEffect(() => {
			rendedRef.value ||= props.forceRender || mergedOpen.value || inMotion.value;
		});
		useResizeObserver(mergedOpen, targetEle, onTargetResize);
		return () => {
			const child = filterEmpty(slots?.default?.({ open: mergedOpen.value }) ?? [])?.[0];
			const mergedChildrenProps = {
				...originChildProps,
				...cloneProps.value
			};
			const passedProps = {};
			[
				"onContextmenu",
				"onClick",
				"onMousedown",
				"onTouchstart",
				"onMouseenter",
				"onMouseleave",
				"onFocus",
				"onBlur"
			].forEach((eventName) => {
				if (attrs[eventName]) passedProps[eventName] = (...args) => {
					mergedChildrenProps[eventName]?.(...args);
					attrs[eventName](...args);
				};
			});
			const arrowPos = {
				x: arrowX.value,
				y: arrowY.value
			};
			const triggerNode = createVNode(child, {
				...mergedChildrenProps,
				...passedProps,
				ref: setTargetRef
			});
			const { unique, prefixCls, popup, popupClassName, popupStyle, zIndex, fresh, onPopupClick, mask, popupMotion, maskMotion, forceRender, getPopupContainer, stretch, mobile } = props;
			return createVNode(Fragment, null, [triggerNode, rendedRef.value && targetEle.value && (!uniqueContext || !unique) && createVNode(TriggerContextProvider, context.value, { default: () => [createVNode(Popup_default, {
				"portal": PortalComponent,
				"ref": setPopupRef,
				"prefixCls": prefixCls,
				"popup": popup,
				"className": classNames(popupClassName, !isMobile.value && alignedClassName.value),
				"style": popupStyle,
				"target": targetEle.value,
				"onMouseEnter": onPopupMouseEnter,
				"onMouseLeave": onPopupMouseLeave,
				"onPointerEnter": onPopupMouseEnter,
				"zIndex": zIndex,
				"open": mergedOpen.value,
				"keepDom": inMotion.value,
				"fresh": fresh,
				"onClick": onPopupClick,
				"onEsc": onEsc,
				"onPointerDownCapture": onPopupPointerDown,
				"mask": mask,
				"motion": popupMotion,
				"maskMotion": maskMotion,
				"onVisibleChanged": onVisibleChanged,
				"onPrepare": onPrepare,
				"forceRender": forceRender,
				"autoDestroy": mergedAutoDestroy.value,
				"getPopupContainer": getPopupContainer,
				"align": alignInfo.value,
				"arrow": innerArrow.value,
				"arrowPos": arrowPos,
				"ready": ready.value,
				"offsetX": offsetX.value,
				"offsetY": offsetY.value,
				"offsetR": offsetR.value,
				"offsetB": offsetB.value,
				"onAlign": triggerAlign,
				"stretch": stretch,
				"targetWidth": targetWidth.value / scaleX.value,
				"targetHeight": targetHeight.value / scaleY.value,
				"mobile": mobile
			}, null)] })]);
		};
	}, { props: /* @__PURE__ */ mergeDefaults({
		action: {
			type: [String, Array],
			required: false,
			default: void 0
		},
		showAction: {
			type: Array,
			required: false,
			default: void 0
		},
		hideAction: {
			type: Array,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		onPopupAlign: {
			type: Function,
			required: false,
			default: void 0
		},
		stretch: {
			type: String,
			required: false,
			default: void 0
		},
		popupVisible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultPopupVisible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onOpenChange: {
			type: Function,
			required: false,
			default: void 0
		},
		afterOpenChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onPopupVisibleChange: {
			type: Function,
			required: false,
			default: void 0
		},
		afterPopupVisibleChange: {
			type: Function,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: [Function, Boolean],
			required: false,
			default: void 0
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoDestroy: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mask: {
			type: Boolean,
			required: false,
			default: void 0
		},
		maskClosable: {
			type: Boolean,
			required: false,
			default: void 0
		},
		popupMotion: {
			type: Object,
			required: false,
			default: void 0
		},
		maskMotion: {
			type: Object,
			required: false,
			default: void 0
		},
		mouseEnterDelay: {
			type: Number,
			required: false,
			default: void 0
		},
		mouseLeaveDelay: {
			type: Number,
			required: false,
			default: void 0
		},
		focusDelay: {
			type: Number,
			required: false,
			default: void 0
		},
		blurDelay: {
			type: Number,
			required: false,
			default: void 0
		},
		popup: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: true,
			default: void 0
		},
		popupPlacement: {
			type: String,
			required: false,
			default: void 0
		},
		builtinPlacements: {
			type: Object,
			required: false,
			default: void 0
		},
		popupAlign: {
			type: Object,
			required: false,
			default: void 0
		},
		popupClassName: {
			type: String,
			required: false,
			default: void 0
		},
		uniqueContainerClassName: {
			type: String,
			required: false,
			default: void 0
		},
		uniqueContainerStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		popupStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		getPopupClassNameFromAlign: {
			type: Function,
			required: false,
			default: void 0
		},
		onPopupClick: {
			type: Function,
			required: false,
			default: void 0
		},
		alignPoint: {
			type: Boolean,
			required: false,
			default: void 0
		},
		fresh: {
			type: Boolean,
			required: false,
			default: void 0
		},
		unique: {
			type: Boolean,
			required: false,
			default: void 0
		},
		arrow: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		mobile: {
			type: Object,
			required: false,
			default: void 0
		}
	}, defaults) });
}
var Trigger = generateTrigger(Portal);
var src_default = Trigger;
export { Trigger, UniqueProvider_default as UniqueProvider, src_default as default, generateTrigger };
