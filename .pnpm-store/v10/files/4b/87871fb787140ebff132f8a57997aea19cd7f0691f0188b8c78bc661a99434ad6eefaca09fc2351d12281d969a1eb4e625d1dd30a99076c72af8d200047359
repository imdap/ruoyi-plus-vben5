import Cell from "../Cell/index.js";
import { getCellProps } from "../Body/BodyRow.js";
import { useInjectGridContext } from "./context.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { getStylePxValue } from "@v-c/util/dist/props-util";
//#region src/VirtualTable/VirtualCell.tsx
function getColumnWidth(colIndex, colSpan, columnsOffset) {
	return columnsOffset[colIndex + (colSpan || 1)] - (columnsOffset[colIndex] || 0);
}
var VirtualCell = /* @__PURE__ */ defineComponent({
	name: "TableVirtualCell",
	props: [
		"rowInfo",
		"column",
		"colIndex",
		"indent",
		"index",
		"component",
		"renderIndex",
		"record",
		"style",
		"className",
		"inverse",
		"getHeight"
	],
	setup(props) {
		const gridContext = useInjectGridContext();
		return () => {
			const { rowInfo, column, colIndex, indent, index, component, renderIndex, record, style, className, inverse, getHeight } = props;
			const { render, dataIndex, className: columnClassName, width: colWidth } = column;
			const columnsOffset = gridContext.columnsOffset || [];
			const { key, fixedInfo, appendCellNode, additionalCellProps } = getCellProps(rowInfo, record, column, colIndex, indent, index);
			const { style: cellStyle, colSpan = 1, rowSpan = 1 } = additionalCellProps;
			const concatColWidth = getColumnWidth(colIndex - 1, colSpan, columnsOffset);
			const marginOffset = colSpan > 1 ? colWidth - concatColWidth : 0;
			const mergedStyle = {
				...cellStyle && !Array.isArray(cellStyle) && typeof cellStyle === "object" ? cellStyle : {},
				...style || {},
				flex: `0 0 ${concatColWidth}px`,
				width: `${concatColWidth}px`,
				marginRight: typeof marginOffset === "number" ? `${marginOffset}px` : marginOffset,
				pointerEvents: "auto"
			};
			const needHide = inverse ? rowSpan <= 1 : colSpan === 0 || rowSpan === 0 || rowSpan > 1;
			if (needHide) mergedStyle.visibility = "hidden";
			else if (inverse) mergedStyle.height = getStylePxValue(getHeight?.(rowSpan));
			const mergedRender = needHide ? () => null : render;
			const cellSpan = {};
			if (rowSpan === 0 || colSpan === 0) {
				cellSpan.rowSpan = 1;
				cellSpan.colSpan = 1;
			}
			return createVNode(Cell, mergeProps({
				"className": clsx(columnClassName, className),
				"ellipsis": column.ellipsis,
				"align": column.align,
				"scope": column.rowScope,
				"component": component,
				"prefixCls": rowInfo.tableContext.prefixCls,
				"key": key,
				"record": record,
				"index": index,
				"renderIndex": renderIndex,
				"dataIndex": dataIndex,
				"render": mergedRender,
				"column": column,
				"rowType": "body",
				"shouldCellUpdate": column.shouldCellUpdate
			}, fixedInfo, {
				"appendNode": appendCellNode,
				"additionalProps": {
					...additionalCellProps,
					style: mergedStyle,
					...cellSpan
				}
			}), null);
		};
	}
});
//#endregion
export { VirtualCell as default, getColumnWidth };
