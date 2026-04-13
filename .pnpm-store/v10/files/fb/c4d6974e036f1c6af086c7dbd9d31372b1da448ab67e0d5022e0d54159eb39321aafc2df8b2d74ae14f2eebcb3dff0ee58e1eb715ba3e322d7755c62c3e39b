import { shallowRef } from "vue";
import raf from "@v-c/util/dist/raf";

//#region src/watermark/useRafDebounce.ts
/**
* Callback will only execute last one for each raf
*/
function useRafDebounce(callback) {
	const executeRef = shallowRef(false);
	const rafRef = shallowRef(null);
	const wrapperCallback = callback;
	return () => {
		if (executeRef.value) return;
		executeRef.value = true;
		wrapperCallback();
		rafRef.value = raf(() => {
			executeRef.value = false;
		});
	};
}

//#endregion
export { useRafDebounce as default };