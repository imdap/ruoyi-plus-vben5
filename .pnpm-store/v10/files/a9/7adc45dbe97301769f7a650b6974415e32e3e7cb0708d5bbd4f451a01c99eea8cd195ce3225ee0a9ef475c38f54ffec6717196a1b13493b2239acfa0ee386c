//#region src/splitter/hooks/sizeUtil.ts
function autoPtgSizes(ptgSizes, minPtgSizes, maxPtgSizes) {
	let currentTotalPtg = 0;
	const undefinedIndexes = [];
	ptgSizes.forEach((size, index) => {
		if (size === void 0) undefinedIndexes.push(index);
		else currentTotalPtg += size;
	});
	const restPtg = 1 - currentTotalPtg;
	const undefinedCount = undefinedIndexes.length;
	if (ptgSizes.length && !undefinedIndexes.length && currentTotalPtg !== 1) {
		if (currentTotalPtg === 0) {
			const avg = 1 / ptgSizes.length;
			return ptgSizes.map(() => avg);
		}
		const scale = 1 / currentTotalPtg;
		return ptgSizes.map((size) => size * scale);
	}
	if (restPtg < 0) {
		const scale = 1 / currentTotalPtg;
		return ptgSizes.map((size) => size === void 0 ? 0 : size * scale);
	}
	let sumMin = 0;
	let sumMax = 0;
	let limitMin = 0;
	let limitMax = 1;
	for (const index of undefinedIndexes) {
		const min = minPtgSizes[index] || 0;
		const max = maxPtgSizes[index] || 1;
		sumMin += min;
		sumMax += max;
		limitMin = Math.max(limitMin, min);
		limitMax = Math.min(limitMax, max);
	}
	if (sumMin > 1 && sumMax < 1) {
		const avg = 1 / undefinedCount;
		return ptgSizes.map((size) => size === void 0 ? avg : size);
	}
	const restAvg = restPtg / undefinedCount;
	if (limitMin <= restAvg && restAvg <= limitMax) return ptgSizes.map((size) => size === void 0 ? restAvg : size);
	const result = [...ptgSizes];
	let remain = restPtg - sumMin;
	for (let i = 0; i < undefinedCount; i += 1) {
		const index = undefinedIndexes[i];
		const min = minPtgSizes[index] || 0;
		const max = maxPtgSizes[index] || 1;
		result[index] = min;
		const canAdd = max - min;
		const add = Math.min(canAdd, remain);
		result[index] += add;
		remain -= add;
	}
	return result;
}

//#endregion
export { autoPtgSizes };