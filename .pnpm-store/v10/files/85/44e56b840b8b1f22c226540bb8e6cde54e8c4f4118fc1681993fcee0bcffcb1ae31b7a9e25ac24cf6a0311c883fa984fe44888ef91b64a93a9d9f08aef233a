//#region src/_util/isEqual.ts
function isValueEqual(a, b) {
	if (Object.is(a, b)) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a === "object" && a !== null || typeof a === "function") return false;
	return false;
}

//#endregion
export { isValueEqual };