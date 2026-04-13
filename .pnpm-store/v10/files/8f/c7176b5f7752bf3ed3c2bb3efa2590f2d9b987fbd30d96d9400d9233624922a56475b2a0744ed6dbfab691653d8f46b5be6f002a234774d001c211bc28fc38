import { computed } from "vue";

//#region src/_util/hooks/useOrientation.ts
function isValidOrientation(orientation) {
	return orientation === "horizontal" || orientation === "vertical";
}
function useOrientation(orientation, vertical, legacyDirection) {
	const _orientation = computed(() => {
		const validOrientation = isValidOrientation(orientation?.value);
		let mergedOrientation;
		if (validOrientation) mergedOrientation = orientation.value;
		else if (typeof vertical?.value === "boolean") mergedOrientation = vertical?.value ? "vertical" : "horizontal";
		else mergedOrientation = isValidOrientation(legacyDirection?.value) ? legacyDirection.value : "horizontal";
		return [mergedOrientation, mergedOrientation === "vertical"];
	});
	return [computed(() => _orientation.value[0]), computed(() => _orientation.value[1])];
}

//#endregion
export { useOrientation };