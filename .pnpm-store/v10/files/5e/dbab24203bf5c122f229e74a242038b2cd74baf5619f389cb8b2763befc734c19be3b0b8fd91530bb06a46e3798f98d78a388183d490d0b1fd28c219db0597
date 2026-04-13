import { ref, unref } from "vue";
import raf from "@v-c/util/dist/raf";
var SPEED_PTG = 1 / 3;
function useScrollTo(ulRef, value) {
	const scrollingRef = ref(false);
	const scrollRafRef = ref(null);
	const scrollDistRef = ref(null);
	const scrollRafTimesRef = ref(0);
	const isScrolling = () => scrollingRef.value;
	const stopScroll = () => {
		if (scrollRafRef.value) raf.cancel(scrollRafRef.value);
		scrollingRef.value = false;
	};
	const startScroll = () => {
		const ul = unref(ulRef);
		const val = unref(value);
		scrollDistRef.value = null;
		scrollRafTimesRef.value = 0;
		if (ul) {
			const targetLi = ul.querySelector(`[data-value="${val}"]`);
			const firstLi = ul.querySelector(`li`);
			const doScroll = () => {
				stopScroll();
				scrollingRef.value = true;
				scrollRafTimesRef.value += 1;
				const { scrollTop: currentTop } = ul;
				const firstLiTop = firstLi.offsetTop;
				const targetLiTop = targetLi?.offsetTop || 0;
				const targetTop = targetLiTop - firstLiTop;
				const isVisible = ul.offsetParent !== null;
				if (targetLiTop === 0 && targetLi !== firstLi || !isVisible) {
					if (scrollRafTimesRef.value <= 5) scrollRafRef.value = raf(doScroll);
					return;
				}
				const nextTop = currentTop + (targetTop - currentTop) * SPEED_PTG;
				const dist = Math.abs(targetTop - nextTop);
				if (scrollDistRef.value !== null && scrollDistRef.value < dist) {
					stopScroll();
					return;
				}
				scrollDistRef.value = dist;
				if (dist <= 1) {
					ul.scrollTop = targetTop;
					stopScroll();
					return;
				}
				ul.scrollTop = nextTop;
				scrollRafRef.value = raf(doScroll);
			};
			if (targetLi && firstLi) doScroll();
		}
	};
	return [
		startScroll,
		stopScroll,
		isScrolling
	];
}
export { useScrollTo as default };
