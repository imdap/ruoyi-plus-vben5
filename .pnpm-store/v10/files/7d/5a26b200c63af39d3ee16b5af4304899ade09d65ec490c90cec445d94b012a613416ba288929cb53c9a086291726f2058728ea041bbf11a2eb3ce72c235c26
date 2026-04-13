import { onUnmounted, shallowRef } from "vue";
function useLock(duration = 250) {
	const lockRef = shallowRef(null);
	const timeoutRef = shallowRef(null);
	function cleanup() {
		if (timeoutRef.value !== null) {
			window.clearTimeout(timeoutRef.value);
			timeoutRef.value = null;
		}
	}
	onUnmounted(() => {
		cleanup();
	});
	function doLock(locked) {
		if (locked || lockRef.value === null) lockRef.value = locked;
		cleanup();
		timeoutRef.value = window.setTimeout(() => {
			lockRef.value = null;
			timeoutRef.value = null;
		}, duration);
	}
	return [() => !!lockRef.value, doLock];
}
export { useLock as default };
