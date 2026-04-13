import { ref } from "vue";
function useOriginScroll(isScrollAtTop, isScrollAtBottom, isScrollAtLeft, isScrollAtRight) {
	const lockRef = ref(false);
	let lockTimeout = null;
	function lockScroll() {
		if (lockTimeout) clearTimeout(lockTimeout);
		lockRef.value = true;
		lockTimeout = setTimeout(() => {
			lockRef.value = false;
		}, 50);
	}
	return (isHorizontal, delta, smoothOffset = false) => {
		const originScroll = isHorizontal ? delta < 0 && isScrollAtLeft.value || delta > 0 && isScrollAtRight.value : delta < 0 && isScrollAtTop.value || delta > 0 && isScrollAtBottom.value;
		if (smoothOffset && originScroll) {
			if (lockTimeout) clearTimeout(lockTimeout);
			lockRef.value = false;
		} else if (!originScroll || lockRef.value) lockScroll();
		return !lockRef.value && originScroll;
	};
}
export { useOriginScroll as default };
