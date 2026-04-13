import { computed, unref } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
//#region src/hooks/useSticky.ts
var defaultContainer = canUseDom() ? window : null;
function useSticky(sticky, prefixCls) {
	return computed(() => {
		const mergedSticky = unref(sticky);
		const mergedPrefixCls = unref(prefixCls);
		const { offsetHeader = 0, offsetSummary = 0, offsetScroll = 0, getContainer = () => defaultContainer } = typeof mergedSticky === "object" ? mergedSticky : {};
		const container = getContainer?.() || defaultContainer;
		const isSticky = !!mergedSticky;
		return {
			isSticky,
			stickyClassName: isSticky ? `${mergedPrefixCls}-sticky-holder` : "",
			offsetHeader,
			offsetSummary,
			offsetScroll,
			container
		};
	});
}
//#endregion
export { useSticky as default };
