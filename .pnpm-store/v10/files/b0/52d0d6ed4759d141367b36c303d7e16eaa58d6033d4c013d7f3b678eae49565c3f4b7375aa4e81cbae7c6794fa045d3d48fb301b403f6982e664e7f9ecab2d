import { onUnmounted, shallowRef } from "vue";
import raf from "@v-c/util/dist/raf";

//#region src/masonry/hooks/useDelay.ts
function useDelay(callback) {
	const idRef = shallowRef(0);
	const clearRaf = () => {
		raf.cancel(idRef.value);
	};
	onUnmounted(() => {
		clearRaf();
	});
	return () => {
		clearRaf();
		idRef.value = raf(callback);
	};
}

//#endregion
export { useDelay as default };