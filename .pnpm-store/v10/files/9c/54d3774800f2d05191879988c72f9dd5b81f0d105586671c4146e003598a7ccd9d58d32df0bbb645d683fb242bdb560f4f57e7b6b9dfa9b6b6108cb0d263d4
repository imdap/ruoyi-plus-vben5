import { createCommentVNode, createElementBlock, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, ref, toRefs, unref } from "vue";
import { RenderComponent } from "@v-c/util";
//#region src/TabNavList/AddButton.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = ["aria-label"];
var AddButton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "AddButton",
	inheritAttrs: false,
	__name: "AddButton",
	props: {
		prefixCls: {},
		editable: {},
		locale: {},
		style: {}
	},
	setup(__props, { expose: __expose }) {
		const { prefixCls, editable, locale, style } = toRefs(__props);
		const buttonRef = ref();
		function handleClick(event) {
			editable.value?.onEdit("add", { event });
		}
		__expose({ buttonRef });
		return (_ctx, _cache) => {
			return unref(editable) && unref(editable).showAdd !== false ? (openBlock(), createElementBlock("button", {
				key: 0,
				ref_key: "buttonRef",
				ref: buttonRef,
				type: "button",
				class: normalizeClass(`${unref(prefixCls)}-nav-add`),
				style: normalizeStyle(unref(style)),
				"aria-label": unref(locale)?.addAriaLabel || "Add tab",
				onClick: handleClick
			}, [createVNode(unref(RenderComponent), { render: unref(editable).addIcon || "+" }, null, 8, ["render"])], 14, _hoisted_1)) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { AddButton_vue_vue_type_script_setup_true_lang_default as default };
