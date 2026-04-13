import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { getItemWithWidthStyle } from "./util.js";

//#region src/steps/style/small.ts
const genSmallStyle = (token) => {
	const { componentCls, iconSizeSM, fontSize, lineHeight, marginXS, fontHeight, marginSM, paddingXS, antCls } = token;
	const [varName] = genCssVar(antCls, "cmp-steps");
	return { [`${componentCls}${componentCls}-small`]: {
		[varName("icon-size")]: iconSizeSM,
		[varName("title-horizontal-item-margin")]: marginSM,
		[varName("title-vertical-row-gap")]: paddingXS,
		[varName("title-font-size")]: fontSize,
		[varName("title-line-height")]: lineHeight,
		[varName("title-horizontal-rail-margin")]: marginXS,
		[varName("title-horizontal-title-height")]: fontHeight,
		[`&${componentCls}-horizontal${componentCls}-title-vertical`]: getItemWithWidthStyle(token, marginXS)
	} };
};
var small_default = genSmallStyle;

//#endregion
export { small_default as default };