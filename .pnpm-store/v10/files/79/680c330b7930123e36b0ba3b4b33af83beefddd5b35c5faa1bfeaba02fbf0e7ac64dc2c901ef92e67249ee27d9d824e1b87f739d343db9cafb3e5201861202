import { shallowRef, watch } from "vue";
//#region src/hooks/useOffsets.ts
var DEFAULT_SIZE = {
	width: 0,
	height: 0,
	left: 0,
	top: 0
};
function useOffsets(tabs, tabSizes, holderScrollWidth) {
	const mapRef = shallowRef(/* @__PURE__ */ new Map());
	watch([
		() => tabs.value.map((tab) => tab.key).join("_"),
		tabSizes,
		holderScrollWidth
	], () => {
		const map = /* @__PURE__ */ new Map();
		const firstKey = tabs.value[0]?.key;
		const lastOffset = (firstKey ? tabSizes.value.get(firstKey) : void 0) || DEFAULT_SIZE;
		const rightOffset = lastOffset.left + lastOffset.width;
		for (let i = 0; i < tabs.value.length; i += 1) {
			const { key } = tabs.value[i];
			let data = tabSizes.value.get(key);
			if (!data) {
				const prevKey = tabs.value[i - 1]?.key;
				data = (prevKey ? tabSizes.value.get(prevKey) : void 0) || DEFAULT_SIZE;
			}
			const entity = map.get(key) || {
				...data,
				right: 0
			};
			entity.right = rightOffset - entity.left - entity.width;
			map.set(key, entity);
		}
		mapRef.value = map;
	}, { immediate: true });
	return mapRef;
}
//#endregion
export { useOffsets as default };
