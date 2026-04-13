import { createVNode, defineComponent } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";
var Affix_default = /* @__PURE__ */ defineComponent((_, { attrs, slots }) => {
	return () => {
		const children = filterEmpty(slots?.default?.() ?? []);
		if (children.length < 1) return null;
		return createVNode("div", attrs, [children]);
	};
}, {
	name: "Affix",
	inheritAttrs: false
});
export { Affix_default as default };
