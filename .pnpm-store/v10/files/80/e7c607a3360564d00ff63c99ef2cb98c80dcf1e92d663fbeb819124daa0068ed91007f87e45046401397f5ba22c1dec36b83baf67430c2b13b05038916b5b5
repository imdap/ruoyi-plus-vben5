import { genStyleHooks } from "../../theme/util/genStyleUtils.js";

//#region src/app/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, colorText, fontSize, lineHeight, fontFamily } = token;
	return { [componentCls]: {
		color: colorText,
		fontSize,
		lineHeight,
		fontFamily,
		[`&${componentCls}-rtl`]: { direction: "rtl" }
	} };
};
const prepareComponentToken = () => ({});
var style_default = genStyleHooks("App", genBaseStyle, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };