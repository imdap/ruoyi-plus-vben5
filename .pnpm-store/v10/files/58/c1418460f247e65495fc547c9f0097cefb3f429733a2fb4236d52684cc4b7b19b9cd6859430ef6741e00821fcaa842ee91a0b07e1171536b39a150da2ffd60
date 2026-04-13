import TabNavList_default from "./index.js";
import { computed, createBlock, defineComponent, h, openBlock, unref } from "vue";
import RenderComponent from "@v-c/util/dist/RenderComponent";
//#region src/TabNavList/Wrapper.vue?vue&type=script&setup=true&lang.ts
var Wrapper_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "TabNavListWrapper",
	inheritAttrs: false,
	__name: "Wrapper",
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
		style: {},
		locale: {},
		onTabClick: { type: Function },
		onTabScroll: { type: Function },
		getPopupContainer: { type: Function },
		popupClassName: {},
		indicator: {},
		classNames: {},
		styles: {},
		className: {},
		children: { type: Function }
	},
	setup(__props) {
		const props = __props;
		const renderNode = computed(() => {
			const restProps = { ...props };
			delete restProps.renderTabBar;
			if (props.renderTabBar) return props.renderTabBar(restProps, TabNavList_default);
			return h(TabNavList_default, restProps);
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RenderComponent), { render: renderNode.value }, null, 8, ["render"]);
		};
	}
});
//#endregion
export { Wrapper_vue_vue_type_script_setup_true_lang_default as default };
