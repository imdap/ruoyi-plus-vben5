import { isImageValid } from "../util.js";
import { computed, shallowRef, watch, watchEffect } from "vue";
//#region src/hooks/useStatus.ts
function useStatus(options) {
	const { src, isCustomPlaceholder, fallback } = options;
	const status = shallowRef(isCustomPlaceholder?.value ? "loading" : "normal");
	const isLoaded = shallowRef(false);
	const isError = computed(() => status.value === "error");
	watchEffect((onCleanup) => {
		let isCurrentSrc = true;
		isImageValid(src.value || "").then((isValid) => {
			if (!isValid && isCurrentSrc) status.value = "error";
		});
		onCleanup(() => {
			isCurrentSrc = false;
		});
	});
	watch(() => src.value, () => {
		isLoaded.value = false;
		if (isCustomPlaceholder?.value && !isLoaded.value) status.value = "loading";
		else if (isError.value) status.value = "normal";
	}, { immediate: true });
	const onLoad = () => {
		isLoaded.value = true;
		status.value = "normal";
	};
	const getImgRef = (img) => {
		isLoaded.value = false;
		if (status.value === "loading" && img?.complete && (img.naturalWidth || img.naturalHeight)) {
			isLoaded.value = true;
			onLoad();
		}
	};
	return [
		getImgRef,
		computed(() => {
			if (isError.value && fallback?.value) return { src: fallback.value };
			return {
				onLoad,
				src: src.value
			};
		}),
		status
	];
}
//#endregion
export { useStatus as default };
