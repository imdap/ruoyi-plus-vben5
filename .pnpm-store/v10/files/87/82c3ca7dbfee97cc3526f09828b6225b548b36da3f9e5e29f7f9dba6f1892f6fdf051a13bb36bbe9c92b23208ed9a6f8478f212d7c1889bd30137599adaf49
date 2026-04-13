import { genStyleHooks } from "../../theme/util/genStyleUtils.js";

//#region src/popconfirm/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, iconCls, antCls, zIndexPopup, colorText, colorWarning, marginXXS, marginXS, fontSize, fontWeightStrong, colorTextHeading } = token;
	return { [componentCls]: {
		zIndex: zIndexPopup,
		[`&${antCls}-popover`]: { fontSize },
		[`${componentCls}-message`]: {
			marginBottom: marginXS,
			display: "flex",
			flexWrap: "nowrap",
			alignItems: "start",
			[`> ${componentCls}-message-icon ${iconCls}`]: {
				color: colorWarning,
				fontSize,
				lineHeight: 1,
				marginInlineEnd: marginXS
			},
			[`${componentCls}-title`]: {
				fontWeight: fontWeightStrong,
				color: colorTextHeading,
				"&:only-child": { fontWeight: "normal" }
			},
			[`${componentCls}-description`]: {
				marginTop: marginXXS,
				color: colorText
			}
		},
		[`${componentCls}-buttons`]: {
			textAlign: "end",
			whiteSpace: "nowrap",
			button: { marginInlineStart: marginXS }
		}
	} };
};
const prepareComponentToken = (token) => {
	const { zIndexPopupBase } = token;
	return { zIndexPopup: zIndexPopupBase + 60 };
};
var style_default = genStyleHooks("Popconfirm", genBaseStyle, prepareComponentToken, { resetStyle: false });

//#endregion
export { style_default as default, prepareComponentToken };