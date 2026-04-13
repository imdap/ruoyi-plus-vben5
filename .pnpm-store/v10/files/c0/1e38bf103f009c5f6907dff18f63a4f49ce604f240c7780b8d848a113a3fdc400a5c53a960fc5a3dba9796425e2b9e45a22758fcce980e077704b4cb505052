import { computed, createElementBlock, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, ref, unref, useSlots } from "vue";
import RenderComponent from "@v-c/util/dist/RenderComponent";
import { ensureValidVNode } from "@v-c/util/dist/vnode";
//#region src/TabPanelList/TabPane.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"id",
	"tabindex",
	"aria-labelledby",
	"aria-hidden"
];
var TabPane_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "TabPane",
	inheritAttrs: false,
	__name: "TabPane",
	props: {
		tab: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] },
		className: {},
		style: {},
		disabled: { type: Boolean },
		children: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] },
		forceRender: { type: Boolean },
		closable: { type: Boolean },
		closeIcon: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] },
		icon: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] },
		prefixCls: {},
		tabKey: {},
		id: {},
		animated: { type: Boolean },
		active: { type: Boolean },
		destroyOnHidden: { type: Boolean }
	},
	setup(__props) {
		const slots = useSlots();
		const childrenNode = computed(() => ensureValidVNode(slots.default?.() || []));
		const TabPaneRef = ref();
		const hasContent = computed(() => childrenNode.value && childrenNode.value?.length > 0);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				id: __props.id && `${__props.id}-panel-${__props.tabKey}`,
				ref_key: "TabPaneRef",
				ref: TabPaneRef,
				role: "tabpanel",
				tabindex: __props.active && hasContent.value ? 0 : -1,
				"aria-labelledby": __props.id && `${__props.id}-tab-${__props.tabKey}`,
				"aria-hidden": !__props.active,
				style: normalizeStyle(__props.style),
				class: normalizeClass([
					__props.prefixCls,
					__props.active && `${__props.prefixCls}-active`,
					__props.className
				])
			}, [createVNode(unref(RenderComponent), { render: childrenNode.value }, null, 8, ["render"])], 14, _hoisted_1);
		};
	}
});
//#endregion
export { TabPane_vue_vue_type_script_setup_true_lang_default as default };
