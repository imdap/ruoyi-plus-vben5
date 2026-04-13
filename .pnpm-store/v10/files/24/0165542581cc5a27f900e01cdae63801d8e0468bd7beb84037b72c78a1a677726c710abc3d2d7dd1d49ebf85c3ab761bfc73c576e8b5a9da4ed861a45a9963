function getIndexByStartLoc(min, max, start, index) {
	const beforeCount = start - min;
	const afterCount = max - start;
	if (index <= Math.min(beforeCount, afterCount) * 2) {
		const stepIndex = Math.floor(index / 2);
		if (index % 2) return start + stepIndex + 1;
		return start - stepIndex;
	}
	if (beforeCount > afterCount) return start - (index - afterCount);
	return start + (index - beforeCount);
}
function findListDiffIndex(originList, targetList, getKey) {
	const originLen = originList.length;
	const targetLen = targetList.length;
	let shortList;
	let longList;
	if (originLen === 0 && targetLen === 0) return null;
	if (originLen < targetLen) {
		shortList = originList;
		longList = targetList;
	} else {
		shortList = targetList;
		longList = originList;
	}
	const notExistKey = { __EMPTY_ITEM__: true };
	function getItemKey(item) {
		if (item !== void 0) return getKey(item);
		return notExistKey;
	}
	let diffIndex = null;
	let multiple = Math.abs(originLen - targetLen) !== 1;
	for (let i = 0; i < longList.length; i += 1) {
		const shortKey = getItemKey(shortList[i]);
		if (shortKey !== getItemKey(longList[i])) {
			diffIndex = i;
			multiple = multiple || shortKey !== getItemKey(longList[i + 1]);
			break;
		}
	}
	return diffIndex === null ? null : {
		index: diffIndex,
		multiple
	};
}
export { findListDiffIndex, getIndexByStartLoc };
