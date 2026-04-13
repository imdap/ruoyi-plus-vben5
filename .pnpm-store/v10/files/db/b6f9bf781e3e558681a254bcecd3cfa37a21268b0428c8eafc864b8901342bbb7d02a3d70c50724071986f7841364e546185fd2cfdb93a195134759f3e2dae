import { OverflowContextProvider } from "./context.js";
import useEffectState, { useBatcher } from "./hooks/useEffectState.js";
import Item_default from "./Item.js";
import RawItem_default from "./RawItem.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps, ref, watchEffect } from "vue";
import ResizeObserver from "@v-c/resize-observer";
import { classNames } from "@v-c/util";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var RESPONSIVE = "responsive";
var INVALIDATE = "invalidate";
function defaultRenderRest(omittedItems) {
	return `+ ${omittedItems.length} ...`;
}
var Overflow = /* @__PURE__ */ defineComponent({
	name: "Overflow",
	inheritAttrs: false,
	props: {
		prefixCls: {
			type: String,
			default: "vc-overflow"
		},
		data: {
			type: Array,
			default: () => []
		},
		renderItem: Function,
		renderRawItem: Function,
		itemKey: [
			String,
			Number,
			Function
		],
		itemWidth: {
			type: Number,
			default: 10
		},
		maxCount: [Number, String],
		renderRest: [Function, Object],
		renderRawRest: Function,
		prefix: {},
		suffix: {},
		component: [
			String,
			Object,
			Function
		],
		itemComponent: [
			String,
			Object,
			Function
		],
		onVisibleChange: Function,
		ssr: String
	},
	emits: ["visibleChange"],
	setup(props, { attrs, slots, emit }) {
		const notifyEffectUpdate = useBatcher();
		const [containerWidth, setContainerWidth] = useEffectState(notifyEffectUpdate, null);
		const mergedContainerWidth = computed(() => containerWidth.value || 0);
		const [itemWidths, setItemWidths] = useEffectState(notifyEffectUpdate, /* @__PURE__ */ new Map());
		const [prevRestWidth, setPrevRestWidth] = useEffectState(notifyEffectUpdate, 0);
		const [restWidth, setRestWidth] = useEffectState(notifyEffectUpdate, 0);
		const [prefixWidth, setPrefixWidth] = useEffectState(notifyEffectUpdate, 0);
		const [suffixWidth, setSuffixWidth] = useEffectState(notifyEffectUpdate, 0);
		const suffixFixedStart = ref(null);
		const displayCount = ref(null);
		const mergedDisplayCount = computed(() => {
			if (displayCount.value === null && props.ssr === "full") return Number.MAX_SAFE_INTEGER;
			return displayCount.value || 0;
		});
		const restReady = ref(false);
		const itemPrefixCls = computed(() => `${props.prefixCls}-item`);
		const mergedRestWidth = computed(() => Math.max(prevRestWidth.value, restWidth.value));
		const data = computed(() => props.data ?? []);
		const isResponsive = computed(() => props.maxCount === RESPONSIVE);
		const shouldResponsive = computed(() => data.value.length && isResponsive.value);
		const invalidate = computed(() => props.maxCount === INVALIDATE);
		const showRest = computed(() => shouldResponsive.value || typeof props.maxCount === "number" && data.value.length > props.maxCount);
		const mergedData = computed(() => {
			let items = data.value;
			if (shouldResponsive.value) if (containerWidth.value === null && props.ssr === "full") items = data.value;
			else {
				const mergedItemWidth = props.itemWidth ?? 10;
				const maxLen = Math.min(data.value.length, mergedContainerWidth.value / mergedItemWidth);
				items = data.value.slice(0, Math.floor(maxLen));
			}
			else if (typeof props.maxCount === "number") items = data.value.slice(0, props.maxCount);
			return items;
		});
		const omittedItems = computed(() => {
			if (shouldResponsive.value) return data.value.slice(mergedDisplayCount.value + 1);
			return data.value.slice(mergedData.value.length);
		});
		const getKey = (item, index) => {
			const { itemKey } = props;
			if (typeof itemKey === "function") return itemKey(item);
			if (itemKey != null) return item?.[itemKey] ?? index;
			return index;
		};
		function updateDisplayCount(count, suffixFixedStartVal, notReady) {
			if (displayCount.value === count && (suffixFixedStartVal === void 0 || suffixFixedStartVal === suffixFixedStart.value)) return;
			displayCount.value = count;
			if (!notReady) {
				restReady.value = count < data.value.length - 1;
				props.onVisibleChange?.(count);
				emit("visibleChange", count);
			}
			if (suffixFixedStartVal !== void 0) suffixFixedStart.value = suffixFixedStartVal;
		}
		function onOverflowResize(_, element) {
			setContainerWidth(element.clientWidth);
		}
		function registerSize(key, width) {
			setItemWidths((origin) => {
				const clone = new Map(origin || []);
				if (width === null) clone.delete(key);
				else clone.set(key, width);
				return clone;
			});
		}
		function registerOverflowSize(_, width) {
			setRestWidth(width ?? 0);
			setPrevRestWidth(restWidth.value);
		}
		function registerPrefixSize(_, width) {
			setPrefixWidth(width ?? 0);
		}
		function registerSuffixSize(_, width) {
			setSuffixWidth(width ?? 0);
		}
		function getItemWidth(index) {
			const key = getKey(mergedData.value[index], index);
			return itemWidths.value?.get(key);
		}
		watchEffect(() => {
			const container = mergedContainerWidth.value;
			const rest = mergedRestWidth.value;
			const list = mergedData.value;
			if (container && typeof rest === "number" && list) {
				let totalWidth = prefixWidth.value + suffixWidth.value;
				const len = list.length;
				const lastIndex = len - 1;
				if (!len) {
					updateDisplayCount(0, null);
					return;
				}
				for (let i = 0; i < len; i += 1) {
					let currentItemWidth = getItemWidth(i);
					if (props.ssr === "full") currentItemWidth = currentItemWidth || 0;
					if (currentItemWidth === void 0) {
						updateDisplayCount(i - 1, void 0, true);
						break;
					}
					totalWidth += currentItemWidth;
					if (lastIndex === 0 && totalWidth <= container || i === lastIndex - 1 && totalWidth + getItemWidth(lastIndex) <= container) {
						updateDisplayCount(lastIndex, null);
						break;
					} else if (totalWidth + rest > container) {
						updateDisplayCount(i - 1, totalWidth - currentItemWidth - suffixWidth.value + restWidth.value);
						break;
					}
				}
				if ((props.suffix ?? slots.suffix?.()) && getItemWidth(0) + suffixWidth.value > container) suffixFixedStart.value = null;
			}
		}, { flush: "post" });
		return () => {
			const { prefixCls = "vc-overflow", component: Component = "div", itemComponent } = props;
			const renderItem = slots?.renderItem ?? props?.renderItem;
			const renderRawItem = slots?.renderRawItem ?? props?.renderRawItem;
			const renderRest = slots?.renderRest ?? props?.renderRest;
			const renderRawRest = slots?.renderRawRest ?? props?.renderRawRest;
			let prefix = slots?.prefix ?? props?.prefix;
			let suffix = slots?.suffix ?? props?.suffix;
			if (typeof prefix === "function") prefix = prefix();
			if (typeof suffix === "function") suffix = suffix();
			const displayRest = restReady.value && !!omittedItems.value.length;
			let suffixStyle = {};
			if (suffixFixedStart.value !== null && shouldResponsive.value) suffixStyle = {
				position: "absolute",
				left: `${suffixFixedStart.value}px`,
				top: 0
			};
			const itemSharedProps = {
				prefixCls: itemPrefixCls.value,
				responsive: shouldResponsive.value,
				component: itemComponent,
				invalidate: invalidate.value
			};
			const internalRenderItemNode = (item, index) => {
				const key = getKey(item, index);
				if (renderRawItem) {
					let _slot;
					return createVNode(OverflowContextProvider, {
						"key": key,
						"value": {
							...itemSharedProps,
							order: index,
							item,
							itemKey: key,
							registerSize,
							display: index <= mergedDisplayCount.value
						}
					}, _isSlot(_slot = renderRawItem(item, index)) ? _slot : { default: () => [_slot] });
				}
				return createVNode(Item_default, mergeProps(itemSharedProps, {
					"order": index,
					"key": key,
					"item": item,
					"renderItem": renderItem,
					"itemKey": key,
					"registerSize": registerSize,
					"display": index <= mergedDisplayCount.value
				}), null);
			};
			const restContextProps = {
				order: displayRest ? mergedDisplayCount.value : Number.MAX_SAFE_INTEGER,
				class: `${itemPrefixCls.value}-rest`,
				registerSize: registerOverflowSize,
				display: displayRest
			};
			const mergedRenderRestFn = renderRest ?? defaultRenderRest;
			const restNode = () => {
				if (renderRawRest) {
					let _slot2;
					return createVNode(OverflowContextProvider, { "value": {
						...itemSharedProps,
						...restContextProps
					} }, _isSlot(_slot2 = renderRawRest(omittedItems.value)) ? _slot2 : { default: () => [_slot2] });
				}
				return createVNode(Item_default, mergeProps(itemSharedProps, restContextProps), { default: () => typeof mergedRenderRestFn === "function" ? mergedRenderRestFn(omittedItems.value) : mergedRenderRestFn });
			};
			const { class: classAttr, style: styleAttr, ...restAttrs } = attrs;
			const overflowNode = createVNode(Component, mergeProps({
				"class": classNames(!invalidate.value && prefixCls, classAttr),
				"style": styleAttr
			}, restAttrs), { default: () => [
				prefix && createVNode(Item_default, mergeProps(itemSharedProps, {
					"responsive": isResponsive.value,
					"responsiveDisabled": !shouldResponsive.value,
					"order": -1,
					"class": `${itemPrefixCls.value}-prefix`,
					"registerSize": registerPrefixSize,
					"display": true
				}), { default: () => prefix }),
				mergedData.value.map(internalRenderItemNode),
				showRest.value ? restNode() : null,
				suffix && createVNode(Item_default, mergeProps(itemSharedProps, {
					"responsive": isResponsive.value,
					"responsiveDisabled": !shouldResponsive.value,
					"order": mergedDisplayCount.value,
					"class": `${itemPrefixCls.value}-suffix`,
					"registerSize": registerSuffixSize,
					"display": true,
					"style": suffixStyle
				}), { default: () => suffix }),
				slots.default?.()
			] });
			return isResponsive.value ? createVNode(ResizeObserver, {
				"onResize": onOverflowResize,
				"disabled": !shouldResponsive.value
			}, _isSlot(overflowNode) ? overflowNode : { default: () => [overflowNode] }) : overflowNode;
		};
	}
});
Overflow.Item = RawItem_default;
Overflow.RESPONSIVE = RESPONSIVE;
Overflow.INVALIDATE = INVALIDATE;
var Overflow_default = Overflow;
export { Overflow_default as default };
