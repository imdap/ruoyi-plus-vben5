import { findListDiffIndex } from "../utils/algorithmUtil.js";
import { shallowRef, watch } from "vue";
function useDiffItem(data, getKey, onDiff) {
	const prevData = shallowRef(data.value);
	const diffItem = shallowRef();
	watch(data, (newData) => {
		const diff = findListDiffIndex(prevData.value || [], data.value || [], getKey);
		if (diff?.index !== void 0) {
			onDiff?.(diff.index);
			diffItem.value = newData[diff.index];
		}
		prevData.value = newData;
	}, { immediate: true });
	return diffItem;
}
export { useDiffItem as default };
