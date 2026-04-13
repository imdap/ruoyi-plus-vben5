import { onBeforeUnmount, ref } from "vue";
function useDelay() {
	const delayRef = ref(null);
	const clearDelay = () => {
		if (delayRef.value) {
			clearTimeout(delayRef.value);
			delayRef.value = null;
		}
	};
	const delayInvoke = (callback, delay) => {
		clearDelay();
		if (delay === 0) callback();
		else delayRef.value = setTimeout(() => {
			callback();
		}, delay * 1e3);
	};
	onBeforeUnmount(() => {
		clearDelay();
	});
	return delayInvoke;
}
export { useDelay as default };
