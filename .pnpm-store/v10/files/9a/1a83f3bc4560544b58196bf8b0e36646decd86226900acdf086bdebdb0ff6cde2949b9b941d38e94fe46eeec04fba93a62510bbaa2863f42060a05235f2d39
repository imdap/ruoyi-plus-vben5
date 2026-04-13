//#region src/watermark/utils.ts
/** converting camel-cased strings to be lowercase and link it with Separator */
function toLowercaseSeparator(key) {
	return key.replace(/([A-Z])/g, "-$1").toLowerCase();
}
function getStyleStr(style) {
	return Object.keys(style).map((key) => `${toLowercaseSeparator(key)}: ${style[key]};`).join(" ");
}
/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
function getPixelRatio() {
	return window.devicePixelRatio || 1;
}
/** Whether to re-render the watermark */
function reRendering(mutation, isWatermarkEle) {
	let flag = false;
	if (mutation.removedNodes.length) flag = Array.from(mutation.removedNodes).some(isWatermarkEle);
	if (mutation.type === "attributes" && isWatermarkEle(mutation.target)) flag = true;
	return flag;
}

//#endregion
export { getPixelRatio, getStyleStr, reRendering, toLowercaseSeparator };