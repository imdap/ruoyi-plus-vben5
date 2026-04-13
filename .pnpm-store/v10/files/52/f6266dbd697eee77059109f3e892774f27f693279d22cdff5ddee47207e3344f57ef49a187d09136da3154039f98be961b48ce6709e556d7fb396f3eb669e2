import { responsiveArray } from "../../_util/responsiveObserver.js";
import { computed, ref, watchEffect } from "vue";

//#region src/grid/hooks/useGutter.ts
function useGutter(gutter, screens) {
	const results = ref([void 0, void 0]);
	const normalizedGutter = computed(() => {
		return Array.isArray(gutter.value) ? gutter.value : [gutter.value, void 0];
	});
	const mergedScreens = computed(() => {
		return screens.value || {
			xs: true,
			sm: true,
			md: true,
			lg: true,
			xl: true,
			xxl: true,
			xxxl: true
		};
	});
	watchEffect(() => {
		normalizedGutter.value.forEach((g, index) => {
			if (typeof g === "object" && g !== null) for (let i = 0; i < responsiveArray.length; i++) {
				const breakpoint = responsiveArray[i];
				if (mergedScreens.value[breakpoint] && g[breakpoint] !== void 0) {
					results.value[index] = g[breakpoint];
					break;
				}
			}
			else results.value[index] = g;
		});
	});
	return results;
}

//#endregion
export { useGutter as default };