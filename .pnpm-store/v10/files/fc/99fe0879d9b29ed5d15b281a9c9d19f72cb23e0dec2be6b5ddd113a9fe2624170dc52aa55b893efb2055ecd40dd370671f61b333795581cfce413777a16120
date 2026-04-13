import { useInjectTableContext } from "../context/TableContext.js";
import HeaderRow from "./HeaderRow.js";
import { computed, createVNode, defineComponent, isVNode } from "vue";
import { clsx } from "@v-c/util";
//#region src/Header/Header.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function parseHeaderRows(rootColumns, classNames, styles) {
	const rows = [];
	function fillRowCells(columns, colIndex, rowIndex = 0) {
		rows[rowIndex] = rows[rowIndex] || [];
		let currentColIndex = colIndex;
		return columns.filter(Boolean).map((column) => {
			const cell = {
				key: column.key,
				className: clsx(column.className, classNames?.cell) || "",
				style: styles?.cell,
				children: column.title,
				column,
				colStart: currentColIndex
			};
			let colSpan = 1;
			const subColumns = column.children;
			if (subColumns && subColumns.length > 0) {
				colSpan = fillRowCells(subColumns, currentColIndex, rowIndex + 1).reduce((total, count) => total + count, 0);
				cell.hasSubColumns = true;
			}
			if ("colSpan" in column) colSpan = column.colSpan;
			if ("rowSpan" in column) cell.rowSpan = column.rowSpan;
			cell.colSpan = colSpan;
			cell.colEnd = cell.colStart + colSpan - 1;
			rows[rowIndex].push(cell);
			currentColIndex += colSpan;
			return colSpan;
		});
	}
	fillRowCells(rootColumns, 0);
	const rowCount = rows.length;
	for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) rows[rowIndex].forEach((cell) => {
		if (!("rowSpan" in cell) && !cell.hasSubColumns) cell.rowSpan = rowCount - rowIndex;
	});
	return rows;
}
var Header = /* @__PURE__ */ defineComponent({
	name: "TableHeader",
	inheritAttrs: false,
	props: [
		"columns",
		"flattenColumns",
		"stickyOffsets",
		"onHeaderRow"
	],
	setup(props) {
		const context = useInjectTableContext();
		const headerCls = computed(() => context.classNames?.header || {});
		const headerStyles = computed(() => context.styles?.header || {});
		return () => {
			let _slot;
			const WrapperComponent = context.getComponent(["header", "wrapper"], "thead");
			const trComponent = context.getComponent(["header", "row"], "tr");
			const thComponent = context.getComponent(["header", "cell"], "th");
			const rows = parseHeaderRows(props.columns, headerCls.value, headerStyles.value);
			return createVNode(WrapperComponent, {
				"class": clsx(`${context.prefixCls}-thead`, headerCls.value.wrapper),
				"style": headerStyles.value.wrapper
			}, _isSlot(_slot = rows.map((row, rowIndex) => {
				return createVNode(HeaderRow, {
					"classNames": headerCls.value,
					"styles": headerStyles.value,
					"key": rowIndex,
					"flattenColumns": props.flattenColumns,
					"cells": row,
					"stickyOffsets": props.stickyOffsets,
					"rowComponent": trComponent,
					"cellComponent": thComponent,
					"onHeaderRow": props.onHeaderRow,
					"index": rowIndex
				}, null);
			})) ? _slot : { default: () => [_slot] });
		};
	}
});
//#endregion
export { Header as default };
