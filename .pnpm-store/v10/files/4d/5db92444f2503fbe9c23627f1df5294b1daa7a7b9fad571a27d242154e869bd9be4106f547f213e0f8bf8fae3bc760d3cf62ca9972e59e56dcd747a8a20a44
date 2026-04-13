import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { initFadeMotion } from "../../style/motion/fade.js";
import button_default from "./button.js";
import group_default from "./group.js";

//#region src/float-button/style/index.ts
const prepareComponentToken = () => ({});
var style_default = genStyleHooks("FloatButton", (token) => {
	const { controlHeightLG, marginXXL, marginLG, fontSizeIcon, calc } = token;
	const floatButtonToken = mergeToken(token, {
		floatButtonIconSize: calc(fontSizeIcon).mul(1.5).equal(),
		floatButtonSize: controlHeightLG,
		floatButtonInsetBlockEnd: marginXXL,
		floatButtonInsetInlineEnd: marginLG
	});
	return [
		button_default(floatButtonToken),
		group_default(floatButtonToken),
		initFadeMotion(token)
	];
}, prepareComponentToken, { order: -998 });

//#endregion
export { style_default as default, prepareComponentToken };