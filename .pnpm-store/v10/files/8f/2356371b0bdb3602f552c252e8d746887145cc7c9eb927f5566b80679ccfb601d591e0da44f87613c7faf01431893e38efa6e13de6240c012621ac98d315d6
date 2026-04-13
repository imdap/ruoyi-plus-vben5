import { responsiveArray } from "../responsiveObserver.js";
import { useBreakpoint } from "../../grid/index.js";
import { computed } from "vue";

//#region src/_util/hooks/useResponsive.ts
function convertBreakpointToResponsive(breakpoints) {
	return {
		...breakpoints,
		mobile: breakpoints.xs,
		tablet: breakpoints.md,
		laptop: breakpoints.lg,
		desktop: breakpoints.xxl
	};
}
function useResponsive() {
	const breakpoints = useBreakpoint();
	const keys = [
		...responsiveArray,
		"mobile",
		"tablet",
		"laptop",
		"desktop"
	];
	const refs = {};
	const responsive = computed(() => {
		return convertBreakpointToResponsive(breakpoints.value);
	});
	for (const key of keys) refs[key] = computed(() => responsive.value[key] || false);
	return refs;
}

//#endregion
export { convertBreakpointToResponsive, useResponsive };