import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import style_default from "./style/index.js";
import { createVNode, defineComponent, mergeProps, resolveDynamicComponent, shallowRef } from "vue";
import { classNames } from "@v-c/util";

//#region src/typography/Typography.tsx
const Typography = /* @__PURE__ */ defineComponent((props, { slots, attrs, expose }) => {
	const { direction: contextDirection, prefixCls, style: contextStyle, class: contextClassName } = useComponentBaseConfig("typography", props);
	const { direction: typographyDirection } = toPropsRefs(props, "direction");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const elementRef = shallowRef();
	expose({ el: elementRef });
	return () => {
		const Component = resolveDynamicComponent(props.component || "article");
		const direction = typographyDirection.value || contextDirection.value;
		const { className, restAttrs, style } = getAttrStyleAndClass(attrs);
		const componentClassName = classNames(prefixCls.value, contextClassName.value, { [`${prefixCls.value}-rtl`]: direction === "rtl" }, props.rootClass, className, hashId.value, cssVarCls.value);
		const mergedStyle = {
			...contextStyle.value,
			...style
		};
		return createVNode(Component, mergeProps({
			"class": componentClassName,
			"style": mergedStyle,
			"ref": elementRef,
			"title": props.title
		}, restAttrs), { default: () => [slots.default?.()] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		component: { required: false },
		direction: {
			type: [String, null],
			required: false
		},
		title: {
			type: String,
			required: false
		}
	},
	name: "ATypography",
	inheritAttrs: false
});
var Typography_default = Typography;

//#endregion
export { Typography_default as default };