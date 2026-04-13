import genPresetColor from "../../theme/util/genPresetColor.js";
import { genSubStyleComponent } from "../../theme/util/genStyleUtils.js";
import { prepareComponentToken, prepareToken } from "./index.js";

//#region src/tag/style/presetCmp.ts
function genPresetStyle(token) {
	return genPresetColor(token, (colorKey, { textColor, lightBorderColor, lightColor, darkColor }) => ({ [`${token.componentCls}${token.componentCls}-${colorKey}:not(${token.componentCls}-disabled)`]: {
		[`&${token.componentCls}-outlined`]: {
			backgroundColor: lightColor,
			borderColor: lightBorderColor,
			color: textColor
		},
		[`&${token.componentCls}-solid`]: {
			backgroundColor: darkColor,
			borderColor: darkColor,
			color: token.colorTextLightSolid
		},
		[`&${token.componentCls}-filled`]: {
			backgroundColor: lightColor,
			color: textColor
		}
	} }));
}
var presetCmp_default = genSubStyleComponent(["Tag", "preset"], (token) => {
	return genPresetStyle(prepareToken(token));
}, prepareComponentToken);

//#endregion
export { presetCmp_default as default };