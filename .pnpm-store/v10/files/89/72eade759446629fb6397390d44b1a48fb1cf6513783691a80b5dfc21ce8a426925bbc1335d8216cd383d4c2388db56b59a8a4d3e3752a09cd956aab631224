import { useSpaceContext } from "./context.js";
import { Fragment, createVNode, defineComponent, mergeProps } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/space/Item.tsx
const Item = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const spaceContext = useSpaceContext();
	return () => {
		const { index, className, classes, styles } = props;
		const { latestIndex } = spaceContext.value;
		const children = filterEmpty(slots?.default?.());
		const separator = filterEmpty(slots?.separator?.());
		if (children.length === 0) return null;
		return createVNode(Fragment, null, [createVNode("div", mergeProps({ "class": className }, attrs), [children]), index < latestIndex && !!separator.length && createVNode("span", {
			"class": [`${className}-item-separator`, classes.separator],
			"style": styles.separator
		}, [separator])]);
	};
}, { props: {
	index: {
		type: Number,
		required: true
	},
	className: {
		type: String,
		required: true
	},
	classes: {
		type: Object,
		required: true
	},
	styles: {
		type: Object,
		required: true
	}
} });
var Item_default = Item;

//#endregion
export { Item_default as default };