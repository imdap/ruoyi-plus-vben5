import { getStyleStr } from "./utils.js";
import { reactive } from "vue";

//#region src/watermark/useWatermark.ts
/**
* Base size of the canvas, 1 for parallel layout and 2 for alternate layout
* Only alternate layout is currently supported
*/
const BaseSize = 2;
const FontGap = 3;
const emphasizedStyle = { visibility: "visible !important" };
function useWatermark(markStyle, onRemove) {
	const watermarkMap = reactive(/* @__PURE__ */ new Map());
	const appendWatermark = (base64Url, markWidth, container) => {
		if (container) {
			const exist = watermarkMap.get(container);
			if (!exist) {
				const newWatermarkEle = document.createElement("div");
				watermarkMap.set(container, newWatermarkEle);
			}
			const watermarkEle = watermarkMap.get(container);
			watermarkEle.setAttribute("style", getStyleStr({
				...markStyle.value,
				backgroundImage: `url('${base64Url}')`,
				backgroundSize: `${Math.floor(markWidth)}px`,
				...emphasizedStyle
			}));
			watermarkEle.removeAttribute("class");
			watermarkEle.removeAttribute("hidden");
			if (watermarkEle.parentElement !== container) {
				if (exist && typeof onRemove?.value === "function") onRemove.value?.();
				container.append(watermarkEle);
			}
		}
		return watermarkMap.get(container);
	};
	const removeWatermark = (container) => {
		const watermarkEle = watermarkMap.get(container);
		if (watermarkEle && container) container.removeChild(watermarkEle);
		watermarkMap.delete(container);
	};
	const isWatermarkEle = (ele) => Array.from(watermarkMap.values()).includes(ele);
	return [
		appendWatermark,
		removeWatermark,
		isWatermarkEle
	];
}

//#endregion
export { BaseSize, FontGap, useWatermark as default };