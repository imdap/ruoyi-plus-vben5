import { genStyleHooks } from "../../theme/util/genStyleUtils.js";
import { mergeToken } from "../../theme/internal.js";
import { unit } from "@antdv-next/cssinjs";

//#region src/result/style/index.ts
const genBaseStyle = (token) => {
	const { componentCls, lineHeightHeading3, iconCls, padding, paddingXL, paddingXS, paddingLG, marginXS, lineHeight } = token;
	return {
		[componentCls]: {
			padding: `${unit(token.calc(paddingLG).mul(2).equal())} ${unit(paddingXL)}`,
			"&-rtl": { direction: "rtl" }
		},
		[`${componentCls} ${componentCls}-image`]: {
			width: token.imageWidth,
			height: token.imageHeight,
			margin: "auto"
		},
		[`${componentCls} ${componentCls}-icon`]: {
			marginBottom: paddingLG,
			textAlign: "center",
			[`& > ${iconCls}`]: { fontSize: token.iconFontSize }
		},
		[`${componentCls} ${componentCls}-title`]: {
			color: token.colorTextHeading,
			fontSize: token.titleFontSize,
			lineHeight: lineHeightHeading3,
			marginBlock: marginXS,
			textAlign: "center"
		},
		[`${componentCls} ${componentCls}-subtitle`]: {
			color: token.colorTextDescription,
			fontSize: token.subtitleFontSize,
			lineHeight,
			textAlign: "center"
		},
		[`${componentCls} ${componentCls}-body`]: {
			marginTop: paddingLG,
			padding: `${unit(paddingLG)} ${unit(token.calc(padding).mul(2.5).equal())}`,
			backgroundColor: token.colorFillAlter
		},
		[`${componentCls} ${componentCls}-extra`]: {
			margin: token.extraMargin,
			textAlign: "center",
			"& > *": {
				marginInlineEnd: paddingXS,
				"&:last-child": { marginInlineEnd: 0 }
			}
		}
	};
};
const genStatusIconStyle = (token) => {
	const { componentCls, iconCls } = token;
	return {
		[`${componentCls}-success ${componentCls}-icon > ${iconCls}`]: { color: token.resultSuccessIconColor },
		[`${componentCls}-error ${componentCls}-icon > ${iconCls}`]: { color: token.resultErrorIconColor },
		[`${componentCls}-info ${componentCls}-icon > ${iconCls}`]: { color: token.resultInfoIconColor },
		[`${componentCls}-warning ${componentCls}-icon > ${iconCls}`]: { color: token.resultWarningIconColor }
	};
};
const genResultStyle = (token) => [genBaseStyle(token), genStatusIconStyle(token)];
const prepareComponentToken = (token) => ({
	titleFontSize: token.fontSizeHeading3,
	subtitleFontSize: token.fontSize,
	iconFontSize: token.fontSizeHeading3 * 3,
	extraMargin: `${token.paddingLG}px 0 0 0`
});
var style_default = genStyleHooks("Result", (token) => {
	const resultInfoIconColor = token.colorInfo;
	const resultErrorIconColor = token.colorError;
	const resultSuccessIconColor = token.colorSuccess;
	const resultWarningIconColor = token.colorWarning;
	return genResultStyle(mergeToken(token, {
		resultInfoIconColor,
		resultErrorIconColor,
		resultSuccessIconColor,
		resultWarningIconColor,
		imageWidth: 250,
		imageHeight: 295
	}));
}, prepareComponentToken);

//#endregion
export { style_default as default, prepareComponentToken };