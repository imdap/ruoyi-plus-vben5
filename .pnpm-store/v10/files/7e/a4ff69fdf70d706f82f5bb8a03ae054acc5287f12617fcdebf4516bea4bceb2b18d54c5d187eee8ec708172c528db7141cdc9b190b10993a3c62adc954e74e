import { computed, createCommentVNode, createElementBlock, createVNode, defineComponent, isVNode, normalizeClass, openBlock, ref, toRefs, unref } from "vue";
import RenderComponent from "@v-c/util/dist/RenderComponent";
import { ensureValidVNode } from "@v-c/util/dist/vnode";
//#region src/TabNavList/ExtraContent.vue?vue&type=script&setup=true&lang.ts
var ExtraContent_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "ExtraContent",
	props: {
		position: {},
		prefixCls: {},
		extra: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] }
	},
	setup(__props, { expose: __expose }) {
		const { position, prefixCls, extra } = toRefs(__props);
		const extraContentRef = ref();
		const isValidExtra = computed(() => {
			if (typeof extra.value === "object" && isVNode(extra.value) && ensureValidVNode(Array.isArray(extra.value) ? extra.value : [extra.value])) return true;
			if ([
				"string",
				"number",
				"boolean",
				"object"
			].includes(typeof extra.value)) return true;
			return false;
		});
		const childrenNodes = computed(() => {
			if (!extra.value) return null;
			let assertExtra = {};
			if (typeof extra.value === "object" && !isVNode(extra.value)) assertExtra = extra.value;
			else assertExtra.right = extra.value;
			return position.value === "right" ? assertExtra.right : assertExtra.left;
		});
		__expose({ extraContentRef });
		return (_ctx, _cache) => {
			return isValidExtra.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				ref_key: "extraContentRef",
				ref: extraContentRef,
				class: normalizeClass([`${unref(prefixCls)}-extra-content`])
			}, [createVNode(unref(RenderComponent), { render: childrenNodes.value }, null, 8, ["render"])], 2)) : createCommentVNode("", true);
		};
	}
});
//#endregion
export { ExtraContent_vue_vue_type_script_setup_true_lang_default as default };
