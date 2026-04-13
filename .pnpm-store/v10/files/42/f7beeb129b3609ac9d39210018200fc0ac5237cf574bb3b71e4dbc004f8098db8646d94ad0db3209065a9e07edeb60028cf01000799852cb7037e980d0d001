Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_observerUtil = require("./utils/observerUtil.cjs");
let vue = require("vue");
function useResizeObserver(enabled, getTarget, onDelayResize, onSyncResize) {
	const sizeRef = (0, vue.shallowRef)({
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
	(0, vue.watch)([enabled, getTarget], (_, _o, onCleanup) => {
		const target = typeof getTarget === "function" ? getTarget() : (0, vue.unref)(getTarget);
		const isEnabled = (0, vue.unref)(enabled);
		if (target && isEnabled) {
			require_observerUtil.observe(target, onInternalResize);
			onCleanup(() => {
				if (target) require_observerUtil.unobserve(target, onInternalResize);
			});
		}
	}, {
		immediate: true,
		flush: "post"
	});
}
exports.default = useResizeObserver;
