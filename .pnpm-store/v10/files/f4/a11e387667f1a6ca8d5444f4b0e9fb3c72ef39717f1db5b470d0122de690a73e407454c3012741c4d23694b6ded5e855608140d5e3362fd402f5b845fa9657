import { getPtg } from "./useSizes.js";
import { computed, shallowRef } from "vue";

//#region src/splitter/hooks/useResize.ts
/**
* Handle user drag resize logic.
*/
function useResize(items, resizableInfos, percentSizes, containerSize, updateSizes, reverse) {
	const limitSizes = computed(() => items.value.map((item) => [item.min, item.max]));
	const mergedContainerSize = computed(() => containerSize.value || 0);
	const ptg2px = (ptg) => ptg * mergedContainerSize.value;
	function getLimitSize(str, defaultLimit) {
		if (typeof str === "string") return ptg2px(getPtg(str));
		return str ?? defaultLimit;
	}
	const cacheSizes = shallowRef([]);
	const cacheCollapsedSize = shallowRef([]);
	/**
	* When start drag, check the direct is `start` or `end`.
	* This will handle when 2 splitter bar are in the same position.
	*/
	const movingIndex = shallowRef(null);
	const getPxSizes = () => percentSizes.value.map(ptg2px);
	const onOffsetStart = (index) => {
		cacheSizes.value = getPxSizes();
		movingIndex.value = {
			index,
			confirmed: false
		};
	};
	const onOffsetUpdate = (index, offset) => {
		let confirmedIndex = null;
		if ((!movingIndex.value || !movingIndex.value.confirmed) && offset !== 0) {
			if (offset > 0) {
				confirmedIndex = index;
				movingIndex.value = {
					index,
					confirmed: true
				};
			} else for (let i = index; i >= 0; i -= 1) if (cacheSizes.value[i] > 0 && resizableInfos.value[i].resizable) {
				confirmedIndex = i;
				movingIndex.value = {
					index: i,
					confirmed: true
				};
				break;
			}
		}
		const mergedIndex = confirmedIndex ?? movingIndex.value?.index ?? index;
		const numSizes = [...cacheSizes.value];
		const nextIndex = mergedIndex + 1;
		const startMinSize = getLimitSize(limitSizes.value[mergedIndex][0], 0);
		const endMinSize = getLimitSize(limitSizes.value[nextIndex][0], 0);
		const startMaxSize = getLimitSize(limitSizes.value[mergedIndex][1], mergedContainerSize.value);
		const endMaxSize = getLimitSize(limitSizes.value[nextIndex][1], mergedContainerSize.value);
		let mergedOffset = offset;
		if (numSizes[mergedIndex] + mergedOffset < startMinSize) mergedOffset = startMinSize - numSizes[mergedIndex];
		if (numSizes[nextIndex] - mergedOffset < endMinSize) mergedOffset = numSizes[nextIndex] - endMinSize;
		if (numSizes[mergedIndex] + mergedOffset > startMaxSize) mergedOffset = startMaxSize - numSizes[mergedIndex];
		if (numSizes[nextIndex] - mergedOffset > endMaxSize) mergedOffset = numSizes[nextIndex] - endMaxSize;
		numSizes[mergedIndex] = numSizes[mergedIndex] + mergedOffset;
		numSizes[nextIndex] = numSizes[nextIndex] - mergedOffset;
		updateSizes(numSizes);
		return numSizes;
	};
	const onOffsetEnd = () => {
		movingIndex.value = null;
	};
	const onCollapse = (index, type) => {
		const currentSizes = getPxSizes();
		const adjustedType = reverse.value ? type === "start" ? "end" : "start" : type;
		const currentIndex = adjustedType === "start" ? index : index + 1;
		const targetIndex = adjustedType === "start" ? index + 1 : index;
		const currentSize = currentSizes[currentIndex];
		const targetSize = currentSizes[targetIndex];
		if (currentSize !== 0 && targetSize !== 0) {
			currentSizes[currentIndex] = 0;
			currentSizes[targetIndex] = currentSizes[targetIndex] + currentSize;
			cacheCollapsedSize.value = [...cacheCollapsedSize.value];
			cacheCollapsedSize.value[index] = currentSize;
		} else {
			const totalSize = currentSize + targetSize;
			const currentSizeMin = getLimitSize(limitSizes.value[currentIndex][0], 0);
			const currentSizeMax = getLimitSize(limitSizes.value[currentIndex][1], mergedContainerSize.value);
			const targetSizeMin = getLimitSize(limitSizes.value[targetIndex][0], 0);
			const targetSizeMax = getLimitSize(limitSizes.value[targetIndex][1], mergedContainerSize.value);
			const limitStart = Math.max(currentSizeMin, totalSize - targetSizeMax);
			const limitEnd = Math.min(currentSizeMax, totalSize - targetSizeMin);
			const halfOffset = targetSizeMin || (limitEnd - limitStart) / 2;
			const targetCacheCollapsedSize = cacheCollapsedSize.value[index];
			const currentCacheCollapsedSize = totalSize - targetCacheCollapsedSize;
			if (targetCacheCollapsedSize && targetCacheCollapsedSize <= targetSizeMax && targetCacheCollapsedSize >= targetSizeMin && currentCacheCollapsedSize <= currentSizeMax && currentCacheCollapsedSize >= currentSizeMin) {
				currentSizes[targetIndex] = targetCacheCollapsedSize;
				currentSizes[currentIndex] = currentCacheCollapsedSize;
			} else {
				currentSizes[currentIndex] = currentSizes[currentIndex] - halfOffset;
				currentSizes[targetIndex] = currentSizes[targetIndex] + halfOffset;
			}
		}
		updateSizes(currentSizes);
		return currentSizes;
	};
	return [
		onOffsetStart,
		onOffsetUpdate,
		onOffsetEnd,
		onCollapse,
		computed(() => movingIndex.value?.index)
	];
}

//#endregion
export { useResize as default };