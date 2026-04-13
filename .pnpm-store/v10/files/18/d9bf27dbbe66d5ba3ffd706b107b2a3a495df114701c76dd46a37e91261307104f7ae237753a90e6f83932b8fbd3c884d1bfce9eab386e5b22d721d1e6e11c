import { provideTabContext } from "./TabContext.js";
import useAnimateConfig from "./hooks/useAnimateConfig.js";
import { getUUid, setUUid } from "./utils.js";
import Wrapper_default from "./TabNavList/Wrapper.js";
import TabPanelList_default from "./TabPanelList/index.js";
import { computed, createElementBlock, createVNode, defineComponent, mergeProps, nextTick, onMounted, openBlock, ref, toRefs, unref, watch } from "vue";
import { clsx } from "@v-c/util";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
import isMobile from "@v-c/util/dist/isMobile";
import omit from "@v-c/util/dist/omit";
//#region src/Tabs.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["id"];
var Tabs_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "Tabs",
	__name: "Tabs",
	props: {
		prefixCls: { default: "vc-tabs" },
		className: {},
		style: {},
		classNames: {},
		styles: {},
		id: {},
		items: {},
		activeKey: {},
		defaultActiveKey: {},
		direction: {},
		animated: {
			type: [Boolean, Object],
			default: void 0
		},
		renderTabBar: {},
		tabBarExtraContent: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] },
		tabBarGutter: {},
		tabBarStyle: {},
		tabPosition: { default: "top" },
		destroyOnHidden: {
			type: Boolean,
			default: void 0
		},
		onChange: {},
		onTabClick: {},
		onTabScroll: {},
		editable: {},
		getPopupContainer: {},
		locale: {},
		more: {},
		popupClassName: {},
		indicator: {}
	},
	setup(__props) {
		const props = __props;
		const { id, items, direction, defaultActiveKey, tabPosition, editable, locale, tabBarGutter, more, animated, styles, prefixCls, className, activeKey, tabBarStyle, tabBarExtraContent, destroyOnHidden, renderTabBar, onChange, onTabClick, onTabScroll, getPopupContainer, popupClassName, indicator, classNames: tabsClassNames } = toRefs(props);
		const restProps = computed(() => {
			return omit(props, [
				"id",
				"prefixCls",
				"className",
				"items",
				"direction",
				"activeKey",
				"defaultActiveKey",
				"editable",
				"animated",
				"tabPosition",
				"tabBarGutter",
				"tabBarStyle",
				"tabBarExtraContent",
				"locale",
				"more",
				"destroyOnHidden",
				"renderTabBar",
				"onChange",
				"onTabClick",
				"onTabScroll",
				"getPopupContainer",
				"popupClassName",
				"indicator",
				"classNames",
				"styles"
			]);
		});
		const tabs = computed(() => (items.value || []).filter((item) => item && typeof item === "object" && "key" in item));
		const rtl = computed(() => direction.value === "rtl");
		const mergedAnimated = computed(() => useAnimateConfig(animated.value));
		const mobile = ref(false);
		onMounted(() => {
			mobile.value = isMobile();
		});
		const defaultKey = computed(() => defaultActiveKey.value ?? tabs.value[0]?.key);
		const [mergedActiveKey, setMergedActiveKey] = useMergedState("", {
			defaultValue: activeKey.value ?? defaultKey.value,
			value: activeKey
		});
		const activeIndex = ref(tabs.value.findIndex((item) => item.key === mergedActiveKey.value));
		watch([
			computed(() => tabs.value.map((tab) => tab.key).join("_")),
			mergedActiveKey,
			activeIndex
		], async () => {
			await nextTick();
			activeIndex.value = tabs.value.findIndex((item) => item.key === mergedActiveKey.value);
			let newActiveIndex = tabs.value.findIndex((tab) => tab.key === mergedActiveKey.value);
			if (newActiveIndex === -1) {
				newActiveIndex = Math.max(0, Math.min(activeIndex.value, tabs.value.length - 1));
				setMergedActiveKey(tabs.value[newActiveIndex]?.key);
			}
			activeIndex.value = newActiveIndex;
		}, { immediate: true });
		const [mergedId, setMergedId] = useMergedState(null, { value: id.value });
		onMounted(() => {
			const uuid = getUUid();
			setMergedId(`vc-tabs-${process.env.NODE_ENV === "test" ? "test" : uuid}`);
			setUUid(uuid + 1);
		});
		function onInternalTabClick(key, e) {
			onTabClick.value?.(key, e);
			const isActiveChanged = key !== mergedActiveKey.value;
			setMergedActiveKey(key);
			if (isActiveChanged) onChange.value?.(key);
		}
		const sharedProps = computed(() => ({
			id: mergedId.value,
			activeKey: mergedActiveKey.value,
			animated: mergedAnimated.value,
			tabPosition: tabPosition.value,
			rtl: rtl.value,
			mobile: mobile.value
		}));
		const tabNavBarProps = computed(() => {
			return {
				...sharedProps.value,
				editable: editable.value,
				locale: locale.value,
				more: more.value,
				tabBarGutter: tabBarGutter.value,
				onTabClick: onInternalTabClick,
				onTabScroll: onTabScroll.value,
				extra: tabBarExtraContent.value,
				style: tabBarStyle.value,
				getPopupContainer: getPopupContainer.value,
				popupClassName: clsx([popupClassName.value, tabsClassNames.value?.popup]),
				indicator: indicator.value,
				styles: styles.value,
				classNames: tabsClassNames.value
			};
		});
		const memoizedValue = computed(() => {
			return {
				tabs: tabs.value,
				prefixCls: prefixCls.value
			};
		});
		const tabRef = ref();
		provideTabContext(memoizedValue);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", mergeProps({
				id: unref(id),
				ref_key: "tabRef",
				ref: tabRef,
				class: [
					unref(prefixCls),
					`${unref(prefixCls)}-${unref(tabPosition)}`,
					{
						[`${unref(prefixCls)}-mobile`]: mobile.value,
						[`${unref(prefixCls)}-editable`]: unref(editable),
						[`${unref(prefixCls)}-rtl`]: rtl.value
					},
					unref(className)
				]
			}, restProps.value), [createVNode(Wrapper_default, mergeProps(tabNavBarProps.value, { "render-tab-bar": unref(renderTabBar) }), null, 16, ["render-tab-bar"]), createVNode(TabPanelList_default, mergeProps({ "destroy-on-hidden": unref(destroyOnHidden) }, sharedProps.value, {
				"content-style": unref(styles)?.content,
				"content-class-name": unref(tabsClassNames)?.content,
				animated: mergedAnimated.value
			}), null, 16, [
				"destroy-on-hidden",
				"content-style",
				"content-class-name",
				"animated"
			])], 16, _hoisted_1);
		};
	}
});
//#endregion
export { Tabs_vue_vue_type_script_setup_true_lang_default as default };
