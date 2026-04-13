import { useInjectTableContext } from "../context/TableContext.js";
import { getColumnsKey } from "../utils/valueUtil.js";
import Cell from "../Cell/index.js";
import { getCellFixedInfo } from "../utils/fixUtil.js";
import { createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
//#region src/Header/HeaderRow.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var HeaderRow = /* @__PURE__ */ defineComponent({
	name: "TableHeaderRow",
	props: [
		"cells",
		"stickyOffsets",
		"flattenColumns",
		"rowComponent",
		"cellComponent",
		"onHeaderRow",
		"index",
		"classNames",
		"styles"
	],
	setup(props) {
		const { prefixCls } = useInjectTableContext();
		return () => {
			let _slot;
			const { cells, stickyOffsets, flattenColumns, rowComponent: RowComponent, cellComponent: CellComponent, onHeaderRow, index, classNames, styles } = props;
			let rowProps;
			const rowColumns = cells.map((cell) => cell.column).filter(Boolean);
			if (onHeaderRow) rowProps = onHeaderRow(rowColumns, index);
			const columnsKey = getColumnsKey(rowColumns);
			const mergedRowClass = clsx(classNames?.row, rowProps?.className, rowProps?.class);
			const mergedRowStyle = {
				...styles?.row || {},
				...rowProps?.style || {}
			};
			return createVNode(RowComponent, mergeProps(rowProps, {
				"class": mergedRowClass,
				"style": mergedRowStyle
			}), _isSlot(_slot = cells.map((cell, cellIndex) => {
				const { column, colStart, colEnd, colSpan } = cell;
				const fixedInfo = getCellFixedInfo(colStart, colEnd, flattenColumns, stickyOffsets);
				const additionalProps = column?.onHeaderCell?.(column) || {};
				return createVNode(Cell, mergeProps(cell, {
					"colIndex": colStart ?? cellIndex,
					"scope": column.title ? colSpan > 1 ? "colgroup" : "col" : null,
					"ellipsis": column.ellipsis,
					"align": column.align,
					"component": CellComponent,
					"prefixCls": prefixCls,
					"key": columnsKey[cellIndex]
				}, fixedInfo, {
					"additionalProps": additionalProps,
					"rowType": "header"
				}), { default: () => [cell.children] });
			})) ? _slot : { default: () => [_slot] });
		};
	}
});
//#endregion
export { HeaderRow as default };
