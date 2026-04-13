import { FastColor } from "@ant-design/fast-color";

//#region src/theme/themes/default/colorAlgorithm.ts
function getAlphaColor(baseColor, alpha) {
	return new FastColor(baseColor).setA(alpha).toRgbString();
}
function getSolidColor(baseColor, brightness) {
	return new FastColor(baseColor).darken(brightness).toHexString();
}

//#endregion
export { getAlphaColor, getSolidColor };