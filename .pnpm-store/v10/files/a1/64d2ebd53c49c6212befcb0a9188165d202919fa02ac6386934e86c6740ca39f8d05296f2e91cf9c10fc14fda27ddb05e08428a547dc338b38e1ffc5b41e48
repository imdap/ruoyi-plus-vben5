Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_util = require("../util.cjs");
let vue = require("vue");
let _v_c_util_dist_Dom_canUseDom = require("@v-c/util/dist/Dom/canUseDom");
_v_c_util_dist_Dom_canUseDom = require_rolldown_runtime.__toESM(_v_c_util_dist_Dom_canUseDom);
let _v_c_util_dist_vnode = require("@v-c/util/dist/vnode");
function isValidNumber(val) {
	return typeof val === "number" && !Number.isNaN(val);
}
function useTarget(target, open, gap, scrollIntoViewOptions, inlineMode, placeholderRef) {
	const targetElement = (0, vue.shallowRef)(null);
	const syncTargetElement = () => {
		targetElement.value = (0, _v_c_util_dist_vnode.resolveToElement)((typeof target.value === "function" ? target.value() : target.value) || null);
	};
	(0, vue.watch)(target, () => {
		if (!(0, _v_c_util_dist_Dom_canUseDom.default)()) return;
		syncTargetElement();
	}, {
		immediate: true,
		flush: "post"
	});
	const posInfo = (0, vue.shallowRef)(null);
	const updatePos = () => {
		if (targetElement.value) {
			if (!inlineMode?.value && !require_util.isInViewPort(targetElement.value) && open.value) targetElement.value?.scrollIntoView(scrollIntoViewOptions.value);
			const { left, top, width, height } = targetElement.value.getBoundingClientRect();
			const nextPosInfo = {
				left,
				top,
				width,
				height,
				radius: 0
			};
			if (inlineMode?.value) {
				const parentRect = placeholderRef?.value?.parentElement?.getBoundingClientRect?.();
				if (parentRect) {
					nextPosInfo.left -= parentRect.left;
					nextPosInfo.top -= parentRect.top;
				}
			}
			const origin = posInfo.value;
			if (JSON.stringify(origin) !== JSON.stringify(nextPosInfo)) posInfo.value = nextPosInfo;
		} else posInfo.value = null;
	};
	(0, vue.onMounted)(() => {
		syncTargetElement();
		updatePos();
	});
	const getGapOffset = (index) => (Array.isArray(gap?.value?.offset) ? gap?.value?.offset[index] : gap?.value?.offset) ?? 6;
	(0, vue.watch)([targetElement, open], async (_n, _o, onCleanup) => {
		if (!(0, _v_c_util_dist_Dom_canUseDom.default)()) return;
		await (0, vue.nextTick)();
		updatePos();
		window.addEventListener("resize", updatePos);
		window.addEventListener("scroll", updatePos);
		onCleanup(() => {
			window.removeEventListener("resize", updatePos);
			window.removeEventListener("scroll", updatePos);
		});
	}, {
		immediate: true,
		flush: "post"
	});
	return [(0, vue.computed)(() => {
		if (!posInfo.value) return posInfo.value;
		const gapOffsetX = getGapOffset(0);
		const gapOffsetY = getGapOffset(1);
		const gapRadius = isValidNumber(gap?.value?.radius) ? gap?.value?.radius : 2;
		return {
			left: posInfo.value.left - gapOffsetX,
			top: posInfo.value.top - gapOffsetY,
			width: posInfo.value.width + gapOffsetX * 2,
			height: posInfo.value.height + gapOffsetY * 2,
			radius: gapRadius
		};
	}), targetElement];
}
exports.default = useTarget;
