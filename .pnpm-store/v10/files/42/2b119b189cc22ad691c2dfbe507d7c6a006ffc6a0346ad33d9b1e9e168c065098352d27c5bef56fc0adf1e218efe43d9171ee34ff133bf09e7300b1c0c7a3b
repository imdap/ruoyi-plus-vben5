import { createVNode, defineComponent } from "vue";
//#region src/Footer/Row.tsx
var FooterRow = /* @__PURE__ */ defineComponent({
	name: "TableFooterRow",
	props: [
		"className",
		"style",
		"onClick"
	],
	setup(props, { slots }) {
		return () => createVNode("tr", {
			"class": props.className,
			"style": props.style,
			"onClick": props.onClick
		}, [slots.default?.()]);
	}
});
//#endregion
export { FooterRow as default };
