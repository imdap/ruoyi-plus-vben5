import { INTERNAL_COL_DEFINE } from "../../utils/legacyUtil.js";
import { EXPAND_COLUMN } from "../../constant.js";
import useWidthColumns from "./useWidthColumns.js";
import { computed, createVNode, isVNode, unref } from "vue";
import { warning } from "@v-c/util";
import { flattenChildren } from "@v-c/util/dist/props-util";
//#region src/hooks/useColumns/index.tsx
function convertChildrenToColumns(children) {
	return flattenChildren(children).filter((node) => isVNode(node)).map((node) => {
		const { key, props, children: nodeChildren } = node;
		const column = {
			key,
			...props || {}
		};
		if (nodeChildren?.default) column.children = convertChildrenToColumns(nodeChildren.default());
		return column;
	}).filter(Boolean);
}
function filterHiddenColumns(columns) {
	return columns.filter((column) => column && typeof column === "object" && !column.hidden).map((column) => {
		const subColumns = column.children;
		if (subColumns && subColumns.length > 0) return {
			...column,
			children: filterHiddenColumns(subColumns)
		};
		return column;
	});
}
function flatColumns(columns, parentKey = "key") {
	return columns.filter((column) => column && typeof column === "object").reduce((list, column, index) => {
		const { fixed } = column;
		const parsedFixed = fixed === true || fixed === "left" ? "start" : fixed === "right" ? "end" : fixed;
		const mergedKey = `${parentKey}-${index}`;
		const subColumns = column.children;
		if (subColumns && subColumns.length > 0) return [...list, ...flatColumns(subColumns, mergedKey).map((subColumn) => ({
			...subColumn,
			fixed: subColumn.fixed ?? parsedFixed
		}))];
		return [...list, {
			key: mergedKey,
			...column,
			fixed: parsedFixed
		}];
	}, []);
}
function useColumns(options, transformColumns) {
	const baseColumns = computed(() => {
		return filterHiddenColumns((unref(options.columns) || convertChildrenToColumns(options.children) || []).slice());
	});
	const withExpandColumns = computed(() => {
		if (unref(options.expandable)) {
			let cloneColumns = baseColumns.value.slice();
			const expandIconColumnIndex = unref(options.expandIconColumnIndex);
			if (process.env.NODE_ENV !== "production" && expandIconColumnIndex !== void 0) warning(false, "`expandIconColumnIndex` is deprecated. Please use `Table.EXPAND_COLUMN` in `columns` instead.");
			if (!cloneColumns.includes(EXPAND_COLUMN)) {
				const expandColIndex = expandIconColumnIndex || 0;
				const fixed = unref(options.fixed);
				const insertIndex = expandColIndex === 0 && (fixed === "right" || fixed === "end") ? baseColumns.value.length : expandColIndex;
				if (insertIndex >= 0) cloneColumns.splice(insertIndex, 0, EXPAND_COLUMN);
			}
			if (process.env.NODE_ENV !== "production" && cloneColumns.filter((c) => c === EXPAND_COLUMN).length > 1) warning(false, "There exist more than one `EXPAND_COLUMN` in `columns`.");
			const expandColumnIndex = cloneColumns.indexOf(EXPAND_COLUMN);
			cloneColumns = cloneColumns.filter((column, index) => column !== EXPAND_COLUMN || index === expandColumnIndex);
			const prevColumn = baseColumns.value[expandColumnIndex];
			let fixedColumn;
			const fixed = unref(options.fixed);
			if (fixed) fixedColumn = fixed;
			else fixedColumn = prevColumn?.fixed;
			const prefixCls = unref(options.prefixCls) || "";
			const expandColumn = {
				[INTERNAL_COL_DEFINE]: {
					className: `${prefixCls}-expand-icon-col`,
					columnType: "EXPAND_COLUMN"
				},
				title: unref(options.columnTitle),
				fixed: fixedColumn,
				className: `${prefixCls}-row-expand-icon-cell`,
				width: unref(options.columnWidth),
				render: (_, record, index) => {
					const rowKey = unref(options.getRowKey)(record, index);
					const expanded = unref(options.expandedKeys).has(rowKey);
					const rowExpandable = unref(options.rowExpandable);
					const recordExpandable = rowExpandable ? rowExpandable(record) : true;
					const expandIcon = unref(options.expandIcon);
					const icon = expandIcon ? expandIcon({
						prefixCls,
						expanded,
						expandable: recordExpandable,
						record,
						onExpand: options.onTriggerExpand
					}) : null;
					if (unref(options.expandRowByClick)) return createVNode("span", { "onClick": (e) => e.stopPropagation() }, [icon]);
					return icon;
				}
			};
			return cloneColumns.map((col, index) => {
				const column = col === EXPAND_COLUMN ? expandColumn : col;
				if ((options.expandedRowOffset || 0) && index < (options.expandedRowOffset || 0)) return {
					...column,
					fixed: column.fixed || "start"
				};
				return column;
			});
		}
		if (process.env.NODE_ENV !== "production" && baseColumns.value.includes(EXPAND_COLUMN)) warning(false, "`expandable` is not config but there exist `EXPAND_COLUMN` in `columns`.");
		return baseColumns.value.filter((col) => col !== EXPAND_COLUMN);
	});
	const mergedColumns = computed(() => {
		let finalColumns = withExpandColumns.value;
		const transform = unref(transformColumns);
		if (transform) finalColumns = transform(finalColumns);
		if (!finalColumns.length) finalColumns = [{ render: () => null }];
		return finalColumns;
	});
	const widthColumns = useWidthColumns(computed(() => flatColumns(mergedColumns.value)), options.scrollWidth, options.clientWidth);
	return [
		mergedColumns,
		computed(() => widthColumns.value[0]),
		computed(() => widthColumns.value[1])
	];
}
//#endregion
export { convertChildrenToColumns, useColumns as default };
