import { getSlotPropsFnRun } from "../../_util/tools.js";
import MotionContent_default from "./MotionContent.js";
import { createVNode, defineComponent, isVNode } from "vue";
import { UniqueProvider } from "@v-c/trigger";

//#region src/tooltip/UniqueProvider/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const cachedPlacements = [null, null];
function uniqueBuiltinPlacements(ori) {
	if (cachedPlacements[0] !== ori) {
		const target = {};
		Object.keys(ori).forEach((placement) => {
			target[placement] = {
				...ori[placement],
				dynamicInset: false
			};
		});
		cachedPlacements[0] = ori;
		cachedPlacements[1] = target;
	}
	return cachedPlacements[1];
}
const UniqueProvider$1 = /* @__PURE__ */ defineComponent((_, { slots }) => {
	const renderPopup = (options) => {
		const popupEle = getSlotPropsFnRun({}, options, "popup");
		const { id, builtinPlacements } = options;
		const parsedPlacements = uniqueBuiltinPlacements(builtinPlacements);
		return {
			...options,
			getPopupContainer: null,
			arrow: false,
			popup: createVNode(MotionContent_default, { "key": id }, _isSlot(popupEle) ? popupEle : { default: () => [popupEle] }),
			builtinPlacements: parsedPlacements
		};
	};
	return () => {
		return createVNode(UniqueProvider, { "postTriggerProps": renderPopup }, { default: () => [slots?.default?.()] });
	};
}, { name: "AUniqueProvider" });
var UniqueProvider_default = UniqueProvider$1;

//#endregion
export { UniqueProvider_default as default };