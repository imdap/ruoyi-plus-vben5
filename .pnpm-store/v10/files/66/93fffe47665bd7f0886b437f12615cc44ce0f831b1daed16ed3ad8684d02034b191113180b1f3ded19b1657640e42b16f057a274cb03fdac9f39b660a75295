import { isInViewPort } from "../util.js";
import { computed, nextTick, onMounted, shallowRef, watch } from "vue";
import canUseDom from "@v-c/util/dist/Dom/canUseDom";
import { resolveToElement } from "@v-c/util/dist/vnode";
function isValidNumber(val) {
	return typeof val === "number" && !Number.isNaN(val);
}
function useTarget(target, open, gap, scrollIntoViewOptions, inlineMode, placeholderRef) {
	const targetElement = shallowRef(null);
	const syncTargetElement = () => {
		targetElement.value = resolveToElement((typeof target.value === "function" ? target.value() : target.value) || null);
	};
	watch(target, () => {
		if (!canUseDom()) return;
		syncTargetElement();
	}, {
		immediate: true,
		flush: "post"
	});
	const posInfo = shallowRef(null);
	const updatePos = () => {
		if (targetElement.value) {
			if (!inlineMode?.value && !isInViewPort(targetElement.value) && open.value) targetElement.value?.scrollIntoView(scrollIntoViewOptions.value);
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
	onMounted(() => {
		syncTargetElement();
		updatePos();
	});
	const getGapOffset = (index) => (Array.isArray(gap?.value?.offset) ? gap?.value?.offset[index] : gap?.value?.offset) ?? 6;
	watch([targetElement, open], async (_n, _o, onCleanup) => {
		if (!canUseDom()) return;
		await nextTick();
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
	return [computed(() => {
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
export { useTarget as default };
