import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
var ColorBlock_default = /* @__PURE__ */ defineComponent({
	props: [
		"color",
		"prefixCls",
		"innerClassName",
		"innerStyle"
	],
	inheritAttrs: false,
	setup(props, { attrs, emit }) {
		const handleClickChange = (e) => {
			emit("click", e);
		};
		return () => {
			const { color, prefixCls, innerClassName, innerStyle } = props;
			const { className, style } = getAttrStyleAndClass(attrs);
			const colorBlockCls = `${prefixCls}-color-block`;
			return createVNode("div", {
				"class": clsx(colorBlockCls, className),
				"style": style,
				"onClick": handleClickChange
			}, [createVNode("div", {
				"class": clsx(`${colorBlockCls}-inner`, innerClassName),
				"style": {
					background: color,
					...innerStyle
				}
			}, null)]);
		};
	}
});
export { ColorBlock_default as default };
