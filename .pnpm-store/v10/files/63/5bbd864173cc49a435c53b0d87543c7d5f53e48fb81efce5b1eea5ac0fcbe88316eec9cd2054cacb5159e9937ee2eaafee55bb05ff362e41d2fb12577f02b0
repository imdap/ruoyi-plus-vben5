import { pureAttrs } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { omit } from "es-toolkit";
import { MenuItemGroup } from "@v-c/menu";

//#region src/menu/MenuItemGroup.tsx
const MenuItemGroup$1 = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	return () => {
		const title = getSlotPropsFnRun(slots, props, "title");
		return createVNode(MenuItemGroup, mergeProps(pureAttrs(attrs), omit(props, ["title"]), { "title": title }), { default: () => [slots?.default?.()] });
	};
}, {
	props: {
		title: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		eventKey: {
			type: String,
			required: false
		},
		warnKey: {
			type: Boolean,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false
		},
		class: {
			type: String,
			required: false
		}
	},
	name: "AMenuItemGroup",
	inheritAttrs: false
});
var MenuItemGroup_default = MenuItemGroup$1;

//#endregion
export { MenuItemGroup_default as default };