import { genCssVar } from "../../theme/util/genStyleUtils.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/float-button/style/button.ts
const genFloatButtonStyle = (token) => {
	const { componentCls, floatButtonSize, iconCls, antCls, floatButtonIconSize } = token;
	const [varName, varRef] = genCssVar(antCls, "float-btn");
	const badgeCls = `${componentCls}-badge`;
	const R = Math.SQRT2;
	const offsetR = (R - 1) / R;
	const offsetSquare = token.calc(token.borderRadius).mul(offsetR).equal();
	const offsetCircle = token.calc(token.controlHeight).div(2).mul(offsetR).equal();
	return { [componentCls]: [{ [varName("size")]: unit(floatButtonSize) }, {
		flexDirection: "column",
		margin: 0,
		padding: `${unit(token.paddingXXS)} 0`,
		width: varRef("size"),
		minHeight: varRef("size"),
		height: "auto",
		wordBreak: "break-word",
		whiteSpace: "normal",
		gap: token.calc(token.paddingXXS).div(2).equal(),
		"&-rtl": { direction: "rtl" },
		[`&${componentCls}-individual`]: {
			position: "fixed",
			zIndex: token.zIndexPopupBase,
			insetInlineEnd: token.floatButtonInsetInlineEnd,
			bottom: token.floatButtonInsetBlockEnd,
			boxShadow: token.boxShadowSecondary
		},
		[`&${componentCls}-pure`]: {
			position: "relative",
			inset: "auto"
		},
		"&:empty": { display: "none" },
		[`${componentCls}-icon`]: { lineHeight: 1 },
		[`&${componentCls}-icon-only`]: { [iconCls]: { fontSize: floatButtonIconSize } },
		[`${componentCls}-content`]: { fontSize: token.fontSizeSM },
		[badgeCls]: {
			position: "absolute",
			top: 0,
			insetInlineEnd: 0,
			[`&:not(${badgeCls}-dot)`]: { transform: "translate(50%, -50%)" }
		},
		[`&-rtl ${badgeCls}:not(${badgeCls}-dot)`]: { transform: "translate(-50%, -50%)" },
		"&-square": { [`${badgeCls}-dot`]: {
			marginTop: offsetSquare,
			marginInlineEnd: offsetSquare
		} },
		"&-circle": { [badgeCls]: {
			marginTop: offsetCircle,
			marginInlineEnd: offsetCircle
		} }
	}] };
};
var button_default = genFloatButtonStyle;

//#endregion
export { button_default as default };