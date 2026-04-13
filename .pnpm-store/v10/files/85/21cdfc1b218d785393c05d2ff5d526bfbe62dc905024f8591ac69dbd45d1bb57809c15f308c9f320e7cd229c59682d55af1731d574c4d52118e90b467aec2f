import { onBeforeUnmount, ref, shallowRef } from "vue";
import raf from "@v-c/util/dist/raf";
//#region src/hooks/useFrame.ts
function useLayoutState(defaultState) {
	const stateRef = shallowRef(defaultState);
	let rafId;
	const updateBatchRef = shallowRef([]);
	function setFrameState(updater) {
		updateBatchRef.value.push(updater);
		raf.cancel(rafId);
		rafId = raf(() => {
			const prevBatch = updateBatchRef.value;
			updateBatchRef.value = [];
			prevBatch.forEach((batchUpdater) => {
				stateRef.value = batchUpdater(stateRef.value);
			});
		});
	}
	onBeforeUnmount(() => {
		raf.cancel(rafId);
	});
	return [stateRef, setFrameState];
}
function useTimeoutLock(defaultState) {
	const frameRef = ref(defaultState || null);
	const timeoutRef = ref();
	function cleanUp() {
		clearTimeout(timeoutRef.value);
	}
	function setState(newState) {
		frameRef.value = newState;
		cleanUp();
		timeoutRef.value = setTimeout(() => {
			frameRef.value = null;
			timeoutRef.value = void 0;
		}, 100);
	}
	function getState() {
		return frameRef.value;
	}
	onBeforeUnmount(() => {
		cleanUp();
	});
	return [setState, getState];
}
//#endregion
export { useLayoutState, useTimeoutLock };
