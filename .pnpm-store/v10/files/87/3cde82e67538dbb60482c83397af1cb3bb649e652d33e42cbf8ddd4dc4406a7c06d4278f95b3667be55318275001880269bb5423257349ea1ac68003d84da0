import { TriggerContextProvider, UniqueContextProvider, useTriggerContext } from "../context.js";
import { getAlignPopupClassName } from "../util.js";
import useAlign from "../hooks/useAlign.js";
import useDelay from "../hooks/useDelay.js";
import Popup_default from "../Popup/index.js";
import UniqueContainer_default from "./UniqueContainer.js";
import useTargetState from "./useTargetState.js";
import { computed, createVNode, defineComponent, ref, shallowRef, watch } from "vue";
import Portal from "@v-c/portal";
import { classNames } from "@v-c/util";
import { isDOM } from "@v-c/util/dist/Dom/findDOMNode";
var UniqueProvider_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const [trigger, open, options, onTargetVisibleChanged] = useTargetState();
	const mergedOptions = computed(() => {
		if (!options.value || !props.postTriggerProps) return options.value;
		return props.postTriggerProps(options.value);
	});
	const popupEle = shallowRef(null);
	const popupSize = ref(null);
	const externalPopupRef = shallowRef(null);
	const resolveToElement = (node) => {
		if (!node) return null;
		if (isDOM(node)) return node;
		const exposed = node;
		if (isDOM(exposed?.$el)) return exposed.$el;
		const nativeEl = exposed?.nativeElement;
		if (isDOM(nativeEl?.value)) return nativeEl.value;
		if (isDOM(nativeEl)) return nativeEl;
		if (typeof exposed?.getElement === "function") {
			const el = exposed.getElement();
			if (isDOM(el)) return el;
		}
		return null;
	};
	const setPopupRef = (node) => {
		const element = resolveToElement(node);
		if (!element) return;
		externalPopupRef.value = element;
		if (popupEle.value !== element) popupEle.value = element;
	};
	const isOpenRef = shallowRef();
	const delayInvoke = useDelay();
	const show = (showOptions, isOpen) => {
		isOpenRef.value = isOpen;
		delayInvoke(() => {
			trigger(showOptions);
		}, showOptions.delay);
	};
	const hide = (delay) => {
		delayInvoke(() => {
			if (isOpenRef.value?.()) return;
			trigger(false);
		}, delay);
	};
	const [ready, offsetX, offsetY, offsetR, offsetB, arrowX, arrowY, , , alignInfo, onAlign] = useAlign(open, popupEle, computed(() => mergedOptions.value?.target), computed(() => mergedOptions.value?.popupPlacement), computed(() => mergedOptions.value?.builtinPlacements || {}), computed(() => mergedOptions.value?.popupAlign), void 0, ref(false));
	const inMotion = shallowRef(false);
	watch(open, () => {
		if (open.value) inMotion.value = true;
	});
	const triggerAlign = () => {
		if (!inMotion.value) onAlign();
	};
	const onVisibleChanged = (visible) => {
		onTargetVisibleChanged(visible);
		inMotion.value = false;
		onAlign();
	};
	const alignedClassName = computed(() => {
		if (!mergedOptions.value) return "";
		return classNames(getAlignPopupClassName(mergedOptions.value?.builtinPlacements || {}, mergedOptions.value.prefixCls || "", alignInfo.value, false), mergedOptions.value?.getPopupClassNameFromAlign?.(alignInfo.value));
	});
	const contextValue = {
		show,
		hide
	};
	watch(() => mergedOptions.value?.target, () => {
		onAlign();
	});
	const onPrepare = () => {
		onAlign();
		return Promise.resolve();
	};
	const subPopupElements = ref({});
	const parentContext = useTriggerContext();
	const triggerContextValue = computed(() => {
		return { registerSubPopup: (id, subPopupEle) => {
			if (subPopupEle) subPopupElements.value[id] = subPopupEle;
			else delete subPopupElements.value[id];
			parentContext?.value?.registerSubPopup(id, subPopupEle);
		} };
	});
	return () => {
		const prefixCls = mergedOptions?.value?.prefixCls;
		return createVNode(UniqueContextProvider, contextValue, { default: () => [slots?.default?.(), !!mergedOptions.value && createVNode(TriggerContextProvider, triggerContextValue.value, { default: () => [createVNode(Popup_default, {
			"ref": setPopupRef,
			"portal": Portal,
			"prefixCls": prefixCls,
			"popup": mergedOptions.value?.popup,
			"onEsc": mergedOptions.value?.onEsc,
			"className": classNames(mergedOptions.value?.popupClassName, alignedClassName.value, `${prefixCls}-unique-controlled`),
			"style": mergedOptions.value?.popupStyle,
			"target": mergedOptions.value?.target,
			"open": open.value,
			"keepDom": true,
			"fresh": true,
			"autoDestroy": false,
			"onVisibleChanged": onVisibleChanged,
			"ready": ready.value,
			"offsetX": offsetX.value,
			"offsetY": offsetY.value,
			"offsetR": offsetR.value,
			"offsetB": offsetB.value,
			"onAlign": triggerAlign,
			"onPrepare": onPrepare,
			"onResize": (size) => {
				popupSize.value = {
					width: size.offsetWidth,
					height: size.offsetHeight
				};
			},
			"arrowPos": {
				x: arrowX.value,
				y: arrowY.value
			},
			"align": alignInfo.value,
			"zIndex": mergedOptions.value?.zIndex,
			"mask": mergedOptions.value?.mask,
			"arrow": mergedOptions.value?.arrow,
			"motion": mergedOptions.value?.popupMotion,
			"maskMotion": mergedOptions.value?.maskMotion,
			"getPopupContainer": mergedOptions.value.getPopupContainer
		}, { default: () => [createVNode(UniqueContainer_default, {
			"prefixCls": prefixCls,
			"isMobile": false,
			"ready": ready.value,
			"open": open.value,
			"align": alignInfo.value,
			"offsetX": offsetX.value,
			"offsetY": offsetY.value,
			"offsetR": offsetR.value,
			"offsetB": offsetB.value,
			"arrowPos": {
				x: arrowX.value,
				y: arrowY.value
			},
			"popupSize": popupSize.value,
			"motion": mergedOptions.value?.popupMotion,
			"uniqueContainerClassName": classNames(mergedOptions.value?.uniqueContainerClassName, alignedClassName.value),
			"uniqueContainerStyle": mergedOptions?.value?.uniqueContainerStyle
		}, null)] })] })] });
	};
}, { props: { postTriggerProps: {
	type: Function,
	required: false,
	default: void 0
} } });
export { UniqueProvider_default as default };
