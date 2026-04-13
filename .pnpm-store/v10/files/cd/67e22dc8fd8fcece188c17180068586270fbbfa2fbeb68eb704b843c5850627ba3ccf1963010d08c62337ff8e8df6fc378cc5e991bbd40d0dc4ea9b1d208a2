import { useTabContext } from "../TabContext.js";
import TabPane_default from "./TabPane.js";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, mergeProps, normalizeClass, normalizeStyle, openBlock, renderList, toRefs, unref, vShow, withCtx, withDirectives } from "vue";
import RenderComponent from "@v-c/util/dist/RenderComponent";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
//#region src/TabPanelList/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	props: {
		activeKey: {},
		id: {},
		animated: {},
		tabPosition: {},
		destroyOnHidden: { type: Boolean },
		contentStyle: {},
		contentClassName: {}
	},
	setup(__props) {
		const { id, activeKey, animated, tabPosition, destroyOnHidden, contentStyle, contentClassName } = toRefs(__props);
		const ctx = useTabContext();
		const tabs = computed(() => ctx?.value.tabs || []);
		const prefixCls = computed(() => ctx?.value.prefixCls || "");
		const tabPaneAnimated = computed(() => animated.value?.tabPane === true);
		const tabPanePrefixCls = computed(() => `${prefixCls.value}-tabpane`);
		const transitionProps = computed(() => {
			if (!tabPaneAnimated.value) return {};
			if (animated.value?.tabPaneMotion) return animated.value.tabPaneMotion;
			return getTransitionProps(tabPanePrefixCls.value);
		});
		function shouldDestroyOnHidden(item) {
			return !!(!item.forceRender && (destroyOnHidden.value ?? item.destroyOnHidden) === true);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass([`${prefixCls.value}-content-holder`]) }, [createElementVNode("div", { class: normalizeClass([
				`${prefixCls.value}-content`,
				`${prefixCls.value}-content-${unref(tabPosition)}`,
				{ [`${prefixCls.value}-content-animated`]: tabPaneAnimated.value }
			]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (item) => {
				return openBlock(), createElementBlock(Fragment, { key: item.key }, [tabPaneAnimated.value ? (openBlock(), createBlock(Transition, mergeProps({
					key: 0,
					ref_for: true
				}, transitionProps.value), {
					default: withCtx(() => [(shouldDestroyOnHidden(item) ? item.key === unref(activeKey) : true) ? withDirectives((openBlock(), createBlock(TabPane_default, {
						key: 0,
						id: unref(id),
						"prefix-cls": tabPanePrefixCls.value,
						"tab-key": item.key,
						animated: tabPaneAnimated.value,
						active: item.key === unref(activeKey),
						style: normalizeStyle({
							...unref(contentStyle) || {},
							...item.style || {}
						}),
						"class-name": [
							unref(contentClassName),
							item.className,
							item.key !== unref(activeKey) && `${tabPanePrefixCls.value}-hidden`
						]
					}, {
						default: withCtx(() => [createVNode(unref(RenderComponent), { render: item.children }, null, 8, ["render"])]),
						_: 2
					}, 1032, [
						"id",
						"prefix-cls",
						"tab-key",
						"animated",
						"active",
						"style",
						"class-name"
					])), [[vShow, shouldDestroyOnHidden(item) ? true : item.key === unref(activeKey) || item.forceRender]]) : createCommentVNode("", true)]),
					_: 2
				}, 1040)) : createCommentVNode("", true), !tabPaneAnimated.value && (shouldDestroyOnHidden(item) ? item.key === unref(activeKey) : true) ? withDirectives((openBlock(), createBlock(TabPane_default, {
					key: 1,
					id: unref(id),
					"prefix-cls": tabPanePrefixCls.value,
					"tab-key": item.key,
					animated: tabPaneAnimated.value,
					active: item.key === unref(activeKey),
					style: normalizeStyle({
						...unref(contentStyle) || {},
						...item.style || {}
					}),
					"class-name": [
						unref(contentClassName),
						item.className,
						item.key !== unref(activeKey) && `${tabPanePrefixCls.value}-hidden`
					]
				}, {
					default: withCtx(() => [createVNode(unref(RenderComponent), { render: item.children }, null, 8, ["render"])]),
					_: 2
				}, 1032, [
					"id",
					"prefix-cls",
					"tab-key",
					"animated",
					"active",
					"style",
					"class-name"
				])), [[vShow, shouldDestroyOnHidden(item) ? true : item.key === unref(activeKey) || item.forceRender]]) : createCommentVNode("", true)], 64);
			}), 128))], 2)], 2);
		};
	}
});
//#endregion
export { index_vue_vue_type_script_setup_true_lang_default as default };
