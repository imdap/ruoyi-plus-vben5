import { clearFix } from "../../style/index.js";
import { genSubStyleComponent } from "../../theme/util/genStyleUtils.js";
import { prepareComponentToken, prepareToken } from "./index.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/modal/style/confirm.ts
const genModalConfirmStyle = (token) => {
	const { componentCls, titleFontSize, titleLineHeight, modalConfirmIconSize, fontSize, lineHeight, modalTitleHeight, fontHeight, confirmBodyPadding } = token;
	const confirmComponentCls = `${componentCls}-confirm`;
	return {
		[confirmComponentCls]: {
			"&-rtl": { direction: "rtl" },
			[`${token.antCls}-modal-header`]: { display: "none" },
			[`${confirmComponentCls}-body-wrapper`]: { ...clearFix() },
			[`&${componentCls} ${componentCls}-body`]: { padding: confirmBodyPadding },
			[`${confirmComponentCls}-body`]: {
				display: "flex",
				flexWrap: "nowrap",
				alignItems: "start",
				[`> ${token.iconCls}`]: {
					flex: "none",
					fontSize: modalConfirmIconSize,
					marginInlineEnd: token.confirmIconMarginInlineEnd,
					marginTop: token.calc(token.calc(fontHeight).sub(modalConfirmIconSize).equal()).div(2).equal()
				},
				[`&-has-title > ${token.iconCls}`]: { marginTop: token.calc(token.calc(modalTitleHeight).sub(modalConfirmIconSize).equal()).div(2).equal() }
			},
			[`${confirmComponentCls}-paragraph`]: {
				display: "flex",
				flexDirection: "column",
				flex: "auto",
				rowGap: token.marginXS,
				maxWidth: `calc(100% - ${unit(token.marginSM)})`
			},
			[`${confirmComponentCls}-body-no-icon ${confirmComponentCls}-paragraph`]: { maxWidth: "100%" },
			[`${token.iconCls} + ${confirmComponentCls}-paragraph`]: { maxWidth: `calc(100% - ${unit(token.calc(token.modalConfirmIconSize).add(token.marginSM).equal())})` },
			[`${confirmComponentCls}-title`]: {
				color: token.colorTextHeading,
				fontWeight: token.fontWeightStrong,
				fontSize: titleFontSize,
				lineHeight: titleLineHeight
			},
			[`${confirmComponentCls}-container`]: {
				color: token.colorText,
				fontSize,
				lineHeight
			},
			[`${confirmComponentCls}-btns`]: {
				textAlign: "end",
				marginTop: token.confirmBtnsMarginTop,
				[`${token.antCls}-btn + ${token.antCls}-btn`]: {
					marginBottom: 0,
					marginInlineStart: token.marginXS
				}
			}
		},
		[`${confirmComponentCls}-error ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorError },
		[`${confirmComponentCls}-warning ${confirmComponentCls}-body > ${token.iconCls},
        ${confirmComponentCls}-confirm ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorWarning },
		[`${confirmComponentCls}-info ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorInfo },
		[`${confirmComponentCls}-success ${confirmComponentCls}-body > ${token.iconCls}`]: { color: token.colorSuccess }
	};
};
var confirm_default = genSubStyleComponent(["Modal", "confirm"], (token) => {
	return genModalConfirmStyle(prepareToken(token));
}, prepareComponentToken, { order: -1e3 });

//#endregion
export { confirm_default as default };