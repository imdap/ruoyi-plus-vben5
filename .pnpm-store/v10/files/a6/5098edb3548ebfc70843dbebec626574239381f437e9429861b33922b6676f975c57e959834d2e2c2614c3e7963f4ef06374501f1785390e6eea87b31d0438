import { collectScroller, getWin } from "../util.js";
import { nextTick, watch } from "vue";
function useWatch(open, target, popup, onAlign, onScroll) {
	watch([
		open,
		target,
		popup
	], async (_n, _o, onCleanup) => {
		if (open.value && target.value && popup.value) {
			await nextTick();
			const targetElement = target.value;
			const popupElement = popup.value;
			if (!targetElement || !popupElement) return;
			const targetScrollList = collectScroller(targetElement);
			const popupScrollList = collectScroller(popupElement);
			const win = getWin(popupElement);
			const mergedList = new Set([
				win,
				...targetScrollList,
				...popupScrollList
			]);
			function notifyScroll() {
				onAlign();
				onScroll();
			}
			mergedList.forEach((scroller) => {
				scroller.addEventListener("scroll", notifyScroll, { passive: true });
			});
			win.addEventListener("resize", notifyScroll, { passive: true });
			onAlign();
			onCleanup(() => {
				mergedList.forEach((scroller) => {
					scroller.removeEventListener("scroll", notifyScroll);
					win.removeEventListener("resize", notifyScroll);
				});
			});
		}
	}, { flush: "post" });
}
export { useWatch as default };
