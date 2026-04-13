import { computed, unref } from "vue";
//#region src/hooks/useStickyOffsets.ts
function useStickyOffsets(colWidths, flattenColumns) {
	return computed(() => {
		const mergedWidths = unref(colWidths) || [];
		const mergedColumns = unref(flattenColumns) || [];
		const columnCount = mergedColumns.length;
		const parseWidth = (value) => {
			if (typeof value === "number") return Number.isFinite(value) && value > 0 ? value : null;
			if (typeof value === "string") {
				const trimmed = value.trim();
				if (trimmed.endsWith("%")) return null;
				const parsed = trimmed.endsWith("px") ? Number.parseFloat(trimmed) : Number.parseFloat(trimmed);
				return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
			}
			return null;
		};
		const normalizedWidths = mergedColumns.map((column, index) => {
			return parseWidth(mergedWidths[index]) ?? parseWidth(column?.width) ?? 0;
		});
		const getOffsets = (startIndex, endIndex, offset) => {
			const offsets = [];
			let total = 0;
			for (let i = startIndex; i !== endIndex; i += offset) {
				offsets.push(total);
				if (mergedColumns[i]?.fixed) total += normalizedWidths[i] || 0;
			}
			return offsets;
		};
		return {
			start: getOffsets(0, columnCount, 1),
			end: getOffsets(columnCount - 1, -1, -1).reverse(),
			widths: normalizedWidths
		};
	});
}
//#endregion
export { useStickyOffsets as default };
