import { computed } from "vue";

//#region src/masonry/hooks/usePositions.ts
/**
* Auto arrange the items in the masonry layout.
* Always get stable positions by order
* instead of dynamic adjust for next item height.
*/
function usePositions(itemHeights, columnCount, verticalGutter) {
	const autoOrder = computed(() => {
		const columnHeights = Array.from({ length: columnCount.value }).fill(0);
		const itemPositions = /* @__PURE__ */ new Map();
		for (let i = 0; i < itemHeights.value.length; i += 1) {
			const [itemKey, itemHeight, itemColumn] = itemHeights.value[i];
			let targetColumnIndex = itemColumn ?? columnHeights.indexOf(Math.min(...columnHeights));
			targetColumnIndex = Math.min(targetColumnIndex, columnCount.value - 1);
			const top = columnHeights[targetColumnIndex];
			itemPositions.set(itemKey, {
				column: targetColumnIndex,
				top
			});
			columnHeights[targetColumnIndex] += itemHeight + verticalGutter.value;
		}
		return [itemPositions, Math.max(0, Math.max(...columnHeights) - verticalGutter.value)];
	});
	return [computed(() => autoOrder.value[0]), computed(() => autoOrder.value[1])];
}

//#endregion
export { usePositions as default };