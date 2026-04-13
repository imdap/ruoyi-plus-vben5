import { computed } from "vue";
function useOffsetStyle(isMobile, ready, open, align, offsetR, offsetB, offsetX, offsetY) {
	const AUTO = "auto";
	return computed(() => {
		const offsetStyle = isMobile.value ? {} : {
			left: "-1000vw",
			top: "-1000vh",
			right: AUTO,
			bottom: AUTO
		};
		if (!isMobile.value && (ready.value || !open.value)) {
			const { points } = align.value ?? {};
			const dynamicInset = align.value?.dynamicInset || align.value?._experimental?.dynamicInset;
			const alignRight = dynamicInset && points?.[0]?.[1] === "r";
			const alignBottom = dynamicInset && points?.[0]?.[0] === "b";
			if (alignRight) {
				offsetStyle.right = `${offsetR.value}px`;
				offsetStyle.left = AUTO;
			} else {
				offsetStyle.left = `${offsetX.value}px`;
				offsetStyle.right = AUTO;
			}
			if (alignBottom) {
				offsetStyle.bottom = `${offsetB.value}px`;
				offsetStyle.top = AUTO;
			} else {
				offsetStyle.top = `${offsetY.value}px`;
				offsetStyle.bottom = AUTO;
			}
		}
		return offsetStyle;
	});
}
export { useOffsetStyle as default };
