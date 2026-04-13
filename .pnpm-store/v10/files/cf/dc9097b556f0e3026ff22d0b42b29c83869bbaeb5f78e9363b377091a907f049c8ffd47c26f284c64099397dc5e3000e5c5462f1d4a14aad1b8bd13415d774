import { autoPtgSizes } from "./sizeUtil.js";
import { computed, shallowRef, unref } from "vue";

//#region src/splitter/hooks/useSizes.ts
function getPtg(str) {
	return Number(str.slice(0, -1)) / 100;
}
function isPtg(itemSize) {
	return typeof itemSize === "string" && itemSize.endsWith("%");
}
/**
* Save the size state.
* Align the size into flex percentage base.
*/
function useSizes(items, containerSize) {
	const propSizes = computed(() => items.value.map((item) => item.size));
	const itemsCount = computed(() => items.value.length);
	const mergedContainerSize = computed(() => unref(containerSize) || 0);
	const ptg2px = (ptg) => ptg * mergedContainerSize.value;
	const innerSizes = shallowRef([]);
	let lastItemsCount = 0;
	const sizes = computed(() => {
		const currentCount = itemsCount.value;
		if (currentCount !== lastItemsCount) {
			lastItemsCount = currentCount;
			innerSizes.value = items.value?.map((item) => item.defaultSize);
		}
		return propSizes.value.some((size) => size != null) ? propSizes.value : innerSizes.value;
	});
	const postPercentMinSizes = computed(() => {
		return items.value.map((item) => {
			if (isPtg(item.min)) return getPtg(item.min);
			return (item.min || 0) / mergedContainerSize.value;
		});
	});
	const postPercentMaxSizes = computed(() => {
		return items.value.map((item) => {
			if (isPtg(item.max)) return getPtg(item.max);
			return (item.max || mergedContainerSize.value) / mergedContainerSize.value;
		});
	});
	const postPercentSizes = computed(() => {
		const ptgList = [];
		for (let i = 0; i < itemsCount.value; i += 1) {
			const itemSize = sizes.value[i];
			if (isPtg(itemSize)) ptgList[i] = getPtg(itemSize);
			else if (itemSize || itemSize === 0) {
				const num = Number(itemSize);
				if (!Number.isNaN(num)) ptgList[i] = num / mergedContainerSize.value;
			} else ptgList[i] = void 0;
		}
		return autoPtgSizes(ptgList, postPercentMinSizes.value, postPercentMaxSizes.value);
	});
	const postPxSizes = computed(() => postPercentSizes.value.map(ptg2px));
	const panelSizes = computed(() => containerSize?.value ? postPxSizes.value : sizes.value);
	const setInnerSizes = (newSizes) => {
		innerSizes.value = newSizes;
	};
	return [
		panelSizes,
		postPxSizes,
		postPercentSizes,
		postPercentMinSizes,
		postPercentMaxSizes,
		setInnerSizes
	];
}

//#endregion
export { useSizes as default, getPtg };