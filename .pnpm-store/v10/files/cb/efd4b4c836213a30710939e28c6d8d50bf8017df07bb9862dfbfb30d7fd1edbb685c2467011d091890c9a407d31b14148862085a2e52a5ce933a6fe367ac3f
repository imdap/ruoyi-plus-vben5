import { nextTick, onMounted, onUnmounted, onUpdated, watch } from "vue";
function useLayoutEffect(callback, deps = []) {
	let close = null;
	if (deps && deps.length) watch(deps, async () => {
		if (close) close?.();
		await nextTick();
		if (typeof callback === "function") close = callback();
	}, {
		immediate: true,
		flush: "post"
	});
	else {
		onMounted(() => {
			if (close) close?.();
			if (typeof callback === "function") close = callback();
		});
		onUpdated(() => {
			if (close) close?.();
			if (typeof callback === "function") close = callback();
		});
	}
	onUnmounted(() => {
		if (close) close?.();
	});
}
function useLayoutUpdateEffect(callback, deps) {
	let close = null;
	watch(deps, async () => {
		if (close) close?.();
		await nextTick();
		if (typeof callback === "function") close = callback();
	}, { flush: "post" });
}
export { useLayoutEffect, useLayoutUpdateEffect };
