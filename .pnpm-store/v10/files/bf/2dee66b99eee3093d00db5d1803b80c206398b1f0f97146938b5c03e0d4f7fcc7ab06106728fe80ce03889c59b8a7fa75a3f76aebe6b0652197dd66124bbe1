import { devUseWarning, isDev } from "../../_util/warning.js";
import { computed } from "vue";

//#region src/descriptions/hooks/useRow.ts
function getCalcRows(rowItems, mergedColumn) {
	let rows = [];
	let tmpRow = [];
	let exceed = false;
	let count = 0;
	rowItems.filter((n) => n).forEach((rowItem) => {
		const { filled, ...restItem } = rowItem;
		if (filled) {
			tmpRow.push(restItem);
			rows.push(tmpRow);
			tmpRow = [];
			count = 0;
			return;
		}
		const restSpan = mergedColumn - count;
		count += rowItem.span || 1;
		if (count >= mergedColumn) {
			if (count > mergedColumn) {
				exceed = true;
				tmpRow.push({
					...restItem,
					span: restSpan
				});
			} else tmpRow.push(restItem);
			rows.push(tmpRow);
			tmpRow = [];
			count = 0;
		} else tmpRow.push(restItem);
	});
	if (tmpRow.length > 0) rows.push(tmpRow);
	rows = rows.map((rows) => {
		const count = rows.reduce((acc, item) => acc + (item.span || 1), 0);
		if (count < mergedColumn) {
			const last = rows[rows.length - 1];
			last.span = mergedColumn - (count - (last.span || 1));
			return rows;
		}
		return rows;
	});
	return [rows, exceed];
}
function useRow(mergedColumn, items) {
	const info = computed(() => getCalcRows(items.value, mergedColumn.value));
	return computed(() => {
		if (isDev) devUseWarning("Descriptions")(!info.value[1], "usage", "Sum of column `span` in a line not match `column` of Descriptions.");
		return info.value?.[0];
	});
}
var useRow_default = useRow;

//#endregion
export { useRow_default as default };