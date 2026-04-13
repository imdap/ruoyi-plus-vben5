import { computed, unref } from "vue";
//#region src/hooks/useColumns/useWidthColumns.tsx
function parseColWidth(totalWidth, width = "") {
	if (typeof width === "number") return width;
	if (typeof width === "string" && width.endsWith("%")) return totalWidth * parseFloat(width) / 100;
	return null;
}
function useWidthColumns(flattenColumns, scrollWidth, clientWidth) {
	return computed(() => {
		const mergedColumns = unref(flattenColumns) || [];
		const mergedScrollWidth = unref(scrollWidth);
		const mergedClientWidth = unref(clientWidth);
		if (mergedScrollWidth && mergedScrollWidth > 0) {
			let totalWidth = 0;
			let missWidthCount = 0;
			mergedColumns.forEach((col) => {
				const colWidth = parseColWidth(mergedScrollWidth, col.width);
				if (colWidth) totalWidth += colWidth;
				else missWidthCount += 1;
			});
			const maxFitWidth = Math.max(mergedScrollWidth, mergedClientWidth);
			let restWidth = Math.max(maxFitWidth - totalWidth, missWidthCount);
			let restCount = missWidthCount;
			const avgWidth = restWidth / missWidthCount;
			let realTotal = 0;
			const filledColumns = mergedColumns.map((col) => {
				const clone = { ...col };
				const colWidth = parseColWidth(mergedScrollWidth, clone.width);
				if (colWidth) clone.width = colWidth;
				else {
					const colAvgWidth = Math.floor(avgWidth);
					clone.width = restCount === 1 ? restWidth : colAvgWidth;
					restWidth -= colAvgWidth;
					restCount -= 1;
				}
				realTotal += clone.width;
				return clone;
			});
			if (realTotal < maxFitWidth) {
				const scale = maxFitWidth / realTotal;
				restWidth = maxFitWidth;
				filledColumns.forEach((col, index) => {
					const colWidth = Math.floor(col.width * scale);
					col.width = index === filledColumns.length - 1 ? restWidth : colWidth;
					restWidth -= colWidth;
				});
			}
			return [filledColumns, Math.max(realTotal, maxFitWidth)];
		}
		return [mergedColumns, mergedScrollWidth ?? void 0];
	});
}
//#endregion
export { useWidthColumns as default };
