import useBaseProps from "../../hooks/useBaseProps.js";
import { useSelectInputContext } from "../context.js";
import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var Placeholder_default = /* @__PURE__ */ defineComponent((props) => {
	const selectInputContext = useSelectInputContext();
	const baseProps = useBaseProps();
	return () => {
		const { prefixCls, placeholder, displayValues } = selectInputContext.value ?? {};
		const { classNames, styles } = baseProps.value ?? {};
		const { show = true } = props;
		if (displayValues?.length) return null;
		return createVNode("div", {
			"class": clsx(`${prefixCls}-placeholder`, classNames?.placeholder),
			"style": {
				visibility: show ? "visible" : "hidden",
				...styles?.placeholder
			}
		}, [placeholder]);
	};
}, {
	props: { show: {
		type: Boolean,
		required: false,
		default: void 0
	} },
	name: "Placeholder",
	inheritAttrs: false
});
export { Placeholder_default as default };
