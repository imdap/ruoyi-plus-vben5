import { createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/skeleton/Paragraph.tsx
function getWidth(index, props) {
	const { width, rows = 2 } = props;
	if (Array.isArray(width)) return width[index];
	if (rows - 1 === index) return width;
}
const Paragraph = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	return () => {
		const { prefixCls, rootClass, rows = 0 } = props;
		const rowList = Array.from({ length: rows }).map((_, index) => createVNode("li", {
			"key": index,
			"style": { width: getWidth(index, props) }
		}, null));
		return createVNode("ul", mergeProps({ "class": classNames(prefixCls, rootClass, attrs?.class) }, omit(attrs, ["class"])), [rowList]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		width: {
			type: [
				Number,
				String,
				Array
			],
			required: false
		},
		rows: {
			type: Number,
			required: false
		}
	}, { rows: 0 }),
	name: "ASkeletonParagraph",
	inheritAttrs: false
});
var Paragraph_default = Paragraph;

//#endregion
export { Paragraph_default as default };