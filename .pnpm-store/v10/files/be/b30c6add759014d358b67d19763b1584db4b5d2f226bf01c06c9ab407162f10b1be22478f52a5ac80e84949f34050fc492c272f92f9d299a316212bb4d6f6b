import responsiveObserver_default from "../../_util/responsiveObserver.js";
import { nextTick, ref, unref, watchEffect } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";

//#region src/grid/hooks/useBreakpoint.tsx
function useBreakpoint(refreshOnChange = true, defaultScreens = {}) {
	const screensRef = ref(unref(defaultScreens));
	const responsiveObserver = responsiveObserver_default();
	watchEffect(async (onCleanup) => {
		if (!canUseDom()) return;
		await nextTick();
		const token = responsiveObserver.value?.subscribe((supportScreens) => {
			screensRef.value = unref(supportScreens);
			if (unref(refreshOnChange)) {}
		});
		onCleanup(() => {
			responsiveObserver.value.unsubscribe(token);
		});
	});
	return screensRef;
}
var useBreakpoint_default = useBreakpoint;

//#endregion
export { useBreakpoint_default as default, useBreakpoint };