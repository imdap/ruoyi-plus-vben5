import { watch } from "vue";
function useGetSize(mergedData, getKey, heights, itemHeight) {
	let key2Index = /* @__PURE__ */ new Map();
	let bottomList = [];
	watch([
		mergedData,
		() => heights.id.value,
		itemHeight
	], () => {
		key2Index = /* @__PURE__ */ new Map();
		bottomList = [];
	});
	const getSize = (startKey, endKey = startKey) => {
		let startIndex = key2Index.get(startKey);
		let endIndex = key2Index.get(endKey);
		if (startIndex === void 0 || endIndex === void 0) {
			const dataLen = mergedData.value.length;
			for (let i = bottomList.length; i < dataLen; i += 1) {
				const item = mergedData.value[i];
				const key = getKey(item);
				key2Index.set(key, i);
				const cacheHeight = heights.get(key) ?? itemHeight.value;
				bottomList[i] = (bottomList[i - 1] || 0) + cacheHeight;
				if (key === startKey) startIndex = i;
				if (key === endKey) endIndex = i;
				if (startIndex !== void 0 && endIndex !== void 0) break;
			}
		}
		return {
			top: bottomList[startIndex - 1] || 0,
			bottom: bottomList[endIndex]
		};
	};
	return getSize;
}
export { useGetSize };
