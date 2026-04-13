import { useInjectTableContext } from "../context/TableContext.js";
import { getColumnsKey } from "../utils/valueUtil.js";
import { computed, unref } from "vue";
import { clsx } from "@v-c/util";
//#region src/hooks/useRowInfo.ts
function useRowInfo(record, rowKey, recordIndex, indent) {
	const tableContext = useInjectTableContext();
	const nestExpandable = computed(() => tableContext.expandableType === "nest");
	const rowSupportExpand = computed(() => {
		const mergedRecord = unref(record);
		return tableContext.expandableType === "row" && (!tableContext.rowExpandable || tableContext.rowExpandable(mergedRecord));
	});
	const expandable = computed(() => rowSupportExpand.value || nestExpandable.value);
	const expanded = computed(() => tableContext.expandedKeys?.has(unref(rowKey)));
	const hasNestChildren = computed(() => {
		const mergedRecord = unref(record);
		return !!(tableContext.childrenColumnName && mergedRecord?.[tableContext.childrenColumnName]);
	});
	const rowProps = computed(() => {
		const mergedRecord = unref(record);
		const mergedRecordIndex = unref(recordIndex);
		const mergedIndent = unref(indent);
		const customRowProps = tableContext.onRow?.(mergedRecord, mergedRecordIndex) || {};
		const onRowClick = customRowProps?.onClick;
		const onClick = (event) => {
			if (tableContext.expandRowByClick && expandable.value) tableContext.onTriggerExpand(mergedRecord, event);
			onRowClick?.(event);
		};
		let computeRowClassName = "";
		if (typeof tableContext.rowClassName === "string") computeRowClassName = tableContext.rowClassName;
		else if (typeof tableContext.rowClassName === "function") computeRowClassName = tableContext.rowClassName(mergedRecord, mergedRecordIndex, mergedIndent);
		return {
			...customRowProps,
			className: clsx(computeRowClassName, customRowProps?.className, customRowProps?.class),
			onClick
		};
	});
	return {
		tableContext,
		columnsKey: computed(() => getColumnsKey(tableContext.flattenColumns)),
		nestExpandable,
		expanded,
		hasNestChildren,
		rowSupportExpand,
		expandable,
		rowProps
	};
}
//#endregion
export { useRowInfo as default };
