import { createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/skeleton/Title.tsx
const Title = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	return () => {
		const { prefixCls, rootClass, width } = props;
		return createVNode("h3", mergeProps({
			"class": classNames(prefixCls, rootClass, attrs?.class),
			"style": [{ width }, attrs?.style]
		}, omit(attrs, ["class", "style"])), null);
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
		width: {
			type: [Number, String],
			required: false
		}
	},
	name: "ASkeletonTitle",
	inheritAttrs: false
});
var Title_default = Title;

//#endregion
export { Title_default as default };