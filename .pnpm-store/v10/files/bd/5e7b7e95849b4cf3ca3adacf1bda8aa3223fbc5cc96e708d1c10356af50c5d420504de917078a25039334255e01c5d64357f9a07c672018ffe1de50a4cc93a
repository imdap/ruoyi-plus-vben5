import { filterEmpty } from "./props-util/index.js";
import { createVNode, defineComponent, isVNode } from "vue";
function checkIsBaseType(value) {
	if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return true;
	return typeof value === "undefined" || value === null;
}
var RenderComponent_default = defineComponent((props, { attrs }) => {
	return () => {
		const render$1 = props.render;
		if (render$1 && typeof render$1 === "function") {
			const _render = render$1?.();
			if (Array.isArray(_render)) return filterEmpty(_render).map((v) => {
				if (isVNode(v)) return createVNode(v, { ...attrs });
				else return v;
			});
			return _render;
		} else if (Array.isArray(render$1)) return filterEmpty(render$1).map((v) => {
			if (isVNode(v)) return createVNode(v, { ...attrs });
			return v;
		});
		else if (checkIsBaseType(render$1)) return render$1;
		if (isVNode(render$1)) return createVNode(render$1, { ...attrs });
		return render$1;
	};
}, {
	inheritAttrs: false,
	name: "RenderComponent",
	props: ["render"]
});
export { RenderComponent_default as default };
