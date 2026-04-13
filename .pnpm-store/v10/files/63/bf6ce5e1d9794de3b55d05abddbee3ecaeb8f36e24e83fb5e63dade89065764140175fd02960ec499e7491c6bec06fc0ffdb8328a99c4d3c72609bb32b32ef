import { computed, shallowRef, watch } from "vue";

//#region src/spin/usePercent.ts
const AUTO_INTERVAL = 200;
const STEP_BUCKETS = [
	[30, .05],
	[70, .03],
	[96, .01]
];
function usePercent(spinning, percent) {
	const mockPercent = shallowRef(0);
	let mockIntervalRef = null;
	const isAuto = computed(() => percent.value === "auto");
	watch([isAuto, spinning], (_n, _o, onCleanup) => {
		if (isAuto.value && spinning.value) {
			mockPercent.value = 0;
			mockIntervalRef = setInterval(() => {
				const prev = mockPercent.value;
				const restPTG = 100 - prev;
				for (let i = 0; i < STEP_BUCKETS.length; i += 1) {
					const [limit, stepPtg] = STEP_BUCKETS[i];
					if (prev <= limit) {
						mockPercent.value = prev + restPTG * stepPtg;
						break;
					}
				}
			}, AUTO_INTERVAL);
		}
		onCleanup(() => {
			if (mockIntervalRef) {
				clearInterval(mockIntervalRef);
				mockIntervalRef = null;
			}
		});
	}, { immediate: true });
	return computed(() => isAuto.value ? mockPercent.value : percent.value);
}

//#endregion
export { usePercent as default };