import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import Element_default from "./Element.js";
import style_default from "./style/index.js";
import { createVNode, defineComponent, mergeDefaults, mergeProps, toRef } from "vue";
import { classNames } from "@v-c/util";

//#region src/skeleton/Input.tsx
const SkeletonInput = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const { prefixCls, class: contextClassName, style: contextStyle } = useComponentBaseConfig("skeleton", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedSize = useSize(toRef(props, "size"));
	return () => {
		const { active, rootClass, block, classes, styles } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const cls = classNames(prefixCls.value, `${prefixCls.value}-element`, {
			[`${prefixCls.value}-active`]: active,
			[`${prefixCls.value}-block`]: block
		}, classes?.root, rootClass, hashId.value, cssVarCls.value, contextClassName.value, className);
		return createVNode("div", mergeProps(restAttrs, {
			"class": cls,
			"style": [styles?.root, contextStyle.value]
		}), [createVNode(Element_default, {
			"prefixCls": `${prefixCls.value}-input`,
			"size": mergedSize.value,
			"class": classes?.content,
			"style": [styles?.content, style]
		}, null)]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		size: {
			type: [String, null],
			required: false
		},
		block: {
			type: Boolean,
			required: false,
			default: void 0
		},
		active: {
			type: Boolean,
			required: false,
			default: void 0
		},
		classes: {
			type: Object,
			required: false
		},
		styles: {
			type: Object,
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
	}, {}),
	name: "ASkeletonInput",
	inheritAttrs: false
});
var Input_default = SkeletonInput;

//#endregion
export { Input_default as default };