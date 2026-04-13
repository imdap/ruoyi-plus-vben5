import { devUseWarning, isDev } from "../_util/warning.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import { createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";

//#region src/skeleton/Element.tsx
const Element = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	if (isDev) devUseWarning("Skeleton").deprecated(props.size !== "default", "size=\"default\"", "size=\"medium\"");
	return () => {
		const { prefixCls, size, shape, classes, styles } = props;
		const { className, style } = getAttrStyleAndClass(attrs);
		const sizeCls = classNames({
			[`${prefixCls}-lg`]: size === "large",
			[`${prefixCls}-sm`]: size === "small"
		});
		const shapeCls = classNames({
			[`${prefixCls}-circle`]: shape === "circle",
			[`${prefixCls}-square`]: shape === "square",
			[`${prefixCls}-round`]: shape === "round"
		});
		const sizeStyle = typeof size === "number" ? {
			width: size,
			height: size,
			lineHeight: `${size}px`
		} : {};
		return createVNode("span", {
			"class": classNames(prefixCls, sizeCls, shapeCls, classes?.root, classes?.content, className),
			"style": [
				sizeStyle,
				styles?.root,
				styles?.content,
				style
			]
		}, null);
	};
}, {
	props: {
		size: {
			type: [
				String,
				null,
				Number
			],
			required: false
		},
		shape: {
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
	inheritAttrs: false
});
var Element_default = Element;

//#endregion
export { Element_default as default };