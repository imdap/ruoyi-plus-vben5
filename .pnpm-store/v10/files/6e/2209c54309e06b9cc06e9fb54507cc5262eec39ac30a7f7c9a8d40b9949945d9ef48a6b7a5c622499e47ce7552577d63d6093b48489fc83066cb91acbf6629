import { useBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import { createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";

//#region src/card/CardGrid.tsx
const CardGrid = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { prefixCls } = useBaseConfig("card", props);
	return () => {
		const prefix = `${prefixCls.value}-grid`;
		const { className, restAttrs, style } = getAttrStyleAndClass(attrs);
		const classString = clsx(prefix, className, { [`${prefix}-hoverable`]: props.hoverable });
		return createVNode("div", mergeProps(restAttrs, {
			"class": classString,
			"style": style
		}), [slots?.default?.()]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false
		},
		hoverable: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, { hoverable: true }),
	name: "ACardGrid",
	inheritAttrs: false
});
var CardGrid_default = CardGrid;

//#endregion
export { CardGrid_default as default };