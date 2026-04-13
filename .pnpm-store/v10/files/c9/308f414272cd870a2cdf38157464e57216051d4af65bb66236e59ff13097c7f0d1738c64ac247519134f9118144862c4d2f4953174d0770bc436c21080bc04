import { createVNode, defineComponent } from "vue";
var Palette_default = /* @__PURE__ */ defineComponent({
	props: { prefixCls: String },
	inheritAttrs: false,
	setup(props, { attrs, slots }) {
		return () => {
			const { prefixCls } = props;
			return createVNode("div", {
				"class": `${prefixCls}-palette`,
				"style": {
					position: "relative",
					...attrs.style
				}
			}, [slots.default?.()]);
		};
	}
});
export { Palette_default as default };
