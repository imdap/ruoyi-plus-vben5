import { defaultPresetColors } from "../seed.js";
import { PresetColors } from "../../interface/presetColors.js";
import genColorMapToken from "../shared/genColorMapToken.js";
import derivative$1 from "../default/index.js";
import { generateColorPalettes, generateNeutralColorPalettes } from "./colors.js";
import { generate } from "@ant-design/colors";

//#region src/theme/themes/dark/index.ts
const derivative = (token, mapToken) => {
	const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
		const colors = generate(token[colorKey], { theme: "dark" });
		return Array.from({ length: 10 }, () => 1).reduce((prev, _, i) => {
			prev[`${colorKey}-${i + 1}`] = colors[i];
			prev[`${colorKey}${i + 1}`] = colors[i];
			return prev;
		}, {});
	}).reduce((prev, cur) => {
		prev = {
			...prev,
			...cur
		};
		return prev;
	}, {});
	const mergedMapToken = mapToken ?? derivative$1(token);
	const colorMapToken = genColorMapToken(token, {
		generateColorPalettes,
		generateNeutralColorPalettes
	});
	const presetColorHoverActiveTokens = PresetColors.reduce((prev, colorKey) => {
		const colorBase = token[colorKey];
		if (colorBase) {
			const colorPalette = generateColorPalettes(colorBase);
			prev[`${colorKey}Hover`] = colorPalette[7];
			prev[`${colorKey}Active`] = colorPalette[5];
		}
		return prev;
	}, {});
	return {
		...mergedMapToken,
		...colorPalettes,
		...colorMapToken,
		...presetColorHoverActiveTokens,
		colorPrimaryBg: colorMapToken.colorPrimaryBorder,
		colorPrimaryBgHover: colorMapToken.colorPrimaryBorderHover
	};
};
var dark_default = derivative;

//#endregion
export { dark_default as default };