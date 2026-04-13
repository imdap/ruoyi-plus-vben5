import { useOrientation } from "../_util/hooks/useOrientation.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import { useSliderInternalContext } from "./Context.js";
import SliderTooltip_default from "./SliderTooltip.js";
import style_default from "./style/index.js";
import useRafLock from "./useRafLock.js";
import { cloneVNode, computed, createVNode, defineComponent, isVNode, mergeProps, onMounted, onUnmounted, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import raf from "@v-c/util/dist/raf";
import { omit } from "es-toolkit";
import VcSlider from "@v-c/slider";

//#region src/slider/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function getTipFormatter(tipFormatter) {
	if (tipFormatter || tipFormatter === null) return tipFormatter;
	return (val) => typeof val === "number" ? val.toString() : "";
}
const Slider = /* @__PURE__ */ defineComponent((props, { attrs, emit, expose }) => {
	const { classes, styles, vertical, orientation } = toPropsRefs(props, "classes", "styles", "vertical", "orientation");
	const [, mergedVertical] = useOrientation(orientation, vertical);
	const sliderRef = shallowRef();
	const { prefixCls, direction: contextDirection, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, getPopupContainer, getPrefixCls } = useComponentBaseConfig("slider", props);
	const contextDisabled = useDisabledContext();
	const mergedDisabled = computed(() => props.disabled ?? contextDisabled.value);
	const mergedProps = computed(() => {
		return {
			...props,
			disabled: mergedDisabled.value,
			vertical: mergedVertical.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const { handleRender: contextHandleRender, direction: internalContextDirection } = useSliderInternalContext();
	const mergedDirection = computed(() => internalContextDirection?.value || contextDirection.value);
	const isRTL = computed(() => mergedDirection.value === "rtl");
	const [hoverOpen, setHoverOpen] = useRafLock();
	const [focusOpen, setFocusOpen] = useRafLock();
	const tooltipProps = computed(() => {
		return { ...props.tooltip };
	});
	const lockOpen = computed(() => tooltipProps.value?.open);
	const activeOpen = computed(() => (hoverOpen.value || focusOpen.value) && lockOpen.value !== false);
	const [dragging, setDragging] = useRafLock();
	const onInternalChangeComplete = (nextValues) => {
		emit("changeComplete", nextValues);
		setDragging(false);
	};
	const getTooltipPlacement = (placement, vert) => {
		if (placement) return placement;
		if (!vert) return "top";
		return isRTL ? "left" : "right";
	};
	const [hashId, cssVarCls] = style_default(prefixCls);
	const onMouseUp = () => {
		raf(() => {
			focusOpen.value = false;
		}, 1);
	};
	onMounted(() => {
		document.addEventListener("mouseup", onMouseUp);
	});
	onUnmounted(() => {
		document.removeEventListener("mouseup", onMouseUp);
	});
	expose({
		focus: () => sliderRef.value?.focus?.(),
		blur: () => sliderRef.value?.blur?.()
	});
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const { rootClass, tooltip, range } = props;
		const tooltipProps = { ...tooltip };
		const { placement: tooltipPlacement, getPopupContainer: getTooltipPopupContainer, prefixCls: customizeTooltipPrefixCls, formatter: tipFormatter } = tooltipProps;
		const rootClassNames = clsx(className, contextClassName.value, mergedClassNames.value.root, rootClass, {
			[`${prefixCls.value}-rtl`]: isRTL.value,
			[`${prefixCls.value}-lock`]: dragging.value
		}, hashId.value, cssVarCls.value);
		const restProps = {
			...omit(props, [
				"prefixCls",
				"range",
				"rootClass",
				"style",
				"disabled",
				"tooltip",
				"classes",
				"styles",
				"vertical",
				"orientation"
			]),
			...restAttrs
		};
		if (isRTL.value && !mergedVertical.value) restProps.reverse = !restProps.reverse;
		const mergedTipFormatter = getTipFormatter(tipFormatter);
		const useActiveTooltipHandle = range && !lockOpen.value;
		const handleRender = contextHandleRender || (({ node, index, value }) => {
			const nodeProps = {};
			function proxyEvent(eventName, event, triggerRestPropsEvent) {
				if (triggerRestPropsEvent) restProps[eventName]?.(event);
				nodeProps[eventName]?.(event);
			}
			const cloneNode = cloneVNode(node, {
				onMouseenter: (e) => {
					setHoverOpen(true);
					proxyEvent("onMouseenter", e);
				},
				onMouseleave: (e) => {
					setHoverOpen(false);
					proxyEvent("onMouseleave", e);
				},
				onMousedown: (e) => {
					setFocusOpen(true);
					setDragging(true);
					proxyEvent("onMousedown", e);
				},
				onFocus: (e) => {
					setFocusOpen(true);
					restProps?.onFocus?.(e);
					proxyEvent("onFocus", e, true);
				},
				onBlur: (e) => {
					setFocusOpen(false);
					restProps?.onBlur?.(e);
					proxyEvent("onBlur", e, true);
				}
			});
			const open = (!!lockOpen.value || activeOpen.value) && mergedTipFormatter !== null;
			if (!useActiveTooltipHandle) return createVNode(SliderTooltip_default, mergeProps(tooltipProps, {
				"prefixCls": getPrefixCls("tooltip", customizeTooltipPrefixCls),
				"title": mergedTipFormatter ? mergedTipFormatter(value) : "",
				"value": value,
				"open": open,
				"placement": getTooltipPlacement(tooltipPlacement, mergedVertical.value),
				"key": index,
				"classes": { root: `${prefixCls.value}-tooltip` },
				"getPopupContainer": getTooltipPopupContainer || getPopupContainer
			}), _isSlot(cloneNode) ? cloneNode : { default: () => [cloneNode] });
			return cloneNode;
		});
		const activeHandleRender = useActiveTooltipHandle ? ({ node, ...info }) => {
			const cloneNode = cloneVNode(node, { style: { visibility: "hidden" } });
			return createVNode(SliderTooltip_default, mergeProps(tooltipProps, {
				"prefixCls": getPrefixCls("tooltip", customizeTooltipPrefixCls),
				"title": mergedTipFormatter ? mergedTipFormatter(info.value) : "",
				"open": mergedTipFormatter !== null && activeOpen.value,
				"placement": getTooltipPlacement(tooltipPlacement, mergedVertical.value),
				"key": "tooltip",
				"classes": { root: `${prefixCls.value}-tooltip` },
				"getPopupContainer": getTooltipPopupContainer || getPopupContainer,
				"draggingDelete": info.draggingDelete
			}), _isSlot(cloneNode) ? cloneNode : { default: () => [cloneNode] });
		} : void 0;
		const rootStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
		return createVNode(VcSlider, mergeProps(restProps, {
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"step": restProps.step,
			"range": range,
			"className": rootClassNames,
			"style": rootStyle,
			"disabled": mergedDisabled.value,
			"vertical": mergedVertical.value,
			"prefixCls": prefixCls.value,
			"handleRender": handleRender,
			"activeHandleRender": activeHandleRender,
			"onChangeComplete": onInternalChangeComplete,
			"onChange": (...args) => {
				emit("change", ...args);
				emit("update:value", ...args);
			},
			"ref": sliderRef
		}), null);
	};
}, {
	props: {
		range: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		value: {
			type: [Number, Array],
			required: false
		},
		defaultValue: {
			type: [Number, Array],
			required: false
		},
		handleStyle: {
			type: [Object, Array],
			required: false
		},
		trackStyle: {
			type: [Object, Array],
			required: false
		},
		railStyle: {
			type: Object,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		reverse: {
			type: Boolean,
			required: false,
			default: void 0
		},
		min: {
			type: Number,
			required: false
		},
		max: {
			type: Number,
			required: false
		},
		step: {
			type: [null, Number],
			required: false
		},
		marks: {
			type: Object,
			required: false
		},
		dots: {
			type: Boolean,
			required: false,
			default: void 0
		},
		included: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		orientation: {
			type: String,
			required: false
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		tooltip: {
			type: Object,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		tabIndex: {
			type: [Number, Array],
			required: false
		},
		ariaLabelForHandle: {
			type: [String, Array],
			required: false
		},
		ariaLabelledByForHandle: {
			type: [String, Array],
			required: false
		},
		ariaRequired: {
			type: Boolean,
			required: false,
			default: void 0
		},
		ariaValueTextFormatterForHandle: { required: false }
	},
	emits: [
		"change",
		"afterChange",
		"update:value",
		"changeComplete"
	],
	name: "ASlider",
	inheritAttrs: false
});
Slider.install = (app) => {
	app.component(Slider.name, Slider);
};
var slider_default = Slider;

//#endregion
export { slider_default as default };