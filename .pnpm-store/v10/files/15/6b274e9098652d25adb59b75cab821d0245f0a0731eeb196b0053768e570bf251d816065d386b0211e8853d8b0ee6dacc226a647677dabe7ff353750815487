import { devUseWarning, isDev } from "../_util/warning.js";
import { useOrientation } from "../_util/hooks/useOrientation.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { InternalPanel } from "./Panel.js";
import { convertChildrenToItems } from "./hooks/useItems.js";
import useResizable from "./hooks/useResizable.js";
import useSizes from "./hooks/useSizes.js";
import useResize from "./hooks/useResize.js";
import SplitBar_default from "./SplitBar.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";
import ResizeObserver from "@v-c/resize-observer";

//#region src/splitter/Splitter.tsx
const Splitter = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls, rootPrefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("splitter", props);
	const { classes, styles, orientation, layout, vertical } = toPropsRefs(props, "classes", "styles", "orientation", "layout", "vertical");
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const [mergedOrientation, isVertical] = useOrientation(orientation, vertical, layout);
	const isRTL = computed(() => direction.value === "rtl");
	const reverse = computed(() => !isVertical.value && isRTL.value);
	const items = shallowRef([]);
	if (isDev) {
		const warning = devUseWarning("Splitter");
		const existSize = items.value.some((item) => item.size !== void 0);
		const existUndefinedSize = items.value.some((item) => item.size === void 0);
		if (existSize && existUndefinedSize) warning(false, "usage", "When part of `Splitter.Panel` has `size`, `onResize` is required or change `size` to `defaultSize`.");
		warning.deprecated(!layout.value, "layout", "orientation");
	}
	const containerSize = shallowRef();
	const onContainerResize = (size) => {
		const { offsetWidth, offsetHeight } = size;
		const _containerSize = isVertical.value ? offsetHeight : offsetWidth;
		if (_containerSize === 0) return;
		containerSize.value = _containerSize;
	};
	const [panelSizes, itemPxSizes, itemPtgSizes, itemPtgMinSizes, itemPtgMaxSizes, updateSizes] = useSizes(items, containerSize);
	const resizableInfos = useResizable(items, itemPxSizes, reverse);
	const [onOffsetStart, onOffsetUpdate, onOffsetEnd, onCollapse, movingIndex] = useResize(items, resizableInfos, itemPtgSizes, containerSize, updateSizes, isRTL);
	const onInternalResizeStart = (index) => {
		onOffsetStart(index);
		props?.onResizeStart?.(itemPxSizes.value);
	};
	const onInternalResizeUpdate = (index, offset, lazyEnd) => {
		const nextSizes = onOffsetUpdate(index, offset);
		if (lazyEnd) props?.onResizeEnd?.(nextSizes);
		else props?.onResize?.(nextSizes);
	};
	const onInternalResizeEnd = (lazyEnd) => {
		onOffsetEnd();
		if (!lazyEnd) props?.onResizeEnd?.(itemPxSizes.value);
	};
	const onInternalCollapse = (index, type) => {
		const nextSizes = onCollapse(index, type);
		props?.onResize?.(nextSizes);
		props?.onResizeEnd?.(nextSizes);
		const collapsed = nextSizes.map((size) => Math.abs(size) < Number.EPSILON);
		props?.onCollapse?.(collapsed, nextSizes);
		props?.["onUpdate:collapse"]?.(collapsed);
	};
	const mergedProps = computed(() => {
		return {
			...props,
			vertical: isVertical.value,
			orientation: mergedOrientation.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => ({ dragger: { _default: "default" } })));
	const stackSizes = computed(() => {
		const mergedSizes = [];
		let stack = 0;
		const len = items.value.length;
		for (let i = 0; i < len; i += 1) {
			stack += itemPtgSizes.value[i];
			mergedSizes.push(stack);
		}
		return mergedSizes;
	});
	return () => {
		const { rootClass, lazy, draggerIcon, collapsibleIcon } = props;
		items.value = convertChildrenToItems(slots?.default?.() ?? []);
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const containerClassName = clsx(prefixCls.value, className, `${prefixCls.value}-${mergedOrientation.value}`, { [`${prefixCls.value}-rtl`]: isRTL.value }, rootClass, mergedClassNames.value.root, contextClassName.value, cssVarCls.value, rootCls.value, hashId.value);
		const maskCls = `${prefixCls.value}-mask`;
		const mergedStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
		return createVNode(ResizeObserver, { "onResize": onContainerResize }, { default: () => [createVNode("div", mergeProps(restAttrs, {
			"style": mergedStyle,
			"class": containerClassName
		}), [items.value?.map?.((item, idx) => {
			const panel = createVNode(InternalPanel, mergeProps({
				...omit(item, ["_$slots"]),
				class: clsx(mergedClassNames.value.panel, item.class),
				style: {
					...mergedStyles.value.panel,
					...item.style
				}
			}, {
				"prefixCls": prefixCls.value,
				"size": panelSizes.value[idx]
			}), { default: () => [item._$slots?.default?.()] });
			let splitBar = null;
			const resizableInfo = resizableInfos.value[idx];
			if (resizableInfo) {
				const ariaMinStart = (stackSizes.value[idx - 1] || 0) + itemPtgMinSizes.value[idx];
				const ariaMinEnd = (stackSizes.value[idx + 1] || 100) - itemPtgMaxSizes.value[idx + 1];
				const ariaMaxStart = (stackSizes.value[idx - 1] || 0) + itemPtgMaxSizes.value[idx];
				const ariaMaxEnd = (stackSizes.value[idx + 1] || 100) - itemPtgMinSizes.value[idx + 1];
				splitBar = createVNode(SplitBar_default, {
					"lazy": lazy,
					"index": idx,
					"active": movingIndex.value === idx,
					"prefixCls": prefixCls.value,
					"rootPrefixCls": rootPrefixCls.value,
					"vertical": isVertical.value,
					"resizable": resizableInfo.resizable,
					"draggerStyle": mergedStyles.value.dragger,
					"draggerClassName": mergedClassNames.value.dragger,
					"draggerIcon": draggerIcon,
					"collapsibleIcon": collapsibleIcon,
					"ariaNow": stackSizes.value[idx] * 100,
					"ariaMin": Math.max(ariaMinStart, ariaMinEnd) * 100,
					"ariaMax": Math.min(ariaMaxStart, ariaMaxEnd) * 100,
					"startCollapsible": resizableInfo.startCollapsible,
					"endCollapsible": resizableInfo.endCollapsible,
					"showStartCollapsibleIcon": resizableInfo.showStartCollapsibleIcon,
					"showEndCollapsibleIcon": resizableInfo.showEndCollapsibleIcon,
					"onDraggerDoubleClick": props?.onDraggerDoubleClick,
					"onOffsetStart": onInternalResizeStart,
					"onOffsetUpdate": (index, offsetX, offsetY, lazyEnd) => {
						let offset = isVertical.value ? offsetY : offsetX;
						if (reverse.value) offset = -offset;
						onInternalResizeUpdate(index, offset, lazyEnd);
					},
					"onOffsetEnd": onInternalResizeEnd,
					"onCollapse": onInternalCollapse,
					"containerSize": containerSize.value || 0
				}, slots);
			}
			return createVNode(Fragment, { "key": `split-panel-${idx}` }, [panel, splitBar]);
		}), typeof movingIndex.value === "number" && createVNode("div", {
			"aria-hidden": true,
			"class": clsx(maskCls, `${maskCls}-${mergedOrientation.value}`)
		}, null)])] });
	};
}, {
	props: {
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		layout: {
			type: String,
			required: false
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
		draggerIcon: {
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
		collapsibleIcon: {
			type: Object,
			required: false
		},
		onDraggerDoubleClick: {
			type: Function,
			required: false
		},
		onResizeStart: {
			type: Function,
			required: false
		},
		onResize: {
			type: Function,
			required: false
		},
		onResizeEnd: {
			type: Function,
			required: false
		},
		onCollapse: {
			type: Function,
			required: false
		},
		"onUpdate:collapse": {
			type: Function,
			required: false
		},
		lazy: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	},
	name: "ASplitter",
	inheritAttrs: false
});
var Splitter_default = Splitter;

//#endregion
export { Splitter_default as default };