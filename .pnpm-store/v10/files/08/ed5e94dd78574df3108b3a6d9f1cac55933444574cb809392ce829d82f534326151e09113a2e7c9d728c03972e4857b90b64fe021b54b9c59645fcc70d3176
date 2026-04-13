import { useBaseConfig } from "../config-provider/context.js";
import { useBreadcrumbContext } from "./BreadcrumbContext.js";
import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/breadcrumb/BreadcrumbSeparator.tsx
const BreadcrumbSeparator = /* @__PURE__ */ defineComponent((_, { slots }) => {
	const { prefixCls } = useBaseConfig("breadcrumb");
	const breadcrumbContext = useBreadcrumbContext();
	return () => {
		const { classes: mergedClassNames, styles: mergedStyles } = breadcrumbContext.value;
		const children = filterEmpty(slots?.default?.() ?? []);
		return createVNode("li", {
			"class": clsx(`${prefixCls.value}-separator`, mergedClassNames?.separator),
			"style": mergedStyles?.separator
		}, [children.length === 1 ? children[0] === "" ? children : children[0] : children.length === 0 ? "/" : children]);
	};
}, {
	name: "ABreadcrumbSeparator",
	inheritAttrs: false
});
BreadcrumbSeparator.__ANT_BREADCRUMB_SEPARATOR = true;
var BreadcrumbSeparator_default = BreadcrumbSeparator;

//#endregion
export { BreadcrumbSeparator_default as default };