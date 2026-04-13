import { renderColumnTitle } from "../util.js";

//#region src/table/hooks/useTitleColumns.ts
function fillTitle(columns, columnTitleProps) {
	return columns.map((column) => {
		const cloneColumn = { ...column };
		cloneColumn.title = renderColumnTitle(column.title, columnTitleProps);
		if ("children" in cloneColumn) cloneColumn.children = fillTitle(cloneColumn.children, columnTitleProps);
		return cloneColumn;
	});
}
function useTitleColumns(columnTitleProps) {
	const filledColumns = (columns) => fillTitle(columns, columnTitleProps);
	return [filledColumns];
}

//#endregion
export { useTitleColumns as default };