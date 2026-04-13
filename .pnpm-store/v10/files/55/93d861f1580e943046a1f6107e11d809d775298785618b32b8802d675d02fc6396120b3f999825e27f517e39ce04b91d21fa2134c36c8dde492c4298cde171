import { AggregationColor } from "./color.js";
import { Color } from "@v-c/color-picker";

//#region src/color-picker/util.ts
function generateColor(color) {
	if (color instanceof AggregationColor) return color;
	return new AggregationColor(color);
}
function formatSingleColorValue(color, valueFormat) {
	if (typeof valueFormat === "function") return valueFormat(color);
	switch (valueFormat) {
		case "hex": return color.toHexString();
		case "hsb": return color.toHsbString();
		default: return color.toRgbString();
	}
}
function formatColorValue(color, valueFormat) {
	if (!valueFormat) return color;
	if (color.isGradient()) return color.getColors().map(({ color: itemColor, percent }) => ({
		color: formatSingleColorValue(itemColor, valueFormat),
		percent
	}));
	return formatSingleColorValue(color, valueFormat);
}
const getRoundNumber = (value) => Math.round(Number(value || 0));
const getColorAlpha = (color) => getRoundNumber(color.toHsb().a * 100);
/** Return the color whose `alpha` is 1 */
function genAlphaColor(color, alpha) {
	const rgba = color.toRgb();
	if (!rgba.r && !rgba.g && !rgba.b) {
		const hsba = color.toHsb();
		hsba.a = alpha || 1;
		return generateColor(hsba);
	}
	rgba.a = alpha || 1;
	return generateColor(rgba);
}
/**
* Get percent position color. e.g. [10%-#fff, 20%-#000], 15% => #888
*/
function getGradientPercentColor(colors, percent) {
	const filledColors = [
		{
			percent: 0,
			color: colors[0].color
		},
		...colors,
		{
			percent: 100,
			color: colors[colors.length - 1].color
		}
	];
	for (let i = 0; i < filledColors.length - 1; i += 1) {
		const startPtg = filledColors[i].percent;
		const endPtg = filledColors[i + 1].percent;
		const startColor = filledColors[i].color;
		const endColor = filledColors[i + 1].color;
		if (startPtg <= percent && percent <= endPtg) {
			const dist = endPtg - startPtg;
			if (dist === 0) return startColor;
			const ratio = (percent - startPtg) / dist * 100;
			const startRcColor = new Color(startColor);
			const endRcColor = new Color(endColor);
			return startRcColor.mix(endRcColor, ratio).toRgbString();
		}
	}
	/* istanbul ignore next */
	return "";
}

//#endregion
export { formatColorValue, genAlphaColor, generateColor, getColorAlpha, getGradientPercentColor, getRoundNumber };