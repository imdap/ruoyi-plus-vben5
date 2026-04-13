import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";

//#region src/empty/style/index.ts
const genSharedEmptyStyle = (token) => {
	const { componentCls, margin, marginXS, marginXL, fontSize, lineHeight } = token;
	return { [componentCls]: {
		marginInline: marginXS,
		fontSize,
		lineHeight,
		textAlign: "center",
		[`${componentCls}-image`]: {
			height: token.emptyImgHeight,
			marginBottom: marginXS,
			opacity: token.opacityImage,
			img: { height: "100%" },
			svg: {
				maxWidth: "100%",
				height: "100%",
				margin: "auto"
			}
		},
		[`${componentCls}-description`]: { color: token.colorTextDescription },
		[`${componentCls}-footer`]: { marginTop: margin },
		"&-normal": {
			marginBlock: marginXL,
			color: token.colorTextDescription,
			[`${componentCls}-description`]: { color: token.colorTextDescription },
			[`${componentCls}-image`]: { height: token.emptyImgHeightMD }
		},
		"&-small": {
			marginBlock: marginXS,
			color: token.colorTextDescription,
			[`${componentCls}-image`]: { height: token.emptyImgHeightSM }
		}
	} };
};
var style_default = genStyleHooks("Empty", (token) => {
	const { componentCls, controlHeightLG, calc } = token;
	return genSharedEmptyStyle(mergeToken(token, {
		emptyImgCls: `${componentCls}-img`,
		emptyImgHeight: calc(controlHeightLG).mul(2.5).equal(),
		emptyImgHeightMD: controlHeightLG,
		emptyImgHeightSM: calc(controlHeightLG).mul(.875).equal()
	}));
});

//#endregion
export { style_default as default };