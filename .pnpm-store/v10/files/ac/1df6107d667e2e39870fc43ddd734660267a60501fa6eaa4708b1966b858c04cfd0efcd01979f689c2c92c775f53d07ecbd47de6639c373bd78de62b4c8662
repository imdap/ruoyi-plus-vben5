import { useComponentBaseConfig } from "../config-provider/context.js";
import { genCssVar } from "../theme/util/genStyleUtils.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { responsiveArray } from "../_util/responsiveObserver.js";
import useBreakpoint_default from "../grid/hooks/useBreakpoint.js";
import useGutter from "../grid/hooks/useGutter.js";
import { useChildLoadEvents } from "../_util/hooks/useChildLoadEvents.js";
import useDelay from "./hooks/useDelay.js";
import usePositions from "./hooks/usePositions.js";
import useRefs from "./hooks/useRefs.js";
import MasonryItem_default from "./MasonryItem.js";
import style_default from "./style/index.js";
import { TransitionGroup, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, onMounted, ref, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { getTransitionGroupProps } from "@v-c/util/dist/utils/transition";
import ResizeObserver from "@v-c/resize-observer";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
import isEqual from "@v-c/util/dist/isEqual";

//#region src/masonry/Masonry.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const Masonry = /* @__PURE__ */ defineComponent((props, { expose, emit, attrs, slots }) => {
	const { direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, prefixCls, rootPrefixCls } = useComponentBaseConfig("masonry", props);
	const { classes, styles, gutter, columns } = toPropsRefs(props, "classes", "styles", "gutter", "columns");
	const [hashId, cssVarCls] = style_default(prefixCls, useCSSVarCls_default(prefixCls));
	const [varName, varRef] = genCssVar(rootPrefixCls.value, "masonry");
	const containerRef = shallowRef();
	expose({ nativeElement: containerRef });
	const [setItemRef, getItemRef] = useRefs();
	const mergedItems = shallowRef([]);
	watch(() => props.items, () => {
		mergedItems.value = props?.items ?? [];
	}, { immediate: true });
	const screens = useBreakpoint_default();
	const gutters = useGutter(gutter, screens);
	const horizontalGutter = computed(() => gutters.value[0] || 0);
	const verticalGutter = computed(() => gutters.value[1] || horizontalGutter.value);
	const columnCount = computed(() => {
		if (!columns.value) return 3;
		if (typeof columns.value === "number") return columns.value;
		const matchingBreakpoint = responsiveArray.find((breakpoint) => screens.value[breakpoint] && columns.value?.[breakpoint] !== void 0);
		if (matchingBreakpoint) return columns.value[matchingBreakpoint];
		return columns.value.xs ?? 1;
	});
	const mergedProps = computed(() => {
		return {
			...props,
			columns: columnCount.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const itemHeights = ref([]);
	const collectItemSize = useDelay(() => {
		const nextItemHeights = mergedItems.value.map((item, index) => {
			const itemKey = item?.key ?? index;
			const rect = getItemRef(itemKey)?.getBoundingClientRect();
			return [
				itemKey,
				rect ? rect?.height : 0,
				item?.column
			];
		});
		if (!isEqual(itemHeights.value, nextItemHeights)) itemHeights.value = nextItemHeights;
	});
	const { bindEvent } = useChildLoadEvents();
	onMounted(() => {
		if (containerRef.value) bindEvent(containerRef.value, () => {
			collectItemSize();
		});
	});
	const [itemPositions, totalHeight] = usePositions(itemHeights, columnCount, verticalGutter);
	const itemWithPositions = computed(() => {
		return mergedItems.value.map((item, index) => {
			const key = item.key ?? index;
			return {
				item,
				itemIndex: index,
				itemKey: key,
				key,
				position: itemPositions.value.get(key)
			};
		});
	});
	watch([mergedItems, columnCount], () => {
		collectItemSize();
	}, {
		immediate: true,
		flush: "post"
	});
	const itemColumns = ref([]);
	watch(itemWithPositions, () => {
		if (itemWithPositions.value.every(({ position }) => position)) {
			const nextItemColumns = itemWithPositions.value.map(({ item, position }) => [item, position.column]);
			if (!isEqual(itemColumns.value, nextItemColumns)) itemColumns.value = nextItemColumns;
		}
	}, {
		immediate: true,
		flush: "post"
	});
	watch(itemColumns, async () => {
		if (!props.items?.length || props.items.length !== itemColumns.value.length) return;
		emit("layoutChange", itemColumns.value.map(([item, column]) => ({
			...item,
			column
		})));
	}, {
		immediate: true,
		flush: "post"
	});
	return () => {
		let _slot;
		const { fresh } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const transitionProps = getTransitionGroupProps(`${prefixCls.value}-item-fade`);
		const itemRender = slots?.itemRender ?? props?.itemRender;
		return createVNode(ResizeObserver, { "onResize": collectItemSize }, { default: () => [createVNode("div", mergeProps(restAttrs, {
			"ref": containerRef,
			"class": clsx(prefixCls.value, contextClassName.value, mergedClassNames.value?.root, props.rootClass, className, hashId.value, cssVarCls.value, { [`${prefixCls.value}-rtl`]: direction.value === "rtl" }),
			"style": {
				height: `${totalHeight.value}px`,
				...contextStyles.value.root,
				...contextStyle.value,
				...style
			}
		}), [createVNode(TransitionGroup, transitionProps, _isSlot(_slot = itemWithPositions.value.map((motionInfo) => {
			const { item, itemKey, itemIndex, key } = motionInfo;
			const position = motionInfo.position;
			const columnIndex = position?.column ?? 0;
			const widthVar = `calc((100% + ${horizontalGutter.value}px) / ${columnCount.value})`;
			const itemStyle = {
				[varName("item-width")]: widthVar,
				insetInlineStart: `calc(${varRef("item-width")} * ${columnIndex})`,
				width: `calc(${varRef("item-width")} - ${horizontalGutter.value}px)`,
				top: `${position?.top}px`,
				position: "absolute"
			};
			return createVNode(MasonryItem_default, mergeProps({
				"key": key,
				"ref": (ele) => {
					setItemRef(itemKey, getDOM(ele));
				},
				"prefixCls": prefixCls.value,
				"item": item,
				"class": clsx(mergedClassNames.value?.item, item.class),
				"style": {
					...mergedStyles.value?.item ?? {},
					...item.style ?? {},
					...itemStyle
				},
				"index": itemIndex,
				"itemRender": itemRender,
				"column": columnIndex
			}, { onResize: fresh ? collectItemSize : null }), null);
		})) ? _slot : { default: () => [_slot] })])] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		gutter: { required: false },
		items: {
			type: Array,
			required: false
		},
		itemRender: {
			type: Function,
			required: false
		},
		columns: {
			type: [Number, Object],
			required: false
		},
		fresh: {
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
	}, { gutter: 0 }),
	emits: ["layoutChange"],
	name: "AMasonry",
	inheritAttrs: false
});
var Masonry_default = Masonry;

//#endregion
export { Masonry_default as default };