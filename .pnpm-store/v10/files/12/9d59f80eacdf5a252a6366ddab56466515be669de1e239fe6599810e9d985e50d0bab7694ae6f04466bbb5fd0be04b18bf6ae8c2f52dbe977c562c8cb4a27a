import { useBaseConfig } from "../config-provider/context.js";
import { pureAttrs } from "../_util/hooks/useMergeSemantic.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { Divider } from "@v-c/menu";

//#region src/menu/MenuDivider.tsx
const MenuDivider = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const { prefixCls } = useBaseConfig("menu", props);
	return () => {
		const classString = clsx({ [`${prefixCls.value}-item-divider-dashed`]: !!props.dashed }, attrs.class);
		return createVNode(Divider, mergeProps({
			"class": classString,
			"style": attrs.style
		}, pureAttrs(attrs)), null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		dashed: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	name: "AMenuDivider",
	inheritAttrs: false
});
var MenuDivider_default = MenuDivider;

//#endregion
export { MenuDivider_default as default };