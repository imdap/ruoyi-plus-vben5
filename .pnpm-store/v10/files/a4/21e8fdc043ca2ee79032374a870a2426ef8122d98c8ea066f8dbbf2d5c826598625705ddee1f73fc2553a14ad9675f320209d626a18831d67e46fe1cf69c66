import { shallowRef } from "vue";

//#region src/_util/hooks/usePatchElement.ts
function usePatchElement() {
	const elements = shallowRef([]);
	const patchElement = (element) => {
		elements.value = [...elements.value, element];
		return () => {
			elements.value = [...elements.value].filter((ele) => ele !== element);
		};
	};
	return [elements, patchElement];
}

//#endregion
export { usePatchElement };