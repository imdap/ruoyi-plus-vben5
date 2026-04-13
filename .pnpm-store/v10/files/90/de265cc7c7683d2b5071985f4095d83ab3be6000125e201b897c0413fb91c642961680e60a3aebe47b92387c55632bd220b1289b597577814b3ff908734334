import { onBeforeUnmount, shallowRef } from "vue";
import raf from "@v-c/util/dist/raf";

//#region src/slider/useRafLock.ts
function useRafLock() {
	const state = shallowRef(false);
	const rafRef = shallowRef(null);
	const cleanup = () => {
		raf.cancel(rafRef.value);
	};
	const setDelayState = (nextState) => {
		cleanup();
		if (nextState) state.value = nextState;
		else rafRef.value = raf(() => {
			state.value = nextState;
		});
	};
	onBeforeUnmount(() => {
		cleanup();
	});
	return [state, setDelayState];
}

//#endregion
export { useRafLock as default };