import { nextTick, onUnmounted, ref, watch } from "vue";
import raf from "@v-c/util/dist/raf";
//#region src/hooks/useIndicator.ts
function useIndicator(options) {
	const { activeTabOffset, horizontal, rtl, indicator } = options;
	const inkStyle = ref();
	const inkBarRafRef = ref();
	const getLength = (origin) => {
		const size = indicator?.value?.size;
		if (typeof size === "function") return size(origin);
		if (typeof size === "number") return size;
		return origin;
	};
	function cleanInkBarRaf() {
		if (!inkBarRafRef.value) return;
		raf.cancel(inkBarRafRef.value);
	}
	watch([
		() => activeTabOffset.value,
		() => horizontal.value,
		() => rtl.value,
		() => indicator?.value
	], async (_n, _o) => {
		await nextTick();
		const align = indicator?.value?.align || "center";
		const newInkStyle = {};
		if (activeTabOffset.value) if (horizontal.value) {
			newInkStyle.width = `${getLength(activeTabOffset.value.width)}px`;
			const key = rtl.value ? "right" : "left";
			if (align === "start") newInkStyle[key] = `${activeTabOffset.value[key]}px`;
			if (align === "center") {
				newInkStyle[key] = `${activeTabOffset.value[key] + activeTabOffset.value.width / 2}px`;
				newInkStyle.transform = rtl.value ? "translateX(50%)" : "translateX(-50%)";
			}
			if (align === "end") {
				newInkStyle[key] = `${activeTabOffset.value[key] + activeTabOffset.value.width}px`;
				newInkStyle.transform = "translateX(-100%)";
			}
		} else {
			newInkStyle.height = `${getLength(activeTabOffset.value.height)}px`;
			if (align === "start") newInkStyle.top = `${activeTabOffset.value.top}px`;
			if (align === "center") {
				newInkStyle.top = `${activeTabOffset.value.top + activeTabOffset.value.height / 2}px`;
				newInkStyle.transform = "translateY(-50%)";
			}
			if (align === "end") {
				newInkStyle.top = `${activeTabOffset.value.top + activeTabOffset.value.height}px`;
				newInkStyle.transform = "translateY(-100%)";
			}
		}
		cleanInkBarRaf();
		inkBarRafRef.value = raf(() => {
			if (!(inkStyle.value && newInkStyle && Object.keys(newInkStyle).every((key) => {
				const newValue = newInkStyle[key];
				const oldValue = inkStyle.value?.[key];
				return typeof newValue === "number" && typeof oldValue === "number" ? Math.round(newValue) === Math.round(oldValue) : newValue === oldValue;
			}))) inkStyle.value = newInkStyle;
		});
	}, { immediate: true });
	onUnmounted(() => {
		cleanInkBarRaf();
	});
	return inkStyle;
}
//#endregion
export { useIndicator as default };
