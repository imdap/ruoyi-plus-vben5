//#region src/utils/fixUtil.ts
function isFixedStart(column) {
	return column.fixed === "start";
}
function isFixedEnd(column) {
	return column.fixed === "end";
}
function getCellFixedInfo(colStart, colEnd, columns, stickyOffsets) {
	const startColumn = columns[colStart] || {};
	const endColumn = columns[colEnd] || {};
	let fixStart = null;
	let fixEnd = null;
	if (isFixedStart(startColumn) && isFixedStart(endColumn)) fixStart = stickyOffsets.start[colStart];
	else if (isFixedEnd(endColumn) && isFixedEnd(startColumn)) fixEnd = stickyOffsets.end[colEnd];
	let fixedStartShadow = false;
	let fixedEndShadow = false;
	let zIndex = 0;
	let zIndexReverse = 0;
	if (fixStart !== null) {
		fixedStartShadow = !columns[colEnd + 1] || !isFixedStart(columns[colEnd + 1]);
		zIndex = columns.length * 2 - colStart;
		zIndexReverse = columns.length + colStart;
	}
	if (fixEnd !== null) {
		fixedEndShadow = !columns[colStart - 1] || !isFixedEnd(columns[colStart - 1]);
		zIndex = colEnd;
		zIndexReverse = columns.length - colEnd;
	}
	let offsetFixedStartShadow = 0;
	let offsetFixedEndShadow = 0;
	if (fixedStartShadow) {
		for (let i = 0; i < colStart; i += 1) if (!isFixedStart(columns[i])) offsetFixedStartShadow += stickyOffsets.widths[i] || 0;
	}
	if (fixedEndShadow) {
		for (let i = columns.length - 1; i > colEnd; i -= 1) if (!isFixedEnd(columns[i])) offsetFixedEndShadow += stickyOffsets.widths[i] || 0;
	}
	return {
		fixStart,
		fixEnd,
		fixedStartShadow,
		fixedEndShadow,
		offsetFixedStartShadow,
		offsetFixedEndShadow,
		isSticky: stickyOffsets.isSticky,
		zIndex,
		zIndexReverse
	};
}
//#endregion
export { getCellFixedInfo };
