import { generateColor } from "../util.js";
import { createVNode, defineComponent } from "vue";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";

//#region src/color-picker/components/ColorClear.tsx
var ColorClear_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const handleClick = () => {
		if (!props.onChange || !props.value || props.value.cleared) return;
		const hsba = props.value.toHsb();
		hsba.a = 0;
		const genColor = generateColor(hsba);
		genColor.cleared = true;
		props.onChange(genColor);
	};
	return () => {
		const { className, style } = getAttrStyleAndClass(attrs);
		return createVNode("div", {
			"class": [`${props.prefixCls}-clear`, className],
			"style": style,
			"onClick": handleClick
		}, null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		value: {
			type: Object,
			required: false
		},
		onChange: {
			type: Function,
			required: false
		}
	},
	name: "ColorClear",
	inheritAttrs: false
});

//#endregion
export { ColorClear_default as default };