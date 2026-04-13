import Item_default from "../Item.js";
import { computed, createVNode, isVNode } from "vue";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function useChildren(list, startIndex, endIndex, scrollWidth, offsetX, setNodeRef, renderFunc, { getKey }) {
	return computed(() => {
		return list.value.slice(startIndex.value, endIndex.value + 1).map((item, index) => {
			const node = renderFunc(item, startIndex.value + index, {
				style: { width: `${scrollWidth.value}px` },
				offsetX: offsetX.value
			});
			const key = getKey(item);
			return createVNode(Item_default, {
				"key": key,
				"setRef": (ele) => setNodeRef(item, ele)
			}, _isSlot(node) ? node : { default: () => [node] });
		});
	});
}
export { useChildren as default };
