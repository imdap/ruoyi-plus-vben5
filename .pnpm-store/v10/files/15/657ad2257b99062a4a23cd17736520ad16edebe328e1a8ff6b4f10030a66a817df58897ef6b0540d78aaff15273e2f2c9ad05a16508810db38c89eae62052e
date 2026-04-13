import warning from "@v-c/util/dist/warning";
//#region src/utils/legacyUtil.ts
var INTERNAL_COL_DEFINE = "VC_TABLE_INTERNAL_COL_DEFINE";
function getExpandableProps(props) {
	const { expandable, ...legacyExpandableConfig } = props;
	let config;
	if (props.expandable !== void 0) config = {
		...legacyExpandableConfig,
		...expandable
	};
	else {
		if (process.env.NODE_ENV !== "production" && [
			"indentSize",
			"expandedRowKeys",
			"defaultExpandedRowKeys",
			"defaultExpandAllRows",
			"expandedRowRender",
			"expandRowByClick",
			"expandIcon",
			"onExpand",
			"onExpandedRowsChange",
			"expandedRowClassName",
			"expandIconColumnIndex",
			"showExpandColumn",
			"title"
		].some((prop) => props[prop] !== void 0)) warning(false, "expanded related props have been moved into `expandable`.");
		config = legacyExpandableConfig;
	}
	if (config.showExpandColumn === false) config.expandIconColumnIndex = -1;
	return config;
}
//#endregion
export { INTERNAL_COL_DEFINE, getExpandableProps };
