import { OverflowContextProvider, useInjectOverflowContext } from "./context.js";
import Item_default from "./Item.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";
var RawItem_default = /* @__PURE__ */ defineComponent({
	name: "OverflowRawItem",
	inheritAttrs: false,
	props: { component: {
		type: [
			String,
			Object,
			Function
		],
		default: "div"
	} },
	setup(props, { slots, attrs }) {
		const context = useInjectOverflowContext();
		return () => {
			if (!context?.value) return createVNode(props.component ?? "div", attrs, { default: () => [slots.default?.()] });
			const { className: contextClassName, ...restContext } = context.value;
			const { class: classAttr, ...restAttrs } = attrs;
			return createVNode(OverflowContextProvider, { "value": null }, { default: () => [createVNode(Item_default, mergeProps(restContext, restAttrs, {
				"class": classNames(contextClassName, classAttr),
				"component": props.component
			}), slots)] });
		};
	}
});
export { RawItem_default as default };
