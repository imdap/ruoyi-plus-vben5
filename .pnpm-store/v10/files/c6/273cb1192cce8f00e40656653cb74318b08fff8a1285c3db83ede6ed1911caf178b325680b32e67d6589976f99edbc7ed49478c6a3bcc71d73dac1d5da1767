import { onBeforeUnmount, onMounted } from "vue";

//#region src/input/hooks/useRemovePasswordTimeout.ts
/**
* Clear the `value` attribute of password inputs to avoid browser autofill flashes.
*/
function useRemovePasswordTimeout(inputRef, triggerOnMount = false) {
	const timeoutIds = [];
	const removePasswordTimeout = () => {
		const timer = setTimeout(() => {
			const input = inputRef.value?.input;
			if (input && input.getAttribute("type") === "password" && input.hasAttribute("value")) input.removeAttribute("value");
		});
		timeoutIds.push(timer);
	};
	onMounted(() => {
		if (triggerOnMount) removePasswordTimeout();
	});
	onBeforeUnmount(() => {
		timeoutIds.forEach((timer) => {
			clearTimeout(timer);
		});
		timeoutIds.length = 0;
	});
	return removePasswordTimeout;
}

//#endregion
export { useRemovePasswordTimeout as default };