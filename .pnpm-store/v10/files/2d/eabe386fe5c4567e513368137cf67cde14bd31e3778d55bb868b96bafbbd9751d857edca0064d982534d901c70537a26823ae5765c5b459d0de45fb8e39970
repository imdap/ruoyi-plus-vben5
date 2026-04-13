import Column_default from "./Column.js";
import ColumnGroup_default from "./ColumnGroup.js";
import { SELECTION_ALL, SELECTION_COLUMN, SELECTION_INVERT, SELECTION_NONE } from "./hooks/useSelection.js";
import Table_default from "./Table.js";
import { EXPAND_COLUMN, Summary, SummaryCell, SummaryRow } from "@v-c/table";

//#region src/table/index.tsx
const InternalTable = Table_default;
InternalTable.Column = Column_default;
InternalTable.ColumnGroup = ColumnGroup_default;
InternalTable.Summary = Summary;
InternalTable.SummaryRow = SummaryRow;
InternalTable.SummaryCell = SummaryCell;
InternalTable.SELECTION_COLUMN = SELECTION_COLUMN;
InternalTable.EXPAND_COLUMN = EXPAND_COLUMN;
InternalTable.SELECTION_ALL = SELECTION_ALL;
InternalTable.SELECTION_INVERT = SELECTION_INVERT;
InternalTable.SELECTION_NONE = SELECTION_NONE;
InternalTable.install = (app) => {
	app.component(Table_default.name, Table_default);
	app.component(Column_default.name, Column_default);
	app.component(ColumnGroup_default.name, ColumnGroup_default);
	app.component("ATableSummary", Summary);
	app.component("ATableSummaryRow", SummaryRow);
	app.component("ATableSummaryCell", SummaryCell);
	return app;
};
var table_default = InternalTable;

//#endregion
export { Column_default as Column, ColumnGroup_default as ColumnGroup, EXPAND_COLUMN, SELECTION_ALL, SELECTION_COLUMN, SELECTION_INVERT, SELECTION_NONE, Summary, SummaryCell, SummaryRow, table_default as default };