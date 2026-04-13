import { devUseWarning, isDev } from "../warning.js";
import useToken from "../../theme/useToken.js";
import { useZIndexContext } from "../zindexContext.js";
import { computed } from "vue";

//#region src/_util/hooks/useZIndex.ts
const CONTAINER_OFFSET = 100;
const CONTAINER_OFFSET_MAX_COUNT = 10;
const CONTAINER_MAX_OFFSET = CONTAINER_OFFSET * CONTAINER_OFFSET_MAX_COUNT;
/**
* Static function will default be the `CONTAINER_MAX_OFFSET`.
* But it still may have children component like Select, Dropdown.
* So the warning zIndex should exceed the `CONTAINER_MAX_OFFSET`.
*/
const CONTAINER_MAX_OFFSET_WITH_CHILDREN = CONTAINER_MAX_OFFSET + CONTAINER_OFFSET;
const containerBaseZIndexOffset = {
	Modal: CONTAINER_OFFSET,
	Drawer: CONTAINER_OFFSET,
	Popover: CONTAINER_OFFSET,
	Popconfirm: CONTAINER_OFFSET,
	Tooltip: CONTAINER_OFFSET,
	Tour: CONTAINER_OFFSET,
	FloatButton: CONTAINER_OFFSET
};
const consumerBaseZIndexOffset = {
	SelectLike: 50,
	Dropdown: 50,
	DatePicker: 50,
	Menu: 50,
	ImagePreview: 1
};
function isContainerType(type) {
	return type in containerBaseZIndexOffset;
}
function useZIndex(componentType, customZIndex) {
	const [, token] = useToken();
	const parentZIndex = useZIndexContext();
	const isContainer = isContainerType(componentType);
	let result;
	if (customZIndex?.value !== void 0) result = [customZIndex, customZIndex];
	else {
		const resIndex = computed(() => {
			let zIndex = parentZIndex.value ?? 0;
			if (isContainer) zIndex += (parentZIndex.value ? 0 : token.value.zIndexPopupBase) + containerBaseZIndexOffset[componentType];
			else zIndex += consumerBaseZIndexOffset[componentType];
			return [parentZIndex.value === void 0 ? customZIndex?.value : zIndex, zIndex];
		});
		result = [computed(() => resIndex.value[0]), computed(() => resIndex.value[1])];
	}
	if (isDev) {
		const warning = devUseWarning(componentType);
		const maxZIndex = token.value.zIndexPopupBase + CONTAINER_MAX_OFFSET_WITH_CHILDREN;
		const currentZIndex = computed(() => result[0]?.value ?? 0);
		warning(customZIndex?.value !== void 0 || currentZIndex.value <= maxZIndex, "usage", "`zIndex` is over design token `zIndexPopupBase` too much. It may cause unexpected override.");
	}
	return result;
}

//#endregion
export { CONTAINER_MAX_OFFSET, consumerBaseZIndexOffset, containerBaseZIndexOffset, useZIndex };