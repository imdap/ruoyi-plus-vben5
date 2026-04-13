import { getSlotPropsFnRun } from "../_util/tools.js";
import { useDescriptionsCtx } from "./DescriptionsContext.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";

//#region src/descriptions/Cell.tsx
function notEmpty(val) {
	return val !== void 0 && val !== null;
}
const Cell = /* @__PURE__ */ defineComponent((props, { attrs, slots }) => {
	const descContext = useDescriptionsCtx();
	return () => {
		const { component, bordered, type, itemPrefixCls, span, styles, classes, colon } = props;
		const { classes: descriptionsClassNames } = descContext.value;
		const Component = component;
		const label = getSlotPropsFnRun(slots, props, "label");
		const content = getSlotPropsFnRun(slots, props, "content");
		if (bordered) return createVNode(Component, mergeProps({
			"class": classNames({
				[`${itemPrefixCls}-item-label`]: type === "label",
				[`${itemPrefixCls}-item-content`]: type === "content"
			}, type === "label" ? descriptionsClassNames?.label : void 0, type === "content" ? descriptionsClassNames?.content : void 0),
			"colSpan": span
		}, attrs), { default: () => [notEmpty(label) && createVNode("span", {
			"style": styles?.label,
			"class": classes?.label
		}, [label]), notEmpty(content) && createVNode("span", {
			"style": styles?.content,
			"class": classes?.content
		}, [content])] });
		return createVNode(Component, mergeProps({ "class": classNames(`${itemPrefixCls}-item`) }, attrs, { "colSpan": span }), { default: () => [createVNode("div", { "class": `${itemPrefixCls}-item-container` }, [(label || label === 0) && createVNode("span", { "class": classNames(`${itemPrefixCls}-item-label`, descriptionsClassNames?.label, { [`${itemPrefixCls}-item-no-colon`]: !colon }, classes?.label) }, [label]), (content || content === 0) && createVNode("span", {
			"class": classNames(`${itemPrefixCls}-item-content`, descriptionsClassNames?.content, classes?.content),
			"style": styles?.content
		}, [content])])] });
	};
}, { props: {
	itemPrefixCls: {
		type: String,
		required: true
	},
	span: {
		type: Number,
		required: true
	},
	component: {
		type: String,
		required: true
	},
	classes: {
		type: Object,
		required: false
	},
	styles: {
		type: Object,
		required: false
	},
	bordered: {
		type: Boolean,
		required: false,
		default: void 0
	},
	label: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	content: {
		type: [
			Function,
			String,
			Number,
			null,
			Object,
			Boolean
		],
		required: false,
		default: void 0
	},
	type: {
		type: String,
		required: false
	},
	colon: {
		type: Boolean,
		required: false,
		default: void 0
	}
} });
var Cell_default = Cell;

//#endregion
export { Cell_default as default };