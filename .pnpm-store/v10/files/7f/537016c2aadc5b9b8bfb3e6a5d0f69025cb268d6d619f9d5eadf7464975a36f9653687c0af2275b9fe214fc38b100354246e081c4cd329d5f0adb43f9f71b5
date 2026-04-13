//#region src/_util/styleUtils.ts
function formatUnit(value) {
	if (value === void 0 || value === null) return;
	if (typeof value === "number") return `${value}px`;
	if (typeof value === "string" && !value.endsWith("px") && !Number.isNaN(Number(value))) return `${value}px`;
	return value;
}

//#endregion
export { formatUnit };