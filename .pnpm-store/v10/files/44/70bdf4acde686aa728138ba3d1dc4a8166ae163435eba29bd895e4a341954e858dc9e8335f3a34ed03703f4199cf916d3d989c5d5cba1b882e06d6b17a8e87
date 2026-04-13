import { getSlotPropsFnRun } from "../_util/tools.js";
import { useDescriptionsCtx } from "./DescriptionsContext.js";
import Cell_default from "./Cell.js";
import { Fragment, createVNode, defineComponent } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/descriptions/Row.tsx
function renderCells(items, { colon, prefixCls, bordered, labelRender, contentRender }, { component, type, showLabel, showContent, styles: rootStyles }) {
	return items.map((item, index) => {
		const { prefixCls: itemPrefixCls = prefixCls, span = 1, key, styles, style } = item;
		let label = getSlotPropsFnRun({}, item, "label");
		let children = getSlotPropsFnRun({}, item, "content");
		const className = item.class;
		if (labelRender) {
			const _oldLabel = label;
			label = labelRender({
				item,
				index: item?._$index ?? index,
				value: label
			}) ?? label;
			const _label = filterEmpty(Array.isArray(label) ? label : [label]);
			label = _label.length > 0 ? _label : _oldLabel;
		}
		if (contentRender) {
			const _oldChild = children;
			children = contentRender({
				item,
				index: item?._$index ?? index,
				value: children
			}) ?? children;
			const _child = filterEmpty(Array.isArray(children) ? children : [children]);
			children = _child.length > 0 ? _child : _oldChild;
		}
		if (typeof component === "string") return createVNode(Cell_default, {
			"key": `${type}-${key || index}`,
			"class": className,
			"style": style,
			"styles": {
				label: {
					...rootStyles?.label,
					...styles?.label
				},
				content: {
					...rootStyles?.content,
					...styles?.content
				}
			},
			"span": span,
			"colon": colon,
			"component": component,
			"itemPrefixCls": itemPrefixCls,
			"bordered": bordered,
			"label": showLabel ? label : null,
			"content": showContent ? children : null,
			"type": type
		}, null);
		return [createVNode(Cell_default, {
			"key": `label-${key || index}`,
			"class": className,
			"style": {
				...rootStyles?.label,
				...style,
				...styles?.label
			},
			"span": 1,
			"colon": colon,
			"component": component[0],
			"itemPrefixCls": itemPrefixCls,
			"bordered": bordered,
			"label": label,
			"type": "label"
		}, null), createVNode(Cell_default, {
			"key": `content-${key || index}`,
			"class": className,
			"style": {
				...rootStyles?.content,
				...style,
				...styles?.content
			},
			"span": span * 2 - 1,
			"component": component[1],
			"itemPrefixCls": itemPrefixCls,
			"bordered": bordered,
			"content": children,
			"type": "content"
		}, null)];
	});
}
const Row = /* @__PURE__ */ defineComponent((props) => {
	const descContext = useDescriptionsCtx();
	return () => {
		const { prefixCls, vertical, row, index, bordered } = props;
		if (vertical) return createVNode(Fragment, null, [createVNode("tr", {
			"key": `label-${index}`,
			"class": `${prefixCls}-row`
		}, [renderCells(row, props, {
			component: "th",
			type: "label",
			showLabel: true,
			...descContext
		})]), createVNode("tr", {
			"key": `content-${index}`,
			"class": `${prefixCls}-row`
		}, [renderCells(row, props, {
			component: "td",
			type: "content",
			showContent: true,
			...descContext
		})])]);
		return createVNode("tr", {
			"key": index,
			"class": `${prefixCls}-row`
		}, [renderCells(row, props, {
			component: bordered ? ["th", "td"] : "td",
			type: "item",
			showLabel: true,
			showContent: true,
			...descContext
		})]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true
	},
	vertical: {
		type: Boolean,
		required: true
	},
	row: {
		type: Array,
		required: true
	},
	bordered: {
		type: Boolean,
		required: false,
		default: void 0
	},
	colon: {
		type: Boolean,
		required: true
	},
	index: {
		type: Number,
		required: true
	},
	labelRender: {
		type: Function,
		required: false
	},
	contentRender: {
		type: Function,
		required: false
	}
} });
var Row_default = Row;

//#endregion
export { Row_default as default };