import { useTabContext } from "../TabContext.js";
import useIndicator from "../hooks/useIndicator.js";
import useOffsets from "../hooks/useOffsets.js";
import useTouchMove from "../hooks/useTouchMove.js";
import useVisibleRange from "../hooks/useVisibleRange.js";
import { genDataNodeKey } from "../utils.js";
import AddButton_default from "./AddButton.js";
import ExtraContent_default from "./ExtraContent.js";
import OperationNode_default from "./OperationNode.js";
import TabNode_default from "./TabNode.js";
import { Fragment, computed, createBlock, createElementVNode, createVNode, defineComponent, h, mergeProps, nextTick, normalizeClass, normalizeStyle, onUnmounted, openBlock, ref, shallowRef, toRefs, unref, useSlots, watch, withCtx } from "vue";
import RenderComponent from "@v-c/util/dist/RenderComponent";
import ResizeObserver from "@v-c/resize-observer";
//#region src/TabNavList/index.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-orientation"];
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "TabNavList",
	inheritAttrs: false,
	__name: "index",
	props: {
		id: {},
		tabPosition: {},
		activeKey: {},
		rtl: { type: Boolean },
		animated: {},
		extra: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] },
		editable: {},
		more: {},
		mobile: { type: Boolean },
		tabBarGutter: {},
		renderTabBar: { type: Function },
		className: {},
		style: {},
		locale: {},
		onTabClick: { type: Function },
		onTabScroll: { type: Function },
		children: { type: Function },
		getPopupContainer: { type: Function },
		popupClassName: {},
		indicator: {},
		classNames: {},
		styles: {}
	},
	setup(__props) {
		const props = __props;
		const { className, style, id, animated, activeKey, rtl, extra, editable, locale, tabPosition, tabBarGutter: tabBarGutterProp, children, onTabClick, onTabScroll, indicator, classNames: tabsClassNames, styles, mobile, more, getPopupContainer, popupClassName } = toRefs(props);
		const tabBarGutter = computed(() => tabBarGutterProp.value ? `${tabBarGutterProp.value}px` : void 0);
		const slots = useSlots();
		const defaultSlotWrapper = computed(() => {
			if (!slots.default) return void 0;
			return (node) => {
				const slotResult = slots.default?.(node);
				if (!slotResult) return node;
				if (Array.isArray(slotResult)) return slotResult.length ? h(Fragment, null, slotResult) : node;
				return slotResult;
			};
		});
		const renderWrapper = computed(() => children.value ?? defaultSlotWrapper.value);
		const ctx = useTabContext();
		const tabs = computed(() => ctx?.value.tabs || []);
		const prefixCls = computed(() => ctx?.value.prefixCls || "");
		const containerRef = ref(null);
		const extraLeftRef = ref(null);
		const extraRightRef = ref(null);
		const tabsWrapperRef = ref(null);
		const tabListRef = ref(null);
		const tabPositionTopOrBottom = computed(() => tabPosition.value === "top" || tabPosition.value === "bottom");
		const transformLeft = ref(0);
		const transformTop = ref(0);
		watch(transformLeft, (next, prev) => {
			if (tabPositionTopOrBottom.value && onTabScroll) props.onTabScroll?.({ direction: next > (prev || 0) ? "left" : "right" });
		}, { immediate: true });
		watch(transformTop, (next, prev) => {
			if (!tabPositionTopOrBottom.value && onTabScroll) props.onTabScroll?.({ direction: next > (prev || 0) ? "top" : "bottom" });
		}, { immediate: true });
		const containerExcludeExtraSize = ref([0, 0]);
		const tabContentSize = ref([0, 0]);
		const firstTabContentSize = computed(() => tabContentSize.value[0]);
		const addSize = ref([0, 0]);
		const operationSize = ref([0, 0]);
		const tabSizes = shallowRef(/* @__PURE__ */ new Map());
		const tabOffsets = useOffsets(tabs, tabSizes, firstTabContentSize);
		const operationsRef = ref(null);
		const innerAddButtonRef = ref(null);
		/**
		* Convert `SizeInfo` to unit value. Such as [123, 456] with `top` position get `123`
		*/
		function getUnitValue(size, tabPositionTopOrBottom) {
			return size[tabPositionTopOrBottom ? 0 : 1];
		}
		const containerExcludeExtraSizeValue = computed(() => getUnitValue(containerExcludeExtraSize.value, tabPositionTopOrBottom.value));
		const tabContentSizeValue = computed(() => getUnitValue(tabContentSize.value, tabPositionTopOrBottom.value));
		const addSizeValue = computed(() => getUnitValue(addSize.value, tabPositionTopOrBottom.value));
		const operationSizeValue = computed(() => getUnitValue(operationSize.value, tabPositionTopOrBottom.value));
		const needScroll = computed(() => Math.floor(containerExcludeExtraSizeValue.value) < Math.floor(tabContentSizeValue.value + addSizeValue.value));
		const visibleTabContentValue = computed(() => needScroll.value ? containerExcludeExtraSizeValue.value - operationSizeValue.value : containerExcludeExtraSizeValue.value - addSizeValue.value);
		const operationsHiddenClassName = computed(() => `${prefixCls.value}-nav-operations-hidden`);
		const transformComputed = computed(() => {
			let transformMin = 0;
			let transformMax = 0;
			if (!tabPositionTopOrBottom.value) {
				transformMin = Math.min(0, visibleTabContentValue.value - tabContentSizeValue.value);
				transformMax = 0;
			} else if (rtl.value) {
				transformMin = 0;
				transformMax = Math.max(0, tabContentSizeValue.value - visibleTabContentValue.value);
			} else {
				transformMin = Math.min(0, visibleTabContentValue.value - tabContentSizeValue.value);
				transformMax = 0;
			}
			return {
				transformMin,
				transformMax
			};
		});
		function alignInRange(value) {
			const { transformMin, transformMax } = transformComputed.value;
			if (value < transformMin) return transformMin;
			if (value > transformMax) return transformMax;
			return value;
		}
		const touchMovingRef = ref(null);
		const lockAnimation = ref();
		function doLockAnimation() {
			lockAnimation.value = Date.now();
		}
		function clearTouchMoving() {
			if (touchMovingRef.value) clearTimeout(touchMovingRef.value);
		}
		useTouchMove(tabsWrapperRef, (offsetX, offsetY) => {
			function doMove(dataRef, offset) {
				dataRef.value = alignInRange(dataRef.value + offset);
			}
			if (!needScroll.value) return false;
			if (tabPositionTopOrBottom.value) doMove(transformLeft, offsetX);
			else doMove(transformTop, offsetY);
			clearTouchMoving();
			doLockAnimation();
			return true;
		});
		watch(() => lockAnimation.value, async (_n, _o, onCleanup) => {
			await nextTick();
			if (lockAnimation.value) touchMovingRef.value = setTimeout(() => {
				lockAnimation.value = 0;
			}, 100);
			onCleanup(() => {
				clearTouchMoving();
			});
		}, { immediate: true });
		onUnmounted(() => {
			clearTouchMoving();
		});
		const visibleRangeRef = useVisibleRange(tabOffsets, visibleTabContentValue, computed(() => tabPositionTopOrBottom.value ? transformLeft.value : transformTop.value), tabContentSizeValue, addSizeValue, operationSizeValue, {
			tabs,
			tabPosition,
			rtl
		});
		const visibleStart = computed(() => visibleRangeRef.value[0]);
		const visibleEnd = computed(() => visibleRangeRef.value[1]);
		const hiddenTabs = computed(() => {
			const startHidden = tabs.value.slice(0, visibleStart.value);
			const endHidden = tabs.value.slice(visibleEnd.value + 1);
			return [...startHidden, ...endHidden];
		});
		const hasDropdown = computed(() => hiddenTabs.value.length > 0);
		const wrapPrefix = computed(() => `${prefixCls.value}-nav-wrap`);
		const pingLeft = computed(() => tabPositionTopOrBottom.value ? rtl.value ? transformLeft.value > 0 : transformLeft.value < 0 : false);
		const pingRight = computed(() => {
			if (!tabPositionTopOrBottom.value) return false;
			if (rtl.value) return transformLeft.value !== transformComputed.value.transformMax;
			return transformLeft.value !== transformComputed.value.transformMin;
		});
		const pingTop = computed(() => !tabPositionTopOrBottom.value ? transformTop.value < 0 : false);
		const pingBottom = computed(() => !tabPositionTopOrBottom.value ? transformTop.value !== transformComputed.value.transformMin : false);
		function scrollToTab(key = activeKey.value) {
			const tabOffset = tabOffsets.value.get(key) || {
				width: 0,
				height: 0,
				left: 0,
				right: 0,
				top: 0
			};
			if (tabPositionTopOrBottom.value) {
				const newTransform = transformLeft;
				if (rtl.value) {
					if (tabOffset.right < transformLeft.value) newTransform.value = tabOffset.right;
					else if (tabOffset.right + tabOffset.width > transformLeft.value + visibleTabContentValue.value) newTransform.value = tabOffset.right + tabOffset.width - visibleTabContentValue.value;
				} else if (tabOffset.left < -transformLeft.value) newTransform.value = -tabOffset.left;
				else if (tabOffset.left + tabOffset.width > -transformLeft.value + visibleTabContentValue.value) newTransform.value = -(tabOffset.left + tabOffset.width - visibleTabContentValue.value);
				transformTop.value = 0;
				transformLeft.value = alignInRange(newTransform.value);
			} else {
				const newTransform = transformTop;
				if (tabOffset.top < -transformTop.value) newTransform.value = -tabOffset.top;
				else if (tabOffset.top + tabOffset.height > -transformTop.value + visibleTabContentValue.value) newTransform.value = -(tabOffset.top + tabOffset.height - visibleTabContentValue.value);
				transformLeft.value = 0;
				transformTop.value = alignInRange(newTransform.value);
			}
		}
		const focusKey = ref();
		const isMouse = ref(false);
		const enabledTabs = computed(() => tabs.value.filter((tab) => !tab.disabled).map((tab) => tab.key));
		function onOffset(offset) {
			const enabledKeys = getEnabledKeys(tabs.value);
			const currentIndex = enabledKeys.indexOf(focusKey.value || activeKey.value);
			const len = enabledKeys.length;
			focusKey.value = enabledKeys[(currentIndex + offset + len) % len];
		}
		function handleRemoveTab(removalKey, e) {
			if (!removalKey) return;
			const removeTab = tabs.value.find((t) => t.key === removalKey);
			if (removeTab && !removeTab.disabled && (removeTab.closable || editable.value)) {
				e.preventDefault();
				e.stopPropagation();
				editable.value?.onEdit("remove", {
					key: removalKey,
					event: e
				});
				const enabledKeys = getEnabledKeys(tabs.value);
				if (enabledKeys.indexOf(removalKey) === enabledKeys.length - 1) onOffset(-1);
				else onOffset(1);
			}
		}
		function handleMouseDown(key, e) {
			isMouse.value = true;
			if (e.button === 1) handleRemoveTab(key, e);
		}
		function handleKeyDown(e) {
			const { code } = e;
			const isRTL = rtl.value && tabPositionTopOrBottom.value;
			const firstEnabledTab = enabledTabs.value[0];
			const lastEnabledTab = enabledTabs.value[enabledTabs.value.length - 1];
			switch (code) {
				case "ArrowLeft":
					if (tabPositionTopOrBottom.value) onOffset(isRTL ? 1 : -1);
					break;
				case "ArrowRight":
					if (tabPositionTopOrBottom.value) onOffset(isRTL ? -1 : 1);
					break;
				case "ArrowUp":
					e.preventDefault();
					if (!tabPositionTopOrBottom.value) onOffset(-1);
					break;
				case "ArrowDown":
					e.preventDefault();
					if (!tabPositionTopOrBottom.value) onOffset(1);
					break;
				case "Home":
					e.preventDefault();
					focusKey.value = firstEnabledTab;
					break;
				case "End":
					e.preventDefault();
					focusKey.value = lastEnabledTab;
					break;
				case "Enter":
				case "Space":
					e.preventDefault();
					props.onTabClick?.(focusKey.value ?? activeKey.value, e);
					break;
				case "Backspace":
				case "Delete":
					handleRemoveTab(focusKey.value, e);
					break;
			}
		}
		const isHorizontal = computed(() => tabPositionTopOrBottom.value);
		const navClass = computed(() => [
			`${prefixCls.value}-nav`,
			className.value,
			tabsClassNames.value?.header
		]);
		const navStyle = computed(() => ({
			...styles.value?.header || {},
			...style.value || {}
		}));
		const navListClass = computed(() => `${prefixCls.value}-nav-list`);
		function onItemClick(key, e) {
			onTabClick.value?.(key, e);
		}
		function getEnabledKeys(list) {
			return list.filter((t) => !t.disabled).map((t) => t.key);
		}
		function onItemBlur() {
			focusKey.value = void 0;
		}
		function onTabFocus(key) {
			if (!isMouse.value) focusKey.value = key;
			scrollToTab(key);
			doLockAnimation();
			const wrap = tabsWrapperRef.value;
			if (!wrap) return;
			if (!rtl.value) wrap.scrollLeft = 0;
			wrap.scrollTop = 0;
		}
		const inkStyle = useIndicator({
			activeTabOffset: computed(() => tabOffsets.value.get(activeKey.value)),
			horizontal: isHorizontal,
			indicator,
			rtl
		});
		function getTabSize(tab, containerRect) {
			const { offsetWidth, offsetHeight, offsetTop, offsetLeft } = tab;
			const { width, height, left, top } = tab.getBoundingClientRect();
			if (Math.abs(width - offsetWidth) < 1) return [
				width,
				height,
				left - containerRect.left,
				top - containerRect.top
			];
			return [
				offsetWidth,
				offsetHeight,
				offsetLeft,
				offsetTop
			];
		}
		function getSize(refObj) {
			const el = refObj.value;
			const { offsetWidth = 0, offsetHeight = 0 } = el || {};
			if (el) {
				const { width, height } = el.getBoundingClientRect();
				if (Math.abs(width - offsetWidth) < 1) return [width, height];
			}
			return [offsetWidth, offsetHeight];
		}
		function updateTabSizes() {
			tabSizes.value = (() => {
				const newSizes = /* @__PURE__ */ new Map();
				const listRect = tabListRef.value?.getBoundingClientRect?.();
				tabs.value.forEach(({ key }) => {
					const btnNode = tabListRef.value?.querySelector?.(`[data-node-key="${genDataNodeKey(key)}"]`);
					if (btnNode && listRect) {
						const [width, height, left, top] = getTabSize(btnNode, listRect);
						newSizes.set(key, {
							width,
							height,
							left,
							top
						});
					}
				});
				return newSizes;
			})();
		}
		function onListHolderResize() {
			const containerSize = getSize(containerRef);
			const extraLeftEl = extraLeftRef.value?.extraContentRef;
			const extraRightEl = extraRightRef.value?.extraContentRef;
			const extraLeftSize = extraLeftEl ? getSize({ value: extraLeftEl }) : [0, 0];
			const extraRightSize = extraRightEl ? getSize({ value: extraRightEl }) : [0, 0];
			containerExcludeExtraSize.value = [containerSize[0] - extraLeftSize[0] - extraRightSize[0], containerSize[1] - extraLeftSize[1] - extraRightSize[1]];
			const opEl = operationsRef.value?.operationNodeRef;
			operationSize.value = opEl ? getSize({ value: opEl }) : [0, 0];
			const tabListEl = tabListRef.value;
			const tabContentFullSize = tabListEl ? getSize({ value: tabListEl }) : [0, 0];
			const addEl = innerAddButtonRef.value?.buttonRef;
			addSize.value = addEl ? getSize({ value: addEl }) : [0, 0];
			tabContentSize.value = [tabContentFullSize[0] - addSize.value[0], tabContentFullSize[1] - addSize.value[1]];
			updateTabSizes();
		}
		watch(() => tabs.value.map((t) => t.key).join("_"), () => {
			nextTick(() => {
				updateTabSizes();
			});
		});
		watch([
			activeKey,
			() => transformComputed.value.transformMin,
			() => transformComputed.value.transformMax,
			visibleTabContentValue,
			tabOffsets
		], () => {
			scrollToTab();
		});
		watch(rtl, () => {
			onListHolderResize();
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(ResizeObserver), { onResize: onListHolderResize }, {
				default: withCtx(() => [createElementVNode("div", {
					ref_key: "containerRef",
					ref: containerRef,
					class: normalizeClass(navClass.value),
					style: normalizeStyle(navStyle.value),
					role: "tablist",
					"aria-orientation": isHorizontal.value ? "horizontal" : "vertical",
					onKeydown: _cache[0] || (_cache[0] = () => {
						doLockAnimation();
					})
				}, [
					createVNode(ExtraContent_default, {
						ref_key: "extraLeftRef",
						ref: extraLeftRef,
						position: "left",
						"prefix-cls": prefixCls.value,
						extra: unref(extra)
					}, null, 8, ["prefix-cls", "extra"]),
					createVNode(unref(ResizeObserver), { onResize: onListHolderResize }, {
						default: withCtx(() => [createElementVNode("div", {
							ref_key: "tabsWrapperRef",
							ref: tabsWrapperRef,
							class: normalizeClass([wrapPrefix.value, {
								[`${wrapPrefix.value}-ping-left`]: pingLeft.value,
								[`${wrapPrefix.value}-ping-right`]: pingRight.value,
								[`${wrapPrefix.value}-ping-top`]: pingTop.value,
								[`${wrapPrefix.value}-ping-bottom`]: pingBottom.value
							}])
						}, [createVNode(unref(ResizeObserver), { onResize: onListHolderResize }, {
							default: withCtx(() => [createElementVNode("div", {
								ref_key: "tabListRef",
								ref: tabListRef,
								class: normalizeClass(navListClass.value),
								style: normalizeStyle({
									transform: `translate(${transformLeft.value}px, ${transformTop.value}px)`,
									transition: lockAnimation.value ? "none" : void 0
								})
							}, [
								createVNode(unref(RenderComponent), { render: tabs.value.map((tab, i) => h(TabNode_default, {
									id: unref(id),
									prefixCls: prefixCls.value,
									key: tab.key,
									tab,
									className: unref(tabsClassNames)?.item,
									style: i === 0 ? unref(styles)?.item : {
										...isHorizontal.value ? { marginInlineStart: tabBarGutter.value } : { marginTop: tabBarGutter.value },
										...unref(styles)?.item || {}
									},
									closable: tab.closable,
									editable: unref(editable),
									active: tab.key === unref(activeKey),
									focus: tab.key === focusKey.value,
									renderWrapper: renderWrapper.value,
									removeAriaLabel: unref(locale)?.removeAriaLabel,
									tabCount: tabs.value.filter((t) => !t.disabled).length,
									currentPosition: i + 1,
									onClick: (e) => onItemClick(tab.key, e),
									onKeyDown: handleKeyDown,
									onFocus: () => onTabFocus(tab.key),
									onBlur: () => onItemBlur(),
									onMouseDown: (e) => handleMouseDown(tab.key, e),
									onMouseUp: () => {
										isMouse.value = false;
									}
								})) }, null, 8, ["render"]),
								createVNode(AddButton_default, {
									ref_key: "innerAddButtonRef",
									ref: innerAddButtonRef,
									"prefix-cls": prefixCls.value,
									locale: unref(locale),
									editable: unref(editable),
									style: normalizeStyle({
										...tabs.value.length === 0 ? {} : isHorizontal.value ? { marginInlineStart: tabBarGutter.value } : { marginTop: tabBarGutter.value },
										visibility: hasDropdown.value ? "hidden" : null
									})
								}, null, 8, [
									"prefix-cls",
									"locale",
									"editable",
									"style"
								]),
								createElementVNode("div", {
									class: normalizeClass([
										`${prefixCls.value}-ink-bar`,
										unref(tabsClassNames)?.indicator,
										{ [`${prefixCls.value}-ink-bar-animated`]: unref(animated)?.inkBar }
									]),
									style: normalizeStyle({
										...unref(styles)?.indicator || {},
										...unref(inkStyle)
									})
								}, null, 6)
							], 6)]),
							_: 1
						})], 2)]),
						_: 1
					}),
					createVNode(OperationNode_default, mergeProps({
						ref_key: "operationsRef",
						ref: operationsRef,
						"remove-aria-label": unref(locale)?.removeAriaLabel,
						"prefix-cls": prefixCls.value,
						tabs: hiddenTabs.value,
						"class-name": [unref(tabsClassNames)?.operations, !hasDropdown.value ? operationsHiddenClassName.value : void 0],
						"popup-style": unref(styles)?.popup,
						"tab-moving": !!lockAnimation.value
					}, {
						id: unref(id),
						rtl: unref(rtl),
						tabBarGutter: unref(tabBarGutterProp),
						activeKey: unref(activeKey),
						mobile: unref(mobile),
						more: unref(more),
						editable: unref(editable),
						locale: unref(locale),
						onTabClick: unref(onTabClick),
						getPopupContainer: unref(getPopupContainer),
						popupClassName: unref(popupClassName)
					}), null, 16, [
						"remove-aria-label",
						"prefix-cls",
						"tabs",
						"class-name",
						"popup-style",
						"tab-moving"
					]),
					createVNode(ExtraContent_default, {
						ref_key: "extraRightRef",
						ref: extraRightRef,
						position: "right",
						"prefix-cls": prefixCls.value,
						extra: unref(extra)
					}, null, 8, ["prefix-cls", "extra"])
				], 46, _hoisted_1)]),
				_: 1
			});
		};
	}
});
//#endregion
export { index_vue_vue_type_script_setup_true_lang_default as default };
