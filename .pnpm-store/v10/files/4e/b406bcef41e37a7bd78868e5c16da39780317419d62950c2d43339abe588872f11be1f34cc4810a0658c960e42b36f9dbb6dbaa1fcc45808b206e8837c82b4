import { genStyleHooks } from "../../theme/util/genStyleUtils.js";

//#region src/affix/style/index.ts
const genSharedAffixStyle = (token) => {
	const { componentCls } = token;
	return { [componentCls]: {
		position: "fixed",
		zIndex: token.zIndexPopup
	} };
};
const prepareComponentToken = (token) => ({ zIndexPopup: token.zIndexBase + 10 });
var style_default = genStyleHooks("Affix", genSharedAffixStyle, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };