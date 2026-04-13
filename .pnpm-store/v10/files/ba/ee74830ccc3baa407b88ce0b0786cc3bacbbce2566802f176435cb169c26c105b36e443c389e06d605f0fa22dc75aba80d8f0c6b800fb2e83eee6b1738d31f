//#region src/_util/wave/util.ts
function isValidWaveColor(color) {
	return !!color && color !== "#fff" && color !== "#ffffff" && color !== "rgb(255, 255, 255)" && color !== "rgba(255, 255, 255, 1)" && !/rgba\((?:\d*, ){3}0\)/.test(color) && color !== "transparent" && color !== "canvastext";
}
function getTargetWaveColor(node, colorSource = null) {
	const style = getComputedStyle(node);
	const { borderTopColor, borderColor, backgroundColor } = style;
	if (colorSource && isValidWaveColor(style[colorSource])) return style[colorSource];
	return [
		borderTopColor,
		borderColor,
		backgroundColor
	].find(isValidWaveColor) ?? null;
}

//#endregion
export { getTargetWaveColor, isValidWaveColor };