import { computed } from "vue";

//#region src/tooltip/hooks/useMergedArrow.ts
function useMergedArrow(providedArrow, providedContextArrow) {
	const toConfig = (arrow) => typeof arrow === "boolean" ? { show: arrow } : arrow || {};
	return computed(() => {
		const arrowConfig = toConfig(providedArrow?.value);
		const contextArrowConfig = toConfig(providedContextArrow?.value);
		const finalShow = providedArrow?.value !== void 0 ? arrowConfig.show ?? true : contextArrowConfig.show ?? true;
		return {
			...contextArrowConfig,
			...arrowConfig,
			show: finalShow
		};
	});
}
var useMergedArrow_default = useMergedArrow;

//#endregion
export { useMergedArrow_default as default };