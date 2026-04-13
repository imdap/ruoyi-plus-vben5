import { computed } from "vue";
//#region src/Cell/useHoverState.ts
function inHoverRange(cellStartRow, cellRowSpan, startRow, endRow) {
	const cellEndRow = cellStartRow + cellRowSpan - 1;
	return cellStartRow <= endRow && cellEndRow >= startRow;
}
function useHoverState(rowIndex, rowSpan, context) {
	return [computed(() => {
		return inHoverRange(rowIndex, rowSpan || 1, context.hoverStartRow, context.hoverEndRow);
	}), context.onHover];
}
//#endregion
export { useHoverState as default };
