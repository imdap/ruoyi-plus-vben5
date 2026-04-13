import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useFormItemInputContext, useFormItemInputContextProvider } from "../form/context.js";
import style_default, { useSharedStyle } from "./style/index.js";
import { SpaceCompact } from "../space/index.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";

//#region src/input/Group.tsx
const InputGroup = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	if (isDev) devUseWarning("Input.Group").deprecated(false, "Input.Group", "Space.Compact");
	const { getPrefixCls, direction } = useComponentBaseConfig("input", props);
	const prefixCls = computed(() => getPrefixCls("input-group", props.prefixCls));
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = useSharedStyle(prefixCls, computed(() => props.rootClass));
	style_default(prefixCls, rootCls);
	const formItemContext = useFormItemInputContext();
	useFormItemInputContextProvider(computed(() => ({
		...formItemContext.value,
		isFormItemInput: false
	})));
	const { style, restAttrs } = getAttrStyleAndClass(attrs);
	const cls = clsx(prefixCls.value, cssVarCls.value, hashId.value, {
		[`${prefixCls.value}-rtl`]: direction.value === "rtl",
		[`${prefixCls.value}-lg`]: props.size === "large",
		[`${prefixCls.value}-sm`]: props.size === "small",
		[`${prefixCls.value}-compact`]: true
	}, props.rootClass, attrs.class);
	return createVNode(SpaceCompact, mergeProps(restAttrs, {
		"class": cls,
		"style": style,
		"size": props.size
	}), { default: () => [slots.default?.()] });
}, {
	props: {
		size: {
			type: [String, null],
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	},
	name: "AInputGroup",
	inheritAttrs: false
});
var Group_default = InputGroup;

//#endregion
export { Group_default as default };