import Cell from "../Cell/index.js";
import useRowInfo from "../hooks/useRowInfo.js";
import { computedExpandedClassName } from "../utils/expandUtil.js";
import { useInjectStaticContext } from "./context.js";
import VirtualCell from "./VirtualCell.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
//#region src/VirtualTable/BodyLine.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var BodyLine = /* @__PURE__ */ defineComponent({
	name: "TableBodyLine",
	props: [
		"data",
		"index",
		"className",
		"style",
		"rowKey",
		"extra",
		"getHeight"
	],
	setup(props) {
		const staticContext = useInjectStaticContext();
		const rowInfo = useRowInfo(computed(() => props.data?.record), computed(() => props.rowKey), computed(() => props.index), computed(() => props.data?.indent || 0));
		return () => {
			let _slot;
			const { data, index, className, rowKey, style, extra, getHeight } = props;
			const { record, indent, index: renderIndex } = data;
			const tableContext = rowInfo.tableContext;
			const RowComponent = staticContext.getComponent?.(["body", "row"], "div") || "div";
			const CellComponent = staticContext.getComponent?.(["body", "cell"], "div") || "div";
			const { rowSupportExpand, expanded, rowProps } = rowInfo;
			const expandedRowRender = tableContext.expandedRowRender;
			const expandedRowClassName = tableContext.expandedRowClassName;
			let expandRowNode;
			if (rowSupportExpand.value && expanded.value) {
				const expandContent = expandedRowRender(record, index, indent + 1, expanded.value);
				const expandedClsName = computedExpandedClassName(expandedRowClassName, record, index, indent);
				let additionalProps = {};
				if (tableContext.fixColumn) additionalProps = { style: { ["--virtual-width"]: `${tableContext.componentWidth}px` } };
				const rowCellCls = `${tableContext.prefixCls}-expanded-row-cell`;
				expandRowNode = createVNode(RowComponent, { "class": clsx(`${tableContext.prefixCls}-expanded-row`, `${tableContext.prefixCls}-expanded-row-level-${indent + 1}`, expandedClsName) }, { default: () => [createVNode(Cell, {
					"component": CellComponent,
					"prefixCls": tableContext.prefixCls,
					"className": clsx(rowCellCls, { [`${rowCellCls}-fixed`]: tableContext.fixColumn }),
					"additionalProps": additionalProps
				}, _isSlot(expandContent) ? expandContent : { default: () => [expandContent] })] });
			}
			const rowStyle = {
				...style || {},
				width: typeof tableContext.scrollX === "number" ? `${tableContext.scrollX}px` : tableContext.scrollX
			};
			if (extra) {
				rowStyle.position = "absolute";
				rowStyle.pointerEvents = "none";
			}
			const rowPropsStyle = rowProps.value?.style;
			const mergedRowStyle = {
				...rowStyle,
				...typeof rowPropsStyle === "object" ? rowPropsStyle : {}
			};
			const rowNode = createVNode(RowComponent, mergeProps(rowProps.value, {
				"data-row-key": rowKey,
				"class": clsx(className, `${tableContext.prefixCls}-row`, rowProps.value?.className, rowProps.value?.class, { [`${tableContext.prefixCls}-row-extra`]: extra }),
				"style": mergedRowStyle
			}), _isSlot(_slot = tableContext.flattenColumns.map((column, colIndex) => {
				return createVNode(VirtualCell, {
					"key": colIndex,
					"component": CellComponent,
					"rowInfo": rowInfo,
					"column": column,
					"colIndex": colIndex,
					"indent": indent,
					"index": index,
					"renderIndex": renderIndex,
					"record": record,
					"inverse": extra,
					"getHeight": getHeight
				}, null);
			})) ? _slot : { default: () => [_slot] });
			if (rowSupportExpand.value) return createVNode("div", null, [rowNode, expandRowNode]);
			return rowNode;
		};
	}
});
//#endregion
export { BodyLine as default };
