import { COMMON_PROPS } from "../common.js";
import { computed, shallowRef, watchEffect } from "vue";
//#region src/hooks/usePreviewItems.ts
/**
* Merge props provided `items` or context collected images
*/
function usePreviewItems(items) {
	const images = shallowRef({});
	const registerImage = (id, data) => {
		images.value = {
			...images.value,
			[id]: data
		};
		return () => {
			const cloneImgs = { ...images.value };
			delete cloneImgs[id];
			images.value = cloneImgs;
		};
	};
	const mergedItems = shallowRef([]);
	watchEffect(() => {
		if (items?.value) {
			mergedItems.value = items.value.map((item) => {
				if (typeof item === "string") return { data: { src: item } };
				const data = {};
				Object.keys(item).forEach((key) => {
					if (["src", ...COMMON_PROPS].includes(key)) data[key] = item[key];
				});
				return { data };
			});
			return;
		}
		mergedItems.value = Object.keys(images.value).reduce((total, id) => {
			const { canPreview, data } = images.value[id];
			if (canPreview) total.push({
				data,
				id
			});
			return total;
		}, []);
	});
	return [
		mergedItems,
		registerImage,
		computed(() => !!items?.value)
	];
}
//#endregion
export { usePreviewItems as default };
