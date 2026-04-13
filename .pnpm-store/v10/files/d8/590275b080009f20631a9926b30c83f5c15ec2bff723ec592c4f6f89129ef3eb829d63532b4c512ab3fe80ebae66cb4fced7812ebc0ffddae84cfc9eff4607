import { resetComponent } from "../../style/index.js";
import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";
import { FastColor } from "@ant-design/fast-color";

//#region src/qrcode/style/index.ts
const genQRCodeStyle = (token) => {
	const { componentCls, lineWidth, lineType, colorSplit } = token;
	return {
		[componentCls]: {
			...resetComponent(token),
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			padding: token.paddingSM,
			backgroundColor: token.colorWhite,
			borderRadius: token.borderRadiusLG,
			border: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
			position: "relative",
			overflow: "hidden",
			[`& > ${componentCls}-cover`]: {
				position: "absolute",
				insetBlockStart: 0,
				insetInlineStart: 0,
				zIndex: 10,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
				color: token.colorText,
				lineHeight: token.lineHeight,
				background: token.QRCodeCoverBackgroundColor,
				textAlign: "center",
				[`& > ${componentCls}-expired, & > ${componentCls}-scanned`]: { color: token.QRCodeTextColor }
			},
			"> canvas": {
				alignSelf: "stretch",
				flex: "auto",
				minWidth: 0
			},
			"&-icon": {
				marginBlockEnd: token.marginXS,
				fontSize: token.controlHeight
			}
		},
		[`${componentCls}-borderless`]: {
			borderColor: "transparent",
			padding: 0,
			borderRadius: 0
		}
	};
};
const prepareComponentToken = (token) => ({ QRCodeCoverBackgroundColor: new FastColor(token.colorBgContainer).setA(.96).toRgbString() });
var style_default = genStyleHooks("QRCode", (token) => {
	return genQRCodeStyle(mergeToken(token, { QRCodeTextColor: token.colorText }));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };