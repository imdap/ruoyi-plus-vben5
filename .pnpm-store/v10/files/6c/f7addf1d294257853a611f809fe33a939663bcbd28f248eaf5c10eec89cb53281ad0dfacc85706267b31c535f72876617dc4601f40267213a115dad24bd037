import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import style_default from "./style/index.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";

//#region src/skeleton/Node.tsx
const SkeletonNode = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const { prefixCls, class: contextClassName, style: contextStyle } = useComponentBaseConfig("skeleton", props);
	const [hashId, cssVarCls] = style_default(prefixCls);
	return () => {
		const { active, rootClass, internalClassName, classes, styles } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const cls = classNames(prefixCls.value, `${prefixCls.value}-element`, { [`${prefixCls.value}-active`]: active }, hashId.value, classes?.root, rootClass, cssVarCls.value, contextClassName.value, className);
		return createVNode("div", mergeProps(restAttrs, {
			"class": cls,
			"style": [styles?.root, contextStyle.value]
		}), [createVNode("div", {
			"class": classNames(internalClassName || `${prefixCls.value}-node`, classes?.content),
			"style": [styles?.content, style]
		}, [slots.default?.()])]);
	};
}, {
	props: {
		fullSize: {
			type: Boolean,
			required: false,
			default: void 0
		},
		internalClassName: {
			type: String,
			required: false
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
	},
	name: "ASkeletonNode",
	inheritAttrs: false
});
var Node_default = SkeletonNode;

//#endregion
export { Node_default as default };