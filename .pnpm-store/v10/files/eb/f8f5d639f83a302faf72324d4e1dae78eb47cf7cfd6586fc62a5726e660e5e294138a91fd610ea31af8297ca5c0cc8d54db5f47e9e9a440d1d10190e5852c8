import { computed } from "vue";
//#region src/hooks/useCount.ts
/**
* Cut `value` by the `count.max` prop.
*/
function inCountRange(value, countConfig) {
	if (!countConfig.max) return true;
	return countConfig.strategy(value) <= countConfig.max;
}
function useCount(count, showCount) {
	return computed(() => {
		let mergedConfig = {};
		if (showCount?.value) mergedConfig.show = typeof showCount.value === "object" && showCount.value?.formatter ? showCount.value?.formatter : !!showCount.value;
		mergedConfig = {
			...mergedConfig,
			...count?.value
		};
		const { show, ...rest } = mergedConfig;
		return {
			...rest,
			show: !!show,
			showFormatter: typeof show === "function" ? show : void 0,
			strategy: rest.strategy || ((value) => value.length)
		};
	});
}
//#endregion
export { useCount as default, inCountRange };
