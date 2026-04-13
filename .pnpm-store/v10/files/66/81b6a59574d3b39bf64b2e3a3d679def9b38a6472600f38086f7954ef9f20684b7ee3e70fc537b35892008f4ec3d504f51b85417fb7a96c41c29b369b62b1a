import { PresetColors } from "../interface/presetColors.js";

//#region src/theme/util/genPresetColor.ts
function genPresetColor(token, genCss) {
	return PresetColors.reduce((prev, colorKey) => {
		const lightColor = token[`${colorKey}1`];
		const lightBorderColor = token[`${colorKey}3`];
		const darkColor = token[`${colorKey}6`];
		const textColor = token[`${colorKey}7`];
		return {
			...prev,
			...genCss(colorKey, {
				lightColor,
				lightBorderColor,
				darkColor,
				textColor
			})
		};
	}, {});
}

//#endregion
export { genPresetColor as default };