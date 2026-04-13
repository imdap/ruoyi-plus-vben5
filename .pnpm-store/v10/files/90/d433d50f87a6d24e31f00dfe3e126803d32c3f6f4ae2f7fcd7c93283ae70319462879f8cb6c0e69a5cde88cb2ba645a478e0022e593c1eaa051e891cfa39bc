import { defaultPresetColors } from "../seed.js";
import genColorMapToken from "../shared/genColorMapToken.js";
import genCommonMapToken from "../shared/genCommonMapToken.js";
import genControlHeight_default from "../shared/genControlHeight.js";
import genFontMapToken_default from "../shared/genFontMapToken.js";
import genSizeMapToken from "../shared/genSizeMapToken.js";
import { generateColorPalettes, generateNeutralColorPalettes } from "./colors.js";
import { generate, presetPalettes, presetPrimaryColors } from "@ant-design/colors";

//#region src/theme/themes/default/index.ts
function derivative(token) {
	presetPrimaryColors.pink = presetPrimaryColors.magenta;
	presetPalettes.pink = presetPalettes.magenta;
	const colorPalettes = Object.keys(defaultPresetColors).map((colorKey) => {
		const colors = token[colorKey] === presetPrimaryColors[colorKey] ? presetPalettes[colorKey] : generate(token[colorKey]);
		return Array.from({ length: 10 }, () => 1).reduce((prev, _, i) => {
			prev[`${colorKey}-${i + 1}`] = colors?.[i];
			prev[`${colorKey}${i + 1}`] = colors?.[i];
			return prev;
		}, {});
	}).reduce((prev, cur) => {
		prev = {
			...prev,
			...cur
		};
		return prev;
	}, {});
	return {
		...token,
		...colorPalettes,
		...genColorMapToken(token, {
			generateColorPalettes,
			generateNeutralColorPalettes
		}),
		...genFontMapToken_default(token.fontSize),
		...genSizeMapToken(token),
		...genControlHeight_default(token),
		...genCommonMapToken(token)
	};
}

//#endregion
export { derivative as default };