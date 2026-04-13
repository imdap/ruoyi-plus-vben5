import { createTextVNode, createVNode, defineComponent } from "vue";

//#region src/steps/PanelArrow.tsx
const PanelArrow = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls } = props;
		return createVNode("svg", {
			"class": `${prefixCls}-panel-arrow`,
			"viewBox": "0 0 100 100",
			"xmlns": "http://www.w3.org/2000/svg",
			"preserveAspectRatio": "none"
		}, [createVNode("title", null, [createTextVNode("Arrow")]), createVNode("path", { "d": "M 0 0 L 100 50 L 0 100" }, null)]);
	};
}, {
	props: { prefixCls: {
		type: String,
		required: true
	} },
	name: "PanelArrow"
});
var PanelArrow_default = PanelArrow;

//#endregion
export { PanelArrow_default as default };