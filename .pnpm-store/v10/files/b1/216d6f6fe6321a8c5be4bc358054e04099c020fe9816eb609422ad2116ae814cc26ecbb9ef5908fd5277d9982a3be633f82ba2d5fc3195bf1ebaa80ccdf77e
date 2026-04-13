import { computed, shallowRef, watch } from "vue";
//#region src/hooks/useVisibleRange.ts
var DEFAULT_SIZE = {
	width: 0,
	height: 0,
	left: 0,
	top: 0,
	right: 0
};
function useVisibleRange(tabOffsets, visibleTabContentValue, transform, tabContentSizeValue, addNodeSizeValue, operationNodeSizeValue, { tabs, tabPosition, rtl }) {
	const isHorizontal = computed(() => tabPosition.value === "top" || tabPosition.value === "bottom");
	const charUnit = computed(() => isHorizontal.value ? "width" : "height");
	const position = computed(() => isHorizontal.value ? rtl.value ? "right" : "left" : "top");
	const transformSize = computed(() => isHorizontal.value ? Math.abs(transform.value) : -transform.value);
	const rangeRef = shallowRef([0, 0]);
	watch([
		tabOffsets,
		visibleTabContentValue,
		tabContentSizeValue,
		addNodeSizeValue,
		operationNodeSizeValue,
		transformSize,
		tabPosition,
		rtl,
		() => tabs.value.map((tab) => tab.key).join("_")
	], () => {
		const list = tabs.value;
		if (!list.length) {
			rangeRef.value = [0, 0];
			return;
		}
		const len = list.length;
		let endIndex = len;
		for (let i = 0; i < len; i += 1) {
			const offset = tabOffsets.value.get(list[i].key) || DEFAULT_SIZE;
			if (Math.floor(offset[position.value] + offset[charUnit.value]) > Math.floor(transformSize.value + visibleTabContentValue.value)) {
				endIndex = i - 1;
				break;
			}
		}
		let startIndex = 0;
		for (let i = len - 1; i >= 0; i -= 1) if ((tabOffsets.value.get(list[i].key) || DEFAULT_SIZE)[position.value] < transformSize.value) {
			startIndex = i + 1;
			break;
		}
		rangeRef.value = startIndex > endIndex ? [0, -1] : [startIndex, endIndex];
	}, { immediate: true });
	return rangeRef;
}
//#endregion
export { useVisibleRange as default };
