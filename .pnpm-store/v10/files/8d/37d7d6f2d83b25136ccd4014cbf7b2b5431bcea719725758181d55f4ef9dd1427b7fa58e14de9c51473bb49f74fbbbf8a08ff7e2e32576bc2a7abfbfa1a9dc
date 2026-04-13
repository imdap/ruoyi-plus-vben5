import { useBaseConfig } from "./context.js";
import empty_default from "../empty/index.js";
import { createVNode, defineComponent } from "vue";

//#region src/config-provider/defaultRenderEmpty.tsx
const DefaultRenderEmpty = /* @__PURE__ */ defineComponent((props) => {
	const { prefixCls } = useBaseConfig("empty");
	return () => {
		const { componentName } = props;
		const prefix = prefixCls.value;
		switch (componentName) {
			case "Table":
			case "List": return createVNode(empty_default, { "image": empty_default.PRESENTED_IMAGE_SIMPLE }, null);
			case "Select":
			case "TreeSelect":
			case "Cascader":
			case "Transfer":
			case "Mentions": return createVNode(empty_default, {
				"image": empty_default.PRESENTED_IMAGE_SIMPLE,
				"class": `${prefix}-small`
			}, null);
			case "Table.filter": return null;
			default: return createVNode(empty_default, null, null);
		}
	};
}, {
	props: { componentName: {
		type: String,
		required: false
	} },
	name: "ADefaultRenderEmpty",
	inheritAttrs: false
});

//#endregion
export { DefaultRenderEmpty };