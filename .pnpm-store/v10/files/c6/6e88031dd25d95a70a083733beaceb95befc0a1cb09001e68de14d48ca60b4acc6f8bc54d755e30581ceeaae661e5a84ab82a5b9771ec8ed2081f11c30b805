import { observe, unobserve } from "./utils/observerUtil.js";
import { shallowRef, unref, watch } from "vue";
function useResizeObserver(enabled, getTarget, onDelayResize, onSyncResize) {
	const sizeRef = shallowRef({
		width: -1,
		height: -1,
		offsetWidth: -1,
		offsetHeight: -1
	});
	const onInternalResize = (target) => {
		const { width, height } = target.getBoundingClientRect();
		const { offsetWidth, offsetHeight } = target;
		const fixedWidth = Math.floor(width);
		const fixedHeight = Math.floor(height);
		if (sizeRef.value.width !== fixedWidth || sizeRef.value.height !== fixedHeight || sizeRef.value.offsetWidth !== offsetWidth || sizeRef.value.offsetHeight !== offsetHeight) {
			const size = {
				width: fixedWidth,
				height: fixedHeight,
				offsetWidth,
				offsetHeight
			};
			sizeRef.value = size;
			const mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
			const mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
			const sizeInfo = {
				...size,
				offsetWidth: mergedOffsetWidth,
				offsetHeight: mergedOffsetHeight
			};
			onSyncResize?.(sizeInfo, target);
			Promise.resolve().then(() => {
				onDelayResize?.(sizeInfo, target);
			});
		}
	};
	watch([enabled, getTarget], (_, _o, onCleanup) => {
		const target = typeof getTarget === "function" ? getTarget() : unref(getTarget);
		const isEnabled = unref(enabled);
		if (target && isEnabled) {
			observe(target, onInternalResize);
			onCleanup(() => {
				if (target) unobserve(target, onInternalResize);
			});
		}
	}, {
		immediate: true,
		flush: "post"
	});
}
export { useResizeObserver as default };
