import { useBaseConfig } from "../config-provider/context.js";
import { useCompactItemContext } from "./Compact.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import { getStatusClassNames } from "../_util/statusUtils.js";
import addon_default from "./style/addon.js";
import { createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";

//#region src/space/Addon.tsx
const SpaceAddon = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls, direction: directionConfig } = useBaseConfig("space-addon", props);
	const [hashId, cssVarCls] = addon_default(prefixCls);
	const { compactItemClassnames, compactSize } = useCompactItemContext(prefixCls, directionConfig);
	return () => {
		const { status, variant, disabled } = props;
		const statusCls = getStatusClassNames(prefixCls.value, status);
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const classes = clsx(prefixCls.value, hashId.value, compactItemClassnames.value, cssVarCls.value, `${prefixCls.value}-variant-${variant}`, statusCls, {
			[`${prefixCls.value}-${compactSize.value}`]: compactSize.value,
			[`${prefixCls.value}-disabled`]: disabled
		}, className);
		return createVNode("div", mergeProps({
			"class": classes,
			"style": style
		}, restAttrs), [slots?.default?.()]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false
		},
		variant: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
		}
	}, { variant: "outlined" }),
	name: "ASpaceAddon",
	inheritAttrs: false
});
var Addon_default = SpaceAddon;

//#endregion
export { Addon_default as default };